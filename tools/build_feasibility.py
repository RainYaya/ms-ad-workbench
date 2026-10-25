#!/usr/bin/env python3
"""Classify every case into A/B/C/D feasibility and summarize block quality."""
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

sel = {}
for f in RUNNER.glob("block-selectors*.json"):
    sel.update(json.loads(f.read_text(encoding="utf-8")))

blocks = {}
for bid, b in sel.items():
    steps = b.get("steps") or []
    proxy = [s for s in steps if PROXY.search(str(s.get("note") or ""))]
    manual = [s for s in steps if s.get("action") == "manual"]
    real = [s for s in steps if s.get("action") not in ("manual",) and not PROXY.search(str(s.get("note") or ""))]
    blocks[bid] = {
        "steps": len(steps),
        "proxy": len(proxy),
        "manual": len(manual),
        "force": sum(1 for s in steps if s.get("force")),
        "quality": "manual" if manual else ("proxy-only" if proxy and not real else ("proxy" if proxy else "browser")),
        "notes": list(dict.fromkeys(str(s.get("note")) for s in proxy))[:4],
    }

workflows = json.loads((RUNNER / "../blocks/workflows.json").read_text(encoding="utf-8"))
summary = json.loads((ROOT / "logs" / "evidence-summary.json").read_text(encoding="utf-8"))
audit = json.loads((ROOT / "logs" / "param-audit.json").read_text(encoding="utf-8"))["cases"]

cases = {}
counts = Counter()
for cid in CASES:
    w = workflows.get(cid) or {}
    bids = [b.get("block") for b in (w.get("blocks") or [])]
    used = [blocks[b] for b in bids if b in blocks]
    proxy_blocks = sum(1 for b in used if b["proxy"] > 0)
    manual_steps = len((summary["cases"].get(cid, {}).get("manualSteps") or []))
    items = (audit.get(cid) or {}).get("items") or []
    audit_bad = sum(1 for x in items if x.get("status") in ("mismatch", "missingParam", "multiValue"))
    source = (audit.get(cid) or {}).get("source", "?")
    used_keys = len((audit.get(cid) or {}).get("usedKeys") or [])
    auto_used = source == "auto.json" and used_keys > 0
    rf = ROOT / "logs" / cid / f"{cid}-node-result.json"
    flow = "missing"
    if rf.exists():
        r = json.loads(rf.read_text(encoding="utf-8"))
        flow = "pass" if r.get("status") == "pass" and not (r.get("skipped") or []) else "fail"
    if flow != "pass":
        cls = "D"
    elif audit_bad or auto_used:
        cls = "C"
    elif manual_steps or proxy_blocks:
        cls = "B"
    else:
        cls = "A"
    counts[cls] += 1
    RULE_CONFLICTS = {"AZ-110-01-011", "AZ-110-01-012", "AZ-310-01-011", "AZ-310-01-012"}
    if cls == "D":
        reason = "業務規則衝突（別紙 vs 校验）" if cid in RULE_CONFLICTS else "flow fail"
    elif audit_bad and auto_used:
        reason = f"複数値/参数問題 + auto({used_keys})"
    elif audit_bad:
        labels = [x.get("label") for x in items if x.get("status") in ("mismatch", "missingParam", "multiValue")]
        reason = "複数値: " + ", ".join(dict.fromkeys(labels))
    elif auto_used:
        reason = f"auto params: {', '.join((audit.get(cid) or {}).get('usedKeys') or [])}"
    elif manual_steps or proxy_blocks:
        reason = f"人工{manual_steps}/代理block{proxy_blocks}"
    else:
        reason = ""
    cases[cid] = {
        "class": cls,
        "reason": reason,
        "flow": flow,
        "manualSteps": manual_steps,
        "proxyBlocks": proxy_blocks,
        "paramIssues": audit_bad,
        "paramsAuto": source == "auto.json",
        "autoUsed": auto_used,
        "usedKeys": used_keys,
        "source": source,
        "blocks": len(bids),
    }

(ROOT / "logs" / "feasibility.json").write_text(json.dumps({"counts": counts, "cases": cases}, ensure_ascii=False, indent=1), encoding="utf-8")
(ROOT / "v2" / "data" / "feasibility.js").write_text("window.MSAD_FEASIBILITY = " + json.dumps(cases, ensure_ascii=False) + ";\n", encoding="utf-8")
(ROOT / "v2" / "data" / "block-quality.js").write_text("window.MSAD_BLOCK_QUALITY = " + json.dumps(blocks, ensure_ascii=False) + ";\n", encoding="utf-8")

lines = [
    "# 自动化可行性（A/B/C/D）", "",
    "> A=无人工+无代理+参数干净；B=浏览器自动+人工/代理确认；C=流程可跑但参数未落实或规则冲突；D=流程失败/阻塞。", "",
    "## 集計", "", "| class | cases | 含义 |", "|---|---:|---|",
    f"| A | {counts.get('A',0)} | 可直接真机自动 |",
    f"| B | {counts.get('B',0)} | 自动 + 人工确认 |",
    f"| C | {counts.get('C',0)} | 参数/规则待修 |",
    f"| D | {counts.get('D',0)} | 流程失败/阻塞 |",
    "", "## 按分类", "",
]
for cls in ("A", "B", "C", "D"):
    ids = [c for c, v in cases.items() if v["class"] == cls]
    lines += [f"### {cls}（{len(ids)}）", ""]
    lines += [f"- `{c}`" for c in ids]
    lines.append("")

(ROOT / "logs" / "FEASIBILITY.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
(ROOT / "logs" / "A-CASES.txt").write_text("\n".join(sorted(c for c, v in cases.items() if v["class"] == "A")) + "\n", encoding="utf-8")

# block quality report
used = Counter()
for cid, w in workflows.items():
    for b in w.get("blocks") or []:
        if b.get("block"):
            used[b["block"]] += 1
q = ["# BLOCK QUALITY", "", "| block | quality | usedBy | proxy/steps | manual | force | proxy note |", "|---|---|---:|---:|---:|---:|---|"]
orderq = {"proxy-only":0, "proxy":1, "manual":2, "browser":3}
for bid, b in sorted(blocks.items(), key=lambda kv: (orderq.get(kv[1]["quality"], 9), -kv[1]["proxy"], kv[0])):
    q.append(f"| `{bid}` | {b['quality']} | {used.get(bid,0)} | {b['proxy']}/{b['steps']} | {b['manual']} | {b['force']} | {'; '.join(b['notes'])[:160]} |")
(ROOT / "logs" / "BLOCK-QUALITY.md").write_text("\n".join(q) + "\n", encoding="utf-8")

print(dict(counts), {k: sum(1 for b in blocks.values() if b["quality"] == k) for k in ("proxy-only", "proxy", "manual", "browser")})
