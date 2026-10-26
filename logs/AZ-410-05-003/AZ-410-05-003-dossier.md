# AUDIT DOSSIER — AZ-410-05-003

meta: {"domain": "AZ", "company": "MS", "functionName": "シナリオ導線５", "item": "（機械）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-410-05-003.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=5 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|「No.」リンク押下|
- r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r20 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r21 | OP[2]ボタン|「検索」押下|
- r22 | OP[3]クリック|「No.」リンク押下|
- r23 | CK[4]遷移|代理店　不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r24 | OP[1]入力|回答内容
回答入力欄|【別紙】操作内容 入力内容：２参照
- r25 | OP[2]ボタン|「回答」押下|
- r26 | OP[3]ボタン|「OK」押下|
- r27 | CK[4]表示|代理店 不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r28 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r29 | OP[2]ボタン|「検索」押下|
- r30 | OP[3]クリック|「No.」リンク押下|
- r31 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：６参照 | EV:画面HC
- r32 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r33 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r34 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ
- r35 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG10
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、テスト対象を参照できるユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ41001
sheets[0]/rows[5][31]: シナリオID
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000003
sheets[0]/rows[6][31]: シナリオの枝番
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: 回答内容
sheets[0]/rows[7][8]: 以下、回答入力欄に入力します。
sheets[0]/rows[8][1]: 回答入力欄
sheets[0]/rows[8][8]: 任意の文字
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AH22
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 完了日
sheets[1]/rows[2][7]: 空白
sheets[1]/rows[3][1]: 連携
sheets[1]/rows[3][7]: 代理店
sheets[1]/rows[4][1]: 営業対応状況
sheets[1]/rows[4][7]: 回答済
sheets[1]/rows[5][1]: 代理店対応状況
sheets[1]/rows[5][7]: 未対応
sheets[1]/rows[6][0]: 2
sheets[1]/rows[6][1]: 入力区分
sheets[1]/rows[6][7]: 現地
sheets[1]/rows[7][1]: 種目
sheets[1]/rows[7][7]: 積立火災
sheets[1]/rows[8][1]: 保険種類
sheets[1]/rows[8][7]: 05：積立生活総合
sheets[1]/rows[9][1]: 証券番号
sheets[1]/rows[9][7]: AZ41001
sheets[1]/rows[10][1]: 明細番号
sheets[1]/rows[10][7]: 0000000003
sheets[1]/rows[11][1]: 部店課支社コード
sheets[1]/rows[11][7]: AHE61
sheets[1]/rows[12][1]: 代理店コード
sheets[1]/rows[12][7]: 252H
sheets[1]/rows[13][1]: 依頼区分
sheets[1]/rows[13][7]: 照会
sheets[1]/rows[14][0]: 3
sheets[1]/rows[14][1]: メッセージエリア
sheets[1]/rows[14][7]: メッセージID:MAZG104I101が表示されること
sheets[1]/rows[15][1]: 一時中断
sheets[1]/rows[15][7]: 非表示になること
sheets[1]/rows[16][1]: 回答
sheets[1]/rows[16][7]: 非表示になること
sheets[1]/rows[17][0]: 4
sheets[1]/rows[17][1]: 完了日
sheets[1]/rows[17][7]: 空白
sheets[1]/rows[18][1]: 連携
sheets[1]/rows[18][7]: 代理店
sheets[1]/rows[18][30]: 変化がないことを確認
sheets[1]/rows[19][1]: 営業対応状況
sheets[1]/rows[19][7]: 回答済
sheets[1]/rows[19][30]: 変化がないことを確認
sheets[1]/rows[20][1]: 代理店対応状況
sheets[1]/rows[20][7]: 回答済
sheets[1]/rows[20][30]: 未対応⇒回答済になること

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000003"  <- generated.json
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
- policyNo = "AZ41001"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- auto.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=32: user,pointCheck,sectionCode,agentCode,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

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
### BLK-SHR-F056442C  rows 20..27  status3=coded
  screen=代理店 不備一覧(AMC22)→代理店 不備内容入力画面-更新(AMC23) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(部店コード) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目(証券番号) sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [click] click No sel="#link_tag" val=""
  - [assert] ast 遷移 代理店 不備内容入力画面-更新 sel="#updateAnswer" val=""
  - [fill] inputBundle 各項目(回答入力欄) sel="textarea.cell_input_value" val="params.editedInquiryContent"
  - [click] click 回答 sel="#updateAnswer" val=""
  - [assert] click OK sel="#updateTempAnswer" val="" NOTE:OK=JS confirm auto-accept
  - [assert] ast 代理店 不備内容入力画面(更新) 表示 sel="#updateAnswer" val=""
  - [goto] restore 手順28行目の前提画面へ復帰 sel="" val="" NOTE:後続 BLK-AZ-LIST-FILTER-OPEN-UPDATE は goto を持たず AZG200 一覧前提のため、本ブロック終了時に一覧へ戻す
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 28..31  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-SHR-D606FB03  rows 32..35  status3=coded
  screen=AZG101 file=block-selectors-az-update4.json
  - [assert] ast 非浏览器确认 sel="input[name='update']" val="" NOTE:AP/DB/テーブル=真機人工

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-SHR-F056442C  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-SHR-D606FB03  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r19 遷移|不備内容入力画面-更新 file=04_r019_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r23 遷移|代理店 不備内容入力画面-更新 file=06_r023_代理店_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r27 表示|代理店 不備内容入力画面(更新) file=07_r027_代理店_不備内容入力画面(更新).png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r31 遷移|不備内容入力画面-更新 file=09_r031_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-410-05-003/01_menu.png
- logs/AZ-410-05-003/02_r015_不備一覧画面.png
- logs/AZ-410-05-003/04_r019_不備内容入力画面-更新.png
- logs/AZ-410-05-003/06_r023_代理店_不備内容入力画面-更新.png
- logs/AZ-410-05-003/07_r027_代理店_不備内容入力画面(更新).png
- logs/AZ-410-05-003/09_r031_不備内容入力画面-更新.png
- logs/AZ-410-05-003/11_BLK-SHR-D606FB03.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
