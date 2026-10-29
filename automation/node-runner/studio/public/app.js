'use strict';

// ── tiny helpers ─────────────────────────────────────────────────────
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

const S = {
  flows: [], name: null, model: null, sel: -1, tab: 'step', ct: 'log',
  labels: [], screens: [], dirty: false, poll: null, running: false,
  raw: null, yamlOpen: false,
};

const PRIMS = [
  { group: '动作', cls: 'act', items: [
    ['click', 'click 点击'], ['fill', 'fill 填写'], ['select', 'select 选择'],
    ['check', 'check 勾选'], ['chooseRow', 'chooseRow 选行'], ['fillAll', 'fillAll 批量填'],
    ['press', 'press 按键'],
    ['goto', 'goto 跳转'], ['waitUntil', 'waitUntil 等待'],
  ] },
  { group: '证据', cls: 'evi', items: [['capture', 'capture 截图']] },
  { group: '断言', cls: 'asr', items: [
    ['screenIs', 'screenIs 画面'], ['fieldIs', 'fieldIs 字段'], ['rowsAtLeast', 'rowsAtLeast 行数'],
    ['messageIs', 'messageIs 报文'], ['downloadIs', 'downloadIs 下载'], ['externalIs', 'externalIs 外部'],
  ] },
  { group: '控制', cls: 'ctl', items: [
    ['manual', 'manual 人工'],
  ] },
];

const CAT = {};
for (const g of PRIMS) for (const [k] of g.items) CAT[k] = g.cls;

const ACTIONS = new Set(['click', 'fill', 'select', 'check', 'chooseRow', 'press', 'goto', 'waitUntil']);
const ASSERTS = new Set(['screenIs', 'fieldIs', 'rowsAtLeast', 'messageIs', 'downloadIs', 'externalIs']);

function toast(msg, err = false) {
  const t = document.createElement('div');
  t.className = 'toast' + (err ? ' err' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

async function api(path, opts) {
  const r = await fetch(path, opts);
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || r.statusText);
  return j;
}

function setByPath(obj, path, value) {
  const parts = path.split('.');
  let o = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (o[parts[i]] == null) o[parts[i]] = {};
    o = o[parts[i]];
  }
  o[parts[parts.length - 1]] = value;
}

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function delByPath(obj, path) {
  const parts = path.split('.');
  let o = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    o = o?.[parts[i]];
    if (o == null) return;
  }
  delete o[parts[parts.length - 1]];
}

function prune(obj) {
  if (obj == null) return;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v === undefined || v === '') delete obj[k];
    else if (Array.isArray(v) && v.length === 0) delete obj[k];
    else if (v && typeof v === 'object' && !Array.isArray(v)) {
      prune(v);
      if (Object.keys(v).length === 0) delete obj[k];
    }
  }
}

function markDirty() {
  S.dirty = true;
  $('#dirty').hidden = false;
}

// ── loading ──────────────────────────────────────────────────────────
async function loadFlows() {
  const { flows } = await api('/api/flows');
  S.flows = flows;
  $('#flowSelect').innerHTML = flows.map((f) =>
    `<option value="${esc(f.name)}">${esc(f.name)}${f.mode === 'external' ? ' [batch]' : ''}</option>`
  ).join('');
  renderFlowList();
}

function renderFlowList() {
  const q = ($('#flowFilter')?.value || '').trim().toLowerCase();
  const shown = S.flows.filter((f) => !q || f.name.toLowerCase().includes(q)
    || String(f.title || '').toLowerCase().includes(q));
  $('#flows').innerHTML = shown.map((f) => `
    <div class="flow-item ${f.name === S.name ? 'on' : ''}" data-name="${esc(f.name)}">
      <div class="name">${esc(f.name)}${f.kind === 'book' ? ' <span class="tag">本</span>' : ''}</div>
      <div class="meta"><span>${f.steps} 步</span>${f.mode === 'external' ? '<span class="mode">batch</span>' : ''}</div>
    </div>`).join('');
  $$('#flows .flow-item').forEach((el) => el.onclick = () => selectFlow(el.dataset.name));
}

async function selectFlow(name) {
  if ((S.dirty || yamlDirty()) && !confirm('当前有未保存修改，放弃并切换？')) return;
  const { model, raw } = await api('/api/flow?name=' + encodeURIComponent(name));
  S.name = name;
  S.model = model;
  S.raw = raw;
  S.sel = model.steps?.length ? 0 : -1;
  S.dirty = false;
  S.labels = [];
  $('#dirty').hidden = true;
  $('#flowSelect').value = name;
  $('#envChip').textContent = model.env ? 'env: ' + model.env : (model.mode === 'external' ? 'mode: external' : '');
  localStorage.setItem('rpa.flow', name);
  renderFlowList();
  renderSteps();
  renderProps();
  loadLabels();
  syncScreen();
  loadEvidence();
  loadLastRun();
  if (S.yamlOpen) loadYaml();
}

// ── step list ────────────────────────────────────────────────────────
function stepSummary(s) {
  const bits = [];
  if (s.target?.label) bits.push(`<b>${esc(s.target.label)}</b>${s.target.anchor ? ' ⟵ <i>' + esc(s.target.anchor) + '</i>' : ''}`);
  if (s.use?.length) bits.push(`<b>${s.use.length}</b> 项 <i>${esc(s.use.map((u) => typeof u === 'string' ? u : u.label).join(' / ')).slice(0, 60)}</i>`);
  if (s.value !== undefined) bits.push(`= <b>${esc(s.value)}</b>`);
  if (s.do === 'fillAll' && s.use) { /* shown above */ }
  if (s.expect?.screen) bits.push(`→ ${esc(s.expect.screen)}`);
  if (s.expect?.fields?.length) bits.push(`${s.expect.fields.length} 字段`);
  if (s.expect?.rows?.min !== undefined) bits.push(`≥ ${s.expect.rows.min} 行`);
  if (s.expect?.message?.code) bits.push(esc(s.expect.message.code));
  if (s.expect?.download) bits.push('download ' + esc(s.expect.download.ext || ''));
  if (s.expect?.external) bits.push('外部: ' + esc(s.expect.external.type || ''));
  if (s.expect?.ref) bits.push(`别紙 ${esc(s.expect.ref.appendix || '')}`);
  if (s.note && !bits.length) bits.push(`<i>${esc(String(s.note).slice(0, 70))}</i>`);
  return bits.join(' ') || '<i>—</i>';
}

