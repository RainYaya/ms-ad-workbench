// Validate a patch file offline.
//
//   control-patch: every selector (or {value} template with its sample) must
//                  match exactly one VISIBLE element in the captured real DOM.
//   flow-patch:    only the five allowed override actions, each with a reason;
//                  expect / expected is rejected.
//
// Nothing is written unless every entry passes (--apply).
//
//   node check-patch.mjs --patch flows/patches/AZ-110-05-008.control.yaml \
//     --capture capture-20261028
//   node check-patch.mjs --patch flows/overrides/AZ-110-05-008.yaml   # flow-patch
//   node check-patch.mjs --patch ... --apply
//   node check-patch.mjs --patch ... --json out.json
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';
import { capturePageFor, checkSelectors, screenKeyFor } from './dom-check.mjs';
import { ROOT, applyControlGroups, existingEntry } from './patch-store.mjs';
import { compileFlow, norm } from './flow-loader.mjs';

const args = process.argv.slice(2);
const arg = (k, d = '') => {
  const i = args.indexOf('--' + k);
  return i >= 0 ? (args[i + 1] ?? '') : d;
};
const flag = (k) => args.includes('--' + k);

const patchPath = arg('patch');
const flowPath = arg('flow');
const capture = arg('capture');
const jsonOut = arg('json');
if (!patchPath && !flowPath) {
  console.error('usage: node check-patch.mjs (--patch <file.yaml> | --flow <flow.yaml>) [--capture DIR] [--apply] [--json out.json]');
  process.exit(2);
}
if (patchPath && flowPath) {
  console.error('use either --patch or --flow, not both');
  process.exit(2);
}

// ── flow mode: every compiled selector against the captured real DOM ──
// This is the check that L0 cannot do: L0 proves a label resolves to a string;
// this proves the string exists, exactly once and visibly, on the real page.
// A row-anchored template is `tr:has(<anchor predicate>) <control>`.
// Split it without a regex on nested parentheses, so the control part can be
// checked on its own when the anchor text is not in this capture.
function splitRowAnchor(sel) {
  const s = String(sel);
  const at = s.indexOf('tr:has(');
  if (at < 0) return null;
  let depth = 0, end = -1;
  for (let i = at + 'tr:has'.length; i < s.length; i += 1) {
    if (s[i] === '(') depth += 1;
    else if (s[i] === ')') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  if (end < 0) return null;
  const pred = s.slice(at + 'tr:has('.length, end);
  const rest = s.slice(end + 1).trim();
  const text = /text-is\("((?:[^"\\]|\\.)*)"\)/.exec(pred)?.[1]
    ?? /has-text\("((?:[^"\\]|\\.)*)"\)/.exec(pred)?.[1];
  if (!rest || text === undefined) return null;
  return { anchor: text, rest };
}

