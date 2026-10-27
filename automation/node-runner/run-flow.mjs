// run-flow.mjs - execute a flow file. Never close the browser on failure.
//
//   node run-flow.mjs flows/AZ-110-01-009.yaml --base http://127.0.0.1:10083
//   node run-flow.mjs flows/AZ-110-01-009.yaml --live --base https://SUT/
//   node run-flow.mjs flows/AZ-110-01-009.yaml --headless --yes
//   node run-flow.mjs flows/AZ-110-01-009.yaml --shots all
//   node run-flow.mjs flows/AZ-110-01-009.yaml --to-row 30 --dump
//
// --row N      resume at a row only if the browser state is already there
//              (a fresh run starts at flow.start.url; it cannot skip actions)
// --to-row N   stop after row N
// --dump       on failure, print the form's current values (diagnostic only)
//
// Kernel: docs/rpa/11-KERNEL.md. 17 primitives, state-checked, fail-stop.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { compileFlow, interpolate, norm, resolveValue, dictSelector } from './flow-loader.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../..');
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : d; };
const flag = (n) => process.argv.includes('--' + n);

const flowArg = process.argv[2];
if (!flowArg || flowArg.startsWith('--')) {
  console.error('usage: node run-flow.mjs <flows/XXX.yaml> [--base URL] [--live] [--demo [--demo-delay MS]] [--headless] [--yes] [--row N] [--to-row N] [--start-url URL] [--login [--login-url URL]] [--slow MS] [--shots all|required|failures|none]');
  process.exit(2);
}
const flowPath = resolve(process.cwd(), flowArg);
const baseUrl = arg('base', 'http://127.0.0.1:10083/AMB/dummy.html');
const live = flag('live');
const demo = flag('demo');
// Demo mode is a presentation: it needs a visible window.
const headed = demo || !flag('headless');
const autoYes = flag('yes');
const startRow = Number(arg('row', '0')) || 0;
const endRow = Number(arg('to-row', '0')) || 0;
// Demo mode: a step banner in the page + a highlight on the target + a
// configurable pause. --slow is the older, dumber version (sleep only).
const demoDelay = demo ? (Number(arg('demo-delay', '')) || Number(arg('slow', '')) || 1200) : 0;
const slow = demo ? 0 : (Number(arg('slow', '0')) || 0);

const outDir = resolve(ROOT, 'logs', basename(flowPath).replace(/\.ya?ml$/, '') + '-flow');
mkdirSync(outDir, { recursive: true });

const { flow, steps, values, errors, pendingRuntime } = compileFlow(flowPath);
const caseId = flow.case || basename(flowPath);
const evidencePolicy = arg('shots', flow.evidencePolicy || 'required');

console.log('');
console.log('=== ' + caseId + ' ===');
console.log('steps ' + steps.length + '  values ' + Object.keys(values).length + '  errors ' + errors.length);
if (errors.length) { console.log('ERRORS:'); errors.forEach((e) => console.log('  ' + e)); }
if (pendingRuntime.length) {
  console.log('pendingRuntime ' + pendingRuntime.length + ' (resolve on the real box):');
  pendingRuntime.forEach((p) => console.log('  row ' + p.row + '  ' + p.label + '  (' + (p.namePattern || '-') + ')'));
}
if (errors.length && !flag('force')) {
  console.error('');
  console.error('compile errors. --force to ignore (not recommended).');
  process.exit(3);
}

const screens = (() => {
  try { return JSON.parse(readFileSync(join(ROOT, 'ui-screens.json'), 'utf8')).screens || {}; } catch { return {}; }
})();

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));
let overrideAll = autoYes;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── demo mode ───────────────────────────────────────────────────────
// The browser shows what is happening: a banner with the hand-procedure row,
// primitive, screen and target; a red box on the control about to be used;
// and a pause gate. Space (in the page) pauses/resumes between actions.
async function demoInstall(pg) {
  if (!demo || !pg || pg.isClosed()) return;
  try {
    await pg.evaluate(() => {
      if (window.__rpaDemoReady) return;
      window.__rpaDemoReady = true;
      window.__rpaPaused = false;
      const style = document.createElement('style');
      style.textContent = [
        '#__rpa_demo_banner{position:fixed;left:0;right:0;top:0;z-index:2147483647;background:rgba(17,17,17,.94);color:#fff;',
        'font:600 15px/1.55 system-ui,sans-serif;padding:8px 14px;pointer-events:none;white-space:pre-wrap;',
        'box-shadow:0 2px 10px rgba(0,0,0,.35)}',
        '#__rpa_demo_badge{position:fixed;right:14px;bottom:14px;z-index:2147483647;display:none;',
        'background:#ff3b30;color:#fff;font:700 14px system-ui;padding:10px 14px;border-radius:6px;pointer-events:none}',
      ].join('');
      document.documentElement.appendChild(style);
      const banner = document.createElement('div');
      banner.id = '__rpa_demo_banner';
      banner.textContent = 'RPA demo — 准备中';
      document.documentElement.appendChild(banner);
      const badge = document.createElement('div');
      badge.id = '__rpa_demo_badge';
      badge.textContent = 'PAUSED — Space 继续';
      document.documentElement.appendChild(badge);
      window.addEventListener('keydown', (e) => {
        if (e.code !== 'Space') return;
        // Space must not scroll the page or re-trigger a focused button.
        e.preventDefault();
        e.stopPropagation();
        window.__rpaPaused = !window.__rpaPaused;
        badge.style.display = window.__rpaPaused ? 'block' : 'none';
      }, true);
    });
  } catch { /* a page that navigated mid-evaluate is not an error */ }
}

function demoDescribe(step) {
  const t = (step.targets || [])[0];
  const lines = [];
  if (step.do === 'screenIs') {
    lines.push('画面を確認: ' + (step.screen || ''));
  } else if (t) {
    const bits = [];
    if (t.label) bits.push(t.label);
    if (t.selector) bits.push(String(t.selector));
    if (t.anchor !== undefined && t.anchor !== null) bits.push('行锚点=' + t.anchor);
    if (t.value !== undefined && t.value !== null) bits.push('値=' + t.value);
    lines.push(bits.join('   '));
  } else if (step.do === 'manual') {
    lines.push(step.note || '');
  } else if (step.do === 'capture') {
    lines.push('証跡: ' + (step.evidence || 'capture'));
  }
  return lines.join('\n');
}

async function demoBanner(pg, step) {
  if (!demo) return;
  const head = `r${step.row}  ${step.do}   ${step.screen || ''}`;
  const body = demoDescribe(step);
  console.log('  ┌ ' + head);
  if (body) for (const line of body.split('\n')) console.log('  │ ' + line);
  if (!pg || pg.isClosed()) return;
  await pg.evaluate((text) => {
    const b = document.getElementById('__rpa_demo_banner');
    if (b) b.textContent = text;
  }, head + (body ? '\n' + body : '')).catch(() => {});
}

