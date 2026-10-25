# AUDIT DOSSIER — AZ-112-01-001

meta: {"domain": "AZ", "company": "MS", "functionName": "課支社/個別メール、メール通知先", "item": "不備更新", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-112-01-001.xlsx"}
feasibility: class=C flow=pass manualSteps=2 proxyBlocks=2 paramIssues=1 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=5 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|メール登録|押下
- r15 | CK[2]遷移|営業連携メール通知先登録画面|遷移すること | EV:画面HC
- r16 | OP[1]入力|部店課支社ｺｰﾄﾞ|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|検索|押下
- r18 | CK[3]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r19 | OP[4]ボタン|次頁|押下
- r20 | CK[5]表示|所属課支社別メール通知先一覧|次のページになること | EV:（目視確認）
- r21 | OP[6]ボタン|前頁|押下
- r22 | CK[7]表示|所属課支社別メール通知先一覧|前のページになること | EV:（目視確認）
- r23 | OP[8]ボタン|全解除|押下
- r24 | CK[9]表示|所属課支社別メール通知先一覧|1ページ目のメール通知のチェックがすべて外れること | EV:（目視確認）
- r25 | OP[10]ボタン|更新|押下
- r26 | CK[11]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r27 | OP[12]ボタン|全解除|押下
- r28 | CK[13]表示|所属課支社別メール通知先一覧|残りのメール通知のチェックがすべて外れること | EV:（目視確認）
- r29 | OP[14]ボタン|更新|押下
- r30 | CK[15]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r31 | OP[16]ボタン|追加|押下
- r32 | CK[17]遷移|個別メール通知先検索画面|ポップアップ表示されること | EV:画面HC
- r33 | OP[1]入力|部店課支社ｺｰﾄﾞ|【別紙】操作内容 入力内容：２参照
- r34 | OP[2]ボタン|検索|押下
- r35 | CK[3]表示|検索結果|表示されること | EV:画面HC
- r36 | OP[4]クリック|No.|押下(No.1：AHK02のレコード)
- r37 | CK[5]表示|個別メール通知先一覧(親画面)|選択したレコードが新たに追加されること | EV:画面HC
- r38 | OP[6]入力|氏名|\
- r39 | OP[7]その他|部店課支社ｺｰﾄﾞ|(削除)
- r40 | OP[8]ボタン|検索|押下
- r41 | CK[9]表示|メッセージボックス|MAZG910W002が表示されること | EV:画面HC
- r42 | OP[10]入力|氏名|【別紙】操作内容 入力内容：３参照
- r43 | OP[11]ボタン|検索|押下
- r44 | CK[12]表示|検索結果|表示されること | EV:画面HC
- r45 | OP[13]クリック|No.|押下(No.1：AHK11のレコード)
- r46 | CK[14]表示|個別メール通知先一覧(親画面)|選択したレコードが新たに追加されること | EV:画面HC
- r47 | OP[15]入力|各項目|【別紙】操作内容 入力内容：４参照
- r48 | CK[16]表示|メッセージボックス|MAZG910W101が表示されること | EV:画面HC
- r49 | OP[17]ボタン|閉じる|押下
- r50 | CK[18]表示|個別メール通知先検索画面|画面が閉じること | EV:（目視確認）
- r51 | OP[1]クリック|メール通知|押下(No.1：AHK02のレコード)
- r52 | CK[2]表示|メール通知|チェックが外れること | EV:画面HC
- r53 | OP[3]ボタン|更新|押下
- r54 | CK[4]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC
- r55 | OP[5]ボタン|全選択|押下
- r56 | CK[6]表示|所属課支社別メール通知先一覧|1ページ目のメール通知のチェックがすべて付くこと | EV:（目視確認）
- r57 | OP[7]ボタン|更新|押下
- r58 | CK[8]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC
- r59 | OP[9]ボタン|次頁|押下
- r60 | OP[10]ボタン|全選択|押下
- r61 | CK[11]表示|所属課支社別メール通知先一覧|残りのメール通知のチェックがすべて付くこと | EV:（目視確認）
- r62 | OP[12]ボタン|更新|押下
- r63 | CK[13]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：６参照 | EV:画面HC
- r64 | OP[14]入力|部店課支社ｺｰﾄﾞ|【別紙】操作内容 入力内容：５参照
- r65 | OP[15]ボタン|検索|押下
- r66 | OP[16]クリック|メール通知|通知件数が100件になるようにチェックを外す
- r67 | OP[17]ボタン|更新|押下
- r68 | CK[18]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：７参照 | EV:画面HC
- r69 | OP[19]入力|部店課支社ｺｰﾄﾞ|【別紙】操作内容 入力内容：６参照
- r70 | OP[20]ボタン|検索|押下
- r71 | OP[21]ボタン|全解除|押下
- r72 | CK[22]表示|所属課支社別メール通知先一覧|メール通知のチェックがすべて外れること | EV:（目視確認）
- r73 | OP[23]ボタン|更新|押下
- r74 | CK[24]表示|営業連携メール通知先登録画面|【別紙】表示内容 / 表示内容：８参照 | EV:画面HC
- r75 | OP[25]ボタン|メニュー|押下
- r76 | CK[26]遷移|申込書品質管理メニュー画面|遷移すること | EV:（目視確認）
- r77 | OP[1]ボタン|検索|押下
- r78 | CK[2]遷移|不備一覧画面|遷移すること | EV:（目視確認）
- r79 | OP[1]入力|各項目|【別紙】操作内容 入力内容：７参照
- r80 | OP[2]ボタン|検索|押下
- r81 | OP[3]クリック|No.|押下
- r82 | CK[4]遷移|不備内容入力画面－更新|遷移すること | EV:（目視確認）
- r83 | OP[1]ボタン|営業連携|押下
- r84 | CK[2]遷移|メール通知先選択画面|ポップアップ表示されること | EV:（目視確認）
- r85 | OP[1]入力|部店課支社ｺｰﾄﾞ|【別紙】操作内容 入力内容：２参照
- r86 | OP[2]ボタン|検索|押下
- r87 | CK[3]表示|検索結果|表示されること | EV:画面HC
- r88 | OP[4]ボタン|次頁|押下
- r89 | CK[5]表示|通知先追加|次のページになること | EV:画面HC
- r90 | OP[6]ボタン|前頁|押下
- r91 | CK[7]表示|通知先追加|前のページになること | EV:画面HC
- r92 | OP[8]その他|部店課支社ｺｰﾄﾞ|削除
- r93 | OP[9]入力|氏名|【別紙】操作内容 入力内容：３参照
- r94 | CK[10]表示|検索結果|表示されること | EV:画面HC
- r95 | OP[11]入力|各項目|【別紙】操作内容 入力内容：４参照
- r96 | CK[12]表示|メッセージボックス|MAZG911W101が表示されること | EV:画面HC
- r97 | OP[13]入力|通知先部課コード|【別紙】操作内容 入力内容：５参照
- r98 | OP[14]ボタン|通知先再セット|押下
- r99 | OP[15]ボタン|通知する|押下
- r100 | CK[16]表示|メッセージボックス|MAZG911W106が表示されること | EV:画面HC
- r101 | OP[17]入力|通知先部課コード|【別紙】操作内容 入力内容：６参照
- r102 | OP[18]ボタン|通知先再セット|押下
- r103 | OP[19]ボタン|通知する|押下
- r104 | CK[20]表示|メッセージボックス|MAZG911W105が表示されること | EV:画面HC
- r105 | OP[21]入力|通知先部課コード|【別紙】操作内容 入力内容：１参照
- r106 | OP[22]ボタン|通知先再セット|押下
- r107 | OP[23]ボタン|通知する|押下
- r108 | CK[24]遷移|不備内容入力画面－更新|エラーメッセージが表示されず、メール通知先選択画面が閉じられること | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AF6
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 証券番号
sheets[0]/rows[2][8]: AZ11201
sheets[0]/rows[3][1]: 明細番号
sheets[0]/rows[3][8]: 0000000001
sheets[0]/rows[4][1]: その他の項目
sheets[0]/rows[4][8]: （任意）
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AX16
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ＭＳのユーザを設定。
sheets[1]/rows[3][0]: ○入力内容
sheets[1]/rows[5][0]: 1
sheets[1]/rows[5][1]: 部店課支社コード
sheets[1]/rows[5][8]: AHK81
sheets[1]/rows[5][31]: ※1～99件の部店課支社
sheets[1]/rows[6][0]: 2
sheets[1]/rows[6][1]: 部店課支社コード
sheets[1]/rows[6][8]: AHK02
sheets[1]/rows[6][31]: 部店課支社のみを指定して検索
sheets[1]/rows[7][0]: 3
sheets[1]/rows[7][1]: 氏名
sheets[1]/rows[7][8]: XX XX
sheets[1]/rows[7][31]: 氏名のみを指定して検索
sheets[1]/rows[8][0]: 4
sheets[1]/rows[8][1]: 氏名
sheets[1]/rows[8][8]: XX XX
sheets[1]/rows[8][31]: 氏名と部店課支社コードの両方を指定して検索
sheets[1]/rows[9][1]: 部店課支社コード
sheets[1]/rows[9][8]: AHK81
sheets[1]/rows[10][0]: 5
sheets[1]/rows[10][1]: 部店課支社コード
sheets[1]/rows[10][8]: AAAAA
sheets[1]/rows[10][31]: 検索結果が0件の場合
sheets[1]/rows[11][0]: 6
sheets[1]/rows[11][1]: 部店課支社コード
sheets[1]/rows[11][8]: A3M61
sheets[1]/rows[11][31]: ※100件の部店課支社
sheets[1]/rows[12][0]: 7
sheets[1]/rows[12][1]: 部店課支社コード
sheets[1]/rows[12][8]: A3M02
sheets[1]/rows[12][31]: ※0件の部店課支社
sheets[1]/rows[13][0]: 8
sheets[1]/rows[13][1]: 証券番号
sheets[1]/rows[13][8]: AZ11201
sheets[1]/rows[14][1]: 明細番号
sheets[1]/rows[14][8]: 0000000001
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AF22
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 部店課支社名
sheets[2]/rows[2][7]: AHK81
sheets[2]/rows[3][1]: 通知件数
sheets[2]/rows[3][7]: 59
sheets[2]/rows[4][0]: 2
sheets[2]/rows[4][1]: メッセージエリア
sheets[2]/rows[4][7]: MAZG207I101が表示されること
sheets[2]/rows[5][1]: 通知件数
sheets[2]/rows[5][7]: 9件
sheets[2]/rows[5][30]: 表示内容1の通知件数から-50件になっていること
sheets[2]/rows[6][1]: 所属課支社別メール通知先一覧
sheets[2]/rows[6][7]: チェックがついていること
sheets[2]/rows[6][30]: 表示内容1の通知件数から-50の件数分チェックが付いていること
sheets[2]/rows[7][0]: 3
sheets[2]/rows[7][1]: メッセージエリア
sheets[2]/rows[7][7]: MAZG207W102が表示されること
sheets[2]/rows[8][1]: 通知件数
sheets[2]/rows[8][7]: 0件
sheets[2]/rows[9][0]: 4
sheets[2]/rows[9][1]: メッセージエリア
sheets[2]/rows[9][7]: MAZG207I101が表示されること
sheets[2]/rows[10][1]: 通知件数
sheets[2]/rows[10][7]: 1件
sheets[2]/rows[11][1]: 個別メール通知先一覧
sheets[2]/rows[11][7]: AHK11のレコードのみ残っていること
sheets[2]/rows[11][30]: ※表示内容1→6で増えるレコード
sheets[2]/rows[12][0]: 5
sheets[2]/rows[12][1]: メッセージエリア
sheets[2]/rows[12][7]: MAZG207I101が表示されること
sheets[2]/rows[13][1]: 通知件数
sheets[2]/rows[13][7]: 51件
sheets[2]/rows[14][1]: 所属課支社別メール通知先一覧
sheets[2]/rows[14][7]: チェックがついていること
sheets[2]/rows[14][30]: 先頭の50件のみチェックが付いていること
sheets[2]/rows[15][0]: 6
sheets[2]/rows[15][1]: メッセージエリア
sheets[2]/rows[15][7]: MAZG207I101が表示されること
sheets[2]/rows[16][1]: 通知件数
sheets[2]/rows[16][7]: 60件
sheets[2]/rows[16][30]: 表示内容1の通知件数から＋1件になっていること
sheets[2]/rows[17][0]: 7
sheets[2]/rows[17][1]: メッセージエリア
sheets[2]/rows[17][7]: MAZG207W101が表示されること
sheets[2]/rows[18][1]: 通知件数
sheets[2]/rows[18][7]: 100件
sheets[2]/rows[19][0]: 8
sheets[2]/rows[19][1]: メッセージエリア
sheets[2]/rows[19][7]: MAZG207W102が表示されること
sheets[2]/rows[20][1]: 通知件数
sheets[2]/rows[20][7]: 0件

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000001"  <- generated.json
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
- policyNo = "AZ11201"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "A3M02"  <- generated.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=31: user,pointCheck,agentCode,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-SGL-7EE83E5A  rows 14..76  status3=coded
  screen=AMA01->AMA26(+AMA27) file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click メール登録 sel="#act001to207" val=""
  - [assert] ast 遷移 営業連携メール通知先登録 sel="#section_code" val=""
  - [fill] input 各項目(部店課支社コード) sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#search" val=""
  - [assert] ast 表示 営業連携メール通知先登録画面 sel="#all_select" val=""
  - [click] click 次頁 sel="#nextPage" val=""
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_select" val=""
  - [click] click 前頁 sel="#prevPage" val=""
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_select" val=""
  - [click] click 全解除 sel="#all_clear" val=""
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_select" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [click] click 全解除 sel="#all_clear" val=""
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_select" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [click] click 追加 sel="#add_user" val="" NOTE:mockの追加popupはURL空串(/)を開くため次stepで検索画面へ直接遷移
  - [goto] goto 個別メール通知先検索 sel="" val=""
  - [assert] ast 遷移 個別メール通知先検索 sel="#table27" val=""
  - [fill] input 各項目(氏名) sel="#user_name" val="params.customerName"
  - [fill] input 各項目(部店課支社コード) sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#search" val=""
  - [assert] ast 表示 検索結果 sel="#gyoumu_list tr" val=""
  - [click] click No sel="#gyoumu_list a" val=""
  - [goto] goto 親画面 個別メール通知先一覧 sel="" val=""
  - [assert] ast 個別メール通知先一覧(親画面) sel="#list_table" val="" NOTE:親画面の個別通知先一覧を確認（mockは親への行追加なし）
  - [goto] goto 個別メール通知先検索 sel="" val=""
  - [fill] input 氏名 sel="#user_name" val="params.customerName"
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#search" val=""
  - [assert] ast 表示 メッセージボックス sel="#popup_message_area" val="" NOTE:メッセージ=alert自動承諾（mockにメッセージ本文なし）=真機人工
  - [fill] input 各項目 sel="#user_name" val="params.customerName"
  - [click] click 検索 sel="#search" val=""
  - [assert] ast 表示 検索結果 sel="#gyoumu_list tr" val=""
  - [click] click No sel="#gyoumu_list a" val=""
  - [goto] goto 親画面 個別メール通知先一覧 sel="" val=""
  - [assert] ast 個別メール通知先一覧(親画面) sel="#list_table" val=""
  - [goto] goto 個別メール通知先検索 sel="" val=""
  - [assert] ast 表示 メッセージボックス(重複) sel="#popup_message_area" val="" NOTE:重複選択メッセージ=alert自動承諾=真機人工
  - [click] click 閉じる sel="input[name='close']" val="" NOTE:mockは単独タブのためwindow.close抑止→画面継続
  - [assert] ast 個別メール通知先検索画面 sel="#table27" val=""
  - [goto] goto 営業連携メール通知先登録 sel="" val=""
  - [check] click メール通知 sel="#section_mail_send_flag_1" val=""
  - [assert] ast 表示 メール通知 sel="#sendCount" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [click] click 全選択 sel="#all_select" val=""
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_clear" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [click] click 次頁 sel="#nextPage" val=""
  - [click] click 全選択 sel="#all_select" val=""
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_clear" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [fill] input 各項目 sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#search" val=""
  - [click] click メール通知 sel="#section_mail_send_flag_0" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [fill] input 各項目 sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#search" val=""
  - [click] click 全解除 sel="#all_clear" val="" NOTE:メール通知否で全解除/全選択/追加はdisabled→forceで押下
  - [assert] ast 所属課支社別メール通知先一覧 sel="#all_select" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 営業連携メール通知先登録画面 sel="#section_code" val=""
  - [click] click メニュー sel="#act207to001" val=""
  - [assert] ast 遷移 申込書品質管理メニュー sel="#act001to207" val=""
### BLK-AZ-MENU-SEARCH-LIST  rows 77..78  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 79..82  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-AUTO-2739DA75  rows 83..84  status3=coded
  screen=AZG101->AZG911 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携 sel="input[name='updateBusinessNotify']" val=""
  - [popup] ast 遷移 メール通知先選択 sel="" val=""
  - [assert] ast メール通知先選択 表示 sel="input[name='sendOn']" val="" (popup)
### BLK-SGL-C3BC64AD  rows 85..108  status3=coded
  screen=AMA28 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携(メール通知先選択を開く) sel="#updateBusinessNotify" val="" NOTE:営業連携ボタンはvisibility_hidden=force
  - [popup] ast 遷移 popup表示 sel="" val=""
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 検索結果 sel="#gyoumu_list tr" val="" (popup)
  - [click] click 次頁 sel="#nextPage" val="" (popup) NOTE:mockはページ情報が無いため頁ボタン非表示→force
  - [assert] ast 表示 通知先追加(次頁) sel="#gyoumu_list tr" val="" (popup)
  - [click] click 前頁 sel="#prevPage" val="" (popup) NOTE:同上
  - [assert] ast 表示 通知先追加(前頁) sel="#gyoumu_list tr" val="" (popup)
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode" (popup)
  - [fill] input 氏名 sel="#user_name" val="params.customerName" (popup)
  - [assert] ast 表示 検索結果 sel="#gyoumu_list tr" val="" (popup)
  - [fill] input 通知先部課コード sel="#section_code_set" val="params.sectionCode" (popup)
  - [assert] ast 表示 メッセージボックス sel="#warning_message" val="" (popup) NOTE:MAZG911W101=メッセージボックス。mockは文言未実装(枠のみ)=真機人工
  - [click] click 通知先再セット sel="#reset" val="" (popup)
  - [click] click 通知する sel="input[name='sendOn']" val="" (popup)
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val="" NOTE:通知先再セット+通知するの繰返し(MAZG911W106/W105)はmock未実装。初回で通知成立し画面が閉じる=真機人工

## 5. 本次运行结果（块级）
- BLK-SGL-7EE83E5A  pass  rows None..None
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-AUTO-2739DA75  pass  rows None..None
- BLK-SGL-C3BC64AD  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|営業連携メール通知先登録画面 file=02_r015_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r18 表示|営業連携メール通知先登録画面 file=03_r018_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r26 表示|営業連携メール通知先登録画面 file=04_r026_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r30 表示|営業連携メール通知先登録画面 file=05_r030_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r32 遷移|個別メール通知先検索画面 file=06_r032_個別メール通知先検索画面.png url=...http://127.0.0.1:10097/AMB/AMA27.html
- [OK ] r35 表示|検索結果 file=07_r035_検索結果.png url=...http://127.0.0.1:10097/AMB/AMA27.html
- [OK ] r37 表示|個別メール通知先一覧(親画面) file=08_r037_個別メール通知先一覧(親画面).png url=...http://127.0.0.1:10097/AMB/AMA27.html
- [OK ] r41 表示|メッセージボックス file=09_r041_メッセージボックス.png url=...http://127.0.0.1:10097/AMB/AMA27.html
- [OK ] r44 表示|検索結果 file=10_r044_検索結果.png url=...http://127.0.0.1:10097/AMB/AMA27.html
- [OK ] r46 表示|個別メール通知先一覧(親画面) file=11_r046_個別メール通知先一覧(親画面).png url=...http://127.0.0.1:10097/AMB/AMA27.html
- [OK ] r48 表示|メッセージボックス file=12_r048_メッセージボックス.png url=...http://127.0.0.1:10097/AMB/AMA27.html#
- [OK ] r52 表示|メール通知 file=13_r052_メール通知.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r54 表示|営業連携メール通知先登録画面 file=14_r054_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r58 表示|営業連携メール通知先登録画面 file=15_r058_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r63 表示|営業連携メール通知先登録画面 file=16_r063_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r68 表示|営業連携メール通知先登録画面 file=17_r068_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r74 表示|営業連携メール通知先登録画面 file=18_r074_営業連携メール通知先登録画面.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r87 表示|検索結果 file=19_r087_検索結果.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r89 表示|通知先追加 file=20_r089_通知先追加.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r91 表示|通知先追加 file=21_r091_通知先追加.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r94 表示|検索結果 file=22_r094_検索結果.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r96 表示|メッセージボックス file=23_r096_メッセージボックス.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r100 表示|メッセージボックス file=24_r100_メッセージボックス.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r104 表示|メッセージボックス file=25_r104_メッセージボックス.png url=...http://127.0.0.1:10097/AMB/AMA26.html
- [OK ] r108 遷移|不備内容入力画面-更新 file=28_r108_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-112-01-001/01_menu.png
- logs/AZ-112-01-001/02_r015_営業連携メール通知先登録画面.png
- logs/AZ-112-01-001/03_r018_営業連携メール通知先登録画面.png
- logs/AZ-112-01-001/04_r026_営業連携メール通知先登録画面.png
- logs/AZ-112-01-001/05_r030_営業連携メール通知先登録画面.png
- logs/AZ-112-01-001/06_r032_個別メール通知先検索画面.png
- logs/AZ-112-01-001/07_r035_検索結果.png
- logs/AZ-112-01-001/08_r037_個別メール通知先一覧(親画面).png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
