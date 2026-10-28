// 把一份实机 capture 变成「能贴进聊天窗口的包」。
//
// 问题：外部 AI 的聊天窗口只能贴文本/文件，贴不了 zip，也不方便同时贴十几个 HTML；
// 而一份 capture 里同一画面会被回帖重复保存十几次（AZ-110-01-009: 41 张 / 9 个画面）。
//
// 这个工具只读 capture，不改它：
//   <out>/00-INDEX.md      画面清单 + 每个画面的标签/按钮/表格（最有用，先贴这个）
//   <out>/01-<画面>.md …   清洗后的 HTML（去 script/style/注释/空白），按大小切块
//   <out>/manifest.json    机器可读：画面 → 文件 → 原始快照
//
// 用法:
//   node automation/node-runner/make-pack.mjs --capture capture-AZ-110-01-009/az-110-01-009
//   node automation/node-runner/make-pack.mjs --capture <dir> --out <dir> --max 30000 --meta-only
//
// capture 可以是 capture.mjs 的输出（有 index.json），也可以是手工另存的一堆 .html。
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { listCapturePages, loadScreens } from './dom-check.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const flag = (n) => process.argv.includes(`--${n}`);

const captureDir = arg('capture');
if (!captureDir) {
  console.error('usage: node make-pack.mjs --capture <capture-dir> [--out DIR] [--max CHARS] [--meta-only]');
  process.exit(2);
}
const capDir = resolve(process.cwd(), captureDir);
const outDir = resolve(process.cwd(), arg('out', join(capDir, 'pack')));
const maxChars = Math.max(4000, Number(arg('max', '30000')) || 30000);
const metaOnly = flag('meta-only');

const screens = loadScreens();
const pages = listCapturePages(capDir, screens);

function sizeOf(p) {
  try { return statSync(p.abs).size; } catch { return 0; }
}

function usable(p) {
  if (((p.counts || {}).ids || 0) + ((p.counts || {}).pairs || 0) === 0) return false;
  return sizeOf(p) > 500;
}

// One section per screen; the largest snapshot is the most complete state
// (postback duplicates are usually the same screen before/after an action).
const groups = new Map();
for (const p of pages) {
  if (!usable(p)) continue;
  const name = p.screen || p.title || basename(p.abs, '.html');
  const g = groups.get(name) || { name, snaps: [] };
  g.snaps.push(p);
  groups.set(name, g);
}
for (const g of groups.values()) g.snaps.sort((a, b) => sizeOf(a) - sizeOf(b));
const ordered = [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'ja'));

function readMeta(p) {
  const jsonPath = p.abs.replace(/\.html?$/i, '.json');
  if (!existsSync(jsonPath)) return null;
  try { return JSON.parse(readFileSync(jsonPath, 'utf8')); } catch { return null; }
}

