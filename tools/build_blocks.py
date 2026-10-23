#!/usr/bin/env python3
"""Build the draft block registry and compose assigned cases from it.

Pilot blocks are extracted from reference cases at fixed event ranges. The
composer uses dynamic programming to maximize covered events; unmatched events
are reported as gaps, never silently dropped.

This is a static composition pass. It does not execute the SUT.
"""
from __future__ import annotations

import importlib.util
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "automation" / "blocks"
OUT.mkdir(parents=True, exist_ok=True)
TASKS = ROOT / "automation" / "tasks" / "assigned_20261023.txt"
RUNNERS = ROOT / "automation" / "runners.json"

spec = importlib.util.spec_from_file_location("stepinv", ROOT / "tools" / "analyze_steps.py")
stepinv = importlib.util.module_from_spec(spec)
spec.loader.exec_module(stepinv)

# id, reference case, [start,end) event indexes, params, preconditions, status, note
SPECS = [
    ("BLK-AZ-MENU-SEARCH-LIST", "AZ-110-37-001", (0, 2), [], [], "source-only", "menu 検索 -> 不備一覧"),
    ("BLK-AZ-LIST-FILTER-OPEN-UPDATE", "AZ-110-37-001", (2, 6), ["caseSearch"], ["result row exists"], "source-only", "list input -> search -> No -> update"),
    ("BLK-AZ-UPDATE-CL", "AZ-110-37-001", (6, 10), [], [], "source-only", "CL -> display -> update -> display"),
    ("BLK-AZ-UPDATE-DELETE-OK", "AZ-110-67-001", (6, 9), [], ["delete confirmation"], "source-only", "delete -> OK -> display"),
    ("BLK-AZ-COMMON-LOGS", "AZ-110-37-001", (10, 14), [], [], "source-only", "AP/DB/申込書/申込不備 checks"),
    ("BLK-AZ-MENU-CREATE-INPUT", "AZ-110-01-009", (0, 2), [], [], "live-verified", "新規登録 -> AZG100"),
    ("BLK-AZ-INPUT-FILL", "AZ-110-01-009", (2, 3), ["caseInput"], [], "live-verified", "AZG100 field bundle"),
    ("BLK-AZ-INSURANCE-SELECT", "AZ-110-01-009", (3, 8), ["insuranceLabel"], [], "live-verified", "insurance popup by label"),
    ("BLK-AZ-AGENT-SELECT", "AZ-110-01-009", (8, 16), ["sectionCode", "agentCode", "fieldAgentId"], ["agent search returns a row"], "mock-verified", "actual SUT agent search currently blocked"),
    ("BLK-AZ-REGISTER-UPDATE", "AZ-110-01-009", (16, 18), [], [], "source-only", "登録 -> update screen"),
    ("BLK-AZ-UPDATE-SEARCH-ITEM", "AZ-110-01-009", (18, 22), [], [], "source-only", "update -> search -> item screen"),
    ("BLK-AZ-ITEM-SEARCH-SELECT", "AZ-110-01-009", (22, 28), [], [], "source-only", "item input -> search -> select"),
    ("BLK-AZ-INQUIRY-EDIT", "AZ-110-01-009", (28, 34), [], [], "source-only", "inquiry check -> 修 -> edit -> OK"),
    ("BLK-AZ-CORRECTION-CONFIRM", "AZ-110-01-009", (34, 40), [], [], "source-only", "agent inquiry 否 -> correction confirm -> register"),
    ("BLK-AZ-COMPLETE-REGISTER", "AZ-110-01-009", (40, 44), [], [], "source-only", "完了登録 -> MAZG101W047 -> update"),
]


def assigned_ids():
    ids = []
    for line in TASKS.read_text(encoding="utf-8-sig").splitlines():
        m = stepinv.re.match(r"(A[ZY]-\d{3}-\d{2}-\d{3})", line.strip())
        if m:
            ids.append(m.group(1))
    return ids


def event_pattern(e):
    """Match key: ignore literal text and bundle reference text, keep data class."""
    return (
        e["kind"],
        e["screen"],
        e.get("action") or e.get("assert"),
        e.get("target", ""),
        e.get("dataClass", "none"),
    )


def pattern_json(events):
    out = []
    for e in events:
        item = {
            "kind": e["kind"],
            "screen": e["screen"],
            "target": e.get("target", ""),
            "dataClass": e.get("dataClass", "none"),
        }
        if e["kind"] == "op":
            item["action"] = e.get("action", "other")
        else:
            item["assert"] = e.get("assert", "other")
        out.append(item)
    return out


