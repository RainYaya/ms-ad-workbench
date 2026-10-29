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
ROWFIELDS = ROOT / "ui-rowfields.json"
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


def control_kinds(screen_key: str, controls: dict) -> dict[str, str]:
    """label -> kind for the controls a book can actually target."""
    page = (controls.get("screens") or {}).get(screen_key) or {}
    out: dict[str, str] = {}
    for c in page.get("controls") or []:
        if c.get("labelKey") and c.get("kind") != "hidden" and c["labelKey"] not in out:
            out[c["labelKey"]] = c.get("kind") or ""
    return out


# 別紙 writes checkbox state in prose. Copying it literally produces a string
# where the runner needs a boolean ("checkbox value must be boolean"), so the
# conversion is a table with a reason, not an inference.
CHECKBOX_WORDS = {
    "チェックオン": True, "チェックオンする": True, "オン": True,
    "チェックオフ": False, "チェックオフする": False, "オフ": False,
    "連動する": True, "連動しない": False,
}


def coerce_checkbox(val, kind: str):
    """Return (value, note). Unknown wording stays as-is so the book blocks."""
    if kind not in ("checkbox", "radio"):
        return val, None
    if isinstance(val, bool):
        return val, None
    word = str(val).strip()
    if word in CHECKBOX_WORDS:
        return CHECKBOX_WORDS[word], f"別紙「{word}」= {'ON' if CHECKBOX_WORDS[word] else 'OFF'}"
    return val, None


OP_DO = {"click": "click", "fill": "fill", "select": "select", "check": "check",
         "chooseRow": "chooseRow", "press": "press"}

# 手顺 spelles the qualifier inside the item itself:
#   「....」（保険種類欄の横）  ->  label ....  +  qualifier 保険種類欄の横
# The screen really does have two buttons captioned "....", so the label alone is
# ambiguous; ui-rowfields.json#qualifiedButtons is the table that tells them
# apart (flow-loader lookupQualified).
ITEM_QUALIFIER = re.compile(r"^[「\"](.+?)[」\"]\s*[（(](.+?)[）)]$")

# how-values the loader treats as row-scoped: the selector is a template that
# needs a business value from one specific row (check-flow §5.5).
ROW_SCOPED_HOW = {"rowByText", "optionByText", "radioByRowText", "runtime-resolve"}


def split_item(item: str) -> tuple[str, str | None]:
    """'「....」（保険種類欄の横）' -> ('....', '保険種類欄の横'); otherwise (item, None)."""
    m = ITEM_QUALIFIER.match((item or "").strip())
    if not m:
        return (item or "").strip(), None
    return m.group(1).strip(), m.group(2).strip()


def row_scoped(overlay: dict, screen_key: str, label: str) -> bool:
    """True when the overlay resolves this label to a per-row control.

    Those need a `target.anchor` (a value from that row).  A step that has no
    such value cannot be emitted: the loader would fall back to the step value
    and build a selector that matches nothing while looking legitimate.
    """
    for rf in overlay.get(screen_key) or []:
        if norm(rf.get("label") or "") != norm(label):
            continue
        if rf.get("selector"):
            return False
        return (rf.get("how") in ROW_SCOPED_HOW
                or "{value}" in str(rf.get("selectorTemplate") or ""))
    return False


def has_row_link(overlay: dict, screen_key: str) -> bool:
    """The result table's No. link, registered per screen in ui-rowfields.json."""
    return any(norm(rf.get("label") or "") == norm("結果行のNo.")
               for rf in overlay.get(screen_key) or [])


