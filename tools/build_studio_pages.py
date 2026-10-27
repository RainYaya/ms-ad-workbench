#!/usr/bin/env python3
"""Build a static, read-only snapshot of RPA Studio for GitHub Pages.

GitHub Pages cannot run the Studio's Node backend, so this publishes the same
material as data + a static client: flow list, steps, the real mock screens in
an iframe, click-to-inspect controls, and the binding review queue.  Nothing
here can save; edits happen in the local Studio.

    python tools/build_studio_pages.py --out .pages-out/studio
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
FLOWS = ROOT / "flows"
BOOKS = FLOWS / "books"
STUDIO = ROOT / "automation" / "node-runner" / "studio"
MOCK = ROOT / "automation" / "node-runner" / "mock-src"
sys.stdout.reconfigure(encoding="utf-8")


def slug(name: str) -> str:
    return name.replace("/", "__")


def fix_keys(obj):
    """YAML 1.1 reads the bare key `on` as boolean True.  The flows use it for
    the screen of a step, and js-yaml (the runner/Studio side) keeps it as a
    string, so restore the string here."""
    if isinstance(obj, dict):
        return {("on" if k is True else k): fix_keys(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [fix_keys(v) for v in obj]
    return obj


def load_flows() -> tuple[list[dict], dict[str, dict]]:
    index: list[dict] = []
    models: dict[str, dict] = {}
    files = [(f, "hand") for f in sorted(FLOWS.glob("*.yaml"))
             if not f.name.endswith(".legacy.yaml") and f.name != "bindings.yaml"]
    files += [(f, "book") for f in sorted(BOOKS.glob("*.yaml"))]
    for f, kind in files:
        try:
            m = fix_keys(yaml.safe_load(f.read_text(encoding="utf-8")) or {})
        except Exception as e:
            print(f"skip {f.name}: {e}")
            continue
        name = ("books/" if kind == "book" else "") + f.stem
        models[name] = m
        index.append({
            "name": name, "slug": slug(name), "kind": kind,
            "case": m.get("case") or f.stem, "title": m.get("title") or "",
            "mode": m.get("mode") or None, "steps": len(m.get("steps") or []),
            "start": (m.get("start") or {}).get("screen"),
            "screens": sorted({s.get("on") for s in (m.get("steps") or [])
                               if isinstance(s.get("on"), str)}),
        })
    return index, models


def build_controls(screens: dict) -> dict:
    ctl = json.loads((ROOT / "ui-controls.json").read_text(encoding="utf-8"))
    out: dict[str, list] = {}
    for name, meta in screens.items():
        key = f"{meta.get('app')}/{meta.get('code')}"
        if not meta.get("app") or not meta.get("code"):
            continue
        page = (ctl.get("screens") or {}).get(key) or {}
        out[key] = [{
            "label": c.get("label"), "labelKey": c.get("labelKey"),
            "selector": c.get("selector"), "kind": c.get("kind"),
        } for c in page.get("controls") or []
            if c.get("kind") not in ("hidden", "dialog") and c.get("selector")]
    return out


META_CP932 = re.compile(r'(<meta[^>]+charset=)\s*(["\']?)shift_jis(["\']?)', re.I)
STATIC_ATTR = re.compile(r'((?:href|src|action)=["\'])/static/')
UNRESOLVED_ATTR = re.compile(r'((?:href|src|action)=)"([^"]*\$\{[^"]*)"')

# Popup screens in the mock read window.opener.document on load.  Opened as a
# plain preview iframe opener is null, so give them a same-document opener.
# The Thymeleaf logo is a broken image; hide it rather than show alt text.
HEAD_INJECT = ('<link rel="icon" href="data:,">'
               '<style>img[data-unresolved-src]{display:none}</style>'
               '<script>window.opener=window.opener||window;</script>')


def copy_mock(out: Path) -> int:
    base = out / "mock"
    n = 0
    for app in sorted(p.name for p in MOCK.iterdir() if p.is_dir()):
        src_app = MOCK / app
        if app == "static":
            continue
        dst_app = base / app
        dst_app.mkdir(parents=True, exist_ok=True)
        for f in src_app.glob("*.html"):
            html = f.read_bytes().decode("utf-8", "replace")
            html = META_CP932.sub(r"\1\2utf-8\3", html)
            # Pages serves the site under /<repo>/<page>/mock/, so the mock's
            # absolute /static/... must become app-relative.
            html = STATIC_ATTR.sub(r"\1static/", html)
            # Thymeleaf expressions were never rendered in the mock (e.g. the
            # logo src is literally /ANB00${commonForm.logoPath}).  Rename the
            # attribute so the browser does not request the site root.
            html = UNRESOLVED_ATTR.sub(r'data-unresolved-\1"\2"', html)
            if "<head>" in html:
                html = html.replace("<head>", "<head>" + HEAD_INJECT, 1)
            html = html.replace("</body>", '<script src="../../picker.js"></script></body>')
            (dst_app / f.name).write_text(html, encoding="utf-8")
            n += 1
        st = src_app / "static"
        if st.exists():
            shutil.copytree(st, dst_app / "static", dirs_exist_ok=True)
    return n


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True)
    args = ap.parse_args()
    out = Path(args.out)
    (out / "data" / "flows").mkdir(parents=True, exist_ok=True)

    screens = json.loads((ROOT / "ui-screens.json").read_text(encoding="utf-8"))["screens"]
    index, models = load_flows()
    bind = fix_keys(yaml.safe_load((FLOWS / "bindings.yaml").read_text(encoding="utf-8")) or {})

    (out / "data" / "flows.json").write_text(json.dumps(index, ensure_ascii=False), encoding="utf-8")
    for name, m in models.items():
        (out / "data" / "flows" / f"{slug(name)}.json").write_text(
            json.dumps(m, ensure_ascii=False), encoding="utf-8")
    (out / "data" / "bindings.json").write_text(
        json.dumps(bind.get("rules") or [], ensure_ascii=False), encoding="utf-8")
    (out / "data" / "screens.json").write_text(
        json.dumps(screens, ensure_ascii=False), encoding="utf-8")
    (out / "data" / "controls.json").write_text(
        json.dumps(build_controls(screens), ensure_ascii=False), encoding="utf-8")

    (out / "style.css").write_text(
        (STUDIO / "public" / "style.css").read_text(encoding="utf-8") + EXTRA_CSS, encoding="utf-8")
    (out / "picker.js").write_text(PICKER, encoding="utf-8")
    (out / "app.js").write_text(APP_JS, encoding="utf-8")
    (out / "index.html").write_text(INDEX_HTML, encoding="utf-8")
    n = copy_mock(out)
    print(f"studio snapshot: {len(index)} flows, {n} mock pages -> {out}")
    return 0


EXTRA_CSS = """
/* The local Studio is header / main / console.  The snapshot adds a banner
   and has no console, so the row template is set explicitly. */
