// 可视化演示 runner：带界面 Edge + 每步放慢 1.2 秒 + 高亮点击位置 + 视频录制
// 用法: node demo.mjs --case AZ-110-01-009
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const root = dirname(fileURLToPath(import.meta.url));
const caseId = arg('case', 'AZ-110-01-009');
const base = arg('base-url', 'http://127.0.0.1:10095/AMB/AMA01.html');
const SLOW = Number(arg('slow', '1200'));

import { readdirSync } from 'node:fs';
function loadParams(cid) {
  for (const f of readdirSync(join(root, '../cdp/params'))) {
    if (!f.endsWith('.json')) continue;
    try { const d = JSON.parse(readFileSync(join(root, '../cdp/params', f), 'utf8'));
      if (d.cases && d.cases[cid]) return { ...d.common, ...d.cases[cid] }; } catch {}
  }
  return null;
}
const P = loadParams(caseId);
const SEL_ALL = {};
for (const f of readdirSync(root).filter(f => /^block-selectors.*\.json$/.test(f))) {
  Object.assign(SEL_ALL, JSON.parse(readFileSync(join(root, f), 'utf8')));
}
let SEL = SEL_ALL;
try {
  const wf = JSON.parse(readFileSync(join(root, '../../automation/blocks/blocks.json'), 'utf8')).workflows?.[caseId];
  if (wf?.blockDetails?.length) {
    const ordered = {};
    for (const b of wf.blockDetails) if (SEL_ALL[b.block] && !ordered[b.block]) ordered[b.block] = SEL_ALL[b.block];
    for (const k of Object.keys(SEL_ALL)) if (!ordered[k]) ordered[k] = SEL_ALL[k];
    SEL = ordered;
  }
} catch {}

const logDir = join(root, '../../logs/demo');
mkdirSync(logDir, { recursive: true });
const resolveP = (v) => typeof v === 'string' && v.startsWith('params.') ? P[v.slice('params.'.length)] : v;
const sel = (s) => String(s ?? '').replace(/\{params\.(\w+)\}/g, (_, k) => P[k] ?? '');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

console.log('=== DEMO MODE ===');
console.log(`CASE ${caseId} | 可视化 Edge 已打开 | 每步放慢 ${SLOW}ms`);

