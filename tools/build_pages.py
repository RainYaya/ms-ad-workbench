#!/usr/bin/env python3
"""Build the static GitHub Pages site from docs/rpa and docs/adr.

No external packages: the docs use a small Markdown subset (headings, fenced
code, tables, lists, blockquotes, inline code/bold/links).  Rendering them here
keeps the published site reproducible and reviewable in the repo.

    python tools/build_pages.py --out .pages-out
"""
from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sys
from datetime import datetime
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
RPA = ROOT / "docs" / "rpa"
ADR = ROOT / "docs" / "adr"
sys.stdout.reconfigure(encoding="utf-8")

# Reading order, not alphabetical: the numbers are the order.
RPA_ORDER = ["README", "GOAL", "00-DECISIONS", "01-PITFALLS", "02-DEV-RULES",
             "03-STATUS", "04-ARCHITECTURE", "05-EXECUTOR", "06-ROADMAP",
             "07-REQUIREMENTS", "08-FEASIBILITY", "09-AI-VERIFY",
             "10-DEBUG-BY-CODE", "11-KERNEL", "12-DIFF", "13-DESIGN", "14-REPORT",
             "15-CHAIN", "16-LANGUAGE", "17-USAGE", "18-EXTERNAL-AI", "19-REAL-MACHINE",
             "20-YAML-AS-LANGUAGE", "21-WRITE-A-FLOW"]
SHORT = {
    "README": "总览", "GOAL": "目标与红线", "00-DECISIONS": "已定决策",
    "01-PITFALLS": "踩过的坑", "02-DEV-RULES": "开发要求",
    "03-STATUS": "当前进度", "04-ARCHITECTURE": "架构",
    "05-EXECUTOR": "执行器", "06-ROADMAP": "施工顺序",
    "07-REQUIREMENTS": "需求与定义", "08-FEASIBILITY": "可行性",
    "09-AI-VERIFY": "AI 确认规程", "10-DEBUG-BY-CODE": "先查代码（R0）",
    "11-KERNEL": "内核（17 原语）", "12-DIFF": "旧 vs 新",
    "13-DESIGN": "设计总稿", "14-REPORT": "完成度报告",
    "15-CHAIN": "整条链（文件→点击）", "16-LANGUAGE": "语言规范（给外部 AI）",
    "17-USAGE": "使用说明（唯一入口）", "18-EXTERNAL-AI": "外部 AI 测试手顺",
    "19-REAL-MACHINE": "实机电脑一条龙",
    "20-YAML-AS-LANGUAGE": "把 YAML 当语言讲",
    "21-WRITE-A-FLOW": "白话版：自己写一本",
}


# ── Markdown ──────────────────────────────────────────────────────────
def slug(text: str) -> str:
    t = re.sub(r"<[^>]+>", "", text)
    t = re.sub(r"[`*_\[\]()]", "", t).strip()
    t = re.sub(r"\s+", "-", t)
    return t or "section"


def esc(s: str) -> str:
    return html.escape(s, quote=False)


def inline(s: str) -> str:
    codes: list[str] = []

    def keep(m):
        codes.append(m.group(1))
        return f"\x00{len(codes) - 1}\x00"

    s = re.sub(r"`([^`]+)`", keep, s)
    s = esc(s)
    # links: [text](target)
    s = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", lambda m: _link(m.group(1), m.group(2)), s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<!\*)\*([^*\n]+)\*(?!\*)", r"<em>\1</em>", s)
    s = re.sub(r"\x00(\d+)\x00", lambda m: f"<code>{esc(codes[int(m.group(1))])}</code>", s)
    return s


def _link(text: str, target: str) -> str:
    t = target
    if t.endswith(".md"):
        t = t[:-3] + ".html"
    elif t.endswith("/"):
        t = t + "index.html"
    return f'<a href="{html.escape(t)}">{text}</a>'


LIST_RE = re.compile(r"^(\s*)([-*]|\d+\.)\s+(.*)$")


