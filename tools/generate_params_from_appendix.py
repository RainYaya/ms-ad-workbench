#!/usr/bin/env python3
"""Generate per-case business params from appendix 操作内容.

Writes automation/cdp/params/generated.json. Curated files still win in the
runner (generated fills gaps before auto.json).
"""
from __future__ import annotations

import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PDIR = ROOT / "automation" / "cdp" / "params"
MAP = json.loads((PDIR / "param-map.json").read_text(encoding="utf-8"))
INPUTS = MAP.get("inputs", [])
PLAN = json.loads((ROOT / "automation" / "node-runner" / "run-plan.json").read_text(encoding="utf-8"))
CASES = sorted(set(PLAN.get("A", [])) | set(PLAN.get("C", {})))


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


def appendix_values(c):
    out = {}
    for sh in (c.get("appendix") or {}).get("sheets", []):
        if "操作内容" not in (sh.get("name") or ""):
            continue
        for row in sh.get("rows", []):
            for i, cell in enumerate(row):
                label = str(cell or "").strip()
                if not label:
                    continue
                for spec in INPUTS:
                    if label not in [spec["label"], *(spec.get("aliases") or [])]:
                        continue
                    for j in range(i + 1, len(row)):
                        value = str(row[j] or "").strip()
                        if value:
                            out[label] = value
                            break
    return out


def is_rule(value: str) -> bool:
    return any(x in value for x in ("システム日", "現在日", "初期設定", "任意", "参照", "設定しない", "変更となる可能性", "※"))


def code_for(spec, value: str):
    codes = spec.get("codes") or {}
    if not codes:
        return value
    for code, label in codes.items():
        if label == value:
            return code
    return None


generated = {"common": {}, "cases": {}}
filled = 0
for cid in CASES:
    values = {}
    av = appendix_values(CASES_DATA.get(cid) or {})
    for spec in INPUTS:
        expected = None
        for name in [spec["label"], *(spec.get("aliases") or [])]:
            if name in av:
                expected = av[name]
                break
        if not expected or is_rule(expected):
            continue
        code = code_for(spec, expected)
        if code is None:
            continue
        values[spec["key"]] = code
        filled += 1
    if values:
        generated["cases"][cid] = values

(PDIR / "generated.json").write_text(json.dumps(generated, ensure_ascii=False, indent=1), encoding="utf-8")
print({"casesWithGenerated": len(generated["cases"]), "values": filled})
