#!/usr/bin/env python3
"""Aggregate node-runner mock results into mock-results.json + execution-status.json.

Reads logs/<caseId>/<caseId>-node-result.json (written by automation/node-runner/runner.mjs),
keeps the latest per case, then updates:
  - automation/node-runner/mock-results.json   (runner output roll-up)
  - automation/execution-status.json           (cases[].mockPass / notRun, status3Map.coded)

Usage: python tools/summarize_mock.py
"""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOGS = ROOT / "logs"
RUNNER = ROOT / "automation" / "node-runner"
MOCK_RESULTS = RUNNER / "mock-results.json"
EXEC_STATUS = ROOT / "automation" / "execution-status.json"
RUN_PLAN = RUNNER / "run-plan.json"


def read_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def latest_results() -> dict[str, dict]:
    out: dict[str, dict] = {}
    if not LOGS.exists():
        return out
    for path in LOGS.glob("*/*-node-result.json"):
        try:
            data = read_json(path)
        except (OSError, json.JSONDecodeError):
            continue
        cid = data.get("caseId") or path.parent.name
        prev = out.get(cid)
        if prev is None or str(data.get("ts", "")) >= str(prev.get("ts", "")):
            out[cid] = data
    return out


def main() -> None:
    results = latest_results()
    run_plan = read_json(RUN_PLAN)
    assigned = set(run_plan.get("A", [])) | set(run_plan.get("C", {}))
    if assigned:
        results = {cid: data for cid, data in results.items() if cid in assigned}
    c_missing = {cid: list(blocks) for cid, blocks in run_plan.get("C", {}).items()}

    rollup = {}
    passed_blocks: Counter[str] = Counter()
    failed = []
    for cid, data in sorted(results.items()):
        ok = data.get("status") == "pass"
        blocks = [b.get("block") for b in data.get("blocks", []) if b.get("block")]
        if ok:
            passed_blocks.update(blocks)
        else:
            failed.append(cid)
        remaining = [b for b in c_missing.get(cid, []) if b not in blocks]
        rollup[cid] = {
            "status": "pass" if ok else "fail",
            "blocks": data.get("blocks", []),
            "shots": len(data.get("shots", [])),
            "ts": data.get("ts"),
            "remaining": remaining,
            **({"error": data.get("error")} if not ok and data.get("error") else {}),
        }

    MOCK_RESULTS.write_text(
        json.dumps(
            {
                "generatedAt": max((r.get("ts", "") for r in rollup.values()), default=""),
                "runner": "node-mock",
                "results": rollup,
            },
            ensure_ascii=False,
            indent=1,
        )
        + "\n",
        encoding="utf-8",
    )

    exec_data = read_json(EXEC_STATUS)
    cases = exec_data.setdefault("cases", {})
    for cid, entry in rollup.items():
        if entry["status"] != "pass":
            continue
        case_info = cases.setdefault(
            cid,
            {"livePass": [], "mockPass": [], "blocked": [], "notImplemented": [], "notRun": []},
        )
        for key in ("livePass", "mockPass", "blocked", "notImplemented", "notRun"):
            case_info.setdefault(key, [])
        passed = [b["block"] for b in entry["blocks"]]
        case_info["mockPass"] = sorted(set(case_info["mockPass"]) | set(passed))
        touched = set(passed)
        for key in ("notRun", "notImplemented", "blocked", "livePass"):
            case_info[key] = [b for b in case_info[key] if b not in touched]
        note = f"node mock pass: {len(passed)} block(s) in logs/{cid}/."
        if entry["remaining"]:
            note += " Remaining (run-plan): " + ", ".join(entry["remaining"]) + "."
        case_info["note"] = note

    coded = set(exec_data.setdefault("status3Map", {}).get("coded", []))
    verified = set(exec_data["status3Map"].get("verified", []))
    # Keep status3Map aligned with the block registry: selector-only ids and
    # blocks already promoted to verified must not linger in "coded".
    registry_path = ROOT / "automation" / "blocks" / "blocks.json"
    registry_ids = set()
    if registry_path.exists():
        registry_ids = {b["id"] for b in read_json(registry_path).get("blocks", [])}
    coded = (coded - verified) | (set(passed_blocks) - verified)
    if registry_ids:
        coded &= registry_ids
    exec_data["status3Map"]["coded"] = sorted(coded)
    exec_data["status3Map"]["note"] = (
        "verified=live SUT pass 2026-10-23 (009 blk1-3); "
        "coded=implemented+mock/source-sim pass (2026-10-24: full-flow 009-012, AZG200 37-001..005, "
        "AY 110-01-011/012, A 30 books, agency DDA3A833/F9A1D656); planned=rest."
    )
    exec_data["generatedAt"] = "2026-10-24"
    EXEC_STATUS.write_text(json.dumps(exec_data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    total = len(rollup)
    ok = sum(1 for r in rollup.values() if r["status"] == "pass")
    print(f"cases: {ok}/{total} pass, {len(failed)} fail")
    if failed:
        print("failed:", ", ".join(failed))
    print(f"blocks passed: {len(passed_blocks)} distinct")
    print(f"wrote {MOCK_RESULTS.relative_to(ROOT)} and {EXEC_STATUS.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
