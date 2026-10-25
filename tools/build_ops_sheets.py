#!/usr/bin/env python3
"""Generate one-page operator sheets for the company PC.

No block IDs, selectors, or runner internals on the sheet: only
verdict / next action / manual checks / input values / screen evidence / sign-off.
"""
from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "v2" / "ops"
OUT.mkdir(parents=True, exist_ok=True)


def load_js(name: str):
    s = (ROOT / "v2" / "data" / name).read_text(encoding="utf-8")
    return json.loads(s[s.index("=") + 1:].strip().rstrip(";"))


INDEX = load_js("index.js")
FEAS = load_js("feasibility.js")
EVID = load_js("evidence.js")
AUDIT = load_js("param-audit.js")
AUTO = load_js("automation.js")
BQ = load_js("block-quality.js")
PM = load_js("params.js")
CE = json.loads((ROOT / "automation" / "blocks" / "case-evidence.json").read_text(encoding="utf-8"))
CASES = INDEX["caseIndex"]

CLASS = {
    "A": ("A 全自動", "この本は自動で最後まで実行できます。", "green"),
    "B": ("B 自動 + 実機確認", "自動で実行し、mockで確認できない項目だけ実機で確認します。", "blue"),
    "C": ("C 実行前に確認", "このまま実行せず、先に入力値を確認してください。", "amber"),
    "D": ("D 業務確認待ち", "別紙とシステムのルールが矛盾しています。人に確認してください。", "red"),
}
KEY_LABEL = {
    "policyNo": "証券番号", "detailNo": "明細番号", "largeItemValue": "種目",
    "insuranceLabel": "保険種類", "inputType": "入力区分", "sectionCode": "課支社コード",
    "agentCode": "代理店コード", "fieldAgentId": "募集人ID", "freeCode": "フリーコード",
    "subAgentCode": "サブコード", "customerName": "契約者名", "startDate": "保険始期日",
    "defectContent": "不備内容", "inquiryCode": "照会コード", "inquiryContent": "照会内容",
    "confirmer": "確認者", "counterparty": "確認相手", "itemCode": "項目コード",
}
STATUS = {
    "match": ("一致", "ok"), "rule": ("規則/自動", "gray"),
    "multiValue": ("複数値", "warn"), "missingParam": ("未設定", "warn"),
    "mismatch": ("不一致", "bad"),
    "exact": ("取得済", "ok"), "manual": ("人工", "warn"), "missing": ("未取得", "bad"),
    "blockEnd": ("画面遷移時", "gray"),
}


def e(v):
    return html.escape(str(v or ""))


def short(v, n=220):
    s = str(v or "").replace("\r", "")
    return s if len(s) <= n else s[:n] + "…"


def hc_rows(cid):
    rows = {}
    for b in (CE.get(cid) or {}).get("blocks", []):
        for a in b.get("asserts", []):
            if a.get("hc"):
                rows[int(a["row"])] = {"row": a["row"], "type": a.get("type", ""), "item": a.get("item", ""), "content": a.get("content", "")}
        if b.get("toHc") and b.get("toRow"):
            rows[int(b["toRow"])] = {"row": b["toRow"], "type": "遷移", "item": "", "content": ""}
    return [rows[k] for k in sorted(rows)]


def _block_items(cid, kind):
    a = AUTO.get("cases", {}).get(cid) or {}
    out = []
    for bd in a.get("blockDetails") or []:
        b = BQ.get(bd.get("block")) or {}
        for st in b.get("detail") or []:
            if st.get("kind") != kind:
                continue
            note = st.get("note", "")
            out.append({
                "kind": "手順" if kind == "manual" else "mock代替",
                "fromRow": bd.get("fromRow"),
                "toRow": bd.get("toRow"),
                "optional": bool(st.get("optional")),
                "where": f"手順 {bd.get('fromRow', '?')}–{bd.get('toRow', '?')}",
                "title": st.get("event", ""),
                "body": short(note, 400),
                "reason": "真機で確認" if note else "",
            })
    return out


