#!/usr/bin/env python3
"""Extract UI guards (silent early-returns) from the real front-end pages.

A guard is a function whose body contains `if (cond) { ... return; }` before
doing anything useful. The classic example is onClickSelectInsurance():

    var selectedIndex = largeItemObj.selectedIndex;
    if ( selectedIndex <= 0 ) { return; }      // nothing happens, no error

Those are exactly the "clicked but nothing happened" failures. They must become
`requires:` in the flow, not be discovered on site.

Output:
    guards.json      generated, do not hand-edit
    reports/guards.md

Usage:
    python tools/extract_guards.py
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WEBAPPS = ROOT / "reference" / "webapps"
OUT_JSON = ROOT / "guards.json"
OUT_MD = ROOT / "reports" / "guards.md"

sys.stdout.reconfigure(encoding="utf-8")

ENC_ORDER = ("cp932", "shift_jis", "utf-8-sig", "utf-8", "euc_jp")


def decode(raw: bytes) -> str:
    for enc in ENC_ORDER:
        try:
            text = raw.decode(enc)
        except UnicodeDecodeError:
            continue
        if re.search(r"[぀-ヿ]", text) or "<html" in text.lower():
            return text
    return raw.decode("cp932", "replace")


def matching_brace(text: str, open_at: int) -> int:
    """Index just after the brace matching text[open_at] == '{'."""
    depth = 0
    i = open_at
    n = len(text)
    while i < n:
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i + 1
        i += 1
    return n


def functions(text: str):
    for m in re.finditer(r"\bfunction\s+([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{", text):
        open_at = text.find("{", m.end() - 1)
        end = matching_brace(text, open_at)
        yield m.group(1), m.group(2), open_at, end, text[open_at + 1:end - 1]


def conditions(body: str):
    """Yield (condition, statement, behavior) for early-return ifs."""
    for m in re.finditer(r"\bif\s*\(", body):
        popen = body.find("(", m.start())
        depth, i = 0, popen
        while i < len(body):
            if body[i] == "(":
                depth += 1
            elif body[i] == ")":
                depth -= 1
                if depth == 0:
                    break
            i += 1
        cond = body[popen + 1:i].strip()
        j = i + 1
        while j < len(body) and body[j] in " \t\r\n":
            j += 1
        if j >= len(body):
            continue
        if body[j] == "{":
            close = matching_brace(body, j)
            stmt = body[j + 1:close - 1]
            after = close
        else:
            semi = body.find(";", j)
            if semi < 0:
                continue
            stmt = body[j:semi + 1]
            after = semi + 1
        if not re.search(r"\breturn\b", stmt):
            continue
        if "alert(" in stmt or "confirm(" in stmt:
            behavior = "alert"
        else:
            behavior = "silent"
        yield cond, stmt.strip(), behavior


def refs(text: str, cond: str) -> list[str]:
    ids = re.findall(r"getElementById\(\s*['\"]([^'\"]+)['\"]\s*\)", text)
    names = re.findall(r"\[\s*['\"]([^'\"]+)['\"]\s*\]", text)
    vars_ = re.findall(r"[A-Za-z_$][\w$]*", cond)
    out = []
    for x in ids:
        out.append(f"id:{x}")
    for x in names:
        out.append(f"name:{x}")
    for x in vars_:
        if x not in {"if", "return", "true", "false", "null", "undefined", "length", "value"}:
            out.append(f"var:{x}")
    seen, uniq = set(), []
    for x in out:
        if x not in seen:
            seen.add(x)
            uniq.append(x)
    return uniq[:12]


def page_key(html_path: Path) -> str:
    # reference/webapps/AMB/webapp/WEB-INF/views/AMA03.html -> AMB/AMA03
    parts = html_path.parts
    app = ""
    for p in parts:
        if p in ("AMB", "AMC00", "ANB00"):
            app = p
            break
    return f"{app}/{html_path.stem}" if app else html_path.stem


def event_handlers(text: str) -> set[str]:
    """Functions wired directly to an on* attribute or addEventListener."""
    out = set()
    for m in re.finditer(r"\bon[a-z]+\s*=\s*[\"']\s*([A-Za-z_$][\w$]*)\s*\(", text):
        out.add(m.group(1))
    for m in re.finditer(r"addEventListener\(\s*[\"'][^\"']+[\"']\s*,\s*([A-Za-z_$][\w$]*)", text):
        out.add(m.group(1))
    return out


def called_by(text: str, name: str) -> bool:
    """True when `name` is invoked from another function or handler."""
    return bool(re.search(rf"(?<!function\s)\b{re.escape(name)}\s*\(", text))


def classify(page_handlers: set[str], fn: str, text: str) -> str:
    # field/business validators are a different artifact, even when a handler
    # calls them. They describe parameter rules, not click preconditions.
    if re.search(r"(Validate|Check)$", fn) or re.match(r"^(check|is|reset)", fn):
        return "validation"
    if fn in page_handlers:
        return "precondition"
    # one level: a handler calls this function
    for h in page_handlers:
        body = None
        m = re.search(rf"\bfunction\s+{re.escape(h)}\s*\([^)]*\)\s*\{{", text)
        if m:
            open_at = text.find("{", m.end() - 1)
            body = text[open_at:matching_brace(text, open_at)]
        if body and re.search(rf"\b{re.escape(fn)}\s*\(", body):
            return "precondition"
    return "validation"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", default=str(OUT_JSON))
    ap.add_argument("--md", default=str(OUT_MD))
    args = ap.parse_args()

    guards = []
    files = sorted(WEBAPPS.rglob("*.html"))
    for f in files:
        text = decode(f.read_bytes())
        handlers = event_handlers(text)
        for name, params, start, end, body in functions(text):
            kind = classify(handlers, name, text)
            for cond, stmt, behavior in conditions(body):
                # ignore trivial input checks that are not UI preconditions
                if re.fullmatch(r"\s*(true|false)\s*", cond):
                    continue
                before = body[:max(0, body.find(cond) - 200)]
                guards.append({
                    "page": page_key(f),
                    "file": f.name,
                    "function": name,
                    "kind": kind,
                    "handler": name in handlers,
                    "params": params.strip(),
                    "condition": cond,
                    "statement": stmt,
                    "behavior": behavior,
                    "near": " ".join(before.split())[-160:],
                    "refs": refs(body, cond),
                })

    pre = [g for g in guards if g["kind"] == "precondition"]
    val = [g for g in guards if g["kind"] == "validation"]
    result = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": "reference/webapps/**/*.html (Shift_JIS)",
        "note": "Generated. Do not hand-edit. `precondition` guards become `requires:`; "
                "`validation` guards describe field rules (parameter schema).",
        "count": len(guards),
        "preconditionCount": len(pre),
        "validationCount": len(val),
        "pages": sorted({g["page"] for g in guards}),
        "guards": guards,
    }
    out = Path(args.json)
    out.write_text(json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")

    lines = [
        "# 前端守卫（点了没反应 / 字段规则）",
        "",
        f"生成：{result['generatedAt']}　来源：`{result['source']}`",
        "",
        f"共 **{len(guards)}** 条，分两类：",
        "",
        f"- **precondition {len(pre)}**：按钮/事件处理器里的早退。不满足时**没有报错**，必须写 `requires:`。",
        f"- **validation {len(val)}**：`formValidate`/`searchValidate` 等字段规则。用来生成参数 schema，不是前置条件。",
        "",
        "## Precondition（点了没反应）",
        "",
        "| 页面 | 函数 | 条件 | 行为 | 引用 |",
        "|---|---|---|---|---|",
    ]
    for g in pre:
        cond = " ".join(g["condition"].split()).replace("|", "\\|")
        refs_ = ", ".join(g["refs"][:5]).replace("|", "\\|")
        lines.append(f"| {g['page']} | `{g['function']}` | `{cond}` | {g['behavior']} | {refs_} |")
    lines += [
        "",
        "## Validation（字段规则）",
        "",
        "只列函数和条件，详细信息在 `guards.json`。",
        "",
        "| 页面 | 函数 | 条件 |",
        "|---|---|---|",
    ]
    for g in val:
        cond = " ".join(g["condition"].split()).replace("|", "\\|")
        lines.append(f"| {g['page']} | `{g['function']}` | `{cond[:140]}` |")
    lines += [
        "",
        "## 怎么用",
        "",
        "1. `compile` 时，若某 step 的 target 命中该页面的按钮，而 flow 没有声明对应 `requires:`，报警告。",
        "2. `requires` 的字段必须在之前被 fill/select 过，或来自 `env`。",
        "3. 真机上守卫触发 = 前置条件不满足，不是 selector 错。",
        "4. validation 条件用来反推字段 schema（必填/长度/格式/交叉校验），不直接进 `requires`。",
        "",
    ]
    md = Path(args.md)
    md.parent.mkdir(parents=True, exist_ok=True)
    md.write_text("\n".join(lines), encoding="utf-8")

    print(f"guards {len(guards)}  precondition {len(pre)}  validation {len(val)}  pages {len(result['pages'])}")
    print(f"json   {out}")
    print(f"md     {md}")
    for g in pre:
        print(f"  {g['page']:16s} {g['function']:28s} {g['condition'][:80]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
