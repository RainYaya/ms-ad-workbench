// Run every assigned case against the mock server with bounded concurrency.
// Usage: node tools/run_all.mjs [--base http://127.0.0.1:10091/] [--jobs 6] [--timeout 120]
// Writes logs/run-all-summary.json and prints pass/partial/fail counts.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const runner = join(root, 'automation', 'node-runner', 'runner.mjs');
const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('base', 'http://127.0.0.1:10091/');
const jobs = Number(arg('jobs', '6'));
const timeout = Number(arg('timeout', '120'));

const plan = JSON.parse(readFileSync(join(root, 'automation/node-runner/run-plan.json'), 'utf8'));
const cases = [...new Set([...plan.A, ...Object.keys(plan.C)])].sort();
console.log(`running ${cases.length} cases, jobs=${jobs}, base=${base}`);

function runCase(cid) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [runner, '--case', cid, '--base-url', base, '--trace'], { cwd: dirname(runner) });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    const timer = setTimeout(() => { try { child.kill(); } catch {} }, timeout * 1000);
    child.on('close', (code) => {
      clearTimeout(timer);
      const file = join(root, 'logs', cid, `${cid}-node-result.json`);
      let result = null;
      if (existsSync(file)) { try { result = JSON.parse(readFileSync(file, 'utf8')); } catch {} }
      const status = result?.status || (code === 0 ? 'unknown' : 'fail');
      resolve({ caseId: cid, status, code, blocks: result?.blocks?.length || 0, skipped: result?.skipped || [], error: result?.error || (code !== 0 ? out.split('\n').filter(Boolean).pop() : undefined) });
    });
  });
}

const queue = [...cases];
const results = [];
async function worker() {
  while (queue.length) {
    const cid = queue.shift();
    const r = await runCase(cid);
    results.push(r);
    const tail = r.status === 'pass' ? '' : ` skipped=${r.skipped.length}${r.error ? ` err=${String(r.error).slice(0, 100)}` : ''}`;
    console.log(`${r.status.toUpperCase().padEnd(7)} ${cid} blocks=${r.blocks}${tail}`);
  }
}
await Promise.all(Array.from({ length: jobs }, worker));
const count = (s) => results.filter((r) => r.status === s).length;
const summary = { generatedAt: new Date().toISOString(), base, total: results.length, pass: count('pass'), partial: count('partial'), fail: count('fail'), unknown: count('unknown'), results };
writeFileSync(join(root, 'logs', 'run-all-summary.json'), JSON.stringify(summary, null, 1));
console.log(`DONE total=${summary.total} pass=${summary.pass} partial=${summary.partial} fail=${summary.fail} unknown=${summary.unknown}`);
