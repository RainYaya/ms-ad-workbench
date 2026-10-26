#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""组内成员本 vs 代表本: §3 参数差异 + §2 別紙差异 对照工具 (audit-only, 只读)."""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def parse(cid):
    p = f'logs/{cid}/{cid}-dossier.md'
    params, sheets, sec = {}, {}, None
    for line in open(p, encoding='utf-8'):
        line = line.rstrip('\n')
        if line.startswith('## '):
            sec = line
            continue
        m = re.match(r'^- (\w[\w-]*)\s*=\s*"(.*?)"\s*<-\s*(\S+)$', line)
        if m and sec and '生效参数' in sec:
            params[m.group(1)] = (m.group(2), m.group(3))
        m = re.match(r'^sheets\[(\d+)\]/name:\s*(.*)$', line)
        if m:
            cur = m.group(1)
            sheets[cur] = {'name': m.group(2), 'rows': []}
        m = re.match(r'^sheets\[(\d+)\]/rows\[(\d+)\]\[(\d+)\]:\s*(.*)$', line)
        if m:
            sheets.setdefault(m.group(1), {'name': '?', 'rows': []})
            sheets[m.group(1)]['rows'].append((int(m.group(2)), int(m.group(3)), m.group(4)))
    return params, sheets

rep = sys.argv[1]
members = sys.argv[2:]
rp, rs = parse(rep)
for cid in members:
    mp, ms = parse(cid)
    print(f'\n===== {cid} vs {rep} =====')
    # meta line
    for line in open(f'logs/{cid}/{cid}-dossier.md', encoding='utf-8'):
        if line.startswith('meta:'):
            print(line.strip()[:200]); break
    allk = sorted(set(rp) | set(mp))
    pdiff = []
    for k in allk:
        rv = rp.get(k, ('<absent>', '-')); mv = mp.get(k, ('<absent>', '-'))
        if rv != mv:
            pdiff.append(f'  {k}: [{rv[0]}|{rv[1]}] -> [{mv[0]}|{mv[1]}]')
    print(f'params diff ({len(pdiff)}):')
    print('\n'.join(pdiff) if pdiff else '  (none)')
    # 別紙 diff: compare rows per sheet index
    sd = []
    for si in sorted(set(rs) | set(ms)):
        rr = rs.get(si, {}).get('rows', []); mr = ms.get(si, {}).get('rows', [])
        rmap = {(r, c): v for r, c, v in rr}; mmap = {(r, c): v for r, c, v in mr}
        for key in sorted(set(rmap) | set(mmap)):
            rvv = rmap.get(key, '<absent>'); mvv = mmap.get(key, '<absent>')
            if rvv != mvv:
                sd.append(f'  sheet[{si}] r{key[0]}c{key[1]}: [{rvv}] -> [{mvv}]')
    print(f'別紙 diff ({len(sd)}):')
    print('\n'.join(sd) if sd else '  (none)')
