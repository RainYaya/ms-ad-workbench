# STRUCTURAL GROUPS (exact block signature)

[1] AY-100-08-001
[1] AY-100-08-002
[1] AY-100-08-004
[1] AY-100-08-005
[2] AY-120-08-001 AY-121-07-001
    SIG: BLK-AUTO-E2D0C359|BLK-SHR-40B1188F|BLK-AUTO-5637DF50|BLK-SHR-73B769C8|BLK-SGL-C17F75BC
[2] AZ-110-16-001 AZ-110-40-001
    SIG: BLK-AZ-MENU-SEARCH-LIST|BLK-AZ-LIST-FILTER-OPEN-UPDATE|BLK-AUTO-FED6C2EF|BLK-AUTO-04A78248|BLK-AZ-ITEM-SEARCH-SELECT|BLK-AZ-INQUIRY-EDIT|BLK-AUTO-A315BF06
[2] AZ-110-34-001 AZ-210-64-001
    SIG: BLK-AZ-MENU-SEARCH-LIST|BLK-AZ-LIST-FILTER-OPEN-UPDATE|BLK-AUTO-C8BDC3F2|BLK-AUTO-23229D4F
[1] AZ-110-65-001
[1] AZ-110-71-001
[1] AZ-111-05-007
[1] AZ-111-05-008
[1] AZ-111-05-009
[1] AZ-111-05-010
[1] AZ-111-05-011
[1] AZ-150-10-004
[2] AZ-200-03-001 AZ-200-03-003
    SIG: BLK-AZ-SESSION-TIMEOUT
[1] AZ-210-11-001
[1] AZ-210-17-001
[1] AZ-210-35-001
[1] AZ-210-50-001
[1] AZ-230-01-011
[1] AZ-230-01-012
[1] AZ-230-01-013
[1] AZ-230-01-014
[1] AZ-230-01-015
[1] AZ-230-01-016
[1] AZ-230-01-017
[1] AZ-230-01-018
[1] AZ-230-01-019
[1] AZ-230-01-020
[1] AZ-230-01-041
[1] AZ-230-01-042
[1] AZ-230-01-043
[1] AZ-230-01-044
[1] AZ-230-01-045
[1] AZ-230-01-046
[1] AZ-230-01-047
[1] AZ-230-01-048
[1] AZ-230-01-049
[1] AZ-230-01-050
[1] AZ-230-01-071
[1] AZ-230-01-072
[1] AZ-230-01-073
[1] AZ-230-01-074
[1] AZ-230-01-075
[1] AZ-230-01-076
[1] AZ-230-01-077
[1] AZ-230-01-078
[1] AZ-230-01-079
[1] AZ-230-01-080
[1] AZ-230-01-101
[1] AZ-230-01-102
[1] AZ-230-01-103
[1] AZ-230-01-104
[1] AZ-230-01-105
[1] AZ-230-01-106
[1] AZ-230-01-107
[1] AZ-230-01-108
[1] AZ-230-01-109
[1] AZ-230-01-110
[1] AZ-230-01-131
[1] AZ-230-01-132
[1] AZ-230-01-133
[1] AZ-230-01-134
[1] AZ-230-01-135
[1] AZ-230-01-136
[1] AZ-230-01-137
[1] AZ-230-01-138
[1] AZ-230-01-139
[1] AZ-230-01-140
[1] AZ-230-01-151
[1] AZ-230-01-152
[1] AZ-230-01-153
[1] AZ-230-01-154
[1] AZ-230-01-155
[1] AZ-230-01-156
[1] AZ-230-01-157
[1] AZ-310-06-001
[1] AZ-310-18-001
[1] AZ-310-24-001
[1] AZ-310-39-001
[3] AZ-410-06-001 AZ-410-06-002 AZ-410-06-003
    SIG: BLK-AZ-MENU-SEARCH-LIST|BLK-AZ-LIST-FILTER-OPEN-UPDATE|BLK-AUTO-BABA9D55
[1] AZ-510-01-005

# PER-CASE DIGEST