def manual_items(cid):
    ev = EVID.get(cid) or {}
    out = []
    seen = set()
    for m in ev.get("manualSteps") or []:
        key = ("ev", m.get("row"), m.get("item"))
        if key in seen:
            continue
        seen.add(key)
        out.append({
            "kind": "手順",
            "where": f"手順 {m.get('row')} / {m.get('phase', '')}",
            "title": m.get("item", ""),
            "body": short(m.get("content", ""), 400),
            "reason": m.get("reason", ""),
        })
    # Procedure rows are the only source of truth for "hand work".
    # Block-level manual / proxy steps are implementation notes, not operator tasks.
    return out


def mock_items(cid):
    return _block_items(cid, "mock") + _block_items(cid, "proxy")


def param_rows(cid):
    a = AUDIT.get(cid) or {}
    items = a.get("items") or []
    out = []
    if items:
        for x in items:
            st = STATUS.get(x.get("status"), (x.get("status"), "gray"))
            out.append({
                "label": x.get("label") or KEY_LABEL.get(x.get("key"), x.get("key")),
                "expected": x.get("expected", ""),
                "actual": x.get("actualLabel", x.get("actual", "")),
                "status": st[0],
                "cls": st[1],
            })
        return out
    pv = (PM.get(cid) or {}).get("values") or {}
    for k in a.get("usedKeys") or []:
        out.append({
            "label": KEY_LABEL.get(k, k),
            "expected": "—",
            "actual": pv.get(k, ""),
            "status": "auto（未確認）" if a.get("source") == "auto.json" else "参照のみ",
            "cls": "warn" if a.get("source") == "auto.json" else "gray",
        })
    return out


def evidence_rows(cid):
    ev = EVID.get(cid) or {}
    got = ev.get("rows") or {}
    out = []
    for r in hc_rows(cid):
        g = got.get(str(r["row"])) or {}
        st = STATUS.get(g.get("status") or "missing", ("未取得", "bad"))
        out.append({
            "row": r["row"],
            "item": r["item"] or g.get("item") or "",
            "content": short(r["content"], 160),
            "status": st[0],
            "cls": st[1],
            "file": g.get("file"),
        })
    return out


