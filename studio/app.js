
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
