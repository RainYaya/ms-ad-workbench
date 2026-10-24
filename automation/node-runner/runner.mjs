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

const paramsAll = JSON.parse(readFileSync(join(root, '../cdp/params/AZ-110-01.json'), 'utf8'));
const P = { ...paramsAll.common, ...paramsAll.cases[caseId] };
const SEL = JSON.parse(readFileSync(join(root, 'block-selectors.json'), 'utf8'));
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
  await page.waitForSelector('#act001to100', { timeout: 120000 }); // login is manual on the SUT
  await shot('menu');

  for (const [blockId, blk] of Object.entries(SEL)) {
    console.log(`-- ${blockId}`);
    let popup = null;
    for (const step of blk.steps) {
      if (step.in === 'popup' && !popup) throw new Error('popup step before popup open');
      const where = step.in === 'popup' ? popup : page;
      const needsTarget = !['popup'].includes(step.action);
      const target = needsTarget && where ? where.locator(sel(step.selector)).first() : null;
      switch (step.action) {
        case 'click':
          await target.click({ timeout: 15000 });
          break;
        case 'fill':
          if (step.how === 'select') {
            await target.selectOption(String(resolveP(step.value)));
          } else {
            await target.fill(String(resolveP(step.value) ?? ''), { timeout: 10000 });
          }
          break;
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
  }

  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status: 'pass', shots
  }, null, 2));
  console.log(`DONE ${caseId} — ${shots.length} shots in logs/${caseId}/`);
} catch (err) {
  await shot('failure').catch(() => {});
  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status: 'fail', error: String(err), shots
  }, null, 2));
  console.error(`FAIL ${caseId}:`, err.message, err.stack ? String(err.stack).split(String.fromCharCode(10)).slice(1,4).join(' | ') : '');
  process.exitCode = 1;
} finally {
  await browser.close();
}