async function checkFlowAgainstCapture() {
  const flowAbs = resolve(process.cwd(), flowPath);
  const r = compileFlow(flowAbs);
  const out = { flow: flowPath, case: r.flow?.case, screens: [], rows: [], errors: [...r.errors], warnings: [], pending: [], noCapture: [] };
  for (const p of r.pendingRuntime) out.pending.push({ row: p.row, label: p.label, note: p.note || 'runtime-resolved' });
  if (out.errors.length) return out;

  const pages = new Map(); // screenName -> page | null
  const pageFor = (screen) => {
    const k = norm(screen);
    if (pages.has(k)) return pages.get(k);
    let p = null;
    try { if (capture) p = capturePageFor(capture, screen); } catch { p = null; }
    pages.set(k, p);
    return p;
  };

  // batch selectors per captured page
  const byPage = new Map(); // abs -> {page, screen, items: [{row, do, label, selector, kind}]}
  for (const s of r.steps) {
    if (!s.screen) continue;
    // Popup actions declare `popupScreen`; targets resolve against it while
    // the hand-procedure screen chain still uses `on`.
    const targetScreen = s.targetScreen || s.screen;
    for (const t of s.targets || []) {
      if (t.error) continue;
      const label = t.label || s.do;
      const add = (sel, kind) => {
        if (!sel || String(sel).startsWith('@dialog:')) {
          if (kind === 'dialog') out.pending.push({ row: s.row, label, note: 'browser dialog; not a DOM element' });
          return;
        }
        const page = pageFor(targetScreen);
        if (!page) {
          const key = String(targetScreen);
          if (!out.noCapture.some((x) => norm(x.screen) === norm(key))) out.noCapture.push({ screen: targetScreen, rows: [] });
          const nc = out.noCapture.find((x) => norm(x.screen) === norm(key));
          if (!nc.rows.includes(s.row)) nc.rows.push(s.row);
          return;
        }
        if (!byPage.has(page.abs)) byPage.set(page.abs, { page, screen: targetScreen, items: [] });
        byPage.get(page.abs).items.push({ row: s.row, do: s.do, label, selector: sel, kind });
      };
      if (t.parts) {
        for (const p of t.parts) { add(p.selector, 'part'); if (p.selectorPm) add(p.selectorPm, 'part'); }
      } else if (t.choices) {
        for (const [choice, sel] of Object.entries(t.choices)) add(sel, 'choice:' + choice);
      } else if (t.selector) {
        add(t.selector, 'selector');
      }
      // namePattern-only targets are already listed by compileFlow in
      // pendingRuntime; reporting them twice adds noise, not information.
    }
  }

  for (const { page, screen, items } of byPage.values()) {
    const sels = [...new Set(items.map((i) => i.selector))];
    const checked = await checkSelectors(page.abs, sels);
    const bySel = new Map(checked.map((c) => [c.selector, c]));
    out.screens.push({ screen, url: page.url, file: page.abs, selectors: sels.length });
    for (const it of items) {
      const c = bySel.get(it.selector) || { count: 0, visible: 0, error: 'not checked' };
      let verdict = c.error ? 'error' : c.count === 1 && c.visible === 1 ? 'ok' : 'error';
      let anchorMissing = null;
      // 0 matches on a row-anchored template usually means the capture was
      // recorded with different data than the hand book (行内テストデータ).
      // Prove the control part still exists, then report ANCHOR, not a wrong
      // selector. Guessing a replacement anchor is not allowed.
      if (verdict === 'error' && !c.error && c.count === 0) {
        const split = splitRowAnchor(it.selector);
        if (split) {
          const [rc] = await checkSelectors(page.abs, [split.rest]);
          if (rc && !rc.error && rc.count > 0) {
            verdict = 'anchor';
            anchorMissing = { anchor: split.anchor, controls: rc.count };
          }
        }
      }
      const row = { ...it, count: c.count, visible: c.visible, verdict, anchorMissing };
      out.rows.push(row);
      if (verdict === 'error') {
        out.errors.push(`row ${it.row} ${it.do} ${it.label}: ${c.error ? 'invalid selector' : `${c.count} match(es), ${c.visible} visible`} — ${it.selector}`);
      } else if (verdict === 'anchor') {
        out.warnings.push(`row ${it.row} ${it.do} ${it.label}: 行锚点 "${anchorMissing.anchor}" 不在这份 capture 里（控件本身命中 ${anchorMissing.controls} 个）。模板形状正确，锚点需在真实数据上验证 — ${it.selector}`);
      }
    }
  }
  return out;
}