function cleanHtml(html) {
  return String(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    // Hidden inputs (ASP.NET __VIEWSTATE 等) are 90% of the bytes and can
    // never be a target. Keeping them only wastes the AI's context.
    .replace(/<input\b[^>]*\btype=["']?hidden["']?[^>]*>/gi, '')
    .replace(/\s+style="[^"]*"/gi, '')
    .replace(/>\s+</g, '><')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

// A single screen can still be bigger than one chat message. Split it at tag
// boundaries and repeat the screen header, so each part is self-describing.
function splitHtml(html, limit) {
  if (html.length <= limit) return [html];
  const cuts = [];
  let start = 0;
  while (start < html.length) {
    let end = Math.min(html.length, start + limit);
    if (end < html.length) {
      const at = html.lastIndexOf('><', end);
      if (at > start + limit / 2) end = at + 1;
    }
    cuts.push(html.slice(start, end));
    start = end;
  }
  return cuts;
}

// The index is what the web AI reads first, so a wrong line there turns into a
// wrong primitive (「不備内容 → input#selected_imperfect_code」 made it write
// chooseRow where the page has a <select>). capture.mjs now ranks controls by
// visibility, but old captures still carry the bad pairs, and the HTML is the
// ground truth anyway. Re-derive the label table from the saved HTML when the
// structure is recognisable, and say which source won.
function labelsFromHtml(abs) {
  let html = '';
  try { html = readFileSync(abs, 'utf8'); } catch { return null; }
  const out = [];
  // Label/value are sibling cells. Matching them as ONE regex is what produced
  // the 1700-character pseudo-label 「項目ｺｰﾄﾞ 項目名 不備内容 …」 that the web AI
  // received instead of a label table, and the mismatch that dropped
  // 保険種類 entirely. So: find every title cell, and let each one own the
  // markup up to the NEXT title cell. A header cell with no control in its
  // span is simply skipped — which is exactly right for the table's column
  // headers.
  const titles = [...html.matchAll(/class="[^"]*field_title[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
  for (let i = 0; i < titles.length; i += 1) {
    const t = titles[i];
    const label = t[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (!label) continue;
    const from = t.index + t[0].length;
    const to = i + 1 < titles.length ? titles[i + 1].index : html.length;
    const body = html.slice(from, to);
    // A control must be the cell's own value, not something a following table
    // row brought along: stop at the first structural boundary.
    const cut = body.search(/<\/tr>|<t(?:able|body|r)\b/i);
    const span = cut >= 0 ? body.slice(0, cut) : body;
    const controls = [...span.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)].map((c) => {
      const attrs = c[2];
      const attr = (n) => (new RegExp(`\\b${n}="([^"]*)"`).exec(attrs) || [])[1] || null;
      return { tag: c[1].toLowerCase(), type: attr('type'), id: attr('id'), name: attr('name') };
    });
    const usable = controls.filter((c) => c.type !== 'hidden');
    // Buttons are not field values: a label whose span happens to reach the
    // next button must not become 「送り状印刷 → text」.
    const fields = usable.filter((c) => !['button', 'submit', 'reset', 'image'].includes(c.type));
    const pick = fields.find((c) => c.tag === 'select') || fields.find((c) => c.tag === 'textarea') || fields[0];
    if (!pick) continue;
    let options = null;
    if (pick.tag === 'select') {
      // The options live after the opening tag of this select.
      const start = span.indexOf(pick.id ? `id="${pick.id}"` : `name="${pick.name}"`);
      const seg = start >= 0 ? span.slice(start) : span;
      options = [...seg.matchAll(/<option\b[^>]*>([^<]*)<\/option>/gi)]
        .map((o) => o[1].trim()).filter(Boolean).slice(0, 30);
    }
    out.push({ label, ...pick, options, alternatives: controls.length - 1 });
  }
  return out.length ? out : null;
}

// This app renders table headers OUTSIDE the <table> (a sibling field_title row
// above a sticky_table). capture.mjs reads <th>, finds none, and the index then
// printed 「th: (none) rows=60」 — so the AI never saw that 代理店照会 is a column
// of per-row <select>s and wrote do: select on a row-scoped control.
// The header cells do NOT line up 1:1 with data-row <td>s (colspan differs), so
// pairing them by index would be a guess. Emit the two facts separately instead:
// the column titles in order, and the controls that repeat per row.
function tableColumnsFromHtml(abs) {
  let html = '';
  try { html = readFileSync(abs, 'utf8'); } catch { return null; }
  const at = html.search(/class="[^"]*field_header[^"]*"/i);
  if (at < 0) return null;
  const zone = html.slice(at);
  const titles = [];
  // Titles after the data table has started belong to the form below the list,
  // not to the list's columns.
  const tableAt = zone.search(/<table\b/i);
  for (const m of zone.matchAll(/class="[^"]*field_title[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)) {
    if (tableAt >= 0 && m.index > tableAt) break;
    const t = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    titles.push(t || '(空)');
    if (titles.length >= 12) break;
  }
  // Titles that live INSIDE the row body (回答内容 / 回答入力欄) describe the
  // extra rows of the same record and are just as important.
  const inner = [...new Set([...zone.matchAll(/class="[^"]*sticky_table_title[^"]*"[^>]*>([\s\S]*?)<\/td>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim())
    .filter(Boolean))].slice(0, 6);

  // Per-row control families: name[n]… with n varying. One entry per family,
  // with the element type and options read from the first row.
  const fam = new Map();
  for (const c of zone.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
    const attr = (n) => (new RegExp(`\\b${n}="([^"]*)"`).exec(c[2]) || [])[1] || null;
    const name = attr('name') || '';
    const base = name.replace(/\[\d+\]/g, '[n]');
    if (!base || base === name) continue;
    if (attr('type') === 'hidden') continue;
    if (fam.has(base)) continue;
    let options = null;
    if (c[1].toLowerCase() === 'select') {
      const seg = zone.slice(c.index, c.index + 3000);
      const body = seg.slice(0, seg.search(/<\/select>/i) + 1 || undefined);
      options = [...body.matchAll(/<option\b[^>]*>([^<]*)<\/option>/gi)]
        .map((o) => o[1].trim()).filter(Boolean).slice(0, 12);
    }
    const kind = c[1].toLowerCase() === 'select' ? 'select·下拉'
      : attr('type') === 'checkbox' ? 'checkbox·勾选'
        : attr('type') === 'radio' ? 'radio·单选'
          : attr('type') === 'button' ? 'button·按钮'
            : c[1].toLowerCase() === 'textarea' ? 'textarea·多行' : 'text·输入';
    fam.set(base, { base, kind, options, value: attr('value') });
  }
  return { titles, inner, families: [...fam.values()] };
}

function describeControl(c) {
  const ident = c.id ? `#${c.id}` : c.name ? `[name="${c.name}"]` : '(no id/name)';
  const kind = c.tag === 'select' ? 'select' : c.type === 'checkbox' ? 'checkbox' : c.type === 'radio' ? 'radio' : (c.tag === 'input' ? 'text' : c.tag);
  let line = `  ${c.label} → ${kind} ${ident}`;
  if (c.options?.length) line += `\n      选项: ${c.options.join(' | ')}`;
  return line;
}

// A listbox with no visible label is invisible to a label-driven reader, yet
// it is exactly what 「各項目の選択」 has to select from (AMA13: field_list and
// inquiry_contents_list, both filled by JS). List them so the AI stops
// inventing chooseRow targets for them.
function unlabeledFromHtml(abs) {
  let html = '';
  try { html = readFileSync(abs, 'utf8'); } catch { return []; }
  const labelled = new Set();
  // Every title cell owns the markup up to the next one (same rule as
  // labelsFromHtml), so this must not be a single-pair regex either.
  const titles = [...html.matchAll(/class="[^"]*field_title[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)];
  for (let i = 0; i < titles.length; i += 1) {
    const from = titles[i].index + titles[i][0].length;
    const to = i + 1 < titles.length ? titles[i + 1].index : html.length;
    for (const c of html.slice(from, to).matchAll(/\b(?:id|name)="([^"]+)"/g)) labelled.add(c[1]);
  }
  const out = [];
  for (const s of html.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)) {
    const attrs = s[1];
    const name = (/\bname="([^"]*)"/.exec(attrs) || [])[1];
    const id = (/\bid="([^"]*)"/.exec(attrs) || [])[1];
    if (name && labelled.has(name)) continue;
    if (id && labelled.has(id)) continue;
    const options = [...s[2].matchAll(/<option\b[^>]*>([^<]*)<\/option>/gi)]
      .map((o) => o[1].trim()).filter(Boolean).slice(0, 30);
    out.push({ name, id, options });
  }
  return out;
}

function checkboxesFromHtml(abs) {
  let html = '';
  try { html = readFileSync(abs, 'utf8'); } catch { return []; }
  const out = [];
  for (const c of html.matchAll(/<input\b([^>]*)>/gi)) {
    const attrs = c[1];
    const type = (/\btype="([^"]*)"/i.exec(attrs) || [])[1];
    if (type !== 'checkbox' && type !== 'radio') continue;
    out.push({
      type,
      id: (/\bid="([^"]*)"/.exec(attrs) || [])[1] || null,
      name: (/\bname="([^"]*)"/.exec(attrs) || [])[1] || null,
      value: (/\bvalue="([^"]*)"/.exec(attrs) || [])[1] || null,
    });
  }
  return out;
}