body { grid-template-rows: 30px 48px 1fr; }
.ro-banner{display:flex;align-items:center;gap:10px;padding:0 14px;font-size:12px;
 color:var(--dim);background:var(--panel);border-bottom:1px solid var(--line);overflow:hidden}
.ro-banner b{color:var(--accent);font-weight:600;white-space:nowrap}
.ro-banner code{color:var(--text);background:var(--panel2);padding:1px 5px;border-radius:4px}
.ro-banner a{color:var(--act);text-decoration:none;white-space:nowrap}
.ro-banner a:hover{text-decoration:underline}
/* Step cards: the mock screens are ~1000px wide, so when a screen is open the
   props panel steps aside and the screen takes the rest of the width. */
.step { display: block; padding: 7px 9px; border-left-width: 3px; }
.st-top { display: flex; align-items: center; gap: 6px; }
.st-top .badge { margin-left: auto; }
.st-row { color: var(--dim); font-variant-numeric: tabular-nums; }
.st-on { color: #cfe0f5; font-size: 11px; margin-top: 1px; }
.st-sum { color: var(--dim); font-size: 11px; margin-top: 1px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
header .tabs { border: 0; background: transparent; padding: 0; }
header .tabs button { padding: 4px 10px; }
body.screen-open main { grid-template-columns: 190px minmax(280px, 340px) minmax(0, 1fr); }
body.screen-open #props { display: none; }
#screenPane { position: static; align-self: stretch; min-height: 0; max-height: none;
  border: 0; border-left: 1px solid var(--line); border-radius: 0; }
#spFrame { width: 100%; height: 100%; }
#spPick { max-width: 46%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: Consolas, monospace; color: var(--ctl); }
#propBody { padding: 8px 10px 24px; }
#propBody .list { max-height: none; }
.list-row { grid-template-columns: 70px 1fr; }
#flows { overflow: auto; }
main { min-height: 0; }
"""


PICKER = r"""
// Injected into every mock screen in the static snapshot. Read-only: clicks
// select, they never submit.
(function () {
  const SEL = 'input, select, textarea, button, a';
  let current = null;
  function selectorOf(el) {
    if (el.id && !el.id.includes('${')) return '#' + el.id;
    const name = el.getAttribute('name');
    if (name && !name.includes('${')) return '[name="' + name + '"]';
    const parts = [];
    let n = el;
    while (n && n.nodeType === 1 && parts.length < 6) {
      let p = n.tagName.toLowerCase();
      if (n.id && !n.id.includes('${')) { parts.unshift('#' + n.id); break; }
      const sib = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [];
      if (sib.length > 1) p += ':nth-of-type(' + (sib.indexOf(n) + 1) + ')';
      parts.unshift(p);
      n = n.parentElement;
    }
    return parts.join(' > ');
  }
  function labelOf(el) {
    const cell = el.closest('div');
    let prev = cell && cell.previousElementSibling;
    while (prev && !/field_title/.test(prev.className || '')) prev = prev.previousElementSibling;
    if (prev) return (prev.textContent || '').replace(/\s+/g, ' ').trim();
    const next = el.nextElementSibling;
    if (next && next.tagName === 'LABEL') return (next.textContent || '').trim();
    if (el.value && /^(submit|button|reset)$/i.test(el.type || '')) return el.value.trim();
    return (el.getAttribute('title') || '').trim();
  }
  function info(el) {
    return { selector: selectorOf(el), id: el.id || null, name: el.getAttribute('name'),
      kind: (el.tagName === 'INPUT' ? (el.type || 'text') : el.tagName.toLowerCase()),
      label: labelOf(el), text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60) };
  }
  function mark(el) {
    if (current === el) return;
    if (current) { current.style.outline = current.dataset.rpaOutline || ''; current.style.outlineOffset = current.dataset.rpaOffset || ''; }
    current = el;
    if (!el) return;
    if (el.dataset.rpaOutline === undefined) {
      el.dataset.rpaOutline = el.style.outline || '';
      el.dataset.rpaOffset = el.style.outlineOffset || '';
    }
    el.style.outline = '2px solid #46b8a8';
    el.style.outlineOffset = '1px';
  }
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest?.(SEL);
    if (el) { mark(el); parent.postMessage({ source: 'rpa-picker', type: 'hover', ...info(el) }, '*'); }
  }, true);
  document.addEventListener('click', (e) => {
    const el = e.target.closest?.(SEL);
    if (!el) return;
    e.preventDefault(); e.stopPropagation();
    mark(el);
    parent.postMessage({ source: 'rpa-picker', type: 'pick', ...info(el) }, '*');
  }, true);
  document.addEventListener('submit', (e) => e.preventDefault(), true);
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.source !== 'rpa-studio') return;
    if (d.type === 'highlight') {
      let el = null;
      try { el = d.selector ? document.querySelector(d.selector) : null; } catch { el = null; }
      mark(el || null);
      if (el && el.scrollIntoView) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
    if (d.type === 'clear') mark(null);
  });
})();
"""

INDEX_HTML = """<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:,">
<title>RPA Studio（只读快照）</title>
<link rel="stylesheet" href="style.css"></head>
<body>
<div class="ro-banner"><b>只读快照</b>
  <span>画面、步骤、绑定队列都是真数据；保存/运行请在本地运行 <code>node studio/server.mjs</code>。</span>
  <span class="spacer"></span><a href="../index.html">← 文档站</a></div>