CSS = """
:root{--ink:#17211d;--muted:#64736c;--line:#d5ddd8;--bg:#f6f8f7;--panel:#fff;--green:#0f766e;--blue:#1d4ed8;--amber:#b45309;--red:#b91c1c}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:13px/1.55 "Yu Gothic","Meiryo","Noto Sans JP",system-ui,sans-serif}
.sheet{max-width:920px;margin:0 auto;background:var(--panel);padding:26px 30px 34px}
.top{border-bottom:2px solid var(--ink);padding-bottom:10px;margin-bottom:14px}
.cid{font:600 12px ui-monospace,Consolas,monospace;color:var(--muted);letter-spacing:.04em}
h1{font-size:22px;line-height:1.25;margin:3px 0 6px}
.meta{display:flex;gap:8px;flex-wrap:wrap;font-size:11px;color:var(--muted)}
.verdict{border-left:8px solid var(--line);padding:12px 14px;margin:14px 0;background:#fafbfa}
.verdict .big{font-size:20px;font-weight:800;margin-bottom:2px}
.verdict.green{border-color:var(--green)}.verdict.blue{border-color:var(--blue)}.verdict.amber{border-color:var(--amber)}.verdict.red{border-color:var(--red)}
.next{border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:12px 0;background:#fffdf5}
 .next b{display:block;font-size:11px;color:var(--muted);margin-bottom:2px}
.stop{border:2px solid var(--red);background:#fef2f2;color:#991b1b;padding:12px 14px;border-radius:8px;font-weight:800;margin:12px 0}
.next .do{font-size:15px;font-weight:700}
h2{font-size:15px;margin:20px 0 8px;padding-bottom:4px;border-bottom:1px solid var(--line)}
pre,.cmd{font:12px/1.5 ui-monospace,Consolas,monospace;background:#101a16;color:#e7f1ec;padding:10px 12px;border-radius:8px;overflow:auto;white-space:pre-wrap;word-break:break-all}
.item{display:grid;grid-template-columns:92px 1fr;gap:8px;padding:8px 0;border-bottom:1px dashed var(--line)}
.item:last-child{border-bottom:0}.item .w{font-size:11px;color:var(--muted)}.item .t{font-weight:700;font-size:12.5px}
.item .b{font-size:12px;margin-top:2px}.item .r{font-size:11px;color:var(--muted);margin-top:2px}
.tag{display:inline-block;border-radius:999px;padding:1px 7px;font-size:10.5px;font-weight:700;border:1px solid}
.tag.ok{color:#065f46;background:#ecfdf5;border-color:#a7f3d0}.tag.warn{color:#92400e;background:#fffbeb;border-color:#fde68a}.tag.bad{color:#991b1b;background:#fef2f2;border-color:#fecaca}.tag.gray{color:#4b5563;background:#f3f4f6;border-color:#e5e7eb}
table{border-collapse:collapse;width:100%;font-size:11.5px}th,td{border:1px solid var(--line);padding:5px 6px;vertical-align:top;text-align:left}th{background:#f2f5f3;font-size:11px}
td.num{white-space:nowrap}.muted{color:var(--muted)}.empty{color:var(--muted);font-size:12px}
.judge{border:2px solid var(--ink);padding:12px 14px;margin-top:22px}
.judge .opts{display:flex;gap:26px;font-size:18px;font-weight:800;margin:6px 0 14px}
.sign{display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px}
.sign div{border-bottom:1px solid var(--ink);padding:14px 0 2px}
.back{display:inline-block;margin-bottom:10px;color:var(--muted);font-size:12px;text-decoration:none}
@media print{body{background:#fff}.sheet{max-width:none;padding:0;margin:0}.back{display:none}.sheet{page-break-after:always}h2{page-break-after:avoid}.item,tr{page-break-inside:avoid}@page{size:A4;margin:14mm}}
"""


