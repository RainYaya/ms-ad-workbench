// 真机 DOM 抓取器 —— 人がブラウザで操作するだけで、画面ごとの DOM を全部残す。
//
// 使い方:
//   node tools/capture/capture.mjs --url https://実機/AMB/AMA01 --out capture-out --edge
//
// 何をするか:
//   1. Edge を起動して実機に繋ぐ（既存プロファイルは使わない。ログインは画面で手でやる）
//   2. ページが変わる/ポップアップが開く/一定時間操作が止まる たびに DOM を保存
//   3. 保存物: <out>/pages/NNN_<画面名>.html + .json(メタ) + .png
//   4. 最後に <out>/index.json に一覧
//
// 設計方針: セレクタを推測しない。実物をそのまま残すだけ。
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const flag = (n) => process.argv.includes(`--${n}`);

const startUrl = arg('url');
const outDir = resolve(arg('out', 'capture-out'));
const useEdge = flag('edge');
const quietMs = Number(arg('quiet', '1500'));       // 操作が止まってから保存するまで
const maxPages = Number(arg('max', '400'));
// 去重窗口必须比 idle 延迟更长，否则 navigate 存完 idle 又会存一次
const QUIET_DEDUPE_MS = Number(arg('dedupe', String(quietMs + 800)));
const headed = !flag('headless');

if (!startUrl) {
  console.error('need --url <実機URL>');
  process.exit(2);
}
mkdirSync(join(outDir, 'pages'), { recursive: true });

const browser = await chromium.launch({
  headless: !headed,
  channel: useEdge ? 'msedge' : undefined,
});
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  ignoreHTTPSErrors: true,
});

const log = [];
let seq = 0;
const seenSig = new Map();   // 同じ画面の重複保存を抑える
const timers = new Map();

