# AUDIT DOSSIER — AZ-150-07-001

meta: {"domain": "AZ", "company": "MS", "functionName": "（正常終了）", "item": "集計（月次）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-150-07-001.xlsx"}
feasibility: class=B flow=pass manualSteps=18 proxyBlocks=12 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=12 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１参照
- r15 | CK[2]その他|操作結果|- | EV:画面HC
- r16 | CK[3]その他|不備項目集計テーブル|【別紙】期待値.xlsx　通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ
- r17 | CK[4]その他|APログ|登録件数が想定通りであること | EV:APﾛｸﾞ
- r18 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：２参照
- r19 | CK[2]その他|操作結果|- | EV:画面HC
- r20 | CK[3]その他|不備内容集計テーブル|【別紙】期待値.xlsx　通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ
- r21 | CK[4]その他|APログ|登録件数が想定通りであること | EV:APﾛｸﾞ
- r22 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：３参照
- r23 | CK[2]その他|操作結果|- | EV:画面HC
- r24 | CK[3]その他|登録件数集計テーブル|【別紙】期待値.xlsx　通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ
- r25 | CK[4]その他|APログ|登録件数が想定通りであること | EV:APﾛｸﾞ
- r26 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：４参照
- r27 | CK[2]その他|操作結果|- | EV:画面HC
- r28 | CK[3]その他|フリーコード集計テーブル|【別紙】期待値.xlsx　通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ
- r29 | CK[4]その他|APログ|登録件数が想定通りであること | EV:APﾛｸﾞ
- r30 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：５参照
- r31 | CK[2]その他|操作結果|- | EV:画面HC
- r32 | CK[3]その他|申込書テーブル|【別紙】期待値.xlsx　通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ
- r33 | CK[4]その他|APログ|引込件数が想定通りであること | EV:APﾛｸﾞ
- r34 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：６参照
- r35 | CK[2]その他|操作結果|- | EV:画面HC
- r36 | CK[3]その他|募集人集計テーブル|【別紙】期待値.xlsx　通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ
- r37 | CK[4]その他|APログ|登録件数が想定通りであること | EV:APﾛｸﾞ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AQ29
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[2][1]: 新環境：バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[3][1]: 現行環境：結合疑似業務DBサーバ（※1）より実行
sheets[0]/rows[4][0]: 1
sheets[0]/rows[4][1]: 実行コマンド
sheets[0]/rows[4][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[4][28]: ※1　接続情報
sheets[0]/rows[5][8]: java -jar AZB006.jar 202611（※2）
sheets[0]/rows[5][28]: IPアドレス
sheets[0]/rows[5][35]: 189.200.120.82
sheets[0]/rows[6][8]: echo $status
sheets[0]/rows[6][28]: ユーザ
sheets[0]/rows[6][35]: mhpub01
sheets[0]/rows[7][8]: 戻り値が0であること
sheets[0]/rows[7][28]: パスワード
sheets[0]/rows[7][35]: Azpub01mh
sheets[0]/rows[8][0]: 2
sheets[0]/rows[8][1]: 実行コマンド
sheets[0]/rows[8][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[9][8]: java -jar AZB007.jar 202611（※2）
sheets[0]/rows[10][8]: echo $status
sheets[0]/rows[10][28]: ※2　集計対象は「2026年10月」
sheets[0]/rows[11][8]: 戻り値が0であること
sheets[0]/rows[12][0]: 3
sheets[0]/rows[12][1]: 実行コマンド
sheets[0]/rows[12][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[13][8]: java -jar AZB008.jar 202611（※2）
sheets[0]/rows[14][8]: echo $status
sheets[0]/rows[15][8]: 戻り値が0であること
sheets[0]/rows[16][0]: 4
sheets[0]/rows[16][1]: 実行コマンド
sheets[0]/rows[16][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[17][8]: java -jar AZB012.jar 202611（※2）
sheets[0]/rows[18][8]: echo $status
sheets[0]/rows[19][8]: 戻り値が0であること
sheets[0]/rows[20][0]: 5
sheets[0]/rows[20][1]: 実行コマンド
sheets[0]/rows[20][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[21][8]: java -jar AZB016.jar 202611（※2）
sheets[0]/rows[22][8]: echo $status
sheets[0]/rows[23][8]: 戻り値が0であること
sheets[0]/rows[24][0]: 6
sheets[0]/rows[24][1]: 実行コマンド
sheets[0]/rows[24][8]: cd /proj/mhkcm/MS/AP/mhk/lib
sheets[0]/rows[25][8]: java -jar AZB015.jar 202611（※2）
sheets[0]/rows[26][8]: echo $status
sheets[0]/rows[27][8]: 戻り値が0であること

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
### BLK-AZ-BATCH-RUN-VERIFY  rows 14..15  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-VERIFY  rows 16..17  status3=coded
  screen=BATCH(不備項目集計) file=block-selectors-batch-slice.json
  - [assert] ast 不備項目集計バッチ実行＋テーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:不備項目集計バッチ実行＋集計テーブル反映/APログ件数=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 18..19  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-C649ACE4  rows 20..21  status3=coded
  screen=BATCH(不備内容集計) file=block-selectors-batch-slice.json
  - [assert] ast 不備内容集計バッチ実行＋テーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:不備内容集計バッチ実行＋集計テーブル反映/APログ件数=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 22..23  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-5CEC3483  rows 24..25  status3=coded
  screen=BATCH(登録件数集計) file=block-selectors-batch-slice.json
  - [assert] ast 登録件数集計バッチ実行＋テーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:登録件数集計バッチ実行＋集計テーブル反映/APログ件数=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 26..27  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-2EEC5A3D  rows 28..29  status3=coded
  screen=BATCH(フリーコード集計) file=block-selectors-batch-slice.json
  - [assert] ast フリーコード集計バッチ実行＋テーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:フリーコード集計バッチ実行＋集計テーブル反映/APログ件数=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 30..31  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-121DF781  rows 32..33  status3=coded
  screen=BATCH(募集人情報引込) file=block-selectors-batch-slice.json
  - [assert] ast 募集人情報引込バッチ実行＋テーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:募集人情報引込バッチ実行＋集計テーブル反映/APログ件数=非浏览器=真機人工（mockは画面在位で代理）
### BLK-AZ-BATCH-RUN-VERIFY  rows 34..35  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SHR-305661D1  rows 36..37  status3=coded
  screen=BATCH(募集人集計) file=block-selectors-batch-slice.json
  - [assert] ast 募集人集計バッチ実行＋テーブル/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:募集人集計バッチ実行＋集計テーブル反映/APログ件数=非浏览器=真機人工（mockは画面在位で代理）

## 5. 本次运行结果（块级）
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-AZ-BATCH-VERIFY  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SHR-C649ACE4  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SHR-5CEC3483  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SHR-2EEC5A3D  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SHR-121DF781  pass  rows None..None
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SHR-305661D1  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 その他|操作結果 file=02_r015_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html
- [OK ] r19 その他|操作結果 file=04_r019_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html
- [OK ] r23 その他|操作結果 file=05_r023_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html
- [OK ] r27 その他|操作結果 file=07_r027_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html
- [OK ] r31 その他|操作結果 file=08_r031_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html
- [OK ] r35 その他|操作結果 file=10_r035_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-150-07-001/01_menu.png
- logs/AZ-150-07-001/02_r015_操作結果.png
- logs/AZ-150-07-001/04_r019_操作結果.png
- logs/AZ-150-07-001/05_r023_操作結果.png
- logs/AZ-150-07-001/07_r027_操作結果.png
- logs/AZ-150-07-001/08_r031_操作結果.png
- logs/AZ-150-07-001/10_r035_操作結果.png
- logs/AZ-150-07-001/19_BLK-SHR-305661D1.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