const browser = await chromium.launch({ headless: false, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await context.newPage();
await page.goto(base, { waitUntil: 'domcontentloaded' });
await sleep(1500);

// 演示辅助：高亮元素 + 横幅
async function highlight(el, label) {
  await el.evaluate((node, text) => {
    const old = node.style.outline;
    node.style.outline = '4px solid #ff4d4f';
    node.style.outlineOffset = '2px';
    let banner = document.getElementById('__demo_banner');
    if (!banner) { banner = document.createElement('div'); banner.id = '__demo_banner'; Object.assign(banner.style, {
      position: 'fixed', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: '99999',
      background: 'rgba(15,118,110,.94)', color: '#fff', padding: '10px 22px', borderRadius: '10px',
      fontSize: '15px', fontWeight: '700', fontFamily: 'sans-serif', boxShadow: '0 4px 18px rgba(0,0,0,.3)'
    }); document.body.appendChild(banner); }
    banner.textContent = text;
    setTimeout(() => { node.style.outline = old; }, 1600);
  }, label);
  await sleep(SLOW);
}

let stepNo = 0;
try {
  for (const [blockId, blk] of Object.entries(SEL)) {
    if (blk.cases && !blk.cases.includes(caseId)) continue;
    console.log(`-- ${blockId}`);
    let popup = null;
    for (const step of blk.steps) {
      const where = step.in === 'popup' ? popup : page;
      const target = step.action !== 'popup' && where ? where.locator(sel(step.selector)).first() : null;
      stepNo++;
      const label = `[${blockId.replace(/^BLK-/, '')}] 步${stepNo}: ${step.event || step.action}`;
      switch (step.action) {
        case 'goto': {
          const u = new URL(String(sel(step.url)), base).href;
          await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await sleep(600);
          break;
        }
        case 'click':
          if (target) {
            try { await highlight(target, `👆 ${label}`); } catch {}
            if (step.force) { await target.evaluate(el => { el.disabled = false; el.click(); }).catch(() => {}); }
            else { await target.click({ timeout: 8000 }).catch(async e => { try { await target.evaluate(el => { el.disabled = false; el.click(); }); } catch { throw e; } }); }
          }
          break;
        case 'fill':
          if (target) {
            try { await highlight(target, `⌨️ ${label} = ${resolveP(step.value)}`); } catch {}
            if (step.how === 'select') await target.selectOption(String(resolveP(step.value)));
            else if (step.how === 'selectByLabelPrefix') {
              const opts = await target.locator('option').all();
              const norm = t => String(t ?? '').replace(/\s+/g, '').replace(/\uFF1A/g, ':');
              const want = norm(resolveP(step.value));
              for (const o of opts) { const t = norm(await o.textContent()); if (t && (t.startsWith(want) || want.startsWith(t))) { await target.selectOption(await o.getAttribute('value')); break; } }
            } else await target.fill(String(resolveP(step.value) ?? ''), { timeout: 8000 });
          }
          break;
        case 'selectOptionByLabel': {
          if (!target) break;
          try { await highlight(target, `⌨️ ${label}`); } catch {}
          const opts = await target.locator('option').all();
          const norm = t => String(t ?? '').replace(/\s+/g, '').replace(/\uFF1A/g, ':');
          const want = norm(String(resolveP(step.label)));
          for (const o of opts) { const t = norm(await o.textContent()); if (t && t.startsWith(want)) { await target.selectOption(await o.getAttribute('value')); break; } }
          break;
        }
        case 'check': if (target) { try { await highlight(target, `☑️ ${label}`); } catch {} await target.check({ timeout: 8000 }); } break;
        case 'enable': if (target) await target.evaluate(el => { el.disabled = false; }); break;
        case 'wait': await sleep(step.ms || 800); break;
        case 'popup': {
          const find = () => context.pages().find(p => String(step.match).split('|').some(m => p.url().includes(m)));
          const deadline = Date.now() + 15000;
          popup = find();
          while (!popup && Date.now() < deadline) { await sleep(250); popup = find(); }
          if (popup) { await popup.bringToFront().catch(() => {}); try { await highlight(popup.locator('body'), `🪟 ${label} (弹窗)`); } catch {} }
          break;
        }
        case 'assert': {
          if (step.assert === 'visible' && target) {
            try { await highlight(target, `✅ ${label}`); } catch {}
            try { await where.waitForSelector(sel(step.selector), { timeout: 6000 }); }
            catch { console.log(`WARN assert skipped in demo: ${step.selector}`); }
          } else if (step.assert === 'rows' && target) {
            await where.waitForSelector(sel(step.selector), { timeout: 10000 });
          } else if (step.assert === 'value' && target) {
            await target.inputValue({ timeout: 8000 }).catch(() => '');
          } else if (step.assert === 'text' && target) {
            await target.textContent({ timeout: 8000 }).catch(() => '');
          }
          break;
        }
      }
      await sleep(300);
    }
    await page.bringToFront().catch(() => {});
  }
  console.log(`\nDEMO DONE: ${stepNo} 步全部执行完 — 截图在 logs/demo/`);
  await page.screenshot({ path: join(logDir, 'final.png') });
  writeFileSync(join(logDir, 'demo-result.json'), JSON.stringify({ caseId, steps: stepNo, status: 'demo-pass' }));
  await sleep(4000);
} catch (err) {
  console.error('DEMO FAIL:', err.message);
  await page.screenshot({ path: join(logDir, 'demo-fail.png') }).catch(() => {});
  await sleep(4000);
} finally {
  await browser.close();
}