def build_blocks(cases):
    blocks = []
    for bid, ref, (start, end), params, preconditions, status, note in SPECS:
        ev = stepinv.build_events(cases[ref])[start:end]
        if not ev:
            raise SystemExit(f"{bid}: empty event range")
        transitions = [e for e in ev if e["kind"] == "ast" and e.get("assert") == "transition"]
        to_screen = transitions[-1]["target"] if transitions else ev[-1]["screen"]
        blocks.append({
            "id": bid,
            "fromScreen": ev[0]["screen"],
            "toScreen": to_screen,
            "params": params,
            "preconditions": preconditions,
            "status": status,
            "note": note,
            "sourceCase": ref,
            "eventRange": [start, end],
            "pattern": pattern_json(ev),
            "assertions": [pattern_json([e])[0] for e in ev if e["kind"] == "ast"],
            "usedByCases": 0,
        })
    return blocks


def match_at(events, i, block):
    if i + len(block["_pattern"]) > len(events):
        return False
    for e, p in zip(events[i:i + len(block["_pattern"])], block["_pattern"]):
        if event_pattern(e) != p:
            return False
    return True


def compose(events, blocks):
    """DP maximizing covered events. Ties prefer longer blocks."""
    n = len(events)
    dp = [0] * (n + 1)
    choice = [None] * n
    for i in range(n - 1, -1, -1):
        # cover this event as a single-event gap
        best = 1 + dp[i + 1]
        best_block = None
        for b in blocks:
            if match_at(events, i, b):
                cost = dp[i + len(b["_pattern"])]
                if cost < best or (cost == best and best_block is not None and len(b["_pattern"]) > len(best_block["_pattern"])):
                    best = cost
                    best_block = b
        dp[i] = best
        choice[i] = best_block
    seq = []
    uncovered = []
    i = 0
    while i < n:
        b = choice[i]
        if b:
            seq.append({"block": b["id"], "start": i, "end": i + len(b["_pattern"])})
            i += len(b["_pattern"])
        else:
            uncovered.append({"event": pattern_json([events[i]])[0], "sourceRow": events[i].get("sourceRow")})
            i += 1
    return seq, uncovered


