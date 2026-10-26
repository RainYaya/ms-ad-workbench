# -*- coding: utf-8 -*-
# Per-case digest for audit + structural groups + param vs 別紙 cross-check.
import json, re, sys, io, os
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
P = json.load(open('logs/_agent4/profiles.json', encoding='utf-8'))

# ---- structural groups by exact block signature ----
from collections import defaultdict, OrderedDict
g = defaultdict(list)
for cid, r in P.items():
    if r.get('missing'): continue
    g['|'.join(r.get('blocks', []))].append(cid)

lines = []
lines.append("# STRUCTURAL GROUPS (exact block signature)\n")
for sig, ids in sorted(g.items(), key=lambda kv: sorted(kv[1])[0]):
    lines.append(f"[{len(ids)}] {' '.join(sorted(ids))}")
    if len(ids) > 1:
        lines.append(f"    SIG: {sig}")
lines.append("")

# ---- generic value filter for cross-check ----
GENERIC = re.compile(r'^(TEST|確認相手TEST|\?|[0-9]{1,4}|1$|2$|B|Z|9|5|7|00 ： 自賠責|照会|2026.*|123456.*|.*任意.*|以下.*|空白|要|代理店|未対応|対応中|連携)$')

def beshi_values(rec):
    # pull 別紙 sheet0 values from raw section 2: rows like 'rows[i][8]: VALUE' or [7]
    s = rec.get('beshi_raw', '')
    vals = []
    for m in re.finditer(r"rows\[\d+\]\[\d+\]: (.+)$", s, re.M):
        v = m.group(1).strip()
        if v and not GENERIC.match(v):
            vals.append(v)
    return vals

lines.append("# PER-CASE DIGEST\n")
for cid in sorted(P):
    r = P[cid]
    if r.get('missing'):
        lines.append(f"## {cid}\n  DOSSIER MISSING\n"); continue
    meta = r.get('meta', {})
    lines.append(f"## {cid}  item={meta.get('item')} fn={meta.get('functionName')}")
    lines.append(f"  feas: {r.get('feas')}")
    lines.append(f"  status3={r.get('status3')} runner={r.get('runner')} blocks={r.get('nblocks')} skipped=[{r.get('skipped')}]")
    # section 1 rows: re-read from dossier for fidelity
    d = open(f"logs/{cid}/{cid}-dossier.md", encoding='utf-8').read()
    s1 = d[d.find('## 1.'):d.find('## 2.')]
    rows = [ln for ln in s1.splitlines() if ln.startswith('- r')]
    lines.append("  手順: " + " // ".join(x.lstrip('- ') for x in rows))
    bv = beshi_values(r)
    lines.append("  別紙业务值: " + json.dumps(bv, ensure_ascii=False))
    # params compact
    auto = set(r.get('autokeys', []))
    pv = r.get('params', {})
    gen = [f"{k}={v}" + ('(auto)' if k in auto else '*') for k, v in sorted(pv.items())]
    lines.append(f"  params({r.get('ptotal')},auto={r.get('pauto')}): " + ", ".join(gen))
    # cross-check: 別紙 distinctive values not found in any param value
    allpv = "|".join(pv.values())
    miss = [v for v in bv if v not in allpv and v not in str(r.get('beshi_raw', ''))]
    # second pass: value may be split in sheet cells; only report truly suspicious
    suspicious = [v for v in miss if len(v) >= 3]
    lines.append("  別紙值未见于params: " + (json.dumps(suspicious, ensure_ascii=False) if suspicious else "(none)"))
    # blocks with screens+notes
    s4 = d[d.find('## 4.'):d.find('## 5.')]
    bl = re.findall(r"^### (\S+)\s+rows (\S+)\s+status3=(\S+)\n((?:  .*\n?)*)", s4, re.M)
    for bid, rows_, st, body in bl:
        acts = re.findall(r"- \[(\w+)\] (\w+) (\S+) sel=\"([^\"]*)\" val=\"([^\"]*)\"(?: \((popup)\))?(?: NOTE:(.*))?", body)
        compact = []
        for a in acts:
            kind, name, what, sel, val, pop, note = a
            t = f"{kind}:{what}"
            if val and val != '""': t += f"={val.replace('params.','')}"
            if note: t += "!NOTE"
            compact.append(t)
        notes = [n for n in re.findall(r"NOTE:(.*)$", body, re.M)]
        lines.append(f"  - {bid} rows{rows_} st={st}: " + " | ".join(compact))
        for n in notes:
            lines.append(f"      NOTE:{n.strip()}")
    # results
    res = r.get('results', [])
    bad = [x for x in res if x[1] != 'pass']
    lines.append("  results: " + ("ALL PASS " + str(len(res)) if not bad else "NONPASS: " + json.dumps(bad)))
    # evidence
    ev = r.get('evidence', [])
    eved = [f"{e['row']}:{e['st']}" for e in ev]
    lines.append("  evidence(" + str(len(ev)) + "): " + " ".join(eved))
    # mech
    mech = r.get('mech', [])
    if mech and not (len(mech) == 1 and 'none' in mech[0].lower()):
        lines.append("  MECH: " + json.dumps(mech, ensure_ascii=False))
    keys = r.get('keys', [])
    lines.append(f"  keys({len(keys)}): " + " ".join(k.rsplit('/', 1)[-1] for k in keys))
    lines.append("")

open('logs/_agent4/digest.md', 'w', encoding='utf-8').write("\n".join(lines))
print("digest lines:", len(lines))
# quick stats
n_pass = sum(1 for r in P.values() if not r.get('missing') and all(x[1] == 'pass' for x in r.get('results', [])))
print("cases:", len(P), "all-pass:", n_pass)
nonpass = [cid for cid, r in P.items() if not r.get('missing') and any(x[1] != 'pass' for x in r.get('results', []))]
print("non-pass cases:", nonpass)
miss_d = [cid for cid, r in P.items() if r.get('missing')]
print("missing dossiers:", miss_d)
