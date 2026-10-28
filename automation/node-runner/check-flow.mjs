// Offline checker for a flow file.
//
// Uses the same resolver as the executor (flow-loader.mjs) plus the derived
// screen chain (reports/screen-chain.json). No browser.
//
// What it checks:
//   1. every step's `on` matches the hand-procedure derived screen
//   2. row coverage (no silently skipped hand-procedure rows)
//   3. targets resolve (no guessing)
//   4. every value has provenance (row + source)
//   5. expect is typed; unresolved 別紙 refs are listed, not passed
//   6. pendingRuntime entries carry a note
//
// Usage:
//   node check-flow.mjs ../../flows/AZ-110-01-009.yaml
//   node check-flow.mjs ../../flows/AZ-110-01-009.yaml --json out.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as yamlLoad } from 'js-yaml';
import { compileFlow, norm } from './flow-loader.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../..');

const args = process.argv.slice(2);
const flowArg = args.find((a) => !a.startsWith('--'));
const jsonIdx = args.indexOf('--json');
const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;

if (!flowArg) {
  console.error('usage: node check-flow.mjs <flow.yaml> [--json out.json]');
  process.exit(2);
}
const flowPath = resolve(process.cwd(), flowArg);

const chainPath = join(ROOT, 'reports', 'screen-chain.json');
if (!existsSync(chainPath)) {
  console.error(`missing ${chainPath}; run: python tools/derive_screen_chain.py`);
  process.exit(2);
}

const r = compileFlow(flowPath);
const flow = r.flow;
const raw = yamlLoad(readFileSync(flowPath, 'utf8'));
const chain = JSON.parse(readFileSync(chainPath, 'utf8'));
const chainCase = chain.cases?.[flow.case];
const screenMap = JSON.parse(readFileSync(join(ROOT, 'ui-screens.json'), 'utf8')).screens || {};

// The hand procedure spells the same screen two ways: 「…画面-更新」 in some
// columns and 「…画面（更新）」 in others. Parentheses used as a suffix
// delimiter are equivalent to a hyphen; no other difference is ignored.
const screenNorm = (s) => norm(s).replace(/[（(]/g, '-').replace(/[）)]/g, '').replace(/-+/g, '-');
const sameScreen = (a, b) => {
  if (screenNorm(a) === screenNorm(b)) return true;
  const keys = (name) => {
    const n = norm(name);
    return Object.entries(screenMap)
      .filter(([k, v]) => norm(k) === n && v.app && v.code)
      .map(([, v]) => `${v.app}/${v.code}`);
  };
  const ka = keys(a); const kb = keys(b);
  return ka.length > 0 && kb.length > 0 && ka.some((x) => kb.includes(x));
};

const errors = [];
const warnings = [];
const pending = [];
const add = (arr, msg) => arr.push(msg);

if (!chainCase) {
  errors.push(`case ${flow.case} not found in ${chainPath}`);
}

// Batch / DB / mail books have no browser screen at all: the hand procedure
// is バッチ実行 + 操作結果/APログ/DBダンプ confirmations. They still use the
// flow format, but only manual / externalIs steps, and the screen chain does
// not apply (docs/rpa/11-KERNEL.md §13).
const externalMode = String(flow.mode || '').toLowerCase() === 'external';

