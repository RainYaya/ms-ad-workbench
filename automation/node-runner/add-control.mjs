// Add one control to the overlay by pasting the real element.
//
// The human copies the element from the real page's devtools (or a CSS
// selector) and names the hand-procedure screen + wording. This tool:
//   1. extracts id/name/type from the element,
//   2. counts that selector in the captured real DOM,
//   3. requires exactly ONE visible match, or a row anchor that makes it one,
//   4. prints a control patch (and writes it with --apply).
//
// It never picks the first of several matches. Several matches without an
// anchor is an error, because that is the guess the whole system forbids.
//
//   node add-control.mjs --screen 募集人検索画面 --label 選択欄ラジオボタン \
//     --html '<input type="radio" name="selectNo" value="0">' \
//     --capture capture-20261028 --anchor 3028004586
//
//   --selector '#regist'          use a selector instead of pasted HTML
//   --anchor VALUE                visible row value (for row-scoped controls)
//   --kind radio|checkbox|...     override the inferred kind
//   --note TEXT                   why / evidence
//   --out FILE                    write the patch YAML
//   --apply                       merge into ui-rowfields.json (with backup)
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { dump as yamlDump } from 'js-yaml';
import { capturePageFor, checkSelectors, screenKeyFor } from './dom-check.mjs';
import { applyControlEntries, existingEntry } from './patch-store.mjs';

const args = process.argv.slice(2);
const arg = (k, d = '') => {
  const i = args.indexOf('--' + k);
  return i >= 0 ? (args[i + 1] ?? '') : d;
};
const flag = (k) => args.includes('--' + k);

const screen = arg('screen');
const label = arg('label');
const capture = arg('capture');
const html = arg('html');
const selectorArg = arg('selector');
const anchor = arg('anchor');
const note = arg('note');
const out = arg('out');
const kindArg = arg('kind');

if (!screen || !label || !capture || (!html && !selectorArg)) {
  console.error(`usage: node add-control.mjs --screen <手顺画面名> --label <手顺措辞> \\
  (--html '<element>' | --selector '<css>') --capture <capture-dir> \\
  [--anchor <可见值>] [--kind <kind>] [--note <text>] [--out patch.yaml] [--apply]`);
  process.exit(2);
}

function parseAttrs(s) {
  const out = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let m;
  while ((m = re.exec(s))) out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  return out;
}

