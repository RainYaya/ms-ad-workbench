# AUDIT DOSSIER — AZ-230-01-132

meta: {"domain": "AZ", "company": "AD", "functionName": "ToDoバッチ１３２", "item": "集計（日次）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-230-01-132.xlsx"}
feasibility: class=B flow=pass manualSteps=15 proxyBlocks=8 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=14 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14
- r15
- r16 | OP[1]ボタン|「新規登録」押下|
- r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認）
- r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r19 | OP[2]ボタン|「登録」押下|
- r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r21 | OP[1]ボタン|「検索」押下|-
- r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認）
- r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照
- r24 | OP[2]ボタン|「選択」押下|
- r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC
- r26 | OP[1]ボタン|「代理店連携」押下|-
- r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r28 | OP[3]ボタン|「OK」押下|-
- r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ
- r33 | OP[1]その他|バッチ実行（JP1）|20時
- r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r35 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ
- r36 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ
- r38
- r39
- r40 | OP[1]入力|証券番号・明細番号|対象の申込情報
- r41 | OP[2]ボタン|「検索」押下|
- r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認）
- r43 | OP[4]クリック|No|対象の申込情報
- r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認）
- r45 | OP[1]ボタン|「営業連携」押下|
- r46 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認）
- r47 | OP[1]ボタン|「通知しない」押下|-
- r48 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r49 | OP[3]ボタン|「OK」押下|-
- r50 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC
- r51 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ
- r54 | OP[1]その他|バッチ実行（JP1）|9時
- r55 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r56 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ
- r57 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ
- r59
- r60
- r61
- r62 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r65 | OP[1]その他|バッチ実行（JP1）|10時
- r66 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r67 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ
- r68 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AF17
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][0]: ADのユーザかつ、点検区分が営業のユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ23001
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000051
sheets[0]/rows[7][1]: 課支社コード
sheets[0]/rows[7][8]: AKH62
sheets[0]/rows[8][1]: 代理店コード
sheets[0]/rows[8][8]: S020
sheets[0]/rows[11][1]: その他項目は別紙参照
sheets[0]/rows[13][0]: 2
sheets[0]/rows[13][1]: 項目コード
sheets[0]/rows[13][7]: 任意の項目ｺｰﾄﾞ#1
sheets[0]/rows[14][1]: 照会コード
sheets[0]/rows[14][7]: 任意の項目ｺｰﾄﾞ#1
sheets[0]/rows[15][1]: 不備内容
sheets[0]/rows[15][7]: 添付書類もれ
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AE18
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[3][0]: 1
sheets[1]/rows[3][1]: 証券番号
sheets[1]/rows[3][7]: AZ23001
sheets[1]/rows[4][1]: 明細番号
sheets[1]/rows[4][7]: 0000000051
sheets[1]/rows[5][1]: 課支社コード
sheets[1]/rows[5][7]: AKH62
sheets[1]/rows[6][1]: 代理店コード
sheets[1]/rows[6][7]: S020
sheets[1]/rows[8][1]: その他項目は別紙参照
sheets[1]/rows[10][0]: 2
sheets[1]/rows[10][1]: 代理店照会
sheets[1]/rows[10][7]: 要
sheets[1]/rows[11][1]: 回答内容
sheets[1]/rows[11][7]: 以下、回答入力欄に入力します。
sheets[1]/rows[12][1]: 回答入力欄
sheets[1]/rows[12][7]: 空白
sheets[1]/rows[13][0]: 3
sheets[1]/rows[13][1]: 連携
sheets[1]/rows[13][7]: 代理店
sheets[1]/rows[14][1]: 代理店対応状況
sheets[1]/rows[14][7]: 未対応
sheets[1]/rows[15][0]: 4
sheets[1]/rows[15][1]: 連携
sheets[1]/rows[15][7]: 営業
sheets[1]/rows[16][1]: 代理店対応状況
sheets[1]/rows[16][7]: 未対応

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "S020"  <- generated.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- generated.json
- detailNo = "0000000051"  <- generated.json
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
- policyNo = "AZ23001"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AKH62"  <- generated.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=29: user,pointCheck,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-SHR-5F5035B5  rows 14..15  status3=coded
  screen=申込書品質管理メニュー(AMA01) file=block-selectors-batch-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 前提行(1回目/18:00-19:00送信前打鍵)確認 sel="#act001to100" val="" NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
### BLK-AZ-MENU-CREATE-INPUT  rows 16..17  status3=verified
  screen=AZG001 file=block-selectors.json
  - [goto] goto start screen sel="" val=""
  - [click] click 新規登録 sel="#act001to100" val=""
  - [assert] ast transition 不備内容入力画面-新規 sel="#policy_number" val=""
### BLK-AZ-INPUT-FILL  rows 18..18  status3=verified
  screen=AZG100 file=block-selectors.json
  - [fill] inputBundle 各項目 sel="select[name=\"input_type_list.selected\"]" val="params.inputType"
  - [fill] inputBundle 各項目 sel="select[name=\"large_item_list.selected\"]" val="params.largeItemValue"
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 各項目 sel="#sub_policy_number" val="params.detailNo"
  - [fill] inputBundle 各項目 sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目 sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目 sel="#sub_agent_code" val="params.subAgentCode"
  - [fill] inputBundle 各項目 sel="#free_code_1" val="params.freeCode"
  - [fill] inputBundle 各項目 sel="#insurant_name" val="params.customerName"
  - [fill] inputBundle 各項目 sel="#start_date" val="params.startDate"
  - [fill] inputBundle 各項目 sel="select[name=\"application_form_type_list.selected\"]" val="params.applicationType"
  - [fill] inputBundle 各項目 sel="#sumup_year_month" val="params.sumupYearMonth"
  - [fill] inputBundle 各項目 sel="#daily_report_send" val="params.dailyReportSend"
  - [fill] inputBundle 各項目 sel="#sumup_section_code" val="params.sumupSectionCode"
  - [fill] inputBundle 各項目 sel="select[name=\"sumup_status_list.selected\"]" val="params.sumupStatus"
  - [fill] inputBundle 各項目 sel="#reminder_date" val="params.reminderDate"
  - [assert] ast bundle 表示 sel="#selected_input_type_code" val=""
