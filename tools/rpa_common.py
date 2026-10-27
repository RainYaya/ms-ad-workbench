"""Shared parsing for the RPA builders.

Everything that reads the 手順 corpus or the appendix grids lives here so the
three scripts (build_controls, build_bindings, generate_books) cannot drift
apart.  The normalisation function in particular must stay byte-identical to
flow-loader.mjs `norm()`.
"""
from __future__ import annotations

import collections
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "v2" / "data" / "cases"
SCREENS = ROOT / "ui-screens.json"


def norm(s: str) -> str:
    s = str(s)
    s = re.sub(r"\[\(.*?\)\]", "", s)
    s = re.sub(r"\$\{.*?\}", "", s)
    s = s.replace("&nbsp;", "").replace("&amp;", "&")
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"\s+", "", s)
    s = s.replace("コード", "ｺｰﾄﾞ").replace("ID", "ＩＤ").replace("id", "ＩＤ")
    s = re.sub(r"[*※]+$", "", s)
    s = s.replace("－", "-").replace("ー", "-").replace("ｰ", "-")
    return s


def load_cases() -> dict:
    cases: dict = {}
    for f in sorted(CASES.glob("*.js")):
        t = f.read_text(encoding="utf-8")
        m = re.match(r"window\.\w+\s*=\s*(\{.*\});?\s*$", t, re.S)
        if m:
            cases.update(json.loads(m.group(1)))
    return cases


def load_screens() -> tuple[dict, dict]:
    screens = json.loads(SCREENS.read_text(encoding="utf-8"))["screens"]
    by_norm: dict = {}
    for name, meta in screens.items():
        by_norm.setdefault(norm(name), []).append((name, meta))
    return screens, by_norm


def match_screen(name: str, by_norm: dict):
    n = norm(name)
    for cand in (n, n.replace("（", "-").replace("）", "")):
        if cand in by_norm:
            return by_norm[cand][0]
    return None


def appendix_blocks(sheets: list, kind: str) -> dict[int, dict]:
    """{blockNo: {label: (value, rowInSheet)}} for one appendix sheet type."""
    out: dict[int, dict] = {}
    for sh in sheets:
        if (sh.get("type") or "").upper() != kind:
            continue
        rows = sh.get("rows") or []
        if not rows:
            continue
        width = max(len(r) for r in rows)
        best_lc, best_score = None, -1
        for i in range(min(4, width)):
            score = 0
            for r in rows:
                if i >= len(r):
                    continue
                v = str(r[i]).strip()
                if not v or re.fullmatch(r"\d{1,3}", v):
                    continue
                if any(str(c).strip() for c in r[i + 1:]):
                    score += 1
            if score > best_score:
                best_lc, best_score = i, score
        if best_lc is None:
            continue
        label_col = best_lc
        block_col = max(0, label_col - 1)
        counts: collections.Counter = collections.Counter()
        for r in rows:
            if label_col >= len(r) or not str(r[label_col]).strip():
                continue
            for j in range(label_col + 1, len(r)):
                v = str(r[j]).strip()
                if v and not v.startswith(("※", "*", "＜", "<")):
                    counts[j] += 1
        if not counts:
            continue
        value_col = counts.most_common(1)[0][0]
        cur = None
        for idx, r in enumerate(rows):
            b = str(r[block_col]).strip() if block_col < len(r) else ""
            if re.fullmatch(r"\d{1,2}", b):
                cur = int(b)
                out.setdefault(cur, {})
            label = str(r[label_col]).strip() if label_col < len(r) else ""
            val = str(r[value_col]).strip() if value_col < len(r) else ""
            if cur is not None and label and val:
                out[cur][label] = (val, idx + 1)
            elif cur is not None and label and ("別紙参照" in label or "その他項目" in label):
                # A block that says "the rest is in another appendix" is
                # incomplete: keep the note so callers can refuse to generate.
                out[cur].setdefault("__notes__", []).append(label)
    return out
