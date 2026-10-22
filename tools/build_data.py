#!/usr/bin/env python3
"""Build normalized data for the integration-test workbench.

Sources:
  - 結合試験_シナリオ一覧 (申込) xlsx
  - 結合試験_シナリオ一覧 (異例) xlsx
  - date/document-master_*.json
  - date/test_documents_*.json
  - workflow/*.json

Outputs are plain .js files so the app also works from file://.
"""
from __future__ import annotations

import datetime as _dt
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

import openpyxl
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "v2" / "data"
OUT.mkdir(parents=True, exist_ok=True)
(OUT / "cases").mkdir(exist_ok=True)

AZ_XLSX = ROOT / "【品管SV更改】結合試験_シナリオ一覧(申込)（2026-08-25）.xlsx"
AY_XLSX = ROOT / "【品管SV更改】結合試験_シナリオ一覧(異例)（2026-08-25）.xlsx"
DOC_MASTER = ROOT / "date" / "document-master_20261021_172724.json"
TEST_DOCS = ROOT / "date" / "test_documents_20261021_175741.json"
WORKFLOW = ROOT / "workflow"

ID_RE = re.compile(r"(A[ZY])-(\d{3})-(\d{2})-(\d{3})")
SCENARIO_RE = re.compile(r"(A[ZY])-(\d{3})-(\d{2})")

# ---------------------------------------------------------------------------
# small helpers
# ---------------------------------------------------------------------------


def val(v):
    if v is None:
        return None
    if isinstance(v, _dt.datetime):
        return v.strftime("%Y-%m-%d %H:%M:%S")
    if isinstance(v, _dt.date):
        return v.isoformat()
    if isinstance(v, float) and v.is_integer():
        return int(v)
    if isinstance(v, str):
        s = v.replace("\u3000", " ").strip()
        return s if s else None
    return v


def txt(v) -> str:
    v = val(v)
    return "" if v is None else str(v)


def as_int(v):
    v = val(v)
    if isinstance(v, (int, float)):
        return int(v)
    if isinstance(v, str):
        m = re.search(r"\d+", v)
        if m:
            return int(m.group(0))
    return None


def cell(ws, r, c):
    return val(ws.cell(r, c).value)


def trim_rows(rows):
    rows = [list(r) for r in rows]
    while rows and not any(x is not None and str(x).strip() != "" for x in rows[-1]):
        rows.pop()
    if not rows:
        return []
    width = 0
    for r in rows:
        for i, x in enumerate(r):
            if x is not None and str(x).strip() != "":
                width = max(width, i + 1)
    return [r[:width] for r in rows]


def sheet_rows(ws):
    rows = []
    for r in range(1, ws.max_row + 1):
        rows.append([cell(ws, r, c) for c in range(1, ws.max_column + 1)])
    return trim_rows(rows)


def js_dump(path: Path, var: str, obj):
    payload = json.dumps(obj, ensure_ascii=False, separators=(",", ":"), default=str)
    path.write_text(f"window.{var} = {payload};\n", encoding="utf-8")


# ---------------------------------------------------------------------------
# scenario list
# ---------------------------------------------------------------------------

COLS = {
    "AZ": dict(
        D=4, E=5, F=6, J=10, N=14, U=21, V=22, W=23, X=24, Y=25, Z=26, AA=27,
        step=50, screen=52, check=53, note=54,
        data1=67, data2=68,
        btn=62, fromS=63, cond=64, toS=65,
        s=81, d=82, note2=92,
        state=(43, 49),
    ),
    "AY": dict(
        D=4, E=5, F=6, J=10, N=14, U=21, V=22, W=23, X=24, Y=25, Z=26, AA=27,
        step=40, screen=42, check=43, note=44, state_col=45,
        data1=57, data2=58,
        s=71, d=72, note2=82,
        state=None,
    ),
}


