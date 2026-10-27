#!/usr/bin/env python3
"""Build the binding table: hand-procedure wording -> control.

The hand-procedure corpus has 19k operation rows but only ~450 distinct
(screen, wording) pairs.  This script enumerates those pairs, classifies each
one deterministically, and writes flows/bindings.yaml.

Classification (no guessing):
  template   「X」押下 / X 入力  -> control whose label is exactly X.
             0 matches or 2+ matches => needs-human (candidates listed).
  directive  各項目に入力      -> fillAll
  rowlink    「No.」リンク...   -> chooseRow
  explicit   everything else   -> needs-human

Usage:
    python tools/build_bindings.py
    python tools/build_bindings.py --out flows/bindings.yaml
"""
from __future__ import annotations

import argparse
import collections
import glob
import json
import re
import sys
import unicodedata
from datetime import datetime
from pathlib import Path

import yaml

import rpa_common

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "v2" / "data" / "cases"
SCREENS = ROOT / "ui-screens.json"
CONTROLS = ROOT / "ui-controls.json"
OUT = ROOT / "flows" / "bindings.yaml"

sys.stdout.reconfigure(encoding="utf-8")

norm = rpa_common.norm
load_cases = rpa_common.load_cases
load_screens = rpa_common.load_screens
match_screen = rpa_common.match_screen


DIRECTIVE = re.compile(r"各項目|画面各項目")
ROWLINK_LABELS = {"NO", "NO.", "ＮＯ", "ＮＯ."}
SUFFIX = re.compile(r"(押下|クリック|ボタン|リンク|入力|を押す|する)$")


def strip_phrase(p: str) -> str:
    x = norm(p)
    m = re.match(r"^[「『](.+?)[」』]", x)
    if m:
        x = m.group(1)
    return SUFFIX.sub("", x)


def control_index(controls: dict) -> dict:
    """screenKey -> labelKey -> [control]."""
    idx: dict[str, dict[str, list]] = {}
    for sk, page in controls.get("screens", {}).items():
        m: dict[str, list] = {}
        for c in page.get("controls", []):
            if c.get("kind") == "hidden":
                continue
            lk = c.get("labelKey")
            if lk:
                m.setdefault(lk, []).append(c)
        idx[sk] = m
    return idx


