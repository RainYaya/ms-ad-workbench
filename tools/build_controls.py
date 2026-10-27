#!/usr/bin/env python3
"""Build the control repository (ui-controls.json) from the real webapp HTML.

Unlike ui-dictionary.json (built around field_title/field_value pairs only),
this collects EVERY interactive element: text inputs, selects, textareas,
checkboxes, radios, submit/button inputs, <button>, and <a> links.  It also
marks row-scoped controls (Thymeleaf `${stat.index}` templates) instead of
pretending they are concrete elements.

Rules:
  - The real HTML is the authority.  A control without a literal id/name is
    emitted with `rowScope`/`namePattern`, never guessed.
  - A label is attached only when it can be read structurally: the enclosing
    field_title, the <label> that immediately follows the control, or the
    literal value/title attribute.  Otherwise `label` is null.
  - mockMissing is set when mock-src does not contain the same id.  It is a
    report, not an error: the mock may simply be behind the real frontend.

Encoding: source pages are Shift_JIS / CP932.

Usage:
    python tools/build_controls.py
    python tools/build_controls.py --src <dir> --out ui-controls.json
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ui-controls.json"
MOCK = ROOT / "automation" / "node-runner" / "mock-src"
ENCODINGS = ("cp932", "shift_jis", "utf-8-sig", "utf-8", "euc_jp")

sys.stdout.reconfigure(encoding="utf-8")

# Thymeleaf / JSP template markers.  A control whose id/name still contains one
# of these is row-scoped (or otherwise runtime-built) and must not be emitted as
# a concrete selector.
TEMPLATE = re.compile(r"(\$\{|\{\{|\[\(|&amp;nbsp|\|)")

TAG = re.compile(r"<(input|select|textarea|button|a)\b([^>]*)>", re.I | re.S)
ATTR = re.compile(r"([\w:-]+)\s*=\s*\"([^\"]*)\"", re.S)
FIELD_PAIR = re.compile(
    r'<div class="[^"]*field_title[^"]*"[^>]*>\s*([^<]{1,80}?)\s*</div>\s*'
    r'<div class="[^"]*field_(?:value|input)[^"]*"[^>]*>(.*?)</div>',
    re.S,
)
FOLLOW_LABEL = re.compile(r"^\s*(?:<!--.*?-->\s*)*<label[^>]*>(.*?)</label>", re.S | re.I)
TITLE = re.compile(r"<title>(.*?)</title>", re.S | re.I)


def decode(path: Path) -> str:
    raw = path.read_bytes()
    for enc in ENCODINGS:
        try:
            text = raw.decode(enc)
        except UnicodeDecodeError:
            continue
        if re.search(r"[぀-ヿ]", text) or "input" in text.lower():
            return text
    return raw.decode("cp932", "replace")


def clean(s: str) -> str:
    # Thymeleaf literal: [(${'&nbsp;氏名'})] is a real label, while
    # [(${row.upload_file_name})] is runtime data and must not become one.
    s = s.strip()
    m = re.fullmatch(r"\[\(\$\{(.*)\}\)\]", s, re.S)
    if m:
        inner = m.group(1).strip()
        q = re.fullmatch(r"'([^']*)'", inner) or re.fullmatch(r"\"([^\"]*)\"", inner)
        s = q.group(1) if q else ""
    s = re.sub(r"\[\(\$\{.*?\}\)\]", "", s)
    s = re.sub(r"\$\{.*?\}", "", s)
    s = s.replace("&amp;nbsp;", " ").replace("&nbsp;", " ").replace("&amp;", "&")
    s = s.replace(" ", " ").replace("<!-- -->", "")
    return s.strip()


def norm(s: str) -> str:
    """Must stay identical to tools/build_bindings.py + flow-loader.mjs."""
    s = clean(s)
    s = s.replace("&nbsp;", "").replace("&amp;", "&")
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"\s+", "", s)
    s = s.replace("コード", "ｺｰﾄﾞ").replace("ID", "ＩＤ").replace("id", "ＩＤ")
    s = re.sub(r"[*※※]+$", "", s)
    s = s.replace("－", "-").replace("ー", "-").replace("ｰ", "-")
    return s


def is_template(v: str | None) -> bool:
    return bool(v) and bool(TEMPLATE.search(v))


def strip_pipes(v: str) -> str:
    """Thymeleaf uses |...| to allow literal interpolation."""
    v = v.strip()
    if v.startswith("|") and v.endswith("|"):
        v = v[1:-1]
    return v


def name_pattern(v: str) -> str | None:
    """Turn `list[${stat.index}].flag` into a regex-ish pattern."""
    if not is_template(v):
        return None
    p = strip_pipes(v)
    p = re.sub(r"\[\(\$\{[^}]*\}\)\]", "\\*", p)
    p = re.sub(r"\$\{[^}]*\}", "\\*", p)
    return p


def selector_for(cid: str | None, name: str | None) -> tuple[str | None, str | None]:
    if cid and not is_template(cid):
        return "#" + cid, None
    if name and not is_template(name):
        return '[name="' + name + '"]', None
    return None, name_pattern(cid or name or "")


def kind_of(tag: str, attrs: dict[str, str]) -> str:
    tag = tag.lower()
    if tag in ("input", "button"):
        t = (attrs.get("type") or ("submit" if tag == "button" else "text")).lower()
        return "button" if t == "button" and tag == "button" else t
    if tag == "a":
        return "link"
    return tag  # select / textarea


def parse_page(path: Path, text: str, mock_ids: set[str]) -> dict:
    # 1) Label regions from field_title/field_value pairs.
    regions: list[tuple[int, int, str]] = []
    for m in FIELD_PAIR.finditer(text):
        label = clean(m.group(1))
        if label:
            regions.append((m.start(), m.end(), label))

    controls: list[dict] = []
    seen: set[str] = set()
    for m in TAG.finditer(text):
        tag = m.group(1)
        raw_attrs = m.group(2)
        attrs: dict[str, str] = {}
        for am in ATTR.finditer(raw_attrs):
            attrs.setdefault(am.group(1).lower(), am.group(2))
        # Thymeleaf alternatives: th:id / th:name / th:value
        aid = attrs.get("id") or attrs.get("th:id")
        aname = attrs.get("name") or attrs.get("th:name")
        if tag.lower() == "a":
            # A link is only a control when it carries a name/onclick; plain
            # navigation anchors (menus) are handled by goto/menu steps.
            if not (aname or attrs.get("th:onclick") or attrs.get("onclick")):
                continue
        if not (aid or aname):
            continue
        sel, pat = selector_for(aid, aname)

        # Label: enclosing field title -> following <label> -> literal value/title.
        label = None
        pos = m.start()
        for rs, re_, rl in regions:
            if rs <= pos <= re_:
                label = rl
                break
        if label is None:
            nxt = FOLLOW_LABEL.match(text[m.end():m.end() + 240])
            if nxt:
                label = clean(nxt.group(1))
        if not label:
            v = attrs.get("value") or attrs.get("th:value")
            if v and not is_template(v) and kind_of(tag, attrs) in ("submit", "button", "reset"):
                label = clean(v)
        if not label:
            t = attrs.get("title") or attrs.get("th:title")
            if t and not is_template(t):
                label = clean(t)

        kind = kind_of(tag, attrs)
        style = (attrs.get("style") or "").replace(" ", "").lower()
        statically_hidden = "display:none" in style or "hidden" in attrs
        ident = aid or aname or ""
        key = f"{kind}:{ident}"
        if key in seen:
            continue
        seen.add(key)
        controls.append({
            "key": key,
            "label": label,
            "labelKey": norm(label) if label else None,
            "kind": kind,
            "type": (attrs.get("type") or "").lower() or None,
            "id": None if (not aid or is_template(aid)) else aid,
            "name": None if (not aname or is_template(aname)) else aname,
            "selector": sel,
            "rowScope": pat is not None,
            "namePattern": pat,
            "hidden": statically_hidden,
            "mockMissing": bool(aid) and not is_template(aid) and aid not in mock_ids,
            "status": "mined",
        })

    # Browser dialogs are controls too: the hand procedure says 「OK」押下 when
    # a window.confirm() is waiting.  Model them as pseudo-controls so the
    # binding table can point at them instead of inventing a DOM selector.
    has_confirm = bool(re.search(r"(?:window\.)?confirm\s*\(", text))
    has_alert = bool(re.search(r"(?:window\.)?alert\s*\(", text))
    # Both would carry the label 「OK」 and make every such row ambiguous.
    # confirm() is what the hand procedure means by 「OK」押下; alert() is
    # only offered when the page has no confirm().
    dialog_kinds = [("dialog:confirm", "@dialog:confirm")] if has_confirm else []
    if has_alert and not has_confirm:
        dialog_kinds.append(("dialog:alert", "@dialog:alert"))
    for key, selector in dialog_kinds:
        label = "OK"
        if not any(c["key"] == key for c in controls):
            controls.append({
                "key": key, "label": label, "labelKey": norm(label),
                "kind": "dialog", "type": None, "id": None, "name": None,
                "selector": selector, "rowScope": False, "namePattern": None,
                "hidden": False, "mockMissing": False, "status": "mined",
            })

    title = TITLE.search(text)
    t = clean(title.group(1)) if title else ""
    # Thymeleaf leaves things like "[[]]" when the title is an expression.
    if not re.search(r"[\w぀-ヿ一-鿿]", t):
        t = ""
    return {
        "title": t,
        "controls": controls,
    }


def mock_ids_for(app: str, code: str) -> set[str]:
    p = MOCK / app / f"{code}.html"
    if not p.exists():
        return set()
    try:
        t = p.read_text(encoding="utf-8", errors="replace")
    except Exception:
        return set()
    return set(re.findall(r"\bid=[\"']([^\"']+)", t))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=str(ROOT / "reference" / "webapps"))
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()

    src = Path(args.src)
    if not src.exists():
        print(f"source not found: {src}", file=sys.stderr)
        return 2

    pages: dict[str, dict] = {}
    for p in sorted(src.rglob("*.html")):
        parts = p.relative_to(src).parts
        if "webapp" not in parts:
            # archives/ or stray files
            continue
        app = parts[parts.index("webapp") - 1]
        code = p.stem
        key = f"{app}/{code}"
        text = decode(p)
        page = parse_page(p, text, mock_ids_for(app, code))
        if not page["controls"]:
            continue
        pages[key] = {"app": app, "code": code, **page}

    data = {"generatedAt": "", "source": str(src), "screens": pages}
    out = Path(args.out)
    body = {k: v for k, v in data.items() if k != "generatedAt"}
    if out.exists():
        try:
            old = json.loads(out.read_text(encoding="utf-8"))
            if {k: v for k, v in old.items() if k != "generatedAt"} == body:
                data["generatedAt"] = old.get("generatedAt", "")
                print(f"unchanged: {out}")
                out = None
        except Exception:
            pass
    if out:
        data["generatedAt"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        out.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"wrote {out}")

    total = sum(len(p["controls"]) for p in pages.values())
    kinds: dict[str, int] = {}
    for p in pages.values():
        for c in p["controls"]:
            kinds[c["kind"]] = kinds.get(c["kind"], 0) + 1
    no_label = sum(1 for p in pages.values() for c in p["controls"] if not c["label"])
    row = sum(1 for p in pages.values() for c in p["controls"] if c["rowScope"])
    missing = sum(1 for p in pages.values() for c in p["controls"] if c["mockMissing"])
    print(f"  screens {len(pages)}  controls {total}  rowScope {row}  noLabel {no_label}  mockMissing {missing}")
    print("  kinds:", ", ".join(f"{k}={v}" for k, v in sorted(kinds.items(), key=lambda x: -x[1])))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