def main():
    cases = stepinv.load_cases()
    ids = assigned_ids()
    blocks = build_blocks(cases)
    for b in blocks:
        b["_pattern"] = [tuple(x) for x in [
            (p["kind"], p["screen"], p.get("action") or p.get("assert"), p["target"], p["dataClass"])
            for p in b["pattern"]
        ]]
    # longest first helps readability; DP re-checks all
    blocks.sort(key=lambda b: (-len(b["_pattern"]), b["id"]))

    workflows = {}
    block_use = Counter()
    gap_stats = Counter()
    full = []
    partial = []
    total_events = 0
    covered_events = 0
    for cid in ids:
        events = stepinv.build_events(cases[cid])
        total_events += len(events)
        seq, uncovered = compose(events, blocks)
        covered = len(events) - len(uncovered)
        covered_events += covered
        for s in seq:
            block_use[s["block"]] += 1
        for u in uncovered:
            gap_stats[json.dumps(u["event"], ensure_ascii=False, sort_keys=True)] += 1
        status = "full" if not uncovered else "partial"
        (full if status == "full" else partial).append(cid)
        workflows[cid] = {
            "status": status,
            "blocks": seq,
            "uncovered": uncovered,
            "eventCount": len(events),
            "coveredEvents": covered,
        }

    for b in blocks:
        b["usedByCases"] = block_use.get(b["id"], 0)
        b.pop("_pattern", None)

    summary = {
        "caseCount": len(ids),
        "fullCount": len(full),
        "partialCount": len(partial),
        "eventCount": total_events,
        "coveredEvents": covered_events,
        "eventCoverage": round(covered_events / total_events, 4) if total_events else 0,
        "blockCount": len(blocks),
        "fullCaseIds": full,
        "blocks": [{"id": b["id"], "status": b["status"], "usedByCases": b["usedByCases"], "fromScreen": b["fromScreen"], "toScreen": b["toScreen"]} for b in blocks],
        "topGaps": [{"count": c, "event": json.loads(k)} for k, c in gap_stats.most_common(25)],
    }
    payload = {"generatedAt": "2026-10-23", "note": "Static block composition; not execution proof.", "blocks": blocks, "summary": summary, "workflows": workflows}
    (OUT / "blocks.json").write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
    (OUT / "workflows.json").write_text(json.dumps(workflows, ensure_ascii=False, indent=1), encoding="utf-8")

    # Compact payload for the static viewer. Do not ship full event gaps in the
    # initial page; the detailed workflows.json stays the source of truth.
    runner_data = json.loads(RUNNERS.read_text(encoding="utf-8"))
    runner_by_case = {}
    for runner in runner_data.get("runners", []):
        for cid in runner.get("caseIds", []):
            status = runner.get("status", "available")
            if cid in runner.get("blockedCases", []):
                status = "blocked"
            elif cid in runner.get("mockVerifiedCases", []):
                status = "mock-verified"
            runner_by_case[cid] = {
                "id": runner.get("id"),
                "script": runner.get("script"),
                "paramsFile": runner.get("paramsFile"),
                "template": runner.get("template"),
                "status": status,
                "note": runner.get("note", ""),
                "scope": runner.get("scope", ""),
                "baseUrl": runner_data.get("baseUrl"),
                "port": runner_data.get("port"),
            }
    auto_cases = {}
    for cid, w in workflows.items():
        auto_cases[cid] = {
            "status": w["status"],
            "blocks": [x["block"] for x in w["blocks"]],
            "eventCount": w["eventCount"],
            "coveredEvents": w["coveredEvents"],
            "uncoveredCount": len(w["uncovered"]),
            "runner": runner_by_case.get(cid),
        }
    auto_payload = {
        "generatedAt": "2026-10-23",
        "note": "Static composition and runner availability; not execution proof.",
        "summary": {
            "caseCount": len(ids),
            "fullCount": len(full),
            "partialCount": len(partial),
            "eventCount": total_events,
            "coveredEvents": covered_events,
            "eventCoverage": summary["eventCoverage"],
            "blockCount": len(blocks),
            "fullCaseIds": full,
            "topGaps": summary["topGaps"],
        },
        "blocks": [{
            "id": b["id"], "fromScreen": b["fromScreen"], "toScreen": b["toScreen"],
            "params": b["params"], "status": b["status"], "note": b["note"],
            "usedByCases": b["usedByCases"],
        } for b in blocks],
        "cases": auto_cases,
        "runners": runner_data,
    }
    auto_js = "window.MSAD_AUTOMATION = " + json.dumps(auto_payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (ROOT / "v2" / "data" / "automation.js").write_text(auto_js, encoding="utf-8")

    # Coverage report
    lines = [
        "# Block coverage (static composition)",
        "",
        "Generated by `tools/build_blocks.py`. This is a **static composition** pass, not an execution result.",
        "",
        "## Summary",
        "",
        f"- Assigned cases: **{len(ids)}**",
        f"- Fully composed: **{len(full)}**",
        f"- Partial: **{len(partial)}**",
        f"- Events: **{covered_events}/{total_events}** ({summary['eventCoverage']:.1%})",
        f"- Blocks: **{len(blocks)}**",
        "",
        "## Pilot workflows",
        "",
        "| Case | Status | Composition |",
        "|---|---|---|",
    ]
    for cid in ["AZ-110-01-009", "AZ-110-01-010", "AZ-110-01-011", "AZ-110-01-012", "AZ-110-37-001", "AZ-110-67-001"]:
        w = workflows.get(cid)
        if not w:
            continue
        chain = " → ".join(s["block"] for s in w["blocks"])
        lines.append(f"| `{cid}` | {w['status']} | {chain or '—'} |")
    lines += ["", "## Top blocks by case count", "", "| Block | Cases | Status | From → To |", "|---|---:|---|---|"]
    for b in sorted(blocks, key=lambda x: (-x["usedByCases"], x["id"]))[:20]:
        lines.append(f"| `{b['id']}` | {b['usedByCases']} | {b['status']} | {b['fromScreen']} → {b['toScreen']} |")
    lines += ["", "## Top uncovered events", "", "| Cases | Event |", "|---:|---|"]
    for g in summary["topGaps"][:20]:
        e = g["event"]
        label = f"{e['kind']}:{e['screen']}:{e.get('action') or e.get('assert')}:{e['target']}:{e['dataClass']}"
        lines.append(f"| {g['count']} | `{label}` |")
    lines += [
        "",
        "## Interpretation",
        "",
        "- `full` means every procedure event matched a block pattern; it does **not** mean the block has been executed on the SUT.",
        "- `partial` lists unmatched events; those are the next block candidates or custom cases.",
        "- Block statuses: `live-verified`, `mock-verified`, `source-only`. Execution must not treat `source-only` as proven.",
        "- The agent-search block is `mock-verified` but blocked on the actual SUT; the block boundary is valid, the environment is not.",
        "",
        "## Files",
        "",
        "- `blocks.json`: registry + summary + workflow map",
        "- `workflows.json`: per-case block sequence and gaps",
        "- `PILOT.md`: contract and pilot rationale",
    ]
    (OUT / "COVERAGE.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"cases={len(ids)} full={len(full)} partial={len(partial)} events={covered_events}/{total_events} blocks={len(blocks)}")
    for cid in ["AZ-110-01-009", "AZ-110-01-010", "AZ-110-37-001", "AZ-110-67-001"]:
        w = workflows.get(cid)
        if w:
            print(cid, w["status"], [s["block"] for s in w["blocks"]], "gaps", len(w["uncovered"]))


if __name__ == "__main__":
    main()