def parse_scenarios(path: Path, sheet: str, prefix: str):
    wb = openpyxl.load_workbook(path, data_only=True, read_only=False)
    ws = wb[sheet]
    c = COLS[prefix]
    starts = [r for r in range(20, ws.max_row + 1) if cell(ws, r, c["E"]) not in (None, "")]
    scenarios = []
    cur_cat = None
    group = {"userType": None, "executionType": None, "functionArea": None}
    for idx, r0 in enumerate(starts):
        r1 = starts[idx + 1] if idx + 1 < len(starts) else ws.max_row + 1
        # group header may be on the scenario row itself or earlier
        d = as_int(cell(ws, r0, c["D"]))
        if d is not None:
            cur_cat = d
        for rr in range(max(1, r0), r0 + 1):
            for key, col in (("userType", c["F"]), ("executionType", c["J"]), ("functionArea", c["N"])):
                v = cell(ws, rr, col)
                if v not in (None, ""):
                    group[key] = v
        # some group headers are only on the first row of the category
        if cell(ws, r0, c["F"]) not in (None, ""):
            group["userType"] = cell(ws, r0, c["F"])
        if cell(ws, r0, c["J"]) not in (None, ""):
            group["executionType"] = cell(ws, r0, c["J"])
        if cell(ws, r0, c["N"]) not in (None, ""):
            group["functionArea"] = cell(ws, r0, c["N"])

        e = as_int(cell(ws, r0, c["E"]))
        sid = f"{prefix}-{cur_cat:03d}-{e:02d}"
        title = ""
        perspective = []
        flow_rows = []
        state_rows = []
        data_patterns = []
        for rr in range(r0, r1):
            # scenario text
            for col in (c["Y"], c["Z"], c["AA"]):
                v = cell(ws, rr, col)
                if v not in (None, ""):
                    s = str(v)
                    if s not in perspective:
                        perspective.append(s)
                    if not title and col == c["Z"]:
                        title = s
            # flow row
            fr = {
                "row": rr,
                "step": txt(cell(ws, rr, c["step"])),
                "screen": txt(cell(ws, rr, c["screen"])),
                "check": txt(cell(ws, rr, c["check"])),
                "note": txt(cell(ws, rr, c["note"])),
            }
            if prefix == "AY":
                fr["state"] = txt(cell(ws, rr, c["state_col"]))
            else:
                fr["button"] = txt(cell(ws, rr, c["btn"]))
                fr["fromStatus"] = txt(cell(ws, rr, c["fromS"]))
                fr["condition"] = txt(cell(ws, rr, c["cond"]))
                fr["toStatus"] = txt(cell(ws, rr, c["toS"]))
            if any(fr.get(k) for k in ("step", "screen", "check", "note", "state", "button", "fromStatus", "condition", "toStatus")):
                flow_rows.append(fr)
            # AZ scenario annotation rows (AQ..AW)
            if c.get("state"):
                a, b = c["state"]
                sr = {}
                for col in range(a, b + 1):
                    v = cell(ws, rr, col)
                    if v not in (None, ""):
                        sr[get_column_letter(col)] = v
                if sr:
                    state_rows.append({"row": rr, **sr})
            # data pattern
            d1 = cell(ws, rr, c["data1"])
            d2 = cell(ws, rr, c["data2"])
            if d2 not in (None, "", "・") or (d1 not in (None, "", "・") and d2 is None):
                axis = txt(d1)
                value = txt(d2)
                # Most rows use ・ in data1 and the real axis in data2.
                if axis == "・":
                    axis = ""
                if value and value != "・":
                    item = {"row": rr, "axis": axis, "value": value}
                    if item not in data_patterns:
                        data_patterns.append(item)
        # group flow rows into steps
        steps = []
        cur = None
        for fr in flow_rows:
            if fr["step"]:
                cur = {"step": fr["step"], "rows": []}
                steps.append(cur)
            if cur is None:
                cur = {"step": "", "rows": []}
                steps.append(cur)
            cur["rows"].append(fr)
        # remove empty wrapper steps
        steps = [s for s in steps if any(any(x.get(k) for k in ("screen", "check", "note", "state", "button", "fromStatus", "condition", "toStatus")) for x in s["rows"])]
        scenarios.append({
            "id": sid,
            "domain": prefix,
            "categoryId": f"{prefix}-{cur_cat:03d}",
            "categoryNo": cur_cat,
            "no": e,
            "userType": group["userType"],
            "executionType": group["executionType"],
            "functionArea": group["functionArea"],
            "u": txt(cell(ws, r0, c["U"])),
            "v": txt(cell(ws, r0, c["V"])),
            "w": txt(cell(ws, r0, c["W"])),
            "x": as_int(cell(ws, r0, c["X"])) or 0,
            "s": as_int(cell(ws, r0, c["s"])),
            "d": as_int(cell(ws, r0, c["d"])),
            "title": title or (perspective[0] if perspective else ""),
            "perspective": perspective,
            "flowRows": flow_rows,
            "steps": steps,
            "stateRows": state_rows,
            "dataPatterns": data_patterns,
            "note": txt(cell(ws, r0, c["note2"])),
            "counts": {
                "pattern": as_int(cell(ws, r0, 85)) if prefix == "AZ" else as_int(cell(ws, r0, 75)),
            },
        })
    wb.close()
    return scenarios