function renderSteps() {
  const box = $('#steps');
  const steps = S.model?.steps || [];
  if (!steps.length) {
    box.innerHTML = '<div class="empty">还没有步骤。上面点一个组件开始。</div>';
    return;
  }
  box.innerHTML = steps.map((s, i) => `
    <div class="step ${CAT[s.do] || ''} ${i === S.sel ? 'on' : ''}" data-i="${i}" draggable="true">
      <div class="row">r${esc(s.row)}</div>
      <div class="do">${esc(s.do)}</div>
      <div class="body">
        <div class="screen">${esc(s.on || (S.model.mode === 'external' ? '外部执行' : '—'))}</div>
        <div class="sum">${stepSummary(s)}</div>
      </div>
      <div class="flags">
        ${s.popup ? '<span class="flag popup">popup</span>' : ''}
        ${s.expect?.ref ? '<span class="flag ref">ref</span>' : ''}
        ${s.evidence ? `<span class="flag">${esc(s.evidence)}</span>` : ''}
        <span class="ops">
          <button data-act="up" title="上移">↑</button>
          <button data-act="down" title="下移">↓</button>
          <button data-act="del" title="删除">✕</button>
        </span>
      </div>
    </div>`).join('');

  // Drag to reorder. A long book needs 40 clicks of ↑ otherwise, and one
  // mis-click silently changes the execution order. The row number is a label
  // (hand-procedure line), not the order, so only the array moves.
  let dragFrom = null;
  $$('#steps .step').forEach((el) => {
    el.addEventListener('dragstart', (e) => {
      dragFrom = Number(el.dataset.i);
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      // Firefox needs data set for the drop to fire.
      try { e.dataTransfer.setData('text/plain', String(dragFrom)); } catch { /* ignore */ }
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      $$('#steps .step').forEach((x) => x.classList.remove('drop-target'));
    });
    el.addEventListener('dragover', (e) => {
      if (dragFrom === null) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      $$('#steps .step').forEach((x) => x.classList.remove('drop-target'));
      el.classList.add('drop-target');
    });
    el.addEventListener('drop', (e) => {
      e.preventDefault();
      const to = Number(el.dataset.i);
      if (dragFrom === null || dragFrom === to) return;
      const arr = S.model.steps;
      const [moved] = arr.splice(dragFrom, 1);
      arr.splice(to, 0, moved);
      S.sel = to;
      dragFrom = null;
      markDirty();
      renderSteps();
      renderProps();
    });
  });

  $$('#steps .step').forEach((el) => {
    el.onclick = (e) => {
      const act = e.target.closest('button')?.dataset.act;
      const i = Number(el.dataset.i);
      if (act === 'up') moveStep(i, -1);
      else if (act === 'down') moveStep(i, 1);
      else if (act === 'del') delStep(i);
      else { S.sel = i; renderSteps(); renderProps(); loadLabels(); syncScreen(); }
    };
  });
}

function moveStep(i, d) {
  const steps = S.model.steps;
  const j = i + d;
  if (j < 0 || j >= steps.length) return;
  [steps[i], steps[j]] = [steps[j], steps[i]];
  S.sel = j;
  markDirty();
  renderSteps();
  renderProps();
}

function delStep(i) {
  if (!confirm(`删除第 ${S.model.steps[i].row} 行这一步？`)) return;
  S.model.steps.splice(i, 1);
  S.sel = Math.min(i, S.model.steps.length - 1);
  markDirty();
  renderSteps();
  renderProps();
}

function defaultStep(doName, on) {
  const steps = S.model.steps || [];
  const last = steps[steps.length - 1];
  const s = { row: last ? Number(last.row) + 1 : 14, on: on || S.model.start?.screen || '', do: doName };
  if (S.model.mode === 'external') delete s.on;
  if (['click', 'fill', 'select', 'check', 'chooseRow', 'press'].includes(doName)) s.target = { label: '' };
  if (doName === 'fill' || doName === 'select') s.value = '';
  if (doName === 'fillAll') s.use = [];
  if (doName === 'capture') s.of = 'viewport';
  if (doName === 'fieldIs') s.expect = { fields: [] };
  if (doName === 'rowsAtLeast') s.min = 1;
  if (doName === 'messageIs') s.expect = { message: { code: '' } };
  if (doName === 'downloadIs') s.expect = { download: {} };
  if (doName === 'externalIs') s.expect = { external: { type: '', note: '' } };
  if (doName === 'goto') { s.url = ''; s.reason = ''; }
  if (doName === 'press') s.key = 'Enter';
  if (doName === 'manual') s.note = '';
  return s;
}

// A new step is inserted *below the selected step*, not appended to the end of
// the book: a missing action almost always belongs where you are looking, and
// appending meant one drag per new step.
//
// Which hand row it claims: normally the next row after the selected one
// (filling the gap, since generated books have one step per hand row). If the
// following step already owns that number, the new step is a second action on
// the selected row and keeps its number — otherwise it would steal the next
// hand row's identity and check-flow would report a screen mismatch.
function addStep(doName) {
  const steps = S.model.steps = S.model.steps || [];
  const sel = S.sel >= 0 && steps[S.sel] ? S.sel : -1;
  const ref = sel >= 0 ? steps[sel] : steps[steps.length - 1];
  const s = defaultStep(doName, ref ? ref.on : S.model.start?.screen);
  if (ref) {
    const row = Number(ref.row);
    const next = steps[sel + 1];
    if (Number.isFinite(row)) s.row = next && Number(next.row) === row + 1 ? row : row + 1;
  }
  const at = sel >= 0 ? sel + 1 : steps.length;
  steps.splice(at, 0, s);
  S.sel = at;
  markDirty();
  renderSteps();
  renderProps();
  loadLabels();
}

function renderPalette() {
  $('#palette').innerHTML = PRIMS.map((g) => `
    <div class="pal-group">
      <span class="pal-label">${g.group}</span>
      ${g.items.map(([k, label]) => `<button class="pal ${g.cls}" data-do="${k}" title="插在当前选中的步骤下方">${esc(label)}</button>`).join('')}
    </div>`).join('');
  $$('#palette .pal').forEach((b) => b.onclick = () => addStep(b.dataset.do));
}

