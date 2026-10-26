// AI judge: critical per-block review of a test run.
// Reads the runner's trace + evidence + the book's procedure rows, asks the AI
// to adversarially verify each block, writes judgment JSON/MD next to the logs.
// Usage: node judge.mjs --case AZ-110-01-009 [--model auto/GLM-5.3-Flash] [--only BLK-xxx]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const arg = (n, d) => { const i = process.argv.indexOf(`--${n}`); return i > 0 ? process.argv[i + 1] : d; };
const root = dirname(fileURLToPath(import.meta.url));
const caseId = arg('case', 'AZ-110-01-009');
const only = arg('only', '');
const MODEL = arg('model', 'auto/GLM-5.3-Flash');
const RETRY = 2;
const NL = String.fromCharCode(10);
const logDir = join(root, '../../logs', caseId);

// provider config from the running Alma instance (key never lands on disk here)
const prov = JSON.parse(readFileSync(process.env.TEMP + '/prov.json', 'utf8'))
  .find(p => p.id === 'mumsg8ihn988xwn6gbg');
const API = (prov.baseURL.endsWith(String.fromCharCode(47)) ? prov.baseURL.slice(0, -1) : prov.baseURL) + '/chat/completions';
const KEY = prov.apiKey;

async function askAI(system, user) {
  let lastErr;
  for (let attempt = 0; attempt <= RETRY; attempt++) {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer ' + KEY },
      body: JSON.stringify({ model: MODEL, messages: [
        { role: 'system', content: system }, { role: 'user', content: user },
      ], temperature: 0.2, max_tokens: 5000 }),
    });
    const j = await res.json();
    const msg = j.choices && j.choices[0] && j.choices[0].message;
    if (msg && msg.content) return msg.content;
    lastErr = new Error('AI reply bad: ' + JSON.stringify(j).slice(0, 160));
    await new Promise(r => setTimeout(r, 1200 * (attempt + 1))); // backoff on route flake
  }
  throw lastErr;
}

// ---- load inputs ----
const trace = JSON.parse(readFileSync(join(logDir, caseId + '-trace.json'), 'utf8')).entries;
const result = JSON.parse(readFileSync(join(logDir, caseId + '-node-result.json'), 'utf8'));
const evidence = existsSync(join(logDir, caseId + '-evidence.json'))
  ? JSON.parse(readFileSync(join(logDir, caseId + '-evidence.json'), 'utf8')).evidence : [];
const BLOB = JSON.parse(readFileSync(join(root, '../../automation/blocks/blocks.json'), 'utf8'));
const comp = BLOB.workflows[caseId];

