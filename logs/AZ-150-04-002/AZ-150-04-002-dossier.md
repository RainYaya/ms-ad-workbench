# AUDIT DOSSIER — AZ-150-04-002

meta: {"domain": "AZ", "company": "AD", "functionName": "（警告終了）", "item": "（Lambda）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-150-04-002.xlsx"}
feasibility: class=C flow=pass manualSteps=12 proxyBlocks=16 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=22 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:（目視確認）
- r16 | OP[1]入力|証券番号|AZ15003
- r17 | OP[2]ボタン|「検索」押下|
- r18 | CK[3]表示|不備一覧画面|事前登録したデータがすべて表示されることを確認 | EV:画面HC
- r19 | OP[4]クリック|No押下|明細番号「00001」
- r20 | CK[5]遷移|不備内容入力画面－更新|「【別紙】事前登録.xlsx」の「データ」シート / No.1参照 /  / 【別紙】表示内容 / 表示内容：1-1参照 | EV:画面HC
- r21 | OP[1]ボタン|印刷|
- r22 | CK[2]遷移|帳票印刷画面| | EV:画面HC
- r23 | OP[1]ボタン|帳票出力|
- r24 | CK[2]出力（DL）|申込書類不備照会・返送票|【別紙】申込書類不備照会・返送票 / 出力内容：1-1参照 | EV:PDFﾌｧｲﾙ
- r25 | OP[3]ボタン|閉じる|
- r26 | CK[4]遷移|不備内容入力画面－更新| | EV:（目視確認）
- r27 | OP[1]ボタン|一覧画面|
- r28 | CK[2]遷移|不備一覧画面| | EV:（目視確認）
- r29 | OP[1]クリック|No押下|明細番号「00002」
- r30 | CK[2]遷移|不備内容入力画面－更新|「【別紙】事前登録.xlsx」の「データ」シート / No.2参照 | EV:画面HC
- r31 | OP[1]ボタン|印刷|
- r32 | CK[2]遷移|帳票印刷画面| | EV:画面HC
- r33 | OP[1]ボタン|帳票出力|
- r34 | CK[2]出力（DL）|申込書類不備照会・返送票|【別紙】申込書類不備照会・返送票 / 出力内容：2-1参照 | EV:PDFﾌｧｲﾙ
- r35 | OP[3]ボタン|閉じる|
- r36 | CK[4]遷移|不備内容入力画面－更新| | EV:（目視確認）
- r37 | OP[1]ボタン|終了|
- r40 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１参照
- r41 | CK[2]その他|操作結果|- | EV:画面HC
- r42 | CK[3]その他|ユーザIDマスタテーブル|事前投入したデータを対象に、バッチ実行後のDBダンプを取得し、実行前後のDBダンプで差分がないこと | EV:DBﾀﾞﾝﾌﾟ
- r43 | CK[4]その他|APログ|警告終了のログが出力されること | EV:APﾛｸﾞ
- r44 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：２参照
- r45 | CK[2]その他|操作結果|- | EV:画面HC
- r46 | CK[3]その他|照会内容マスタテーブル|事前投入したデータを対象に、バッチ実行後のDBダンプを取得し、実行前後のDBダンプで差分がないこと | EV:DBﾀﾞﾝﾌﾟ
- r47 | CK[4]その他|APログ|警告終了のログが出力されること | EV:APﾛｸﾞ
- r48 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：３参照
- r49 | CK[2]その他|操作結果|- | EV:画面HC
- r50 | CK[3]その他|項目マスタテーブル|事前投入したデータを対象に、バッチ実行後のDBダンプを取得し、実行前後のDBダンプで差分がないこと | EV:DBﾀﾞﾝﾌﾟ
- r51 | CK[4]その他|APログ|警告終了のログが出力されること | EV:APﾛｸﾞ
- r52 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：４参照
- r53 | CK[2]その他|操作結果|- | EV:画面HC
- r54 | CK[3]その他|回答内容マスタテーブル|事前投入したデータを対象に、バッチ実行後のDBダンプを取得し、実行前後のDBダンプで差分がないこと | EV:DBﾀﾞﾝﾌﾟ
- r55 | CK[4]その他|APログ|警告終了のログが出力されること | EV:APﾛｸﾞ
- r58 | OP[1]ボタン|「検索」押下|
- r59 | CK[2]遷移|不備一覧画面|初期値 | EV:（目視確認）
- r60 | OP[1]入力|証券番号|AZ15003
- r61 | OP[2]ボタン|「検索」押下|
- r62 | CK[3]表示|不備一覧画面|事前登録したデータがすべて表示されることを確認 | EV:画面HC
- r63 | OP[4]クリック|No押下|明細番号「00001」
- r64 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：1-2参照 | EV:画面HC
- r65 | OP[1]ボタン|印刷|
- r66 | CK[2]遷移|帳票印刷画面| | EV:画面HC
- r67 | OP[1]ボタン|帳票出力|
- r68 | CK[2]出力（DL）|申込書類不備照会・返送票|【別紙】申込書類不備照会・返送票 / 出力内容：1-2参照 | EV:PDFﾌｧｲﾙ
- r69 | OP[3]ボタン|閉じる|
- r70 | CK[4]遷移|不備内容入力画面－更新| | EV:（目視確認）
- r71 | OP[1]ボタン|一覧画面|
- r72 | CK[2]遷移|不備一覧画面| | EV:（目視確認）
- r73 | OP[1]クリック|No押下|明細番号「00002」
- r74 | CK[2]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：2-1参照 | EV:画面HC
- r75 | OP[1]ボタン|印刷|
- r76 | CK[2]遷移|帳票印刷画面| | EV:画面HC
- r77 | OP[1]ボタン|帳票出力|
- r78 | CK[2]出力（DL）|申込書類不備照会・返送票|【別紙】申込書類不備照会・返送票 / 出力内容：2-2参照 | EV:PDFﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AT49
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[2][8]: 新環境
sheets[0]/rows[3][0]: 1
sheets[0]/rows[3][1]: ①以下のファイルがEFS（疑似環境）上に配置されていないことを確認
sheets[0]/rows[4][1]: ファイル
sheets[0]/rows[4][8]: ユーザIDマスタファイル
sheets[0]/rows[5][1]: ②Lambda関数（疑似環境）よりバッチを実行
sheets[0]/rows[6][0]: 2
sheets[0]/rows[6][1]: ①以下のファイルがEFS（疑似環境）上に配置されていないことを確認
sheets[0]/rows[7][1]: ファイル
sheets[0]/rows[7][8]: 照会内容マスタファイル
sheets[0]/rows[8][1]: ②Lambda関数（疑似環境）よりバッチを実行
sheets[0]/rows[9][0]: 3
sheets[0]/rows[9][1]: ①以下のファイルがEFS（疑似環境）上に配置されていないことを確認
sheets[0]/rows[10][1]: ファイル
sheets[0]/rows[10][8]: 項目コードマスタファイル(MS/AD)
sheets[0]/rows[11][8]: 共通項目コードマスタファイル
sheets[0]/rows[12][1]: ②Lambda関数（疑似環境）よりバッチを実行
sheets[0]/rows[13][0]: 4
sheets[0]/rows[13][1]: ①以下のファイルがEFS（疑似環境）上に配置されていないことを確認
sheets[0]/rows[14][1]: ファイル
sheets[0]/rows[14][8]: 回答内容マスタファイル
sheets[0]/rows[15][1]: ②Lambda関数（疑似環境）よりバッチを実行
sheets[0]/rows[18][8]: 現行環境
sheets[0]/rows[19][0]: 1
sheets[0]/rows[19][1]: ①以下のファイルが結合疑似業務DBサーバ（※）上に配置されていないことを確認
sheets[0]/rows[19][31]: ※
sheets[0]/rows[19][32]: 接続情報
sheets[0]/rows[20][1]: ファイル
sheets[0]/rows[20][8]: ユーザIDマスタファイル
sheets[0]/rows[20][31]: IPアドレス
sheets[0]/rows[20][38]: 189.200.120.82
sheets[0]/rows[21][1]: ②結合疑似業務DBサーバ（※）より実行
sheets[0]/rows[21][31]: ユーザ
sheets[0]/rows[21][38]: mhpub01
sheets[0]/rows[22][1]: 実行コマンド
sheets[0]/rows[22][8]: cd /proj/mhkcm/AD/AP/mhk/lib
sheets[0]/rows[22][31]: パスワード
sheets[0]/rows[22][38]: Azpub01mh
sheets[0]/rows[23][8]: java -jar AZB001A.jar
sheets[0]/rows[24][8]: echo $status
sheets[0]/rows[25][8]: 戻り値が1であること
sheets[0]/rows[26][0]: 2
sheets[0]/rows[26][1]: ①以下のファイルが結合疑似業務DBサーバ（※）上に配置されていないことを確認
sheets[0]/rows[27][1]: ファイル
sheets[0]/rows[27][8]: 照会内容マスタファイル
sheets[0]/rows[28][1]: ②結合疑似業務DBサーバ（※）より実行
sheets[0]/rows[29][1]: 実行コマンド
sheets[0]/rows[29][8]: cd /proj/mhkcm/AD/AP/mhk/lib
sheets[0]/rows[30][8]: java -jar AZB005A.jar
sheets[0]/rows[31][8]: echo $status
sheets[0]/rows[32][8]: 戻り値が1であること
sheets[0]/rows[33][0]: 3
sheets[0]/rows[33][1]: ①以下のファイルが結合疑似業務DBサーバ（※）上に配置されていないことを確認
sheets[0]/rows[34][1]: ファイル
sheets[0]/rows[34][8]: 項目コードマスタファイル(MS/AD)
sheets[0]/rows[35][8]: 共通項目コードマスタファイル
sheets[0]/rows[36][1]: ②結合疑似業務DBサーバ（※）より実行
sheets[0]/rows[37][1]: 実行コマンド
sheets[0]/rows[37][8]: cd /proj/mhkcm/AD/AP/mhk/lib
sheets[0]/rows[38][8]: java -jar AZB004A.jar
sheets[0]/rows[39][8]: echo $status
sheets[0]/rows[40][8]: 戻り値が1であること
sheets[0]/rows[41][0]: 4
sheets[0]/rows[41][1]: ①以下のファイルが結合疑似業務DBサーバ（※）上に配置されていないことを確認
sheets[0]/rows[42][1]: ファイル
sheets[0]/rows[42][8]: 回答内容マスタファイル
sheets[0]/rows[43][1]: ②結合疑似業務DBサーバ（※）より実行
sheets[0]/rows[44][1]: 実行コマンド
sheets[0]/rows[44][8]: cd /proj/mhkcm/AD/AP/mhk/lib
sheets[0]/rows[45][8]: java -jar AZB023A.jar
sheets[0]/rows[46][8]: echo $status
sheets[0]/rows[47][8]: 戻り値が1であること
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AK52
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1-1
sheets[1]/rows[2][1]: 不備情報
sheets[1]/rows[3][1]: 1
sheets[1]/rows[3][2]: 回答内容
sheets[1]/rows[3][8]: --（リストより選択してください）--
sheets[1]/rows[4][2]: ※プルダウン内容
sheets[1]/rows[4][8]: テスト回答内容１
sheets[1]/rows[4][31]: 初期選択
sheets[1]/rows[5][8]: テスト回答内容２
sheets[1]/rows[6][8]: テスト回答内容３
sheets[1]/rows[7][8]: テスト回答内容４
sheets[1]/rows[8][8]: テスト回答内容５
sheets[1]/rows[9][8]: テスト回答内容６
sheets[1]/rows[10][8]: 以下、回答入力欄に入力します。
sheets[1]/rows[11][1]: 2
sheets[1]/rows[11][2]: 回答内容
sheets[1]/rows[11][8]: --（リストより選択してください）--
sheets[1]/rows[12][2]: ※プルダウン内容
sheets[1]/rows[12][8]: テスト回答内容１
sheets[1]/rows[13][8]: テスト回答内容２
sheets[1]/rows[14][8]: テスト回答内容３
sheets[1]/rows[15][8]: テスト回答内容４
sheets[1]/rows[16][8]: テスト回答内容５
sheets[1]/rows[17][8]: テスト回答内容６
sheets[1]/rows[17][31]: 初期選択
sheets[1]/rows[18][8]: 以下、回答入力欄に入力します。
sheets[1]/rows[19][0]: 1-2
sheets[1]/rows[19][1]: 登録者
sheets[1]/rows[19][8]: 姓１　ユーザ１
sheets[1]/rows[20][1]: 不備情報
sheets[1]/rows[21][1]: 1
sheets[1]/rows[21][2]: 項目コード
sheets[1]/rows[21][8]: X01
sheets[1]/rows[22][2]: 項目名
sheets[1]/rows[22][8]: テスト項目１
sheets[1]/rows[23][2]: 照会内容
sheets[1]/rows[23][8]: テスト照会内容１
sheets[1]/rows[24][2]: 回答内容
sheets[1]/rows[24][8]: --（リストより選択してください）--
sheets[1]/rows[25][2]: ※プルダウン内容
sheets[1]/rows[25][8]: テスト回答内容１
sheets[1]/rows[25][31]: 初期選択　回答内容マスタの内容が変わらない場合の確認
sheets[1]/rows[26][8]: テスト回答内容２
sheets[1]/rows[26][31]: 回答内容マスタの内容が変わらない場合の確認
sheets[1]/rows[27][8]: テスト回答内容３
sheets[1]/rows[27][31]: 同上
sheets[1]/rows[28][8]: テスト回答内容４
sheets[1]/rows[28][31]: 同上
sheets[1]/rows[29][8]: テスト回答内容５
sheets[1]/rows[29][31]: 同上
sheets[1]/rows[30][8]: テスト回答内容６
sheets[1]/rows[30][31]: 同上
sheets[1]/rows[31][8]: 以下、回答入力欄に入力します。
sheets[1]/rows[31][31]: 同上
sheets[1]/rows[32][1]: 2
sheets[1]/rows[32][2]: 回答内容
sheets[1]/rows[32][8]: --（リストより選択してください）--
sheets[1]/rows[32][31]: 回答内容マスタの内容が変わらない場合の確認
sheets[1]/rows[33][2]: ※プルダウン内容
sheets[1]/rows[33][8]: テスト回答内容１
sheets[1]/rows[33][31]: 同上
sheets[1]/rows[34][8]: テスト回答内容２
sheets[1]/rows[34][31]: 同上
sheets[1]/rows[35][8]: テスト回答内容３
sheets[1]/rows[35][31]: 同上
sheets[1]/rows[36][8]: テスト回答内容４
sheets[1]/rows[36][31]: 同上
sheets[1]/rows[37][8]: テスト回答内容５
sheets[1]/rows[37][31]: 同上
sheets[1]/rows[38][8]: テスト回答内容６
sheets[1]/rows[38][31]: 初期選択　回答内容マスタの内容が変わらない場合の確認
sheets[1]/rows[39][8]: 以下、回答入力欄に入力します。
sheets[1]/rows[40][0]: 2-1
sheets[1]/rows[40][1]: 登録者
sheets[1]/rows[40][8]: 姓２　ユーザ２
sheets[1]/rows[40][31]: ユーザIDマスタの内容が変わらない場合の確認
sheets[1]/rows[41][1]: 不備情報
sheets[1]/rows[42][1]: 1
sheets[1]/rows[42][2]: 項目コード
sheets[1]/rows[42][8]: X02
sheets[1]/rows[43][2]: 項目名
sheets[1]/rows[43][8]: テスト項目２
sheets[1]/rows[43][31]: 項目マスタの内容が変わらない場合の確認
sheets[1]/rows[44][2]: 照会内容
sheets[1]/rows[44][8]: テスト照会内容２
sheets[1]/rows[44][31]: 照会内容マスタの内容が変わらない場合の確認
sheets[1]/rows[45][1]: 2
sheets[1]/rows[45][2]: 項目コード
sheets[1]/rows[45][8]: X03
sheets[1]/rows[46][2]: 項目名
sheets[1]/rows[46][8]: テスト項目３
sheets[1]/rows[46][31]: 項目マスタの内容が変わらない場合の確認
sheets[1]/rows[47][2]: 照会内容
sheets[1]/rows[47][8]: テスト照会内容３
sheets[1]/rows[47][31]: 照会内容マスタの内容が変わらない場合の確認
sheets[1]/rows[48][1]: 3
sheets[1]/rows[48][2]: 項目コード
sheets[1]/rows[48][8]: X04
sheets[1]/rows[49][2]: 項目名
sheets[1]/rows[49][8]: テスト項目４
sheets[1]/rows[49][31]: 項目マスタの内容が変わらない場合の確認
sheets[1]/rows[50][2]: 照会内容
sheets[1]/rows[50][8]: テスト照会内容４
sheets[1]/rows[50][31]: 照会内容マスタの内容が変わらない場合の確認

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
- sectionCode = "AHE61"  <- auto.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=34: user,pointCheck,sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-SEARCH-LIST  rows 14..15  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-SGL-FE33E38E  rows 16..16  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="params.policyNo"
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
### BLK-SGL-1ECE1684  rows 23..30  status3=coded
  screen=AZG901 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 印刷 sel="input[name='print']" val=""
  - [popup] ast 遷移 帳票印刷画面(popup) sel="" val=""
  - [click] click 帳票出力 sel="#Print" val="" (popup)
  - [assert] ast 帳票 申込書類不備照会・返送票 sel="#Print" val="" (popup) NOTE:帳票PDF=真機人工（mockは帳票未生成）
  - [click] click 閉じる sel="input[name='ClosePopup']" val="" (popup)
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
  - [click] click 一覧画面 sel="#act101to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#table07" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新(2回目) sel="input[name='update']" val=""