// ── dictionary labels ────────────────────────────────────────────────
async function loadLabels() {
  const s = S.model?.steps?.[S.sel];
  if (!s?.on) { S.labels = []; $('#labelList').innerHTML = ''; return; }
  try {
    const { labels, screenKey } = await api('/api/dict?screen=' + encodeURIComponent(s.on));
    S.labels = labels;
    $('#labelList').innerHTML = labels.map((l) =>
      `<option value="${esc(l.label)}">${esc(l.kind)} · ${esc(l.from)}${l.status ? ' · ' + esc(l.status) : ''}</option>`
    ).join('');
    const hint = $('#dictHint');
    if (hint) hint.textContent = screenKey
      ? `字典 ${screenKey} · ${labels.length} 个标签`
      : '这个画面名还没映射到字典';
  } catch { /* ignore */ }
}

// ── properties ───────────────────────────────────────────────────────
function renderProps() {
  const body = $('#propBody');
  // While the YAML pane is open the model on screen would be a second writer to
  // the same file, and the two would race (list-save re-serializes and eats the
  // pane's text). One writer at a time: close the pane to use the editors.
  if (S.yamlOpen) {
    body.innerHTML = `<div class="empty">正在直接编辑 YAML 原文。<br><br>
      关掉上面 YAML 视图，或用 Ctrl+S 写完盘，再回到步骤编辑。</div>`;
    return;
  }
  if (S.tab === 'values') return renderValues(body);
  if (S.tab === 'flow') return renderFlowTab(body);
  if (S.tab === 'bind') {
    body.innerHTML = '<div class="empty">载入绑定表…</div>';
    return renderBindings(body).catch((e) => { body.innerHTML = `<div class="empty">${esc(e.message)}</div>`; });
  }
  if (S.sel < 0 || !S.model?.steps?.[S.sel]) {
    body.innerHTML = '<div class="empty">选一个步骤，或从上面添加。</div>';
    return;
  }
  body.innerHTML = stepEditor(S.model.steps[S.sel]);
}

function input(p, label, val, opts = {}) {
  return `<div class="field"><label>${label}</label>
    <input type="text" data-p="${p}" value="${esc(val ?? '')}" ${opts.list ? `list="${opts.list}"` : ''}
      placeholder="${esc(opts.ph || '')}">${opts.hint ? `<div class="hint">${opts.hint}</div>` : ''}</div>`;
}

function stepEditor(s) {
  const isExternal = S.model.mode === 'external';
  const targetable = ['click', 'fill', 'select', 'check', 'chooseRow', 'press', 'capture'].includes(s.do);
  let h = '';
  h += `<div class="row2">
    <div class="field"><label>row 手顺行号</label><input type="number" data-p="row" value="${esc(s.row)}"></div>
    <div class="field"><label>do 原语</label><select data-p="do">${allPrims().map((k) =>
      `<option ${k === s.do ? 'selected' : ''}>${k}</option>`).join('')}</select></div>
  </div>`;
  if (!isExternal) h += input('on', 'on 执行前画面', s.on, { list: 'screenList' });
  h += `<div class="field"><label>note 备注</label><textarea data-p="note">${esc(s.note || '')}</textarea></div>`;

  if (targetable) {
    h += `<div class="section-title">控件</div>`;
    h += input('target.label', '标签（字典里的日文标签）', s.target?.label, { list: 'labelList', hint: '<span id="dictHint"></span>' });
    if (s.do === 'chooseRow') h += input('target.anchor', 'anchor 行文字（T3）', s.target?.anchor);
    if (s.do === 'chooseRow' || s.do === 'click') h += input('target.qualifier', 'qualifier（同名按钮时）', s.target?.qualifier);
    if (s.do === 'capture') h += `<div class="field"><label>of</label><select data-p="of">${['viewport', 'fullpage', 'element', 'popup', 'all', 'dom']
      .map((k) => `<option ${k === s.of ? 'selected' : ''}>${k}</option>`).join('')}</select></div>`;
    if (s.do === 'capture') h += input('name', '证据名', s.name);
  }
  if (['fill', 'select'].includes(s.do)) h += input('value', 'value 填写值', s.value, { ph: '${case.証券番号} / 字面值' });
  if (s.do === 'check') h += `<div class="field"><label>value（true/false）</label><select data-p="value.bool">
    <option value="true" ${s.value === true ? 'selected' : ''}>true</option>
    <option value="false" ${s.value === false ? 'selected' : ''}>false</option></select></div>`;
  if (s.do === 'fillAll') {
    h += `<div class="section-title">填充项 use</div>
      <div class="hint">每行一个：<code>标签</code> 或 <code>标签 = ${'${case.x}'}</code></div>
      <textarea data-json="use" rows="5">${esc((s.use || []).map((u) =>
        typeof u === 'string' ? u : `${u.label} = ${u.value}`).join('\n'))}</textarea>`;
  }
  if (s.do === 'press') h += input('key', 'key', s.key, { ph: 'Enter' });
  if (s.do === 'goto') {
    h += input('url', 'url', s.url); h += input('reason', 'reason（必填）', s.reason);
  }
  if (s.do === 'waitUntil') h += input('waitFor', '条件', s.waitFor, { ph: 'screenIs(画面名) / selector(#id) / idle' });

  h += `<div class="section-title">证据 / 属性</div>
    <div class="row2">
      <div class="field"><label>evidence 证据类型</label><input type="text" data-p="evidence" value="${esc(s.evidence || '')}" placeholder="画面HC"></div>
      <div class="field"><label>popup</label><label class="hint"><input type="checkbox" data-p="popup" data-bool="1" ${s.popup ? 'checked' : ''}> 在弹窗里执行</label></div>
    </div>`;

  if (ASSERTS.has(s.do) || ACTIONS.has(s.do)) {
    h += `<div class="section-title">期望 expect</div>`;
    if (s.do === 'screenIs' || s.do === 'click' || s.do === 'chooseRow') {
      h += input('expect.screen', '画面', s.expect?.screen, { list: 'screenList', ph: '执行后应该在的画面' });
    }
    if (['fieldIs', 'screenIs'].includes(s.do)) h += fieldsEditor(s);
    if (s.do === 'rowsAtLeast') h += `<div class="field"><label>最少行数</label>
      <input type="number" data-p="expect.rows.min" value="${esc(s.expect?.rows?.min ?? s.min ?? 1)}"></div>`;
    if (s.do === 'messageIs') h += input('expect.message.code', '报文代码', s.expect?.message?.code, { ph: 'MAYG901I001' });
    if (s.do === 'downloadIs') {
      h += input('expect.download.ext', '扩展名', s.expect?.download?.ext, { ph: 'pdf' });
      h += input('expect.download.name', '文件名包含', s.expect?.download?.name);
    }
    if (s.do === 'externalIs') {
      h += input('expect.external.type', '外部类型', s.expect?.external?.type, { ph: 'APログ / DBダンプ' });
      h += input('expect.external.note', '确认内容', s.expect?.external?.note);
    }
    if (s.do !== 'externalIs') h += refEditor(s);
  }

  h += `<details><summary>高级：requires / 步骤 JSON</summary>
    <div class="field"><label>requires（JSON 数组）</label><textarea data-json="requires" rows="3">${esc(s.requires ? JSON.stringify(s.requires, null, 1) : '')}</textarea></div>
    <div class="field"><label>整个步骤 JSON（直接改）</label><textarea data-json="step" rows="12">${esc(JSON.stringify(s, null, 1))}</textarea></div>
  </details>`;
  return h;
}

