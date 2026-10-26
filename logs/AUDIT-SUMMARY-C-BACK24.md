# AUDIT SUMMARY — C 类后 24 本（2026-10-25）

- 审计口径: 只看模拟环境（bikuri 拍板）。判定 = 自动化步骤与手顺书在前端导线层面吻合；
  mock 无后端导致的值不回显/消息不出现一律记 live-pending 不算 fail。
- 红线遵守: 只新增 audit.md（24 份），未动 execution-status.json / blocks.json / selector / params。
- 清单来源: v2/data/feasibility.js class=C 48 本按 ID 排序的后 24 本（logs/C-BACK-24.txt）。
- 节奏: 同模板组只深审代表本，组员核「参数差异=別紙差异」+ 亲眼看 1-2 张关键截图。每本≥1 疑点。

## Verdict 一览（24/24 = clean-with-notes，0 suspicious，0 clean）

| caseId | 组 | verdict | 主要疑点（★=auto 值消费不一致） |
|---|---|---|---|
| AY-121-03-007 | TPL-AY-121-03-005 代表 | clean-with-notes | ★customerName=TEST ≠ 別紙「黒川　京子」（该组唯一被消费的 auto 值） |
| AY-121-03-008 | 组员 | clean-with-notes | 同组级疑点（明細 0074/火災/住総(地震付き)） |
| AY-121-03-009 | 组员 | clean-with-notes | 同上（0075/積立火災/積立マンション） |
| AY-121-03-010 | 组员 | clean-with-notes | 同上（0076/新種/ファミリー労災） |
| AY-121-03-011 | 组员 | clean-with-notes | 同上（0077/マリン/外航(輸入)） |
| AY-121-03-012 | 组员 | clean-with-notes | 同上（0078/積立新種/積立動総） |
| AY-121-03-013 | 组员 | clean-with-notes | 同上（0079/傷害/普傷） |
| AY-121-03-014 | 组员 | clean-with-notes | 同上（0080/マリン/外航(三国間)） |
| AY-130-02-001 | 单本 | clean-with-notes | ★検索キー全硬编码 AHE61/252H/AY11001 ≠ 別紙 AAAAA+2031/ABM62+2031（已知「AY 検索积木硬编码」該当本）；境界值（0/1000/1001/2000/2001 件・DL 可否）全未再现；r50-79 検索 4-6 回未実装 |
| AZ-112-01-001 | 单本 | clean-with-notes | ★sectionCode=A3M02 固定，別紙 4 種（AHK81/AHK02/AAAAA/A3M61）全不匹配 → 通知件数境界(59/9/0/51/60/100)前提崩坏；customerName=TEST≠「XX XX」；MAZG 系消息全部只有枠 assert |
| AZ-120-03-001 | 单本 | clean-with-notes | ★detailNo=0000000002 两检索共用 ≠ 別紙入力1=0000000001；MAZG200W024 排他断言缺失（r20 被置换成画面表示 assert）；「他ユーザで連絡→照会」前提 mock 不可 |
| AZ-120-03-002 | 单本（001 AD 版） | clean-with-notes | 同 001 组级疑点 |
| AZ-150-04-002 | 单本 | clean-with-notes | ★policyNo=AZ11001 ≠ 手順 AZ15003；帳票種類無「不備照会・返送票」選択肢且 radio 未选即出力 assert 通过；batch 16 块全部画面在位代理 pass |
| AZ-150-13-001 | TPL-AZ-150-13-001 代表 | clean-with-notes | ★policyNo=AZ11001 ≠ AZ15013001；#relation_agent click=ON（手順要求未チェック）、#status_code_2=「1：未対応」のみ（手順要求すべて）→ 検索条件与手順相反；集計期間 2026/11 ≠ 202704 |
| AZ-150-13-002 | 组员 | clean-with-notes | 同组级疑点（AZ15013002） |
| AZ-150-13-003 | TPL-AZ-150-13-003 代表 | clean-with-notes | ★policyNo=AZ11001 ≠ AZ15013003；checkbox 相反同上；移管前后表示差分未再现 |
| AZ-150-13-004 | 组员 | clean-with-notes | 同组级疑点（AZ15013004） |
| AZ-160-01-004 | 单本 | clean-with-notes | ★detailNo=0000000008 两检索共用 ≠ 入力1=0000000007；freeCode/fiedAgentId/計上年月 三项与別紙表示内容不一致；帳票種別（FAX用 2項目表示）无选择步骤 |
| AZ-160-01-005 | 单本 | clean-with-notes | 同 004 模式（明細 0009/0010，不備督促票 FAX 用） |
| AZ-160-01-006 | 单本 | clean-with-notes | 同 004 模式（0001/0002，AD・照会・返送票） |
| AZ-160-01-007 | 单本 | clean-with-notes | 同 004 模式（0003/0004，AD・連絡票） |
| AZ-200-03-002 | TPL-AZ-200-03-002 代表 | clean-with-notes | confirmer=TEST vs 手順 test（大小写・轻微）；タイムアウト検証全部代替 assert（短期待機/子画面在位/閉じる在位），MAZG000E003 无実体 |
| AZ-200-03-004 | 组员 | clean-with-notes | 同组级疑点 |
| AZ-220-01-003 | 单本 | clean-with-notes | ★検索条件 3 値全 auto 兜底、別紙=外部 xlsx 无法本卷内突合；r15 参照可能代理店テーブル=输入欄在位 proxy；r16 条件網羅未実装 |

