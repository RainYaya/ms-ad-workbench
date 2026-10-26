# AUDIT DOSSIER — AZ-160-01-004

meta: {"domain": "AZ", "company": "MS", "functionName": "PDF形式：不備照会・返送票(FAX用)", "item": "帳票出力", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-160-01-004.xlsx"}
feasibility: class=C flow=pass manualSteps=2 proxyBlocks=4 paramIssues=1 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=8 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | CK[3]表示|不備一覧画面|入力内容：１の検索結果 | EV:画面HC
- r19 | OP[4]クリック|「No.」リンク押下|
- r20 | CK[5]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r21 | OP[1]ボタン|「印刷」押下|
- r22 | CK[2]遷移|帳票印刷画面|初期値 | EV:画面HC
- r23 | OP[1]ボタン|「帳票出力」押下|不備照会・返送票(FAX用) 正しい申込書類の作成についてのお願い（2項目表示）を選択し 帳票出力を押下
- r24 | CK[2]その他|不備照会・返送票（FAX用)|【別紙】正しい申込書類の作成についてのお願い（2項目表示） / 表示内容：1参照 | EV:PDFﾌｧｲﾙ
- r25 | OP[3]ボタン|「閉じる」押下|
- r26 | OP[1]ボタン|「一覧画面」押下|
- r27 | CK[2]表示|不備一覧画面|入力内容：１の検索結果 | EV:画面HC
- r28 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照
- r29 | OP[2]ボタン|「検索」押下|
- r30 | CK[3]表示|不備一覧画面|入力内容：2の検索結果 | EV:画面HC
- r31 | OP[4]クリック|「No.」リンク押下|
- r32 | CK[5]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC
- r33 | OP[1]ボタン|「印刷」押下|
- r34 | CK[2]遷移|帳票印刷画面|初期値 | EV:画面HC
- r35 | OP[1]ボタン|「帳票出力」押下|不備照会・返送票(FAX用) 正しい申込書類の作成についてのお願い（2項目表示）を選択し 帳票出力を押下
- r36 | CK[2]その他|不備照会・返送票（FAX用)|【別紙】正しい申込書類の作成についてのお願い（2項目表示） / 表示内容：2参照 | EV:PDFﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG10
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ160001
sheets[0]/rows[5][31]: シナリオID
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000007
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: 証券番号
sheets[0]/rows[7][8]: AZ160001
sheets[0]/rows[7][31]: シナリオID
sheets[0]/rows[8][1]: 明細番号
sheets[0]/rows[8][8]: 0000000008
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AE49
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 入力区分
sheets[1]/rows[2][7]: 現地
sheets[1]/rows[3][1]: 契約マスタ
sheets[1]/rows[3][7]: 連動しない
sheets[1]/rows[4][1]: 代理店名
sheets[1]/rows[4][7]: XXXXX XXXX
sheets[1]/rows[5][1]: 種目
sheets[1]/rows[5][7]: 自動車
sheets[1]/rows[6][1]: 保険種類
sheets[1]/rows[6][7]: 11：クルマの保険／はじめての自動車保険
sheets[1]/rows[7][1]: 証券番号
sheets[1]/rows[7][7]: AZ160001
sheets[1]/rows[8][1]: 明細番号
sheets[1]/rows[8][7]: 0000000007
sheets[1]/rows[9][1]: 部店課支社コード
sheets[1]/rows[9][7]: AHE61
sheets[1]/rows[10][1]: 代理店コード
sheets[1]/rows[10][7]: 252H
sheets[1]/rows[11][1]: サブコード
sheets[1]/rows[11][7]: 123456
sheets[1]/rows[12][1]: フリーコード
sheets[1]/rows[12][7]: free
sheets[1]/rows[13][1]: 回答締切日
sheets[1]/rows[13][7]: 2027/1/1
sheets[1]/rows[14][1]: 保険始期日
sheets[1]/rows[14][7]: 2026/10/1
sheets[1]/rows[15][1]: 変更日
sheets[1]/rows[15][7]: 2026/11/5
sheets[1]/rows[16][1]: 契約者名
sheets[1]/rows[16][7]: 契約者AZ160001
sheets[1]/rows[17][1]: 募集人ID
sheets[1]/rows[17][7]: 3015886775
sheets[1]/rows[18][1]: 計上年月
sheets[1]/rows[18][7]: 2026/12
sheets[1]/rows[19][1]: 日報/送付
sheets[1]/rows[19][7]: 1234567890AB
sheets[1]/rows[20][1]: 項目名１
sheets[1]/rows[20][7]: 任意の項目名
sheets[1]/rows[21][1]: 照会内容１
sheets[1]/rows[21][7]: 任意の照会内容
sheets[1]/rows[22][1]: 項目名２
sheets[1]/rows[22][7]: 任意の項目名
sheets[1]/rows[23][1]: 照会内容２
sheets[1]/rows[23][7]: 任意の照会内容
sheets[1]/rows[24][0]: 2
sheets[1]/rows[24][1]: 入力区分
sheets[1]/rows[24][7]: 現地
sheets[1]/rows[25][1]: 契約マスタ
sheets[1]/rows[25][7]: 連動しない
sheets[1]/rows[26][1]: 代理店名
sheets[1]/rows[26][7]: XXXXX XXXX
sheets[1]/rows[27][1]: 種目
sheets[1]/rows[27][7]: 自動車
sheets[1]/rows[28][1]: 保険種類
sheets[1]/rows[28][7]: 11：クルマの保険／はじめての自動車保険
sheets[1]/rows[29][1]: 証券番号
sheets[1]/rows[29][7]: AZ160001
sheets[1]/rows[30][1]: 明細番号
sheets[1]/rows[30][7]: 0000000008
sheets[1]/rows[31][1]: 部店課支社コード
sheets[1]/rows[31][7]: AHE61
sheets[1]/rows[32][1]: 代理店コード
sheets[1]/rows[32][7]: 252H
sheets[1]/rows[33][1]: サブコード
sheets[1]/rows[33][7]: 123456
sheets[1]/rows[34][1]: フリーコード
sheets[1]/rows[34][7]: free
sheets[1]/rows[35][1]: 回答締切日
sheets[1]/rows[35][7]: 2027/1/1
sheets[1]/rows[36][1]: 保険始期日
sheets[1]/rows[36][7]: 2026/10/1
sheets[1]/rows[37][1]: 変更日
sheets[1]/rows[37][7]: 2026/11/5
sheets[1]/rows[38][1]: 契約者名
sheets[1]/rows[38][7]: 契約者AZ160001
sheets[1]/rows[39][1]: 募集人ID
sheets[1]/rows[39][7]: 3015886775
sheets[1]/rows[40][1]: 計上年月
sheets[1]/rows[40][7]: 2026/12
sheets[1]/rows[41][1]: 日報/送付
sheets[1]/rows[41][7]: 1234567890AB
sheets[1]/rows[42][1]: 項目名１
sheets[1]/rows[42][7]: 任意の項目名
sheets[1]/rows[43][1]: 照会内容１
sheets[1]/rows[43][7]: 任意の照会内容
sheets[1]/rows[44][1]: 項目名２
sheets[1]/rows[44][7]: 任意の項目名
sheets[1]/rows[45][1]: 照会内容２
sheets[1]/rows[45][7]: 任意の照会内容
sheets[1]/rows[46][1]: 項目名３
sheets[1]/rows[46][7]: 任意の項目名
sheets[1]/rows[47][1]: 照会内容３
sheets[1]/rows[47][7]: 任意の照会内容

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000008"  <- generated.json
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
- policyNo = "AZ160001"  <- generated.json
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
### BLK-SHR-E593E2FC  rows 16..16  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] inputBundle 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 代理店コード sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle サブコード sel="#sub_agent_code" val="params.subAgentCode"
  - [fill] inputBundle フリーコード sel="#free_code_1" val="params.freeCode"
  - [fill] inputBundle 募集人ID sel="#field_agent_id" val="params.fieldAgentId"
  - [fill] inputBundle 証券番号 sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 明細番号 sel="#sub_policy_number" val="params.detailNo"
  - [fill] inputBundle 計上年 sel="#sumup_year" val="2026"
  - [fill] inputBundle 計上月 sel="#sumup_month" val="11"
  - [assert] ast 入力内容 sel="#policy_number" val=""