// ── 1. screen chain vs hand procedure ────────────────────────────────
const handRows = chainCase?.rows || {};
if (!externalMode) {
  for (const s of r.steps) {
    const info = handRows[String(s.row)];
    if (!info) {
      errors.push(`row ${s.row}: not in hand-procedure data`);
      continue;
    }
    // 遷移 rows give the screen we land on. 表示 rows that name a screen (not a
    // field) also give the screen on display — the derived chain stores it in
    // `after` because it may differ from the previous screen (AZ-240-01-001
    // row 21 confirms the list after pressing 一覧画面).
    const expected = info.ver === '遷移' || info.ver === '表示' ? info.after : info.before;
    if (!expected) {
      // The first operation row has no predecessor to derive a screen from.
      // The flow's declared start is the only evidence available; it is not a
      // guess, so it is checked rather than warned about.
      const declared = r.steps[0] === s ? flow.start?.screen : null;
      if (declared && norm(declared) !== norm(s.screen)) {
        errors.push(`row ${s.row}: screen mismatch: flow=${s.screen} start=${declared}`);
      } else if (!declared) {
        warnings.push(`row ${s.row}: initial screen cannot be derived; using on=${s.screen}`);
      }
      continue;
    }
    if (!sameScreen(s.screen, expected)) {
      errors.push(`row ${s.row}: screen mismatch: flow=${s.screen} handPro=${expected}`);
    }
  }

  // the first step's screen must be a known screen
  const first = r.steps[0];
  if (first && !Object.keys(screenMap).some((k) => norm(k) === norm(first.screen))) {
    errors.push(`row ${first.row}: start screen not in ui-screens.json: ${first.screen}`);
  }
} else {
  // No browser: only the human/external primitives make sense here.
  const EXTERNAL_OPS = new Set(['manual', 'externalIs', 'capture', 'waitUntil']);
  for (const s of r.steps) {
    if (!EXTERNAL_OPS.has(s.do)) {
      errors.push(`row ${s.row}: mode=external allows manual/externalIs/capture/waitUntil, got '${s.do}'`);
    }
    if (s.screen) {
      warnings.push(`row ${s.row}: mode=external step declares screen '${s.screen}' (ignored)`);
    }
  }
}

// ── 2. row coverage ─────────────────────────────────────────────────
const flowRows = new Map();
for (const s of r.steps) {
  if (!flowRows.has(s.row)) flowRows.set(s.row, []);
  flowRows.get(s.row).push(s);
}
const handRowNums = Object.keys(handRows).map(Number).sort((a, b) => a - b);
if (handRowNums.length) {
  const min = Math.min(...handRowNums);
  const max = Math.max(...handRowNums);
  for (const row of handRowNums) {
    const info = handRows[String(row)];
    const meaningful = info.op || info.ver;
    if (meaningful && !flowRows.has(row)) {
      warnings.push(`row ${row}: hand-procedure row not represented (op=${info.op || '-'} ver=${info.ver || '-'})`);
    }
  }
  for (let row = min; row <= max; row++) {
    if (!handRows[String(row)]) warnings.push(`row ${row}: gap in hand-procedure data (${min}-${max})`);
  }
}
for (const [row, steps] of flowRows) {
  if (steps.length > 1) {
    const nonCapture = steps.filter((s) => s.do !== 'capture');
    if (nonCapture.length > 1) {
      warnings.push(`row ${row}: ${steps.length} steps; only capture may share a row`);
    }
  }
}

// ── 3. targets / pending ────────────────────────────────────────────
for (const e of r.errors) errors.push(e);
for (const p of r.pendingRuntime) {
  pending.push(p);
  if (!p.note) errors.push(`row ${p.row}: pendingRuntime '${p.label}' has no note`);
}

// ── 4. values provenance ────────────────────────────────────────────
const ALLOWED = new Set(['literal', 'env', 'case', 'sys', 'prev', 'blank', 'human', 'auto']);
const envName = raw.env || null;
let envValues = {};
if (envName) {
  const envPath = join(ROOT, 'flows', 'env', `${envName}.yaml`);
  if (!existsSync(envPath)) {
    errors.push(`env profile not found: flows/env/${envName}.yaml`);
  } else {
    const envDoc = yamlLoad(readFileSync(envPath, 'utf8')) || {};
    envValues = envDoc.values || envDoc;
  }
}
for (const [k, spec] of Object.entries(raw.values || {})) {
  const s = (spec && typeof spec === 'object') ? spec : { value: spec, source: 'literal' };
  const source = s.source || 'literal';
  if (!ALLOWED.has(source)) {
    errors.push(`value ${k}: unknown source '${source}'`);
    continue;
  }
  if (['case', 'human', 'blank', 'auto'].includes(source) && typeof s.row !== 'number') {
    errors.push(`value ${k}: source=${source} requires a numeric row`);
  }
  const text = String(s.value ?? '');
  for (const m of text.matchAll(/\$\{([^{}]+)\}/g)) {
    const expr = m[1].trim();
    if (expr.startsWith('env.') && !(expr.slice(4) in envValues)) {
      errors.push(`value ${k}: ${expr} not in flows/env/${envName}.yaml`);
    }
    if (expr.startsWith('case.') && !(expr.slice(5) in (raw.values || {}))) {
      errors.push(`value ${k}: ${expr} not defined in values`);
    }
    if (expr.startsWith('sys.') && !/^sys\.(now|today|today\+\d+d)$/.test(expr)) {
      errors.push(`value ${k}: unsupported sys expression ${expr}`);
    }
  }
}