### BLK-AUTO-C8BDC3F2  rows 31..32  status3=coded
  screen=AZG101->帳票 file=block-selectors-az-update.json
  - [click] click 印刷 sel="input[name='print']" val=""
  - [assert] ast 帳票印刷遷移 sel="input[name='update']" val="" NOTE:帳票画面=AMA14 popup; mock简化
### BLK-SGL-2995218F  rows 33..37  status3=coded
  screen=AZG901 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 印刷 sel="input[name='print']" val=""
  - [popup] ast 遷移 帳票印刷画面(popup) sel="" val=""
  - [click] click 帳票出力 sel="#Print" val="" (popup)
  - [assert] ast 帳票 申込書類不備照会・返送票 sel="#Print" val="" (popup) NOTE:帳票PDF=真機人工
  - [click] click 閉じる sel="input[name='ClosePopup']" val="" (popup)
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
  - [click] click 終了 sel="input[value='終　了']" val=""
### BLK-AZ-BATCH-RUN-VERIFY  rows 40..41  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-4EB596EB  rows 42..43  status3=coded
  screen=BATCH(ユーザIDマスタ取込) file=block-selectors-batch-slice.json
  - [assert] ast ユーザIDマスタ取込＋ユーザIDマスタテーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:ユーザIDマスタ取込＋ユーザIDマスタテーブル反映/APログ=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 44..45  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-ECBA7661  rows 46..47  status3=coded
  screen=BATCH(照会内容マスタ取込) file=block-selectors-batch-slice.json
  - [assert] ast 照会内容マスタ取込＋照会内容マスタテーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:照会内容マスタ取込＋照会内容マスタテーブル反映/APログ=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 48..49  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-E3AD1DD9  rows 50..51  status3=coded
  screen=BATCH(項目テーブル取込) file=block-selectors-batch-slice.json
  - [assert] ast 項目テーブル取込＋項目マスタテーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:項目テーブル取込＋項目マスタテーブル反映/APログ=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 52..53  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-6BEAE496  rows 54..55  status3=coded
  screen=BATCH(回答内容マスタ取込) file=block-selectors-batch-slice.json
  - [assert] ast 回答内容マスタ取込＋回答内容マスタテーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:回答内容マスタ取込＋回答内容マスタテーブル反映/APログ=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-MENU-SEARCH-LIST  rows 58..59  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-SGL-FE33E38E  rows 60..60  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="params.policyNo"
  - [assert] ast 入力内容 sel="#policy_number" val=""