function allPrims() {
  return PRIMS.flatMap((g) => g.items.map(([k]) => k));
}

function fieldsEditor(s) {
  const fields = s.expect?.fields || [];
  return `<div class="field"><label>字段断言</label>
    ${fields.map((f, i) => `<div class="list-row">
      <input type="text" data-f="${i}" data-k="label" value="${esc(f.label || '')}" placeholder="标签">
      <input type="text" data-f="${i}" data-k="equals" value="${esc(f.equals ?? '')}" placeholder="equals">
      <input type="text" data-f="${i}" data-k="contains" value="${esc(f.contains ?? '')}" placeholder="contains">
      <button data-act="field-del" data-i="${i}">✕</button>
    </div>`).join('')}
    <button class="add" data-act="field-add">+ 字段</button></div>`;
}

function refEditor(s) {
  const r = s.expect?.ref || {};
  return `<div class="field"><label>别紙引用（未解析时保持 pending）</label>
    <div class="row3">
      <input type="text" data-p="expect.ref.appendix" value="${esc(r.appendix || '')}" placeholder="表示内容１">
      <select data-p="expect.ref.status">
        <option value="unresolved" ${r.status !== 'resolved' ? 'selected' : ''}>unresolved</option>
        <option value="resolved" ${r.status === 'resolved' ? 'selected' : ''}>resolved</option>
      </select>
      <span></span>
    </div>
    <input type="text" data-p="expect.ref.note" value="${esc(r.note || '')}" placeholder="为什么还不能验证" style="margin-top:5px;width:100%">
  </div>`;
}

function renderValues(body) {
  const vals = S.model.values || {};
  const rows = Object.entries(vals).map(([k, v]) => {
    const o = (v && typeof v === 'object') ? v : { value: v, source: 'literal' };
    return `<div class="value-row" data-key="${esc(k)}">
      <input type="text" data-v="key" value="${esc(k)}" title="标签">
      <input type="text" data-v="value" value="${esc(o.value ?? '')}" title="值">
      <select data-v="source">${['literal', 'env', 'case', 'sys', 'prev', 'blank', 'human', 'auto']
        .map((x) => `<option ${x === (o.source || 'literal') ? 'selected' : ''}>${x}</option>`).join('')}</select>
      <input type="number" data-v="row" value="${esc(o.row ?? '')}" title="别紙 row">
      <input type="text" data-v="note" value="${esc(o.note ?? '')}" title="备注">
      <button class="del" data-act="val-del">✕</button>
    </div>`;
  }).join('');
  body.innerHTML = `<div class="value-head value-row"><span>标签</span><span>值</span><span>source</span><span>row</span><span>note</span><span></span></div>
    ${rows}
    <button class="add" data-act="val-add">+ 数据项</button>
    <div class="hint" style="margin-top:10px">case/env/sys 的值必须写 source 和 row；环境值不要复制进本，放 flows/env。</div>`;
  bindValues();
}

function bindValues() {
  $$('#propBody .value-row[data-key]').forEach((row) => {
    row.querySelectorAll('[data-v]').forEach((el) => {
      el.oninput = el.onchange = () => {
        const k = el.dataset.v;
        const vals = S.model.values || (S.model.values = {});
        const key = row.dataset.key;
        let cur = vals[key];
        if (cur == null || typeof cur !== 'object') cur = { value: cur, source: 'literal' };
        if (k === 'key') {
          const nk = el.value.trim();
          if (!nk || nk === key) return;
          vals[nk] = cur;
          delete vals[key];
          row.dataset.key = nk;
        } else if (k === 'row') {
          if (el.value === '') delete cur.row; else cur.row = Number(el.value);
        } else {
          cur[k] = el.value;
        }
        markDirty();
      };
    });
    row.querySelector('[data-act=val-del]').onclick = () => {
      delete S.model.values[row.dataset.key];
      markDirty();
      renderProps();
    };
  });
  const add = $('#propBody [data-act=val-add]');
  if (add) add.onclick = () => {
    S.model.values = S.model.values || {};
    let i = 1;
    while (S.model.values['新数据' + i]) i++;
    S.model.values['新数据' + i] = { value: '', source: 'literal' };
    markDirty();
    renderProps();
  };
}

function renderFlowTab(body) {
  const m = S.model;
  body.innerHTML = `
    <div class="field"><label>case</label><input type="text" data-p="case" value="${esc(m.case || '')}"></div>
    <div class="field"><label>title</label><input type="text" data-p="title" value="${esc(m.title || '')}"></div>
    <div class="row2">
      <div class="field"><label>user</label><input type="text" data-p="user" value="${esc(m.user || '')}"></div>
      <div class="field"><label>env</label><input type="text" data-p="env" value="${esc(m.env || '')}"></div>
    </div>
    <div class="field"><label>pointCheck</label><input type="text" data-p="pointCheck" value="${esc(m.pointCheck || '')}"></div>
    <div class="row2">
      <div class="field"><label>evidencePolicy</label><select data-p="evidencePolicy">${['required', 'all', 'failures', 'none']
        .map((x) => `<option ${x === (m.evidencePolicy || 'required') ? 'selected' : ''}>${x}</option>`).join('')}</select></div>
      <div class="field"><label>mode</label><select data-p="mode">
        <option value="" ${!m.mode ? 'selected' : ''}>browser</option>
        <option value="external" ${m.mode === 'external' ? 'selected' : ''}>external（无画面）</option>
      </select></div>
    </div>
    <div class="section-title">起始画面</div>
    <div class="field"><label>screen</label><input type="text" data-p="start.screen" value="${esc(m.start?.screen || '')}" list="screenList"></div>
    <div class="field"><label>url</label><input type="text" data-p="start.url" value="${esc(m.start?.url || '')}" placeholder="/AMB/AMA01.html"></div>
    <div class="hint">换一本本通常只改这里和「数据」页。</div>`;
}

