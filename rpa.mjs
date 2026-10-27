#!/usr/bin/env node
// RPA entry point.
//
//   node rpa.mjs list
//   node rpa.mjs check AZ-240-01-001
//   node rpa.mjs mock  AZ-240-01-001 [--headed] [--port 10117]
//   node rpa.mjs live  AZ-240-01-001 --base https://SUT/ [--row N] [--to-row N]
//   node rpa.mjs studio [port]        # local UI at http://127.0.0.1:10200
//
// A book is one YAML in flows/. Nothing here knows about a specific book:
// the runner reads the YAML, resolves labels through the dictionaries, and
// drives a real browser. check runs offline; mock starts the local mock
// backend for you and stops it afterwards; live is the real machine.
import { spawn } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const RUNNER = join(ROOT, 'automation', 'node-runner');
const FLOWS = join(ROOT, 'flows');

const [, , cmd, target, ...rest] = process.argv;
const has = (f) => rest.includes('--' + f);
const val = (f, d) => { const i = rest.indexOf('--' + f); return i >= 0 ? rest[i + 1] : d; };

function usage() {
  console.error('usage:');
  console.error('  node rpa.mjs list');
  console.error('  node rpa.mjs check <CASE>');
  console.error('  node rpa.mjs mock  <CASE> [--headed] [--port 10117]');
  console.error('  node rpa.mjs live  <CASE> --base URL [--row N] [--to-row N]');
  console.error('  node rpa.mjs studio [port]');
  process.exit(2);
}

function flowPath(name) {
  if (!name) usage();
  if (existsSync(name)) return resolve(name);
  const p = join(FLOWS, name.replace(/\.ya?ml$/, '') + '.yaml');
  if (!existsSync(p)) {
    console.error(`no flow: ${p}`);
    console.error('node rpa.mjs list  — 看看有哪些本');
    process.exit(2);
  }
  return p;
}

function run(args) {
  return new Promise((res) => {
    const c = spawn(process.execPath, args, { stdio: 'inherit', cwd: RUNNER });
    c.on('exit', (code) => res(code ?? 1));
  });
}

async function waitFor(url, ms = 10000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    try { const r = await fetch(url); if (r.ok) return true; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 150));
  }
  return false;
}

if (cmd === 'list') {
  const files = readdirSync(FLOWS)
    .filter((f) => f.endsWith('.yaml') && !f.endsWith('.legacy.yaml'))
    .sort();
  for (const f of files) console.log(f.replace(/\.yaml$/, ''));
  process.exit(0);
}

if (cmd === 'check') {
  process.exit(await run(['check-flow.mjs', flowPath(target)]));
}

if (cmd === 'mock') {
  const flow = flowPath(target);
  const port = Number(val('port', '10117')) || 10117;
  const server = spawn(process.execPath, ['mock-server.mjs', String(port)], {
    cwd: RUNNER, stdio: 'ignore',
  });
  const stop = () => { try { server.kill(); } catch { /* already gone */ } };
  process.on('exit', stop);
  process.on('SIGINT', () => { stop(); process.exit(130); });

  const up = await waitFor(`http://127.0.0.1:${port}/AMB/dummy.html`);
  if (!up) {
    console.error(`mock server did not start on :${port}`);
    stop();
    process.exit(3);
  }
  const args = ['run-flow.mjs', flow, '--base', `http://127.0.0.1:${port}/AMB/dummy.html`, '--yes'];
  args.push(has('headed') ? '' : '--headless');
  const code = await run(args.filter(Boolean));
  stop();
  process.exit(code);
}

if (cmd === 'live') {
  const base = val('base');
  if (!base) { console.error('live needs --base URL'); process.exit(2); }
  const args = ['run-flow.mjs', flowPath(target), '--live', '--base', base];
  // Pass the resumable/limit flags through; never --yes (a human confirms).
  for (const f of ['row', 'to-row', 'shots', 'slow']) {
    if (val(f) !== undefined) args.push('--' + f, val(f));
  }
  if (has('headless')) args.push('--headless');
  process.exit(await run(args));
}

if (cmd === 'studio') {
  const port = Number(target || '10200') || 10200;
  process.exit(await run(['studio/server.mjs', String(port)]));
}

usage();