def render(md: str) -> str:
    lines = md.replace("\r\n", "\n").split("\n")
    out: list[str] = []
    i = 0
    para: list[str] = []

    def flush():
        if not para:
            return
        text = ""
        for p in para:
            if text and re.search(r"[぀-鿿]$", text) and re.match(r"[぀-鿿]", p):
                text += p
            elif text:
                text += " " + p
            else:
                text = p
        out.append(f"<p>{inline(text)}</p>")
        para.clear()

    while i < len(lines):
        line = lines[i]
        s = line.rstrip()

        if s.startswith("```"):
            flush()
            lang = s[3:].strip()
            i += 1
            buf = []
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1
            cls = f' class="lang-{esc(lang)}"' if lang else ""
            out.append(f"<pre><code{cls}>{html.escape(chr(10).join(buf))}</code></pre>")
            continue

        if not s.strip():
            flush()
            i += 1
            continue

        m = re.match(r"^(#{1,6})\s+(.*)$", s)
        if m:
            flush()
            level = len(m.group(1))
            body = inline(m.group(2))
            out.append(f'<h{level} id="{slug(m.group(2))}">{body}</h{level}>')
            i += 1
            continue

        if re.match(r"^-{3,}$", s) or re.match(r"^\*{3,}$", s):
            flush()
            out.append("<hr>")
            i += 1
            continue

        # table: | a | b |  +  |---|---|
        if s.startswith("|") and i + 1 < len(lines) and re.match(r"^\|[\s:|-]+\|?$", lines[i + 1].strip()):
            flush()
            head = [c.strip() for c in s.strip().strip("|").split("|")]
            i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            out.append("<div class=\"table-wrap\"><table><thead><tr>"
                       + "".join(f"<th>{inline(c)}</th>" for c in head)
                       + "</tr></thead><tbody>"
                       + "".join("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in rows)
                       + "</tbody></table></div>")
            continue

        if s.startswith(">"):
            flush()
            buf = []
            while i < len(lines) and lines[i].startswith(">"):
                buf.append(lines[i].lstrip(">").strip())
                i += 1
            out.append(f"<blockquote>{inline(' '.join(buf))}</blockquote>")
            continue

        if LIST_RE.match(s):
            flush()
            ordered = bool(re.match(r"^\s*\d+\.\s", s))
            tag = "ol" if ordered else "ul"
            items = []
            while i < len(lines) and LIST_RE.match(lines[i]):
                mm = LIST_RE.match(lines[i])
                items.append(f"<li>{inline(mm.group(3))}</li>")
                i += 1
            out.append(f"<{tag}>" + "".join(items) + f"</{tag}>")
            continue

        para.append(s)
        i += 1

    flush()
    return "\n".join(out)


# ── site ──────────────────────────────────────────────────────────────
CSS = """
:root{--bg:#f7f7f5;--fg:#1d1d1b;--muted:#5f5f5a;--line:#dcdcd5;--card:#fff;
--accent:#0f6f63;--code:#f0efeb;--warn:#8a5300}
@media (prefers-color-scheme:dark){:root{--bg:#14171a;--fg:#e6e4df;--muted:#a3a19a;
--line:#2c3136;--card:#1b1f23;--accent:#5cc9b8;--code:#20252a;--warn:#e0a460}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);
font:16px/1.75 system-ui,-apple-system,"Hiragino Sans","Yu Gothic",
"Microsoft YaHei",sans-serif}
.layout{display:grid;grid-template-columns:250px minmax(0,1fr);min-height:100vh}
aside{position:sticky;top:0;align-self:start;height:100vh;overflow:auto;
padding:22px 16px;border-right:1px solid var(--line);background:var(--card)}
aside .brand{font-weight:700;font-size:15px;letter-spacing:.02em;margin-bottom:14px}
aside .brand a{color:var(--fg);text-decoration:none}
aside .grp{margin:16px 0 6px;font-size:11px;text-transform:uppercase;
letter-spacing:.08em;color:var(--muted)}
aside a.nav{display:block;padding:5px 8px;border-radius:6px;color:var(--muted);
text-decoration:none;font-size:13.5px}
aside a.nav:hover{background:var(--code);color:var(--fg)}
aside a.nav.on{background:var(--code);color:var(--accent);font-weight:600}
main{max-width:900px;width:100%;padding:38px 40px 90px}
h1{font-size:28px;line-height:1.3;margin:.2em 0 .8em;letter-spacing:.01em}
h2{font-size:20px;margin:2em 0 .6em;padding-bottom:.3em;border-bottom:1px solid var(--line)}
h3{font-size:17px;margin:1.6em 0 .5em}
p{margin:.7em 0}
a{color:var(--accent)}
code{background:var(--code);padding:.12em .4em;border-radius:4px;font-size:.9em;
font-family:"SFMono-Regular",Consolas,"Liberation Mono",monospace}
pre{background:var(--code);padding:14px 16px;border-radius:8px;overflow:auto;
border:1px solid var(--line)}
pre code{background:none;padding:0;font-size:13px;line-height:1.6}
blockquote{margin:1em 0;padding:.6em 1em;border-left:3px solid var(--accent);
background:var(--card);color:var(--muted)}
.table-wrap{overflow:auto;margin:1em 0;border:1px solid var(--line);border-radius:8px}
table{border-collapse:collapse;width:100%;font-size:14px}
th,td{padding:8px 12px;border-bottom:1px solid var(--line);text-align:left;
vertical-align:top}
th{background:var(--card);font-weight:600;white-space:nowrap}
tr:last-child td{border-bottom:0}
hr{border:0;border-top:1px solid var(--line);margin:2.4em 0}
ul,ol{padding-left:1.4em}
li{margin:.25em 0}
.hero{padding:14px 0 6px}
.hero .kicker{color:var(--accent);font-weight:700;font-size:13px;letter-spacing:.12em}
.hero h1{font-size:34px;margin:.3em 0 .2em}
.hero .sub{color:var(--muted);font-size:16px;max-width:720px}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;
margin:26px 0 10px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.stat b{display:block;font-size:24px;line-height:1.2}
.stat span{color:var(--muted);font-size:12.5px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin:22px 0}
.card{display:block;background:var(--card);border:1px solid var(--line);
border-radius:10px;padding:16px 18px;text-decoration:none;color:var(--fg)}
.card:hover{border-color:var(--accent)}
.card b{display:block;margin-bottom:4px}
.card span{color:var(--muted);font-size:13px}
.footer{margin-top:56px;color:var(--muted);font-size:12.5px}
@media (max-width:820px){
 .layout{grid-template-columns:1fr}
 aside{position:static;height:auto;border-right:0;border-bottom:1px solid var(--line)}
 main{padding:24px 18px 60px}
}
"""


def nav_html(current: str, groups: list[tuple[str, list[tuple[str, str, str]]]], depth: int) -> str:
    prefix = "../" * depth
    cur_group = current.split("/")[0] if depth else ""
    parts = [f'<div class="brand"><a href="{prefix}index.html">ms-ad RPA</a></div>']
    for name, items in groups:
        parts.append(f'<div class="grp">{html.escape(name)}</div>')
        for href, label, _kind in items:
            grp, rest = href.split("/", 1)
            target = href if depth == 0 else (rest if grp == cur_group else prefix + href)
            cls = "nav on" if href == current else "nav"
            parts.append(f'<a class="{cls}" href="{target}">{html.escape(label)}</a>')
    return "\n".join(parts)


def page(title: str, body: str, nav: str, depth: int) -> str:
    root = "../" * depth
    return f"""<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)} · ms-ad RPA</title>
<link rel="stylesheet" href="{root}style.css"></head>
<body><div class="layout"><aside>{nav}</aside><main>{body}
<div class="footer">由 <code>tools/build_pages.py</code> 从仓库文档生成 ·
{datetime.now().strftime('%Y-%m-%d %H:%M')}</div>
</main></div></body></html>"""


def title_of(md: str, fallback: str) -> str:
    m = re.search(r"^#\s+(.+)$", md, re.M)
    return m.group(1).strip() if m else fallback


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / ".pages-out"))
    args = ap.parse_args()
    out = Path(args.out)
    if out.exists():
        # The Studio snapshot is built separately and must survive a docs
        # rebuild; every other entry here is generated.
        for child in out.iterdir():
            if child.name == "studio":
                continue
            shutil.rmtree(child) if child.is_dir() else child.unlink()
    (out / "rpa").mkdir(parents=True, exist_ok=True)
    (out / "adr").mkdir(parents=True, exist_ok=True)
    (out / "style.css").write_text(CSS, encoding="utf-8")

    rpa_files = [RPA / f"{n}.md" for n in RPA_ORDER if (RPA / f"{n}.md").exists()]
    rpa_files += sorted(p for p in RPA.glob("*.md") if p.stem not in RPA_ORDER)
    adr_files = sorted(ADR.glob("*.md"))

    rpa_nav = [("rpa/" + p.stem + ".html", SHORT.get(p.stem, p.stem), "rpa")
               for p in rpa_files]
    def adr_label(p):
        t = title_of(p.read_text(encoding="utf-8"), p.stem)
        if "—" in t:
            short = t.split("—", 1)[1].split("：")[0].strip()
            return f"{p.stem[:4]} {short}"
        return p.stem

    adr_nav = [("adr/" + p.stem + ".html", adr_label(p), "adr") for p in adr_files]
    groups = [("RPA 文档", rpa_nav), ("ADR", adr_nav),
              ("工具", [("studio/index.html", "Studio（只读快照）", "studio")])]

    for p in rpa_files:
        md = p.read_text(encoding="utf-8")
        title = title_of(md, p.stem)
        body = f"<article>{render(md)}</article>"
        nav = nav_html(f"rpa/{p.stem}.html", groups, 1)
        (out / "rpa" / f"{p.stem}.html").write_text(page(title, body, nav, 1), encoding="utf-8")

    for p in adr_files:
        md = p.read_text(encoding="utf-8")
        title = title_of(md, p.stem)
        body = f"<article>{render(md)}</article>"
        nav = nav_html(f"adr/{p.stem}.html", groups, 1)
        (out / "adr" / f"{p.stem}.html").write_text(page(title, body, nav, 1), encoding="utf-8")

    # landing page
    gen = {}
    try:
        gen = json.loads((ROOT / "flows" / "books-status.json").read_text(encoding="utf-8"))
    except Exception:
        pass
    bind = {}
    try:
        bind = yaml.safe_load((ROOT / "flows" / "bindings.yaml").read_text(encoding="utf-8")) or {}
    except Exception:
        pass
    rules = bind.get("rules") or []
    auto = sum(1 for r in rules if r.get("status") in ("auto", "confirmed"))
    need = sum(1 for r in rules if r.get("status") == "needs-human")
    blocked = sum(1 for r in rules if r.get("status") == "blocked")
    corpus = gen.get("books", 0)
    written = gen.get("written", 0)

    hero = f"""
<div class="hero">
  <div class="kicker">ms-ad · feat/rpa-flow</div>
  <h1>把結合試験的手顺书变成可执行、可检查、可查证的自动化</h1>
  <p class="sub">四层真值：手顺行决定做什么，控件库决定对哪个控件，
  绑定表是人工确认过的事实，别紙是唯一的值来源。宁可报错，绝不猜。</p>
</div>
<div class="stats">
  <div class="stat"><b>{corpus:,}</b><span>手顺里的本</span></div>
  <div class="stat"><b>{written}</b><span>可直接生成（L0 全过）</span></div>
  <div class="stat"><b>{len(rules)}</b><span>绑定规则</span></div>
  <div class="stat"><b>{auto}</b><span>已确定（auto/confirmed）</span></div>
  <div class="stat"><b>{need}</b><span>待人工确认</span></div>
  <div class="stat"><b>{blocked}</b><span>无画面/阻塞</span></div>
</div>
<div class="cards">
  <a class="card" href="studio/index.html"><b>RPA Studio（只读快照）</b>
    <span>真画面预览、逐步定位、绑定队列；点控件查 selector</span></a>
  <a class="card" href="rpa/13-DESIGN.html"><b>设计总览</b>
    <span>四层真值、两种身份、绑定层、Studio、L0/L1/L2</span></a>
  <a class="card" href="rpa/14-REPORT.html"><b>完成度报告</b>
    <span>覆盖率、L0/L1/L2 实测、每类阻塞原因</span></a>
  <a class="card" href="rpa/15-CHAIN.html"><b>整条链</b>
    <span>文件谁连谁、一次点击怎么定位、跑错改哪里</span></a>
  <a class="card" href="rpa/16-LANGUAGE.html"><b>语言规范</b>
    <span>自包含：手顺 + 真实页面 → 一个能跑的流（可整篇交给外部 AI）</span></a>
  <a class="card" href="rpa/17-USAGE.html"><b>使用说明</b>
    <span>怎么启动、每种活怎么做、出错先看哪</span></a>
  <a class="card" href="rpa/18-EXTERNAL-AI.html"><b>外部 AI 测试手顺</b>
    <span>四样材料贴进聊天窗口 → 产出 flow → 回仓库验收</span></a>
  <a class="card" href="rpa/19-REAL-MACHINE.html"><b>实机电脑一条龙</b>
    <span>抓页面 → 打材料包 → Copilot → 校验 → 跑，全程不离开那台电脑</span></a>
  <a class="card" href="rpa/20-YAML-AS-LANGUAGE.html"><b>把 YAML 当语言讲</b>
    <span>类型、求值、寻址、编译期/运行期边界、定制化配方</span></a>
  <a class="card" href="rpa/11-KERNEL.html"><b>17 原语内核</b>
    <span>动作、证据、断言、值来源、失败协议</span></a>
  <a class="card" href="adr/0001-four-layer-truth-model.html"><b>ADR 0001–0007</b>
    <span>为什么是这四层、为什么删掉模糊匹配</span></a>
</div>
<h2>先说结论</h2>
<ul>
  <li>操作行的画面由 <code>functionName</code> 向下继承，不从 <code>遷移</code> 反推（ADR-0006）。</li>
  <li>别紙是唯一值来源：缺值就阻塞，不设默认、不沿用上一块（ADR-0007）。</li>
  <li>绑定没有模糊匹配：模板命中必须恰好一个，否则报错并进人工队列（ADR-0003）。</li>
  <li>mock 全绿不算通过；L2 真机 0 本就是 0（ADR-0005）。</li>
</ul>
"""
    nav = nav_html("index.html", groups, 0)
    (out / "index.html").write_text(page("概览", hero, nav, 0), encoding="utf-8")

    adr_index = ["<article><h1>ADR</h1><p>影响面大、难以回退、并且有真实取舍的决定。</p><ul>"]
    for p in adr_files:
        t = title_of(p.read_text(encoding="utf-8"), p.stem)
        adr_index.append(f'<li><a href="{p.stem}.html">{html.escape(t)}</a></li>')
    adr_index.append("</ul></article>")
    (out / "adr" / "index.html").write_text(
        page("ADR", "".join(adr_index), nav_html("adr/index.html", groups, 1), 1), encoding="utf-8")
    (out / ".nojekyll").write_text("", encoding="utf-8")

    n = len(list(out.rglob("*.html")))
    print(f"wrote {n} pages to {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