<header>
  <div class="brand">RPA <span>Studio</span><small>17 primitives · 1 book = 1 flow</small></div>
  <div class="spacer"></div>
  <div class="tabs" id="propTabs">
    <button data-tab="step" class="on">步骤</button>
    <button data-tab="bind">绑定队列</button>
  </div>
  <span id="count" class="badge"></span>
</header>
<main>
  <aside>
    <input id="flowFilter" class="flow-filter" placeholder="筛选手順 / books/…">
    <div id="flows"></div>
  </aside>
  <section id="canvas">
    <div id="steps" class="steps"></div>
  </section>
  <aside id="props">
    <div id="propBody"></div>
  </aside>
  <section id="screenPane" hidden>
    <div class="sp-head">
      <span id="spTitle">画面</span>
      <span id="spPick" class="badge"></span>
      <span class="spacer"></span>
      <button id="spClose">×</button>
    </div>
    <iframe id="spFrame" title="画面预览"></iframe>
    <div id="spHint" class="hint">悬停高亮控件，点击查看 selector</div>
  </section>
</main>
<script src="app.js"></script>
</body></html>
"""

APP_JS = r"""
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const S = { flows: [], flow: null, name: null, sel: -1, tab: 'step',
  screens: {}, controls: {}, rules: [], bindStatus: 'needs-human', bindQ: '',
  screenKey: null, picked: null, rule: null, doc: null };

