#!/usr/bin/env python3
"""Compare a real-environment DOM capture against the runtime dictionaries.

A capture is produced on the SUT by automation/node-runner/capture.mjs:

    capture-YYYYMMDD/
      index.json            one entry per page (url/title/charset/counts)
      pages/00N_*.json      ids / names / label→id pairs / buttons
      pages/00N_*.html      full DOM (Shift_JIS on the real system)

This script answers one question per screen: **would the runner find the same
control on the real page that it finds in the mock?** It asks the runner
itself (flow-loader.dictSelector) for the selector of each label seen in the
capture, then checks that selector against the ids/names of the captured DOM.

Screen identity uses the same rule as run-flow:
  1. a verified route in ui-screens.json  (/AMA01/aZG001To03)
  2. the page title                        (申込書品質管理システム　不備内容入力画面)
  3. the controller code in the URL        (AMA01)
A route wins because one controller code can serve several hand-procedure
screens (menu and 新規入力 are both AMA01 on the real system).

Nothing is modified. Output is a report; exit code is 0 even with mismatches.

    python tools/align_capture.py --capture C:\\path\\to\\capture-20261028
    python tools/align_capture.py --capture ... --json reports/align.json
    python tools/align_capture.py --capture ... --verbose
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

import rpa_common

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "automation" / "node-runner"
DICT = ROOT / "ui-dictionary.json"
CONTROLS = ROOT / "ui-controls.json"
SCREENS = ROOT / "ui-screens.json"

sys.stdout.reconfigure(encoding="utf-8")
norm = rpa_common.norm

CODE_RE = re.compile(r"/(?:mhkcmwa11|mhkagwa11|mhkcmwb11)/([A-Za-z0-9_]+)")
SEL_ID = re.compile(r"^#([A-Za-z0-9_\\:-]+)$")
SEL_NAME = re.compile(r'^\[name="([^"]+)"\]$')

NODE_LOOKUP = """
import { dictSelector } from './flow-loader.mjs';
let body = '';
for await (const chunk of process.stdin) body += chunk;
const req = JSON.parse(body);
const out = {};
for (const [key, label] of req) out[key + '\\u0000' + label] = dictSelector(key, label);
process.stdout.write(JSON.stringify(out));
"""


def node_bin() -> str:
    """The field pack may carry a portable node.exe at its root."""
    found = shutil.which("node")
    if found:
        return found
    local = ROOT / "node.exe"
    return str(local) if local.exists() else "node"


def screen_index() -> tuple[list[tuple[str, str, str]], list[tuple[str, str, str]], set[str]]:
    """(routes, titles, dictionary keys) from ui-screens.json + dictionaries."""
    doc = json.loads(SCREENS.read_text(encoding="utf-8")).get("screens", {})
    dict_keys = set(json.loads(DICT.read_text(encoding="utf-8")).get("screens", {}))
    dict_keys |= set(json.loads(CONTROLS.read_text(encoding="utf-8")).get("screens", {}))
    routes, titles = [], []
    for name, meta in doc.items():
        if not (meta.get("app") and meta.get("code")):
            continue
        key = f"{meta['app']}/{meta['code']}"
        for r in meta.get("routes") or []:
            if r:
                routes.append((r, key, name))
        titles.append((norm(name), key, name))
    return routes, titles, dict_keys


def screen_for(page: dict, routes, titles, dict_keys) -> tuple[str | None, str]:
    u = page.get("url") or ""
    hits = [(r, k) for r, k, _ in routes if r in u]
    if len(hits) == 1:
        return hits[0][1], "route"
    if len(hits) > 1:
        return hits[0][1], "route-?:" + ",".join(r for r, _ in hits)
    t = norm(page.get("title") or "")
    if t:
        exact = [(k, n) for nt, k, n in titles if nt == t]
        if len(exact) == 1:
            return exact[0][0], "title"
        if not exact:
            sub = [(k, n) for nt, k, n in titles if nt and nt in t]
            if len(sub) == 1:
                return sub[0][0], "title~"
    m = CODE_RE.search(u)
    if m:
        code = m.group(1)
        key_hits = sorted(k for k in dict_keys if k.endswith("/" + code))
        if len(key_hits) == 1:
            return key_hits[0], "code"
        if key_hits:
            return key_hits[0], "code-?:" + ",".join(key_hits)
    return None, "none"


def selector_kind(sel: str) -> tuple[str, str | None]:
    if not sel:
        return "none", None
    if sel.startswith("@dialog:"):
        return "dialog", sel.split(":", 1)[1]
    if "${" in sel or "|" in sel:
        return "template", None
    m = SEL_ID.match(sel)
    if m:
        return "id", m.group(1).replace("\\:", ":")
    m = SEL_NAME.match(sel)
    if m:
        return "name", m.group(1)
    return "other", None


def resolve_labels(pairs: list[tuple[str, str]]) -> dict[tuple[str, str], str | None]:
    """Ask the runner for every (screenKey,label) in one node process."""
    if not pairs:
        return {}
    payload = json.dumps(pairs, ensure_ascii=False)
    p = subprocess.run(
        [node_bin(), "--input-type=module", "-e", NODE_LOOKUP],
        cwd=RUNNER, input=payload, capture_output=True, text=True, encoding="utf-8",
    )
    if p.returncode != 0:
        raise SystemExit("node lookup failed:\n" + (p.stderr or "")[:2000])
    raw = json.loads(p.stdout)
    return {tuple(k.split("\u0000")): v for k, v in raw.items()}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--capture", required=True, help="directory containing index.json")
    ap.add_argument("--json", default=None, help="also write the result as JSON")
    ap.add_argument("--verbose", action="store_true",
                    help="also list pair-diffs (label points at a hidden mirror) and real-only labels")
    args = ap.parse_args()

    cap = Path(args.capture)
    index = json.loads((cap / "index.json").read_text(encoding="utf-8"))
    routes, titles, dict_keys = screen_index()

    # dedupe dialog snapshots: same screen + url + counts = same DOM
    pages, seen = [], set()
    for entry in index.get("pages", []):
        counts = entry.get("counts", {})
        if not counts.get("ids") and not counts.get("pairs"):
            continue
        key, via = screen_for(entry, routes, titles, dict_keys)
        sig = (key, entry.get("url"), counts.get("ids"), counts.get("pairs"), counts.get("buttons"))
        if sig in seen:
            continue
        seen.add(sig)
        meta_path = cap / entry["file"].replace(".html", ".json")
        if not meta_path.exists():
            continue
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
        pages.append({"key": key, "via": via, "url": entry.get("url"), "meta": meta,
                      "title": entry.get("title") or meta.get("title") or ""})

    # one batched lookup for every (screenKey, label)
    req = []
    for pg in pages:
        labels = []
        if pg["key"]:
            for pair in pg["meta"].get("pairs") or []:
                if pair.get("label"):
                    labels.append(pair["label"])
            for btn in pg["meta"].get("buttons") or []:
                if btn.get("label"):
                    labels.append(btn["label"])
        pg["labels"] = list(dict.fromkeys(labels))
        for lab in pg["labels"]:
            req.append((pg["key"], lab))
    resolved = resolve_labels(req)

    report = []
    totals = defaultdict(int)
    for pg in pages:
        key = pg["key"]
        meta = pg["meta"]
        ids = set(meta.get("ids") or [])
        names = set(meta.get("names") or [])
        real_pairs = defaultdict(list)
        for pair in meta.get("pairs") or []:
            if pair.get("label") and pair.get("id"):
                real_pairs[norm(pair["label"])].append(pair["id"])
        real_btns = defaultdict(list)
        for btn in meta.get("buttons") or []:
            if btn.get("label") and btn.get("id"):
                real_btns[norm(btn["label"])].append(btn["id"])

        row = {"key": key, "via": pg["via"], "url": pg["url"], "title": pg["title"],
               "ids": len(ids), "pairs": len(real_pairs), "buttons": len(real_btns),
               "checked": 0, "found": 0, "missing": [], "unbound": [],
               "template": [], "pairDiff": [], "realOnly": []}
        if not key:
            row["unbound"] = ["(no dictionary screen for this page)"]
            report.append(row)
            continue

        mapped_labels = set()
        for lab in pg["labels"]:
            sel = resolved.get((key, lab))
            mapped_labels.add(norm(lab))
            row["checked"] += 1
            totals["checked"] += 1
            kind, value = selector_kind(sel)
            if kind == "none":
                row["unbound"].append(lab)
                totals["unbound"] += 1
                continue
            if kind == "template":
                row["template"].append({"label": lab, "selector": sel})
                totals["template"] += 1
                continue
            ok = (kind == "id" and value in ids) or (kind == "name" and value in names) or kind == "dialog"
            if ok:
                row["found"] += 1
                totals["found"] += 1
            else:
                row["missing"].append({"label": lab, "selector": sel})
                totals["missing"] += 1
                continue
            # The label's paired id is often a hidden mirror of a visible
            # control (selected_insurance_item_code vs insurance_item_list
            # .selected). Only interesting when the label points somewhere
            # else entirely; kept out of the headline count.
            real_ids = real_pairs.get(norm(lab), []) + real_btns.get(norm(lab), [])
            if real_ids and kind in ("id", "name") and value not in real_ids:
                row["pairDiff"].append({"label": lab, "runtime": value, "pair": real_ids[:4]})
                totals["pairDiff"] += 1

        for lab in list(real_pairs) + list(real_btns):
            if lab and lab not in mapped_labels:
                row["realOnly"].append(lab)
                totals["realOnly"] += 1
        report.append(row)

    # ── print ───────────────────────────────────────────────────────
    print(f"capture {cap}")
    print(f"pages {len(pages)}   labels checked {totals['checked']}   "
          f"resolved-in-DOM {totals['found']}   missing {totals['missing']}   "
          f"unbound {totals['unbound']}   template {totals['template']}   "
          f"pair-diff {totals['pairDiff']}")
    print()
    for row in report:
        flag = "  <<" if (row["missing"] or row["template"]) else ""
        print(f"{row['key'] or '?':12} {row['via']:8} {row['title'][:26]:28} "
              f"ids {row['ids']:3}  mapped {row['found']:2}/{row['checked']:2}  "
              f"unbound {len(row['unbound']):2}  missing {len(row['missing']):2}{flag}")
        for m in row["missing"]:
            print(f"    missing   {m['label']}  ->  {m['selector']}")
        for t in row["template"]:
            print(f"    template  {t['label']}  ->  {t['selector']}")
        for lab in row["unbound"]:
            print(f"    unbound   {lab}")
        if args.verbose:
            for d in row["pairDiff"]:
                print(f"    pair-diff {d['label']}: runtime {d['runtime']}  label-pair {d['pair']}")
            for lab in row["realOnly"][:80]:
                print(f"    real-only {lab}")

    if args.json:
        out = Path(args.json)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps({"capture": str(cap), "totals": totals, "screens": report},
                                  ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"\nwrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