### BLK-AUTO-9EB5A282  rows 61..64  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
### BLK-AUTO-C8BDC3F2  rows 65..66  status3=coded
  screen=AZG101->帳票 file=block-selectors-az-update.json
  - [click] click 印刷 sel="input[name='print']" val=""
  - [assert] ast 帳票印刷遷移 sel="input[name='update']" val="" NOTE:帳票画面=AMA14 popup; mock简化
### BLK-SGL-1ECE1684  rows 67..74  status3=coded
  screen=AZG901 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 印刷 sel="input[name='print']" val=""
  - [popup] ast 遷移 帳票印刷画面(popup) sel="" val=""
  - [click] click 帳票出力 sel="#Print" val="" (popup)
  - [assert] ast 帳票 申込書類不備照会・返送票 sel="#Print" val="" (popup) NOTE:帳票PDF=真機人工（mockは帳票未生成）
  - [click] click 閉じる sel="input[name='ClosePopup']" val="" (popup)
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
  - [click] click 一覧画面 sel="#act101to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#table07" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新(2回目) sel="input[name='update']" val=""
### BLK-AUTO-C8BDC3F2  rows 75..76  status3=coded
  screen=AZG101->帳票 file=block-selectors-az-update.json
  - [click] click 印刷 sel="input[name='print']" val=""
  - [assert] ast 帳票印刷遷移 sel="input[name='update']" val="" NOTE:帳票画面=AMA14 popup; mock简化
