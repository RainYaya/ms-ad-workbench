// Offline DOM checks against a real-environment capture.
//
// A capture comes from capture.mjs:
//   capture-YYYYMMDD/index.json        url/title/counts per page
//   capture-YYYYMMDD/pages/*.html      rendered DOM (UTF-8 as saved)
//
// This module resolves a hand-procedure screen name to the captured page the
// same way run-flow resolves a URL to a screen (route > title > controller
// code), then loads that page with JavaScript disabled and no network so a
// selector can be counted exactly.
//
// It is used by add-control.mjs and check-patch.mjs. It never writes.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { norm } from './flow-loader.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../..');

const CONTROLLER_RE = /(?:mhkcmwa11|mhkagwa11|mhkcmwb11|AMB|ANB00|AMC00)\/([A-Za-z0-9_]+)/;

export function loadScreens(base = ROOT) {
  return JSON.parse(readFileSync(join(base, 'ui-screens.json'), 'utf8')).screens || {};
}

export function screenKeyFor(name, screens = loadScreens()) {
  const want = norm(name);
  for (const [screen, meta] of Object.entries(screens)) {
    if (!meta?.app || !meta?.code) continue;
    if (norm(screen) === want) return { name: screen, key: `${meta.app}/${meta.code}`, meta };
  }
  return null;
}

// Same identity rule as run-flow.screenNamesForUrl.
export function screenForPage(page, screens) {
  const u = String(page.url || '');
  const routed = [];
  for (const [name, meta] of Object.entries(screens)) {
    if ((meta.routes || []).some((r) => r && u.includes(r))) routed.push(name);
  }
  if (routed.length) return routed[0];
  const title = norm(page.title || '');
  if (title) {
    const exact = Object.keys(screens).filter((n) => screens[n].app && norm(n) === title);
    if (exact.length === 1) return exact[0];
    const sub = Object.keys(screens)
      .filter((n) => screens[n].app && norm(n) && title.includes(norm(n)))
      .sort((a, b) => norm(b).length - norm(a).length);
    if (sub.length) return sub[0];
  }
  const m = CONTROLLER_RE.exec(u);
  if (m) {
    const hits = Object.entries(screens)
      .filter(([, meta]) => norm(meta.code) === norm(m[1]))
      .map(([n]) => n);
    if (hits.length === 1) return hits[0];
  }
  return null;
}

export function listCapturePages(dir, screens = loadScreens()) {
  const indexPath = join(dir, 'index.json');
  if (!existsSync(indexPath)) return scanHtmlDir(dir, screens);
  const index = JSON.parse(readFileSync(indexPath, 'utf8'));
  return (index.pages || []).map((entry) => ({
    ...entry,
    screen: screenForPage(entry, screens),
    abs: join(dir, entry.file),
  }));
}

// A folder of hand-saved .html files is a valid capture too: the same
// "paste it into the AI / check it offline" workflow must not require
// capture.mjs. The screen comes from <title> (and any URL marker in the
// file name), exactly like a real capture.
function scanHtmlDir(dir, screens) {
  const roots = [dir, join(dir, 'pages')].filter((d) => existsSync(d));
  const out = [];
  let n = 0;
  for (const root of roots) {
    let names = [];
    try { names = readdirSync(root); } catch { continue; }
    for (const name of names.sort()) {
      if (!/\.html?$/i.test(name)) continue;
      const abs = join(root, name);
      let size = 0;
      try { size = statSync(abs).size; } catch { continue; }
      if (size <= 500) continue;
      let html = '';
      try { html = readFileSync(abs, 'utf8'); } catch { continue; }
      const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] || '').trim();
      // run-flow stamps the URL into pages it saves (failure screenshots go to
      // logs/<case>-flow/). The SUT fills <title> from JS, so without this a
      // saved page has no identity and cannot be used as --capture.
      const url = (/<!--\s*rpa-url:\s*(\S+?)\s*-->/.exec(html)?.[1] || '').trim();
      n += 1;
      const entry = { n, reason: 'file', file: abs.slice(dir.length + 1).replace(/\\/g, '/'), url, title, counts: null };
      out.push({ ...entry, screen: screenForPage(entry, screens), abs });
    }
  }
  return out;
}