async function demoHighlight(pg, step) {
  if (!demo || !pg || pg.isClosed()) return;
  const t = (step.targets || [])[0];
  if (!t?.selector || String(t.selector).startsWith('@dialog:')) return;
  try {
    const loc = pg.locator(t.selector).first();
    const box = await loc.boundingBox({ timeout: 1200 });
    if (!box) return;
    const label = t.label || '';
    await pg.evaluate(({ x, y, w, h, label }) => {
      let el = document.getElementById('__rpa_demo_hl');
      if (!el) {
        el = document.createElement('div');
        el.id = '__rpa_demo_hl';
        el.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;border-radius:4px;'
          + 'border:3px solid #ff3b30;box-shadow:0 0 0 4px rgba(255,59,48,.22),0 0 18px rgba(255,59,48,.55);'
          + 'transition:left .12s,top .12s,width .12s,height .12s';
        document.documentElement.appendChild(el);
      }
      Object.assign(el.style, {
        left: Math.max(0, x - 3) + 'px', top: Math.max(0, y - 3) + 'px',
        width: (w + 6) + 'px', height: (h + 6) + 'px', display: 'block',
      });
      let tag = document.getElementById('__rpa_demo_tag');
      if (!tag) {
        tag = document.createElement('div');
        tag.id = '__rpa_demo_tag';
        tag.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;background:#ff3b30;color:#fff;'
          + 'font:700 12px system-ui;padding:2px 6px;border-radius:3px';
        document.documentElement.appendChild(tag);
      }
      tag.textContent = label;
      tag.style.left = Math.max(0, x - 3) + 'px';
      tag.style.top = Math.max(0, y - 26) + 'px';
    }, { x: box.x, y: box.y, w: box.width, h: box.height, label });
  } catch { /* detached element / closed popup: keep going */ }
}

async function demoClear(pg) {
  if (!demo || !pg || pg.isClosed()) return;
  await pg.evaluate(() => {
    for (const id of ['__rpa_demo_hl', '__rpa_demo_tag']) document.getElementById(id)?.remove();
  }).catch(() => {});
}

async function demoPauseGate(pg) {
  if (!demo) return;
  let announced = false;
  for (;;) {
    let paused = false;
    try { paused = pg && !pg.isClosed() ? await pg.evaluate(() => !!window.__rpaPaused) : false; } catch { paused = false; }
    if (!paused) return;
    if (!announced) {
      console.log('  PAUSED — 浏览器窗口里按 Space 继续');
      announced = true;
    }
    await sleep(150);
  }
}

async function demoWait(pg, ms) {
  if (!demo || ms <= 0) return;
  const end = Date.now() + ms;
  while (Date.now() < end) {
    await demoPauseGate(pg);
    await sleep(Math.min(120, Math.max(0, end - Date.now())));
  }
}

async function waitForPopup(timeout = 5000) {
  const end = Date.now() + timeout;
  while (!popupPage || popupPage.isClosed()) {
    if (Date.now() > end) return null;
    await sleep(100);
  }
  return popupPage;
}

const browser = await chromium.launch({ headless: !headed, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, ignoreHTTPSErrors: true });
const page = await context.newPage();

// Dialogs are auto-accepted so a confirm() does not hang the run, but their
// text is kept: messageIs() checks it, and failures show it.
const dialogs = [];
const downloads = [];
const trace = [];
const evidence = [];
const seenHashes = new Set();
const missing = new Set();
let popupPage = null;
let keepOpen = false;
let activeScreen = null;
const pageRowIndex = new WeakMap(); // page -> { screen, index } resolved by a prior row step
let shotSeq = 0;
let downloadSeq = 0;

