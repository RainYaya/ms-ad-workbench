#!/usr/bin/env python3
"""Build the draft block registry and compose assigned cases from it.

Pilot blocks are extracted from reference cases at fixed event ranges. The
composer uses dynamic programming to maximize covered events; unmatched events
are reported as gaps, never silently dropped.

This is a static composition pass. It does not execute the SUT.
"""
from __future__ import annotations

import hashlib
import importlib.util
import json
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "automation" / "blocks"
OUT.mkdir(parents=True, exist_ok=True)
TASKS = ROOT / "automation" / "tasks" / "assigned_20261023.txt"
RUNNERS = ROOT / "automation" / "runners.json"
EXEC_STATUS = ROOT / "automation" / "execution-status.json"
TEMPLATES = ROOT / "automation" / "templates.json"
PROGRESS = ROOT / "automation" / "progress"

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


def is_sublist(short, long):
    if len(short) > len(long):
        return False
    for i in range(len(long) - len(short) + 1):
        if tuple(long[i:i + len(short)]) == tuple(short):
            return True
    return False


def mine_auto_blocks(cases, ids, curated):
    """Mine repeated screen-level event n-grams as draft candidates.

    These are not approved blocks. They are added so the composer can measure
    how much of the 450-case corpus is mechanically reusable.
    """
    curated_sigs = {tuple(
        (p["kind"], p["screen"], p.get("action") or p.get("assert"), p["target"], p["dataClass"])
        for p in b["pattern"]
    ) for b in curated}
    found = {}
    examples = {}
    for cid in ids:
        events = stepinv.build_events(cases[cid])
        # Split at screen changes; blocks do not span screens.
        segments = []
        cur = []
        for e in events:
            if cur and e["screen"] != cur[-1]["screen"]:
                segments.append(cur)
                cur = []
            cur.append(e)
        if cur:
            segments.append(cur)
        for seg in segments:
            for start in range(len(seg)):
                for length in range(2, 9):
                    end = start + length
                    if end > len(seg):
                        break
                    sub = seg[start:end]
                    if sub[0]["kind"] != "op" or sub[-1]["kind"] != "ast":
                        continue
                    if any(e["screen"] == "(blank)" for e in sub):
                        continue
                    key = tuple(event_pattern(e) for e in sub)
                    if key in curated_sigs:
                        continue
                    found.setdefault(key, set()).add(cid)
                    examples.setdefault(key, (cid, sub[0].get("sourceRow")))
    candidates = []
    for key, cids in found.items():
        if len(cids) < 3:
            continue
        candidates.append((len(cids) * len(key), len(cids), len(key), key, cids))
    candidates.sort(key=lambda x: (-x[0], -x[2], -x[1]))
    selected = []
    selected_keys = []
    for score, count, length, key, cids in candidates:
        # Prefer the longest form; avoid adding a shorter sub-block of an
        # already selected longer block with comparable coverage.
        if any(is_sublist(key, sk) for sk in selected_keys):
            continue
        selected.append((score, count, length, key, cids))
        selected_keys.append(key)
        if len(selected) >= 40:
            break
    out = []
    for score, count, length, key, cids in selected:
        first_case, first_row = examples[key]
        transitions = [p for p in key if p[0] == "ast" and p[2] == "transition"]
        to_screen = transitions[-1][3] if transitions else key[-1][1]
        params = ["bundle"] if any(p[4] == "bundle" for p in key) else []
        events = [{
            "kind": p[0], "screen": p[1],
            **({"action": p[2]} if p[0] == "op" else {"assert": p[2]}),
            "target": p[3], "dataClass": p[4],
        } for p in key]
        out.append({
            "id": "BLK-AUTO-" + hashlib.sha1(repr(key).encode("utf-8")).hexdigest()[:8].upper(),
            "fromScreen": key[0][1],
            "toScreen": to_screen,
            "params": params,
            "preconditions": [],
            "status": "draft-auto",
            "note": "Auto-mined candidate; manual review required.",
            "sourceCase": first_case,
            "eventRange": [0, 0],
            "pattern": events,
            "assertions": [p for p in events if p["kind"] == "ast"],
            "usedByCases": 0,
            "_autoCount": count,
            "_firstRow": first_row,
        })
    return out


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
                is_auto = b.get("status") == "draft-auto"
                best_auto = best_block is not None and best_block.get("status") == "draft-auto"
                if cost < best:
                    best = cost
                    best_block = b
                elif cost == best:
                    # Prefer a curated block over an auto-mined candidate.
                    if best_block is None or (best_auto and not is_auto):
                        best_block = b
                    elif best_auto == is_auto and len(b["_pattern"]) > len(best_block["_pattern"]):
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