function cssQuote(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function idSelector(id) {
  if (/^[A-Za-z0-9_-]+$/.test(id)) return '#' + id;
  return `[id="${cssQuote(id)}"]`;
}

function inferKind(tag, type) {
  const t = String(tag || '').toLowerCase();
  const ty = String(type || '').toLowerCase();
  if (t === 'select') return 'select';
  if (t === 'textarea') return 'textarea';
  if (t === 'button') return 'button';
  if (t === 'a') return 'link';
  if (t === 'input') {
    if (ty === 'radio') return 'radio';
    if (ty === 'checkbox') return 'checkbox';
    if (ty === 'button' || ty === 'submit' || ty === 'reset') return 'button';
    if (ty === 'hidden') return 'hidden';
    return 'input';
  }
  return 'unknown';
}

const page = (() => {
  try {
    return capturePageFor(capture, screen);
  } catch (e) {
    console.error('ERROR ' + e.message);
    process.exit(1);
  }
})();
const sk = screenKeyFor(screen);
if (!sk) {
  console.error(`ERROR screen not in ui-screens.json: ${screen}`);
  process.exit(1);
}

let base = selectorArg;
let kind = kindArg;
let tag = '';
let attrs = {};
if (html) {
  const tm = /<\s*([a-zA-Z0-9]+)/.exec(html);
  tag = tm ? tm[1] : '';
  const end = html.indexOf('>');
  attrs = parseAttrs(end >= 0 ? html.slice(0, end + 1) : html);
  if (!base) {
    if (attrs.id && !/[$|{}]/.test(attrs.id)) base = idSelector(attrs.id);
    else if (attrs.name && !/[$|{}]/.test(attrs.name)) {
      // A rendered row name carries the row index (imperfectSearch[0],
      // list[0].field). Pasting row 0 must not pin row 0: generalise to the
      // name family and let the row anchor pick the row.
      const m = /^(.*)\[(\d+)\](.*)$/.exec(attrs.name);
      if (m) {
        const [, prefix, , suffix] = m;
        base = suffix
          ? `[name^="${cssQuote(prefix)}["][name$="${cssQuote(suffix)}"]`
          : `[name^="${cssQuote(prefix)}["]`;
      } else {
        base = `[name="${cssQuote(attrs.name)}"]`;
      }
    }
  }
  if (!kind) kind = inferKind(tag, attrs.type);
}
if (!base) {
  console.error('ERROR element has no usable id or name; paste the element including id/name, or use --selector');
  process.exit(1);
}

console.log(`screen  ${screen} -> ${sk.key}`);
console.log(`page    ${page.abs}`);
console.log(`base    ${base}`);

const batch = async (sels) => checkSelectors(page.abs, sels);
let baseCheck;
try {
  [baseCheck] = await batch([base]);
} catch (e) {
  console.error('ERROR ' + e.message);
  process.exit(1);
}
if (baseCheck.error) {
  console.error('ERROR invalid selector: ' + baseCheck.error);
  process.exit(1);
}
if (!kind || kind === 'unknown') {
  const t = baseCheck.texts[0] || {};
  kind = inferKind(t.tag, t.type);
}
console.log(`matches ${baseCheck.count}  visible ${baseCheck.visible}`);

if (baseCheck.count === 0) {
  console.error('ERROR 0 matches in the real DOM.');
  console.error('  The selector is not on this screen, or --screen points at the wrong captured page.');
  process.exit(1);
}
if (baseCheck.visible === 0) {
  console.error('ERROR the control exists but is not visible. A hidden element is not a control.');
  process.exit(1);
}

let entry;
if (baseCheck.count === 1) {
  entry = {
    label,
    selector: base,
    kind,
    status: 'confirmed',
    note: note || `実機 capture；${page.url}`,
  };
} else {
  if (!anchor) {
    console.error(`ERROR ${baseCheck.count} matches; this control is row-scoped and needs a row anchor.`);
    console.error('  Pick a visible value that identifies the row (照会コード / 募集人ID / 証券番号 / 項目コード),');
    console.error('  then re-run with --anchor <value>. Matched rows:');
    for (const t of baseCheck.texts) console.error(`    ${t.row || '(no row text)'}`);
    process.exit(1);
  }
  const templates = [
    `tr:has(td:text-is("{value}")) ${base}`,
    `tr:has(td:has-text("{value}")) ${base}`,
    `tr:has-text("{value}") ${base}`,
  ];
  const checked = await batch(templates.map((t) => t.replaceAll('{value}', anchor)));
  const idx = checked.findIndex((r) => r.count === 1 && r.visible === 1);
  if (idx < 0) {
    console.error(`ERROR no row template matched exactly once for anchor '${anchor}':`);
    for (const r of checked) console.error(`  ${r.count} matches  ${r.selector}`);
    process.exit(1);
  }
  const hit = checked[idx];
  console.log(`anchor  ${anchor} -> 1 match`);
  console.log(`template ${templates[idx]}`);
  entry = {
    label,
    selectorTemplate: templates[idx],
    how: 'rowByText',
    sample: anchor,
    status: 'confirmed',
    note: note || `実機 capture；行锚点 ${anchor}；${page.url}`,
  };
}

const prev = existingEntry(sk.key, label);
if (prev) {
  console.log(`overlay already has '${label}' on ${sk.key}:`);
  console.log('  ' + JSON.stringify(prev));
  console.log('  --apply will replace it (backup kept).');
}

const patch = {
  kind: 'control-patch',
  ...(arg('case') ? { case: arg('case') } : {}),
  screen: sk.name,
  entries: [entry],
};
const text = '# generated by add-control.mjs from the captured real DOM\n' +
  yamlDump(patch, { lineWidth: -1, noRefs: true });
console.log('\n' + text);

if (out) {
  writeFileSync(resolve(process.cwd(), out), text, 'utf8');
  console.log(`wrote ${out}`);
}
if (flag('apply')) {
  const r = applyControlEntries(sk.key, [entry]);
  console.log(`applied to ui-rowfields.json (${sk.key}) — backup ${r.backup}`);
}