def render_sheet(cid):
    meta = CASES.get(cid, {})
    f = FEAS.get(cid, {})
    cls = f.get("class", "D")
    label, desc, color = CLASS.get(cls, CLASS["D"])
    ev = EVID.get(cid, {})
    s = ev.get("summary", {})
    ms = manual_items(cid)
    mk = mock_items(cid)
    ps = param_rows(cid)
    es = evidence_rows(cid)
    reason = f.get("reason", "")
    if cls == "B":
        reason = f"実機確認 {len(mk)} 件（mock代替）"
    elif cls == "C":
        reason = f"入力値 {len(ps)} 件を確認"
    if cls == "A":
        next_do = "下のコマンドを実行し、最後に「画面HC」がすべて取得済みか確認する。"
    elif cls == "B":
        next_do = (f"下のコマンドを実行する。手作業 {len(ms)} 件と、mockでは確認できない項目を上から確認する。"
                   if ms else "下のコマンドを実行する。手作業はありません。mockでは確認できない項目を確認する。")
    elif cls == "C":
        next_do = "実行しない。先に「入力値」の黄色い項目を確定する。"
    else:
        next_do = "実行しない。上の判定理由を業務担当に確認する。"
    runner = (AUTO.get("cases", {}).get(cid) or {}).get("runner") or {}
    cmd = f"node runner.mjs --case {cid} --base-url <会社SUTのURL> --live"
    if cls == "C":
        cmd += " --strict-params"
    mock_html = "".join(f"""
      <div class="item">
        <div class="w">mock代替<br>{e(m['where'])}</div>
        <div><div class="t">{e(m['title'])}</div><div class="b">{e(m['body'])}</div><div class="r">{'optional: 失敗しても止まりません。必要なら画面を目視してください。' if m.get('optional') else '真機では runner が自動で確認。失敗した時だけ画面を見る。'}</div></div>
      </div>""" for m in mk) or '<p class="empty">mock で代替している確認はありません。</p>'
    manual_html = "".join(f"""
      <div class="item">
        <div class="w">{e(m['kind'])}<br>{e(m['where'])}</div>
        <div><div class="t">{e(m['title'])}</div><div class="b">{e(m['body'])}</div>{f'<div class="r">{e(m["reason"])}</div>' if m.get('reason') else ''}</div>
      </div>""" for m in ms) or '<p class="empty">この本に手作業の確認はありません。</p>'
    param_html = "".join(f"""
      <div class="item">
        <div class="w">{e(p['label'])}</div>
        <div><div class="b">別紙: <b>{e(p['expected'])}</b> → 実行値: <b>{e(p['actual'] or '未設定')}</b> <span class="tag {p['cls']}">{e(p['status'])}</span></div></div>
      </div>""" for p in ps) or '<p class="empty">block が参照する業務入力はありません。</p>'
    ev_html = "".join(f"""
      <tr><td class="num">{e(r['row'])}</td><td>{e(r['item'])}</td><td>{e(r['content'])}</td>
      <td><span class="tag {r['cls']}">{e(r['status'])}</span></td>
      <td>{f'<a href="../../logs/{e(cid)}/{e(r["file"])}">画像</a>' if r.get('file') else '—'}</td></tr>""" for r in es) or '<tr><td colspan="5" class="empty">画面HC なし</td></tr>'
    command_html = f'<h2>実行コマンド</h2><pre>{e(cmd)}</pre><p class="small muted">&lt;会社SUTのURL&gt; を実際のURLに置き換えてください。mockで試すときは --live を外します。</p>' if cls in ('A', 'B') else '<div class="stop">この本は実行しないでください。先に下の入力値/判定理由を確認してください。</div>'
    return f"""<!doctype html><html lang="ja"><meta charset="utf-8"><title>{e(cid)} 作業シート</title><style>{CSS}</style>
<body><div class="sheet">
<a class="back" href="index.html">← 作業シート一覧</a>
<div class="top"><div class="cid">{e(cid)}</div><h1>{e(meta.get('functionName') or '')}</h1>
<div class="meta"><span>{e(meta.get('scenarioId') or '')}</span><span>{e(meta.get('company') or '')}</span><span>{e(meta.get('item') or '')}</span><span>flow: {e(f.get('flow'))}</span></div></div>
<div class="verdict {color}"><div class="big">{e(label)}</div><div>{e(desc)}</div>{f'<div class="muted" style="margin-top:3px">{e(reason)}</div>' if reason else ''}</div>
<div class="next"><b>最初にやること</b><div class="do">{e(next_do)}</div></div>
{command_html}
<h2>手作業で確認（{len(ms)} 件）</h2>{manual_html}
<h2>mock では確認できない項目（{len(mk)} 件）</h2>{mock_html}
<h2>入力値（{len(ps)} 件）</h2>{param_html}
<h2>画面HC（{s.get('exact', 0)}/{s.get('hc', 0)} 取得 / missing {s.get('missing', 0)}）</h2>
<table><thead><tr><th>行</th><th>画面/項目</th><th>確認内容</th><th>状態</th><th>画像</th></tr></thead><tbody>{ev_html}</tbody></table>
<div class="judge"><div class="opts"><span>□ OK</span><span>□ NG</span></div>
<div class="sign"><div>実施者</div><div>実施日</div><div>NG 内容 / 気づいた点</div><div>確認者</div></div></div>
</div></body></html>"""


