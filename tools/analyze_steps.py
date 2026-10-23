#!/usr/bin/env python3
"""Prototype step inventory for the assigned procedures.

This is deliberately a *raw* inventory: it preserves screen context and
normalizes only obvious synonyms. Candidate blocks are repeated event n-grams,
not approved building blocks; they still need manual review.
"""
from __future__ import annotations

import json
import re
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TASKS = ROOT / "automation" / "tasks" / "assigned_20261023.txt"
OUT_JSON = ROOT / "automation" / "steps" / "inventory.json"
OUT_MD = ROOT / "automation" / "steps" / "INVENTORY.md"


def load_cases():
    cases = {}
    for f in (ROOT / "v2" / "data" / "cases").glob("*.js"):
        s = f.read_text(encoding="utf-8")
        cases.update(json.loads(s[s.index("=") + 1:].strip().rstrip(";")))
    return cases


def assigned_ids():
    ids = []
    for line in TASKS.read_text(encoding="utf-8-sig").splitlines():
        m = re.match(r"(A[ZY]-\d{3}-\d{2}-\d{3})", line.strip())
        if m:
            ids.append(m.group(1))
    return ids


def clean(value):
    s = unicodedata.normalize("NFKC", str(value or ""))
    s = s.replace("－", "-").replace("—", "-").replace("―", "-")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def screen_key(value):
    s = clean(value)
    s = re.sub(r"画面$", "", s)
    s = s.replace("不備内容入力画面-", "不備内容入力画面-")
    return s or "(blank)"


def button_target(value):
    s = clean(value)
    s = s.replace("「", "").replace("」", "")
    s = re.sub(r"(を)?クリック$", "", s)
    s = re.sub(r"押下$", "", s)
    s = re.sub(r"ボタン$", "", s)
    s = re.sub(r"リンク$", "", s)
    s = s.strip(" .。")
    if s.upper() == "NO":
        s = "No"
    return s


def action_of(op_type, op_item, content):
    t = clean(op_type)
    item = clean(op_item)
    if "入力" in t or "入力" in item:
        if "チェック" in content:
            return "check"
        return "inputBundle" if "各項目" in item or "別紙" in content else "input"
    if "クリック" in t or "押下" in t or "ボタン" in t:
        return "click"
    if "選択" in t:
        return "select"
    if "表示" in t:
        return "display"
    if not t and content:
        return "other"
    return "other"


def data_class(content):
    c = clean(content)
    if not c or c in {"-", "－"}:
        return "none"
    if "別紙" in c or "参照" in c:
        return "bundle"
    if "システム日" in c or "ログインユーザ" in c or "現在日" in c:
        return "derived"
    return "literal"


def data_key(content):
    c = clean(content)
    if not c or c in {"-", "－"}:
        return ""
    c = re.sub(r"[：:]\s*\d+\s*参照", "：#参照", c)
    c = re.sub(r"[：:]\s*[\d０-９]+", "：#", c)
    return c


def assertion_of(v_type, v_item, content):
    t = clean(v_type)
    item = clean(v_item)
    c = clean(content)
    if "遷移" in t:
        return "transition"
    if "表示" in t:
        return "display"
    if "出力" in t:
        return "message"
    if "その他" in t:
        return "other"
    if "初期値" in c:
        return "initial"
    return "other"


def is_blank_op(op_type, op_item, content):
    return not (clean(op_type) or clean(op_item) or clean(content))


def is_blank_ast(v_type, v_item, content):
    return not (clean(v_type) or clean(v_item) or clean(content))


