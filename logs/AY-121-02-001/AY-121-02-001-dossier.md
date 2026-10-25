# AUDIT DOSSIER — AY-121-02-001

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線１（現新あり）", "item": "不承認", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-121-02-001.xlsx"}
feasibility: class=C flow=pass manualSteps=3 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=5 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「申請・承認」押下|-
- r15 | CK[2]遷移|申請承認一覧画面|初期値or検索結果 | EV:画面HC
- r16 | OP[1]クリック|承認表示条件の「11：承認待ち」|チェックする（他の項目全部チェックなし）
- r17 | OP[2]ボタン|「再表示」押下|-
- r18 | CK[3]表示|申請承認一覧画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r19 | OP[4]ボタン|「承認」押下|事前準備で登録したレコードと合致する「承認」ボタンを押下
- r20 | CK[5]遷移|取消計上申請承認画面|【別紙】表示内容　１　参照 | EV:画面HC
- r21 | OP[1]入力|「承認／要再申請依頼理由」入力|「テスト」
- r22 | OP[2]ボタン|「不承認」押下|-
- r23 | CK[3]遷移|送信先(写)選択画面|初期値 | EV:画面HC
- r24 | OP[1]入力|「氏名」入力|「黒川　京子」
- r25 | OP[2]ボタン|「検索」ボタン押下|－
- r26 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r27 | OP[4]クリック|「No.」リンククリック|－
- r28 | OP[5]ボタン|「OK」ボタン押下|－
- r29 | CK[6]出力（Msg）|メッセージ|「MAYG901I011」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r30 | OP[7]ボタン|「OK」ボタン押下|－
- r31 | CK[8]遷移|取消計上申請承認画面|【別紙】表示内容　２　参照 | EV:画面HC
- r32 | CK[9]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r33 | CK[10]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r34 | CK[11]その他|取消計上申請テーブル|データが更新されたこと | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: A2:BD81
sheets[0]/rows[0][1]: 〇ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[0]/rows[3][1]: 〇1.データ準備（新規登録）
sheets[0]/rows[4][1]: ○以下内容の申請書を作成する。
sheets[0]/rows[6][1]: 1
sheets[0]/rows[6][2]: 申請・確認状況
sheets[0]/rows[6][13]: 承認待ち
sheets[0]/rows[7][2]: 異例管理番号
sheets[0]/rows[7][13]: 空白
sheets[0]/rows[8][2]: 消込状況
sheets[0]/rows[8][13]: 未消込
sheets[0]/rows[9][2]: 申請入力者
sheets[0]/rows[9][13]: 承認依頼したユーザ（営業）
sheets[0]/rows[10][2]: 申請入力日
sheets[0]/rows[10][13]: 承認依頼したシステム日時
sheets[0]/rows[11][2]: 申請者
sheets[0]/rows[11][13]: 承認依頼したユーザ（営業）
sheets[0]/rows[12][2]: 申請日
sheets[0]/rows[12][13]: 承認依頼したシステム日時
sheets[0]/rows[13][2]: 承認者
sheets[0]/rows[13][13]: 空白
sheets[0]/rows[14][2]: 承認日
sheets[0]/rows[14][13]: 空白
sheets[0]/rows[15][2]: コンプラ情報システム連携日
sheets[0]/rows[15][13]: 空白
sheets[0]/rows[16][2]: 要再申請依頼者
sheets[0]/rows[16][13]: 空白
sheets[0]/rows[17][2]: 要再申請依頼日
sheets[0]/rows[17][13]: 空白
sheets[0]/rows[18][2]: 登録者
sheets[0]/rows[18][13]: 登録したユーザ（営業）
sheets[0]/rows[19][2]: 登録日
sheets[0]/rows[19][13]: 新規入力時のシステム日
sheets[0]/rows[20][2]: 更新者
sheets[0]/rows[20][13]: 前回更新したユーザ（営業）
sheets[0]/rows[21][2]: 更新日
sheets[0]/rows[21][13]: 新規入力時のシステム日
sheets[0]/rows[22][2]: 申請・確認基準項目
sheets[0]/rows[22][13]: 1.再計上契約のない取消計上
sheets[0]/rows[22][37]: 新規入力時の入力内容と同一
sheets[0]/rows[23][2]: 課支社CD
sheets[0]/rows[23][13]: ABM62
sheets[0]/rows[23][37]: 新規入力時の入力内容と同一
sheets[0]/rows[24][2]: 課支社名称
sheets[0]/rows[24][13]: （ABM62）
sheets[0]/rows[25][2]: 代理店CD
sheets[0]/rows[25][13]: 2031
sheets[0]/rows[25][37]: 新規入力時の入力内容と同一
sheets[0]/rows[26][2]: 代理店名称
sheets[0]/rows[26][13]: （2031）
sheets[0]/rows[27][2]: 証券番号
sheets[0]/rows[27][13]: AY12102
sheets[0]/rows[27][37]: 新規入力時の入力内容と同一
sheets[0]/rows[28][2]: 明細番号
sheets[0]/rows[28][13]: 0000000085
sheets[0]/rows[28][37]: 新規入力時の入力内容と同一
sheets[0]/rows[29][2]: 保険契約者氏名
sheets[0]/rows[29][13]: テスト
sheets[0]/rows[29][37]: 新規入力時の入力内容と同一
sheets[0]/rows[30][2]: 大種目
sheets[0]/rows[30][13]: 自動車
sheets[0]/rows[30][37]: 新規入力時の入力内容と同一
sheets[0]/rows[31][2]: 保種
sheets[0]/rows[31][13]: 11：クルマの保険/はじめての自動車保険
sheets[0]/rows[31][37]: 新規入力時の入力内容と同一
sheets[0]/rows[32][2]: 取消保険料
sheets[0]/rows[32][13]: 1234
sheets[0]/rows[32][37]: 新規入力時の入力内容と同一
sheets[0]/rows[33][2]: 再計上証券番号
sheets[0]/rows[33][13]: 空白
sheets[0]/rows[34][2]: 再計上明細番号
sheets[0]/rows[34][13]: 空白
sheets[0]/rows[35][2]: 証券送付区分
sheets[0]/rows[35][13]: 直送
sheets[0]/rows[35][37]: 新規入力時の入力内容と同一
sheets[0]/rows[36][2]: 変更確認書送付
sheets[0]/rows[36][13]: 直送
sheets[0]/rows[36][37]: 新規入力時の入力内容と同一
sheets[0]/rows[37][2]: 変更確認書課支社送付の理由
sheets[0]/rows[37][13]: テスト理由
sheets[0]/rows[37][37]: 新規入力時の入力内容と同一
sheets[0]/rows[38][2]: 申込日(原契約の申込日)
sheets[0]/rows[38][13]: 20260303
sheets[0]/rows[38][37]: 新規入力時の入力内容と同一
sheets[0]/rows[39][2]: 始期日
sheets[0]/rows[39][13]: 20260505
sheets[0]/rows[39][37]: 新規入力時の入力内容と同一
sheets[0]/rows[40][2]: 届出日(変更届出書の届出日)
sheets[0]/rows[40][13]: 20260404
sheets[0]/rows[40][37]: 新規入力時の入力内容と同一
sheets[0]/rows[41][2]: 異例取扱理由
sheets[0]/rows[41][13]: G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消
sheets[0]/rows[41][37]: 新規入力時の入力内容と同一
sheets[0]/rows[42][2]: 具体的内容
sheets[0]/rows[42][13]: 社員による二重計上
sheets[0]/rows[42][37]: 新規入力時の入力内容と同一
sheets[0]/rows[43][2]: 具体的説明
sheets[0]/rows[43][13]: テスト
sheets[0]/rows[43][37]: 新規入力時の入力内容と同一
sheets[0]/rows[44][2]: 代理店への募集状況の確認要否
sheets[0]/rows[44][13]: 不要
sheets[0]/rows[44][37]: 新規入力時の入力内容と同一
sheets[0]/rows[45][2]: 実施日
sheets[0]/rows[45][13]: 空白
sheets[0]/rows[46][2]: 実施方法
sheets[0]/rows[46][13]: 空白
sheets[0]/rows[47][2]: 実施者(社員)
sheets[0]/rows[47][13]: 空白
sheets[0]/rows[48][2]: 対象者(募集人名)
sheets[0]/rows[48][13]: 空白
sheets[0]/rows[49][2]: 募集方法
sheets[0]/rows[49][13]: 空白
sheets[0]/rows[50][2]: 募集実施日
sheets[0]/rows[50][13]: 空白
sheets[0]/rows[51][2]: その他の募集方法
sheets[0]/rows[51][13]: 空白
sheets[0]/rows[52][2]: 重要事項説明
sheets[0]/rows[52][13]: 空白
sheets[0]/rows[53][2]: 契約内容の確認
sheets[0]/rows[53][13]: 空白
sheets[0]/rows[54][2]: 契約意思の確認
sheets[0]/rows[54][13]: 空白
sheets[0]/rows[55][3]: 契約手続実施者
sheets[0]/rows[55][13]: 空白
sheets[0]/rows[56][2]: 今後の活動に対する指導
sheets[0]/rows[56][13]: 空白
sheets[0]/rows[57][2]: 保険始期日と届出日の関係
sheets[0]/rows[57][13]: 届出日(変更届出書の届出日)が始期日より前　<保険契約者ヒアリング不要>
sheets[0]/rows[57][37]: 新規入力時の入力内容と同一
sheets[0]/rows[58][2]: 実施日
sheets[0]/rows[58][13]: 空白
sheets[0]/rows[59][2]: 実施方法
sheets[0]/rows[59][13]: 空白
sheets[0]/rows[60][2]: 実施者(社員)
sheets[0]/rows[60][13]: 空白
sheets[0]/rows[61][2]: 対象者(募集人名)
sheets[0]/rows[61][13]: 空白
sheets[0]/rows[62][2]: 募集方法
sheets[0]/rows[62][13]: 空白
sheets[0]/rows[63][2]: 募集実施日
sheets[0]/rows[63][13]: 空白
sheets[0]/rows[64][2]: その他の募集方法
sheets[0]/rows[64][13]: 空白
sheets[0]/rows[65][2]: 重要事項説明
sheets[0]/rows[65][13]: 空白
sheets[0]/rows[66][2]: 契約内容の確認
sheets[0]/rows[66][13]: 空白
sheets[0]/rows[67][2]: 契約意思の確認
sheets[0]/rows[67][13]: 空白
sheets[0]/rows[68][3]: 契約手続実施者
sheets[0]/rows[68][13]: 空白
sheets[0]/rows[69][2]: 異例取扱理由
sheets[0]/rows[69][13]: 空白
sheets[0]/rows[70][2]: 異例取扱理由備考
sheets[0]/rows[70][13]: 空白
sheets[0]/rows[71][2]: 契約者からの不満足の表明
sheets[0]/rows[71][13]: 無
sheets[0]/rows[72][2]: (有の場合、CS・苦情システムに登録)
sheets[0]/rows[73][2]: CS・苦情システム　苦情No
sheets[0]/rows[73][13]: 空白
sheets[0]/rows[74][2]: 募集行為に問題の可能性
sheets[0]/rows[74][13]: 無
sheets[0]/rows[75][2]: (有の場合、コンプラ情報システムに登録)
sheets[0]/rows[76][2]: コンプラ情報システム　管理No
sheets[0]/rows[76][13]: 空白
sheets[0]/rows[77][2]: 承認依頼先
sheets[0]/rows[77][13]: 課支社長
sheets[0]/rows[77][37]: 新規入力時の入力内容と同一
sheets[0]/rows[78][2]: 承認代行者
sheets[0]/rows[78][13]: 課支社長
sheets[0]/rows[78][37]: 新規入力時の入力内容と同一
sheets[0]/rows[79][2]: 承認／要再申請依頼理由
sheets[0]/rows[79][13]: 空白
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: A1:L3
sheets[1]/rows[1][1]: 〇ログイン情報
sheets[1]/rows[2][1]: ＭＳのユーザかつ、「課支社長」のユーザを設定。
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:BD83
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 申請・確認状況
sheets[2]/rows[2][12]: 承認待ち
sheets[2]/rows[3][1]: 異例管理番号
sheets[2]/rows[3][12]: 空白
sheets[2]/rows[4][1]: 消込状況
sheets[2]/rows[4][12]: 未消込
sheets[2]/rows[5][1]: 申請入力者
sheets[2]/rows[5][12]: 承認依頼したユーザ（営業）
sheets[2]/rows[6][1]: 申請入力日
sheets[2]/rows[6][12]: 承認依頼したシステム日時
sheets[2]/rows[7][1]: 申請者
sheets[2]/rows[7][12]: 承認依頼したユーザ（営業）
sheets[2]/rows[8][1]: 申請日
sheets[2]/rows[8][12]: 承認依頼したシステム日時
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
sheets[2]/rows[18][12]: 1.再計上契約のない取消計上
sheets[2]/rows[18][36]: 新規入力時の入力内容と同一
sheets[2]/rows[19][1]: 課支社CD
sheets[2]/rows[19][12]: ABM62
sheets[2]/rows[19][36]: 新規入力時の入力内容と同一
sheets[2]/rows[20][1]: 課支社名称
sheets[2]/rows[20][12]: （ABM62）
sheets[2]/rows[21][1]: 代理店CD
sheets[2]/rows[21][12]: 2031
sheets[2]/rows[21][36]: 新規入力時の入力内容と同一
sheets[2]/rows[22][1]: 代理店名称
sheets[2]/rows[22][12]: （2031）
sheets[2]/rows[23][1]: 証券番号
sheets[2]/rows[23][12]: AY12102
sheets[2]/rows[23][36]: 新規入力時の入力内容と同一
sheets[2]/rows[24][1]: 明細番号
sheets[2]/rows[24][12]: 0000000085
sheets[2]/rows[24][36]: 新規入力時の入力内容と同一
sheets[2]/rows[25][1]: 保険契約者氏名
sheets[2]/rows[25][12]: テスト
sheets[2]/rows[25][36]: 新規入力時の入力内容と同一
sheets[2]/rows[26][1]: 大種目
sheets[2]/rows[26][12]: 自動車
sheets[2]/rows[26][36]: 新規入力時の入力内容と同一
sheets[2]/rows[27][1]: 保種
sheets[2]/rows[27][12]: 11：クルマの保険/はじめての自動車保険
sheets[2]/rows[27][36]: 新規入力時の入力内容と同一
sheets[2]/rows[28][1]: 取消保険料
sheets[2]/rows[28][12]: 1234
sheets[2]/rows[28][36]: 新規入力時の入力内容と同一
sheets[2]/rows[29][1]: 再計上証券番号
sheets[2]/rows[29][12]: 空白
sheets[2]/rows[30][1]: 再計上明細番号
sheets[2]/rows[30][12]: 空白
sheets[2]/rows[31][1]: 証券送付区分
sheets[2]/rows[31][12]: 直送
sheets[2]/rows[31][36]: 新規入力時の入力内容と同一
sheets[2]/rows[32][1]: 変更確認書送付
sheets[2]/rows[32][12]: 直送
sheets[2]/rows[32][36]: 新規入力時の入力内容と同一
sheets[2]/rows[33][1]: 変更確認書課支社送付の理由
sheets[2]/rows[33][12]: テスト理由
sheets[2]/rows[33][36]: 新規入力時の入力内容と同一
sheets[2]/rows[34][1]: 申込日(原契約の申込日)
sheets[2]/rows[34][12]: 20260303
sheets[2]/rows[34][36]: 新規入力時の入力内容と同一
sheets[2]/rows[35][1]: 始期日
sheets[2]/rows[35][12]: 20260505
sheets[2]/rows[35][36]: 新規入力時の入力内容と同一
sheets[2]/rows[36][1]: 届出日(変更届出書の届出日)
sheets[2]/rows[36][12]: 20260404
sheets[2]/rows[36][36]: 新規入力時の入力内容と同一
sheets[2]/rows[37][1]: 異例取扱理由
sheets[2]/rows[37][12]: G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消
sheets[2]/rows[37][36]: 新規入力時の入力内容と同一
sheets[2]/rows[38][1]: 具体的内容
sheets[2]/rows[38][12]: 社員による二重計上
sheets[2]/rows[38][36]: 新規入力時の入力内容と同一
sheets[2]/rows[39][1]: 具体的説明
sheets[2]/rows[39][12]: テスト
sheets[2]/rows[39][36]: 新規入力時の入力内容と同一
sheets[2]/rows[40][1]: 代理店への募集状況の確認要否
sheets[2]/rows[40][12]: 不要
sheets[2]/rows[40][36]: 新規入力時の入力内容と同一
sheets[2]/rows[41][1]: 実施日
sheets[2]/rows[41][12]: 空白
sheets[2]/rows[42][1]: 実施方法
sheets[2]/rows[42][12]: 空白
sheets[2]/rows[43][1]: 実施者(社員)
sheets[2]/rows[43][12]: 空白
sheets[2]/rows[44][1]: 対象者(募集人名)
sheets[2]/rows[44][12]: 空白
sheets[2]/rows[45][1]: 募集方法
sheets[2]/rows[45][12]: 空白
sheets[2]/rows[46][1]: 募集実施日
sheets[2]/rows[46][12]: 空白
sheets[2]/rows[47][1]: その他の募集方法
sheets[2]/rows[47][12]: 空白
sheets[2]/rows[48][1]: 重要事項説明
sheets[2]/rows[48][12]: 空白
sheets[2]/rows[49][1]: 契約内容の確認
sheets[2]/rows[49][12]: 空白
sheets[2]/rows[50][1]: 契約意思の確認
sheets[2]/rows[50][12]: 空白
sheets[2]/rows[51][2]: 契約手続実施者
sheets[2]/rows[51][12]: 空白
sheets[2]/rows[52][1]: 今後の活動に対する指導
sheets[2]/rows[52][12]: 空白
sheets[2]/rows[53][1]: 保険始期日と届出日の関係
sheets[2]/rows[53][12]: 届出日(変更届出書の届出日)が始期日より前　<保険契約者ヒアリング不要>
sheets[2]/rows[53][36]: 新規入力時の入力内容と同一
sheets[2]/rows[54][1]: 実施日
sheets[2]/rows[54][12]: 空白
sheets[2]/rows[55][1]: 実施方法
sheets[2]/rows[55][12]: 空白
sheets[2]/rows[56][1]: 実施者(社員)
sheets[2]/rows[56][12]: 空白
sheets[2]/rows[57][1]: 対象者(募集人名)
sheets[2]/rows[57][12]: 空白
sheets[2]/rows[58][1]: 募集方法
sheets[2]/rows[58][12]: 空白
sheets[2]/rows[59][1]: 募集実施日
sheets[2]/rows[59][12]: 空白
sheets[2]/rows[60][1]: その他の募集方法
sheets[2]/rows[60][12]: 空白
sheets[2]/rows[61][1]: 重要事項説明
sheets[2]/rows[61][12]: 空白
sheets[2]/rows[62][1]: 契約内容の確認
sheets[2]/rows[62][12]: 空白
sheets[2]/rows[63][1]: 契約意思の確認
sheets[2]/rows[63][12]: 空白
sheets[2]/rows[64][2]: 契約手続実施者
sheets[2]/rows[64][12]: 空白
sheets[2]/rows[65][1]: 異例取扱理由
sheets[2]/rows[65][12]: 空白
sheets[2]/rows[66][1]: 異例取扱理由備考
sheets[2]/rows[66][12]: 空白
sheets[2]/rows[67][1]: 契約者からの不満足の表明
sheets[2]/rows[67][12]: 無
sheets[2]/rows[68][1]: (有の場合、CS・苦情システムに登録)
sheets[2]/rows[69][1]: CS・苦情システム　苦情No
sheets[2]/rows[69][12]: 空白
sheets[2]/rows[70][1]: 募集行為に問題の可能性
sheets[2]/rows[70][12]: 無
sheets[2]/rows[71][1]: (有の場合、コンプラ情報システムに登録)
sheets[2]/rows[72][1]: コンプラ情報システム　管理No
sheets[2]/rows[72][12]: 空白
sheets[2]/rows[73][1]: 承認依頼先
sheets[2]/rows[73][12]: 課支社長
sheets[2]/rows[73][36]: 新規入力時の入力内容と同一
sheets[2]/rows[74][1]: 承認代行者
sheets[2]/rows[74][12]: 課支社長
sheets[2]/rows[74][36]: 新規入力時の入力内容と同一
sheets[2]/rows[75][1]: 承認／要再申請依頼理由
sheets[2]/rows[75][12]: 空白
sheets[2]/rows[76][0]: 2
sheets[2]/rows[76][1]: 申請・確認状況
sheets[2]/rows[76][12]: 不承認
sheets[2]/rows[76][36]: 承認待ち→不承認になることを確認
sheets[2]/rows[77][1]: 承認者
sheets[2]/rows[77][12]: ログインユーザ
sheets[2]/rows[77][36]: 更新されること
sheets[2]/rows[78][1]: 承認日
sheets[2]/rows[78][12]: 不承認にしたシステム日時
sheets[2]/rows[78][36]: 更新されること
sheets[2]/rows[79][1]: 更新者
sheets[2]/rows[79][12]: ログインユーザ
sheets[2]/rows[79][36]: 更新されること
sheets[2]/rows[80][1]: 更新日
sheets[2]/rows[80][12]: 不承認にしたシステム日時
sheets[2]/rows[80][36]: 更新されること
sheets[2]/rows[81][1]: 承認／要再申請依頼理由
sheets[2]/rows[81][12]: テスト

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
### BLK-AUTO-1D62D29C  rows 16..20  status3=coded
  screen=AYG202B->AYG102 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [check] check 承認表示条件 11:承認待ち sel="#department_app_status_2" val=""
  - [click] click 再表示 sel="#select" val=""
  - [assert] ast display 申請承認一覧画面 sel="#gyoumu_list" val=""
  - [assert] ast 承認表示条件 再表示後 sel="#department_app_status_2" val=""
  - [click] click 承認 sel="#act202to103" val=""
  - [assert] ast transition 取消計上申請承認画面 sel="#div_gyoumu_area_04" val=""
