// MS-AD portable runner — node.exe + playwright-core, no install needed on the SUT machine.
// Usage: node runner.mjs --case AZ-110-01-009 [--base-url http://127.0.0.1:10081/...] [--edge] [--headed]
// Blocks are data-driven from block-selectors.json; params from ../cdp/params/*.json.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { runtimeUrl } from './url-map.mjs';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const root = dirname(fileURLToPath(import.meta.url));
const caseId = arg('case', 'AZ-110-01-009');
const baseUrl = arg('base-url', 'http://127.0.0.1:82/mhkcmwa11/dummy.html');
const headed = process.argv.includes('--headed');
const slow = Number(arg('slow', '0')) || 0;
const keepOpen = Number(arg('keep-open', '0')) || 0;
const traceOn = process.argv.includes('--trace');
const strictParams = process.argv.includes('--strict-params');
const live = process.argv.includes('--live') || !/^https?:\/\/(127\.0\.0\.1|localhost|0\.0\.0\.0)([:\/]|$)/.test(baseUrl);
const useEdge = process.argv.includes('--edge') || !headed; // headless dev uses bundled edge channel

import { readdirSync } from 'node:fs';
const PARAM_SOURCES = {};
function loadParams(cid) {
  const dir = join(root, '../cdp/params');
  let out = null;
  const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort((a, b) => {
    // auto.json is the fallback; appendix-generated business values win over curated placeholders.
    if (a === 'auto.json') return 1;
    if (b === 'auto.json') return -1;
    if (a === 'generated.json') return -1;
    if (b === 'generated.json') return 1;
    return a.localeCompare(b);
  });
  for (const f of files) {
    try {
      const d = JSON.parse(readFileSync(join(dir, f), 'utf8'));
      if (!d.cases || !d.cases[cid]) continue;
      const cur = { ...d.common, ...d.cases[cid] };
      // First matching file owns the concrete values; later files only fill gaps
      // (startUrl/startSelector often live in a shared bulk file).
      if (!out) {
        out = cur;
        for (const k of Object.keys(cur)) PARAM_SOURCES[k] = f;
      } else {
        for (const [k, v] of Object.entries(cur)) if (out[k] === undefined || out[k] === '') { out[k] = v; PARAM_SOURCES[k] = f; }
      }
    } catch {}
  }
  return out;
}
const P = loadParams(caseId);
if (!P) { console.error(`params not found for ${caseId}`); process.exit(2); }
const loginUser = arg('user', '') || P.loginUser || (P.user && P.user !== '?' ? P.user : '');
const loginBuka = arg('buka', '') || P.bukaCode || '';
const loginYak = arg('yak', '') || P.yakusyokuCode || '';
console.log(`user ${P.user || '?'} / ${P.pointCheck || '?'}${loginUser ? ` | login ${loginUser}` : ''}`);

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
const SCREEN_RULES = (() => {
  try { return JSON.parse(readFileSync(join(root, '../../automation/blocks/screen-rules.json'), 'utf8')); }
  catch { return []; }
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
if (strictParams) {
  const used = new Set();
  for (const [, blk] of plan) for (const step of blk.steps || []) for (const v of Object.values(step)) {
    for (const m of String(v).matchAll(/params\.(\w+)/g)) used.add(m[1]);
  }
  const weak = [...used].filter((k) => P[k] === undefined || PARAM_SOURCES[k] === 'auto.json');
  if (weak.length) {
    console.error(`STRICT PARAMS: ${weak.map((k) => `${k}<-${PARAM_SOURCES[k] || 'missing'}`).join(', ')}`);
    process.exit(3);
  }
  console.log(`STRICT PARAMS OK (${used.size} key(s))`);
}
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
let page = await context.newPage();
const acceptDialog = (d) => d.accept().catch(() => {});
const MENU_SELECTOR = P.startSelector || '#act001to100, #route2, #route3';
async function findMenu(timeout = 120000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    for (const p of context.pages()) {
      if (p.isClosed()) continue;
      if (await p.locator(MENU_SELECTOR).count().catch(() => 0)) return p;
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  return null;
}
page.on('dialog', acceptDialog);
context.on('page', (p) => {
  p.on('dialog', acceptDialog);
  if (process.env.STEP_DEBUG) p.on('console', (m) => console.log('POPUP', m.text()));
});
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
async function traceShot(name, where = page) {
  try {
    const file = `${String(++shotIdx).padStart(2, '0')}_${name}.png`;
    await where.screenshot({ path: join(logDir, file), fullPage: false, timeout: 5000, animations: 'disabled' });
    shots.push(file);
    return file;
  } catch {
    return null;
  }
}
const evidence = [];
const traceEntries = [];
let traceIdx = 0;
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
const escHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function writeTrace(cid, entries) {
  const dir = join(root, '../../logs', cid);
  writeFileSync(join(dir, `${cid}-trace.json`), JSON.stringify({ caseId: cid, entries }, null, 2));
  const rows = entries.map((e) => `<tr><td>${e.n}</td><td><code>${escHtml(e.block)}</code></td><td>${escHtml(e.event)}</td><td>${escHtml(e.action)}</td><td><code>${escHtml(e.selector)}</code></td><td class="small">${escHtml(e.url)}</td><td>${e.screenshot ? `<a href="${escHtml(e.screenshot)}"><img src="${escHtml(e.screenshot)}" loading="lazy"></a>` : '—'}</td></tr>`).join('');
  const html = `<!doctype html><meta charset="utf-8"><title>${escHtml(cid)} trace</title><style>body{font:13px system-ui,sans-serif;margin:20px;color:#17211d}table{border-collapse:collapse;width:100%}th,td{border:1px solid #d5ddd8;padding:6px;vertical-align:top}th{background:#1f4e5a;color:#fff;position:sticky;top:0}img{width:220px;border:1px solid #d5ddd8;border-radius:4px}.small{font-size:11px;color:#66756e;word-break:break-all}</style><h1>${escHtml(cid)} — step trace</h1><p>各ステップ後の画面。クリックで原図。</p><table><thead><tr><th>#</th><th>block</th><th>event</th><th>action</th><th>selector</th><th>URL</th><th>screenshot</th></tr></thead><tbody>${rows}</tbody></table>`;
  writeFileSync(join(dir, `${cid}-trace.html`), html);
}

try {
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  if (loginUser) {
    const userBox = page.locator('input[name="UserID"]');
    if (await userBox.count()) {
      await userBox.fill(String(loginUser));
      if (loginBuka) await page.locator('input[name="BukaCode"]').fill(String(loginBuka));
      if (loginYak) await page.locator('input[name="YakusyokuCode"]').fill(String(loginYak));
      const before = new Set(context.pages());
      await page.locator('input[name="menu_cm"]').click();
      await page.waitForTimeout(800);
      const opened = context.pages().find((p) => !before.has(p));
      if (opened) page = opened;
      console.log(`LOGIN ${loginUser}${opened ? ' (new window)' : ''}`);
    }
  }
  if (P.startUrl) {
    await page.goto(runtimeUrl(P.startUrl, baseUrl, live), { waitUntil: 'domcontentloaded', timeout: 30000 });
  }
  // The SUT login button opens a new window (window.open(..., 'TOP')).
  // Pick the menu page from all targets; also covers manual login.
  const menu = await findMenu(120000);
  if (!menu) throw new Error(`menu not found after login: ${context.pages().map((p) => p.url()).join(', ')}`);
  page = menu;
  await page.bringToFront().catch(() => {});
  await shot('menu');

  let popup = null; // case-scoped: popups opened in one block persist to the next
  let currentBlock = '';
  const hcQueue = [];
  {
    const seen = new Set();
    for (const b of EVIDENCE[caseId]?.blocks || []) {
      for (const a of b.asserts || []) {
        if (a.hc && !seen.has(a.row)) { hcQueue.push({ ...a }); seen.add(a.row); }
      }
      if (b.toHc && !seen.has(b.toRow)) { hcQueue.push({ row: b.toRow, type: '遷移', item: '', hc: true }); seen.add(b.toRow); }
    }
    hcQueue.sort((a, b) => a.row - b.row);
  }
  const MANUAL_RE = /開発者ツール|権限エラー|セッションタイムアウト|閉局|ヘルプ|ダウンロードメッセージ/;
  const ruleFor = (item) => SCREEN_RULES.find((r) => new RegExp(r.match).test(item || ''));
  const urlMatch = (rule, u) => !!rule && rule.urls.some((x) => u.includes(x));
  const isOpen = (p) => !!p && !p.isClosed();
  async function captureRow(row, target, matchedBy) {
    const file = await shot(`r${String(row.row).padStart(3, '0')}_${safeName(row.item || row.type || 'hc')}`, target);
    evidence.push({ row: row.row, type: row.type, item: row.item, file, exact: true, block: currentBlock, matchedBy, ...(await pageMeta(target)) });
  }
  let stalledRow = null;
  let stalledCount = 0;
  async function maybeCapture(active, phase) {
    if (!hcQueue.length) return;
    if (process.env.STEP_DEBUG) console.log('Q', hcQueue[0].row, hcQueue[0].item, '| phase', phase, '| active', active && active.url());
    const waitMs = phase === 'popup' ? 800 : (phase === 'click' || phase === 'goto' || phase === 'blockEnd') ? 350 : 0;
    const deadline = Date.now() + waitMs;
    while (hcQueue.length) {
      const row = hcQueue[0];
      if (MANUAL_RE.test(row.item || '')) {
        evidence.push({ row: row.row, type: row.type, item: row.item, file: null, exact: false, manual: true, block: currentBlock, note: '非浏览器=真機人工' });
        hcQueue.shift();
        continue;
      }
      const rule = ruleFor(row.item);
      if (rule) {
        let target = null;
        for (;;) {
          const pages = [active, popup, page].filter(isOpen);
          target = pages.find((p) => urlMatch(rule, p.url()));
          if (target || Date.now() >= deadline) break;
          await page.waitForTimeout(100);
        }
        if (!target) {
          if (stalledRow === row.row) stalledCount++;
          else { stalledRow = row.row; stalledCount = 1; }
          if (stalledCount > 100) {
            evidence.push({ row: row.row, type: row.type, item: row.item, file: null, exact: false, missing: true, block: currentBlock, note: '画面HC未取得（長時間不一致）' });
            hcQueue.shift();
            stalledRow = null;
            stalledCount = 0;
            continue;
          }
          return;
        }
        await captureRow(row, target, 'url');
        hcQueue.shift();
        stalledRow = null;
        stalledCount = 0;
        return;
      }
      if (phase === 'blockStart') return;
      await captureRow(row, active && isOpen(active) ? active : page, 'current');
      hcQueue.shift();
      return;
    }
  }
  async function resolveOlderThan(minRow) {
    if (!Number.isFinite(minRow)) return;
    while (hcQueue.length) {
      const row = hcQueue[0];
      if (!(row.row < minRow)) break;
      if (MANUAL_RE.test(row.item || '')) {
        evidence.push({ row: row.row, type: row.type, item: row.item, file: null, exact: false, manual: true, block: currentBlock, note: '非浏览器=真機人工' });
      } else {
        evidence.push({ row: row.row, type: row.type, item: row.item, file: null, exact: false, missing: true, block: currentBlock, note: '画面HC未取得（前段で未到達）' });
      }
      hcQueue.shift();
    }
  }
  let blockIndex = 0;
  for (const [blockId, blk, evBlock] of plan) {
    console.log(`-- ${blockId}`);
    currentBlock = blockId;
    const ownedRows = [...(evBlock?.asserts || []).filter((a) => a.hc).map((a) => a.row), ...(evBlock?.toHc ? [evBlock.toRow] : [])].filter((x) => x != null);
    const minOwned = ownedRows.length ? Math.min(...ownedRows) : Infinity;
    const firstUrl = String(blk.steps?.[0]?.url || '');
    const isRestart = /\/AMB\/AMA01|\/ANB00\/ANA01/.test(firstUrl);
    if (blockIndex > 0 && isRestart) await resolveOlderThan(minOwned);
    blockIndex++;
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
          const targetUrl = runtimeUrl(sel(step.url), baseUrl, live);
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
          if (hit == null) {
            const texts = [];
            for (const o of opts) texts.push(await o.textContent());
            throw new Error(`option not found: ${want} | options: ${JSON.stringify(texts.slice(0, 12))}`);
          }
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
          const note = String(step.note || '');
          const manualNote = /非浏览器|真機人工|JP1|APログ|DBログ|DBダンプ|テーブル|バッチ|F12|DevTools|手順|目視|人が|実機で確認/.test(note);
          const mockOnly = /mock|Mock|未収録|未再現|簡易|代理|回写/.test(note) && !manualNote;
          if (manualNote) {
            console.log('MANUAL(manual step)', step.event || '', note);
            break;
          }
          if (mockOnly && !live) {
            console.log('MOCK-ONLY(assert skipped)', step.event || '', note);
            break;
          }
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
      const activePage = step.in === 'popup' ? (popup && !popup.isClosed() ? popup : where) : where;
      if (process.env.STEP_DEBUG) console.log('STEP', step.action, step.event || '', '| page', page.url(), '| popup', popup && !popup.isClosed() ? popup.url() : '-');
      await maybeCapture(activePage, step.action);
      if (traceOn) {
        traceIdx++;
        const file = await traceShot(`trace_${String(traceIdx).padStart(3, '0')}_${safeName(step.event || step.action)}`, activePage);
        // resolved value: what was ACTUALLY used (params substituted), not the template
        const resolvedVal = step.value !== undefined ? resolveP(step.value)
          : step.label !== undefined ? resolveP(step.label) : undefined;
        // page snapshot: key state for the AI judge
        const snap = await activePage.evaluate(() => ({
          title: document.title.slice(0, 60),
          gamid: document.querySelector('input[name="gamid"]')?.value || '',
          visibleButtons: [...document.querySelectorAll('input[type="submit"], input[type="button"]')]
            .filter(b => b.offsetParent !== null).map(b => b.value || b.name || b.id).slice(0, 10),
        })).catch(() => ({ title: '?', gamid: '?', visibleButtons: [] }));
        traceEntries.push({
          n: traceIdx, block: currentBlock, event: step.event || '', action: step.action,
          selector: step.selector || '', value: step.value || '', resolvedValue: resolvedVal,
          url: activePage.url(), popup: popup && !popup.isClosed() ? popup.url() : '',
          screenshot: file, pageSnapshot: snap,
        });
      }
      if (step.shot) await shot(step.shot);
      if (slow) await page.waitForTimeout(slow);
    }
    await shot(blockId.slice(0, 24));
    await maybeCapture(popup && !popup.isClosed() ? popup : page, 'blockEnd');
    blockStatus.push({ block: blockId, status: 'pass', fromRow: evBlock?.fromRow, toRow: evBlock?.toRow });
  }
  for (const row of hcQueue) {
    const manual = MANUAL_RE.test(row.item || '');
    evidence.push({ row: row.row, type: row.type, item: row.item, file: null, exact: false, manual, missing: !manual, note: manual ? '非浏览器=真機人工' : '画面HC未取得' });
  }

  const status = skipped.length ? 'partial' : 'pass';
  if (traceOn) writeTrace(caseId, traceEntries);
  writeFileSync(join(logDir, `${caseId}-evidence.json`), JSON.stringify({ caseId, evidence }, null, 1));
  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status, blocks: blockStatus, skipped, shots, evidence
  }, null, 2));
  console.log(`${status === 'pass' ? 'DONE' : 'PARTIAL'} ${caseId} — ${blockStatus.length}/${blockStatus.length + skipped.length} blocks, ${shots.length} shots in logs/${caseId}/`);
  if (keepOpen) {
    console.log(`KEEP OPEN ${keepOpen / 1000}s — close the browser window or wait`);
    await page.waitForTimeout(keepOpen);
  }
} catch (err) {
  await shot('failure').catch(() => {});
  if (traceOn) writeTrace(caseId, traceEntries);
  writeFileSync(join(logDir, `${caseId}-evidence.json`), JSON.stringify({ caseId, evidence }, null, 1));
  writeFileSync(join(logDir, `${caseId}-node-result.json`), JSON.stringify({
    caseId, runner: 'node', ts: new Date().toISOString(), status: 'fail', error: String(err), blocks: blockStatus, shots, evidence
  }, null, 2));
  console.error(`FAIL ${caseId}:`, err.message, err.stack ? String(err.stack).split(String.fromCharCode(10)).slice(1,4).join(' | ') : '');
  process.exitCode = 1;
} finally {
  await browser.close();
}