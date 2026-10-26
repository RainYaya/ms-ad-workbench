# AUDIT DOSSIER — AZ-210-05-014

meta: {"domain": "AZ", "company": "MS", "functionName": "シナリオ導線５", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-210-05-014.xlsx"}
feasibility: class=B flow=pass manualSteps=0 proxyBlocks=3 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=11 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「新規登録」押下|
- r15 | CK[2]遷移|不備内容入力画面－新規|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「....」（保険種類欄の横）|
- r18 | CK[3]遷移|保険種類選択画面|初期値 | EV:画面HC
- r19 | OP[1]クリック|保険種類|【別紙】操作内容 入力内容：１参照
- r20 | OP[2]ボタン|「OK」押下|
- r21 | CK[3]遷移|不備内容入力画面-新規|保険種類の選択内容が反映されること | EV:画面HC
- r22 | OP[1]ボタン|「....」（募集人ID欄の横）|
- r23 | CK[2]遷移|募集人検索画面|初期値 | EV:画面HC
- r24 | OP[1]入力|部店課支社コード|AHE61
- r25 | OP[2]ボタン|「検索」押下|
- r26 | CK[3]表示|募集人検索画面|部店課支社コードAHE61の検索結果を確認 | EV:画面HC
- r27 | OP[4]クリック|選択欄ラジオボタン|【別紙】操作内容 入力内容：１参照
- r28 | OP[5]ボタン|「選択」押下|
- r29 | CK[6]遷移|不備内容入力画面-新規|募集人の選択内容が反映されること | EV:画面HC
- r30 | OP[1]ボタン|「登録」押下|
- r31 | CK[2]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r32 | OP[1]ボタン|「検索」押下|
- r33 | CK[2]遷移|項目名検索画面|初期値 | EV:画面HC
- r34 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r35 | OP[2]ボタン|「検索」押下|
- r36 | CK[3]表示|項目名検索画面|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r37 | OP[4]クリック|各項目の選択|【別紙】操作内容 入力内容：３参照
- r38 | OP[5]ボタン|「選択」押下|
- r39 | CK[6]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r40 | OP[1]クリック|照会内容チェックボックス|チェックありにする
- r41 | OP[2]ボタン|「修」押下|
- r42 | CK[3]遷移|照会内容編集画面|初期値 | EV:画面HC
- r43 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照
- r44 | OP[2]ボタン|「OK」押下|
- r45 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC
- r46 | OP[1]入力|「代理店照会」プルダウン|「否」に変更
- r47 | OP[2]ボタン|「営業連携」押下|
- r48 | OP[3]ボタン|「通知しない」押下|
- r49 | OP[4]ボタン|「OK」押下|
- r50 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG32
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 入力区分
sheets[0]/rows[5][8]: 現地
sheets[0]/rows[6][1]: 契約マスタ
sheets[0]/rows[6][8]: 連動しない
sheets[0]/rows[7][1]: 種目
sheets[0]/rows[7][8]: 自動車
sheets[0]/rows[8][1]: 保険種類
sheets[0]/rows[8][8]: 13：クルマの保険・一般用
sheets[0]/rows[8][31]: ※　保険種類選択画面で設定
sheets[0]/rows[9][1]: 証券番号
sheets[0]/rows[9][8]: AZ21005
sheets[0]/rows[9][31]: シナリオID
sheets[0]/rows[10][1]: 明細番号
sheets[0]/rows[10][8]: 0000000026
sheets[0]/rows[10][31]: シナリオの枝番
sheets[0]/rows[11][1]: 部店課支社コード
sheets[0]/rows[11][8]: AHE61
sheets[0]/rows[11][31]: ※　変更となる可能性あり
sheets[0]/rows[12][1]: 代理店コード
sheets[0]/rows[12][8]: 252H
sheets[0]/rows[12][31]: ※　変更となる可能性あり
sheets[0]/rows[13][1]: サブコード
sheets[0]/rows[13][8]: 123456
sheets[0]/rows[14][1]: フリーコード
sheets[0]/rows[14][8]: 1234567890
sheets[0]/rows[15][1]: 募集人ID
sheets[0]/rows[15][8]: 3028004586
sheets[0]/rows[15][31]: ※　募集人検索画面で設定。変更となる可能性あり。
sheets[0]/rows[16][1]: 契約者名
sheets[0]/rows[16][8]: TEST
sheets[0]/rows[17][1]: 保険始期日
sheets[0]/rows[17][8]: 2026/11/01
sheets[0]/rows[18][1]: 変更日
sheets[0]/rows[18][8]: （入力なし）
sheets[0]/rows[19][1]: 新更変・他
sheets[0]/rows[19][8]: 新規
sheets[0]/rows[20][1]: 計上年月
sheets[0]/rows[20][8]: 2026/11
sheets[0]/rows[21][1]: 日報／送付
sheets[0]/rows[21][8]: 1234567890AB
sheets[0]/rows[22][1]: 日報部課代ｺｰﾄﾞ
sheets[0]/rows[22][8]: ABC012
sheets[0]/rows[23][1]: 計上状態
sheets[0]/rows[23][8]: 未計上
sheets[0]/rows[24][1]: 回答締切日
sheets[0]/rows[24][8]: システム日＋7日（初期設定）
sheets[0]/rows[25][0]: 2
sheets[0]/rows[25][1]: 項目コード
sheets[0]/rows[25][8]: T0
sheets[0]/rows[26][1]: 照会コード
sheets[0]/rows[26][8]: T007
sheets[0]/rows[27][0]: 3
sheets[0]/rows[27][1]: 項目名
sheets[0]/rows[27][8]: T0：損保取引確認書
sheets[0]/rows[28][1]: 照会内容
sheets[0]/rows[28][8]: T007：「損保取引確認書」の添付がもれています。
sheets[0]/rows[29][1]: 不備内容
sheets[0]/rows[29][8]: 添付書類もれ
sheets[0]/rows[30][0]: 4
sheets[0]/rows[30][1]: 編集照会内容
sheets[0]/rows[30][8]: 編集済み。
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AF49
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 入力区分
sheets[1]/rows[2][7]: 現地
sheets[1]/rows[2][30]: 新規入力時の入力内容と同一
sheets[1]/rows[3][1]: 契約マスタ
sheets[1]/rows[3][7]: 連動しない
sheets[1]/rows[3][30]: 新規入力時の入力内容と同一
sheets[1]/rows[4][1]: 種目
sheets[1]/rows[4][7]: 自動車
sheets[1]/rows[4][30]: 新規入力時の入力内容と同一
sheets[1]/rows[5][1]: 保険種類
sheets[1]/rows[5][7]: 13：クルマの保険・一般用
sheets[1]/rows[5][30]: 新規入力時の入力内容と同一
sheets[1]/rows[6][1]: 証券番号
sheets[1]/rows[6][7]: AZ21005
sheets[1]/rows[6][30]: 新規入力時の入力内容と同一
sheets[1]/rows[7][1]: 明細番号
sheets[1]/rows[7][7]: 0000000026
sheets[1]/rows[7][30]: 新規入力時の入力内容と同一
sheets[1]/rows[8][1]: 部店課支社コード
sheets[1]/rows[8][7]: AHE61
sheets[1]/rows[8][30]: 新規入力時の入力内容と同一
sheets[1]/rows[9][1]: 代理店コード
sheets[1]/rows[9][7]: 252H
sheets[1]/rows[9][30]: 新規入力時の入力内容と同一
sheets[1]/rows[10][1]: 代理店略称
sheets[1]/rows[10][7]: 株式会社　疲🈶仮艶繭
sheets[1]/rows[11][1]: サブコード
sheets[1]/rows[11][7]: 123456
sheets[1]/rows[11][30]: 新規入力時の入力内容と同一
sheets[1]/rows[12][1]: フリーコード
sheets[1]/rows[12][7]: 1234567890
sheets[1]/rows[12][30]: 新規入力時の入力内容と同一
sheets[1]/rows[13][1]: 募集人ID
sheets[1]/rows[13][7]: 3028004586
sheets[1]/rows[13][30]: 新規入力時の入力内容と同一
sheets[1]/rows[14][1]: 募集人名
sheets[1]/rows[14][7]: 拠🈶漸艶
sheets[1]/rows[15][1]: 契約者名
sheets[1]/rows[15][7]: TEST
sheets[1]/rows[15][30]: 新規入力時の入力内容と同一
sheets[1]/rows[16][1]: 計上状態
sheets[1]/rows[16][7]: 未計上
sheets[1]/rows[16][30]: 新規入力時の入力内容と同一
sheets[1]/rows[17][1]: 照会方法
sheets[1]/rows[17][7]: 1：品質管理
sheets[1]/rows[18][1]: 保険始期日
sheets[1]/rows[18][7]: 2026/11/01
sheets[1]/rows[18][30]: 新規入力時の入力内容と同一
sheets[1]/rows[19][1]: 変更日
sheets[1]/rows[19][7]: 空白
sheets[1]/rows[19][30]: 新規入力時の入力内容と同一
sheets[1]/rows[20][1]: 新更変・他
sheets[1]/rows[20][7]: 新規
sheets[1]/rows[20][30]: 新規入力時の入力内容と同一
sheets[1]/rows[21][1]: 計上年月
sheets[1]/rows[21][7]: 2026/11
sheets[1]/rows[21][30]: 新規入力時の入力内容と同一
sheets[1]/rows[22][1]: 日報／送付
sheets[1]/rows[22][7]: 1234567890AB
sheets[1]/rows[22][30]: 新規入力時の入力内容と同一
sheets[1]/rows[23][1]: 日報部課代ｺｰﾄﾞ
sheets[1]/rows[23][7]: ABC012
sheets[1]/rows[23][30]: 新規入力時の入力内容と同一
sheets[1]/rows[24][1]: 点検状態
sheets[1]/rows[24][7]: 空白
sheets[1]/rows[25][1]: 依頼区分
sheets[1]/rows[25][7]: 照会
sheets[1]/rows[26][1]: 点検区分
sheets[1]/rows[26][7]: 事務S（貨物）
sheets[1]/rows[27][1]: 照会ID
sheets[1]/rows[27][7]: （自動設定）
sheets[1]/rows[28][1]: 登録者
sheets[1]/rows[28][7]: ログインユーザ
sheets[1]/rows[29][1]: 更新者
sheets[1]/rows[29][7]: ログインユーザ
sheets[1]/rows[30][1]: 登録日
sheets[1]/rows[30][7]: 新規入力時のシステム日
sheets[1]/rows[31][1]: 更新日
sheets[1]/rows[31][7]: 新規入力時のシステム日
sheets[1]/rows[32][1]: 回答締切日
sheets[1]/rows[32][7]: 新規入力時の回答締切日
sheets[1]/rows[32][30]: 新規入力時の入力内容と同一
sheets[1]/rows[33][1]: 完了日
sheets[1]/rows[33][7]: 空白
sheets[1]/rows[34][1]: 連携
sheets[1]/rows[34][7]: 空白
sheets[1]/rows[35][1]: 営業対応状況
sheets[1]/rows[35][7]: 対象外
sheets[1]/rows[36][1]: 代理店対応状況
sheets[1]/rows[36][7]: 対象外
sheets[1]/rows[37][1]: 回答内容欄
sheets[1]/rows[37][7]: 空白
sheets[1]/rows[38][0]: 2
sheets[1]/rows[38][1]: 項目名
sheets[1]/rows[38][7]: T0：損保取引確認書
sheets[1]/rows[39][1]: 照会内容
sheets[1]/rows[39][7]: T007：「損保取引確認書」の添付がもれています。
sheets[1]/rows[40][0]: 3
sheets[1]/rows[40][1]: 項目コード
sheets[1]/rows[40][7]: T0
sheets[1]/rows[40][30]: 入力内容の反映
sheets[1]/rows[41][1]: 項目名
sheets[1]/rows[41][7]: 損保取引確認書
sheets[1]/rows[41][30]: 入力内容の反映
sheets[1]/rows[42][1]: 不備内容
sheets[1]/rows[42][7]: 添付書類もれ
sheets[1]/rows[42][30]: 入力内容の反映
sheets[1]/rows[43][1]: 照会内容
sheets[1]/rows[43][7]: T007：「損保取引確認書」の添付がもれています。
sheets[1]/rows[43][30]: 入力内容の反映
sheets[1]/rows[44][0]: 4
sheets[1]/rows[44][1]: 照会内容
sheets[1]/rows[44][7]: 編集済み。
sheets[1]/rows[44][30]: 入力内容の反映
sheets[1]/rows[45][0]: 5
sheets[1]/rows[45][1]: 連携
sheets[1]/rows[45][7]: 営業
sheets[1]/rows[45][30]: 空白⇒営業になることを確認
sheets[1]/rows[46][1]: 営業対応状況
sheets[1]/rows[46][7]: 未対応
sheets[1]/rows[46][30]: 対象外⇒未対応になることを確認
sheets[1]/rows[47][1]: 代理店対応状況
sheets[1]/rows[47][7]: 対象外
sheets[1]/rows[47][30]: 変化がないことを確認

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- generated.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- generated.json
- dailyReportSend = "1234567890AB"  <- generated.json
- defectContent = "添付書類もれ"  <- generated.json
- detailNo = "0000000026"  <- generated.json
- editedInquiryContent = "編集済み。"  <- generated.json
- fieldAgentId = "3028004586"  <- generated.json
- freeCode = "1234567890"  <- generated.json
- inputType = "2"  <- generated.json
- inquiryCode = "T007"  <- generated.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- generated.json
- inquiryId = "0000000012"  <- auto.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "13：クルマの保険・一般用"  <- generated.json
- itemCode = "T0"  <- generated.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "5"  <- generated.json
- pointCheck = "?"  <- auto.json
- policyNo = "AZ21005"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- generated.json
- startDate = "2026/11/01"  <- generated.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- generated.json
- sumupSectionCode = "ABC012"  <- generated.json
- sumupStatus = "1"  <- generated.json
- sumupYearMonth = "2026/11"  <- generated.json
- user = "?"  <- auto.json
params total=34, auto-fallback=13: user,pointCheck,inquiryId,applicationType,reminderDate,itemName,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-CREATE-INPUT  rows 14..15  status3=verified
  screen=AZG001 file=block-selectors.json
  - [goto] goto start screen sel="" val=""
  - [click] click 新規登録 sel="#act001to100" val=""
  - [assert] ast transition 不備内容入力画面-新規 sel="#policy_number" val=""
### BLK-AZ-INPUT-FILL  rows 16..16  status3=verified
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
### BLK-AZ-INSURANCE-SELECT  rows 17..21  status3=verified
  screen=AZG100+popup file=block-selectors.json
  - [click] click (保険種類欄の横) sel="input[name=\"selectInsuransuItem\"]" val=""
  - [popup] ast 遷移 保険種類選択 sel="" val=""
  - [selectOptionByLabel] click 保険種類 sel="select[name=\"insurance_item_list.selected\"]" val="params.insuranceLabel" (popup)
  - [click] click OK sel="input[name=\"ok\"]" val="" (popup)
  - [assert] ast 反映確認 sel="#selected_insurance_item_code" val="" NOTE:mock回写；实际SUT确认显示
### BLK-AZ-AGENT-SELECT  rows 22..29  status3=coded
  screen=AZG100+popup file=block-selectors.json
  - [click] click (募集人ID欄の横) sel="input[name=\"selectFieldAgent\"]" val=""
  - [popup] ast 遷移 募集人検索 sel="" val=""
  - [fill] input 部店課支社コード sel="#section_code_key" val="params.sectionCode" (popup)
  - [fill] input 代理店コード sel="#agent_code_key" val="params.agentCode" (popup)
  - [fill] input 募集人ID sel="#field_agent_id_key" val="params.fieldAgentId" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 結果行 sel="#gyoumu_list tr" val="" (popup) NOTE:009环境无数据=blocked
  - [click] click 選択欄ラジオ sel="tr:has-text(\"{params.fieldAgentId}\") input[type=radio]" val="" (popup)
  - [click] click 選択 sel="input[name=\"closeSelect\"]" val="" (popup)
  - [assert] ast 反映確認 sel="#field_agent_id" val="" (optional) NOTE:opener回写=真機验证; mock里popup关闭链路简化
### BLK-AZ-REGISTER-UPDATE  rows 30..31  status3=coded
  screen=AZG100→AZG101 file=block-selectors.json
  - [click] click 登録 sel="#regist" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name=\"update\"]" val=""
### BLK-AUTO-04A78248  rows 32..33  status3=coded
  screen=AZG101->AZG900 file=block-selectors-az-update2.json
  - [click] click 検索 sel="input[name='imperfectSearch[0]']" val=""
  - [popup] ast 遷移 項目名検索 sel="" val=""
### BLK-AZ-ITEM-SEARCH-SELECT  rows 34..39  status3=coded
  screen=AZG900 file=block-selectors.json
  - [fill] inputBundle 項目コード sel="select[name=\"field_list.selected\"]" val="params.itemCode" (popup)
  - [click] click 検索 sel="input[name=\"search\"]" val="" (popup)
  - [assert] ast 検索結果 sel="select[name=\"field_list.selected\"] option" val="" (popup)
  - [click] click 選択 sel="input[name=\"select\"]" val="" (popup)
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-AZ-INQUIRY-EDIT  rows 40..45  status3=coded
  screen=AZG101+AZG902 file=block-selectors.json
  - [check] click 照会内容チェックボックス sel="input[name=\"list[0].inquiry_contents_edit_flag\"]" val=""
  - [enable] enable 修 sel="input[name=\"editInquiryContents[0]\"]" val=""
  - [click] click 修 sel="input[name=\"editInquiryContents[0]\"]" val=""
  - [popup] ast 遷移 照会内容編集 sel="" val=""
  - [fill] inputBundle 各項目 sel="textarea" val="params.editedInquiryContent" (popup)
  - [click] click OK sel="input[name=\"ok\"], input[value=\"　ＯＫ　\"]" val="" (popup)
  - [assert] ast 反映確認 sel="input[name=\"update\"]" val=""
### BLK-SHR-CD031FED  rows 46..46  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [selectOptionByLabel] select 代理店照会 プルダウン 否 sel="select[name='list[0].agent_inquiry_flag.selected']" val="否"
  - [assert] ast 画面確認 sel="input[name='update']" val=""
### BLK-SGL-CCA9B958  rows 47..48  status3=coded
  screen=AZG101/AMC23 file=block-selectors-sgl.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携 sel="input[name='updateBusinessNotify']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val="" NOTE:通知dialog=真機人工
### BLK-AUTO-4C432C14  rows 49..50  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [assert] ast 確認dialog後 sel="input[name='update']" val="" NOTE:OK=JS confirm auto-accept

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-CREATE-INPUT  pass  rows None..None
- BLK-AZ-INPUT-FILL  pass  rows None..None
- BLK-AZ-INSURANCE-SELECT  pass  rows None..None
- BLK-AZ-AGENT-SELECT  pass  rows None..None
- BLK-AZ-REGISTER-UPDATE  pass  rows None..None
- BLK-AUTO-04A78248  pass  rows None..None
- BLK-AZ-ITEM-SEARCH-SELECT  pass  rows None..None
- BLK-AZ-INQUIRY-EDIT  pass  rows None..None
- BLK-SHR-CD031FED  pass  rows None..None
- BLK-SGL-CCA9B958  pass  rows None..None
- BLK-AUTO-4C432C14  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備内容入力画面-新規 file=02_r015_不備内容入力画面-新規.png url=...http://127.0.0.1:10097/AMB/AMA03.html
- [OK ] r18 遷移|保険種類選択画面 file=05_r018_保険種類選択画面.png url=...0.1:10097/AMB/insurance_item_select.html
- [OK ] r21 遷移|不備内容入力画面-新規 file=06_r021_不備内容入力画面-新規.png url=...http://127.0.0.1:10097/AMB/AMA03.html
- [OK ] r23 遷移|募集人検索画面 file=08_r023_募集人検索画面.png url=...&1=1&gamid=AMA18&gamcd=AMA00&hubsessid=1
- [OK ] r26 表示|募集人検索画面 file=09_r026_募集人検索画面.png url=...&1=1&gamid=AMA18&gamcd=AMA00&hubsessid=1
- [OK ] r29 遷移|不備内容入力画面-新規 file=10_r029_不備内容入力画面-新規.png url=...http://127.0.0.1:10097/AMB/AMA03.html
- [OK ] r31 遷移|不備内容入力画面-更新 file=12_r031_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r33 遷移|項目名検索画面 file=14_r033_項目名検索画面.png url=...http://127.0.0.1:10097/AMB/AMA13.html
- [OK ] r36 表示|項目名検索画面 file=16_r036_項目名検索画面.png url=...http://127.0.0.1:10097/AMB/AMA13.html
- [OK ] r39 遷移|不備内容入力画面-更新 file=17_r039_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r42 遷移|照会内容編集画面 file=19_r042_照会内容編集画面.png url=...http://127.0.0.1:10097/AMB/AMA15.html
- [OK ] r45 遷移|不備内容入力画面-更新 file=20_r045_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r50 表示|不備内容入力画面-更新 file=21_r050_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-210-05-014/01_menu.png
- logs/AZ-210-05-014/02_r015_不備内容入力画面-新規.png
- logs/AZ-210-05-014/05_r018_保険種類選択画面.png
- logs/AZ-210-05-014/06_r021_不備内容入力画面-新規.png
- logs/AZ-210-05-014/08_r023_募集人検索画面.png
- logs/AZ-210-05-014/09_r026_募集人検索画面.png
- logs/AZ-210-05-014/10_r029_不備内容入力画面-新規.png
- logs/AZ-210-05-014/12_r031_不備内容入力画面-更新.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
