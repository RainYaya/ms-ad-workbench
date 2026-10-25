import sys, re, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
base_cid, members = sys.argv[1], sys.argv[2:]
def parse(cid):
    txt = open(f'logs/{cid}/{cid}-dossier.md', encoding='utf-8').read()
    secs = re.split(r'\n(?=## )', txt)
    d = {}
    for s in secs:
        t = s.split('\n',1)[0]
        if t.startswith('## 3'):
            d['params'] = set(l for l in s.split('\n')[1:] if l.startswith('- '))
        elif t.startswith('## 4'):
            d['blocks'] = [l.strip() for l in s.split('\n') if l.strip().startswith('### BLK')]
        elif t.startswith('## 5'):
            d['run'] = [l for l in s.split('\n')[1:] if l.strip().startswith('- BLK')]
        elif t.startswith('## 6'):
            d['ev_bad'] = [l for l in s.split('\n') if l.startswith('- [') and '[OK ]' not in l]
            d['ev_n'] = sum(1 for l in s.split('\n') if l.startswith('- [OK ]'))
        elif t.startswith('## 1'):
            d['steps'] = sum(1 for l in s.split('\n') if re.match(r'- r\d+ \|', l))
        elif t.startswith('meta:'):
            d['meta'] = s
        elif t.startswith('## 2'):
            # extract key business values
            kv = {}
            for l in s.split('\n'):
                m = re.match(r'- .*rows\[\d+\]\[\d+\]: (.*)', l)
                if m:
                    for k in ['証券番号','明細番号','保険契約者氏名','大種目','保種','始期日','申込日','届出日','取消保険料']:
                        if l.startswith('- ') and (k+'　') in l or l.rstrip().endswith(k):
                            pass
            # simpler: find lines whose row label col contains key
            for l in s.split('\n'):
                m = re.search(r'rows\[\d+\]\[1\]: (証券番号|明細番号|保険契約者氏名|大種目)\s*$', l)
            d['key'] = kv
    return d
bp = parse(base_cid)
print(f'BASE {base_cid}: steps={bp.get("steps")} blocks={len(bp.get("blocks",[]))} evOK={bp.get("ev_n")} bad={len(bp.get("ev_bad",[]))}')
for c in members:
    p = parse(c)
    same_blocks = p.get('blocks') == bp.get('blocks')
    pdiff = sorted((p.get('params') or set()) ^ (bp.get('params') or set()))
    print(f'\n== {c}: steps={p.get("steps")} blocks_same_as_base={same_blocks} evOK={p.get("ev_n")} evBAD={len(p.get("ev_bad",[]))} meta_feasible={"feasibility" in p.get("meta","")}')
    for l in p.get('run',[]): print('  ', l.strip())
    for l in p.get('ev_bad',[]): print('  EV!', l.strip()[:160])
    if pdiff:
        for l in pdiff: print('  PDIFF', l[:150])
    else:
        print('   params identical to base')
