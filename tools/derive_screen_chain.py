#!/usr/bin/env python3
"""Derive the screen chain for every case from the hand-procedure rows.

The hand-procedure data has no `screen` column. The only reliable signal is
the verification row `verificationType == 遷移`, whose `verificationItem` is
the screen the flow lands on. Walking the rows in order therefore gives us
"current screen" for every operation row.

This script does NOT guess. It produces:
  - reports/screen-chain.json   per-case, per-row before/after screen
  - reports/screen-chain.md     coverage + unmapped screen names

Unmapped names are listed for a human to decide. No fuzzy merging.

Usage:
    python tools/derive_screen_chain.py
    python tools/derive_screen_chain.py --json reports/screen-chain.json
"""
from __future__ import annotations

import argparse
import collections
import glob
import json
import re
import sys
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CASES = ROOT / "v2" / "data" / "cases"
SCREENS = ROOT / "ui-screens.json"
OUT_JSON = ROOT / "reports" / "screen-chain.json"
OUT_MD = ROOT / "reports" / "screen-chain.md"

sys.stdout.reconfigure(encoding="utf-8")


def norm(s: str) -> str:
    """Same normalisation as tools/compile_flow.py + flow-loader.mjs."""
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


def variants(name: str) -> list[str]:
    """Safe spelling variants of a screen name. Nothing semantic."""
    out = [name]
    # 不備内容入力画面（更新） -> 不備内容入力画面-更新
    v = re.sub(r"[（(]([^）)]+)[）)]", r"-\1", name)
    out.append(v)
    # 申請・承認一覧 -> 申請承認一覧 (punctuation only)
    out.append(name.replace("・", ""))
    out.append(v.replace("・", ""))
    # trailing 画面 is often optional in the map
    for x in list(out):
        if x.endswith("画面"):
            out.append(x[:-2])
    # de-dupe, keep order
    seen, uniq = set(), []
    for x in out:
        if x and x not in seen:
            seen.add(x)
            uniq.append(x)
    return uniq


def load_screens() -> tuple[dict[str, str], set[str]]:
    data = json.loads(SCREENS.read_text(encoding="utf-8"))["screens"]
    by_norm: dict[str, str] = {}
    for key in data:
        # index the stored key through the same safe variants as the derived
        # name, so 代理店 不備内容入力画面（更新） matches 代理店　...-更新
        for v in variants(key):
            by_norm.setdefault(norm(v), key)
    return by_norm, set(data)


def match_screen(name: str, by_norm: dict[str, str]) -> tuple[str | None, str]:
    """Return (mapped key, how). `how` is exact | norm | variant | None."""
    if not name:
        return None, "empty"
    for v in variants(name):
        if v in by_norm.values():
            return v, "exact"
    n = norm(name)
    if n in by_norm:
        return by_norm[n], "norm"
    for v in variants(name):
        if norm(v) in by_norm:
            return by_norm[norm(v)], "variant"
    return None, "unmapped"


def load_cases() -> dict[str, dict]:
    cases: dict[str, dict] = {}
    for f in sorted(glob.glob(str(CASES / "*.js"))):
        text = Path(f).read_text(encoding="utf-8")
        eq = text.find("=")
        if eq < 0:
            continue
        cases.update(json.loads(text[eq + 1:].strip().rstrip(";")))
    return cases


