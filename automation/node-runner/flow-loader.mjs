// 流程文件加载 + 编译（YAML → 可执行步骤）
// 与 tools/compile_flow.py 保持同一套归一化规则。两边改动必须同步。
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as yamlLoad } from 'js-yaml';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../..');

export function norm(s) {
  let x = String(s ?? '');
  x = x.replace(/\[\(.*?\)\]/g, '');
  x = x.replace(/\$\{.*?\}/g, '');
  x = x.replace(/&nbsp;/g, '').replace(/&amp;/g, '&');
  x = x.normalize('NFKC');
  x = x.replace(/\s+/g, '');
  x = x.replace(/コード/g, 'ｺｰﾄﾞ').replace(/ID/g, 'ＩＤ').replace(/id/g, 'ＩＤ');
  x = x.replace(/[*※]+$/g, '');
  x = x.replace(/[－ーｰ]/g, '-');
  return x;
}

let cachedDict = null;
let cachedScreens = null;
let cachedAliases = null;
let cachedOverlay = null;
let cachedControls = null;
let cachedBindings = null;

function loadJson(p, fallback) {
  if (!existsSync(p)) return fallback;
  return JSON.parse(readFileSync(p, 'utf8'));
}

// Binding table: (screenKey, normalized hand-procedure wording) -> control.
// Only auto/confirmed rules participate; needs-human rules stay out so they
// fail loudly instead of resolving by accident.
function loadBindings(base) {
  const p = join(base, 'flows', 'bindings.yaml');
  const map = new Map();
  if (!existsSync(p)) return map;
  let doc;
  try { doc = yamlLoad(readFileSync(p, 'utf8')) || {}; } catch { return map; }
  for (const r of doc.rules || []) {
    if (!r || !r.screen) continue;
    if (r.status !== 'auto' && r.status !== 'confirmed') continue;
    if (r.type !== 'template' && r.type !== 'field') continue;
    if (!r.selector) continue;
    map.set(`${r.screen}|${norm(r.key || r.phrase)}`, r);
  }
  return map;
}

export function loadDictionaries(base = ROOT) {  cachedDict = loadJson(join(base, 'ui-dictionary.json'), { screens: {} });
  cachedScreens = loadJson(join(base, 'ui-screens.json'), { screens: {} });
  cachedAliases = loadJson(join(base, 'ui-aliases.json'), { aliases: {} });
  cachedOverlay = loadJson(join(base, 'ui-rowfields.json'), { rowfields: {}, qualifiedButtons: {} });
  cachedControls = loadJson(join(base, 'ui-controls.json'), { screens: {} });
  cachedBindings = loadBindings(base);

  const byScreen = {};
  for (const [sk, page] of Object.entries(cachedDict.screens || {})) {
    const fields = {};
    // Use the precomputed selector: a control may be addressable only by name
    // (name=) rather than id (#). Trusting f.id alone dropped every name-only
    // control, including popup trigger buttons.
    for (const f of page.fields || []) {
      if (f.selector) fields[norm(f.label)] = { selector: f.selector, kind: f.kind, id: f.id || null, name: f.name || null };
    }
    for (const b of page.buttons || []) {
      if (b.selector && b.label && !fields[norm(b.label)]) {
        fields[norm(b.label)] = { selector: b.selector, kind: 'button', id: b.id || null, name: b.name || null };
      }
    }
    byScreen[sk] = fields;
  }
  return { dict: cachedDict, screens: cachedScreens, aliases: cachedAliases, overlay: cachedOverlay, byScreen };
}

function pageForScreen(screenName) {
  const screens = cachedScreens?.screens || {};
  let meta = screens[screenName];
  if (!meta) {
    const target = norm(screenName);
    for (const [k, v] of Object.entries(screens)) {
      if (norm(k) === target) { meta = v; break; }
    }
  }
  if (!meta || !meta.code) return { key: null, meta: meta || {} };
  return { key: `${meta.app}/${meta.code}`, meta };
}

