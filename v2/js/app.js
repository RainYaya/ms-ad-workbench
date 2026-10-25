/* 結合試験ワークベンチ — vanilla JS, offline-first */
(() => {
  'use strict';

  const DATA = window.MSAD_INDEX || { meta: {}, categories: [], scenarios: [], routes: [], caseIndex: {} };
  const REFS = window.MSAD_REFS || {};
  const VALID = window.MSAD_VALIDATION || { counts: {}, warnings: {} };
  const AUTO = window.MSAD_AUTOMATION || { summary: {}, blocks: [], cases: {}, runners: { runners: [] } };
  const SUMMARY = window.MSAD_SUMMARIES || { tpl: {}, caseToTpl: {} };
  const RDEFS = window.MSAD_RUNNER_DEFS || { blocks: {}, params: {}, compositions: {} };
  const SCHEDULE = window.MSAD_SCHEDULE || { cases: {} };
  const LS = {
    progress: 'msad.progress.v1',
    tasks: 'msad.tasks.v1',
    automation: 'msad.automation.v1',
    ui: 'msad.ui.v1',
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nl2br = (v) => esc(v).replace(/\n/g, '<br>');
  const fmt = (n) => (n == null || Number.isNaN(n) ? '—' : Number(n).toLocaleString('ja-JP'));
  const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);

  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('localStorage', e); }
  }

  const state = {
    view: 'dashboard',
    selectedCase: null,
    selectedScenario: null,
    selectedRoute: null,
    drawerCase: null,
    drawerNav: null,
    tab: 'procedure',
    refTab: 'status',
    appendixSheet: {},
    appendixView: 'compact',
    query: '',
    manualFilter: 'all',
    manualQuery: '',
    filters: { domain: '', category: '', company: '', status: '', assigned: false, missing: false, old: false, route: false, manual: false, manualOp: false, autoOnly: false, evMissing: false },
    progress: load(LS.progress, {}),
    tasks: load(LS.tasks, { ids: [], importedAt: '' }),
    automation: load(LS.automation, {}),
    caseCache: {},
    caseLoading: {},
    scenarioOpen: {},
    categoryOpen: {},
  };
  let taskSet = new Set(state.tasks.ids || []);
  let searchTimer = null;

  const caseById = new Map(Object.entries(DATA.caseIndex || {}));
  const scenarioById = new Map((DATA.scenarios || []).map((s) => [s.id, s]));
  const categoryById = new Map((DATA.categories || []).map((c) => [c.id, c]));
  const routeById = new Map((DATA.routes || []).map((r) => [r.id, r]));
  const casesByScenario = new Map();
  const casesByCategory = new Map();
  for (const c of caseById.values()) {
    if (!casesByScenario.has(c.scenarioId)) casesByScenario.set(c.scenarioId, []);
    casesByScenario.get(c.scenarioId).push(c);
    if (!casesByCategory.has(c.categoryId)) casesByCategory.set(c.categoryId, []);
    casesByCategory.get(c.categoryId).push(c);
  }
  for (const arr of casesByScenario.values()) arr.sort((a, b) => a.id.localeCompare(b.id));
  for (const arr of casesByCategory.values()) arr.sort((a, b) => a.id.localeCompare(b.id));

  const caseUserMap = new Map();
  for (const rt of DATA.routes || []) {
    for (const p of rt.patterns || []) {
      for (const st of p.steps || []) {
        if (st.caseId && st.user) caseUserMap.set(st.caseId, st.user);
      }
    }
    for (const st of rt.slots || []) {
      if (!st.user) continue;
      if (st.caseId) caseUserMap.set(st.caseId, st.user);
      else {
        for (const c of casesByScenario.get(st.scenarioId) || []) {
          if (caseFitsRoute(c, rt)) caseUserMap.set(c.id, st.user);
        }
      }
    }
  }

  const STATUS = {
    NOT_STARTED: { label: '未実施', cls: 'gray', dot: 'not' },
    IN_PROGRESS: { label: '実施中', cls: 'blue', dot: 'prog' },
    DONE: { label: '実施完了', cls: 'green', dot: 'done' },
    VERIFIED: { label: '検証完了', cls: 'violet', dot: 'verify' },
    BLOCKED: { label: '不可', cls: 'red', dot: 'blocked' },
  };

  const EVIDENCE = window.MSAD_EVIDENCE || {};
  function evcase(id) { return EVIDENCE[id] || { summary: {}, rows: {}, manualSteps: [] }; }
  function evsum(id) { return evcase(id).summary || {}; }
  function manualCount(id) { return (evcase(id).manualSteps || []).length; }
  function manualOpCount(id) { return (evcase(id).manualSteps || []).filter((m) => m.phase === '操作').length; }
  function pget(id) { return state.progress[id] || {}; }
  function caseStatus(id) {
    const p = pget(id);
    if (p.execution === 'BLOCKED') return 'BLOCKED';
    if (p.verify === 'DONE') return 'VERIFIED';
    if (p.execution === 'DONE') return 'DONE';
    if (p.execution === 'IN_PROGRESS') return 'IN_PROGRESS';
    return 'NOT_STARTED';
  }
  function statusBadge(s) {
    const m = STATUS[s] || STATUS.NOT_STARTED;
    return `<span class="badge ${m.cls}"><i class="status-dot ${m.dot}"></i>${m.label}</span>`;
  }
  function resultBadge(p) {
    if (!p || !p.result) return '';
    return p.result === 'NG' ? '<span class="badge red">NG</span>' : '<span class="badge green">OK</span>';
  }
  function companyBadge(co) {
    return `<span class="badge ${co === 'AD' ? 'amber' : 'blue'}">${esc(co || '—')}</span>`;
  }
  function caseBadges(c, p) {
    const out = [];
    if (c.hasWorkflow === false) out.push('<span class="badge red">手順なし</span>');
    if (c.hasAppendix === false) out.push('<span class="badge amber">別紙なし</span>');
    if ((c.appendixDuplicates || []).length) out.push('<span class="badge amber">別紙重複</span>');
    if (c.isOld) out.push('<span class="badge gray">旧版</span>');
    if (c.comparisonMark === '〇') out.push('<span class="badge violet">現新比較</span>');
    const sc = scenarioById.get(c.scenarioId);
    if (sc && sc.hasRoute) out.push('<span class="badge green">ルート</span>');
    const user = caseUserMap.get(c.id);
    if (user) out.push(`<span class="badge blue">${esc(user.id || '')}${user.point ? ` / ${esc(user.point)}` : ''}</span>`);
    if (p && p.result === 'NG') out.push('<span class="badge red">NG</span>');
    if (taskSet.has(c.id)) out.push('<span class="badge green">自分のタスク</span>');
    return out.join(' ');
  }

  function rollup(ids) {
    const r = { total: ids.length, notStarted: 0, inProgress: 0, done: 0, verified: 0, blocked: 0, ng: 0, missing: 0, old: 0, assigned: 0 };
    for (const id of ids) {
      const s = caseStatus(id);
      if (s === 'VERIFIED') r.verified++;
      else if (s === 'DONE') r.done++;
      else if (s === 'IN_PROGRESS') r.inProgress++;
      else if (s === 'BLOCKED') r.blocked++;
      else r.notStarted++;
      const p = pget(id);
      if (p.result === 'NG') r.ng++;
      const c = caseById.get(id);
      if (c) {
        if (c.hasAppendix === false || c.hasWorkflow === false) r.missing++;
        if (c.isOld) r.old++;
        if (taskSet.has(id)) r.assigned++;
      }
    }
    r.executed = r.done + r.verified;
    return r;
  }

  function toast(msg, ms = 2200) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.add('hidden'), ms);
  }

  function download(name, text, type = 'application/json') {
    const blob = new Blob([text], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`load failed: ${src}`));
      document.head.appendChild(s);
    });
  }

  function caseVarName(catId) { return `MSAD_CASES_${catId.replace(/-/g, '_')}`; }
  async function ensureCaseData(catId) {
    if (state.caseCache[catId]) return state.caseCache[catId];
    if (state.caseLoading[catId]) return state.caseLoading[catId];
    const varName = caseVarName(catId);
    state.caseLoading[catId] = (async () => {
      if (!window[varName]) await loadScript(`data/cases/${catId}.js`);
      const data = window[varName] || {};
      state.caseCache[catId] = data;
      delete state.caseLoading[catId];
      return data;
    })();
    return state.caseLoading[catId];
  }

  /* ------------------------------------------------------------------ */
  /* task import                                                         */
  /* ------------------------------------------------------------------ */

  function expandToken(token) {
    const t = String(token || '').trim().toUpperCase().replace(/[，,;；]/g, '');
    if (!t) return [];
    if (/^A[ZY]-\d{3}-\d{2}-\d{3}$/.test(t)) return caseById.has(t) ? [t] : [];
    if (/^A[ZY]-\d{3}-\d{2}$/.test(t)) return (casesByScenario.get(t) || []).map((c) => c.id);
    if (/^A[ZY]-\d{3}$/.test(t)) return (casesByCategory.get(t) || []).map((c) => c.id);
    return [];
  }
  function parseTaskText(text) {
    const tokens = String(text || '').match(/A[ZY]-\d{3}(?:-\d{2})?(?:-\d{3})?/gi) || [];
    const ids = new Set();
    const unknown = new Set();
    for (const tok of tokens) {
      const got = expandToken(tok);
      if (!got.length) unknown.add(tok.toUpperCase());
      got.forEach((id) => ids.add(id));
    }
    return { ids: [...ids], unknown: [...unknown] };
  }
  function importTasks(text) {
    const { ids, unknown } = parseTaskText(text);
    if (!ids.length) {
      toast('ID が見つかりません。例: AZ-110-01-001 / AZ-110-01 / AZ-110');
      return;
    }
    for (const id of ids) taskSet.add(id);
    state.tasks = { ids: [...taskSet], importedAt: new Date().toISOString() };
    save(LS.tasks, state.tasks);
    toast(`${ids.length} 件をタスクに追加しました${unknown.length ? `（未解決 ${unknown.length}）` : ''}`);
    if (state.view === 'tasks') render();
  }
  function clearTasks() {
    taskSet = new Set();
    state.tasks = { ids: [], importedAt: '' };
    save(LS.tasks, state.tasks);
    toast('タスクをクリアしました');
    render();
  }

  /* ------------------------------------------------------------------ */
  /* routing                                                             */
  /* ------------------------------------------------------------------ */

  function go(view, id) {
    if (state.drawerCase) closeCaseDrawer();
    const h = `#/${view}${id ? `/${encodeURIComponent(id)}` : ''}`;
    if (location.hash === h) { applyRoute(); return; }
    location.hash = h;
  }
  function applyRoute() {
    if (state.drawerCase) closeCaseDrawer();
    const raw = location.hash.replace(/^#\/?/, '');
    const [view, ...rest] = raw.split('/');
    const id = rest.join('/');
    if (!view) { state.view = 'dashboard'; render(); return; }
    if (view === 'case' && id) { state.view = 'case'; if (state.selectedCase !== id) state.tab = 'procedure'; state.selectedCase = id; renderCase(id); return; }
    if (view === 'scenario' && id) { state.view = 'scenario'; state.selectedScenario = id; renderScenario(id); return; }
    if (view === 'route' && id) { state.view = 'route'; state.selectedRoute = id; renderRoute(id); return; }
    state.view = ['dashboard', 'scenarios', 'routes', 'files', 'tasks', 'schedule', 'refs', 'automation', 'manual'].includes(view) ? view : 'dashboard';
    state.selectedCase = null;
    state.selectedScenario = null;
    state.selectedRoute = null;
    render();
  }

  /* ------------------------------------------------------------------ */
  /* topbar + sidebar                                                    */
  /* ------------------------------------------------------------------ */

  function updateTopbar() {
    const all = [...caseById.keys()];
    const r = rollup(all);
    const assigned = taskSet.size;
    $('#topbarStats').innerHTML = [
      ['総ケース', r.total, ''],
      ['自分のタスク', assigned, ''],
      ['実施済み', r.executed, 'green'],
      ['検証済み', r.verified, 'violet'],
      ['NG', r.ng, 'red'],
      ['データ欠損', r.missing, 'amber'],
    ].map(([label, value, cls]) => `<span class="stat-chip"><i class="status-dot ${cls || 'not'}"></i>${label} <b>${fmt(value)}</b></span>`).join('');
    const crumb = state.view === 'case' ? `ケース / ${state.selectedCase || ''}`
      : state.view === 'scenario' ? `シナリオ / ${state.selectedScenario || ''}`
        : state.view === 'route' ? `実施順序 / ${state.selectedRoute || ''}`
          : ({ dashboard: 'ダッシュボード', scenarios: 'シナリオ一覧', routes: '実施順序', files: 'ファイル', tasks: '自分のタスク', refs: '参考資料', automation: '自動化', manual: '証跡・人工' }[state.view] || 'ダッシュボード');
    $('#breadcrumb').textContent = crumb;
    $$('#nav .nav-item').forEach((b) => b.classList.toggle('active', b.dataset.view === state.view));
    const meta = DATA.meta || {};
    $('#dataMeta').textContent = `${meta.generatedAt || '—'} / シナリオ ${fmt(meta.counts?.scenarios)} / ケース ${fmt(meta.counts?.cases)}`;
  }

  function populateCategoryFilter() {
    const sel = $('#filterCategory');
    const cur = state.filters.category;
    const cats = (DATA.categories || []).filter((c) => !state.filters.domain || c.domain === state.filters.domain);
    sel.innerHTML = `<option value="">すべて</option>` + cats.map((c) => `<option value="${esc(c.id)}">${esc(c.id)} ${esc(c.functionArea || '')}</option>`).join('');
    sel.value = cur || '';
  }

  /* ------------------------------------------------------------------ */
  /* shared render helpers                                               */
  /* ------------------------------------------------------------------ */

  function pageHead(title, sub, actions = '') {
    return `<div class="page-head"><div><h2>${esc(title)}</h2>${sub ? `<p>${esc(sub)}</p>` : ''}</div><div class="actions">${actions}</div></div>`;
  }
  function empty(msg) { return `<div class="empty">${esc(msg)}</div>`; }
  function kpi(label, value, sub, cls = '') {
    const shown = typeof value === 'number' ? fmt(value) : esc(value);
    return `<div class="kpi ${cls}"><div class="label">${esc(label)}</div><div class="value">${shown}</div><div class="sub">${esc(sub || '')}</div></div>`;
  }
  function progressLine(name, value, total, cls = '') {
    const p = pct(value, total);
    return `<div class="progress-line"><span class="name">${esc(name)}</span><span class="bar"><i style="width:${Math.max(0, Math.min(100, p))}%;background:${cls || 'var(--accent)'}"></i></span><span class="num">${value}/${total}（${p}%）</span></div>`;
  }
  function rawTable(rows, opts = {}) {
    if (!rows || !rows.length) return empty('データがありません');
    const maxRows = opts.maxRows || 400;
    const shown = rows.slice(0, maxRows);
    const cols = Math.max(1, ...shown.map((r) => (Array.isArray(r) ? r.length : 0)));
    const head = opts.headerRow ? `<thead><tr><th class="rowno">#</th>${shown[0].map((v, i) => `<th>${esc(v ?? '')}</th>`).join('')}</tr></thead>` : '';
    const body = (opts.headerRow ? shown.slice(1) : shown).map((row, ri) => {
      const cells = Array.from({ length: cols }, (_, i) => (Array.isArray(row) ? row[i] : ''));
      return `<tr><td class="rowno">${ri + 1 + (opts.headerRow ? 1 : 0)}</td>${cells.map((v) => `<td>${esc(v ?? '')}</td>`).join('')}</tr>`;
    }).join('');
    return `<div class="table-scroll" style="max-height:${opts.maxHeight || '62vh'}"><table class="raw">${head}<tbody>${body}</tbody></table></div>${rows.length > maxRows ? `<p class="small muted">先頭 ${maxRows} 行を表示（全 ${rows.length} 行）</p>` : ''}`;
  }
  function statusSelect(id) {
    const p = pget(id);
    return `<select data-field="execution" data-case-id="${esc(id)}">
      ${[['NOT_STARTED', '未実施'], ['IN_PROGRESS', '実施中'], ['DONE', '実施完了'], ['BLOCKED', '不可']].map(([v, l]) => `<option value="${v}" ${(p.execution || 'NOT_STARTED') === v ? 'selected' : ''}>${l}</option>`).join('')}
    </select>`;
  }

  /* ------------------------------------------------------------------ */
  /* dashboard                                                           */
  /* ------------------------------------------------------------------ */

  function renderDashboard() {
    const ids = [...caseById.keys()];
    const r = rollup(ids);
    const catRows = (DATA.categories || []).map((cat) => {
      const cids = (casesByCategory.get(cat.id) || []).map((c) => c.id);
      const cr = rollup(cids);
      return { cat, cr, count: cids.length };
    }).sort((a, b) => a.cat.id.localeCompare(b.cat.id));
    const missing = VALID.warnings?.missingAppendix?.length || 0;
    const missingWf = VALID.warnings?.missingWorkflow?.length || 0;
    const old = VALID.warnings?.old?.length || 0;

    const html = `
      ${pageHead('ダッシュボード', '', `
        <button class="btn primary" data-action="go-tasks">タスクを追加</button>
        <button class="btn" data-action="validation">データチェック</button>`)}
      <div class="kpis">
        ${kpi('総ケース', r.total, `${fmt((DATA.scenarios || []).length)} シナリオ / 旧版 ${r.old} 含む`, 'accent')}
        ${kpi('自分のタスク', taskSet.size, 'インポート済み', 'blue')}
        ${kpi('実施中', r.inProgress, '進行中', 'blue')}
        ${kpi('実施完了', r.executed, '実施済み', 'green')}
        ${kpi('検証完了', r.verified, '検証済み', 'violet')}
        ${kpi('不可', r.blocked, '実施不可', 'red')}
        ${kpi('NG', r.ng, '故障検知', 'amber')}
      </div>
      <div class="grid-2">
        <section class="panel">
          <div class="panel-head"><h3>進捗</h3></div>
          <div class="panel-body">
            ${progressLine('実施率', r.executed, r.total, 'var(--accent)')}
            ${progressLine('検証率', r.verified, r.total, 'var(--violet)')}
            ${progressLine('未実施', r.notStarted, r.total, '#aab4ae')}
            ${progressLine('不可', r.blocked, r.total, 'var(--red)')}
            ${progressLine('自分のタスク実施', r.assigned ? rollup([...taskSet]).executed : 0, taskSet.size, 'var(--blue)')}
          </div>
        </section>
        <section class="panel">
          <div class="panel-head"><h3>データ品質</h3><span class="hint">取り込み時の既知の差分</span></div>
          <div class="panel-body">
            <div class="list">
              <div class="row-card" data-action="validation"><div><p class="title">別紙なし</p></div><div class="right"><span class="badge amber">${missing}</span></div></div>
              <div class="row-card" data-action="validation"><div><p class="title">手順書なし</p></div><div class="right"><span class="badge red">${missingWf}</span></div></div>
              <div class="row-card" data-action="validation"><div><p class="title">旧版・廃止前</p></div><div class="right"><span class="badge gray">${old}</span></div></div>
              <div class="row-card" data-action="validation"><div><p class="title">X とケース数が不一致</p></div><div class="right"><span class="badge violet">${(VALID.warnings?.xMismatch || []).length}</span></div></div>
            </div>
          </div>
        </section>
      </div>
      <section class="panel mt">
        <div class="panel-head"><h3>分類別</h3><span class="hint">クリックでシナリオ一覧へ</span></div>
        <div class="table-wrap">
          <table class="data">
            <thead><tr><th>分類</th><th>領域</th><th>機能</th><th class="num">シナリオ</th><th class="num">ケース</th><th class="num">MS</th><th class="num">AD</th><th class="num">実施</th><th class="num">検証</th><th class="num">NG</th><th class="num">欠損</th><th></th></tr></thead>
            <tbody>${catRows.map(({ cat, cr, count }) => `
              <tr>
                <td><span class="mono">${esc(cat.id)}</span></td>
                <td>${esc(cat.userType || '')}</td>
                <td>${esc(cat.functionArea || '')}</td>
                <td class="num">${fmt((cat.scenarioIds || []).length)}</td>
                <td class="num">${fmt(count)}</td>
                <td class="num">${fmt(cr ? (casesByCategory.get(cat.id) || []).filter((c) => c.company === 'MS').length : 0)}</td>
                <td class="num">${fmt((casesByCategory.get(cat.id) || []).filter((c) => c.company === 'AD').length)}</td>
                <td class="num">${fmt(cr.executed)}</td>
                <td class="num">${fmt(cr.verified)}</td>
                <td class="num">${cr.ng ? `<span class="badge red">${cr.ng}</span>` : '0'}</td>
                <td class="num">${cr.missing ? `<span class="badge amber">${cr.missing}</span>` : '0'}</td>
                <td><button class="link-btn" data-category="${esc(cat.id)}">開く</button></td>
              </tr>`).join('')}</tbody>
          </table>
        </div>
      </section>`;
    $('#main').innerHTML = html;
  }

  /* ------------------------------------------------------------------ */
  /* scenarios                                                           */
  /* ------------------------------------------------------------------ */

  function caseStatusMatches(id, status) {
    const p = pget(id);
    const st = caseStatus(id);
    if (status === 'NG') return p.result === 'NG';
    if (status === 'DONE') return st === 'DONE' || st === 'VERIFIED';
    return st === status;
  }

  function filteredScenarios() {
    const q = state.query.toLowerCase();
    return (DATA.scenarios || []).filter((s) => {
      if (state.filters.domain && s.domain !== state.filters.domain) return false;
      if (state.filters.category && s.categoryId !== state.filters.category) return false;
      if (q && !(`${s.id} ${s.title} ${s.functionArea} ${s.userType} ${s.executionType}`.toLowerCase().includes(q))) return false;
      const ids = (casesByScenario.get(s.id) || []).map((c) => c.id);
      if (state.filters.company && !(casesByScenario.get(s.id) || []).some((c) => c.company === state.filters.company)) return false;
      if (state.filters.status && !ids.some((id) => caseStatusMatches(id, state.filters.status))) return false;
      if (state.filters.route && !s.hasRoute) return false;
      if (state.filters.assigned) {
        const ids = casesByScenario.get(s.id) || [];
        if (!ids.some((c) => taskSet.has(c.id))) return false;
      }
      if (state.filters.missing) {
        const ids = casesByScenario.get(s.id) || [];
        if (!ids.some((c) => c.hasAppendix === false || c.hasWorkflow === false)) return false;
      }
      if (state.filters.manual && !ids.some((id) => manualCount(id) > 0 || evsum(id).manual > 0)) return false;
      if (state.filters.manualOp && !ids.some((id) => manualOpCount(id) > 0)) return false;
      if (state.filters.autoOnly && !ids.every((id) => manualCount(id) === 0 && (evsum(id).manual || 0) === 0)) return false;
      if (state.filters.evMissing && !ids.some((id) => (evsum(id).missing || 0) > 0)) return false;
      return true;
    });
  }

  function renderScenarios() {
    const list = filteredScenarios();
    const groups = new Map();
    for (const s of list) {
      if (!groups.has(s.categoryId)) groups.set(s.categoryId, []);
      groups.get(s.categoryId).push(s);
    }
    const body = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([cid, ss]) => {
      const cat = categoryById.get(cid) || { id: cid };
      return `<details class="tree-group" ${state.query || state.filters.assigned || state.filters.missing || state.filters.route || state.filters.status || state.filters.company || state.filters.manual || state.filters.manualOp || state.filters.autoOnly || state.filters.evMissing ? 'open' : ''}>
        <summary><span class="mono">${esc(cid)}</span> <span>${esc(cat.functionArea || '')}</span> <span class="badge outline">${ss.length} シナリオ</span></summary>
        <div class="tree-body">
          ${ss.map((s) => {
            const ids = (casesByScenario.get(s.id) || []).map((c) => c.id);
            const r = rollup(ids);
            const mc = ids.reduce((n, id) => n + manualCount(id), 0);
            const mo = ids.reduce((n, id) => n + manualOpCount(id), 0);
            const hm = ids.reduce((n, id) => n + (evsum(id).manual || 0), 0);
            const em = ids.reduce((n, id) => n + (evsum(id).missing || 0), 0);
            const chips = [mc ? `<span class="badge amber" title="人工確認/操作の手顺行">人工 ${mc}</span>` : '', mo ? `<span class="badge blue">人工操作 ${mo}</span>` : '', hm ? `<span class="badge violet">HC人工 ${hm}</span>` : '', em ? `<span class="badge red">未取得 ${em}</span>` : ''].filter(Boolean).join(' ');
            return `<div class="row-card" data-scenario="${esc(s.id)}">
              <div class="id">${esc(s.id)}</div>
              <div style="min-width:0;flex:1"><p class="title">${esc(s.title)}</p><div class="meta">${esc(s.userType || '')} / ${esc(s.executionType || '')} / ${esc(s.functionArea || '')}　X=${s.x}　MS ${s.msCount || 0} / AD ${s.adCount || 0}${s.hasRoute ? '　<span class="badge green">実施順序あり</span>' : ''}</div>${chips ? `<div class="chips" style="margin-top:4px">${chips}</div>` : ''}</div>
              <div class="right">${statusBadge(caseStatus(ids.find((id) => pget(id).execution) || ids[0] || ''))}<span class="small muted">${r.executed}/${r.total}</span></div>
            </div>`;
          }).join('')}
        </div>
      </details>`;
    }).join('');
    $('#main').innerHTML = `${pageHead('シナリオ', `${fmt(list.length)} / ${fmt((DATA.scenarios || []).length)}`, `<button class="btn" data-action="go-tasks">タスクを追加</button>`)}
      ${body || empty('条件に合うシナリオがありません')}`;
  }

  function stateRowsTable(rows) {
    if (!rows || !rows.length) return '';
    const keys = [['AQ', '操作/状態'], ['AR', '利用者'], ['AS', '状態'], ['AT', '→'], ['AU', '条件'], ['AV', '点検区分'], ['AW', '期待']];
    return `<div class="table-wrap"><table class="data"><thead><tr><th>行</th>${keys.map(([, l]) => `<th>${l}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr><td class="mono">${r.row}</td>${keys.map(([k]) => `<td>${esc(r[k] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function renderScenario(id) {
    const s = scenarioById.get(id);
    if (!s) { $('#main').innerHTML = empty('シナリオが見つかりません'); return; }
    const ids = (casesByScenario.get(id) || []).map((c) => c.id);
    const r = rollup(ids);
    const routeRefs = (s.routeRefs || []).map((rr) => routeById.get(rr.routeId)).filter(Boolean);
    const flow = (s.steps && s.steps.length ? s.steps : []).map((step) => {
      const rows = step.rows || [];
      return `<li class="tl-item"><span class="tl-dot">${esc(step.step || '•')}</span>
        <div class="tl-body">${rows.map((fr) => {
          const chips = [];
          if (fr.state) chips.push(`<span class="badge violet">${esc(fr.state)}</span>`);
          if (fr.button) chips.push(`<span class="badge blue">${esc(fr.button)}</span>`);
          if (fr.fromStatus) chips.push(`<span class="badge gray">${esc(fr.fromStatus)}</span>`);
          if (fr.condition) chips.push(`<span class="badge outline">${esc(fr.condition)}</span>`);
          if (fr.toStatus) chips.push(`<span class="badge green">${esc(fr.toStatus)}</span>`);
          return `<div><div class="screen">${esc(fr.screen || '')}</div>${fr.check ? `<div class="check">${nl2br(fr.check)}</div>` : ''}${fr.note ? `<div class="note">${nl2br(fr.note)}</div>` : ''}${chips.length ? `<div class="chips">${chips.join(' ')}</div>` : ''}</div>`;
        }).join('')}</div></li>`;
    }).join('');
    const caseRows = (casesByScenario.get(id) || []).map((c) => {
      const p = pget(c.id);
      return `<tr class="case-row-click" data-case="${esc(c.id)}">
        <td><span class="mono">${esc(c.id)}</span></td>
        <td><span class="badge ${c.company === 'AD' ? 'amber' : 'blue'}">${esc(c.company)}</span></td>
        <td>${esc(c.functionName || '')}</td>
        <td>${caseBadges(c, p)}</td>
        <td class="right">${statusBadge(caseStatus(c.id))}</td>
      </tr>`;
    }).join('');
    const patterns = (s.dataPatterns || []).map((d) => `<span class="badge outline">${esc(d.axis ? d.axis + '：' : '')}${esc(d.value)}</span>`).join(' ');
    $('#main').innerHTML = `
      <div class="hero">
        <div class="id">${esc(s.id)}</div>
        <h2>${esc(s.title)}</h2>
        <div class="sub">
          <span class="badge">${esc(s.userType || '')}</span>
          <span class="badge">${esc(s.executionType || '')}</span>
          <span class="badge">${esc(s.functionArea || '')}</span>
          <span class="badge">${esc(s.u || '')} / ${esc(s.v || '')}</span>
          ${routeRefs.length ? `<span class="badge">実施順序 ${routeRefs.length}</span>` : '<span class="badge">独立実施</span>'}
        </div>
        <div class="kpis-inline">
          <div><b>${s.x}</b><span>設計案件数 X</span></div>
          <div><b>${ids.length}</b><span>手順書ケース</span></div>
          <div><b>${s.msCount || 0}</b><span>MS</span></div>
          <div><b>${s.adCount || 0}</b><span>AD</span></div>
          <div><b>${r.executed}</b><span>実施済み</span></div>
          <div><b>${r.verified}</b><span>検証済み</span></div>
        </div>
      </div>
      <div class="grid-2">
        <section class="panel">
          <div class="panel-head"><h3>主要導線</h3><span class="hint">${s.steps?.length || 0} ステップ</span></div>
          <div class="panel-body"><ul class="timeline">${flow || '<li class="muted">導線データなし</li>'}</ul></div>
        </section>
        <div style="display:flex;flex-direction:column;gap:14px">
          <section class="panel">
            <div class="panel-head"><h3>データパターン</h3></div>
            <div class="panel-body">${patterns || '<span class="muted">指定なし</span>'}</div>
          </section>
          <section class="panel">
            <div class="panel-head"><h3>実施順序</h3><span class="hint">${routeRefs.length} 件</span></div>
            <div class="panel-body">${routeRefs.length ? routeRefs.map((rt) => {
  const chain = routeCaseList(rt);
  const preview = chain.slice(0, 4).map((id) => `<span class="mono">${esc(id)}</span>`).join(' → ') + (chain.length > 4 ? ` +${chain.length - 4}` : '');
  return `<div class="row-card" data-route="${esc(rt.id)}"><div class="id">${esc(rt.id)}</div><div style="flex:1;min-width:0"><div class="meta">${esc(rt.section || '')}</div><div class="small muted">${preview || 'ステップなし'}</div></div><div class="right"><span class="badge outline">${rt.slots.length} ステップ</span></div></div>`;
}).join('') : '<span class="muted">実施順序の登録なし（独立実施）</span>'}</div>
          </section>
          <section class="panel">
            <div class="panel-head"><h3>内容</h3></div>
            <div class="panel-body small" style="white-space:pre-wrap">${esc((s.perspective || []).join('\n')) || '—'}</div>
          </section>
        </div>
      </div>
      ${s.stateRows?.length ? `<section class="panel mt"><div class="panel-head"><h3>状態遷移・利用者（シナリオ欄）</h3><span class="hint">${s.stateRows.length} 行</span></div><div class="panel-body">${stateRowsTable(s.stateRows)}</div></section>` : ''}
      <section class="panel mt">
        <div class="panel-head"><h3>ケース（手順書）</h3><span class="hint">${ids.length} 件</span></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>ケースID</th><th>会社</th><th>機能名</th><th>バッジ</th><th class="right">状態</th></tr></thead><tbody>${caseRows || '<tr><td colspan="5" class="muted">ケースなし</td></tr>'}</tbody></table></div>
      </section>`;
  }

  /* ------------------------------------------------------------------ */
  /* routes                                                              */
  /* ------------------------------------------------------------------ */

  function stepCases(s, rt) {
    if (s.invalidCaseId) return [];
    if (s.caseId) {
      const c = caseById.get(s.caseId);
      return c && caseFitsRoute(c, rt) ? [c] : [];
    }
    return (casesByScenario.get(s.scenarioId) || []).filter((c) => caseFitsRoute(c, rt));
  }

  function appendixFacts(c) {
    const keys = ['証券番号', '明細番号', '種目', '保険種類', '点検区分', '申請・確認基準'];
    const out = {};
    for (const sh of c.appendix?.sheets || []) {
      for (const row of sh.rows || []) {
        for (let i = 0; i < row.length; i++) {
          const v = String(row[i] ?? '').trim();
          if (!keys.includes(v) || out[v]) continue;
          for (let j = i + 1; j < row.length; j++) {
            const x = String(row[j] ?? '').trim();
            if (x) { out[v] = x; break; }
          }
        }
      }
    }
    return out;
  }

  function casePreview(c) {
    if (!c) return '';
    const rows = c.workflow?.rows || [];
    const ops = rows.filter((r) => r.operationType && r.operationItem).slice(0, 2);
    const vfs = rows.filter((r) => r.verificationType && r.verificationItem).slice(0, 1);
    const facts = Object.entries(appendixFacts(c)).slice(0, 3);
    const bits = [];
    if (rows.length) bits.push(`<span>手順 ${rows.length}</span>`);
    if (rows.some((r) => r.evidenceType)) bits.push(`<span>証跡 ${rows.filter((r) => r.evidenceType).length}</span>`);
    facts.forEach(([k, v]) => bits.push(`<span>${esc(k)} ${esc(v)}</span>`));
    ops.forEach((r) => bits.push(`<span class="op">${esc(r.operationType)} ${esc(r.operationItem)}</span>`));
    vfs.forEach((r) => bits.push(`<span class="op">確認 ${esc(r.verificationType)} ${esc(r.verificationItem)}</span>`));
    return bits.length ? `<div class="step-preview">${bits.join('')}</div>` : '';
  }

  function routeStepHtml(rt, s, i) {
    const cases = stepCases(s, rt);
    const assigned = cases.filter((c) => taskSet.has(c.id));
    const rr = rollup(cases.map((c) => c.id));
    const sc = scenarioById.get(s.scenarioId) || {};
    const c = s.caseId ? caseById.get(s.caseId) : (cases.length === 1 ? cases[0] : null);
    const loaded = c ? state.caseCache[c.categoryId]?.[c.id] : null;
    const title = loaded?.functionName || sc.title || '';
    const chips = [];
    if (s.user) chips.push(`<span class="badge blue">${esc(s.user.id || '')}${s.user.point ? ` / ${esc(s.user.point)}` : ''}</span>`);
    (s.transitions || []).forEach((t) => chips.push(`<span class="badge outline">${esc(t.button)} ${esc(t.from)} ${esc(t.condition)} ${esc(t.result)}</span>`));
    if (s.link) chips.push(`<span class="badge gray">連携 ${esc(s.link.from)}${s.link.to ? ` → ${esc(s.link.to)}` : ''}</span>`);
    if (s.salesStatus) chips.push(`<span class="badge green">営業 ${esc(s.salesStatus.from)}${s.salesStatus.to ? ` → ${esc(s.salesStatus.to)}` : ''}</span>`);
    if (s.agentStatus) chips.push(`<span class="badge amber">代理店 ${esc(s.agentStatus.from)}${s.agentStatus.to ? ` → ${esc(s.agentStatus.to)}` : ''}</span>`);
    if (s.application) chips.push(`<span class="badge violet">申請 ${esc(s.application.from)}${s.application.to ? ` → ${esc(s.application.to)}` : ''}</span>`);
    if (s.clearing) chips.push(`<span class="badge blue">消込 ${esc(s.clearing.from)}${s.clearing.to ? ` → ${esc(s.clearing.to)}` : ''}</span>`);
    if (s.policyNo) chips.push(`<span class="badge outline">${esc(s.policyNo)}：${esc(s.detailNo || '')}</span>`);
    const attr = c ? `data-case="${esc(c.id)}"` : `data-scenario="${esc(s.scenarioId)}"`;
    const subtitle = loaded && loaded.functionName ? `${esc(s.scenarioId)} ${esc(sc.title || '')}` : '';
    return `<div class="chain-step clickable ${assigned.length ? 'assigned' : ''}" ${attr} data-route-context="${esc(rt.id)} / ${i + 1}" data-route-id="${esc(rt.id)}" title="ケース詳細を開く">
      <div class="ord">${i + 1}</div>
      <div><div class="sc">${esc(c?.id || s.caseId || s.scenarioId)}</div>${subtitle ? `<div class="step-sub">${subtitle}</div>` : ''}${s.invalidCaseId ? `<span class="badge amber">未作成 ${esc(s.invalidCaseId)}</span>` : ''}<div class="step-title">${esc(title)}</div><div class="trans">${chips.join(' ')}</div>${casePreview(loaded)}</div>
      <div class="right">${loaded ? statusBadge(caseStatus(loaded.id)) : ''}<span class="badge ${assigned.length ? 'green' : 'outline'}">${assigned.length ? `タスク ${assigned.length}` : `${rr.executed}/${rr.total}`}</span></div>
    </div>`;
  }

  function patternHtml(rt, pattern, withHeader = true) {
    const steps = (pattern.steps || []).map((s, i) => routeStepHtml(rt, s, i)).join('');
    const head = withHeader ? `<header><span class="mono">${esc(rt.id)}</span><h4>パターン ${esc(pattern.blockNo)}</h4><span class="badge outline">${(pattern.steps || []).length} ステップ</span>${rt.data?.policyNo ? `<span class="badge gray">${esc(rt.data.policyNo)}</span>` : ''}</header>` : '';
    return `<div class="route-chain">${head}<div class="chain-steps">${steps || '<div class="empty">ステップなし</div>'}</div></div>`;
  }

  function bestPattern(rt) {
    const scored = (rt.patterns || []).map((p) => ({ p, n: (p.steps || []).filter((s) => s.caseId && taskSet.has(s.caseId)).length }));
    scored.sort((a, b) => b.n - a.n);
    return (scored[0] && scored[0].n ? scored[0].p : (rt.patterns || [])[0]) || null;
  }

  function renderRoutes() {
    const routes = (DATA.routes || []).filter((r) => (!state.filters.domain || r.domain === state.filters.domain));
    const groups = new Map();
    for (const r of routes) {
      const key = `${r.domain} / ${r.section || 'その他'}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(r);
    }
    const body = [...groups.entries()].map(([key, rs]) => `<details class="tree-group" open>
      <summary><span>${esc(key)}</span><span class="badge outline">${rs.length}</span></summary>
      <div class="tree-body"><div class="list">${rs.map((r) => {
        const assigned = routeAssignedCases(r).length;
        const pat = r.patterns?.length ? `${r.patterns.length} パターン / ` : '';
        return `<div class="row-card" data-route="${esc(r.id)}">
          <div class="id">${esc(r.id)}</div>
          <div style="flex:1;min-width:0"><p class="title">${esc(r.domain === 'AZ' ? `ルート ${r.no}` : `ケース ${r.no}`)} ${r.data?.policyNo ? ` / ${esc(r.data.policyNo)}` : ''}</p>
          <div class="meta">${esc(r.data?.item || '')} ${esc(r.data?.insuranceType || '')} ${r.data?.company ? ` / ${esc(r.data.company)}` : ''}　${pat}${r.slots.length} ステップ</div></div>
          <div class="right"><span class="badge ${assigned ? 'green' : 'outline'}">${assigned ? `タスク ${assigned}` : '未割当'}</span></div>
        </div>`;
      }).join('')}</div></div>
    </details>`).join('');
    $('#main').innerHTML = `${pageHead('実施順序', `${fmt((DATA.routes || []).length)} ルート`, `<button class="btn" data-action="go-tasks">タスクを追加</button>`)}
      ${body || empty('実施順序がありません')}`;
  }

  function routeCaseList(rt) {
    if (!rt) return [];
    if (rt.patterns?.length) return (rt.slots || []).map((s) => s.caseId).filter(Boolean);
    return (rt.slots || []).map((s) => {
      const cases = (casesByScenario.get(s.scenarioId) || []).filter((c) => caseFitsRoute(c, rt));
      return cases[0]?.id || null;
    }).filter(Boolean);
  }

  function routeCategoryIds(rt) {
    const ids = new Set();
    for (const s of rt.slots || []) {
      if (s.caseId) {
        const c = caseById.get(s.caseId);
        if (c) ids.add(c.categoryId);
        continue;
      }
      for (const c of casesByScenario.get(s.scenarioId) || []) {
        if (caseFitsRoute(c, rt)) ids.add(c.categoryId);
      }
    }
    return [...ids];
  }

  async function renderRoute(id) {
    const r = routeById.get(id);
    if (!r) { $('#main').innerHTML = empty('ルートが見つかりません'); return; }
    state.selectedRoute = id;
    updateTopbar();
    const catIds = routeCategoryIds(r);
    if (catIds.some((c) => !state.caseCache[c])) {
      $('#main').innerHTML = `${pageHead(r.id, `ルート ${r.no}`, '<button class="btn" data-action="go-tasks">タスクを追加</button>')}<div class="loading">ケースを読み込んでいます…</div>`;
      await Promise.all(catIds.map((c) => ensureCaseData(c).catch(() => null)));
      if (state.selectedRoute !== id) return;
    }
    const data = r.data || {};
    const patterns = (r.patterns || []).length
      ? r.patterns.map((p) => patternHtml(r, p)).join('')
      : `<div class="route-chain"><div class="chain-steps">${(r.slots || []).map((s, i) => routeStepHtml(r, s, i)).join('') || '<div class="empty">ステップなし（データ準備のみ）</div>'}</div></div>`;
    $('#main').innerHTML = `
      ${pageHead(r.id, `ルート ${r.no}`, '<button class="btn" data-action="go-tasks">タスクを追加</button>')}
      <section class="panel">
        <div class="panel-head"><h3>${esc(r.section || '')}</h3><span class="hint">${r.patterns?.length ? `${r.patterns.length} パターン / ` : ''}${r.slots.length} ステップ</span></div>
        <div class="panel-body">
          <div class="case-meta">
            ${data.policyNo ? `<span class="badge outline">証券番号 ${esc(data.policyNo)}</span>` : ''}
            ${data.detailNo ? `<span class="badge outline">明細 ${esc(data.detailNo)}</span>` : ''}
            ${data.item ? `<span class="badge blue">${esc(data.item)}</span>` : ''}
            ${data.insuranceType ? `<span class="badge blue">${esc(data.insuranceType)}</span>` : ''}
            ${data.sectionCode ? `<span class="badge gray">部課 ${esc(data.sectionCode)}</span>` : ''}
            ${data.agentCode ? `<span class="badge gray">代理店 ${esc(data.agentCode)}</span>` : ''}
            ${data.company ? companyBadge(data.company) : ''}
          </div>
        </div>
      </section>
      <section class="panel mt">
        <div class="panel-head"><h3>実行順序</h3></div>
        <div class="panel-body">${patterns || '<div class="empty">ステップなし</div>'}</div>
      </section>`;
  }

  /* ------------------------------------------------------------------ */
  /* files                                                               */
  /* ------------------------------------------------------------------ */

  function caseMatches(c) {
    const q = state.query.toLowerCase();
    if (state.filters.domain && c.domain !== state.filters.domain) return false;
    if (state.filters.category && c.categoryId !== state.filters.category) return false;
    if (state.filters.company && c.company !== state.filters.company) return false;
    if (state.filters.assigned && !taskSet.has(c.id)) return false;
    if (state.filters.missing && c.hasAppendix !== false && c.hasWorkflow !== false) return false;
    if (state.filters.route) { const sc = scenarioById.get(c.scenarioId); if (!sc || !sc.hasRoute) return false; }
    if (!state.filters.old && c.isOld) return false;
    if (state.filters.status && !caseStatusMatches(c.id, state.filters.status)) return false;
    if (q && !(`${c.id} ${c.functionName} ${c.item} ${c.scenarioId}`.toLowerCase().includes(q))) return false;
    return true;
  }

  function renderFiles() {
    const list = [...caseById.values()].filter(caseMatches);
    const groups = new Map();
    for (const c of list) {
      if (!groups.has(c.categoryId)) groups.set(c.categoryId, new Map());
      const sm = groups.get(c.categoryId);
      if (!sm.has(c.scenarioId)) sm.set(c.scenarioId, []);
      sm.get(c.scenarioId).push(c);
    }
    const body = [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([cid, sm]) => {
      const cat = categoryById.get(cid) || { id: cid };
      const total = [...sm.values()].reduce((n, a) => n + a.length, 0);
      return `<details class="tree-group" ${state.query || state.filters.assigned || state.filters.missing || state.filters.route || state.filters.status || state.filters.company ? 'open' : ''}>
        <summary><span class="mono">${esc(cid)}</span><span>${esc(cat.functionArea || '')}</span><span class="badge outline">${sm.size} シナリオ / ${total} ケース</span></summary>
        <div class="tree-body">${[...sm.entries()].map(([sid, cs]) => {
          const s = scenarioById.get(sid) || {};
          return `<details class="tree-group" ${state.query || state.filters.assigned || state.filters.missing || state.filters.route || state.filters.status || state.filters.company ? 'open' : ''}>
            <summary><span class="mono">${esc(sid)}</span><span>${esc(s.title || '')}</span><span class="badge outline">${cs.length}</span></summary>
            <div class="tree-body">${cs.map((c) => `<div class="case-row" data-case="${esc(c.id)}">
              <span class="cid">${esc(c.id)}</span>
              <span class="fn" title="${esc(c.functionName)}">${esc(c.functionName || '—')}</span>
              <span class="co">${esc(c.company)}</span>
              <span>${caseBadges(c, pget(c.id))}</span>
              <span class="st">${statusBadge(caseStatus(c.id))}</span>
            </div>`).join('')}</div>
          </details>`;
        }).join('')}</div>
      </details>`;
    }).join('');
    $('#main').innerHTML = `${pageHead('ファイル', `${fmt(list.length)} / ${fmt((DATA.caseIndex ? Object.keys(DATA.caseIndex).length : 0))}`, `<button class="btn" data-action="go-tasks">タスクを追加</button>`)}
      ${body || empty('条件に合うケースがありません')}`;
  }

  /* ------------------------------------------------------------------ */
  /* tasks                                                               */
  /* ------------------------------------------------------------------ */

  function caseFitsRoute(c, rt) {
    if (!c || !rt) return false;
    if (rt.patterns?.length) return rt.patterns.some((p) => (p.steps || []).some((s) => s.caseId === c.id));
    if (rt.domain === 'AY' && rt.no > 0) {
      if (!(rt.slots || []).some((s) => s.scenarioId === c.scenarioId)) return false;
      const m = String(c.id).match(/-(\d{3})$/);
      return Boolean(m) && Number(m[1]) === Number(rt.no);
    }
    return false;
  }

  function routeAssignedCases(rt) {
    const ids = new Set();
    if (rt.patterns?.length) {
      for (const p of rt.patterns) {
        for (const s of p.steps || []) {
          if (s.caseId && taskSet.has(s.caseId)) ids.add(s.caseId);
        }
      }
      return [...ids];
    }
    for (const s of rt.slots || []) {
      for (const c of casesByScenario.get(s.scenarioId) || []) {
        if (taskSet.has(c.id) && caseFitsRoute(c, rt)) ids.add(c.id);
      }
    }
    return [...ids];
  }

  function taskRouteGroups() {
    return (DATA.routes || [])
      .filter((r) => routeAssignedCases(r).length)
      .sort((a, b) => a.domain.localeCompare(b.domain) || a.no - b.no);
  }

  function renderTaskChain(rt) {
    if (rt.patterns?.length) {
      const p = bestPattern(rt) || rt.patterns[0];
      const steps = (p.steps || []).map((s, i) => routeStepHtml(rt, s, i)).join('');
      return `<div class="small muted" style="margin-bottom:6px">パターン ${esc(p.blockNo)}</div><div class="chain-steps">${steps}</div>`;
    }
    const steps = (rt.slots || []).map((s, i) => routeStepHtml(rt, s, i)).join('');
    return `<div class="chain-steps">${steps}</div>`;
  }

  function hydrateTaskRoute(rt) {
    if (!rt) return;
    const cats = routeCategoryIds(rt);
    if (!cats.some((c) => !state.caseCache[c])) return;
    Promise.all(cats.map((c) => ensureCaseData(c).catch(() => null))).then(() => {
      if (state.view === 'tasks') renderTasks();
    });
  }

  function renderTasks() {
    const ids = [...taskSet];
    const r = rollup(ids);
    const routes = taskRouteGroups();
    const assignedCases = ids.map((id) => caseById.get(id)).filter(Boolean);
    const noRoute = assignedCases.filter((c) => {
      const s = scenarioById.get(c.scenarioId);
      return !s || !(s.routeRefs || []).length;
    });
    const firstCase = assignedCases[0];
    const preferred = routes.find((r) => firstCase && routeAssignedCases(r).includes(firstCase.id)) || routes[0];
    const selectedId = state.taskRouteId && routes.some((x) => x.id === state.taskRouteId) ? state.taskRouteId : (preferred?.id || '');
    const selected = routes.find((x) => x.id === selectedId);
    const picker = routes.length ? `<div class="task-route-picker">
      <label>表示するルート <select id="taskRouteSelect">${routes.map((rt) => `<option value="${esc(rt.id)}" ${rt.id === selectedId ? 'selected' : ''}>${esc(rt.id)} / ${esc((rt.section || '').slice(0, 24))} / ${rt.patterns?.length ? `${rt.patterns.length} パターン / ` : ''}${rt.slots.length} ステップ / タスク ${routeAssignedCases(rt).length}</option>`).join('')}</select></label>
      <span class="small muted">${routes.length} ルート</span>
    </div>` : '';
    const routeCards = routes.slice(0, 12).map((rt) => `<div class="row-card" data-task-route="${esc(rt.id)}">
      <div class="id">${esc(rt.id)}</div>
      <div style="flex:1;min-width:0"><p class="title">${esc(rt.section || '')}</p><div class="meta">${rt.patterns?.length ? `${rt.patterns.length} パターン / ` : ''}${rt.slots.length} ステップ ${rt.data?.policyNo ? ` / ${esc(rt.data.policyNo)}` : ''}</div></div>
      <div class="right"><span class="badge green">タスク ${routeAssignedCases(rt).length}</span></div>
    </div>`).join('');
    const scenarioGroups = new Map();
    for (const c of assignedCases) {
      if (!scenarioGroups.has(c.scenarioId)) scenarioGroups.set(c.scenarioId, []);
      scenarioGroups.get(c.scenarioId).push(c);
    }
    const scenarioTable = [...scenarioGroups.entries()].map(([sid, cs]) => {
      const sc = scenarioById.get(sid) || {};
      const refs = [...new Set((DATA.routes || [])
        .filter((r) => (r.slots || []).some((x) => x.scenarioId === sid) && cs.some((c) => caseFitsRoute(c, r)))
        .map((r) => r.id))];
      const rr = rollup(cs.map((x) => x.id));
      return `<tr>
        <td><span class="mono">${esc(sid)}</span></td>
        <td>${esc(sc.title || '')}</td>
        <td class="num">${cs.length}</td>
        <td>${refs.length ? refs.slice(0, 4).map((id) => `<span class="badge outline">${esc(id)}</span>`).join(' ') + (refs.length > 4 ? ` +${refs.length - 4}` : '') : '<span class="badge gray">独立</span>'}</td>
        <td class="right">${statusBadge(caseStatus(cs[0].id))}</td>
      </tr>`;
    }).join('');
    const caseTable = assignedCases.map((c) => `<tr class="case-row-click" data-case="${esc(c.id)}">
      <td><span class="mono">${esc(c.id)}</span></td>
      <td>${esc(c.scenarioId)}</td>
      <td>${companyBadge(c.company)}</td>
      <td>${esc(c.functionName || '')}</td>
      <td>${caseBadges(c, pget(c.id))}</td>
      <td class="right">${statusBadge(caseStatus(c.id))}</td>
    </tr>`).join('');
    $('#main').innerHTML = `
      ${pageHead('自分のタスク', '', `<button class="btn" data-action="clear-tasks">クリア</button>`)}
      <section class="panel">
        <div class="panel-head"><h3>タスクをインポート</h3><span class="hint">1行1IDでも、CSVの貼り付けでも可</span></div>
        <div class="panel-body">
          <div class="task-import">
            <div>
              <textarea id="taskInput" placeholder="例:
AZ-110-01-001
AZ-110-02
AZ-210-01-001
AY-120-01-001"></textarea>
              <div style="display:flex;gap:8px;margin-top:9px;flex-wrap:wrap">
                <button class="btn primary" data-action="import-tasks">貼り付けたIDを追加</button>
                <label class="btn" for="taskFile">ファイルを選択</label>
                <input id="taskFile" type="file" accept=".txt,.csv,.json" hidden>
              </div>
            </div>
            <div class="side">
              <h4>現在のタスク</h4>
              <p>${ids.length} ケース / ${new Set(assignedCases.map((c) => c.scenarioId)).size} シナリオ</p>
              <p>実施済み ${r.executed} / 検証済み ${r.verified} / NG ${r.ng}</p>
              <h4>ルート</h4>
              <p>${routes.length} 件の実施順序に接続されています。</p>
              <p class="faint">独立: ${noRoute.length}</p>
            </div>
          </div>
        </div>
      </section>
      ${ids.length ? `<section class="panel mt">
        <div class="panel-head"><h3>連続実施順序</h3></div>
        <div class="panel-body">
          ${picker}
          ${selected ? `<div class="route-chain"><header><span class="mono">${esc(selected.id)}</span><h4>${esc(selected.section || '')}</h4><span class="badge outline">${selected.slots.length} ステップ</span>${selected.data?.policyNo ? `<span class="badge gray">${esc(selected.data.policyNo)}</span>` : ''}${selected.isTemplate ? '<span class="badge gray">テンプレート</span>' : ''}</header>${renderTaskChain(selected)}</div>` : empty('実施順序に接続されたタスクはありません')}
          ${routes.length > 1 ? `<details style="margin-top:12px"><summary class="small muted">関連ルート一覧（${routes.length} 件）</summary><div class="list" style="margin-top:8px">${routeCards}</div>${routes.length > 12 ? `<p class="small muted">先頭12件を表示</p>` : ''}</details>` : ''}
        </div>
      </section>` : ''}
      ${ids.length ? `<section class="panel mt"><div class="panel-head"><h3>タスクのシナリオ</h3><span class="hint">どのシナリオに実施順序があるか</span></div><div class="table-wrap"><table class="data"><thead><tr><th>シナリオ</th><th>内容</th><th class="num">ケース</th><th>実施順序</th><th class="right">状態</th></tr></thead><tbody>${scenarioTable}</tbody></table></div></section>` : ''}
      ${ids.length ? `<section class="panel mt"><div class="panel-head"><h3>タスク一覧</h3><span class="hint">${ids.length} 件</span></div><div class="table-wrap"><table class="data"><thead><tr><th>ケースID</th><th>シナリオ</th><th>会社</th><th>機能名</th><th>バッジ</th><th class="right">状態</th></tr></thead><tbody>${caseTable}</tbody></table></div></section>` : ''}`;
    hydrateTaskRoute(selected);
  }

  /* ------------------------------------------------------------------ */
  /* case detail                                                         */
  /* ------------------------------------------------------------------ */

  function caseHeader(meta) {
    const p = pget(meta.id);
    const sc = scenarioById.get(meta.scenarioId);
    const routeRefs = (DATA.routes || []).filter((r) => caseFitsRoute(meta, r)).map((r) => ({ routeId: r.id })).slice(0, 6);
    return `<div class="case-head">
      <div>
        <div class="id">${esc(meta.id)}</div>
        <h2>${esc(meta.functionName || '（機能名なし）')}</h2>
        <div class="case-meta">
          <span class="badge outline">${esc(meta.scenarioId)}${sc?.title ? ` ${esc(sc.title)}` : ''}</span>
          ${companyBadge(meta.company)}
          ${scheduleOf(meta.id) ? `<span class="badge amber">予定 ${esc(scheduleOf(meta.id).startLabel)}〜${esc(scheduleOf(meta.id).endLabel)}</span>` : ''}
          ${caseUserMap.get(meta.id) ? `<span class="badge blue">利用者 ${esc(caseUserMap.get(meta.id).id || '')}${caseUserMap.get(meta.id).point ? ` / ${esc(caseUserMap.get(meta.id).point)}` : ''}</span>` : ''}
          ${meta.item ? `<span class="badge gray">${esc(meta.item)}</span>` : ''}
          ${meta.comparisonMark === '〇' ? '<span class="badge violet">現新比較</span>' : ''}
          ${meta.hasWorkflow === false ? '<span class="badge red">手順書なし</span>' : ''}
          ${meta.hasAppendix === false ? '<span class="badge amber">別紙なし</span>' : ''}
          ${meta.isOld ? '<span class="badge gray">旧版</span>' : ''}
          ${taskSet.has(meta.id) ? '<span class="badge green">自分のタスク</span>' : ''}
          ${routeRefs.map((x) => `<span class="badge outline" data-route="${esc(x.routeId)}" style="cursor:pointer">${esc(x.routeId)}</span>`).join(' ')}
          ${(state.automation[meta.id]?.locators || []).length ? `<span class="badge blue">自動化 ${(state.automation[meta.id].locators || []).length}</span>` : ''}
        </div>
      </div>
      <div class="right" style="display:flex;flex-direction:column;align-items:flex-end;gap:7px">
        ${statusBadge(caseStatus(meta.id))} ${resultBadge(p)}
        <button class="btn" data-action="add-task" data-case="${esc(meta.id)}">タスクに追加</button>
      </div>
    </div>`;
  }

  function resultBar(id) {
    const p = pget(id);
    return `<div class="result-bar">
      <label>実施状態 ${statusSelect(id)}</label>
      <label>結果
        <select data-field="result" data-case-id="${esc(id)}">
          <option value="">—</option>
          <option value="OK" ${p.result === 'OK' ? 'selected' : ''}>OK</option>
          <option value="NG" ${p.result === 'NG' ? 'selected' : ''}>NG</option>
        </select>
      </label>
      <label>検証
        <select data-field="verify" data-case-id="${esc(id)}">
          <option value="NOT_STARTED" ${(!p.verify || p.verify === 'NOT_STARTED') ? 'selected' : ''}>未検証</option>
          <option value="DONE" ${p.verify === 'DONE' ? 'selected' : ''}>検証完了</option>
        </select>
      </label>
      <label>故障番号
        <input data-field="defectNo" data-case-id="${esc(id)}" value="${esc(p.defectNo || '')}" placeholder="例: BUG-001">
      </label>
      <label>実施日
        <input type="date" data-field="executedAt" data-case-id="${esc(id)}" value="${esc(p.executedAt || '')}">
      </label>
      <label>実施者
        <input data-field="executedBy" data-case-id="${esc(id)}" value="${esc(p.executedBy || '')}">
      </label>
      <label>検証日
        <input type="date" data-field="verifiedAt" data-case-id="${esc(id)}" value="${esc(p.verifiedAt || '')}">
      </label>
      <label>検証者
        <input data-field="verifiedBy" data-case-id="${esc(id)}" value="${esc(p.verifiedBy || '')}">
      </label>
      <label class="wide">記事
        <textarea data-field="memo" data-case-id="${esc(id)}" placeholder="気づいた点、再現手順など">${esc(p.memo || '')}</textarea>
      </label>
    </div>`;
  }

  function groupRows(rows) {
    const blocks = [];
    let cur = null;
    for (const row of rows || []) {
      if (!cur || row.itemNo || row.functionName) {
        cur = { itemNo: row.itemNo || '', functionName: row.functionName || '', rows: [] };
        blocks.push(cur);
      }
      cur.rows.push(row);
    }
    return blocks;
  }

  function procedureHtml(c) {
    const wf = c.workflow;
    if (!wf || !wf.rows?.length) return empty('このケースには手順書データがありません（document-master のみ）。');
    const ov = wf.overview || {};
    const overview = [ov.testPerspective, ov.prerequisites].filter((x) => x && x.value).map((x) => `<article class="ov"><span>${esc(x.label || '')}</span><p>${esc(x.value)}</p></article>`).join('');
    const blocks = groupRows(wf.rows).map((b, i) => `<article class="proc-block">
      <header><span class="block-id">B${String(i + 1).padStart(3, '0')}</span><span class="badge outline">項番 ${esc(b.itemNo || '—')}</span><h4>${esc(b.functionName || '機能名なし')}</h4><span class="small muted">Excel ${b.rows[0].sourceRow}–${b.rows[b.rows.length - 1].sourceRow}</span></header>
      ${b.rows.map((row) => {
        const auto = (state.automation[c.id]?.locators || []).find((l) => Number(l.sourceRow) === Number(row.sourceRow));
        return `<div class="proc-row">
          <div class="src">${esc(row.sourceRow)}${auto ? '<br><span class="badge green">自動化</span>' : ''}</div>
          <div class="op"><b>操作</b>${row.operationType ? `<span class="badge blue">${esc(row.operationType)}</span> ` : ''}${esc(row.operationItem || '')}${row.operationContent ? `<div class="muted">${nl2br(row.operationContent)}</div>` : ''}</div>
          <div class="vf"><b>確認</b>${row.verificationType ? `<span class="badge ${row.verificationType === '遷移' ? 'violet' : 'green'}">${esc(row.verificationType)}</span> ` : ''}${esc(row.verificationItem || '')}${row.verificationContent ? `<div class="muted">${nl2br(row.verificationContent)}</div>` : ''}</div>
          <div class="src">${row.evidenceType ? `<span class="badge outline">${esc(row.evidenceType)}</span>` : ''}</div>
        </div>`;
      }).join('')}
    </article>`).join('');
    return `${overview ? `<div class="overview">${overview}</div>` : ''}${blocks}`;
  }

  function compactAppendix(rows) {
    const out = [];
    for (const row of rows || []) {
      const cells = (row || []).map((v, i) => ({ v: String(v ?? '').trim(), i })).filter((x) => x.v !== '');
      if (!cells.length) continue;
      const first = cells[0].v;
      if (/^[○〇■●]/.test(first)) {
        out.push(`<div class="ref-title">${esc(first)}</div>`);
        if (cells.length > 1) out.push(`<div class="ref-note-line">${esc(cells.slice(1).map((x) => x.v).join(' ｜ '))}</div>`);
        continue;
      }
      if (/^\d+$/.test(first) && cells.length > 1) {
        out.push(`<div class="ref-title"># ${esc(first)}</div>`);
        out.push(`<div class="ref-row"><span>${esc(cells[1].v)}</span><strong>${esc(cells.slice(2).map((x) => x.v).join(' ｜ '))}</strong></div>`);
        continue;
      }
      if (cells.length === 1) {
        out.push(`<div class="ref-title">${esc(first)}</div>`);
        continue;
      }
      out.push(`<div class="ref-row"><span>${esc(first)}</span><strong>${esc(cells.slice(1).map((x) => x.v).join(' ｜ '))}</strong></div>`);
    }
    return `<div class="ref-compact">${out.join('') || '<div class="muted">内容なし</div>'}</div>`;
  }

  function appendixHtml(c) {
    const sheets = c.appendix?.sheets || [];
    if (!sheets.length) return empty('別紙データがありません。');
    const idx = Math.min(state.appendixSheet[c.id] || 0, sheets.length - 1);
    const sh = sheets[idx];
    const view = state.appendixView || 'compact';
    const content = view === 'raw'
      ? rawTable(sh.rows || [], { maxRows: 300, maxHeight: '58vh' })
      : compactAppendix(sh.rows || []);
    return `<div class="ref-tabs">${sheets.map((s, i) => `<button class="tab ${i === idx ? 'active' : ''}" data-appx="${i}" data-case="${esc(c.id)}">${esc(s.name || `別紙 ${i + 1}`)}</button>`).join('')}</div>
      <div class="panel"><div class="panel-head"><h3>${esc(sh.name || '')}</h3><span class="hint">${esc(sh.range || '')} / ${(sh.rows || []).length} 行</span></div>
      <div class="panel-body">
        <div class="ref-tabs"><button class="tab ${view === 'compact' ? 'active' : ''}" data-appx-view="compact">コンパクト</button><button class="tab ${view === 'raw' ? 'active' : ''}" data-appx-view="raw">表形式</button></div>
        ${content}
      </div></div>`;
  }

  function evidenceItems(c) {
    const rows = c.workflow?.rows || [];
    return rows.filter((r) => r.evidenceType).map((r) => ({
      key: `${r.sourceRow}-${r.evidenceType}`,
      label: r.verificationItem || r.functionName || `Excel ${r.sourceRow}`,
      type: r.evidenceType,
      row: r.sourceRow,
    }));
  }

  function evidenceHtml(c) {
    const items = evidenceItems(c);
    if (!items.length) return empty('証跡項目がありません。');
    const p = pget(c.id);
    const auto = (window.MSAD_EVIDENCE || {})[c.id] || {};
    const statuses = auto.rows || {};
    const s = auto.summary || {};
    const badge = (st) => ({ exact: ['自動', 'green'], blockEnd: ['近似', 'amber'], manual: ['人工確認', 'violet'], missing: ['未取得', 'red'] }[st] || ['未実行', '']);
    const done = items.filter((x) => p.evidence?.[x.key]).length;
    const sum = s.hc ? `画面HC ${s.hc} ／ 自動 ${s.exact || 0} ／ 近似 ${s.blockEnd || 0} ／ 人工 ${s.manual || 0} ／ 未取得 ${s.missing || 0}` : '実行結果なし';
    const manual = auto.manualSteps || [];
    const manualPanel = manual.length ? `<div class="panel mt"><div class="panel-head"><h3>人工確認項目</h3><span class="hint">${manual.length} 件（真機で確認）</span></div><div class="panel-body"><div class="evidence-list">${manual.map((m) => {
      const key = `manual:${m.row}:${m.phase}`;
      return `<label class="ev-item ${p.evidence?.[key] ? 'checked' : ''}"><input type="checkbox" data-evidence="${esc(key)}" data-case-id="${esc(c.id)}" ${p.evidence?.[key] ? 'checked' : ''}><span><b>行${m.row}</b> [${esc(m.phase)}] ${esc(m.item)}</span><span class="ev-type">${esc(m.reason)}</span></label>`;
    }).join('')}</div></div></div>` : '';
    return `<div class="panel"><div class="panel-head"><h3>証跡チェック</h3><span class="hint">${done} / ${items.length} ・ ${sum}</span>${auto.xlsx ? `<a class="btn" href="${esc(auto.xlsx)}" download>Excel証跡</a>` : ''}</div><div class="panel-body"><div class="evidence-list">${items.map((x) => {
      const e = statuses[String(x.row)];
      const st = e?.status;
      const [label, color] = st ? badge(st) : (x.type === '画面HC' ? ['未取得', 'red'] : ['目視', '']);
      const src = e?.file ? `../logs/${encodeURIComponent(c.id)}/${encodeURIComponent(e.file)}` : '';
      const thumb = src ? `<img class="ev-thumb" loading="lazy" src="${esc(src)}" data-lightbox="${esc(src)}" alt="Excel ${x.row}">` : (st === 'manual' ? '<span class="ev-manual">人工確認</span>' : '');
      const pick = `<input type="checkbox" data-evidence="${esc(x.key)}" data-case-id="${esc(c.id)}" ${p.evidence?.[x.key] ? 'checked' : ''}><span class="ev-main">${esc(x.label)}</span><span class="ev-type">${esc(x.type)} / Excel ${x.row} ${label ? `・<b style="color:${color === 'red' ? '#b91c1c' : color === 'amber' ? '#b45309' : color === 'violet' ? '#6d28d9' : '#15803d'}">${label}</b>` : ''}</span>`;
      return src
        ? `<div class="ev-item ${p.evidence?.[x.key] ? 'checked' : ''}"><label class="ev-pick">${pick}</label>${thumb}</div>`
        : `<label class="ev-item ${p.evidence?.[x.key] ? 'checked' : ''}">${pick}${thumb}</label>`;
    }).join('')}</div></div></div>${manualPanel}`;
  }

  function snippetFor(id) {
    const locs = state.automation[id]?.locators || [];
    if (!locs.length) return '// ロケーターが未登録です。下の JSON に selector を追加してください。';
    const lines = ['(async () => {', '  const q = (s) => document.querySelector(s);', '  const sleep = (ms) => new Promise(r => setTimeout(r, ms));'];
    for (const l of locs) {
      const sel = l.selector || l.locator?.value;
      if (!sel) continue;
      const act = l.action || 'click';
      if (act === 'input' || act === 'fill') {
        lines.push(`  { const el = q(${JSON.stringify(sel)}); if (!el) throw new Error('not found: ${String(sel).replace(/'/g, "\\'")}'); el.focus(); el.value = ${JSON.stringify(l.value ?? '')}; el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); }`);
      } else if (act === 'click') {
        lines.push(`  { const el = q(${JSON.stringify(sel)}); if (!el) throw new Error('not found: ${String(sel).replace(/'/g, "\\'")}'); el.click(); }`);
      } else if (act === 'assert') {
        const expected = JSON.stringify(l.expected ?? l.value ?? '');
        lines.push(`  { const el = q(${JSON.stringify(sel)}); const t = (el?.innerText || el?.value || document.body.innerText); if (!t.includes(${expected})) throw new Error('NG: expected ' + ${expected}); }`);
      } else if (act === 'wait') {
        lines.push(`  await sleep(${Number(l.timeoutMs) || 1000});`);
      }
    }
    lines.push('  console.log("DONE");', '})();');
    return lines.join('\n');
  }

  function seedAutomation(id) {
    const meta = caseById.get(id);
    const c = meta ? state.caseCache[meta.categoryId]?.[id] : null;
    if (!c?.workflow?.rows?.length) { toast('手順書データがありません'); return; }
    const existing = state.automation[id]?.locators || [];
    const map = new Map(existing.map((l) => [Number(l.sourceRow), l]));
    for (const row of c.workflow.rows) {
      const action = row.operationType === '入力' ? 'input'
        : (row.operationType === 'ボタン' || row.operationType === 'クリック') ? 'click'
          : row.verificationType ? 'assert' : '';
      if (!action || map.has(Number(row.sourceRow))) continue;
      map.set(Number(row.sourceRow), {
        sourceRow: row.sourceRow,
        action,
        selector: '',
        value: '',
        expected: '',
      });
    }
    state.automation[id] = { scriptType: 'console', locators: [...map.values()].sort((a, b) => Number(a.sourceRow) - Number(b.sourceRow)) };
    save(LS.automation, state.automation);
    toast('操作行の雛形を生成しました。selector を埋めてください。');
    refreshCaseView(id);
  }

  function cssEsc(v) {
    return (window.CSS && CSS.escape) ? CSS.escape(v) : String(v).replace(/[^a-zA-Z0-9_-]/g, (m) => `\\${m}`);
  }

  function suggestSelectors(html) {
    const doc = new DOMParser().parseFromString(html || '', 'text/html');
    const el = doc.body.firstElementChild;
    if (!el) return [];
    const out = [];
    const push = (label, selector) => {
      if (selector && !out.some((x) => x.selector === selector)) out.push({ label, selector });
    };
    const tag = el.tagName.toLowerCase();
    if (el.id) push('id', `#${cssEsc(el.id)}`);
    for (const attr of ['name', 'data-testid', 'data-test', 'data-cy', 'aria-label', 'placeholder', 'type']) {
      const v = el.getAttribute(attr);
      if (v) push(attr, `${tag}[${attr}="${String(v).replace(/"/g, '\\"')}"]`);
    }
    const cls = [...el.classList].filter(Boolean).slice(0, 3);
    if (cls.length) push('class', `${tag}.${cls.map(cssEsc).join('.')}`);
    if (el.parentElement) {
      const siblings = [...el.parentElement.children].filter((x) => x.tagName === el.tagName);
      if (siblings.length === 1) push('parent > tag', `${el.parentElement.tagName.toLowerCase()} > ${tag}`);
      else push('nth-of-type', `${tag}:nth-of-type(${siblings.indexOf(el) + 1})`);
    }
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    if (text && text.length <= 40) push('text (XPath)', `//${tag}[normalize-space()="${text.replace(/"/g, "'")}"]`);
    return out;
  }

  function autoCase(id) { return (AUTO.cases || {})[id] || null; }
  function autoBlock(id) { return (AUTO.blocks || []).find((b) => b.id === id) || null; }

  function runnerCommand(caseId, r) {
    // Node runtime (portable node.exe + playwright-core); PowerShell era retired.
    if (r.launch) return `${r.launch} ${caseId}`;
    return `run.cmd ${caseId}`;
  }

  function copyText(text) {
    const done = () => toast('コマンドをコピーしました');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (_) { toast('コピーできません。手動で選択してください'); }
    ta.remove();
  }

  function autoStatusBadge(status) {
    if (status === 'full') return '<span class="badge green">block full</span>';
    return '<span class="badge amber">gap</span>';
  }
  function runnerStatusBadge(status) {
    if (status === 'blocked') return '<span class="badge red">blocked</span>';
    if (status === 'mock-verified') return '<span class="badge amber">mock</span>';
    if (status === 'available') return '<span class="badge green">ready</span>';
    return `<span class="badge gray">${esc(status || '—')}</span>`;
  }
  function gapLabel(e) {
    return `${e.kind}:${e.screen}:${e.action || e.assert || ''}:${e.target || ''}:${e.dataClass || ''}`;
  }
  function executionBadge(status) {
    const map = {
      'live-pass': ['green', 'live'],
      'mock-pass': ['amber', 'mock'],
      'blocked': ['red', 'blocked'],
      'not-implemented': ['gray', 'not impl'],
      'not-run': ['gray', 'not run'],
    };
    const [cls, label] = map[status] || ['gray', status || '—'];
    return `<span class="badge ${cls}">${esc(label)}</span>`;
  }

  // ---- three-state model (planned / coded / verified) ------------------
  const S3_JP = { verified: '検証済', coded: '実装済', planned: '未着手', none: '無一致' };
  function s3Badge(s3) {
    const cls = s3 === 'verified' ? 'green' : s3 === 'coded' ? 'amber' : s3 === 'none' ? 'gray' : 'blue';
    return `<span class="badge ${cls}">${S3_JP[s3] || s3}</span>`;
  }
  // horizontal progress strip: one segment per block, colored by status3,
  // plus a hatched tail for uncovered events. Widths are proportional to events.
  function s3Strip(a, opts = {}) {
    const details = a.blockDetails || [];
    if (!details.length && !a.coverage3) return '<span class="muted small">—</span>';
    const segs = [];
    for (const d of details) {
      const n = (d.end ?? d.start ?? 0) - (d.start ?? 0) || 1;
      segs.push({ cls: d.status3 || 'planned', n, block: d.block, fromRow: d.fromRow, toRow: d.toRow });
    }
    if (a.coverage3 && a.coverage3.uncovered > 0) segs.push({ cls: 'uncovered', n: a.coverage3.uncovered, block: '未カバー' });
    const total = segs.reduce((t, x) => t + x.n, 0) || 1;
    const bars = segs.map((x) => `<span class="s3-seg s3-${x.cls}" style="width:${(x.n / total) * 100}%" title="${esc(x.block)} (row ${x.fromRow ?? '?'}–${x.toRow ?? '?'}) : ${S3_JP[x.cls] || x.cls} / ${x.n} events"></span>`).join('');
    const c3 = a.coverage3 || {};
    const done = (c3.verified || 0) + (c3.coded || 0);
    const pct = c3.total ? Math.round((done / c3.total) * 100) : 0;
    return `<div class="s3-strip${opts.compact ? ' compact' : ''}" role="img" aria-label="automation progress">${bars}</div>` +
      (opts.showPct === false ? '' : `<span class="s3-pct">${pct}%</span>`);
  }

  function automationRunHtml(id) {
    const a = autoCase(id);
    if (!a) return '';
    const cov = a.eventCount ? Math.round((a.coveredEvents / a.eventCount) * 1000) / 10 : 0;
    const details = a.blockDetails || (a.blocks || []).map((bid) => ({ block: bid, status: 'not-run' }));
    const blocks = details.map((d) => {
      const b = autoBlock(d.block);
      const range = d.fromRow != null ? ` row ${d.fromRow}–${d.toRow}` : '';
      const s3c = d.status3 === 'verified' ? 'green' : d.status3 === 'coded' ? 'amber' : 'gray';
      return `<span class="badge outline" style="border-left:3px solid var(--${d.status3 === 'verified' ? 'green' : d.status3 === 'coded' ? 'amber' : 'line'})" title="${esc(b?.fromScreen || '')} → ${esc(b?.toScreen || '')}${range} : ${S3_JP[d.status3] || ''}">${esc(d.block)} <span class="badge ${s3c}">${S3_JP[d.status3] || d.status3}</span></span>`;
    }).join(' ');
    const total = details.length;
    const done = a.actualDone ?? 0;
    const remaining = a.remaining ?? (total - done);
    const next = a.nextGap ? (a.nextGap.kind === 'block' ? a.nextGap.block : gapLabel(a.nextGap.event)) : '—';
    const r = a.runner;
    const cmd = r ? runnerCommand(id, r) : '';
    return `<div class="panel" style="margin-bottom:12px">
      <div style="padding:10px 14px 0">${s3Strip(a)}</div>
      <div class="panel-head"><h3>ブロック実行</h3><span>${s3Badge(a.status3)} ${autoStatusBadge(a.status)} ${done}/${total} blocks / ${cov}% events</span></div>
      <div class="panel-body small">
        <div class="chips">${blocks || '<span class="muted">block なし</span>'}</div>
        <p class="muted" style="margin-top:8px">Remaining: <b>${remaining}</b> blocks / ${a.uncoveredCount} uncovered events. Next: <code>${esc(next)}</code></p>
        ${a.executionNote ? `<p class="faint">${esc(a.executionNote)}</p>` : ''}
        ${r ? `<p style="margin-top:10px"><b>Runner:</b> ${esc(r.script)} ${runnerStatusBadge(r.status)}</p>
          <pre class="mono" style="white-space:pre-wrap;background:#0f172a;color:#e2e8f0;border-radius:9px;padding:10px;font-size:11px;overflow:auto">${esc(cmd)}</pre>
          <button class="btn primary" data-action="copy-command" data-case="${esc(id)}">実行コマンドをコピー</button>
          ${r.scope ? `<p class="faint" style="margin-top:7px">scope: ${esc(r.scope)}</p>` : ''}${r.note ? `<p class="faint" style="margin-top:7px">${esc(r.note)}</p>` : ''}`
        : `<p class="muted">このケース用の runner はまだありません。block の整備後に追加します。</p>`}
      </div></div>`;
  }


  function runnerDefHtml(c) {
    const comp = RDEFS.compositions?.[c.id] || [];
    const P = RDEFS.params?.[c.id] || {};
    const rv = (v) => typeof v === 'string' && v.startsWith('params.') ? (P[v.slice(7)] ?? '⚠︎未設定') : (v ?? '');
    if (!comp.length) return '';
    const lines = [];
    let n = 0;
    for (const bid of comp) {
      const blk = RDEFS.blocks?.[bid];
      if (!blk) { lines.push(`// ${bid}: selector 未定義`); continue; }
      lines.push(`// ── ${bid}${blk.screen ? ' (' + blk.screen + ')' : ''}`);
      for (const st of (blk.steps || [])) {
        n++;
        const sel = st.selector ? String(st.selector).replace(/\{params\.(\w+)\}/g, (_, k) => P[k] ?? '⚠︎') : '';
        const val = st.value !== undefined ? ` value=${JSON.stringify(rv(st.value))}` : st.label !== undefined ? ` label=${JSON.stringify(rv(st.label))}` : '';
        const inP = st.in === 'popup' ? ' [popup]' : '';
        const flags = [st.force && 'force', st.optional && 'optional', st.how && st.how].filter(Boolean).join(',');
        lines.push(`${String(n).padStart(2, '0')} ${st.action.padEnd(9)} ${sel || (st.url || st.match || '')}${val}${inP}${flags ? '  ;' + flags : ''}`);
      }
    }
    return `<details class="panel" style="margin-top:12px">
      <summary style="cursor:pointer;padding:11px 14px;font-size:12.5px;font-weight:700">🔧 実行定義（エンジニア向け）— ${comp.length} ブロック / ${n} ステップ</summary>
      <div class="panel-body" style="padding:0">
        <div style="padding:8px 14px;border-bottom:1px solid var(--line-2)" class="small muted">
          この1冊が実行するブロック列と各ステップの実セレクタ（パラメータ代入済み）。runner.mjs が実行時に読み込むのと同じデータ（block-selectors*.json + params/*.json + blocks.json の合成）。
          テンプレート: <code>automation/node-runner/block-selectors*.json</code> / パラメータ: <code>automation/cdp/params/*.json</code>
        </div>
        <pre class="mono" style="margin:0;padding:12px 14px;font-size:11px;line-height:1.7;overflow:auto;max-height:60vh;white-space:pre">${esc(lines.join(String.fromCharCode(10)))}</pre>
      </div></details>`;
  }

  function automationHtml(c) {
    const a = autoCase(c.id);
    const auto = state.automation[c.id] || { scriptType: 'console', locators: [] };
    const legacy = `<details class="panel" style="margin-top:12px"><summary style="cursor:pointer;padding:10px 13px;font-size:12px" class="muted">開発者向けツール（ロケーター編集・旧）</summary><div class="panel-body">
      <p class="small muted">形式: <code>[{"sourceRow":14,"action":"input","selector":"input[name='policyNo']","value":"AZ11001"}]</code></p>
      <textarea id="autoJson" style="width:100%;min-height:170px;border:1px solid var(--line);border-radius:9px;padding:9px;font-family:var(--mono);font-size:11px">${esc(JSON.stringify(auto, null, 2))}</textarea>
      <div style="display:flex;gap:7px;margin-top:8px;flex-wrap:wrap"><button class="btn primary" data-action="save-auto" data-case="${esc(c.id)}">保存</button><button class="btn" data-action="gen-auto" data-case="${esc(c.id)}">Console 片段を生成</button><button class="btn" data-action="seed-auto" data-case="${esc(c.id)}">操作行の雛形を生成</button><button class="btn" data-action="case-json" data-case="${esc(c.id)}">ケースJSON</button></div>
      <pre id="autoOut" style="white-space:pre-wrap;background:#0f172a;color:#e2e8f0;border-radius:9px;padding:10px;font-size:11px;max-height:240px;overflow:auto;margin-top:9px">${esc(snippetFor(c.id))}</pre>
      <details style="margin-top:8px"><summary class="small muted" style="cursor:pointer">F12 の outerHTML から selector 候補を生成</summary>
        <textarea id="outerHtmlInput" placeholder="F12 → Elements → Copy outerHTML を貼り付け" style="width:100%;min-height:90px;border:1px solid var(--line);border-radius:9px;padding:9px;font-family:var(--mono);font-size:11px"></textarea>
        <div style="display:flex;gap:7px;margin-top:8px"><button class="btn" data-action="suggest-selectors" data-case="${esc(c.id)}">候補を生成</button></div>
        <div id="selectorOut" class="small muted" style="margin-top:8px">まだ候補はありません。</div>
      </details></div></details>`;

    if (!a) {
      return `<div class="panel"><div class="panel-body" style="text-align:center;padding:26px">
        <p style="margin:0 0 4px;font-size:15px;font-weight:700">⬜ まだ自動実行できません</p>
        <p class="muted small" style="margin:0">このケースの積木はまだ実装待ちです。</p></div></div>` + runnerDefHtml(c) + legacy;
    }

    const details = a.blockDetails || [];
    const c3 = a.coverage3 || {};
    const done = (c3.verified || 0) + (c3.coded || 0);
    const total = c3.total || a.eventCount || 0;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const canRun = a.status3 === 'verified' || a.status3 === 'coded';

    const heroTxt = a.status3 === 'verified' ? '✅ 自動で最後まで実行できます'
      : a.status3 === 'coded' ? '🟧 自動実行できます（模擬環境で確認済み）'
      : '⬜ まだ自動実行できません';
    const heroSub = a.status3 === 'verified' ? '実機で全ブロック通過済み'
      : a.status3 === 'coded' ? '会社の実機での確認はこれから'
      : '積木の実装待ち';

    const rowMap = new Map();
    (c.workflow?.rows || []).forEach((r) => rowMap.set(r.sourceRow, r));
    const blockRows = details.map((d, i) => {
      const rows = [];
      for (let rn = d.fromRow; rn <= d.toRow; rn++) { const r = rowMap.get(rn); if (r) rows.push(r); }
      const ops = rows.filter((r) => r.operationItem).map((r) => String(r.operationItem).replace(/「|」/g, '').slice(0, 16));
      const vfs = rows.filter((r) => r.verificationItem).map((r) => String(r.verificationItem).slice(0, 12));
      const desc = ops.length ? ops.slice(0, 3).join(' → ') : (vfs.length ? '確認: ' + vfs.slice(0, 2).join('・') : '—');
      const badge = d.status3 === 'verified' ? '<span class="badge green">検証済</span>' : d.status3 === 'coded' ? '<span class="badge amber">実装済</span>' : '<span class="badge gray">未着手</span>';
      return `<div class="auto-step ${d.status3 || 'planned'}">
        <div class="no">${i + 1}</div>
        <div class="desc">${esc(desc)}<span class="rows">行${d.fromRow}–${d.toRow}　${esc(d.block.replace(/^BLK-/, ''))}</span></div>
        <div>${badge}</div>
      </div>`;
    }).join('');

    const r = a.runner;
    const cmd = r ? runnerCommand(c.id, r) : `run.cmd ${c.id}`;
    const ranInfo = [];
    if (a.actualDone) ranInfo.push(`実機通過 ${a.actualDone} ブロック`);
    if (a.mockDone) ranInfo.push(`模擬環境通過 ${a.mockDone} ブロック`);

    return `
    <div class="panel auto-hero">
      <div class="auto-hero-main">
        <div class="auto-hero-title">${heroTxt}</div>
        <div class="small muted">${heroSub}${ranInfo.length ? ' ・ ' + ranInfo.join(' ・ ') : ''}</div>
      </div>
      <div class="auto-hero-meter">${s3Strip(a)}</div>
    </div>
    ${canRun ? `
    <div class="panel auto-runbox">
      <div class="auto-runbox-head">🚀 3ステップで実行</div>
      <div class="auto-run-steps">
        <div class="auto-run-step"><span class="k">1</span><div>下の「コマンドをコピー」ボタンを押す</div></div>
        <div class="auto-run-step"><span class="k">2</span><div>会社のPCの <code>ms-ad-runner</code> フォルダーで貼り付けて実行（ログイン画面が出たら手動でログイン）</div></div>
        <div class="auto-run-step"><span class="k">3</span><div>終わると <code>logs${esc(c.id)}\</code> に証跡（スクリーンショット）が自動保存される</div></div>
      </div>
      <pre class="mono auto-cmd">${esc(cmd)}</pre>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;align-items:center">
        <button class="btn primary" data-action="copy-command" data-case="${esc(c.id)}">コマンドをコピー</button>
        <span class="small muted">目で確かめたい時（自宅PC）: <code>node demo.mjs --case ${esc(c.id)}</code></span>
      </div>
    </div>` : `
    <div class="panel" style="margin-top:12px"><div class="panel-body small muted" style="padding:12px 14px">このケースは積木の実装待ちです。実装されるとここに実行コマンドが表示されます。</div></div>`}
    <div class="panel" style="margin-top:12px">
      <div class="panel-head"><h3>🧩 この本の自動化の流れ（${details.length} ブロック）</h3>
        <span class="hint">🟩 検証済＝実機通過 ・ 🟧 実装済＝模擬環境通過 ・ ⬜ 未着手</span></div>
      <div class="auto-steps">${blockRows}</div>
      ${ranInfo.length ? `<div class="panel-body small" style="border-top:1px solid var(--line-2)">📸 証跡: <a href="../../logs/${esc(c.id)}/" target="_blank">logs${esc(c.id)}\ を開く</a>（ローカル環境のみ）</div>` : ''}
    </div>` + runnerDefHtml(c) + legacy;
  }

  function memoHtml(c) {
    const p = pget(c.id);
    return `<div class="panel"><div class="panel-head"><h3>メモ</h3><span class="hint">自動保存（フォーカスを外すと保存）</span></div><div class="panel-body"><textarea data-field="memo" data-case-id="${esc(c.id)}" style="width:100%;min-height:220px;border:1px solid var(--line);border-radius:9px;padding:10px">${esc(p.memo || '')}</textarea></div></div>`;
  }

  const CASE_TABS = [['procedure', '手順'], ['appendix', '別紙'], ['evidence', '証跡'], ['automation', '自動化'], ['memo', 'メモ']];

  function caseTabsHtml(c) {
    return `<div class="tabs">${CASE_TABS.map(([k, l]) => `<button class="tab ${state.tab === k ? 'active' : ''}" data-tab="${k}">${l}${k === 'evidence' ? ` <span class="badge outline">${evidenceItems(c).length}</span>` : ''}</button>`).join('')}</div>`;
  }

  function caseBodyHtml(c) {
    if (state.tab === 'appendix') return appendixHtml(c);
    if (state.tab === 'evidence') return evidenceHtml(c);
    if (state.tab === 'automation') return automationHtml(c);
    if (state.tab === 'memo') return memoHtml(c);
    return procedureHtml(c);
  }

  function summaryHtml(id) {
    const tid = SUMMARY.caseToTpl?.[id];
    if (!tid) return '';
    const t = SUMMARY.tpl?.[tid];
    if (!t) return '';
    const same = t.cases.length > 1 ? `${t.cases.length} 本同模板` : '単一';
    return `<details class="panel" style="margin-bottom:10px;border-left:3px solid var(--accent,#0e7490)">
      <summary style="cursor:pointer;padding:10px 13px;font-size:12.5px;font-weight:700">要約 — ${esc(t.biz.split('（')[0])} <span class="badge outline">${same}</span></summary>
      <div class="panel-body small" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <p style="margin:0 0 4px"><b>業務</b></p><p class="small" style="margin:0">${esc(t.biz)}</p>
          <p style="margin:8px 0 4px"><b>画面流</b></p><p class="small muted" style="margin:0">${esc(t.flow)}</p>
          <p style="margin:8px 0 4px"><b>自動化</b></p><p class="small muted" style="margin:0">${esc(t.auto)}</p>
        </div>
        <div>
          <p style="margin:0 0 4px"><b>操作</b></p>
          <div class="small" style="white-space:pre-wrap;max-height:180px;overflow:auto">${esc(t.ops)}</div>
        </div>
      </div>
      ${t.diff ? `<details style="margin-top:8px"><summary class="small muted" style="cursor:pointer">同模板差異（${t.cases.length} 本）</summary><div class="small" style="white-space:pre-wrap">${esc(t.diff)}</div></details>` : ''}
    </details>`;
  }

  function caseContentHtml(meta, c) {
    return caseHeader(meta) + resultBar(meta.id) + summaryHtml(meta.id) + caseTabsHtml(c) + caseBodyHtml(c);
  }

  async function renderCase(id) {
    const meta = caseById.get(id);
    if (!meta) { $('#main').innerHTML = empty('ケースが見つかりません'); return; }
    state.view = 'case';
    state.selectedCase = id;
    updateTopbar();
    $('#main').innerHTML = caseHeader(meta) + resultBar(id) + summaryHtml(id) + '<div class="loading">手順書を読み込んでいます…</div>';
    try {
      const data = await ensureCaseData(meta.categoryId);
      if (state.selectedCase !== id) return;
      const c = data[id];
      if (!c) {
        $('#main').innerHTML = caseHeader(meta) + resultBar(id) + empty('手順書データが見つかりません（workflow / 別紙なし）。');
        return;
      }
      $('#main').innerHTML = caseContentHtml(meta, c);
    } catch (err) {
      console.error(err);
      $('#main').innerHTML = caseHeader(meta) + resultBar(id) + empty(`読み込みに失敗しました: ${err.message}`);
    }
  }

  async function renderDrawer(id) {
    const meta = caseById.get(id);
    if (!meta) return;
    const dc = $('#drawerContent');
    dc.innerHTML = caseHeader(meta) + resultBar(id) + summaryHtml(id) + '<div class="loading">手順書を読み込んでいます…</div>';
    try {
      const data = await ensureCaseData(meta.categoryId);
      if (state.drawerCase !== id) return;
      const c = data[id];
      if (!c) {
        dc.innerHTML = caseHeader(meta) + resultBar(id) + empty('手順書データが見つかりません（workflow / 別紙なし）。');
        return;
      }
      dc.innerHTML = caseContentHtml(meta, c);
      updateDrawerNav();
    } catch (err) {
      console.error(err);
      dc.innerHTML = caseHeader(meta) + resultBar(id) + empty(`読み込みに失敗しました: ${err.message}`);
    }
  }

  function openCaseDrawer(id, tab = 'procedure', context = '', nav = null) {
    const meta = caseById.get(id);
    if (!meta) { go('case', id); return; }
    if (state.drawerCase !== id) state.tab = tab;
    state.drawerCase = id;
    state.drawerNav = nav;
    if (nav) {
      const list = routeCaseList(routeById.get(nav.routeId));
      const idx = list.indexOf(id);
      if (idx >= 0) context = `${nav.routeId} / ${idx + 1}`;
    }
    $('#drawerLabel').textContent = context ? `${id} · ${context}` : id;
    $('#drawerBackdrop').classList.add('open');
    $('#caseDrawer').classList.add('open');
    document.body.classList.add('drawer-open');
    $('#caseDrawer').setAttribute('aria-hidden', 'false');
    updateDrawerNav();
    renderDrawer(id);
  }

  function updateDrawerNav() {
    const prev = $('#drawerPrev'), next = $('#drawerNext');
    if (!prev || !next) return;
    const nav = state.drawerNav;
    if (!nav) { prev.classList.add('hidden'); next.classList.add('hidden'); return; }
    const list = routeCaseList(routeById.get(nav.routeId));
    const idx = list.indexOf(state.drawerCase);
    prev.classList.toggle('hidden', idx <= 0);
    next.classList.toggle('hidden', idx < 0 || idx >= list.length - 1);
  }

  function navDrawer(delta) {
    const nav = state.drawerNav;
    if (!nav) return;
    const list = routeCaseList(routeById.get(nav.routeId));
    const idx = list.indexOf(state.drawerCase);
    const next = list[idx + delta];
    if (next) openCaseDrawer(next, 'procedure', '', nav);
  }

  function closeCaseDrawer() {
    state.drawerCase = null;
    state.drawerNav = null;
    $('#drawerBackdrop').classList.remove('open');
    $('#caseDrawer').classList.remove('open');
    document.body.classList.remove('drawer-open');
    $('#caseDrawer').setAttribute('aria-hidden', 'true');
  }

  function refreshCaseView(id) {
    if (state.drawerCase === id) renderDrawer(id);
    else renderCase(id);
  }

  /* ------------------------------------------------------------------ */
  /* automation coverage                                                 */
  /* ------------------------------------------------------------------ */

  function scheduleOf(id) { return SCHEDULE.cases?.[id] || null; }

  function renderSchedule() {
    const entries = Object.entries(SCHEDULE.cases || {}).map(([id, s]) => {
      const meta = caseById.get(id);
      const p = pget(id);
      const a = autoCase(id);
      const done = !!(p.execution && p.execution !== '未実施');
      return { id, ...s, title: meta?.functionName || s.fn, done, s3: a?.status3 || 'planned', cov: a?.coverage3 || null };
    }).sort((x, y) => (x.start < y.start ? -1 : x.start > y.start ? 1 : x.id < y.id ? -1 : 1));
    // group by start date
    const groups = [];
    for (const e of entries) {
      const last = groups[groups.length - 1];
      if (last && last.start === e.start) last.items.push(e);
      else groups.push({ start: e.start, end: e.end, items: [e] });
    }
    const total = entries.length;
    const doneCount = entries.filter((e) => e.done).length;
    const today = new Date().toISOString().slice(0, 10);
    const weekMs = 7 * 86400000;
    const rows = groups.map((g) => {
      const gDone = g.items.filter((i) => i.done).length;
      const isNow = today >= g.start && today <= new Date(new Date(g.end).getTime() + weekMs).toISOString().slice(0, 10);
      const items = g.items.map((i) => {
        const strip = i.cov ? s3Strip({ coverage3: i.cov, blockDetails: null }, { compact: true, showPct: false }) : '';
        return `<tr class="case-row-click" data-case="${esc(i.id)}">
          <td><span class="mono">${esc(i.id)}</span></td>
          <td>${esc(i.title || '')}</td>
          <td>${i.id.includes('AD') || i.company === 'AD' ? '<span class="badge gray">AD</span>' : '<span class="badge blue">MS</span>'}</td>
          <td>${i.done ? '<span class="badge green">実施済</span>' : '<span class="badge outline">未実施</span>'}</td>
          <td style="min-width:110px">${strip || '<span class="faint small">—</span>'}</td>
          <td class="small muted">${esc(i.endLabel)}</td>
        </tr>`;
      }).join('');
      return `<div class="panel sched-group ${isNow ? 'now' : ''}" style="margin-bottom:12px">
        <div class="panel-head" style="cursor:pointer" data-schedgroup="${esc(g.start)}">
          <h3><span class="mono">${esc(g.items[0].startLabel)}</span> 〜 <span class="mono">${esc(g.endLabel)}</span> <span class="badge outline">${g.items.length} 本</span>${isNow ? " <span class=\"badge green\">今周</span>" : ""}</h3>
          <span class="hint">${gDone ? `${gDone}/${g.items.length} 実施済` : '未開始'}</span>
        </div>
        <div class="table-wrap" style="max-height:44vh"><table class="data"><thead><tr><th>ケース</th><th>機能</th><th>会社</th><th>実施</th><th>自動化進捗</th><th>終了予定</th></tr></thead><tbody>${items}</tbody></table></div>
      </div>`;
    }).join('');
    $('#main').innerHTML = `
      ${pageHead('日程', '担当 450 本の実施予定（開始日順・同日グループ）。必ずしも日付順にやる必要はなく、前後の本とつながって進める想定')}
      <div class="kpis" style="grid-template-columns:repeat(5,minmax(0,1fr))">
        ${kpi('総本数', total, '自分の担当', 'accent')}
        ${kpi('実施済', doneCount, '記録より', 'green')}
        ${kpi('未実施', total - doneCount, '', 'blue')}
        ${kpi('予定枠', groups.length, '開始日グループ', 'violet')}
        ${kpi('最初の開始', entries[0]?.startLabel || '—', entries[0]?.id || '', 'amber')}
      </div>
      <div class="s3-legend" style="margin:2px 0 10px"><span class="small muted">グループヘッダをクリックで開閉。行クリックでケースを開く。</span></div>
      ${rows}`;
    // toggle groups
    $$('#main [data-schedgroup]').forEach((h) => h.addEventListener('click', () => {
      const wrap = h.closest('.sched-group');
      const body = wrap.querySelector('.table-wrap');
      body.style.display = body.style.display === 'none' ? '' : 'none';
    }));
  }


  /* ------------------------------------------------------------------ */
  /* evidence / manual inbox                                             */
  /* ------------------------------------------------------------------ */

  function renderManual() {
    const all = Object.keys(EVIDENCE).sort();
    const q = (state.manualQuery || '').toLowerCase();
    const filter = state.manualFilter || 'all';
    const rows = all.map((id) => {
      const s = evsum(id) || {};
      const ms = evcase(id).manualSteps || [];
      const op = ms.filter((m) => m.phase === '操作').length;
      const chk = ms.filter((m) => m.phase === '確認').length;
      return { id, s, ms, op, chk, status: evcase(id).status };
    }).filter((r) => {
      if (q && !`${r.id} ${caseById.get(r.id)?.functionName || ''}`.toLowerCase().includes(q)) return false;
      if (filter === 'manual') return (r.s.manual || 0) > 0;
      if (filter === 'manualOp') return r.op > 0;
      if (filter === 'missing') return (r.s.missing || 0) > 0;
      if (filter === 'auto') return r.ms.length === 0 && (r.s.manual || 0) === 0;
      return true;
    });
    const totalManual = all.reduce((n, id) => n + (evsum(id).manual || 0), 0);
    const totalMissing = all.reduce((n, id) => n + (evsum(id).missing || 0), 0);
    const totalOp = all.reduce((n, id) => n + (evcase(id).manualSteps || []).filter((m) => m.phase === '操作').length, 0);
    const totalChk = all.reduce((n, id) => n + (evcase(id).manualSteps || []).filter((m) => m.phase === '確認').length, 0);
    const fbtn = (k, label) => `<button class="btn ${filter === k ? 'primary' : ''}" data-manual-filter="${k}">${label}</button>`;
    const body = rows.map((r) => {
      const s = r.s || {};
      const short = r.ms.slice(0, 2).map((m) => `行${m.row} [${esc(m.phase)}] ${esc(m.item)}`).join(' / ');
      return `<tr class="case-row-click" data-case="${esc(r.id)}">
        <td><span class="mono">${esc(r.id)}</span><div class="small muted">${esc(caseById.get(r.id)?.functionName || '')}</div></td>
        <td>${r.status === 'pass' ? '<span class="badge green">mock pass</span>' : `<span class="badge amber">${esc(r.status || '—')}</span>`}</td>
        <td class="num">${s.hc || 0}</td>
        <td class="num">${s.exact || 0}</td>
        <td class="num">${s.blockEnd || 0}</td>
        <td class="num">${s.manual || 0}</td>
        <td class="num">${s.missing ? `<span class="badge red">${s.missing}</span>` : 0}</td>
        <td class="num">${r.op}</td>
        <td class="num">${r.chk}</td>
        <td class="small">${short || '<span class="muted">—</span>'}</td>
      </tr>`;
    }).join('');
    $('#main').innerHTML = `${pageHead('証跡・人工', '画面HCの自動取得と、真機で人が確認する項目', `<input id="manualQuery" class="input" placeholder="ケースID / 機能名で検索" value="${esc(state.manualQuery || '')}"> <a class="btn" href="../evidence/index.xlsx" download>Excel索引</a>`)}
      <div class="kpis">
        ${kpi('対象ケース', all.length, '証跡データあり', 'accent')}
        ${kpi('画面HC 人工', totalManual, '无截图 / 要人确认', 'violet')}
        ${kpi('人工操作', totalOp, 'F12・JP1・待機など', 'blue')}
        ${kpi('人工確認', totalChk, 'AP/DBログ・表など', 'amber')}
        ${kpi('証跡未取得', totalMissing, '要修正', 'red')}
      </div>
      <div class="panel"><div class="panel-body" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        ${fbtn('all', 'すべて')}${fbtn('manual', '画面HC人工あり')}${fbtn('manualOp', '人工操作あり')}${fbtn('missing', '証跡未取得')}${fbtn('auto', '自動のみ')}
        <span class="hint" style="margin-left:auto">${rows.length} 件</span>
      </div></div>
      <section class="panel mt"><div class="table-wrap"><table class="data">
        <thead><tr><th>ケース</th><th>実行</th><th class="num">画面HC</th><th class="num">自動</th><th class="num">近似</th><th class="num">HC人工</th><th class="num">未取得</th><th class="num">人工操作</th><th class="num">人工確認</th><th>主な人工項目</th></tr></thead>
        <tbody>${body || '<tr><td colspan="10" class="muted">該当なし</td></tr>'}</tbody>
      </table></div></section>`;
  }

  function renderAutomation() {
    const sum = AUTO.summary || {};
    const cases = Object.entries(AUTO.cases || {}).sort((a, b) => a[0].localeCompare(b[0]));
    const runners = cases.filter(([, a]) => a.runner);
    const full = (sum.fullCaseIds || []).map((id) => [id, AUTO.cases?.[id]]).filter(([, a]) => a);
    const blocks = [...(AUTO.blocks || [])].sort((a, b) => (b.usedByCases || 0) - (a.usedByCases || 0));
    const gaps = sum.topGaps || [];
    const pct = (sum.eventCoverage || 0) * 100;
    const runnerRows = runners.map(([id, a]) => `<tr>
      <td><span class="mono">${esc(id)}</span><div class="small muted">${esc(caseById.get(id)?.functionName || '')}</div></td>
      <td>${runnerStatusBadge(a.runner.status)}</td>
      <td><span class="mono">${esc(a.runner.script)}</span></td>
      <td class="small">${esc(a.runner.note || '')}</td>
      <td><button class="btn" data-action="copy-command" data-case="${esc(id)}">コピー</button></td>
    </tr>`).join('');
    const nextText = (a) => a.nextGap ? (a.nextGap.kind === 'block' ? a.nextGap.block : gapLabel(a.nextGap.event)) : '—';
    const fullRows = full.map(([id, a]) => `<tr>
      <td><span class="mono">${esc(id)}</span></td>
      <td>${(a.blocks || []).map((b) => `<span class="badge outline">${esc(b)}</span>`).join(' ')}</td>
      <td class="num">${a.actualDone || 0}/${a.blocks.length}</td>
      <td class="num">${a.eventCount}</td>
    </tr>`).join('');
    const blockRows = blocks.map((b) => `<tr>
      <td><span class="mono">${esc(b.id)}</span></td>
      <td>${esc(b.fromScreen)} → ${esc(b.toScreen)}</td>
      <td class="num">${fmt(b.usedByCases)}</td>
      <td>${b.status === 'live-verified' ? '<span class="badge green">live</span>' : b.status === 'mock-verified' ? '<span class="badge amber">mock</span>' : b.status === 'draft-auto' ? '<span class="badge violet">auto</span>' : '<span class="badge gray">source</span>'}</td>
      <td>${executionBadge(b.executionStatus)}</td>
      <td class="small">${esc((b.params || []).join(', '))}</td>
    </tr>`).join('');
    const gapRows = gaps.map((g) => `<tr><td class="num">${fmt(g.count)}</td><td><code>${esc(gapLabel(g.event))}</code></td></tr>`).join('');
    const allRows = cases.map(([id, a]) => `<tr>
      <td><span class="mono">${esc(id)}</span></td>
      <td>${s3Badge(a.status3)}</td>
      <td>${autoStatusBadge(a.status)}</td>
      <td class="num">${a.actualDone || 0}/${a.blocks.length}</td>
      <td><code>${esc(nextText(a))}</code></td>
      <td>${a.runner ? runnerStatusBadge(a.runner.status) : '<span class="badge gray">—</span>'}</td>
    </tr>`).join('');
    $('#main').innerHTML = `
      ${pageHead('自動化', 'block composition / runner readiness（静的な一致結果。実行証明ではありません）')}
      <div class="panel" style="margin-bottom:14px;border-left:4px solid var(--accent)">
        <div class="panel-body" style="display:flex;gap:22px;flex-wrap:wrap;align-items:center">
          <div style="min-width:180px">
            <div style="font-size:15px;font-weight:700">自動化の使い方</div>
            <div class="small muted">① 本を開く → ② run.cmd コピー → ③ 会社機で実行 → ④ 証跡は logs/ に自動保存</div>
          </div>
          <div class="s3-legend" style="margin:0">
            <span class="s3-seg s3-verified" style="width:26px"></span><b>検証済</b><span class="small muted">＝会社機の実システムで通過</span>
            <span class="s3-seg s3-coded" style="width:26px"></span><b>実装済</b><span class="small muted">＝コード有・模擬環境で通過</span>
            <span class="s3-seg s3-planned" style="width:26px"></span><b>未着手</b><span class="small muted">＝手順は積木化済・コード待ち</span>
          </div>
        </div>
      </div>
      <div class="kpis">
        ${kpi('対象ケース', sum.caseCount || 0, '自分のタスク', 'accent')}
        ${kpi('検証済', sum.status3CaseCounts?.verified || 0, '真機で全ブロック通過', 'green')}
        ${kpi('実装済', sum.status3CaseCounts?.coded || 0, 'コードあり / 真機は未完', 'amber')}
        ${kpi('未着手', sum.status3CaseCounts?.planned || 0, 'ブロック一致だが未実装', 'blue')}
        ${kpi('無一致', sum.status3CaseCounts?.none || 0, 'ブロックが組めない単例等', 'gray')}
        ${kpi('Block', sum.blockCount || 0, `検証 ${sum.status3Counts?.verified || 0} / 実装 ${sum.status3Counts?.coded || 0} / 未着手 ${sum.status3Counts?.planned || 0}`, 'violet')}
      </div>
      <section class="panel mt">
        <div class="panel-head"><h3>積木進捗（三状態）</h3><span class="hint">🟩 検証済（真機通過）・🟧 実装済（mock 通過・真機未）・⬜ 未着手・▨ 未カバー</span></div>
        <div class="panel-body">
          <div class="s3-legend">
            <span class="s3-seg s3-verified" style="width:22px"></span>検証済
            <span class="s3-seg s3-coded" style="width:22px"></span>実装済
            <span class="s3-seg s3-planned" style="width:22px"></span>未着手
            <span class="s3-seg s3-uncovered" style="width:22px"></span>未カバー
          </div>
          <div class="table-wrap" style="max-height:56vh">
            <table class="data"><thead><tr><th>ケース</th><th>状態</th><th style="min-width:220px">進捗（ブロック構成比）</th><th class="num">実装+検証 / 全 event</th><th>次の一手</th></tr></thead>
            <tbody>${cases.map(([id, a]) => `<tr>
              <td><span class="mono" style="cursor:pointer" data-case="${esc(id)}">${esc(id)}</span></td>
              <td>${s3Badge(a.status3)}</td>
              <td>${s3Strip(a, { compact: true })}</td>
              <td class="num">${((a.coverage3?.verified || 0) + (a.coverage3?.coded || 0))} / ${a.coverage3?.total ?? a.eventCount}</td>
              <td class="small"><code>${esc(nextText(a))}</code></td>
            </tr>`).join('')}</tbody></table>
          </div>
        </div>
      </section>
      <section class="panel mt">
        <div class="panel-head"><h3>Runner 可能なケース</h3><span class="hint">コマンドをコピーして SUT 端末で実行</span></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>ケース</th><th>状態</th><th>Script</th><th>Note</th><th></th></tr></thead><tbody>${runnerRows || '<tr><td colspan="5" class="muted">runner はまだありません</td></tr>'}</tbody></table></div>
      </section>
      <section class="panel mt">
        <div class="panel-head"><h3>Block 完全一致（静的）</h3><span class="hint">${full.length} ケース / auto-inclusive</span></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>ケース</th><th>Block composition</th><th class="num">Live / blocks</th><th class="num">Events</th></tr></thead><tbody>${fullRows || '<tr><td colspan="4" class="muted">なし</td></tr>'}</tbody></table></div>
      </section>
      <section class="panel mt">
        <div class="panel-head"><h3>Block registry</h3><span class="hint">${blocks.length} blocks / 使用ケース数</span></div>
        <div class="table-wrap"><table class="data"><thead><tr><th>Block</th><th>種別</th><th>From → To</th><th class="num">Cases</th><th>Status3</th><th>Selector</th><th>Execution</th><th>Params</th></tr></thead><tbody>${blockRows}</tbody></table></div>
      </section>
      <section class="panel mt">
        <div class="panel-head"><h3>未カバー event</h3><span class="hint">次の block 候補</span></div>
        <div class="table-wrap"><table class="data"><thead><tr><th class="num">Cases</th><th>Event</th></tr></thead><tbody>${gapRows || '<tr><td colspan="2" class="muted">なし</td></tr>'}</tbody></table></div>
      </section>
      <details class="panel mt">
        <summary style="cursor:pointer;padding:11px 14px;font-size:13px;font-weight:700">全ケースの composition（${cases.length}）</summary>
        <div class="table-wrap" style="max-height:60vh"><table class="data"><thead><tr><th>ケース</th><th>三状態</th><th>Static</th><th class="num">Live / blocks</th><th>Next</th><th>Runner</th></tr></thead><tbody>${allRows}</tbody></table></div>
      </details>`;
  }

  /* ------------------------------------------------------------------ */
  /* references                                                          */
  /* ------------------------------------------------------------------ */

  function renderRefs() {
    const tabs = [['status', 'ステータス遷移'], ['todo', 'ToDo パターン'], ['timezone', 'タイムゾーン'], ['users', 'ユーザ一覧']];
    let body = '';
    if (state.refTab === 'status') body = `
      <div class="grid-2">
        <div class="panel"><div class="panel-head"><h3>読み方</h3></div><div class="panel-body small">
          <p><b>状態（営業対応状況 / 代理店対応状況）</b><br>0=対象外、1=未対応、2=対応中、3=回答済、4=完了</p>
          <p><b>ボタンコード</b><br>1A=更新、1B=印刷、1C=完了登録、1D=完了取消、1E=削除、1F=回答、1G=確認済、1H=営業連携、1I=代理店連携、1J=連携取消、1K=一時中断、1L=回答、1M=印刷、1N=メール用コピー、1O=確認済<br>2A〜2O は代理店側の同じ操作。</p>
          <p><b>記号</b><br>○=活性、△=非活性、●=特定の点検区分のみ活性、×=非表示</p>
        </div></div>
        <div class="panel"><div class="panel-head"><h3>シナリオ一览との関係</h3></div><div class="panel-body small">
          <p>シナリオ一览の「シナリオ」欄に <code>1A / 0 / ＝ / 0</code> のように「ボタン / 現在状態 / 条件 / 期待結果」が入っています。これはこの表の1行分を抜き出したものです。</p>
          <p>実施順序の「導線」も同じ4点セットで、ルート上の操作順を表します。</p>
        </div></div>
      </div>
      <p class="ref-note" style="margin-top:12px">【別紙1】ステータス遷移（Excel 原本）</p>${rawTable(REFS.statusMatrix || [], { maxRows: 300, maxHeight: '60vh' })}`;
    else if (state.refTab === 'todo') body = `<p class="ref-note">【別紙2-1】ToDo パターン整理。試験対象「〇」の 81 組み合わせが、<span class="badge outline" data-scenario="AZ-230-01" style="cursor:pointer">AZ-230-01</span> の 162 パターン（MS 81 + AD 81）に対応します。</p>${rawTable(REFS.todoPatterns || [], { maxRows: 300, maxHeight: '52vh' })}<h3 style="margin:18px 0 8px;font-size:13px">【別紙2-2】ToDo パターン導線（1〜4回目の送信状態）</h3>${rawTable(REFS.todoRoutes || [], { maxRows: 120, maxHeight: '52vh' })}`;
    else if (state.refTab === 'timezone') body = `<p class="ref-note">タイムゾーン確認。事業会社 7 ケース + 代理店 7 ケースで、<span class="badge outline" data-scenario="AZ-100-08" style="cursor:pointer">AZ-100-08</span>（14 パターン）と <span class="badge outline" data-scenario="AZ-200-07" style="cursor:pointer">AZ-200-07</span>（11 パターン）に対応します。</p>${rawTable(REFS.timezone || [], { maxRows: 120, maxHeight: '64vh' })}`;
    else body = `<p class="ref-note">AZ ユーザ一覧（MS-10〜MS-49、点検区分別）</p>${rawTable(REFS.usersAz || [], { maxRows: 60 })}<h3 style="margin:18px 0 8px;font-size:13px">AY ユーザ一覧</h3>${rawTable(REFS.usersAy || [], { maxRows: 20 })}`;
    $('#main').innerHTML = `${pageHead('参考資料', '')}
      <div class="ref-tabs">${tabs.map(([k, l]) => `<button class="tab ${state.refTab === k ? 'active' : ''}" data-reftab="${k}">${l}</button>`).join('')}</div>${body}`;
  }

  /* ------------------------------------------------------------------ */
  /* validation modal                                                    */
  /* ------------------------------------------------------------------ */

  function openModal(title, html) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = html;
    $('#modal').classList.remove('hidden');
  }
  function closeModal() { $('#modal').classList.add('hidden'); }

  function renderValidation(which) {
    const w = VALID.warnings || {};
    const counts = VALID.counts || {};
    const sections = [];
    const idList = (ids, emptyMsg) => (ids && ids.length ? `<div class="list">${ids.slice(0, 200).map((id) => `<div class="row-card" data-case="${esc(id)}"><div class="id">${esc(id)}</div><div class="right"><span class="badge outline">開く</span></div></div>`).join('')}</div>${ids.length > 200 ? `<p class="small muted">先頭200件</p>` : ''}` : `<p class="muted">${emptyMsg}</p>`);
    if (!which || which === 'missingAppendix') sections.push(`<h3>別紙なし（${(w.missingAppendix || []).length}）</h3>${idList(w.missingAppendix, 'なし')}`);
    if (!which || which === 'missingWorkflow') sections.push(`<h3>手順書なし（${(w.missingWorkflow || []).length}）</h3>${idList(w.missingWorkflow, 'なし')}`);
    if (!which || which === 'old') sections.push(`<h3>旧版・廃止前（${(w.old || []).length}）</h3>${idList(w.old, 'なし')}`);
    if (!which || which === 'invalidRouteCaseIds') {
      const xs = w.invalidRouteCaseIds || [];
      sections.push(`<h3>ルート上の未作成ケース（${xs.length}）</h3>${xs.length ? `<div class="table-wrap"><table class="data"><thead><tr><th>ルート</th><th>ケースID</th></tr></thead><tbody>${xs.map((x) => `<tr><td class="mono">${esc(x.routeId)}</td><td class="mono">${esc(x.caseId)}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">なし</p>'}`);
    }
    if (!which || which === 'xMismatch') sections.push(`<h3>X とケース数が不一致（${(w.xMismatch || []).length}）</h3><div class="table-wrap"><table class="data"><thead><tr><th>シナリオ</th><th class="num">X</th><th class="num">ケース</th></tr></thead><tbody>${(w.xMismatch || []).map((x) => `<tr><td class="mono">${esc(x.scenarioId)}</td><td class="num">${x.x}</td><td class="num">${x.cases}</td></tr>`).join('')}</tbody></table></div>`);
    if (!which || which === 'sdMismatch') sections.push(`<h3>S/D と MS/AD が不一致（${(w.sdMismatch || []).length}）</h3><div class="table-wrap"><table class="data"><thead><tr><th>シナリオ</th><th class="num">S</th><th class="num">D</th><th class="num">MS</th><th class="num">AD</th></tr></thead><tbody>${(w.sdMismatch || []).map((x) => `<tr><td class="mono">${esc(x.scenarioId)}</td><td class="num">${x.s}</td><td class="num">${x.d}</td><td class="num">${x.ms}</td><td class="num">${x.ad}</td></tr>`).join('')}</tbody></table></div>`);
    if (!which || which === 'duplicateAppendix') {
      const d = w.duplicateAppendix || {};
      sections.push(`<h3>別紙 ID 重複（${Object.keys(d).length}）</h3>${Object.keys(d).length ? `<div class="table-wrap"><table class="data"><thead><tr><th>ケース</th><th>重複ファイル</th></tr></thead><tbody>${Object.entries(d).slice(0, 100).map(([id, arr]) => `<tr><td class="mono">${esc(id)}</td><td>${esc((arr || []).join(' / '))}</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted">なし</p>'}`);
    }
    sections.push(`<h3>件数</h3><pre class="mono" style="background:var(--panel-2);padding:10px;border-radius:9px;overflow:auto">${esc(JSON.stringify(counts, null, 2))}</pre>`);
    openModal('データチェック', sections.join('<div style="height:14px"></div>'));
  }

  /* ------------------------------------------------------------------ */
  /* export / import                                                     */
  /* ------------------------------------------------------------------ */

  function exportAll() {
    const payload = {
      version: 2,
      exportedAt: new Date().toISOString(),
      app: 'msad-workbench',
      progress: state.progress,
      tasks: state.tasks,
      automation: state.automation,
    };
    download(`msad-workbench-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2));
    toast('エクスポートしました');
  }
  async function exportCase(id) {
    const meta = caseById.get(id);
    if (!meta) return;
    await ensureCaseData(meta.categoryId);
    const c = state.caseCache[meta.categoryId]?.[id] || null;
    const payload = {
      exportedAt: new Date().toISOString(),
      meta,
      case: c,
      automation: state.automation[id] || { scriptType: 'console', locators: [] },
      progress: pget(id),
    };
    download(`${id}.json`, JSON.stringify(payload, null, 2));
    toast('ケースJSONを保存しました');
  }

  function exportCsv() {
    const head = ['caseId','scenarioId','categoryId','company','functionName','execution','result','verify','defectNo','executedAt','executedBy','verifiedAt','verifiedBy','evidenceDone','evidenceTotal','memo'];
    const rows = [head];
    for (const c of [...caseById.values()].sort((a, b) => a.id.localeCompare(b.id))) {
      const p = pget(c.id);
      const ev = Object.values(p.evidence || {}).filter(Boolean).length;
      const cached = state.caseCache[c.categoryId]?.[c.id];
      const evTotal = cached ? (cached.workflow?.rows || []).filter((r) => r.evidenceType).length : '';
      rows.push([c.id, c.scenarioId, c.categoryId, c.company, c.functionName, p.execution || 'NOT_STARTED', p.result || '', p.verify || 'NOT_STARTED', p.defectNo || '', p.executedAt || '', p.executedBy || '', p.verifiedAt || '', p.verifiedBy || '', ev, evTotal, (p.memo || '').replace(/\r?\n/g, ' ')]);
    }
    const csv = rows.map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    download(`msad-results-${new Date().toISOString().slice(0, 10)}.csv`, '\ufeff' + csv, 'text/csv;charset=utf-8');
    toast('CSV をエクスポートしました');
  }

  function mergeImported(obj) {
    if (!obj || typeof obj !== 'object') return false;
    let merged = false;
    if (obj.progress && typeof obj.progress === 'object') {
      state.progress = { ...state.progress, ...obj.progress };
      save(LS.progress, state.progress);
      merged = true;
    }
    if (obj.tasks && Array.isArray(obj.tasks.ids)) {
      for (const id of obj.tasks.ids) if (caseById.has(id)) taskSet.add(id);
      state.tasks = { ids: [...taskSet], importedAt: obj.tasks.importedAt || new Date().toISOString() };
      save(LS.tasks, state.tasks);
      merged = true;
    }
    if (obj.automation && typeof obj.automation === 'object') {
      state.automation = { ...state.automation, ...obj.automation };
      save(LS.automation, state.automation);
      merged = true;
    }
    if (Array.isArray(obj)) {
      for (const id of obj) if (caseById.has(id)) taskSet.add(id);
      state.tasks = { ids: [...taskSet], importedAt: new Date().toISOString() };
      save(LS.tasks, state.tasks);
      merged = true;
    }
    return merged;
  }

  /* ------------------------------------------------------------------ */
  /* events                                                              */
  /* ------------------------------------------------------------------ */

  function bind() {
    $('#nav').addEventListener('click', (e) => {
      const b = e.target.closest('[data-view]');
      if (b) { state.query = ''; $('#globalSearch').value = ''; go(b.dataset.view); }
    });
    $('#globalSearch').addEventListener('input', (e) => {
      state.query = e.target.value.trim();
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        if (state.view === 'scenarios' || state.view === 'files') render();
        else if (state.query) go('scenarios');
      }, 180);
    });
    $('#globalSearch').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); go('scenarios'); }
    });
    $('#filterDomain').addEventListener('change', (e) => { state.filters.domain = e.target.value; state.filters.category = ''; populateCategoryFilter(); render(); });
    $('#filterCategory').addEventListener('change', (e) => { state.filters.category = e.target.value; render(); });
    $('#filterCompany').addEventListener('change', (e) => { state.filters.company = e.target.value; render(); });
    $('#filterStatus').addEventListener('change', (e) => { state.filters.status = e.target.value; render(); });
    $('#filterAssigned').addEventListener('change', (e) => { state.filters.assigned = e.target.checked; render(); });
    $('#filterMissing').addEventListener('change', (e) => { state.filters.missing = e.target.checked; render(); });
    $('#filterManual').addEventListener('change', (e) => { state.filters.manual = e.target.checked; render(); });
    $('#filterManualOp').addEventListener('change', (e) => { state.filters.manualOp = e.target.checked; render(); });
    $('#filterAutoOnly').addEventListener('change', (e) => { state.filters.autoOnly = e.target.checked; render(); });
    $('#filterEvMissing').addEventListener('change', (e) => { state.filters.evMissing = e.target.checked; render(); });
    $('#main').addEventListener('click', (e) => {
      const b = e.target.closest('[data-manual-filter]');
      if (b) { state.manualFilter = b.dataset.manualFilter; renderManual(); }
    });
    $('#main').addEventListener('input', (e) => {
      if (e.target.id === 'manualQuery') {
        const v = e.target.value;
        state.manualQuery = v;
        renderManual();
        const el = document.getElementById('manualQuery');
        if (el) { el.focus(); el.setSelectionRange(v.length, v.length); }
      }
    });
    $('#filterOld').addEventListener('change', (e) => { state.filters.old = e.target.checked; render(); });
    $('#filterRoute').addEventListener('change', (e) => { state.filters.route = e.target.checked; render(); });
    $('#btnTasks').addEventListener('click', () => go('tasks'));
    $('#btnExport').addEventListener('click', exportAll);
    $('#btnCsv').addEventListener('click', exportCsv);
    $('#btnValidation').addEventListener('click', () => renderValidation());
    $('#importFile').addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const obj = JSON.parse(text);
        if (!mergeImported(obj)) {
          const { ids } = parseTaskText(text);
          if (ids.length) importTasks(text); else toast('インポートできるデータがありません');
        }
      } catch (_) {
        importTasks(text);
      }
      e.target.value = '';
      toast('インポートしました');
      render();
    });
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBody').addEventListener('click', (e) => {
      const c = e.target.closest('[data-case]');
      if (c) { closeModal(); openCaseDrawer(c.dataset.case); }
    });
    $('#modal').addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });

    $('#main').addEventListener('click', async (e) => {
      const caseEl = e.target.closest('[data-case]');
      const scEl = e.target.closest('[data-scenario]');
      const rtEl = e.target.closest('[data-route]');
      const taskRt = e.target.closest('[data-task-route]');
      const tab = e.target.closest('[data-tab]');
      const appx = e.target.closest('[data-appx]');
      const appxView = e.target.closest('[data-appx-view]');
      const refTab = e.target.closest('[data-reftab]');
      const action = e.target.closest('[data-action]');
      if (tab) { state.tab = tab.dataset.tab; if (state.selectedCase) renderCase(state.selectedCase); return; }
      if (appx) { state.appendixSheet[appx.dataset.case] = Number(appx.dataset.appx); renderCase(appx.dataset.case); return; }
      if (appxView) { state.appendixView = appxView.dataset.appxView; if (state.selectedCase) renderCase(state.selectedCase); return; }
      if (refTab) { state.refTab = refTab.dataset.reftab; renderRefs(); return; }
      if (action) {
        const act = action.dataset.action;
        if (act === 'go-tasks') { go('tasks'); return; }
        if (act === 'import-tasks') { const t = $('#taskInput'); if (t) importTasks(t.value); else go('tasks'); return; }
        if (act === 'clear-tasks') { clearTasks(); return; }
        if (act === 'validation') { renderValidation(); return; }
        if (act === 'add-task') { taskSet.add(action.dataset.case); state.tasks = { ids: [...taskSet], importedAt: new Date().toISOString() }; save(LS.tasks, state.tasks); toast('タスクに追加しました'); refreshCaseView(action.dataset.case); return; }
        if (act === 'save-auto') { saveAutomation(action.dataset.case); return; }
        if (act === 'gen-auto') { generateAutomation(action.dataset.case); return; }
        if (act === 'seed-auto') { seedAutomation(action.dataset.case); return; }
        if (act === 'case-json') { exportCase(action.dataset.case); return; }
        if (act === 'copy-command') { const id = action.dataset.case; const a = autoCase(id); if (a?.runner) copyText(runnerCommand(id, a.runner)); return; }
        if (act === 'suggest-selectors') {
          const html = $('#outerHtmlInput')?.value || '';
          const cands = suggestSelectors(html);
          const out = $('#selectorOut');
          if (out) out.innerHTML = cands.length ? cands.map((x) => `<div class="ref-row"><span>${esc(x.label)}</span><code>${esc(x.selector)}</code></div>`).join('') : '候補を作れませんでした。outerHTML を確認してください。';
          return;
        }
      }
      if (caseEl) {
        const step = caseEl.closest('.chain-step');
        const routeId = step?.dataset.routeId;
        openCaseDrawer(caseEl.dataset.case, 'procedure', step?.dataset.routeContext || '', routeId ? { routeId } : null);
        return;
      }
      if (scEl) { go('scenario', scEl.dataset.scenario); return; }
      if (taskRt) { state.taskRouteId = taskRt.dataset.taskRoute; renderTasks(); return; }
      if (rtEl) { go('route', rtEl.dataset.route); return; }
      const cat = e.target.closest('[data-category]');
      if (cat) { state.filters.category = cat.dataset.category; state.filters.domain = cat.dataset.category.slice(0, 2); populateCategoryFilter(); go('scenarios'); }
    });

    $('#main').addEventListener('change', (e) => {
      const el = e.target;
      if (el.id === 'taskRouteSelect') { state.taskRouteId = el.value; renderTasks(); return; }
      if (el.matches('[data-field]')) {
        const id = el.dataset.caseId;
        const field = el.dataset.field;
        saveProgress(id, { [field]: el.value });
        toast('保存しました');
        if (field === 'execution' || field === 'verify' || field === 'result') renderCase(id);
      }
      const lb = el.closest('[data-lightbox]');
      if (lb) {
        e.preventDefault();
        e.stopPropagation();
        $('#lightboxImg').src = lb.dataset.lightbox;
        $('#lightbox').hidden = false;
        return;
      }
      if (el.id === 'lightbox' || el.id === 'lightboxClose') { $('#lightbox').hidden = true; return; }
      if (el.matches('[data-evidence]')) {
        const id = el.dataset.caseId;
        const key = el.dataset.evidence;
        const p = { ...(pget(id)) };
        p.evidence = { ...(p.evidence || {}), [key]: el.checked };
        state.progress[id] = p;
        save(LS.progress, state.progress);
        el.closest('.ev-item')?.classList.toggle('checked', el.checked);
        toast('証跡を更新しました');
      }
    });

    $('#main').addEventListener('input', (e) => {
      if (e.target.id === 'taskInput') return;
    });

    document.addEventListener('change', (e) => {
      if (e.target.id === 'taskFile') {
        const f = e.target.files?.[0];
        if (!f) return;
        f.text().then((text) => { importTasks(text); e.target.value = ''; });
      }
    });
    $('#drawerPrev').addEventListener('click', () => navDrawer(-1));
    $('#drawerNext').addEventListener('click', () => navDrawer(1));
    $('#drawerClose').addEventListener('click', closeCaseDrawer);
    $('#drawerBackdrop').addEventListener('click', closeCaseDrawer);
    $('#drawerFull').addEventListener('click', () => {
      const id = state.drawerCase;
      closeCaseDrawer();
      if (id) go('case', id);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.drawerCase) closeCaseDrawer();
    });

    $('#caseDrawer').addEventListener('click', (e) => {
      const tab = e.target.closest('[data-tab]');
      const appx = e.target.closest('[data-appx]');
      const appxView = e.target.closest('[data-appx-view]');
      const action = e.target.closest('[data-action]');
      const caseEl = e.target.closest('[data-case]');
      const rtEl = e.target.closest('[data-route]');
      const scEl = e.target.closest('[data-scenario]');
      if (tab) { state.tab = tab.dataset.tab; if (state.drawerCase) renderDrawer(state.drawerCase); return; }
      if (appx) { state.appendixSheet[appx.dataset.case] = Number(appx.dataset.appx); renderDrawer(appx.dataset.case); return; }
      if (appxView) { state.appendixView = appxView.dataset.appxView; if (state.drawerCase) renderDrawer(state.drawerCase); return; }
      if (action) {
        const act = action.dataset.action;
        if (act === 'add-task') {
          taskSet.add(action.dataset.case);
          state.tasks = { ids: [...taskSet], importedAt: new Date().toISOString() };
          save(LS.tasks, state.tasks);
          toast('タスクに追加しました');
          refreshCaseView(action.dataset.case);
          return;
        }
        if (act === 'save-auto') { saveAutomation(action.dataset.case); return; }
        if (act === 'gen-auto') { generateAutomation(action.dataset.case); return; }
        if (act === 'seed-auto') { seedAutomation(action.dataset.case); return; }
        if (act === 'case-json') { exportCase(action.dataset.case); return; }
        if (act === 'copy-command') { const id = action.dataset.case; const a = autoCase(id); if (a?.runner) copyText(runnerCommand(id, a.runner)); return; }
        if (act === 'suggest-selectors') {
          const html = $('#outerHtmlInput')?.value || '';
          const cands = suggestSelectors(html);
          const out = $('#selectorOut');
          if (out) out.innerHTML = cands.length ? cands.map((x) => `<div class="ref-row"><span>${esc(x.label)}</span><code>${esc(x.selector)}</code></div>`).join('') : '候補を作れませんでした。outerHTML を確認してください。';
          return;
        }
      }
      if (caseEl && caseEl.dataset.case !== state.drawerCase) {
        const step = caseEl.closest('.chain-step');
        const routeId = step?.dataset.routeId;
        openCaseDrawer(caseEl.dataset.case, 'procedure', step?.dataset.routeContext || '', routeId ? { routeId } : null);
        return;
      }
      if (rtEl) { closeCaseDrawer(); go('route', rtEl.dataset.route); return; }
      if (scEl) { closeCaseDrawer(); go('scenario', scEl.dataset.scenario); return; }
    });

    $('#caseDrawer').addEventListener('change', (e) => {
      const el = e.target;
      if (el.matches('[data-field]')) {
        const id = el.dataset.caseId;
        const field = el.dataset.field;
        saveProgress(id, { [field]: el.value });
        toast('保存しました');
        if (field === 'execution' || field === 'verify' || field === 'result') {
          renderDrawer(id);
          render();
        }
      }
      if (el.matches('[data-evidence]')) {
        const id = el.dataset.caseId;
        const key = el.dataset.evidence;
        const p = { ...(pget(id)) };
        p.evidence = { ...(p.evidence || {}), [key]: el.checked };
        state.progress[id] = p;
        save(LS.progress, state.progress);
        el.closest('.ev-item')?.classList.toggle('checked', el.checked);
        toast('証跡を更新しました');
      }
    });

    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#lightbox').hidden = true; });
    window.addEventListener('hashchange', applyRoute);
  }

  function saveProgress(id, patch) {
    state.progress[id] = { ...(state.progress[id] || {}), ...patch };
    save(LS.progress, state.progress);
    updateTopbar();
  }
  function saveAutomation(id) {
    const el = $('#autoJson');
    if (!el) return;
    try {
      const obj = JSON.parse(el.value);
      state.automation[id] = obj;
      save(LS.automation, state.automation);
      toast('自動化データを保存しました');
      refreshCaseView(id);
    } catch (err) {
      toast(`JSON エラー: ${err.message}`);
    }
  }
  function generateAutomation(id) {
    const out = $('#autoOut');
    if (out) out.textContent = snippetFor(id);
    toast('Console 片段を更新しました');
  }

  /* ------------------------------------------------------------------ */
  /* render switch                                                       */
  /* ------------------------------------------------------------------ */

  function render() {
    updateTopbar();
    if (state.view === 'dashboard') renderDashboard();
    else if (state.view === 'scenarios') renderScenarios();
    else if (state.view === 'routes') renderRoutes();
    else if (state.view === 'files') renderFiles();
    else if (state.view === 'tasks') renderTasks();
    else if (state.view === 'refs') renderRefs();
    else if (state.view === 'schedule') renderSchedule();
    else if (state.view === 'automation') renderAutomation();
    else if (state.view === 'manual') renderManual();
    else if (state.view === 'case' && state.selectedCase) renderCase(state.selectedCase);
    else if (state.view === 'scenario' && state.selectedScenario) renderScenario(state.selectedScenario);
    else if (state.view === 'route' && state.selectedRoute) renderRoute(state.selectedRoute);
    else renderDashboard();
  }

  /* ------------------------------------------------------------------ */
  /* init                                                                */
  /* ------------------------------------------------------------------ */

  function init() {
    bind();
    populateCategoryFilter();
    if (!DATA.meta || !DATA.caseIndex) {
      $('#main').innerHTML = empty('data/index.js が読み込まれていません。tools/build_data.py を実行してください。');
      return;
    }
    applyRoute();
    updateTopbar();
  }

  init();
})();