def build_events(case):
    events = []
    last_screen = "(blank)"
    for row in (case.get("workflow") or {}).get("rows", []) or []:
        fn = screen_key(row.get("functionName"))
        if fn != "(blank)":
            last_screen = fn
        screen = last_screen
        op_t = clean(row.get("operationType"))
        op_i = clean(row.get("operationItem"))
        op_c = clean(row.get("operationContent"))
        if not is_blank_op(op_t, op_i, op_c):
            action = action_of(op_t, op_i, op_c)
            target = button_target(op_i) if action == "click" else op_i
            if action == "inputBundle":
                target = "各項目"
            events.append({
                "kind": "op",
                "screen": screen,
                "action": action,
                "target": target,
                "dataClass": data_class(op_c),
                "dataKey": data_key(op_c),
                "rawType": op_t,
                "rawItem": op_i,
                "sourceRow": row.get("sourceRow"),
            })
        v_t = clean(row.get("verificationType"))
        v_i = clean(row.get("verificationItem"))
        v_c = clean(row.get("verificationContent"))
        if not is_blank_ast(v_t, v_i, v_c):
            ast = assertion_of(v_t, v_i, v_c)
            target = screen_key(v_i) if ast == "transition" else v_i
            if ast == "display" and not target:
                target = screen
            events.append({
                "kind": "ast",
                "screen": screen,
                "assert": ast,
                "target": target,
                "dataClass": data_class(v_c),
                "dataKey": data_key(v_c),
                "rawType": v_t,
                "rawItem": v_i,
                "sourceRow": row.get("sourceRow"),
            })
    return events


def op_sig(e):
    return f"{e['screen']}|{e['action']}|{e['target']}|{e['dataClass']}:{e['dataKey']}"


def ast_sig(e):
    return f"{e['screen']}|{e['assert']}|{e['target']}|{e['dataClass']}:{e['dataKey']}"


def case_workflow_sig(case):
    rows = (case.get("workflow") or {}).get("rows", []) or []
    return tuple((
        clean(r.get("functionName")),
        clean(r.get("operationType")),
        clean(r.get("operationItem")),
        clean(r.get("operationContent")),
        clean(r.get("verificationType")),
        clean(r.get("verificationItem")),
        clean(r.get("verificationContent")),
    ) for r in rows)