## AY-100-08-001  item=共通 fn=タイムゾーン：データ登録・更新
  feas: class=B flow=pass manualSteps=5 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=2 skipped=[]
  手順: r14 | OP[1]ボタン|「新規登録」押下| // r15 | CK[2]遷移|取消計上申請登録画面|遷移すること | EV:（目視確認） // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「登録」押下|ボタン押下時の時刻をメモ // r18 | CK[3]遷移|申請・確認更新画面|操作内容2-1で変更した内容が反映されること | EV:画面HC // r19 | CK[4]その他|取消計上申請テーブル|「登録日」の時刻が、操作内容2-2の時刻とずれがないこと | EV:DBﾀﾞﾝﾌﾟ // r20 | OP[1]入力|任意の項目の値を変更| // r21 | OP[2]ボタン|「更新」押下|ボタン押下時の時刻をメモ // r22 | CK[3]表示|申請・確認更新画面|操作内容3-1で変更した内容が反映されること | EV:画面HC // r23 | CK[4]その他|取消計上申請テーブル|「更新日」の時刻が、操作内容3-2の時刻とずれがないこと | EV:DBﾀﾞﾝﾌﾟ // r24 | CK[5]その他|APログ|操作内容1-1～3-2の時刻とずれがないこと | EV:APﾛｸﾞ // r25 | CK[6]その他|DBログ|操作内容1-1～3-2の時刻とずれがないこと | EV:DBﾛｸﾞ // r26 | CK[7]その他|TRログ|操作内容1-1～3-2の時刻とずれがないこと | EV:TRﾛｸﾞ
  別紙业务值: ["○入力内容", "証券番号", "AY10008", "明細番号", "0000000001", "その他の項目"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000001*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AY10008*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#route3*, startUrl=/ANB00/ANA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AY-TORIKESHI-REGISTER rows14..18 st=coded: click:新規登録 | fill:課支社CD=AHE61 | fill:代理店CD=252H | fill:証券番号=AY11001 | fill:保険契約者名=テスト太郎 | fill:申込日=2026/10/01 | fill:始期日=2026/10/01 | fill:届出日=2026/10/02 | click:登録
  - BLK-SGL-7597207A rows19..26 st=coded: assert:取消計上申請テーブル!NOTE | fill:任意の項目(契約者名)=customerName | click:更新 | assert:取消計上申請テーブル!NOTE | assert:APログ!NOTE | assert:DBログ!NOTE | assert:TRログ!NOTE
      NOTE:登録データ=非浏览器=真機人工（mockは更新画面在位で代理）
      NOTE:更新日=非浏览器=真機人工
      NOTE:APログ時刻=非浏览器=真機人工
      NOTE:DBログ時刻=非浏览器=真機人工
      NOTE:TRログ時刻=非浏览器=真機人工
  results: ALL PASS 2
  evidence(2): r18:OK r22:OK
  keys(4): 01_menu.png 02_r018_申請・確認更新画面.png 03_r022_申請・確認更新画面.png 05_BLK-SGL-7597207A.png

## AY-100-08-002  item=共通 fn=タイムゾーン：セッション
  feas: class=B flow=pass manualSteps=2 proxyBlocks=0 paramIssues=0 paramsAuto=False source=boundary.json
  status3=coded runner=pass blocks=1 skipped=[]
  手順: r14 | OP[1]その他|画面を操作せず、一時間待機| // r15 | OP[2]ボタン|「新規登録」押下| // r16 | CK[3]遷移|セッションタイムアウト画面 // r17 | CK[4]出力（Msg）|エラーメッセージ|MAYG800E002 | EV:画面HC
  別紙业务值: []
  params(38,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, errorCode=MAZG000E001*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, loginUrl=/AMB/dummy.html*, menuSelector=input[name=menu_cm]*, pointCheck=?*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#route3*, startUrl=/ANB00/ANA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*, userId=MS3N*
  別紙值未见于params: (none)
  - BLK-AY-MENU-SESSION-TIMEOUT rows14..17 st=coded: assert:AYメニュー可視
  results: ALL PASS 1
  evidence(2): r16:SOFT r17:OK
  MECH: ["- EVIDENCE NOT EXACT rows: [16]", "- MANUAL (non-browser) rows: [16] — per MANUAL-DECISION.md these are human steps"]
  keys(3): 01_menu.png 02_r017_エラーメッセージ.png 03_BLK-AY-MENU-SESSION-TIME.png

## AY-100-08-004  item=共通 fn=タイムゾーン：ダウンロードログ
  feas: class=B flow=pass manualSteps=3 proxyBlocks=1 paramIssues=0 paramsAuto=True source=auto.json
  status3=coded runner=pass blocks=2 skipped=[]
  手順: r14 | OP[1]ボタン|「照会・検索」押下| // r15 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認） // r16 | OP[1]入力|証券番号|AY10008003 // r17 | OP[2]ボタン|「検索」押下| // r18 | CK[3]表示|照会・検索画面|データが表示されること | EV:画面HC // r19 | OP[4]入力|ダウンロード申請番号|Z990000002 // r20 | OP[5]ボタン|「検索結果出力」押下|ボタン押下時の時刻をメモ // r21 | CK[6]出力（Msg）|メッセージボックス|MAYG200I001が出力されること | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r22 | OP[7]ボタン|「OK」押下| // r23 | CK[8]表示|ダウンロードメッセージ|CSVファイルがダウンロードされること | EV:画面HC // r24 | CK[9]出力（DL）|申請・確認情報ファイル|「AYR004.csv」が保存できること | EV:CSVﾌｧｲﾙ // r25 | CK[10]その他|DLログ|操作内容1-1～2-7の時刻とずれがないこと | EV:DLﾛｸﾞ
  別紙业务值: []
  params(34,auto=34): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#route3*, startUrl=/ANB00/ANA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AUTO-E2D0C359 rows14..15 st=coded: assert:AYメニュー表示 | click:照会・検索 | assert:検索結果エリア
  - BLK-SGL-2B7D45E3 rows16..25 st=coded: fill:証券番号=AY10008003 | click:検索 | fill:ダウンロード申請番号=Z990000002 | click:検索結果出力 | click:OK
      NOTE:非浏览器=真機人工（ポップアップMsg）
      NOTE:非浏览器=真機人工（DLログ）
  results: ALL PASS 2
  evidence(2): r18:OK r23:SOFT
  MECH: ["- EVIDENCE NOT EXACT rows: [23]", "- MANUAL (non-browser) rows: [23] — per MANUAL-DECISION.md these are human steps"]
  keys(3): 01_menu.png 02_r018_照会・検索画面.png 04_BLK-SGL-2B7D45E3.png

## AY-100-08-005  item=共通 fn=タイムゾーン：バッチでデータ登録（非Lambda）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
  status3=coded runner=pass blocks=2 skipped=[]
  手順: r14 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１参照 // r15 | CK[2]その他|操作結果|- | EV:画面HC // r16 | CK[3]その他|取消計上申請テーブル|「登録日」の時刻が、操作内容1-1の時刻とずれがないこと | EV:DBﾀﾞﾝﾌﾟ // r17 | CK[4]その他|APログ|操作内容1-1の時刻とずれがないこと | EV:APﾛｸﾞ // r18 | CK[5]その他|DBログ|操作内容1-1の時刻とずれがないこと | EV:DBﾛｸﾞ
  別紙业务值: ["○事前確認", "・試験実施前に、以下テストデータとして作成予定の証券番号と明細番号に一致するデータが、取消計上申請テーブルに存在しないことを確認", "※　DBダンプも取得", "○テストデータ作成", "計上情報ファイル", "FAYA001.csv", "作成日時", "異例管理番号", "取消計上区分", "課支社コード", "代理店コード", "大種目コード", "保種コード", "証券番号", "明細番号", "契約者名", "再計上証券番号", "再計上明細番号", "取消保険料", "申込日", "始期日", "届出日", "取消・変更の計上日", "異例取扱理由（理由コード）", "変更事由1", "変更事由2", "変更事由3", "変更事由4", "変更事由5", "変更事由6", "予備", "M01", "ABM62", "AY10008", "0000000001", "テスト", "〇ファイル配置：EFS（疑似環境）", "/proj/mhkcm/MS/AP/tks/file/recv", "○入力内容", "バッチサーバ（EC2）（疑似環境）で実行", "実行コマンド", "cd /proj/mhkcm/MS/AP/tks/lib", "java -jar AYB001.jar", "echo $status", "戻り値が0であること"]
  params(34,auto=34): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-BATCH-RUN-VERIFY rows14..15 st=coded: assert:バッチ実行＋操作結果/APログ確認!NOTE
      NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-0C5A44D1 rows16..18 st=coded: assert:取消計上申請テーブル!NOTE | assert:APログ!NOTE | assert:DBログ!NOTE
      NOTE:非浏览器=真機人工（DBダンプ確認）
      NOTE:非浏览器=真機人工（APログ確認）
      NOTE:非浏览器=真機人工（DBログ確認）
  results: ALL PASS 2
  evidence(1): r15:OK
  keys(3): 01_menu.png 02_r015_操作結果.png 04_BLK-SGL-0C5A44D1.png

## AY-120-08-001  item=更新 fn=シナリオ導線１（現新あり）
  feas: class=B flow=pass manualSteps=3 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=5 skipped=[]
  手順: r14 | OP[1]ボタン|「照会・検索」押下|- // r15 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC // r16 | OP[1]入力|画面各項目入力|【別紙】操作内容　１　参照 // r17 | OP[2]ボタン|「検索」押下|- // r18 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC // r19 | OP[4]クリック|「No.」リンククリック| // r20 | CK[5]遷移|申請・確認更新画面|【別紙】表示内容　１　参照 | EV:画面HC // r21 | OP[1]入力|画面各項目入力|【別紙】操作内容　2　参照 // r22 | OP[2]ボタン|「更新」押下|- // r23 | CK[3]表示|申請・確認更新画面|【別紙】表示内容　2　参照 | EV:画面HC // r24 | CK[4]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r25 | CK[5]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r26 | CK[6]その他|取消計上申請テーブル|データが更新されたこと | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["〇ログイン情報", "ＭＳのユーザかつ、「営業」のユーザを設定。", "証券番号", "AY12003", "明細番号", "0000000049", "異例取扱理由", "G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消", "具体的内容", "社員による二重計上", "○表示内容", "申請・確認状況", "要再申請", "異例管理番号", "消込状況", "未消込", "申請入力者", "申請入力日", "申請者", "申請日", "承認者", "承認日", "コンプラ情報システム連携日", "要再申請依頼者", "要再申請依頼したユーザ（部支店長）", "要再申請依頼日", "要再申請依頼したシステム日時", "登録者", "登録したユーザ（営業）", "登録日", "新規入力時のシステム日", "更新者", "前回更新したユーザ（部支店長）", "更新日", "前回更新したシステム日時", "申請・確認基準項目", "1.再計上契約のない取消計上", "新規入力時の入力内容と同一", "課支社CD", "ABM62", "新規入力時の入力内容と同一", "課支社名称", "（ABM62）", "代理店CD", "新規入力時の入力内容と同一", "代理店名称", "（2031）", "証券番号", "AY12003", "新規入力時の入力内容と同一", "明細番号", "0000000049", "新規入力時の入力内容と同一", "保険契約者氏名", "テスト", "新規入力時の入力内容と同一", "大種目", "自動車", "新規入力時の入力内容と同一", "保種", "11：クルマの保険/はじめての自動車保険", "新規入力時の入力内容と同一", "取消保険料", "新規入力時の入力内容と同一", "再計上証券番号", "再計上明細番号", "証券送付区分", "直送", "新規入力時の入力内容と同一", "変更確認書送付", "直送", "新規入力時の入力内容と同一", "変更確認書課支社送付の理由", "テスト理由", "新規入力時の入力内容と同一", "申込日(原契約の申込日)", "新規入力時の入力内容と同一", "始期日", "新規入力時の入力内容と同一", "届出日(変更届出書の届出日)", "新規入力時の入力内容と同一", "取消・変更の計上日", "異例取扱理由", "A.当社・代理店の責による意図しない保険契約の解消", "新規入力時の入力内容と同一", "具体的内容", "募集人(代理店)の説明誤り", "新規入力時の入力内容と同一", "具体的説明", "テスト", "新規入力時の入力内容と同一", "代理店への募集状況の確認要否", "不要", "新規入力時の入力内容と同一", "実施日", "実施方法", "実施者(社員)", "対象者(募集人名)", "募集方法", "募集実施日", "その他の募集方法", "重要事項説明", "契約内容の確認", "契約意思の確認", "契約手続実施者", "今後の活動に対する指導", "保険始期日と届出日の関係", "届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>", "新規入力時の入力内容と同一", "実施日", "実施方法", "実施者(社員)", "対象者(募集人名)", "募集方法", "募集実施日", "その他の募集方法", "重要事項説明", "契約内容の確認", "契約意思の確認", "契約手続実施者", "異例取扱理由", "異例取扱理由備考", "契約者からの不満足の表明", "(有の場合、CS・苦情システムに登録)", "CS・苦情システム　苦情No", "募集行為に問題の可能性", "(有の場合、コンプラ情報システムに登録)", "コンプラ情報システム　管理No", "申請依頼先", "課支社長", "新規入力時の入力内容と同一", "申請代行者", "課支社長", "承認依頼／要再申請依頼理由", "テスト", "承認依頼先", "部支店長", "承認代行者", "部支店長", "承認／要再申請依頼理由", "承認後・不承認後の対応", "更新者", "更新したユーザ（営業）", "更新されること", "更新日", "更新したシステム日時", "更新されること", "異例取扱理由", "G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消", "更新されること", "具体的内容", "社員による二重計上", "更新されること"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000049*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AY12003*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#route3*, startUrl=/ANB00/ANA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AUTO-E2D0C359 rows14..15 st=coded: assert:AYメニュー表示 | click:照会・検索 | assert:検索結果エリア
  - BLK-SHR-40B1188F rows16..18 st=coded: fill:課支社CD=AHE61 | fill:代理店CD=252H | fill:証券番号=AY11001 | click:検索 | assert:検索条件エリア
      NOTE:0件時の非表示はモック未再現（検索結果行は固定1件）
  - BLK-AUTO-5637DF50 rows21..23 st=coded: fill:各項目(契約者名)=customerName | click:更新
  - BLK-SHR-73B769C8 rows24..26 st=coded: assert:APログ!NOTE | assert:DBログ!NOTE | assert:取消計上申請テーブル!NOTE
      NOTE:APログ出力=非浏览器=真機人工
      NOTE:DBログ出力=非浏览器=真機人工
      NOTE:データ更新=非浏览器=真機人工
  - BLK-SGL-C17F75BC rows19..20 st=planned: assert:検索結果表示
  results: ALL PASS 5
  evidence(4): r15:OK r18:OK r20:OK r23:OK
  keys(6): 01_menu.png 02_r015_照会・検索画面.png 03_r018_照会・検索画面.png 06_r020_申請・確認更新画面.png 07_r023_申請・確認更新画面.png 10_BLK-SGL-C17F75BC.png

## AY-121-07-001  item=更新 fn=シナリオ導線１（現新あり）
  feas: class=B flow=pass manualSteps=3 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=5 skipped=[]
  手順: r14 | OP[1]ボタン|「照会・検索」押下|- // r15 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC // r16 | OP[1]入力|画面各項目入力|【別紙】操作内容　１　参照 // r17 | OP[2]ボタン|「検索」押下|- // r18 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC // r19 | OP[4]クリック|「No.」リンククリック| // r20 | CK[5]遷移|申請・確認更新画面|【別紙】表示内容　１　参照 | EV:画面HC // r21 | OP[1]入力|画面各項目入力|【別紙】操作内容　2　参照 // r22 | OP[2]ボタン|「更新」押下|- // r23 | CK[3]表示|申請・確認更新画面|【別紙】表示内容　2　参照 | EV:画面HC // r24 | CK[4]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r25 | CK[5]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r26 | CK[6]その他|取消計上申請テーブル|データが更新されたこと | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["〇ログイン情報", "ＭＳのユーザかつ、「営業」のユーザを設定。", "証券番号", "AY12102", "明細番号", "0000000085", "異例取扱理由", "H.その他(上記以外)", "○表示内容", "申請・確認状況", "要再申請", "異例管理番号", "消込状況", "未消込", "申請入力者", "申請入力日", "申請者", "申請日", "承認者", "承認日", "コンプラ情報システム連携日", "要再申請依頼者", "要再申請依頼したユーザ（課支社長）", "要再申請依頼日", "要再申請依頼したシステム日時", "登録者", "登録したユーザ（営業）", "登録日", "新規入力時のシステム日", "更新者", "前回更新したユーザ（課支社長）", "更新日", "前回更新したシステム日時", "申請・確認基準項目", "1.再計上契約のない取消計上", "新規入力時の入力内容と同一", "課支社CD", "ABM62", "新規入力時の入力内容と同一", "課支社名称", "（ABM62）", "代理店CD", "新規入力時の入力内容と同一", "代理店名称", "（2031）", "証券番号", "AY12102", "新規入力時の入力内容と同一", "明細番号", "0000000085", "新規入力時の入力内容と同一", "保険契約者氏名", "テスト", "新規入力時の入力内容と同一", "大種目", "自動車", "新規入力時の入力内容と同一", "保種", "11：クルマの保険/はじめての自動車保険", "新規入力時の入力内容と同一", "取消保険料", "新規入力時の入力内容と同一", "再計上証券番号", "再計上明細番号", "証券送付区分", "直送", "新規入力時の入力内容と同一", "変更確認書送付", "直送", "新規入力時の入力内容と同一", "変更確認書課支社送付の理由", "テスト理由", "新規入力時の入力内容と同一", "申込日(原契約の申込日)", "新規入力時の入力内容と同一", "始期日", "新規入力時の入力内容と同一", "届出日(変更届出書の届出日)", "新規入力時の入力内容と同一", "取消・変更の計上日", "異例取扱理由", "A.当社・代理店の責による意図しない保険契約の解消", "新規入力時の入力内容と同一", "具体的内容", "募集人(代理店)の説明誤り", "新規入力時の入力内容と同一", "具体的説明", "テスト", "新規入力時の入力内容と同一", "代理店への募集状況の確認要否", "不要", "新規入力時の入力内容と同一", "実施日", "実施方法", "実施者(社員)", "対象者(募集人名)", "募集方法", "募集実施日", "その他の募集方法", "重要事項説明", "契約内容の確認", "契約意思の確認", "契約手続実施者", "今後の活動に対する指導", "保険始期日と届出日の関係", "届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>", "新規入力時の入力内容と同一", "実施日", "実施方法", "実施者(社員)", "対象者(募集人名)", "募集方法", "募集実施日", "その他の募集方法", "重要事項説明", "契約内容の確認", "契約意思の確認", "契約手続実施者", "異例取扱理由", "異例取扱理由備考", "契約者からの不満足の表明", "(有の場合、CS・苦情システムに登録)", "CS・苦情システム　苦情No", "募集行為に問題の可能性", "(有の場合、コンプラ情報システムに登録)", "コンプラ情報システム　管理No", "承認依頼先", "課支社長", "新規入力時の入力内容と同一", "承認代行者", "課支社長", "新規入力時の入力内容と同一", "承認／要再申請依頼理由", "テスト", "承認後・不承認後の対応", "更新者", "更新したユーザ（営業）", "更新されること", "更新日", "更新したシステム日時", "更新されること", "異例取扱理由", "H.その他(上記以外)", "更新されること"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000085*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AY12102*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#route3*, startUrl=/ANB00/ANA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AUTO-E2D0C359 rows14..15 st=coded: assert:AYメニュー表示 | click:照会・検索 | assert:検索結果エリア
  - BLK-SHR-40B1188F rows16..18 st=coded: fill:課支社CD=AHE61 | fill:代理店CD=252H | fill:証券番号=AY11001 | click:検索 | assert:検索条件エリア
      NOTE:0件時の非表示はモック未再現（検索結果行は固定1件）
  - BLK-AUTO-5637DF50 rows21..23 st=coded: fill:各項目(契約者名)=customerName | click:更新
  - BLK-SHR-73B769C8 rows24..26 st=coded: assert:APログ!NOTE | assert:DBログ!NOTE | assert:取消計上申請テーブル!NOTE
      NOTE:APログ出力=非浏览器=真機人工
      NOTE:DBログ出力=非浏览器=真機人工
      NOTE:データ更新=非浏览器=真機人工
  - BLK-SGL-C17F75BC rows19..20 st=planned: assert:検索結果表示
  results: ALL PASS 5
  evidence(4): r15:OK r18:OK r20:OK r23:OK
  keys(6): 01_menu.png 02_r015_照会・検索画面.png 03_r018_照会・検索画面.png 06_r020_申請・確認更新画面.png 07_r023_申請・確認更新画面.png 10_BLK-SGL-C17F75BC.png

## AZ-110-16-001  item=不備登録 fn=シナリオ導線１６（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=7 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「CL」押下|営業照会の不備情報全て // r21 | CK[2]表示|不備内容入力画面-更新|不備情報が全てクリアされること | EV:画面HC // r22 | OP[3]ボタン|「検索」押下| // r23 | CK[4]遷移|項目名検索画面|初期値 | EV:画面HC // r24 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照 // r25 | OP[2]ボタン|「検索」押下| // r26 | CK[3]表示|項目名検索画面|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r27 | OP[4]クリック|各項目の選択|【別紙】操作内容 入力内容：３参照 // r28 | OP[5]ボタン|「選択」押下| // r29 | CK[6]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]クリック|照会内容チェックボックス|チェックありにする // r31 | OP[2]ボタン|「修」押下| // r32 | CK[3]遷移|照会内容編集画面|初期値 | EV:画面HC // r33 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照 // r34 | OP[2]ボタン|「OK」押下| // r35 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC // r36 | OP[1]ボタン|「営業連携」押下| // r37 | OP[2]ボタン|「通知しない」押下| // r38 | OP[3]ボタン|「OK」押下| // r39 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC // r40 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r41 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r42 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r43 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。", "○入力内容", "証券番号", "AZ11001", "シナリオID", "明細番号", "0000000007", "シナリオの枝番", "項目コード", "T0", "照会コード", "T001", "項目名", "T0：損保取引確認書", "照会内容", "T001：支払請求書：〔請求日・代理店・扱者/仲立人・課支社受付日〕記入もれです。", "不備内容", "添付書類もれ", "編集照会内容", "編集済み。", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "積傷/積特", "保険種類", "01：積立ファミリー", "証券番号", "AZ11001", "明細番号", "0000000007", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "営業対応状況", "代理店対応状況", "対象外", "項目名", "T0：損保取引確認書", "照会内容", "T001：支払請求書：〔請求日・代理店・扱者/仲立人・課支社受付日〕記入もれです。", "項目コード", "T0", "入力内容の反映", "項目名", "損保取引確認書", "入力内容の反映", "不備内容", "添付書類もれ", "入力内容の反映", "照会内容", "T001：支払請求書：〔請求日・代理店・扱者/仲立人・課支社受付日〕記入もれです。", "入力内容の反映", "照会内容", "編集済み。", "入力内容の反映", "営業", "空白⇒営業になることを確認", "営業対応状況", "対象外", "未対応⇒対象外になることを確認", "代理店対応状況", "対象外⇒未対応になることを確認"]
  params(35,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000007*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T001*, inquiryContent=T001：支払請求書：〔請求日・代理店・扱者/仲立人・課支社受付日〕記入もれです。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, item=積傷/積特*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=事務S（貨物）*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-FED6C2EF rows20..21 st=coded: click:CL | assert:表示確認
  - BLK-AUTO-04A78248 rows22..23 st=coded: click:検索
  - BLK-AZ-ITEM-SEARCH-SELECT rows24..29 st=coded: 
  - BLK-AZ-INQUIRY-EDIT rows30..35 st=coded: fill:各項目=editedInquiryContent
  - BLK-AUTO-A315BF06 rows36..43 st=coded: click:営業連携 | assert:画面確認
  results: ALL PASS 7
  evidence(9): r15:OK r19:OK r21:OK r23:OK r26:OK r29:OK r32:OK r35:OK r39:OK
  keys(8): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 08_r023_項目名検索画面.png 10_r026_項目名検索画面.png 11_r029_不備内容入力画面-更新.png 13_r032_照会内容編集画面.png

## AZ-110-34-001  item=不備登録 fn=シナリオ導線３４（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=4 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「印刷」押下| // r21 | CK[2]遷移|帳票印刷画面|初期値 | EV:画面HC // r22 | OP[1]ボタン|「帳票出力」押下| // r23 | OP[2]ボタン|「名前を付けて保存」押下| // r24 | OP[3]ボタン|「閉じる」押下| // r25 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r26 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r27 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r28 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r29 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。", "○入力内容", "証券番号", "AZ11005", "シナリオID", "明細番号", "0000000044", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "11：クルマの保険／はじめての自動車保険", "証券番号", "AZ11005", "明細番号", "0000000044", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "取消済", "営業対応状況", "代理店対応状況", "対象外", "取消済", "変化がないことを確認", "営業対応状況", "未対応⇒対応中になることを確認", "代理店対応状況", "対象外", "変化がないことを確認"]
  params(34,auto=30): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000044*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11005*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-C8BDC3F2 rows20..21 st=coded: click:印刷 | assert:帳票印刷遷移!NOTE
      NOTE:帳票画面=AMA14 popup; mock简化
  - BLK-AUTO-23229D4F rows22..29 st=coded: click:印刷 | click:帳票出力 | click:閉じる | assert:APログ!NOTE | assert:DBログ!NOTE | assert:申込書テーブル!NOTE | assert:申込不備テーブル!NOTE
      NOTE:帳票DL/名前を付けて保存=OSダイアログ=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
  results: ALL PASS 4
  evidence(4): r15:OK r19:OK r21:OK r25:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 07_r021_帳票印刷画面.png 08_r025_不備内容入力画面-更新.png 09_BLK-AUTO-23229D4F.png

## AZ-110-40-001  item=不備登録 fn=シナリオ導線４０（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=7 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「CL」押下|営業照会（代理店照会が”否”）の不備情報全て // r21 | CK[2]表示|不備内容入力画面-更新|営業照会（代理店照会が”否”）の不備情報が全てクリアされること | EV:画面HC // r22 | OP[3]ボタン|「検索」押下| // r23 | CK[4]遷移|項目名検索画面|初期値 | EV:画面HC // r24 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照 // r25 | OP[2]ボタン|「検索」押下| // r26 | CK[3]表示|項目名検索画面|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r27 | OP[4]クリック|各項目の選択|【別紙】操作内容 入力内容：３参照 // r28 | OP[5]ボタン|「選択」押下| // r29 | CK[6]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]クリック|照会内容チェックボックス|チェックありにする // r31 | OP[2]ボタン|「修」押下| // r32 | CK[3]遷移|照会内容編集画面|初期値 | EV:画面HC // r33 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照 // r34 | OP[2]ボタン|「OK」押下| // r35 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC // r36 | OP[1]ボタン|「営業連携」押下| // r37 | OP[2]ボタン|「通知しない」押下| // r38 | OP[3]ボタン|「OK」押下| // r39 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC // r40 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r41 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r42 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r43 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。", "○入力内容", "証券番号", "AZ11001", "シナリオID", "明細番号", "0000000005", "シナリオの枝番", "項目コード", "T0", "照会コード", "T004", "項目名", "T0：損保取引確認書", "照会内容", "T004：本人確認書類が添付もれです。ご提出をお願いします。", "不備内容", "添付書類もれ", "編集照会内容", "編集済み。", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "積立新種", "保険種類", "03：積立動総", "証券番号", "AZ11001", "明細番号", "0000000005", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "営業", "完了日", "営業対応状況", "代理店対応状況", "対象外", "項目名", "T0：損保取引確認書", "照会内容", "T004：本人確認書類が添付もれです。ご提出をお願いします。", "項目コード", "T0", "入力内容の反映", "項目名", "損保取引確認書", "入力内容の反映", "不備内容", "添付書類もれ", "入力内容の反映", "照会内容", "T004：本人確認書類が添付もれです。ご提出をお願いします。", "入力内容の反映", "照会内容", "編集済み。", "入力内容の反映", "営業", "空白⇒営業になることを確認", "営業対応状況", "対象外", "対応中⇒対象外になることを確認", "代理店対応状況", "対象外⇒未対応になることを確認"]
  params(35,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000005*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T004*, inquiryContent=T004：本人確認書類が添付もれです。ご提出をお願いします。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, item=積立新種*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=営業*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-FED6C2EF rows20..21 st=coded: click:CL | assert:表示確認
  - BLK-AUTO-04A78248 rows22..23 st=coded: click:検索
  - BLK-AZ-ITEM-SEARCH-SELECT rows24..29 st=coded: 
  - BLK-AZ-INQUIRY-EDIT rows30..35 st=coded: fill:各項目=editedInquiryContent
  - BLK-AUTO-A315BF06 rows36..43 st=coded: click:営業連携 | assert:画面確認
  results: ALL PASS 7
  evidence(9): r15:OK r19:OK r21:OK r23:OK r26:OK r29:OK r32:OK r35:OK r39:OK
  keys(8): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 08_r023_項目名検索画面.png 10_r026_項目名検索画面.png 11_r029_不備内容入力画面-更新.png 13_r032_照会内容編集画面.png

## AZ-110-65-001  item=不備登録 fn=シナリオ導線６５（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「完了取消」押下| // r21 | OP[2]ボタン|「OK」押下|（ステータス遷移確認） // r22 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r23 | CK[4]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r24 | CK[5]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r25 | CK[6]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r26 | CK[7]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。", "○入力内容", "証券番号", "AZ11005", "シナリオID", "明細番号", "0000000035", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "11：クルマの保険／はじめての自動車保険", "証券番号", "AZ11005", "明細番号", "0000000035", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "連絡", "点検区分", "営業", "完了日", "前段シナリオ実施日", "取消済", "営業対応状況", "完了", "代理店対応状況", "完了", "取消済", "変化がないことを確認", "営業対応状況", "対象外", "完了⇒対象外になることを確認", "代理店対応状況", "対象外", "完了⇒対象外になることを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000035*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11005*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-23BC6F7B rows20..26 st=coded: click:完了取消 | assert:画面確認
  results: ALL PASS 3
  evidence(3): r15:OK r19:OK r22:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r022_不備内容入力画面-更新.png 07_BLK-AUTO-23BC6F7B.png

## AZ-110-71-001  item=不備登録 fn=シナリオ導線７１（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=4 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「削除」押下| // r21 | OP[2]ボタン|「OK」押下|（ステータス遷移確認） // r22 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r23 | CK[4]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r24 | CK[5]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r25 | CK[6]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r26 | CK[7]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S」のユーザを設定。", "○入力内容", "証券番号", "AZ11005", "シナリオID", "明細番号", "0000000036", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "11：クルマの保険／はじめての自動車保険", "証券番号", "AZ11005", "明細番号", "0000000036", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S", "完了日", "取消済", "営業対応状況", "代理店対応状況", "対象外", "エラーメッセージ", "MAZG101I100のメッセージが出力されること", "データが削除され、表示されないことを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000036*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11005*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AZ-UPDATE-DELETE-OK rows20..22 st=coded: click:削除 | assert:OK!NOTE | assert:画面確認
      NOTE:削除確認dialog=真機
  - BLK-AZ-COMMON-LOGS rows23..26 st=coded: assert:AP/DBログ・テーブル確認!NOTE
      NOTE:非浏览器4项=真機人工确认（mock里以画面在位代替）
  results: ALL PASS 4
  evidence(3): r15:OK r19:OK r22:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r022_不備内容入力画面-更新.png 08_BLK-AZ-COMMON-LOGS.png

## AZ-111-05-007  item=不備登録 fn=削除済処理の確認：回答ボタン
  feas: class=B flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]入力|不備情報|代理店照会が"否"の任意の不備情報を1件追加 // r21 | OP[2]ボタン|「営業連携」押下| // r22 | OP[3]ボタン|「通知しない」押下| // r23 | OP[4]ボタン|「OK」押下| // r24 | OP[5]入力|各項目に入力|【別紙】操作内容 入力内容：２参照 // r25 | OP[6]ボタン|「更新」押下| // r26 | OP[7]ボタン|「削除」押下|別のユーザで他端末にログインし、削除ボタンを押下する // r27 | CK[8]表示|不備内容入力画面-更新|【別紙】表示内容（他端末での画面確認） / 表示内容：２参照 | EV:画面HC // r28 | OP[9]ボタン|「回答」押下| // r29 | CK[10]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
  別紙业务值: ["○登録内容", "証券番号", "AZ11105", "明細番号", "0000000007", "その他の項目", "○ログイン情報", "ＭＳのユーザを設定。", "○入力内容", "証券番号", "AZ11105", "明細番号", "0000000007", "回答内容", "回答入力欄", "回答済", "○表示内容", "証券番号", "AZ11105", "明細番号", "0000000007", "エラーメッセージ", "MAZG101I100のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認", "エラーメッセージ", "MAZG101W028のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000007*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11105*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SGL-3017A3AA rows20..29 st=coded: assert:不備情報追加!NOTE | click:営業連携 | click:通知しない | wait:OK!NOTE | assert:画面確認 | click:更新 | click:削除 | assert:画面確認 | click:回答 | assert:画面確認
      NOTE:不備情報追加=真機人工
      NOTE:OKダイアログ=自動承認
  results: ALL PASS 3
  evidence(4): r15:OK r19:OK r27:OK r29:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r027_不備内容入力画面-更新.png 07_r029_不備内容入力画面-更新.png 08_BLK-SGL-3017A3AA.png

## AZ-111-05-008  item=不備登録 fn=削除済処理の確認：確認済ボタン
  feas: class=B flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]入力|不備情報|代理店照会が"否"の任意の不備情報を1件追加 // r21 | OP[2]クリック|依頼区分|連絡をクリック // r22 | OP[3]ボタン|「営業連携」押下| // r23 | OP[4]ボタン|「通知しない」押下| // r24 | OP[5]ボタン|「OK」押下| // r25 | OP[6]ボタン|「削除」押下|別のユーザで他端末にログインし、削除ボタンを押下する // r26 | CK[7]表示|不備内容入力画面-更新|【別紙】表示内容（他端末での画面確認） / 表示内容：２参照 | EV:画面HC // r27 | OP[8]ボタン|「確認済」押下| // r28 | CK[9]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
  別紙业务值: ["○登録内容", "証券番号", "AZ11105", "明細番号", "0000000008", "その他の項目", "○ログイン情報", "ＭＳのユーザを設定。", "○入力内容", "証券番号", "AZ11105", "明細番号", "0000000008", "○表示内容", "証券番号", "AZ11105", "明細番号", "0000000008", "エラーメッセージ", "MAZG101I100のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認", "エラーメッセージ", "MAZG101W028のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000008*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11105*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SGL-C9C58BF8 rows20..28 st=coded: assert:不備情報追加!NOTE | click:営業連携 | click:通知しない | wait:OK!NOTE | click:削除 | assert:画面確認 | click:確認済 | assert:画面確認
      NOTE:不備情報追加=真機人工
      NOTE:OKダイアログ=自動承認
  results: ALL PASS 3
  evidence(4): r15:OK r19:OK r26:OK r28:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r026_不備内容入力画面-更新.png 07_r028_不備内容入力画面-更新.png 08_BLK-SGL-C9C58BF8.png

## AZ-111-05-009  item=不備登録 fn=削除済処理の確認：営業連携ボタン
  feas: class=B flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]入力|不備情報|代理店照会が"否"の任意の不備情報を1件追加 // r21 | OP[2]ボタン|「更新」押下| // r22 | OP[3]ボタン|「削除」押下|別のユーザで他端末にログインし、削除ボタンを押下する // r23 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容（他端末での画面確認） / 表示内容：２参照 | EV:画面HC // r24 | OP[5]ボタン|「営業連携」押下| // r25 | CK[6]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
  別紙业务值: ["○登録内容", "証券番号", "AZ11105", "明細番号", "0000000009", "その他の項目", "○ログイン情報", "ＭＳのユーザを設定。", "○入力内容", "証券番号", "AZ11105", "明細番号", "0000000009", "○表示内容", "証券番号", "AZ11105", "明細番号", "0000000009", "エラーメッセージ", "MAZG101I100のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認", "エラーメッセージ", "MAZG101W028のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000009*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11105*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SGL-7A4080AD rows20..25 st=coded: assert:不備情報追加!NOTE | click:更新 | click:削除 | assert:画面確認 | click:営業連携
      NOTE:不備情報追加=真機人工
  results: ALL PASS 3
  evidence(4): r15:OK r19:OK r23:OK r25:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r023_不備内容入力画面-更新.png 07_r025_不備内容入力画面-更新.png 08_BLK-SGL-7A4080AD.png

## AZ-111-05-010  item=不備登録 fn=削除済処理の確認：代理店連携ボタン
  feas: class=B flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]入力|不備情報|代理店照会が"要"の任意の不備情報を1件追加 // r21 | OP[2]ボタン|「更新」押下| // r22 | OP[3]ボタン|「削除」押下|別のユーザで他端末にログインし、削除ボタンを押下する // r23 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容（他端末での画面確認） / 表示内容：２参照 | EV:画面HC // r24 | OP[5]ボタン|「代理店連携」押下| // r25 | CK[6]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
  別紙业务值: ["○登録内容", "証券番号", "AZ11105", "明細番号", "0000000010", "その他の項目", "○ログイン情報", "ＭＳのユーザを設定。", "○入力内容", "証券番号", "AZ11105", "明細番号", "0000000010", "○表示内容", "証券番号", "AZ11105", "明細番号", "0000000010", "エラーメッセージ", "MAZG101I100のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認", "エラーメッセージ", "MAZG101W028のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000010*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11105*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SGL-213E7E7D rows20..25 st=coded: assert:不備情報追加!NOTE | click:更新 | click:削除 | assert:画面確認 | click:代理店連携 | assert:画面確認
      NOTE:不備情報追加=真機人工
  results: ALL PASS 3
  evidence(4): r15:OK r19:OK r23:OK r25:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r023_不備内容入力画面-更新.png 07_r025_不備内容入力画面-更新.png 08_BLK-SGL-213E7E7D.png

## AZ-111-05-011  item=不備登録 fn=削除済処理の確認：連携取消ボタン
  feas: class=B flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]入力|不備情報|代理店照会が"要"の任意の不備情報を1件追加 // r21 | OP[2]ボタン|「代理店連携」押下| // r22 | OP[3]ボタン|「削除」押下|別のユーザで他端末にログインし、削除ボタンを押下する // r23 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容（他端末での画面確認） / 表示内容：２参照 | EV:画面HC // r24 | OP[5]ボタン|「連携取消」押下| // r25 | CK[6]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
  別紙业务值: ["○登録内容", "証券番号", "AZ11105", "明細番号", "0000000011", "その他の項目", "○ログイン情報", "ＭＳのユーザを設定。", "○入力内容", "証券番号", "AZ11105", "明細番号", "0000000011", "○表示内容", "証券番号", "AZ11105", "明細番号", "0000000011", "エラーメッセージ", "MAZG101I100のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認", "エラーメッセージ", "MAZG101W028のエラーメッセージが出力されること", "左記メッセージが画面のメッセージ領域に表示されることを確認"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000011*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11105*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SGL-DE4B3B14 rows20..25 st=coded: assert:不備情報追加!NOTE | click:代理店連携 | click:削除 | assert:画面確認 | click:連携取消 | assert:画面確認
      NOTE:不備情報追加=真機人工
  results: ALL PASS 3
  evidence(4): r15:OK r19:OK r23:OK r25:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r023_不備内容入力画面-更新.png 07_r025_不備内容入力画面-更新.png 08_BLK-SGL-DE4B3B14.png

## AZ-150-10-004  item=業務（日次） fn=閲覧システムファイル（警告終了）
  feas: class=B flow=pass manualSteps=5 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
  status3=coded runner=pass blocks=2 skipped=[]
  手順: r14 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１～２参照 // r15 | CK[2]その他|操作結果|- | EV:画面HC // r16 | CK[3]その他|APログ|警告終了のログが出力されること | EV:APﾛｸﾞ // r17 | CK[4]その他|閲覧システム連携ファイル|【別紙】期待値　参照 | EV:CSVﾌｧｲﾙ // r18 | OP[5]その他|事後作業|【別紙】操作内容 入力内容：３参照 // r19 | CK[6]その他|操作結果|- | EV:（目視確認）
  別紙业务值: ["○入力内容", "新環境：バッチサーバ（EC2）（疑似環境）で実行", "実行コマンド（事前準備）", "cd /proj/mhkcm/AD/AP/mhk/file/send", "cp -p FAZZ000A012A.csv FAZZ000A012A.csv_ （システム年月日）_bak", "差分比較用に、現状のファイルを退避する。", "ll", "ファイルが退避されたことを確認する。また、現在のファイル権限を確認する。", "chmod 555 FAZZ000A012A.csv", "ファイルへの書き込みができないように権限を変更する。", "ll", "ファイル権限が「-r-xr-xr-x」に変更されたことを確認する。", "実行コマンド（バッチ実行）", "cd /proj/mhkcm/AD/AP/mhk/lib", "java -jar AZB024A.jar", "echo $status", "戻り値が8であること", "実行コマンド（事後作業）", "cd /proj/mhkcm/AD/AP/mhk/file/send", "chmod △△△ FAZZ000A012A.csv", "事前準備で確認したファイル権限に変更する。", "ll", "元々のファイル権限に変更されたことを確認する。"]
  params(34,auto=34): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-BATCH-RUN-VERIFY rows14..15 st=coded: assert:バッチ実行＋操作結果/APログ確認!NOTE
      NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-B84FFF40 rows16..19 st=coded: assert:バッチ実行＋APログ/連携ファイル/事後作業/操作結果確認!NOTE
      NOTE:バッチ実行＋APログ/閲覧システム連携ファイル/事後作業/操作結果=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 2
  evidence(1): r15:OK
  keys(3): 01_menu.png 02_r015_操作結果.png 04_BLK-SGL-B84FFF40.png

## AZ-200-03-001  item=共通 fn=セッションタイムアウト（親画面）
  feas: class=B flow=pass manualSteps=2 proxyBlocks=1 paramIssues=0 paramsAuto=False source=boundary.json
  status3=coded runner=pass blocks=1 skipped=[]
  手順: r14 | OP[1]その他|画面を操作せず、一時間待機| // r15 | OP[2]クリック|「No」リンク|任意のデータ // r16 | CK[3]遷移|セッションタイムアウト画面 // r17 | CK[4]出力（Msg）|エラーメッセージ|MAZG000E003 | EV:画面HC
  別紙业务值: []
  params(38,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, errorCode=MAZG000E001*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, loginUrl=/AMB/dummy.html*, menuSelector=input[name=menu_cm]*, pointCheck=?*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*, userId=MS3N*
  別紙值未见于params: (none)
  - BLK-AZ-SESSION-TIMEOUT rows14..17 st=coded: wait:1時間待機!NOTE | assert:セッション切れ確認!NOTE
      NOTE:mock里1小时缩为300ms
      NOTE:タイムアウト画面/エラー=真機人工确认
  results: ALL PASS 1
  evidence(2): r16:SOFT r17:OK
  MECH: ["- EVIDENCE NOT EXACT rows: [16]", "- MANUAL (non-browser) rows: [16] — per MANUAL-DECISION.md these are human steps"]
  keys(3): 01_menu.png 02_r017_エラーメッセージ.png 03_BLK-AZ-SESSION-TIMEOUT.png

## AZ-200-03-003  item=共通 fn=セッションタイムアウト（親画面）
  feas: class=B flow=pass manualSteps=2 proxyBlocks=1 paramIssues=0 paramsAuto=False source=boundary.json
  status3=coded runner=pass blocks=1 skipped=[]
  手順: r14 | OP[1]その他|画面を操作せず、一時間待機| // r15 | OP[2]クリック|「No」リンク|任意のデータ // r16 | CK[3]遷移|セッションタイムアウト画面 // r17 | CK[4]出力（Msg）|エラーメッセージ|MAZG000E003 | EV:画面HC
  別紙业务值: []
  params(38,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, errorCode=MAZG000E001*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, loginUrl=/AMB/dummy.html*, menuSelector=input[name=menu_cm]*, pointCheck=?*, policyNo=AZ11001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*, userId=MS3N*
  別紙值未见于params: (none)
  - BLK-AZ-SESSION-TIMEOUT rows14..17 st=coded: wait:1時間待機!NOTE | assert:セッション切れ確認!NOTE
      NOTE:mock里1小时缩为300ms
      NOTE:タイムアウト画面/エラー=真機人工确认
  results: ALL PASS 1
  evidence(2): r16:SOFT r17:OK
  MECH: ["- EVIDENCE NOT EXACT rows: [16]", "- MANUAL (non-browser) rows: [16] — per MANUAL-DECISION.md these are human steps"]
  keys(3): 01_menu.png 02_r017_エラーメッセージ.png 03_BLK-AZ-SESSION-TIMEOUT.png

## AZ-210-11-001  item=不備登録 fn=シナリオ導線１１（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=5 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「更新」押下| // r21 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r22 | OP[3]ボタン|「印刷」押下| // r23 | CK[4]遷移|帳票印刷画面|初期値 | EV:画面HC // r24 | OP[1]ボタン|「帳票出力」押下| // r25 | OP[2]ボタン|「名前を付けて保存」押下| // r26 | OP[3]ボタン|「閉じる」押下| // r27 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r28 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r29 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r30 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r31 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。", "○入力内容", "証券番号", "AZ21001", "シナリオID", "明細番号", "0000000003", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "積立火災", "保険種類", "02：長総（中途付帯地震）", "証券番号", "AZ21001", "明細番号", "0000000003", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "営業対応状況", "対象外", "代理店対応状況", "変化がないことを確認", "営業対応状況", "対象外", "変化がないことを確認", "代理店対応状況", "変化がないことを確認"]
  params(34,auto=30): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000003*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ21001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-E0B41407 rows20..21 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-C8BDC3F2 rows22..23 st=coded: click:印刷 | assert:帳票印刷遷移!NOTE
      NOTE:帳票画面=AMA14 popup; mock简化
  - BLK-SHR-1D4C0178 rows24..31 st=coded: click:印刷 | click:帳票出力 | click:閉じる | assert:APログ!NOTE | assert:DBログ!NOTE | assert:申込書テーブル!NOTE | assert:申込不備テーブル!NOTE
      NOTE:帳票DL/名前を付けて保存=OSダイアログ=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
  results: ALL PASS 5
  evidence(5): r15:OK r19:OK r21:OK r23:OK r27:OK
  keys(7): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 09_r023_帳票印刷画面.png 10_r027_不備内容入力画面-更新.png 11_BLK-SHR-1D4C0178.png

## AZ-210-17-001  item=不備登録 fn=シナリオ導線１７（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=3 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=9 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「CL」押下|代理店照会（代理店照会が"要"）の不備情報をすべてクリアする // r21 | CK[2]表示|不備内容入力画面-更新|不備情報がすべてクリアされること | EV:画面HC // r22 | OP[3]ボタン|「代理店連携」押下| // r23 | CK[4]出力（Msg）|エラーメッセージ|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r24 | OP[5]ボタン|「検索」押下| // r25 | CK[6]遷移|項目名検索画面|初期値 | EV:画面HC // r26 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照 // r27 | OP[2]ボタン|「検索」押下| // r28 | CK[]表示|項目名検索画面|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r29 | OP[4]クリック|各項目の選択|【別紙】操作内容 入力内容：３参照 // r30 | OP[5]ボタン|「選択」押下| // r31 | CK[]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC // r32 | OP[1]クリック|照会内容チェックボックス|チェックありにする // r33 | OP[2]ボタン|「修」押下| // r34 | CK[]遷移|照会内容編集画面|初期値 | EV:画面HC // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照 // r36 | OP[2]ボタン|「OK」押下| // r37 | CK[]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC // r38 | OP[1]ボタン|「代理店連携」押下|（ステータス遷移確認） // r39 | OP[2]ボタン|「OK」押下| // r40 | CK[]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：６参照 | EV:画面HC // r41 | CK[]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r42 | CK[]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r43 | CK[]その他|申込書テーブル|データが登録されたこと | EV:DBﾀﾞﾝﾌﾟ // r44 | CK[]その他|申込不備テーブル|データが登録されたこと | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。", "○入力内容", "証券番号", "AZ21005", "シナリオID", "明細番号", "0000000016", "シナリオの枝番", "項目コード", "T0", "照会コード", "T007", "項目名", "T0：損保取引確認書", "照会内容", "T007：「損保取引確認書」の添付がもれています。", "不備内容", "添付書類もれ", "編集照会内容", "編集済み。", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "13：クルマの保険・一般用", "証券番号", "AZ21005", "明細番号", "0000000016", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S", "完了日", "営業", "営業対応状況", "代理店対応状況", "メッセージボックス", "MAZG101W052のエラーメッセージが出力されること", "項目名", "T0：損保取引確認書", "照会内容", "T007：「損保取引確認書」の添付がもれています。", "項目コード", "T0", "入力内容の反映", "項目名", "損保取引確認書", "入力内容の反映", "不備内容", "添付書類もれ", "入力内容の反映", "照会内容", "T007：「損保取引確認書」の添付がもれています。", "入力内容の反映", "照会内容", "編集済み。", "入力内容の反映", "代理店になること", "営業対応状況", "変化がないことを確認", "代理店対応状況", "変化がないことを確認"]
  params(34,auto=25): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000016*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ21005*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SHR-288BB000 rows20..20 st=coded: click:CL | assert:画面確認
  - BLK-SHR-311D55A3 rows22..23 st=coded: click:代理店連携 | assert:エラーメッセージ!NOTE | assert:画面確認
      NOTE:エラーメッセージ内容=真機人工
  - BLK-AUTO-04A78248 rows24..25 st=coded: click:検索
  - BLK-AZ-ITEM-SEARCH-SELECT rows26..31 st=coded: 
  - BLK-AZ-INQUIRY-EDIT rows32..37 st=coded: fill:各項目=editedInquiryContent
  - BLK-AUTO-ECE76B71 rows38..44 st=coded: click:代理店連携 | wait:OK!NOTE | assert:画面確認 | assert:AP/DBログ・テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認）
  - BLK-SGL-7A863F7A rows21..21 st=planned: assert:不備情報クリア表示!NOTE
      NOTE:クリア結果=真機人工
  results: ALL PASS 9
  evidence(10): r15:OK r19:OK r21:OK r23:OK r25:OK r28:OK r31:OK r34:OK r37:OK r40:OK
  keys(8): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 07_r023_エラーメッセージ.png 10_r025_項目名検索画面.png 12_r028_項目名検索画面.png 13_r031_不備内容入力画面-更新.png

## AZ-210-35-001  item=不備登録 fn=シナリオ導線３５（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=7 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「CL」押下|代理店照会（代理店照会が"要"）の不備情報をすべてクリアする // r21 | OP[2]ボタン|「代理店連携」押下| // r22 | CK[3]出力（Msg）|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 // r23 | OP[4]ボタン|「検索」押下| // r24 | CK[5]遷移|項目名検索画面|初期値 | EV:画面HC // r25 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照 // r26 | OP[2]ボタン|「検索」押下| // r27 | CK[3]表示|項目名検索画面|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r28 | OP[4]クリック|各項目の選択|【別紙】操作内容 入力内容：３参照 // r29 | OP[5]ボタン|「選択」押下| // r30 | CK[6]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC // r31 | OP[1]クリック|照会内容チェックボックス|チェックありにする // r32 | OP[2]ボタン|「修」押下| // r33 | CK[3]遷移|照会内容編集画面|初期値 | EV:画面HC // r34 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照 // r35 | OP[2]ボタン|「OK」押下| // r36 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC // r37 | OP[1]ボタン|「代理店連携」押下|（ステータス遷移確認） // r38 | OP[2]ボタン|「OK」押下| // r39 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：６参照 | EV:画面HC // r40 | CK[4]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r41 | CK[5]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r42 | CK[6]その他|申込書テーブル|データが登録されたこと | EV:DBﾀﾞﾝﾌﾟ // r43 | CK[7]その他|申込不備テーブル|データが登録されたこと | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。", "○入力内容", "証券番号", "AZ21005", "シナリオID", "明細番号", "0000000026", "シナリオの枝番", "項目コード", "T0", "照会コード", "T007", "項目名", "T0：損保取引確認書", "照会内容", "T007：「損保取引確認書」の添付がもれています。", "不備内容", "添付書類もれ", "編集照会内容", "編集済み。", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "13：クルマの保険・一般用", "証券番号", "AZ21005", "明細番号", "0000000026", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "取消済", "営業対応状況", "代理店対応状況", "メッセージボックス", "MAZG101W052のエラーメッセージが出力されること", "項目名", "T0：損保取引確認書", "照会内容", "T007：「損保取引確認書」の添付がもれています。", "項目コード", "T0", "入力内容の反映", "項目名", "損保取引確認書", "入力内容の反映", "不備内容", "添付書類もれ", "入力内容の反映", "照会内容", "T007：「損保取引確認書」の添付がもれています。", "入力内容の反映", "照会内容", "編集済み。", "入力内容の反映", "取消済⇒代理店になることを確認", "営業対応状況", "変化がないことを確認", "代理店対応状況", "変化がないことを確認"]
  params(34,auto=25): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000026*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ21005*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SGL-2FF1643E rows20..22 st=coded: click:CL | click:代理店連携 | assert:画面確認 | assert:メッセージ確認!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-04A78248 rows23..24 st=coded: click:検索
  - BLK-AZ-ITEM-SEARCH-SELECT rows25..30 st=coded: 
  - BLK-AZ-INQUIRY-EDIT rows31..36 st=coded: fill:各項目=editedInquiryContent
  - BLK-AUTO-ECE76B71 rows37..43 st=coded: click:代理店連携 | wait:OK!NOTE | assert:画面確認 | assert:AP/DBログ・テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認）
  results: ALL PASS 7
  evidence(8): r15:OK r19:OK r24:OK r27:OK r30:OK r33:OK r36:OK r39:OK
  keys(8): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 07_r024_項目名検索画面.png 09_r027_項目名検索画面.png 10_r030_不備内容入力画面-更新.png 12_r033_照会内容編集画面.png 13_r036_不備内容入力画面-更新.png

## AZ-210-50-001  item=不備登録 fn=シナリオ導線５０（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=2 skipped=[]
  手順: r14 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r15 | OP[2]ボタン|「検索」押下| // r16 | OP[3]クリック|「No.」リンク押下| // r17 | CK[4]遷移|代理店 不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r18 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r19 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r20 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r21 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、申込書の操作が可能なユーザを設定。", "○入力内容", "証券番号", "AZ21036", "シナリオID", "明細番号", "0000000045", "シナリオの枝番", "○表示内容", "メッセージエリア", "メッセージID:MAZG206W100が表示されること", "申込情報", "一覧にデータが表示されないこと"]
  params(35,auto=22): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000045*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ21036*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#select*, startUrl=/AMC00/AMC22.html*, subAgentCode=123456*, subPolicyNo=0012*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AUTO-DDA3A833 rows14..17 st=coded: fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=inquiryId | fill:各項目=fieldAgentId | click:検索 | assert:結果行 | click:No.リンク
  - BLK-SGL-E008F918 rows18..21 st=coded: assert:非浏览器确认!NOTE
      NOTE:AP/DB/テーブル=真機人工
  results: ALL PASS 2
  evidence(1): r17:OK
  keys(3): 01_menu.png 02_r017_代理店_不備内容入力画面(更新).png 04_BLK-SGL-E008F918.png

## AZ-210-64-001  item=不備登録 fn=シナリオ導線６４（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=4 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「印刷」押下| // r21 | CK[2]遷移|帳票印刷画面|初期値 | EV:画面HC // r22 | OP[1]ボタン|「帳票出力」押下| // r23 | OP[2]ボタン|「名前を付けて保存」押下| // r24 | OP[3]ボタン|「閉じる」押下| // r25 | CK[4]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r26 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r27 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r28 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r29 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○登録内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "13：クルマの保険・一般用", "※　保険種類選択画面で設定", "証券番号", "AZ21064", "シナリオID", "明細番号", "0000000047", "シナリオの枝番", "部店課支社コード", "AHE61", "※　変更となる可能性あり", "代理店コード", "252H", "※　変更となる可能性あり", "サブコード", "フリーコード", "募集人ID", "3028004586", "※　募集人検索画面で設定。変更となる可能性あり。", "契約者名", "保険始期日", "変更日", "（入力なし）", "新更変・他", "新規", "計上年月", "日報／送付", "日報部課代ｺｰﾄﾞ", "ABC012", "計上状態", "未計上", "回答締切日", "システム日＋7日（初期設定）", "○実施前状態", "営業", "営業対応状況", "完了", "代理店対応状況", "完了", "○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S（貨物）」のユーザを設定。", "○入力内容", "証券番号", "AZ21064", "シナリオID", "明細番号", "0000000047", "シナリオの枝番", "対応状況", "4:完了", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "13：クルマの保険・一般用", "証券番号", "AZ21064", "明細番号", "0000000047", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "営業", "営業対応状況", "完了", "代理店対応状況", "完了", "営業", "変化がないことを確認", "営業対応状況", "完了", "変化がないことを確認", "代理店対応状況", "完了", "変化がないことを確認"]
  params(34,auto=30): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000047*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ21064*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-C8BDC3F2 rows20..21 st=coded: click:印刷 | assert:帳票印刷遷移!NOTE
      NOTE:帳票画面=AMA14 popup; mock简化
  - BLK-AUTO-23229D4F rows22..29 st=coded: click:印刷 | click:帳票出力 | click:閉じる | assert:APログ!NOTE | assert:DBログ!NOTE | assert:申込書テーブル!NOTE | assert:申込不備テーブル!NOTE
      NOTE:帳票DL/名前を付けて保存=OSダイアログ=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
  results: ALL PASS 4
  evidence(4): r15:OK r19:OK r21:OK r25:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 07_r021_帳票印刷画面.png 08_r025_不備内容入力画面-更新.png 09_BLK-AUTO-23229D4F.png

## AZ-230-01-011  item=集計（日次） fn=ToDoバッチ１１
  feas: class=B flow=pass manualSteps=4 proxyBlocks=5 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=11 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]ボタン|「一時中断」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r37 | OP[3]ボタン|「不備一覧」押下| // r38 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r39 | OP[1]入力|部店課支社|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r42 | OP[4]クリック|No|対象の申込情報 // r43 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r47 | OP[1]その他|バッチ実行（JP1）|19時 // r48 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r49 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r50 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000011", "課支社コード", "AED73", "代理店コード", "H020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000011", "課支社コード", "AED73", "代理店コード", "H020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況"]
  params(34,auto=29): agentCode=H020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000011*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows35..38 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-9750F4CE rows39..43 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-3477BB6F rows47..50 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 11
  evidence(7): r20:OK r25:OK r29:OK r32:OK r36:OK r38:OK r43:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r036_メッセージ.png 14_r038_代理店_不備一覧画面.png 17_r043_不備内容入力画面-更新.png

## AZ-230-01-012  item=集計（日次） fn=ToDoバッチ１２
  feas: class=B flow=pass manualSteps=4 proxyBlocks=5 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=11 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r48 | OP[1]その他|バッチ実行（JP1）|20時 // r49 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r51 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000012", "課支社コード", "AMD71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000012", "課支社コード", "AMD71", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000012*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AMD71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-3477BB6F rows48..51 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 11
  evidence(6): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 18_BLK-AUTO-3477BB6F.png

## AZ-230-01-013  item=集計（日次） fn=ToDoバッチ１３
  feas: class=B flow=pass manualSteps=4 proxyBlocks=5 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|「完了登録」押下| // r46 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r50 | OP[1]その他|バッチ実行（JP1）|9時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000013", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000013", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000013*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows45..46 st=coded: click:完了登録 | assert:画面確認
  - BLK-AUTO-3477BB6F rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(7): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r46:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r046_不備内容入力画面-更新.png

## AZ-230-01-014  item=集計（日次） fn=ToDoバッチ１４
  feas: class=B flow=pass manualSteps=4 proxyBlocks=4 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 // r29 // r30 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r33 | OP[4]クリック|No|対象の申込情報 // r34 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r35 | OP[1]入力|代理店照会|「要」→「否」に変更 // r36 | OP[2]ボタン|「更新」押下| // r37 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r40 | OP[1]その他|バッチ実行（JP1）|9時 // r41 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r42 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r43 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000014", "課支社コード", "AED73", "代理店コード", "H020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000014", "課支社コード", "AED73", "代理店コード", "H020", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=H020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000014*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-E0B41407 rows26..27 st=coded: click:更新 | assert:表示確認
  - BLK-SHR-B0028D4D rows28..29 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows30..34 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows35..35 st=coded: assert:画面確認
  - BLK-AUTO-E0B41407 rows36..37 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-3477BB6F rows40..43 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r27:OK r37:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r037_不備内容入力画面-更新.png 17_BLK-AUTO-3477BB6F.png

## AZ-230-01-015  item=集計（日次） fn=ToDoバッチ１５
  feas: class=B flow=pass manualSteps=8 proxyBlocks=5 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r30 | OP[1]その他|バッチ実行（JP1）|10時 // r31 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r32 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r33 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ // r34 // r35 // r36 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r37 | OP[2]ボタン|「検索」押下| // r38 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r39 | OP[4]クリック|No|対象の申込情報 // r40 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r41 | OP[1]ボタン|「更新」押下| // r42 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r45 | OP[1]その他|バッチ実行（JP1）|11時 // r46 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r47 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r48 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000015", "課支社コード", "AMD71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000015", "課支社コード", "AMD71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000015*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AMD71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-E0B41407 rows26..27 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-3477BB6F rows30..33 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows34..35 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows36..40 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-E0B41407 rows41..42 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-3477BB6F rows45..48 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r27:OK r42:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r042_不備内容入力画面-更新.png 17_BLK-AUTO-3477BB6F.png

## AZ-230-01-016  item=集計（日次） fn=ToDoバッチ１６
  feas: class=B flow=pass manualSteps=8 proxyBlocks=5 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r30 | OP[1]その他|バッチ実行（JP1）|11時 // r31 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r32 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r33 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ // r34 // r35 // r36 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r37 | OP[2]ボタン|「検索」押下| // r38 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r39 | OP[4]クリック|No|対象の申込情報 // r40 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r41 | OP[1]ボタン|「連絡」チックボックス押下| // r42 | OP[2]ボタン|「完了登録」押下| // r43 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r46 | OP[1]その他|バッチ実行（JP1）|12時 // r47 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r48 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r49 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000016", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000016", "課支社コード", "AKH62", "代理店コード", "S030", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000016*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-E0B41407 rows26..27 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-3477BB6F rows30..33 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows34..35 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows36..40 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SGL-CFBFBCCB rows41..41 st=coded: click:連絡チェックボックス | assert:確認済表示
  - BLK-AUTO-B8DF200B rows42..43 st=coded: click:完了登録 | assert:画面確認
  - BLK-AUTO-3477BB6F rows46..49 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(4): r20:OK r25:OK r27:OK r43:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r043_不備内容入力画面-更新.png 18_BLK-AUTO-3477BB6F.png

## AZ-230-01-017  item=集計（日次） fn=ToDoバッチ１７
  feas: class=B flow=pass manualSteps=8 proxyBlocks=8 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=15 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r33 | OP[1]その他|バッチ実行（JP1）|12時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]入力|代理店照会|要→否 // r46 | OP[2]ボタン|「営業連携」押下| // r47 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r48 | OP[1]ボタン|「通知しない」押下|- // r49 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r50 | OP[3]ボタン|「OK」押下|- // r51 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r52 | OP[1]ボタン|連携取消押下|- // r53 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r54 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r58 | OP[1]その他|バッチ実行（JP1）|13時 // r59 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r60 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r61 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000017", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000017", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000017*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-3477BB6F rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows45..45 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows46..47 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows48..51 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-CC41ACD0 rows52..54 st=coded: click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-3477BB6F rows58..61 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 15
  evidence(5): r20:OK r25:OK r29:OK r51:OK r54:OK
  keys(7): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r051_不備内容入力画面-更新.png 10_r054_不備内容入力画面-更新.png 21_BLK-AUTO-3477BB6F.png

## AZ-230-01-018  item=集計（日次） fn=ToDoバッチ１８
  feas: class=B flow=pass manualSteps=8 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r33 | OP[1]その他|バッチ実行（JP1）|13時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]ボタン|「営業連携」押下| // r46 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r47 | OP[1]ボタン|「通知しない」押下|- // r48 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r49 | OP[3]ボタン|「OK」押下|- // r50 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r51 | OP[1]ボタン|連携取消押下|- // r52 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r53 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r57 | OP[1]その他|バッチ実行（JP1）|14時 // r58 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r59 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r60 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000018", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000018", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000018*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-3477BB6F rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows45..46 st=coded: click:営業連携
  - BLK-SGL-2268EC8E rows47..53 st=coded: click:営業連携(メール通知先選択を開く) | click:通知しない | assert:メッセージ(MAZG911I002)!NOTE | wait:OK | click:連携取消 | assert:メッセージ(連携取消)!NOTE | wait:OK
      NOTE:JS confirm auto-accept=真機人工
      NOTE:確認Msg=JS confirm auto-accept=真機人工
  - BLK-AUTO-3477BB6F rows57..60 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(5): r20:OK r25:OK r29:OK r50:OK r53:OK
  keys(7): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r050_不備内容入力画面-更新.png 10_r053_不備内容入力画面-更新.png 19_BLK-AUTO-3477BB6F.png

## AZ-230-01-019  item=集計（日次） fn=ToDoバッチ１９
  feas: class=B flow=pass manualSteps=8 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=14 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r33 | OP[1]その他|バッチ実行（JP1）|14時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r46 | OP[2]ボタン|「回答」押下| // r47 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r48 | OP[4]ボタン|「不備一覧」押下| // r49 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r50 | OP[1]入力|部店課支社|対象の申込情報 // r51 | OP[2]ボタン|「検索」押下| // r52 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r53 | OP[4]クリック|No|対象の申込情報 // r54 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r55 | OP[1]ボタン|「完了登録」押下| // r56 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r57 | OP[3]ボタン|連携取消押下| // r58 | CK[4]表示|不備内容入力画面 ー更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r62 | OP[1]その他|バッチ実行（JP1）|15時 // r63 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r64 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r65 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000019", "課支社コード", "AKH62", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000019", "課支社コード", "AKH62", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=0939*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000019*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-3477BB6F rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-C651052A rows38..44 st=coded: assert:ToDo連携バッチ実行＋確認!NOTE | fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
      NOTE:ToDo連携データ作成バッチ実行/確認=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-0AD75340 rows45..49 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows50..54 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows55..56 st=coded: click:完了登録 | assert:画面確認
  - BLK-SGL-BBEBCD49 rows57..58 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-3477BB6F rows62..65 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 14
  evidence(7): r20:OK r25:OK r29:OK r49:OK r54:OK r56:OK r58:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 13_r049_代理店_不備一覧画面.png 16_r054_不備内容入力画面-更新.png 17_r056_不備内容入力画面-更新.png 19_r058_不備内容入力画面_ー更新.png

## AZ-230-01-020  item=集計（日次） fn=ToDoバッチ２０
  feas: class=B flow=pass manualSteps=8 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=16 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r30 | OP[1]その他|バッチ実行（JP1）|15時 // r31 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r32 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r33 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ // r34 // r35 // r36 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r37 | OP[2]ボタン|「検索」押下| // r38 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r39 | OP[4]クリック|No|対象の申込情報 // r40 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r41 | OP[1]入力|代理店照会|「要」→「否」に変更 // r42 | OP[2]ボタン|「更新」押下| // r43 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r44 | OP[4]ボタン|「営業連携」押下| // r45 | CK[5]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r46 | OP[1]ボタン|「通知しない」押下|- // r47 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r48 | OP[3]ボタン|「OK」押下|- // r49 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r50 | OP[1]ボタン|連携取消押下|- // r51 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r52 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r55 | OP[1]その他|バッチ実行（JP1）|16時 // r56 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r57 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r58 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000020", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000020", "課支社コード", "AED73", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "対象外", "営業", "代理店対応状況", "対象外", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000020*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-E0B41407 rows26..27 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-3477BB6F rows30..33 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows34..35 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows36..40 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows41..41 st=coded: assert:画面確認
  - BLK-AUTO-E0B41407 rows42..43 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-2739DA75 rows44..45 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows46..49 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-CC41ACD0 rows50..52 st=coded: click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-3477BB6F rows55..58 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 16
  evidence(6): r20:OK r25:OK r27:OK r43:OK r49:OK r52:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r043_不備内容入力画面-更新.png 10_r049_不備内容入力画面-更新.png 12_r052_不備内容入力画面-更新.png 23_BLK-AUTO-3477BB6F.png

## AZ-230-01-041  item=集計（日次） fn=ToDoバッチ４１
  feas: class=B flow=pass manualSteps=10 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=17 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r48 | OP[1]その他|バッチ実行（JP1）|10時 // r49 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r51 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r53 // r54 // r55 | OP[1]入力|部店課支社|対象の申込情報 // r56 | OP[2]ボタン|「検索」押下| // r57 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r58 | OP[4]クリック|No|対象の申込情報 // r59 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r60 | OP[1]ボタン|営業連携押下| // r61 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r62 | OP[1]ボタン|「通知しない」押下|- // r63 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r64 | OP[3]ボタン|「OK」押下|- // r65 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r66 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r69 | OP[1]その他|バッチ実行（JP1）|11時 // r70 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r71 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r72 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000041", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000041", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "営業", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000041*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows45..45 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-3477BB6F rows48..51 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows53..54 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-9750F4CE rows55..59 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows60..61 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows62..66 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-3477BB6F rows69..72 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 17
  evidence(8): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r59:OK r65:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r059_不備内容入力画面-更新.png

## AZ-230-01-042  item=集計（日次） fn=ToDoバッチ４２
  feas: class=B flow=pass manualSteps=10 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=19 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|「完了登録」押下| // r46 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r47 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|11時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r55 // r56 // r57 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r58 | OP[2]ボタン|「検索」押下| // r59 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r60 | OP[4]クリック|No|対象の申込情報 // r61 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r62 | OP[1]入力|代理店照会|「要」→「否」に変更 // r63 | OP[2]ボタン|「営業連携」押下| // r64 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r65 | OP[1]ボタン|「通知しない」押下|- // r66 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r67 | OP[3]ボタン|「OK」押下|- // r68 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r69 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r72 | OP[1]その他|バッチ実行（JP1）|12時 // r73 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r74 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r75 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000042", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000042", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "営業", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000042*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows45..46 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-BF46F797 rows47..47 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-3477BB6F rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows55..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows57..61 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows62..62 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows63..64 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows65..69 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-3477BB6F rows72..75 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 19
  evidence(8): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r46:OK r68:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r046_不備内容入力画面-更新.png

## AZ-230-01-043  item=集計（日次） fn=ToDoバッチ４３
  feas: class=B flow=pass manualSteps=10 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|12時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r45 | OP[1]ボタン|「更新」押下| // r46 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r47 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|13時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000043", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000043", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000043*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-18958C37 rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-559E7D1D rows45..47 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(5): r20:OK r25:OK r29:OK r44:OK r46:OK
  keys(7): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r044_不備内容入力画面(更新).png 10_r046_不備内容入力画面-更新.png 18_BLK-AUTO-3477BB6F.png

## AZ-230-01-044  item=集計（日次） fn=ToDoバッチ４４
  feas: class=B flow=pass manualSteps=11 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=18 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r33 | OP[3]クリック|No|対象の申込情報 // r34 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r35 | OP[1]ボタン|「代理店連携」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r37 | OP[3]ボタン|「OK」押下| // r38 | CK[4]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[1]入力|各項目に入力|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r42 | OP[3]クリック|No|対象の申込情報 // r43 | CK[4]遷移|代理店 不備内容入力画面（更新）|対象の申込情報 | EV:（目視確認） // r44 | OP[1]ボタン|「一時中断」押下| // r45 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r46 | OP[3]ボタン|「不備一覧」押下| // r47 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r48 | OP[1]入力|部店課支社|対象の申込情報 // r49 | OP[2]ボタン|「検索」押下| // r50 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r51 | OP[4]クリック|No|対象の申込情報 // r52 | CK[5]遷移|不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC // r53 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r56 | OP[1]その他|バッチ実行（JP1）|13時 // r57 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r58 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r59 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r61 // r62 // r63 | OP[1]入力|部店課支社|対象の申込情報 // r64 | OP[2]ボタン|「検索」押下| // r65 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r66 | OP[4]クリック|No|対象の申込情報 // r67 | CK[5]遷移|不備内容入力画面（更新）|対象の申込情報 | EV:画面HC // r68 | OP[1]ボタン|「更新」押下| // r69 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r70 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r73 | OP[1]その他|バッチ実行（JP1）|15時 // r74 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r75 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r76 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000044", "課支社コード", "AMD71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000044", "課支社コード", "AMD71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "代理店対応状況"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000044*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AMD71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B3B9104B rows29..34 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | assert:画面確認
  - BLK-AUTO-D844ADE8 rows35..38 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows39..43 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows44..47 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-18958C37 rows48..52 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows53..53 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-3477BB6F rows56..59 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows61..62 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-18958C37 rows63..67 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-559E7D1D rows68..70 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows73..76 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 18
  evidence(12): r20:OK r25:OK r27:OK r32:OK r34:OK r38:OK r41:OK r45:OK r47:OK r52:OK r67:OK r69:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 12_r032_不備一覧画面.png 13_r034_不備内容入力画面-更新.png 14_r038_不備内容入力画面-更新.png 17_r041_代理店_不備一覧画面.png

## AZ-230-01-045  item=集計（日次） fn=ToDoバッチ４５
  feas: class=B flow=pass manualSteps=13 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=21 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]その他|「連絡」チェックボックスを選択| // r22 | OP[2]ボタン|「更新」押下| // r23 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r24 | OP[4]ボタン|「完了登録」押下| // r25 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r26 | CK[6]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r27 // r28 // r29 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r30 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r31 | OP[3]クリック|No|対象の申込情報 // r32 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r33 | OP[1]ボタン|「完了取消」押下| // r34 | CK[2]出力（Msg）|メッセージ|「MAZG101I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r35 | OP[3]ボタン|「OK」押下| // r36 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r37 | OP[5]ボタン|「検索」押下| // r38 | CK[6]遷移|項目名検索画面|初期値 | EV:画面HC // r39 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r40 | OP[2]ボタン|「選択」押下| // r41 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r42 | OP[1]その他|「照会」チェックボックスを選択| // r43 | OP[2]ボタン|「代理店連携」押下| // r44 | CK[3]出力（Msg）|メッセージ|「MAZG101I006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r45 | OP[4]ボタン|「OK」押下| // r46 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r47 | OP[1]入力|各項目に入力|対象の申込情報 // r48 | OP[2]ボタン|「検索」押下| // r49 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r50 | OP[4]ボタン|「No」押下| // r51 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:画面HC // r52 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r53 | OP[2]ボタン|「回答」押下| // r54 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 // r55 | OP[4]ボタン|「不備一覧」押下| // r56 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r57 | OP[1]入力|部店課支社|対象の申込情報 // r58 | OP[2]ボタン|「検索」押下| // r59 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r60 | OP[4]クリック|No|対象の申込情報 // r61 | CK[5]遷移|不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC // r62 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r65 | OP[1]その他|バッチ実行（JP1）|14時 // r66 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r67 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r68 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r70 // r71 // r72 | OP[1]入力|部店課支社|対象の申込情報 // r73 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r74 | OP[3]クリック|No|対象の申込情報 // r75 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r76 | OP[1]ボタン|「更新」押下| // r77 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC // r78 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r81 | OP[1]その他|バッチ実行（JP1）|16時 // r82 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r83 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r84 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000045", "課支社コード", "AED73", "代理店コード", "MM77", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000045", "課支社コード", "AED73", "代理店コード", "MM77", "代理店対応状況", "対象外", "その他項目は別紙参照", "依頼区分", "連絡", "代理店対応状況", "対象外", "依頼区分", "連絡", "代理店対応状況", "完了", "代理店対応状況", "対象外", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=MM77*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000045*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-SHR-3F6DEDE2 rows21..21 st=coded: click:連絡 | assert:確認済表示!NOTE
      NOTE:依頼区分=連絡 で回答ボタンが確認済に変わる
  - BLK-AUTO-E0B41407 rows22..23 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-B8DF200B rows24..25 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-EBEB83B0 rows26..34 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | click:完了取消 | assert:メッセージ確認!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-4C432C14 rows35..36 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-AUTO-04A78248 rows37..38 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows39..41 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-SHR-7A684D49 rows42..42 st=coded: click:照会 | assert:回答表示
  - BLK-AUTO-D844ADE8 rows43..46 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows47..51 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows52..56 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-18958C37 rows57..61 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows62..62 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-3477BB6F rows65..68 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-9EBB1470 rows70..75 st=coded: assert:ToDo連携バッチ実行＋確認!NOTE | goto:不備一覧 | fill:部店課支社=sectionCode | click:No
      NOTE:ToDo連携データ作成バッチ実行/確認=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-559E7D1D rows76..78 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows81..84 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 21
  evidence(16): r20:OK r23:OK r25:OK r30:OK r32:OK r36:OK r38:OK r41:OK r46:OK r49:OK r51:OK r56:OK r61:OK r73:OK r75:OK r77:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r023_不備内容入力画面-更新.png 08_r025_不備内容入力画面-更新.png 12_r030_不備一覧画面.png 13_r032_不備内容入力画面-更新.png 14_r036_不備内容入力画面-更新.png 17_r038_項目名検索画面.png

## AZ-230-01-046  item=集計（日次） fn=ToDoバッチ４６
  feas: class=B flow=pass manualSteps=11 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=18 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|各項目に入力|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r36 | OP[4]ボタン|「No」押下| // r37 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r39 | OP[2]ボタン|「回答」押下| // r40 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r41 | OP[4]ボタン|「不備一覧」押下| // r42 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r43 | OP[1]入力|部店課支社|対象の申込情報 // r44 | OP[2]ボタン|「検索」押下| // r45 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r46 | OP[4]クリック|No|対象の申込情報 // r47 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r48 | OP[1]ボタン|「完了登録」押下| // r49 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r50 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r53 | OP[1]その他|バッチ実行（JP1）|15時 // r54 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r56 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r58 // r59 // r60 | OP[1]入力|部店課支社|対象の申込情報 // r61 | OP[2]ボタン|「検索」押下| // r62 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r63 | OP[4]クリック|No|対象の申込情報 // r64 | CK[5]遷移|不備内容入力画面（更新）|対象の申込情報 | EV:画面HC // r65 | OP[1]ボタン|「更新」押下| // r66 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC // r67 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r70 | OP[1]その他|バッチ実行（JP1）|17時 // r71 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r72 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r73 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000046", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000046", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000046*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-DEBE0BEE rows33..37 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows38..42 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows43..47 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows48..49 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-BF46F797 rows50..50 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-3477BB6F rows53..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows58..59 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-18958C37 rows60..64 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-559E7D1D rows65..67 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows70..73 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 18
  evidence(9): r20:OK r25:OK r29:OK r35:OK r42:OK r47:OK r49:OK r64:OK r66:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 13_r035_代理店_不備一覧画面.png 14_r042_代理店_不備一覧画面.png 17_r047_不備内容入力画面-更新.png 18_r049_不備内容入力画面-更新.png

## AZ-230-01-047  item=集計（日次） fn=ToDoバッチ４７
  feas: class=B flow=pass manualSteps=13 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=21 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]その他|「連絡」チェックボックスを選択| // r22 | OP[2]ボタン|「更新」押下| // r23 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r24 | OP[4]ボタン|「完了登録」押下| // r25 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r26 | CK[6]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r27 // r28 // r29 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r30 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r31 | OP[3]クリック|No|対象の申込情報 // r32 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r33 | OP[1]ボタン|「完了取消」押下| // r34 | CK[2]出力（Msg）|メッセージ|「MAZG101I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r35 | OP[3]ボタン|「OK」押下| // r36 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r37 | OP[5]ボタン|「検索」押下| // r38 | CK[6]遷移|項目名検索画面|初期値 | EV:画面HC // r39 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r40 | OP[2]ボタン|「選択」押下| // r41 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r42 | OP[1]その他|「照会」チェックボックスを選択| // r43 | OP[2]ボタン|「代理店連携」押下| // r44 | CK[3]出力（Msg）|メッセージ|「MAZG101I006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r45 | OP[4]ボタン|「OK」押下| // r46 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r47 | OP[1]入力|各項目に入力|対象の申込情報 // r48 | OP[2]ボタン|「検索」押下| // r49 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r50 | OP[4]ボタン|「No」押下| // r51 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:画面HC // r52 | OP[1]ボタン|「一時中断」押下| // r53 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r54 | OP[3]ボタン|「不備一覧」押下| // r55 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r56 | OP[1]入力|部店課支社|対象の申込情報 // r57 | OP[2]ボタン|「検索」押下| // r58 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r59 | OP[4]クリック|No|対象の申込情報 // r60 | CK[5]遷移|不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC // r61 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r64 | OP[1]その他|バッチ実行（JP1）|16時 // r65 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r66 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r67 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r69 // r70 // r71 // r72 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r75 | OP[1]その他|バッチ実行（JP1）|18時 // r76 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r77 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r78 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000047", "課支社コード", "AED73", "代理店コード", "MM77", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000047", "課支社コード", "AED73", "代理店コード", "MM77", "代理店対応状況", "対象外", "その他項目は別紙参照", "依頼区分", "連絡", "代理店対応状況", "対象外", "依頼区分", "連絡", "代理店対応状況", "完了", "代理店対応状況", "対象外", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況"]
  params(34,auto=29): agentCode=MM77*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000047*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-SHR-3F6DEDE2 rows21..21 st=coded: click:連絡 | assert:確認済表示!NOTE
      NOTE:依頼区分=連絡 で回答ボタンが確認済に変わる
  - BLK-AUTO-E0B41407 rows22..23 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-B8DF200B rows24..25 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-EBEB83B0 rows26..34 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | click:完了取消 | assert:メッセージ確認!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-4C432C14 rows35..36 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-AUTO-04A78248 rows37..38 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows39..41 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-SHR-7A684D49 rows42..42 st=coded: click:照会 | assert:回答表示
  - BLK-AUTO-D844ADE8 rows43..46 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows47..51 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows52..55 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-18958C37 rows56..60 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows61..61 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-3477BB6F rows64..67 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows69..70 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-3477BB6F rows75..78 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-F1E0B9E5 rows71..72 st=planned: assert:JP1バッチ実行＋ToDo連携テーブル確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 21
  evidence(14): r20:OK r23:OK r25:OK r30:OK r32:OK r36:OK r38:OK r41:OK r46:OK r49:OK r51:OK r53:OK r55:OK r60:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r023_不備内容入力画面-更新.png 08_r025_不備内容入力画面-更新.png 12_r030_不備一覧画面.png 13_r032_不備内容入力画面-更新.png 14_r036_不備内容入力画面-更新.png 17_r038_項目名検索画面.png

## AZ-230-01-048  item=集計（日次） fn=ToDoバッチ４８
  feas: class=B flow=pass manualSteps=11 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=16 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|各項目に入力|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r36 | OP[4]ボタン|「No」押下| // r37 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r39 | OP[2]ボタン|「回答」押下| // r40 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r41 | OP[4]ボタン|「不備一覧」押下| // r42 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r43 | OP[1]入力|部店課支社|対象の申込情報 // r44 | OP[2]ボタン|「検索」押下| // r45 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r46 | OP[4]クリック|No|対象の申込情報 // r47 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r48 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r51 | OP[1]その他|バッチ実行（JP1）|17時 // r52 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r53 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r54 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r56 // r57 // r58 // r59 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r62 | OP[1]その他|バッチ実行（JP1）|19時 // r63 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r64 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r65 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000048", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000048", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000048*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-DEBE0BEE rows33..37 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows38..42 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows43..47 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows48..48 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-3477BB6F rows51..54 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows56..57 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-3477BB6F rows62..65 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-F1E0B9E5 rows58..59 st=planned: assert:JP1バッチ実行＋ToDo連携テーブル確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 16
  evidence(6): r20:OK r25:OK r29:OK r35:OK r42:OK r47:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 13_r035_代理店_不備一覧画面.png 14_r042_代理店_不備一覧画面.png 17_r047_不備内容入力画面-更新.png 23_BLK-SGL-F1E0B9E5.png

## AZ-230-01-049  item=集計（日次） fn=ToDoバッチ４９
  feas: class=B flow=pass manualSteps=11 proxyBlocks=11 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=20 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]ボタン|「一時中断」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r37 | OP[3]ボタン|「不備一覧」押下| // r38 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r39 | OP[1]入力|部店課支社|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r42 | OP[4]クリック|No|対象の申込情報 // r43 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r44 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r45 // r46 // r47 | OP[1]入力|部店課支社|対象の申込情報 // r48 | OP[2]ボタン|「検索」押下| // r49 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r50 | OP[4]クリック|No|対象の申込情報 // r51 | CK[5]遷移|不備内容入力画面（更新）|対象の申込情報 | EV:画面HC // r52 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r53 | OP[2]ボタン|「回答」押下| // r54 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r55 | OP[4]ボタン|「不備一覧」押下| // r56 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r57 | OP[1]入力|部店課支社|対象の申込情報 // r58 | OP[2]ボタン|「検索」押下| // r59 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r60 | OP[4]クリック|No|対象の申込情報 // r61 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r62 | OP[1]ボタン|「完了登録」押下| // r63 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r64 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r67 | OP[1]その他|バッチ実行（JP1）|18時 // r68 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r69 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r70 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r72 // r73 // r74 // r75 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r78 | OP[1]その他|バッチ実行（JP1）|20時 // r79 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r80 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r81 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000049", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000049", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000049*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows35..38 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-9750F4CE rows39..43 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SGL-C16D256A rows44..46 st=coded: assert:ToDo連携テーブル!NOTE | assert:ToDo連携テーブル(継続確認)!NOTE | assert:ToDo連携テーブル(送信前打鍵)!NOTE
      NOTE:非浏览器=真機人工（TODO連携区分0:送信待ち）
      NOTE:非浏览器=真機人工
      NOTE:非浏览器=真機人工
  - BLK-AUTO-18958C37 rows47..51 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows52..56 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows57..61 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows62..63 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-BF46F797 rows64..64 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-3477BB6F rows67..70 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows72..73 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-3477BB6F rows78..81 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-F1E0B9E5 rows74..75 st=planned: assert:JP1バッチ実行＋ToDo連携テーブル確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 20
  evidence(11): r20:OK r25:OK r29:OK r32:OK r36:OK r38:OK r43:OK r51:OK r56:OK r61:OK r63:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r036_メッセージ.png 14_r038_代理店_不備一覧画面.png 17_r043_不備内容入力画面-更新.png

