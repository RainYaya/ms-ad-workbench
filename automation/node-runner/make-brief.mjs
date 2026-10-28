// 把「一本手顺 + 一份实机 capture」打成网页 AI（Copilot 等）能直接上传的材料包。
//
// 为什么要有这个：网页 AI 不能读本地文件、不能开 zip、不能跑我们的工具。
// 它只能收普通文件 / 粘贴文本。所以整条链条在实机电脑上必须自给自足：
//
//   capture.mjs → make-brief.mjs → 上传 <out>/*.txt → 粘 05-PROMPT.txt
//        → 把 YAML 存回 flows/tests/<case>.ai.yaml
//        → check-flow → check-patch → run-flow --live --demo
//
// 只用 Node，不需要 Python。实机电脑上不要回家，不要传 zip。
//
// 用法:
//   node automation/node-runner/make-brief.mjs --case AZ-110-01-009 \
//     --capture capture-AZ-110-01-009/az-110-01-009
//
// 产出 <out>（默认 brief/<case>，全部 .txt，已被 .gitignore）:
//   README.txt        给人看的步骤
//   00-RULES.txt      语言规范原文
//   01-HAND.txt       手顺行 + 别紙值/期望（从 v2/data/cases 自动导出）
//   02-INDEX.txt      capture pack 索引：措辞 → 控件 id / 按钮 / 表格样例
//   03-SCREENS-NN.txt 清洗后的实机 HTML
//   04-ROUTES.txt     实机走过的 URL → 画面名
//   05-PROMPT.txt     粘贴到对话框的指令
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, copyFileSync, statSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '../..');
const SPEC = join(ROOT, 'docs', 'rpa', '16-LANGUAGE.md');

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const flag = (n) => process.argv.includes(`--${n}`);

const caseId = arg('case');
const captureArg = arg('capture');
if (!caseId || !captureArg) {
  console.error('usage: node make-brief.mjs --case <本> --capture <capture-dir> [--out DIR] [--no-screens] [--no-pack]');
  process.exit(2);
}
const cap = resolve(process.cwd(), captureArg);
if (!existsSync(cap)) { console.error(`no such capture: ${cap}`); process.exit(2); }
const out = resolve(process.cwd(), arg('out', join(ROOT, 'brief', caseId)));
const noScreens = flag('no-screens');

// ── 手顺数据 ────────────────────────────────────────────────────────
// v2/data/cases/*.js 是 `window.MSAD_CASES_XX = { ... }`，直接切掉前缀当 JSON。
function loadCase(cid) {
  const dir = join(ROOT, 'v2', 'data', 'cases');
  const parts = cid.split('-');
  const guess = join(dir, `${parts[0]}-${parts[1]}.js`);
  const files = existsSync(guess) ? [guess] : readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => join(dir, f));
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    if (!text.includes(`"${cid}"`)) continue;
    const eq = text.indexOf('=');
    let json = text.slice(eq + 1).trim();
    if (json.endsWith(';')) json = json.slice(0, -1).trim();
    try {
      const all = JSON.parse(json);
      if (all[cid]) return all[cid];
    } catch (e) {
      throw new Error(`cannot parse ${basename(file)}: ${e.message}`);
    }
  }
  throw new Error(`case ${cid} not found in v2/data/cases`);
}

