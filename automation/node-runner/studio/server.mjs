// RPA Studio — local UI + API on top of the existing kernel.
//
// The kernel stays the only executor: this server reads/writes flows/*.yaml,
// calls check-flow.mjs and run-flow.mjs, and serves screenshots. It does not
// contain any business logic of its own.
//
//   node studio/server.mjs [port]
//   open http://127.0.0.1:10200
//
// Bound to 127.0.0.1 only.
import { createServer } from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync, copyFileSync, statSync,
} from 'node:fs';
import { join, dirname, resolve, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { load as yamlLoad, dump as yamlDump } from 'js-yaml';
import { norm } from '../flow-loader.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const RUNNER = resolve(HERE, '..');
const ROOT = resolve(RUNNER, '../..');
const FLOWS = join(ROOT, 'flows');
const BACKUP = join(FLOWS, '.backup');
const PUBLIC = join(HERE, 'public');
const PORT = Number(process.argv[2] || 10200);

const screens = JSON.parse(readFileSync(join(ROOT, 'ui-screens.json'), 'utf8')).screens || {};
const dict = JSON.parse(readFileSync(join(ROOT, 'ui-dictionary.json'), 'utf8')).screens || {};
const overlay = JSON.parse(readFileSync(join(ROOT, 'ui-rowfields.json'), 'utf8')).rowfields || {};
const controls = JSON.parse(readFileSync(join(ROOT, 'ui-controls.json'), 'utf8')).screens || {};
const MOCK = join(RUNNER, 'mock-src');
const BINDINGS = join(FLOWS, 'bindings.yaml');

function screenKeyOf(name) {
  if (!name) return null;
  const n = norm(name);
  for (const [k, v] of Object.entries(screens)) {
    if (norm(k) === n && v.app && v.code) return `${v.app}/${v.code}`;
  }
  return null;
}

function labelsFor(name) {
  const key = screenKeyOf(name);
  if (!key) return { screenKey: null, labels: [] };
  const out = [];
  for (const rf of overlay[key] || []) {
    out.push({ label: rf.label, kind: rf.kind || rf.how || 'field', from: 'overlay',
      status: rf.status || null, note: rf.note || null });
  }
  for (const f of dict[key]?.fields || []) {
    if (f.label) out.push({ label: f.label, kind: f.kind || 'field', from: 'dict', status: 'confirmed' });
  }
  for (const b of dict[key]?.buttons || []) {
    if (b.label) out.push({ label: b.label, kind: 'button', from: 'dict', status: 'confirmed' });
  }
  // one label may appear twice (field + button); the first is the resolver's pick
  const seen = new Set();
  const uniq = [];
  for (const l of out) {
    const k = norm(l.label);
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(l);
  }
  return { screenKey: key, labels: uniq };
}

// The binding table is read fresh on every request: the review UI writes to it
// while the API is running, and a cached copy would hide the write.
function readBindings() {
  if (!existsSync(BINDINGS)) return { version: 1, rules: [] };
  return yamlLoad(readFileSync(BINDINGS, 'utf8')) || { rules: [] };
}

function writeBindings(doc) {
  mkdirSync(BACKUP, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  copyFileSync(BINDINGS, join(BACKUP, `bindings.${stamp}.yaml`));
  writeFileSync(BINDINGS, yamlDump(doc, { lineWidth: -1, noRefs: true, sortKeys: false }), 'utf8');
}

function flowFiles() {
  const top = readdirSync(FLOWS)
    .filter((f) => f.endsWith('.yaml') && !f.endsWith('.legacy.yaml') && f !== 'bindings.yaml')
    .sort();
  const booksDir = join(FLOWS, 'books');
  const books = existsSync(booksDir)
    ? readdirSync(booksDir).filter((f) => f.endsWith('.yaml')).sort().map((f) => 'books/' + f)
    : [];
  return [...top, ...books];
}

// Flow ids may be "NAME" or "books/NAME"; the log directory is always keyed by
// the bare flow name because run-flow derives it from the file name.
function logName(name) {
  return String(name || '').split('/').pop().replace(/\.yaml$/, '');
}

function readFlow(name) {
  if (!/^([A-Za-z0-9._-]+\/)?[A-Za-z0-9._-]+$/.test(name || '')) throw new Error('bad flow name');
  const p = join(FLOWS, name + '.yaml');
  if (!p.startsWith(FLOWS) || !existsSync(p)) throw new Error('flow not found: ' + name);
  const raw = readFileSync(p, 'utf8');
  return { path: p, raw, model: yamlLoad(raw) };
}

function json(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(body);
}

function text(res, code, s, type = 'text/plain; charset=utf-8') {
  res.writeHead(code, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(s);
}

function readBody(req) {
  return new Promise((res, rej) => {
    let b = '';
    req.on('data', (c) => { b += c; if (b.length > 8e6) rej(new Error('body too large')); });
    req.on('end', () => res(b));
    req.on('error', rej);
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
};

// ── run state ───────────────────────────────────────────────────────
let run = null; // {name, id, running, output[], code, summary}
let mockChild = null;
let runChild = null;

function stopRun() {
  try { runChild?.kill(); } catch { /* gone */ }
  try { mockChild?.kill(); } catch { /* gone */ }
  runChild = null;
  mockChild = null;
}

async function waitFor(url, ms = 12000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { const r = await fetch(url); if (r.ok) return true; } catch { /* not up */ }
    await new Promise((r) => setTimeout(r, 150));
  }
  return false;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  const p = url.pathname;
  try {
    // ── API ─────────────────────────────────────────────────────────
    if (p === '/api/flows') {
      const list = flowFiles().map((f) => {
        const name = f.replace(/\.yaml$/, '');
        try {
          const { model } = readFlow(name);
          return {
            name, title: model.title || '', case: model.case || name,
            mode: model.mode || null, steps: (model.steps || []).length,
            start: model.start?.screen || null,
            kind: name.startsWith('books/') ? 'book' : 'hand',
          };
        } catch (e) {
          return { name, error: e.message, steps: 0 };
        }
      });
      return json(res, 200, { flows: list });
    }

    if (p === '/api/flow') {
      const name = url.searchParams.get('name');
      const { model, raw } = readFlow(name);
      return json(res, 200, { name, model, raw });
    }

    if (p === '/api/flow/save' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      const name = body.name;
      const { path } = readFlow(name);
      mkdirSync(BACKUP, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, '-');
      const safe = logName(name);
      const backup = join(BACKUP, `${safe}.${stamp}.yaml`);
      copyFileSync(path, backup);
      const header =
        `# Saved by RPA Studio ${new Date().toISOString()}\n` +
        `# 手写注释已被替换。原文备份: flows/.backup/${basename(backup)}\n`;
      const yaml = yamlDump(body.model, { lineWidth: -1, noRefs: true, sortKeys: false });
      writeFileSync(path, header + yaml, 'utf8');
      return json(res, 200, { ok: true, backup: `flows/.backup/${basename(backup)}` });
    }

    if (p === '/api/dict') {
      return json(res, 200, labelsFor(url.searchParams.get('screen') || ''));
    }

    if (p === '/api/screens') {
      return json(res, 200, { screens: Object.keys(screens) });
    }

    // ── control repository + binding table ──────────────────────────
    if (p === '/api/controls') {
      const key = screenKeyOf(url.searchParams.get('screen') || '');
      const page = key ? controls[key] : null;
      return json(res, 200, {
        screenKey: key,
        title: page?.title || null,
        // Hidden inputs are never pickable; keeping them would bury the real
        // controls under 20 csrf/session fields.
        controls: (page?.controls || []).filter((c) => c.kind !== 'hidden'),
      });
    }

    if (p === '/api/bindings') {
      const want = url.searchParams.get('status') || 'needs-human';
      const q = (url.searchParams.get('q') || '').trim();
      const doc = readBindings();
      const rules = (doc.rules || []).filter((r) => {
        if (want !== 'all' && r.status !== want) return false;
        if (!q) return true;
        return String(r.phrase || '').includes(q) || String(r.screenName || '').includes(q)
          || String(r.screen || '').includes(q);
      });
      const counts = { auto: 0, confirmed: 0, 'needs-human': 0, rejected: 0, total: 0 };
      for (const r of doc.rules || []) {
        counts.total++;
        counts[r.status] = (counts[r.status] || 0) + 1;
      }
      return json(res, 200, { counts, rules: rules.slice(0, 400) });
    }

    if (p === '/api/binding/save' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      const doc = readBindings();
      const rule = (doc.rules || []).find((r) => r.id === body.id);
      if (!rule) return json(res, 404, { error: 'rule not found: ' + body.id });
      const c = body.control || {};
      if (!c.selector) return json(res, 400, { error: 'control.selector required' });
      rule.control = c.control || null;
      rule.selector = c.selector;
      rule.kind = c.kind || rule.kind || null;
      rule.type = rule.type === 'explicit' ? 'template' : rule.type;
      rule.status = 'confirmed';
      rule.confirmedAt = new Date().toISOString();
      rule.note = body.note || ('confirmed by studio: ' + (c.label || c.selector));
      writeBindings(doc);
      return json(res, 200, { ok: true, rule });
    }

    if (p === '/api/binding/auto' && req.method === 'POST') {
      const body = JSON.parse(await readBody(req));
      const doc = readBindings();
      const rule = (doc.rules || []).find((r) => r.id === body.id);
      if (!rule) return json(res, 404, { error: 'rule not found: ' + body.id });
      rule.status = body.status === 'rejected' ? 'rejected' : 'needs-human';
      if (body.status !== 'rejected') {
        delete rule.control;
        delete rule.selector;
      }
      rule.note = body.note || rule.note;
      writeBindings(doc);
      return json(res, 200, { ok: true, rule });
    }

    if (p === '/api/check' && req.method === 'POST') {
      const { name } = JSON.parse(await readBody(req));
      const { path } = readFlow(name);
      const out = [];
      const code = await new Promise((res2) => {
        const c = spawn(process.execPath, ['check-flow.mjs', path], { cwd: RUNNER });
        c.stdout.on('data', (d) => out.push(String(d)));
        c.stderr.on('data', (d) => out.push(String(d)));
        c.on('exit', (n) => res2(n ?? 1));
      });
      return json(res, 200, { code, output: out.join('') });
    }

    if (p === '/api/run' && req.method === 'POST') {
      if (run && run.running) return json(res, 409, { error: 'a run is already active' });
      const { name, headed } = JSON.parse(await readBody(req));
      const { path, model } = readFlow(name);
      const external = String(model.mode || '').toLowerCase() === 'external';
      const port = 10199;
      const output = [];
      const id = Date.now().toString(36);
      run = { id, name, running: true, output, code: null, summary: null };

      const push = (d) => {
        for (const line of String(d).split(/\r?\n/)) if (line) output.push(line);
      };

      (async () => {
        if (!external) {
          mockChild = spawn(process.execPath, ['mock-server.mjs', String(port)], {
            cwd: RUNNER, stdio: 'ignore',
          });
          const up = await waitFor(`http://127.0.0.1:${port}/AMB/dummy.html`);
          if (!up) {
            push('mock server did not start on :' + port);
            run.running = false;
            run.code = 3;
            return;
          }
        }
        const args = ['run-flow.mjs', path, '--yes'];
        if (!external) args.push('--base', `http://127.0.0.1:${port}/AMB/dummy.html`);
        if (!headed) args.push('--headless');
        runChild = spawn(process.execPath, args, { cwd: RUNNER });
        runChild.stdout.on('data', push);
        runChild.stderr.on('data', push);
        runChild.on('exit', (code) => {
          stopRun();
          run.code = code ?? 1;
          run.running = false;
          const logDir = join(ROOT, 'logs', logName(name) + '-flow');
          try {
            const j = JSON.parse(readFileSync(join(logDir, 'run.json'), 'utf8'));
            run.summary = {
              done: j.done, pending: j.pending, failed: j.failed, skipped: j.skipped,
              evidence: (j.evidence || []).length, at: j.at,
            };
          } catch { /* no run.json */ }
        });
      })();
      return json(res, 200, { id });
    }

    if (p === '/api/run') {
      if (!run) return json(res, 200, { running: false, output: [] });
      return json(res, 200, {
        id: run.id, name: run.name, running: run.running, code: run.code,
        output: run.output.slice(-400), summary: run.summary,
      });
    }

    if (p === '/api/run/stop' && req.method === 'POST') {
      stopRun();
      if (run) { run.running = false; run.output.push('-- stopped by user --'); }
      return json(res, 200, { ok: true });
    }

    if (p === '/api/evidence') {
      const name = url.searchParams.get('name') || '';
      if (!/^([A-Za-z0-9._-]+\/)?[A-Za-z0-9._-]+$/.test(name)) return json(res, 400, { error: 'bad name' });
      const dir = join(ROOT, 'logs', logName(name) + '-flow');
      if (!existsSync(dir)) return json(res, 200, { files: [] });
      const files = readdirSync(dir)
        .filter((f) => f.endsWith('.png'))
        .sort()
        .map((f) => {
          const m = f.match(/_r(\d+)_/);
          return { file: f, row: m ? Number(m[1]) : null, url: `/evidence/${name}/${encodeURIComponent(f)}`,
            mtime: statSync(join(dir, f)).mtimeMs };
        })
        .sort((a, b) => (a.row ?? 0) - (b.row ?? 0) || a.file.localeCompare(b.file));
      return json(res, 200, { files });
    }

    if (p.startsWith('/evidence/')) {
      const rest = p.slice('/evidence/'.length);
      const cut = rest.lastIndexOf('/');
      const name = cut > 0 ? rest.slice(0, cut) : rest;
      const file = cut > 0 ? decodeURIComponent(rest.slice(cut + 1)) : '';
      if (!/^([A-Za-z0-9._-]+\/)?[A-Za-z0-9._-]+$/.test(name) || file.includes('..') || file.includes('/')) {
        return text(res, 400, 'bad path');
      }
      const f = join(ROOT, 'logs', logName(name) + '-flow', file);
      if (!existsSync(f) || !f.endsWith('.png')) return text(res, 404, 'not found');
      res.writeHead(200, { 'content-type': 'image/png', 'cache-control': 'no-store' });
      return res.end(readFileSync(f));
    }

    if (p === '/logfile') {
      const name = url.searchParams.get('name') || '';
      const f = url.searchParams.get('f') || 'run.html';
      if (!/^([A-Za-z0-9._-]+\/)?[A-Za-z0-9._-]+$/.test(name) || !['run.html', 'run.json'].includes(f)) {
        return text(res, 400, 'bad path');
      }
      const p2 = join(ROOT, 'logs', logName(name) + '-flow', f);
      if (!existsSync(p2)) return text(res, 404, 'not found');
      return text(res, 200, readFileSync(p2, 'utf8'), MIME[extname(f)] || 'text/plain; charset=utf-8');
    }

    // ── mock screens, served same-origin so the picker can talk to us ──
    if (p === '/mock-picker.js') {
      const f = join(PUBLIC, 'mock-picker.js');
      if (!existsSync(f)) return text(res, 404, 'not found');
      return text(res, 200, readFileSync(f, 'utf8'), 'text/javascript; charset=utf-8');
    }
    if (p.startsWith('/mock/')) {
      const abs = resolve(MOCK, p.slice('/mock/'.length));
      if (!abs.startsWith(resolve(MOCK)) || !existsSync(abs) || !statSync(abs).isFile()) {
        return text(res, 404, 'not found');
      }
      const body = readFileSync(abs);
      if (abs.endsWith('.html')) {
        const html = body.toString('utf8')
          // Popup screens read window.opener.document on load. Previews run in
          // a plain iframe with no opener, so give them a same-document one.
          // Preview only: the runner still opens real popups with a real opener.
          .replace(/<head>/i, '<head><script>window.opener=window.opener||window;</script>')
          // The mock kept Thymeleaf expressions unrendered (e.g. the logo
          // src is literally /ANB00${commonForm.logoPath}); don't let the
          // preview request them.
          .replace(/((?:src|href|action)=)"([^"]*\$\{[^"]*)"/gi, 'data-unresolved-$1"$2"')
          .replace(/<\/body>/i, '<script src="/mock-picker.js"></script></body>');
        return text(res, 200, html, 'text/html; charset=utf-8');
      }
      res.writeHead(200, { 'content-type': MIME[extname(abs)] || 'application/octet-stream' });
      return res.end(body);
    }
    // Mock pages reference /static/... and /<APP>/... absolutely.
    if (p.startsWith('/static/') || /^\/(AMB|AMC00|ANB00)\//.test(p)) {
      let refApp = null;
      try {
        refApp = new URL(req.headers.referer || '').pathname.match(/^\/mock\/(AMB|AMC00|ANB00)\//)?.[1] || null;
      } catch { /* no referer */ }
      const cands = [join(MOCK, p.slice(1))];
      if (p.startsWith('/static/')) {
        for (const app of [refApp, 'AMB', 'AMC00', 'ANB00']) if (app) cands.push(join(MOCK, app, p));
      }
      const f = cands.find((x) => existsSync(x) && statSync(x).isFile());
      if (f) {
        res.writeHead(200, { 'content-type': MIME[extname(f)] || 'application/octet-stream' });
        return res.end(readFileSync(f));
      }
      return text(res, 404, 'not found');
    }

    // ── static ──────────────────────────────────────────────────────
    let file = p === '/' ? '/index.html' : p;
    if (file.includes('..')) return text(res, 400, 'bad path');
    const abs = join(PUBLIC, file);
    if (!existsSync(abs) || !statSync(abs).isFile()) return text(res, 404, 'not found');
    res.writeHead(200, { 'content-type': MIME[extname(abs)] || 'application/octet-stream' });
    return res.end(readFileSync(abs));
  } catch (e) {
    return json(res, 500, { error: e.message });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`RPA Studio  http://127.0.0.1:${PORT}`);
});
process.on('exit', stopRun);
process.on('SIGINT', () => { stopRun(); process.exit(130); });