// The last page of a screen is the most advanced state of that page in the
// capture (e.g. AMA18 after 検索, not before). Blank/JS-only snapshots are
// skipped: they cannot answer "does this selector exist".
export function capturePageFor(dir, screenName, screens = loadScreens()) {
  const pages = listCapturePages(dir, screens).filter((p) => p.screen && norm(p.screen) === norm(screenName));
  // Some snapshots are metadata-only (a POST navigation with an empty HTML
  // file). They cannot answer a selector question, so they are not candidates.
  const usable = pages.filter((p) => {
    // A hand-saved folder has no counts; size is the only signal there.
    if (p.counts && ((p.counts.ids || 0) + (p.counts.pairs || 0) === 0)) return false;
    try { return statSync(p.abs).size > 500; } catch { return false; }
  });
  if (!usable.length) {
    const known = [...new Set(listCapturePages(dir, screens).map((p) => p.screen).filter(Boolean))];
    throw new Error(`capture has no page for screen '${screenName}'` +
      (known.length ? ` (known: ${known.join(' / ')})` : ''));
  }
  return usable[usable.length - 1];
}

export async function checkSelectors(htmlFile, selectors, opts = {}) {
  if (!existsSync(htmlFile)) throw new Error('no such html: ' + htmlFile);
  const html = readFileSync(htmlFile, 'utf8');
  const browser = await chromium.launch({ headless: true, channel: opts.channel || 'msedge' });
  try {
    const page = await browser.newPage({ javaScriptEnabled: false });
    await page.route('**/*', (r) => r.abort()).catch(() => {});
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    const out = [];
    for (const sel of selectors) {
      const r = { selector: sel, count: 0, visible: 0, texts: [], error: null };
      try {
        const loc = page.locator(sel);
        r.count = await loc.count();
        r.visible = await page.locator(sel + ':visible').count().catch(() => 0);
        const n = Math.min(r.count, 8);
        for (let i = 0; i < n; i++) {
          const el = loc.nth(i);
          const info = await el.evaluate((e) => ({
            tag: e.tagName.toLowerCase(),
            type: e.type || null,
            value: e.value ?? null,
            text: (e.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80),
            row: (() => {
              const tr = e.closest('tr');
              return tr ? (tr.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 140) : null;
            })(),
            disabled: !!e.disabled,
          })).catch(() => null);
          if (info) r.texts.push(info);
        }
      } catch (e) {
        r.error = String(e.message || e).split('\n')[0];
      }
      out.push(r);
    }
    return out;
  } finally {
    await browser.close().catch(() => {});
  }
}

// ── CLI ─────────────────────────────────────────────────────────────
// node dom-check.mjs --capture DIR --screen '募集人検索画面' --selector 'input[name=x]'
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const arg = (k, d = '') => {
    const i = args.indexOf('--' + k);
    return i >= 0 ? (args[i + 1] ?? '') : d;
  };
  const capture = arg('capture');
  const screen = arg('screen');
  const selector = arg('selector');
  if (!capture || !screen || !selector) {
    console.error("usage: node dom-check.mjs --capture DIR --screen '画面名' --selector 'css'");
    process.exit(2);
  }
  try {
    const page = capturePageFor(capture, screen);
    console.log(`screen ${screen} -> ${page.screen} (${page.url})`);
    console.log(`file   ${page.abs}`);
    const [r] = await checkSelectors(page.abs, [arg('anchor') ? selector.replaceAll('{value}', arg('anchor')) : selector]);
    console.log(`selector ${r.selector}`);
    console.log(`count ${r.count}  visible ${r.visible}`);
    for (const t of r.texts) console.log('  ' + JSON.stringify(t));
    if (r.error) console.error('ERROR ' + r.error);
    process.exit(r.count === 1 && r.visible === 1 ? 0 : 1);
  } catch (e) {
    console.error('ERROR ' + e.message);
    process.exit(1);
  }
}