def main():
    cases = load_cases()
    ids = assigned_ids()
    all_events = {}
    op_counts = Counter()
    ast_counts = Counter()
    screen_counts = Counter()
    for cid in ids:
        ev = build_events(cases[cid])
        all_events[cid] = ev
        for e in ev:
            screen_counts[e["screen"]] += 1
            if e["kind"] == "op":
                op_counts[op_sig(e)] += 1
            else:
                ast_counts[ast_sig(e)] += 1

    def procedure_sig(case):
        rows = (case.get("workflow") or {}).get("rows", []) or []
        return tuple((
            str(r.get("functionName", "")).strip(),
            str(r.get("operationType", "")).strip(),
            str(r.get("operationItem", "")).strip(),
            str(r.get("verificationType", "")).strip(),
            str(r.get("verificationItem", "")).strip(),
            str(r.get("evidenceType", "")).strip(),
        ) for r in rows)

    def raw_workflow_sig(case):
        rows = (case.get("workflow") or {}).get("rows", []) or []
        return tuple(tuple(str(r.get(k, "") or "").strip() for k in (
            "functionName", "operationType", "operationItem", "operationContent",
            "verificationType", "verificationItem", "verificationContent",
        )) for r in rows)

    procedure_groups = Counter(procedure_sig(cases[cid]) for cid in ids)
    workflow_groups = Counter(case_workflow_sig(cases[cid]) for cid in ids)
    raw_workflow_groups = Counter(raw_workflow_sig(cases[cid]) for cid in ids)
    raw_screens = {
        str(r.get("functionName", "")).strip()
        for cid in ids
        for r in ((cases[cid].get("workflow") or {}).get("rows", []) or [])
        if str(r.get("functionName", "")).strip()
    }
    op_seq_groups = Counter(tuple(op_sig(e) for e in all_events[cid] if e["kind"] == "op") for cid in ids)

    # Candidate blocks: contiguous events within one screen segment, 2..6 events,
    # start with an operation, end with an assertion, occurring in >=3 cases.
    block_cases = defaultdict(set)
    block_examples = {}
    block_events = {}
    for cid in ids:
        ev = all_events[cid]
        # split on screen change of operations/assertions
        segments = []
        cur = []
        for e in ev:
            if cur and e["screen"] != cur[-1]["screen"]:
                segments.append(cur)
                cur = []
            cur.append(e)
        if cur:
            segments.append(cur)
        for seg in segments:
            for start in range(len(seg)):
                for length in range(2, 7):
                    end = start + length
                    if end > len(seg):
                        break
                    sub = seg[start:end]
                    if sub[0]["kind"] != "op" or sub[-1]["kind"] != "ast":
                        continue
                    sig = tuple(
                        (e["kind"], e["screen"],
                         e.get("action") or e.get("assert"),
                         e.get("target"),
                         e.get("dataClass"))
                        for e in sub
                    )
                    key = " || ".join(
                        f"{k[0]}:{k[1]}:{k[2]}:{k[3]}:{k[4]}" for k in sig
                    )
                    block_cases[key].add(cid)
                    block_events[key] = sub
                    block_examples.setdefault(key, (cid, sub[0].get("sourceRow")))

    candidates = []
    for key, cids in block_cases.items():
        if len(cids) < 3:
            continue
        sub = block_events[key]
        candidates.append({
            "signature": key,
            "caseCount": len(cids),
            "eventCount": len(sub),
            "score": len(cids) * len(sub),
            "caseIds": sorted(cids)[:8],
            "example": block_examples[key],
            "events": sub,
        })
    candidates.sort(key=lambda x: (-x["score"], x["signature"]))

    # Prefix reuse at operation-sequence level.
    seqs = {cid: tuple(op_sig(e) for e in all_events[cid] if e["kind"] == "op") for cid in ids}
    prefixes = {}
    for n in (3, 5, 8, 12, 20):
        groups = Counter(seq[:n] for seq in seqs.values() if len(seq) >= n)
        prefixes[str(n)] = {
            "cases": sum(groups.values()),
            "uniquePrefixes": len(groups),
            "top": [{"count": c, "prefix": list(p)} for p, c in groups.most_common(5)],
        }

    def common_prefix(a, b):
        n = 0
        for x, y in zip(a, b):
            if x != y:
                break
            n += 1
        return n

    examples = {}
    for left, right in (("AZ-110-37-001", "AZ-110-67-001"), ("AZ-110-01-009", "AZ-110-01-010")):
        a = all_events.get(left, [])
        b = all_events.get(right, [])
        n = common_prefix(a, b)
        examples[f"{left} vs {right}"] = {
            "commonEventPrefix": n,
            "leftEvents": len(a),
            "rightEvents": len(b),
            "leftCase": left,
            "rightCase": right,
        }

    payload = {
        "generatedAt": "2026-10-23",
        "source": str(TASKS.relative_to(ROOT)).replace("\\", "/"),
        "caseCount": len(ids),
        "eventCount": sum(len(v) for v in all_events.values()),
        "screenCount": len(screen_counts),
        "rawScreenCount": len(raw_screens),
        "operationSignatureCount": len(op_counts),
        "assertionSignatureCount": len(ast_counts),
        "exactWorkflowCount": len(procedure_groups),
        "rawWorkflowWithContentCount": len(raw_workflow_groups),
        "normalizedWorkflowWithContentCount": len(workflow_groups),
        "exactWorkflowGroups": [{"count": c, "cases": [cid for cid in ids if procedure_sig(cases[cid]) == sig][:8]} for sig, c in procedure_groups.most_common(10)],
        "operationOnlySequenceCount": len(op_seq_groups),
        "topScreens": screen_counts.most_common(30),
        "topOperations": [{"count": c, "signature": k} for k, c in op_counts.most_common(30)],
        "topAssertions": [{"count": c, "signature": k} for k, c in ast_counts.most_common(30)],
        "prefixReuse": prefixes,
        "candidateBlocks": candidates[:30],
        "examples": examples,
    }
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")

    lines = [
        "# Step inventory (raw, assigned 450 tasks)",
        "",
        "Generated by `tools/analyze_steps.py` from the imported workbook workflows.",
        "This is a **raw step inventory**, not the final approved block library. Candidate blocks are repeated event n-grams and need manual review.",
        "",
        "## Counts",
        "",
        f"- Cases: **{len(ids)}**",
        f"- Events: **{payload['eventCount']}**",
        f"- Screens (canonical names after dash/画面 normalization): **{payload['screenCount']}**; raw screen names: **{payload['rawScreenCount']}**",
        f"- Unique operation signatures (screen-aware): **{payload['operationSignatureCount']}**",
        f"- Unique assertion signatures (screen-aware): **{payload['assertionSignatureCount']}**",
        f"- Exact procedure signatures (6 workbook fields): **{payload['exactWorkflowCount']}**",
        f"- Full-row signatures including content: **{payload['rawWorkflowWithContentCount']}** raw; **{payload['normalizedWorkflowWithContentCount']}** normalized",
        f"- Operation-only sequences: **{payload['operationOnlySequenceCount']}**",
        "",
        "## Top screens",
        "",
        "| Screen | Events |",
        "|---|---:|",
    ]
    for name, n in screen_counts.most_common(20):
        lines.append(f"| {name} | {n} |")
    lines += ["", "## Top operations", "", "| Count | Signature |", "|---:|---|"]
    for item in payload["topOperations"][:20]:
        lines.append(f"| {item['count']} | `{item['signature']}` |")
    lines += ["", "## Top assertions", "", "| Count | Signature |", "|---:|---|"]
    for item in payload["topAssertions"][:20]:
        lines.append(f"| {item['count']} | `{item['signature']}` |")
    lines += ["", "## Prefix reuse (operations only)", "", "| Prefix length | Cases with prefix | Unique prefixes | Top prefix count |", "|---:|---:|---:|---:|"]
    for n, data in prefixes.items():
        top = data["top"][0]["count"] if data["top"] else 0
        lines.append(f"| {n} | {data['cases']} | {data['uniquePrefixes']} | {top} |")
    lines += ["", "## Candidate blocks (not approved)", "", "| Cases | Events | Example start row | Signature |", "|---:|---:|---:|---|"]
    for b in candidates[:20]:
        lines.append(f"| {b['caseCount']} | {b['eventCount']} | {b['example'][1]} | `{b['signature'][:220]}` |")
    lines += ["", "## Concrete comparisons", ""]
    for name, data in examples.items():
        lines.append(f"- `{name}`: common event prefix = **{data['commonEventPrefix']}**, event counts {data['leftEvents']} / {data['rightEvents']}.")
    lines += [
        "",
        "## Method / limitations",
        "",
        "- Screen context is carried forward when `functionName` is blank.",
        "- Only obvious text normalization is applied: whitespace, full-width/half-width, dash variants, button suffixes, `No/NO/No.`.",
        "- `各項目に入力` + 別紙 is still one `inputBundle` operation; the 別紙 fields are **not yet expanded** into field-level parameters.",
        "- `表示内容：N参照` and `初期値` are still bundles; expected state is **not yet expanded**.",
        "- Candidate blocks are repeated contiguous events within a screen segment; no manual block boundary review yet.",
        "- Branches, loops, and error paths are not modeled yet.",
    ]
    OUT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"cases={len(ids)} events={payload['eventCount']} screens={payload['screenCount']} ops={payload['operationSignatureCount']} asts={payload['assertionSignatureCount']} workflows={payload['exactWorkflowCount']} candidates={len(candidates)}")


if __name__ == "__main__":
    main()