async function api(p) {
  const r = await fetch(p);
  if (!r.ok) throw new Error(p + ' ' + r.status);
  return r.json();
}

function norm(s) {
  return String(s ?? '').replace(/\[\(.*?\)\]/g, '').replace(/\$\{.*?\}/g, '')
    .normalize('NFKC').replace(/\s+/g, '')
    .replace(/コード/g, 'ｺｰﾄﾞ').replace(/ID|id/g, 'ＩＤ')
    .replace(/[*※]+$/, '').replace(/[－ーｰ]/g, '-');
}

function screenKeyOf(name) {
  if (!name) return null;
  const n = norm(name);
  for (const [k, v] of Object.entries(S.screens)) {
    if (norm(k) === n && v.app && v.code) return v.app + '/' + v.code;
  }
  return null;
}

function stepSummary(s) {
  if (s.target?.label) return 'target: ' + s.target.label;
  if (Array.isArray(s.use)) return 'use: ' + s.use.map((u) => typeof u === 'string' ? u : u.label).join(' / ');
  if (s.expect?.screen) return 'expect screen: ' + s.expect.screen;
  if (s.expect?.ref) return 'expect: ' + s.expect.ref.appendix + ' (unresolved)';
  if (s.expect?.value !== undefined) return 'expect value: ' + s.expect.value;
  if (s.expect?.external) return 'external: ' + s.expect.external.type;
  if (s.name) return 'evidence: ' + s.name;
  return s.note || '';
}

function renderList() {
  const q = ($('#flowFilter').value || '').trim().toLowerCase();
  const shown = S.flows.filter((f) => !q || f.name.toLowerCase().includes(q)
    || String(f.title).toLowerCase().includes(q));
  $('#flows').innerHTML = shown.map((f) => `
    <div class="flow-item ${f.name === S.name ? 'on' : ''}" data-name="${esc(f.name)}">
      <div class="name">${esc(f.name)}${f.kind === 'book' ? ' <span class="badge">本</span>' : ''}</div>
      <div class="meta"><span>${f.steps} 步</span>${f.mode === 'external' ? '<span class="mode">batch</span>' : ''}</div>
    </div>`).join('');
  $$('#flows .flow-item').forEach((el) => el.onclick = () => selectFlow(el.dataset.name));
}

async function selectFlow(name) {
  S.name = name;
  S.flow = await api('data/flows/' + name.replace('/', '__') + '.json');
  S.sel = S.flow.steps?.length ? 0 : -1;
  S.rule = null;
  renderList();
  renderSteps();
  renderProps();
  if (S.sel >= 0) focusStep(0);
}

function renderSteps() {
  const steps = S.flow?.steps || [];
  $('#steps').innerHTML = steps.length ? steps.map((s, i) => `
    <div class="step ${i === S.sel ? 'on' : ''}" data-i="${i}">
      <div class="st-top"><span class="mono st-row">row ${esc(s.row)}</span><span class="badge">${esc(s.do)}</span></div>
      <div class="mono st-on">${esc(s.on || '')}</div>
      <div class="st-sum">${esc(stepSummary(s))}</div>
    </div>`).join('') : '<div class="empty">no steps</div>';
  $$('#steps .step').forEach((el) => el.onclick = () => focusStep(Number(el.dataset.i)));
  $('#count').textContent = `${S.flows.length} flows`;
}

