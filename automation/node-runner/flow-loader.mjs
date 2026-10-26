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

function loadJson(p, fallback) {
  if (!existsSync(p)) return fallback;
  return JSON.parse(readFileSync(p, 'utf8'));
}

export function loadDictionaries(base = ROOT) {
  cachedDict = loadJson(join(base, 'ui-dictionary.json'), { screens: {} });
  cachedScreens = loadJson(join(base, 'ui-screens.json'), { screens: {} });
  cachedAliases = loadJson(join(base, 'ui-aliases.json'), { aliases: {} });
  cachedOverlay = loadJson(join(base, 'ui-rowfields.json'), { rowfields: {}, qualifiedButtons: {} });

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
      return {
        kind: 'rowfield', how: rf.how,
        namePattern: rf.namePattern,
        selectorTemplate: rf.selectorTemplate,
        note: rf.note, status: rf.status,
      };
    }
  }
  const fields = Object.fromEntries(
    (cachedDict?.screens?.[screenKey]?.fields || []).filter((f) => f.selector).map((f) => [norm(f.label), f]));
  const buttons = Object.fromEntries(
    (cachedDict?.screens?.[screenKey]?.buttons || []).filter((b) => b.selector && b.label).map((b) => [norm(b.label), b]));
  const n = norm(label);
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
  // unique fuzzy, same 0.6 threshold as the python compiler
  if (n.length >= 3) {
    const pool = { ...fields, ...buttons };
    const cands = Object.entries(pool).filter(([k]) =>
      (n.includes(k) || k.includes(n)) && Math.min(n.length, k.length) / Math.max(n.length, k.length) >= 0.6);
    if (cands.length === 1) return { selector: cands[0][1].selector, kind: cands[0][1].kind };
  }
  return null;
}

function lookupQualified(screenKey, base, qualifier) {
  const list = cachedOverlay?.qualifiedButtons?.[screenKey] || [];
  for (const qb of list) {
    if (norm(qb.label) === norm(base) && qb.qualifier === qualifier) return { selector: qb.selector || ('#' + qb.id), kind: 'button' };
  }
  return null;
}

const SKIP_KEYS = new Set(['row', 'screen', 'do', 'use', 'note', 'min', 'requires', 'expect', 'popup']);

export function compileFlow(flowPath, opts = {}) {
  if (!cachedDict) loadDictionaries(opts.root || ROOT);
  const flow = yamlLoad(readFileSync(flowPath, 'utf8'));
  const errors = [];
  const steps = [];

  const values = {}  // built before steps so {var} can be interpolated;
  for (const [k, v] of Object.entries(flow.values || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      values[k] = { ...v, resolved: resolveValue(v) };
    } else {
      values[k] = { value: v, source: 'literal', resolved: v };
    }
  }

  for (const step of flow.steps || []) {
    const row = step.row;
    const screen = step.screen;
    const action = step.do;
    const { key: screenKey, meta } = pageForScreen(screen);

    const base = {
      row, screen, screenKey, do: action, popup: !!step.popup,
      note: step.note, requires: step.requires, min: step.min, use: step.use,
    };

    if (['expect', 'expectRows', 'expectMessage'].includes(action)) {
      steps.push({ ...base, expect: step.expect || {} });
      continue;
    }

    if (!screenKey) {
      errors.push(`row ${row}: screen not resolved: ${screen} (${meta?.status || 'missing'})`);
      steps.push({ ...base, targets: [], error: 'screen-unresolved' });
      continue;
    }

    const targets = [];

    // fillAll: use[] に並んだラベルを targets として解決しておく。
    // 実行器は values から値を引いて順に埋める。
    if (action === 'fillAll') {
      for (const label of step.use || []) {
        const hit = lookup(screenKey, label);
        if (!hit) { errors.push(`row ${row}: (fillAll) label not in ${screenKey}: ${label}`); continue; }
        targets.push({ label, selector: hit.selector, kind: hit.kind,
                       namePattern: hit.namePattern, value: null });
      }
      steps.push({ ...base, targets });
      continue;
    }

    for (const [rawLabel, value] of Object.entries(step)) {
      if (SKIP_KEYS.has(rawLabel)) continue;
      const [label, , qualifier] = rawLabel.partition ? [rawLabel, '', ''] : (() => {
        const i = rawLabel.indexOf('|');
        return i >= 0 ? [rawLabel.slice(0, i), '|', rawLabel.slice(i + 1)] : [rawLabel, '', ''];
      })();

      const hit = qualifier ? lookupQualified(screenKey, label, qualifier) : lookup(screenKey, rawLabel);
      if (!hit) {
        errors.push(`row ${row}: label not in ${screenKey}: ${rawLabel}`);
        targets.push({ label: rawLabel, error: 'label-unresolved', value });
        continue;
      }
      if (hit.kind === 'rowfield') {
        const tmpl = hit.selectorTemplate;
        // Substitute BOTH the row value placeholder and any {var} references.
        // Leaving "{募集人ID}" literal produced a selector that can never match.
        let built = null;
        if (tmpl) {
          built = tmpl.replace('{value}', value ?? '');
          built = built.replace(/\{([^{}]+)\}/g, (mm, key) => {
            const spec = values[key];
            return spec ? String(spec.resolved ?? spec.value ?? '') : mm;
          });
        }
        targets.push({
          label, kind: 'rowfield', how: hit.how,
          namePattern: hit.namePattern,
          selector: built,
          value, note: hit.note, status: hit.status,
        });
        continue;
      }
      targets.push({ label, selector: hit.selector, kind: hit.kind, value });
    }
    steps.push({ ...base, targets });
  }

  // 値の展開（sys: now / +7d など）
  const pendingRuntime = [];
  for (const s of steps) {
    for (const t of s.targets || []) {
      if (t.kind === 'rowfield' && !t.selector) pendingRuntime.push({ row: s.row, label: t.label, namePattern: t.namePattern });
    }
  }

  return { flow, steps, values, errors, pendingRuntime };
}

function resolveValue(spec) {
  const raw = spec.value;
  if (spec.source === 'blank') return '';
  if (typeof raw === 'boolean' || typeof raw === 'number') return raw;
  const s = String(raw ?? '');
  const now = new Date();
  if (s === 'now') {
    const p = (n) => String(n).padStart(2, '0');
    return `${now.getFullYear()}/${p(now.getMonth() + 1)}/${p(now.getDate())} ${p(now.getHours())}:${p(now.getMinutes())}`;
  }
  const m = /^\+(\d+)d$/.exec(s);
  if (m) {
    const d = new Date(now.getTime() + Number(m[1]) * 86400000);
    const p = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())}`;
  }
  return s;
}

// "{変数名}" を values から展開。見つからなければそのまま返し、呼び側で警告。
export function interpolate(str, values, missing) {
  return String(str ?? '').replace(/\{([^{}]+)\}/g, (m, key) => {
    if (values[key] !== undefined) return values[key].resolved ?? values[key].value ?? '';
    if (missing) missing.add(key);
    return m;
  });
}