### BLK-AUTO-9EB5A282  rows 17..20  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
### BLK-AUTO-C8BDC3F2  rows 21..22  status3=coded
  screen=AZG101->帳票 file=block-selectors-az-update.json
  - [click] click 印刷 sel="input[name='print']" val=""
  - [assert] ast 帳票印刷遷移 sel="input[name='update']" val="" NOTE:帳票画面=AMA14 popup; mock简化
### BLK-SGL-FCF80BAC  rows 23..28  status3=coded
  screen=AZG901 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 印刷 sel="input[name='print']" val=""
  - [popup] ast 遷移 帳票印刷画面(popup) sel="" val=""
  - [click] click 帳票出力 sel="#Print" val="" (popup)
  - [assert] ast 帳票 不備照会・返送票(FAX用) sel="#Print" val="" (popup) NOTE:帳票PDF=真機人工
  - [click] click 閉じる sel="input[name='ClosePopup']" val="" (popup)
  - [click] click 一覧画面 sel="#act101to200" val=""
  - [assert] ast 表示 不備一覧画面 sel="#table07" val=""
  - [fill] inputBundle 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 証券番号 sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 明細番号 sel="#sub_policy_number" val="params.detailNo"
### BLK-AUTO-9EB5A282  rows 29..32  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
### BLK-AUTO-C8BDC3F2  rows 33..34  status3=coded
  screen=AZG101->帳票 file=block-selectors-az-update.json
  - [click] click 印刷 sel="input[name='print']" val=""
  - [assert] ast 帳票印刷遷移 sel="input[name='update']" val="" NOTE:帳票画面=AMA14 popup; mock简化
