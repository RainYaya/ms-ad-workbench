#!/usr/bin/env python3
"""Human-readable list of remaining parameter work (C class)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIT = json.loads((ROOT / "logs" / "param-audit.json").read_text(encoding="utf-8"))
FEAS = json.loads((ROOT / "logs" / "feasibility.json").read_text(encoding="utf-8"))["cases"]

groups = {"multiValue": [], "autoUsed": [], "other": []}
for cid, f in FEAS.items():
    if f.get("class") != "C":
        continue
    a = AUDIT["cases"].get(cid) or {}
    items = a.get("items") or []
    multi = [x for x in items if x.get("status") == "multiValue"]
    auto = bool(f.get("autoUsed"))
    if multi:
        groups["multiValue"].append((cid, f, multi))
    elif auto:
        groups["autoUsed"].append((cid, f, a.get("usedKeys") or []))
    else:
        groups["other"].append((cid, f, items))

lines = [
    "# PARAM REVIEW（残作業）", "",
    "> 这里只列真正需要人确认的参数。不要用 auto.json 的业务默认值强行变绿。", "",
    f"- C 类合计：{sum(len(v) for v in groups.values())} 本",
    f"- 手顺内多值：{len(groups['multiValue'])} 本",
    f"- auto-only 但 block 实际引用业务参数：{len(groups['autoUsed'])} 本",
    f"- 其他：{len(groups['other'])} 本",
    "",
    "## 1. 手顺内多值（单一 params 无法表达）", "",
    "别纸同一个项目在步骤中取不同值。要么把 block 改成按步骤取参数，要么人工确认哪一步用哪个值。", "",
    "| case | 项目 | 别纸值 | 当前 params |", "|---|---|---|---|",
]
for cid, f, items in groups["multiValue"]:
    for x in items:
        lines.append(f"| `{cid}` | {x['label']} | {x['expected']} | {x.get('actualLabel')} |")
lines += [
    "",
    "## 2. auto-only 但 block 引用业务参数", "",
    "这些本的 block 会读 `params.*`，但别纸「操作内容」没有可抽取的输入值，当前只能落到 auto.json。需要补别纸解析或人工给值。", "",
    "| case | 引用 key | 当前 source |", "|---|---|---|",
]
for cid, f, keys in groups["autoUsed"]:
    lines.append(f"| `{cid}` | {', '.join(keys)} | auto.json |")
lines += ["", "## 3. 其他 C 类", "", "| case | 理由 |", "|---|---|"]
for cid, f, _ in groups["other"]:
    lines.append(f"| `{cid}` | {f.get('reason','')} |")

(ROOT / "logs" / "PARAM-REVIEW.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print({k: len(v) for k, v in groups.items()})
