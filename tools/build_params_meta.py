#!/usr/bin/env python3
"""Build parameter provenance metadata for the viewer and a coverage report."""
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDIR = ROOT / "automation" / "cdp" / "params"
PLAN = json.loads((ROOT / "automation" / "node-runner" / "run-plan.json").read_text(encoding="utf-8"))
CASES = sorted(set(PLAN.get("A", [])) | set(PLAN.get("C", {})))

files = [f for f in PDIR.glob("*.json")]
by_case = {}
for f in files:
    d = json.loads(f.read_text(encoding="utf-8"))
    for cid in (d.get("cases") or {}):
        by_case.setdefault(cid, []).append(f.name)

# Runner precedence: case-specific files first, auto.json is the fallback.
order = {f.name: i for i, f in enumerate(sorted(files, key=lambda x: (x.name == "auto.json", x.name)))}
meta = {}
counts = Counter()
for cid in CASES:
    names = sorted(by_case.get(cid, []), key=lambda n: order.get(n, 999))
    source = names[0] if names else "auto.json"
    d = json.loads((PDIR / source).read_text(encoding="utf-8"))
    keys = sorted({**d.get("common", {}), **(d.get("cases", {}).get(cid) or {})}.keys())
    level = "auto" if source == "auto.json" else "case"
    meta[cid] = {
        "source": source,
        "level": level,
        "keys": keys,
        "note": "既定値（要別紙確認）" if level == "auto" else "ケース固有 params",
    }
    counts[source] += 1

(ROOT / "v2" / "data" / "params.js").write_text(
    "window.MSAD_PARAMS = " + json.dumps(meta, ensure_ascii=False) + ";\n", encoding="utf-8"
)
(ROOT / "logs" / "params-coverage.json").write_text(
    json.dumps({"generatedAt": "2026-10-24", "counts": counts, "cases": meta}, ensure_ascii=False, indent=1),
    encoding="utf-8",
)

lines = ["# パラメータ来源カバレッジ", "", "> ケース固有 params が `auto.json` より優先されます。`auto` は流程用の既定値で、真機前に別紙確認が必要です。", "", "## 集計", "", "| source | cases |", "|---|---:|"]
for k, v in counts.most_common():
    lines.append(f"| `{k}` | {v} |")
auto_cases = [c for c in CASES if meta[c]["level"] == "auto"]
lines += ["", f"## 既定値のみ（{len(auto_cases)} 本）", "", "| case | scenario | category |", "|---|---|---|"]
for cid in auto_cases:
    parts = cid.split("-")
    lines.append(f"| `{cid}` | {parts[0]}-{parts[1]} | {parts[0]}-{parts[1]} |")
(ROOT / "logs" / "PARAMS-COVERAGE.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print(dict(counts), "auto-only", len(auto_cases))
