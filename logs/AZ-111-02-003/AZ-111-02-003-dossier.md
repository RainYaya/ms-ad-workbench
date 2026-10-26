# AUDIT DOSSIER — AZ-111-02-003

meta: {"domain": "AZ", "company": "MS", "functionName": "マスタ引込（異常）：自賠責契約情報View", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-111-02-003.xlsx"}
feasibility: class=B flow=pass manualSteps=3 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=7 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r17 | OP[1]ボタン|「新規登録」押下|
- r18 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:画面HC
- r19 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r20 | OP[2]ボタン|「登録」押下|
- r21 | CK[3]出力（Msg）|エラーメッセージ|「MAZG000E001」のエラーメッセージが表示されること | EV:画面HC
- r22 | CK[4]その他|申込書テーブル|データが登録されないこと | EV:DBﾀﾞﾝﾌﾟ
- r23 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r28 | OP[1]ボタン|「新規登録」押下|
- r29 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認）
- r30 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r31 | OP[2]ボタン|「登録」押下|
- r32 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:（目視確認）
- r33 | CK[4]その他|申込書テーブル|データが登録されたこと | EV:（目視確認）

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG29
sheets[0]/rows[0][0]: 以下の資料を参照して事前準備と事後作業を実施する
sheets[0]/rows[1][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\01 申込書品質管理\AZ-111-02\AZ-111-02-003＞
sheets[0]/rows[2][2]: 事前準備・事後作業_AZ-111-02-003.txt
sheets[0]/rows[4][0]: ○事前準備
sheets[0]/rows[5][1]: 自賠責契約情報Viewに対して以下の作業を実施する
sheets[0]/rows[6][2]: ①現在のDDLを取得する
sheets[0]/rows[7][2]: ②現在のViewをリネームして退避する
sheets[0]/rows[8][2]: ③内容を一部変更したDDL文を実行し、不正なViewを作成する
sheets[0]/rows[10][0]: ○事後作業
sheets[0]/rows[11][1]: 自賠責契約情報Viewに対して以下の作業を実施する
sheets[0]/rows[12][2]: ①元のDDL文を実行し、正常なViewを作成する
sheets[0]/rows[13][2]: ②手順書の項番3-1～4-4を実行
sheets[0]/rows[14][2]: ③問題がないことを確認後、リネームして退避したViewを削除する
sheets[0]/rows[16][0]: ○ログイン情報
sheets[0]/rows[17][1]: ＭＳのユーザを設定。
sheets[0]/rows[19][0]: ○入力内容
sheets[0]/rows[21][0]: 1
sheets[0]/rows[21][1]: 入力区分
sheets[0]/rows[21][8]: 契約入力
sheets[0]/rows[22][1]: 契約マスタ
sheets[0]/rows[22][8]: 連動する
sheets[0]/rows[23][1]: 種目
sheets[0]/rows[23][8]: 自賠責
sheets[0]/rows[23][31]: ※マスタ引込不可能なデータ
sheets[0]/rows[24][1]: 証券番号
sheets[0]/rows[24][8]: EJEJ96096
sheets[0]/rows[24][31]: ※マスタ引込不可能なデータ
sheets[0]/rows[25][1]: 新更変・他
sheets[0]/rows[25][8]: 新規
sheets[0]/rows[26][1]: 計上状態
sheets[0]/rows[26][8]: 未計上
sheets[0]/rows[27][1]: その他の項目
sheets[0]/rows[27][8]: （設定しない）
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AF39
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 入力区分
sheets[1]/rows[2][7]: 契約入力
sheets[1]/rows[3][1]: 契約マスタ
sheets[1]/rows[3][7]: 連動する
sheets[1]/rows[4][1]: 種目
sheets[1]/rows[4][7]: 自賠責
sheets[1]/rows[5][1]: 保険種類
sheets[1]/rows[5][7]: 空白
sheets[1]/rows[6][1]: 証券番号
sheets[1]/rows[6][7]: EJEJ96096
sheets[1]/rows[7][1]: 明細番号
sheets[1]/rows[7][7]: 空白
sheets[1]/rows[8][1]: 部店課支社コード
sheets[1]/rows[8][7]: ADF62
sheets[1]/rows[8][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[9][1]: 代理店コード
sheets[1]/rows[9][7]: 2215
sheets[1]/rows[9][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[10][1]: 代理店略称
sheets[1]/rows[10][7]: 櫛🈶ヤXト
sheets[1]/rows[10][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[11][1]: サブコード
sheets[1]/rows[11][7]: 103
sheets[1]/rows[11][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[12][1]: フリーコード
sheets[1]/rows[12][7]: 0XXXX
sheets[1]/rows[12][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[13][1]: 募集人ID
sheets[1]/rows[13][7]: 空白
sheets[1]/rows[14][1]: 募集人名
sheets[1]/rows[14][7]: 空白
sheets[1]/rows[15][1]: 契約者名
sheets[1]/rows[15][7]: 泊🈶　櫛臓
sheets[1]/rows[15][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[16][1]: 計上状態
sheets[1]/rows[16][7]: 未計上
sheets[1]/rows[17][1]: 照会方法
sheets[1]/rows[17][7]: 1:品質管理
sheets[1]/rows[18][1]: 保険始期日
sheets[1]/rows[18][7]: 2017/01/20
sheets[1]/rows[18][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[19][1]: 変更日
sheets[1]/rows[19][7]: 空白
sheets[1]/rows[20][1]: 新更変・他
sheets[1]/rows[20][7]: 新規
sheets[1]/rows[21][1]: 計上年月
sheets[1]/rows[21][7]: 2016/12
sheets[1]/rows[21][30]: ※マスタ引込で引き込んだ結果になることを確認
sheets[1]/rows[22][1]: 日報／送付
sheets[1]/rows[22][7]: 空白
sheets[1]/rows[23][1]: 日報部課代ｺｰﾄﾞ
sheets[1]/rows[23][7]: 空白
sheets[1]/rows[24][1]: 点検状態
sheets[1]/rows[24][7]: 空白
sheets[1]/rows[25][1]: 依頼区分
sheets[1]/rows[25][7]: 照会
sheets[1]/rows[26][1]: 点検区分
sheets[1]/rows[26][7]: 営業
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
- inputType = "1"  <- generated.json
- inquiryCode = "T007"  <- auto.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- auto.json
- inquiryId = "0000000012"  <- auto.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "00 ： 自賠責"  <- auto.json
- itemCode = "T0"  <- auto.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "B"  <- generated.json
- pointCheck = "?"  <- auto.json
- policyNo = "EJEJ96096"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- auto.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- generated.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=30: user,pointCheck,sectionCode,agentCode,detailNo,inquiryId,fieldAgentId,insuranceLabel,itemCode,applicationType,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-CREATE-INPUT  rows 17..18  status3=verified
  screen=AZG001 file=block-selectors.json
  - [goto] goto start screen sel="" val=""
  - [click] click 新規登録 sel="#act001to100" val=""
  - [assert] ast transition 不備内容入力画面-新規 sel="#policy_number" val=""
### BLK-AZ-INPUT-FILL  rows 19..19  status3=verified
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
### BLK-SHR-CD763243  rows 20..23  status3=coded
  screen=AZG100 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 登録 sel="#regist" val=""
  - [assert] ast エラーメッセージ sel="#message_area" val="" NOTE:エラーメッセージ=alert/真機人工
  - [assert] ast 申込書テーブル・APログ sel="input[name='policy_number']" val="" NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / 登録されないこと
### BLK-AZ-MENU-CREATE-INPUT  rows 28..29  status3=verified
  screen=AZG001 file=block-selectors.json
  - [goto] goto start screen sel="" val=""
  - [click] click 新規登録 sel="#act001to100" val=""
  - [assert] ast transition 不備内容入力画面-新規 sel="#policy_number" val=""
### BLK-AZ-INPUT-FILL  rows 30..30  status3=verified
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
### BLK-AZ-REGISTER-UPDATE  rows 31..32  status3=coded
  screen=AZG100→AZG101 file=block-selectors.json
  - [click] click 登録 sel="#regist" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name=\"update\"]" val=""
### BLK-SHR-340D4343  rows 33..33  status3=coded
  screen=AZG100 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 申込書テーブル sel="#regist" val="" NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認）

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-CREATE-INPUT  pass  rows None..None
- BLK-AZ-INPUT-FILL  pass  rows None..None
- BLK-SHR-CD763243  pass  rows None..None
- BLK-AZ-MENU-CREATE-INPUT  pass  rows None..None
- BLK-AZ-INPUT-FILL  pass  rows None..None
- BLK-AZ-REGISTER-UPDATE  pass  rows None..None
- BLK-SHR-340D4343  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r18 遷移|不備内容入力画面-新規 file=02_r018_不備内容入力画面-新規.png url=...http://127.0.0.1:10097/AMB/AMA03.html
- [OK ] r21 出力(Msg)|エラーメッセージ file=03_r021_エラーメッセージ.png url=...http://127.0.0.1:10097/AMB/AMA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-111-02-003/01_menu.png
- logs/AZ-111-02-003/02_r018_不備内容入力画面-新規.png
- logs/AZ-111-02-003/03_r021_エラーメッセージ.png
- logs/AZ-111-02-003/10_BLK-SHR-340D4343.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
