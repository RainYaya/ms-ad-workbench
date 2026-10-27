#!/usr/bin/env python3
"""Generate per-book flows from the hand-procedure data.

One book (試験手順書) -> one file in flows/books/<case>.yaml.  Nothing here
decides *what* to do: the operation rows say what, the appendix says with which
values, and flows/bindings.yaml says which control.  When any of those three is
missing the book is not generated; it is listed with the reason instead.

Rules enforced here:
  * the screen of an operation row is the functionName column, carried down the
    項目 block (the 遷移 row documents the move, it does not define the source)
  * a binding rule must be auto/confirmed to emit a step
  * operationType == 'その他' is the explicit non-browser signal -> manual
  * appendix values are taken literally; no inference, no defaults

Usage:
    python tools/generate_books.py                 # write flows/books
    python tools/generate_books.py --dry-run       # report only
    python tools/generate_books.py --only AY-110
"""
from __future__ import annotations

import argparse
import collections
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
BINDINGS = ROOT / "flows" / "bindings.yaml"
OUT = ROOT / "flows" / "books"
STATUS = ROOT / "flows" / "books-status.json"

sys.stdout.reconfigure(encoding="utf-8")

norm = rpa_common.norm
load_cases = rpa_common.load_cases
match_screen = rpa_common.match_screen
appendix_blocks = rpa_common.appendix_blocks


def control_labels(screen_key: str, controls: dict) -> set[str]:
    page = (controls.get("screens") or {}).get(screen_key) or {}
    return {c["labelKey"] for c in page.get("controls") or []
            if c.get("labelKey") and c.get("kind") != "hidden"}


OP_DO = {"click": "click", "fill": "fill", "select": "select", "check": "check",
         "chooseRow": "chooseRow", "press": "press"}