// Port of tools/rpa_common.appendix_blocks (same rules, same output shape).
function appendixBlocks(sheets, kind) {
  const outMap = new Map();
  for (const sh of sheets || []) {
    if (String(sh.type || '').toUpperCase() !== kind) continue;
    const rows = sh.rows || [];
    if (!rows.length) continue;
    const width = Math.max(...rows.map((r) => r.length));
    let labelCol = null;
    let best = -1;
    for (let i = 0; i < Math.min(4, width); i += 1) {
      let score = 0;
      for (const r of rows) {
        if (i >= r.length) continue;
        const v = String(r[i] ?? '').trim();
        if (!v || /^\d{1,3}$/.test(v)) continue;
        if (r.slice(i + 1).some((c) => String(c ?? '').trim())) score += 1;
      }
      if (score > best) { best = score; labelCol = i; }
    }
    if (labelCol === null) continue;
    const blockCol = Math.max(0, labelCol - 1);
    const counts = new Map();
    for (const r of rows) {
      if (labelCol >= r.length || !String(r[labelCol] ?? '').trim()) continue;
      for (let j = labelCol + 1; j < r.length; j += 1) {
        const v = String(r[j] ?? '').trim();
        if (v && !/^[※*＜<]/.test(v)) counts.set(j, (counts.get(j) || 0) + 1);
      }
    }
    let valueCol = null;
    let max = 0;
    for (const [col, n] of counts) {
      if (n > max) { max = n; valueCol = col; }
    }
    if (valueCol === null) continue;
    let cur = null;
    rows.forEach((r, idx) => {
      const b = blockCol < r.length ? String(r[blockCol] ?? '').trim() : '';
      if (/^\d{1,2}$/.test(b)) {
        cur = Number(b);
        if (!outMap.has(cur)) outMap.set(cur, {});
      }
      const label = String(r[labelCol] ?? '').trim();
      const val = String(r[valueCol] ?? '').trim();
      if (cur === null) return;
      const block = outMap.get(cur);
      if (label && val) block[label] = [val, idx + 1];
      else if (label && (label.includes('別紙参照') || label.includes('その他項目'))) {
        block.__notes__ = block.__notes__ || [];
        block.__notes__.push(label);
      }
    });
  }
  return outMap;
}

function handText(cid, c) {
  const rows = (c.workflow || {}).rows || [];
  const sheets = (c.appendix || {}).sheets || [];
  const outLines = [`CASE ${cid}  ${c.functionName || ''}`, ''];
  const screens = [];
  for (const r of rows) {
    if (String(r.verificationType || '').trim() === '遷移') {
      const n = String(r.verificationItem || '').trim();
      if (n && !screens.includes(n)) screens.push(n);
    }
  }
  outLines.push('SCREEN ORDER (from 遷移 rows): ' + screens.join(' -> '), '');
  outLines.push('WORKFLOW ROWS');
  outLines.push('row | functionName | verificationType | verificationItem | verificationContent | '
    + 'evidenceType | operationType | operationItem | operationContent | operationNo');
  const keys = ['sourceRow', 'functionName', 'verificationType', 'verificationItem', 'verificationContent',
    'evidenceType', 'operationType', 'operationItem', 'operationContent', 'operationNo'];
  for (const r of rows) {
    outLines.push(keys.map((k) => String(r[k] ?? '').replace(/\n/g, ' / ')).join(' | '));
  }
  outLines.push('');
  for (const [kind, label] of [['OPERATION', '【別紙】操作内容（要填入的值）'],
    ['DISPLAY', '【別紙】表示内容（应看到的期望）']]) {
    outLines.push(label);
    const blocks = appendixBlocks(sheets, kind);
    if (!blocks.size) outLines.push('  (none)');
    for (const no of [...blocks.keys()].sort((a, b) => a - b)) {
      outLines.push(`BLOCK ${no}`);
      for (const [lab, item] of Object.entries(blocks.get(no))) {
        if (lab.startsWith('__')) { outLines.push(`  NOTE ${item}`); continue; }
        outLines.push(`  ${lab} = ${item[0]}   (row ${item[1]})`);
      }
    }
    outLines.push('');
  }
  outLines.push('REMINDERS');
  outLines.push('- 値は必ず別紙から。source: case, row: N を付ける。');
  outLines.push('- システム値は ${sys.today} / ${sys.now} / ${sys.today+7d}。');
  outLines.push('- 画面名は 遷移 行のとおり。');
  return outLines.join('\n');
}