# ---------------------------------------------------------------------------
# routes
# ---------------------------------------------------------------------------

AZ_SLOTS = [30, 37, 44, 51, 58, 65]
AY_SLOTS = list(range(30, 30 + 7 * 29, 7))


def slot_label(ws, r):
    return txt(cell(ws, r, 22))


def _az_parse_scenario_row(ws, r, prev_steps):
    """Parse one 利用シナリオ row into steps. 同上 increments the pattern tail."""
    steps = {}
    for si, s in enumerate(AZ_SLOTS):
        vals = [cell(ws, r, s + j) for j in range(7)]
        pre = txt(vals[0])
        cat = as_int(vals[2])
        no = as_int(vals[4])
        if pre in ("AZ", "AY") and cat is not None and no is not None:
            steps[si] = {
                "order": si + 1,
                "scenarioId": f"{pre}-{cat:03d}-{no:02d}",
                "patternNo": 1,
                "transitions": [], "link": None, "salesStatus": None,
                "agentStatus": None, "user": None,
            }
        elif "同上" in pre and si in prev_steps:
            prev = prev_steps[si]
            steps[si] = {
                "order": si + 1,
                "scenarioId": prev["scenarioId"],
                "patternNo": int(prev["patternNo"]) + 1,
                "transitions": [], "link": None, "salesStatus": None,
                "agentStatus": None, "user": None,
            }
        # "AZ-310-01 からの継続シナリオ" is a note, not a step.
    return steps


def _az_parse_transition_rows(ws, r0, r1, steps):
    for r in range(r0, r1):
        label = slot_label(ws, r)
        for si, s in enumerate(AZ_SLOTS):
            if si not in steps:
                continue
            vals = [cell(ws, r, s + j) for j in range(7)]
            pre = txt(vals[0])
            if label == "導線" and pre:
                steps[si]["transitions"].append({
                    "button": pre,
                    "from": txt(vals[2]),
                    "condition": txt(vals[4]),
                    "result": txt(vals[6]),
                })
            elif label == "連携" and pre:
                steps[si]["link"] = {"from": pre, "to": txt(vals[4])}
            elif label == "営業対応状況" and pre:
                steps[si]["salesStatus"] = {"from": pre, "to": txt(vals[4])}
            elif label == "代理店対応状況" and pre:
                steps[si]["agentStatus"] = {"from": pre, "to": txt(vals[4])}


def _az_parse_user_row(ws, r, steps):
    block_no = None
    for si, s in enumerate(AZ_SLOTS):
        if si not in steps:
            continue
        vals = [cell(ws, r, s + j) for j in range(7)]
        no = as_int(vals[0])
        user_id = txt(vals[1])
        point = txt(vals[5])
        if block_no is None and no is not None:
            block_no = no
        if user_id or no is not None:
            steps[si]["user"] = {"no": no, "id": user_id, "point": point}
    return block_no