### BLK-SHR-805D28B8  rows 21..23  status3=coded
  screen=ANA04->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 承認依頼/要再申請依頼理由 sel="#section_approve_reject" val="params.defectContent"
  - [click] click 不承認 sel="#disapproveButton" val=""
  - [popup] ast 遷移 送信先(写)選択画面 sel="" val=""
### BLK-AUTO-27C68433  rows 24..31  status3=coded
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
### BLK-SHR-04E83971  rows 32..34  status3=coded
  screen=ANA04 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast APログ sel="#act102to001" val="" NOTE:APログ出力=非浏览器=真機人工
  - [assert] ast DBログ sel="#act102to001" val="" NOTE:DBログ出力=非浏览器=真機人工
  - [assert] ast 取消計上申請テーブル sel="#act102to001" val="" NOTE:データ更新=非浏览器=真機人工

## 5. 本次运行结果（块级）
- BLK-AUTO-042B2DAE  pass  rows None..None
- BLK-AUTO-1D62D29C  pass  rows None..None
- BLK-SHR-805D28B8  pass  rows None..None
- BLK-AUTO-27C68433  pass  rows None..None
- BLK-SHR-04E83971  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|申請承認一覧画面 file=02_r015_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r18 表示|申請承認一覧画面 file=03_r018_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r20 遷移|取消計上申請承認画面 file=05_r020_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r23 遷移|送信先(写)選択画面 file=07_r023_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r26 表示|送信先(写)選択画面 file=09_r026_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r31 遷移|取消計上申請承認画面 file=10_r031_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-121-02-001/01_menu.png
- logs/AY-121-02-001/02_r015_申請承認一覧画面.png
- logs/AY-121-02-001/03_r018_申請承認一覧画面.png
- logs/AY-121-02-001/05_r020_取消計上申請承認画面.png
- logs/AY-121-02-001/07_r023_送信先(写)選択画面.png
- logs/AY-121-02-001/09_r026_送信先(写)選択画面.png
- logs/AY-121-02-001/10_r031_取消計上申請承認画面.png
- logs/AY-121-02-001/12_BLK-SHR-04E83971.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