def build_book(cid: str, case: dict, rules: dict, screens: dict, by_norm: dict,
               ctl_labels: dict, field_rules: dict | None = None,
               ctl_kinds: dict | None = None, overlay: dict | None = None,
               partial: bool = False) -> tuple[dict | None, dict]:
    field_rules = field_rules or {}
    ctl_kinds = ctl_kinds or {}
    overlay = overlay or {}
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

    def unemittable(reason: str, row) -> bool:
        """Record a hand row the generator cannot express.

        Default: stop building the book.  A flow that silently drops a row
        looks runnable and is not (ADR-0001).

        --partial keeps the row in place as an explicit `manual` step marked
        未自動化, so row coverage stays complete and the gap is visible in the
        step list instead of mid-run.  Returns True when the caller must stop.
        """
        st["blocked"].append(reason)
        if not partial:
            return True
        step = {"row": row, "do": "manual", "note": f"【未自動化】{reason}"}
        if cur_name:
            step["on"] = cur_name
        steps.append(step)
        return False

    def label_status(sk: str, lab: str) -> str:
        key = norm(lab)
        # The overlay is the first thing flow-loader.lookup() consults, so a label
        # registered there resolves at run time even when the mined repository
        # could not name it (a field whose caption changes with another control).
        if any(norm(rf.get("label") or "") == key for rf in overlay.get(sk) or []):
            return "ok"
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
        prev_name, prev_sk = cur_name, cur_sk
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
                # The 遷移 row is the hand procedure *stating* the move, so the
                # following rows run on the target.  ADR-0006 keeps the derived
                # chain on the functionName carry-down instead (it warns that a
                # 遷移 is "late by one row" for the click that causes it), and the
                # two readings agree except when a book opens a popup from a
                # block whose functionName is never restated — those books keep
                # a screen-mismatch error in check-flow and need a human look.
                cur_name, cur_sk = tname, f"{tmeta['app']}/{tmeta['code']}"
            elif vt == "表示":
                # A 表示 row usually verifies fields on the current screen, but it
                # may also name a screen: 「表示 送信先(写)選択画面」 opens a popup,
                # 「表示 申請・確認更新画面」 is the parent after that popup closes.
                # The hand procedure decides the screen here, not the carry-down.
                named = (r.get("verificationItem") or "").strip()
                hit = match_screen(named, by_norm) if named else None
                if hit:
                    tname, tmeta = hit
                    tsk = f"{tmeta['app']}/{tmeta['code']}"
                    # The hand abbreviates the parent screen it is already on
                    # （代理店 不備一覧画面 -> 不備一覧画面）. That is the same page,
                    # not a move to the screen of the shorter name.
                    if cur_sk and tsk != cur_sk and norm(named) != norm(cur_name or "") \
                            and norm(named) in norm(cur_name or ""):
                        pass
                    else:
                        cur_name, cur_sk = tname, tsk
                else:
                    # A 表示 row verifies what is on screen; the functionName
                    # column being restated on it does not move the flow (a popup
                    # is open over the parent). Same rule as the derived chain.
                    cur_name, cur_sk = prev_name, prev_sk
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
                    # 外部証跡 is not a browser assertion: attach it to the screen
                    # the flow was on before this row's functionName (a mail/
                    # document name is not a screen).
                    "row": r["sourceRow"], "on": prev_name or cur_name,
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
            if unemittable(
                    f"screen unresolved ({cur_name or 'none'}) / {item}", r["sourceRow"]):
                break
            continue
        rule = rules.get((cur_sk, norm(item)))
        if not rule:
            if unemittable(f"no binding for {item!r} on {cur_sk}", r["sourceRow"]):
                break
            continue
        if rule.get("status") not in ("auto", "confirmed"):
            if unemittable(
                    f"binding {rule.get('id')} is {rule.get('status')} ({item})",
                    r["sourceRow"]):
                break
            continue

        rtype = rule.get("type")
        if rtype == "template":
            do = OP_DO.get(rule.get("op") or "click")
            if not do:
                if unemittable(f"unsupported op {rule.get('op')}", r["sourceRow"]):
                    break
                continue
            label = rule.get("label") or item
            # 「....」exists twice on the screen; the qualifier in the hand text is
            # what tells the two apart (ui-rowfields.json#qualifiedButtons).
            _, qualifier = split_item(item)
            target = {"label": label}
            if qualifier and not row_scoped(overlay, cur_sk, label):
                target["qualifier"] = qualifier
            if row_scoped(overlay, cur_sk, label):
                if unemittable(
                        f"行内控件「{label}」に target.anchor が無い"
                        f"（手順/別紙に行を特定する値が書かれていない）", r["sourceRow"]):
                    break
                continue
            step = {"row": r["sourceRow"], "on": cur_name, "do": do,
                    "target": target}
            if do in ("fill", "select"):
                blk_no, blk = pick_block(r.get("operationNo"), [label])
                val = blk.get(label, (None, None))[0]
                if val is None:
                    if unemittable(
                            f"no appendix value for {label!r} (block {r.get('operationNo')})",
                            r["sourceRow"]):
                        break
                    continue
                val, note = coerce_checkbox(val, (ctl_kinds.get(cur_sk) or {}).get(label, ""))
                if note:
                    step["value"] = val
                    step["valueNote"] = note
                else:
                    step["value"] = val
                step["valueRow"] = blk[label][1]
            if (r.get("evidenceType") or "").strip():
                step["evidence"] = r["evidenceType"].strip()
            steps.append(step)
        elif rtype == "directive":
            blk_no, blk = pick_block(r.get("operationNo"), None)
            if not blk:
                if unemittable(
                        f"fillAll but no appendix 操作内容 block fits {cur_sk}",
                        r["sourceRow"]):
                    break
                continue
            used_blocks.add(blk_no)
            # A block may end with 「その他項目は別紙参照」 instead of listing the
            # rest. That is not a field: generating from the parsed labels alone
            # would silently fill a screen incompletely, so the book stops here.
            placeholder = list(blk.get("__notes__") or [])
            if placeholder:
                if unemittable(f"別紙の入力項目が未解析（{placeholder[0]}）", r["sourceRow"]):
                    break
                continue
            have = ctl_labels.get(cur_sk, set())
            missing = [f"{lab} ({label_status(cur_sk, lab)})" for lab in blk
                       if not lab.startswith("__") and label_status(cur_sk, lab) != "ok"]
            if missing:
                if unemittable(
                        f"appendix labels not on {cur_sk}: " + ", ".join(missing),
                        r["sourceRow"]):
                    break
                continue
            use = []
            for lab, (val, srow) in blk.items():
                if lab.startswith("__"):
                    continue
                kind = (ctl_kinds.get(cur_sk) or {}).get(lab, "")
                val, note = coerce_checkbox(val, kind)
                use.append(lab)
                prev = values.get(lab)
                if prev and prev["value"] != val:
                    # same label, different value inside one book -> keep the
                    # value on the step, not in the shared map
                    item = {"label": lab, "value": val}
                    if note:
                        item["note"] = note
                    use[-1] = item
                else:
                    entry = {"value": val,
                             "source": "literal" if note else "case",
                             "row": srow}
                    if note:
                        entry["note"] = note
                    values[lab] = entry
            steps.append({"row": r["sourceRow"], "on": cur_name, "do": "fillAll", "use": use,
                          "note": f"別紙【操作内容】{blk_no} の入力項目"})
        elif rtype == "rowlink":
            if not has_row_link(overlay, cur_sk):
                if unemittable(
                        f"結果行のNo. が ui-rowfields.json に未登録（{cur_sk}）"
                        f"—— 実機で No. 列リンクを add-control する", r["sourceRow"]):
                    break
                continue
            steps.append({"row": r["sourceRow"], "on": cur_name, "do": "chooseRow",
                          "target": {"label": "結果行のNo."},
                          "note": "結果表の No. 列リンク。1件でなければエラー。"})
        else:
            if unemittable(f"binding type {rtype} not emittable", r["sourceRow"]):
                break
            continue

    if st["blocked"]:
        # --partial books are drafts: they exist so a human can fill the gaps,
        # and every gap is a visible manual step in the step list.
        st["status"] = "partial" if partial else "blocked"
        if not partial:
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
    ap.add_argument("--partial", action="store_true",
                    help="emit a draft book even when some rows cannot be expressed; "
                         "those rows become manual steps marked 【未自動化】")
    ap.add_argument("--cases", default=None,
                    help="file with one case id per line (e.g. the assigned task list)")
    args = ap.parse_args()

    cases = load_cases()
    screens, by_norm = rpa_common.load_screens()
    controls = json.loads(CONTROLS.read_text(encoding="utf-8"))
    ctl_labels = {sk: control_labels(sk, controls) for sk in controls.get("screens", {})}
    ctl_kinds = {sk: control_kinds(sk, controls) for sk in controls.get("screens", {})}
    doc = yaml.safe_load(BINDINGS.read_text(encoding="utf-8")) or {}
    rules = {(r.get("screen"), r.get("key")): r for r in doc.get("rules") or []}
    field_rules = {(r.get("screen"), r.get("key")): r for r in doc.get("rules") or []
                   if r.get("type") == "field"}
    overlay = (json.loads(ROWFIELDS.read_text(encoding="utf-8")) or {}).get("rowfields") or {}

    OUT.mkdir(parents=True, exist_ok=True)
    stats: list[dict] = []
    written = 0
    kept: set[str] = set()
    only_ids = None
    if args.cases:
        only_ids = {ln.split("\t")[0].strip() for ln in
                    Path(args.cases).read_text(encoding="utf-8-sig").splitlines() if ln.strip()}
    for cid, case in sorted(cases.items()):
        if only_ids is not None and cid not in only_ids:
            continue
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
        flow, st = build_book(cid, case, rules, screens, by_norm, ctl_labels, field_rules, ctl_kinds,
                              overlay=overlay, partial=args.partial)
        stats.append(st)
        if not flow:
            continue
        if not args.dry_run:
            p = OUT / f"{cid}.yaml"
            header = (f"# {cid}  {case.get('functionName') or ''}\n"
                      f"# generated by tools/generate_books.py from "
                      f"{case.get('sourceFile') or ''} at {datetime.now().isoformat(timespec='seconds')}\n")
            if st.get("status") == "partial":
                header += (f"# DRAFT: {len(st['blocked'])} 行未自動化（検索: 【未自動化】）。"
                           f"人手で実機を見て直すこと。\n")
            p.write_text(header + yaml.dump(flow, allow_unicode=True, sort_keys=False,
                                            default_flow_style=False), encoding="utf-8")
        kept.add(cid)
        written += 1

    # A book that became blocked must not keep a stale flow file: the file is
    # what the Studio and the runner see. Only generator-owned files are
    # removed, and only with --force on a full run (a filtered run under
    # --cases/--only knows nothing about the books it did not process, so it
    # must never delete anything).
    if not args.dry_run and args.force and not args.only and not args.limit \
            and not args.cases:
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
        detail = {d["book"]: d for d in stats}
        filtered = only_ids is not None or args.only or args.limit
        try:
            old = json.loads(STATUS.read_text(encoding="utf-8"))
        except Exception:
            old = {}
        old_map = {d["book"]: d for d in old.get("booksDetail") or []}
        for book, d in detail.items():
            # "kept" only means "file already existed"; the book's real status
            # comes from the previous run when we have it.
            if d["status"] == "kept" and (old_map.get(book) or {}).get("status") in (
                    "ok", "partial"):
                d["status"] = old_map[book]["status"]
        if filtered:
            # A filtered run only knows about the books it processed. Merging
            # keeps books-status.json a report about the whole corpus instead of
            # silently shrinking it to --cases/--only.
            for book, d in old_map.items():
                detail.setdefault(book, d)
        merged = sorted(detail.values(), key=lambda d: d["book"])
        by_status = collections.Counter(d["status"] for d in merged)
        written = sum(1 for d in merged if d["status"] != "blocked")
        STATUS.write_text(json.dumps({
            "at": datetime.now().isoformat(timespec="seconds"),
            "books": len(merged), "written": written,
            "byStatus": dict(by_status), "booksDetail": merged,
        }, ensure_ascii=False, indent=1), encoding="utf-8")

    print(f"books {len(stats)} written {written} (new {generated_now}) {dict(by_status)}")
    for reason, n in reasons.most_common(15):
        print(f"{n:5d}  {reason}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