def build_book(cid: str, case: dict, rules: dict, screens: dict, by_norm: dict,
               ctl_labels: dict, field_rules: dict | None = None) -> tuple[dict | None, dict]:
    field_rules = field_rules or {}
    rows = (case.get("workflow") or {}).get("rows") or []
    st = {"book": cid, "rows": len(rows), "steps": 0, "status": "ok",
          "blocked": [], "warnings": []}
    if not rows:
        st.update(status="blocked", blocked=["no workflow rows"])
        return None, st

    sheets = (case.get("appendix") or {}).get("sheets") or []
    op_blocks = appendix_blocks(sheets, "OPERATION")
    disp_blocks = appendix_blocks(sheets, "DISPLAY")

    steps: list[dict] = []
    values: dict = {}
    cur_sk, cur_name = None, None
    start_sk, start_name = None, None
    used_blocks: set[int] = set()

    have_on_screen = lambda sk: ctl_labels.get(sk, set())

    def label_status(sk: str, lab: str) -> str:
        key = norm(lab)
        if key in ctl_labels.get(sk, set()):
            return "ok"
        r = field_rules.get((sk, key))
        if r:
            return "ok" if r.get("status") in ("auto", "confirmed") else (r.get("status") or "unknown")
        return "no-control"

    def pick_block(op_no: str, want_labels: list[str] | None) -> tuple[int | None, dict]:
        """Choose the appendix 操作内容 block for one 各項目に入力 row.

        operationNo restarts on every screen, so it is only a hint.  The
        authority is the label set: a block is eligible when every one of its
        labels exists on the current screen.  Exact operationNo wins; otherwise
        the first unused eligible block in sheet order.
        """
        avail = {k: v for k, v in op_blocks.items() if k not in used_blocks}
        if not avail:
            return None, {}
        try:
            n = int(str(op_no).strip())
        except (TypeError, ValueError):
            n = None
        if n is not None and n in avail:
            blk = avail[n]
            if want_labels is None or all(label_status(cur_sk, l) == "ok" for l in blk):
                return n, blk
        for k in sorted(avail):
            blk = avail[k]
            if all(label_status(cur_sk, l) == "ok" for l in blk):
                return k, blk
        return None, {}

    for r in rows:
        fn = (r.get("functionName") or "").strip()
        if fn:
            hit = match_screen(fn, by_norm)
            if hit:
                cur_name, meta = hit
                cur_sk = f"{meta['app']}/{meta['code']}"
                if start_sk is None:
                    start_sk, start_name = cur_sk, cur_name
            else:
                cur_name, cur_sk = fn, None

        vt = (r.get("verificationType") or "").strip()
        ot = (r.get("operationType") or "").strip()
        item = (r.get("operationItem") or "").strip()
        content = (r.get("operationContent") or "").strip()

        # ── verification rows ──────────────────────────────────────
        if vt:
            if vt == "遷移":
                target = (r.get("verificationItem") or "").strip()
                hit = match_screen(target, by_norm)
                if not hit:
                    # A transition to a page we have no HTML for (別タブのヘルプ
                    # 画面など) is a human check, not a silent no-op.  Carry the
                    # name forward so later rows report the screen the hand
                    # procedure actually names.
                    st["warnings"].append(
                        f"row {r['sourceRow']}: 遷移 to screen without HTML {target!r} -> manual")
                    steps.append({"row": r["sourceRow"], "on": target, "do": "manual",
                                  "note": f"遷移先画面が未収録（{target}）。人手で確認する"})
                    cur_name, cur_sk = target, None
                    continue
                tname, tmeta = hit
                step = {"row": r["sourceRow"], "on": tname, "do": "screenIs"}
                ev = (r.get("evidenceType") or "").strip()
                if ev:
                    step["evidence"] = ev
                vc = (r.get("verificationContent") or "").strip()
                m = re.search(r"表示内容\s*[0-9０-９]+", vc)
                if m:
                    step["expect"] = {"ref": {"appendix": m.group(0), "status": "unresolved",
                                              "note": "別紙の表示内容。値の突合は未実装"}}
                steps.append(step)
                cur_name, cur_sk = tname, f"{tmeta['app']}/{tmeta['code']}"
            elif vt == "表示":
                if not cur_sk:
                    st["warnings"].append(f"row {r['sourceRow']}: 表示 without a resolved screen")
                    continue
                step = {"row": r["sourceRow"], "on": cur_name, "do": "screenIs"}
                ev = (r.get("evidenceType") or "").strip()
                if ev:
                    step["evidence"] = ev
                vc = (r.get("verificationContent") or "").strip()
                m = re.search(r"表示内容\s*[0-9０-９]+", vc)
                if m:
                    step["expect"] = {"ref": {"appendix": m.group(0), "status": "unresolved",
                                              "note": "別紙の表示内容。値の突合は未実装"}}
                steps.append(step)
            elif vt == "その他":
                # 外部証跡: APログ / DBログ / DBダンプ. Not a browser assertion.
                etype = (r.get("evidenceType") or "").strip() \
                    or (r.get("verificationItem") or "").strip()
                if not etype:
                    st["warnings"].append(f"row {r['sourceRow']}: その他 without evidence type")
                    continue
                steps.append({
                    "row": r["sourceRow"], "on": cur_name,
                    "do": "externalIs",
                    "expect": {"external": {"type": etype,
                                            "note": (r.get("verificationContent") or "").strip()}},
                })
            else:
                label = (r.get("verificationItem") or "").strip()
                want = (r.get("verificationContent") or "").strip()
                if cur_sk and label and want:
                    key = norm(label)
                    if key in ctl_labels.get(cur_sk, set()):
                        steps.append({"row": r["sourceRow"], "on": cur_name, "do": "fieldIs",
                                      "target": {"label": label}, "expect": {"value": want}})
                    else:
                        st["warnings"].append(
                            f"row {r['sourceRow']}: 内容 target {label!r} not on {cur_sk}")
            continue

        if not item:
            continue

        # ── operation rows ─────────────────────────────────────────
        if not cur_sk:
            if ot == "その他":
                steps.append({
                    "row": r["sourceRow"], "on": cur_name or "（非ブラウザ）",
                    "do": "manual",
                    "note": f"operationType=その他: {item}" + (f" / {content}" if content else ""),
                })
                continue
            st["blocked"].append(
                f"row {r['sourceRow']}: screen unresolved ({cur_name or 'none'}) / {item}")
            break

        rule = rules.get((cur_sk, norm(item)))
        if not rule:
            st["blocked"].append(f"row {r['sourceRow']}: no binding for {item!r} on {cur_sk}")
            break
        if rule.get("status") not in ("auto", "confirmed"):
            st["blocked"].append(
                f"row {r['sourceRow']}: binding {rule.get('id')} is {rule.get('status')} ({item})")
            break

        rtype = rule.get("type")
        if rtype == "template":
            do = OP_DO.get(rule.get("op") or "click")
            if not do:
                st["blocked"].append(f"row {r['sourceRow']}: unsupported op {rule.get('op')}")
                break
            label = rule.get("label") or item
            step = {"row": r["sourceRow"], "on": cur_name, "do": do,
                    "target": {"label": label}}
            if do in ("fill", "select"):
                blk_no, blk = pick_block(r.get("operationNo"), [label])
                val = blk.get(label, (None, None))[0]
                if val is None:
                    st["blocked"].append(
                        f"row {r['sourceRow']}: no appendix value for {label!r} "
                        f"(block {r.get('operationNo')})")
                    break
                step["value"] = val
                step["valueRow"] = blk[label][1]
            if (r.get("evidenceType") or "").strip():
                step["evidence"] = r["evidenceType"].strip()
            steps.append(step)
        elif rtype == "directive":
            blk_no, blk = pick_block(r.get("operationNo"), None)
            if not blk:
                st["blocked"].append(
                    f"row {r['sourceRow']}: fillAll but no appendix 操作内容 block "
                    f"fits {cur_sk}")
                break
            used_blocks.add(blk_no)
            # A block may end with 「その他項目は別紙参照」 instead of listing the
            # rest. That is not a field: generating from the parsed labels alone
            # would silently fill a screen incompletely, so the book stops here.
            placeholder = list(blk.get("__notes__") or [])
            if placeholder:
                st["blocked"].append(
                    f"row {r['sourceRow']}: 別紙の入力項目が未解析（{placeholder[0]}）")
                break
            have = ctl_labels.get(cur_sk, set())
            missing = [f"{lab} ({label_status(cur_sk, lab)})" for lab in blk
                       if not lab.startswith("__") and label_status(cur_sk, lab) != "ok"]
            if missing:
                st["blocked"].append(
                    f"row {r['sourceRow']}: appendix labels not on {cur_sk}: "
                    + ", ".join(missing))
                break
            use = []
            for lab, (val, srow) in blk.items():
                if lab.startswith("__"):
                    continue
                use.append(lab)
                prev = values.get(lab)
                if prev and prev["value"] != val:
                    # same label, different value inside one book -> keep the
                    # value on the step, not in the shared map
                    use[-1] = {"label": lab, "value": val}
                else:
                    values[lab] = {"value": val, "source": "case", "row": srow}
            steps.append({"row": r["sourceRow"], "on": cur_name, "do": "fillAll", "use": use,
                          "note": f"別紙【操作内容】{blk_no} の入力項目"})
        elif rtype == "rowlink":
            steps.append({"row": r["sourceRow"], "on": cur_name, "do": "chooseRow",
                          "target": {"label": "結果行のNo."},
                          "note": "結果表の No. 列リンク。1件でなければエラー。"})
        else:
            st["blocked"].append(f"row {r['sourceRow']}: binding type {rtype} not emittable")
            break

    if st["blocked"]:
        st["status"] = "blocked"
        return None, st

    if not steps:
        st.update(status="blocked", blocked=["no emittable steps"])
        return None, st

    # A book with no resolvable screen at all is an external/batch procedure.
    flow = {
        "case": cid,
        "title": case.get("functionName") or cid,
        "user": case.get("company") or "MS",
        "pointCheck": case.get("categoryId"),
        "evidencePolicy": "required",
    }
    if start_sk is None:
        flow["mode"] = "external"
    else:
        flow["start"] = {"screen": start_name,
                         "url": f"/{start_sk.split('/')[0]}/{start_sk.split('/')[1]}.html"}
    if values:
        flow["values"] = values
    for s in steps:
        s.pop("valueRow", None)
    flow["steps"] = steps
    st["steps"] = len(steps)
    st["screens"] = sorted({s["on"] for s in steps if isinstance(s.get("on"), str)})
    return flow, st


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only", default=None, help="category prefix, e.g. AY-110")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--force", action="store_true",
                    help="overwrite flows/books even when the book already exists")
    args = ap.parse_args()

    cases = load_cases()
    screens, by_norm = rpa_common.load_screens()
    controls = json.loads(CONTROLS.read_text(encoding="utf-8"))
    ctl_labels = {sk: control_labels(sk, controls) for sk in controls.get("screens", {})}
    doc = yaml.safe_load(BINDINGS.read_text(encoding="utf-8")) or {}
    rules = {(r.get("screen"), r.get("key")): r for r in doc.get("rules") or []}
    field_rules = {(r.get("screen"), r.get("key")): r for r in doc.get("rules") or []
                   if r.get("type") == "field"}

    OUT.mkdir(parents=True, exist_ok=True)
    stats: list[dict] = []
    written = 0
    kept: set[str] = set()
    for cid, case in sorted(cases.items()):
        if args.only and not cid.startswith(args.only):
            continue
        if args.limit and written >= args.limit:
            break
        # A hand-written flow for the same book is curated (values, overrides,
        # known contradictions) and outranks the generator. Regenerating would
        # also collide on logs/<case>-flow.
        if not args.force and (ROOT / "flows" / f"{cid}.yaml").exists():
            stats.append({"book": cid, "status": "hand-written", "rows": 0, "steps": 0,
                          "blocked": [], "warnings": []})
            kept.add(cid)
            continue
        # A generated book becomes human-owned after its first generation
        # (ADR: 本流程 归人编辑). Only --force overwrites it.
        existing = OUT / f"{cid}.yaml"
        if not args.force and existing.exists():
            stats.append({"book": cid, "status": "kept", "rows": 0, "steps": 0,
                          "blocked": [], "warnings": []})
            kept.add(cid)
            continue
        flow, st = build_book(cid, case, rules, screens, by_norm, ctl_labels, field_rules)
        stats.append(st)
        if not flow:
            continue
        if not args.dry_run:
            p = OUT / f"{cid}.yaml"
            header = (f"# {cid}  {case.get('functionName') or ''}\n"
                      f"# generated by tools/generate_books.py from "
                      f"{case.get('sourceFile') or ''} at {datetime.now().isoformat(timespec='seconds')}\n")
            p.write_text(header + yaml.dump(flow, allow_unicode=True, sort_keys=False,
                                            default_flow_style=False), encoding="utf-8")
        kept.add(cid)
        written += 1

    # A book that became blocked must not keep a stale flow file: the file is
    # what the Studio and the runner see. Only generator-owned files are
    # removed, and only with --force (by default an existing book is
    # human-owned and is never touched).
    if not args.dry_run and args.force and not args.only and not args.limit:
        for f in OUT.glob("*.yaml"):
            if f.stem in kept:
                continue
            head = f.read_text(encoding="utf-8", errors="replace").splitlines()[:2]
            if any("generated by tools/generate_books.py" in line for line in head):
                f.unlink()

    generated_now = written
    # `written` in the status file means "books that have a generated flow"
    # (kept + newly written), not "files touched in this run": after Q1 the
    # default run writes almost nothing.
    written = len(kept)
    by_status = collections.Counter(s["status"] for s in stats)
    reasons = collections.Counter()
    for s in stats:
        for b in s["blocked"]:
            reasons[re.sub(r"row \d+: ", "", b)[:80]] += 1

    if not args.dry_run:
        STATUS.write_text(json.dumps({
            "at": datetime.now().isoformat(timespec="seconds"),
            "books": len(stats), "written": written,
            "byStatus": dict(by_status), "booksDetail": stats,
        }, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"books {len(stats)} written {written} (new {generated_now}) {dict(by_status)}")
    for reason, n in reasons.most_common(15):
        print(f"{n:5d}  {reason}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
