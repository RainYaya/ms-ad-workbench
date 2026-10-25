import sys, re, json, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
cid = sys.argv[1]
txt = open(f'logs/{cid}/{cid}-dossier.md', encoding='utf-8').read()
secs = re.split(r'\n(?=## )', txt)
head = secs[0]
print(head.strip()[:600])
for s in secs[1:]:
    title = s.split('\n',1)[0]
    if title.startswith('## 2'):
        # keep operation/input rows only (non-blank meaningful values), cap 30
        kept, blank, total = [], 0, 0
        for ln in s.split('\n')[1:]:
            m = re.match(r'- .*rows\[\d+\]\[(\d+)\]: (.*)', ln)
            if not m: continue
            total += 1
            val = m.group(2)
            if val in ('空白','',) or val.startswith('（') or '※' in val:
                blank += 1; continue
            kept.append(ln)
        print(f'## 2 別紙 (meaningful {len(kept)}/{total} rows, dropped {blank} blank/boilerplate)')
        for ln in kept[:34]: print(ln)
        if len(kept) > 34: print(f'  ... +{len(kept)-34} more')
    elif title.startswith('## 6'):
        lines = s.strip().split('\n')
        ok = sum(1 for l in lines if '[OK ]' in l)
        bad = [l for l in lines if '[OK ]' not in l and l.startswith('- [')]
        print(f'## 6 証跡: {ok} OK, {len(bad)} non-OK')
        for l in bad: print(l)
    elif title.startswith('## 7'):
        for ln in s.strip().split('\n')[1:]: print(ln)
    elif title.startswith('## 9'):
        pass
    else:
        print(s.strip()[:2600])