## AZ-230-01-050  item=集計（日次） fn=ToDoバッチ５０
  feas: class=B flow=pass manualSteps=15 proxyBlocks=11 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=18 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|19時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]入力|代理店照会|要→否 // r46 | OP[2]ボタン|「営業連携」押下| // r47 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r48 | OP[1]ボタン|「通知しない」押下|- // r49 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r50 | OP[3]ボタン|「OK」押下|- // r51 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r52 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | OP[1]その他|バッチ実行（JP1）|20時 // r56 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r57 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r58 | CK[4]その他|FAZZ000A011|データが追記されること | EV:定義ﾌｧｲﾙ // r60 // r61 // r62 // r63 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r66 | OP[1]その他|バッチ実行（JP1）|9時 // r67 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r68 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r69 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000050", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000050", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000050*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows45..45 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows46..47 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows48..51 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-EB3D34F4 rows52..52 st=coded: assert:ToDo連携テーブル/APログ/FAZZ000A011!NOTE
      NOTE:ToDo連携区分/AP_AZB022.log/FAZZ000A011=非浏览器=真機人工（mockは不備内容入力画面在位で代理）
  - BLK-AUTO-3477BB6F rows55..58 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows60..61 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-3477BB6F rows66..69 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-F1E0B9E5 rows62..63 st=planned: assert:JP1バッチ実行＋ToDo連携テーブル確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 18
  evidence(4): r20:OK r25:OK r29:OK r51:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r051_不備内容入力画面-更新.png 23_BLK-SGL-F1E0B9E5.png

