#!/usr/bin/env python3
"""Generate an honest automation-quality assessment from blocks, evidence and audit."""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "automation" / "node-runner"
PLAN = json.loads((RUNNER / "run-plan.json").read_text(encoding="utf-8"))
CASES = sorted(set(PLAN.get("A", [])) | set(PLAN.get("C", {})))
PROXY = re.compile(r"非浏览器|真機|mock|簡易|代理|未再現|未収録|手動")

blocks = {}
files = [f for f in RUNNER.glob("block-selectors*.json")]
for f in files:
    d = json.loads(f.read_text(encoding="utf-8"))
    for bid, b in d.items():
        steps = b.get("steps") or []
        proxy = [s for s in steps if PROXY.search(str(s.get("note") or ""))]
        blocks[bid] = {
            "file": f.name,
            "steps": len(steps),
            "proxy": len(proxy),
            "force": sum(1 for s in steps if s.get("force")),
            "manual": sum(1 for s in steps if s.get("action") == "manual"),
        }

summary = json.loads((ROOT / "logs" / "evidence-summary.json").read_text(encoding="utf-8"))
audit = json.loads((ROOT / "logs" / "param-audit.json").read_text(encoding="utf-8"))["cases"]

manual_cases = [c for c in CASES if (summary["cases"].get(c, {}).get("manualSteps") or [])]
audit_bad = []
audit_ok = []
for c in CASES:
    items = (audit.get(c) or {}).get("items") or []
    bad = any(x.get("status") in ("mismatch", "missingParam") for x in items)
    (audit_bad if bad else audit_ok).append(c)
fully_auto = [c for c in CASES if c not in set(manual_cases) and c not in set(audit_bad)]
flow_pass = 0
flow_fail = []
for c in CASES:
    f = ROOT / "logs" / c / f"{c}-node-result.json"
    if not f.exists():
        flow_fail.append(c)
        continue
    r = json.loads(f.read_text(encoding="utf-8"))
    if r.get("status") == "pass" and not (r.get("skipped") or []):
        flow_pass += 1
    else:
        flow_fail.append(c)

lines = [
    "# AUTOMATION ASSESSMENT",
    "",
    "> 本文件区分「流程能跑」「証跡可审计」「别纸参数正确」「真机已验证」。",
    "",
    "## 总览",
    "",
    "| 指标 | 数量 |",
    "|---|---:|",
    f"| 对象本数 | {len(CASES)} |",
    f"| 有 selector 的 block | {len(blocks)} |",
    f"| block 步骤总数 | {sum(b['steps'] for b in blocks.values())} |",
    f"| 带非浏览器/mock/人工 note 的步骤 | {sum(b['proxy'] for b in blocks.values())} |",
    f"| 含代理步骤的 block | {sum(1 for b in blocks.values() if b['proxy'])} |",
    f"| force 点击步骤 | {sum(b['force'] for b in blocks.values())} |",
    f"| manual 动作步骤 | {sum(b['manual'] for b in blocks.values())} |",
    f"| 含人工步骤的本 | {len(manual_cases)} |",
    f"| 别纸参数存在不一致/缺失的本 | {len(audit_bad)} |",
    f"| 流程+别纸参数都干净的本 | {len(fully_auto)} |",
    "",
    "## 结论",
    "",
    f"- {flow_pass}/{len(CASES)} 是 mock flow pass；{len(flow_fail)} 本失败。",
    f"- {sum(1 for b in blocks.values() if b['proxy'])} 个 block 含代理/非浏览器步骤，不能当成纯浏览器自动验证。",
    f"- {len(manual_cases)} 本至少有一个手顺步骤需要人工（F12/JP1/待機/AP・DBログ/テーブル等）。",
    f"- {len(audit_bad)} 本别纸参数与 params 不一致或缺失；真机前必须修。",
    f"- 只有 {len(fully_auto)} 本在「无人工步骤 + 别纸参数一致」两层都干净。",
    "",
    "## 代理步骤最多的 block",
    "",
    "| block | file | proxy/steps | force | manual |",
    "|---|---|---:|---:|---:|",
]
for bid, b in sorted(blocks.items(), key=lambda kv: (-kv[1]["proxy"], kv[0])):
    if b["proxy"]:
        lines.append(f"| `{bid}` | {b['file']} | {b['proxy']}/{b['steps']} | {b['force']} | {b['manual']} |")

lines += ["", "## 无人工步骤且别纸参数一致的本（41）", ""]
lines += [f"- `{c}`" for c in fully_auto]
lines += ["", "## 有人工步骤的本（224）", ""]
lines += [f"- `{c}`" for c in manual_cases]

(ROOT / "logs" / "AUTOMATION-ASSESSMENT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
print({"blocks": len(blocks), "proxySteps": sum(b["proxy"] for b in blocks.values()), "manualCases": len(manual_cases), "auditBad": len(audit_bad), "fullyAuto": len(fully_auto)})
