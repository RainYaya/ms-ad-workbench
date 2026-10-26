# AUDIT DOSSIER — AZ-210-67-001

meta: {"domain": "AZ", "company": "MS", "functionName": "シナリオ導線６７（現新あり）", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-210-67-001.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=7 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r15 | OP[2]ボタン|「検索」押下|
- r16 | OP[3]クリック|「No.」リンク押下|
- r17 | CK[4]遷移|代理店 不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r18 | OP[1]ボタン|「検索」押下|
- r19 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r20 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r21 | OP[2]ボタン|「検索」押下|
- r22 | OP[3]クリック|「No.」リンク押下|
- r23 | CK[4]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r24 | OP[1]ボタン|「印刷」押下|
- r25 | CK[2]遷移|帳票印刷画面|初期値 | EV:画面HC
- r26 | OP[1]ボタン|「帳票出力」押下|
- r27 | OP[2]ボタン|「名前を付けて保存」押下|
- r28 | OP[3]ボタン|「閉じる」押下|
- r29 | CK[4]遷移|代理店 不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r30 | OP[1]ボタン|「検索」押下|
- r31 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r32 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r33 | OP[2]ボタン|「検索」押下|
- r34 | OP[3]クリック|「No.」リンク押下|
- r35 | CK[4]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r36 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r37 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r38 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ
- r39 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AG29
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 入力区分
sheets[0]/rows[2][8]: 現地
sheets[0]/rows[3][1]: 契約マスタ
sheets[0]/rows[3][8]: 連動しない
sheets[0]/rows[4][1]: 種目
sheets[0]/rows[4][8]: 自動車
sheets[0]/rows[5][1]: 保険種類
sheets[0]/rows[5][8]: 13：クルマの保険・一般用
sheets[0]/rows[5][31]: ※　保険種類選択画面で設定
sheets[0]/rows[6][1]: 証券番号
sheets[0]/rows[6][8]: AZ21067
sheets[0]/rows[6][31]: シナリオID
sheets[0]/rows[7][1]: 明細番号
sheets[0]/rows[7][8]: 0000000050
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
sheets[0]/rows[24][0]: ○実施前状態
sheets[0]/rows[25][0]: 1
sheets[0]/rows[25][1]: 連携
sheets[0]/rows[25][7]: 代理店
sheets[0]/rows[26][1]: 営業対応状況
sheets[0]/rows[26][7]: 対象外
sheets[0]/rows[27][1]: 代理店対応状況
sheets[0]/rows[27][7]: 未対応
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AG8
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ＭＳのユーザかつ、申込書の操作が可能なユーザを設定。
sheets[1]/rows[3][0]: ○入力内容
sheets[1]/rows[5][0]: 1
sheets[1]/rows[5][1]: 証券番号
sheets[1]/rows[5][8]: AZ21067
sheets[1]/rows[5][31]: シナリオID
sheets[1]/rows[6][1]: 明細番号
sheets[1]/rows[6][8]: 0000000050
sheets[1]/rows[6][31]: シナリオの枝番
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AF17
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 入力区分
sheets[2]/rows[2][7]: 現地
sheets[2]/rows[3][1]: 種目
sheets[2]/rows[3][7]: 自動車
sheets[2]/rows[4][1]: 保険種類
sheets[2]/rows[4][7]: 13：クルマの保険・一般用
sheets[2]/rows[5][1]: 証券番号
sheets[2]/rows[5][7]: AZ21067
sheets[2]/rows[6][1]: 明細番号
sheets[2]/rows[6][7]: 0000000050
sheets[2]/rows[7][1]: 部店課支社コード
sheets[2]/rows[7][7]: AHE61
sheets[2]/rows[8][1]: 代理店コード
sheets[2]/rows[8][7]: 252H
sheets[2]/rows[9][1]: 依頼区分
sheets[2]/rows[9][7]: 照会
sheets[2]/rows[10][0]: 2
sheets[2]/rows[10][1]: 連携
sheets[2]/rows[10][7]: 代理店
sheets[2]/rows[11][1]: 営業対応状況
sheets[2]/rows[11][7]: 対象外
sheets[2]/rows[12][1]: 代理店対応状況
sheets[2]/rows[12][7]: 未対応
sheets[2]/rows[13][0]: 3
sheets[2]/rows[13][1]: 連携
sheets[2]/rows[13][7]: 代理店
sheets[2]/rows[13][30]: 変化がないことを確認
sheets[2]/rows[14][1]: 営業対応状況
sheets[2]/rows[14][7]: 対象外
sheets[2]/rows[14][30]: 変化がないことを確認
sheets[2]/rows[15][1]: 代理店対応状況
sheets[2]/rows[15][7]: 対応中
sheets[2]/rows[15][30]: 未対応⇒対応中になることを確認

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- AMC00.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000050"  <- generated.json
- editedInquiryContent = "編集済み。"  <- auto.json
- fieldAgentId = "3028004586"  <- AMC00.json
- freeCode = "1234567890"  <- AMC00.json
- inputType = "2"  <- auto.json
- inquiryCode = "T007"  <- auto.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- auto.json
- inquiryId = "0000000012"  <- AMC00.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "00 ： 自賠責"  <- auto.json
- itemCode = "T0"  <- auto.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "B"  <- auto.json
- pointCheck = "?"  <- AMC00.json
- policyNo = "AZ21067"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- AMC00.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#select"  <- AMC00.json
- startUrl = "/AMC00/AMC22.html"  <- AMC00.json
- subAgentCode = "123456"  <- AMC00.json
- subPolicyNo = "0012"  <- AMC00.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- AMC00.json
params total=35, auto-fallback=22: inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType

## 4. 积木组成与 selector 步骤
### BLK-AUTO-DDA3A833  rows 14..17  status3=coded
  screen=代理店不備一覧(AMC22)→代理店 不備内容入力画面(更新)(AMC23) file=block-selectors-ag.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目 sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目 sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.inquiryId"
  - [fill] inputBundle 各項目 sel="#field_agent_id" val="params.fieldAgentId"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果行 sel="#gyoumu_list a" val=""
  - [click] click No.リンク sel="#link_tag" val=""
  - [assert] ast 遷移 代理店 不備内容入力画面(更新) sel="#updateTempAnswer" val=""
### BLK-AZ-MENU-SEARCH-LIST  rows 18..19  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 20..23  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-SGL-CEAA65E9  rows 24..29  status3=coded
  screen=AZG101/AMC23 file=block-selectors-sgl.json
  - [goto] goto start screen sel="" val=""
  - [click] click 印刷 sel="#print" val=""
  - [assert] ast 画面確認 sel="#updateTempAnswer" val="" NOTE:帳票popup=真機人工
  - [goto] goto 帳票印刷 sel="" val=""
  - [assert] ast 帳票印刷画面 sel="#Print" val=""
  - [goto] goto 代理店更新画面へ戻る sel="" val=""
  - [assert] ast 代理店更新画面 sel="#updateTempAnswer" val=""
### BLK-AZ-MENU-SEARCH-LIST  rows 30..31  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 32..35  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-SHR-D606FB03  rows 36..39  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [assert] ast 非浏览器确认 sel="input[name='update']" val="" NOTE:AP/DB/テーブル=真機人工

## 5. 本次运行结果（块级）
- BLK-AUTO-DDA3A833  pass  rows None..None
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-SGL-CEAA65E9  pass  rows None..None
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-SHR-D606FB03  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r17 遷移|代理店 不備内容入力画面(更新) file=02_r017_代理店_不備内容入力画面(更新).png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r19 遷移|不備一覧画面 file=04_r019_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r23 遷移|不備内容入力画面-更新 file=06_r023_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r25 遷移|帳票印刷画面 file=08_r025_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html
- [OK ] r29 遷移|代理店 不備内容入力画面(更新) file=09_r029_代理店_不備内容入力画面(更新).png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r31 遷移|不備一覧画面 file=11_r031_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r35 遷移|不備内容入力画面-更新 file=13_r035_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-210-67-001/01_menu.png
- logs/AZ-210-67-001/02_r017_代理店_不備内容入力画面(更新).png
- logs/AZ-210-67-001/04_r019_不備一覧画面.png
- logs/AZ-210-67-001/06_r023_不備内容入力画面-更新.png
- logs/AZ-210-67-001/08_r025_帳票印刷画面.png
- logs/AZ-210-67-001/09_r029_代理店_不備内容入力画面(更新).png
- logs/AZ-210-67-001/11_r031_不備一覧画面.png
- logs/AZ-210-67-001/13_r035_不備内容入力画面-更新.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
