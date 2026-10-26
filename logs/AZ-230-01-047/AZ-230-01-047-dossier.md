# AUDIT DOSSIER — AZ-230-01-047

meta: {"domain": "AZ", "company": "MS", "functionName": "ToDoバッチ４７", "item": "集計（日次）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-230-01-047.xlsx"}
feasibility: class=B flow=pass manualSteps=13 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=21 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14
- r15
- r16 | OP[1]ボタン|「新規登録」押下|
- r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認）
- r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r19 | OP[2]ボタン|「登録」押下|
- r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r21 | OP[1]その他|「連絡」チェックボックスを選択|
- r22 | OP[2]ボタン|「更新」押下|
- r23 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC
- r24 | OP[4]ボタン|「完了登録」押下|
- r25 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC
- r26 | CK[6]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ
- r27
- r28
- r29 | OP[1]入力|証券番号・明細番号|対象の申込情報
- r30 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC
- r31 | OP[3]クリック|No|対象の申込情報
- r32 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC
- r33 | OP[1]ボタン|「完了取消」押下|
- r34 | CK[2]出力（Msg）|メッセージ|「MAZG101I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r35 | OP[3]ボタン|「OK」押下|
- r36 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC
- r37 | OP[5]ボタン|「検索」押下|
- r38 | CK[6]遷移|項目名検索画面|初期値 | EV:画面HC
- r39 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照
- r40 | OP[2]ボタン|「選択」押下|
- r41 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC
- r42 | OP[1]その他|「照会」チェックボックスを選択|
- r43 | OP[2]ボタン|「代理店連携」押下|
- r44 | CK[3]出力（Msg）|メッセージ|「MAZG101I006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r45 | OP[4]ボタン|「OK」押下|
- r46 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC
- r47 | OP[1]入力|各項目に入力|対象の申込情報
- r48 | OP[2]ボタン|「検索」押下|
- r49 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC
- r50 | OP[4]ボタン|「No」押下|
- r51 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:画面HC
- r52 | OP[1]ボタン|「一時中断」押下|
- r53 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC
- r54 | OP[3]ボタン|「不備一覧」押下|
- r55 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC
- r56 | OP[1]入力|部店課支社|対象の申込情報
- r57 | OP[2]ボタン|「検索」押下|
- r58 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認）
- r59 | OP[4]クリック|No|対象の申込情報
- r60 | CK[5]遷移|不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC
- r61 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ
- r64 | OP[1]その他|バッチ実行（JP1）|16時
- r65 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r66 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ
- r67 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
- r69
- r70
- r71
- r72 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r75 | OP[1]その他|バッチ実行（JP1）|18時
- r76 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ
- r77 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ
- r78 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AF19
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][0]: ＭＳのユーザかつ、点検区分が営業のユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ23001
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000047
sheets[0]/rows[7][1]: 課支社コード
sheets[0]/rows[7][8]: AED73
sheets[0]/rows[8][1]: 代理店コード
sheets[0]/rows[8][8]: MM77
sheets[0]/rows[11][1]: その他項目は別紙参照
sheets[0]/rows[13][0]: 2
sheets[0]/rows[13][1]: 項目コード
sheets[0]/rows[13][7]: 任意の項目ｺｰﾄﾞ#1
sheets[0]/rows[14][1]: 照会コード
sheets[0]/rows[14][7]: 任意の項目ｺｰﾄﾞ#1
sheets[0]/rows[15][1]: 不備内容
sheets[0]/rows[15][7]: 添付書類もれ
sheets[0]/rows[16][0]: 3
sheets[0]/rows[16][1]: 回答内容
sheets[0]/rows[16][7]: 任意のコード
sheets[0]/rows[17][1]: 回答入力欄
sheets[0]/rows[17][7]: 任意の文字列
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AE28
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[3][0]: 1
sheets[1]/rows[3][1]: 証券番号
sheets[1]/rows[3][7]: AZ23001
sheets[1]/rows[4][1]: 明細番号
sheets[1]/rows[4][7]: 0000000047
sheets[1]/rows[5][1]: 課支社コード
sheets[1]/rows[5][7]: AED73
sheets[1]/rows[6][1]: 代理店コード
sheets[1]/rows[6][7]: MM77
sheets[1]/rows[7][1]: 連携
sheets[1]/rows[7][7]: 空白
sheets[1]/rows[8][1]: 代理店対応状況
sheets[1]/rows[8][7]: 対象外
sheets[1]/rows[10][1]: その他項目は別紙参照
sheets[1]/rows[12][0]: 2
sheets[1]/rows[12][1]: 依頼区分
sheets[1]/rows[12][7]: 連絡
sheets[1]/rows[13][1]: 連携
sheets[1]/rows[13][7]: 空白
sheets[1]/rows[14][1]: 代理店対応状況
sheets[1]/rows[14][7]: 対象外
sheets[1]/rows[15][0]: 3
sheets[1]/rows[15][1]: 依頼区分
sheets[1]/rows[15][7]: 連絡
sheets[1]/rows[16][1]: 連携
sheets[1]/rows[16][7]: 空白
sheets[1]/rows[17][1]: 代理店対応状況
sheets[1]/rows[17][7]: 完了
sheets[1]/rows[18][0]: 4
sheets[1]/rows[18][1]: 連携
sheets[1]/rows[18][7]: 空白
sheets[1]/rows[19][1]: 代理店対応状況
sheets[1]/rows[19][7]: 対象外
sheets[1]/rows[20][0]: 5
sheets[1]/rows[20][1]: 代理店照会
sheets[1]/rows[20][7]: 要
sheets[1]/rows[21][1]: 回答内容
sheets[1]/rows[21][7]: 以下、回答入力欄に入力します。
sheets[1]/rows[22][1]: 回答入力欄
sheets[1]/rows[22][7]: 空白
sheets[1]/rows[23][0]: 6
sheets[1]/rows[23][1]: 連携
sheets[1]/rows[23][7]: 代理店
sheets[1]/rows[24][1]: 代理店対応状況
sheets[1]/rows[24][7]: 未対応
sheets[1]/rows[25][0]: 7
sheets[1]/rows[25][1]: 連携
sheets[1]/rows[25][7]: 代理店
sheets[1]/rows[26][1]: 代理店対応状況
sheets[1]/rows[26][7]: 対応中

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "MM77"  <- generated.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- generated.json
- detailNo = "0000000047"  <- generated.json
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
- sectionCode = "AED73"  <- generated.json
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
### BLK-SHR-3F6DEDE2  rows 21..21  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 連絡 sel="#agent_deal_flag_2" val=""
  - [assert] ast 確認済表示 sel="input[name='updateAnswer']" val="" NOTE:依頼区分=連絡 で回答ボタンが確認済に変わる