EXEC_KEYS = (
    ("livePass", "live-pass"),
    ("mockPass", "mock-pass"),
    ("blocked", "blocked"),
    ("notImplemented", "not-implemented"),
    ("notRun", "not-run"),
)


def execution_map(info):
    out = {}
    for key, status in EXEC_KEYS:
        for bid in (info or {}).get(key, []):
            out[bid] = status
    return out


def main():
    cases = stepinv.load_cases()
    ids = assigned_ids()
    curated = build_blocks(cases)
    auto_blocks = mine_auto_blocks(cases, ids, curated)
    blocks = curated + auto_blocks
    for b in blocks:
        b["_pattern"] = [tuple(x) for x in [
            (p["kind"], p["screen"], p.get("action") or p.get("assert"), p["target"], p["dataClass"])
            for p in b["pattern"]
        ]]
    # longest first helps readability; DP re-checks all
    blocks.sort(key=lambda b: (-len(b["_pattern"]), b["id"]))

    exec_data = json.loads(EXEC_STATUS.read_text(encoding="utf-8"))
    exec_cases = exec_data.get("cases", {})
    # Three-state model (2026-10-24, user-approved): verified / coded / planned.
    # Source of truth is status3Map in execution-status.json, not scattered flags.
    s3_map = exec_data.get("status3Map", {})
    S3_VERIFIED = set(s3_map.get("verified", []))
    S3_CODED = set(s3_map.get("coded", []))
    def status3_of(block_id):
        if block_id in S3_VERIFIED:
            return "verified"
        if block_id in S3_CODED:
            return "coded"
        return "planned"
    template_by_case = {}
    if TEMPLATES.exists():
        tpl_data = json.loads(TEMPLATES.read_text(encoding="utf-8"))
        for t in tpl_data.get("templates", []):
            for cid in t.get("caseIds", []):
                template_by_case[cid] = {"id": t["id"], "count": t["count"], "rowCount": t["rowCount"]}

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
        info = exec_cases.get(cid, {})
        status_by_block = execution_map(info)
        block_details = []
        for s_ in seq:
            start, end = s_["start"], s_["end"]
            block_details.append({
                "block": s_["block"],
                "start": start,
                "end": end,
                "fromRow": events[start].get("sourceRow"),
                "toRow": events[end - 1].get("sourceRow"),
                "status": status_by_block.get(s_["block"], "not-run"),
                "status3": status3_of(s_["block"]),
            })
        cov3 = {"planned": 0, "coded": 0, "verified": 0}
        for s_ in seq:
            cov3[status3_of(s_["block"])] += s_["end"] - s_["start"]
        cov3["uncovered"] = len(uncovered)
        cov3["total"] = len(events)
        s3_list = [bd["status3"] for bd in block_details]
        if block_details and all(x == "verified" for x in s3_list):
            case_s3 = "verified"
        elif any(x in ("coded", "verified") for x in s3_list):
            case_s3 = "coded"
        elif block_details:
            case_s3 = "planned"
        else:
            case_s3 = "none"
        counts = Counter(b["status"] for b in block_details)
        remaining_blocks = [b["block"] for b in block_details if b["status"] != "live-pass"]
        next_gap = None
        if remaining_blocks:
            next_gap = {"kind": "block", "block": remaining_blocks[0]}
        elif uncovered:
            next_gap = {"kind": "event", "event": uncovered[0]["event"], "sourceRow": uncovered[0].get("sourceRow")}
        workflows[cid] = {
            "status": status,
            "status3": case_s3,
            "coverage3": cov3,
            "blocks": seq,
            "blockDetails": block_details,
            "uncovered": uncovered,
            "eventCount": len(events),
            "coveredEvents": covered,
            "actualDone": counts.get("live-pass", 0),
            "mockDone": counts.get("mock-pass", 0),
            "blocked": counts.get("blocked", 0),
            "notImplemented": counts.get("not-implemented", 0),
            "notRun": counts.get("not-run", 0),
            "remaining": len(block_details) - counts.get("live-pass", 0),
            "remainingBlocks": remaining_blocks,
            "nextGap": next_gap,
            "executionNote": info.get("note", ""),
            "template": template_by_case.get(cid),
        }

    # Drop auto-mined candidates that the composer never selected; they are
    # noise in the registry and would inflate the block count.
    blocks = [b for b in blocks if b.get("status") != "draft-auto" or block_use.get(b["id"], 0) > 0]

    def corpus_stats(block_set):
        n_full = 0
        n_covered = 0
        n_total = 0
        for cid in ids:
            ev = stepinv.build_events(cases[cid])
            _, gap = compose(ev, block_set)
            n_total += len(ev)
            n_covered += len(ev) - len(gap)
            if not gap:
                n_full += 1
        return n_full, n_covered, n_total

    curated_full, curated_covered, curated_total = corpus_stats(curated)
    auto_count = sum(1 for b in blocks if b.get("status") == "draft-auto")

    block_statuses = defaultdict(list)
    for w in workflows.values():
        for bd in w.get("blockDetails", []):
            block_statuses[bd["block"]].append(bd["status"])

    def aggregate_status(statuses):
        if "blocked" in statuses:
            return "blocked"
        if "live-pass" in statuses:
            return "live-pass"
        if "mock-pass" in statuses:
            return "mock-pass"
        if "not-implemented" in statuses:
            return "not-implemented"
        return "not-run"

    for b in blocks:
        b["usedByCases"] = block_use.get(b["id"], 0)
        b["executionStatus"] = aggregate_status(block_statuses.get(b["id"], []))
        b["status3"] = status3_of(b["id"])
        b.pop("_pattern", None)

    actual_full = [cid for cid, w in workflows.items() if w["actualDone"] == len(w["blockDetails"]) and w["blockDetails"]]
    actual_partial = [cid for cid, w in workflows.items() if 0 < w["actualDone"] < len(w["blockDetails"])]
    mock_only = [cid for cid, w in workflows.items() if w["actualDone"] == 0 and w["mockDone"] > 0]
    blocked_cases = [cid for cid, w in workflows.items() if w["blocked"] > 0]

    summary = {
        "caseCount": len(ids),
        "fullCount": len(full),
        "partialCount": len(partial),
        "eventCount": total_events,
        "coveredEvents": covered_events,
        "eventCoverage": round(covered_events / total_events, 4) if total_events else 0,
        "blockCount": len(blocks),
        "fullCaseIds": full,
        "curatedBlockCount": len(curated),
        "autoBlockCount": auto_count,
        "curatedFullCount": curated_full,
        "curatedEventCoverage": round(curated_covered / curated_total, 4) if curated_total else 0,
        "actualFullCount": len(actual_full),
        "actualPartialCount": len(actual_partial),
        "mockOnlyCount": len(mock_only),
        "blockedCaseCount": len(blocked_cases),
        "actualFullCaseIds": actual_full,
        "actualPartialCaseIds": actual_partial,
        "mockOnlyCaseIds": mock_only,
        "blockedCaseIds": blocked_cases,
        "blocks": [{"id": b["id"], "status": b["status"], "executionStatus": b["executionStatus"], "usedByCases": b["usedByCases"], "fromScreen": b["fromScreen"], "toScreen": b["toScreen"]} for b in blocks],
        "topGaps": [{"count": c, "event": json.loads(k)} for k, c in gap_stats.most_common(25)],
        "status3Counts": dict(Counter(status3_of(b["id"]) for b in blocks)),
        "status3CaseCounts": dict(Counter(w["status3"] for w in workflows.values())),
        "status3EventCoverage": {
            k: sum(w["coverage3"][k] for w in workflows.values())
            for k in ("planned", "coded", "verified", "uncovered", "total")
        },
    }
    payload = {"generatedAt": "2026-10-24", "note": "Static block composition; not execution proof.", "blocks": blocks, "summary": summary, "workflows": workflows}
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
            "status3": w["status3"],
            "coverage3": w["coverage3"],
            "blocks": [x["block"] for x in w["blocks"]],
            "blockDetails": w["blockDetails"],
            "eventCount": w["eventCount"],
            "coveredEvents": w["coveredEvents"],
            "uncoveredCount": len(w["uncovered"]),
            "actualDone": w["actualDone"],
            "mockDone": w["mockDone"],
            "blocked": w["blocked"],
            "notImplemented": w["notImplemented"],
            "notRun": w["notRun"],
            "remaining": w["remaining"],
            "remainingBlocks": w["remainingBlocks"],
            "nextGap": w["nextGap"],
            "executionNote": w["executionNote"],
            "template": w["template"],
            "runner": runner_by_case.get(cid),
        }
    auto_payload = {
        "generatedAt": "2026-10-24",
        "note": "Static composition and runner availability; not execution proof.",
        "summary": {
            "caseCount": len(ids),
            "fullCount": len(full),
            "partialCount": len(partial),
            "eventCount": total_events,
            "coveredEvents": covered_events,
            "eventCoverage": summary["eventCoverage"],
            "blockCount": len(blocks),
            "curatedBlockCount": summary["curatedBlockCount"],
            "autoBlockCount": summary["autoBlockCount"],
            "curatedFullCount": summary["curatedFullCount"],
            "curatedEventCoverage": summary["curatedEventCoverage"],
            "fullCaseIds": full,
            "actualFullCount": summary["actualFullCount"],
            "actualPartialCount": summary["actualPartialCount"],
            "mockOnlyCount": summary["mockOnlyCount"],
            "blockedCaseCount": summary["blockedCaseCount"],
            "topGaps": summary["topGaps"],
            "status3Counts": summary["status3Counts"],
            "status3CaseCounts": summary["status3CaseCounts"],
            "status3EventCoverage": summary["status3EventCoverage"],
        },
        "blocks": [{
            "id": b["id"], "fromScreen": b["fromScreen"], "toScreen": b["toScreen"],
            "params": b["params"], "status": b["status"], "executionStatus": b["executionStatus"],
            "status3": b["status3"],
            "note": b["note"], "usedByCases": b["usedByCases"],
        } for b in blocks],
        "cases": auto_cases,
        "runners": runner_data,
    }
    auto_js = "window.MSAD_AUTOMATION = " + json.dumps(auto_payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
    (ROOT / "v2" / "data" / "automation.js").write_text(auto_js, encoding="utf-8")

    # Persistent progress ledger. This is the "which book is at which step" table.
    PROGRESS.mkdir(parents=True, exist_ok=True)
    def gap_label(g):
        if not g:
            return "—"
        if g.get("kind") == "block":
            return g.get("block", "—")
        e = g.get("event", {})
        return f"{e.get('screen', '')}:{e.get('action') or e.get('assert') or ''}:{e.get('target', '')} (row {g.get('sourceRow', '—')})"

    progress_cases = {}
    for cid, w in workflows.items():
        t = w.get("template") or {}
        progress_cases[cid] = {
            "caseId": cid,
            "book": t.get("id", ""),
            "static": w["status"],
            "status3": w["status3"],
            "coverage3": w["coverage3"],
            "blocks": len(w["blockDetails"]),
            "actualDone": w["actualDone"],
            "mockDone": w["mockDone"],
            "blocked": w["blocked"],
            "notImplemented": w["notImplemented"],
            "notRun": w["notRun"],
            "uncovered": len(w["uncovered"]),
            "remaining": w["remaining"],
            "next": gap_label(w["nextGap"]),
            "note": w["executionNote"],
        }
    (OUT / "progress.json").write_text(json.dumps({
        "generatedAt": "2026-10-24",
        "summary": summary,
        "cases": progress_cases,
    }, ensure_ascii=False, indent=1), encoding="utf-8")

    block_exec_counts = Counter(b["executionStatus"] for b in blocks)
    lines = [
        "# Progress ledger",
        "",
        "更新: 2026-10-23",
        "",
        "This is the per-book / per-case progress table. It is separate from static block coverage: `block full` does not mean the case was executed.",
        "",
        "## Snapshot",
        "",
        "| Item | Count |",
        "|---|---:|",
        f"| Assigned cases | {len(ids)} |",
        f"| Static block full (curated + auto) | {len(full)} |",
        f"| Curated-only full | {summary['curatedFullCount']} |",
        f"| Actually fully passed | {len(actual_full)} |",
        f"| Actually partially passed | {len(actual_partial)} |",
        f"| Mock-only | {len(mock_only)} |",
        f"| Environment-blocked cases | {len(blocked_cases)} |",
        f"| Blocks | {len(blocks)} ({summary['curatedBlockCount']} curated + {summary['autoBlockCount']} auto) |",
        f"| Event coverage | {summary['eventCoverage']:.1%} auto-inclusive / {summary['curatedEventCoverage']:.1%} curated-only |",
        f"| Status3 blocks | verified {summary['status3Counts'].get('verified', 0)} / coded {summary['status3Counts'].get('coded', 0)} / planned {summary['status3Counts'].get('planned', 0)} |",
        f"| Status3 cases | verified {summary['status3CaseCounts'].get('verified', 0)} / coded {summary['status3CaseCounts'].get('coded', 0)} / planned {summary['status3CaseCounts'].get('planned', 0)} / none {summary['status3CaseCounts'].get('none', 0)} |",
        "",
        "Three-state model: **verified** = live SUT pass; **coded** = implemented + mock-passed, live pending; **planned** = everything else. See STATUS3.md.",
        "",
        "Block execution state (legacy):",
        "",
        "| State | Blocks |",
        "|---|---:|",
    ]
    for state in ("live-pass", "mock-pass", "blocked", "not-implemented", "not-run"):
        lines.append(f"| {state} | {block_exec_counts.get(state, 0)} |")
    lines += [
        "",
        "## Blocks",
        "",
        "| Block | From → To | Cases | Selector | Execution | Status3 |",
        "|---|---|---:|---|---|---|",
    ]
    for b in sorted(blocks, key=lambda x: (-x["usedByCases"], x["id"])):
        lines.append(f"| `{b['id']}` | {b['fromScreen']} → {b['toScreen']} | {b['usedByCases']} | {b['status']} | {b['executionStatus']} | {b['status3']} |")
    lines += [
        "",
        "Block state is aggregate across cases: a block with a live pass is `live-pass`; `blocked` wins over `mock-pass` (the agent block is blocked on 009 but mock-pass on 010–012). Per-case mock counts are in `progress/cases.md`.",
        "",
        "## Pilot books",
        "",
        "`Next (not live)` is the first block that has not passed on the actual SUT. A mock-only block still counts as remaining for actual execution.",
        "",
        "| Case | Book / template | Static | Done / blocks | Live | Mock | Blocked | Not impl | Remaining | Next (not live) |",
        "|---|---|---|---:|---:|---:|---:|---:|---:|---|",
    ]
    for cid in ("AZ-110-01-009", "AZ-110-01-010", "AZ-110-01-011", "AZ-110-01-012", "AZ-110-37-001", "AZ-110-67-001"):
        p = progress_cases.get(cid)
        if not p:
            continue
        lines.append(f"| `{cid}` | `{p['book']}` | {p['static']} | {p['actualDone']}/{p['blocks']} | {p['actualDone']} | {p['mockDone']} | {p['blocked']} | {p['notImplemented']} | {p['remaining']} | {p['next']} |")
    lines += [
        "",
        "## Next gaps",
        "",
        "| Cases | Event |",
        "|---:|---|",
    ]
    for g in summary["topGaps"][:15]:
        e = g["event"]
        lines.append(f"| {g['count']} | `{e.get('screen', '')}:{e.get('action') or e.get('assert') or ''}:{e.get('target', '')}:{e.get('dataClass', '')}` |")
    lines += [
        "",
        "## Full ledgers",
        "",
        "- `progress/cases.md`: all 450 cases with done/remaining/next",
        "- `progress/templates.md`: 215 exact procedure templates with aggregate progress",
        "- `blocks/COVERAGE.md`: static block composition and gaps",
        "- `../docs/ROADMAP.md`: owner/next-step plan",
        "",
        "## 009 note",
        "",
        "`AZ-110-01-009` is environment-blocked at block 4/5 (agent search returns no data). Per instruction, do not diagnose further and do not treat it as a selector bug. Continue with block 6–13 and other block families. Keep the case status `blocked` until the environment allows a rerun.",
    ]
    (ROOT / "automation" / "PROGRESS.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    # All cases ledger
    case_lines = [
        "# Case progress ledger",
        "",
        "Generated by `tools/build_blocks.py`. `Done` = actually live-passed blocks; `Mock` = mock-only; `Remaining` = blocks not live-passed.",
        "",
        "| Case | Book / template | Static | Done/blocks | Live | Mock | Blocked | Not impl | Not run | Uncovered | Next (not live) |",
        "|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|",
    ]
    for cid in ids:
        p = progress_cases[cid]
        case_lines.append(f"| `{cid}` | `{p['book']}` | {p['static']} | {p['actualDone']}/{p['blocks']} | {p['actualDone']} | {p['mockDone']} | {p['blocked']} | {p['notImplemented']} | {p['notRun']} | {p['uncovered']} | {p['next']} |")
    (PROGRESS / "cases.md").write_text("\n".join(case_lines) + "\n", encoding="utf-8")

    # Template aggregates
    tpl_groups = defaultdict(list)
    for cid, p in progress_cases.items():
        if p["book"]:
            tpl_groups[p["book"]].append(p)
    tpl_lines = [
        "# Template progress ledger",
        "",
        "Generated by `tools/build_blocks.py`. Each template is an exact 6-field procedure signature; cases in one template share a runner/params shape.",
        "",
        "| Template | Tasks | Rows | Static full | Actual full | Mock-only | Blocked | Actual blocks | Remaining blocks | Runner cases | Remaining cases |",
        "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for tid in sorted(tpl_groups):
        ps = tpl_groups[tid]
        t = next((w["template"] for w in workflows.values() if (w.get("template") or {}).get("id") == tid), {})
        static_full = sum(1 for p in ps if p["static"] == "full")
        actual_full_n = sum(1 for p in ps if p["blocks"] and p["actualDone"] == p["blocks"])
        mock_only_n = sum(1 for p in ps if p["actualDone"] == 0 and p["mockDone"] > 0)
        blocked_n = sum(1 for p in ps if p["blocked"] > 0)
        runner_n = sum(1 for p in ps if p["blocked"] >= 0 and auto_cases[p["caseId"]].get("runner"))
        remaining_n = sum(1 for p in ps if not (p["blocks"] and p["actualDone"] == p["blocks"]))
        actual_blocks = sum(p["actualDone"] for p in ps)
        total_blocks = sum(p["blocks"] for p in ps)
        remaining_blocks = sum(p["remaining"] for p in ps)
        tpl_lines.append(f"| `{tid}` | {len(ps)} | {t.get('rowCount', '')} | {static_full} | {actual_full_n} | {mock_only_n} | {blocked_n} | {actual_blocks}/{total_blocks} | {remaining_blocks} | {runner_n} | {remaining_n} |")
    (PROGRESS / "templates.md").write_text("\n".join(tpl_lines) + "\n", encoding="utf-8")

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
        f"- Events: **{covered_events}/{total_events}** ({summary['eventCoverage']:.1%} auto-inclusive; {summary['curatedEventCoverage']:.1%} curated-only)",
        f"- Blocks: **{len(blocks)}** ({summary['curatedBlockCount']} curated + {summary['autoBlockCount']} auto candidates)",
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
