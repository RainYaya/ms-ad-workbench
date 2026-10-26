#!/usr/bin/env python3
"""Audit appendix input values against effective runner params."""
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDIR = ROOT / "automation" / "cdp" / "params"
MAP = json.loads((PDIR / "param-map.json").read_text(encoding="utf-8"))
PLAN = json.loads((ROOT / "automation" / "node-runner" / "run-plan.json").read_text(encoding="utf-8"))
CASES = sorted(set(PLAN.get("A", [])) | set(PLAN.get("C", {})))
MAP_INPUTS = MAP.get("inputs", [])
CONFIG_KEYS = set(MAP.get("configKeys", []))

files = list(PDIR.glob("*.json"))
order = {f.name: i for i, f in enumerate(sorted(files, key=lambda x: (x.name == "auto.json", x.name != "generated.json", x.name)))}
by_case = {}
for f in files:
    if f.name in ("param-map.json",):
        continue
    d = json.loads(f.read_text(encoding="utf-8"))
    for cid in (d.get("cases") or {}):
        by_case.setdefault(cid, []).append(f.name)


def norm(v) -> str:
    s = unicodedata.normalize("NFKC", str(v or ""))
    s = s.replace("：", ":").replace("　", " ")
    s = re.sub(r"\s+", "", s)
    return s


def effective(cid: str):
    names = sorted(by_case.get(cid, []), key=lambda n: order.get(n, 999))
    source = names[0] if names else "auto.json"
    d = json.loads((PDIR / source).read_text(encoding="utf-8"))
    return source, {**d.get("common", {}), **(d.get("cases", {}).get(cid) or {})}


def load_cases():
    out = {}
    for f in (ROOT / "v2" / "data" / "cases").glob("*.js"):
        s = f.read_text(encoding="utf-8")
        try:
            out.update(json.loads(s[s.index("=") + 1:].strip().rstrip(";")))
        except Exception:
            continue
    return out


CASES_DATA = load_cases()

# keys actually referenced by the blocks a case runs
BLOCKS = {}
for f in (ROOT / "automation" / "node-runner").glob("block-selectors*.json"):
    BLOCKS.update(json.loads(f.read_text(encoding="utf-8")))
WORKFLOWS = json.loads((ROOT / "automation" / "blocks" / "workflows.json").read_text(encoding="utf-8"))


def used_keys(cid):
    out = set()
    for b in (WORKFLOWS.get(cid) or {}).get("blocks") or []:
        blk = BLOCKS.get(b.get("block")) or {}
        for step in blk.get("steps") or []:
            for v in step.values():
                for m in re.findall(r"params\.([A-Za-z0-9_]+)", str(v)):
                    out.add(m)
    return out


def appendix_values(c):
    """label -> list of distinct values from 操作内容 sheets, in row order."""
    out = {}
    for sh in (c.get("appendix") or {}).get("sheets", []):
        if "操作内容" not in (sh.get("name") or ""):
            continue
        for row in sh.get("rows", []):
            for i, cell in enumerate(row):
                label = str(cell or "").strip()
                if not label:
                    continue
                for spec in MAP_INPUTS:
                    names = [spec["label"], *(spec.get("aliases") or [])]
                    if label not in names:
                        continue
                    value = ""
                    for j in range(i + 1, len(row)):
                        x = str(row[j] or "").strip()
                        if x:
                            value = x
                            break
                    if not value:
                        continue
                    for n in names:
                        vals = out.setdefault(n, [])
                        if value not in vals:
                            vals.append(value)
    return out


audit = {}
counts = {"cases": 0, "items": 0, "match": 0, "mismatch": 0, "missingParam": 0, "multiValue": 0, "rule": 0, "autoCases": 0, "appendixItems": 0}
lines = ["# PARAM AUDIT", "", "> 別紙「操作内容」の入力値と、実際に runner が使う params の照合。", "", "| metric | count |", "|---|---:|"]
for cid in CASES:
    c = CASES_DATA.get(cid) or {}
    source, pv = effective(cid)
    av = appendix_values(c)
    used = used_keys(cid)
    items = []
    for spec in MAP_INPUTS:
        label = spec["label"]
        vals = []
        for n in [label, *(spec.get("aliases") or [])]:
            for v in av.get(n, []):
                if v not in vals:
                    vals.append(v)
        if not vals:
            continue
        if used and spec["key"] not in used:
            continue
        expected = vals[0]
        actual = pv.get(spec["key"])
        codes = spec.get("codes") or {}
        actual_label = codes.get(str(actual), actual)
        rule = any(x in str(expected) for x in ("システム日", "現在日", "初期設定", "任意", "参照", "設定しない", "変更となる可能性"))
        ok = actual is not None and (norm(expected) == norm(actual_label) or norm(expected) == norm(actual))
        if len(vals) > 1:
            status = "multiValue"
        else:
            status = "rule" if rule else ("match" if ok else ("missingParam" if actual is None else "mismatch"))
        counts["appendixItems"] += 1
        counts["items"] += 1
        counts[status] += 1
        items.append({
            "label": label,
            "key": spec["key"],
            "expected": " / ".join(vals),
            "values": vals,
            "actual": actual,
            "actualLabel": actual_label,
            "status": status,
        })
    if source == "auto.json":
        counts["autoCases"] += 1
    counts["cases"] += 1
    audit[cid] = {"source": source, "auto": source == "auto.json", "usedKeys": sorted(used), "items": items}

for k in ("cases", "appendixItems", "match", "mismatch", "missingParam", "multiValue", "rule", "autoCases"):
    lines.append(f"| {k} | {counts[k]} |")
lines += ["", "## 不一致", "", "| case | label | 別紙 | params | key |", "|---|---|---|---|---|"]
for cid, a in audit.items():
    for it in a["items"]:
        if it["status"] in ("mismatch", "missingParam"):
            lines.append(f"| `{cid}` | {it['label']} | {it['expected']} | {it['actualLabel']} | {it['key']} |")
lines += ["", "## 複数値（手順内で値が変わる）", "", "| case | label | 別紙の値 | params | key |", "|---|---|---|---|---|"]
for cid, a in audit.items():
    for it in a["items"]:
        if it["status"] == "multiValue":
            lines.append(f"| `{cid}` | {it['label']} | {it['expected']} | {it['actualLabel']} | {it['key']} |")

(ROOT / "logs" / "PARAM-AUDIT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
(ROOT / "logs" / "param-audit.json").write_text(json.dumps({"counts": counts, "cases": audit}, ensure_ascii=False, indent=1), encoding="utf-8")
(ROOT / "v2" / "data" / "param-audit.js").write_text("window.MSAD_PARAM_AUDIT = " + json.dumps(audit, ensure_ascii=False) + ";\n", encoding="utf-8")
print(counts)
