#!/usr/bin/env python3
"""Build a UI dictionary (label -> element id) from webapp HTML.

Works on BOTH the shipped templates (reference/webapps) and pages captured
from the real SUT. That is the point: on the real machine you save the page
as HTML, point this at it, and the dictionary gets corrected from reality
instead of being guessed.

Encoding: the source webapps are Shift_JIS / CP932, not UTF-8.

Usage:
    python tools/build_ui_dictionary.py                       # reference/webapps
    python tools/build_ui_dictionary.py --src <dir-or-file>    # captured HTML
    python tools/build_ui_dictionary.py --merge               # merge into existing
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "ui-dictionary.json"
ENCODINGS = ("cp932", "shift_jis", "utf-8-sig", "utf-8", "euc_jp")


def decode(path: Path) -> str:
    raw = path.read_bytes()
    for enc in ENCODINGS:
        try:
            text = raw.decode(enc)
        except UnicodeDecodeError:
            continue
        # Reject mojibake: a correctly decoded Japanese page contains kana.
        if re.search(r"[\u3040-\u30ff]", text) or "input" in text.lower():
            return text
    return raw.decode("cp932", "replace")


# Template placeholders that must never become a dictionary key.
PLACEHOLDER = re.compile(r"(\$\{|\{\{|\[\(|&amp;nbsp)")

# Labels that are UI noise rather than data fields.
NOISE = re.compile(r"^[0-9０-９\s.\-*※]+$|^[○●・\-—]+$")

# Human-maintained synonym table: appendix wording -> frontend wording.
# The frontend is the source of truth for element ids; the appendix uses
# looser business wording. Keep this list short and explicit.
ALIAS_FILE = ROOT / "ui-aliases.json"


def load_aliases() -> dict[str, str]:
    if not ALIAS_FILE.exists():
        return {}
    return json.loads(ALIAS_FILE.read_text(encoding="utf-8")).get("aliases", {})


def clean_label(raw: str) -> str:
    s = raw.strip()
    s = re.sub(r"\[\(\$\{.*?\}\)\]", "", s)
    s = re.sub(r"\$\{.*?\}", "", s)
    s = s.replace("&nbsp;", "").replace("&amp;nbsp", "").replace("&amp;", "&")
    s = s.replace("\u00a0", " ").strip()
    return s


def norm_label(s: str) -> str:
    """Normalize for matching: half/full width, spacing, common synonyms."""
    s = s.strip()
    s = s.replace("ｺｰﾄﾞ", "コード").replace("ｺ-ﾄﾞ", "コード")
    s = s.replace("ＩＤ", "ID").replace("ｉ", "i")
    s = re.sub(r"\s+", "", s)
    s = re.sub(r"[*※\u203b]+$", "", s)
    return s


# The title div may carry a title="..." tooltip attribute before ">".
# Naive regexes capture that attribute text as the label - must tolerate it.
FIELD_PAIR = re.compile(
    r'<div class="[^"]*field_title[^"]*"[^>]*>\s*([^<]{1,60}?)\s*</div>\s*'
    r'<div class="[^"]*field_value[^"]*"[^>]*>(.*?)</div>',
    re.S,
)
ELEMENT = re.compile(r"<(input|select|textarea)\b[^>]*?(?:id|name)=\"([^\"]+)\"", re.I)
ATTR_TYPE = re.compile(r"type=" + chr(34) + r"([^" + chr(34) + r"]+)" + chr(34), re.I)
TAG_ATTR_ID = re.compile(r"(?:id|name)=\"([^\"]+)\"", re.I)
BUTTON = re.compile(
    r"<(?:input|button)\b[^>]*?type=\"(?:submit|button)\"[^>]*>", re.I
)
TITLE = re.compile(r"<title>(.*?)</title>", re.S)
SCREEN_CODE = re.compile(r"\b(A[ZM][A-Z]?\d{3}|index|dummy|system_error[a-z_]*|insurance_item_select)\b", re.I)


def parse_page(path: Path, text: str) -> dict:
    fields: list[dict] = []
    for raw_label, inner in FIELD_PAIR.findall(text):
        label = clean_label(raw_label)
        if not label or PLACEHOLDER.search(label) or NOISE.match(label):
            continue
        # A label can own SEVERAL controls: a hidden input that carries the
        # submitted value, plus the select/text the user actually operates.
        # e.g. 種目 -> <input type=hidden id=selected_large_item_code> +
        #              <select name=large_item_list.selected>
        # Picking the first control silently bound the field to the hidden one,
        # so the popup guard saw selectedIndex<=0 and did nothing.
        all_ctl = list(ELEMENT.finditer(inner))
        m = None
        for cand in all_ctl:
            full_i = cand.group(0)          # whole matched tag prefix
            typ_i = ATTR_TYPE.search(full_i)
            is_hidden = bool(typ_i) and typ_i.group(1).lower() == "hidden"
            if not is_hidden:
                m = cand
                break
        if m is None and all_ctl:
            m = all_ctl[0]

        entry = {"label": label, "key": norm_label(label), "id": None,
                 "kind": m.group(1).lower() if m else "text-only",
                 "selector": None}
        if m:
            value = m.group(2)             # the id or name value
            matched = m.group(0)           # whole tag prefix
            if ("id=" + chr(34) + value + chr(34)) in matched:
                entry["id"] = value
                entry["selector"] = "#" + value
            else:
                entry["name"] = value
                entry["selector"] = '[name="' + value + '"]'
            # Use THIS control's own type. Scanning inner[:400] read the sibling
            # hidden input's type and marked the select as hidden too.
            type_m = ATTR_TYPE.search(m.group(0) or "")
            ctl_type = type_m.group(1).lower() if type_m else None
            if ctl_type == "hidden":
                entry["kind"] = "hidden"
            entry["type"] = ctl_type
        if entry not in fields:
            fields.append(entry)

    buttons: list[dict] = []
    for tag in BUTTON.findall(text):
        idm = TAG_ATTR_ID.search(tag)
        vm = re.search(r'value="([^"]*)"', tag)
        label = clean_label(vm.group(1)) if vm else ""
        if not idm:
            continue
        value = idm.group(1)
        # Buttons are often addressable only by name (selectInsuransuItem has no
        # id). Emitting "#name" produced selectors that never match on the page.
        if ('id="' + value + '"') in tag:
            entry = {"label": label, "key": norm_label(label), "id": value,
                     "selector": "#" + value}
        else:
            entry = {"label": label, "key": norm_label(label), "id": None,
                     "name": value, "selector": '[name="' + value + '"]'}
        if entry not in buttons:
            buttons.append(entry)

    tm = TITLE.search(text)
    return {
        "file": path.name,
        "title": clean_label(tm.group(1)) if tm else "",
        "fields": fields,
        "buttons": buttons,
    }


def screen_key(path: Path, base: Path) -> str:
    stem = path.stem
    try:
        rel = path.relative_to(base)
        # reference/webapps/AMB/webapp/WEB-INF/views/AMA04.html -> AMB/AMA04
        parts = rel.parts
        if "webapp" in parts:
            app = parts[parts.index("webapp") - 1]
            return f"{app}/{stem}"
    except ValueError:
        pass
    return stem


def collect(src: Path) -> dict:
    if src.is_file():
        files = [src]
        base = src.parent
    else:
        files = sorted(src.rglob("*.html")) + sorted(src.rglob("*.htm"))
        base = src
    out: dict[str, dict] = {}
    for f in files:
        text = decode(f)
        page = parse_page(f, text)
        if not page["fields"] and not page["buttons"]:
            continue
        code = Path(page["file"]).stem
        out[screen_key(f, base)] = {**page, "code": code}
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=str(ROOT / "reference" / "webapps"))
    ap.add_argument("--merge", action="store_true", help="merge into existing ui-dictionary.json")
    ap.add_argument("--out", default=str(OUT))
    args = ap.parse_args()

    src = Path(args.src)
    if not src.exists():
        print(f"source not found: {src}", file=sys.stderr)
        return 2

    fresh = collect(src)
    target = Path(args.out)
    data = {"generatedAt": "", "source": str(src), "screens": {}}
    if args.merge and target.exists():
        data = json.loads(target.read_text(encoding="utf-8"))
        data.setdefault("screens", {})

    for key, page in fresh.items():
        if args.merge and key in data["screens"]:
            cur = data["screens"][key]
            have = {(x["key"], x["id"]) for x in cur.get("fields", [])}
            for x in page["fields"]:
                if (x["key"], x["id"]) not in have:
                    cur.setdefault("fields", []).append(x)
            have_b = {(x["key"], x["id"]) for x in cur.get("buttons", [])}
            for x in page["buttons"]:
                if (x["key"], x["id"]) not in have_b:
                    cur.setdefault("buttons", []).append(x)
        else:
            data["screens"][key] = page

    from datetime import datetime
    # Keep the previous timestamp when nothing but the clock changed, so a
    # no-op regeneration does not dirty the working tree.
    body = {k: v for k, v in data.items() if k != "generatedAt"}
    old_body = None
    if target.exists():
        try:
            old_body = {k: v for k, v in json.loads(target.read_text(encoding="utf-8")).items()
                        if k != "generatedAt"}
        except Exception:
            old_body = None
    if old_body is not None and old_body == body:
        data["generatedAt"] = json.loads(target.read_text(encoding="utf-8")).get("generatedAt", "")
        print(f"unchanged: {target}")
    else:
        data["generatedAt"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        target.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
        print(f"wrote {target}")

    nf = sum(len(p["fields"]) for p in data["screens"].values())
    nb = sum(len(p["buttons"]) for p in data["screens"].values())
    print(f"  screens {len(data['screens'])}  fields {nf}  buttons {nb}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
