# AUDIT DOSSIER — AY-120-02-017

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線１７", "item": "（部支店長承認）", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-120-02-017.xlsx"}
feasibility: class=C flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=4 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「申請・承認」押下|－
- r15 | CK[2]遷移|申請承認一覧画面|検索結果 | EV:画面HC
- r16 | OP[1]クリック|課支社長　申請表示条件の「10：申請依頼」|チェックする（他の項目全部チェックなし）
- r17 | OP[2]ボタン|「再表示」押下|-
- r18 | CK[3]表示|申請承認一覧画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r19 | OP[4]ボタン|「申請」押下|【別紙】表示内容　１　参照
- r20 | CK[5]遷移|取消計上申請承認画面|【別紙】表示内容　２　参照 | EV:画面HC
- r21 | OP[1]ボタン|「承認依頼先選択」押下|－
- r22 | CK[2]表示|担当者検索画面|初期値 | EV:画面HC
- r23 | OP[1]入力|「氏名」入力|「部支店長」
- r24 | OP[]|「課支社CD」入力|「ABM62」 ※変更となる可能性あり
- r25 | OP[2]ボタン|「検索」押下|－
- r26 | CK[3]表示|担当者検索画面|検索結果 | EV:画面HC
- r27 | OP[4]クリック|「No.」リンククリック|－
- r28 | CK[5]遷移|取消計上申請承認画面|【別紙】表示内容　３　参照 | EV:画面HC
- r29 | OP[1]ボタン|「承認代行者選択」押下|-
- r30 | CK[2]遷移|担当者検索画面|初期値 | EV:画面HC
- r31 | OP[1]入力|「氏名」入力|「部支店長」
- r32 | OP[]|「課支社CD」入力|「ABM62」 ※変更となる可能性あり
- r33 | OP[2]ボタン|「検索」押下|－
- r34 | CK[3]表示|担当者検索画面|検索結果 | EV:画面HC
- r35 | OP[4]クリック|「No.」リンククリック|－
- r36 | CK[5]遷移|取消計上申請承認画面|【別紙】表示内容　4　参照 | EV:画面HC
- r37 | OP[1]ボタン|「承認依頼」押下|－
- r38 | CK[2]遷移|送信先(写)選択画面|－ | EV:画面HC
- r39 | OP[1]入力|「氏名」入力|「黒川　京子」
- r40 | OP[2]ボタン|「検索」押下|－
- r41 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r42 | OP[4]クリック|「No.」リンククリック|－
- r43 | OP[5]ボタン|「OK」押下|－
- r44 | CK[6]出力（Msg）|メッセージ|「MAYG901I008」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r45 | OP[7]ボタン|「OK」押下|－
- r46 | CK[8]遷移|取消計上申請承認画面|【別紙】表示内容　5　参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: A2:L3
sheets[0]/rows[0][1]: 〇ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、「課支社長」のユーザを設定。
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AL91
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 証券番号
sheets[1]/rows[2][12]: AY12001
sheets[1]/rows[3][1]: 明細番号
sheets[1]/rows[3][12]: 0000000047
sheets[1]/rows[4][0]: 2
sheets[1]/rows[4][1]: 申請・確認状況
sheets[1]/rows[4][12]: 申請依頼
sheets[1]/rows[5][1]: 異例管理番号
sheets[1]/rows[5][12]: 空白
sheets[1]/rows[6][1]: 消込状況
sheets[1]/rows[6][12]: 未消込
sheets[1]/rows[7][1]: 申請入力者
sheets[1]/rows[7][12]: 申請したユーザ（営業）
sheets[1]/rows[8][1]: 申請入力日
sheets[1]/rows[8][12]: 申請依頼したシステム日時
sheets[1]/rows[9][1]: 申請者
sheets[1]/rows[9][12]: 空白
sheets[1]/rows[10][1]: 申請日
sheets[1]/rows[10][12]: 空白
sheets[1]/rows[11][1]: 承認者
sheets[1]/rows[11][12]: 空白
sheets[1]/rows[12][1]: 承認日
sheets[1]/rows[12][12]: 空白
sheets[1]/rows[13][1]: コンプラ情報システム連携日
sheets[1]/rows[13][12]: 空白
sheets[1]/rows[14][1]: 要再申請依頼者
sheets[1]/rows[14][12]: 空白
sheets[1]/rows[15][1]: 要再申請依頼日
sheets[1]/rows[15][12]: 空白
sheets[1]/rows[16][1]: 登録者
sheets[1]/rows[16][12]: 登録したユーザ（営業）
sheets[1]/rows[17][1]: 登録日
sheets[1]/rows[17][12]: 新規入力時のシステム日
sheets[1]/rows[18][1]: 更新者
sheets[1]/rows[18][12]: 前回更新したユーザ（営業）
sheets[1]/rows[19][1]: 更新日
sheets[1]/rows[19][12]: 申請依頼したシステム日時
sheets[1]/rows[20][1]: 申請・確認基準項目
sheets[1]/rows[20][12]: 4.再計上契約のある取消計上（積立種目）
sheets[1]/rows[20][36]: 新規入力時の入力内容と同一
sheets[1]/rows[21][1]: 課支社CD
sheets[1]/rows[21][12]: ABM62
sheets[1]/rows[21][36]: 新規入力時の入力内容と同一
sheets[1]/rows[22][1]: 課支社名称
sheets[1]/rows[22][12]: （ABM62）
sheets[1]/rows[23][1]: 代理店CD
sheets[1]/rows[23][12]: 2031
sheets[1]/rows[23][36]: 新規入力時の入力内容と同一
sheets[1]/rows[24][1]: 代理店名称
sheets[1]/rows[24][12]: （2031）
sheets[1]/rows[25][1]: 証券番号
sheets[1]/rows[25][12]: AY12001
sheets[1]/rows[25][36]: 新規入力時の入力内容と同一
sheets[1]/rows[26][1]: 明細番号
sheets[1]/rows[26][12]: 0000000047
sheets[1]/rows[26][36]: 新規入力時の入力内容と同一
sheets[1]/rows[27][1]: 保険契約者氏名
sheets[1]/rows[27][12]: テスト
sheets[1]/rows[27][36]: 新規入力時の入力内容と同一
sheets[1]/rows[28][1]: 大種目
sheets[1]/rows[28][12]: 積傷/積特
sheets[1]/rows[28][36]: 新規入力時の入力内容と同一
sheets[1]/rows[29][1]: 保種
sheets[1]/rows[29][12]: 02：健康生活積立傷害
sheets[1]/rows[29][36]: 新規入力時の入力内容と同一
sheets[1]/rows[30][1]: 取消保険料
sheets[1]/rows[30][12]: 1234
sheets[1]/rows[30][36]: 新規入力時の入力内容と同一
sheets[1]/rows[31][1]: 再計上証券番号
sheets[1]/rows[31][12]: 空白
sheets[1]/rows[32][1]: 再計上明細番号
sheets[1]/rows[32][12]: 空白
sheets[1]/rows[33][1]: 証券送付区分
sheets[1]/rows[33][12]: 直送
sheets[1]/rows[33][36]: 新規入力時の入力内容と同一
sheets[1]/rows[34][1]: 変更確認書送付
sheets[1]/rows[34][12]: 直送
sheets[1]/rows[34][36]: 新規入力時の入力内容と同一
sheets[1]/rows[35][1]: 変更確認書課支社送付の理由
sheets[1]/rows[35][12]: テスト理由
sheets[1]/rows[35][36]: 新規入力時の入力内容と同一
sheets[1]/rows[36][1]: 申込日(原契約の申込日)
sheets[1]/rows[36][12]: 20260303
sheets[1]/rows[36][36]: 新規入力時の入力内容と同一
sheets[1]/rows[37][1]: 始期日
sheets[1]/rows[37][12]: 20260404
sheets[1]/rows[37][36]: 新規入力時の入力内容と同一
sheets[1]/rows[38][1]: 届出日(変更届出書の届出日)
sheets[1]/rows[38][12]: 20260505
sheets[1]/rows[38][36]: 新規入力時の入力内容と同一
sheets[1]/rows[39][1]: 取消・変更の計上日
sheets[1]/rows[39][12]: 空白
sheets[1]/rows[40][1]: 異例取扱理由
sheets[1]/rows[40][12]: A.当社・代理店の責による意図しない保険契約の解消
sheets[1]/rows[40][36]: 新規入力時の入力内容と同一
sheets[1]/rows[41][1]: 具体的内容
sheets[1]/rows[41][12]: 募集人(代理店)の説明誤り
sheets[1]/rows[41][36]: 新規入力時の入力内容と同一
sheets[1]/rows[42][1]: 具体的説明
sheets[1]/rows[42][12]: テスト
sheets[1]/rows[42][36]: 新規入力時の入力内容と同一
sheets[1]/rows[43][1]: 代理店への募集状況の確認要否
sheets[1]/rows[43][12]: 不要
sheets[1]/rows[43][36]: 新規入力時の入力内容と同一
sheets[1]/rows[44][1]: 実施日
sheets[1]/rows[44][12]: 空白
sheets[1]/rows[45][1]: 実施方法
sheets[1]/rows[45][12]: 空白
sheets[1]/rows[46][1]: 実施者(社員)
sheets[1]/rows[46][12]: 空白
sheets[1]/rows[47][1]: 対象者(募集人名)
sheets[1]/rows[47][12]: 空白
sheets[1]/rows[48][1]: 募集方法
sheets[1]/rows[48][12]: 空白
sheets[1]/rows[49][1]: 募集実施日
sheets[1]/rows[49][12]: 空白
sheets[1]/rows[50][1]: その他の募集方法
sheets[1]/rows[50][12]: 空白
sheets[1]/rows[51][1]: 重要事項説明
sheets[1]/rows[51][12]: 空白
sheets[1]/rows[52][1]: 契約内容の確認
sheets[1]/rows[52][12]: 空白
sheets[1]/rows[53][1]: 契約意思の確認
sheets[1]/rows[53][12]: 空白
sheets[1]/rows[54][2]: 契約手続実施者
sheets[1]/rows[54][12]: 空白
sheets[1]/rows[55][1]: 今後の活動に対する指導
sheets[1]/rows[55][12]: 空白
sheets[1]/rows[56][1]: 保険始期日と届出日の関係
sheets[1]/rows[56][12]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
sheets[1]/rows[56][36]: 新規入力時の入力内容と同一
sheets[1]/rows[57][1]: 実施日
sheets[1]/rows[57][12]: 空白
sheets[1]/rows[58][1]: 実施方法
sheets[1]/rows[58][12]: 空白
sheets[1]/rows[59][1]: 実施者(社員)
sheets[1]/rows[59][12]: 空白
sheets[1]/rows[60][1]: 対象者(募集人名)
sheets[1]/rows[60][12]: 空白
sheets[1]/rows[61][1]: 募集方法
sheets[1]/rows[61][12]: 空白
sheets[1]/rows[62][1]: 募集実施日
sheets[1]/rows[62][12]: 空白
sheets[1]/rows[63][1]: その他の募集方法
sheets[1]/rows[63][12]: 空白
sheets[1]/rows[64][1]: 重要事項説明
sheets[1]/rows[64][12]: 空白
sheets[1]/rows[65][1]: 契約内容の確認
sheets[1]/rows[65][12]: 空白
sheets[1]/rows[66][1]: 契約意思の確認
sheets[1]/rows[66][12]: 空白
sheets[1]/rows[67][2]: 契約手続実施者
sheets[1]/rows[67][12]: 空白
sheets[1]/rows[68][1]: 異例取扱理由
sheets[1]/rows[68][12]: 空白
sheets[1]/rows[69][1]: 異例取扱理由備考
sheets[1]/rows[69][12]: 空白
sheets[1]/rows[70][1]: 契約者からの不満足の表明
sheets[1]/rows[70][12]: 空白
sheets[1]/rows[71][1]: (有の場合、CS・苦情システムに登録)
sheets[1]/rows[72][1]: CS・苦情システム　苦情No
sheets[1]/rows[72][12]: 空白
sheets[1]/rows[73][1]: 募集行為に問題の可能性
sheets[1]/rows[73][12]: 空白
sheets[1]/rows[74][1]: (有の場合、コンプラ情報システムに登録)
sheets[1]/rows[75][1]: コンプラ情報システム　管理No
sheets[1]/rows[75][12]: 空白
sheets[1]/rows[76][1]: 申請依頼先
sheets[1]/rows[76][12]: 課支社長
sheets[1]/rows[76][36]: 新規入力時の入力内容と同一
sheets[1]/rows[77][1]: 申請代行者
sheets[1]/rows[77][12]: 課支社長
sheets[1]/rows[78][1]: 承認依頼／要再申請依頼理由
sheets[1]/rows[78][12]: 空白
sheets[1]/rows[79][1]: 承認依頼先
sheets[1]/rows[79][12]: 空白
sheets[1]/rows[80][1]: 承認代行者
sheets[1]/rows[80][12]: 空白
sheets[1]/rows[81][1]: 承認／要再申請依頼理由
sheets[1]/rows[81][12]: 空白
sheets[1]/rows[82][1]: 承認後・不承認後の対応
sheets[1]/rows[82][12]: 空白
sheets[1]/rows[83][0]: 3
sheets[1]/rows[83][1]: 承認依頼先
sheets[1]/rows[83][12]: 部支店長
sheets[1]/rows[83][36]: 反映されること
sheets[1]/rows[84][0]: 4
sheets[1]/rows[84][1]: 承認代行者
sheets[1]/rows[84][12]: 部支店長
sheets[1]/rows[84][36]: 反映されること
sheets[1]/rows[85][0]: 5
sheets[1]/rows[85][1]: 申請・確認状況
sheets[1]/rows[85][12]: 承認待ち
sheets[1]/rows[85][36]: 申請依頼→承認待ちになることを確認
sheets[1]/rows[86][1]: 申請者
sheets[1]/rows[86][12]: ログインユーザ
sheets[1]/rows[86][36]: 更新されること
sheets[1]/rows[87][1]: 申請日
sheets[1]/rows[87][12]: 申請したシステム日時
sheets[1]/rows[87][36]: 更新されること
sheets[1]/rows[88][1]: 更新者
sheets[1]/rows[88][12]: ログインユーザ
sheets[1]/rows[88][36]: 更新されること
sheets[1]/rows[89][1]: 更新日
sheets[1]/rows[89][12]: 申請したシステム日時
sheets[1]/rows[89][36]: 更新されること

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
- startSelector = "#route3"  <- auto.json
- startUrl = "/ANB00/ANA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=34: user,pointCheck,sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AUTO-042B2DAE  rows 14..15  status3=coded
  screen=AYG001->AYG202B file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route4" val=""
  - [click] click 申請・承認 sel="#route4" val=""
  - [assert] ast transition 申請承認一覧画面 sel="#department_app_status_2" val=""
  - [assert] ast 承認表示条件 sel="#section_app_status_2" val=""
