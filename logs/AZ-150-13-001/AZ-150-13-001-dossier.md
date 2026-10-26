# AUDIT DOSSIER — AZ-150-13-001

meta: {"domain": "AZ", "company": "MS", "functionName": "年度末移管（正常終了）", "item": "移管（月次）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-150-13-001.xlsx"}
feasibility: class=C flow=pass manualSteps=31 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=4 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|検索|
- r15 | CK[2]遷移|不備一覧画面| | EV:（目視確認）
- r16 | OP[1]入力|証券番号|AZ15013001
- r17 | OP[]|関連代理店|未チェック
- r18 | OP[]|営業対応状況|すべてチェック
- r19 | OP[2]ボタン|検索|
- r20 | CK[3]表示|不備一覧画面|「【別紙】期待値」シート：「表示内容」　① | EV:画面HC
- r21 | OP[1]その他|「【別紙】操作内容」①|
- r22 | CK[2]その他|申込書テーブル|「【別紙】期待値」シート：「テーブル」　① | EV:DBﾀﾞﾝﾌﾟ
- r23 | CK[3]その他|TODO連携テーブル|「【別紙】期待値」シート：「テーブル」　② | EV:DBﾀﾞﾝﾌﾟ
- r24 | CK[4]その他|移管情報テーブル|「【別紙】期待値」シート：「テーブル」　③ | EV:DBﾀﾞﾝﾌﾟ
- r25 | CK[5]その他|統合代理店情報ファイル|出力されないことを確認する | EV:CSVﾌｧｲﾙ
- r26 | CK[6]その他|移管エラー情報ファイル|出力されないことを確認する | EV:CSVﾌｧｲﾙ
- r27 | CK[7]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r28 | OP[1]その他|「【別紙】操作内容」②|
- r29 | CK[2]その他|TODO連携テーブル|「【別紙】期待値」シート：「テーブル」　④ | EV:DBﾀﾞﾝﾌﾟ
- r30 | CK[3]その他|移管情報テーブル|「【別紙】期待値」シート：「テーブル」　⑤ | EV:DBﾀﾞﾝﾌﾟ
- r31 | CK[4]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r32 | OP[1]ボタン|検索|
- r33 | CK[2]遷移|不備一覧画面| | EV:（目視確認）
- r34 | OP[1]入力|証券番号|AZ15013001
- r35 | OP[]|関連代理店|未チェック
- r36 | OP[]|営業対応状況|すべてチェック
- r37 | OP[2]ボタン|検索|
- r38 | CK[3]表示|不備一覧画面|「【別紙】期待値」シート：「表示内容」　② | EV:画面HC
- r39 | OP[1]その他|「【別紙】操作内容」③|
- r40 | CK[2]その他|不備項目集計テーブル| | EV:DBﾀﾞﾝﾌﾟ
- r41 | CK[3]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r42 | OP[1]その他|「【別紙】操作内容」④|
- r43 | CK[2]その他|不備内容集計テーブル| | EV:DBﾀﾞﾝﾌﾟ
- r44 | CK[3]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r45 | OP[1]その他|「【別紙】操作内容」⑤|
- r46 | CK[2]その他|登録件数集計テーブル| | EV:DBﾀﾞﾝﾌﾟ
- r47 | CK[3]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r48 | OP[1]その他|「【別紙】操作内容」⑥|
- r49 | CK[2]その他|フリーコード集計テーブル| | EV:DBﾀﾞﾝﾌﾟ
- r50 | CK[3]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r51 | OP[1]その他|「【別紙】操作内容」⑦|
- r52 | CK[2]その他|募集人集計テーブル| | EV:DBﾀﾞﾝﾌﾟ
- r53 | CK[3]その他|バッチログ|エラー件数が0件であること | EV:APﾛｸﾞ
- r54 | OP[1]ボタン|集計|
- r55 | CK[2]遷移|不備集計画面| | EV:（目視確認）
- r56 | OP[1]入力|部店課支社コード|A4T
- r57 | OP[]|登録年月|2027年3月～2027年3月
- r58 | CK[2]その他|不備集計画面|入力内容の証跡 | EV:画面HC
- r59 | OP[3]ボタン|不備項目集計出力|
- r60 | CK[4]出力（DL）|不備項目集計情報ファイル|移管前の部店課支社、代理店コードで集計した内容が出力されることを確認する | EV:CSVﾌｧｲﾙ
- r61 | OP[5]ボタン|不備内容集計出力|
- r62 | CK[6]出力（DL）|不備内容集計情報ファイル|移管前の部店課支社、代理店コードで集計した内容が出力されることを確認する | EV:CSVﾌｧｲﾙ
- r63 | OP[7]ボタン|登録件数集計出力|
- r64 | CK[8]出力（DL）|登録件数集計情報ファイル|移管前の部店課支社、代理店コードで集計した内容が出力されることを確認する | EV:CSVﾌｧｲﾙ
- r65 | OP[9]ボタン|フリーコード集計出力|
- r66 | CK[10]出力（DL）|フリーコード集計情報ファイル|移管前の部店課支社、代理店コードで集計した内容が出力されることを確認する | EV:CSVﾌｧｲﾙ
- r67 | OP[11]ボタン|募集人集計出力|
- r68 | CK[12]出力（DL）|募集人集計情報ファイル|移管前の部店課支社、代理店コードで集計した内容が出力されることを確認する | EV:CSVﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:Y38
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[3][1]: 実行コマンド
sheets[0]/rows[3][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[4][8]: java -jar AZB021.jar
sheets[0]/rows[5][8]: echo $status
sheets[0]/rows[6][8]: 戻り値が0であること
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[8][1]: 実行コマンド
sheets[0]/rows[8][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[9][8]: java -jar AZB028.jar
sheets[0]/rows[10][8]: echo $status
sheets[0]/rows[11][8]: 戻り値が0であること
sheets[0]/rows[12][0]: 3
sheets[0]/rows[12][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[13][1]: 実行コマンド
sheets[0]/rows[13][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[14][8]: java -jar AZB006.jar 202704
sheets[0]/rows[15][8]: echo $status
sheets[0]/rows[16][8]: 戻り値が0であること
sheets[0]/rows[17][0]: 4
sheets[0]/rows[17][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[18][1]: 実行コマンド
sheets[0]/rows[18][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[19][8]: java -jar AZB007.jar 202704
sheets[0]/rows[20][8]: echo $status
sheets[0]/rows[21][8]: 戻り値が0であること
sheets[0]/rows[22][0]: 5
sheets[0]/rows[22][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[23][1]: 実行コマンド
sheets[0]/rows[23][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[24][8]: java -jar AZB008.jar 202704
sheets[0]/rows[25][8]: echo $status
sheets[0]/rows[26][8]: 戻り値が0であること
sheets[0]/rows[27][0]: 6
sheets[0]/rows[27][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[28][1]: 実行コマンド
sheets[0]/rows[28][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[29][8]: java -jar AZB012.jar 202704
sheets[0]/rows[30][8]: echo $status
sheets[0]/rows[31][8]: 戻り値が0であること
sheets[0]/rows[32][0]: 7
sheets[0]/rows[32][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[33][1]: 実行コマンド
sheets[0]/rows[33][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[34][8]: java -jar AZB015.jar 202704
sheets[0]/rows[35][8]: echo $status
sheets[0]/rows[36][8]: 戻り値が0であること

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
### BLK-SHR-6F09B48C  rows 16..31  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="params.policyNo"
  - [click] click 関連代理店 sel="#relation_agent" val=""
  - [fill] input 代理店コード(mock company_kbn未設定のため必須) sel="#agent_code" val="params.agentCode"
  - [click] click 営業対応状況 sel="#status_code_2" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [assert] ast 課支社代理店情報移管バッチ処理 別紙操作① sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast 申込書テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast TODO連携テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast 移管情報テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast 統合代理店情報ファイル sel="#table07" val="" NOTE:非浏览器=真機人工（未出力確認）
  - [assert] ast 移管エラー情報ファイル sel="#table07" val="" NOTE:非浏览器=真機人工（未出力確認）
  - [assert] ast バッチログ sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
  - [assert] ast ToDo再送設定バッチ処理 別紙操作② sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast TODO連携テーブル(再送) sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast 移管情報テーブル(再送) sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast バッチログ(再送) sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
### BLK-AZ-MENU-SEARCH-LIST  rows 32..33  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-SHR-269893EF  rows 34..68  status3=coded
  screen=AZG201 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="params.policyNo"
  - [click] click 関連代理店 sel="#relation_agent" val=""
  - [fill] input 代理店コード(mock company_kbn未設定のため必須) sel="#agent_code" val="params.agentCode"
  - [click] click 営業対応状況 sel="#status_code_2" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [assert] ast 不備項目集計バッチ処理 別紙操作③ sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast 不備項目集計テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast バッチログ(不備項目) sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
  - [assert] ast 不備内容集計バッチ処理 別紙操作④ sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast 不備内容集計テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast バッチログ(不備内容) sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
  - [assert] ast 登録件数集計バッチ処理 別紙操作⑤ sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast 登録件数集計テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast バッチログ(登録件数) sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
  - [assert] ast フリーコード集計バッチ処理 別紙操作⑥ sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast フリーコード集計テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast バッチログ(フリーコード) sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
  - [assert] ast 募集人集計バッチ処理 別紙操作⑦ sel="#table07" val="" NOTE:非浏览器=真機人工（バッチ実行）
  - [assert] ast 募集人集計テーブル sel="#table07" val="" NOTE:非浏览器=真機人工
  - [assert] ast バッチログ(募集人) sel="#table07" val="" NOTE:非浏览器=真機人工（エラー件数0件）
  - [goto] goto start screen 申込書品質管理メニュー sel="" val=""
  - [click] click 集計 sel="#act001to201" val=""
  - [assert] ast 遷移 不備集計画面 sel="#OutputSumupFieldId" val=""
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [fill] input 代理店コード sel="#agent_code" val="params.agentCode"
  - [fill] input 登録年月From(年) sel="#from_registration_year" val="2026"
  - [fill] input 登録年月From(月) sel="#from_registration_month" val="11"
  - [fill] input 登録年月To(年) sel="#to_registration_year" val="2026"
  - [fill] input 登録年月To(月) sel="#to_registration_month" val="11"
  - [assert] ast 不備集計画面 入力内容 sel="#OutputSumupFieldId" val=""
  - [click] click 不備項目集計出力 sel="#OutputSumupFieldId" val=""
  - [assert] ast 不備項目集計情報ファイル sel="#OutputSumupContentsId" val="" NOTE:出力ファイル(DL)=真機人工（mockは再表示）
  - [fill] input 部店課支社コード(再入力) sel="#section_code" val="params.sectionCode"
  - [fill] input 代理店コード(再入力) sel="#agent_code" val="params.agentCode"
  - [fill] input 登録年月From(再入力) sel="#from_registration_year" val="2026"
  - [fill] input 登録月From(再入力) sel="#from_registration_month" val="11"
  - [fill] input 登録年To(再入力) sel="#to_registration_year" val="2026"
  - [fill] input 登録月To(再入力) sel="#to_registration_month" val="11"
  - [click] click 不備内容集計出力 sel="#OutputSumupContentsId" val=""
  - [assert] ast 不備内容集計情報ファイル sel="#OutputSumupRegistCountId" val="" NOTE:出力ファイル(DL)=真機人工
  - [fill] input 部店課支社コード(再入力2) sel="#section_code" val="params.sectionCode"
  - [fill] input 代理店コード(再入力2) sel="#agent_code" val="params.agentCode"
  - [fill] input 登録年From(再入力2) sel="#from_registration_year" val="2026"
  - [fill] input 登録月From(再入力2) sel="#from_registration_month" val="11"
  - [fill] input 登録年To(再入力2) sel="#to_registration_year" val="2026"
  - [fill] input 登録月To(再入力2) sel="#to_registration_month" val="11"
  - [click] click 登録件数集計出力 sel="#OutputSumupRegistCountId" val=""
  - [assert] ast 登録件数集計情報ファイル sel="#OutputSumupFreeCodeId" val="" NOTE:出力ファイル(DL)=真機人工
  - [fill] input 部店課支社コード(再入力3) sel="#section_code" val="params.sectionCode"
  - [fill] input 代理店コード(再入力3) sel="#agent_code" val="params.agentCode"
  - [fill] input 登録年From(再入力3) sel="#from_registration_year" val="2026"
  - [fill] input 登録月From(再入力3) sel="#from_registration_month" val="11"
  - [fill] input 登録年To(再入力3) sel="#to_registration_year" val="2026"
  - [fill] input 登録月To(再入力3) sel="#to_registration_month" val="11"
  - [click] click フリーコード集計出力 sel="#OutputSumupFreeCodeId" val=""
  - [assert] ast フリーコード集計情報ファイル sel="#OutputSumupFieldAgentId" val="" NOTE:出力ファイル(DL)=真機人工
  - [fill] input 部店課支社コード(再入力4) sel="#section_code" val="params.sectionCode"
  - [fill] input 代理店コード(再入力4) sel="#agent_code" val="params.agentCode"
  - [fill] input 登録年From(再入力4) sel="#from_registration_year" val="2026"
  - [fill] input 登録月From(再入力4) sel="#from_registration_month" val="11"
  - [fill] input 登録年To(再入力4) sel="#to_registration_year" val="2026"
  - [fill] input 登録月To(再入力4) sel="#to_registration_month" val="11"
  - [click] click 募集人集計出力 sel="#OutputSumupFieldAgentId" val=""
  - [assert] ast 募集人集計情報ファイル sel="#OutputSumupFieldId" val="" NOTE:出力ファイル(DL)=真機人工
  - [goto] goto 不備集計画面 sel="" val=""
  - [assert] ast 不備集計画面 sel="#mhk_MHKPRForm" val=""

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SHR-6F09B48C  pass  rows None..None
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SHR-269893EF  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r20 表示|不備一覧画面 file=02_r020_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r38 表示|不備一覧画面 file=03_r038_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r58 その他|不備集計画面 file=07_r058_不備集計画面.png url=...http://127.0.0.1:10097/AMB/AMA08.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-150-13-001/01_menu.png
- logs/AZ-150-13-001/02_r020_不備一覧画面.png
- logs/AZ-150-13-001/03_r038_不備一覧画面.png
- logs/AZ-150-13-001/07_r058_不備集計画面.png
- logs/AZ-150-13-001/08_BLK-SHR-269893EF.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