def render_index():
    rows = []
    for cid in sorted(FEAS, key=lambda c: (FEAS.get(c, {}).get('class', 'D'), c)):
        f = FEAS.get(cid, {})
        cls = f.get("class", "D")
        if cls not in CLASS:
            continue
        label, _, color = CLASS[cls]
        s = (EVID.get(cid) or {}).get("summary", {})
        ms = len(manual_items(cid))
        mk = len(mock_items(cid))
        human = {"A": "このまま実行", "B": f"実機確認 {mk} 件", "C": "入力値を確認", "D": "業務ルール確認"}[cls]
        rows.append((cls, cid, CASES[cid].get("functionName", ""), human, s, ms, label, color))
    cards = "".join(f'<div class="card {c}"><div class="k">{e(CLASS[c][0])}</div><div class="v">{sum(1 for r in rows if r[0]==c)}</div><div class="s">{e(CLASS[c][1])}</div></div>' for c in "ABCD")
    body = "".join(f"""<tr data-cls="{e(cls)}" data-q="{e(cid + ' ' + name).lower()}">
      <td><a href="{e(cid)}.html"><b>{e(cid)}</b><br><span class="muted">{e(name)}</span></a></td>
      <td><span class="pill {color}">{e(label)}</span><div class="muted">{e(reason)}</div></td>
      <td class="num">{s.get('exact',0)}/{s.get('hc',0)}</td><td class="num">{ms}</td>
      <td>{'<span class="tag bad">' + str(s.get('missing')) + '</span>' if s.get('missing') else '—'}</td>
      <td><a href="{e(cid)}.html">開く</a></td></tr>""" for cls, cid, name, reason, s, ms, label, color in rows)
    return f"""<!doctype html><html lang="ja"><meta charset="utf-8"><title>作業シート一覧</title><style>{CSS}
body{{background:var(--bg)}}.wrap{{max-width:1100px;margin:0 auto;padding:26px}}.cards{{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:16px 0}}.card{{background:#fff;border:1px solid var(--line);border-left:6px solid var(--line);border-radius:8px;padding:10px 12px}}.card.A{{border-left-color:var(--green)}}.card.B{{border-left-color:var(--blue)}}.card.C{{border-left-color:var(--amber)}}.card.D{{border-left-color:var(--red)}}.card .k{{font-size:11px;color:var(--muted)}}.card .v{{font-size:24px;font-weight:800}}.card .s{{font-size:10.5px;color:var(--muted)}}.pill{{display:inline-block;padding:1px 7px;border-radius:999px;font-size:10.5px;font-weight:700;border:1px solid}}.pill.green{{color:#065f46;background:#ecfdf5;border-color:#a7f3d0}}.pill.blue{{color:#1e3a8a;background:#eff6ff;border-color:#bfdbfe}}.pill.amber{{color:#92400e;background:#fffbeb;border-color:#fde68a}}.pill.red{{color:#991b1b;background:#fef2f2;border-color:#fecaca}}
input{{padding:8px 10px;border:1px solid var(--line);border-radius:8px;min-width:280px}} .bar{{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:12px 0}}
</style><body><div class="wrap"><h1>作業シート一覧</h1><p class="muted">会社PCではこの一覧から本を選び、1ページの作業シートを開いてください。A はそのまま実行、B は手作業確認、C/D は実行前に確認。</p>
<div class="cards">{cards}</div><div class="bar"><input id="q" placeholder="ケースID / 機能名で検索"></div>
<table id="t"><thead><tr><th>ケース</th><th>判定</th><th>画面HC</th><th>手作業</th><th>missing</th><th></th></tr></thead><tbody>{body}</tbody></table></div>
<script>q.oninput=()=>{{const v=q.value.toLowerCase();document.querySelectorAll('#t tbody tr').forEach(r=>r.style.display=r.dataset.q.includes(v)?'':'none')}};</script></body></html>"""


if __name__ == "__main__":
    for cid in sorted(FEAS):
        (OUT / f"{cid}.html").write_text(render_sheet(cid), encoding="utf-8")
    (OUT / "index.html").write_text(render_index(), encoding="utf-8")
    print({"sheets": len(FEAS), "out": str(OUT)})