const PROMPT = `以下を添付します。あなたの仕事は「結合試験の手順書1本」を、そのまま実行できる
YAML フローに変換することです。添付ファイル:

- 00-RULES.txt      … このフローの言語仕様。**必ずこれに従う**
- 01-HAND.txt       … 手順の行（row 番号つき）と、別紙の値・期待
- 02-INDEX.txt      … 実機ページから採った「手順の言葉 → コントロール」一覧
- 03-SCREENS-NN.txt … 実機ページの HTML（画面ごと）
- 04-ROUTES.txt     … 実際に踏んだ URL と画面名

出力は YAML のコードブロック2つだけ。説明は書かない。

(1) flow — 形式は 00-RULES.txt の §3。
    - 手順の操作行 1 行 = ステップ 1 個。\`row:\` は手順の行番号をそのまま。
    - 画面名は 遷移 行のとおり。
    - target は \`{label: 手順の言葉}\`。selector は書かない。
    - 値は 01-HAND.txt の別紙から。\`{value, source: case, row: N}\`。
    - 「初期値」「空白」「入力なし」は値を作らない。
    - 画面遷移の検証行は \`do: screenIs\`。「表示内容 N 参照」は
      \`expect: {ref: {appendix: 表示内容N, status: unresolved, note: ...}}\`。
    - 出力（Msg）行は \`do: messageIs\` + \`expect: {message: {code: ...}}\`。
    - 分からない所は \`note: "不确定：..."\` を書く。推測して埋めない。

★★★ 以下は「出力前に自分で確認する」必須チェック。ここを外すと動かない。★★★

【A. 値の型 — 最頻出の誤り】
  02-INDEX.txt の LABELS に「→ checkbox」と書いてある欄は、**値は true / false だけ**。
  別紙が「チェックオン」なら true、「連動しない」「チェックオフ」なら false。
  文字列 'true' でも、別紙の言葉そのままでも駄目。
    誤  checkbox欄: {value: 連動しない, source: case, row: 7}
    正  checkbox欄: {value: false, source: literal, row: 7, note: "別紙『連動しない』= OFF"}
  「→ select」の欄は、**値は options に載っている文字列そのもの**。
    誤  {value: 31}            （option の value 属性を書いている）
    正  {value: 添付書類もれ}   （表示文字を書く）
  「→ text」の欄は文字列、日付は YYYY/MM/DD。

【B. どの原語か — 2番目に多い誤り】
  02-INDEX.txt の型と、やろうとしていることを突き合わせる:
    型が select で「一覧から 1 つ選ぶ」          → do: select      （chooseRow ではない）
    型が checkbox                            → do: check       value: true/false
    表の行にある radio/ボタン（行で特定する）    → do: chooseRow   anchor 必須
    「ラベルの無いリストボックス」から選ぶ       → do: chooseRow   anchor 必須
  02-INDEX.txt に UNLABELED LISTS があれば、手順の「選択」は**そこ**を指す。
  LABELS に載っていないからといって、勝手に label を作らない。
  02-INDEX.txt に「TABLE: 1行 = 1件」がある画面では、NAME[n] FAMILIES の各項目は
  **1 行につき 1 つ**の行内コントロール。n は行番号ではないので、n を直接書かず
  anchor で行を指す。列名（項目ｺｰﾄﾞ／代理店照会／不備内容 …）は target.label に使う。

【C. 行内コントロール — anchor は必須】
  表の行、またはリストボックスの中の要素を操作するときは必ず:
    target:
      label: <02-INDEX にあるラベル。ラベルが無いリストなら label は書かず selector 側で解決>
      anchor: "\${case.別紙の名前}"
  anchor は**その行にしか無い表示値**。行番号・nth-child・[0] は禁止。
  anchor が空、true/false、オブジェクトになるのは全部誤り。

【D. popup — 見落としやすい】
  02-INDEX.txt の WINDOW 行に「子ウィンドウ（popup）」とある画面で操作するステップ、
  および 04-ROUTES.txt で別ウィンドウとして開いている URL の画面は、
  **そのステップに \`popup: true\` を必ず付ける。**
  flow 全体で 1 個も popup: true が無いのに、手順に「検索画面を開く」があるなら付け忘れ。

【E. 手順 1 行が複数操作を含むとき】
  手順の 1 行が「A を選び、B も選び、C も設定する」と複数の操作を指している場合
  （別紙の「入力内容：N参照」が複数項目を列挙している等）、
  **同じ row のステップを複数書いてよい**（順序は手順の順）。
  逆に、1 操作で足りるなら 1 個だけ書く。どちらか分からない場合は note に書く。

【F. 出力前の自己点検（必ず実施）】
  □ 手順の操作行の数 = ステップ数（削除・統合なし）
  □ checkbox の値は true / false のみ
  □ select の値は options の表示文字
  □ 行内・リストボックス操作には anchor（文字列）がある
  □ popup 画面のステップに popup: true がある
  □ selector を書いていない
  □ expect を緩めていない

(2) control-patch — 00-RULES.txt の §8。\`{label}\` が 02-INDEX.txt の
    LABELS に載っていない場合だけ、その label の selector を 03-SCREENS の HTML から作る。
    載っている label は書かない。
    行内コントロールは \`selectorTemplate: 'tr:has(td:text-is("{value}")) <base>'\`。

注意:
- 存在しない id/name を創作しない。HTML に無いものは「無い」と書く。
- 手順の行を削除・統合しない。44 行なら 44 ステップ。
- 期待（expect）を勝手に緩めない。
- 02-INDEX.txt に書かれている型（select / checkbox / text）を無視しない。
`;

