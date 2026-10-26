# AUDIT DOSSIER — AZ-111-02-004

meta: {"domain": "AZ", "company": "AD", "functionName": "マスタ引込（異常）：契約情報引込", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-111-02-004.xlsx"}
feasibility: class=B flow=pass manualSteps=2 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=3 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r16 | OP[1]ボタン|「新規登録」押下|
- r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:画面HC
- r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r19 | OP[2]ボタン|「登録」押下|
- r20 | CK[3]出力（Msg）|メッセージボックス|「MAZG100W024」のエラーメッセージが表示されること | EV:画面HC
- r21 | CK[4]その他|申込書テーブル|データが登録されないこと | EV:DBﾀﾞﾝﾌﾟ
- r22 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:D7
sheets[0]/rows[0][0]: ○テストデータ
sheets[0]/rows[2][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\01 申込書品質管理\AZ-100-07\AZ-100-07-003＞
sheets[0]/rows[4][2]: テストデータ_AZ-100-07-003.xlsx
sheets[0]/rows[5][2]: ユーザIDマスタテーブル（AD)の 「USER_ID = C01-SF1」 のレコードをADのDBに追加
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:BF23
sheets[1]/rows[0][0]: ○リリース
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\01 申込書品質管理\AZ-100-07\AZ-100-07-003＞
sheets[1]/rows[3][2]: 事前準備（リリース関連）_AZ-100-07-003.txt の②　参照
sheets[1]/rows[6][0]: 〇ログイン情報
sheets[1]/rows[8][0]: 1
sheets[1]/rows[8][1]: ユーザＩＤ
sheets[1]/rows[8][9]: C01-SF1
sheets[1]/rows[9][1]: 課支社コード
sheets[1]/rows[9][9]: ABK61
sheets[1]/rows[10][1]: 役職段階コード
sheets[1]/rows[10][9]: 65
sheets[1]/rows[13][0]: 〇操作内容
sheets[1]/rows[15][0]: 1
sheets[1]/rows[15][1]: 入力区分
sheets[1]/rows[15][9]: 契約入力
sheets[1]/rows[16][1]: 契約マスタ
sheets[1]/rows[16][9]: 連動する
sheets[1]/rows[17][1]: 種目
sheets[1]/rows[17][9]: 自動車
sheets[1]/rows[18][1]: 証券番号
sheets[1]/rows[18][9]: F065454943
sheets[1]/rows[19][1]: 新更変・他
sheets[1]/rows[19][9]: 新規
sheets[1]/rows[20][1]: 計上状態
sheets[1]/rows[20][9]: 未計上
sheets[1]/rows[21][1]: その他の項目
sheets[1]/rows[21][9]: （設定しない）

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
- largeItemValue = "5"  <- generated.json
- pointCheck = "?"  <- auto.json
- policyNo = "F065454943"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "ABK61"  <- generated.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- generated.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=29: user,pointCheck,agentCode,detailNo,inquiryId,fieldAgentId,insuranceLabel,itemCode,applicationType,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
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
### BLK-SGL-824C0B37  rows 19..22  status3=coded
  screen=AZG100 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 登録 sel="#regist" val=""
  - [assert] ast メッセージボックス MAZG100W024 sel="#message_area" val="" NOTE:メッセージ内容=alert/真機人工
  - [assert] ast 申込書テーブル・APログ sel="#regist" val="" NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / 登録されないこと

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-CREATE-INPUT  pass  rows None..None
- BLK-AZ-INPUT-FILL  pass  rows None..None
- BLK-SGL-824C0B37  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r17 遷移|不備内容入力画面-新規 file=02_r017_不備内容入力画面-新規.png url=...http://127.0.0.1:10097/AMB/AMA03.html
- [OK ] r20 出力(Msg)|メッセージボックス file=03_r020_メッセージボックス.png url=...http://127.0.0.1:10097/AMB/AMA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-111-02-004/01_menu.png
- logs/AZ-111-02-004/02_r017_不備内容入力画面-新規.png
- logs/AZ-111-02-004/03_r020_メッセージボックス.png
- logs/AZ-111-02-004/06_BLK-SGL-824C0B37.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