// ── property events ──────────────────────────────────────────────────
$('#propBody').addEventListener('input', onProp);
$('#propBody').addEventListener('change', onProp);

function onProp(e) {
  const el = e.target;
  if (!S.model) return;
  if (el.dataset.json) return onJsonEdit(el);
  if (el.dataset.f !== undefined) return onFieldEdit(el);
  if (!el.dataset.p) return;
  const path = el.dataset.p;
  let v;
  if (el.dataset.bool) v = el.checked;
  else if (path === 'value.bool') v = el.value === 'true';
  else if (el.type === 'number') v = el.value === '' ? '' : Number(el.value);
  else v = el.value;

  const s = S.model.steps[S.sel];
  if (!s) return;
  if (path === 'value.bool') setByPath(s, 'value', v);
  else setByPath(s, path, v);
  if (v === '') delByPath(s, path); // keep YAML clean

  markDirty();
  if (path === 'do') { renderProps(); loadLabels(); }
  if (path === 'on') loadLabels();
  renderSteps();
}

function onJsonEdit(el) {
  const s = S.model.steps[S.sel];
  try {
    if (el.dataset.json === 'step') {
      const v = JSON.parse(el.value);
      S.model.steps[S.sel] = v;
      renderSteps(); renderProps(); markDirty();
      return;
    }
    if (el.dataset.json === 'requires') {
      if (!el.value.trim()) delete s.requires; else s.requires = JSON.parse(el.value);
    }
    if (el.dataset.json === 'use') {
      if (!el.value.trim()) delete s.use;
      else {
        s.use = el.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => {
          const i = line.indexOf('=');
          if (i < 0) return line;
          return { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
        });
      }
    }
    markDirty();
    renderSteps();
  } catch (err) {
    toast('JSON 格式错误: ' + err.message, true);
  }
}

function onFieldEdit(el) {
  const s = S.model.steps[S.sel];
  s.expect = s.expect || {};
  s.expect.fields = s.expect.fields || [];
  const i = Number(el.dataset.f);
  const k = el.dataset.k;
  s.expect.fields[i] = s.expect.fields[i] || {};
  if (el.value === '') delete s.expect.fields[i][k];
  else s.expect.fields[i][k] = el.value;
  markDirty();
  renderSteps();
}

$('#propBody').addEventListener('click', (e) => {
  const b = e.target.closest('button[data-act]');
  if (!b || !S.model?.steps?.[S.sel]) return;
  const s = S.model.steps[S.sel];
  if (b.dataset.act === 'field-add') {
    s.expect = s.expect || {};
    s.expect.fields = s.expect.fields || [];
    s.expect.fields.push({ label: '' });
    markDirty(); renderProps();
  }
  if (b.dataset.act === 'field-del') {
    s.expect.fields.splice(Number(b.dataset.i), 1);
    markDirty(); renderProps();
  }
});

// ── tabs ─────────────────────────────────────────────────────────────
$$('#propTabs button').forEach((b) => b.onclick = () => {
  S.tab = b.dataset.tab;
  $$('#propTabs button').forEach((x) => x.classList.toggle('on', x === b));
  renderProps();
});
$$('#consoleTabs button').forEach((b) => b.onclick = () => {
  S.ct = b.dataset.ctab;
  $$('#consoleTabs button').forEach((x) => x.classList.toggle('on', x === b));
  showConsole();
});

function showConsole() {
  $('#log').hidden = S.ct !== 'log';
  $('#evidence').style.display = S.ct === 'evidence' ? 'grid' : 'none';
  $('#checkOut').hidden = S.ct !== 'check';
}

// ── YAML source view ─────────────────────────────────────────────────
// Two writers exist for the same file and they must never diverge:
//   · the step list edits S.model, and /api/flow/save re-serializes it
//     (comments are replaced — that is why that route says so in a header)
//   · this pane edits the bytes, and /api/flow/save-raw writes them back as-is
// So while the pane is open the step editor is closed, and opening the pane
// with unsaved list edits first asks to save them.
// The textarea holds LF whatever the file used; compare the same way, or a
// CRLF file reads as "changed" the moment it is opened.
const lf = (t) => String(t ?? '').replace(/\r\n/g, '\n');

function yamlDirty() {
  return S.yamlOpen && S.raw !== null && lf($('#ypText').value) !== lf(S.raw);
}

function yamlStats(text) {
  const lines = text.split('\n').length;
  return `${lines} 行 · ${new Blob([text]).size} B`;
}

function loadYaml() {
  const text = S.raw ?? '';
  const t = $('#ypText');
  t.value = text;
  // Setting .value moves the caret to the end, so the pane would open scrolled
  // to the last line of a 245-line file.
  t.scrollTop = 0;
  t.selectionStart = t.selectionEnd = 0;
  $('#ypTitle').textContent = 'YAML 原文 — ' + (S.name || '');
  $('#ypState').textContent = yamlStats(text);
  $('#ypFoot').classList.remove('err');
  $('#ypFoot').textContent = '改完按「写入磁盘」或 Ctrl+S。写盘前会解析一次，语法错会指出行号并且不写。原文备份在 flows/.backup/。';
}

async function setYamlOpen(open) {
  if (open) {
    if (!S.name) return;
    if (S.dirty) {
      if (!confirm('步骤列表里有未保存的修改，YAML 原文里看不到它们。先保存列表（会重写 YAML、丢掉手写注释）再打开原文？')) return;
      await save();
      const { model, raw } = await api('/api/flow?name=' + encodeURIComponent(S.name));
      S.model = model; S.raw = raw;
    }
    // Re-read the bytes: the step editor may have saved since the last view,
    // and a stale textarea would silently write back the old file.
    const { raw } = await api('/api/flow?name=' + encodeURIComponent(S.name));
    S.raw = raw;
    loadYaml();
    S.yamlOpen = true;
    $('#yamlPane').hidden = false;
    $('#canvasBody').classList.add('yamlMode');
    $('#canvas').classList.add('yamlMode');
    renderProps();
    $('#ypText').focus();
    return;
  }
  if (yamlDirty() && !confirm('YAML 原文有未写入的修改，关闭就丢了。关闭？')) return;
  S.yamlOpen = false;
  $('#yamlPane').hidden = true;
  $('#canvasBody').classList.remove('yamlMode');
  $('#canvas').classList.remove('yamlMode');
  // saveYaml() already refreshed S.model from the re-parsed text, so the step
  // list is current unless the edits were abandoned (then the file never moved).
  renderSteps();
  renderProps();
}

