// Check that every procedure row with evidenceType=画面HC has a screenshot
// entry in logs/<case>/<case>-node-result.json (and how many are exact).
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || '.';
const ev = JSON.parse(readFileSync(join(root, 'automation/blocks/case-evidence.json'), 'utf8'));
const plan = JSON.parse(readFileSync(join(root, 'automation/node-runner/run-plan.json'), 'utf8'));
const cases = [...new Set([...plan.A, ...Object.keys(plan.C)])].sort();

let totalRows = 0, exact = 0, blockend = 0, manual = 0, missingRows = 0, casesOk = 0, casesBad = 0;
const bad = [];
for (const cid of cases) {
  const expected = new Set();
  for (const b of ev[cid]?.blocks || []) {
    for (const a of b.asserts || []) if (a.hc) expected.add(a.row);
    if (b.toHc) expected.add(b.toRow);
  }
  const file = join(root, 'logs', cid, `${cid}-node-result.json`);
  if (!existsSync(file)) { casesBad++; bad.push(`${cid}: no result`); continue; }
  const r = JSON.parse(readFileSync(file, 'utf8'));
  const got = new Map((r.evidence || []).map((e) => [e.row, e]));
  let ok = r.status === 'pass';
  for (const row of expected) {
    totalRows++;
    const e = got.get(row);
    if (!e) { missingRows++; ok = false; continue; }
    if (e.exact) exact++; else if (e.manual) manual++; else blockend++;
  }
  if (ok) casesOk++; else { casesBad++; bad.push(`${cid}: ${r.status}, expected ${expected.size}, got ${got.size}`); }
}
console.log(JSON.stringify({ cases: cases.length, casesOk, casesBad, hcRows: totalRows, exact, blockend, manual, missingRows }, null, 1));
for (const b of bad.slice(0, 30)) console.log('BAD', b);