if (flowPath) {
  const out = await checkFlowAgainstCapture();
  console.log(`flow  ${flowPath}` + (out.case ? `  (${out.case})` : ''));
  if (capture) console.log(`capture ${capture}`);
  for (const s of out.screens) console.log(`screen ${s.screen.padEnd(26)} ${s.url}`);
  for (const r of out.rows) {
    const tag = r.verdict === 'ok' ? 'OK    ' : r.verdict === 'anchor' ? 'ANCHOR' : 'FAIL  ';
    console.log(`  ${tag} row ${String(r.row).padStart(3)} ${String(r.do).padEnd(10)} ${String(r.label).padEnd(22)} ${r.selector}  (${r.count}/${r.visible})`);
  }
  for (const p of out.pending) console.log(`  PENDING row ${p.row} ${p.label}: ${p.note}`);
  for (const n of out.noCapture) console.log(`  NO-CAPTURE ${n.screen} (rows ${n.rows.join(',')}) — cannot verify offline`);
  for (const w of out.warnings) console.log(`  WARN ${w}`);
  for (const e of out.errors) console.log(`  ERROR ${e}`);
  const anchors = out.rows.filter((r) => r.verdict === 'anchor').length;
  console.log(`selectors ${out.rows.length}  errors ${out.errors.length}  anchor-missing ${anchors}  pending ${out.pending.length}  no-capture ${out.noCapture.length}`);
  if (anchors) console.log('ANCHOR = 模板形状已验（控件在页面上），但手顺的锚点值不在这份 capture 的数据里；必须在真实数据上再跑一次。');
  if (jsonOut) writeFileSync(resolve(process.cwd(), jsonOut), JSON.stringify(out, null, 1), 'utf8');
  process.exit(out.errors.length ? 1 : 0);
}

let doc;
try {
  doc = yamlLoad(readFileSync(resolve(process.cwd(), patchPath), 'utf8')) || {};
} catch (e) {
  console.error(`ERROR cannot read ${patchPath}: ${e.message}`);
  process.exit(1);
}
const kind = doc.kind || (Array.isArray(doc.overrides) ? 'flow-patch' : null);
if (!kind) {
  console.error("ERROR patch has no kind; expected 'control-patch' or 'flow-patch'");
  process.exit(1);
}

const result = { patch: patchPath, kind, target: null, screens: [], entries: [], errors: [], warnings: [], pending: [], applied: null };