async function saveYaml() {
  if (!S.name) return;
  const raw = $('#ypText').value;
  try {
    const r = await api('/api/flow/save-raw', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: S.name, raw }),
    });
    S.raw = raw;
    if (r.model) S.model = r.model;
    S.dirty = false;
    $('#dirty').hidden = true;
    // The pane's text is LF; r.bytes is what actually landed on disk.
    $('#ypState').textContent = `${raw.split('\n').length} 行 · ${r.bytes} B`;
    $('#ypFoot').classList.remove('err');
    $('#ypFoot').textContent = r.backup ? `已写入。原文备份 ${r.backup}` : '与磁盘一致，没有改动。';
    renderSteps();
    loadFlows();
    toast(r.backup ? '已写入 ' + raw.split('\n').length + ' 行' : '没有改动');
  } catch (e) {
    $('#ypFoot').classList.add('err');
    $('#ypFoot').textContent = '没有写盘：' + e.message;
    toast('没有写盘：' + e.message, true);
  }
}

$('#btnYaml').onclick = () => setYamlOpen(!S.yamlOpen);
$('#ypClose').onclick = () => setYamlOpen(false);
$('#ypSave').onclick = saveYaml;
$('#ypReload').onclick = () => {
  if (yamlDirty() && !confirm('放弃当前编辑，重新从磁盘读？')) return;
  loadYaml();
};
$('#ypText').addEventListener('input', () => {
  $('#ypState').textContent = yamlStats($('#ypText').value) + (yamlDirty() ? ' · 未写入' : '');
});
// Tab inserts two spaces instead of leaving the textarea — the indentation is
// part of the program here, and a jumped focus loses the cursor position.
$('#ypText').addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  e.preventDefault();
  const t = e.target;
  const at = t.selectionStart;
  t.value = t.value.slice(0, at) + '  ' + t.value.slice(t.selectionEnd);
  t.selectionStart = t.selectionEnd = at + 2;
});


// ── toolbar ──────────────────────────────────────────────────────────
$('#flowSelect').onchange = (e) => selectFlow(e.target.value);
$('#btnScreen').onclick = () => setScreenOpen(!S.screenOpen);
$('#spClose').onclick = () => setScreenOpen(false);
$('#btnCheck').onclick = check;
$('#btnSave').onclick = save;
$('#btnRun').onclick = (e) => run(!e.shiftKey);
$('#btnStop').onclick = async () => { await api('/api/run/stop', { method: 'POST' }); toast('已停止'); };
$('#btnRunLive').onclick = () => {
  const base = prompt('真机 base URL（例如 https://sut.example/）');
  if (!base) return;
  const cmd = `node rpa.mjs live ${S.name} --base ${base}`;
  navigator.clipboard?.writeText(cmd).catch(() => {});
  toast('命令已复制，在终端运行（真机要人在场）');
  console.log(cmd);
};

document.addEventListener('keydown', (e) => {
  const inYaml = S.yamlOpen && e.target?.id === 'ypText';
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    if (inYaml) saveYaml(); else save();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); check(); }
});

window.addEventListener('beforeunload', (e) => {
  if (yamlDirty()) { e.preventDefault(); e.returnValue = ''; }
});

async function save() {
  if (!S.name) return;
  try {
    prune(S.model);
    const r = await api('/api/flow/save', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: S.name, model: S.model }),
    });
    S.dirty = false;
    $('#dirty').hidden = true;
    // The file on disk is now a re-serialized version; the pane's copy is stale.
    try { S.raw = (await api('/api/flow?name=' + encodeURIComponent(S.name))).raw; } catch { /* ignore */ }
    toast('已保存（原文备份 ' + r.backup + '）');
    loadFlows();
  } catch (e) { toast('保存失败: ' + e.message, true); }
}

async function check() {
  if (!S.name) return;
  if (yamlDirty()) { toast('YAML 原文还没写盘，检查的是磁盘上的旧版本', true); }
  S.ct = 'check';
  $$('#consoleTabs button').forEach((x) => x.classList.toggle('on', x.dataset.ctab === 'check'));
  showConsole();
  $('#checkOut').textContent = '检查中…';
  try {
    const r = await api('/api/check', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: S.name }),
    });
    $('#checkOut').textContent = r.output;
    toast(r.code === 0 ? '检查通过' : '检查有错误，看输出', r.code !== 0);
  } catch (e) { $('#checkOut').textContent = '检查失败: ' + e.message; }
}

async function run(headed) {
  if (!S.name || S.running) return;
  if (yamlDirty() && confirm('YAML 原文有未写入的修改，运行的是磁盘上的版本。先写盘吗？（取消=不写直接跑）')) await saveYaml();
  if (S.dirty && confirm('有未保存修改，运行的是磁盘上的版本。先保存吗？（取消=不保存直接跑）')) await save();
  S.running = true;
  $('#btnRun').hidden = true;
  $('#btnStop').hidden = false;
  $('#runState').textContent = '运行中…';
  S.ct = 'log';
  $$('#consoleTabs button').forEach((x) => x.classList.toggle('on', x.dataset.ctab === 'log'));
  showConsole();
  $('#log').textContent = '';
  try {
    await api('/api/run', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: S.name, headed }),
    });
    poll();
  } catch (e) {
    toast(e.message, true);
    finishRun();
  }
}

function poll() {
  clearInterval(S.poll);
  S.poll = setInterval(async () => {
    try {
      const r = await api('/api/run');
      renderLog(r.output || []);
      if (r.summary) {
        $('#runState').innerHTML = `<span class="summary"><span class="d">done <b>${r.summary.done}</b></span>
          <span class="p">pending <b>${r.summary.pending}</b></span>
          <span class="f">failed <b>${r.summary.failed}</b></span></span>`;
      }
      if (!r.running) {
        clearInterval(S.poll);
        finishRun();
        loadEvidence();
      }
    } catch { /* keep polling */ }
  }, 500);
}