const README = (cid, capPath) => `给 Copilot 的材料包 —— 用法（照顺序做，全部在这台电脑上完成）

一、上传（Copilot 网页里逐个上传，不要 zip）
   00-RULES.txt
   01-HAND.txt
   02-INDEX.txt
   03-SCREENS-*.txt（有几个传几个）
   04-ROUTES.txt

二、把 05-PROMPT.txt 的全文粘贴到对话框，发送。

三、它会给两个 YAML 代码块：
   - 第一个存成 flows/tests/${cid}.ai.yaml
   - 第二个（如果有）存成 flows/patches/${cid}.control.yaml
   注意：YAML 顶层的 case: 必须是 ${cid}。

四、回到仓库验证（顺序不能反）
   node automation/node-runner/check-flow.mjs flows/tests/${cid}.ai.yaml
   node automation/node-runner/check-patch.mjs --flow flows/tests/${cid}.ai.yaml --capture ${capPath}

   有错就把「错误原文」粘回同一个对话，让它只改出错的行；改完再跑。
   校验通过后：
   node automation/node-runner/run-flow.mjs flows/tests/${cid}.ai.yaml --live --demo --demo-delay 1200

五、如果 Copilot 说「太长 / 读不完」
   只上传 00-RULES.txt + 01-HAND.txt + 02-INDEX.txt，先让它写 flow。
   HTML 等它问「某个控件是什么」时再逐个贴。
   （也可以在生成材料包时加 --no-screens，直接不产生 03 文件。）

判读：check-patch 的 ANCHOR = 模板对、但手顺的锚点值不在这份 capture 的数据里，
不是错误，也不是通过；PENDING = 运行期才能验。
`;

// ── pack ────────────────────────────────────────────────────────────
// An old pack can be worse than no pack: it was built by an earlier
// make-pack whose label table said 「不備内容 → input#selected_imperfect_code」
// (a hidden input) while the page has a <select>. The brief must never ship
// a stale index, so rebuild unless the caller explicitly says --no-pack.
const pack = join(cap, 'pack');
if (flag('no-pack')) {
  if (!existsSync(join(pack, '00-INDEX.md'))) {
    console.error(`pack missing: ${pack} (run make-pack.mjs first)`);
    process.exit(2);
  }
} else {
  console.log(`rebuilding pack from ${cap}`);
  execFileSync(process.execPath, [join(here, 'make-pack.mjs'), '--capture', cap], { stdio: 'inherit' });
}

mkdirSync(out, { recursive: true });
for (const f of readdirSync(out)) {
  if (f.endsWith('.txt')) rmSync(join(out, f));
}

const spec = readFileSync(SPEC, 'utf8');
writeFileSync(join(out, '00-RULES.txt'), spec, 'utf8');
const c = loadCase(caseId);
writeFileSync(join(out, '01-HAND.txt'), handText(caseId, c), 'utf8');
copyFileSync(join(pack, '00-INDEX.md'), join(out, '02-INDEX.txt'));
let n = 0;
if (!noScreens) {
  for (const f of readdirSync(pack).filter((x) => /^\d\d-screens\.md$/.test(x)).sort()) {
    n += 1;
    copyFileSync(join(pack, f), join(out, `03-SCREENS-${String(n).padStart(2, '0')}.txt`));
  }
}
if (existsSync(join(pack, 'routes.md'))) copyFileSync(join(pack, 'routes.md'), join(out, '04-ROUTES.txt'));
writeFileSync(join(out, '05-PROMPT.txt'), PROMPT, 'utf8');
writeFileSync(join(out, 'README.txt'), README(caseId, cap), 'utf8');

console.log(`brief ${out}`);
let big = 0;
for (const f of readdirSync(out).filter((x) => x.endsWith('.txt')).sort()) {
  const size = statSync(join(out, f)).size;
  if (size > 200_000) big += 1;
  console.log(`  ${f.padEnd(20)} ${String(size).padStart(8)} B`);
}
if (big) console.log('WARN 有超过 200KB 的文件，上传框可能拒收；可用 --no-screens 先只传规则+手顺+索引。');
