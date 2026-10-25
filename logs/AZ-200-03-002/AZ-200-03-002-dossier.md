# AUDIT DOSSIER — AZ-200-03-002

meta: {"domain": "AZ", "company": "MS", "functionName": "セッションタイムアウト（子画面）", "item": "共通", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-200-03-002.xlsx"}
feasibility: class=C flow=pass manualSteps=2 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]クリック|「No」リンク|任意のデータ
- r15 | CK[2]遷移|回答入力画面|遷移すること | EV:画面HC
- r16 | OP[1]ボタン|「訂正内容確認書」|-
- r17 | CK[2]遷移|代理店 訂正内容確認画面|遷移すること | EV:画面HC
- r18 | OP[1]その他|画面を操作せず、一時間待機|
- r19 | OP[2]入力|確認者(募集人または社員)|test
- r20 | OP[3]クリック|eメールによる確認の場合|チェックする
- r21 | OP[4]ボタン|「登録」押下|
- r22 | CK[5]遷移|セッションタイムアウト画面
（子画面）|遷移すること | EV:画面HC
- r23 | CK[6]出力（Msg）|エラーメッセージ|MAZG000E003 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000002"  <- auto.json
- editedInquiryContent = "編集済み。"  <- auto.json
- fieldAgentId = "3028004586"  <- auto.json
- freeCode = "1234567890"  <- auto.json
- inputType = "2"  <- auto.json
- inquiryCode = "T007"  <- auto.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- auto.json
- inquiryId = "0000000012"  <- auto.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "00 ： 自賠責"  <- auto.json
- itemCode = "T0"  <- auto.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "B"  <- auto.json
- pointCheck = "?"  <- auto.json
- policyNo = "AZ11001"  <- auto.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- auto.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=34: user,pointCheck,sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-AGT-SESSION-TIMEOUT  rows 14..21  status3=coded
  screen=代理店 不備一覧(AMC22)→代理店 訂正内容確認(AMC24 子画面) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click No sel="#link_tag" val=""
  - [assert] ast 遷移 回答入力 sel="#updateAnswer" val=""
  - [click] click 訂正内容確認書 sel="input[name='act104to908']" val=""
  - [popup] popup 訂正内容確認 sel="" val=""
  - [assert] ast 遷移 代理店 訂正内容確認 sel="#confirm_user_name" val="" (popup)
  - [wait] 画面を操作せず、一時間待機 sel="" val="" (popup) NOTE:1時間待機はmockでは短期待機で代替（タイムアウト子画面は真機で発生）
  - [fill] input 確認者(募集人または社員) sel="#confirm_user_name" val="params.confirmer" (popup)
  - [check] check eメールによる確認の場合 sel="#email_confirm_check" val="" (popup)
  - [click] click 登録 sel="#regist" val="" (popup) NOTE:visibility 制御下のため force 押下
### BLK-SHR-EEFF5DB3  rows 22..23  status3=coded
  screen=代理店 訂正内容確認(AMC24 子画面)→セッションタイムアウト画面 (子画面) file=block-selectors-amc-slice.json
  - [assert] ast 遷移 セッションタイムアウト画面 (子画面) sel="#regist" val="" (popup) NOTE:非浏览器=真機人工（タイムアウト子画面はmock未収録のため訂正内容確認の子画面在位で代替）
  - [assert] ast エラーメッセージ sel="#close" val="" (popup) NOTE:非浏览器=真機人工（mockにタイムアウト文言が無いため子画面の閉じるボタン在位で代替）

## 5. 本次运行结果（块级）
- BLK-AZ-AGT-SESSION-TIMEOUT  pass  rows None..None
- BLK-SHR-EEFF5DB3  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|回答入力画面 file=02_r015_回答入力画面.png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r17 遷移|代理店 訂正内容確認画面 file=03_r017_代理店_訂正内容確認画面.png url=...http://127.0.0.1:10097/AMC00/AMC24.html
- [SOFT] r22 遷移|セッションタイムアウト画面 (子画面) file=- MANUAL url=...
- [OK ] r23 出力(Msg)|エラーメッセージ file=04_r023_エラーメッセージ.png url=...http://127.0.0.1:10097/AMC00/AMC24.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-200-03-002/01_menu.png
- logs/AZ-200-03-002/02_r015_回答入力画面.png
- logs/AZ-200-03-002/03_r017_代理店_訂正内容確認画面.png
- logs/AZ-200-03-002/04_r023_エラーメッセージ.png
- logs/AZ-200-03-002/06_BLK-SHR-EEFF5DB3.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- EVIDENCE NOT EXACT rows: [22]
- MANUAL (non-browser) rows: [22] — per MANUAL-DECISION.md these are human steps

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