// every ${case.x} / ${env.x} used by a step must exist
for (const s of r.steps) {
  const texts = [s.value, s.target?.anchor].filter((x) => x !== undefined).map(String);
  // fillAll items can carry their own value ({label, value}); a typo in
  // ${case.x} there would otherwise only fail at run time.
  for (const item of s.use || []) {
    if (item && typeof item === 'object' && item.value !== undefined) texts.push(String(item.value));
  }
  for (const t of texts) {
    for (const m of t.matchAll(/\$\{([^{}]+)\}/g)) {
      const expr = m[1].trim();
      if (expr.startsWith('case.') && !(expr.slice(5) in (raw.values || {}))) {
        errors.push(`row ${s.row}: ${expr} not defined in values`);
      }
      if (expr.startsWith('env.') && envName && !(expr.slice(4) in envValues)) {
        errors.push(`row ${s.row}: ${expr} not in flows/env/${envName}.yaml`);
      }
    }
  }
}

// ── 5. expect typing ────────────────────────────────────────────────
const ALLOWED_EXPECT = new Set(['screen', 'fields', 'rows', 'message', 'download', 'external', 'ref']);
const LEGACY_EXPECT = new Set(['遷移', '表示', '反映', '出力']);
const ASSERT_OPS = new Set(['screenIs', 'fieldIs', 'rowsAtLeast', 'messageIs', 'downloadIs', 'externalIs']);

for (const s of r.steps) {
  const step = (raw.steps || []).find((x) => x.row === s.row && x.do === s.do && x.screen === s.screen);
  const expect = s.expect || {};
  for (const key of Object.keys(expect)) {
    if (LEGACY_EXPECT.has(key)) {
      warnings.push(`row ${s.row}: legacy expect '${key}' is not an assertion; use screen/fields/ref`);
      continue;
    }
    if (!ALLOWED_EXPECT.has(key)) {
      errors.push(`row ${s.row}: unknown expect key '${key}'`);
    }
  }
  if (expect.ref) {
    const st = expect.ref.status || 'unresolved';
    if (st !== 'resolved') {
      pending.push({ row: s.row, ref: expect.ref.appendix || expect.ref, status: st });
      if (!expect.ref.note) errors.push(`row ${s.row}: ref has no note`);
    }
  }
  if (expect.screen && ASSERT_OPS.has(s.do)) {
    if (norm(expect.screen) !== norm(s.screen)) {
      errors.push(`row ${s.row}: screenIs expect=${expect.screen} but on=${s.screen}`);
    }
  }
  if (s.do === 'fieldIs' && !expect.fields && !expect.ref) {
    errors.push(`row ${s.row}: fieldIs needs expect.fields or expect.ref`);
  }
  if (s.do === 'messageIs' && !expect.message?.code) {
    errors.push(`row ${s.row}: messageIs needs expect.message.code`);
  }
  if (s.do === 'rowsAtLeast' && !expect.rows?.min && s.min === undefined) {
    errors.push(`row ${s.row}: rowsAtLeast needs expect.rows.min`);
  }
  if (s.do === 'downloadIs' && !expect.download) {
    errors.push(`row ${s.row}: downloadIs needs expect.download`);
  }
  if (s.do === 'externalIs' && !expect.external) {
    errors.push(`row ${s.row}: externalIs needs expect.external`);
  }
  if (s.do === 'capture' && s.of === 'element' && !s.targets?.length) {
    errors.push(`row ${s.row}: capture of=element needs a target`);
  }
  if (step && step.requires && !Array.isArray(step.requires)) {
    errors.push(`row ${s.row}: requires must be a list`);
  }
}