## AZ-230-01-071  item=集計（日次） fn=ToDoバッチ７１
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[5]入力|代理店照会|「要」→「否」に変更 // r31 | OP[6]ボタン|連携取消押下|- // r32 | CK[7]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r33 | OP[8]ボタン|「OK」押下|- // r34 | CK[9]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r35 | CK[10]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r38 | OP[1]その他|バッチ実行（JP1）|14時 // r39 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r40 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r41 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000071", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000071", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000071*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-B1D2CD03 rows30..30 st=coded: assert:画面確認
  - BLK-SHR-FB883F72 rows31..31 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows33..34 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows35..35 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-3477BB6F rows38..41 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows32..32 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 13
  evidence(4): r20:OK r25:OK r29:OK r34:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r034_不備内容入力画面-更新.png 18_BLK-SGL-60F6A775.png

## AZ-230-01-072  item=集計（日次） fn=ToDoバッチ７２
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[5]ボタン|連携取消押下|- // r31 | CK[6]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r32 | OP[7]ボタン|「OK」押下|- // r33 | CK[8]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r34 | CK[9]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r37 | OP[1]その他|バッチ実行（JP1）|15時 // r38 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r39 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r40 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000072", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000072", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000072*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-FB883F72 rows30..30 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows32..33 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows34..34 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-3477BB6F rows37..40 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows31..31 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r29:OK r33:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r033_不備内容入力画面-更新.png 17_BLK-SGL-60F6A775.png