function indexSection(g, n) {
  const latest = g.snaps.at(-1);
  const meta = readMeta(latest);
  const lines = [];
  lines.push(`## ${n + 1}. ${g.name}`);
  const known = !!screens[g.name];
  if (!known) lines.push('!! ui-screens.json にこの名前が無い（画面名は page title から採った。手顺の画面名と突き合わせること）');
  lines.push(`snapshots: ${g.snaps.length}  latest: ${basename(latest.abs)}  size: ${sizeOf(latest)}`);
  const rawTitle = meta?.title || latest.title || '';
  if (rawTitle && rawTitle !== g.name) lines.push(`page title: ${rawTitle}`);
  const url = meta?.url || latest.url || '';
  if (url) lines.push(`url: ${url}`);
  if (meta?.popupOpener) {
    lines.push('WINDOW: 子ウィンドウ（popup）— この画面の操作は popup: true');
  }

  const fromHtml = labelsFromHtml(latest.abs);
  const pairs = fromHtml || meta?.pairs || [];
  if (pairs.length) {
    lines.push(fromHtml ? 'LABELS (from HTML — authoritative):' : `LABELS (from capture metadata — ${basename(latest.abs)} に field_title 構造が無い):`);
    for (const p of pairs.slice(0, 120)) lines.push(describeControl(p));
  }
  if (meta?.buttons?.length) {
    lines.push('BUTTONS:');
    for (const b of meta.buttons.slice(0, 80)) {
      lines.push(`  ${b.label || '(no label)'} → ${b.id || '?'}${b.disabled ? ' [disabled]' : ''}${b.opensPopup ? '  ※ このボタンで子ウィンドウが開く' : ''}`);
    }
  }
  const cols = tableColumnsFromHtml(latest.abs);
  if (cols) {
    lines.push('TABLE: 1行 = 1件（行内控件。行内控件不要用 do: select / do: check，用 do: chooseRow + target.anchor）');
    lines.push(`  列名（表头顺序）: ${cols.titles.join(' | ')}`);
    if (cols.inner.length) lines.push(`  行内容（同一件的附加行）: ${cols.inner.join(' | ')}`);
    lines.push('  NAME[n] FAMILIES（每行各一个；n 不是行号，行由 anchor 决定）:');
    for (const f of cols.families) {
      lines.push(`    ${f.base} → ${f.kind}${f.options?.length ? '  选项: ' + f.options.join(' | ') : ''}`);
    }
    lines.push('  行内控件的 target 写法: {label: <手顺的列名>, anchor: "${case.<识别行的值>}"}');
  }
  if (meta?.tables?.length) {
    lines.push('TABLES:');
    for (const t of meta.tables.slice(0, 6)) {
      lines.push(`  th: ${(t.th || []).join(' | ') || '(none)'}  rows=${t.rowCount}`);
      for (const row of (t.sampleRows || []).slice(0, 2)) {
        const cells = row.map((c) => c.control
          ? `[${c.control.tag}:${c.control.name || c.control.id || '?'}]${c.text ? ' ' + c.text : ''}`
          : c.text).filter(Boolean).join(' | ');
        if (cells) lines.push(`    ${cells}`);
      }
    }
  }
  const unlabeled = unlabeledFromHtml(latest.abs);
  if (unlabeled.length) {
    lines.push('UNLABELED LISTS (ラベルの無いリストボックス — 手顺が「選択」と言う対象はここ):');
    for (const s of unlabeled) {
      const ident = s.name ? `[name="${s.name}"]` : s.id ? `#${s.id}` : '?';
      lines.push(`  select ${ident}${s.options.length ? '  选项: ' + s.options.join(' | ') : '  选项: (JS で後から入る。capture では空)'}`);
    }
  }
  const boxes = checkboxesFromHtml(latest.abs);
  if (boxes.length) {
    lines.push('CHECK/RADIO:');
    for (const b of boxes.slice(0, 40)) {
      lines.push(`  ${b.type} ${b.id ? '#' + b.id : b.name ? `[name="${b.name}"]` : '?'}${b.value !== null ? ` value="${b.value}"` : ''}`);
    }
  }
  return lines.join('\n');
}

