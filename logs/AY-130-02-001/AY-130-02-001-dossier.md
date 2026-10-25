# AUDIT DOSSIER — AY-130-02-001

meta: {"domain": "AY", "company": "MS", "functionName": "ダウンロード承認", "item": "検索", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-130-02-001.xlsx"}
feasibility: class=C flow=pass manualSteps=0 proxyBlocks=1 paramIssues=1 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「照会・検索」押下|-
- r15 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|-
- r18 | CK[3]表示|照会・検索画面|検索結果が0件であること | EV:画面HC
- r19 | OP[4]入力|ダウンロード申請番号|「Z990000002」を入力
- r20 | OP[5]クリック|簡易版|チェック状態にする
- r21 | OP[6]ボタン|「検索結果出力」押下|-
- r22 | CK[7]出力（DL）|帳票|申請・確認情報ファイルがダウンロードできないこと | EV:CSVﾌｧｲﾙ
- r23 | OP[8]クリック|詳細版|チェック状態にする
- r24 | OP[9]ボタン|「検索結果出力」押下|-
- r25 | CK[10]出力（DL）|帳票|申請・確認情報(詳細)ファイルがダウンロードできないこと | EV:CSVﾌｧｲﾙ
- r26 | OP[11]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r27 | OP[12]ボタン|「検索」押下|-
- r28 | CK[13]表示|照会・検索画面|検索結果が1件以上表示されること | EV:画面HC
- r29 | OP[14]入力|ダウンロード申請番号|「Z990000002」を入力
- r30 | OP[15]クリック|簡易版|チェック状態にする
- r31 | OP[16]ボタン|「検索結果出力」押下|-
- r32 | CK[17]出力（DL）|帳票|申請・確認情報ファイルがダウンロードできること | EV:CSVﾌｧｲﾙ
- r33 | OP[18]クリック|詳細版|チェック状態にする
- r34 | OP[19]ボタン|「検索結果出力」押下|-
- r35 | CK[20]出力（DL）|帳票|申請・確認情報(詳細)ファイルがダウンロードできること | EV:CSVﾌｧｲﾙ
- r36 | OP[21]入力|各項目に入力|【別紙】操作内容 入力内容：３参照
- r37 | OP[22]ボタン|「検索」押下|
- r38 | CK[23]表示|不備一覧画面|検索結果が1000件表示されること | EV:画面HC
- r39 | OP[24]ボタン|「次頁」押下|
- r40 | CK[25]表示|不備一覧画面|2ページ目の申込情報が表示されること | EV:画面HC
- r41 | OP[26]ボタン|「前頁」押下|
- r42 | CK[27]表示|不備一覧画面|1ページ目の申込情報が表示されること | EV:画面HC
- r43 | OP[28]入力|ダウンロード申請番号|「Z990000002」を入力
- r44 | OP[29]クリック|簡易版|チェック状態にする
- r45 | OP[30]ボタン|「検索結果出力」押下|-
- r46 | CK[31]出力（DL）|帳票|申請・確認情報ファイルがダウンロードできること | EV:CSVﾌｧｲﾙ
- r47 | OP[32]クリック|詳細版|チェック状態にする
- r48 | OP[33]ボタン|「検索結果出力」押下|-
- r49 | CK[34]出力（DL）|帳票|申請・確認情報(詳細)ファイルがダウンロードできること | EV:CSVﾌｧｲﾙ
- r50 | OP[35]入力|各項目に入力|【別紙】操作内容 入力内容：4参照
- r51 | OP[36]ボタン|「検索」押下|
- r52 | CK[37]表示|不備一覧画面|検索結果が1001件表示されること | EV:画面HC
- r53 | OP[38]入力|ダウンロード申請番号|「Z990000002」を入力
- r54 | OP[39]クリック|簡易版|チェック状態にする
- r55 | OP[40]ボタン|「検索結果出力」押下|-
- r56 | CK[41]出力（DL）|帳票|申請・確認情報ファイルがダウンロードできること | EV:CSVﾌｧｲﾙ
- r57 | OP[42]クリック|詳細版|チェック状態にする
- r58 | OP[43]ボタン|「検索結果出力」押下|-
- r59 | CK[44]出力（DL）|帳票|申請・確認情報(詳細)ファイルがダウンロードできないこと | EV:CSVﾌｧｲﾙ
- r60 | OP[45]入力|各項目に入力|【別紙】操作内容 入力内容：5参照
- r61 | OP[46]ボタン|「検索」押下|
- r62 | CK[47]表示|不備一覧画面|検索結果が2000件表示されること | EV:画面HC
- r63 | OP[48]入力|ダウンロード申請番号|「Z990000002」を入力
- r64 | OP[49]クリック|簡易版|チェック状態にする
- r65 | OP[50]ボタン|「検索結果出力」押下|-
- r66 | CK[51]出力（DL）|帳票|申請・確認情報ファイルがダウンロードできること | EV:CSVﾌｧｲﾙ
- r67 | OP[52]クリック|詳細版|チェック状態にする
- r68 | OP[53]ボタン|「検索結果出力」押下|-
- r69 | CK[54]出力（DL）|帳票|申請・確認情報(詳細)ファイルがダウンロードできないこと | EV:CSVﾌｧｲﾙ
- r70 | OP[55]入力|各項目に入力|【別紙】操作内容 入力内容：6参照
- r71 | OP[56]ボタン|「検索」押下|
- r72 | CK[57]表示|不備一覧画面|検索結果が2001件表示されること | EV:画面HC
- r73 | OP[58]入力|ダウンロード申請番号|「Z990000002」を入力
- r74 | OP[59]クリック|簡易版|チェック状態にする
- r75 | OP[60]ボタン|「検索結果出力」押下|-
- r76 | CK[61]出力（DL）|帳票|申請・確認情報ファイルがダウンロードできないこと | EV:CSVﾌｧｲﾙ
- r77 | OP[62]クリック|詳細版|チェック状態にする
- r78 | OP[63]ボタン|「検索結果出力」押下|-
- r79 | CK[64]出力（DL）|帳票|申請・確認情報(詳細)ファイルがダウンロードできないこと | EV:CSVﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG14
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 課支社CD
sheets[0]/rows[5][8]: AAAAA
sheets[0]/rows[6][1]: 代理店CD
sheets[0]/rows[6][8]: 2031
sheets[0]/rows[6][31]: ※変更となる可能性あり
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: 課支社CD
sheets[0]/rows[7][8]: ABM62
sheets[0]/rows[7][31]: ※変更となる可能性あり
sheets[0]/rows[8][1]: 代理店CD
sheets[0]/rows[8][8]: 2031
sheets[0]/rows[8][31]: ※変更となる可能性あり
sheets[0]/rows[9][0]: 3
sheets[0]/rows[9][1]: 検索結果の件数件数
sheets[0]/rows[9][8]: 1000件
sheets[0]/rows[9][31]: ※検索結果が1000件となるデータの検索条件を入力して、検索を行う
sheets[0]/rows[10][0]: 4
sheets[0]/rows[10][1]: 検索結果の件数件数
sheets[0]/rows[10][8]: 1001件
sheets[0]/rows[10][31]: ※検索結果が1001件となるデータの検索条件を入力して、検索を行う
sheets[0]/rows[11][0]: 5
sheets[0]/rows[11][1]: 検索結果の件数件数
sheets[0]/rows[11][8]: 2000件
sheets[0]/rows[11][31]: ※検索結果が2000件となるデータの検索条件を入力して、検索を行う
sheets[0]/rows[12][0]: 6
sheets[0]/rows[12][1]: 検索結果の件数件数
sheets[0]/rows[12][8]: 2001件
sheets[0]/rows[12][31]: ※検索結果が2001件となるデータの検索条件を入力して、検索を行う

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "2031"  <- generated.json
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
- policyNo = "AZ11001"  <- auto.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "ABM62"  <- generated.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#route3"  <- auto.json
- startUrl = "/ANB00/ANA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=32: user,pointCheck,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AUTO-E2D0C359  rows 14..15  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SGL-3DB9518B  rows 16..79  status3=coded
  screen=AYG200 帳票 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list" val="" NOTE:0件時表示はモック未再現
  - [fill] fill ダウンロード申請番号 sel="#download_number" val="Z990000002"
  - [check] check 簡易版 sel="#format_check_1" val=""
  - [click] click 検索結果出力 簡易版 sel="#outputCSV" val=""
  - [assert] ast message 帳票 簡易版 sel="#download_confirm_area" val="帳票" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [check] check 詳細版 sel="#format_check_2" val=""
  - [click] click 検索結果出力 詳細版 sel="#outputCSV" val=""
  - [assert] ast message 帳票 詳細版 sel="#download_confirm_area" val="帳票（詳細版）" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [fill] fill 課支社CD 2回目 sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD 2回目 sel="#agent_code" val="252H"
  - [click] click 検索 2回目 sel="#select" val=""
  - [assert] ast display 照会・検索画面 2回目 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 2回目 sel="#download_number" val="Z990000002"
  - [check] check 簡易版 2回目 sel="#format_check_1" val=""
  - [click] click 検索結果出力 簡易版 2回目 sel="#outputCSV" val=""
  - [assert] ast message 帳票 簡易版 2回目 sel="#download_confirm_area" val="帳票" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [check] check 詳細版 2回目 sel="#format_check_2" val=""
  - [click] click 検索結果出力 詳細版 2回目 sel="#outputCSV" val=""
  - [assert] ast message 帳票 詳細版 2回目 sel="#download_confirm_area" val="帳票（詳細版）" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [click] click 次頁 sel="#nextPage" val=""
  - [assert] ast display 2ページ目 sel="#gyoumu_list" val=""
  - [click] click 前頁 sel="#prevPage" val=""
  - [assert] ast display 1ページ目 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 3回目 sel="#download_number" val="Z990000002"
  - [check] check 簡易版 3回目 sel="#format_check_1" val=""
  - [click] click 検索結果出力 簡易版 3回目 sel="#outputCSV" val=""
  - [assert] ast message 帳票 簡易版 3回目 sel="#download_confirm_area" val="帳票" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [check] check 詳細版 3回目 sel="#format_check_2" val=""
  - [click] click 検索結果出力 詳細版 3回目 sel="#outputCSV" val=""
  - [assert] ast message 帳票 詳細版 3回目 sel="#download_confirm_area" val="帳票（詳細版）" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [fill] fill 課支社CD 3回目 sel="#section_code" val="AHE61"
  - [click] click 検索 3回目 sel="#select" val=""
  - [assert] ast display 照会・検索画面 3回目 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 4回目 sel="#download_number" val="Z990000002"
  - [check] check 簡易版 4回目 sel="#format_check_1" val=""
  - [click] click 検索結果出力 簡易版 4回目 sel="#outputCSV" val=""
  - [assert] ast message 帳票 簡易版 4回目 sel="#download_confirm_area" val="帳票" NOTE:非浏览器=真機人工（ダウンロード可否）
  - [check] check 詳細版 4回目 sel="#format_check_2" val=""
  - [click] click 検索結果出力 詳細版 4回目 sel="#outputCSV" val=""
  - [assert] ast message 帳票 詳細版 4回目 sel="#download_confirm_area" val="帳票（詳細版）" NOTE:非浏览器=真機人工（ダウンロード可否）

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SGL-3DB9518B  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|照会・検索画面 file=02_r015_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r18 表示|照会・検索画面 file=03_r018_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r28 表示|照会・検索画面 file=04_r028_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r38 表示|不備一覧画面 file=06_r038_不備一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r40 表示|不備一覧画面 file=07_r040_不備一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r42 表示|不備一覧画面 file=08_r042_不備一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r52 表示|不備一覧画面 file=09_r052_不備一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r62 表示|不備一覧画面 file=10_r062_不備一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r72 表示|不備一覧画面 file=11_r072_不備一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-130-02-001/01_menu.png
- logs/AY-130-02-001/02_r015_照会・検索画面.png
- logs/AY-130-02-001/03_r018_照会・検索画面.png
- logs/AY-130-02-001/04_r028_照会・検索画面.png
- logs/AY-130-02-001/06_r038_不備一覧画面.png
- logs/AY-130-02-001/07_r040_不備一覧画面.png
- logs/AY-130-02-001/08_r042_不備一覧画面.png
- logs/AY-130-02-001/09_r052_不備一覧画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
