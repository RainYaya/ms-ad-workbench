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

function indexSection(g, n) {
  const meta = readMeta(g.snaps.at(-1));
  const lines = [];
  lines.push(`## ${n + 1}. ${g.name}`);
  const known = !!screens[g.name];
  if (!known) lines.push('!! ui-screens.json にこの名前が無い（画面名は page title から採った。手顺の画面名と突き合わせること）');
  lines.push(`snapshots: ${g.snaps.length}  latest: ${basename(g.snaps.at(-1).abs)}  size: ${sizeOf(g.snaps.at(-1))}`);
  const rawTitle = meta?.title || g.snaps.at(-1).title || '';
  if (rawTitle && rawTitle !== g.name) lines.push(`page title: ${rawTitle}`);
  const url = meta?.url || g.snaps.at(-1).url || '';
  if (url) lines.push(`url: ${url}`);
  if (meta?.pairs?.length) {
    lines.push('LABELS (手顺措辞 → 控件):');
    for (const p of meta.pairs.slice(0, 120)) {
      lines.push(`  ${p.label} → ${p.tag || '?'}#${p.id || '?'}`);
    }
  }
  if (meta?.buttons?.length) {
    lines.push('BUTTONS:');
    for (const b of meta.buttons.slice(0, 80)) {
      lines.push(`  ${b.label || '(no label)'} → ${b.id || '?'}${b.disabled ? ' [disabled]' : ''}`);
    }
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