mkdirSync(outDir, { recursive: true });

// ── 00-INDEX.md ─────────────────────────────────────────────────────
const manifest = { capture: capDir, generatedAt: new Date().toISOString(), sections: [] };
const idx = ['# CAPTURE PACK', '', `source: ${capDir}`, `screens: ${ordered.length}`, '',
  '每个画面只取「最完整的一次快照」。LABELS/BUTTONS/TABLES 直接来自抓取时的真实 DOM。', ''];
ordered.forEach((g, i) => {
  idx.push(indexSection(g, i));
  idx.push('');
  manifest.sections.push({
    n: i + 1, screen: g.name, snapshots: g.snaps.length,
    source: g.snaps.at(-1).abs, bytes: sizeOf(g.snaps.at(-1)),
  });
});
writeFileSync(join(outDir, '00-INDEX.md'), idx.join('\n'), 'utf-8');

// ── routes.md ───────────────────────────────────────────────────────
// What URL did this book actually visit, and did we know which screen it is?
// A missing route is why one real screen gets split into two pack sections
// (and why offline checks can pick the wrong snapshot). Fix ui-screens.json
// with exactly these paths.
const seen = new Map();
for (const p of pages) {
  const url = String(p.url || '');
  if (!url) continue;
  const path = url.replace(/^https?:\/\/[^/]+/, '').split('?')[0];
  if (!path) continue;
  const key = `${path}|${p.title || ''}`;
  if (!seen.has(key)) seen.set(key, { path, title: p.title || '', screen: p.screen || null, n: 0 });
  seen.get(key).n += 1;
}
const routeRows = [...seen.values()].sort((a, b) => a.path.localeCompare(b.path));
const lines = ['# OBSERVED ROUTES', '', 'path | page title | resolved screen | snapshots', ''];
for (const r of routeRows) {
  lines.push(`${r.path} | ${r.title || '?'} | ${r.screen || '!! NOT IN ui-screens.json'} | ${r.n}`);
}
writeFileSync(join(outDir, 'routes.md'), lines.join('\n'), 'utf-8');
const unmapped = routeRows.filter((r) => !r.screen);