### BLK-AUTO-E0B41407  rows 22..23  status3=coded
  screen=AZG101 file=block-selectors-az-update2.json
  - [click] click 更新 sel="input[name='update']" val=""
  - [assert] ast 表示確認 sel="input[name='update']" val=""
### BLK-AUTO-B8DF200B  rows 24..25  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 完了登録 sel="input[name='updateCompleteDate']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val=""
### BLK-SHR-EBEB83B0  rows 26..34  status3=coded
  screen=AZG200->AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="{params.policyNo}"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 検索結果表示 sel="#gyoumu_list" val=""
  - [assert] ast 検索結果行 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast ToDo連携テーブル レコード無し sel="input[name='update']" val="" NOTE:ToDo連携テーブル=非浏览器=真機人工
  - [click] click 完了取消 sel="input[name='cancelCompleteDate']" val=""
  - [assert] ast メッセージ確認 sel="#message_area" val="" NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
### BLK-AUTO-4C432C14  rows 35..36  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [assert] ast 確認dialog後 sel="input[name='update']" val="" NOTE:OK=JS confirm auto-accept
### BLK-AUTO-04A78248  rows 37..38  status3=coded
  screen=AZG101->AZG900 file=block-selectors-az-update2.json
  - [click] click 検索 sel="input[name='imperfectSearch[0]']" val=""
  - [popup] ast 遷移 項目名検索 sel="" val=""
### BLK-AUTO-5C1EFE0E  rows 39..41  status3=coded
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
### BLK-SHR-7A684D49  rows 42..42  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 照会 sel="#agent_deal_flag_1" val=""
  - [assert] ast 回答表示 sel="input[name='updateAnswer']" val=""
### BLK-AUTO-D844ADE8  rows 43..46  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 代理店連携 sel="input[name='updateAgentNotify']" val="" NOTE:代理店連携はiframe送信
  - [wait] click OK sel="" val="" NOTE:OKダイアログ=自動承認
  - [assert] ast メッセージ確認 sel="#message_area" val="" NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - [assert] ast 画面確認 sel="input[name='update']" val=""
### BLK-AUTO-DEBE0BEE  rows 47..51  status3=coded
  screen=代理店不備一覧(AMC22)→代理店 不備内容入力画面(更新)(AMC23) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(部店コード) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目(証券番号) sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 各項目(募集人ID) sel="#field_agent_id" val="params.fieldAgentId"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 代理店 不備一覧画面 表示 sel="#gyoumu_list a" val=""
  - [click] click No sel="#link_tag" val=""
  - [assert] ast 遷移 代理店 不備内容入力画面(更新) sel="#updateAnswer" val=""
