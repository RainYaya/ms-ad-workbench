# AUDIT DOSSIER — AY-100-05-001

meta: {"domain": "AY", "company": "MS", "functionName": "システムエラー：想定外遷移（親画面）", "item": "共通", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-100-05-001.xlsx"}
feasibility: class=B flow=pass manualSteps=5 proxyBlocks=1 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「照会・検索」押下|
- r15 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認）
- r16 | OP[1]ボタン|「検索」押下|（任意の検索条件）
- r17 | CK[2]表示|照会・検索画面|データが表示されること | EV:（目視確認）
- r18 | OP[3]クリック|No.リンク|（任意のデータ）
- r19 | CK[4]遷移|申請・確認更新画面|遷移すること | EV:画面HC
- r20 | OP[1]その他|「F12」より開発者ツールを開く|
- r21 | OP[2]その他|開発者ツールでctrl+fを使用し、application_idを検索|
- r22 | CK[3]表示|開発者ツール|application_idのvalueの値を確認 | EV:画面HC
- r23 | OP[4]その他|application_idのvalueの値を削除|
- r24 | CK[5]表示|開発者ツール|値が変更されていること | EV:画面HC
- r25 | OP[6]ボタン|「更新」押下|
- r26 | CK[7]遷移|システムエラー画面（親画面）|遷移すること | EV:画面HC
- r27 | CK[8]出力（Msg）|エラーメッセージ|MAYG000E001 | EV:画面HC

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
- startSelector = "#route3"  <- auto.json
- startUrl = "/ANB00/ANA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=34: user,pointCheck,sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AUTO-E2D0C359  rows 14..15  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SGL-EA9C1EF3  rows 16..27  status3=coded
  screen=AYG200->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 検索結果 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [manual] manual 開発者ツール application_id確認 sel="" val="" NOTE:F12開発者ツール=非浏览器/真機人工
  - [manual] manual application_id value削除 sel="" val="" NOTE:開発者ツールでの値削除=非浏览器/真機人工
  - [setValue] setValue application_id 削除 sel="#application_id" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast transition システムエラー画面 sel="#error_message" val=""
  - [assert] ast message エラーメッセージ sel="#error_message" val="MAYG000E001"

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SGL-EA9C1EF3  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r19 遷移|申請・確認更新画面 file=03_r019_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [SOFT] r22 表示|開発者ツール file=- MANUAL url=...
- [SOFT] r24 表示|開発者ツール file=- MANUAL url=...
- [OK ] r26 遷移|システムエラー画面(親画面) file=04_r026_システムエラー画面(親画面).png url=.../127.0.0.1:10097/ANB00/system_error.html
- [OK ] r27 出力(Msg)|エラーメッセージ file=05_r027_エラーメッセージ.png url=.../127.0.0.1:10097/ANB00/system_error.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-100-05-001/01_menu.png
- logs/AY-100-05-001/03_r019_申請・確認更新画面.png
- logs/AY-100-05-001/04_r026_システムエラー画面(親画面).png
- logs/AY-100-05-001/05_r027_エラーメッセージ.png
- logs/AY-100-05-001/06_BLK-SGL-EA9C1EF3.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- EVIDENCE NOT EXACT rows: [22, 24]
- MANUAL (non-browser) rows: [22, 24] — per MANUAL-DECISION.md these are human steps

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