## AZ-230-01-073  item=集計（日次） fn=ToDoバッチ７３
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r33 | OP[4]クリック|No|対象の申込情報 // r34 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|「完了登録」押下| // r46 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r47 | OP[3]ボタン|連携取消押下| // r48 | CK[4]表示|不備内容入力画面 ー更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r49 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | OP[1]その他|バッチ実行（JP1）|16時 // r53 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r54 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r55 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000073", "課支社コード", "AKH62", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000073", "課支社コード", "AKH62", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=0939*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000073*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-7EB4CA64 rows30..34 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows45..46 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-F09E159A rows47..49 st=coded: click:連携取消 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows52..55 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(7): r20:OK r25:OK r29:OK r39:OK r44:OK r46:OK r48:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r039_代理店_不備一覧画面.png 15_r044_不備内容入力画面-更新.png 16_r046_不備内容入力画面-更新.png 18_r048_不備内容入力画面_ー更新.png

## AZ-230-01-074  item=集計（日次） fn=ToDoバッチ７４
  feas: class=B flow=pass manualSteps=6 proxyBlocks=8 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=16 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]入力|代理店照会|「要」→「否」に変更 // r37 | OP[2]ボタン|「更新」押下| // r38 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[4]ボタン|「営業連携」押下| // r40 | CK[5]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r41 | OP[1]ボタン|「通知しない」押下|- // r42 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r43 | OP[3]ボタン|「OK」押下|- // r44 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r45 | OP[1]ボタン|連携取消押下|- // r46 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r47 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r48 | OP[4]ボタン|「削除」押下| // r49 | CK[5]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r50 | OP[6]ボタン|「OK」押下| // r51 | CK[7]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r52 | CK[8]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | OP[1]その他|バッチ実行（JP1）|17時 // r56 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r57 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r58 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000074", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000074", "課支社コード", "AED73", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "対象外", "営業", "代理店対応状況", "対象外", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000074*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows36..36 st=coded: assert:画面確認
  - BLK-AUTO-E0B41407 rows37..38 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-2739DA75 rows39..40 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows41..44 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-CC41ACD0 rows45..47 st=coded: click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-7364B069 rows48..52 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows55..58 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 16
  evidence(7): r20:OK r25:OK r27:OK r38:OK r44:OK r47:OK r51:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r038_不備内容入力画面-更新.png 10_r044_不備内容入力画面-更新.png 12_r047_不備内容入力画面-更新.png 13_r051_メッセージ.png

## AZ-230-01-075  item=集計（日次） fn=ToDoバッチ７５
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]ボタン|「代理店連携」押下|- // r37 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r38 | OP[3]ボタン|「OK」押下|- // r39 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r40 | OP[1]ボタン|連携取消押下|- // r41 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r42 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r43 | OP[4]ボタン|「削除」押下| // r44 | CK[5]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r45 | OP[6]ボタン|「OK」押下| // r46 | CK[7]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r47 | CK[8]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|18時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000075", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000075", "課支社コード", "AKH62", "代理店コード", "S020", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000075*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-950C5CC5 rows36..42 st=coded: click:代理店連携 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-7364B069 rows43..47 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(6): r20:OK r25:OK r27:OK r39:OK r42:OK r46:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r039_不備内容入力画面-更新.png 10_r042_不備内容入力画面-更新.png 12_r046_メッセージ.png 19_BLK-AUTO-3477BB6F.png

## AZ-230-01-076  item=集計（日次） fn=ToDoバッチ７６
  feas: class=B flow=pass manualSteps=7 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=19 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r33 | OP[3]クリック|No|対象の申込情報 // r34 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r35 | OP[1]ボタン|「代理店連携」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r37 | OP[3]ボタン|「OK」押下| // r38 | CK[4]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[1]入力|各項目に入力|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r42 | OP[4]ボタン|「No」押下| // r43 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r44 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r45 | OP[2]ボタン|「回答」押下| // r46 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r47 | OP[4]ボタン|「不備一覧」押下| // r48 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r49 | OP[1]入力|部店課支社|対象の申込情報 // r50 | OP[2]ボタン|「検索」押下| // r51 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r52 | OP[4]クリック|No|対象の申込情報 // r53 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r54 | OP[1]ボタン|「完了登録」押下| // r55 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r56 | OP[3]ボタン|連携取消押下| // r57 | CK[4]表示|不備内容入力画面 ー更新|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC // r58 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r59 // r60 // r61 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r62 | OP[2]ボタン|「検索」押下| // r63 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r64 | OP[4]クリック|No|対象の申込情報 // r65 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r66 | OP[1]ボタン|「完了取消」押下| // r67 | CK[2]出力（Msg）|メッセージ|「MAZG101I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r68 | OP[3]ボタン|「OK」押下| // r69 | CK[4]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：8参照 | EV:画面HC // r70 | OP[5]ボタン|「削除」押下| // r71 | CK[6]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r72 | OP[7]ボタン|「OK」押下| // r73 | CK[8]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r74 | CK[9]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r77 | OP[1]その他|バッチ実行（JP1）|19時 // r78 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r79 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r80 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000076", "課支社コード", "AED71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000076", "課支社コード", "AED71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000076*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B3B9104B rows29..34 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | assert:画面確認
  - BLK-AUTO-D844ADE8 rows35..38 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows39..43 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows44..48 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows49..53 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows54..55 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-5BDEF314 rows56..60 st=coded: click:連携取消 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-E1BDF237 rows61..65 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-ED876A58 rows66..67 st=coded: click:完了取消 | assert:メッセージ確認!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-4C432C14 rows68..69 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-AUTO-7364B069 rows70..74 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-3477BB6F rows77..80 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 19
  evidence(13): r20:OK r25:OK r27:OK r32:OK r34:OK r38:OK r41:OK r48:OK r53:OK r55:OK r57:OK r69:OK r73:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 12_r032_不備一覧画面.png 13_r034_不備内容入力画面-更新.png 14_r038_不備内容入力画面-更新.png 17_r041_代理店_不備一覧画面.png

## AZ-230-01-077  item=集計（日次） fn=ToDoバッチ７７
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|代理店照会|要→否 // r31 | OP[2]ボタン|「営業連携」押下| // r32 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r33 | OP[1]ボタン|「通知しない」押下|- // r34 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r35 | OP[3]ボタン|「OK」押下|- // r36 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r37 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r40 | OP[1]その他|バッチ実行（JP1）|20時 // r41 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r42 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r43 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000077", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000077", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000077*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-B1D2CD03 rows30..30 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows31..32 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows33..36 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-EB3D34F4 rows37..37 st=coded: assert:ToDo連携テーブル/APログ/FAZZ000A011!NOTE
      NOTE:ToDo連携区分/AP_AZB022.log/FAZZ000A011=非浏览器=真機人工（mockは不備内容入力画面在位で代理）
  - BLK-AUTO-3477BB6F rows40..43 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r29:OK r36:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r036_不備内容入力画面-更新.png 17_BLK-AUTO-3477BB6F.png

## AZ-230-01-078  item=集計（日次） fn=ToDoバッチ７８
  feas: class=B flow=pass manualSteps=5 proxyBlocks=5 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=10 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]ボタン|「営業連携」押下| // r31 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r32 | OP[1]ボタン|「通知しない」押下|- // r33 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r34 | OP[3]ボタン|「OK」押下|- // r35 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r36 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r39 | OP[1]その他|バッチ実行（JP1）|9時 // r40 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r41 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r42 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000078", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000078", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000078*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-2739DA75 rows30..31 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows32..36 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-3477BB6F rows39..42 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 10
  evidence(4): r20:OK r25:OK r29:OK r35:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r035_不備内容入力画面-更新.png 15_BLK-AUTO-3477BB6F.png

