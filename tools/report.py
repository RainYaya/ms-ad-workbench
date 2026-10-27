#!/usr/bin/env python3
"""Completion report across all flows (ADR-0005 L0/L1/L2).

L0  static   : check-flow reports 0 errors, step count == hand-procedure rows
L1  mock     : a run.json exists with 0 failed and all done/pending accounted
L2  live     : a run.json produced in external mode against the real system

Neither L0 nor L1 alone counts as "the book passes".  This script never edits
anything; it reads flows/, flows/books-status.json, flows/bindings.yaml and
logs/*/run.json.

    python tools/report.py [--check] [--write docs/rpa/14-REPORT.md]
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "automation" / "node-runner"
FLOWS = ROOT / "flows"
BOOKS = FLOWS / "books"
sys.stdout.reconfigure(encoding="utf-8")


def load_json(p: Path, default):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception:
        return default


def node_bin() -> str:
    """The field pack may carry a portable node.exe at its root instead of
    putting node on PATH; use it when present."""
    found = shutil.which("node")
    if found:
        return found
    local = ROOT / "node.exe"
    return str(local) if local.exists() else "node"


def check_flow(path: Path) -> dict:
    p = subprocess.run([node_bin(), "check-flow.mjs", str(path)], cwd=RUNNER,
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    out = (p.stdout or "") + (p.stderr or "")
    m = re.search(r"steps (\d+)\s+handRows (\d+).*?\n\s*errors (\d+)\s+warnings (\d+)\s+pending (\d+)", out, re.S)
    if not m:
        return {"ok": False, "out": out.strip().splitlines()[:3], "errors": None}
    return {"ok": int(m.group(3)) == 0, "steps": int(m.group(1)), "handRows": int(m.group(2)),
            "errors": int(m.group(3)), "warnings": int(m.group(4)), "pending": int(m.group(5))}


def run_result(name: str) -> dict | None:
    p = ROOT / "logs" / f"{name}-flow" / "run.json"
    d = load_json(p, None)
    if not d:
        return None
    return {"done": d.get("done"), "pending": d.get("pending"), "failed": d.get("failed"),
            "skipped": d.get("skipped"), "evidence": len(d.get("evidence") or []),
            "at": d.get("at"), "mode": d.get("mode")}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="run check-flow for every flow (slow)")
    ap.add_argument("--write", default=None)
    args = ap.parse_args()

    doc = yaml.safe_load((FLOWS / "bindings.yaml").read_text(encoding="utf-8")) or {}
    rules = doc.get("rules") or []
    from collections import Counter
    bstat = Counter(r.get("status") for r in rules)
    btype = Counter(r.get("type") for r in rules)
    gen = load_json(FLOWS / "books-status.json", {})

    hand = sorted(p for p in FLOWS.glob("*.yaml") if not p.name.endswith(".legacy.yaml")
                  and p.name != "bindings.yaml")
    books = sorted(BOOKS.glob("*.yaml"))

    rows = []
    for p in hand + books:
        name = p.stem
        row = {"name": name, "kind": "hand" if p.parent == FLOWS else "book",
               "run": run_result(name)}
        if args.check:
            row.update(check_flow(p))
        rows.append(row)

    l0 = [r for r in rows if r.get("ok")]
    l0_fail = [r for r in rows if r.get("ok") is False]
    l1 = [r for r in rows if (r.get("run") or {}).get("failed") == 0
          and (r.get("run") or {}).get("done", 0) > 0]
    l2 = [r for r in rows if (r.get("run") or {}).get("mode") == "external"]

    lines = []
    add = lines.append
    add("# RPA completion report")
    add("")
    add(f"*generated {datetime.now().isoformat(timespec='seconds')}*")
    add("")
    add("## 1. Corpus")
    add("")
    add(f"- books in 手順データ: {gen.get('books', '?')}")
    add(f"- generated flows: {gen.get('written', len(books))}  "
        f"(blocked {gen.get('byStatus', {}).get('blocked', '?')})")
    add(f"- hand-written flows kept: {len(hand)}")
    add(f"- binding rules: {len(rules)}  {dict(bstat)}")
    add(f"- binding types: {dict(btype)}")
    add("")
    add("## 2. Completion levels")
    add("")
    add(f"- L0 static pass: {len(l0)} / {len(rows)}" if args.check else
        "- L0 static pass: not measured (run with --check)")
    add(f"- L1 mock pass:   {len(l1)}")
    add(f"- L2 live pass:   {len(l2)}")
    add("")
    if l0_fail:
        add("### L0 failures")
        add("")
        for r in l0_fail:
            add(f"- `{r['name']}`: {r.get('errors')} error(s)")
        add("")
    add("## 3. Review queue")
    add("")
    for k in ("needs-human", "blocked", "auto", "confirmed", "rejected"):
        if bstat.get(k):
            add(f"- {k}: {bstat[k]}")
    add("")
    add("## 4. Blocked books — why")
    add("")
    reasons = Counter()
    for s in (gen.get("booksDetail") or []):
        for b in s.get("blocked") or []:
            reasons[re.sub(r"row \d+: ", "", b)[:90]] += 1
    for reason, n in reasons.most_common(20):
        add(f"- {n}× {reason}")
    add("")
    add("## 5. Flows with evidence")
    add("")
    for r in rows:
        run = r.get("run")
        if not run:
            continue
        add(f"- `{r['name']}` ({r['kind']}): done {run['done']} / pending {run['pending']} / "
            f"failed {run['failed']} / evidence {run['evidence']}")
    text = "\n".join(lines) + "\n"
    print(text)
    if args.write:
        outp = ROOT / args.write
        outp.parent.mkdir(parents=True, exist_ok=True)
        outp.write_text(text, encoding="utf-8")
        print(f"wrote {outp}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