def pick(ctrl: dict) -> dict:
    return {
        "control": ctrl.get("key"),
        "selector": ctrl.get("selector"),
        "kind": ctrl.get("kind"),
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()

    cases = load_cases()
    screens, by_norm = load_screens()
    controls = json.loads(CONTROLS.read_text(encoding="utf-8"))
    idx = control_index(controls)
    # Curated synonyms between hand-procedure wording and screen wording. They
    # are an explicit table (ui-aliases.json), not fuzzy matching; using them is
    # a documented decision, not a guess.
    aliases = json.loads((ROOT / "ui-aliases.json").read_text(encoding="utf-8")).get("aliases") or {}
    ALIAS = {norm(k): v for k, v in aliases.items()}

    # (screenKey, phraseNorm) -> stats
    agg: dict[tuple, dict] = {}
    for cid, case in cases.items():
        rows = (case.get("workflow") or {}).get("rows") or []
        if not rows:
            continue
        cur_sk, cur_name = None, None
        for r in rows:
            # The hand procedure names the screen in the functionName column,
            # carried down the 項目 block. That column, not the 遷移 row, is the
            # authority for "which screen was this operation performed on":
            # operation rows regularly precede the 遷移 row that documents them.
            fn = (r.get("functionName") or "").strip()
            if fn:
                hit = match_screen(fn, by_norm)
                if hit:
                    cur_name, meta = hit
                    cur_sk = (f"{meta['app']}/{meta['code']}"
                              if meta.get("app") and meta.get("code") else None)
            vt = r.get("verificationType") or ""
            if vt in ("遷移", "表示"):
                hit = match_screen(r.get("verificationItem") or "", by_norm)
                if hit:
                    cur_name, meta = hit
                    if meta.get("app") and meta.get("code"):
                        cur_sk = f"{meta['app']}/{meta['code']}"
                continue
            item = (r.get("operationItem") or "").strip()
            if not item:
                continue
            key = (cur_sk, norm(item))
            rec = agg.setdefault(key, {
                "screen": cur_sk, "screenName": cur_name, "phrase": item,
                "rows": 0, "books": set(), "types": collections.Counter(),
                "sample": None,
            })
            rec["rows"] += 1
            rec["books"].add(cid)
            rec["types"][(r.get("operationType") or "").strip()] += 1
            if rec["sample"] is None:
                rec["sample"] = {"book": cid, "row": r.get("sourceRow"), "content": (r.get("operationContent") or "")[:120]}

    # ── appendix field labels ───────────────────────────────────────
    # 「各項目に入力」 is a directive, but each appendix label is still a
    # separate control to resolve.  Enumerate those labels as their own rules
    # so a mismatch (手順「課支社コード」 vs 画面「部店課支社ｺｰﾄﾞ」) is a single
    # human decision in the review queue instead of 400 blocked books.
    field_agg: dict[tuple, dict] = {}
    for cid, case in cases.items():
        rows = (case.get("workflow") or {}).get("rows") or []
        if not rows:
            continue
        blocks = rpa_common.appendix_blocks(
            (case.get("appendix") or {}).get("sheets") or [], "OPERATION")
        used: set[int] = set()
        cur_sk, cur_name = None, None
        for r in rows:
            fn = (r.get("functionName") or "").strip()
            if fn:
                hit = match_screen(fn, by_norm)
                if hit:
                    cur_name, meta = hit
                    cur_sk = (f"{meta['app']}/{meta['code']}"
                              if meta.get("app") and meta.get("code") else None)
            if (r.get("verificationType") or "").strip():
                continue
            item = (r.get("operationItem") or "").strip()
            if not item or not DIRECTIVE.search(norm(item)):
                continue
            if not cur_sk:
                continue
            # pick the block whose labels all exist on this screen; fall back
            # to the next unused block in sheet order
            pool = idx.get(cur_sk, {})
            avail = {k: v for k, v in blocks.items() if k not in used}
            choice = None
            for k in sorted(avail):
                if all(norm(lab) in pool for lab in avail[k]):
                    choice = k
                    break
            if choice is None:
                try:
                    k = int(str(r.get("operationNo")).strip())
                except (TypeError, ValueError):
                    k = None
                if k in avail:
                    choice = k
            if choice is None:
                continue
            used.add(choice)
            for lab, cell in blocks[choice].items():
                if lab.startswith("__") or not isinstance(cell, tuple):
                    continue
                val, srow = cell
                fkey = (cur_sk, norm(lab))
                if (fkey[0], fkey[1]) in agg:
                    continue  # an operation rule already covers this wording
                rec = field_agg.setdefault(fkey, {
                    "screen": cur_sk, "screenName": cur_name, "phrase": lab,
                    "rows": 0, "books": set(), "types": collections.Counter(),
                    "sample": None, "values": set(),
                })
                rec["rows"] += 1
                rec["books"].add(cid)
                rec["types"]["入力"] += 1
                rec["values"].add(val)
                if rec["sample"] is None:
                    rec["sample"] = {"book": cid, "row": r.get("sourceRow"), "content": val[:120]}

    # Regeneration must not throw away human confirmations. Carry them over by
    # (screen, wording) and keep their ids stable, so a Studio edit survives a
    # data refresh.
    existing: dict[str, dict] = {}
    used_ids: set[str] = set()
    next_num = 1
    out_path = Path(args.out)
    if out_path.exists():
        try:
            old = yaml.safe_load(out_path.read_text(encoding="utf-8")) or {}
            for r in old.get("rules", []):
                existing[f"{r.get('screen')}|{r.get('key')}"] = r
                used_ids.add(r.get("id"))
            nums = [int(re.sub(r"\D", "", str(r.get("id") or "")) or 0) for r in old.get("rules", [])]
            next_num = max(nums + [0]) + 1
        except Exception:
            pass

    rules = []
    ordered = sorted(agg.items(), key=lambda kv: (-kv[1]["rows"], kv[0][0] or "", kv[0][1]))
    for key, rec in ordered:
        screen, phrase_key = key
        phrase = rec["phrase"]
        prev = existing.get(f"{screen}|{phrase_key}")
        rule_id = prev.get("id") if prev else f"B{next_num:04d}"
        if not prev:
            next_num += 1
        rule = {
            "id": rule_id,
            "screen": screen,
            "screenName": rec["screenName"],
            "phrase": phrase,
            "key": phrase_key,
            "rows": rec["rows"],
            "books": len(rec["books"]),
            "types": dict(rec["types"]),
            "sample": rec["sample"],
        }

        if not screen:
            # No 遷移/表示 row before this operation, so the screen is unknown.
            # That is a data gap, not a binding decision: keep it out of the
            # review queue and list it as blocked.
            rule.update(type="no-screen", op=None, status="blocked",
                        note="该行之前没有可识别的画面遷移；需补手顺或人工指定画面")
            rules.append(rule)
            continue

        label = strip_phrase(phrase)
        if DIRECTIVE.search(phrase_key):
            rule.update(type="directive", op="fillAll", status="auto",
                        note="手顺的「各項目に入力」由別紙数据驱动")
        elif "リンク" in phrase_key or label.upper().rstrip(".") in ROWLINK_LABELS:
            rule.update(type="rowlink", op="chooseRow", status="auto",
                        note="行链接，运行期用本数据的锚点值选行")
        else:
            rule["label"] = label
            pool = idx.get(screen, {}) if screen else {}
            cands = pool.get(label, [])
            if len(cands) == 1:
                rule.update(type="template", op="click", status="auto", **pick(cands[0]))
            elif len(cands) > 1:
                rule.update(type="template", op="click", status="needs-human",
                            candidates=[pick(c) for c in cands[:8]],
                            note=f"标签为 {label} 的控件有 {len(cands)} 个，必须人选定一个")
            else:
                # suggestion only; never auto-bound
                near = [c for k, cs in pool.items() if label and (label in k or k in label)
                        for c in cs][:8]
                rule.update(type="explicit", op="click", status="needs-human",
                            candidates=[pick(c) for c in near],
                            note="没有标签精确相等的控件，需人工指定")

        # A human decision outranks the classifier.
        if prev and prev.get("status") in ("confirmed", "rejected"):
            rule["status"] = prev["status"]
            for k in ("control", "selector", "kind", "note", "confirmedAt"):
                if prev.get(k) is not None:
                    rule[k] = prev[k]
        rules.append(rule)

    # field rules last: an operation rule with the same wording already owns
    # the key, and duplicate ids would break the Studio editor.
    for key, rec in sorted(field_agg.items(), key=lambda kv: (-kv[1]["rows"], kv[0][0], kv[0][1])):
        screen, phrase_key = key
        label = rec["phrase"]
        prev = existing.get(f"{screen}|{phrase_key}")
        rule_id = prev.get("id") if prev else f"B{next_num:04d}"
        if not prev:
            next_num += 1
        rule = {
            "id": rule_id, "screen": screen, "screenName": rec["screenName"],
            "phrase": label, "key": phrase_key,
            "rows": rec["rows"], "books": len(rec["books"]),
            "types": dict(rec["types"]), "sample": rec["sample"],
            "label": label, "type": "field", "op": "fill",
        }
        pool = idx.get(screen, {})
        alias = ALIAS.get(phrase_key)
        cands = pool.get(phrase_key) or (pool.get(norm(alias)) if alias else []) or []
        if len(cands) == 1:
            rule.update(status="auto", **pick(cands[0]),
                        note=f"別紙の項目 {label} → 画面の {alias}" if alias else None)
            if not alias:
                rule.pop("note", None)
        elif len(cands) > 1:
            rule.update(status="needs-human", candidates=[pick(c) for c in cands[:8]],
                        note=f"別紙の項目 {label} に一致する控件が {len(cands)} 個。1つ選ぶこと")
        else:
            near = [c for k, cs in pool.items() if label and (label in k or k in label)
                    for c in cs][:8]
            rule.update(status="needs-human", candidates=[pick(c) for c in near],
                        note="別紙の項目名に一致する控件がない。対応する控件を選ぶこと")
        if prev and prev.get("status") in ("confirmed", "rejected"):
            rule["status"] = prev["status"]
            for k in ("control", "selector", "kind", "note", "confirmedAt"):
                if prev.get(k) is not None:
                    rule[k] = prev[k]
        rules.append(rule)

    counts = collections.Counter(r["status"] for r in rules)
    types = collections.Counter(r["type"] for r in rules)
    doc = {
        "version": 1,
        "generated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source": "v2/data/cases/*.js + ui-controls.json",
        "corpus": {
            "books": len(cases),
            "rules": len(rules),
            "rows": sum(r["rows"] for r in rules),
            "byStatus": dict(counts),
            "byType": dict(types),
        },
        "rules": rules,
    }
    out = Path(args.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    # Keep the timestamp when nothing changed, so a rebuild is a no-op in git
    # (same rule as tools/build_ui_dictionary.py).
    if out.exists():
        try:
            old = yaml.safe_load(out.read_text(encoding="utf-8")) or {}
            if old.get("rules") == rules:
                doc["generated"] = old.get("generated") or doc["generated"]
        except Exception:
            pass
    out.write_text(yaml.safe_dump(doc, allow_unicode=True, sort_keys=False, width=200), encoding="utf-8")
    print(f"wrote {out}")
    print(f"  rules {len(rules)}  rows {doc['corpus']['rows']}  books {doc['corpus']['books']}")
    print(f"  status {dict(counts)}")
    print(f"  type   {dict(types)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
