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
  for (const f of readdirSync(dir)) {
    if (!f.endsWith('.json')) continue;
    try {
      const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      if (d.cases && d.cases[cid]) return { ...d.common, ...d.cases[cid] };
    } catch {}
  }
  return null;
}
const P = loadParams(caseId);
if (!P) { console.error(`params not found for ${caseId}`); process.exit(2); }
console.log(`user ${P.user || '?'} / ${P.pointCheck || '?'}`);

const SEL = {};
for (const f of readdirSync(root).filter(f => /^block-selectors.*\.json$/.test(f))) {
  Object.assign(SEL, JSON.parse(readFileSync(join(root, f), 'utf8')));
}
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
const shots = [];
const blockStatus = [];
let shotIdx = 0;
async function shot(name) {
  const file = `${String(++shotIdx).padStart(2, '0')}_${name}.png`;
  await page.screenshot({ path: join(logDir, file), fullPage: false });
  shots.push(file);
  console.log('SHOT', file);
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
  for (const [blockId, blk] of Object.entries(SEL)) {
    if (blk.cases && !blk.cases.includes(caseId)) continue;
    console.log(`-- ${blockId}`);
    for (const step of blk.steps) {
      if (step.in === 'popup' && !popup) throw new Error('popup step before popup open');
      const where = step.in === 'popup' ? popup : page;
      const needsTarget = !['popup', 'wait'].includes(step.action);
      const target = needsTarget && where ? where.locator(sel(step.selector)).first() : null;
      switch (step.action) {
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
                if (want !== null && got !== want) throw new Error(`assert value: got "${got}", want "${want}"`);
                if (has !== null && !got.includes(has)) throw new Error(`assert value: got "${got}", want contains "${has}"`);
                if (want === null && has === null && !got) throw new Error('assert value: empty');
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
      if (step.shot) await shot(step.shot);
    }
    await shot(blockId.slice(0, 24));
    blockStatus.push({ block: blockId, status: 'pass' });
  }

  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status: 'pass', blocks: blockStatus, shots
  }, null, 2));
  console.log(`DONE ${caseId} — ${shots.length} shots in logs/${caseId}/`);
} catch (err) {
  await shot('failure').catch(() => {});
  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status: 'fail', error: String(err), blocks: blockStatus, shots
  }, null, 2));
  console.error(`FAIL ${caseId}:`, err.message, err.stack ? String(err.stack).split(String.fromCharCode(10)).slice(1,4).join(' | ') : '');
  process.exitCode = 1;
} finally {
  await browser.close();
}
