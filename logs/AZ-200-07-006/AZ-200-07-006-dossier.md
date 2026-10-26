# AUDIT DOSSIER — AZ-200-07-006

meta: {"domain": "AZ", "company": "MS", "functionName": "タイムゾーン：バッチでファイル出力（非Lambda）", "item": "共通", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-200-07-006.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=boundary.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１参照
- r15 | CK[2]その他|操作結果|- | EV:画面HC
- r16 | CK[3]その他|大樹生命連携データファイル|【別紙】期待値　参照 | EV:CSVﾌｧｲﾙ
- r17 | CK[4]その他|APログ|操作内容1-1の時刻とずれがないこと | EV:APﾛｸﾞ
- r18 | CK[5]その他|DBログ|操作内容1-1の時刻とずれがないこと | EV:DBﾛｸﾞ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:BU9
sheets[0]/rows[0][0]: ○テストデータ作成
sheets[0]/rows[2][1]: 申込書テーブル
sheets[0]/rows[3][1]: APPLICATION_FORM_TABLE
sheets[0]/rows[4][23]: （数式：登録日+7）
sheets[0]/rows[4][35]: 営業：未対応
sheets[0]/rows[4][36]: 代理店：未対応
sheets[0]/rows[4][38]: 代理店
sheets[0]/rows[4][40]: （数式：登録日+1）
sheets[0]/rows[4][60]: （数式：代理店連携日と同値）
sheets[0]/rows[5][1]: 論理項目名
sheets[0]/rows[5][2]: 申込書ID
sheets[0]/rows[5][3]: 入力区分
sheets[0]/rows[5][4]: 大種目コード
sheets[0]/rows[5][5]: 保険種類
sheets[0]/rows[5][6]: レイアウト区分
sheets[0]/rows[5][7]: 証券番号
sheets[0]/rows[5][8]: 明細番号
sheets[0]/rows[5][9]: 契約者名
sheets[0]/rows[5][10]: 部店課支社コード
sheets[0]/rows[5][11]: 代理店コード
sheets[0]/rows[5][12]: 代理店サブコード
sheets[0]/rows[5][13]: フリーコード1
sheets[0]/rows[5][14]: 募集人ID
sheets[0]/rows[5][15]: 日報部課代理店コード
sheets[0]/rows[5][16]: 登録部課コード
sheets[0]/rows[5][17]: 保険始期日
sheets[0]/rows[5][18]: 保険満期日
sheets[0]/rows[5][19]: 異動日
sheets[0]/rows[5][20]: 新更変・他
sheets[0]/rows[5][21]: 計上年月
sheets[0]/rows[5][22]: 日報／送付
sheets[0]/rows[5][23]: 回答締切日
sheets[0]/rows[5][24]: 代理店対応フラグ
sheets[0]/rows[5][25]: 帳票通信欄
sheets[0]/rows[5][26]: 社内メモ欄
sheets[0]/rows[5][27]: 照会票印刷日
sheets[0]/rows[5][28]: 連絡票印刷日
sheets[0]/rows[5][29]: 督促票印刷日
sheets[0]/rows[5][30]: クリップボード出力日
sheets[0]/rows[5][31]: 引込日
sheets[0]/rows[5][32]: 積特パック識別サイン
sheets[0]/rows[5][33]: Papionデータ特定キー
sheets[0]/rows[5][34]: 点検区分
sheets[0]/rows[5][35]: 状態コード
sheets[0]/rows[5][36]: 状態コード（代理店）
sheets[0]/rows[5][37]: 計上状態
sheets[0]/rows[5][38]: 連携状態
sheets[0]/rows[5][39]: 営業連携者
sheets[0]/rows[5][40]: 営業連携日
sheets[0]/rows[5][41]: 代理店連携者
sheets[0]/rows[5][42]: 代理店連携日
sheets[0]/rows[5][43]: 連携取消者
sheets[0]/rows[5][44]: 連携取消日
sheets[0]/rows[5][45]: 対応開始者
sheets[0]/rows[5][46]: 対応開始日
sheets[0]/rows[5][47]: 対応開始者（代理店）
sheets[0]/rows[5][48]: 対応開始日（代理店）
sheets[0]/rows[5][49]: 回答者
sheets[0]/rows[5][50]: 回答日
sheets[0]/rows[5][51]: 回答者（代理店）
sheets[0]/rows[5][52]: 回答日（代理店）
sheets[0]/rows[5][53]: 完了者
sheets[0]/rows[5][54]: 完了日
sheets[0]/rows[5][55]: 完了取消者
sheets[0]/rows[5][56]: 完了取消日
sheets[0]/rows[5][57]: 登録者
sheets[0]/rows[5][58]: 登録日
sheets[0]/rows[5][59]: 更新者
sheets[0]/rows[5][60]: 更新日
sheets[0]/rows[5][61]: 更新者（代理店）
sheets[0]/rows[5][62]: 更新日（代理店）
sheets[0]/rows[5][63]: 集計対象外フラグ
sheets[0]/rows[5][64]: 移管実施日
sheets[0]/rows[5][65]: 満期落し日
sheets[0]/rows[5][66]: 集計用部店課支社コード（速報）
sheets[0]/rows[5][67]: 集計用代理店コード（速報）
sheets[0]/rows[5][68]: 集計用部店課支社コード（確報）
sheets[0]/rows[5][69]: 集計用代理店コード（確報）
sheets[0]/rows[5][70]: 閲覧システム連携日
sheets[0]/rows[5][71]: 完了者（代理店）
sheets[0]/rows[6][1]: 物理項目名
sheets[0]/rows[6][2]: APPLICATION_FORM_ID
sheets[0]/rows[6][3]: INPUT_TYPE
sheets[0]/rows[6][4]: LARGE_ITEM_CODE
sheets[0]/rows[6][5]: INSURANCE_ITEM_CODE
sheets[0]/rows[6][6]: LAYOUT_TYPE
sheets[0]/rows[6][7]: POLICY_NUMBER
sheets[0]/rows[6][8]: SUB_POLICY_NUMBER
sheets[0]/rows[6][9]: INSURANT_NAME
sheets[0]/rows[6][10]: SECTION_CODE
sheets[0]/rows[6][11]: AGENT_CODE
sheets[0]/rows[6][12]: SUB_AGENT_CODE
sheets[0]/rows[6][13]: FREE_CODE_1
sheets[0]/rows[6][14]: FIELD_AGENT_ID
sheets[0]/rows[6][15]: SUMUP_SECTION_CODE
sheets[0]/rows[6][16]: SEND_SECTION_CODE
sheets[0]/rows[6][17]: START_DATE
sheets[0]/rows[6][18]: END_DATE
sheets[0]/rows[6][19]: CHANGE_DATE
sheets[0]/rows[6][20]: APPLICATION_FORM_TYPE
sheets[0]/rows[6][21]: SUMUP_YEAR_MONTH
sheets[0]/rows[6][22]: DAILY_REPORT_SEND
sheets[0]/rows[6][23]: REMINDER_DATE
sheets[0]/rows[6][24]: AGENT_DEAL_FLAG
sheets[0]/rows[6][25]: FORMS_MESSAGE
sheets[0]/rows[6][26]: INHOUSE_MESSAGE
sheets[0]/rows[6][27]: INQUIRY_PRINT_DATE
sheets[0]/rows[6][28]: NOTIFICATION_PRINT_DATE
sheets[0]/rows[6][29]: REMINDER_PRINT_DATE
sheets[0]/rows[6][30]: CLIP_BOARD_OUTPUT_DATE
sheets[0]/rows[6][31]: IMPORT_DATE
sheets[0]/rows[6][32]: PACK_SIGN
sheets[0]/rows[6][33]: PAPION_DESIGNATION_KEY
sheets[0]/rows[6][34]: CHECK_TYPE
sheets[0]/rows[6][35]: STATUS_CODE
sheets[0]/rows[6][36]: AGENT_STATUS_CODE
sheets[0]/rows[6][37]: SUMUP_STATUS
sheets[0]/rows[6][38]: NOTIFY_STATUS
sheets[0]/rows[6][39]: BUSINESS_NOTIFY_USER
sheets[0]/rows[6][40]: BUSINESS_NOTIFY_DATE
sheets[0]/rows[6][41]: AGENT_NOTIFY_USER
sheets[0]/rows[6][42]: AGENT_NOTIFY_DATE
sheets[0]/rows[6][43]: NOTIFY_CANCEL_USER
sheets[0]/rows[6][44]: NOTIFY_CANCEL_DATE
sheets[0]/rows[6][45]: HANDLE_START_USER
sheets[0]/rows[6][46]: HANDLE_START_DATE
sheets[0]/rows[6][47]: AGENT_HANDLE_START_USER
sheets[0]/rows[6][48]: AGENT_HANDLE_START_DATE
sheets[0]/rows[6][49]: ANSWER_USER
sheets[0]/rows[6][50]: ANSWER_DATE
sheets[0]/rows[6][51]: AGENT_ANSWER_USER
sheets[0]/rows[6][52]: AGENT_ANSWER_DATE
sheets[0]/rows[6][53]: COMPLETE_USER
sheets[0]/rows[6][54]: COMPLETE_DATE
sheets[0]/rows[6][55]: COMPLETE_CANCEL_USER
sheets[0]/rows[6][56]: COMPLETE_CANCEL_DATE
sheets[0]/rows[6][57]: REGISTER
sheets[0]/rows[6][58]: REGISTRATION_DATE
sheets[0]/rows[6][59]: UPDATE_USER
sheets[0]/rows[6][60]: UPDATE_DATE
sheets[0]/rows[6][61]: AGENT_UPDATE_USER_ID
sheets[0]/rows[6][62]: AGENT_UPDATE_DATE
sheets[0]/rows[6][63]: NO_RECEIPT_FLAG
sheets[0]/rows[6][64]: TRANSFER_DATE
sheets[0]/rows[6][65]: END_DROP_DATE
sheets[0]/rows[6][66]: BULLETIN_TOTAL_SECTION_CODE
sheets[0]/rows[6][67]: BULLETIN_TOTAL_AGENT_CODE
sheets[0]/rows[6][68]: CONFIRMED_TOTAL_SECTION_CODE
sheets[0]/rows[6][69]: CONFIRMED_TOTAL_AGENT_CODE
sheets[0]/rows[6][70]: ETSURAN_SEND_DATE
sheets[0]/rows[6][71]: AGENT_COMPLETE_USER
sheets[0]/rows[7][1]: AZ-200-07-006
sheets[0]/rows[7][2]: （自動設定）
sheets[0]/rows[7][3]: 2
sheets[0]/rows[7][4]: 1
sheets[0]/rows[7][5]: 11
sheets[0]/rows[7][6]: A0
sheets[0]/rows[7][7]: AZ20007006
sheets[0]/rows[7][8]: 0000000006
sheets[0]/rows[7][10]: AHK62
sheets[0]/rows[7][11]: 4060
sheets[0]/rows[7][15]: AHK624060
sheets[0]/rows[7][16]: AHK62
sheets[0]/rows[7][17]: 2026-11-01
sheets[0]/rows[7][18]: 2028-11-02
sheets[0]/rows[7][19]: 2026-11-03
sheets[0]/rows[7][20]: 1
sheets[0]/rows[7][21]: 202611
sheets[0]/rows[7][23]: 2026-11-08 20:00:00
sheets[0]/rows[7][24]: 1
sheets[0]/rows[7][34]: 2
sheets[0]/rows[7][35]: 1
sheets[0]/rows[7][36]: 1
sheets[0]/rows[7][37]: 1
sheets[0]/rows[7][38]: 1
sheets[0]/rows[7][41]: 6M731111
sheets[0]/rows[7][42]: 2026-11-02 20:00:00
sheets[0]/rows[7][57]: 6M731111
sheets[0]/rows[7][58]: 2026-11-01 20:00:00
sheets[0]/rows[7][59]: 6M731111
sheets[0]/rows[7][60]: 2026-11-02 20:00:00
sheets[0]/rows[7][63]: 0
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:Y8
sheets[1]/rows[0][0]: ○入力内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[1]/rows[3][1]: 実行コマンド
sheets[1]/rows[3][8]: cd /proj/mhkag/MS/AP/mhk/lib
sheets[1]/rows[4][8]: java -jar AZB029.jar
sheets[1]/rows[5][8]: echo $status
sheets[1]/rows[6][8]: 戻り値が0であること

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
- errorCode = "MAZG000E001"  <- boundary.json
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
- loginUrl = "/AMB/dummy.html"  <- boundary.json
- menuSelector = "input[name=menu_cm]"  <- boundary.json
- pointCheck = "?"  <- boundary.json
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
- user = "?"  <- boundary.json
- userId = "MS3N"  <- boundary.json
params total=38, auto-fallback=32: sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-BATCH-RUN-VERIFY  rows 14..15  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-B69EF548  rows 16..18  status3=coded
  screen=BATCH(大樹生命連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋連携データファイル/APログ/DBログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋大樹生命連携データファイル/APログ/DBログ=非浏览器=真機人工（mockは画面在位で代理）

## 5. 本次运行结果（块级）
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SGL-B69EF548  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 その他|操作結果 file=02_r015_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-200-07-006/01_menu.png
- logs/AZ-200-07-006/02_r015_操作結果.png
- logs/AZ-200-07-006/04_BLK-SGL-B69EF548.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
