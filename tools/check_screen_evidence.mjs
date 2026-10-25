// Validate that each 画面HC screenshot was taken on the expected screen.
// Usage: node tools/check_screen_evidence.mjs [root]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] || '.';
const rules = JSON.parse(readFileSync(join(root, 'automation/blocks/screen-rules.json'), 'utf8'))
  .map((r) => ({ re: new RegExp(r.match), urls: r.urls, match: r.match }));
const plan = JSON.parse(readFileSync(join(root, 'automation/node-runner/run-plan.json'), 'utf8'));
const cases = [...new Set([...plan.A, ...Object.keys(plan.C)])].sort();
const ruleFor = (item) => rules.find((r) => r.re.test(item || ''));

let total = 0, exact = 0, manual = 0, unmapped = 0, ok = 0, mismatch = 0, missing = 0, missingCases = 0;
const bad = [];
for (const cid of cases) {
  const f = join(root, 'logs', cid, `${cid}-node-result.json`);
  if (!existsSync(f)) { missingCases++; continue; }
  const r = JSON.parse(readFileSync(f, 'utf8'));
  for (const e of r.evidence || []) {
    total++;
    if (e.manual) { manual++; continue; }
    if (e.missing || !e.file) { missing++; continue; }
    const rule = ruleFor(e.item);
    if (!rule) { unmapped++; continue; }
    if (!e.url || !rule.urls.some((u) => e.url.includes(u))) {
      mismatch++;
      if (bad.length < 40) bad.push(`${cid} row${e.row} ${e.item} => ${e.url || '(no url)'} (want ${rule.urls.join('|')})`);
    } else { ok++; }
  }
}
console.log(JSON.stringify({ total, ok, mismatch, manual, unmapped, missingRows: missing, missingCases }, null, 1));
for (const b of bad) console.log('BAD', b);
