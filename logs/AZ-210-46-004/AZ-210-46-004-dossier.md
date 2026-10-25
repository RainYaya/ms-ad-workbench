# AUDIT DOSSIER — AZ-210-46-004

meta: {"domain": "AZ", "company": "MS", "functionName": "シナリオ導線４６", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-210-46-004.xlsx"}
feasibility: class=A flow=pass manualSteps=0 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=3 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|「No.」リンク押下|
- r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r20 | OP[1]入力|回答内容
回答入力欄|【別紙】操作内容 入力内容：２参照
- r21 | OP[2]ボタン|「完了登録」押下|
- r22 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r23 | OP[4]ボタン|「OK」押下|
- r24 | OP[5]入力|回答内容
回答入力欄|【別紙】操作内容 入力内容：３参照
- r25 | OP[6]ボタン|「完了登録」押下|
- r26 | CK[8]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG12
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ21036
sheets[0]/rows[5][31]: シナリオID
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000039
sheets[0]/rows[6][31]: シナリオの枝番
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: 回答内容
sheets[0]/rows[7][8]: 以下、回答入力欄に入力します。
sheets[0]/rows[8][1]: 回答入力欄
sheets[0]/rows[8][31]: 空欄
sheets[0]/rows[9][0]: 3
sheets[0]/rows[9][1]: 回答内容
sheets[0]/rows[9][8]: 以下、回答入力欄に入力します。
sheets[0]/rows[10][1]: 回答入力欄
sheets[0]/rows[10][8]: 任意の文字
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AF21
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 入力区分
sheets[1]/rows[2][7]: 現地
sheets[1]/rows[3][1]: 契約マスタ
sheets[1]/rows[3][7]: 連動しない
sheets[1]/rows[4][1]: 種目
sheets[1]/rows[4][7]: 自動車
sheets[1]/rows[5][1]: 保険種類
sheets[1]/rows[5][7]: 13：クルマの保険・一般用
sheets[1]/rows[6][1]: 証券番号
sheets[1]/rows[6][7]: AZ21036
sheets[1]/rows[7][1]: 明細番号
sheets[1]/rows[7][7]: 0000000039
sheets[1]/rows[8][1]: 部店課支社コード
sheets[1]/rows[8][7]: AHE61
sheets[1]/rows[9][1]: 代理店コード
sheets[1]/rows[9][7]: 252H
sheets[1]/rows[10][1]: 依頼区分
sheets[1]/rows[10][7]: 照会
sheets[1]/rows[11][1]: 点検区分
sheets[1]/rows[11][7]: 営業
sheets[1]/rows[12][1]: 完了日
sheets[1]/rows[12][7]: 空白
sheets[1]/rows[13][1]: 連携
sheets[1]/rows[13][7]: 代理店
sheets[1]/rows[14][1]: 営業対応状況
sheets[1]/rows[14][7]: 対象外
sheets[1]/rows[15][1]: 代理店対応状況
sheets[1]/rows[15][7]: 回答済
sheets[1]/rows[16][0]: 2
sheets[1]/rows[16][1]: メッセージボックス
sheets[1]/rows[16][7]: メッセージID:MAZG101W051が表示されること
sheets[1]/rows[17][0]: 3
sheets[1]/rows[17][1]: 連携
sheets[1]/rows[17][7]: 代理店
sheets[1]/rows[17][30]: 変化がないことを確認
sheets[1]/rows[18][1]: 営業対応状況
sheets[1]/rows[18][7]: 完了
sheets[1]/rows[18][30]: 対象外⇒完了になること
sheets[1]/rows[19][1]: 代理店対応状況
sheets[1]/rows[19][7]: 完了
sheets[1]/rows[19][30]: 回答済⇒完了になること

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- az-update.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000039"  <- generated.json
- editedInquiryContent = "編集済み。"  <- auto.json
- fieldAgentId = "3028004586"  <- bulk.json
- freeCode = "1234567890"  <- auto.json
- inputType = "2"  <- bulk.json
- inquiryCode = "T007"  <- auto.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- auto.json
- inquiryId = "0000000012"  <- auto.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "00 ： 自賠責"  <- bulk.json
- itemCode = "T0"  <- bulk.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "B"  <- bulk.json
- pointCheck = "?"  <- bulk.json
- policyNo = "AZ21036"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- az-update.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- bulk.json
- startUrl = "/AMB/AMA01.html"  <- bulk.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- bulk.json
params total=34, auto-fallback=21: inquiryId,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType

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
### BLK-AUTO-C2B6BA33  rows 20..26  status3=coded
  screen=AZG101 file=block-selectors-az-update.json
  - [click] click 完了登録 sel="input[name='updateCompleteDate']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val=""

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-AUTO-C2B6BA33  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10091/AMB/AMA07.html
- [OK ] r19 遷移|不備内容入力画面-更新 file=04_r019_不備内容入力画面-更新.png url=...http://127.0.0.1:10091/AMB/AMA04.html
- [OK ] r22 表示|不備内容入力画面-更新 file=05_r022_不備内容入力画面-更新.png url=...http://127.0.0.1:10091/AMB/AMA04.html
- [OK ] r26 表示|不備内容入力画面-更新 file=07_r026_不備内容入力画面-更新.png url=...http://127.0.0.1:10091/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-210-46-004/01_menu.png
- logs/AZ-210-46-004/02_r015_不備一覧画面.png
- logs/AZ-210-46-004/04_r019_不備内容入力画面-更新.png
- logs/AZ-210-46-004/05_r022_不備内容入力画面-更新.png
- logs/AZ-210-46-004/07_r026_不備内容入力画面-更新.png
- logs/AZ-210-46-004/08_BLK-AUTO-C2B6BA33.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