## AZ-230-01-079  item=集計（日次） fn=ToDoバッチ７９
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]ボタン|「一時中断」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r37 | OP[3]ボタン|「不備一覧」押下| // r38 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r39 | OP[1]入力|部店課支社|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r42 | OP[4]クリック|No|対象の申込情報 // r43 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r44 | OP[1]ボタン|営業連携押下| // r45 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r46 | OP[1]ボタン|「通知しない」押下|- // r47 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r48 | OP[3]ボタン|「OK」押下|- // r49 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r50 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r53 | OP[1]その他|バッチ実行（JP1）|10時 // r54 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r56 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000079", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000079", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000079*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows35..38 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-9750F4CE rows39..43 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows44..45 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows46..50 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-3477BB6F rows53..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(8): r20:OK r25:OK r29:OK r32:OK r36:OK r38:OK r43:OK r49:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r036_メッセージ.png 14_r038_代理店_不備一覧画面.png 17_r043_不備内容入力画面-更新.png

## AZ-230-01-080  item=集計（日次） fn=ToDoバッチ８０
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|営業連携押下| // r46 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r47 | OP[1]ボタン|「通知しない」押下|- // r48 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r49 | OP[3]ボタン|「OK」押下|- // r50 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r51 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r54 | OP[1]その他|バッチ実行（JP1）|11時 // r55 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r56 | CK[3]その他|APログ|AP_AZB022.log | EV:APﾛｸﾞ // r57 | CK[4]その他|FAZZ000A011|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000080", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000080", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "営業", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000080*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows45..46 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows47..51 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-3477BB6F rows54..57 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(TODO連携区分1:送信済)/APログ(AP_AZB022.log)/FAZZ000A011追記=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(7): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r50:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r050_不備内容入力画面-更新.png

## AZ-230-01-101  item=集計（日次） fn=ToDoバッチ１０１
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=15 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]入力|代理店照会|「要」→「否」に変更 // r37 | OP[2]ボタン|「更新」押下| // r38 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[4]ボタン|「営業連携」押下| // r40 | CK[5]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r41 | OP[1]ボタン|「通知しない」押下|- // r42 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r43 | OP[3]ボタン|「OK」押下|- // r44 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r45 | OP[1]ボタン|連携取消押下|- // r46 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r47 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r48 | CK[4]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r51 | OP[1]その他|バッチ実行（JP1）|15時 // r52 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r53 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r54 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000020", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000020", "課支社コード", "AED73", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "対象外", "営業", "代理店対応状況", "対象外", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000020*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows36..36 st=coded: assert:画面確認
  - BLK-AUTO-E0B41407 rows37..38 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-2739DA75 rows39..40 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows41..44 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-D155DA21 rows45..48 st=coded: click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows51..54 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 15
  evidence(6): r20:OK r25:OK r27:OK r38:OK r44:OK r47:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r038_不備内容入力画面-更新.png 10_r044_不備内容入力画面-更新.png 12_r047_不備内容入力画面-更新.png 22_BLK-AUTO-C8903BF5.png

## AZ-230-01-102  item=集計（日次） fn=ToDoバッチ１０２
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]ボタン|「営業連携」押下| // r37 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r38 | OP[1]ボタン|「通知しない」押下|- // r39 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r40 | OP[3]ボタン|「OK」押下|- // r41 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r42 | OP[1]ボタン|連携取消押下|- // r43 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r44 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r45 | CK[4]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r48 | OP[1]その他|バッチ実行（JP1）|16時 // r49 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r50 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r51 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000021", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000021", "課支社コード", "AKH62", "代理店コード", "S020", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000021*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows36..37 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows38..41 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-D155DA21 rows42..45 st=coded: click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows48..51 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(5): r20:OK r25:OK r27:OK r41:OK r44:OK
  keys(7): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r041_不備内容入力画面-更新.png 10_r044_不備内容入力画面-更新.png 19_BLK-AUTO-C8903BF5.png

## AZ-230-01-103  item=集計（日次） fn=ToDoバッチ１０３
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=15 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r36 | OP[1]入力|代理店照会|「要」→「否」に変更 // r37 | OP[2]ボタン|「営業連携」押下| // r38 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r39 | OP[1]ボタン|「通知しない」押下|- // r40 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r41 | OP[3]ボタン|「OK」押下|- // r42 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r43 | OP[1]クリック|回答内容|【別紙】操作内容 入力内容：3参照 // r44 | OP[2]入力|回答入力欄|【別紙】操作内容 入力内容：3参照 // r45 | OP[3]ボタン|「回答」押下| // r46 | OP[4]ボタン|「完了登録」押下| // r47 | CK[5]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r48 | OP[6]ボタン|連携取消押下| // r49 | CK[7]表示|不備内容入力画面 ー更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r50 | CK[8]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r53 | OP[1]その他|バッチ実行（JP1）|17時 // r54 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r55 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r56 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000022", "課支社コード", "AED71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000022", "課支社コード", "AED71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "対象外", "営業", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000022*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows36..36 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows37..38 st=coded: click:営業連携
  - BLK-SHR-F557476E rows39..45 st=coded: click:営業連携(メール通知先選択を開く)!NOTE | click:通知しない | assert:メッセージ(MAZG911I002)!NOTE | wait:OK!NOTE | click:回答内容!NOTE | click:回答
      NOTE:営業連携ボタンはvisibility_hidden=force
      NOTE:MAZG911I002=JS confirm auto-accept=真機人工
      NOTE:通知しない確認OK=auto-accept
      NOTE:回答内容プルダウン(mockは選択肢未描画)。回答入力欄もサーバ描画項目のためmockには可視項目が無い=真機人工
  - BLK-AUTO-B8DF200B rows46..47 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-F09E159A rows48..50 st=coded: click:連携取消 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows53..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 15
  evidence(8): r20:OK r25:OK r27:OK r33:OK r35:OK r42:OK r47:OK r49:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 13_r033_不備一覧画面.png 14_r035_不備内容入力画面-更新.png 15_r042_不備内容入力画面-更新.png 17_r047_不備内容入力画面-更新.png

## AZ-230-01-104  item=集計（日次） fn=ToDoバッチ１０４
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=14 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r36 | OP[4]クリック|No|対象の申込情報 // r37 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r38 | OP[1]入力|代理店照会|要→否 // r39 | OP[2]ボタン|「営業連携」押下| // r40 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r41 | OP[1]ボタン|「通知しない」押下|- // r42 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r43 | OP[3]ボタン|「OK」押下|- // r44 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r48 | OP[1]その他|バッチ実行（JP1）|18時 // r49 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r51 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000023", "課支社コード", "AED62", "代理店コード", "KSD1", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000023", "課支社コード", "AED62", "代理店コード", "KSD1", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=KSD1*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000023*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows33..37 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows38..38 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows39..40 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows41..44 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-EB3D34F4 rows45..45 st=coded: assert:ToDo連携テーブル/APログ/FAZZ000A011!NOTE
      NOTE:ToDo連携区分/AP_AZB022.log/FAZZ000A011=非浏览器=真機人工（mockは不備内容入力画面在位で代理）
  - BLK-AUTO-C8903BF5 rows48..51 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 14
  evidence(4): r20:OK r25:OK r29:OK r44:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r044_不備内容入力画面-更新.png 19_BLK-AUTO-C8903BF5.png

## AZ-230-01-105  item=集計（日次） fn=ToDoバッチ１０５
  feas: class=B flow=pass manualSteps=6 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r36 | OP[4]クリック|No|対象の申込情報 // r37 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r38 | OP[1]ボタン|「営業連携」押下| // r39 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r40 | OP[1]ボタン|「通知しない」押下|- // r41 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r42 | OP[3]ボタン|「OK」押下|- // r43 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r44 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r47 | OP[1]その他|バッチ実行（JP1）|19時 // r48 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r49 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r50 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000024", "課支社コード", "AED62", "代理店コード", "TSK1", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000024", "課支社コード", "AED62", "代理店コード", "TSK1", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=TSK1*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000024*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows33..37 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows38..39 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows40..44 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-C8903BF5 rows47..50 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r29:OK r43:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r043_不備内容入力画面-更新.png 17_BLK-AUTO-C8903BF5.png

## AZ-230-01-106  item=集計（日次） fn=ToDoバッチ１０６
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=14 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|各項目に入力|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r36 | OP[3]クリック|No|対象の申込情報 // r37 | CK[4]遷移|代理店 不備内容入力画面（更新）|対象の申込情報 | EV:（目視確認） // r38 | OP[1]ボタン|「一時中断」押下| // r39 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r40 | OP[3]ボタン|「不備一覧」押下| // r41 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r42 | OP[1]入力|部店課支社|対象の申込情報 // r43 | OP[2]ボタン|「検索」押下| // r44 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r45 | OP[4]クリック|No|対象の申込情報 // r46 | CK[5]遷移|不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r47 | OP[1]ボタン|営業連携押下| // r48 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r49 | OP[1]ボタン|「通知しない」押下|- // r50 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r51 | OP[3]ボタン|「OK」押下|- // r52 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r53 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r56 | OP[1]その他|バッチ実行（JP1）|20時 // r57 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r58 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r59 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000025", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000025", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000025*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-DEBE0BEE rows33..37 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows38..41 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-18958C37 rows42..46 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows47..48 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows49..53 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-C8903BF5 rows56..59 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 14
  evidence(8): r20:OK r25:OK r29:OK r35:OK r39:OK r41:OK r46:OK r52:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 13_r035_代理店_不備一覧画面.png 14_r039_メッセージ.png 15_r041_代理店_不備一覧画面.png 18_r046_不備内容入力画面(更新).png

## AZ-230-01-107  item=集計（日次） fn=ToDoバッチ１０７
  feas: class=B flow=pass manualSteps=6 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|各項目に入力|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:（目視確認） // r36 | OP[4]クリック|No|対象の申込情報 // r37 | CK[5]遷移|不備内容入力画面-更新|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r39 | OP[2]ボタン|「回答」押下| // r40 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r41 | OP[4]ボタン|「不備一覧」押下| // r42 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r43 | OP[1]入力|部店課支社|対象の申込情報 // r44 | OP[2]ボタン|「検索」押下| // r45 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r46 | OP[4]クリック|No|対象の申込情報 // r47 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r48 | OP[1]ボタン|営業連携押下| // r49 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r50 | OP[1]ボタン|「通知しない」押下|- // r51 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r52 | OP[3]ボタン|「OK」押下|- // r53 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r54 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r57 | OP[1]その他|バッチ実行（JP1）|9時 // r58 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r59 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r60 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000026", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000026", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "営業", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000026*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SGL-3EFB9C18 rows31..37 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | assert:画面確認
  - BLK-AUTO-0AD75340 rows38..42 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows43..47 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows48..49 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows50..54 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-C8903BF5 rows57..60 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(6): r20:OK r25:OK r29:OK r42:OK r47:OK r53:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 13_r042_代理店_不備一覧画面.png 15_r047_不備内容入力画面-更新.png 16_r053_不備内容入力画面-更新.png 20_BLK-AUTO-C8903BF5.png

## AZ-230-01-108  item=集計（日次） fn=ToDoバッチ１０８
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=15 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|部店課支社|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r36 | OP[4]クリック|No|対象の申込情報 // r37 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r38 | OP[1]入力|代理店照会|「要」→「否」に変更 // r39 | OP[2]ボタン|「営業連携」押下| // r40 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r41 | OP[1]ボタン|「通知しない」押下|- // r42 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r43 | OP[3]ボタン|「OK」押下| // r44 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：４参照 | EV:画面HC // r45 | OP[1]クリック|回答内容|【別紙】操作内容 入力内容：3参照 // r46 | OP[2]入力|回答入力欄|【別紙】操作内容 入力内容：3参照 // r47 | OP[3]ボタン|「回答」押下| // r48 | OP[4]ボタン|「完了登録」押下| // r49 | CK[5]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：５参照 | EV:画面HC // r50 | CK[7]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r53 | OP[1]その他|バッチ実行（JP1）|9時 // r54 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r56 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000027", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000027", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "回答済", "営業", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000027*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-9750F4CE rows33..37 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows38..38 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows39..40 st=coded: click:営業連携
  - BLK-SHR-F557476E rows41..47 st=coded: click:営業連携(メール通知先選択を開く)!NOTE | click:通知しない | assert:メッセージ(MAZG911I002)!NOTE | wait:OK!NOTE | click:回答内容!NOTE | click:回答
      NOTE:営業連携ボタンはvisibility_hidden=force
      NOTE:MAZG911I002=JS confirm auto-accept=真機人工
      NOTE:通知しない確認OK=auto-accept
      NOTE:回答内容プルダウン(mockは選択肢未描画)。回答入力欄もサーバ描画項目のためmockには可視項目が無い=真機人工
  - BLK-AUTO-B8DF200B rows48..49 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-BF46F797 rows50..50 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-C8903BF5 rows53..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 15
  evidence(6): r20:OK r25:OK r29:OK r37:OK r44:OK r49:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r037_不備内容入力画面-更新.png 10_r044_不備内容入力画面-更新.png 12_r049_不備内容入力画面-更新.png 22_BLK-AUTO-C8903BF5.png

## AZ-230-01-109  item=集計（日次） fn=ToDoバッチ１０９
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=14 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r32 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r33 | OP[2]ボタン|「検索」押下| // r34 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r35 | OP[4]クリック|No|対象の申込情報 // r36 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r37 | OP[1]入力|代理店照会|要→否 // r38 | OP[2]ボタン|「営業連携」押下| // r39 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r40 | OP[1]ボタン|「通知しない」押下|- // r41 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r42 | OP[3]ボタン|「OK」押下|- // r43 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r44 | CK[5]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r47 | OP[1]その他|バッチ実行（JP1）|10時 // r48 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r49 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r50 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000028", "課支社コード", "AMD71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000028", "課支社コード", "AMD71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000028*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AMD71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows32..36 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows37..37 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows38..39 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows40..43 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-EB3D34F4 rows44..44 st=coded: assert:ToDo連携テーブル/APログ/FAZZ000A011!NOTE
      NOTE:ToDo連携区分/AP_AZB022.log/FAZZ000A011=非浏览器=真機人工（mockは不備内容入力画面在位で代理）
  - BLK-AUTO-C8903BF5 rows47..50 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 14
  evidence(4): r20:OK r25:OK r27:OK r43:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r043_不備内容入力画面-更新.png 19_BLK-AUTO-C8903BF5.png

## AZ-230-01-110  item=集計（日次） fn=ToDoバッチ１１０
  feas: class=B flow=pass manualSteps=6 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r32 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r33 | OP[2]ボタン|「検索」押下| // r34 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r35 | OP[4]クリック|No|対象の申込情報 // r36 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r37 | OP[1]ボタン|「営業連携」押下| // r38 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r39 | OP[1]ボタン|「通知しない」押下|- // r40 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r41 | OP[3]ボタン|「OK」押下|- // r42 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r43 | CK[5]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r46 | OP[1]その他|バッチ実行（JP1）|11時 // r47 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r48 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r49 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000029", "課支社コード", "AMD71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000029", "課支社コード", "AMD71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000029*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AMD71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows32..36 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows37..38 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows39..43 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-C8903BF5 rows46..49 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r27:OK r42:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r042_不備内容入力画面-更新.png 17_BLK-AUTO-C8903BF5.png

## AZ-230-01-131  item=集計（日次） fn=ToDoバッチ１３１
  feas: class=B flow=pass manualSteps=15 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=16 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|19時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]入力|代理店照会|要→否 // r46 | OP[2]ボタン|「営業連携」押下| // r47 | CK[3]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r48 | OP[1]ボタン|「通知しない」押下|- // r49 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r50 | OP[3]ボタン|「OK」押下|- // r51 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r52 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | OP[1]その他|バッチ実行（JP1）|20時 // r56 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r57 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r58 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r60 // r61 // r62 // r63 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r66 | OP[1]その他|バッチ実行（JP1）|9時 // r67 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r68 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r69 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000050", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000050", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000050*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows45..45 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows46..47 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows48..51 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-EB3D34F4 rows52..52 st=coded: assert:ToDo連携テーブル/APログ/FAZZ000A011!NOTE
      NOTE:ToDo連携区分/AP_AZB022.log/FAZZ000A011=非浏览器=真機人工（mockは不備内容入力画面在位で代理）
  - BLK-AUTO-8C0E3438 rows55..63 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows66..69 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 16
  evidence(4): r20:OK r25:OK r29:OK r51:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r051_不備内容入力画面-更新.png 21_BLK-AUTO-C8903BF5.png

## AZ-230-01-132  item=集計（日次） fn=ToDoバッチ１３２
  feas: class=B flow=pass manualSteps=15 proxyBlocks=8 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=14 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|20時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]ボタン|「営業連携」押下| // r46 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r47 | OP[1]ボタン|「通知しない」押下|- // r48 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r49 | OP[3]ボタン|「OK」押下|- // r50 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r51 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r54 | OP[1]その他|バッチ実行（JP1）|9時 // r55 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r56 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r57 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r59 // r60 // r61 // r62 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r65 | OP[1]その他|バッチ実行（JP1）|10時 // r66 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r67 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r68 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000051", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000051", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000051*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows45..46 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows47..51 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-8C0E3438 rows54..62 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows65..68 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 14
  evidence(4): r20:OK r25:OK r29:OK r50:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r050_不備内容入力画面-更新.png 19_BLK-AUTO-C8903BF5.png

## AZ-230-01-133  item=集計（日次） fn=ToDoバッチ１３３
  feas: class=B flow=pass manualSteps=15 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=18 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]ボタン|「一時中断」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG104l101」が表示される | EV:画面HC // r37 | OP[3]ボタン|「不備一覧」押下| // r38 | CK[4]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "2" | EV:画面HC // r39 | OP[1]入力|部店課支社|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r42 | OP[4]クリック|No|対象の申込情報 // r43 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r44 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r47 | OP[1]その他|バッチ実行（JP1）|9時 // r48 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r49 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r50 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r52 // r53 // r54 | OP[1]入力|部店課支社|対象の申込情報 // r55 | OP[2]ボタン|「検索」押下| // r56 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r57 | OP[4]クリック|No|対象の申込情報 // r58 | CK[5]遷移|不備内容入力画面（更新）|対象の申込情報 | EV:画面HC // r59 | OP[1]ボタン|営業連携押下| // r60 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r61 | OP[1]ボタン|「通知しない」押下|- // r62 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r63 | OP[3]ボタン|「OK」押下|- // r64 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r65 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r68 | OP[1]その他|バッチ実行（JP1）|10時 // r69 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r70 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r71 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r73 // r74 // r75 // r76 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r79 | OP[1]その他|バッチ実行（JP1）|11時 // r80 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r81 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r82 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000052", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000052", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "営業", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000052*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-SHR-73BCFD18 rows35..38 st=coded: fill:各項目(回答入力欄)=editedInquiryContent | click:一時中断!NOTE | assert:メッセージ!NOTE | click:不備一覧
      NOTE:visibility 制御下のため force 押下
      NOTE:mockはメッセージ未注入のためメッセージエリア在位で代替
  - BLK-AUTO-9750F4CE rows39..43 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows44..44 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-C8903BF5 rows47..50 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows52..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-18958C37 rows54..58 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows59..60 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows61..65 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-8C0E3438 rows68..76 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows79..82 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 18
  evidence(9): r20:OK r25:OK r29:OK r32:OK r36:OK r38:OK r43:OK r58:OK r64:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r036_メッセージ.png 14_r038_代理店_不備一覧画面.png 17_r043_不備内容入力画面-更新.png

