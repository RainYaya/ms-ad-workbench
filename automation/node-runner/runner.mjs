// MS-AD portable runner — node.exe + playwright-core, no install needed on the SUT machine.
// Usage: node runner.mjs --case AZ-110-01-009 [--base-url http://127.0.0.1:10081/...] [--edge] [--headed]
// Blocks are data-driven from block-selectors.json; params from ../cdp/params/*.json.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const root = dirname(fileURLToPath(import.meta.url));
const caseId = arg('case', 'AZ-110-01-009');
const baseUrl = arg('base-url', 'http://127.0.0.1:10081/mhkcmwa11/dummy.html');
const headed = process.argv.includes('--headed');
const useEdge = process.argv.includes('--edge') || !headed; // headless dev uses bundled edge channel

import { readdirSync } from 'node:fs';
function loadParams(cid) {
  const dir = join(root, '../cdp/params');
  let out = null;
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try {
      const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      if (!d.cases || !d.cases[cid]) continue;
      const cur = { ...d.common, ...d.cases[cid] };
      // First matching file owns the concrete values; later files only fill gaps
      // (startUrl/startSelector often live in a shared bulk file).
      if (!out) out = cur;
      else for (const [k, v] of Object.entries(cur)) if (out[k] === undefined || out[k] === '') out[k] = v;
    } catch {}
  }
  return out;
}
const P = loadParams(caseId);
if (!P) { console.error(`params not found for ${caseId}`); process.exit(2); }
console.log(`user ${P.user || '?'} / ${P.pointCheck || '?'}`);

const SEL_ALL = {};
for (const f of readdirSync(root).filter(f => /^block-selectors.*\.json$/.test(f))) {
  Object.assign(SEL_ALL, JSON.parse(readFileSync(join(root, f), 'utf8')));
}
// Execution order follows the case's composed workflow, including repeated
// blocks (e.g. menu->list ran twice in one book). Blocks without a selector
// are reported as skipped instead of silently dropped.
// Per-case procedure rows that require a 画面HC capture.
const EVIDENCE = (() => {
  try { return JSON.parse(readFileSync(join(root, '../../automation/blocks/case-evidence.json'), 'utf8')); }
  catch { return {}; }
})();
let SEL_SEQ = null;
const skipped = [];
try {
  const wf = JSON.parse(readFileSync(join(root, '../../automation/blocks/blocks.json'), 'utf8')).workflows?.[caseId];
  if (wf?.blockDetails?.length) {
    SEL_SEQ = [];
    const seenMissing = new Set();
    const evBlocks = EVIDENCE[caseId]?.blocks || [];
    wf.blockDetails.forEach((b, idx) => {
      if (SEL_ALL[b.block]) SEL_SEQ.push([b.block, SEL_ALL[b.block], evBlocks[idx]]);
      else if (!seenMissing.has(b.block)) { seenMissing.add(b.block); skipped.push(b.block); }
    });
  }
} catch {}
const plan = SEL_SEQ || Object.entries(SEL_ALL).filter(([, blk]) => !blk.cases || blk.cases.includes(caseId));
console.log(`PLAN ${plan.length} block(s)${skipped.length ? `, skipped ${skipped.length}: ${skipped.join(',')}` : ''}`);
const logDir = join(root, `../../logs/${caseId}`);
mkdirSync(logDir, { recursive: true });

console.log(`CASE ${caseId} | user ${P.user} / ${P.pointCheck} | base ${baseUrl}`);

const resolveP = (v) => typeof v === 'string' && v.startsWith('params.')
  ? P[v.slice('params.'.length)] : v;

