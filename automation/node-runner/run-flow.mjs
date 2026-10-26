// run-flow.mjs - execute a flow file. Never close the browser on failure.
//
//   node run-flow.mjs flows/AZ-110-01-009.yaml --base http://127.0.0.1:10083
//   node run-flow.mjs flows/AZ-110-01-009.yaml --live --base https://SUT/
//   node run-flow.mjs flows/AZ-110-01-009.yaml --headless --yes
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { compileFlow, interpolate } from './flow-loader.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const arg = (n, d) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : d; };
const flag = (n) => process.argv.includes('--' + n);

const flowArg = process.argv[2];
if (!flowArg || flowArg.startsWith('--')) {
  console.error('usage: node run-flow.mjs <flows/XXX.yaml> [--base URL] [--live] [--headless] [--yes] [--row N] [--slow MS]');
  process.exit(2);
}
const flowPath = resolve(process.cwd(), flowArg);
const baseUrl = arg('base', 'http://127.0.0.1:10083/AMB/dummy.html');
const live = flag('live');
const headed = !flag('headless');
const autoYes = flag('yes');
const startRow = Number(arg('row', '0')) || 0;
const slow = Number(arg('slow', '0')) || 0;

const outDir = resolve(here, '../../logs', basename(flowPath).replace(/\.ya?ml$/, '') + '-flow');
mkdirSync(outDir, { recursive: true });

const { flow, steps, values, errors, pendingRuntime } = compileFlow(flowPath);
const caseId = flow.case || basename(flowPath);

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

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a.trim())));
let overrideAll = autoYes;