### BLK-SHR-73BCFD18  rows 52..55  status3=coded
  screen=代理店 不備内容入力画面(更新)(AMC23) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(回答入力欄) sel="textarea.cell_input_value" val="params.editedInquiryContent"
  - [click] click 一時中断 sel="#updateTempAnswer" val="" NOTE:visibility 制御下のため force 押下
  - [assert] ast メッセージ sel="#message_area" val="" NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - [click] click 不備一覧 sel="#act104to22" val=""
  - [assert] ast 遷移 代理店 不備一覧 sel="#select" val=""
### BLK-AUTO-18958C37  rows 56..60  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面(更新) sel="input[name='update']" val=""
### BLK-SHR-072E06D9  rows 61..61  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [assert] ast ToDo連携テーブル sel="#table07" val="" NOTE:非浏览器=真機人工（ToDo連携テーブル）
### BLK-AUTO-3477BB6F  rows 64..67  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-D6459D48  rows 69..70  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AUTO-3477BB6F  rows 75..78  status3=coded
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-F1E0B9E5  rows 71..72  status3=planned
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)=非浏览器=真機人工（mockは画面在位で代理）

## 5. 本次运行结果（块级）
- BLK-SHR-5F5035B5  pass  rows None..None
- BLK-AZ-MENU-CREATE-INPUT  pass  rows None..None
- BLK-AZ-INPUT-FILL  pass  rows None..None
- BLK-AZ-REGISTER-UPDATE  pass  rows None..None
- BLK-SHR-3F6DEDE2  pass  rows None..None
- BLK-AUTO-E0B41407  pass  rows None..None
- BLK-AUTO-B8DF200B  pass  rows None..None
- BLK-SHR-EBEB83B0  pass  rows None..None
- BLK-AUTO-4C432C14  pass  rows None..None
- BLK-AUTO-04A78248  pass  rows None..None
- BLK-AUTO-5C1EFE0E  pass  rows None..None
- BLK-SHR-7A684D49  pass  rows None..None
- BLK-AUTO-D844ADE8  pass  rows None..None
- BLK-AUTO-DEBE0BEE  pass  rows None..None
- BLK-SHR-73BCFD18  pass  rows None..None
- BLK-AUTO-18958C37  pass  rows None..None
- BLK-SHR-072E06D9  pass  rows None..None
- BLK-AUTO-3477BB6F  pass  rows None..None
- BLK-SHR-D6459D48  pass  rows None..None
- BLK-AUTO-3477BB6F  pass  rows None..None
- BLK-SGL-F1E0B9E5  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r20 遷移|不備内容入力画面-更新 file=05_r020_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r23 表示|不備内容入力画面-更新 file=06_r023_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r25 表示|不備内容入力画面-更新 file=08_r025_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r30 表示|不備一覧画面 file=12_r030_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r32 遷移|不備内容入力画面-更新 file=13_r032_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r36 表示|不備内容入力画面-更新 file=14_r036_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r38 遷移|項目名検索画面 file=17_r038_項目名検索画面.png url=...http://127.0.0.1:10097/AMB/AMA13.html
- [OK ] r41 遷移|不備内容入力画面-更新 file=19_r041_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r46 表示|不備内容入力画面-更新 file=20_r046_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r49 表示|代理店 不備一覧画面 file=24_r049_代理店_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [OK ] r51 遷移|代理店 不備内容入力画面(更新) file=25_r051_代理店_不備内容入力画面(更新).png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r53 出力(Msg)|メッセージ file=26_r053_メッセージ.png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r55 遷移|代理店 不備一覧画面 file=28_r055_代理店_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [OK ] r60 遷移|不備内容入力画面(更新) file=30_r060_不備内容入力画面(更新).png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-230-01-047/01_menu.png
- logs/AZ-230-01-047/05_r020_不備内容入力画面-更新.png
- logs/AZ-230-01-047/06_r023_不備内容入力画面-更新.png
- logs/AZ-230-01-047/08_r025_不備内容入力画面-更新.png
- logs/AZ-230-01-047/12_r030_不備一覧画面.png
- logs/AZ-230-01-047/13_r032_不備内容入力画面-更新.png
- logs/AZ-230-01-047/14_r036_不備内容入力画面-更新.png
- logs/AZ-230-01-047/17_r038_項目名検索画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