function lookup(screenKey, label) {
  const overlayRowfields = cachedOverlay?.rowfields?.[screenKey] || [];
  for (const rf of overlayRowfields) {
    if (norm(rf.label) === norm(label)) {
      // Hand-maintained overlay may point at a fixed control (no row index).
      if (rf.selector) {
        return {
          kind: rf.kind || 'input', how: rf.how || 'selector',
          selector: rf.selector, choices: rf.choices,
          note: rf.note, status: rf.status,
        };
      }
      // One hand-procedure label may span several controls (date + ampm + time).
      if (rf.parts) {
        return {
          kind: 'datetime', how: rf.how || 'datetime',
          parts: rf.parts, note: rf.note, status: rf.status,
        };
      }
      return {
        kind: 'rowfield', how: rf.how,
        namePattern: rf.namePattern,
        selectorTemplate: rf.selectorTemplate,
        note: rf.note, status: rf.status,
      };
    }
  }
  // Same visible label can exist several times on a screen (a live button and
  // hidden alternates for other statuses). Keep the FIRST in DOM order: hidden
  // alternates then fail the click's visibility check instead of being clicked
  // silently. Last-wins would pick the hidden one and time out mysteriously.
  const fields = {};
  for (const f of cachedDict?.screens?.[screenKey]?.fields || []) {
    if (f.selector && !fields[norm(f.label)]) fields[norm(f.label)] = f;
  }
  const buttons = {};
  for (const b of cachedDict?.screens?.[screenKey]?.buttons || []) {
    if (b.selector && b.label && !buttons[norm(b.label)] && !fields[norm(b.label)]) buttons[norm(b.label)] = b;
  }
  const n = norm(label);

  // 1) confirmed binding rule (hand-procedure wording -> control)
  const b = cachedBindings?.get(`${screenKey}|${n}`);
  if (b) return { selector: b.selector, kind: b.kind || 'button', how: 'binding' };

  // 2) mined control repository, exact label only. Two matches is ambiguous:
  //    returning the first would silently pick a hidden alternate.
  const mined = cachedControls?.screens?.[screenKey]?.controls;
  if (mined) {
    const hits = mined.filter((c) => c.labelKey && c.labelKey === n && c.kind !== 'hidden' && c.selector);
    // A real DOM element always beats a dialog pseudo-control with the same
    // label: 「OK」on a page with an OK button means the button, not confirm().
    const dom = hits.filter((c) => c.kind !== 'dialog');
    const pool = dom.length ? dom : hits;
    if (pool.length === 1) return { selector: pool[0].selector, kind: pool[0].kind, how: 'control' };
    if (pool.length > 1) {
      // Several controls share the label (a live button plus hidden alternates
      // for other states). The static style tells us which one the page shows;
      // that is reading the source, not guessing. Anything else is ambiguous.
      const shown = pool.filter((c) => !c.hidden);
      if (shown.length === 1) return { selector: shown[0].selector, kind: shown[0].kind, how: 'visible' };
      return { selector: null, kind: null, how: 'ambiguous', candidates: pool.map((c) => c.selector) };
    }
  }

  if (fields[n]) return { selector: fields[n].selector, kind: fields[n].kind };
  if (buttons[n]) return { selector: buttons[n].selector, kind: 'button' };
  // aliases
  for (const [k, v] of Object.entries(cachedAliases?.aliases || {})) {
    if (norm(k) === n) {
      const nv = norm(v);
      if (fields[nv]) return { selector: fields[nv].selector, kind: fields[nv].kind };
      if (buttons[nv]) return { selector: buttons[nv].selector, kind: 'button' };
    }
  }
  // No fuzzy fallback. A "close enough" label match is a guess, and a guess
  // here clicks the wrong control silently. Unresolved labels must surface as
  // errors with the Excel row number (see ADR-0003).
  return null;
}

function lookupQualified(screenKey, base, qualifier) {
  const list = cachedOverlay?.qualifiedButtons?.[screenKey] || [];
  for (const qb of list) {
    if (norm(qb.label) === norm(base) && qb.qualifier === qualifier) return { selector: qb.selector || ('#' + qb.id), kind: 'button' };
  }
  return null;
}