const browser = await chromium.launch({
  headless: !headed,
  channel: useEdge ? 'msedge' : undefined,
  executablePath: useEdge ? undefined : undefined,
});
const context = await browser.newContext({ viewport: { width: 1360, height: 900 } });
const page = await context.newPage();
const acceptDialog = (d) => d.accept().catch(() => {});
page.on('dialog', acceptDialog);
context.on('page', (p) => p.on('dialog', acceptDialog));
const shots = [];
const blockStatus = [];
let shotIdx = 0;
async function shot(name, where = page) {
  const file = `${String(++shotIdx).padStart(2, '0')}_${name}.png`;
  await where.screenshot({ path: join(logDir, file), fullPage: false });
  shots.push(file);
  console.log('SHOT', file);
  return file;
}
const evidence = [];
const safeName = (s) => String(s ?? 'hc').replace(/[\\/:*?"<>|\s]/g, '_').slice(0, 32);
async function pageMeta(p) {
  return {
    url: p.url(),
    title: await p.title().catch(() => ''),
    text: ((await p.locator('body').innerText({ timeout: 1000 }).catch(() => '')) || '').replace(/\s+/g, ' ').slice(0, 160),
  };
}

// value interpolation for selectors containing {params.x}
const sel = (s) => String(s ?? '').replace(/\{params\.(\w+)\}/g, (_, k) => P[k] ?? '');

try {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (P.startUrl) {
    await page.goto(new URL(P.startUrl, baseUrl).href, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }
  // login is manual on the SUT; AZ menu has #act001to100, AY(ANB00) menu has route buttons
  await page.waitForSelector(P.startSelector || '#act001to100, #route2, #route3, input[name=UserID], input[name=menu_cm]', { timeout: 120000 });
  await shot('menu');

  let popup = null; // case-scoped: popups opened in one block persist to the next
  for (const [blockId, blk, evBlock] of plan) {
    console.log(`-- ${blockId}`);
    let assertSeq = 0;
    const capturedRows = new Set();
    for (const step of blk.steps) {
      if (step.in === 'popup' && !popup) throw new Error('popup step before popup open');
      const where = step.in === 'popup' ? popup : page;
      const needsTarget = !['popup', 'wait', 'goto', 'manual'].includes(step.action);
      const target = needsTarget && where ? where.locator(sel(step.selector)).first() : null;
      switch (step.action) {
        case 'manual':
          console.log('MANUAL', step.event || '', step.note || '');
          break;
        case 'setValue':
          await target.evaluate((el, v) => { el.value = v; }, String(resolveP(step.value) ?? ''));
          break;
        case 'goto': {
          const targetUrl = new URL(String(sel(step.url)), baseUrl).href;
          await where.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await where.waitForLoadState('domcontentloaded');
          break;
        }
        case 'click':
          if (step.force) {
            await target.evaluate((el) => { el.disabled = false; el.click(); });
          } else {
            await target.click({ timeout: 15000 });
          }
          break;
        case 'fill':
          if (step.how === 'select') {
            await target.selectOption(String(resolveP(step.value)));
          } else if (step.how === 'selectByLabelPrefix') {
            const opts = await target.locator('option').all();
            const norm = (t) => String(t ?? '').replace(/\s+/g, '').replace(/：/g, ':');
            const want = norm(resolveP(step.value));
            let hit = null;
            for (const o of opts) { const t = norm(await o.textContent()); if (t && (t.startsWith(want) || want.startsWith(t))) { hit = await o.getAttribute('value'); break; } }
            if (hit == null) throw new Error(`option prefix not found: ${want}`);
            await target.selectOption(hit);
          } else {
            await target.fill(String(resolveP(step.value) ?? ''), { timeout: 10000 });
          }
          break;
        case 'selectByLabelPrefix': {
          const opts = await target.locator('option').all();
          const norm2 = (t) => String(t ?? '').replace(/\s+/g, '').replace(/：/g, ':');
          const want2 = norm2(resolveP(step.value));
          let hit2 = null;
          for (const o of opts) { const t = norm2(await o.textContent()); if (t && (t.startsWith(want2) || want2.startsWith(t))) { hit2 = await o.getAttribute('value'); break; } }
          if (hit2 == null) throw new Error(`option prefix not found: ${want2}`);
          await target.selectOption(hit2);
          break;
        }
        case 'selectOptionByLabel': {
          const opts = await target.locator('option').all();
          const norm = (t) => t.replace(/\s+/g, '').replace(/\uFF1A/g, ':');
          const want = norm(String(resolveP(step.label)));
          let hit = null;
          for (const o of opts) { const t = norm(await o.textContent()); if (t && t.startsWith(want)) { hit = await o.getAttribute('value'); break; } }
          if (hit == null) throw new Error(`option not found: ${want}`);
          await target.selectOption(hit);
          break;
        }
        case 'wait':
          await page.waitForTimeout(step.ms || 1000);
          break;
        case 'enable':
          await target.evaluate((el) => { el.disabled = false; });
          break;
        case 'wait':
          await where.waitForTimeout(Number(step.ms) || 0);
          break;
        case 'assert': {
          const timeout = Number(step.timeout) || 10000;
          try {
            switch (step.assert) {
              case 'visible':
                await target.waitFor({ state: 'visible', timeout });
                break;
              case 'hidden':
                await target.waitFor({ state: 'hidden', timeout });
                break;
              case 'rows': {
                const min = Number(step.min) || 1;
                const deadline = Date.now() + timeout;
                let n = 0;
                while (Date.now() < deadline) {
                  n = await target.count();
                  if (n >= min) break;
                  await where.waitForTimeout(200);
                }
                if (n < min) throw new Error(`assert rows: got ${n}, want >= ${min} (${step.selector})`);
                break;
              }
              case 'value': {
                const got = await target.inputValue({ timeout });
                const want = step.equals !== undefined ? String(resolveP(step.equals)) : null;
                const has = step.contains !== undefined ? String(resolveP(step.contains)) : null;
                const ok = !((want !== null && got !== want) || (has !== null && !got.includes(has)) || (want === null && has === null && !got));
                if (!ok) {
                  if (step.optional) console.log(`WARN optional value assert skipped (got "${got}")`);
                  else throw new Error(`assert value: got "${got}", want "${want ?? has ?? '?'}"`);
                }
                break;
              }
              case 'text': {
                const got = (await target.textContent({ timeout })) || '';
                const want = step.contains !== undefined ? String(resolveP(step.contains)) : '';
                if (want && !got.includes(want)) throw new Error(`assert text: "${want}" not found (${got.slice(0, 120)})`);
                break;
              }
              default:
                throw new Error(`unknown assert kind: ${step.assert}`);
            }
          } catch (e) {
            if (step.optional) { console.log(`WARN optional assert failed: ${step.event || step.selector}: ${e.message}`); break; }
            throw e;
          }
          break;
        }
        case 'check':
          await target.check({ timeout: 10000 });
          break;
        case 'popup': {
          const find = () => context.pages().find(p => {
            const u = p.url();
            return String(step.match).split('|').some(m => u.includes(m));
          });
          const deadline = Date.now() + 20000;
          popup = find();
          while (!popup && Date.now() < deadline) {
            await page.waitForTimeout(300);
            popup = find();
          }
          if (!popup) throw new Error(`popup not found: ${step.match} (pages: ${context.pages().map(p => p.url()).join(', ')})`);
          await popup.waitForLoadState('domcontentloaded');
          await popup.bringToFront().catch(() => {});
          break;
        }
      }
      if (step.action === 'assert' || step.action === 'popup' || step.action === 'manual') {
        let ev = null;
        if (step.noEvidence) {
          // Transition already captured by the owning block; do not consume a row.
        } else if (step.shotRow !== undefined) {
          ev = (evBlock?.asserts || []).find((a) => a.row === Number(step.shotRow)) || { row: Number(step.shotRow), type: step.assert || '表示', item: step.event || '' };
        } else {
          ev = evBlock?.asserts?.[assertSeq];
          assertSeq++;
        }
        if (ev?.hc && !capturedRows.has(ev.row)) {
          if (step.action === 'manual') {
            evidence.push({ row: ev.row, type: ev.type, item: ev.item, file: null, exact: false, manual: true, block: blockId, note: step.note || '非浏览器=真機人工' });
            capturedRows.add(ev.row);
          } else {
            const targetPage = step.action === 'popup' ? (popup || where) : where;
            const file = await shot(`r${String(ev.row).padStart(3, '0')}_${safeName(ev.item || ev.type || 'hc')}`, targetPage);
            evidence.push({ row: ev.row, type: ev.type, item: ev.item, file, exact: true, block: blockId, ...(await pageMeta(targetPage)) });
            capturedRows.add(ev.row);
          }
        }
      }
      if (step.shot) await shot(step.shot);
    }
    await shot(blockId.slice(0, 24));
    // Any remaining 画面HC row in this block is captured once at block end.
    const hcRows = new Set();
    for (const a of evBlock?.asserts || []) if (a.hc) hcRows.add(a.row);
    if (evBlock?.toHc) hcRows.add(evBlock.toRow);
    for (const row of hcRows) {
      if (capturedRows.has(row)) continue;
      const meta = (evBlock.asserts || []).find((a) => a.row === row) || {};
      const file = await shot(`r${String(row).padStart(3, '0')}_${safeName(meta.item || meta.type || 'hc')}_blockend`);
      evidence.push({ row, type: meta.type, item: meta.item, file, exact: false, block: blockId, note: 'block end capture', ...(await pageMeta(page)) });
      capturedRows.add(row);
    }
    blockStatus.push({ block: blockId, status: 'pass', fromRow: evBlock?.fromRow, toRow: evBlock?.toRow, hcRows: [...capturedRows] });
  }

  const status = skipped.length ? 'partial' : 'pass';
  writeFileSync(join(logDir, `${caseId}-evidence.json`), JSON.stringify({ caseId, evidence }, null, 1));
  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status, blocks: blockStatus, skipped, shots, evidence
  }, null, 2));
  console.log(`${status === 'pass' ? 'DONE' : 'PARTIAL'} ${caseId} — ${blockStatus.length}/${blockStatus.length + skipped.length} blocks, ${shots.length} shots in logs/${caseId}/`);
} catch (err) {
  await shot('failure').catch(() => {});
  writeFileSync(join(logDir, `${caseId}-evidence.json`), JSON.stringify({ caseId, evidence }, null, 1));
  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status: 'fail', error: String(err), blocks: blockStatus, shots, evidence
  }, null, 2));
  console.error(`FAIL ${caseId}:`, err.message, err.stack ? String(err.stack).split(String.fromCharCode(10)).slice(1,4).join(' | ') : '');
  process.exitCode = 1;
} finally {
  await browser.close();
}