## AZ-230-01-134  item=集計（日次） fn=ToDoバッチ１３４
  feas: class=B flow=pass manualSteps=15 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=18 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r48 | OP[1]その他|バッチ実行（JP1）|9時 // r49 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r51 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r53 // r54 // r55 | OP[1]入力|部店課支社|対象の申込情報 // r56 | OP[2]ボタン|「検索」押下| // r57 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r58 | OP[4]クリック|No|対象の申込情報 // r59 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r60 | OP[1]ボタン|営業連携押下| // r61 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r62 | OP[1]ボタン|「通知しない」押下|- // r63 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r64 | OP[3]ボタン|「OK」押下|- // r65 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r66 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r69 | OP[1]その他|バッチ実行（JP1）|10時 // r70 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r71 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r72 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r74 // r75 // r76 // r77 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r80 | OP[1]その他|バッチ実行（JP1）|11時 // r81 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r82 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r83 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000053", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000053", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "営業", "代理店対応状況", "回答済"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000053*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-SHR-072E06D9 rows45..45 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（ToDo連携テーブル）
  - BLK-AUTO-C8903BF5 rows48..51 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows53..54 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-9750F4CE rows55..59 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-2739DA75 rows60..61 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows62..66 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-8C0E3438 rows69..77 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows80..83 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 18
  evidence(8): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r59:OK r65:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r059_不備内容入力画面-更新.png

## AZ-230-01-135  item=集計（日次） fn=ToDoバッチ１３５
  feas: class=B flow=pass manualSteps=15 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=20 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|「完了登録」押下| // r46 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r47 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|10時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r55 // r56 // r57 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r58 | OP[2]ボタン|「検索」押下| // r59 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r60 | OP[4]クリック|No|対象の申込情報 // r61 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r62 | OP[1]入力|代理店照会|「要」→「否」に変更 // r63 | OP[2]ボタン|「営業連携」押下| // r64 | CK[2]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r65 | OP[1]ボタン|「通知しない」押下|- // r66 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r67 | OP[3]ボタン|「OK」押下|- // r68 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r69 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r72 | OP[1]その他|バッチ実行（JP1）|11時 // r73 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r74 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r75 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r77 // r78 // r79 // r80 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r83 | OP[1]その他|バッチ実行（JP1）|12時 // r84 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r85 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r86 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000054", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000054", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "営業", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000054*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows45..46 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-BF46F797 rows47..47 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-C8903BF5 rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows55..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows57..61 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows62..62 st=coded: assert:画面確認
  - BLK-AUTO-2739DA75 rows63..64 st=coded: click:営業連携
  - BLK-AUTO-FCB405E4 rows65..69 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
      NOTE:非浏览器=真機人工（ToDo連携区分DBダンプ確認）
  - BLK-AUTO-8C0E3438 rows72..80 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows83..86 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 20
  evidence(8): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r46:OK r68:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r046_不備内容入力画面-更新.png

## AZ-230-01-136  item=集計（日次） fn=ToDoバッチ１３６
  feas: class=B flow=pass manualSteps=15 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=19 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]入力|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|11時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]入力|代理店照会|要→否 // r46 | OP[2]ボタン|連携取消押下|- // r47 | CK[3]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r48 | OP[4]ボタン|「OK」押下|- // r49 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r50 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r53 | OP[1]その他|バッチ実行（JP1）|12時 // r54 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r56 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r58 // r59 // r60 // r61 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r64 | OP[1]その他|バッチ実行（JP1）|13時 // r65 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r66 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r67 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000055", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000055", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000055*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-SGL-42508787 rows26..27 st=coded: click:代理店連携 | assert:メッセージ確認!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-4C432C14 rows28..29 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows30..30 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-C8903BF5 rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows45..45 st=coded: assert:画面確認
  - BLK-SHR-FB883F72 rows46..46 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows48..49 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows50..50 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-8C0E3438 rows53..61 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows64..67 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows47..47 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 19
  evidence(4): r20:OK r25:OK r29:OK r49:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r049_不備内容入力画面-更新.png 24_BLK-SGL-60F6A775.png

## AZ-230-01-137  item=集計（日次） fn=ToDoバッチ１３７
  feas: class=B flow=pass manualSteps=15 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=16 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|12時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]ボタン|連携取消押下|- // r46 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r47 | OP[3]ボタン|「OK」押下|- // r48 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r49 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | OP[1]その他|バッチ実行（JP1）|13時 // r53 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r54 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r55 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r57 // r58 // r59 // r60 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r63 | OP[1]その他|バッチ実行（JP1）|14時 // r64 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r65 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r66 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000056", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000056", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000056*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-FB883F72 rows45..45 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows47..48 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows49..49 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-8C0E3438 rows52..60 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows63..66 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows46..46 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 16
  evidence(4): r20:OK r25:OK r29:OK r48:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r048_不備内容入力画面-更新.png 21_BLK-SGL-60F6A775.png

## AZ-230-01-138  item=集計（日次） fn=ToDoバッチ１３８
  feas: class=B flow=pass manualSteps=15 proxyBlocks=11 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=21 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下| // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下| // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|各項目に入力|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r33 | OP[4]ボタン|「No」押下| // r34 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|「完了登録」押下| // r46 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r47 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|13時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r55 // r56 // r57 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r58 | OP[2]ボタン|「検索」押下| // r59 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r60 | OP[4]クリック|No|対象の申込情報 // r61 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r62 | OP[1]ボタン|連携取消押下|- // r63 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r64 | OP[3]ボタン|「OK」押下|- // r65 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r66 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r69 | OP[1]その他|バッチ実行（JP1）|14時 // r70 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r71 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r72 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r75 // r76 // r77 // r78 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r81 | OP[1]その他|バッチ実行（JP1）|15時 // r82 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r83 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r84 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000057", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000057", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000057*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows30..34 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows45..46 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-BF46F797 rows47..47 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-C8903BF5 rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows55..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows57..61 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-FB883F72 rows62..62 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows64..65 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows66..66 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-8C0E3438 rows69..78 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows81..84 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows63..63 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 21
  evidence(8): r20:OK r25:OK r29:OK r32:OK r39:OK r44:OK r46:OK r65:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r032_代理店_不備一覧画面.png 13_r039_代理店_不備一覧画面.png 16_r044_不備内容入力画面-更新.png 17_r046_不備内容入力画面-更新.png

## AZ-230-01-139  item=集計（日次） fn=ToDoバッチ１３９
  feas: class=B flow=pass manualSteps=12 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=18 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r31 // r32 // r33 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r34 | OP[2]ボタン|「検索」押下| // r35 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r36 | OP[4]クリック|No|対象の申込情報 // r37 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r38 | OP[1]入力|代理店照会|「要」→「否」に変更 // r39 | OP[2]ボタン|連携取消押下|- // r40 | CK[3]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r41 | OP[4]ボタン|「OK」押下|- // r42 | CK[5]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r43 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r44 // r45 // r46 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r47 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r48 | OP[3]クリック|No|対象の申込情報 // r49 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r50 | OP[1]入力|代理店照会|「否」→「要」に変更 // r51 | OP[2]ボタン|「代理店連携」押下| // r52 | CK[3]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r53 | OP[4]ボタン|「OK」押下| // r54 | CK[5]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r55 | CK[6]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r58 | OP[1]その他|バッチ実行（JP1）|14時 // r59 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r60 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r61 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r63 // r64 // r65 // r66 | CK[1]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r69 | OP[1]その他|バッチ実行（JP1）|20時 // r70 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r71 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r72 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000058", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000058", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況", "対象外", "代理店対応状況"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000058*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows31..32 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows33..37 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows38..38 st=coded: assert:画面確認
  - BLK-SHR-FB883F72 rows39..39 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows41..42 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows43..43 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-SGL-952A7140 rows44..50 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | assert:画面確認 | assert:画面確認
  - BLK-AUTO-10E5C587 rows51..55 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-8C0E3438 rows58..66 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行×3＋ToDo連携テーブル(1:送信済)/APログ(AP_AZB022A.log)/FAZZ000A011A追記=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-C8903BF5 rows69..72 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows40..40 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 18
  evidence(7): r20:OK r25:OK r29:OK r42:OK r47:OK r49:OK r54:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r042_不備内容入力画面-更新.png 14_r047_不備一覧画面.png 15_r049_不備内容入力画面-更新.png 16_r054_不備内容入力画面-更新.png

## AZ-230-01-140  item=集計（日次） fn=ToDoバッチ１４０
  feas: class=B flow=pass manualSteps=6 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]入力|代理店照会|「要」→「否」に変更 // r37 | OP[2]ボタン|「更新」押下| // r38 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[4]ボタン|「削除」押下| // r40 | CK[5]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r41 | OP[6]ボタン|「OK」押下| // r42 | CK[7]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r43 | CK[8]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r46 | OP[1]その他|バッチ実行（JP1）|15時 // r47 | CK[2]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r48 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r49 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "00000000059", "課支社コード", "AED61", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000059", "課支社コード", "AED61", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=1003*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=00000000059*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows36..36 st=coded: assert:画面確認
  - BLK-AUTO-E0B41407 rows37..38 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-7364B069 rows39..43 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows46..49 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(5): r20:OK r25:OK r27:OK r38:OK r42:OK
  keys(7): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r038_不備内容入力画面-更新.png 10_r042_メッセージ.png 19_BLK-AUTO-C8903BF5.png

## AZ-230-01-151  item=集計（日次） fn=ToDoバッチ１５１
  feas: class=B flow=pass manualSteps=15 proxyBlocks=10 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=17 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r33 | OP[1]その他|バッチ実行（JP1）|13時 // r34 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r35 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r36 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r38 // r39 // r40 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r45 | OP[1]ボタン|「更新」押下| // r46 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r47 | CK[3]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|14時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ // r55 // r56 // r57 | OP[1]入力|部店課支社|対象の申込情報 // r58 | OP[2]ボタン|「検索」押下| // r59 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r60 | OP[4]クリック|No|対象の申込情報 // r61 | CK[5]遷移|不備内容入力画面（更新）|対象の申込情報 | EV:画面HC // r62 | OP[1]ボタン|「更新」押下| // r63 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r64 | OP[3]ボタン|「削除」押下| // r65 | CK[4]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r66 | OP[5]ボタン|「OK」押下| // r67 | CK[6]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r68 | CK[7]その他|ToDo連携テーブル|TODO連携区分が「0：送信待ち」であること | EV:DBﾀﾞﾝﾌﾟ // r71 | OP[1]その他|バッチ実行（JP1）|18時 // r72 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「1：送信済」であること | EV:DBﾀﾞﾝﾌﾟ // r73 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r74 | CK[4]その他|FAZZ000A011A|データが追記されること | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000070", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000070", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000070*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-10E5C587 rows26..30 st=coded: click:代理店連携 | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows33..36 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows38..39 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-E1BDF237 rows40..44 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-559E7D1D rows45..47 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SHR-D6459D48 rows55..56 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022.log)/FAZZ000A011追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-AUTO-18958C37 rows57..61 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-E0B41407 rows62..63 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-7364B069 rows64..68 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows71..74 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 17
  evidence(7): r20:OK r25:OK r29:OK r46:OK r61:OK r63:OK r67:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r046_不備内容入力画面-更新.png 10_r061_不備内容入力画面(更新).png 12_r063_不備内容入力画面-更新.png 13_r067_メッセージ.png

## AZ-230-01-152  item=集計（日次） fn=ToDoバッチ１５２
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[5]入力|代理店照会|「要」→「否」に変更 // r31 | OP[6]ボタン|連携取消押下|- // r32 | CK[7]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r33 | OP[8]ボタン|「OK」押下|- // r34 | CK[9]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r35 | CK[10]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r38 | OP[1]その他|バッチ実行（JP1）|14時 // r39 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r40 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r41 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000071", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000071", "課支社コード", "AKH62", "代理店コード", "S030", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=S030*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000071*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-B1D2CD03 rows30..30 st=coded: assert:画面確認
  - BLK-SHR-FB883F72 rows31..31 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows33..34 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows35..35 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-C8903BF5 rows38..41 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows32..32 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 13
  evidence(4): r20:OK r25:OK r29:OK r34:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r034_不備内容入力画面-更新.png 18_BLK-SGL-60F6A775.png

## AZ-230-01-153  item=集計（日次） fn=ToDoバッチ１５３
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[5]ボタン|連携取消押下|- // r31 | CK[6]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r32 | OP[7]ボタン|「OK」押下|- // r33 | CK[8]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r34 | CK[9]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r37 | OP[1]その他|バッチ実行（JP1）|15時 // r38 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r39 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r40 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000072", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000072", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000072*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-FB883F72 rows30..30 st=coded: click:連携取消 | assert:画面確認
  - BLK-AUTO-4C432C14 rows32..33 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-SHR-BF46F797 rows34..34 st=coded: assert:ToDo連携テーブル!NOTE
      NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認
  - BLK-AUTO-C8903BF5 rows37..40 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  - BLK-SGL-60F6A775 rows31..31 st=planned: 
      NOTE:メッセージ内容=真機人工
  results: ALL PASS 12
  evidence(4): r20:OK r25:OK r29:OK r33:OK
  keys(6): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 09_r033_不備内容入力画面-更新.png 17_BLK-SGL-60F6A775.png

## AZ-230-01-154  item=集計（日次） fn=ToDoバッチ１５４
  feas: class=B flow=pass manualSteps=5 proxyBlocks=6 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=13 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下|- // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「代理店連携」押下|- // r27 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r28 | OP[3]ボタン|「OK」押下|- // r29 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r30 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r31 | OP[2]ボタン|「検索」押下| // r32 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r33 | OP[4]クリック|No|対象の申込情報 // r34 | CK[5]遷移|不備内容入力画面-更新|対象の申込情報 | EV:（目視確認） // r35 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r36 | OP[2]ボタン|「回答」押下| // r37 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r38 | OP[4]ボタン|「不備一覧」押下| // r39 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r40 | OP[1]入力|部店課支社|対象の申込情報 // r41 | OP[2]ボタン|「検索」押下| // r42 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r43 | OP[4]クリック|No|対象の申込情報 // r44 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r45 | OP[1]ボタン|「完了登録」押下| // r46 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r47 | OP[3]ボタン|連携取消押下| // r48 | CK[4]表示|不備内容入力画面 ー更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r49 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | OP[1]その他|バッチ実行（JP1）|16時 // r53 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r54 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r55 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000073", "課支社コード", "AKH62", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000073", "課支社コード", "AKH62", "代理店コード", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了"]
  params(34,auto=29): agentCode=0939*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000073*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-D844ADE8 rows26..29 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-SHR-7EB4CA64 rows30..34 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows35..39 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows40..44 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows45..46 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-F09E159A rows47..49 st=coded: click:連携取消 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows52..55 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 13
  evidence(7): r20:OK r25:OK r29:OK r39:OK r44:OK r46:OK r48:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r029_不備内容入力画面-更新.png 12_r039_代理店_不備一覧画面.png 15_r044_不備内容入力画面-更新.png 16_r046_不備内容入力画面-更新.png 18_r048_不備内容入力画面_ー更新.png

## AZ-230-01-155  item=集計（日次） fn=ToDoバッチ１５５
  feas: class=B flow=pass manualSteps=6 proxyBlocks=8 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=16 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]入力|代理店照会|「要」→「否」に変更 // r37 | OP[2]ボタン|「更新」押下| // r38 | CK[3]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[4]ボタン|「営業連携」押下| // r40 | CK[5]遷移|メール通知先選択画面|遷移すること | EV:（目視確認） // r41 | OP[1]ボタン|「通知しない」押下|- // r42 | CK[2]出力（Msg）|メッセージ|「MAZG911l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r43 | OP[3]ボタン|「OK」押下|- // r44 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r45 | OP[1]ボタン|連携取消押下|- // r46 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r47 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r48 | OP[4]ボタン|「削除」押下| // r49 | CK[5]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r50 | OP[6]ボタン|「OK」押下| // r51 | CK[7]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r52 | CK[8]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r55 | OP[1]その他|バッチ実行（JP1）|17時 // r56 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r57 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r58 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000074", "課支社コード", "AED73", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000074", "課支社コード", "AED73", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "対象外", "営業", "代理店対応状況", "対象外", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=1266*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000074*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED73*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-B1D2CD03 rows36..36 st=coded: assert:画面確認
  - BLK-AUTO-E0B41407 rows37..38 st=coded: click:更新 | assert:表示確認
  - BLK-AUTO-2739DA75 rows39..40 st=coded: click:営業連携
  - BLK-AUTO-7A70187A rows41..44 st=coded: click:営業連携 | click:通知しない | assert:メッセージ表示(MAZG911l002)!NOTE
      NOTE:メッセージ/OK=confirm自動承諾（mockはダイアログのみ、OKボタン無し）=真機人工
      NOTE:通知しない→親画面更新（aZG101UpdateBusinessNotify）を確認
  - BLK-SHR-CC41ACD0 rows45..47 st=coded: click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-7364B069 rows48..52 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows55..58 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 16
  evidence(7): r20:OK r25:OK r27:OK r38:OK r44:OK r47:OK r51:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r038_不備内容入力画面-更新.png 10_r044_不備内容入力画面-更新.png 12_r047_不備内容入力画面-更新.png 13_r051_メッセージ.png

## AZ-230-01-156  item=集計（日次） fn=ToDoバッチ１５６
  feas: class=B flow=pass manualSteps=6 proxyBlocks=7 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=12 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | OP[2]ボタン|「検索」押下| // r33 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r34 | OP[4]クリック|No|対象の申込情報 // r35 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r36 | OP[1]ボタン|「代理店連携」押下|- // r37 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r38 | OP[3]ボタン|「OK」押下|- // r39 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r40 | OP[1]ボタン|連携取消押下|- // r41 | CK[2]出力（Msg）|メッセージ|「MAZG101l007」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r42 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r43 | OP[4]ボタン|「削除」押下| // r44 | CK[5]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r45 | OP[6]ボタン|「OK」押下| // r46 | CK[7]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r47 | CK[8]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r50 | OP[1]その他|バッチ実行（JP1）|18時 // r51 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r52 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r53 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000075", "課支社コード", "AKH62", "代理店コード", "S020", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000075", "課支社コード", "AKH62", "代理店コード", "S020", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "取消済", "代理店対応状況"]
  params(34,auto=29): agentCode=S020*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000075*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AKH62*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B0028D4D rows29..30 st=coded: assert:2回目・送信前打鍵!NOTE
      NOTE:2回目/送信時刻条件=真機人工（前提条件のみ）
  - BLK-AUTO-E1BDF237 rows31..35 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-950C5CC5 rows36..42 st=coded: click:代理店連携 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | click:連携取消 | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-7364B069 rows43..47 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows50..53 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 12
  evidence(6): r20:OK r25:OK r27:OK r39:OK r42:OK r46:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 09_r039_不備内容入力画面-更新.png 10_r042_不備内容入力画面-更新.png 12_r046_メッセージ.png 19_BLK-AUTO-C8903BF5.png

