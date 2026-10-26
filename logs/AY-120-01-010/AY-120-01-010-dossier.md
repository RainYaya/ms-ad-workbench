# AUDIT DOSSIER — AY-120-01-010

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線１０", "item": "申請依頼", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-120-01-010.xlsx"}
feasibility: class=B flow=pass manualSteps=0 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=9 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「照会・検索」押下|-
- r15 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r16 | OP[1]入力|画面各項目入力|【別紙】操作内容　１　参照
- r17 | OP[2]ボタン|「検索」押下|-
- r18 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r19 | OP[4]クリック|「NO」をクリック|
- r20 | CK[5]遷移|申請・確認更新画面|【別紙】表示内容　１　参照 | EV:画面HC
- r21 | OP[1]入力|画面各項目入力|【別紙】操作内容　２　参照
- r22 | OP[2]ボタン|「申請依頼先選択」押下|-
- r23 | CK[3]遷移|担当者検索画面|初期値 | EV:画面HC
- r24 | OP[1]入力|画面各項目入力|【別紙】操作内容　3　参照
- r25 | OP[2]ボタン|「検索」押下|-
- r26 | CK[3]表示|担当者検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r27 | OP[4]クリック|「NO」をクリック|-
- r28 | CK[5]遷移|申請・確認更新画面|選択した担当者情報画面に設定される | EV:画面HC
- r29 | OP[1]ボタン|「申請代行者選択」押下|-
- r30 | CK[2]遷移|担当者検索画面|初期値 | EV:画面HC
- r31 | OP[1]入力|画面各項目入力|【別紙】操作内容　4　参照
- r32 | OP[2]ボタン|「検索」押下|-
- r33 | CK[3]表示|担当者検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r34 | OP[4]クリック|「NO」をクリック|-
- r35 | CK[5]遷移|申請・確認更新画面|選択した担当者情報画面に設定される | EV:画面HC
- r36 | OP[1]ボタン|「更新」押下|-
- r37 | CK[2]表示|申請・確認更新画面|【別紙】表示内容　2　参照 | EV:画面HC
- r38 | OP[3]ボタン|「申請依頼」押下|-
- r39 | CK[4]遷移|送信先(写)選択画面|初期値 | EV:画面HC
- r40 | OP[1]入力|画面各項目入力|【別紙】操作内容　5　参照
- r41 | OP[2]ボタン|「検索」押下|-
- r42 | CK[3]表示|送信先(写)選択画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r43 | OP[4]クリック|「NO」をクリック|-
- r44 | OP[5]ボタン|「OK」押下|-
- r45 | CK[6]出力（Msg）|メッセージ|「MAYG901I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r46 | OP[7]ボタン|「OK」押下|-
- r47 | CK[8]遷移|申請・確認更新画面|【別紙】表示内容　3　参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: A1:AJ22
sheets[0]/rows[1][1]: 〇ログイン情報
sheets[0]/rows[2][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[0]/rows[4][1]: 〇1.データ準備（新規登録）
sheets[0]/rows[5][1]: ○入力内容
sheets[0]/rows[7][1]: 1
sheets[0]/rows[7][2]: 申請・確認基準項目
sheets[0]/rows[7][11]: 2.始期日解約
sheets[0]/rows[8][2]: 課支社CD
sheets[0]/rows[8][11]: ABM62
sheets[0]/rows[8][35]: ※　変更となる可能性あり
sheets[0]/rows[9][2]: 代理店CD
sheets[0]/rows[9][11]: 2031
sheets[0]/rows[9][35]: ※　変更となる可能性あり
sheets[0]/rows[10][2]: 証券番号
sheets[0]/rows[10][11]: AY12001
sheets[0]/rows[11][2]: 明細番号
sheets[0]/rows[11][11]: 0000000040
sheets[0]/rows[12][2]: 保険契約者氏名
sheets[0]/rows[12][11]: テスト
sheets[0]/rows[13][2]: 大種目
sheets[0]/rows[13][11]: 新種
sheets[0]/rows[14][2]: 保種
sheets[0]/rows[14][11]: 31：ファミリー労災
sheets[0]/rows[15][2]: 取消保険料
sheets[0]/rows[15][11]: 1234
sheets[0]/rows[16][2]: 証券送付区分
sheets[0]/rows[16][11]: 直送
sheets[0]/rows[17][2]: 変更確認書送付
sheets[0]/rows[17][11]: 直送
sheets[0]/rows[18][2]: 変更確認書課支社送付の理由
sheets[0]/rows[18][11]: テスト理由
sheets[0]/rows[19][2]: 申込日(原契約の申込日)
sheets[0]/rows[19][11]: 20260303
sheets[0]/rows[20][2]: 始期日
sheets[0]/rows[20][11]: 20260404
sheets[0]/rows[21][2]: 届出日(変更届出書の届出日)
sheets[0]/rows[21][11]: 20260505
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: A1:AJ19
sheets[1]/rows[1][1]: 〇ログイン情報
sheets[1]/rows[2][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[1]/rows[4][1]: ○入力内容
sheets[1]/rows[6][1]: 1
sheets[1]/rows[6][2]: 証券番号
sheets[1]/rows[6][11]: AY12001
sheets[1]/rows[7][2]: 明細番号
sheets[1]/rows[7][11]: 0000000040
sheets[1]/rows[8][1]: 2
sheets[1]/rows[8][2]: 異例取扱理由
sheets[1]/rows[8][11]: A.当社・代理店の責による意図しない保険契約の解消
sheets[1]/rows[9][2]: 具体的内容
sheets[1]/rows[9][11]: 募集人(代理店)の説明誤り
sheets[1]/rows[10][2]: 具体的説明
sheets[1]/rows[10][11]: テスト
sheets[1]/rows[11][2]: 代理店への募集状況の確認要否
sheets[1]/rows[11][11]: 不要
sheets[1]/rows[12][2]: 保険始期日と届出日の関係
sheets[1]/rows[12][11]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
sheets[1]/rows[13][1]: 3
sheets[1]/rows[13][2]: 氏名
sheets[1]/rows[13][11]: 課支社長
sheets[1]/rows[14][2]: 課支社CD
sheets[1]/rows[14][11]: ABM62
sheets[1]/rows[14][35]: ※　変更となる可能性あり
sheets[1]/rows[15][1]: 4
sheets[1]/rows[15][2]: 氏名
sheets[1]/rows[15][11]: 課支社長
sheets[1]/rows[16][2]: 課支社CD
sheets[1]/rows[16][11]: ABM62
sheets[1]/rows[16][35]: ※　変更となる可能性あり
sheets[1]/rows[17][1]: 5
sheets[1]/rows[17][2]: 氏名
sheets[1]/rows[17][11]: 黒川　京子
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AL89
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 申請・確認状況
sheets[2]/rows[2][12]: 未申請
sheets[2]/rows[3][1]: 異例管理番号
sheets[2]/rows[3][12]: 空白
sheets[2]/rows[4][1]: 消込状況
sheets[2]/rows[4][12]: 未消込
sheets[2]/rows[5][1]: 申請入力者
sheets[2]/rows[5][12]: 空白
sheets[2]/rows[6][1]: 申請入力日
sheets[2]/rows[6][12]: 空白
sheets[2]/rows[7][1]: 申請者
sheets[2]/rows[7][12]: 空白
sheets[2]/rows[8][1]: 申請日
sheets[2]/rows[8][12]: 空白
sheets[2]/rows[9][1]: 承認者
sheets[2]/rows[9][12]: 空白
sheets[2]/rows[10][1]: 承認日
sheets[2]/rows[10][12]: 空白
sheets[2]/rows[11][1]: コンプラ情報システム連携日
sheets[2]/rows[11][12]: 空白
sheets[2]/rows[12][1]: 要再申請依頼者
sheets[2]/rows[12][12]: 空白
sheets[2]/rows[13][1]: 要再申請依頼日
sheets[2]/rows[13][12]: 空白
sheets[2]/rows[14][1]: 登録者
sheets[2]/rows[14][12]: 登録したユーザ（営業）
sheets[2]/rows[15][1]: 登録日
sheets[2]/rows[15][12]: 新規入力時のシステム日
sheets[2]/rows[16][1]: 更新者
sheets[2]/rows[16][12]: 前回更新したユーザ（営業）
sheets[2]/rows[17][1]: 更新日
sheets[2]/rows[17][12]: 新規入力時のシステム日
sheets[2]/rows[18][1]: 申請・確認基準項目
sheets[2]/rows[18][12]: 2.始期日解約
sheets[2]/rows[19][1]: 課支社CD
sheets[2]/rows[19][12]: ABM62
sheets[2]/rows[20][1]: 課支社名称
sheets[2]/rows[20][12]: （ABM62）
sheets[2]/rows[21][1]: 代理店CD
sheets[2]/rows[21][12]: 2031
sheets[2]/rows[22][1]: 代理店名称
sheets[2]/rows[22][12]: （2031）
sheets[2]/rows[23][1]: 証券番号
sheets[2]/rows[23][12]: AY12001
sheets[2]/rows[24][1]: 明細番号
sheets[2]/rows[24][12]: 0000000040
sheets[2]/rows[25][1]: 保険契約者氏名
sheets[2]/rows[25][12]: テスト
sheets[2]/rows[26][1]: 大種目
sheets[2]/rows[26][12]: 新種
sheets[2]/rows[27][1]: 保種
sheets[2]/rows[27][12]: 31：ファミリー労災
sheets[2]/rows[28][1]: 取消保険料
sheets[2]/rows[28][12]: 1234
sheets[2]/rows[29][1]: 再計上証券番号
sheets[2]/rows[29][12]: 空白
sheets[2]/rows[30][1]: 再計上明細番号
sheets[2]/rows[30][12]: 空白
sheets[2]/rows[31][1]: 証券送付区分
sheets[2]/rows[31][12]: 直送
sheets[2]/rows[32][1]: 変更確認書送付
sheets[2]/rows[32][12]: 直送
sheets[2]/rows[33][1]: 変更確認書課支社送付の理由
sheets[2]/rows[33][12]: テスト理由
sheets[2]/rows[34][1]: 申込日(原契約の申込日)
sheets[2]/rows[34][12]: 20260303
sheets[2]/rows[35][1]: 始期日
sheets[2]/rows[35][12]: 20260404
sheets[2]/rows[36][1]: 届出日(変更届出書の届出日)
sheets[2]/rows[36][12]: 20260505
sheets[2]/rows[37][1]: 取消・変更の計上日
sheets[2]/rows[37][12]: 空白
sheets[2]/rows[38][0]: 2
sheets[2]/rows[38][1]: 更新者
sheets[2]/rows[38][12]: ログインユーザ
sheets[2]/rows[39][1]: 更新日
sheets[2]/rows[39][12]: 更新したシステム日時
sheets[2]/rows[40][1]: 異例取扱理由
sheets[2]/rows[40][12]: A.当社・代理店の責による意図しない保険契約の解消
sheets[2]/rows[41][1]: 具体的内容
sheets[2]/rows[41][12]: 募集人(代理店)の説明誤り
sheets[2]/rows[42][1]: 具体的説明
sheets[2]/rows[42][12]: テスト
sheets[2]/rows[43][1]: 代理店への募集状況の確認要否
sheets[2]/rows[43][12]: 不要
sheets[2]/rows[44][1]: 実施日
sheets[2]/rows[44][12]: 空白
sheets[2]/rows[45][1]: 実施方法
sheets[2]/rows[45][12]: 空白
sheets[2]/rows[46][1]: 実施者(社員)
sheets[2]/rows[46][12]: 空白
sheets[2]/rows[47][1]: 対象者(募集人名)
sheets[2]/rows[47][12]: 空白
sheets[2]/rows[48][1]: 募集方法
sheets[2]/rows[48][12]: 空白
sheets[2]/rows[49][1]: 募集実施日
sheets[2]/rows[49][12]: 空白
sheets[2]/rows[50][1]: その他の募集方法
sheets[2]/rows[50][12]: 空白
sheets[2]/rows[51][1]: 重要事項説明
sheets[2]/rows[51][12]: 空白
sheets[2]/rows[52][1]: 契約内容の確認
sheets[2]/rows[52][12]: 空白
sheets[2]/rows[53][1]: 契約意思の確認
sheets[2]/rows[53][12]: 空白
sheets[2]/rows[54][2]: 契約手続実施者
sheets[2]/rows[54][12]: 空白
sheets[2]/rows[55][1]: 今後の活動に対する指導
sheets[2]/rows[55][12]: 空白
sheets[2]/rows[56][1]: 保険始期日と届出日の関係
sheets[2]/rows[56][12]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
sheets[2]/rows[57][1]: 実施日
sheets[2]/rows[57][12]: 空白
sheets[2]/rows[58][1]: 実施方法
sheets[2]/rows[58][12]: 空白
sheets[2]/rows[59][1]: 実施者(社員)
sheets[2]/rows[59][12]: 空白
sheets[2]/rows[60][1]: 対象者(募集人名)
sheets[2]/rows[60][12]: 空白
sheets[2]/rows[61][1]: 募集方法
sheets[2]/rows[61][12]: 空白
sheets[2]/rows[62][1]: 募集実施日
sheets[2]/rows[62][12]: 空白
sheets[2]/rows[63][1]: その他の募集方法
sheets[2]/rows[63][12]: 空白
sheets[2]/rows[64][1]: 重要事項説明
sheets[2]/rows[64][12]: 空白
sheets[2]/rows[65][1]: 契約内容の確認
sheets[2]/rows[65][12]: 空白
sheets[2]/rows[66][1]: 契約意思の確認
sheets[2]/rows[66][12]: 空白
sheets[2]/rows[67][2]: 契約手続実施者
sheets[2]/rows[67][12]: 空白
sheets[2]/rows[68][1]: 異例取扱理由
sheets[2]/rows[68][12]: 空白
sheets[2]/rows[69][1]: 異例取扱理由備考
sheets[2]/rows[69][12]: 空白
sheets[2]/rows[70][1]: 契約者からの不満足の表明
sheets[2]/rows[70][12]: 空白
sheets[2]/rows[71][1]: (有の場合、CS・苦情システムに登録)
sheets[2]/rows[72][1]: CS・苦情システム　苦情No
sheets[2]/rows[72][12]: 空白
sheets[2]/rows[73][1]: 募集行為に問題の可能性
sheets[2]/rows[73][12]: 空白
sheets[2]/rows[74][1]: (有の場合、コンプラ情報システムに登録)
sheets[2]/rows[75][1]: コンプラ情報システム　管理No
sheets[2]/rows[75][12]: 空白
sheets[2]/rows[76][1]: 申請依頼先
sheets[2]/rows[76][12]: 課支社長
sheets[2]/rows[77][1]: 申請代行者
sheets[2]/rows[77][12]: 課支社長
sheets[2]/rows[78][1]: 承認依頼／要再申請依頼理由
sheets[2]/rows[78][12]: 空白
sheets[2]/rows[79][1]: 承認依頼先
sheets[2]/rows[79][12]: 空白
sheets[2]/rows[80][1]: 承認代行者
sheets[2]/rows[80][12]: 空白
sheets[2]/rows[81][1]: 承認／要再申請依頼理由
sheets[2]/rows[81][12]: 空白
sheets[2]/rows[82][1]: 承認後・不承認後の対応
sheets[2]/rows[82][12]: 空白
sheets[2]/rows[83][0]: 3
sheets[2]/rows[83][1]: 申請・確認状況
sheets[2]/rows[83][12]: 申請依頼
sheets[2]/rows[83][36]: 未申請→申請依頼になることを確認
sheets[2]/rows[84][1]: 申請入力者
sheets[2]/rows[84][12]: ログインユーザ
sheets[2]/rows[85][1]: 申請入力日
sheets[2]/rows[85][12]: 申請依頼したシステム日時
sheets[2]/rows[86][1]: 更新者
sheets[2]/rows[86][12]: ログインユーザ
sheets[2]/rows[87][1]: 更新日
sheets[2]/rows[87][12]: 申請依頼したシステム日時

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000040"  <- generated.json
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
- policyNo = "AY12001"  <- generated.json
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
params total=34, auto-fallback=31: user,pointCheck,agentCode,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AUTO-E2D0C359  rows 14..15  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SHR-40B1188F  rows 16..18  status3=coded
  screen=AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list" val="" NOTE:0件時の非表示はモック未再現（検索結果行は固定1件）
  - [assert] ast 検索条件エリア sel="#normalSearch" val=""
### BLK-AUTO-CE34C5B8  rows 21..23  status3=coded
  screen=ANA03->ANA10 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 各項目(契約者名) sel="#insurant_name" val="params.customerName"
  - [click] click 申請依頼先選択 sel="input[name='selectReqApplicantUser']" val=""
  - [popup] ast 遷移 担当者検索画面 sel="" val=""
### BLK-AUTO-2B9786A5  rows 24..28  status3=coded
  screen=ANA10->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 担当者検索 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(選択) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:選択した担当者情報が呼出元へ設定される
### BLK-SHR-EB44767A  rows 29..30  status3=coded
  screen=ANA03->ANA10 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 申請代行者選択 sel="input[name='selectActApplicantUser']" val=""
  - [popup] ast 遷移 担当者検索画面 sel="" val=""
### BLK-AUTO-2B9786A5  rows 31..35  status3=coded
  screen=ANA10->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 担当者検索 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(選択) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:選択した担当者情報が呼出元へ設定される
### BLK-AUTO-D2C3A480  rows 36..39  status3=coded
  screen=ANA03->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val=""
  - [click] click 申請依頼 sel="#requestApplicationButton" val=""
  - [popup] ast 遷移 送信先(写)選択画面 sel="" val=""
### BLK-AUTO-DF07A781  rows 40..47  status3=coded
  screen=ANA11->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 送信先(写)選択 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(送信先一覧へ追加) sel="#gyoumu_list a" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast メッセージ(MAYG901I00x) sel="#popup_message_area" val="MAYG901" (popup) NOTE:mockはメッセージを画面内表示。真機はポップアップMsg=真機人工
  - [click] click OK(確認Msg) sel="input[name='ok']" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:popup OK後、呼出元(申請・確認更新)へ戻る
### BLK-SGL-C17F75BC  rows 19..20  status3=planned
  screen=AYG200->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 検索結果表示 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SHR-40B1188F  pass  rows None..None
- BLK-AUTO-CE34C5B8  pass  rows None..None
- BLK-AUTO-2B9786A5  pass  rows None..None
- BLK-SHR-EB44767A  pass  rows None..None
- BLK-AUTO-2B9786A5  pass  rows None..None
- BLK-AUTO-D2C3A480  pass  rows None..None
- BLK-AUTO-DF07A781  pass  rows None..None
- BLK-SGL-C17F75BC  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|照会・検索画面 file=02_r015_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r18 表示|照会・検索画面 file=03_r018_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r20 遷移|申請・確認更新画面 file=06_r020_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r23 遷移|担当者検索画面 file=07_r023_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r26 表示|担当者検索画面 file=09_r026_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r28 遷移|申請・確認更新画面 file=10_r028_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r30 遷移|担当者検索画面 file=11_r030_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r33 表示|担当者検索画面 file=12_r033_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r35 遷移|申請・確認更新画面 file=13_r035_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r37 表示|申請・確認更新画面 file=14_r037_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r39 遷移|送信先(写)選択画面 file=18_r039_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r42 表示|送信先(写)選択画面 file=20_r042_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r47 遷移|申請・確認更新画面 file=21_r047_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-120-01-010/01_menu.png
- logs/AY-120-01-010/02_r015_照会・検索画面.png
- logs/AY-120-01-010/03_r018_照会・検索画面.png
- logs/AY-120-01-010/06_r020_申請・確認更新画面.png
- logs/AY-120-01-010/07_r023_担当者検索画面.png
- logs/AY-120-01-010/09_r026_担当者検索画面.png
- logs/AY-120-01-010/10_r028_申請・確認更新画面.png
- logs/AY-120-01-010/11_r030_担当者検索画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