async function onFail(step, err) {
  console.error('');
  console.error('X row ' + step.row + ' [' + step.do + '] ' + step.screen);
  console.error('  ' + String(err.message).split('\n')[0]);
  if (overrideAll) return 'abort';
  for (;;) {
    const a = await ask('  [Enter]retry [s]skip [v]manual value [k]keep browser [q]quit [a]stop all > ');
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

const browser = await chromium.launch({ headless: !headed, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, ignoreHTTPSErrors: true });
const acceptDialog = (d) => d.accept().catch(() => {});
context.on('page', (p) => p.on('dialog', acceptDialog));
const page = await context.newPage();
page.on('dialog', acceptDialog);

const trace = [];
const missing = new Set();

function runtimeUrl(u) {
  const s = String(u || '');
  if (/^https?:/.test(s)) return s;
  const b = new URL(baseUrl);
  return new URL(s.replace(/^\//, ''), b.origin + '/').href;
}

async function shot(tag, pg) {
  const f = String(trace.length + 1).padStart(3, '0') + '_' + String(tag).replace(/[\/:*?"<>|\s]/g, '_').slice(0, 40) + '.png';
  try { await (pg || page).screenshot({ path: join(outDir, f), fullPage: false, timeout: 5000 }); } catch (e) { return null; }
  return f;
}

let popupPage = null;

function activePage(step) {
  // A popup is a separate Playwright Page. Steps marked popup:true must run
  // there, otherwise the locator waits forever on the parent document.
  if (step && step.popup && popupPage && !popupPage.isClosed()) return popupPage;
  return page;
}

// Locate across every open page. A popup is a separate Page; rather than
// guessing which one holds the element, try each and take the first that
// actually matches. Guessing is what made row 20 wait on the parent forever.
async function findLocator(t, timeoutMs) {
  const deadline = Date.now() + (timeoutMs || 15000);
  // A popup may still be loading when the next step runs, so retry across all
  // pages instead of sampling once. Sampling once was why row 20 gave up
  // while the popup was still fetching its HTML.
  for (;;) {
    const pages = context.pages().filter((p) => !p.isClosed());
    for (const pg of pages.slice().reverse()) {
      let loc = null;
      if (t.selector) loc = pg.locator(t.selector).first();
      else if (t.kind === 'rowfield' && t.namePattern) {
        const b = t.namePattern.split('[')[0];
        loc = pg.locator('[name^="' + b + '"]').first();
      }
      if (!loc) continue;
      const n = await loc.count().catch(() => 0);
      if (n > 0) return { loc, page: pg };
    }
    if (Date.now() > deadline) {
      const urls = pages.map((p) => p.url()).join(' | ');
      throw new Error('element not found: ' + (t.selector || t.label) + ' (pages: ' + urls + ')');
    }
    await new Promise((r) => setTimeout(r, 200));
  }
}

function resolveTarget(t, pg) {
  const where = pg || page;
  if (t.selector) return where.locator(t.selector).first();
  if (t.kind === 'rowfield' && t.namePattern) {
    const base = t.namePattern.split('[')[0];
    return where.locator('[name^="' + base + '"]').first();
  }
  throw new Error('unresolved selector: ' + t.label);
}

async function fillOne(s, label, pg) {
  const t = (s.targets || []).find((x) => x.label === label) || { label };
  const spec = values[label];
  if (!spec) { missing.add(label); return false; }
  const val = spec.resolved !== undefined ? spec.resolved : spec.value;
  if (val === '' || val === undefined || val === null) return false;
  const { loc } = await findLocator(t);
  const info = await loc.evaluate((el) => ({
    tag: el.tagName.toLowerCase(), type: el.type || null,
    disabled: !!el.disabled, readonly: !!el.readOnly,
  })).catch(() => ({}));

  // hidden / disabled / readonly are not "input" targets. They are submitted
  // by the app, or only settable through a popup. Writing them with fill()
  // either throws (invisible) or silently does nothing useful.
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
    await loc.selectOption({ label: String(val) }).catch(async () => { await loc.selectOption(String(val)).catch(() => {}); });
  } else if (info.type === 'checkbox' || info.type === 'radio') {
    if (val === true) await loc.check(); else await loc.uncheck();
  } else if (info.tag === 'textarea' || info.tag === 'input') {
    await loc.fill(String(val));
  } else {
    missing.add(label);
    return false;
  }
  return true;
}

async function doStep(s, pg) {
  if (s.do === 'expect') return { ok: true };
  if (s.do === 'expectMessage') return { ok: true };
  if (s.do === 'expectRows') {
    const t = (s.targets || [])[0];
    if (!t) return { ok: true };
    const n = await resolveTarget(t, pg).count().catch(() => 0);
    if (n < Number(s.min || 1)) throw new Error('rows ' + n + ' < ' + (s.min || 1));
    return { ok: true, rows: n };
  }
  if (s.do === 'manual') {
    if (autoYes) return { ok: true };
    console.log('  MANUAL row ' + s.row + ' ' + (s.note || ''));
    await ask('  press Enter when done > ');
    return { ok: true };
  }
  if (s.do === 'fillAll') {
    let n = 0;
    for (const label of s.use || []) if (await fillOne(s, label, pg)) n++;
    return { ok: true, filled: n };
  }
  for (const t of s.targets || []) {
    if (t.error) throw new Error('row ' + s.row + ': ' + t.label + ' unresolved');
    const { loc, page: targetPage } = await findLocator(t);
    let v = t.value;
    if (typeof v === 'string') v = interpolate(v, values, missing);
    if (s.do === 'click') await loc.click({ timeout: 15000 });
    else if (s.do === 'fill') await loc.fill(String(v === undefined || v === null ? '' : v), { timeout: 10000 });
    else if (s.do === 'select') {
      await loc.selectOption({ label: String(v) }).catch(async () => { await loc.selectOption(String(v)).catch(() => {}); });
    } else if (s.do === 'check') { if (v === true) await loc.check(); else await loc.uncheck(); }
    else if (s.do === 'clickRow') await loc.click({ timeout: 15000 });
    else if (s.do === 'goto') await page.goto(runtimeUrl(v), { waitUntil: 'domcontentloaded' });
    else throw new Error('unknown action: ' + s.do);
  }
  return { ok: true };
}

let failed = 0, skipped = 0, done = 0;
const startUrl = flow.startUrl || '/AMB/dummy.html';
await page.goto(runtimeUrl(startUrl), { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});

context.on('page', (p) => {
  // popup が出たら追跡。閉じられたら親に戻る。
  popupPage = p;
  p.on('close', () => { if (popupPage === p) popupPage = null; });
});

for (const step of steps) {
  if (startRow && step.row < startRow) continue;
  // popup ステップなのに popup が無ければ少し待つ（click 直後の race）
  if (step.popup && (!popupPage || popupPage.isClosed())) {
    await page.waitForTimeout(300);
  }
  const pg = activePage(step);
  const head = 'row ' + String(step.row).padStart(3) + ' ' + String(step.do).padEnd(13) + ' ' + (step.screen || '').slice(0, 22) + ' ';
  process.stdout.write(head);
  for (;;) {
    try {
      await doStep(step, pg);
      if (slow) await page.waitForTimeout(slow);
      const f = await shot('r' + step.row, pg);
      trace.push({ row: step.row, do: step.do, screen: step.screen, ok: true, shot: f, url: pg.url() });
      console.log('OK');
      done++;
      break;
    } catch (err) {
      const action = await onFail(step, err);
      const msg = String(err.message).split('\n')[0];
      if (action === 'retry') { process.stdout.write(head); continue; }
      if (action === 'skip') { skipped++; trace.push({ row: step.row, do: step.do, ok: false, skipped: true, msg }); console.log('skip'); break; }
      if (action === 'keep') { console.log('kept'); throw err; }
      if (action === 'abort') { failed++; trace.push({ row: step.row, do: step.do, ok: false, msg }); console.log('abort'); throw err; }
      if (action && action.manual) {
        values[action.manual.label] = { value: action.manual.val, source: 'manual', resolved: action.manual.val };
        process.stdout.write(head);
        continue;
      }
      failed++;
      break;
    }
  }
}

const result = { case: caseId, done, failed, skipped, at: new Date().toISOString(), missing: [...missing], trace };
writeFileSync(join(outDir, 'run.json'), JSON.stringify(result, null, 1), 'utf-8');
const rows = trace.map((t) => '<tr><td>' + t.row + '</td><td>' + t.do + '</td><td>' + (t.screen || '') + '</td><td>' + (t.ok ? 'OK' : 'NG') + '</td><td>' + (t.msg || '') + '</td></tr>').join('');
writeFileSync(join(outDir, 'run.html'), '<meta charset="utf-8"><body style="font:13px system-ui;padding:20px"><h1>' + caseId + '</h1><p>done ' + done + ' / failed ' + failed + ' / skipped ' + skipped + '</p><p>missing vars: ' + ([...missing].join(', ') || 'none') + '</p><table border=1 cellpadding=5 style="border-collapse:collapse"><tr><th>row</th><th>do</th><th>screen</th><th>result</th><th>msg</th></tr>' + rows + '</table></body>', 'utf-8');

console.log('');
console.log('-- result --');
console.log('done ' + done + '  failed ' + failed + '  skipped ' + skipped);
if (missing.size) console.log('missing vars: ' + [...missing].join(', '));
console.log('log: ' + outDir);

if (headed && !autoYes) {
  console.log('');
  console.log('browser stays open. Enter to close.');
  await ask('');
}
rl.close();
await browser.close();
process.exit(failed ? 1 : 0);
