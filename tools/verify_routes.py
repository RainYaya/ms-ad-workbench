#!/usr/bin/env python3
"""Regression check for the AZ route pattern-chain inference.

Expected chains are the ones confirmed from the 2026-08-25 workbook:
`(同上)` means the same scenario as the previous non-empty cell in that
column, with the last 3-digit pattern number incremented by 1.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "v2" / "data" / "index.json"

EXPECTED = {
    101: ["AZ-110-01-001", "AZ-110-12-001", "AZ-110-67-001"],
    102: ["AZ-110-01-002", "AZ-110-13-001", "AZ-110-37-001"],
    103: ["AZ-110-01-003", "AZ-110-13-002", "AZ-110-38-001", "AZ-110-70-001"],
    104: ["AZ-110-01-004", "AZ-110-13-003", "AZ-110-39-001"],
    105: ["AZ-110-01-005", "AZ-110-13-004", "AZ-110-40-001"],
    106: ["AZ-110-01-006", "AZ-110-13-005", "AZ-110-41-001"],
    107: ["AZ-110-01-007", "AZ-110-16-001"],
    108: ["AZ-110-01-008", "AZ-110-17-001", "AZ-110-18-001"],
    109: ["AZ-110-01-009", "AZ-110-17-002", "AZ-110-20-001"],
    110: ["AZ-110-01-010", "AZ-110-17-003", "AZ-110-21-001"],
    111: ["AZ-110-01-011", "AZ-110-14-001"],
    112: ["AZ-110-01-012", "AZ-110-15-001"],
    113: ["AZ-110-02-001", "AZ-110-06-001", "AZ-110-07-001"],
    114: ["AZ-110-02-002", "AZ-110-08-001"],
    115: ["AZ-110-73-001", "AZ-110-74-001", "AZ-110-75-001", "AZ-110-09-001", "AZ-110-62-001"],
    116: ["AZ-110-73-002", "AZ-110-74-002", "AZ-110-75-002", "AZ-110-09-002", "AZ-110-63-001"],
    117: ["AZ-110-02-003", "AZ-110-10-001", "AZ-110-55-001", "AZ-110-64-001"],
    118: ["AZ-110-02-004", "AZ-110-11-001", "AZ-110-19-001", "AZ-110-42-001"],
    119: ["AZ-110-02-005", "AZ-110-11-002", "AZ-110-19-002", "AZ-110-43-001"],
    120: ["AZ-110-02-006", "AZ-110-11-003", "AZ-110-19-003", "AZ-110-44-001"],
    121: ["AZ-110-02-007", "AZ-110-11-004", "AZ-110-19-004", "AZ-110-45-001", "AZ-110-58-001"],
    122: ["AZ-110-02-008", "AZ-110-11-005", "AZ-110-19-005", "AZ-110-45-002", "AZ-110-59-001"],
    123: ["AZ-110-02-009", "AZ-110-11-006", "AZ-110-19-006", "AZ-110-46-001"],
    124: ["AZ-110-02-010", "AZ-110-11-007", "AZ-110-19-007", "AZ-110-47-001"],
    125: ["AZ-110-02-011", "AZ-110-11-008", "AZ-110-19-008", "AZ-110-48-001", "AZ-110-68-001"],
    126: ["AZ-110-02-012", "AZ-110-11-009", "AZ-110-19-009", "AZ-110-49-001"],
}


def main() -> int:
    data = json.loads(INDEX.read_text(encoding="utf-8"))
    routes = {r["no"]: r for r in data.get("routes", []) if r.get("domain") == "AZ"}
    failures = []
    for no, expected in EXPECTED.items():
        route = routes.get(no)
        if not route:
            failures.append(f"R{no}: route not found")
            continue
        patterns = route.get("patterns") or []
        if len(patterns) != 1:
            failures.append(f"R{no}: expected 1 pattern, got {len(patterns)}")
            continue
        actual = [s.get("caseId") for s in patterns[0].get("steps", [])]
        if actual != expected:
            failures.append(f"R{no}:\n  expected {expected}\n  actual   {actual}")
    if failures:
        print("FAIL")
        print("\n".join(failures))
        return 1
    print(f"PASS: {len(EXPECTED)} route chains (R101-R126) match the workbook inference.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