// ── HTML parts ──────────────────────────────────────────────────────
let partNo = 0;
let buf = [];
let bufLen = 0;
const files = [];
function flush() {
  if (!buf.length) return;
  partNo += 1;
  const name = `${String(partNo).padStart(2, '0')}-screens.md`;
  writeFileSync(join(outDir, name), buf.join('\n'), 'utf-8');
  files.push({ file: name, chars: bufLen });
  buf = []; bufLen = 0;
}
if (!metaOnly) {
  for (const g of ordered) {
    const p = g.snaps.at(-1);
    const html = cleanHtml(readFileSync(p.abs, 'utf8'));
    const chunks = splitHtml(html, maxChars - 400);
    chunks.forEach((chunk, i) => {
      const k = chunks.length > 1 ? ` (part ${i + 1}/${chunks.length})` : '';
      const head = `\n===== SCREEN: ${g.name}${k} =====\n<!-- source ${basename(p.abs)} -->\n`;
      const block = head + chunk + '\n';
      if (bufLen && bufLen + block.length > maxChars) flush();
      buf.push(block); bufLen += block.length;
      if (bufLen > maxChars) flush();
    });
  }
  flush();
}

manifest.parts = files;
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1), 'utf-8');

const idxSize = readFileSync(join(outDir, '00-INDEX.md'), 'utf8').length;
console.log(`pack ${outDir}`);
console.log(`  screens ${ordered.length}  parts ${files.length}  index ${idxSize} chars${metaOnly ? '  (meta-only)' : ''}`);
console.log(`  routes ${routeRows.length}  unmapped ${unmapped.length}${unmapped.length ? '  (see routes.md — add these paths to ui-screens.json)' : ''}`);
for (const f of files) console.log(`  ${f.file}  ${f.chars} chars`);
for (const g of ordered) {
  console.log(`  ${String(g.snaps.length).padStart(2)} snaps  ${String(sizeOf(g.snaps.at(-1))).padStart(7)} B  ${g.name}${screens[g.name] ? '' : '   !! not in ui-screens.json'}`);
}
