# AUDIT DOSSIER — AY-121-06-016

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線１６", "item": "2種", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-121-06-016.xlsx"}
feasibility: class=B flow=pass manualSteps=0 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=6 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14
- r15 | OP[1]ボタン|「照会・検索」押下|-
- r16 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r17 | OP[1]入力|画面各項目入力|【別紙】操作内容　１　参照
- r18 | OP[2]ボタン|「検索」押下|-
- r19 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r20 | OP[4]クリック|「No.」リンククリック|-
- r21 | CK[5]遷移|申請・確認更新画面|【別紙】表示内容　１　参照 | EV:画面HC
- r22 | OP[1]入力|登録内容入力|【別紙】操作内容　２　参照
- r23 | OP[2]ボタン|「対応登録」ボタン押下|－
- r24 | CK[3]表示|申請・確認更新画面|【別紙】表示内容　２　参照 | EV:画面HC
- r26
- r29 | OP[1]ボタン|「照会・検索」押下|-
- r30 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r31 | OP[1]入力|画面各項目入力|【別紙】操作内容　３　参照
- r32 | OP[2]ボタン|「検索」押下|-
- r33 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r34 | OP[4]クリック|「No.」リンククリック|-
- r35 | CK[5]遷移|申請・確認更新画面|【別紙】表示内容　3　参照 | EV:画面HC
- r36 | OP[1]入力|登録内容入力|【別紙】操作内容　４　参照
- r37 | OP[2]ボタン|「対応登録」ボタン押下|－
- r38 | CK[3]表示|申請・確認更新画面|【別紙】表示内容　4　参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: A2:AI13
sheets[0]/rows[0][1]: 〇ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、「課支社長」のユーザを設定。
sheets[0]/rows[3][1]: ○入力内容
sheets[0]/rows[5][1]: 1
sheets[0]/rows[5][2]: 証券番号
sheets[0]/rows[5][11]: AY12101
sheets[0]/rows[6][2]: 明細番号
sheets[0]/rows[6][11]: 0000000082
sheets[0]/rows[7][1]: 2
sheets[0]/rows[7][2]: 承認後・不承認後の対応
sheets[0]/rows[7][11]: 対応登録テスト入力。
sheets[0]/rows[9][1]: 3
sheets[0]/rows[9][2]: 証券番号
sheets[0]/rows[9][11]: AY12102
sheets[0]/rows[10][2]: 明細番号
sheets[0]/rows[10][11]: 0000000100
sheets[0]/rows[11][1]: 4
sheets[0]/rows[11][2]: 承認後・不承認後の対応
sheets[0]/rows[11][11]: 対応登録テスト入力。
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AL162
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 申請・確認状況
sheets[1]/rows[2][12]: 承認済
sheets[1]/rows[3][1]: 異例管理番号
sheets[1]/rows[3][12]: 生成された値
sheets[1]/rows[4][1]: 消込状況
sheets[1]/rows[4][12]: 未消込
sheets[1]/rows[5][1]: 申請入力者
sheets[1]/rows[5][12]: 承認依頼したユーザ（営業）
sheets[1]/rows[6][1]: 申請入力日
sheets[1]/rows[6][12]: 承認依頼したシステム日時
sheets[1]/rows[7][1]: 申請者
sheets[1]/rows[7][12]: 承認依頼したユーザ（営業）
sheets[1]/rows[8][1]: 申請日
sheets[1]/rows[8][12]: 承認依頼したシステム日時
sheets[1]/rows[9][1]: 承認者
sheets[1]/rows[9][12]: 承認したユーザ（課支社長）
sheets[1]/rows[10][1]: 承認日
sheets[1]/rows[10][12]: 承認したシステム日時
sheets[1]/rows[11][1]: コンプラ情報システム連携日
sheets[1]/rows[11][12]: 空白
sheets[1]/rows[12][1]: 要再申請依頼者
sheets[1]/rows[12][12]: 空白
sheets[1]/rows[13][1]: 要再申請依頼日
sheets[1]/rows[13][12]: 空白
sheets[1]/rows[14][1]: 登録者
sheets[1]/rows[14][12]: 登録したユーザ（営業）
sheets[1]/rows[15][1]: 登録日
sheets[1]/rows[15][12]: 新規入力時のシステム日
sheets[1]/rows[16][1]: 更新者
sheets[1]/rows[16][12]: 前回更新したユーザ（課支社長）
sheets[1]/rows[17][1]: 更新日
sheets[1]/rows[17][12]: 前回更新したシステム日時
sheets[1]/rows[18][1]: 申請・確認基準項目
sheets[1]/rows[18][12]: 4.再計上契約のある取消計上（積立種目）
sheets[1]/rows[18][36]: 新規入力時の入力内容と同一
sheets[1]/rows[19][1]: 課支社CD
sheets[1]/rows[19][12]: ABM62
sheets[1]/rows[19][36]: 新規入力時の入力内容と同一
sheets[1]/rows[20][1]: 課支社名称
sheets[1]/rows[20][12]: （ABM62）
sheets[1]/rows[21][1]: 代理店CD
sheets[1]/rows[21][12]: 2031
sheets[1]/rows[22][1]: 代理店名称
sheets[1]/rows[22][12]: （2031）
sheets[1]/rows[23][1]: 証券番号
sheets[1]/rows[23][12]: AY12101
sheets[1]/rows[24][1]: 明細番号
sheets[1]/rows[24][12]: 0000000082
sheets[1]/rows[24][36]: 新規入力時の入力内容と同一
sheets[1]/rows[25][1]: 保険契約者氏名
sheets[1]/rows[25][12]: テスト
sheets[1]/rows[26][1]: 大種目
sheets[1]/rows[26][12]: 積立新種
sheets[1]/rows[26][36]: 新規入力時の入力内容と同一
sheets[1]/rows[27][1]: 保種
sheets[1]/rows[27][12]: 16：積立労働災害総合保険
sheets[1]/rows[27][36]: 新規入力時の入力内容と同一
sheets[1]/rows[28][1]: 取消保険料
sheets[1]/rows[28][12]: 1234
sheets[1]/rows[29][1]: 再計上証券番号
sheets[1]/rows[29][12]: 空白
sheets[1]/rows[30][1]: 再計上明細番号
sheets[1]/rows[30][12]: 空白
sheets[1]/rows[31][1]: 証券送付区分
sheets[1]/rows[31][12]: 直送
sheets[1]/rows[31][36]: 新規入力時の入力内容と同一
sheets[1]/rows[32][1]: 変更確認書送付
sheets[1]/rows[32][12]: 直送
sheets[1]/rows[32][36]: 新規入力時の入力内容と同一
sheets[1]/rows[33][1]: 変更確認書課支社送付の理由
sheets[1]/rows[33][12]: テスト理由
sheets[1]/rows[33][36]: 新規入力時の入力内容と同一
sheets[1]/rows[34][1]: 申込日(原契約の申込日)
sheets[1]/rows[34][12]: 20260303
sheets[1]/rows[34][36]: 新規入力時の入力内容と同一
sheets[1]/rows[35][1]: 始期日
sheets[1]/rows[35][12]: 20260505
sheets[1]/rows[35][36]: 新規入力時の入力内容と同一
sheets[1]/rows[36][1]: 届出日(変更届出書の届出日)
sheets[1]/rows[36][12]: 20260404
sheets[1]/rows[36][36]: 新規入力時の入力内容と同一
sheets[1]/rows[37][1]: 取消・変更の計上日
sheets[1]/rows[37][12]: 空白
sheets[1]/rows[38][1]: 異例取扱理由
sheets[1]/rows[38][12]: G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消
sheets[1]/rows[38][36]: 新規入力時の入力内容と同一
sheets[1]/rows[39][1]: 具体的内容
sheets[1]/rows[39][12]: 社員による二重計上
sheets[1]/rows[39][36]: 新規入力時の入力内容と同一
sheets[1]/rows[40][1]: 具体的説明
sheets[1]/rows[40][12]: テスト
sheets[1]/rows[40][36]: 新規入力時の入力内容と同一
sheets[1]/rows[41][1]: 代理店への募集状況の確認要否
sheets[1]/rows[41][12]: 不要
sheets[1]/rows[41][36]: 新規入力時の入力内容と同一
sheets[1]/rows[42][1]: 実施日
sheets[1]/rows[42][12]: 空白
sheets[1]/rows[43][1]: 実施方法
sheets[1]/rows[43][12]: 空白
sheets[1]/rows[44][1]: 実施者(社員)
sheets[1]/rows[44][12]: 空白
sheets[1]/rows[45][1]: 対象者(募集人名)
sheets[1]/rows[45][12]: 空白
sheets[1]/rows[46][1]: 募集方法
sheets[1]/rows[46][12]: 空白
sheets[1]/rows[47][1]: 募集実施日
sheets[1]/rows[47][12]: 空白
sheets[1]/rows[48][1]: その他の募集方法
sheets[1]/rows[48][12]: 空白
sheets[1]/rows[49][1]: 重要事項説明
sheets[1]/rows[49][12]: 空白
sheets[1]/rows[50][1]: 契約内容の確認
sheets[1]/rows[50][12]: 空白
sheets[1]/rows[51][1]: 契約意思の確認
sheets[1]/rows[51][12]: 空白
sheets[1]/rows[52][2]: 契約手続実施者
sheets[1]/rows[52][12]: 空白
sheets[1]/rows[53][1]: 今後の活動に対する指導
sheets[1]/rows[53][12]: 空白
sheets[1]/rows[54][1]: 保険始期日と届出日の関係
sheets[1]/rows[54][12]: 届出日(変更届出書の届出日)が始期日より前　<保険契約者ヒアリング不要>
sheets[1]/rows[54][36]: 新規入力時の入力内容と同一
sheets[1]/rows[55][1]: 実施日
sheets[1]/rows[55][12]: 空白
sheets[1]/rows[56][1]: 実施方法
sheets[1]/rows[56][12]: 空白
sheets[1]/rows[57][1]: 実施者(社員)
sheets[1]/rows[57][12]: 空白
sheets[1]/rows[58][1]: 対象者(募集人名)
sheets[1]/rows[58][12]: 空白
sheets[1]/rows[59][1]: 募集方法
sheets[1]/rows[59][12]: 空白
sheets[1]/rows[60][1]: 募集実施日
sheets[1]/rows[60][12]: 空白
sheets[1]/rows[61][1]: その他の募集方法
sheets[1]/rows[61][12]: 空白
sheets[1]/rows[62][1]: 重要事項説明
sheets[1]/rows[62][12]: 空白
sheets[1]/rows[63][1]: 契約内容の確認
sheets[1]/rows[63][12]: 空白
sheets[1]/rows[64][1]: 契約意思の確認
sheets[1]/rows[64][12]: 空白
sheets[1]/rows[65][2]: 契約手続実施者
sheets[1]/rows[65][12]: 空白
sheets[1]/rows[66][1]: 異例取扱理由
sheets[1]/rows[66][12]: 空白
sheets[1]/rows[67][1]: 異例取扱理由備考
sheets[1]/rows[67][12]: 空白
sheets[1]/rows[68][1]: 契約者からの不満足の表明
sheets[1]/rows[68][12]: 空白
sheets[1]/rows[69][1]: (有の場合、CS・苦情システムに登録)
sheets[1]/rows[70][1]: CS・苦情システム　苦情No
sheets[1]/rows[70][12]: 空白
sheets[1]/rows[71][1]: 募集行為に問題の可能性
sheets[1]/rows[71][12]: 空白
sheets[1]/rows[72][1]: (有の場合、コンプラ情報システムに登録)
sheets[1]/rows[73][1]: コンプラ情報システム　管理No
sheets[1]/rows[73][12]: 空白
sheets[1]/rows[74][1]: 承認依頼先
sheets[1]/rows[74][12]: 課支社長
sheets[1]/rows[75][1]: 承認代行者
sheets[1]/rows[75][12]: 課支社長
sheets[1]/rows[76][1]: 承認／要再申請依頼理由
sheets[1]/rows[76][12]: 空白
sheets[1]/rows[77][1]: 承認後・不承認後の対応
sheets[1]/rows[77][12]: 空白
sheets[1]/rows[78][0]: 2
sheets[1]/rows[78][1]: 更新者
sheets[1]/rows[78][12]: ログインユーザ
sheets[1]/rows[78][36]: 更新されること
sheets[1]/rows[79][1]: 更新日
sheets[1]/rows[79][12]: 対応登録したシステム日時
sheets[1]/rows[79][36]: 更新されること
sheets[1]/rows[80][1]: 承認後・不承認後の対応
sheets[1]/rows[80][12]: 対応登録テスト入力。
sheets[1]/rows[80][36]: 更新されること
sheets[1]/rows[82][0]: 3
sheets[1]/rows[82][1]: 申請・確認状況
sheets[1]/rows[82][12]: 不承認
sheets[1]/rows[83][1]: 異例管理番号
sheets[1]/rows[83][12]: 空白
sheets[1]/rows[84][1]: 消込状況
sheets[1]/rows[84][12]: 未消込
sheets[1]/rows[85][1]: 申請入力者
sheets[1]/rows[85][12]: 承認依頼したユーザ（営業）
sheets[1]/rows[86][1]: 申請入力日
sheets[1]/rows[86][12]: 承認依頼したシステム日時
sheets[1]/rows[87][1]: 申請者
sheets[1]/rows[87][12]: 承認依頼したユーザ（営業）
sheets[1]/rows[88][1]: 申請日
sheets[1]/rows[88][12]: 承認依頼したシステム日時
sheets[1]/rows[89][1]: 承認者
sheets[1]/rows[89][12]: 不承認したユーザ（課支社長）
sheets[1]/rows[90][1]: 承認日
sheets[1]/rows[90][12]: 不承認したシステム日時
sheets[1]/rows[91][1]: コンプラ情報システム連携日
sheets[1]/rows[91][12]: 空白
sheets[1]/rows[92][1]: 要再申請依頼者
sheets[1]/rows[92][12]: 空白
sheets[1]/rows[93][1]: 要再申請依頼日
sheets[1]/rows[93][12]: 空白
sheets[1]/rows[94][1]: 登録者
sheets[1]/rows[94][12]: 登録したユーザ（営業）
sheets[1]/rows[95][1]: 登録日
sheets[1]/rows[95][12]: 新規入力時のシステム日
sheets[1]/rows[96][1]: 更新者
sheets[1]/rows[96][12]: 前回更新したユーザ（課支社長）
sheets[1]/rows[97][1]: 更新日
sheets[1]/rows[97][12]: 新規入力時のシステム日
sheets[1]/rows[98][1]: 申請・確認基準項目
sheets[1]/rows[98][12]: 4.再計上契約のある取消計上（積立種目）
sheets[1]/rows[99][1]: 課支社CD
sheets[1]/rows[99][12]: ABM62
sheets[1]/rows[100][1]: 課支社名称
sheets[1]/rows[100][12]: （ABM62）
sheets[1]/rows[101][1]: 代理店CD
sheets[1]/rows[101][12]: 2031
sheets[1]/rows[102][1]: 代理店名称
sheets[1]/rows[102][12]: （2031）
sheets[1]/rows[103][1]: 証券番号
sheets[1]/rows[103][12]: AY12102
sheets[1]/rows[104][1]: 明細番号
sheets[1]/rows[104][12]: 0000000100
sheets[1]/rows[105][1]: 保険契約者氏名
sheets[1]/rows[105][12]: テスト
sheets[1]/rows[106][1]: 大種目
sheets[1]/rows[106][12]: 積立新種
sheets[1]/rows[107][1]: 保種
sheets[1]/rows[107][12]: 16：積立労働災害総合保険
sheets[1]/rows[108][1]: 取消保険料
sheets[1]/rows[108][12]: 1234
sheets[1]/rows[109][1]: 再計上証券番号
sheets[1]/rows[109][12]: 空白
sheets[1]/rows[110][1]: 再計上明細番号
sheets[1]/rows[110][12]: 空白
sheets[1]/rows[111][1]: 証券送付区分
sheets[1]/rows[111][12]: 直送
sheets[1]/rows[112][1]: 変更確認書送付
sheets[1]/rows[112][12]: 直送
sheets[1]/rows[113][1]: 変更確認書課支社送付の理由
sheets[1]/rows[113][12]: テスト理由
sheets[1]/rows[114][1]: 申込日(原契約の申込日)
sheets[1]/rows[114][12]: 20260303
sheets[1]/rows[115][1]: 始期日
sheets[1]/rows[115][12]: 20260505
sheets[1]/rows[116][1]: 届出日(変更届出書の届出日)
sheets[1]/rows[116][12]: 20260404
sheets[1]/rows[117][1]: 取消・変更の計上日
sheets[1]/rows[117][12]: 空白
sheets[1]/rows[118][1]: 異例取扱理由
sheets[1]/rows[118][12]: G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消
sheets[1]/rows[119][1]: 具体的内容
sheets[1]/rows[119][12]: 社員による二重計上
sheets[1]/rows[120][1]: 具体的説明
sheets[1]/rows[120][12]: テスト
sheets[1]/rows[121][1]: 代理店への募集状況の確認要否
sheets[1]/rows[121][12]: 不要
sheets[1]/rows[122][1]: 実施日
sheets[1]/rows[122][12]: 空白
sheets[1]/rows[123][1]: 実施方法
sheets[1]/rows[123][12]: 空白
sheets[1]/rows[124][1]: 実施者(社員)
sheets[1]/rows[124][12]: 空白
sheets[1]/rows[125][1]: 対象者(募集人名)
sheets[1]/rows[125][12]: 空白
sheets[1]/rows[126][1]: 募集方法
sheets[1]/rows[126][12]: 空白
sheets[1]/rows[127][1]: 募集実施日
sheets[1]/rows[127][12]: 空白
sheets[1]/rows[128][1]: その他の募集方法
sheets[1]/rows[128][12]: 空白
sheets[1]/rows[129][1]: 重要事項説明
sheets[1]/rows[129][12]: 空白
sheets[1]/rows[130][1]: 契約内容の確認
sheets[1]/rows[130][12]: 空白
sheets[1]/rows[131][1]: 契約意思の確認
sheets[1]/rows[131][12]: 空白
sheets[1]/rows[132][2]: 契約手続実施者
sheets[1]/rows[132][12]: 空白
sheets[1]/rows[133][1]: 今後の活動に対する指導
sheets[1]/rows[133][12]: 空白
sheets[1]/rows[134][1]: 保険始期日と届出日の関係
sheets[1]/rows[134][12]: 届出日(変更届出書の届出日)が始期日より前　<保険契約者ヒアリング不要>
sheets[1]/rows[135][1]: 実施日
sheets[1]/rows[135][12]: 空白
sheets[1]/rows[136][1]: 実施方法
sheets[1]/rows[136][12]: 空白
sheets[1]/rows[137][1]: 実施者(社員)
sheets[1]/rows[137][12]: 空白
sheets[1]/rows[138][1]: 対象者(募集人名)
sheets[1]/rows[138][12]: 空白
sheets[1]/rows[139][1]: 募集方法
sheets[1]/rows[139][12]: 空白
sheets[1]/rows[140][1]: 募集実施日
sheets[1]/rows[140][12]: 空白
sheets[1]/rows[141][1]: その他の募集方法
sheets[1]/rows[141][12]: 空白
sheets[1]/rows[142][1]: 重要事項説明
sheets[1]/rows[142][12]: 空白
sheets[1]/rows[143][1]: 契約内容の確認
sheets[1]/rows[143][12]: 空白
sheets[1]/rows[144][1]: 契約意思の確認
sheets[1]/rows[144][12]: 空白
sheets[1]/rows[145][2]: 契約手続実施者
sheets[1]/rows[145][12]: 空白
sheets[1]/rows[146][1]: 異例取扱理由
sheets[1]/rows[146][12]: 空白
sheets[1]/rows[147][1]: 異例取扱理由備考
sheets[1]/rows[147][12]: 空白
sheets[1]/rows[148][1]: 契約者からの不満足の表明
sheets[1]/rows[148][12]: 空白
sheets[1]/rows[149][1]: (有の場合、CS・苦情システムに登録)
sheets[1]/rows[150][1]: CS・苦情システム　苦情No
sheets[1]/rows[150][12]: 空白
sheets[1]/rows[151][1]: 募集行為に問題の可能性
sheets[1]/rows[151][12]: 空白
sheets[1]/rows[152][1]: (有の場合、コンプラ情報システムに登録)
sheets[1]/rows[153][1]: コンプラ情報システム　管理No
sheets[1]/rows[153][12]: 空白
sheets[1]/rows[154][1]: 承認依頼先
sheets[1]/rows[154][12]: 課支社長
sheets[1]/rows[155][1]: 承認代行者
sheets[1]/rows[155][12]: 課支社長
sheets[1]/rows[156][1]: 承認／要再申請依頼理由
sheets[1]/rows[156][12]: テスト
sheets[1]/rows[157][1]: 承認後・不承認後の対応
sheets[1]/rows[157][12]: 空白
sheets[1]/rows[158][0]: 4
sheets[1]/rows[158][1]: 更新者
sheets[1]/rows[158][12]: ログインユーザ
sheets[1]/rows[158][36]: 更新されること
sheets[1]/rows[159][1]: 更新日
sheets[1]/rows[159][12]: 対応登録したシステム日時
sheets[1]/rows[159][36]: 更新されること
sheets[1]/rows[160][1]: 承認後・不承認後の対応
sheets[1]/rows[160][12]: 対応登録テスト入力。
sheets[1]/rows[160][36]: 更新されること
sheets[2]/name: 【別紙】事前準備
sheets[2]/type: PREPARATION
sheets[2]/range: A2:AI8
sheets[2]/rows[0][1]: 〇データ準備
sheets[2]/rows[2][1]: 1
sheets[2]/rows[2][2]: 証券番号
sheets[2]/rows[2][11]: AY12102
sheets[2]/rows[3][2]: 明細番号
sheets[2]/rows[3][11]: 0000000100
sheets[2]/rows[5][1]: ●上記の申請書について、AY-121-04-016（承認依頼取消後）、申請・確認状況が「要再申請」になっている。
sheets[2]/rows[6][1]: ⇒
sheets[2]/rows[6][2]: 試験を行うため、申請・確認状況を「承認待ち」→「不承認」にする。

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000100"  <- generated.json
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
- policyNo = "AY12102"  <- generated.json
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
params total=34, auto-fallback=32: user,pointCheck,sectionCode,agentCode,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AUTO-E2D0C359  rows 15..16  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-AUTO-4F9D57E1  rows 17..21  status3=coded
  screen=AYG200->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