function watchPage(p) {
  // Demo mode survives navigation: every new document gets the banner and the
  // Space listener again.
  p.on('domcontentloaded', () => { if (demo) demoInstall(p).catch(() => {}); });
  // Browser dialogs are auto-accepted so a confirm() never hangs the run.
  // The record carries the type so a hand-procedure row 「OK」押下 can be
  // verified against the dialog the previous step triggered. `consumed`
  // keeps one row from matching the same dialog twice.
  p.on('dialog', (d) => {
    dialogs.push({ url: p.url(), type: d.type(), text: d.message(), at: Date.now(), consumed: false });
    d.accept().catch(() => {});
  });
  p.on('download', (d) => {
    const suggested = d.suggestedFilename() || 'download.bin';
    // The downloaded file is the evidence for 出力（DL） rows. Keep it next to
    // the screenshots with its hash, so "download happened" can be checked
    // later without re-running.
    const file = String(++downloadSeq).padStart(3, '0') + '_' +
      suggested.replace(/[\\/:*?"<>|]/g, '_');
    const rec = { url: p.url(), name: suggested };
    rec.promise = (async () => {
      try {
        await d.saveAs(join(outDir, file));
        const buf = readFileSync(join(outDir, file));
        rec.file = file;
        rec.bytes = buf.length;
        rec.sha256 = createHash('sha256').update(buf).digest('hex');
      } catch (e) {
        rec.saveError = e.message;
      }
    })();
    downloads.push(rec);
  });
}
watchPage(page);
context.on('page', (p) => { watchPage(p); popupPage = p; p.on('close', () => { if (popupPage === p) popupPage = null; }); });

function runtimeUrl(u) {
  const s = String(u || '');
  if (/^https?:/.test(s)) return s;
  const b = new URL(baseUrl);
  return new URL(s.replace(/^\//, ''), b.origin + '/').href;
}

function codeFromUrl(u) {
  // Two shapes exist:
  //   /AMB/AMA03.html      — app directory, screen in the file name
  //   /AMA18/aZG905Search  — POST route, screen in the first directory
  // The file name wins: the app directory can look like a code (AMC00/AMC22.html
  // must report AMC22, not AMC00).
  const s = String(u || '');
  const path = s.split(/[?#]/)[0];
  const segs = path.split('/').filter(Boolean);
  const base = segs[segs.length - 1] || '';
  const file = base.match(/^(AMA\d{2}|AMC\d{2}|ANA\d{2}|insurance_item_select|system_error)(?:\.|$)/i);
  if (file) return file[1];
  const route = path.match(/\/(AMA\d{2}|AMC\d{2}|ANA\d{2}|insurance_item_select|system_error)(?:\/|$)/i);
  return route ? route[1] : null;
}

// Which hand-procedure screens can this URL be?
//
// A declared route is more specific than the controller code. The real SUT
// serves two different hand-procedure screens from the same code: the menu is
// /AMA01?gamid=... and 新規入力 is /AMA01/aZG001To03. Matching by code alone
// would let a 遷移 assertion pass on the previous screen and act on the wrong
// one. routes[] in ui-screens.json is made from verified captures, so when a
// URL matches a route it identifies exactly one screen; the code is only the
// fallback for URLs that have no route entry (the mock, mostly).
function screenNamesForUrl(u) {
  const routed = [];
  for (const [name, meta] of Object.entries(screens)) {
    if ((meta.routes || []).some((r) => r && u.includes(r))) routed.push(name);
  }
  if (routed.length) return routed;
  const code = codeFromUrl(u);
  if (!code) return [];
  return Object.entries(screens)
    .filter(([, meta]) => norm(meta.code) === norm(code))
    .map(([name]) => name);
}

// Accepts a step or a screen name, so 遷移 / expects / waitUntil all use one
// rule. Returns the actual URL, which is what the failure message needs.
async function waitForScreen(step, timeoutMs = 10000) {
  const name = typeof step === 'string' ? step : step?.screen;
  if (!name) return { ok: true, code: null, url: (typeof step === 'string' ? page : activePage(step)).url() };
  const want = norm(name);
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const pages = context.pages().filter((p) => !p.isClosed());
    for (const p of pages) {
      const u = p.url();
      if (screenNamesForUrl(u).some((n) => norm(n) === want)) {
        return { ok: true, code: codeFromUrl(u), url: u, page: p };
      }
    }
    if (Date.now() > deadline) {
      return { ok: false, want: name, urls: pages.map((p) => p.url()).join(' | ') };
    }
    await sleep(200);
  }
}

function activePage(step) {
  if (step && step.popup && popupPage && !popupPage.isClosed()) return popupPage;
  return page;
}

function safeName(s) {
  return String(s || '').replace(/[\/:*?"<>|\s]/g, '_').slice(0, 50);
}

// ── evidence ────────────────────────────────────────────────────────
async function capture(opts = {}) {
  const { of = 'viewport', step = {}, pg = null, required = false, tag = '' } = opts;
  const targetPage = pg || activePage(step);
  shotSeq += 1;
  const prefix = String(shotSeq).padStart(3, '0') + '_r' + String(step.row ?? '000');
  const name = safeName(tag || step.name || step.evidence || step.do || 'shot');
  const base = prefix + '_' + name;
  const written = [];
  const errs = [];
  const emit = async (p, suffix, fullPage) => {
    try {
      const buf = await p.screenshot({ fullPage: !!fullPage, timeout: 8000 });
      const sha = createHash('sha256').update(buf).digest('hex');
      if (seenHashes.has(sha)) return null;
      seenHashes.add(sha);
      const file = base + suffix + '.png';
      writeFileSync(join(outDir, file), buf);
      return { file, bytes: buf.length, sha, of: fullPage ? 'fullpage' : 'viewport', url: p.url() };
    } catch (e) {
      errs.push(String(e.message).split('\n')[0]);
      return null;
    }
  };

  if (of === 'dom') {
    try {
      const html = await targetPage.content();
      const file = base + '.html';
      writeFileSync(join(outDir, file), html, 'utf8');
      written.push({ file, of: 'dom', url: targetPage.url() });
    } catch (e) { errs.push(String(e.message).split('\n')[0]); }
  } else if (of === 'element') {
    const t = (step.targets || [])[0];
    if (!t) { errs.push('capture element: no target'); }
    else {
      try {
        const { loc } = await findLocator(t);
        const buf = await loc.screenshot({ timeout: 8000 });
        const sha = createHash('sha256').update(buf).digest('hex');
        if (!seenHashes.has(sha)) {
          seenHashes.add(sha);
          const file = base + '_el.png';
          writeFileSync(join(outDir, file), buf);
          written.push({ file, bytes: buf.length, sha, of: 'element', url: targetPage.url() });
        }
      } catch (e) { errs.push(String(e.message).split('\n')[0]); }
    }
  } else if (of === 'all') {
    const pages = context.pages().filter((p) => !p.isClosed());
    for (let i = 0; i < pages.length; i++) {
      const r = await emit(pages[i], '_p' + i, false);
      if (r) written.push(r);
    }
  } else if (of === 'popup') {
    const p = popupPage && !popupPage.isClosed() ? popupPage : targetPage;
    const r = await emit(p, '', false);
    if (r) written.push(r);
  } else {
    const r = await emit(targetPage, '', of === 'fullpage');
    if (r) written.push(r);
  }

  for (const w of written) {
    evidence.push({ row: step.row, screen: step.screen, evidence: step.evidence || null, ...w });
  }
  if (!written.length && required) {
    throw new Error('capture failed (required): ' + (errs.join('; ') || 'no output'));
  }
  return written;
}

async function onFailureCapture(step, err) {
  await capture({ of: 'viewport', step, tag: 'FAIL', required: false }).catch(() => {});
  await capture({ of: 'dom', step, tag: 'FAIL', required: false }).catch(() => {});
}

// Diagnostic only (--dump). Reads values; never calls formValidate(), because
// its showValidateMessage() raises alert() and moves focus.
async function dumpForm(pg) {
  try {
    const info = await pg.evaluate(() => {
      const f = document.querySelector('form');
      if (!f) return { form: false, url: location.href };
      const els = [...f.elements].filter((e) => e.name).map((e) => {
        let v = e.value;
        let text = null;
        if (e.tagName === 'SELECT') text = e.options[e.selectedIndex]?.text?.trim() ?? '';
        if (e.type === 'checkbox' || e.type === 'radio') v = e.checked ? 'checked' : 'unchecked';
        return { name: e.name, tag: e.tagName.toLowerCase(), type: e.type || '', value: String(v ?? '').slice(0, 80), text };
      });
      return {
        form: true, action: f.getAttribute('action'), url: location.href,
        import_flag: !!f.import_flag?.checked, company_kbn: f.company_kbn?.value ?? null, els,
      };
    });
    console.log('  FORM ' + JSON.stringify(info));
  } catch (e) { console.log('  FORM dump failed: ' + e.message); }
}

// ── locators ────────────────────────────────────────────────────────
function escapeRe(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// A rowfield name is a per-row name: list[{n}].inquiry_contents_edit_flag.
// The hand procedure acts on the row that the preceding search selected, so
// the index is not written in the flow. Resolution order:
//   1. exactly one index exists on the page -> use it
//   2. exactly one displayed table row carries this name family -> use its index
//   3. otherwise error. 0 rows, 2+ rows, or 2+ indices = never a guess.
async function resolveRowName(pg, namePattern) {
  if (!namePattern || !namePattern.includes('{n}')) return namePattern || null;
  const re = new RegExp('^' + namePattern.split('{n}').map(escapeRe).join('(\\d+)') + '$');
  const prefix = new RegExp('^' + escapeRe(namePattern.slice(0, namePattern.indexOf('{n}'))) + '(\\d+)');
  const r = await pg.evaluate(([src, prefixSrc]) => {
    const rx = new RegExp(src);
    const px = new RegExp(prefixSrc);
    const names = [...document.querySelectorAll('[name]')].map((e) => e.getAttribute('name') || '');
    const idx = [...new Set(names.map((n) => {
      const m = rx.exec(n);
      return m ? m[1] : null;
    }).filter((x) => x !== null))];
    const rows = [];
    for (const tr of document.querySelectorAll('tr')) {
      const found = new Set();
      for (const el of tr.querySelectorAll('[name]')) {
        const m = px.exec(el.getAttribute('name') || '');
        if (m) found.add(m[1]);
      }
      if (found.size) rows.push([...found]);
    }
    return { idx, rows };
  }, [re.source, prefix.source]);
  if (r.idx.length === 1) return rememberRow(pg, namePattern.replace('{n}', r.idx[0]), r.idx[0]);
  // Nested <tr> (table inside a table cell) reports the same row twice; collapse
  // identical index sets before deciding.
  const rowSets = [...new Set(r.rows.map((x) => x.join(',')))].map((s) => s.split(','));
  if (rowSets.length === 1 && rowSets[0].length === 1) {
    return rememberRow(pg, namePattern.replace('{n}', rowSets[0][0]), rowSets[0][0]);
  }
  if (!r.idx.length) return null;
  // Some mock/template rows name only one control in the row (e.g. the visible
  // 検索 button) while the sibling (修) lost its name in the mock. Reuse the
  // row index resolved by an earlier step on this same screen; it is still a
  // real row on the page, not an invented one.
  const cur = pageRowIndex.get(pg);
  if (cur && cur.screen === activeScreen && r.idx.includes(cur.index)) {
    return namePattern.replace('{n}', cur.index);
  }
  throw new Error('rowfield ambiguous: ' + namePattern +
    ' indices[' + r.idx.join(',') + '] rows[' + rowSets.map((x) => x.join('+')).join(' | ') + ']');
}

function rememberRow(pg, name, index) {
  pageRowIndex.set(pg, { screen: activeScreen, index });
  return name;
}

// T2: exact label text -> the control(s) between this label and the next
// label. Climbing to the whole .item is too coarse (one .item holds several
// fields, so 募集人ID would pick up 契約者名 and the "...." button).
async function resolveByLabel(pg, label) {
  const r = await pg.evaluate((label) => {
    const isTitle = (el) => el.matches('.gyoumu_field_title, .field_title, label, th, dt');
    const cands = [...document.querySelectorAll('.gyoumu_field_title, .field_title, label, th, dt')]
      .filter((el) => (el.textContent || '').trim() === label);
    if (cands.length !== 1) return { count: cands.length, how: 'labels' };
    const start = cands[0];
    if (start.tagName === 'LABEL' && start.htmlFor) {
      const id = window.CSS && CSS.escape ? CSS.escape(start.htmlFor) : start.htmlFor;
      return { selector: '#' + id };
    }
    const ctrls = [];
    for (let n = start.nextElementSibling; n; n = n.nextElementSibling) {
      if (isTitle(n)) break;
      if (n.matches('input,select,textarea,button,a')) ctrls.push(n);
      ctrls.push(...n.querySelectorAll('input,select,textarea,button,a'));
    }
    if (ctrls.length !== 1) {
      // A field row often has both the input and a "...." popup trigger.
      // Prefer the single readable control; buttons are used only when there
      // is no readable control (a label that names a button).
      const readable = ctrls.filter((c) => c.matches('input:not([type=button]):not([type=submit]):not([type=hidden]),select,textarea'));
      if (readable.length === 1) {
        const c = readable[0];
        if (c.id) {
          const id = window.CSS && CSS.escape ? CSS.escape(c.id) : c.id;
          return { selector: '#' + id };
        }
        if (c.name) return { selector: '[name="' + c.name.replace(/"/g, '\\"') + '"]' };
      }
      return { count: ctrls.length, how: 'controls', tags: ctrls.map((c) => c.tagName.toLowerCase() + ':' + (c.id || c.name || '')) };
    }
    const c = ctrls[0];
    if (c.id) {
      const id = window.CSS && CSS.escape ? CSS.escape(c.id) : c.id;
      return { selector: '#' + id };
    }
    if (c.name) return { selector: '[name="' + c.name.replace(/"/g, '\\"') + '"]' };
    return { count: 1, how: 'no-id' };
  }, label);
  if (!r.selector) {
    throw new Error(`T2 label '${label}': ${r.how} ${r.count ?? ''} ${r.tags ? r.tags.join(',') : ''}`.trim());
  }
  return r.selector;
}

// A row that presses the browser dialog's OK is not a DOM click. The dialog
// was already accepted by the handler; here we only assert that it happened,
// and which type (confirm/alert) it was.
async function takeDialog(want, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const hit = dialogs.find((d) => !d.consumed && (want === 'any' || d.type === want));
    if (hit) { hit.consumed = true; return hit; }
    if (Date.now() > deadline) {
      const seen = dialogs.map((d) => `${d.type}:${d.text}`).join(' | ') || 'none';
      throw new Error(`dialog(${want}) did not appear; dialogs so far: ${seen}`);
    }
    await sleep(150);
  }
}

async function findLocator(t, timeoutMs) {
  const deadline = Date.now() + (timeoutMs || 15000);
  let lastLabelError = null;
  for (;;) {
    const pages = context.pages().filter((p) => !p.isClosed());
    for (const pg of pages.slice().reverse()) {
      let loc = null;
      if (t.selector) loc = pg.locator(t.selector).first();
      else if (t.kind === 'rowfield' && t.namePattern) {
        const name = await resolveRowName(pg, t.namePattern);
        if (name) loc = pg.locator('[name="' + name + '"]').first();
      } else if (t.kind === 'label' && t.label) {
        // T2: exact label text, controls between it and the next label.
        try {
          loc = pg.locator(await resolveByLabel(pg, t.label)).first();
        } catch (e) {
          lastLabelError = e.message;
        }
      }
      if (!loc) continue;
      const n = await loc.count().catch(() => 0);
      if (n > 0) return { loc, page: pg };
    }
    if (Date.now() > deadline) {
      if (lastLabelError) throw new Error(lastLabelError);
      const urls = pages.map((p) => p.url()).join(' | ');
      throw new Error('element not found: ' + (t.selector || t.label) + ' (pages: ' + urls + ')');
    }
    await sleep(200);
  }
}

function normText(s) {
  // Select option labels differ by full-width spaces / punctuation between
  // the mock and the hand procedure ("00 ： 自賠責" vs "00：自賠責").
  // NFKC + whitespace removal is spelling only; it never picks between
  // different options (an ambiguity still fails below).
  return String(s ?? '').normalize('NFKC').replace(/\s+/g, '').replace(/[－ーｰ]/g, '-');
}

async function selectByText(loc, label, val) {
  const want = normText(val);
  const options = await loc.locator('option').evaluateAll((els) =>
    els.map((e) => ({ value: e.value, text: (e.textContent || '').trim() })));
  const hits = options.filter((o) => o.text === String(val));
  let hit = hits.length === 1 ? hits[0] : null;
  if (!hit) {
    const nh = options.filter((o) => normText(o.text) === want);
    if (nh.length === 1) hit = nh[0];
  }
  if (!hit) {
    const vh = options.filter((o) => String(o.value) === String(val));
    if (vh.length === 1) hit = vh[0];
  }
  if (!hit) {
    throw new Error('select did not match: ' + label + ' want=' + val +
      ' options=[' + options.map((o) => o.text).filter(Boolean).join(' | ') + ']');
  }
  await loc.selectOption(hit.value);
  const got = await loc.inputValue().catch(() => null);
  if (got !== null && String(got) !== String(hit.value)) {
    throw new Error('select did not stick: ' + label + ' want=' + val + ' got=' + got);
  }
  return hit;
}

async function fillOne(s, label, pg) {
  const t = (s.targets || []).find((x) => x.label === label) || { label };
  const spec = values[label];
  // Explicit target value (fillAll {label,value}) wins when the label has no
  // flow-level value of its own. Manual 'v' overrides still live in values.
  if (!spec && (t.value === undefined || t.value === null)) { missing.add(label); return false; }
  const val = spec ? (spec.resolved !== undefined ? spec.resolved : spec.value) : t.value;
  if (val === '' || val === undefined || val === null) return false;
  if (t.parts) {
    const raw = String(val);
    const m = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(?:[ T](\d{1,2}):(\d{2}))?$/.exec(raw.trim());
    if (!m) throw new Error('datetime value is not YYYY/MM/DD HH:MM: ' + label + ' ' + raw);
    const [yyyy, MM, dd] = [m[1], m[2].padStart(2, '0'), m[3].padStart(2, '0')];
    const h24 = Number(m[4] ?? '0');
    const mi = m[5] ?? '00';
    const parts = { yyyy, MM, dd, ampm: h24 < 12 ? '0' : '1', hh12: String(h24 % 12), mm: mi };
    for (const p of t.parts) {
      const v = parts[p.part];
      if (v === undefined) throw new Error('datetime part unknown: ' + p.part);
      if (p.part === 'ampm') {
        const radio = pg.locator(v === '0' ? p.selector : p.selectorPm).first();
        await radio.check();
        if (!(await radio.isChecked().catch(() => false))) throw new Error('ampm did not stick: ' + v);
        continue;
      }
      const loc = pg.locator(p.selector).first();
      await loc.fill(v);
      const got = await loc.inputValue().catch(() => null);
      if (got !== null && String(got) !== String(v)) {
        throw new Error('datetime part did not stick: ' + p.part + ' want=' + v + ' got=' + got);
      }
    }
    return true;
  }
  if (t.choices) {
    // A radio group is one hand-procedure label but several controls. The
    // dictionary maps the visible choice text to its selector, so the value
    // is checked by name, never by position.
    const key = Object.keys(t.choices).find((k) => normText(k) === normText(val));
    if (!key) throw new Error('radio choice unknown: ' + label + ' want=' + val +
      ' choices=[' + Object.keys(t.choices).join(' | ') + ']');
    const radio = pg.locator(t.choices[key]).first();
    await radio.check();
    if (!(await radio.isChecked().catch(() => false))) throw new Error('radio did not stick: ' + label + ' ' + key);
    return true;
  }
  const { loc } = await findLocator(t);
  const info = await loc.evaluate((el) => ({
    tag: el.tagName.toLowerCase(), type: el.type || null,
    disabled: !!el.disabled, readonly: !!el.readOnly,
  })).catch(() => ({}));

  if (info.type === 'hidden') {
    await loc.evaluate((el, v) => { el.value = v; }, String(val));
    return true;
  }
  if (info.disabled || info.readonly) {
    missing.add(label);
    console.log('  SKIP readonly/disabled: ' + label);
    return false;
  }
  if (info.tag === 'select') {
    await selectByText(loc, label, val);
    return true;
  } else if (info.type === 'checkbox' || info.type === 'radio') {
    if (typeof val !== 'boolean') throw new Error('checkbox value must be boolean: ' + label + ' got=' + JSON.stringify(val));
    if (val) await loc.check(); else await loc.uncheck();
    const on = await loc.isChecked().catch(() => null);
    if (on !== null && on !== val) throw new Error('check did not stick: ' + label + ' want=' + val + ' got=' + on);
  } else if (info.tag === 'textarea' || info.tag === 'input') {
    await loc.fill(String(val));
  } else {
    missing.add(label);
    return false;
  }

  if (info.type !== 'hidden' && info.tag !== 'select' && info.type !== 'checkbox' && info.type !== 'radio') {
    const got = await loc.inputValue().catch(() => null);
    if (got !== null && String(got) !== String(val)) {
      throw new Error('fill did not stick: ' + label + ' want=' + val + ' got=' + got);
    }
  }
  return true;
}

function anchorMatches(text, anchor) {
  // The hand procedure names a row by one column value ("T0"), while the
  // control's visible text is the full row ("T0：損保取引確認書"). A prefix
  // only counts when the next character is a boundary, so T0 never matches
  // T00. Anything still ambiguous is an error.
  const t = String(text ?? '').trim();
  const a = String(anchor ?? '').trim();
  if (!t || !a) return false;
  if (t === a) return true;
  if (!t.startsWith(a)) return false;
  return !/[0-9A-Za-z]/.test(t.charAt(a.length));
}

async function chooseRow(s, pg) {
  const t = (s.targets || [])[0];
  if (!t) throw new Error('chooseRow: no target');
  if (t.selector) {
    // A dictionary target for a result-row control must resolve to exactly
    // one element. Clicking .first() when the search returned several rows
    // would be a guess, so it is an error.
    const loc = pg.locator(t.selector);
    const n = await loc.count();
    if (n !== 1) throw new Error('chooseRow: selector matched ' + n + ': ' + t.selector);
    await loc.click({ timeout: 15000 });
    return { how: 'selector' };
  }
  const anchor = String(t.anchor ?? t.value ?? '');
  if (!anchor) throw new Error('chooseRow: empty anchor');
  const base = (t.namePattern || '').split('[')[0];
  const rows = pg.locator('tr').filter({ hasText: anchor });
  const n = await rows.count();
  if (n > 1) throw new Error('chooseRow: anchor ambiguous: ' + anchor + ' (' + n + ' rows)');
  if (n === 1) {
    const ctrl = base ? rows.first().locator('[name^="' + base + '"]') : rows.first().locator('input, select, button, a');
    const m = await ctrl.count();
    if (m !== 1) throw new Error('chooseRow: control ambiguous: ' + (base || 'any') + ' (' + m + ')');
    await ctrl.first().click({ timeout: 15000 });
    return { how: 'table-row' };
  }

  // Some popups (e.g. AMA13 項目名検索) render the result as a listbox, not
  // a table: one <option> per row, no radio. Pick the single option whose
  // text matches the anchor. Same rule: 0 or 2+ = error, never a guess.
  const lists = await pg.locator('select').evaluateAll((els) => els.map((el, i) => ({
    i, disabled: !!el.disabled,
    options: [...el.options].map((o) => ({ value: o.value, text: (o.textContent || '').trim(), disabled: !!o.disabled })),
  })));
  const hits = [];
  for (const l of lists) {
    if (l.disabled) continue;
    for (const o of l.options) {
      if (!o.disabled && anchorMatches(o.text, anchor)) hits.push({ ...o, i: l.i });
    }
  }
  if (hits.length === 0) throw new Error('chooseRow: anchor not found: ' + anchor + ' (rows + select options)');
  if (hits.length > 1) {
    throw new Error('chooseRow: anchor ambiguous: ' + anchor + ' (' + hits.map((h) => h.text).join(' | ') + ')');
  }
  await pg.locator('select').nth(hits[0].i).selectOption(hits[0].value);
  return { how: 'option-list', text: hits[0].text };
}

async function checkFields(fields, screenKey, pg) {
  const got = [];
  for (const f of fields) {
    // Prefer the dictionary/overlay: one hand label can be a radio group or a
    // display div with no text between labels. Label scanning is the fallback.
    let loc = null;
    const sel = screenKey ? dictSelector(screenKey, f.label) : null;
    if (sel) {
      const cand = pg.locator(sel).first();
      if ((await cand.count().catch(() => 0)) > 0) loc = cand;
    }
    if (!loc) ({ loc } = await findLocator({ kind: 'label', label: f.label }));
    const info = await loc.evaluate((el) => ({
      tag: el.tagName.toLowerCase(), type: el.type || null,
      text: el.tagName === 'SELECT' ? (el.options[el.selectedIndex]?.text || '').trim() : null,
    }));
    let actual;
    if (info.tag === 'select') actual = info.text;
    else if (['input', 'textarea'].includes(info.tag)) actual = await loc.inputValue();
    else actual = ((await loc.textContent()) || '').trim();
    const wantRaw = f.equals !== undefined ? String(f.equals) : null;
    const containsRaw = f.contains !== undefined ? String(f.contains) : null;
    const want = wantRaw !== null ? String(resolveValue(wantRaw, { values }).resolved ?? '') : null;
    const contains = containsRaw !== null ? String(resolveValue(containsRaw, { values }).resolved ?? '') : null;
    const same = (a, b) => a === b || normText(a) === normText(b);
    if (want !== null && !same(actual, want)) throw new Error(`fieldIs ${f.label}: got "${actual}" want "${want}"`);
    if (contains !== null && !actual.includes(contains) && !normText(actual).includes(normText(contains))) {
      throw new Error(`fieldIs ${f.label}: "${contains}" not in "${actual}"`);
    }
    got.push({ label: f.label, actual });
  }
  return got;
}

async function fieldIs(s, pg) {
  const exp = s.expect || {};
  const pendingRef = exp.ref && exp.ref.status !== 'resolved' ? (exp.ref.appendix || exp.ref) : null;
  const fields = exp.fields || [];
  if (!fields.length) {
    if (pendingRef) return { ok: true, pendingRef, note: exp.ref.note };
    throw new Error('fieldIs: no fields');
  }
  const got = await checkFields(fields, s.targetScreenKey || s.screenKey, pg);
  return pendingRef
    ? { ok: true, fields: got, pendingRef, note: exp.ref.note }
    : { ok: true, fields: got };
}

async function rowsAtLeast(s, pg) {
  const min = Number(s.expect?.rows?.min ?? s.min ?? 1);
  const sel = s.expect?.rows?.selector || 'table tbody tr:visible, #gyoumu_list tr:visible';
  let n = await pg.locator(sel).count().catch(() => 0);
  if (n < min) {
    await sleep(500);
    n = await pg.locator(sel).count().catch(() => 0);
  }
  if (n < min) throw new Error(`rowsAtLeast: got ${n}, want >= ${min}`);
  return { ok: true, rows: n };
}

async function messageIs(s, pg) {
  const code = s.expect?.message?.code;
  if (!code) throw new Error('messageIs: no code');
  const foundInDialog = dialogs.some((d) => d.text.includes(code));
  const body = await pg.locator('body').innerText().catch(() => '');
  const found = foundInDialog || body.includes(code);
  if (found) return { ok: true, code };
  if (!live) return { ok: true, pendingRef: 'message:' + code, note: 'mock に ' + code + ' が無い（未検証）' };
  throw new Error(`messageIs: ${code} not found (dialogs: ${dialogs.map((d) => d.text.slice(0, 40)).join(' | ') || 'none'})`);
}

async function downloadIs(s) {
  const want = s.expect?.download || {};
  // The download handler saves asynchronously; wait before reading the record.
  await Promise.all(downloads.map((d) => d.promise).filter(Boolean));
  const last = downloads[downloads.length - 1];
  if (!last) {
    if (!live) return { ok: true, pendingRef: 'download', note: 'mock に download が無い（未検証）' };
    throw new Error('downloadIs: no download event');
  }
  if (want.name && !last.name.includes(want.name)) throw new Error(`downloadIs: got ${last.name}, want ${want.name}`);
  if (want.ext && !last.name.toLowerCase().endsWith(String(want.ext).toLowerCase())) {
    throw new Error(`downloadIs: got ${last.name}, want ext ${want.ext}`);
  }
  if (last.saveError) throw new Error('downloadIs: save failed: ' + last.saveError);
  return { ok: true, file: last.name, saved: last.file, bytes: last.bytes, sha256: last.sha256 };
}

async function externalIs(s) {
  const note = s.expect?.external?.note || s.expect?.external?.type || '';
  if (autoYes) return { ok: true, pendingRef: 'external', note: '未確認（--yes）: ' + note };
  console.log('  EXTERNAL row ' + s.row + ' ' + note);
  const a = await ask('  confirm done (Enter) / [s]kip > ');
  return a === 's' ? { ok: true, external: note, skipped: true } : { ok: true, external: note };
}

// ── step execution ──────────────────────────────────────────────────
async function doStep(s, pg) {
  activeScreen = s.screen;
  if (s.do === 'screenIs') {
    const r = await waitForScreen(s, 10000);
    if (!r.ok) throw new Error(`screenIs: want ${r.want}; at ${r.urls}`);
    const fields = s.expect?.fields?.length ? await checkFields(s.expect.fields, s.targetScreenKey || s.screenKey, pg) : null;
    // The transition is verified, but an unresolved 別紙 ref is NOT a pass.
    const ref = s.expect?.ref;
    if (ref && ref.status !== 'resolved') {
      return { ok: true, screen: r.code, url: r.url, fields, pendingRef: ref.appendix || 'ref', note: ref.note };
    }
    return { ok: true, screen: r.code, url: r.url, fields };
  }
  if (s.do === 'fieldIs') return fieldIs(s, pg);
  if (s.do === 'rowsAtLeast') return rowsAtLeast(s, pg);
  if (s.do === 'messageIs') return messageIs(s, pg);
  if (s.do === 'downloadIs') {
    const r = await downloadIs(s);
    // A download file name is not the 別紙 出力結果. If the content is an
    // unresolved appendix ref, the step stays pending even when the PDF did
    // download — and on mock there is no download at all. Record both facts.
    const ref = s.expect?.ref;
    if (ref && ref.status !== 'resolved') {
      const notes = [r.note, ref.note].filter(Boolean).join(' / ');
      return { ...r, pendingRef: ref.appendix || 'ref', note: notes };
    }
    return r;
  }
  if (s.do === 'externalIs') return externalIs(s);
  if (s.do === 'capture') {
    const w = await capture({
      of: s.of || 'viewport', step: s, pg, required: !!s.required,
      tag: s.name || s.evidence || 'capture',
    });
    return { ok: true, evidence: w.length };
  }
  if (s.do === 'manual') {
    if (autoYes) return { ok: true, pendingRef: 'manual', note: '未確認（--yes）: ' + (s.note || '') };
    console.log('  MANUAL row ' + s.row + ' ' + (s.note || ''));
    await ask('  press Enter when done > ');
    return { ok: true };
  }
  if (s.do === 'waitUntil') {
    const cond = String(s.waitFor || '');
    if (cond.startsWith('screenIs(')) {
      const name = cond.slice(9, -1);
      const r = await waitForScreen(name, 15000);
      if (!r.ok) throw new Error(`waitUntil screenIs(${name}): at ${r.urls}`);
      return { ok: true, screen: r.code };
    }
    const sm = /^selector\((.+)\)$/.exec(cond);
    if (sm) {
      await pg.locator(sm[1]).first().waitFor({ state: 'visible', timeout: 15000 });
      return { ok: true };
    }
    if (cond === 'idle' || cond === '') {
      await pg.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
      return { ok: true };
    }
    throw new Error('waitUntil: unsupported condition ' + cond);
  }
  if (s.do === 'goto') {
    if (!s.reason) throw new Error('goto requires a reason');
    await page.goto(runtimeUrl(s.url || s.value), { waitUntil: 'domcontentloaded', timeout: 30000 });
    return { ok: true, url: page.url() };
  }
  if (s.do === 'press') {
    if (s.targets?.length) {
      const { loc } = await findLocator(s.targets[0]);
      await loc.press(s.key || 'Enter');
    } else {
      await pg.keyboard.press(s.key || 'Enter');
    }
    return { ok: true };
  }
  if (s.do === 'chooseRow') {
    const r = await chooseRow(s, pg);
    return { ok: true, how: r.how, text: r.text || null };
  }
  if (s.do === 'fillAll') {
    let n = 0;
    // use[] may carry {label, value} for labels that repeat on another screen
    // with a different value (氏名 on 担当者検索 vs 送信先選択).
    for (const item of s.use || []) {
      const label = typeof item === 'string' ? item : item.label;
      if (await fillOne(s, label, pg)) n++;
    }
    return { ok: true, filled: n };
  }
  const dialogTarget = (s.targets || []).find((t) => String(t.selector || '').startsWith('@dialog:'));
  if (s.do === 'click' && dialogTarget) {
    const want = dialogTarget.selector === '@dialog:alert'
      ? 'alert'
      : (dialogTarget.selector === '@dialog:confirm' ? 'confirm' : 'any');
    const d = await takeDialog(want, 10000);
    return { ok: true, dialog: d.type, message: d.text };
  }

  for (const t of s.targets || []) {
    if (t.error) throw new Error('row ' + s.row + ': ' + t.label + ' unresolved');
    const { loc } = await findLocator(t);
    let v = t.value;
    if (typeof v === 'string') v = interpolate(v, values, missing);
    if (s.do === 'click') await loc.click({ timeout: 15000 });
    else if (s.do === 'fill') {
      const tag = await loc.evaluate((el) => el.tagName.toLowerCase()).catch(() => '');
      if (tag === 'select') await selectByText(loc, t.label, v);
      else await loc.fill(String(v === undefined || v === null ? '' : v), { timeout: 10000 });
    }
    else if (s.do === 'select') {
      await selectByText(loc, t.label, v);
    } else if (s.do === 'check') {
      if (typeof v !== 'boolean') throw new Error('check value must be boolean: ' + t.label + ' got=' + JSON.stringify(v));
      if (v) await loc.check(); else await loc.uncheck();
      const on = await loc.isChecked().catch(() => null);
      if (on !== null && on !== v) throw new Error('check did not stick: ' + t.label + ' want=' + v + ' got=' + on);
    }
    else throw new Error('unknown action: ' + s.do);
  }
  return { ok: true };
}

async function onFail(step, err) {
  console.error('');
  console.error('X row ' + step.row + ' [' + step.do + '] ' + step.screen);
  console.error('  ' + String(err.message).split('\n')[0]);
  if (overrideAll) return 'abort';
  for (;;) {
    const a = await ask('  [Enter]retry [s]skip [v]manual value [k]take over [q]quit [a]stop all > ');
    if (a === '') return 'retry';
    if (a === 's') return 'skip';
    if (a === 'q') return 'abort';
    if (a === 'a') { overrideAll = true; return 'abort'; }
    if (a === 'k') return 'keep';
    if (a === 'v') {
      const label = await ask('  label > ');
      const val = await ask('  value > ');
      return { manual: { label, val } };
    }
  }
}

// ── run ─────────────────────────────────────────────────────────────
// Batch / DB / mail books (mode: external) have no browser screen: the steps
// are manual + externalIs. Do not open a URL for them.
const externalMode = String(flow.mode || '').toLowerCase() === 'external';
const startUrl = flow.start?.url || flow.startUrl || (externalMode ? null : '/AMB/dummy.html');
// Live runs: the real SUT has its own routes and a login gate.
//   --login [--login-url URL]  open the login page, wait for a human to log in
//   --start-url URL            navigate to the real start route afterwards
// Both are optional; with neither, behaviour is exactly the mock path.
const startOverride = arg('start-url', '');
if (flag('login')) {
  const u = arg('login-url', '') || startOverride || startUrl;
  if (!u) {
    console.error('--login: no URL to open (use --login-url)');
    process.exit(2);
  }
  await page.goto(runtimeUrl(u), { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
  console.log('  LOGIN 请在这个浏览器窗口手动登录；登录完成后回到这里按 Enter');
  await ask('  login done (Enter) > ');
}
if (startUrl || startOverride) {
  await page.goto(runtimeUrl(startOverride || startUrl), { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
}

const ASSERT_OR_SIDE = new Set(['screenIs', 'fieldIs', 'rowsAtLeast', 'messageIs', 'downloadIs', 'externalIs', 'capture', 'manual', 'waitUntil', 'goto']);

let failed = 0, skipped = 0, done = 0, pending = 0, stopAll = false;
for (const step of steps) {
  if (stopAll) break;
  if (endRow && step.row > endRow) break;
  if (startRow && step.row < startRow) continue;
  if (step.popup && (!popupPage || popupPage.isClosed())) await waitForPopup(5000);
  const pg = activePage(step);
  const head = 'row ' + String(step.row).padStart(3) + ' ' + String(step.do).padEnd(13) + ' ' + (step.screen || '').slice(0, 22) + ' ';
  if (demo) {
    // Presentation mode: pause gate, then the banner naming this hand row,
    // primitive, screen, target and value before anything is touched.
    await demoInstall(pg);
    await demoPauseGate(pg);
    await demoBanner(pg, step);
  }
  process.stdout.write(head);
  for (;;) {
    const before = { url: pg.url(), code: codeFromUrl(pg.url()), dialogs: dialogs.length, downloads: downloads.length };
    try {
      // Precondition: be on the declared screen before acting.
      if (!ASSERT_OR_SIDE.has(step.do)) {
        const pre = await waitForScreen(step, 10000);
        if (!pre.ok) throw new Error(`wrong screen: want ${pre.want}; at ${pre.urls}`);
      }
      if (demo) await demoHighlight(pg, step);
      const r = await doStep(step, pg);

      // Postcondition: an action may declare the expected screen.
      if (step.expect?.screen) {
        const post = await waitForScreen(step.expect.screen, 10000);
        if (!post.ok) {
          const newDialogs = dialogs.slice(before.dialogs);
          const dmsg = newDialogs.length
            ? '; dialog: ' + newDialogs.map((d) => d.text || '(empty)').join(' | ')
            : '';
          throw new Error(`expect screen ${step.expect.screen}: at ${post.urls}${dmsg}`);
        }
      }

      // Evidence policy. A screenshot proves the screen; in mode=external
      // there is no screen, so the evidence is the external record instead.
      if (evidencePolicy === 'all' && !externalMode) {
        await capture({ of: 'viewport', step, pg, tag: 'step' }).catch(() => {});
      } else if (step.evidence && !externalMode && (evidencePolicy === 'required' || evidencePolicy === 'all')) {
        await capture({ of: 'viewport', step, pg, tag: step.evidence }).catch(() => {});
      }

      const after = { url: pg.url(), code: codeFromUrl(pg.url()) };
      trace.push({
        row: step.row, do: step.do, screen: step.screen, ok: true,
        pending: !!r.pendingRef, pendingRef: r.pendingRef || null,
        before, after, result: r, url: pg.url(),
        events: { dialogs: dialogs.slice(before.dialogs), downloads: downloads.slice(before.downloads) },
      });
      if (r.pendingRef) {
        pending++;
        console.log('PENDING [ref:' + r.pendingRef + ']');
      } else {
        console.log('OK' + (r.screen ? ' [' + r.screen + ']' : ''));
        done++;
      }
      break;
    } catch (err) {
      if (flag('dump')) console.error('\n[error] ' + String(err.message) + '\n[stack] ' + String(err.stack).split('\n').slice(0, 6).join('\n'));
      const msg = String(err.message).split('\n')[0];
      await onFailureCapture(step, err);
      if (flag('dump')) await dumpForm(pg);
      const action = await onFail(step, err);
      if (action === 'retry') { process.stdout.write(head); continue; }
      if (action === 'skip') { skipped++; trace.push({ row: step.row, do: step.do, ok: false, skipped: true, msg, url: pg.url() }); console.log('skip'); break; }
      if (action === 'keep') {
        console.log('kept (browser stays open)');
        keepOpen = true;
        trace.push({ row: step.row, do: step.do, ok: false, kept: true, msg, url: pg.url() });
        break;
      }
      if (action === 'abort') { failed++; stopAll = true; trace.push({ row: step.row, do: step.do, ok: false, msg, url: pg.url() }); console.log('abort'); break; }
      if (action && action.manual) {
        values[action.manual.label] = { value: action.manual.val, source: 'manual', resolved: action.manual.val };
        process.stdout.write(head);
        continue;
      }
      failed++;
      break;
    }
  }
  if (keepOpen) break;
  if (demo) {
    // Hold the result on screen long enough to read, then clear the marker.
    await demoWait(pg, demoDelay);
    await demoClear(pg);
  } else if (slow) await sleep(slow);
}

await Promise.all(downloads.map((d) => d.promise).filter(Boolean));
const result = {
  case: caseId, done, failed, skipped, pending, at: new Date().toISOString(),
  live, evidencePolicy, missing: [...missing], dialogs,
  downloads: downloads.map(({ promise, ...d }) => d),
  evidence, trace,
};
writeFileSync(join(outDir, 'run.json'), JSON.stringify(result, null, 1), 'utf-8');
const rows = trace.map((t) => '<tr><td>' + t.row + '</td><td>' + t.do + '</td><td>' + (t.screen || '') + '</td><td>' + (t.pending ? 'PENDING' : (t.ok ? 'OK' : (t.kept ? 'KEEP' : 'NG'))) + '</td><td>' + (t.msg || '') + '</td></tr>').join('');
writeFileSync(join(outDir, 'run.html'), '<meta charset="utf-8"><body style="font:13px system-ui;padding:20px"><h1>' + caseId + '</h1><p>done ' + done + ' / pending ' + pending + ' / failed ' + failed + ' / skipped ' + skipped + '</p><p>missing vars: ' + ([...missing].join(', ') || 'none') + '</p><p>evidence: ' + evidence.length + '</p><table border=1 cellpadding=5 style="border-collapse:collapse"><tr><th>row</th><th>do</th><th>screen</th><th>result</th><th>msg</th></tr>' + rows + '</table></body>', 'utf-8');

console.log('');
console.log('-- result --');
console.log('done ' + done + '  pending ' + pending + '  failed ' + failed + '  skipped ' + skipped + '  evidence ' + evidence.length);
if (missing.size) console.log('missing vars: ' + [...missing].join(', '));
console.log('log: ' + outDir);

if (keepOpen) {
  console.log('');
  console.log('browser stays open. Operate it, then press Enter to close.');
  await ask('');
}
else if (headed && !autoYes) {
  console.log('');
  console.log('browser stays open. Enter to close.');
  await ask('');
}
rl.close();
await browser.close();
process.exit(failed ? 1 : 0);