### BLK-AUTO-ADFFD6FB  rows 16..20  status3=coded
  screen=AYG202B->AYG102 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [check] check 課支社長 申請表示条件 10:申請依頼 sel="#section_app_status_2" val=""
  - [click] click 再表示 sel="#select" val=""
  - [assert] ast display 申請承認一覧画面 sel="#gyoumu_list" val=""
  - [assert] ast 申請表示条件 再表示後 sel="#section_app_status_2" val=""
  - [click] click 申請 sel="#act202to102" val=""
  - [assert] ast transition 取消計上申請承認画面 sel="#div_gyoumu_area_04" val=""
### BLK-SHR-8546478D  rows 21..38  status3=coded
  screen=ANA04 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 承認依頼先選択 sel="input[name='selectReqApproverUser']" val=""
  - [popup] ast 表示 担当者検索画面 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 担当者検索画面(検索結果) sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(承認依頼先) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 取消計上申請承認画面 sel="#act102to001" val=""
  - [click] click 承認代行者選択 sel="input[name='selectActApproverUser']" val=""
  - [popup] ast 遷移 担当者検索画面 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 担当者検索画面(検索結果) sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(承認代行者) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 取消計上申請承認画面 sel="#act102to001" val=""
  - [click] click 承認依頼 sel="#approveButton" val=""
  - [popup] ast 遷移 送信先(写)選択画面 sel="" val=""