const safe = (s) => String(s || 'page').replace(/[\/:*?"<>|\s]/g, '_').slice(0, 48);

function inspectPage(page) {
  return page.evaluate(() => {
    const uniq = (arr) => [...new Set(arr)];
    const ids = uniq([...document.querySelectorAll('[id]')].map((e) => e.id));
    const names = uniq([...document.querySelectorAll('[name]')].map((e) => e.getAttribute('name')));
    // field_title と field_value の対応（辞書の元ネタ）
    const pairs = [];
    document.querySelectorAll('.gyoumu_field_title, [class*="field_title"]').forEach((t) => {
      const label = (t.textContent || '').trim().replace(/\s+/g, ' ');
      let sib = t.nextElementSibling;
      while (sib && !/field_value/.test(sib.className || '')) sib = sib.nextElementSibling;
      let id = null, tag = null;
      if (sib) {
        const el = sib.querySelector('input,select,textarea');
        if (el) { id = el.id || el.getAttribute('name'); tag = el.tagName.toLowerCase(); }
      }
      if (label) pairs.push({ label, id, tag });
    });
    const buttons = [...document.querySelectorAll('input[type=submit],input[type=button],button')]
      .map((b) => ({ label: (b.value || b.textContent || '').trim(), id: b.id || b.getAttribute('name'), disabled: b.disabled }));
    // テーブル行の構造（rowfield を解く鍵）
    const tables = [...document.querySelectorAll('table')].map((tb) => {
      const th = [...tb.querySelectorAll('th')].map((x) => (x.textContent || '').trim()).filter(Boolean);
      const rows = [...tb.querySelectorAll('tbody tr')].slice(0, 3).map((tr) =>
        [...tr.querySelectorAll('td')].map((td) => {
          const c = td.querySelector('input,select');
          return {
            text: (td.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
            control: c ? { tag: c.tagName.toLowerCase(), type: c.type, name: c.getAttribute('name'), id: c.id, value: c.value } : null,
          };
        }));
      return { id: tb.id || null, cls: tb.className, th, sampleRows: rows, rowCount: tb.querySelectorAll('tbody tr').length };
    }).filter((t) => t.th.length || t.rowCount);
    return {
      url: location.href,
      title: document.title,
      charset: document.characterSet,
      ids, names, pairs, buttons, tables,
      bodyText: (document.body?.innerText || '').replace(/\s+/g, ' ').slice(0, 1200),
      popupOpener: !!window.opener,
      formAction: document.querySelector('form')?.getAttribute('action') || null,
    };
  }).catch((e) => ({ error: String(e) }));
}

async function record(page, reason) {
  if (log.length >= maxPages) return;
  let meta;
  try {
    meta = await inspectPage(page);
  } catch {
    return;   // ページ遷移中
  }
  if (meta.error) return;

  // 同一画面の連続保存を抑える。
  // domcontentloaded / navigate / idle が同じ画面で連続発火するので、
  // 最後に保存してから 1200ms 以内に同じシグネチャが来たら捨てる。
  const sig = `${meta.url}|${meta.title}|${meta.ids.length}|${meta.pairs.length}|${meta.tables.length}`;
  const now = Date.now();
  const last = seenSig.get(sig);
  if (last && now - last < QUIET_DEDUPE_MS) return;
  seenSig.set(sig, now);

  seq += 1;
  const rawName = meta.title || page.url().split('/').pop() || 'page';
  const base = `${String(seq).padStart(3, '0')}_${safe(rawName).replace(/\.html?$/i, '')}`;
  const html = await page.content().catch(() => '');
  writeFileSync(join(outDir, 'pages', `${base}.html`), html, 'utf-8');
  writeFileSync(join(outDir, 'pages', `${base}.json`), JSON.stringify(meta, null, 1), 'utf-8');
  await page.screenshot({ path: join(outDir, 'pages', `${base}.png`), fullPage: false }).catch(() => {});
  const entry = {
    n: seq, reason, file: `pages/${base}.html`,
    url: meta.url, title: meta.title, charset: meta.charset,
    popup: meta.popupOpener,
    counts: { ids: meta.ids.length, pairs: meta.pairs.length, buttons: meta.buttons.length, tables: meta.tables.length },
    bodyText: meta.bodyText.slice(0, 200),
  };
  log.push(entry);
  const t = timers.get(page);
  if (t) { clearTimeout(t); timers.delete(page); }
  writeFileSync(join(outDir, 'index.json'), JSON.stringify({ startUrl, generatedAt: new Date().toISOString(), pages: log }, null, 1), 'utf-8');
  console.log(`[${String(seq).padStart(3, '0')}] ${reason}  ${meta.title || '(no title)'}  ids=${meta.ids.length} pairs=${meta.pairs.length} ${meta.url}`);
}

function attach(page, label) {
  page.on('dialog', (d) => {
    record(page, 'dialog').catch(() => {});
    d.accept().catch(() => {});
  });
  // 操作が止まったら保存（タイピング中を避ける）
  const bump = () => {
    if (timers.has(page)) clearTimeout(timers.get(page));
    timers.set(page, setTimeout(() => { record(page, 'idle').catch(() => {}); }, quietMs));
  };
  page.on('domcontentloaded', () => { record(page, 'load').catch(() => {}); bump(); });
  page.on('load', () => { record(page, 'loaded').catch(() => {}); bump(); });
  page.on('framenavigated', (f) => { if (f === page.mainFrame()) record(page, 'navigate').catch(() => {}); });
  page.on('popup', () => {});
  page.on('console', () => bump());
  console.log(`  attached: ${label}`);
}

context.on('page', (p) => { attach(p, 'popup/new page'); });

const page = await context.newPage();
attach(page, 'main');
try {
  await page.goto(startUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
} catch (e) {
  console.error('goto failed:', e.message);
  console.error('(ページは開いています。手で URL を直してください)');
}

console.log(`
─────────────────────────────────────────────
 実機でブラウザを操作してください。
 画面が変わるたびに自動で保存されます。
 終わったら Ctrl+C。
─────────────────────────────────────────────`);

process.on('SIGINT', async () => {
  writeFileSync(join(outDir, 'index.json'), JSON.stringify({ startUrl, generatedAt: new Date().toISOString(), pages: log }, null, 1), 'utf-8');
  console.log(`\nsaved ${log.length} pages -> ${outDir}`);
  await browser.close().catch(() => {});
  process.exit(0);
});
await new Promise(() => {});   // 人が終わるまで待つ
