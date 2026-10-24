#!/usr/bin/env python3
"""Build human/machine evidence views from logs + procedure rows.

Outputs:
  logs/evidence-summary.json     per-case 画面HC status + manual steps
  logs/MANUAL-CHECKLIST.md       human-readable manual confirmation list
  v2/data/evidence.js            window.MSAD_EVIDENCE for the viewer
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "automation" / "node-runner"
PLAN = json.loads((RUNNER / "run-plan.json").read_text(encoding="utf-8"))
EVID = json.loads((ROOT / "automation" / "blocks" / "case-evidence.json").read_text(encoding="utf-8"))
CASES = sorted(set(PLAN.get("A", [])) | set(PLAN.get("C", {})))

MANUAL_OP = re.compile(r"F12|開発者ツール|ctrl\+f|JP1|シェル|待機|一時間|1時間|コマンド|ジョブ", re.I)
MANUAL_VER = re.compile(r"APログ|DBログ|テーブル|ログ|ファイル|URL|ジョブ|その他", re.I)


def load_rows(cid: str) -> list[dict]:
    p = ROOT / "workflow" / f"workflow-{cid}.json"
    if not p.exists():
        return []
    return json.loads(p.read_text(encoding="utf-8-sig"))["workflow"]["procedure"]["rawRows"]


def manual_steps(cid: str, manual_rows: set[int]) -> list[dict]:
    out = []
    for r in load_rows(cid):
        row = r.get("sourceRow")
        op_type = (r.get("operationType") or "").strip()
        op_item = (r.get("operationItem") or "").strip()
        v_type = (r.get("verificationType") or "").strip()
        v_item = (r.get("verificationItem") or "").strip()
        v_content = (r.get("verificationContent") or "").strip()
        hc = (r.get("evidenceType") or "").strip() == "画面HC"
        if row in manual_rows:
            out.append({"row": row, "phase": "確認", "type": v_type or "画面HC", "item": v_item, "content": v_content, "reason": "非浏览器（開発者ツール等）"})
        elif op_type == "その他" or MANUAL_OP.search(op_item):
            out.append({"row": row, "phase": "操作", "type": op_type or "その他", "item": op_item, "content": r.get("operationContent") or "", "reason": "非浏览器操作"})
        elif not hc and (v_type == "その他" or MANUAL_VER.search(v_item or v_content)):
            out.append({"row": row, "phase": "確認", "type": v_type, "item": v_item, "content": v_content, "reason": "非浏览器确认"})
    return out


data = {}
manual_md = ["# 人工确认清单（manual / 非浏览器）", "", "> 自动从手顺行与运行结果生成。`manual` 行没有 mock 截图，公司真机执行时必须人工确认。", ""]
counts = {"exact": 0, "blockEnd": 0, "manual": 0, "missing": 0, "hc": 0}
for cid in CASES:
    expected = set()
    for b in EVID.get(cid, {}).get("blocks", []):
        for a in b.get("asserts", []):
            if a.get("hc"):
                expected.add(a["row"])
        if b.get("toHc"):
            expected.add(b["toRow"])
    rf = ROOT / "logs" / cid / f"{cid}-node-result.json"
    result = json.loads(rf.read_text(encoding="utf-8")) if rf.exists() else {}
    ev = {e["row"]: e for e in result.get("evidence", [])}
    rows = {}
    summary = {"hc": len(expected), "exact": 0, "blockEnd": 0, "manual": 0, "missing": 0}
    manual_rows = set()
    for row in sorted(expected):
        e = ev.get(row)
        if not e:
            status = "missing"
        elif e.get("exact"):
            status = "exact"
        elif e.get("manual"):
            status = "manual"
        else:
            status = "blockEnd"
        summary[{"blockEnd": "blockEnd"}.get(status, status)] += 1
        if status == "manual":
            manual_rows.add(row)
        rows[str(row)] = {"status": status, "file": e.get("file") if e else None, "item": e.get("item") if e else None, "type": e.get("type") if e else None}
    ms = manual_steps(cid, manual_rows)
    data[cid] = {"summary": summary, "rows": rows, "manualSteps": ms, "status": result.get("status")}
    for k in counts:
        counts[k] += summary[k]
    if ms or summary["manual"]:
        manual_md.append(f"## {cid}")
        for m in ms:
            manual_md.append(f"- 行{m['row']} [{m['phase']}] {m['item']} — {m['reason']}")
        manual_md.append("")

(ROOT / "logs" / "evidence-summary.json").write_text(json.dumps({"generatedAt": "2026-10-24", "counts": counts, "cases": data}, ensure_ascii=False, indent=1), encoding="utf-8")
(ROOT / "logs" / "MANUAL-CHECKLIST.md").write_text("\n".join(manual_md) + "\n", encoding="utf-8")
(ROOT / "v2" / "data" / "evidence.js").write_text("window.MSAD_EVIDENCE = " + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")
print(counts, "cases", len(data), "manualSteps", sum(len(v["manualSteps"]) for v in data.values()))