### BLK-AUTO-27C68433  rows 39..46  status3=coded
  screen=ANA11->ANA04 file=block-selectors-ay-form-slice.json
  - [popup] ast 送信先(写)選択 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(送信先一覧へ追加) sel="#gyoumu_list a" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast メッセージ(MAYG901I00x) sel="#popup_message_area" val="MAYG901" (popup) NOTE:mockはメッセージを画面内表示。真機はポップアップMsg=真機人工
  - [click] click OK(確認Msg) sel="input[name='ok']" val="" (popup)
  - [assert] ast 遷移 取消計上申請承認画面 sel="#act101to001, #act102to001" val="" NOTE:popup OK後、呼出元へ戻る。取消/申請依頼からの場合はmockルーティングの都合で申請・確認更新(ANA03)に留まる=mock-routes ANA03/route15・route10 が ANA04 を指していないため=要mock-routes修正

## 5. 本次运行结果（块级）
- BLK-AUTO-042B2DAE  pass  rows None..None
- BLK-AUTO-ADFFD6FB  pass  rows None..None
- BLK-SHR-8546478D  pass  rows None..None
- BLK-AUTO-27C68433  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|申請承認一覧画面 file=02_r015_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r18 表示|申請承認一覧画面 file=03_r018_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r20 遷移|取消計上申請承認画面 file=05_r020_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r22 表示|担当者検索画面 file=07_r022_担当者検索画面.png url=...over&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r26 表示|担当者検索画面 file=08_r026_担当者検索画面.png url=...over&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r28 遷移|取消計上申請承認画面 file=09_r028_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r30 遷移|担当者検索画面 file=10_r030_担当者検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA10.html
- [OK ] r34 表示|担当者検索画面 file=11_r034_担当者検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA10.html
- [OK ] r36 遷移|取消計上申請承認画面 file=12_r036_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r38 遷移|送信先(写)選択画面 file=13_r038_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r41 表示|送信先(写)選択画面 file=15_r041_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r46 遷移|取消計上申請承認画面 file=16_r046_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-120-02-017/01_menu.png
- logs/AY-120-02-017/02_r015_申請承認一覧画面.png
- logs/AY-120-02-017/03_r018_申請承認一覧画面.png
- logs/AY-120-02-017/05_r020_取消計上申請承認画面.png
- logs/AY-120-02-017/07_r022_担当者検索画面.png
- logs/AY-120-02-017/08_r026_担当者検索画面.png
- logs/AY-120-02-017/09_r028_取消計上申請承認画面.png
- logs/AY-120-02-017/10_r030_担当者検索画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