def parse_az_routes(path: Path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb["結合試験 シナリオ実施順序（業務）"]
    sections = []
    for r in range(1, ws.max_row + 1):
        b = txt(cell(ws, r, 2))
        if b.startswith("Ⅱ-") or b.startswith("Ⅰ"):
            sections.append({"row": r, "title": b})
    data_rows = []
    for r in range(24, ws.max_row + 1):
        no = as_int(cell(ws, r, 3))
        d = txt(cell(ws, r, 4))
        f = txt(cell(ws, r, 6))
        if no is not None and d in ("MS", "AD") and f and f != "証券番号":
            data_rows.append({
                "row": r, "no": no,
                "data": {
                    "company": d,
                    "policyNo": f,
                    "detailNo": txt(cell(ws, r, 7)),
                    "item": txt(cell(ws, r, 8)),
                    "insuranceType": txt(cell(ws, r, 9)),
                    "sectionCode": txt(cell(ws, r, 10)),
                    "agentCode": txt(cell(ws, r, 11)),
                },
            })
    scenario_rows = [r for r in range(1, ws.max_row + 1) if slot_label(ws, r) == "利用シナリオ"]
    user_rows = [r for r in range(1, ws.max_row + 1) if slot_label(ws, r).startswith("ID")]
    routes = []
    prev_steps = {}

    def section_for(row):
        sec = {"row": 0, "title": ""}
        for s in sections:
            if s["row"] < row:
                sec = s
        return sec

    for idx, dr in enumerate(data_rows):
        r0 = dr["row"]
        sec = section_for(r0)
        sec_start = sec["row"]
        sec_end = ws.max_row + 1
        for s in sections:
            if s["row"] > r0:
                sec_end = s["row"]
                break
        prev_case_row = data_rows[idx - 1]["row"] if idx > 0 and section_for(data_rows[idx - 1]["row"])["title"] == sec["title"] else sec_start
        next_case_row = data_rows[idx + 1]["row"] if idx + 1 < len(data_rows) and section_for(data_rows[idx + 1]["row"])["title"] == sec["title"] else sec_end
        before = [r for r in scenario_rows if prev_case_row < r < r0]
        after = [r for r in scenario_rows if r0 < r < next_case_row]
        # Regular sections: scenario row sits above the case row. Ⅱ-3 has extra
        # scenario-only blocks after the case row, with no following data row.
        if before and after and next_case_row >= sec_end:
            block_scenarios = [before[-1]] + after
        else:
            block_scenarios = [before[-1]] if before else after
        patterns = []
        for si, sr in enumerate(block_scenarios):
            next_sr = next((r for r in scenario_rows if sr < r < (block_scenarios[si + 1] if si + 1 < len(block_scenarios) else next_case_row)), next_case_row)
            steps = _az_parse_scenario_row(ws, sr, prev_steps)
            # user row: the case row itself for regular layout, otherwise nearest ID row after sr
            candidate_users = [r for r in user_rows if sr < r < next_sr]
            if before:
                user_row = r0 if slot_label(ws, r0).startswith("ID") else (candidate_users[0] if candidate_users else None)
            else:
                user_row = candidate_users[-1] if candidate_users else None
            _az_parse_transition_rows(ws, sr + 1, next_sr, steps)
            block_no = None
            if user_row:
                block_no = _az_parse_user_row(ws, user_row, steps)
            if not block_no:
                block_no = len(patterns) + 1
            pat = []
            for si2, st in enumerate(sorted(steps.values(), key=lambda x: x["order"])):
                st["patternNo"] = int(st["patternNo"])
                st["caseId"] = f"{st['scenarioId']}-{st['patternNo']:03d}"
                st["blockNo"] = block_no
                pat.append(st)
            if pat:
                patterns.append({"blockNo": block_no, "steps": pat})
                for st in pat:
                    prev_steps[st["order"] - 1] = {"scenarioId": st["scenarioId"], "patternNo": st["patternNo"]}
        # flatten distinct steps for scenario coverage / legacy UI
        seen = set()
        slots = []
        for p in patterns:
            for st in p["steps"]:
                if st["caseId"] not in seen:
                    seen.add(st["caseId"])
                    slots.append(st)
        routes.append({
            "id": f"AZ-R{dr['no']:03d}",
            "domain": "AZ",
            "no": dr["no"],
            "section": sec["title"],
            "data": dr["data"],
            "patterns": patterns,
            "slots": slots,
            "dataOnly": not slots,
        })
    wb.close()
    return routes

def parse_ay_routes(path: Path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb["結合試験 シナリオ実施順序（業務）"]
    # header sequence (case 0)
    header = {}
    for si, s in enumerate(AY_SLOTS):
        pre = txt(cell(ws, 18, s))
        cat = as_int(cell(ws, 18, s + 2))
        no = as_int(cell(ws, 18, s + 4))
        if pre in ("AZ", "AY") and cat is not None and no is not None:
            header[si] = {
                "order": si + 1, "scenarioId": f"{pre}-{cat:03d}-{no:02d}",
                "transitions": [], "application": None, "clearing": None, "user": None,
                "policyNo": None, "detailNo": None,
            }
        else:
            header[si] = {"order": si + 1, "scenarioId": None, "transitions": [],
                          "application": None, "clearing": None, "user": None,
                          "policyNo": None, "detailNo": None}
        policy = txt(cell(ws, 19, s))
        detail = txt(cell(ws, 19, s + 4))
        if policy:
            header[si]["policyNo"] = policy
        if detail:
            header[si]["detailNo"] = detail
        app_from = txt(cell(ws, 20, s))
        app_to = txt(cell(ws, 20, s + 4))
        if app_from or app_to:
            header[si]["application"] = {"from": app_from, "to": app_to}
        clr_from = txt(cell(ws, 21, s))
        clr_to = txt(cell(ws, 21, s + 4))
        if clr_from or clr_to:
            header[si]["clearing"] = {"from": clr_from, "to": clr_to}
    starts = []
    for r in range(22, ws.max_row + 1):
        no = as_int(cell(ws, r, 3))
        d = txt(cell(ws, r, 4))
        if no is not None and d == "MS":
            starts.append((r, no))
    cases = []
    prev = {k: dict(v) for k, v in header.items() if v.get("scenarioId")}
    for i, (r0, case_no) in enumerate(starts):
        r1 = starts[i + 1][0] if i + 1 < len(starts) else ws.max_row + 1
        info = {
            "item": txt(cell(ws, r0, 8)),
            "insuranceType": txt(cell(ws, r0, 9)),
            "sectionCode": txt(cell(ws, r0, 10)),
            "agentCode": txt(cell(ws, r0, 11)),
            "applicationStandard": txt(cell(ws, r0, 12)),
        }
        slots = {}
        for si, s in enumerate(AY_SLOTS):
            slots[si] = {"order": si + 1, "scenarioId": None, "transitions": [],
                         "application": None, "clearing": None, "user": None,
                         "policyNo": None, "detailNo": None}
        # find label rows
        for r in range(r0, r1):
            label = slot_label(ws, r)
            for si, s in enumerate(AY_SLOTS):
                pre = txt(cell(ws, r, s))
                if label == "利用シナリオ":
                    if "同上" in pre:
                        if si in prev:
                            slots[si]["scenarioId"] = prev[si].get("scenarioId")
                    elif pre in ("AZ", "AY"):
                        cat = as_int(cell(ws, r, s + 2))
                        no = as_int(cell(ws, r, s + 4))
                        if cat is not None and no is not None:
                            slots[si]["scenarioId"] = f"{pre}-{cat:03d}-{no:02d}"
                elif label == "証券番号：明細番号":
                    if pre:
                        slots[si]["policyNo"] = pre
                    detail = txt(cell(ws, r, s + 4))
                    if detail:
                        slots[si]["detailNo"] = detail
                elif label == "申請・確認状況":
                    fr, to = pre, txt(cell(ws, r, s + 4))
                    if fr or to:
                        slots[si]["application"] = {"from": fr, "to": to}
                elif label == "消込状況":
                    fr, to = pre, txt(cell(ws, r, s + 4))
                    if fr or to:
                        slots[si]["clearing"] = {"from": fr, "to": to}
                elif label.startswith("ID"):
                    if pre:
                        slots[si]["user"] = {"no": pre, "id": txt(cell(ws, r, s + 1))}
        slots = [slots[k] for k in sorted(slots) if slots[k]["scenarioId"]]
        prev = {s["order"] - 1: s for s in slots}
        cases.append({
            "id": f"AY-C{case_no:02d}",
            "domain": "AY",
            "no": case_no,
            "section": "Ⅱ-1. IT1 事業会社シナリオ",
            "data": info,
            "slots": slots,
            "dataOnly": not slots,
        })
    template_steps = []
    for si in sorted(header):
        h = header[si]
        if h.get("scenarioId"):
            template_steps.append({
                "order": len(template_steps) + 1,
                "column": si + 1,
                "scenarioId": h["scenarioId"],
                "transitions": [],
                "application": h.get("application"),
                "clearing": h.get("clearing"),
                "user": None,
                "policyNo": h.get("policyNo"),
                "detailNo": h.get("detailNo"),
            })
    template = {
        "id": "AY-T00", "domain": "AY", "no": 0,
        "section": "Ⅱ-1. IT1 事業会社シナリオ",
        "data": {}, "slots": template_steps, "dataOnly": False, "isTemplate": True,
    }
    wb.close()
    return [template] + cases


# ---------------------------------------------------------------------------
# cases
# ---------------------------------------------------------------------------


def norm_id(s):
    m = ID_RE.search(str(s or ""))
    return m.group(0) if m else None


def load_json(path):
    with open(path, "r", encoding="utf-8-sig") as f:
        return json.load(f)


def load_workflow():
    out = {}
    for p in sorted(WORKFLOW.glob("*.json")):
        try:
            d = json.loads(p.read_text(encoding="utf-8-sig"))
        except Exception as exc:
            print(f"[workflow] skip {p.name}: {exc}", file=sys.stderr)
            continue
        cid = norm_id(d.get("documentId")) or norm_id(p.name)
        if not cid:
            continue
        out[cid] = {
            "sourceFile": d.get("sourceFile"),
            "sourcePath": d.get("sourcePath"),
            "generatedAt": d.get("generatedAt"),
            "overview": d.get("workflow", {}).get("overview", {}),
            "rows": d.get("workflow", {}).get("procedure", {}).get("rawRows", []),
        }
    return out


def appendix_score(entry):
    path = ((entry.get("filePath") or "") + " " + (entry.get("fileName") or ""))
    score = 0
    if "_old" in path or "廃止前" in path:
        score -= 100
    if "_参考" in path:
        score -= 50
    if "見本" in path:
        score -= 50
    return score


def load_appendices():
    d = load_json(TEST_DOCS)
    grouped = defaultdict(list)
    skipped = 0
    for x in d.get("documents", []):
        cid = norm_id(x.get("fileName")) or norm_id(x.get("id"))
        if not cid:
            skipped += 1
            continue
        grouped[cid].append(x)
    out = {}
    for cid, xs in grouped.items():
        xs = sorted(xs, key=appendix_score, reverse=True)
        x = xs[0]
        sheets = []
        for sh in x.get("sheets", []):
            sheets.append({
                "name": sh.get("sheetName"),
                "type": sh.get("sheetType"),
                "range": sh.get("range"),
                "rows": trim_rows(sh.get("rows", [])),
            })
        out[cid] = {
            "fileName": x.get("fileName"),
            "filePath": x.get("filePath"),
            "sheets": sheets,
            "duplicates": [z.get("fileName") for z in xs[1:]],
        }
    return out, skipped


def parse_cases():
    doc = load_json(DOC_MASTER)
    docs = {x["id"]: x for x in doc.get("documents", []) if x.get("id")}
    wf = load_workflow()
    apx, skipped_apx = load_appendices()
    ids = sorted(set(docs) | set(wf) | set(apx))
    cases = {}
    for cid in ids:
        m = ID_RE.fullmatch(cid)
        if not m:
            continue
        prefix, cat, scno, _ = m.groups()
        d = docs.get(cid, {})
        w = wf.get(cid)
        a = apx.get(cid)
        fn = d.get("functionName") or ""
        if not fn and w:
            for row in w.get("rows", []):
                if row.get("functionName"):
                    fn = row["functionName"]
                    break
        source_path = (w or {}).get("sourcePath") or (a or {}).get("filePath") or ""
        is_old = ("_old" in source_path) or ("廃止前" in ((w or {}).get("sourceFile") or ""))
        cases[cid] = {
            "id": cid,
            "domain": prefix,
            "categoryId": f"{prefix}-{cat}",
            "scenarioId": f"{prefix}-{cat}-{scno}",
            "company": d.get("company") or ("AD" if "AD" in (a or {}).get("filePath", "") else "MS"),
            "functionName": fn,
            "item": d.get("item") or "",
            "documentType": d.get("documentType") or "",
            "comparisonMark": d.get("comparisonMark") or "",
            "comparisonRequired": bool(d.get("comparisonRequired")),
            "sourceRow": d.get("sourceRow"),
            "sourceFile": (w or {}).get("sourceFile") or (a or {}).get("fileName") or "",
            "sourcePath": source_path,
            "isOld": is_old,
            "hasWorkflow": bool(w),
            "hasAppendix": bool(a),
            "appendixDuplicates": (a or {}).get("duplicates", []),
            "workflow": {
                "overview": (w or {}).get("overview", {}),
                "rows": (w or {}).get("rows", []),
            } if w else None,
            "appendix": {"sheets": (a or {}).get("sheets", [])} if a else None,
        }
    return cases, skipped_apx


# ---------------------------------------------------------------------------
# references
# ---------------------------------------------------------------------------


def parse_users_az(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb["結合試験 ユーザ一覧（業務）"]
    rows = []
    for r in range(6, ws.max_row + 1):
        row = [cell(ws, r, c) for c in range(2, 19)]
        if any(x not in (None, "") for x in row):
            rows.append(row)
    wb.close()
    return trim_rows(rows)


def parse_users_ay(path):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb["結合試験 シナリオ実施順序（業務）"]
    rows = []
    for r in range(5, 12):
        row = [cell(ws, r, c) for c in range(30, 36)]
        if any(x not in (None, "") for x in row):
            rows.append(row)
    wb.close()
    return trim_rows(rows)


def parse_sheet_rows(path, sheet):
    wb = openpyxl.load_workbook(path, data_only=True)
    ws = wb[sheet]
    rows = sheet_rows(ws)
    wb.close()
    return rows


def build_refs():
    return {
        "usersAz": parse_users_az(AZ_XLSX),
        "usersAy": parse_users_ay(AY_XLSX),
        "timezone": parse_sheet_rows(AZ_XLSX, "タイムゾーン確認"),
        "statusMatrix": parse_sheet_rows(AZ_XLSX, "【別紙1】ステータス遷移"),
        "todoPatterns": parse_sheet_rows(AZ_XLSX, "【別紙2-1】ToDoパターン整理"),
        "todoRoutes": parse_sheet_rows(AZ_XLSX, "【別紙2-2】ToDoパターン導線"),
    }


# ---------------------------------------------------------------------------
# build
# ---------------------------------------------------------------------------


def main():
    print("scenarios...")
    az_scenarios = parse_scenarios(AZ_XLSX, "結合試験 シナリオ一覧 (業務)", "AZ")
    ay_scenarios = parse_scenarios(AY_XLSX, "結合試験 シナリオ一覧 (業務) ", "AY")
    scenarios = az_scenarios + ay_scenarios
    print(f"  AZ={len(az_scenarios)} AY={len(ay_scenarios)}")

    print("routes...")
    az_routes = parse_az_routes(AZ_XLSX)
    ay_routes = parse_ay_routes(AY_XLSX)
    routes = az_routes + ay_routes
    print(f"  AZ={len(az_routes)} AY={len(ay_routes)}")

    print("cases...")
    cases, skipped_apx = parse_cases()
    print(f"  cases={len(cases)} appendix_without_id={skipped_apx}")

    # Drop invented pattern IDs that do not exist in document-master/workflow.
    invalid_route_cases = []
    for route in routes:
        for pattern in route.get("patterns", []):
            for st in pattern.get("steps", []):
                cid = st.get("caseId")
                if cid and cid not in cases:
                    invalid_route_cases.append({"routeId": route["id"], "caseId": cid})
                    st["invalidCaseId"] = cid
                    st["caseId"] = None
        for st in route.get("slots", []):
            cid = st.get("caseId")
            if cid and cid not in cases:
                if not any(x.get("caseId") == cid for x in invalid_route_cases):
                    invalid_route_cases.append({"routeId": route["id"], "caseId": cid})
                st["invalidCaseId"] = cid
                st["caseId"] = None

    # attach route refs
    route_refs = defaultdict(list)
    for route in routes:
        for slot in route.get("slots", []):
            sid = slot.get("scenarioId")
            if sid:
                route_refs[sid].append({"routeId": route["id"], "domain": route["domain"],
                                        "order": slot["order"], "section": route.get("section", "")})

    # category aggregation
    cats = {}
    for s in scenarios:
        cid = s["categoryId"]
        c = cats.setdefault(cid, {
            "id": cid, "domain": s["domain"], "prefix": s["domain"],
            "userType": s["userType"], "executionType": s["executionType"],
            "functionArea": s["functionArea"], "scenarioIds": [], "x": 0, "s": 0, "d": 0,
        })
        c["scenarioIds"].append(s["id"])
        c["x"] += s["x"] or 0
        c["s"] += s["s"] or 0
        c["d"] += s["d"] or 0
        # group fields can be blank on later categories; fill from first scenario
        if not c.get("userType") and s.get("userType"):
            c["userType"] = s["userType"]
        if not c.get("executionType") and s.get("executionType"):
            c["executionType"] = s["executionType"]
        if not c.get("functionArea") and s.get("functionArea"):
            c["functionArea"] = s["functionArea"]

    # case aggregation by scenario
    by_scenario = defaultdict(list)
    for c in cases.values():
        by_scenario[c["scenarioId"]].append(c)
    for s in scenarios:
        cs = by_scenario.get(s["id"], [])
        s["caseIds"] = [c["id"] for c in sorted(cs, key=lambda x: x["id"])]
        s["caseCount"] = len(cs)
        s["msCount"] = sum(1 for c in cs if c["company"] == "MS")
        s["adCount"] = sum(1 for c in cs if c["company"] == "AD")
        s["hasRoute"] = bool(route_refs.get(s["id"]))
        s["routeRefs"] = route_refs.get(s["id"], [])

    # index metadata (no large payloads)
    case_index = {}
    for c in cases.values():
        case_index[c["id"]] = {
            "id": c["id"], "domain": c["domain"], "categoryId": c["categoryId"],
            "scenarioId": c["scenarioId"], "company": c["company"],
            "functionName": c["functionName"], "item": c["item"],
            "documentType": c["documentType"], "comparisonMark": c["comparisonMark"],
            "comparisonRequired": c["comparisonRequired"], "sourceRow": c["sourceRow"],
            "sourceFile": c["sourceFile"], "isOld": c["isOld"],
            "hasWorkflow": c["hasWorkflow"], "hasAppendix": c["hasAppendix"],
            "appendixDuplicates": c["appendixDuplicates"],
        }

    # validation
    wf_count = Counter(c["domain"] for c in cases.values() if c["hasWorkflow"])
    doc_count = Counter(c["domain"] for c in cases.values())
    missing_appendix = sorted(c["id"] for c in cases.values() if c["hasWorkflow"] and not c["hasAppendix"])
    missing_workflow = sorted(c["id"] for c in cases.values() if not c["hasWorkflow"])
    old = sorted(c["id"] for c in cases.values() if c["isOld"])
    x_mismatch = []
    for s in scenarios:
        if s["x"] != s["caseCount"]:
            x_mismatch.append({"scenarioId": s["id"], "x": s["x"], "cases": s["caseCount"]})
    sd_mismatch = []
    for s in scenarios:
        if s["domain"] == "AZ" and s["s"] is not None and s["d"] is not None:
            if s["s"] != s["msCount"] or s["d"] != s["adCount"]:
                sd_mismatch.append({"scenarioId": s["id"], "s": s["s"], "d": s["d"],
                                    "ms": s["msCount"], "ad": s["adCount"]})
    validation = {
        "generatedAt": _dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "counts": {
            "scenarios": len(scenarios),
            "azScenarios": len(az_scenarios),
            "ayScenarios": len(ay_scenarios),
            "cases": len(cases),
            "workflowCases": sum(1 for c in cases.values() if c["hasWorkflow"]),
            "appendixCases": sum(1 for c in cases.values() if c["hasAppendix"]),
            "azCases": doc_count.get("AZ", 0),
            "ayCases": doc_count.get("AY", 0),
            "routesAz": len(az_routes),
            "routesAy": len(ay_routes),
        },
        "warnings": {
            "missingAppendix": missing_appendix,
            "missingWorkflow": missing_workflow,
            "old": old,
            "xMismatch": x_mismatch,
            "sdMismatch": sd_mismatch,
            "duplicateAppendix": {c["id"]: c["appendixDuplicates"] for c in cases.values() if c["appendixDuplicates"]},
            "appendixWithoutId": skipped_apx,
            "invalidRouteCaseIds": invalid_route_cases,
        },
    }

    # write index
    index = {
        "meta": {
            "generatedAt": validation["generatedAt"],
            "sourceWorkbooks": [AZ_XLSX.name, AY_XLSX.name],
            "counts": validation["counts"],
        },
        "categories": sorted(cats.values(), key=lambda x: (x["domain"], x["id"])),
        "scenarios": sorted(scenarios, key=lambda x: x["id"]),
        "routes": routes,
        "caseIndex": case_index,
    }
    js_dump(OUT / "index.js", "MSAD_INDEX", index)
    print(f"  index.js {((OUT/'index.js').stat().st_size/1024/1024):.2f} MB")

    refs = build_refs()
    js_dump(OUT / "refs.js", "MSAD_REFS", refs)
    print(f"  refs.js {((OUT/'refs.js').stat().st_size/1024/1024):.2f} MB")

    js_dump(OUT / "validation.js", "MSAD_VALIDATION", validation)
    (OUT / "index.json").write_text(json.dumps(index, ensure_ascii=False, indent=1), encoding="utf-8")
    (OUT / "validation.json").write_text(json.dumps(validation, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"  validation.js {((OUT/'validation.js').stat().st_size/1024/1024):.2f} MB")

    # case files by category
    by_cat = defaultdict(dict)
    for c in cases.values():
        by_cat[c["categoryId"]][c["id"]] = c
    for cat, items in sorted(by_cat.items()):
        path = OUT / "cases" / f"{cat}.js"
        js_dump(path, f"MSAD_CASES_{cat.replace('-', '_')}", items)
        print(f"  {cat:<8} cases={len(items):>4} {path.stat().st_size/1024/1024:.2f} MB")

    print(json.dumps(validation["counts"], ensure_ascii=False, indent=2))
    print("warnings:",
          {k: (len(v) if isinstance(v, (list, dict)) else v) for k, v in validation["warnings"].items()})


if __name__ == "__main__":
    main()