### BLK-AY-SHINSEI-TAIOUTOUROKU  rows 22..24  status3=coded
  screen=ANA03 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 登録内容入力 sel="#disapprove_correspond" val="params.defectContent"
  - [click] click 対応登録 sel="#actionRegist" val="" NOTE:mockは申請ステータス無しのため非活性→force
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val=""
### BLK-AUTO-E2D0C359  rows 29..30  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-AUTO-4F9D57E1  rows 31..35  status3=coded
  screen=AYG200->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
### BLK-AY-SHINSEI-TAIOUTOUROKU  rows 36..38  status3=coded
  screen=ANA03 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 登録内容入力 sel="#disapprove_correspond" val="params.defectContent"
  - [click] click 対応登録 sel="#actionRegist" val="" NOTE:mockは申請ステータス無しのため非活性→force
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val=""

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-AUTO-4F9D57E1  pass  rows None..None
- BLK-AY-SHINSEI-TAIOUTOUROKU  pass  rows None..None
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-AUTO-4F9D57E1  pass  rows None..None
- BLK-AY-SHINSEI-TAIOUTOUROKU  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r16 遷移|照会・検索画面 file=02_r016_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r19 表示|照会・検索画面 file=03_r019_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r21 遷移|申請・確認更新画面 file=05_r021_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r24 表示|申請・確認更新画面 file=06_r024_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r30 遷移|照会・検索画面 file=09_r030_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r33 表示|照会・検索画面 file=10_r033_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r35 遷移|申請・確認更新画面 file=12_r035_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r38 表示|申請・確認更新画面 file=13_r038_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-121-06-016/01_menu.png
- logs/AY-121-06-016/02_r016_照会・検索画面.png
- logs/AY-121-06-016/03_r019_照会・検索画面.png
- logs/AY-121-06-016/05_r021_申請・確認更新画面.png
- logs/AY-121-06-016/06_r024_申請・確認更新画面.png
- logs/AY-121-06-016/09_r030_照会・検索画面.png
- logs/AY-121-06-016/10_r033_照会・検索画面.png
- logs/AY-121-06-016/12_r035_申請・確認更新画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- COVERAGE GAPS: rows [14, 26] not inside any block range

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