function finishRun() {
  S.running = false;
  $('#btnRun').hidden = false;
  $('#btnStop').hidden = true;
  if (!$('#runState').innerHTML.includes('summary')) $('#runState').textContent = '结束';
}

function renderLog(lines) {
  const atBottom = $('#consoleBody').scrollTop + $('#consoleBody').clientHeight >= $('#consoleBody').scrollHeight - 20;
  $('#log').innerHTML = lines.map((l) => {
    let c = '';
    if (/^X /.test(l)) c = 'err';
    else if (/PENDING/.test(l)) c = 'pend';
    else if (/\bOK\b/.test(l)) c = 'ok';
    else if (/^--|^log:|^done /.test(l)) c = 'dim';
    return `<span class="${c}">${esc(l)}</span>`;
  }).join('\n');
  if (atBottom) $('#consoleBody').scrollTop = $('#consoleBody').scrollHeight;
}

async function loadEvidence() {
  if (!S.name) return;
  const { files } = await api('/api/evidence?name=' + encodeURIComponent(S.name));
  $('#evidence').innerHTML = files.map((f) => `
    <div class="shot">
      <a href="${f.url}" target="_blank"><img src="${f.url}" loading="lazy" alt=""></a>
      <div class="cap">r${f.row ?? '?'} · ${esc(f.file.replace(/^\d+_/, '').replace(/\.png$/, ''))}</div>
    </div>`).join('') || '<div class="empty">还没有截图。运行一次就有了。</div>';
}

async function loadLastRun() {
  try {
    const r = await api('/api/run');
    if (r.name !== S.name) return;
    renderLog(r.output || []);
    if (r.summary) {
      $('#runState').innerHTML = `<span class="summary"><span class="d">done <b>${r.summary.done}</b></span>
        <span class="p">pending <b>${r.summary.pending}</b></span>
        <span class="f">failed <b>${r.summary.failed}</b></span></span>`;
    }
  } catch { /* no previous run */ }
}

// ── screen pane + binding review ────────────────────────────────────
// The pane shows the mock rendering of the real screen. The picker script
// inside the iframe reports hover/pick; nothing here executes the flow.
S.screenOpen = false;
S.pendingBind = null;
S.controls = [];
S.bindFilter = { status: 'needs-human', q: '' };

function setScreenOpen(open) {
  S.screenOpen = open;
  $('#screenPane').hidden = !open;
  $('#canvasBody').classList.toggle('withScreen', open);
  if (open) syncScreen();
}

function syncScreen() {
  if (!S.screenOpen) return;
  const s = S.model?.steps?.[S.sel];
  loadScreen(s?.on || '');
}

let screenToken = 0;
async function loadScreen(name) {
  const token = ++screenToken;
  if (!name) {
    $('#spTitle').textContent = '画面';
    $('#spFrame').src = 'about:blank';
    S.controls = [];
    return;
  }
  const r = await api('/api/controls?screen=' + encodeURIComponent(name));
  if (token !== screenToken) return;
  S.controls = r.controls || [];
  S.screenKey = r.screenKey;
  if (!r.screenKey) {
    $('#spTitle').textContent = name + '（没有前端页面）';
    $('#spFrame').src = 'about:blank';
    return;
  }
  const [app, code] = r.screenKey.split('/');
  $('#spTitle').textContent = `${name} · ${r.screenKey}${r.title ? ' · ' + r.title : ''}`;
  $('#spFrame').src = `/mock/${app}/${code}.html?t=${Date.now()}`;
}

function controlFor(info) {
  if (!info) return null;
  const bySel = S.controls.find((c) => c.selector && c.selector === info.selector);
  if (bySel) return bySel;
  if (info.id) {
    const byId = S.controls.find((c) => c.id && c.id === info.id);
    if (byId) return byId;
  }
  if (info.name) {
    const byName = S.controls.find((c) => c.name && c.name === info.name);
    if (byName) return byName;
  }
  return null;
}

async function onScreenPick(info) {
  const ctl = controlFor(info);
  if (S.pendingBind) {
    const c = ctl || {
      key: info.kind + ':' + (info.id || info.name || info.selector),
      label: info.label || info.text || null,
      kind: info.kind, selector: info.selector, control: null,
    };
    try {
      await api('/api/binding/save', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: S.pendingBind.id,
          control: {
            control: c.key || c.control,
            selector: c.selector || info.selector,
            kind: c.kind || info.kind,
            label: c.label || info.label,
          },
        }),
      });
      toast(`已确认：${S.pendingBind.phrase} → ${(c.label || c.selector)}`);
      const done = S.pendingBind.id;
      S.pendingBind = null;
      await renderBindings($('#propBody'), done);
    } catch (e) { toast(e.message, true); }
    return;
  }
  // Step editing: a control becomes the step's target by its label.
  const s = S.model?.steps?.[S.sel];
  if (!s) { toast('先选一个步骤', true); return; }
  const label = ctl?.label || info.label;
  if (!label) {
    toast('这个控件没有标签，流程里不能用位置引用；请先在「绑定」里确认它', true);
    return;
  }
  s.target = { ...(s.target || {}), label };
  markDirty();
  renderSteps();
  renderProps();
  toast(`步骤 r${s.row} → ${label}`);
}

window.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.source !== 'rpa-picker') return;
  if (d.type === 'hover') {
    $('#spHint').textContent = d.selector
      ? `${d.label || d.text || ''}  ${d.selector}`
      : '悬停高亮控件，点击选中';
    return;
  }
  if (d.type === 'ready') {
    if (S.pendingBind) highlightCandidates(S.pendingBind);
    return;
  }
  if (d.type === 'pick') onScreenPick(d);
});

function highlightCandidates(rule) {
  // '@dialog:...' is a pseudo-control, not a CSS selector; posting it would
  // make querySelector throw inside the frame.
  const cands = (rule.candidates || [])
    .map((c) => c.selector)
    .filter((s) => s && !s.startsWith('@'));
  if (!cands.length) return;
  const f = $('#spFrame');
  const w = f.contentWindow;
  if (!w) return;
  for (const sel of cands.slice(0, 3)) {
    try { w.postMessage({ source: 'rpa-studio', type: 'highlight', selector: sel }, '*'); } catch { /* not ready */ }
  }
}

