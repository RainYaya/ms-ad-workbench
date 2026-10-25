# -*- coding: utf-8 -*-
# agent4 audit helper: extract structured facts from dossiers for 91 cases.
# Output: logs/_agent4/profiles.json (one record per case) — audit input only, no status files touched.
import json, os, re, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

CASES = """AY-100-08-001 AY-100-08-002 AY-100-08-004 AY-100-08-005 AY-120-08-001 AY-121-07-001
AZ-110-16-001 AZ-110-34-001 AZ-110-40-001 AZ-110-65-001 AZ-110-71-001
AZ-111-05-007 AZ-111-05-008 AZ-111-05-009 AZ-111-05-010 AZ-111-05-011 AZ-150-10-004
AZ-200-03-001 AZ-200-03-003 AZ-210-11-001 AZ-210-17-001 AZ-210-35-001 AZ-210-50-001 AZ-210-64-001
AZ-230-01-011 AZ-230-01-012 AZ-230-01-013 AZ-230-01-014 AZ-230-01-015 AZ-230-01-016 AZ-230-01-017
AZ-230-01-018 AZ-230-01-019 AZ-230-01-020
AZ-230-01-041 AZ-230-01-042 AZ-230-01-043 AZ-230-01-044 AZ-230-01-045 AZ-230-01-046 AZ-230-01-047
AZ-230-01-048 AZ-230-01-049 AZ-230-01-050
AZ-230-01-071 AZ-230-01-072 AZ-230-01-073 AZ-230-01-074 AZ-230-01-075 AZ-230-01-076 AZ-230-01-077
AZ-230-01-078 AZ-230-01-079 AZ-230-01-080
AZ-230-01-101 AZ-230-01-102 AZ-230-01-103 AZ-230-01-104 AZ-230-01-105 AZ-230-01-106 AZ-230-01-107
AZ-230-01-108 AZ-230-01-109 AZ-230-01-110
AZ-230-01-131 AZ-230-01-132 AZ-230-01-133 AZ-230-01-134 AZ-230-01-135 AZ-230-01-136 AZ-230-01-137
AZ-230-01-138 AZ-230-01-139 AZ-230-01-140
AZ-230-01-151 AZ-230-01-152 AZ-230-01-153 AZ-230-01-154 AZ-230-01-155 AZ-230-01-156 AZ-230-01-157
AZ-310-06-001 AZ-310-18-001 AZ-310-24-001 AZ-310-39-001
AZ-410-06-001 AZ-410-06-002 AZ-410-06-003 AZ-510-01-005""".split()

def parse_params(lines):
    params = {}
    for ln in lines:
        m = re.match(r'- (\w+) = "(.*)"  <- (\S+)', ln)
        if m:
            params[m.group(1)] = (m.group(2), m.group(3))
    return params

def section(text, header):
    # header like '## 3.'
    i = text.find(header)
    if i < 0: return ''
    j = text.find('\n## ', i + 4)
    return text[i:j if j > 0 else len(text)]

out = {}
for cid in CASES:
    p = f'logs/{cid}/{cid}-dossier.md'
    if not os.path.exists(p):
        out[cid] = {'missing': True}; continue
    t = open(p, encoding='utf-8').read()
    rec = {'case': cid}
    m = re.search(r'^meta: (.*)$', t, re.M)
    if m:
        try: rec['meta'] = json.loads(m.group(1))
        except Exception: pass
    m = re.search(r'^feasibility: (.*)$', t, re.M)
    if m: rec['feas'] = m.group(1).strip()
    m = re.search(r'^status3\(case\)=(\S+)\s+runner_status=(\S+)\s+blocks=(\d+) skipped=\[(.*)\]', t, re.M)
    if m:
        rec['status3'] = m.group(1); rec['runner'] = m.group(2)
        rec['nblocks'] = int(m.group(3)); rec['skipped'] = m.group(4).strip()
    # section 3 params
    s3 = section(t, '## 3.')
    params = parse_params(s3.splitlines())
    rec['params'] = {k: v[0] for k, v in params.items()}
    rec['psrc'] = {k: v[1] for k, v in params.items()}
    m = re.search(r'params total=(\d+), auto-fallback=(\d+): (.*)$', s3, re.M)
    if m:
        rec['ptotal'] = int(m.group(1)); rec['pauto'] = int(m.group(2))
        rec['autokeys'] = m.group(3).split(', ')
    # section 2 last sheet rows (display) and first sheet — keep raw for diff
    s2 = section(t, '## 2.')
    rec['beshi_raw'] = s2
    # section 4 block ids
    s4 = section(t, '## 4.')
    rec['blocks'] = re.findall(r'^### (BLK-\S+)', s4, re.M)
    # NOTE fields per block (fold into dict)
    notes = re.findall(r'NOTE:(.*)$', s4, re.M)
    rec['block_notes'] = notes
    # section 5
    s5 = section(t, '## 5.')
    rec['results'] = re.findall(r'- (BLK-\S+)\s+(pass|fail|skip|error)', s5)
    # section 6 evidence statuses
    s6 = section(t, '## 6.')
    ev = re.findall(r'- \[(OK |MISS|SOFT|MANUAL)\] (r\d+) (.+?) file=(\S+)', s6)
    rec['evidence'] = [{'st': e[0].strip(), 'row': e[1], 'what': e[2], 'file': e[3]} for e in ev]
    # section 7 key screenshots
    s7 = section(t, '## 7.')
    rec['keys'] = re.findall(r'- logs/\S+', s7)
    # section 8 mechanical
    s8 = section(t, '## 8.')
    rec['mech'] = s8.strip().splitlines()[1:] if s8 else []
    out[cid] = rec

os.makedirs('logs/_agent4', exist_ok=True)
json.dump(out, open('logs/_agent4/profiles.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# compact console digest: group by section 1 title (item) + block signature
from collections import defaultdict
groups = defaultdict(list)
for cid, r in out.items():
    if r.get('missing'): continue
    sig = '|'.join(r.get('blocks', []))
    item = r.get('meta', {}).get('item', '?')
    groups[(item, sig)].append(cid)
for (item, sig), ids in sorted(groups.items()):
    print(f'== {item} :: {len(ids)} cases :: blocks={sig[:120]}')
    print('   ' + ' '.join(ids))
print('TOTAL', len(out), 'missing', sum(1 for r in out.values() if r.get('missing')))
