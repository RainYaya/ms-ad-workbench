# AUDIT DOSSIER — AZ-100-05-004

meta: {"domain": "AZ", "company": "AD", "functionName": "システムエラー：想定外遷移（子画面）", "item": "共通", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-100-05-004.xlsx"}
feasibility: class=B flow=pass manualSteps=5 proxyBlocks=1 paramIssues=0 paramsAuto=False source=az-update.json
status3(case)=coded  runner_status=pass  blocks=4 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|遷移すること | EV:（目視確認）
- r16 | OP[1]ボタン|「検索」押下|（任意の検索条件）
- r17 | CK[2]表示|不備一覧画面|データが表示されること | EV:（目視確認）
- r18 | OP[3]クリック|No.リンク|（任意のデータ）
- r19 | CK[4]遷移|不備内容入力画面－更新|遷移すること | EV:画面HC
- r20 | OP[1]ボタン|「訂正内容確認書」押下|
- r21 | CK[2]遷移|訂正内容確認画面|遷移すること | EV:画面HC
- r22 | OP[1]入力|確認者(募集人または社員)|test
- r23 | OP[2]クリック|eメールによる確認の場合|チェックする
- r24 | OP[3]その他|「F12」より開発者ツールを開く|
- r25 | OP[4]その他|開発者ツールでctrl+fを使用し
appliction_form_idを検索|
- r26 | CK[5]表示|開発者ツール|appliction_form_idのvalueの値を確認 | EV:画面HC
- r27 | OP[6]その他|application_form_idのvalueの値を削除|
- r28 | CK[7]表示|開発者ツール|値が変更されていること | EV:画面HC
- r29 | OP[8]ボタン|「登録」押下|
- r30 | CK[9]遷移|システムエラー画面（子画面）|遷移すること | EV:画面HC
- r31 | CK[10]出力（Msg）|エラーメッセージ|MAZG000E001 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- az-update.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000001"  <- az-update.json
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
- policyNo = "AZ11001"  <- az-update.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- az-update.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=30: user,pointCheck,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-SEARCH-LIST  rows 14..15  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-AUTO-9EB5A282  rows 16..19  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
### BLK-AUTO-7AAEDA04  rows 20..21  status3=coded
  screen=AZG101->AZG906 file=block-selectors-az-update3.json
  - [click] click 訂正内容確認書 sel="input[name='act101to906']" val=""
  - [popup] ast 遷移 訂正内容確認 sel="" val=""
  - [assert] ast 開発者ツール表示 sel="#confirm_user_name" val="" (popup)
### BLK-SGL-EF37895C  rows 22..31  status3=coded
  screen=AMA04+AMA19 popup file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 訂正内容確認書 sel="input[name='act101to906']" val=""
  - [popup] ast 遷移 訂正内容確認 sel="" val=""
  - [fill] input 確認者 sel="#confirm_user_name" val="test" (popup)
  - [check] check eメール sel="#email_confirm_check" val="" (popup)
  - [manual] manual 開発者ツール表示 sel="" val="" NOTE:F12/開発者ツール検索=非浏览器/真機人工
  - [manual] manual application_form_id value削除 sel="" val="" NOTE:開発者ツールでの値削除=非浏览器/真機人工
  - [setValue] setValue application_form_id 削除 sel="#application_form_id" val="" (popup)
  - [click] click 登録 sel="#regist" val="" (popup)
  - [assert] ast 遷移 システムエラー画面(子画面) sel="#error_message" val="" (popup)
  - [assert] ast エラーメッセージ MAZG000E001 sel="#error_message" val="MAZG000E001" (popup)

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AUTO-9EB5A282  pass  rows None..None
- BLK-AUTO-7AAEDA04  pass  rows None..None
- BLK-SGL-EF37895C  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r19 遷移|不備内容入力画面-更新 file=03_r019_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r21 遷移|訂正内容確認画面 file=05_r021_訂正内容確認画面.png url=...http://127.0.0.1:10097/AMB/AMA19.html
- [SOFT] r26 表示|開発者ツール file=- MANUAL url=...
- [SOFT] r28 表示|開発者ツール file=- MANUAL url=...
- [OK ] r30 遷移|システムエラー画面(子画面) file=07_r030_システムエラー画面(子画面).png url=....0.0.1:10097/AMB/system_error_child.html
- [OK ] r31 出力(Msg)|エラーメッセージ file=08_r031_エラーメッセージ.png url=....0.0.1:10097/AMB/system_error_child.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-100-05-004/01_menu.png
- logs/AZ-100-05-004/03_r019_不備内容入力画面-更新.png
- logs/AZ-100-05-004/05_r021_訂正内容確認画面.png
- logs/AZ-100-05-004/07_r030_システムエラー画面(子画面).png
- logs/AZ-100-05-004/08_r031_エラーメッセージ.png
- logs/AZ-100-05-004/09_BLK-SGL-EF37895C.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- EVIDENCE NOT EXACT rows: [26, 28]
- MANUAL (non-browser) rows: [26, 28] — per MANUAL-DECISION.md these are human steps

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