// ── flow-patch ──────────────────────────────────────────────────────
function checkFlowPatch() {
  const caseId = doc.case || doc.book;
  if (!caseId) { result.errors.push('flow-patch: case (or book) is required'); return; }
  result.target = `flows/overrides/${caseId}.yaml`;
  const list = doc.overrides;
  if (!Array.isArray(list) || !list.length) { result.errors.push('flow-patch: overrides[] is empty'); return; }
  const ALLOWED = new Set(['row', 'skip', 'manual', 'do', 'capture', 'of', 'valueFrom', 'binding', 'reason', 'note']);
  for (const [i, o] of list.entries()) {
    const at = `override[${i}]`;
    if (!o || typeof o !== 'object') { result.errors.push(`${at}: not an object`); continue; }
    for (const k of Object.keys(o)) {
      if (k === 'expect' || k === 'expected') result.errors.push(`${at}: expect is not overridable`);
      else if (!ALLOWED.has(k)) result.errors.push(`${at}: unknown key '${k}'`);
    }
    if (typeof o.row !== 'number') result.errors.push(`${at}: row must be a number`);
    if (!o.reason && !o.note) result.errors.push(`${at}: reason required`);
    if (o.do && o.do !== 'manual') result.errors.push(`${at}: do may only be 'manual' (got '${o.do}')`);
    if (o.valueFrom && (!o.valueFrom.label || o.valueFrom.value === undefined)) {
      result.errors.push(`${at}: valueFrom needs {label, value}`);
    }
    if (o.binding && (!o.binding.label || !o.binding.selector)) {
      result.errors.push(`${at}: binding needs {label, selector}`);
    }
    result.entries.push({ row: o.row, action: Object.keys(o).filter((k) => k !== 'reason' && k !== 'note' && k !== 'row').join(',') });
  }
  if (flag('apply') && !result.errors.length) {
    const dst = join(ROOT, 'flows', 'overrides', `${caseId}.yaml`);
    if (existsSync(dst)) {
      const dir = join(ROOT, 'flows', '.backup');
      mkdirSync(dir, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      copyFileSync(dst, join(dir, `${caseId}.overrides.${stamp}.yaml`));
    }
    const out = { book: caseId, overrides: list };
    writeFileSync(dst, '# written by check-patch.mjs --apply\n' + yamlDump(out, { lineWidth: -1, noRefs: true }), 'utf8');
    result.applied = dst;
  }
}

// ── control-patch ───────────────────────────────────────────────────
function selectorsFor(entry) {
  if (entry.selector) return { selectors: [entry.selector] };
  if (entry.selectorTemplate) {
    if (!entry.sample) return { error: 'selectorTemplate needs sample (the anchor value used to verify it)' };
    let s = String(entry.selectorTemplate).replaceAll('{value}', String(entry.sample));
    const left = /\{([^{}]+)\}/.exec(s);
    if (left) return { error: `selectorTemplate still contains {${left[1]}} after sample substitution` };
    return { selectors: [s] };
  }
  if (entry.parts) {
    const sels = [];
    for (const p of entry.parts) {
      if (!p?.selector) return { error: `parts entry ${p?.part || '?'} has no selector` };
      sels.push(p.selector);
      if (p.selectorPm) sels.push(p.selectorPm);
    }
    return { selectors: sels };
  }
  if (entry.choices) {
    const sels = Object.values(entry.choices);
    if (!sels.length || sels.some((s) => !s)) return { error: 'choices needs at least one selector' };
    return { selectors: sels };
  }
  if (entry.namePattern) return { pending: `runtime-resolved: ${entry.namePattern}` };
  return { error: 'needs one of selector / selectorTemplate{sample} / parts / choices / namePattern' };
}

async function checkControlPatch() {
  const entries = doc.entries;
  if (!Array.isArray(entries) || !entries.length) { result.errors.push('control-patch: entries[] is empty'); return; }
  if (!capture) {
    result.errors.push('control-patch: --capture is required; a selector cannot be verified without the real DOM');
    return;
  }

  // A patch may cover several screens (one hand procedure visits many). Each
  // entry says its own screen; the top-level screen is only a default.
  const groups = new Map(); // screenName -> { sk, page, plan: [...] }
  for (const [i, e] of entries.entries()) {
    const at = `entry[${i}]${e?.label ? ' ' + e.label : ''}`;
    if (!e?.label) { result.errors.push(`${at}: label is required`); continue; }
    const screenName = e.screen || doc.screen;
    if (!screenName) { result.errors.push(`${at}: screen is required (set it on the entry or at the top)`); continue; }
    const sk = screenKeyFor(screenName);
    if (!sk) { result.errors.push(`${at}: screen not in ui-screens.json: ${screenName}`); continue; }
    if (!groups.has(sk.name)) {
      let page = null;
      try { page = capturePageFor(capture, sk.name); }
      catch (err) { result.errors.push(`${sk.name}: ${err.message}`); continue; }
      groups.set(sk.name, { sk, page, plan: [] });
    }
    const g = groups.get(sk.name);
    const s = selectorsFor(e);
    if (s.error) { result.errors.push(`${at}: ${s.error}`); continue; }
    if (s.pending) {
      result.pending.push({ label: e.label, screen: sk.name, note: s.pending });
      g.plan.push({ e, selectors: [] });
      continue;
    }
    g.plan.push({ e, selectors: s.selectors });
  }

  for (const { sk, page, plan } of groups.values()) {
    result.screens.push({ screen: sk.name, key: sk.key, url: page.url, file: page.abs });
    const all = [...new Set(plan.flatMap((p) => p.selectors))];
    let checked = [];
    if (all.length) {
      try {
        checked = await checkSelectors(page.abs, all);
      } catch (e) {
        result.errors.push(`${sk.name}: DOM check failed: ${e.message}`);
        continue;
      }
    }
    const bySel = new Map(checked.map((r) => [r.selector, r]));
    for (const p of plan) {
      const { e } = p;
      if (!p.selectors.length) continue;
      const row = { screen: sk.name, label: e.label, selectors: [], verdict: 'ok' };
      for (const sel of p.selectors) {
        const r = bySel.get(sel);
        const item = { selector: sel, count: r?.count ?? 0, visible: r?.visible ?? 0, error: r?.error || null };
        row.selectors.push(item);
        if (item.error) { result.errors.push(`${sk.name} / ${e.label}: invalid selector '${sel}': ${item.error}`); row.verdict = 'error'; }
        else if (item.count === 0) { result.errors.push(`${sk.name} / ${e.label}: 0 matches for '${sel}'`); row.verdict = 'error'; }
        else if (item.visible === 0) { result.errors.push(`${sk.name} / ${e.label}: '${sel}' exists but nothing is visible`); row.verdict = 'error'; }
        else if (item.count !== 1) {
          result.errors.push(`${sk.name} / ${e.label}: '${sel}' matches ${item.count} elements; needs a row anchor (selectorTemplate + sample)`);
          row.verdict = 'error';
        }
      }
      if (row.verdict === 'ok') {
        const prev = existingEntry(sk.key, e.label);
        const same = prev && (prev.selector || prev.selectorTemplate || prev.namePattern) ===
          (e.selector || e.selectorTemplate || e.namePattern);
        if (prev && !same) {
          result.warnings.push(`${sk.name} / ${e.label}: overlay already has '${prev.selector || prev.selectorTemplate || prev.namePattern || '(none)'}'; --apply replaces it`);
        }
      }
      result.entries.push(row);
    }
  }

  if (flag('apply') && !result.errors.length) {
    const groupsOut = [];
    for (const { sk, plan } of groups.values()) {
      const clean = plan.map(({ e }) => {
        const { sample, screen, ...rest } = e;
        return rest;
      }).filter((e) => e.label);
      groupsOut.push({ screenKey: sk.key, entries: clean });
    }
    const r = applyControlGroups(groupsOut);
    result.applied = { backup: r.backup, changes: r.changes.map((c) => ({ screen: c.screenKey, label: c.label, action: c.action })) };
  }
}

// ── run ─────────────────────────────────────────────────────────────
if (kind === 'control-patch') await checkControlPatch();
else if (kind === 'flow-patch') checkFlowPatch();
else {
  console.error(`ERROR unknown patch kind '${kind}' (expected control-patch or flow-patch)`);
  process.exit(2);
}

console.log(`patch ${patchPath}`);
console.log(`kind  ${kind}${result.target ? '  -> ' + result.target : ''}`);
for (const s of result.screens || []) console.log(`screen ${s.screen} -> ${s.key}  ${s.url}`);
for (const e of result.entries) {
  if (kind === 'flow-patch') {
    console.log(`  row ${String(e.row).padStart(3)}  ${e.action}`);
  } else {
    for (const s of e.selectors) {
      const flagTxt = s.count === 1 && s.visible === 1 ? 'OK  ' : 'FAIL';
      console.log(`  ${flagTxt} ${e.screen} / ${e.label}  ${s.selector}  (count ${s.count}, visible ${s.visible})`);
    }
  }
}
for (const p of result.pending) console.log(`  PENDING ${p.screen ? p.screen + ' / ' : ''}${p.label}: ${p.note} (not verifiable offline)`);
for (const w of result.warnings) console.log(`  WARN  ${w}`);
for (const e of result.errors) console.log(`  ERROR ${e}`);
console.log(`entries ${result.entries.length}  errors ${result.errors.length}  warnings ${result.warnings.length}  pending ${result.pending.length}`);
if (result.applied) console.log(`applied ${JSON.stringify(result.applied, null, 1)}`);
if (jsonOut) writeFileSync(resolve(process.cwd(), jsonOut), JSON.stringify(result, null, 1), 'utf8');
process.exit(result.errors.length ? 1 : 0);
