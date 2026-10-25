# AUDIT DOSSIER — AY-120-03-004

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線４", "item": "2種", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-120-03-004.xlsx"}
feasibility: class=C flow=pass manualSteps=0 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=8 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14
- r17 | OP[1]ボタン|「申請・承認」押下|-
- r18 | CK[2]遷移|申請承認一覧画面|初期値or検索結果 | EV:画面HC
- r19 | OP[1]クリック|課支社長　申請表示条件の「10：申請依頼」|チェックする（他の項目全部チェックなし）
- r20 | OP[2]ボタン|「再表示」押下|-
- r21 | CK[3]表示|申請承認一覧画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r22 | OP[4]ボタン|「申請」押下|事前準備で登録したレコードと合致する「申請」ボタンを押下
- r23 | CK[5]遷移|取消計上申請承認画面|【別紙】表示内容　１　参照 | EV:画面HC
- r24 | OP[1]入力|「承認依頼／要再申請依頼理由」入力|「テスト」
- r25 | OP[2]ボタン|「不承認」押下|-
- r26 | CK[3]遷移|送信先(写)選択画面|初期値 | EV:画面HC
- r27 | OP[1]入力|「氏名」入力|「黒川　京子」
- r28 | OP[2]ボタン|「検索」ボタン押下|－
- r29 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r30 | OP[4]クリック|「No.」リンククリック|－
- r31 | OP[5]ボタン|「OK」ボタン押下|－
- r32 | CK[6]出力（Msg）|メッセージ|「MAYG901I012」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r33 | OP[7]ボタン|「OK」ボタン押下|－
- r34 | CK[8]遷移|取消計上申請承認画面|【別紙】表示内容　２　参照 | EV:画面HC
- r39
- r42 | OP[1]ボタン|「申請・承認」押下|-
- r43 | CK[2]遷移|申請承認一覧画面|初期値or検索結果 | EV:画面HC
- r44 | OP[1]クリック|承認表示条件の「11：承認待ち」|チェックする（他の項目全部チェックなし）
- r45 | OP[2]ボタン|「再表示」押下|-
- r46 | CK[3]表示|申請承認一覧画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r47 | OP[4]ボタン|「承認」押下|事前準備で登録したレコードと合致する「承認」ボタンを押下
- r48 | CK[5]遷移|取消計上申請承認画面|【別紙】表示内容　3　参照 | EV:画面HC
- r49 | OP[1]入力|「承認／要再申請依頼理由」入力|「テスト」
- r50 | OP[2]ボタン|「不承認」押下|-
- r51 | CK[3]遷移|送信先(写)選択画面|初期値 | EV:画面HC
- r52 | OP[1]入力|「氏名」入力|「黒川　京子」
- r53 | OP[2]ボタン|「検索」ボタン押下|－
- r54 | CK[3]表示|送信先(写)選択画面|検索結果 | EV:画面HC
- r55 | OP[4]クリック|「No.」リンククリック|－
- r56 | OP[5]ボタン|「OK」ボタン押下|－
- r57 | CK[6]出力（Msg）|メッセージ|「MAYG901I011」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r58 | OP[7]ボタン|「OK」ボタン押下|－
- r59 | CK[8]遷移|取消計上申請承認画面|【別紙】表示内容　4　参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: A1:AL95
sheets[0]/rows[1][1]: 〇ログイン情報
sheets[0]/rows[2][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[0]/rows[4][1]: 〇1.データ準備
sheets[0]/rows[5][1]: ○以下の状態の申請書を作成する。
sheets[0]/rows[7][1]: 1
sheets[0]/rows[7][2]: 申請・確認状況
sheets[0]/rows[7][13]: 申請依頼
sheets[0]/rows[8][2]: 異例管理番号
sheets[0]/rows[8][13]: 空白
sheets[0]/rows[9][2]: 消込状況
sheets[0]/rows[9][13]: 未消込
sheets[0]/rows[10][2]: 申請入力者
sheets[0]/rows[10][13]: 申請依頼したユーザ（営業）
sheets[0]/rows[11][2]: 申請入力日
sheets[0]/rows[11][13]: 申請依頼したシステム日時
sheets[0]/rows[12][2]: 申請者
sheets[0]/rows[12][13]: 空白
sheets[0]/rows[13][2]: 申請日
sheets[0]/rows[13][13]: 空白
sheets[0]/rows[14][2]: 承認者
sheets[0]/rows[14][13]: 空白
sheets[0]/rows[15][2]: 承認日
sheets[0]/rows[15][13]: 空白
sheets[0]/rows[16][2]: コンプラ情報システム連携日
sheets[0]/rows[16][13]: 空白
sheets[0]/rows[17][2]: 要再申請依頼者
sheets[0]/rows[17][13]: 空白
sheets[0]/rows[18][2]: 要再申請依頼日
sheets[0]/rows[18][13]: 空白
sheets[0]/rows[19][2]: 登録者
sheets[0]/rows[19][13]: 登録したユーザ（営業）
sheets[0]/rows[20][2]: 登録日
sheets[0]/rows[20][13]: 新規入力時のシステム日
sheets[0]/rows[21][2]: 更新者
sheets[0]/rows[21][13]: 前回更新したユーザ（営業）
sheets[0]/rows[22][2]: 更新日
sheets[0]/rows[22][13]: 前回更新したシステム日時
sheets[0]/rows[23][2]: 申請・確認基準項目
sheets[0]/rows[23][13]: 1.再計上契約のない取消計上
sheets[0]/rows[23][37]: 新規入力時の入力内容と同一
sheets[0]/rows[24][2]: 課支社CD
sheets[0]/rows[24][13]: ABM62
sheets[0]/rows[24][37]: 新規入力時の入力内容と同一
sheets[0]/rows[25][2]: 課支社名称
sheets[0]/rows[25][13]: （ABM62）
sheets[0]/rows[26][2]: 代理店CD
sheets[0]/rows[26][13]: 2031
sheets[0]/rows[26][37]: 新規入力時の入力内容と同一
sheets[0]/rows[27][2]: 代理店名称
sheets[0]/rows[27][13]: （2031）
sheets[0]/rows[28][2]: 証券番号
sheets[0]/rows[28][13]: AY12003
sheets[0]/rows[28][37]: 新規入力時の入力内容と同一
sheets[0]/rows[29][2]: 明細番号
sheets[0]/rows[29][13]: 0000000052
sheets[0]/rows[29][37]: 新規入力時の入力内容と同一
sheets[0]/rows[30][2]: 保険契約者氏名
sheets[0]/rows[30][13]: テスト
sheets[0]/rows[30][37]: 新規入力時の入力内容と同一
sheets[0]/rows[31][2]: 大種目
sheets[0]/rows[31][13]: 傷害
sheets[0]/rows[31][37]: 新規入力時の入力内容と同一
sheets[0]/rows[32][2]: 保種
sheets[0]/rows[32][13]: 88：ケガの保険、ゴルファー保険、団体総合
sheets[0]/rows[32][37]: 新規入力時の入力内容と同一
sheets[0]/rows[33][2]: 取消保険料
sheets[0]/rows[33][13]: 1234
sheets[0]/rows[33][37]: 新規入力時の入力内容と同一
sheets[0]/rows[34][2]: 再計上証券番号
sheets[0]/rows[34][13]: 空白
sheets[0]/rows[35][2]: 再計上明細番号
sheets[0]/rows[35][13]: 空白
sheets[0]/rows[36][2]: 証券送付区分
sheets[0]/rows[36][13]: 直送
sheets[0]/rows[36][37]: 新規入力時の入力内容と同一
sheets[0]/rows[37][2]: 変更確認書送付
sheets[0]/rows[37][13]: 直送
sheets[0]/rows[37][37]: 新規入力時の入力内容と同一
sheets[0]/rows[38][2]: 変更確認書課支社送付の理由
sheets[0]/rows[38][13]: テスト理由
sheets[0]/rows[38][37]: 新規入力時の入力内容と同一
sheets[0]/rows[39][2]: 申込日(原契約の申込日)
sheets[0]/rows[39][13]: 20260303
sheets[0]/rows[39][37]: 新規入力時の入力内容と同一
sheets[0]/rows[40][2]: 始期日
sheets[0]/rows[40][13]: 20260404
sheets[0]/rows[40][37]: 新規入力時の入力内容と同一
sheets[0]/rows[41][2]: 届出日(変更届出書の届出日)
sheets[0]/rows[41][13]: 20260505
sheets[0]/rows[41][37]: 新規入力時の入力内容と同一
sheets[0]/rows[42][2]: 取消・変更の計上日
sheets[0]/rows[42][13]: 空白
sheets[0]/rows[43][2]: 異例取扱理由
sheets[0]/rows[43][13]: A.当社・代理店の責による意図しない保険契約の解消
sheets[0]/rows[43][37]: 新規入力時の入力内容と同一
sheets[0]/rows[44][2]: 具体的内容
sheets[0]/rows[44][13]: 募集人(代理店)の説明誤り
sheets[0]/rows[44][37]: 新規入力時の入力内容と同一
sheets[0]/rows[45][2]: 具体的説明
sheets[0]/rows[45][13]: テスト
sheets[0]/rows[45][37]: 新規入力時の入力内容と同一
sheets[0]/rows[46][2]: 代理店への募集状況の確認要否
sheets[0]/rows[46][13]: 不要
sheets[0]/rows[46][37]: 新規入力時の入力内容と同一
sheets[0]/rows[47][2]: 実施日
sheets[0]/rows[47][13]: 空白
sheets[0]/rows[48][2]: 実施方法
sheets[0]/rows[48][13]: 空白
sheets[0]/rows[49][2]: 実施者(社員)
sheets[0]/rows[49][13]: 空白
sheets[0]/rows[50][2]: 対象者(募集人名)
sheets[0]/rows[50][13]: 空白
sheets[0]/rows[51][2]: 募集方法
sheets[0]/rows[51][13]: 空白
sheets[0]/rows[52][2]: 募集実施日
sheets[0]/rows[52][13]: 空白
sheets[0]/rows[53][2]: その他の募集方法
sheets[0]/rows[53][13]: 空白
sheets[0]/rows[54][2]: 重要事項説明
sheets[0]/rows[54][13]: 空白
sheets[0]/rows[55][2]: 契約内容の確認
sheets[0]/rows[55][13]: 空白
sheets[0]/rows[56][2]: 契約意思の確認
sheets[0]/rows[56][13]: 空白
sheets[0]/rows[57][3]: 契約手続実施者
sheets[0]/rows[57][13]: 空白
sheets[0]/rows[58][2]: 今後の活動に対する指導
sheets[0]/rows[58][13]: 空白
sheets[0]/rows[59][2]: 保険始期日と届出日の関係
sheets[0]/rows[59][13]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
sheets[0]/rows[59][37]: 新規入力時の入力内容と同一
sheets[0]/rows[60][2]: 実施日
sheets[0]/rows[60][13]: 空白
sheets[0]/rows[61][2]: 実施方法
sheets[0]/rows[61][13]: 空白
sheets[0]/rows[62][2]: 実施者(社員)
sheets[0]/rows[62][13]: 空白
sheets[0]/rows[63][2]: 対象者(募集人名)
sheets[0]/rows[63][13]: 空白
sheets[0]/rows[64][2]: 募集方法
sheets[0]/rows[64][13]: 空白
sheets[0]/rows[65][2]: 募集実施日
sheets[0]/rows[65][13]: 空白
sheets[0]/rows[66][2]: その他の募集方法
sheets[0]/rows[66][13]: 空白
sheets[0]/rows[67][2]: 重要事項説明
sheets[0]/rows[67][13]: 空白
sheets[0]/rows[68][2]: 契約内容の確認
sheets[0]/rows[68][13]: 空白
sheets[0]/rows[69][2]: 契約意思の確認
sheets[0]/rows[69][13]: 空白
sheets[0]/rows[70][3]: 契約手続実施者
sheets[0]/rows[70][13]: 空白
sheets[0]/rows[71][2]: 異例取扱理由
sheets[0]/rows[71][13]: 空白
sheets[0]/rows[72][2]: 異例取扱理由備考
sheets[0]/rows[72][13]: 空白
sheets[0]/rows[73][2]: 契約者からの不満足の表明
sheets[0]/rows[73][13]: 空白
sheets[0]/rows[74][2]: (有の場合、CS・苦情システムに登録)
sheets[0]/rows[75][2]: CS・苦情システム　苦情No
sheets[0]/rows[75][13]: 空白
sheets[0]/rows[76][2]: 募集行為に問題の可能性
sheets[0]/rows[76][13]: 空白
sheets[0]/rows[77][2]: (有の場合、コンプラ情報システムに登録)
sheets[0]/rows[78][2]: コンプラ情報システム　管理No
sheets[0]/rows[78][13]: 空白
sheets[0]/rows[79][2]: 申請依頼先
sheets[0]/rows[79][13]: 課支社長
sheets[0]/rows[79][37]: 新規入力時の入力内容と同一
sheets[0]/rows[80][2]: 申請代行者
sheets[0]/rows[80][13]: 課支社長
sheets[0]/rows[81][2]: 承認依頼／要再申請依頼理由
sheets[0]/rows[81][13]: 空白
sheets[0]/rows[82][2]: 承認依頼先
sheets[0]/rows[82][13]: 空白
sheets[0]/rows[83][2]: 承認代行者
sheets[0]/rows[83][13]: 空白
sheets[0]/rows[84][2]: 承認／要再申請依頼理由
sheets[0]/rows[84][13]: 空白
sheets[0]/rows[85][2]: 承認後・不承認後の対応
sheets[0]/rows[85][13]: 空白
sheets[0]/rows[89][1]: 〇2.データ準備
sheets[0]/rows[90][1]: 1
sheets[0]/rows[90][2]: 証券番号
sheets[0]/rows[90][11]: AY12003
sheets[0]/rows[91][2]: 明細番号
sheets[0]/rows[91][11]: 0000000052
sheets[0]/rows[93][1]: ●上記の申請書について、AY-120-05-004（申請依頼取消後）、申請・確認状況が「要再申請」になっている。
sheets[0]/rows[94][1]: ⇒
sheets[0]/rows[94][2]: 試験を行うため、申請・確認状況を「申請依頼」→「承認待ち」にする。
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: A2:L8
sheets[1]/rows[0][1]: 〇ログイン情報
sheets[1]/rows[2][1]: 1.★不承認（申請依頼時）
sheets[1]/rows[3][1]: ＭＳのユーザかつ、「課支社長」のユーザを設定。
sheets[1]/rows[5][1]: 2.★不承認（承認依頼時）
sheets[1]/rows[6][1]: ＭＳのユーザかつ、「部支店長」のユーザを設定。
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AL174
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 申請・確認状況
sheets[2]/rows[2][12]: 申請依頼
sheets[2]/rows[3][1]: 異例管理番号
sheets[2]/rows[3][12]: 空白
sheets[2]/rows[4][1]: 消込状況
sheets[2]/rows[4][12]: 未消込
sheets[2]/rows[5][1]: 申請入力者
sheets[2]/rows[5][12]: 申請依頼したユーザ（営業）
sheets[2]/rows[6][1]: 申請入力日
sheets[2]/rows[6][12]: 申請依頼したシステム日時
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
sheets[2]/rows[17][12]: 前回更新したシステム日時
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
sheets[2]/rows[23][12]: AY12003
sheets[2]/rows[23][36]: 新規入力時の入力内容と同一
sheets[2]/rows[24][1]: 明細番号
sheets[2]/rows[24][12]: 0000000052
sheets[2]/rows[24][36]: 新規入力時の入力内容と同一
sheets[2]/rows[25][1]: 保険契約者氏名
sheets[2]/rows[25][12]: テスト
sheets[2]/rows[25][36]: 新規入力時の入力内容と同一
sheets[2]/rows[26][1]: 大種目
sheets[2]/rows[26][12]: 傷害
sheets[2]/rows[26][36]: 新規入力時の入力内容と同一
sheets[2]/rows[27][1]: 保種
sheets[2]/rows[27][12]: 88：ケガの保険、ゴルファー保険、団体総合
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
sheets[2]/rows[35][12]: 20260404
sheets[2]/rows[35][36]: 新規入力時の入力内容と同一
sheets[2]/rows[36][1]: 届出日(変更届出書の届出日)
sheets[2]/rows[36][12]: 20260505
sheets[2]/rows[36][36]: 新規入力時の入力内容と同一
sheets[2]/rows[37][1]: 取消・変更の計上日
sheets[2]/rows[37][12]: 空白
sheets[2]/rows[38][1]: 異例取扱理由
sheets[2]/rows[38][12]: A.当社・代理店の責による意図しない保険契約の解消
sheets[2]/rows[38][36]: 新規入力時の入力内容と同一
sheets[2]/rows[39][1]: 具体的内容
sheets[2]/rows[39][12]: 募集人(代理店)の説明誤り
sheets[2]/rows[39][36]: 新規入力時の入力内容と同一
sheets[2]/rows[40][1]: 具体的説明
sheets[2]/rows[40][12]: テスト
sheets[2]/rows[40][36]: 新規入力時の入力内容と同一
sheets[2]/rows[41][1]: 代理店への募集状況の確認要否
sheets[2]/rows[41][12]: 不要
sheets[2]/rows[41][36]: 新規入力時の入力内容と同一
sheets[2]/rows[42][1]: 実施日
sheets[2]/rows[42][12]: 空白
sheets[2]/rows[43][1]: 実施方法
sheets[2]/rows[43][12]: 空白
sheets[2]/rows[44][1]: 実施者(社員)
sheets[2]/rows[44][12]: 空白
sheets[2]/rows[45][1]: 対象者(募集人名)
sheets[2]/rows[45][12]: 空白
sheets[2]/rows[46][1]: 募集方法
sheets[2]/rows[46][12]: 空白
sheets[2]/rows[47][1]: 募集実施日
sheets[2]/rows[47][12]: 空白
sheets[2]/rows[48][1]: その他の募集方法
sheets[2]/rows[48][12]: 空白
sheets[2]/rows[49][1]: 重要事項説明
sheets[2]/rows[49][12]: 空白
sheets[2]/rows[50][1]: 契約内容の確認
sheets[2]/rows[50][12]: 空白
sheets[2]/rows[51][1]: 契約意思の確認
sheets[2]/rows[51][12]: 空白
sheets[2]/rows[52][2]: 契約手続実施者
sheets[2]/rows[52][12]: 空白
sheets[2]/rows[53][1]: 今後の活動に対する指導
sheets[2]/rows[53][12]: 空白
sheets[2]/rows[54][1]: 保険始期日と届出日の関係
sheets[2]/rows[54][12]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
sheets[2]/rows[54][36]: 新規入力時の入力内容と同一
sheets[2]/rows[55][1]: 実施日
sheets[2]/rows[55][12]: 空白
sheets[2]/rows[56][1]: 実施方法
sheets[2]/rows[56][12]: 空白
sheets[2]/rows[57][1]: 実施者(社員)
sheets[2]/rows[57][12]: 空白
sheets[2]/rows[58][1]: 対象者(募集人名)
sheets[2]/rows[58][12]: 空白
sheets[2]/rows[59][1]: 募集方法
sheets[2]/rows[59][12]: 空白
sheets[2]/rows[60][1]: 募集実施日
sheets[2]/rows[60][12]: 空白
sheets[2]/rows[61][1]: その他の募集方法
sheets[2]/rows[61][12]: 空白
sheets[2]/rows[62][1]: 重要事項説明
sheets[2]/rows[62][12]: 空白
sheets[2]/rows[63][1]: 契約内容の確認
sheets[2]/rows[63][12]: 空白
sheets[2]/rows[64][1]: 契約意思の確認
sheets[2]/rows[64][12]: 空白
sheets[2]/rows[65][2]: 契約手続実施者
sheets[2]/rows[65][12]: 空白
sheets[2]/rows[66][1]: 異例取扱理由
sheets[2]/rows[66][12]: 空白
sheets[2]/rows[67][1]: 異例取扱理由備考
sheets[2]/rows[67][12]: 空白
sheets[2]/rows[68][1]: 契約者からの不満足の表明
sheets[2]/rows[68][12]: 空白
sheets[2]/rows[69][1]: (有の場合、CS・苦情システムに登録)
sheets[2]/rows[70][1]: CS・苦情システム　苦情No
sheets[2]/rows[70][12]: 空白
sheets[2]/rows[71][1]: 募集行為に問題の可能性
sheets[2]/rows[71][12]: 空白
sheets[2]/rows[72][1]: (有の場合、コンプラ情報システムに登録)
sheets[2]/rows[73][1]: コンプラ情報システム　管理No
sheets[2]/rows[73][12]: 空白
sheets[2]/rows[74][1]: 申請依頼先
sheets[2]/rows[74][12]: 課支社長
sheets[2]/rows[74][36]: 新規入力時の入力内容と同一
sheets[2]/rows[75][1]: 申請代行者
sheets[2]/rows[75][12]: 課支社長
sheets[2]/rows[76][1]: 承認依頼／要再申請依頼理由
sheets[2]/rows[76][12]: 空白
sheets[2]/rows[77][1]: 承認依頼先
sheets[2]/rows[77][12]: 空白
sheets[2]/rows[78][1]: 承認代行者
sheets[2]/rows[78][12]: 空白
sheets[2]/rows[79][1]: 承認／要再申請依頼理由
sheets[2]/rows[79][12]: 空白
sheets[2]/rows[80][1]: 承認後・不承認後の対応
sheets[2]/rows[80][12]: 空白
sheets[2]/rows[81][0]: 2
sheets[2]/rows[81][1]: 申請・確認状況
sheets[2]/rows[81][12]: 不承認
sheets[2]/rows[81][36]: 申請依頼→不承認になることを確認
sheets[2]/rows[82][1]: 承認者
sheets[2]/rows[82][12]: ログインユーザ
sheets[2]/rows[82][36]: 更新されること
sheets[2]/rows[83][1]: 承認日
sheets[2]/rows[83][12]: 不承認にしたシステム日時
sheets[2]/rows[83][36]: 更新されること
sheets[2]/rows[84][1]: 更新者
sheets[2]/rows[84][12]: ログインユーザ
sheets[2]/rows[84][36]: 更新されること
sheets[2]/rows[85][1]: 更新日
sheets[2]/rows[85][12]: 不承認にしたシステム日時
sheets[2]/rows[85][36]: 更新されること
sheets[2]/rows[86][1]: 承認依頼／要再申請依頼理由
sheets[2]/rows[86][12]: テスト
sheets[2]/rows[88][0]: 3
sheets[2]/rows[88][1]: 申請・確認状況
sheets[2]/rows[88][12]: 承認待ち
sheets[2]/rows[89][1]: 異例管理番号
sheets[2]/rows[89][12]: 空白
sheets[2]/rows[90][1]: 消込状況
sheets[2]/rows[90][12]: 未消込
sheets[2]/rows[91][1]: 申請入力者
sheets[2]/rows[91][12]: 申請依頼したユーザ（営業）
sheets[2]/rows[92][1]: 申請入力日
sheets[2]/rows[92][12]: 申請依頼したシステム日時
sheets[2]/rows[93][1]: 申請者
sheets[2]/rows[93][12]: 申請したユーザ（課支社長）
sheets[2]/rows[94][1]: 申請日
sheets[2]/rows[94][12]: 申請したシステム日時
sheets[2]/rows[95][1]: 承認者
sheets[2]/rows[95][12]: 空白
sheets[2]/rows[96][1]: 承認日
sheets[2]/rows[96][12]: 空白
sheets[2]/rows[97][1]: コンプラ情報システム連携日
sheets[2]/rows[97][12]: 空白
sheets[2]/rows[98][1]: 要再申請依頼者
sheets[2]/rows[98][12]: 要再申請依頼したユーザ（課支社長）
sheets[2]/rows[99][1]: 要再申請依頼日
sheets[2]/rows[99][12]: 要再申請依頼したシステム日時
sheets[2]/rows[100][1]: 登録者
sheets[2]/rows[100][12]: 登録したユーザ（営業）
sheets[2]/rows[101][1]: 登録日
sheets[2]/rows[101][12]: 新規入力時のシステム日
sheets[2]/rows[102][1]: 更新者
sheets[2]/rows[102][12]: 前回更新したユーザ（営業）
sheets[2]/rows[103][1]: 更新日
sheets[2]/rows[103][12]: 前回更新したシステム日時
sheets[2]/rows[104][1]: 申請・確認基準項目
sheets[2]/rows[104][12]: 1.再計上契約のない取消計上
sheets[2]/rows[104][36]: 新規入力時の入力内容と同一
sheets[2]/rows[105][1]: 課支社CD
sheets[2]/rows[105][12]: ABM62
sheets[2]/rows[105][36]: 新規入力時の入力内容と同一
sheets[2]/rows[106][1]: 課支社名称
sheets[2]/rows[106][12]: （ABM62）
sheets[2]/rows[107][1]: 代理店CD
sheets[2]/rows[107][12]: 2031
sheets[2]/rows[107][36]: 新規入力時の入力内容と同一
sheets[2]/rows[108][1]: 代理店名称
sheets[2]/rows[108][12]: （2031）
sheets[2]/rows[109][1]: 証券番号
sheets[2]/rows[109][12]: AY12003
sheets[2]/rows[109][36]: 新規入力時の入力内容と同一
sheets[2]/rows[110][1]: 明細番号
sheets[2]/rows[110][12]: 0000000052
sheets[2]/rows[110][36]: 新規入力時の入力内容と同一
sheets[2]/rows[111][1]: 保険契約者氏名
sheets[2]/rows[111][12]: テスト
sheets[2]/rows[111][36]: 新規入力時の入力内容と同一
sheets[2]/rows[112][1]: 大種目
sheets[2]/rows[112][12]: 傷害
sheets[2]/rows[112][36]: 新規入力時の入力内容と同一
sheets[2]/rows[113][1]: 保種
sheets[2]/rows[113][12]: 88：ケガの保険、ゴルファー保険、団体総合
sheets[2]/rows[113][36]: 新規入力時の入力内容と同一
sheets[2]/rows[114][1]: 取消保険料
sheets[2]/rows[114][12]: 1234
sheets[2]/rows[114][36]: 新規入力時の入力内容と同一
sheets[2]/rows[115][1]: 再計上証券番号
sheets[2]/rows[115][12]: 空白
sheets[2]/rows[116][1]: 再計上明細番号
sheets[2]/rows[116][12]: 空白
sheets[2]/rows[117][1]: 証券送付区分
sheets[2]/rows[117][12]: 直送
sheets[2]/rows[117][36]: 新規入力時の入力内容と同一
sheets[2]/rows[118][1]: 変更確認書送付
sheets[2]/rows[118][12]: 直送
sheets[2]/rows[118][36]: 新規入力時の入力内容と同一
sheets[2]/rows[119][1]: 変更確認書課支社送付の理由
sheets[2]/rows[119][12]: テスト理由
sheets[2]/rows[119][36]: 新規入力時の入力内容と同一
sheets[2]/rows[120][1]: 申込日(原契約の申込日)
sheets[2]/rows[120][12]: 20260303
sheets[2]/rows[120][36]: 新規入力時の入力内容と同一
sheets[2]/rows[121][1]: 始期日
sheets[2]/rows[121][12]: 20260404
sheets[2]/rows[121][36]: 新規入力時の入力内容と同一
sheets[2]/rows[122][1]: 届出日(変更届出書の届出日)
sheets[2]/rows[122][12]: 20260505
sheets[2]/rows[122][36]: 新規入力時の入力内容と同一
sheets[2]/rows[123][1]: 取消・変更の計上日
sheets[2]/rows[123][12]: 空白
sheets[2]/rows[124][1]: 異例取扱理由
sheets[2]/rows[124][12]: A.当社・代理店の責による意図しない保険契約の解消
sheets[2]/rows[124][36]: 新規入力時の入力内容と同一
sheets[2]/rows[125][1]: 具体的内容
sheets[2]/rows[125][12]: 募集人(代理店)の説明誤り
sheets[2]/rows[125][36]: 新規入力時の入力内容と同一
sheets[2]/rows[126][1]: 具体的説明
sheets[2]/rows[126][12]: テスト
sheets[2]/rows[126][36]: 新規入力時の入力内容と同一
sheets[2]/rows[127][1]: 代理店への募集状況の確認要否
sheets[2]/rows[127][12]: 不要
sheets[2]/rows[127][36]: 新規入力時の入力内容と同一
sheets[2]/rows[128][1]: 実施日
sheets[2]/rows[128][12]: 空白
sheets[2]/rows[129][1]: 実施方法
sheets[2]/rows[129][12]: 空白
sheets[2]/rows[130][1]: 実施者(社員)
sheets[2]/rows[130][12]: 空白
sheets[2]/rows[131][1]: 対象者(募集人名)
sheets[2]/rows[131][12]: 空白
sheets[2]/rows[132][1]: 募集方法
sheets[2]/rows[132][12]: 空白
sheets[2]/rows[133][1]: 募集実施日
sheets[2]/rows[133][12]: 空白
sheets[2]/rows[134][1]: その他の募集方法
sheets[2]/rows[134][12]: 空白
sheets[2]/rows[135][1]: 重要事項説明
sheets[2]/rows[135][12]: 空白
sheets[2]/rows[136][1]: 契約内容の確認
sheets[2]/rows[136][12]: 空白
sheets[2]/rows[137][1]: 契約意思の確認
sheets[2]/rows[137][12]: 空白
sheets[2]/rows[138][2]: 契約手続実施者
sheets[2]/rows[138][12]: 空白
sheets[2]/rows[139][1]: 今後の活動に対する指導
sheets[2]/rows[139][12]: 空白
sheets[2]/rows[140][1]: 保険始期日と届出日の関係
sheets[2]/rows[140][12]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
sheets[2]/rows[140][36]: 新規入力時の入力内容と同一
sheets[2]/rows[141][1]: 実施日
sheets[2]/rows[141][12]: 空白
sheets[2]/rows[142][1]: 実施方法
sheets[2]/rows[142][12]: 空白
sheets[2]/rows[143][1]: 実施者(社員)
sheets[2]/rows[143][12]: 空白
sheets[2]/rows[144][1]: 対象者(募集人名)
sheets[2]/rows[144][12]: 空白
sheets[2]/rows[145][1]: 募集方法
sheets[2]/rows[145][12]: 空白
sheets[2]/rows[146][1]: 募集実施日
sheets[2]/rows[146][12]: 空白
sheets[2]/rows[147][1]: その他の募集方法
sheets[2]/rows[147][12]: 空白
sheets[2]/rows[148][1]: 重要事項説明
sheets[2]/rows[148][12]: 空白
sheets[2]/rows[149][1]: 契約内容の確認
sheets[2]/rows[149][12]: 空白
sheets[2]/rows[150][1]: 契約意思の確認
sheets[2]/rows[150][12]: 空白
sheets[2]/rows[151][2]: 契約手続実施者
sheets[2]/rows[151][12]: 空白
sheets[2]/rows[152][1]: 異例取扱理由
sheets[2]/rows[152][12]: 空白
sheets[2]/rows[153][1]: 異例取扱理由備考
sheets[2]/rows[153][12]: 空白
sheets[2]/rows[154][1]: 契約者からの不満足の表明
sheets[2]/rows[154][12]: 空白
sheets[2]/rows[155][1]: (有の場合、CS・苦情システムに登録)
sheets[2]/rows[156][1]: CS・苦情システム　苦情No
sheets[2]/rows[156][12]: 空白
sheets[2]/rows[157][1]: 募集行為に問題の可能性
sheets[2]/rows[157][12]: 空白
sheets[2]/rows[158][1]: (有の場合、コンプラ情報システムに登録)
sheets[2]/rows[159][1]: コンプラ情報システム　管理No
sheets[2]/rows[159][12]: 空白
sheets[2]/rows[160][1]: 申請依頼先
sheets[2]/rows[160][12]: 課支社長
sheets[2]/rows[160][36]: 新規入力時の入力内容と同一
sheets[2]/rows[161][1]: 申請代行者
sheets[2]/rows[161][12]: 課支社長
sheets[2]/rows[162][1]: 承認依頼／要再申請依頼理由
sheets[2]/rows[162][12]: テスト
sheets[2]/rows[163][1]: 承認依頼先
sheets[2]/rows[163][12]: 部支店長
sheets[2]/rows[164][1]: 承認代行者
sheets[2]/rows[164][12]: 部支店長
sheets[2]/rows[165][1]: 承認／要再申請依頼理由
sheets[2]/rows[165][12]: 空白
sheets[2]/rows[166][1]: 承認後・不承認後の対応
sheets[2]/rows[166][12]: 空白
sheets[2]/rows[167][0]: 4
sheets[2]/rows[167][1]: 申請・確認状況
sheets[2]/rows[167][12]: 不承認
sheets[2]/rows[167][36]: 承認待ち→不承認になることを確認
sheets[2]/rows[168][1]: 承認者
sheets[2]/rows[168][12]: ログインユーザ
sheets[2]/rows[168][36]: 更新されること
sheets[2]/rows[169][1]: 承認日
sheets[2]/rows[169][12]: 不承認にしたシステム日時
sheets[2]/rows[169][36]: 更新されること
sheets[2]/rows[170][1]: 更新者
sheets[2]/rows[170][12]: ログインユーザ
sheets[2]/rows[170][36]: 更新されること
sheets[2]/rows[171][1]: 更新日
sheets[2]/rows[171][12]: 不承認にしたシステム日時
sheets[2]/rows[171][36]: 更新されること
sheets[2]/rows[172][1]: 承認／要再申請依頼理由
sheets[2]/rows[172][12]: テスト

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
### BLK-AUTO-042B2DAE  rows 17..18  status3=coded
  screen=AYG001->AYG202B file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route4" val=""
  - [click] click 申請・承認 sel="#route4" val=""
  - [assert] ast transition 申請承認一覧画面 sel="#department_app_status_2" val=""
  - [assert] ast 承認表示条件 sel="#section_app_status_2" val=""
### BLK-AUTO-ADFFD6FB  rows 19..23  status3=coded
  screen=AYG202B->AYG102 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [check] check 課支社長 申請表示条件 10:申請依頼 sel="#section_app_status_2" val=""
  - [click] click 再表示 sel="#select" val=""
  - [assert] ast display 申請承認一覧画面 sel="#gyoumu_list" val=""
  - [assert] ast 申請表示条件 再表示後 sel="#section_app_status_2" val=""
  - [click] click 申請 sel="#act202to102" val=""
  - [assert] ast transition 取消計上申請承認画面 sel="#div_gyoumu_area_04" val=""
### BLK-SHR-3222CFC6  rows 24..26  status3=coded
  screen=ANA04->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 承認/要再申請依頼理由 sel="#department_approve_reject" val="params.defectContent"
  - [click] click 不承認 sel="#disapproveButton" val=""
  - [popup] ast 遷移 送信先(写)選択画面 sel="" val=""
### BLK-AUTO-27C68433  rows 27..34  status3=coded
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
### BLK-AUTO-042B2DAE  rows 42..43  status3=coded
  screen=AYG001->AYG202B file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route4" val=""
  - [click] click 申請・承認 sel="#route4" val=""
  - [assert] ast transition 申請承認一覧画面 sel="#department_app_status_2" val=""
  - [assert] ast 承認表示条件 sel="#section_app_status_2" val=""
### BLK-AUTO-1D62D29C  rows 44..48  status3=coded
  screen=AYG202B->AYG102 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [check] check 承認表示条件 11:承認待ち sel="#department_app_status_2" val=""
  - [click] click 再表示 sel="#select" val=""
  - [assert] ast display 申請承認一覧画面 sel="#gyoumu_list" val=""
  - [assert] ast 承認表示条件 再表示後 sel="#department_app_status_2" val=""
  - [click] click 承認 sel="#act202to103" val=""
  - [assert] ast transition 取消計上申請承認画面 sel="#div_gyoumu_area_04" val=""
### BLK-SHR-805D28B8  rows 49..51  status3=coded
  screen=ANA04->ANA11 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 承認依頼/要再申請依頼理由 sel="#section_approve_reject" val="params.defectContent"
  - [click] click 不承認 sel="#disapproveButton" val=""
  - [popup] ast 遷移 送信先(写)選択画面 sel="" val=""
### BLK-AUTO-27C68433  rows 52..59  status3=coded
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
- BLK-SHR-3222CFC6  pass  rows None..None
- BLK-AUTO-27C68433  pass  rows None..None
- BLK-AUTO-042B2DAE  pass  rows None..None
- BLK-AUTO-1D62D29C  pass  rows None..None
- BLK-SHR-805D28B8  pass  rows None..None
- BLK-AUTO-27C68433  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r18 遷移|申請承認一覧画面 file=02_r018_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r21 表示|申請承認一覧画面 file=03_r021_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r23 遷移|取消計上申請承認画面 file=05_r023_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r26 遷移|送信先(写)選択画面 file=07_r026_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r29 表示|送信先(写)選択画面 file=09_r029_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r34 遷移|取消計上申請承認画面 file=10_r034_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r43 遷移|申請承認一覧画面 file=12_r043_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r46 表示|申請承認一覧画面 file=13_r046_申請承認一覧画面.png url=...http://127.0.0.1:10097/ANB00/ANA07.html
- [OK ] r48 遷移|取消計上申請承認画面 file=15_r048_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html
- [OK ] r51 遷移|送信先(写)選択画面 file=17_r051_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r54 表示|送信先(写)選択画面 file=19_r054_送信先(写)選択画面.png url=...rove&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r59 遷移|取消計上申請承認画面 file=20_r059_取消計上申請承認画面.png url=...http://127.0.0.1:10097/ANB00/ANA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-120-03-004/01_menu.png
- logs/AY-120-03-004/02_r018_申請承認一覧画面.png
- logs/AY-120-03-004/03_r021_申請承認一覧画面.png
- logs/AY-120-03-004/05_r023_取消計上申請承認画面.png
- logs/AY-120-03-004/07_r026_送信先(写)選択画面.png
- logs/AY-120-03-004/09_r029_送信先(写)選択画面.png
- logs/AY-120-03-004/10_r034_取消計上申請承認画面.png
- logs/AY-120-03-004/12_r043_申請承認一覧画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- COVERAGE GAPS: rows [14, 39] not inside any block range

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
