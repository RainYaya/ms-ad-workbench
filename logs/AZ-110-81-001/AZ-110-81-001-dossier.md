# AUDIT DOSSIER — AZ-110-81-001

meta: {"domain": "AZ", "company": "MS", "functionName": "シナリオ導線８１（現新あり）", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-110-81-001.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=9 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|「No.」リンク押下|
- r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r20 | OP[1]ボタン|「検索」押下|
- r21 | CK[2]遷移|項目名検索画面|初期値 | EV:画面HC
- r22 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r23 | OP[2]ボタン|「検索」押下|
- r24 | CK[3]表示|項目名検索画面|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r25 | OP[4]クリック|各項目の選択|【別紙】操作内容 入力内容：３参照
- r26 | OP[5]ボタン|「選択」押下|
- r27 | CK[6]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r28 | OP[1]クリック|照会内容チェックボックス|チェックありにする
- r29 | OP[2]ボタン|「修」押下|
- r30 | CK[3]遷移|照会内容編集画面|初期値 | EV:画面HC
- r31 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照
- r32 | OP[2]ボタン|「OK」押下|
- r33 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC
- r34 | OP[1]クリック|代理店照会|項番4-1～4-6で登録した不備情報を「否」に変更
- r35 | OP[2]クリック|依頼区分|「連絡」をクリック
- r36 | OP[3]ボタン|「営業連携」押下|
- r37 | OP[4]ボタン|「通知しない」押下|
- r38 | OP[5]ボタン|「OK」押下|
- r39 | CK[6]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC
- r40 | OP[7]ボタン|「確認済」押下|
- r41 | CK[8]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：６参照 | EV:画面HC
- r42 | CK[9]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r43 | CK[10]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r44 | CK[11]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ
- r45 | CK[12]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AG23
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 入力区分
sheets[0]/rows[2][8]: 現地
sheets[0]/rows[3][1]: 契約マスタ
sheets[0]/rows[3][8]: 連動しない
sheets[0]/rows[4][1]: 種目
sheets[0]/rows[4][8]: 自動車
sheets[0]/rows[5][1]: 保険種類
sheets[0]/rows[5][8]: 11：クルマの保険／はじめての自動車保険
sheets[0]/rows[5][31]: ※　保険種類選択画面で設定
sheets[0]/rows[6][1]: 証券番号
sheets[0]/rows[6][8]: AZ1181
sheets[0]/rows[6][31]: シナリオID
sheets[0]/rows[7][1]: 明細番号
sheets[0]/rows[7][8]: 0000000052
sheets[0]/rows[7][31]: シナリオの枝番
sheets[0]/rows[8][1]: 部店課支社コード
sheets[0]/rows[8][8]: AHE61
sheets[0]/rows[8][31]: ※　変更となる可能性あり
sheets[0]/rows[9][1]: 代理店コード
sheets[0]/rows[9][8]: 252H
sheets[0]/rows[9][31]: ※　変更となる可能性あり
sheets[0]/rows[10][1]: サブコード
sheets[0]/rows[10][8]: 123456
sheets[0]/rows[11][1]: フリーコード
sheets[0]/rows[11][8]: 1234567890
sheets[0]/rows[12][1]: 募集人ID
sheets[0]/rows[12][8]: 3028004586
sheets[0]/rows[12][31]: ※　募集人検索画面で設定。変更となる可能性あり。
sheets[0]/rows[13][1]: 契約者名
sheets[0]/rows[13][8]: TEST
sheets[0]/rows[14][1]: 保険始期日
sheets[0]/rows[14][8]: 2026/11/01
sheets[0]/rows[15][1]: 変更日
sheets[0]/rows[15][8]: （入力なし）
sheets[0]/rows[16][1]: 新更変・他
sheets[0]/rows[16][8]: 新規
sheets[0]/rows[17][1]: 計上年月
sheets[0]/rows[17][8]: 2026/11
sheets[0]/rows[18][1]: 日報／送付
sheets[0]/rows[18][8]: 1234567890AB
sheets[0]/rows[19][1]: 日報部課代ｺｰﾄﾞ
sheets[0]/rows[19][8]: ABC012
sheets[0]/rows[20][1]: 計上状態
sheets[0]/rows[20][8]: 未計上
sheets[0]/rows[21][1]: 回答締切日
sheets[0]/rows[21][8]: システム日＋7日（初期設定）
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AG14
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。
sheets[1]/rows[3][0]: ○入力内容
sheets[1]/rows[5][0]: 1
sheets[1]/rows[5][1]: 証券番号
sheets[1]/rows[5][8]: AZ11081
sheets[1]/rows[5][31]: シナリオID
sheets[1]/rows[6][1]: 明細番号
sheets[1]/rows[6][8]: 0000000052
sheets[1]/rows[6][31]: シナリオの枝番
sheets[1]/rows[7][0]: 2
sheets[1]/rows[7][1]: 項目コード
sheets[1]/rows[7][8]: T0
sheets[1]/rows[8][1]: 照会コード
sheets[1]/rows[8][8]: T007
sheets[1]/rows[9][0]: 3
sheets[1]/rows[9][1]: 項目名
sheets[1]/rows[9][8]: T0：損保取引確認書
sheets[1]/rows[10][1]: 照会内容
sheets[1]/rows[10][8]: T007：「損保取引確認書」の添付がもれています。
sheets[1]/rows[11][1]: 不備内容
sheets[1]/rows[11][8]: 添付書類もれ
sheets[1]/rows[12][0]: 4
sheets[1]/rows[12][1]: 編集照会内容
sheets[1]/rows[12][8]: 編集済み。
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AF30
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 入力区分
sheets[2]/rows[2][7]: 現地
sheets[2]/rows[3][1]: 契約マスタ
sheets[2]/rows[3][7]: 連動しない
sheets[2]/rows[4][1]: 種目
sheets[2]/rows[4][7]: 自動車
sheets[2]/rows[5][1]: 保険種類
sheets[2]/rows[5][7]: 11：クルマの保険／はじめての自動車保険
sheets[2]/rows[6][1]: 証券番号
sheets[2]/rows[6][7]: AZ11081
sheets[2]/rows[7][1]: 明細番号
sheets[2]/rows[7][7]: 0000000052
sheets[2]/rows[8][1]: 部店課支社コード
sheets[2]/rows[8][7]: AHE61
sheets[2]/rows[9][1]: 代理店コード
sheets[2]/rows[9][7]: 252H
sheets[2]/rows[10][1]: 依頼区分
sheets[2]/rows[10][7]: 照会
sheets[2]/rows[11][1]: 点検区分
sheets[2]/rows[11][7]: 営業
sheets[2]/rows[12][1]: 完了日
sheets[2]/rows[12][7]: 空白
sheets[2]/rows[13][1]: 連携
sheets[2]/rows[13][7]: 空白
sheets[2]/rows[14][1]: 営業対応状況
sheets[2]/rows[14][7]: 対象外
sheets[2]/rows[15][1]: 代理店対応状況
sheets[2]/rows[15][7]: 対象外
sheets[2]/rows[16][0]: 2
sheets[2]/rows[16][1]: 項目名
sheets[2]/rows[16][7]: T0：損保取引確認書
sheets[2]/rows[17][1]: 照会内容
sheets[2]/rows[17][7]: T007：「損保取引確認書」の添付がもれています。
sheets[2]/rows[18][0]: 3
sheets[2]/rows[18][1]: 項目コード
sheets[2]/rows[18][7]: T0
sheets[2]/rows[18][30]: 入力内容の反映
sheets[2]/rows[19][1]: 項目名
sheets[2]/rows[19][7]: 損保取引確認書
sheets[2]/rows[19][30]: 入力内容の反映
sheets[2]/rows[20][1]: 不備内容
sheets[2]/rows[20][7]: 添付書類もれ
sheets[2]/rows[20][30]: 入力内容の反映
sheets[2]/rows[21][1]: 照会内容
sheets[2]/rows[21][7]: T007：「損保取引確認書」の添付がもれています。
sheets[2]/rows[21][30]: 入力内容の反映
sheets[2]/rows[22][0]: 4
sheets[2]/rows[22][1]: 照会内容
sheets[2]/rows[22][7]: 編集済み。
sheets[2]/rows[22][30]: 入力内容の反映
sheets[2]/rows[23][0]: 5
sheets[2]/rows[23][1]: 連携
sheets[2]/rows[23][7]: 営業
sheets[2]/rows[24][1]: 営業対応状況
sheets[2]/rows[24][7]: 未対応
sheets[2]/rows[25][1]: 代理店対応状況
sheets[2]/rows[25][7]: 対象外
sheets[2]/rows[26][0]: 6
sheets[2]/rows[26][1]: 連携
sheets[2]/rows[26][7]: 営業
sheets[2]/rows[26][30]: 変化がないことを確認
sheets[2]/rows[27][1]: 営業対応状況
sheets[2]/rows[27][7]: 完了
sheets[2]/rows[27][30]: 未対応⇒完了になることを確認
sheets[2]/rows[28][1]: 代理店対応状況
sheets[2]/rows[28][7]: 完了
sheets[2]/rows[28][30]: 対象外⇒完了になることを確認

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- az-update.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- generated.json
- detailNo = "0000000052"  <- generated.json
- editedInquiryContent = "編集済み。"  <- generated.json
- fieldAgentId = "3028004586"  <- auto.json
- freeCode = "1234567890"  <- auto.json
- inputType = "2"  <- auto.json
- inquiryCode = "T007"  <- generated.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- generated.json
- inquiryId = "0000000012"  <- auto.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "00 ： 自賠責"  <- auto.json
- itemCode = "T0"  <- generated.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "B"  <- auto.json
- pointCheck = "?"  <- auto.json
- policyNo = "AZ11081"  <- generated.json
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
params total=34, auto-fallback=25: user,pointCheck,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,itemName,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-SEARCH-LIST  rows 14..15  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 16..19  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-AUTO-04A78248  rows 20..21  status3=coded
  screen=AZG101->AZG900 file=block-selectors-az-update2.json
  - [click] click 検索 sel="input[name='imperfectSearch[0]']" val=""
  - [popup] ast 遷移 項目名検索 sel="" val=""
### BLK-AZ-ITEM-SEARCH-SELECT  rows 22..27  status3=coded
  screen=AZG900 file=block-selectors.json
  - [fill] inputBundle 項目コード sel="select[name=\"field_list.selected\"]" val="params.itemCode" (popup)
  - [click] click 検索 sel="input[name=\"search\"]" val="" (popup)
  - [assert] ast 検索結果 sel="select[name=\"field_list.selected\"] option" val="" (popup)
  - [click] click 選択 sel="input[name=\"select\"]" val="" (popup)
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-AZ-INQUIRY-EDIT  rows 28..33  status3=coded
  screen=AZG101+AZG902 file=block-selectors.json
  - [check] click 照会内容チェックボックス sel="input[name=\"list[0].inquiry_contents_edit_flag\"]" val=""
  - [enable] enable 修 sel="input[name=\"editInquiryContents[0]\"]" val=""
  - [click] click 修 sel="input[name=\"editInquiryContents[0]\"]" val=""
  - [popup] ast 遷移 照会内容編集 sel="" val=""
  - [fill] inputBundle 各項目 sel="textarea" val="params.editedInquiryContent" (popup)
  - [click] click OK sel="input[name=\"ok\"], input[value=\"　ＯＫ　\"]" val="" (popup)
  - [assert] ast 反映確認 sel="input[name=\"update\"]" val=""
### BLK-SHR-ED323C11  rows 34..35  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [selectOptionByLabel] select 代理店照会 sel="select[name='list[0].agent_inquiry_flag.selected']" val="否"
  - [assert] ast 画面確認 sel="input[name='update']" val=""
### BLK-SGL-CCA9B958  rows 36..37  status3=coded
  screen=AZG101/AMC23 file=block-selectors-sgl.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携 sel="input[name='updateBusinessNotify']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val="" NOTE:通知dialog=真機人工
### BLK-AUTO-4C432C14  rows 38..39  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [assert] ast 確認dialog後 sel="input[name='update']" val="" NOTE:OK=JS confirm auto-accept
### BLK-AUTO-8FE40BE8  rows 40..45  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [click] click 確認済 sel="input[name='updateAnswer']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val="" NOTE:ログ=真機人工

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-AUTO-04A78248  pass  rows None..None
- BLK-AZ-ITEM-SEARCH-SELECT  pass  rows None..None
- BLK-AZ-INQUIRY-EDIT  pass  rows None..None
- BLK-SHR-ED323C11  pass  rows None..None
- BLK-SGL-CCA9B958  pass  rows None..None
- BLK-AUTO-4C432C14  pass  rows None..None
- BLK-AUTO-8FE40BE8  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r19 遷移|不備内容入力画面-更新 file=04_r019_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r21 遷移|項目名検索画面 file=06_r021_項目名検索画面.png url=...http://127.0.0.1:10097/AMB/AMA13.html
- [OK ] r24 表示|項目名検索画面 file=08_r024_項目名検索画面.png url=...http://127.0.0.1:10097/AMB/AMA13.html
- [OK ] r27 遷移|不備内容入力画面-更新 file=09_r027_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r30 遷移|照会内容編集画面 file=11_r030_照会内容編集画面.png url=...http://127.0.0.1:10097/AMB/AMA15.html
- [OK ] r33 遷移|不備内容入力画面-更新 file=12_r033_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r39 表示|不備内容入力画面-更新 file=13_r039_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r41 表示|不備内容入力画面-更新 file=14_r041_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-110-81-001/01_menu.png
- logs/AZ-110-81-001/02_r015_不備一覧画面.png
- logs/AZ-110-81-001/04_r019_不備内容入力画面-更新.png
- logs/AZ-110-81-001/06_r021_項目名検索画面.png
- logs/AZ-110-81-001/08_r024_項目名検索画面.png
- logs/AZ-110-81-001/09_r027_不備内容入力画面-更新.png
- logs/AZ-110-81-001/11_r030_照会内容編集画面.png
- logs/AZ-110-81-001/12_r033_不備内容入力画面-更新.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