function focusStep(i) {
  S.sel = i;
  S.rule = null;
  S.tab = 'step';
  $$('#propTabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === S.tab));
  renderSteps();
  renderProps();
  const s = S.flow?.steps?.[i];
  if (s?.on) openScreen(s.on, s.target?.label);
}

let pendingHighlight = null;

function postHighlight(selector) {
  const win = $('#spFrame').contentWindow;
  if (!win) return;
  win.postMessage({ source: 'rpa-studio', type: 'highlight', selector }, '*');
  $('#spPick').textContent = selector;
}

$('#spFrame').addEventListener('load', () => {
  if (!pendingHighlight) return;
  const { url, selector } = pendingHighlight;
  pendingHighlight = null;
  if (!($('#spFrame').getAttribute('src') || '').endsWith(url)) return;
  postHighlight(selector);
});

function openScreen(screenName, label) {
  const key = screenKeyOf(screenName);
  const pane = $('#screenPane');
  $('#spPick').textContent = '';
  pane.hidden = false;
  document.body.classList.add('screen-open');
  $('#spTitle').textContent = screenName + (key ? ' · ' + key : '');
  if (!key) { $('#spFrame').removeAttribute('src'); $('#spHint').textContent = '该画面未收录 HTML（批处理/弹窗/未映射）'; return; }
  const url = 'mock/' + key + '.html';
  const sel = label ? labelSelector(key, label) : null;
  if ($('#spFrame').getAttribute('src') !== url) {
    if (sel) pendingHighlight = { url, selector: sel };
    $('#spFrame').setAttribute('src', url);
  } else if (sel) {
    postHighlight(sel);
  }
  $('#spHint').textContent = '悬停高亮控件，点击查看 selector';
  S.screenKey = key;
  if (label) showLabelHit(key, label, sel);
}

function labelSelector(key, label) {
  const list = S.controls[key] || [];
  const n = norm(label);
  const hits = list.filter((c) => c.labelKey === n);
  return hits.length === 1 ? hits[0].selector : null;
}

function showLabelHit(key, label, sel) {
  if (sel) return;
  const list = S.controls[key] || [];
  const n = norm(label);
  const hits = list.filter((c) => c.labelKey === n);
  $('#spPick').textContent = hits.length
    ? hits.length + ' controls share this label'
    : 'no control labelled ' + label;
}

function renderProps() {
  if (S.tab === 'bind') return renderBindings();
  const s = S.flow?.steps?.[S.sel];
  if (!s) { $('#propBody').innerHTML = '<div class="empty">选择一步</div>'; return; }
  const lines = [
    ['row', s.row], ['on', s.on], ['do', s.do], ['target', s.target?.label || s.target?.row],
    ['use', Array.isArray(s.use) ? s.use.map((u) => typeof u === 'string' ? u : u.label + '=' + u.value).join(', ') : ''],
    ['expect', JSON.stringify(s.expect || '')], ['evidence', s.evidence], ['note', s.note],
  ].filter(([, v]) => v !== undefined && v !== '' && v !== '""');
  $('#propBody').innerHTML = '<div class="list">' + lines.map(([k, v]) =>
    `<div class="list-row"><span class="mono">${esc(k)}</span><span>${esc(v)}</span></div>`).join('')
    + '</div>' + (s.target?.label ? `<div class="hint" style="margin-top:10px">画面里高亮的控件就是这条 target 解析出的位置。</div>` : '');
}

function ruleId(r) { return r.id; }

function renderBindings() {
  const counts = {};
  for (const r of S.rules) counts[r.status] = (counts[r.status] || 0) + 1;
  const q = S.bindQ.toLowerCase();
  const list = S.rules.filter((r) => (S.bindStatus === 'all' || r.status === S.bindStatus)
    && (!q || String(r.phrase).toLowerCase().includes(q) || String(r.screen || '').toLowerCase().includes(q)));
  const head = `<div class="row3" style="margin-bottom:8px">
      <select id="bindStatus">${['needs-human', 'auto', 'confirmed', 'rejected', 'blocked', 'all'].map((s) =>
        `<option ${s === S.bindStatus ? 'selected' : ''}>${s}</option>`).join('')}</select>
      <input id="bindQ" placeholder="搜索措辞/画面" value="${esc(S.bindQ)}">
      <span class="badge">${list.length} / ${S.rules.length}</span></div>`;
  const rows = list.slice(0, 300).map((r) => `
    <div class="bind-row ${S.rule?.id === r.id ? 'on' : ''}" data-id="${esc(r.id)}">
      <div class="row2"><span class="mono">${esc(r.id)}</span><span class="badge">${esc(r.status)}</span></div>
      <div>${esc(r.screenName || r.screen || '—')}</div>
      <div class="hint">${esc(r.phrase)}${r.selector ? ' → ' + esc(r.selector) : ''}</div>
      <div class="hint">${r.rows} 行 · ${r.books} 本</div>
    </div>`).join('');
  $('#propBody').innerHTML = head + '<div class="list">' + rows + '</div>'
    + `<div class="hint" style="margin-top:10px">只读演示。本地 Studio 里点候选或画面上点控件即可确认，确认后重跑 build_bindings.py。</div>`;
  $('#bindStatus').onchange = (e) => { S.bindStatus = e.target.value; renderBindings(); };
  $('#bindQ').oninput = (e) => { S.bindQ = e.target.value; renderBindings(); };
  $$('#propBody .bind-row').forEach((el) => el.onclick = () => selectRule(el.dataset.id));
}

function selectRule(id) {
  S.rule = S.rules.find((r) => r.id === id) || null;
  if (!S.rule) return;
  renderBindings();
  if (S.rule.screen) {
    const [app, code] = S.rule.screen.split('/');
    S.screenKey = S.rule.screen;
    $('#screenPane').hidden = false;
    document.body.classList.add('screen-open');
    $('#spTitle').textContent = (S.rule.screenName || '') + ' · ' + S.rule.screen;
    $('#spHint').textContent = '悬停高亮控件，点击查看 selector';
    const url = 'mock/' + app + '/' + code + '.html';
    if ($('#spFrame').getAttribute('src') !== url) {
      if (S.rule.selector) pendingHighlight = { url, selector: S.rule.selector };
      $('#spFrame').setAttribute('src', url);
      $('#spPick').textContent = S.rule.selector || '未确认（无 selector）';
    } else if (S.rule.selector) {
      postHighlight(S.rule.selector);
    }
    if (!S.rule.selector) {
      $('#spHint').textContent = '这条绑定还没有 selector。在画面上点控件即可看到它的 selector；本地 Studio 中这一步会直接确认绑定。';
    }
  }
}

window.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.source !== 'rpa-picker') return;
  if (d.type === 'pick') {
    S.picked = d;
    $('#spPick').textContent = d.selector;
    $('#spHint').textContent = '选中：' + (d.label || d.name || d.kind) + ' · ' + d.selector;
    if (S.rule && S.rule.status === 'needs-human') {
      $('#spHint').textContent += '（只读：本地 Studio 中这会确认绑定）';
    }
  }
});

$('#spClose').onclick = () => {
  $('#screenPane').hidden = true;
  document.body.classList.remove('screen-open');
};
$('#propTabs').onclick = (e) => {
  const b = e.target.closest('button[data-tab]');
  if (!b) return;
  S.tab = b.dataset.tab;
  $$('#propTabs button').forEach((x) => x.classList.toggle('on', x === b));
  // The screen pane takes the props column while open; to read the queue the
  // pane must step aside.
  if (S.tab === 'bind') $('#spClose').click();
  renderProps();
};
$('#flowFilter').oninput = renderList;

(async function init() {
  S.screens = await api('data/screens.json');
  S.controls = await api('data/controls.json');
  S.rules = await api('data/bindings.json');
  S.flows = await api('data/flows.json');
  renderList();
  const pick = location.hash.slice(1) || S.flows[0]?.name;
  if (pick) await selectFlow(pick);
})();
"""


if __name__ == "__main__":
    raise SystemExit(main())