### BLK-SGL-1CC6C3EC  rows 77..78  status3=coded
  screen=AZG901 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備内容入力画面-更新 sel="" val=""
  - [click] click 印刷 sel="input[name='print']" val=""
  - [popup] ast 遷移 帳票印刷画面(popup) sel="" val=""
  - [click] click 帳票出力 sel="#Print" val="" (popup)
  - [assert] ast 帳票 申込書類不備照会・返送票 sel="#Print" val="" (popup) NOTE:帳票PDF=真機人工（mockは帳票未生成）

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SGL-FE33E38E  pass  rows None..None
- BLK-AUTO-9EB5A282  pass  rows None..None
- BLK-AUTO-C8BDC3F2  pass  rows None..None
- BLK-SGL-1ECE1684  pass  rows None..None
- BLK-AUTO-C8BDC3F2  pass  rows None..None
- BLK-SGL-2995218F  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SGL-4EB596EB  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SGL-ECBA7661  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SGL-E3AD1DD9  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SGL-6BEAE496  pass  rows None..None
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SGL-FE33E38E  pass  rows None..None
- BLK-AUTO-9EB5A282  pass  rows None..None
- BLK-AUTO-C8BDC3F2  pass  rows None..None
- BLK-SGL-1ECE1684  pass  rows None..None
- BLK-AUTO-C8BDC3F2  pass  rows None..None
- BLK-SGL-1CC6C3EC  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r18 表示|不備一覧画面 file=02_r018_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r20 遷移|不備内容入力画面-更新 file=05_r020_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r22 遷移|帳票印刷画面 file=08_r022_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html
- [OK ] r30 遷移|不備内容入力画面-更新 file=09_r030_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r32 遷移|帳票印刷画面 file=10_r032_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html
- [OK ] r41 その他|操作結果 file=11_r041_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r45 その他|操作結果 file=12_r045_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r49 その他|操作結果 file=13_r049_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r53 その他|操作結果 file=14_r053_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r62 表示|不備一覧画面 file=26_r062_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r64 遷移|不備内容入力画面-更新 file=29_r064_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r66 遷移|帳票印刷画面 file=32_r066_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html
- [OK ] r74 遷移|不備内容入力画面-更新 file=33_r074_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r76 遷移|帳票印刷画面 file=34_r076_帳票印刷画面.png url=...http://127.0.0.1:10097/AMB/AMA14.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-150-04-002/01_menu.png
- logs/AZ-150-04-002/02_r018_不備一覧画面.png
- logs/AZ-150-04-002/05_r020_不備内容入力画面-更新.png
- logs/AZ-150-04-002/08_r022_帳票印刷画面.png
- logs/AZ-150-04-002/09_r030_不備内容入力画面-更新.png
- logs/AZ-150-04-002/10_r032_帳票印刷画面.png
- logs/AZ-150-04-002/11_r041_操作結果.png
- logs/AZ-150-04-002/12_r045_操作結果.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