### BLK-SGL-2DDFC25D  rows 35..36  status3=coded
  screen=AZG901 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 印刷 sel="input[name='print']" val=""
  - [popup] ast 遷移 帳票印刷画面(popup) sel="" val=""
  - [click] click 帳票出力 sel="#Print" val="" (popup)
  - [assert] ast 帳票 不備照会・返送票(FAX用) sel="#Print" val="" (popup) NOTE:帳票PDF=真機人工（mockは帳票未生成）

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SHR-E593E2FC  pass  rows None..None
- BLK-AUTO-9EB5A282  pass  rows None..None
- BLK-AUTO-C8BDC3F2  pass  rows None..None
- BLK-SGL-FCF80BAC  pass  rows None..None
- BLK-AUTO-9EB5A282  pass  rows None..None
- BLK-AUTO-C8BDC3F2  pass  rows None..None
- BLK-SGL-2DDFC25D  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r18 表示|不備一覧画面 file=03_r018_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r20 遷移|不備内容入力画面-更新 file=06_r020_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r22 遷移|帳票印刷画面 file=09_r022_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html
- [OK ] r27 表示|不備一覧画面 file=10_r027_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r30 表示|不備一覧画面 file=11_r030_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r32 遷移|不備内容入力画面-更新 file=13_r032_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r34 遷移|帳票印刷画面 file=16_r034_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-160-01-004/01_menu.png
- logs/AZ-160-01-004/02_r015_不備一覧画面.png
- logs/AZ-160-01-004/03_r018_不備一覧画面.png
- logs/AZ-160-01-004/06_r020_不備内容入力画面-更新.png
- logs/AZ-160-01-004/09_r022_帳票印刷画面.png
- logs/AZ-160-01-004/10_r027_不備一覧画面.png
- logs/AZ-160-01-004/11_r030_不備一覧画面.png
- logs/AZ-160-01-004/13_r032_不備内容入力画面-更新.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