// procedure rows: pull this case's object out of the data js by brace matching
const cat = caseId.split('-').slice(0, 2).join('-');
const dataJs = readFileSync(join(root, '../../v2/data/cases', cat + '.js'), 'utf8');
const keyIdx = dataJs.indexOf('"' + caseId + '"');
let procRows = [];
if (keyIdx >= 0) {
  const objStart = dataJs.indexOf('{', keyIdx);
  let depth = 0, end = -1;
  for (let i = objStart; i < dataJs.length; i++) {
    if (dataJs[i] === '{') depth++;
    else if (dataJs[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  try { procRows = JSON.parse(dataJs.slice(objStart, end)).workflow.rows || []; } catch (e) { console.error('proc parse warn:', e.message.slice(0, 60)); }
}

// group trace by block
const byBlock = new Map();
for (const t of trace) {
  if (!byBlock.has(t.block)) byBlock.set(t.block, []);
  byBlock.get(t.block).push(t);
}
const blocks = only ? [only] : [...byBlock.keys()];

const SYSTEM = [
  '你是結合試験の自動化結果の審査員。批判的思考が求められる。',
  'このテストは"模擬環境"（ソースコードから再構築したフロントエンドのみ。Javaバックエンドなし、DBなし）で実行された。',
  '各ブロックの実行トレースを見て判定する。',
  '',
  '判定の観点:',
  '1. 手順の意図: このブロックが本来やろうとしている業務操作（手順行から理解）',
  '2. 実行一致: トレースのアクション列は意図どおりか（余計なforce/省略がないか）',
  '3. 状態遷移: URL遷移とページスナップショット（gamid・可視ボタン）は期待どおりか',
  '4. 反証義務: pass判定の前に必ず「このpassは何を欺いているか」を自問し疑点を最低1つ挙げる。 Truly 思い浮かばない場合のみ「疑点なし」と明示。',
  '',
  '出力は JSON のみ: {"verdict":"pass|pass-with-doubts|fail","intent":"業務意図の1文","doubts":["疑点",...],"notes":"補足"}',
  'verdict: 完走+断言OKで疑点あり→pass-with-doubts。アクション不一致や状態異常→fail。',
].join(NL);

const judgeOne = async (blockId) => {
  const steps = byBlock.get(blockId) || [];
  if (!steps.length) return null;
  const det = comp ? comp.blockDetails.find(b => b.block === blockId) : null;
  const rows = det ? '手順行 ' + det.fromRow + '-' + det.toRow : '行不明';
  const procLines = procRows
    .filter(r => det && r.sourceRow >= det.fromRow && r.sourceRow <= det.toRow)
    .map(r => '行' + r.sourceRow + ': ' + (r.operationItem ? '操作:' + r.operationItem : '') + (r.verificationItem ? ' 確認:' + r.verificationItem : '') + ' 証跡:' + (r.evidenceType || 'なし'))
    .join(NL);
  const traceLines = steps.map(t => t.n + '. [' + t.action + '] ' + t.event
    + ' | 実値:' + JSON.stringify(t.resolvedValue === undefined ? t.value : t.resolvedValue)
    + ' | URL:' + t.url.slice(-24)
    + ' | 画面:' + (t.pageSnapshot ? t.pageSnapshot.gamid : '?')).join(NL);
  const evLines = evidence
    .filter(e => det && e.row >= det.fromRow && e.row <= det.toRow)
    .map(e => '行' + e.row + ':' + e.status + (e.manual ? '(manual)' : '') + ':' + e.item).join(' ');
  const user = ['# ブロック ' + blockId + '（' + rows + '）',
    '## 手順（業務意図）', procLines || '（行データなし）',
    '## 実行トレース', traceLines,
    '## 証跡取得状況', evLines || '（この範囲に画面HCなし）',
    '## 実行結果', 'ブロック状態: pass（全ステップ例外なしで完走）'].join(NL);
  let raw;
  try { raw = await askAI(SYSTEM, user); }
  catch (e) { return { block: blockId, verdict: 'error', reason: e.message.slice(0, 120) }; }
  let j = null;
  for (let attempt = 0; attempt < 2 && !j; attempt++) {
    try { j = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)); }
    catch {
      if (attempt === 0) {
        raw = await askAI(SYSTEM + NL + '前回の出力はJSONとして壊れていました。JSONのみで出し直してください。', user + NL + NL + '前回出力(壊):' + raw.slice(0, 600));
      } else { j = { verdict: 'parse-error', intent: '', doubts: [raw.slice(0, 200)], notes: '' }; }
    }
  }
  return { block: blockId, verdict: j.verdict, intent: j.intent, doubts: j.doubts, notes: j.notes };
};
const judgments = (await Promise.all(blocks.map(bid => judgeOne(bid)))).filter(Boolean);
const order = { fail: 0, 'parse-error': 1, error: 1, 'pass-with-doubts': 2, pass: 3 };
judgments.sort((a, b) => (order[a.verdict] === undefined ? 9 : order[a.verdict]) - (order[b.verdict] === undefined ? 9 : order[b.verdict]));
writeFileSync(join(logDir, caseId + '-judgment.json'), JSON.stringify({
  caseId, judgedAt: new Date().toISOString(), model: MODEL, judgments,
}, null, 2));
const md = ['# AI 判定 — ' + caseId, '', 'model: ' + MODEL + ' · ' + new Date().toISOString(), ''];
for (const j of judgments) {
  const icon = j.verdict === 'pass' ? '✅' : j.verdict === 'pass-with-doubts' ? '🟧' : '❌';
  md.push('## ' + icon + ' ' + j.block + ' — ' + j.verdict);
  if (j.intent) md.push('**意图**: ' + j.intent);
  if (j.doubts && j.doubts.length) md.push('**疑点**:' + NL + j.doubts.map(d => '- ' + d).join(NL));
  if (j.notes) md.push('**補足**: ' + j.notes);
  md.push('');
}
writeFileSync(join(logDir, caseId + '-judgment.md'), md.join(NL));
const bad = judgments.filter(j => j.verdict !== 'pass');
console.log('JUDGE DONE: ' + judgments.length + ' blocks — '
  + (judgments.length - bad.length) + ' pass, '
  + judgments.filter(j => j.verdict === 'pass-with-doubts').length + ' with-doubts, '
  + bad.length + ' problems');
for (const j of bad) console.log('  ' + j.verdict + ': ' + j.block + ' — ' + String(j.reason || (j.doubts || [])[0] || '').slice(0, 100));
process.exit(0);