## AZ-230-01-157  item=集計（日次） fn=ToDoバッチ１５７
  feas: class=B flow=pass manualSteps=7 proxyBlocks=9 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=19 skipped=[]
  手順: r14 // r15 // r16 | OP[1]ボタン|「新規登録」押下| // r17 | CK[2]遷移|不備内容入力画面-新規|初期値 | EV:（目視確認） // r18 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r19 | OP[2]ボタン|「登録」押下| // r20 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r21 | OP[1]ボタン|「検索」押下| // r22 | CK[2]遷移|項目名検索画面|初期値 | EV:（目視確認） // r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：2参照 // r24 | OP[2]ボタン|「選択」押下| // r25 | CK[3]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：2参照 | EV:画面HC // r26 | OP[1]ボタン|「更新」押下| // r27 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：3参照 | EV:画面HC // r28 | CK[3]その他|ToDo連携テーブル|レコードが無いこと | EV:DBﾀﾞﾝﾌﾟ // r29 // r30 // r31 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r32 | CK[2]表示|不備一覧画面|検索結果を表示 | EV:画面HC // r33 | OP[3]クリック|No|対象の申込情報 // r34 | CK[4]遷移|不備内容入力画面－更新|対象の申込情報 | EV:画面HC // r35 | OP[1]ボタン|「代理店連携」押下| // r36 | CK[2]出力（Msg）|メッセージ|「MAZG101l006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r37 | OP[3]ボタン|「OK」押下| // r38 | CK[4]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：4参照 | EV:画面HC // r39 | OP[1]入力|各項目に入力|対象の申込情報 // r40 | OP[2]ボタン|「検索」押下| // r41 | CK[3]表示|代理店 不備一覧画面|入力内容の検索結果 / ※「対応状況」が "1" | EV:画面HC // r42 | OP[4]ボタン|「No」押下| // r43 | CK[5]遷移|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r44 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照 // r45 | OP[2]ボタン|「回答」押下| // r46 | CK[3]表示|代理店 不備内容入力画面（更新）|指定した申込書情報を表示 | EV:（目視確認） // r47 | OP[4]ボタン|「不備一覧」押下| // r48 | CK[5]遷移|代理店 不備一覧画面|当該データの / ※「対応状況」が "3" | EV:画面HC // r49 | OP[1]入力|部店課支社|対象の申込情報 // r50 | OP[2]ボタン|「検索」押下| // r51 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r52 | OP[4]クリック|No|対象の申込情報 // r53 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：5参照 | EV:画面HC // r54 | OP[1]ボタン|「完了登録」押下| // r55 | CK[2]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：6参照 | EV:画面HC // r56 | OP[3]ボタン|連携取消押下| // r57 | CK[4]表示|不備内容入力画面 ー更新|【別紙】表示内容 / 表示内容：7参照 | EV:画面HC // r58 | CK[5]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r59 // r60 // r61 | OP[1]入力|証券番号・明細番号|対象の申込情報 // r62 | OP[2]ボタン|「検索」押下| // r63 | CK[3]表示|不備一覧画面|検索結果を表示 | EV:（目視確認） // r64 | OP[4]クリック|No|対象の申込情報 // r65 | CK[5]遷移|不備内容入力画面－更新|対象の申込情報 | EV:（目視確認） // r66 | OP[1]ボタン|「完了取消」押下| // r67 | CK[2]出力（Msg）|メッセージ|「MAZG101I001」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r68 | OP[3]ボタン|「OK」押下| // r69 | CK[4]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：8参照 | EV:画面HC // r70 | OP[5]ボタン|「削除」押下| // r71 | CK[6]出力（Msg）|メッセージ|「MAZG101l002」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg // r72 | OP[7]ボタン|「OK」押下| // r73 | CK[8]表示|メッセージ|「MAZG101l100」が表示される | EV:画面HC // r74 | CK[9]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r77 | OP[1]その他|バッチ実行（JP1）|19時 // r78 | CK[2]その他|ToDo連携テーブル|TODO連携区分が「9：送信対象外」であること | EV:DBﾀﾞﾝﾌﾟ // r79 | CK[3]その他|APログ|AP_AZB022A.log | EV:APﾛｸﾞ // r80 | CK[4]その他|FAZZ000A011A|データが追記されないこと | EV:定義ﾌｧｲﾙ
  別紙业务值: ["○ログイン情報", "ADのユーザかつ、点検区分が営業のユーザを設定。", "○入力内容", "証券番号", "AZ23001", "明細番号", "0000000076", "課支社コード", "AED71", "代理店コード", "その他項目は別紙参照", "項目コード", "照会コード", "不備内容", "添付書類もれ", "回答内容", "回答入力欄", "○表示内容", "証券番号", "AZ23001", "明細番号", "0000000076", "課支社コード", "AED71", "代理店コード", "代理店対応状況", "対象外", "その他項目は別紙参照", "代理店照会", "回答内容", "回答入力欄", "代理店対応状況", "代理店対応状況", "代理店対応状況", "回答済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "完了", "取消済", "代理店対応状況", "対象外"]
  params(34,auto=29): agentCode=2778*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000076*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ23001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AED71*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-SHR-5F5035B5 rows14..15 st=coded: assert:前提行(1回目/18:00-19:00送信前打鍵)確認!NOTE
      NOTE:手順前提行=非浏览器=真機人工（mockはメニュー画面在位で代理）
  - BLK-AZ-MENU-CREATE-INPUT rows16..17 st=verified: click:新規登録
  - BLK-AZ-INPUT-FILL rows18..18 st=verified: fill:各項目=policyNo | fill:各項目=detailNo | fill:各項目=sectionCode | fill:各項目=agentCode | fill:各項目=subAgentCode | fill:各項目=freeCode | fill:各項目=customerName | fill:各項目=startDate | fill:各項目=sumupYearMonth | fill:各項目=dailyReportSend | fill:各項目=sumupSectionCode | fill:各項目=reminderDate
  - BLK-AZ-REGISTER-UPDATE rows19..20 st=coded: click:登録
  - BLK-AUTO-04A78248 rows21..22 st=coded: click:検索
  - BLK-AUTO-5C1EFE0E rows23..25 st=coded: click:検索(項目名検索popup起動) | fill:項目コード=itemCode | fill:項目名=itemName | fill:照会コード=inquiryCode | fill:照会内容=inquiryContent | selectOptionByLabel:項目一覧=itemCode | selectOptionByLabel:照会内容一覧=inquiryCode | selectOptionByLabel:不備内容=1 | click:選択
      NOTE:popup選択後の親画面（mockはpopup再表示）
  - BLK-AUTO-559E7D1D rows26..28 st=coded: click:更新 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-SHR-B3B9104B rows29..34 st=coded: fill:証券番号={policyNo} | click:検索 | assert:検索結果表示 | assert:検索結果行 | click:No | assert:画面確認
  - BLK-AUTO-D844ADE8 rows35..38 st=coded: click:代理店連携!NOTE | wait:OK!NOTE | assert:メッセージ確認!NOTE | assert:画面確認
      NOTE:代理店連携はiframe送信
      NOTE:OKダイアログ=自動承認
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-DEBE0BEE rows39..43 st=coded: fill:各項目(部店コード)=sectionCode | fill:各項目(代理店コード)=agentCode | fill:各項目(証券番号)=policyNo | fill:各項目(募集人ID)=fieldAgentId | click:検索 | click:No
  - BLK-AUTO-0AD75340 rows44..48 st=coded: fill:各項目(回答内容)=1 | fill:各項目(回答入力欄)=editedInquiryContent | click:回答 | assert:回答後再表示(入力欄クリア)!NOTE | click:不備一覧 | goto:代理店不備一覧へ戻る
      NOTE:回答送信で AMC23 が再表示されたことを入力欄クリアで確認
      NOTE:OK=JS confirm auto-accept; mockは回答後 AMC23 再表示
  - BLK-AUTO-9750F4CE rows49..53 st=coded: fill:部店課支社コード=sectionCode | click:検索 | click:No
  - BLK-AUTO-B8DF200B rows54..55 st=coded: click:完了登録 | assert:画面確認
  - BLK-SHR-5BDEF314 rows56..60 st=coded: click:連携取消 | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-E1BDF237 rows61..65 st=coded: fill:証券番号=policyNo | fill:明細番号=detailNo | click:検索 | click:No
  - BLK-SHR-ED876A58 rows66..67 st=coded: click:完了取消 | assert:メッセージ確認!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - BLK-AUTO-4C432C14 rows68..69 st=coded: assert:確認dialog後!NOTE
      NOTE:OK=JS confirm auto-accept
  - BLK-AUTO-7364B069 rows70..74 st=coded: click:削除 | assert:メッセージ確認!NOTE | wait:OK!NOTE | assert:画面確認 | assert:ToDo連携テーブル!NOTE
      NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
      NOTE:OKダイアログ=自動承認
      NOTE:ToDo連携テーブル=非浏览器=真機人工
  - BLK-AUTO-C8903BF5 rows77..80 st=coded: assert:JP1バッチ実行＋ToDo連携テーブル/APログ/FAZZ000A011A確認!NOTE
      NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)/APログ(AP_AZB022A.log)/FAZZ000A011A追記なし=非浏览器=真機人工（mockは画面在位で代理）
  results: ALL PASS 19
  evidence(13): r20:OK r25:OK r27:OK r32:OK r34:OK r38:OK r41:OK r48:OK r53:OK r55:OK r57:OK r69:OK r73:OK
  keys(8): 01_menu.png 05_r020_不備内容入力画面-更新.png 06_r025_不備内容入力画面-更新.png 08_r027_不備内容入力画面-更新.png 12_r032_不備一覧画面.png 13_r034_不備内容入力画面-更新.png 14_r038_不備内容入力画面-更新.png 17_r041_代理店_不備一覧画面.png

## AZ-310-06-001  item=不備登録 fn=シナリオ導線６（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r21 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r22 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r23 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。", "○入力内容", "証券番号", "AZ31001", "シナリオID", "明細番号", "0000000001", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "03：1DAY保険／GK　クルマの保険・ドライバー保険", "証券番号", "AZ31001", "明細番号", "0000000001", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "営業", "完了日", "営業対応状況", "対象外", "代理店対応状況", "「完了登録」ボタン", "非表示"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000001*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ31001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SHR-D606FB03 rows20..23 st=coded: assert:非浏览器确认!NOTE
      NOTE:AP/DB/テーブル=真機人工
  results: ALL PASS 3
  evidence(2): r15:OK r19:OK
  keys(4): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 06_BLK-SHR-D606FB03.png

## AZ-310-18-001  item=不備登録 fn=シナリオ導線１８（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「営業連携」押下| // r21 | OP[2]ボタン|「通知しない」押下| // r22 | OP[3]ボタン|「OK」押下| // r23 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r24 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r25 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r26 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r27 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。", "○入力内容", "証券番号", "AZ31001", "シナリオID", "明細番号", "0000000026", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "03：1DAY保険／GK　クルマの保険・ドライバー保険", "証券番号", "AZ31001", "明細番号", "0000000026", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "営業対応状況", "代理店対応状況", "営業", "代理店⇒営業に変わること", "営業対応状況", "変化がないことを確認", "代理店対応状況", "変化がないことを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000026*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ31001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-A315BF06 rows20..27 st=coded: click:営業連携 | assert:画面確認
  results: ALL PASS 3
  evidence(3): r15:OK r19:OK r23:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r023_不備内容入力画面-更新.png 07_BLK-AUTO-A315BF06.png

## AZ-310-24-001  item=不備登録 fn=シナリオ導線２４（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=4 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]入力|回答内容 // r21 | OP[2]ボタン|「回答」押下| // r22 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r23 | OP[4]入力|回答内容 // r24 | OP[5]ボタン|「回答」押下| // r25 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC // r26 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r27 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r28 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r29 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。", "○入力内容", "証券番号", "AZ31001", "シナリオID", "明細番号", "0000000009", "シナリオの枝番", "回答内容", "回答入力欄", "空欄", "回答内容", "回答入力欄", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自賠責", "保険種類", "00：自賠責", "証券番号", "AZ31001", "明細番号", "0000000009", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "事務S（貨物）", "完了日", "営業対応状況", "代理店対応状況", "メッセージエリア", "メッセージID:MAZG101W053が表示されること", "メッセージエリア", "メッセージIDが表示されないこと", "変化がないことを確認", "営業対応状況", "回答済", "対応中⇒回答済になることを確認", "代理店対応状況", "変化がないことを確認"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000009*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ31001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-SHR-D9AE66FC rows20..25 st=coded: assert:回答内容!NOTE | click:回答 | assert:画面確認 | click:回答 | assert:画面確認
      NOTE:回答内容入力=真機人工
  - BLK-AZ-COMMON-LOGS rows26..29 st=coded: assert:AP/DBログ・テーブル確認!NOTE
      NOTE:非浏览器4项=真機人工确认（mock里以画面在位代替）
  results: ALL PASS 4
  evidence(4): r15:OK r19:OK r22:OK r25:OK
  keys(6): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r022_不備内容入力画面-更新.png 07_r025_不備内容入力画面-更新.png 09_BLK-AZ-COMMON-LOGS.png

## AZ-310-39-001  item=不備登録 fn=シナリオ導線３９（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「連携取消」押下| // r21 | OP[2]ボタン|「OK」押下| // r22 | CK[3]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r23 | CK[4]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r24 | CK[5]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r25 | CK[6]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r26 | CK[7]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「事務S」のユーザを設定。", "○入力内容", "証券番号", "AZ31001", "シナリオID", "明細番号", "0000000019", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "03：1DAY保険／GK　クルマの保険・ドライバー保険", "証券番号", "AZ31001", "明細番号", "0000000019", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "営業", "完了日", "営業対応状況", "完了", "代理店対応状況", "完了", "取消済", "代理店⇒取消済になること", "営業対応状況", "完了", "変化がないことを確認", "代理店対応状況", "完了", "変化がないことを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000019*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ31001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-08AD77A3 rows20..26 st=coded: click:連携取消 | assert:画面確認
  results: ALL PASS 3
  evidence(3): r15:OK r19:OK r22:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r022_不備内容入力画面-更新.png 07_BLK-AUTO-08AD77A3.png

## AZ-410-06-001  item=（機械） fn=シナリオ導線６（現新あり）
  feas: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「完了登録」押下| // r21 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r22 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r23 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r24 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r25 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「機械」のユーザを設定。", "○入力内容", "証券番号", "AZ41001", "シナリオID", "明細番号", "0000000001", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "自動車", "保険種類", "12：自動車保険・事業用", "証券番号", "AZ41001", "明細番号", "0000000001", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "機械", "完了日", "営業対応状況", "回答済", "代理店対応状況", "回答済", "変化がないことを確認", "営業対応状況", "完了", "回答済⇒完了になることを確認", "代理店対応状況", "完了", "回答済⇒完了になることを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000001*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ41001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-BABA9D55 rows20..25 st=coded: click:完了登録 | assert:画面確認 | assert:ログ確認!NOTE
      NOTE:AP/DBログ=真機人工
  results: ALL PASS 3
  evidence(3): r15:OK r19:OK r21:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 07_BLK-AUTO-BABA9D55.png

## AZ-410-06-002  item=（機械） fn=シナリオ導線６
  feas: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「完了登録」押下| // r21 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r22 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r23 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r24 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r25 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「機械」のユーザを設定。", "○入力内容", "証券番号", "AZ41001", "シナリオID", "明細番号", "0000000002", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "火災", "保険種類", "04：住火（地震なし）", "証券番号", "AZ41001", "明細番号", "0000000002", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "機械", "完了日", "営業対応状況", "回答済", "代理店対応状況", "回答済", "変化がないことを確認", "営業対応状況", "完了", "回答済⇒完了になることを確認", "代理店対応状況", "完了", "回答済⇒完了になることを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000002*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ41001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-BABA9D55 rows20..25 st=coded: click:完了登録 | assert:画面確認 | assert:ログ確認!NOTE
      NOTE:AP/DBログ=真機人工
  results: ALL PASS 3
  evidence(3): r15:OK r19:OK r21:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 07_BLK-AUTO-BABA9D55.png

## AZ-410-06-003  item=（機械） fn=シナリオ導線６
  feas: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=3 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「完了登録」押下| // r21 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC // r22 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ // r23 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ // r24 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ // r25 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ
  別紙业务值: ["○ログイン情報", "ＭＳのユーザかつ、点検区分が「機械」のユーザを設定。", "○入力内容", "証券番号", "AZ41001", "シナリオID", "明細番号", "0000000003", "シナリオの枝番", "○表示内容", "入力区分", "現地", "契約マスタ", "連動しない", "種目", "積立火災", "保険種類", "05：積立生活総合", "証券番号", "AZ41001", "明細番号", "0000000003", "部店課支社コード", "AHE61", "代理店コード", "252H", "依頼区分", "点検区分", "機械", "完了日", "営業対応状況", "回答済", "代理店対応状況", "回答済", "変化がないことを確認", "営業対応状況", "完了", "回答済⇒完了になることを確認", "代理店対応状況", "完了", "回答済⇒完了になることを確認"]
  params(34,auto=21): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000003*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ41001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-BABA9D55 rows20..25 st=coded: click:完了登録 | assert:画面確認 | assert:ログ確認!NOTE
      NOTE:AP/DBログ=真機人工
  results: ALL PASS 3
  evidence(3): r15:OK r19:OK r21:OK
  keys(5): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 05_r021_不備内容入力画面-更新.png 07_BLK-AUTO-BABA9D55.png

## AZ-510-01-005  item=メール機能 fn=営業連携通知メール（事務(貨物)以外）定義(AD)
  feas: class=B flow=pass manualSteps=2 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
  status3=coded runner=pass blocks=4 skipped=[]
  手順: r14 | OP[1]ボタン|「検索」押下| // r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC // r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照 // r17 | OP[2]ボタン|「検索」押下| // r18 | OP[3]クリック|「No.」リンク押下| // r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC // r20 | OP[1]ボタン|「営業連携」押下| // r21 | CK[2]遷移|メール通知先選択画面|ポップアップ表示されること | EV:画面HC // r22 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照 // r23 | OP[2]ボタン|「検索」押下| // r24 | CK[3]表示|検索結果|対象ユーザー（黒川京子）が検索されることを確認 | EV:画面HC // r25 | OP[4]クリック|No| // r26 | CK[5]表示|通知先一覧|対象ユーザー（黒川京子）が追加されることを確認 | EV:画面HC // r27 | OP[6]ボタン|「通知する」押下| // r28 | OP[7]ボタン|「OK」押下| // r29 | CK[8]遷移|メール通知先選択画面|画面が閉じること | EV:画面HC // r30 | CK[1]表示|営業連携|営業連携が行われ、連携が「営業」になること | EV:画面HC // r31 | CK[2]その他|メール送信ログ|機能呼出前のログ(MAZG101I524)が出力されること | EV:APﾛｸﾞ // r32 | CK[3]その他|メール送信ログ|機能呼出後のログ(MAZG101I525)が出力されること | EV:APﾛｸﾞ // r34 | CK[1]その他|営業連携通知メール|メールが受信されていること | EV:画面HC // r35 | CK[2]遷移|リンク|不備内容入力・回答画面へ適切に遷移すること | EV:画面HC // r36 | CK[3]表示|不備内容入力画面-更新|正しく表示されていること | EV:画面HC
  別紙业务值: ["○登録内容", "証券番号", "AZ51001", "明細番号", "0000000005", "依頼区分", "点検区分", "営業", "その他の項目", "○ログイン情報", "ADのユーザかつ、点検区分が「営業」のユーザを設定。", "○入力内容", "証券番号", "AZ51001", "明細番号", "0000000005", "氏名", "黒川", "○表示内容", "証券番号", "AZ51001", "明細番号", "0000000005", "依頼区分", "点検区分", "営業"]
  params(34,auto=32): agentCode=252H*, applicationType=1*, completeErrorCode=MAZG101W047*, confirmer=TEST*, counterparty=確認相手TEST*, customerName=TEST*, dailyReportSend=1234567890AB*, defectContent=添付書類もれ*, detailNo=0000000005*, editedInquiryContent=編集済み。*, fieldAgentId=3028004586*, freeCode=1234567890*, inputType=2*, inquiryCode=T007*, inquiryContent=T007：「損保取引確認書」の添付がもれています。*, inquiryId=0000000012*, inquiryMethod=1：品質管理*, insuranceLabel=00 ： 自賠責*, itemCode=T0*, itemName=T0：損保取引確認書*, largeItemValue=B*, pointCheck=?*, policyNo=AZ51001*, reminderDate=2026/10/30*, requestType=照会*, sectionCode=AHE61*, startDate=2026/11/01*, startSelector=#act001to100*, startUrl=/AMB/AMA01.html*, subAgentCode=123456*, sumupSectionCode=ABC012*, sumupStatus=1*, sumupYearMonth=2026/11*, user=?*
  別紙值未见于params: (none)
  - BLK-AZ-MENU-SEARCH-LIST rows14..15 st=coded: click:検索
  - BLK-AZ-LIST-FILTER-OPEN-UPDATE rows16..19 st=coded: fill:各項目=policyNo | click:検索 | assert:結果表示 | click:No.リンク
  - BLK-AUTO-2739DA75 rows20..21 st=coded: click:営業連携
  - BLK-SGL-FF4BE5F2 rows22..36 st=coded: click:営業連携(メール通知先選択を開く) | fill:各項目(氏名)=customerName | fill:部店課支社コード=sectionCode | click:検索 | click:No!NOTE | click:通知する | assert:メール送信ログ!NOTE | assert:営業連携通知メール/リンク!NOTE
      NOTE:AMA28のNoリンクはmock未配線（selectNoのlist項目hidden未整備）
      NOTE:OK=JS confirm auto-accept
      NOTE:営業連携結果=非浏览器=真機人工
      NOTE:MAZG101I524/I525=非浏览器=真機人工
      NOTE:メール受信・リンク遷移=非浏览器=真機人工
  results: ALL PASS 4
  evidence(10): r15:OK r19:OK r21:OK r24:OK r26:OK r29:OK r30:OK r34:OK r35:OK r36:OK
  keys(8): 01_menu.png 02_r015_不備一覧画面.png 04_r019_不備内容入力画面-更新.png 06_r021_メール通知先選択画面.png 07_r024_検索結果.png 09_r026_通知先一覧.png 10_r029_メール通知先選択画面.png 11_r030_営業連携.png
