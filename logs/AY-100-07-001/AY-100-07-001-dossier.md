# AUDIT DOSSIER — AY-100-07-001

meta: {"domain": "AY", "company": "MS", "functionName": "ESBエラー（異例）", "item": "共通", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-100-07-001（廃止前の方法）.xlsx"}
feasibility: class=B flow=pass manualSteps=12 proxyBlocks=8 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=16 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r16 | OP[1]ボタン|「照会・検索」押下|
- r17 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認）
- r18 | OP[1]入力|各画面項目入力|【別紙】操作内容　の 操作内容1　参照
- r19 | OP[2]ボタン|「検索」押下|
- r20 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示されること | EV:画面HC
- r21 | OP[4]入力|ダウンロード申請番号|A999999999
- r22 | OP[5]ボタン|「検索結果出力」押下|
- r23 | CK[6]出力（Msg）|エラーメッセージ|バリデーション例外が発生した旨のメッセージが表示されること | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r24 | OP[7]クリック|No.リンク|
- r25 | CK[8]遷移|申請・確認更新画面|遷移すること | EV:画面HC
- r26 | OP[1]ボタン|「申請依頼先選択」押下|
- r27 | CK[2]遷移|担当者検索画面|初期値 | EV:画面HC
- r28 | OP[1]入力|各項目に入力|【別紙】操作内容　の 操作内容2　参照
- r29 | OP[2]ボタン|「検索」押下|
- r30 | CK[3]表示|担当者検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r31 | OP[4]クリック|「NO」をクリック|-
- r32 | CK[5]遷移|申請・確認更新画面|選択した担当者情報が画面に設定される | EV:画面HC
- r33 | OP[1]ボタン|「申請依頼」押下|-
- r34 | CK[2]表示|送信先(写)選択画面|初期値 | EV:画面HC
- r35 | EV:APﾛｸﾞ
- r36 | OP[1]入力|「氏名」入力|「黒川　京子」
- r37 | OP[2]ボタン|「検索」押下|－
- r38 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r39 | OP[4]クリック|「No.」リンククリック|－
- r40 | OP[5]ボタン|「OK」押下|－
- r41 | CK[6]出力（Msg）|メッセージ|「MAYG901I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r42 | OP[7]ボタン|「OK」押下|－
- r43 | CK[8]出力（Msg）|エラーメッセージ|バリデーション例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r44 | CK[9]表示|申請・確認更新画面|画面項目変化なし | EV:画面HC
- r45 | CK[10]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r46 | CK[11]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r47 | CK[12]その他|取消計上申請テーブル|データが更新されないこと | EV:DBﾀﾞﾝﾌﾟ
- r51 | OP[1]ボタン|「照会・検索」押下|
- r52 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認）
- r53 | OP[1]入力|各画面項目入力|【別紙】操作内容　の 操作内容3　参照
- r54 | OP[2]ボタン|「検索」押下|
- r55 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示されること | EV:画面HC
- r56 | OP[4]入力|ダウンロード申請番号|Z990000002
- r57 | OP[5]ボタン|「検索結果出力」押下|
- r58 | CK[6]出力（Msg）|エラーメッセージ|システム例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r59 | OP[7]クリック|No.リンク|
- r60 | CK[8]遷移|申請・確認更新画面|遷移すること | EV:画面HC
- r61 | OP[1]ボタン|「申請依頼先選択」押下|
- r62 | CK[2]遷移|担当者検索画面|初期値 | EV:画面HC
- r63 | OP[1]入力|各項目に入力|【別紙】操作内容　の 操作内容4　参照
- r64 | OP[2]ボタン|「検索」押下|
- r65 | CK[3]表示|担当者検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r66 | OP[4]クリック|「NO」をクリック|-
- r67 | CK[5]遷移|申請・確認更新画面|選択した担当者情報が画面に設定される | EV:画面HC
- r68 | OP[1]ボタン|「申請依頼」押下|-
- r69 | CK[2]表示|送信先(写)選択画面|初期値 | EV:画面HC
- r70 | EV:APﾛｸﾞ
- r71 | OP[1]入力|「氏名」入力|「黒川　京子」
- r72 | OP[2]ボタン|「検索」押下|－
- r73 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r74 | OP[4]クリック|「No.」リンククリック|－
- r75 | OP[5]ボタン|「OK」押下|－
- r76 | CK[6]出力（Msg）|メッセージ|「MAYG901I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r77 | OP[7]ボタン|「OK」押下|－
- r78 | CK[8]出力（Msg）|エラーメッセージ|システム例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r79 | CK[9]表示|申請・確認更新画面|画面項目変化なし | EV:画面HC
- r80 | CK[10]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r81 | CK[11]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r82 | CK[12]その他|取消計上申請テーブル|データが更新されないこと | EV:DBﾀﾞﾝﾌﾟ
- r86 | OP[1]ボタン|「照会・検索」押下|
- r87 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認）
- r88 | OP[1]入力|各画面項目入力|【別紙】操作内容　の 操作内容5　参照
- r89 | OP[2]ボタン|「検索」押下|
- r90 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示されること | EV:画面HC
- r91 | OP[4]入力|ダウンロード申請番号|Z990000002
- r92 | OP[5]ボタン|「検索結果出力」押下|
- r93 | CK[6]出力（Msg）|エラーメッセージ|サービス時間外例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r94 | OP[7]クリック|No.リンク|
- r95 | CK[8]遷移|申請・確認更新画面|遷移すること | EV:画面HC
- r96 | OP[1]ボタン|「申請依頼先選択」押下|
- r97 | CK[2]遷移|担当者検索画面|初期値 | EV:画面HC
- r98 | OP[1]入力|各項目に入力|【別紙】操作内容　の 操作内容6　参照
- r99 | OP[2]ボタン|「検索」押下|
- r100 | CK[3]表示|担当者検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r101 | OP[4]クリック|「NO」をクリック|-
- r102 | CK[5]遷移|申請・確認更新画面|選択した担当者情報が画面に設定される | EV:画面HC
- r103 | OP[1]ボタン|「申請依頼」押下|-
- r104 | CK[2]表示|送信先(写)選択画面|初期値 | EV:画面HC
- r105 | EV:APﾛｸﾞ
- r106 | OP[1]入力|「氏名」入力|「黒川　京子」
- r107 | OP[2]ボタン|「検索」押下|－
- r108 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r109 | OP[4]クリック|「No.」リンククリック|－
- r110 | OP[5]ボタン|「OK」押下|－
- r111 | CK[6]出力（Msg）|メッセージ|「MAYG901I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r112 | OP[7]ボタン|「OK」押下|－
- r113 | CK[8]出力（Msg）|エラーメッセージ|サービス時間外例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r114 | CK[9]表示|申請・確認更新画面|画面項目変化なし | EV:画面HC
- r115 | CK[10]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r116 | CK[11]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r117 | CK[12]その他|取消計上申請テーブル|データが更新されないこと | EV:DBﾀﾞﾝﾌﾟ
- r121 | OP[1]ボタン|「照会・検索」押下|
- r122 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認）
- r123 | OP[1]入力|各画面項目入力|【別紙】操作内容　の 操作内容7　参照
- r124 | OP[2]ボタン|「検索」押下|
- r125 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示されること | EV:画面HC
- r126 | OP[4]入力|ダウンロード申請番号|Z990000002
- r127 | OP[5]ボタン|「検索結果出力」押下|
- r128 | CK[6]出力（Msg）|エラーメッセージ|サービス通信時例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r129 | OP[7]クリック|No.リンク|
- r130 | CK[8]遷移|申請・確認更新画面|遷移すること | EV:画面HC
- r131 | OP[1]ボタン|「申請依頼先選択」押下|
- r132 | CK[2]遷移|担当者検索画面|初期値 | EV:画面HC
- r133 | OP[1]入力|各項目に入力|【別紙】操作内容　の 操作内容8　参照
- r134 | OP[2]ボタン|「検索」押下|
- r135 | CK[3]表示|担当者検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r136 | OP[4]クリック|「NO」をクリック|-
- r137 | CK[5]遷移|申請・確認更新画面|選択した担当者情報が画面に設定される | EV:画面HC
- r138 | OP[1]ボタン|「申請依頼」押下|-
- r139 | CK[2]表示|送信先(写)選択画面|初期値 | EV:画面HC
- r140 | EV:APﾛｸﾞ
- r141 | OP[1]入力|「氏名」入力|「黒川　京子」
- r142 | OP[2]ボタン|「検索」押下|－
- r143 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r144 | OP[4]クリック|「No.」リンククリック|－
- r145 | OP[5]ボタン|「OK」押下|－
- r146 | CK[6]出力（Msg）|メッセージ|「MAYG901I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r147 | OP[7]ボタン|「OK」押下|－
- r148 | CK[8]出力（Msg）|エラーメッセージ|サービス通信時例外が発生した旨のメッセージが表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r149 | CK[9]表示|申請・確認更新画面|画面項目変化なし | EV:画面HC
- r150 | CK[10]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r151 | CK[11]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r152 | CK[12]その他|取消計上申請テーブル|データが更新されないこと | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:D6
sheets[0]/rows[0][0]: ○テストデータ
sheets[0]/rows[2][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\02 異例取扱管理\AY-100-07\AY-100-07-001＞
sheets[0]/rows[4][2]: テストデータ_AY-100-07-001.xlsx　のレコードをDBに追加
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:BF53
sheets[1]/rows[0][0]: ○リリース
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\02 異例取扱管理\AY-100-07\AY-100-07-001＞
sheets[1]/rows[3][2]: 事前準備（リリース関連）_AY-100-07-001.txt の①　参照
sheets[1]/rows[4][0]: 2
sheets[1]/rows[4][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\02 異例取扱管理\AY-100-07\AY-100-07-001＞
sheets[1]/rows[5][2]: 事前準備（リリース関連）_AY-100-07-001.txt の②　参照
sheets[1]/rows[6][0]: 3
sheets[1]/rows[6][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\02 異例取扱管理\AY-100-07\AY-100-07-001＞
sheets[1]/rows[7][2]: 事前準備（リリース関連）_AY-100-07-001.txt の③　参照
sheets[1]/rows[8][0]: 4
sheets[1]/rows[8][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\02 異例取扱管理\AY-100-07\AY-100-07-001＞
sheets[1]/rows[9][2]: 事前準備（リリース関連）_AY-100-07-001.txt の④　参照
sheets[1]/rows[10][0]: 5
sheets[1]/rows[10][1]: ＜\\189.195.50.190\work\004 開発案件\_2027年度サーバ更改対応\600 結合試験工程\G602 結合試験手順書\テストデータ関連\02 異例取扱管理\AY-100-07\AY-100-07-001＞
sheets[1]/rows[11][2]: 事前準備（リリース関連）_AY-100-07-001.txt の⑤　参照
sheets[1]/rows[14][0]: 〇ログイン情報
sheets[1]/rows[16][0]: 1
sheets[1]/rows[16][1]: ユーザＩＤ
sheets[1]/rows[16][9]: TESTE01
sheets[1]/rows[17][1]: 課支社コード
sheets[1]/rows[17][9]: ABK61
sheets[1]/rows[18][1]: 役職段階コード
sheets[1]/rows[18][9]: 70
sheets[1]/rows[19][0]: 2
sheets[1]/rows[19][1]: ユーザＩＤ
sheets[1]/rows[19][9]: C01-SF1
sheets[1]/rows[20][1]: 課支社コード
sheets[1]/rows[20][9]: ABK61
sheets[1]/rows[21][1]: 役職段階コード
sheets[1]/rows[21][9]: 65
sheets[1]/rows[22][0]: 3
sheets[1]/rows[22][1]: ユーザＩＤ
sheets[1]/rows[22][9]: C02-OSF1
sheets[1]/rows[23][1]: 課支社コード
sheets[1]/rows[23][9]: ABK61
sheets[1]/rows[24][1]: 役職段階コード
sheets[1]/rows[24][9]: 65
sheets[1]/rows[25][0]: 4
sheets[1]/rows[25][1]: ユーザＩＤ
sheets[1]/rows[25][9]: C03-DLY1
sheets[1]/rows[26][1]: 課支社コード
sheets[1]/rows[26][9]: ABK61
sheets[1]/rows[27][1]: 役職段階コード
sheets[1]/rows[27][9]: 65
sheets[1]/rows[30][0]: 〇操作内容
sheets[1]/rows[32][0]: 1
sheets[1]/rows[32][1]: 課支社CD
sheets[1]/rows[32][9]: ABK61
sheets[1]/rows[33][1]: 証券番号
sheets[1]/rows[33][9]: AY10007
sheets[1]/rows[34][1]: 明細番号
sheets[1]/rows[34][9]: 0000000001
sheets[1]/rows[35][0]: 2
sheets[1]/rows[35][1]: 氏名
sheets[1]/rows[35][9]: バリデe
sheets[1]/rows[36][1]: 課支社コード
sheets[1]/rows[36][9]: ABK61
sheets[1]/rows[37][0]: 3
sheets[1]/rows[37][1]: 課支社CD
sheets[1]/rows[37][9]: ABK61
sheets[1]/rows[38][1]: 証券番号
sheets[1]/rows[38][9]: AY10007
sheets[1]/rows[39][1]: 明細番号
sheets[1]/rows[39][9]: 0000000002
sheets[1]/rows[40][0]: 4
sheets[1]/rows[40][1]: 氏名
sheets[1]/rows[40][9]: SYSE
sheets[1]/rows[41][1]: 課支社コード
sheets[1]/rows[41][9]: ABK61
sheets[1]/rows[42][0]: 5
sheets[1]/rows[42][1]: 課支社CD
sheets[1]/rows[42][9]: ABK61
sheets[1]/rows[43][1]: 証券番号
sheets[1]/rows[43][9]: AY10007
sheets[1]/rows[44][1]: 明細番号
sheets[1]/rows[44][9]: 0000000003
sheets[1]/rows[45][0]: 6
sheets[1]/rows[45][1]: 氏名
sheets[1]/rows[45][9]: サービス
sheets[1]/rows[46][1]: 課支社コード
sheets[1]/rows[46][9]: ABK61
sheets[1]/rows[47][0]: 7
sheets[1]/rows[47][1]: 課支社CD
sheets[1]/rows[47][9]: ABK61
sheets[1]/rows[48][1]: 証券番号
sheets[1]/rows[48][9]: AY10007
sheets[1]/rows[49][1]: 明細番号
sheets[1]/rows[49][9]: 0000000004
sheets[1]/rows[50][0]: 8
sheets[1]/rows[50][1]: 氏名
sheets[1]/rows[50][9]: サービス
sheets[1]/rows[51][1]: 課支社コード
sheets[1]/rows[51][9]: ABK61

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000004"  <- generated.json
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
- policyNo = "AY10007"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "ABK61"  <- generated.json
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
### BLK-AUTO-E2D0C359  rows 16..17  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SHR-C69800AD  rows 18..27  status3=coded
  screen=AYG200->AYG101->AYG900 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 sel="#download_number" val="A999999999"
  - [click] click 検索結果出力 sel="#outputCSV" val=""
  - [assert] ast message エラーメッセージ sel="#download_confirm_area" val="MAYG200" NOTE:非浏览器=真機人工（バリデーション/システム例外メッセージ本文）
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請依頼先選択 sel="input[name='selectReqApplicantUser']" val=""
  - [popup] popup 担当者検索 sel="" val=""
  - [assert] ast transition 担当者検索画面 sel="#gyoumu_list" val="" (popup)
### BLK-AUTO-2B9786A5  rows 28..32  status3=coded
  screen=ANA10->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 担当者検索 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(選択) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:選択した担当者情報が呼出元へ設定される
### BLK-SHR-77BF51A5  rows 33..47  status3=coded
  screen=ANA03->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 申請依頼 sel="#requestApplicationButton" val=""
  - [popup] ast 表示 送信先(写)選択画面 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 送信先(写)選択画面(検索結果) sel="#gyoumu_list tr" val="" (popup)
  - [click] click No sel="#gyoumu_list a" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast メッセージ(MAYG901I001) sel="#popup_message_area" val="MAYG901" (popup) NOTE:mockはメッセージを画面内表示。真機はポップアップMsg=真機人工
  - [click] click OK(確認Msg) sel="input[name='ok']" val="" (popup)
  - [assert] ast エラーメッセージ sel="#act101to001" val="" NOTE:バリデーション例外Msg=非浏览器/真機人工（mockは画面在位で代理）
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val="" NOTE:画面項目変化なし
  - [assert] ast APログ sel="#act101to001" val="" NOTE:APログ出力=非浏览器=真機人工
  - [assert] ast DBログ sel="#act101to001" val="" NOTE:DBログ出力=非浏览器=真機人工
  - [assert] ast 取消計上申請テーブル sel="#act101to001" val="" NOTE:データ未更新=非浏览器=真機人工
### BLK-AUTO-E2D0C359  rows 51..52  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SHR-C69800AD  rows 53..62  status3=coded
  screen=AYG200->AYG101->AYG900 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 sel="#download_number" val="A999999999"
  - [click] click 検索結果出力 sel="#outputCSV" val=""
  - [assert] ast message エラーメッセージ sel="#download_confirm_area" val="MAYG200" NOTE:非浏览器=真機人工（バリデーション/システム例外メッセージ本文）
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請依頼先選択 sel="input[name='selectReqApplicantUser']" val=""
  - [popup] popup 担当者検索 sel="" val=""
  - [assert] ast transition 担当者検索画面 sel="#gyoumu_list" val="" (popup)
### BLK-AUTO-2B9786A5  rows 63..67  status3=coded
  screen=ANA10->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 担当者検索 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(選択) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:選択した担当者情報が呼出元へ設定される
### BLK-SHR-77BF51A5  rows 68..82  status3=coded
  screen=ANA03->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 申請依頼 sel="#requestApplicationButton" val=""
  - [popup] ast 表示 送信先(写)選択画面 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 送信先(写)選択画面(検索結果) sel="#gyoumu_list tr" val="" (popup)
  - [click] click No sel="#gyoumu_list a" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast メッセージ(MAYG901I001) sel="#popup_message_area" val="MAYG901" (popup) NOTE:mockはメッセージを画面内表示。真機はポップアップMsg=真機人工
  - [click] click OK(確認Msg) sel="input[name='ok']" val="" (popup)
  - [assert] ast エラーメッセージ sel="#act101to001" val="" NOTE:バリデーション例外Msg=非浏览器/真機人工（mockは画面在位で代理）
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val="" NOTE:画面項目変化なし
  - [assert] ast APログ sel="#act101to001" val="" NOTE:APログ出力=非浏览器=真機人工
  - [assert] ast DBログ sel="#act101to001" val="" NOTE:DBログ出力=非浏览器=真機人工
  - [assert] ast 取消計上申請テーブル sel="#act101to001" val="" NOTE:データ未更新=非浏览器=真機人工
### BLK-AUTO-E2D0C359  rows 86..87  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SHR-C69800AD  rows 88..97  status3=coded
  screen=AYG200->AYG101->AYG900 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 sel="#download_number" val="A999999999"
  - [click] click 検索結果出力 sel="#outputCSV" val=""
  - [assert] ast message エラーメッセージ sel="#download_confirm_area" val="MAYG200" NOTE:非浏览器=真機人工（バリデーション/システム例外メッセージ本文）
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請依頼先選択 sel="input[name='selectReqApplicantUser']" val=""
  - [popup] popup 担当者検索 sel="" val=""
  - [assert] ast transition 担当者検索画面 sel="#gyoumu_list" val="" (popup)
### BLK-AUTO-2B9786A5  rows 98..102  status3=coded
  screen=ANA10->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 担当者検索 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(選択) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:選択した担当者情報が呼出元へ設定される
### BLK-SHR-77BF51A5  rows 103..117  status3=coded
  screen=ANA03->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 申請依頼 sel="#requestApplicationButton" val=""
  - [popup] ast 表示 送信先(写)選択画面 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 送信先(写)選択画面(検索結果) sel="#gyoumu_list tr" val="" (popup)
  - [click] click No sel="#gyoumu_list a" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast メッセージ(MAYG901I001) sel="#popup_message_area" val="MAYG901" (popup) NOTE:mockはメッセージを画面内表示。真機はポップアップMsg=真機人工
  - [click] click OK(確認Msg) sel="input[name='ok']" val="" (popup)
  - [assert] ast エラーメッセージ sel="#act101to001" val="" NOTE:バリデーション例外Msg=非浏览器/真機人工（mockは画面在位で代理）
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val="" NOTE:画面項目変化なし
  - [assert] ast APログ sel="#act101to001" val="" NOTE:APログ出力=非浏览器=真機人工
  - [assert] ast DBログ sel="#act101to001" val="" NOTE:DBログ出力=非浏览器=真機人工
  - [assert] ast 取消計上申請テーブル sel="#act101to001" val="" NOTE:データ未更新=非浏览器=真機人工
### BLK-AUTO-E2D0C359  rows 121..122  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SHR-C69800AD  rows 123..132  status3=coded
  screen=AYG200->AYG101->AYG900 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list" val=""
  - [fill] fill ダウンロード申請番号 sel="#download_number" val="A999999999"
  - [click] click 検索結果出力 sel="#outputCSV" val=""
  - [assert] ast message エラーメッセージ sel="#download_confirm_area" val="MAYG200" NOTE:非浏览器=真機人工（バリデーション/システム例外メッセージ本文）
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請依頼先選択 sel="input[name='selectReqApplicantUser']" val=""
  - [popup] popup 担当者検索 sel="" val=""
  - [assert] ast transition 担当者検索画面 sel="#gyoumu_list" val="" (popup)
### BLK-AUTO-2B9786A5  rows 133..137  status3=coded
  screen=ANA10->ANA03 file=block-selectors-ay-form-slice.json
  - [popup] ast 担当者検索 popup表示 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [fill] input 課支社CD sel="#section_code_key" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 検索結果表示 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No(選択) sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 遷移 申請・確認更新画面 sel="#act101to001" val="" NOTE:選択した担当者情報が呼出元へ設定される
### BLK-SHR-77BF51A5  rows 138..152  status3=coded
  screen=ANA03->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 申請依頼 sel="#requestApplicationButton" val=""
  - [popup] ast 表示 送信先(写)選択画面 sel="" val=""
  - [fill] input 氏名 sel="#user_name_key" val="params.customerName" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 送信先(写)選択画面(検索結果) sel="#gyoumu_list tr" val="" (popup)
  - [click] click No sel="#gyoumu_list a" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast メッセージ(MAYG901I001) sel="#popup_message_area" val="MAYG901" (popup) NOTE:mockはメッセージを画面内表示。真機はポップアップMsg=真機人工
  - [click] click OK(確認Msg) sel="input[name='ok']" val="" (popup)
  - [assert] ast エラーメッセージ sel="#act101to001" val="" NOTE:バリデーション例外Msg=非浏览器/真機人工（mockは画面在位で代理）
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val="" NOTE:画面項目変化なし
  - [assert] ast APログ sel="#act101to001" val="" NOTE:APログ出力=非浏览器=真機人工
  - [assert] ast DBログ sel="#act101to001" val="" NOTE:DBログ出力=非浏览器=真機人工
  - [assert] ast 取消計上申請テーブル sel="#act101to001" val="" NOTE:データ未更新=非浏览器=真機人工

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SHR-C69800AD  pass  rows None..None
- BLK-AUTO-2B9786A5  pass  rows None..None
- BLK-SHR-77BF51A5  pass  rows None..None
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SHR-C69800AD  pass  rows None..None
- BLK-AUTO-2B9786A5  pass  rows None..None
- BLK-SHR-77BF51A5  pass  rows None..None
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SHR-C69800AD  pass  rows None..None
- BLK-AUTO-2B9786A5  pass  rows None..None
- BLK-SHR-77BF51A5  pass  rows None..None
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SHR-C69800AD  pass  rows None..None
- BLK-AUTO-2B9786A5  pass  rows None..None
- BLK-SHR-77BF51A5  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r20 表示|照会・検索画面 file=02_r020_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r25 遷移|申請・確認更新画面 file=04_r025_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r27 遷移|担当者検索画面 file=05_r027_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r30 表示|担当者検索画面 file=06_r030_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r32 遷移|申請・確認更新画面 file=08_r032_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r34 表示|送信先(写)選択画面 file=10_r034_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r38 表示|送信先(写)選択画面 file=11_r038_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r44 表示|申請・確認更新画面 file=12_r044_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r55 表示|照会・検索画面 file=14_r055_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r60 遷移|申請・確認更新画面 file=16_r060_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r62 遷移|担当者検索画面 file=17_r062_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r65 表示|担当者検索画面 file=18_r065_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r67 遷移|申請・確認更新画面 file=20_r067_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r69 表示|送信先(写)選択画面 file=22_r069_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r73 表示|送信先(写)選択画面 file=23_r073_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r79 表示|申請・確認更新画面 file=24_r079_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r90 表示|照会・検索画面 file=26_r090_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r95 遷移|申請・確認更新画面 file=28_r095_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r97 遷移|担当者検索画面 file=29_r097_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r100 表示|担当者検索画面 file=30_r100_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r102 遷移|申請・確認更新画面 file=32_r102_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r104 表示|送信先(写)選択画面 file=34_r104_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r108 表示|送信先(写)選択画面 file=35_r108_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r114 表示|申請・確認更新画面 file=36_r114_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r125 表示|照会・検索画面 file=38_r125_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r130 遷移|申請・確認更新画面 file=40_r130_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r132 遷移|担当者検索画面 file=41_r132_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r135 表示|担当者検索画面 file=42_r135_担当者検索画面.png url=...cant&gamid=ANA10&gamcd=ANA00&hubsessid=1
- [OK ] r137 遷移|申請・確認更新画面 file=44_r137_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r139 表示|送信先(写)選択画面 file=46_r139_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r143 表示|送信先(写)選択画面 file=47_r143_送信先(写)選択画面.png url=...tion&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r149 表示|申請・確認更新画面 file=48_r149_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-100-07-001/01_menu.png
- logs/AY-100-07-001/02_r020_照会・検索画面.png
- logs/AY-100-07-001/04_r025_申請・確認更新画面.png
- logs/AY-100-07-001/05_r027_担当者検索画面.png
- logs/AY-100-07-001/06_r030_担当者検索画面.png
- logs/AY-100-07-001/08_r032_申請・確認更新画面.png
- logs/AY-100-07-001/10_r034_送信先(写)選択画面.png
- logs/AY-100-07-001/11_r038_送信先(写)選択画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
