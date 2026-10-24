#!/usr/bin/env python3
"""Export per-template digest inputs for business-summary writing.

For each template in the given categories: the representative case's workflow
rows, appendix key lines, block composition, and per-case parameter diffs
extracted from appendix sheets. Output goes to review/business-summaries/_input/.
Regenerate with: python -X utf8 tools/build_summary_input.py [CAT ...]
(no args = all categories except the already-written AZ-110).
"""
from __future__ import annotations
import json, sys, importlib.util, re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding='utf-8')
spec = importlib.util.spec_from_file_location('stepinv', ROOT / 'tools' / 'analyze_steps.py')
stepinv = importlib.util.module_from_spec(spec); spec.loader.exec_module(stepinv)
cases = stepinv.load_cases()
tpl = json.load(open(ROOT / 'automation/templates.json', encoding='utf-8'))
blocks = json.load(open(ROOT / 'automation/blocks/blocks.json', encoding='utf-8'))
kindmap = {b['id']: (b.get('kind'), b['status3']) for b in blocks['blocks']}
KEYS = ['証券番号','明細番号','ユーザ','点検区分','種目','保険種類','保険始期日','募集人ID','部店課支社','代理店コード','回答内容']

def case_params(cid):
    c = cases.get(cid)
    if not c: return {}
    vals = {}
    for sh in (c.get('appendix') or {}).get('sheets', []):
        for r in sh.get('rows', []):
            cells = [x for x in r if x not in (None, '', ' ')]
            joined = ' '.join(str(x) for x in cells)
            for k in KEYS:
                if k in joined and len(cells) >= 2:
                    v = next((str(x) for x in cells[1:] if str(x) != k and str(x).strip() and not str(x).startswith('シナリオ')), None)
                    if v and k not in vals: vals[k] = v[:26]
    return vals

OUT = ROOT / 'review' / 'business-summaries' / '_input'
OUT.mkdir(parents=True, exist_ok=True)

cats = sys.argv[1:]
if not cats:
    cats = sorted({'-'.join(t['id'].replace('TPL-','').split('-')[:2]) for t in tpl['templates']} - {'AZ-110'})

for cat in cats:
    out = []
    for t in [x for x in tpl['templates'] if x['id'].startswith(f'TPL-{cat}')]:
        rep = t['caseIds'][0]
        c = cases[rep]
        rows = []
        for r in c['workflow']['rows']:
            if r.get('operationItem') or r.get('verificationItem'):
                op = f"{r.get('operationType','')} {r.get('operationItem','')}"
                vd = f"{r.get('verificationType','')} {r.get('verificationItem','')} {r.get('verificationContent','')[:18]}"
                rows.append(f"r{r['sourceRow']}: {op[:38]} | {vd[:42]} | {r.get('evidenceType','')}")
        ap_lines = []
        for sh in (c.get('appendix') or {}).get('sheets', []):
            for r in sh.get('rows', []):
                cells = [x for x in r if x not in (None, '', ' ')]
                if cells: ap_lines.append(' / '.join(str(x)[:26] for x in cells[:4]))
        bl = [f"{b['block']}" for b in blocks['workflows'][rep]['blockDetails']]
        out.append({'tpl': t['id'], 'n': t['count'], 'cases': t['caseIds'], 'fn': c.get('functionName',''),
                    'rows': rows, 'appendix': ap_lines[:24], 'blocks': bl,
                    'params': {cid: case_params(cid) for cid in t['caseIds']}})
    (OUT / f'{cat}.json').write_text(json.dumps(out, ensure_ascii=False, indent=0), encoding='utf-8')
    print(f"{cat}: {len(out)} templates")
print('done')
