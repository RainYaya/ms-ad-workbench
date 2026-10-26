#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""同型系列本の差分一括確認: params diff + 別紙 diff + ブロック構成 diff (audit-only, 只读)."""
import re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

def parse(cid):
    p = f'logs/{cid}/{cid}-dossier.md'
    params, sheets, blocks, sec = {}, {}, {}, None
    for line in open(p, encoding='utf-8'):
        line = line.rstrip('\n')
        if line.startswith('## '):
            sec = line; continue
        m = re.match(r'^- (\w[\w-]*)\s*=\s*"(.*?)"\s*<-\s*(\S+)$', line)
        if m and sec and '生效参数' in sec:
            params[m.group(1)] = (m.group(2), m.group(3))
        m = re.match(r'^sheets\[(\d+)\]/rows\[(\d+)\]\[(\d+)\]:\s*(.*)$', line)
        if m:
            sheets.setdefault(m.group(1), []).append((int(m.group(2)), int(m.group(3)), m.group(4)))
        m = re.match(r'^### (BLK-\S+)\s+rows (\S+)\s+status3=(\S+)', line)
        if m:
            blocks.setdefault(m.group(1), []).append((m.group(2), m.group(3)))
    return params, sheets, blocks

rep = sys.argv[1]
rp, rs, rb = parse(rep)
for cid in sys.argv[2:]:
    mp, ms, mb = parse(cid)
    pdiff = [f'{k}:[{rp.get(k,("<abs>","-"))[0]}]->[{mp.get(k,("<abs>","-"))[0]}]'
             for k in sorted(set(rp)|set(mp)) if rp.get(k)!=mp.get(k)]
    sd = []
    for si in sorted(set(rs)|set(ms)):
        rmap = {(r,c):v for r,c,v in rs.get(si,[])}; mmap = {(r,c):v for r,c,v in ms.get(si,[])}
        for key in sorted(set(rmap)|set(mmap)):
            if rmap.get(key,'<abs>') != mmap.get(key,'<abs>'):
                sd.append(f's{si}r{key[0]}c{key[1]}:[{rmap.get(key,"<abs>")}]->[{mmap.get(key,"<abs>")}]')
    bd = []
    for b in sorted(set(rb)|set(mb)):
        if rb.get(b) != mb.get(b):
            bd.append(f'{b}: {rb.get(b)} -> {mb.get(b)}')
    print(f'== {cid} ==')
    print(' params(%d): %s' % (len(pdiff), ' '.join(pdiff)))
    print(' sheets(%d): %s' % (len(sd), ' '.join(sd)))
    print(' blocks(%d): %s' % (len(bd), ' '.join(bd) if bd else '(same)'))