async function showRule(rule) {
  if (!rule) return;
  setScreenOpen(true);
  if (!rule.screen) {
    screenToken++;
    $('#spTitle').textContent = '该措辞没有画面（手顺缺 遷移 行）';
    $('#spFrame').src = 'about:blank';
    S.controls = [];
    return;
  }
  await loadScreen(rule.screenName || rule.screen);
}

async function renderBindings(body, focusAfterId) {
  const { status, q } = S.bindFilter;
  const data = await api(`/api/bindings?status=${status}&q=${encodeURIComponent(q)}`);
  const c = data.counts || {};
  const rules = data.rules || [];
  if (!S.pendingBind || focusAfterId) {
    const next = rules.find((r) => r.id !== focusAfterId && r.status === 'needs-human') || rules[0];
    S.pendingBind = next || null;
    if (S.pendingBind) await showRule(S.pendingBind);
  }
  body.innerHTML = `
    <div class="row2">
      <div class="field"><label>状态</label><select id="bindStatus">
        ${[['needs-human', '待确认'], ['auto', '自动'], ['confirmed', '已确认'], ['blocked', '画面未识别'], ['rejected', '已排除'], ['all', '全部']]
          .map(([v, t]) => `<option value="${v}" ${v === status ? 'selected' : ''}>${t} (${v === 'all' ? c.total || 0 : c[v] || 0})</option>`).join('')}
      </select></div>
      <div class="field"><label>搜索</label><input id="bindQ" value="${esc(q)}" placeholder="措辞 / 画面"></div>
    </div>
    <div class="hint">共 ${c.total || 0} 条规则；待确认 ${c['needs-human'] || 0} 条。点一条，在左边画面上点控件即可确认。</div>
    <div id="bindDetail"></div>
    <div id="bindList" class="list"></div>`;
  let detail = '';
  if (S.pendingBind) {
    const r = S.pendingBind;
    const lines = [];
    lines.push(`<div class="section-title">当前规则 ${esc(r.id)}</div>`);
    lines.push(`<div class="field"><label>手顺措辞</label><div class="mono">${esc(r.phrase)}</div></div>`);
    lines.push(`<div class="field"><label>画面 / 影响</label><div class="hint">${esc(r.screenName || '(画面未识别)')} · ${esc(r.screen || '')} · ${r.rows} 行 / ${r.books} 本</div></div>`);
    if (r.sample) {
      lines.push(`<div class="field"><label>样例</label><div class="hint">${esc(r.sample.book)} row ${esc(r.sample.row)}: ${esc(r.sample.content || '')}</div></div>`);
    }
    const cands = r.candidates || [];
    if (cands.length) {
      lines.push('<div class="section-title">候选控件（点选用这个）</div>');
      for (let i = 0; i < cands.length; i++) {
        const x = cands[i];
        lines.push(`<div class="list-row"><span class="mono">${esc(x.selector)}</span><span class="hint">${esc(x.kind || '')}</span><button class="add" data-cand="${i}">用这个</button><span></span></div>`);
      }
    } else {
      lines.push('<div class="hint">没有候选：请在左边画面上点目标控件。</div>');
    }
    lines.push('<div class="row2"><button id="bindReject" class="add">排除这条</button><button id="bindSkip" class="add">下一条</button></div>');
    detail = lines.join('');
  }
  $('#bindDetail').innerHTML = detail;

  $('#bindList').innerHTML = rules.map((r) => `
    <div class="bind-row ${r.id === (S.pendingBind?.id) ? 'on' : ''}" data-id="${esc(r.id)}">
      <div class="mono">${esc(r.phrase).slice(0, 46)}</div>
      <div class="hint">${esc(r.screenName || r.screen || '画面未识别')} · ${r.rows} 行 · ${r.books} 本 · ${esc(r.type)}</div>
    </div>`).join('') || '<div class="empty">没有符合的规则。</div>';

  $('#bindStatus').onchange = (e) => { S.bindFilter.status = e.target.value; S.pendingBind = null; renderBindings(body); };
  $('#bindQ').oninput = (e) => {
    S.bindFilter.q = e.target.value;
    clearTimeout(S.bindQTimer);
    S.bindQTimer = setTimeout(() => { S.pendingBind = null; renderBindings(body); }, 250);
  };
  $$('#bindList .bind-row').forEach((el) => el.onclick = async () => {
    S.pendingBind = rules.find((r) => r.id === el.dataset.id) || null;
    if (S.pendingBind) await showRule(S.pendingBind);
    renderBindings(body);
  });
  $$('#bindDetail [data-cand]').forEach((b) => b.onclick = async () => {
    const cand = S.pendingBind?.candidates?.[Number(b.dataset.cand)];
    if (!cand) return;
    await api('/api/binding/save', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: S.pendingBind.id, control: cand }),
    });
    toast('已确认：' + S.pendingBind.phrase);
    S.pendingBind = null;
    renderBindings(body);
  });
  const reject = $('#bindReject');
  if (reject) reject.onclick = async () => {
    if (!S.pendingBind) return;
    await api('/api/binding/auto', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: S.pendingBind.id, status: 'rejected' }),
    });
    S.pendingBind = null;
    renderBindings(body);
  };
  const skip = $('#bindSkip');
  if (skip) skip.onclick = () => {
    const rs = rules.filter((r) => r.status === 'needs-human');
    const i = rs.findIndex((r) => r.id === S.pendingBind?.id);
    S.pendingBind = rs[(i + 1) % Math.max(rs.length, 1)] || null;
    if (S.pendingBind) showRule(S.pendingBind);
    renderBindings(body);
  };
}

// ── boot ─────────────────────────────────────────────────────────────
(async function init() {
  renderPalette();
  $('#flowFilter').oninput = renderFlowList;
  $('#steps').innerHTML = '<div class="empty">加载中…</div>';
  try {
    const { screens } = await api('/api/screens');
    S.screens = screens;
    $('#screenList').innerHTML = screens.map((s) => `<option value="${esc(s)}">`).join('');
    await loadFlows();
    const saved = localStorage.getItem('rpa.flow');
    const pick = S.flows.some((f) => f.name === saved) ? saved : S.flows[0]?.name;
    if (pick) await selectFlow(pick);
    else $('#steps').innerHTML = '<div class="empty">flows/ 里还没有本。</div>';
  } catch (e) {
    $('#steps').innerHTML = `<div class="empty">连不上 Studio API：${esc(e.message)}</div>`;
  }
})();