// ── 5.5 值形态 / 锚点形态（实测最常被 AI 写错的四类）────────────────
// L0 used to accept anything that parsed to a string, so these only surfaced
// at run time (or not at all, because an anchor of "true" builds a valid CSS
// selector). They are now compile errors: the point is that the feedback loop
// says exactly which row and why, without a human reading the YAML.

// (a) Row-scoped targets need an anchor, and the anchor must be a business
//     value. flow-loader falls back to the step value when anchor is absent
//     (flow-loader.mjs:362), which silently turns `value: true` into
//     `tr:has(td:text-is("true"))` — a selector that matches nothing but
//     looks legitimate in every report.
//     How-values are the ones the loader actually emits (binding, control,
//     rowByText, optionByText, radioByRowText, runtime-resolve, datetime,
//     selector, fill, checkbox). Row-scoped = the ones that need a row.
const ROW_SCOPED_HOW = new Set(['rowByText', 'optionByText', 'radioByRowText', 'runtime-resolve', 'rowfield', 'option-list', 'table-row']);
const ALL_HOW = new Set(['binding', 'control', 'rowByText', 'optionByText', 'radioByRowText',
  'runtime-resolve', 'datetime', 'selector', 'fill', 'checkbox']);
for (const s of r.steps) {
  for (const t of s.targets || []) {
    if (!t) continue;
    const rowScoped = ROW_SCOPED_HOW.has(t.how) ||
      (t.selectorTemplate && String(t.selectorTemplate).includes('{value}'));
    const hasAnchor = t.anchor !== undefined && t.anchor !== null && t.anchor !== '';
    if (rowScoped && !hasAnchor) {
      errors.push(`row ${s.row}: 行内控件「${t.label || t.how}」必须写 target.anchor（否则会拿 value 当行锚点）`);
    }
    if (hasAnchor) {
      const a = t.anchor;
      if (typeof a !== 'string') {
        errors.push(`row ${s.row}: target.anchor 必须是字符串，现在是 ${Array.isArray(a) ? 'array' : typeof a}（${JSON.stringify(a)}）`);
      } else if (/^\[object |^(true|false|undefined|null)$/.test(a.trim())) {
        errors.push(`row ${s.row}: target.anchor 是非法值 "${a}"（布尔/对象泄漏成了锚点）`);
      }
    }
  }
}

// The loader stringifies an object value into "[object Object]" before L0 can
// see its shape, so the raw step is the only place the original type survives.
const rawSteps = raw.steps || [];
for (const rs of rawSteps) {
  const bad = [];
  if (rs.value !== null && typeof rs.value === 'object') bad.push(`value 是对象 ${JSON.stringify(rs.value)}`);
  if (typeof rs.value === 'string' && rs.value === '[object Object]') bad.push('value 是 "[object Object]"');
  if (rs.target && typeof rs.target.value === 'object' && rs.target.value !== null) bad.push('target.value 是对象');
  for (const u of rs.use || []) {
    if (u && typeof u === 'object' && u.value !== null && typeof u.value === 'object') bad.push('use[] 的 value 是对象');
  }
  if (bad.length) errors.push(`row ${rs.row}: ${bad.join('；')}（值只能是一个字符串/数字/布尔）`);
}

// (b) A checkbox/radio takes a boolean. 別紙 writes 「連動しない」; the AI copies
//     it literally and the runner dies with "checkbox value must be boolean".
//     fillAll carries the same risk and used to be skipped here.
const BOOL_KINDS = new Set(['checkbox', 'radio']);
const literalBool = (v) => typeof v === 'boolean';
const valueIsBoolean = (v) => {
  if (literalBool(v)) return true;
  if (typeof v !== 'string') return false;
  const m = /^\$\{(?:case|env|prev)\.([^}]+)\}$/.exec(v.trim());
  if (!m) return false;
  const spec = raw.values?.[m[1]];
  return !!(spec && typeof spec === 'object' && typeof spec.value === 'boolean');
};
for (const s of r.steps) {
  if (!['check', 'fill', 'fillAll'].includes(s.do)) continue;
  for (const t of s.targets || []) {
    if (!t) continue;
    // A row-scoped control reports kind 'rowfield'; the element's real type is
    // in ctlKind. Without this a row checkbox holding "連動しない" looked
    // identical to a row button and slipped through every offline check.
    const k = t.kind === 'rowfield' ? t.ctlKind : t.kind;
    if (!BOOL_KINDS.has(k)) continue;
    // A radio group is addressed by the visible choice text (「必要」/「不要」):
    // that is a string on purpose and must not be coerced to a boolean.
    if (t.choices) continue;
    if (valueIsBoolean(t.value)) continue;
    const what = k === 'radio' ? 'radio' : 'checkbox';
    if (typeof t.value === 'string' && /^\$\{(?:case|env|prev)\./.test(t.value.trim())) {
      warnings.push(`row ${s.row}: ${t.label} 是 ${what}，值来自 ${t.value}（运行期必须是布尔；建议改成 literal true/false）`);
      continue;
    }
    const hint = String(t.value) === 'true' || String(t.value) === 'false' ? '（是字符串，不是布尔）' : '';
    errors.push(`row ${s.row}: ${t.label} 是 ${what}，值必须是 true/false，现在是 ${JSON.stringify(t.value)}${hint}`);
  }
}

// (c) A <select> value is the visible option text, not the option's value
//     attribute. check-patch can prove it against the capture; L0 rejects the
//     shapes that can never be option text.
for (const s of r.steps) {
  if (s.do !== 'select') continue;
  for (const t of s.targets || []) {
    const v = t?.value;
    if (v === undefined || v === null || v === '') {
      const rawStep = rawSteps.find((x) => x.row === s.row && x.do === 'select');
      if (rawStep && rawStep.value === undefined) errors.push(`row ${s.row}: select 必须有 value（选项的显示文字）`);
      continue;
    }
    if (typeof v === 'object') {
      errors.push(`row ${s.row}: select 的 value 应该是字符串，现在是对象 ${JSON.stringify(v)}（模板会取到 [object Object]）`);
    } else if (typeof v === 'boolean') {
      errors.push(`row ${s.row}: select 的 value 是布尔 ${v}；下拉框的值是选项文字`);
    } else if (/^\[object /.test(v)) {
      errors.push(`row ${s.row}: select 的 value 是 "${v}"（值是对象，被字符串化了）`);
    }
  }
}

// (d) popup detection: if the hand procedure opens child windows and the flow
//     has no popup: true anywhere, every step inside those windows will look
//     for controls on the parent page. This is a heuristic, so it warns.
const handOpensPopup = Object.values(handRows).some((info) =>
  /ポップアップ|popup|子画面|子ウィンドウ/i.test(`${info.op || ''} ${info.ver || ''}`));
const flowHasPopup = r.steps.some((s) => s.popup);
if (handOpensPopup && !flowHasPopup) {
  warnings.push('手顺里有弹出窗口操作，但整份 flow 一个 popup: true 都没有（弹窗里的控件会被当主画面找）');
}

// ── 6. summary ──────────────────────────────────────────────────────
const result = {
  case: flow.case,
  flow: flowPath,
  generatedAt: new Date().toISOString(),
  stats: {
    steps: r.steps.length,
    handRows: handRowNums.length,
    targets: r.steps.reduce((n, s) => n + (s.targets?.length || 0), 0),
    pending: pending.length,
    errors: errors.length,
    warnings: warnings.length,
  },
  errors,
  warnings,
  pending,
};

if (jsonOut) writeFileSync(resolve(process.cwd(), jsonOut), JSON.stringify(result, null, 1), 'utf8');

console.log(`case ${flow.case}`);
console.log(`  steps ${r.steps.length}  handRows ${handRowNums.length}  targets ${result.stats.targets}`);
console.log(`  errors ${errors.length}  warnings ${warnings.length}  pending ${pending.length}`);
for (const e of errors) console.log(`  ERROR   ${e}`);
for (const w of warnings.slice(0, 20)) console.log(`  WARN    ${w}`);
if (warnings.length > 20) console.log(`  ... ${warnings.length - 20} more warnings`);
for (const p of pending) {
  const what = p.label || p.ref || '';
  console.log(`  PENDING row ${p.row}: ${what}${p.note ? ` — ${p.note}` : ''}`);
}
process.exit(errors.length ? 1 : 0);
