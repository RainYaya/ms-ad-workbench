#!/usr/bin/env python3
"""DEPRECATED — use automation/node-runner/flow-loader.mjs + check-flow.mjs.

This file predates the 17-primitive kernel (docs/rpa/11-KERNEL.md) and the
canonical schema (`on` / `target` / `value` / typed `expect`). It still treats
`popup: true` as a field label and only reads `f["id"]`, so it reports false
errors on the current flows. Kept for history / cross-checking only; do not
extend it. The single source of truth for compiling, checking and running is
the Node runner.

Compile a human-authored flow YAML into an executable step list.

The flow says WHAT (screen + label). This resolves it to HOW (selector) using
ui-dictionary.json + ui-screens.json. Nothing is guessed: an unresolved label
is a hard error with the flow's Excel row number attached, so the person
editing the flow sees exactly which line to fix.

Usage:
    python tools/compile_flow.py flows/AZ-110-01-009.yaml
    python tools/compile_flow.py flows/AZ-110-01-009.yaml --json out.json
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
DICT = ROOT / "ui-dictionary.json"
SCREENS = ROOT / "ui-screens.json"
OVERLAY = ROOT / "ui-rowfields.json"      # hand-maintained; survives regeneration


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


class Resolver:
    def __init__(self) -> None:
        self.ui = json.loads(DICT.read_text(encoding="utf-8"))["screens"]
        self.screens = json.loads(SCREENS.read_text(encoding="utf-8"))["screens"]
        overlay = json.loads(OVERLAY.read_text(encoding="utf-8")) if OVERLAY.exists() else {}
        self.rowfields: dict[str, list] = overlay.get("rowfields", {})
        self.qualified: dict[str, list] = overlay.get("qualifiedButtons", {})
        self.by_screen: dict[str, dict[str, dict]] = {}
        for sk, page in self.ui.items():
            fields: dict[str, dict] = {}
            for f in page["fields"]:
                if f["id"]:
                    fields[norm(f["label"])] = {"id": f["id"], "kind": f["kind"]}
            for b in page["buttons"]:
                if b["id"] and b["label"]:
                    fields.setdefault(norm(b["label"]), {"id": b["id"], "kind": "button"})
            self.by_screen[sk] = fields

    def page_for_screen(self, screen_name: str) -> tuple[str | None, dict]:
        meta = self.screens.get(screen_name)
        if not meta:
            # tolerate full-width hyphen differences
            target = norm(screen_name)
            for k, v in self.screens.items():
                if norm(k) == target:
                    meta = v
                    break
        if not meta or not meta.get("code"):
            return None, (meta or {})
        return f"{meta['app']}/{meta['code']}", meta

    def lookup_qualified(self, screen_key: str, label: str, qualifier: str) -> dict | None:
        for qb in self.qualified.get(screen_key, []):
            if norm(qb.get("label")) == norm(label) and qb.get("qualifier") == qualifier:
                return {"id": qb["id"], "kind": "button"}
        return None

    def lookup(self, screen_key: str, label: str) -> dict | None:
        # row-scoped fields (runtime index) come first: they have no static id
        for rf in self.rowfields.get(screen_key, []):
            if norm(rf["label"]) == norm(label):
                return {"id": None, "kind": "rowfield", "how": rf.get("how"),
                        "namePattern": rf.get("namePattern"),
                        "selectorTemplate": rf.get("selectorTemplate"),
                        "note": rf.get("note")}
        fields = self.by_screen.get(screen_key) or {}
        n = norm(label)
        if n in fields:
            return fields[n]
        # ambiguous label: several ids share this label -> refuse to guess
        ambiguous = [v for k, v in fields.items() if k == n]
        if len(set(v["id"] for v in ambiguous)) > 1:
            return None
        # alias table
        alias_file = ROOT / "ui-aliases.json"
        if alias_file.exists():
            aliases = json.loads(alias_file.read_text(encoding="utf-8")).get("aliases", {})
            for k, v in aliases.items():
                if norm(k) == n and norm(v) in fields:
                    return fields[norm(v)]
        # Last resort: substring match, but never for button/field confusion and
        # only when the overlap is substantial. Guessing here is how a "選択" click
        # silently lands on the wrong element.
        if len(n) < 3:
            return None
        cands = [(k, v) for k, v in fields.items()
                 if (n in k or k in n) and min(len(n), len(k)) / max(len(n), len(k)) >= 0.6]
        if len(cands) == 1:
            return cands[0][1]
        return None


def compile_flow(path: Path) -> dict:
    flow = yaml.safe_load(path.read_text(encoding="utf-8"))
    r = Resolver()
    errors: list[str] = []
    out_steps: list[dict] = []

    for step in flow["steps"]:
        row = step.get("row")
        screen = step.get("screen")
        action = step.get("do")
        screen_key, meta = r.page_for_screen(screen)
        if screen_key is None:
            errors.append(f"row {row}: screen not resolved: {screen!r} ({meta.get('status','?')})")
            out_steps.append({"row": row, "screen": screen, "do": action, "error": "screen-unresolved"})
            continue

        # `expect` steps carry an expectation, not a form target. Keep it
        # separate so it is never looked up in the field dictionary.
        if action in ("expect", "expectRows", "expectMessage"):
            out_steps.append({
                "row": row,
                "screen": screen,
                "screenKey": screen_key,
                "do": action,
                "expect": step.get("expect", {}),
                "min": step.get("min"),
                "note": step.get("note"),
                "targets": [],
            })
            continue

        targets = {k: v for k, v in step.items() if k not in ("row", "screen", "do", "use", "note", "min", "requires")}
        resolved = []
        for label, value in targets.items():
            # "....|保険種類欄の横" pins an ambiguous label by its neighbour.
            base, _, qualifier = label.partition("|")
            hit = r.lookup_qualified(screen_key, base, qualifier) if qualifier else r.lookup(screen_key, label)
            if not hit:
                errors.append(f"row {row}: label not in {screen_key}: {label!r}")
                resolved.append({"label": label, "error": "label-unresolved"})
                continue
            if hit["kind"] == "rowfield":
                # Row-scoped target. When the dictionary gives a selector
                # template, fill it with the value; otherwise emit the name
                # pattern for the executor to resolve at runtime against the
                # live DOM (it is the only place the row index exists).
                tmpl = hit.get("selectorTemplate")
                resolved.append({
                    "label": label,
                    "kind": "rowfield",
                    "how": hit.get("how"),
                    "namePattern": hit.get("namePattern"),
                    "selector": tmpl.format(value=value) if tmpl else None,
                    "value": value,
                    "note": hit.get("note"),
                })
                continue
            resolved.append({
                "label": label,
                "id": hit["id"],
                "selector": f"#{hit['id']}" if not hit["id"].startswith("|") else None,
                "rawId": hit["id"] if hit["id"].startswith("|") else None,
                "kind": hit["kind"],
                "value": value,
            })

        out_steps.append({
            "row": row,
            "screen": screen,
            "screenKey": screen_key,
            "do": action,
            "use": step.get("use"),
            "requires": step.get("requires"),
            "note": step.get("note"),
            "targets": resolved,
        })

    return {
        "case": flow["case"],
        "steps": out_steps,
        "errors": errors,
        # A row-field with no selector template cannot be resolved from the
        # template; it needs the live DOM. Surface it instead of pretending.
        "pendingRuntime": [{"row": s["row"], "label": t["label"], "namePattern": t.get("namePattern"),
                            "note": t.get("note")}
                           for s in out_steps for t in s.get("targets", [])
                           if t.get("kind") == "rowfield" and not t.get("selector")],
        "stats": {
            "steps": len(out_steps),
            "errors": len(errors),
            "resolvedTargets": sum(len([t for t in s.get("targets", []) if "id" in t]) for s in out_steps),
            "totalTargets": sum(len(s.get("targets", [])) for s in out_steps),
        },
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("flow")
    ap.add_argument("--json")
    args = ap.parse_args()
    result = compile_flow(Path(args.flow))

    if args.json:
        Path(args.json).write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
    s = result["stats"]
    print(f"case {result['case']}")
    print(f"  steps {s['steps']}  targets {s['resolvedTargets']}/{s['totalTargets']} resolved")
    if result["errors"]:
        print(f"  ERRORS {s['errors']}")
        for e in result["errors"]:
            print(f"    - {e}")
        return 1
    print("  OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