const SKIP_KEYS = new Set([
  'row', 'screen', 'on', 'do', 'use', 'note', 'min', 'requires', 'expect', 'popup',
  'target', 'value', 'of', 'name', 'required', 'waitFor', 'reason', 'key',
  'evidence', 'after', 'qualifier',
]);

// Kernel primitives. Assertions can be their own step (hand-procedure
// verification rows) or a postcondition on an action step.
const ASSERT_OPS = new Set(['screenIs', 'fieldIs', 'rowsAtLeast', 'messageIs', 'downloadIs', 'externalIs']);
const SIDE_OPS = new Set(['capture', 'manual', 'waitUntil', 'goto', 'press']);

function loadEnv(base, name) {
  if (!name) return {};
  const p = join(base, 'flows', 'env', `${name}.yaml`);
  if (!existsSync(p)) return {};
  const doc = yamlLoad(readFileSync(p, 'utf8')) || {};
  return doc.values || doc;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function fmtDate(d) {
  return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
}

function fmtDateTime(d) {
  return `${fmtDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function resolveExpr(expr, ctx) {
  const raw = String(expr ?? '');
  const m = /^\$\{([^{}]+)\}$/.exec(raw.trim());
  const key = m ? m[1].trim() : raw.trim();
  const now = new Date();

  if (key === 'sys.now') return fmtDateTime(now);
  if (key === 'sys.today') return fmtDate(now);
  const dm = /^sys\.today\+(\d+)d$/.exec(key);
  if (dm) return fmtDate(new Date(now.getTime() + Number(dm[1]) * 86400000));

  const nm = /^(env|case|prev)\.(.+)$/.exec(key);
  if (nm) {
    const [, ns, name] = nm;
    if (ns === 'env') return ctx.env?.[name] ?? '';
    return ctx.values?.[name]?.resolved ?? ctx.values?.[name]?.value ?? '';
  }
  return null; // not an expression
}

export function resolveValue(spec, ctx) {
  if (spec === null || spec === undefined) return { value: spec, resolved: spec };
  if (typeof spec === 'boolean' || typeof spec === 'number') return { value: spec, resolved: spec };
  const s = String(spec);
  const direct = resolveExpr(s, ctx);
  if (direct !== null) return { value: spec, resolved: direct };
  if (s === 'now') return { value: spec, resolved: fmtDateTime(new Date()) };
  const m = /^\+(\d+)d$/.exec(s);
  if (m) return { value: spec, resolved: fmtDate(new Date(Date.now() + Number(m[1]) * 86400000)) };
  // interpolate embedded ${...} inside a larger string
  const resolved = s.replace(/\$\{([^{}]+)\}/g, (mm, expr) => {
    const v = resolveExpr(`\${${expr}}`, ctx);
    return v === null ? mm : String(v);
  });
  return { value: spec, resolved };
}

// Per-book exceptions live in flows/overrides/<book>.yaml and are applied to
// the baseline before compilation. Only the five allowed actions exist, and
// `expect` is rejected outright: changing what the hand procedure expects is
// falsifying the test, not customising the automation (ADR-0001).
function applyOverrides(flow, base, errors) {
  const book = flow.case || flow.book;
  if (!book) return flow;
  const p = join(base, 'flows', 'overrides', `${book}.yaml`);
  if (!existsSync(p)) return flow;
  let doc;
  try { doc = yamlLoad(readFileSync(p, 'utf8')) || {}; } catch (e) {
    errors.push(`overrides ${book}: unreadable (${e.message})`);
    return flow;
  }
  const list = doc.overrides || [];
  const steps = flow.steps || [];
  const out = [];
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const hits = list.filter((o) => Number(o.row) === Number(s.row));
    if (!hits.length) { out.push(s); continue; }
    for (const o of hits) {
      if ('expect' in o || 'expected' in o) {
        errors.push(`overrides ${book} row ${o.row}: expect is not overridable`);
        continue;
      }
      const reason = o.reason || o.note;
      if (!reason) errors.push(`overrides ${book} row ${o.row}: reason required`);
      if (o.skip) { s.__skip = true; continue; }
      if (o.do === 'manual') {
        s.do = 'manual';
        s.note = reason || s.note;
        delete s.target;
        delete s.targets;
      }
      if (o.capture) {
        s.__extra = [...(s.__extra || []), {
          row: s.row, on: s.on, do: 'capture', name: o.capture,
          of: o.of || 'viewport', note: reason,
        }];
      }
      if (o.valueFrom && o.valueFrom.label) {
        if (Array.isArray(s.use)) {
          const item = s.use.find((u) => (typeof u === 'string' ? u : u.label) === o.valueFrom.label);
          if (item && typeof item === 'object') item.value = o.valueFrom.value;
          else if (item) s.use[s.use.indexOf(item)] = { label: item, value: o.valueFrom.value };
          else s.use.push({ label: o.valueFrom.label, value: o.valueFrom.value });
        } else if (s.target?.label === o.valueFrom.label) {
          s.value = o.valueFrom.value;
        } else {
          errors.push(`overrides ${book} row ${o.row}: valueFrom label ${o.valueFrom.label} not on this row`);
        }
      }
      if (o.binding && o.binding.label && o.binding.selector) {
        s.__bindings = { ...(s.__bindings || {}), [o.binding.label]: o.binding.selector };
      }
    }
    if (!s.__skip) {
      out.push(s);
      for (const extra of s.__extra || []) out.push(extra);
    }
  }
  flow.steps = out;
  return flow;
}

export function compileFlow(flowPath, opts = {}) {
  if (!cachedDict) loadDictionaries(opts.root || ROOT);
  const errors = [];
  const flow = applyOverrides(yamlLoad(readFileSync(flowPath, 'utf8')), opts.root || ROOT, errors);
  const steps = [];
  const env = loadEnv(opts.root || ROOT, flow.env);
  const ctx = { values: {}, env };
  let stepBindings = null; // per-book binding overrides, active for one step

  // two passes: a value may reference another value (${case.x})
  for (const [k, v] of Object.entries(flow.values || {})) {
    const spec = (v && typeof v === 'object' && !Array.isArray(v)) ? v : { value: v, source: 'literal' };
    ctx.values[k] = { ...spec, resolved: spec.value };
  }
  for (const [k, spec] of Object.entries(ctx.values)) {
    spec.resolved = resolveValue(spec.value, ctx).resolved;
  }

  const targetError = (row, screenKey, t, label) =>
    t.error === 'label-ambiguous'
      ? `row ${row}: label ambiguous in ${screenKey}: ${label} (${(t.candidates || []).length} controls)`
      : `row ${row}: label not in ${screenKey}: ${label}`;

  const resolveTarget = (screenKey, label, target, value, anchorValue) => {
    const qualifier = target?.qualifier || '';
    const pinned = target?.__bindings?.[label] || stepBindings?.[label];
    const hit = pinned
      ? { selector: pinned, kind: 'explicit', how: 'book-override' }
      : (qualifier ? lookupQualified(screenKey, label, qualifier) : lookup(screenKey, label));
    if (!hit) return { error: 'label-unresolved', label, value };
    if (hit.how === 'ambiguous') {
      return { error: 'label-ambiguous', label, value, candidates: hit.candidates || [] };
    }
    const val = value !== undefined ? resolveValue(value, ctx).resolved : undefined;
    // A row-scoped control is identified by a visible row value (T3), not by
    // the value being written. `target.anchor` carries it; without one the
    // template falls back to the step value (chooseRow's older form).
    const anchor = anchorValue !== undefined ? resolveValue(anchorValue, ctx).resolved : undefined;
    if (hit.kind === 'datetime') {
      return { label, kind: 'datetime', how: hit.how, parts: hit.parts, value: val, note: hit.note, status: hit.status };
    }
    if (hit.kind === 'rowfield') {
      const tmpl = hit.selectorTemplate;
      let built = null;
      if (tmpl) {
        built = tmpl.replace('{value}', (anchor !== undefined ? anchor : val) ?? '');
        built = built.replace(/\{([^{}]+)\}/g, (mm, key) => {
          const spec = ctx.values[key];
          return spec ? String(spec.resolved ?? spec.value ?? '') : mm;
        });
      }
      return {
        label, kind: 'rowfield', how: hit.how, namePattern: hit.namePattern,
        selector: built, value: val, anchor, note: hit.note, status: hit.status,
      };
    }
    return { label, selector: hit.selector, kind: hit.kind, choices: hit.choices, value: val, anchor };
  };

  for (const step of flow.steps || []) {
    const row = step.row;
    const screen = step.on ?? step.screen;
    const action = step.do;
    stepBindings = step.__bindings || null;
    const { key: screenKey, meta } = pageForScreen(screen);
    // A popup action keeps the hand screen in `on` (the hand procedure has no
    // 遷移 row for popup windows) but resolves labels against the popup's own
    // dictionary. `popupScreen` is that declaration; without it a popup label
    // would be looked up on the parent screen and fail.
    const popupScreen = step.popupScreen || null;
    const popup = popupScreen ? pageForScreen(popupScreen) : { key: screenKey, meta };
    const targetScreenKey = popup.key || screenKey;
    if (popupScreen && !popup.key) {
      errors.push(`row ${row}: popupScreen not resolved: ${popupScreen} (${popup.meta?.status || 'missing'})`);
    }

    const base = {
      row, screen, screenKey, do: action, popup: !!step.popup,
      targetScreen: popupScreen || screen, targetScreenKey,
      note: step.note, requires: step.requires, min: step.min, use: step.use,
      expect: step.expect, evidence: step.evidence, after: step.after,
      // kept for the offline checker: it validates ${case.x} references on the
      // raw step, before the target is compiled into a selector
      value: step.value, target: step.target,
    };

    if (ASSERT_OPS.has(action)) {
      steps.push({ ...base, targets: [] });
      continue;
    }

    if (['expect', 'expectRows', 'expectMessage'].includes(action)) {
      steps.push({ ...base, targets: [] });
      continue;
    }

    if (!screenKey) {
      // mode=external books (batch/DB/mail) have no screen at all; manual is
      // the only action that does not need one.
      const externalFlow = String(flow?.mode || '').toLowerCase() === 'external';
      // Ops that never touch the DOM also do not need a known screen. A 遷移
      // to a page we have no HTML for (別タブのヘルプ画面など) is recorded as
      // manual, not silently attached to the previous screen.
      const domFree = SIDE_OPS.has(action) && action !== 'capture'
        || (action === 'capture' && step.of !== 'element');
      if (!(externalFlow && SIDE_OPS.has(action)) && !domFree) {
        errors.push(`row ${row}: screen not resolved: ${screen} (${meta?.status || 'missing'})`);
        steps.push({ ...base, targets: [], error: 'screen-unresolved' });
        continue;
      }
    }

    if (SIDE_OPS.has(action)) {
      const extra = {};
      for (const k of ['of', 'name', 'required', 'waitFor', 'reason', 'key', 'url']) {
        if (step[k] !== undefined) extra[k] = step[k];
      }
      const targets = [];
      if (action === 'capture' && step.of === 'element' && step.target) {
        const t = resolveTarget(targetScreenKey, step.target.label, step.target, step.value);
        if (t.error) errors.push(targetError(row, targetScreenKey, t, step.target.label));
        else targets.push(t);
      }
      steps.push({ ...base, ...extra, targets });
      continue;
    }

    const targets = [];

    // fillAll: use[] に並んだラベルを targets として解決しておく。
    if (action === 'fillAll') {
      for (const item of step.use || []) {
        const label = typeof item === 'string' ? item : item.label;
        const pinned = stepBindings?.[label];
        if (pinned) {
          const explicit0 = typeof item === 'object' && item.value !== undefined
            ? resolveValue(item.value, ctx).resolved : null;
          targets.push({
            label, selector: pinned, kind: 'explicit', how: 'book-override',
            value: explicit0 !== null ? explicit0 : (ctx.values[label]?.resolved ?? null),
          });
          continue;
        }
        const hit = lookup(targetScreenKey, label);
        if (!hit) { errors.push(`row ${row}: (fillAll) label not in ${targetScreenKey}: ${label}`); continue; }
        if (hit.how === 'ambiguous') { errors.push(`row ${row}: (fillAll) label ambiguous in ${targetScreenKey}: ${label}`); continue; }
        // A label can appear on several screens with different values (氏名 on
        // both the staff-search and the CC popup). In that case the step names
        // the value explicitly: {label: 氏名, value: "${case.担当者氏名}"}.
        const explicit = typeof item === 'object' && item.value !== undefined
          ? resolveValue(item.value, ctx).resolved
          : null;
        targets.push({
          label, selector: hit.selector, kind: hit.kind, choices: hit.choices,
          namePattern: hit.namePattern, parts: hit.parts,
          value: explicit !== null ? explicit : (ctx.values[label]?.resolved ?? null),
          how: hit.how, note: hit.note, status: hit.status,
        });
      }
      steps.push({ ...base, targets });
      continue;
    }

    // chooseRow: the target names a row-scoped control; the anchor is the
    // visible value used to pick the row. The index is discovered at runtime.
    if (action === 'chooseRow' && step.target) {
      const label = step.target.row || step.target.label;
      const t = resolveTarget(targetScreenKey, label, step.target, step.target.anchor ?? step.value);
      if (t.error) errors.push(targetError(row, targetScreenKey, t, label));
      else t.anchor = resolveValue(step.target.anchor ?? step.value, ctx).resolved;
      targets.push(t);
      steps.push({ ...base, targets });
      continue;
    }

    // canonical schema: one target + one value
    if (step.target) {
      const t = resolveTarget(targetScreenKey, step.target.label, step.target, step.value, step.target.anchor);
      if (t.error) errors.push(targetError(row, targetScreenKey, t, step.target.label));
      targets.push(t);
      steps.push({ ...base, targets });
      continue;
    }

    // legacy schema: label-keyed targets
    for (const [rawLabel, value] of Object.entries(step)) {
      if (SKIP_KEYS.has(rawLabel)) continue;
      const i = rawLabel.indexOf('|');
      const label = i >= 0 ? rawLabel.slice(0, i) : rawLabel;
      const qualifier = i >= 0 ? rawLabel.slice(i + 1) : '';
      const t = resolveTarget(targetScreenKey, label, { qualifier }, value);
      if (t.error) errors.push(targetError(row, targetScreenKey, t, rawLabel));
      targets.push(t);
    }
    steps.push({ ...base, targets });
  }

  const pendingRuntime = [];
  for (const s of steps) {
    for (const t of s.targets || []) {
      if (t.kind === 'rowfield' && !t.selector) {
        pendingRuntime.push({
          row: s.row, label: t.label, namePattern: t.namePattern,
          note: t.note || t.status || null,
        });
      }
    }
  }

  return { flow, steps, values: ctx.values, errors, pendingRuntime };
}

// Exact label → selector for assertions. Assertions read a value; they do
// not scan for controls, so the hand-maintained overlay and the dictionary
// are the only sources. Returns null when the label is not mapped.
export function dictSelector(screenKey, label) {
  if (!cachedDict) loadDictionaries();
  const hit = lookup(screenKey, label);
  return hit && hit.selector ? hit.selector : null;
}

// "{変数名}" を values から展開。見つからなければそのまま返し、呼び側で警告。
export function interpolate(str, values, missing) {
  return String(str ?? '').replace(/\{([^{}]+)\}/g, (m, key) => {
    if (values[key] !== undefined) return values[key].resolved ?? values[key].value ?? '';
    if (missing) missing.add(key);
    return m;
  });
}