### BLK-AZ-REGISTER-UPDATE  rows 19..20  status3=coded
  screen=AZG100→AZG101 file=block-selectors.json
  - [click] click 登録 sel="#regist" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name=\"update\"]" val=""
### BLK-AUTO-04A78248  rows 21..22  status3=coded
  screen=AZG101->AZG900 file=block-selectors-az-update2.json
  - [click] click 検索 sel="input[name='imperfectSearch[0]']" val=""
  - [popup] ast 遷移 項目名検索 sel="" val=""
### BLK-AUTO-5C1EFE0E  rows 23..25  status3=coded
  screen=AZG900 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 検索(項目名検索popup起動) sel="input[name='imperfectSearch[0]']" val=""
  - [popup] ast 遷移 項目名検索画面(popup) sel="" val=""
  - [fill] inputBundle 項目コード sel="#field_code_key" val="params.itemCode" (popup)
  - [fill] inputBundle 項目名 sel="#field_name_key" val="params.itemName" (popup)
  - [fill] inputBundle 照会コード sel="#inquiry_contents_code_key" val="params.inquiryCode" (popup)
  - [fill] inputBundle 照会内容 sel="#inquiry_contents_name_key" val="params.inquiryContent" (popup)
  - [selectOptionByLabel] select 項目一覧 sel="select[name='field_list.selected']" val="params.itemCode" (popup)
  - [selectOptionByLabel] select 照会内容一覧 sel="select[name='inquiry_contents_list.selected']" val="params.inquiryCode" (popup)
  - [selectOptionByLabel] select 不備内容 sel="select[name='imperfect_list.selected']" val="1" (popup)
  - [click] click 選択 sel="#select" val="" (popup)
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val="" NOTE:popup選択後の親画面（mockはpopup再表示）
### BLK-AUTO-10E5C587  rows 26..30  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 代理店連携 sel="input[name='updateAgentNotify']" val=""
  - [wait] click OK sel="" val="" NOTE:OKダイアログ=自動承認
  - [assert] ast メッセージ確認 sel="#message_area" val="" NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - [assert] ast 画面確認 sel="input[name='update']" val=""
  - [assert] ast ToDo連携テーブル sel="input[name='update']" val="" NOTE:ToDo連携テーブル=非浏览器=真機人工
### BLK-AUTO-C8903BF5  rows 33..36  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-D6459D48  rows 38..39  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AUTO-E1BDF237  rows 40..44  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="params.policyNo"
  - [fill] input 明細番号 sel="#sub_policy_number" val="params.detailNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
### BLK-AUTO-2739DA75  rows 45..46  status3=coded
  screen=AZG101->AZG911 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携 sel="input[name='updateBusinessNotify']" val=""
  - [popup] ast 遷移 メール通知先選択 sel="" val=""
  - [assert] ast メール通知先選択 表示 sel="input[name='sendOn']" val="" (popup)
### BLK-AUTO-FCB405E4  rows 47..51  status3=coded
  screen=AMA04+AMA28 popup file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携 sel="#updateBusinessNotify" val=""
  - [popup] ast 遷移 メール通知先選択 sel="" val=""
  - [click] click 通知しない sel="input[name='sendOff']" val="" (popup)
  - [assert] ast メッセージ表示(MAZG911l002) sel="#message_area" val="" NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
  - [assert] ast 表示 不備内容入力画面-更新 sel="#section_code" val="" NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - [assert] ast ToDo連携テーブル sel="#policy_number" val="" NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
### BLK-AUTO-8C0E3438  rows 54..62  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AUTO-C8903BF5  rows 65..68  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）

## 5. 本次运行结果（块级）
- BLK-SHR-5F5035B5  pass  rows None..None
- BLK-AZ-MENU-CREATE-INPUT  pass  rows None..None
- BLK-AZ-INPUT-FILL  pass  rows None..None
- BLK-AZ-REGISTER-UPDATE  pass  rows None..None
- BLK-AUTO-04A78248  pass  rows None..None
- BLK-AUTO-5C1EFE0E  pass  rows None..None
- BLK-AUTO-10E5C587  pass  rows None..None
- BLK-AUTO-C8903BF5  pass  rows None..None
- BLK-SHR-D6459D48  pass  rows None..None
- BLK-AUTO-E1BDF237  pass  rows None..None
- BLK-AUTO-2739DA75  pass  rows None..None
- BLK-AUTO-FCB405E4  pass  rows None..None
- BLK-AUTO-8C0E3438  pass  rows None..None
- BLK-AUTO-C8903BF5  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r20 遷移|不備内容入力画面-更新 file=05_r020_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r25 遷移|不備内容入力画面-更新 file=06_r025_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r29 表示|不備内容入力画面-更新 file=08_r029_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r50 表示|不備内容入力画面-更新 file=09_r050_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-230-01-132/01_menu.png
- logs/AZ-230-01-132/05_r020_不備内容入力画面-更新.png
- logs/AZ-230-01-132/06_r025_不備内容入力画面-更新.png
- logs/AZ-230-01-132/08_r029_不備内容入力画面-更新.png
- logs/AZ-230-01-132/09_r050_不備内容入力画面-更新.png
- logs/AZ-230-01-132/19_BLK-AUTO-C8903BF5.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