## 新发现（超出已知清单的部分）

1. **両検索共用 detailNo 模式**（AZ-120-03-001/002、AZ-160-01-004/005/006/007 共 6 本）:
   generated.json 只保留了一个明細番号，別紙入力1/入力2 的两明細使い分け在 block 里被同一个
   params.detailNo 覆盖。修正点明确（把 1 回目检索的明細改回別紙值即可），建议参数修正时按此模式批量处理。
2. **checkbox 语义相反**（AZ-150-13-001/002/003/004）: block click #relation_agent=勾上（手順 r35/r17 要求
   未チェック）；#status_code_2 只勾「1：未対応」（手順要求「すべてチェック」）。mock-src 已核实
   （AMA07.html: relation_agent value=1、status_code_2 label=1：未対応）。不是截图时序问题，是 selector 设计与手順相反。
3. **帳票種別選択ステップ欠落**（AZ-150-04-002、AZ-160-01-004〜007 共 5 本）: 手順要求先選択帳票種類
   （radio）再出力，但 mock 帳票画面（AMA14）根本没有对应的帳票種別选项，block 也没有 radio 选择步骤，
   出力 assert 只检查 #Print 按钮存在 → 全部 live-pending。AZ-150-04-002 要的「申込書類不備照会・返送票」
   与 AZ-160-01-004/005 要的 FAX 用種別在帳票種類 radio 列表中均不存在。
4. **「TEST」/「test」表記不一致**（AZ-200-03-002/004）: 参数 confirmer=TEST vs 手順 test，轻微但属
   auto-fallback 値与手順不一致，一并列入修正清单。
5. **計上年月硬编码 2026/11**: AZ-160-01-004〜007（別紙 2026/12）、AZ-150-13-001/002（別紙バッチ期間
   202704）。block 里的写死值与別紙不一致，参数化时的修正点。
6. **AZ-130-02-001 手順 r50-79 未実装**: 帳票 DL 境界（検索条件 4〜6 回目）在 block 里没有对应的検索
   步骤（4 回目以降只有 DL）。网罗性欠缺，不影响已実装部分 pass 的有效性。
7. **AZ-220-01-003 の別紙は外部ファイル**（検索条件整理（AZ-220-01）.xlsx），卷宗无法突合——auto 兜底
   3 值是否正确无法在本卷判定，需拿到外部文件后补核。
8. **filled 値不回显的取证限制**: AMC/AYG/AZG/AMA 静的模板在检索/popup 重渲染后输入值一律回到占位「1」，
   截图无法证明 fill 值落地，只能靠 runner step pass + selector 语义（mock-src 核对）+ URL/消息 assert
   三方拼证据。本次所有「值一致 ✓」的判定均基于 §3 参数值与 §4 selector 引用的对照，非画面回显。

## 已知组级问题命中情况（标注即可，不算 fail）

- AY 検索积木硬编码 AY11001: 命中 AY-130-02-001（AHE61/252H/AY11001 全硬编码）。
- 消息断言缺失（AZ-111-03/05 系）: 命中 AZ-120-03-001/002（MAZG200W024 无断言）、AZ-112-01-001
  （MAZG 系只有枠 assert）、AZ-200-03-002/004（MAZG000E003 代替 assert）。
- BLK-AUTO-DDA3A833 inquiryId 问题: 本 24 本未出现该块。
- planned/proxy 块混进 pass: 命中 AZ-150-04-002（batch 16 块）、AZ-150-13-001/002/003/004（バッチ
  assert 画面在位代理）、AZ-220-01-003（参照可能代理店テーブル代替）。NOTE 中均有明记。
- pointCheck auto-fallback: 本 24 本无 selector 消费 pointCheck（全部死参数），未造成实害。
- AZG900 静态 T0/T007 模板: 命中 AZ-160 系等（「1」占位行）。

## 统计

- verdict: clean-with-notes 24 ｜ clean 0 ｜ suspicious 0
- 全部 24 本的块级 runner 结果 pass（无 skipped），审计后块裁定普遍为 mock-done（導線）+ live-pending
  （业务值/消息/帳票/バッチ/DB），无 doubt 级矛盾。
- 送 bikuri 拍板的参数修正建议清单（按新发现 1-5 整理，约 15 本可机械修正）。