def derive(case: dict, by_norm: dict[str, str] | None = None) -> dict:
    rows = ((case.get("workflow") or {}).get("rows")) or []
    initial = ""
    cur = ""
    fn = ""
    out: dict[str, dict] = {}
    for r in rows:
        row = r.get("sourceRow")
        if row is None:
            continue
        # ADR-0006: the hand procedure names the screen of an operation in the
        # functionName column, carried down the 項目 block. That column — not
        # the 遷移 row — is the authority for where the operation happened.
        f = (r.get("functionName") or "").strip()
        if f:
            fn = f
        before = cur
        ver_type = (r.get("verificationType") or "").strip()
        ver_item = (r.get("verificationItem") or "").strip()
        op = (r.get("operationType") or "").strip()
        if op and fn:
            # An operation block can name a screen with no 遷移 row at all
            # (batch sections: 「バッチ実行」 under 「ToDo連携…バッチ処理」).
            # The block header is then the only evidence that the current
            # screen changed, so it updates the chain for the rows after it.
            before = fn
            cur = fn
        if ver_type == "遷移" and ver_item:
            cur = ver_item
        elif ver_type == "表示" and ver_item and by_norm is not None:
            # A 表示 row whose confirmed item is a *screen name* (not a field)
            # also states where we are. AZ-240-01-001 row 20 presses 一覧画面
            # and row 21 confirms 代理店 不備一覧画面; without this the chain
            # would keep reporting AMC23 for rows 22-24.
            # Only exact/variant matches against ui-screens.json count; an
            # unknown name stays unresolved (no fuzzy guessing).
            mapped, how = match_screen(ver_item, by_norm)
            if mapped and how != "empty" and norm(mapped) != norm(cur):
                cur = mapped
        out[str(row)] = {
            "before": before,
            "after": cur,
            "op": op,
            "ver": ver_type,
            "fn": fn,
        }
    # the first screen is the one before the first transition; the data does
    # not name it, so it stays unresolved until a human/AI confirms it.
    first = next((v["before"] for v in out.values() if v["before"]), "")
    if not first:
        first = ""
    return {"initial": first or initial, "initialKnown": bool(first), "rows": out}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", default=str(OUT_JSON))
    args = ap.parse_args()

    by_norm, known = load_screens()
    cases = load_cases()

    chains: dict[str, dict] = {}
    raw_counter: collections.Counter = collections.Counter()
    mapped_counter: collections.Counter = collections.Counter()
    samples: dict[str, list[str]] = collections.defaultdict(list)
    op_rows = 0
    op_with_screen = 0
    initial_unknown = 0
    trans_rows = 0

    for cid, case in cases.items():
        chain = derive(case, by_norm)
        chains[cid] = chain
        if not chain["initialKnown"]:
            initial_unknown += 1
        for row, info in chain["rows"].items():
            if info["ver"] == "遷移" and info["after"]:
                trans_rows += 1
            if info["op"]:
                op_rows += 1
                scr = info["before"]
                if scr:
                    op_with_screen += 1
                    raw_counter[scr] += 1
                    if len(samples[scr]) < 3 and cid not in samples[scr]:
                        samples[scr].append(cid)
                mapped, how = match_screen(scr, by_norm) if scr else (None, "empty")
                if mapped:
                    mapped_counter[mapped] += 1

    screen_rows = []
    for raw, count in raw_counter.most_common():
        mapped, how = match_screen(raw, by_norm)
        screen_rows.append({
            "name": raw,
            "norm": norm(raw),
            "count": count,
            "status": "mapped" if mapped else "unmapped",
            "mappedTo": mapped,
            "how": how,
            "samples": samples[raw],
        })

    unmapped = [s for s in screen_rows if s["status"] == "unmapped"]
    result = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": "v2/data/cases/*.js",
        "rule": "current screen = the last non-empty verificationItem of a 遷移 row; a 表示 row whose verificationItem is a known screen name also confirms the screen",
        "stats": {
            "cases": len(cases),
            "operationRows": op_rows,
            "operationRowsWithScreen": op_with_screen,
            "coverage": round(op_with_screen / op_rows, 4) if op_rows else 0,
            "transitionRows": trans_rows,
            "distinctScreenNames": len(screen_rows),
            "mappedNames": len(screen_rows) - len(unmapped),
            "unmappedNames": len(unmapped),
            "casesWithUnknownInitial": initial_unknown,
        },
        "screens": screen_rows,
        "cases": {cid: c for cid, c in chains.items()},
    }

    out_json = Path(args.json)
    out_json.parent.mkdir(parents=True, exist_ok=True)
    out_json.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")

    s = result["stats"]
    lines = [
        "# 画面链派生报告",
        "",
        f"生成：{result['generatedAt']}",
        "",
        "规则：当前画面 = 最近一条非空 `遷移` 验证的目标画面。不猜。",
        "",
        "## 覆盖",
        "",
        "| 指标 | 数值 |",
        "|---|---|",
        f"| case | {s['cases']} |",
        f"| 操作行 | {s['operationRows']} |",
        f"| 能确定画面 | {s['operationRowsWithScreen']} ({s['coverage']:.1%}) |",
        f"| 遷移行 | {s['transitionRows']} |",
        f"| 画面名（raw） | {s['distinctScreenNames']} |",
        f"| 已映射到 ui-screens | {s['mappedNames']} |",
        f"| 未映射 | {s['unmappedNames']} |",
        f"| 起始画面未知的 case | {s['casesWithUnknownInitial']} |",
        "",
        "## 未映射画面名",
        "",
        "这些名字需要人工/AI 决定：新增画面、加别名，还是拼写变体。**脚本不合并。**",
        "",
        "| 次数 | 原始名 | 归一化 | 样例 case |",
        "|---|---|---|---|",
    ]
    for u in unmapped:
        lines.append(f"| {u['count']} | {u['name']} | `{u['norm']}` | {', '.join(u['samples'][:2])} |")
    lines += [
        "",
        "## 已映射但靠 variant 的",
        "",
        "这些是安全拼写变体（全角括号/中点/结尾「画面」），已自动归并。",
        "",
        "| 次数 | 原始名 | 映射到 |",
        "|---|---|---|",
    ]
    for m in screen_rows:
        if m["status"] == "mapped" and m["how"] in ("variant", "norm"):
            lines.append(f"| {m['count']} | {m['name']} | {m['mappedTo']} |")
    lines += [
        "",
        "## 起始画面",
        "",
        f"{s['casesWithUnknownInitial']} 个 case 的第一屏不在手顺的 `遷移` 里。",
        "它是输入，不是派生值：在 flow 的 `start.screen` 或第一步的 `on` 里写死一次，",
        "由人/AI 确认。不要从操作文本猜。",
        "",
    ]
    OUT_MD.write_text("\n".join(lines), encoding="utf-8")

    print(f"cases                 {s['cases']}")
    print(f"operation rows        {s['operationRows']}")
    print(f"  with screen         {s['operationRowsWithScreen']} ({s['coverage']:.1%})")
    print(f"transition rows       {s['transitionRows']}")
    print(f"screen names          {s['distinctScreenNames']}  mapped {s['mappedNames']}  unmapped {s['unmappedNames']}")
    print(f"unknown initial       {s['casesWithUnknownInitial']}")
    print(f"json                  {out_json}")
    print(f"md                    {OUT_MD}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
