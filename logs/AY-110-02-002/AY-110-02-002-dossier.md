# AUDIT DOSSIER — AY-110-02-002

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線２", "item": "(バッチ起点）", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-110-02-002.xlsx"}
feasibility: class=B flow=pass manualSteps=2 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=3 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]その他|-|【別紙】操作内容　２　参照
- r15 | CK[2]その他|操作結果|- | EV:画面HC
- r16 | CK[3]その他|APログ|ログにエラーがないこと | EV:APﾛｸﾞ
- r17 | OP[1]ボタン|「照会・検索」押下|-
- r18 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r19 | OP[1]入力|「証券番号」|「AY11002」を入力
- r20 | OP[2]入力|「明細番号」|「0000000020」を入力
- r21 | OP[3]クリック|「消込状況」|「30：登録完了」をチェックする
- r22 | OP[4]ボタン|「検索」押下|-
- r23 | CK[5]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r24 | OP[6]クリック|「NO」をクリック|前提条件で登録したレコードと合致する「NO」をクリック
- r25 | CK[7]遷移|申請・確認更新画面|【別紙】表示内容　１　参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: A2:AO52
sheets[0]/rows[0][1]: 〇ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[0]/rows[3][1]: 〇1.データ準備～FAYA001.csvのデータ作成
sheets[0]/rows[5][2]: 作成日時
sheets[0]/rows[5][10]: 20260707111111
sheets[0]/rows[6][2]: 異例管理番号
sheets[0]/rows[6][10]: 設定しない
sheets[0]/rows[7][2]: 取消計上区分
sheets[0]/rows[7][10]: 1
sheets[0]/rows[8][2]: 課支社コード
sheets[0]/rows[8][10]: ABM62
sheets[0]/rows[8][38]: ※
sheets[0]/rows[8][39]: 変更となる可能性あり
sheets[0]/rows[9][2]: 代理店コード
sheets[0]/rows[9][10]: 2031
sheets[0]/rows[9][38]: ※
sheets[0]/rows[9][39]: 変更となる可能性あり
sheets[0]/rows[10][2]: 大種目コード
sheets[0]/rows[10][10]: 3
sheets[0]/rows[11][2]: 保種コード
sheets[0]/rows[11][10]: 02
sheets[0]/rows[12][2]: 証券番号
sheets[0]/rows[12][10]: AY11002
sheets[0]/rows[13][2]: 明細番号
sheets[0]/rows[13][10]: 0000000020
sheets[0]/rows[14][2]: 契約者名
sheets[0]/rows[14][10]: テスト
sheets[0]/rows[15][2]: 再計上証券番号
sheets[0]/rows[15][10]: 設定しない
sheets[0]/rows[16][2]: 再計上明細番号
sheets[0]/rows[16][10]: 設定しない
sheets[0]/rows[17][2]: 取消保険料
sheets[0]/rows[17][10]: 1234
sheets[0]/rows[18][2]: 申込日
sheets[0]/rows[18][10]: 20260303
sheets[0]/rows[19][2]: 始期日
sheets[0]/rows[19][10]: 20260404
sheets[0]/rows[20][2]: 届出日
sheets[0]/rows[20][10]: 20260505
sheets[0]/rows[21][2]: 取消・変更の計上日
sheets[0]/rows[21][10]: 20260606
sheets[0]/rows[22][2]: 異例取扱理由（理由コード）
sheets[0]/rows[22][10]: 5
sheets[0]/rows[23][2]: 変更事由1
sheets[0]/rows[23][10]: 5
sheets[0]/rows[24][2]: 変更事由2
sheets[0]/rows[24][10]: 設定しない
sheets[0]/rows[25][2]: 変更事由3
sheets[0]/rows[25][10]: 設定しない
sheets[0]/rows[26][2]: 変更事由4
sheets[0]/rows[26][10]: 設定しない
sheets[0]/rows[27][2]: 変更事由5
sheets[0]/rows[27][10]: 設定しない
sheets[0]/rows[28][2]: 変更事由6
sheets[0]/rows[28][10]: 設定しない
sheets[0]/rows[29][2]: 予備
sheets[0]/rows[29][10]: 設定しない
sheets[0]/rows[31][2]: ・上記内容を記載したファイルをサーバに格納する
sheets[0]/rows[32][2]: 【現行】
sheets[0]/rows[32][20]: 【新規】
sheets[0]/rows[33][2]: 疑似開発業務DBサーバ
sheets[0]/rows[33][20]: EFS（疑似環境）
sheets[0]/rows[34][2]: IPアドレス
sheets[0]/rows[34][5]: ：
sheets[0]/rows[34][6]: 189.200.120.82
sheets[0]/rows[34][20]: ★MS
sheets[0]/rows[34][23]: /proj/mhkcm/MS/AP/tks/file/recv/FAYA001.csv
sheets[0]/rows[35][2]: ユーザ
sheets[0]/rows[35][5]: ：
sheets[0]/rows[35][6]: mhpub01
sheets[0]/rows[36][5]: ：
sheets[0]/rows[36][6]: Azpub01mh
sheets[0]/rows[37][2]: ★MS
sheets[0]/rows[37][5]: /proj/mhkcm/MS/AP/tks/file/recv/FAYA001.csv
sheets[0]/rows[41][1]: 〇2.下記のバッチ実行手順に応じて、バッチを実行
sheets[0]/rows[43][2]: 【現行】
sheets[0]/rows[43][20]: 【新規】
sheets[0]/rows[44][2]: 疑似開発業務DBサーバ
sheets[0]/rows[44][20]: バッチサーバ（EC2）（疑似環境）
sheets[0]/rows[45][2]: IPアドレス
sheets[0]/rows[45][5]: ：
sheets[0]/rows[45][6]: 189.200.120.82
sheets[0]/rows[45][20]: ★実行コマンド
sheets[0]/rows[46][2]: ユーザ
sheets[0]/rows[46][5]: ：
sheets[0]/rows[46][6]: mhpub01
sheets[0]/rows[46][21]: cd /proj/mhkcm/MS/AP/tks/lib
sheets[0]/rows[47][5]: ：
sheets[0]/rows[47][6]: Azpub01mh
sheets[0]/rows[47][21]: java -jar AYB001.jar
sheets[0]/rows[48][2]: ★実行コマンド
sheets[0]/rows[49][3]: cd /proj/mhkcm/MS/AP/tks/lib
sheets[0]/rows[50][3]: java -jar AYB001.jar
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AK52
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 申請・確認状況
sheets[1]/rows[2][12]: 確認済
sheets[1]/rows[3][1]: 異例管理番号
sheets[1]/rows[3][12]: 空白
sheets[1]/rows[4][1]: 消込状況
sheets[1]/rows[4][12]: 登録完了
sheets[1]/rows[5][1]: 申請入力者
sheets[1]/rows[5][12]: 空白
sheets[1]/rows[6][1]: 申請入力日
sheets[1]/rows[6][12]: 空白
sheets[1]/rows[7][1]: 申請者
sheets[1]/rows[7][12]: 空白
sheets[1]/rows[8][1]: 申請日
sheets[1]/rows[8][12]: 空白
sheets[1]/rows[9][1]: 承認者
sheets[1]/rows[9][12]: 空白
sheets[1]/rows[10][1]: 承認日
sheets[1]/rows[10][12]: 空白
sheets[1]/rows[11][1]: コンプラ情報システム連携日
sheets[1]/rows[11][12]: 空白
sheets[1]/rows[12][1]: 要再申請依頼者
sheets[1]/rows[12][12]: 空白
sheets[1]/rows[13][1]: 要再申請依頼日
sheets[1]/rows[13][12]: 空白
sheets[1]/rows[14][1]: 登録者
sheets[1]/rows[14][12]: SYSTEM
sheets[1]/rows[15][1]: 登録日
sheets[1]/rows[15][12]: 新規入力時のシステム日
sheets[1]/rows[16][1]: 更新者
sheets[1]/rows[16][12]: SYSTEM
sheets[1]/rows[17][1]: 更新日
sheets[1]/rows[17][12]: 新規入力時のシステム日
sheets[1]/rows[18][1]: 申請・確認基準項目
sheets[1]/rows[18][12]: ５．再計上契約のある取消計上(一般種目)
sheets[1]/rows[19][1]: 課支社CD
sheets[1]/rows[19][12]: ABM62
sheets[1]/rows[20][1]: 課支社名称
sheets[1]/rows[20][12]: （ABM62）
sheets[1]/rows[21][1]: 代理店CD
sheets[1]/rows[21][12]: 2031
sheets[1]/rows[22][1]: 代理店名称
sheets[1]/rows[22][12]: （2031）
sheets[1]/rows[23][1]: 証券番号
sheets[1]/rows[23][12]: AY1102
sheets[1]/rows[24][1]: 明細番号
sheets[1]/rows[24][12]: 0000000020
sheets[1]/rows[25][1]: 保険契約者氏名
sheets[1]/rows[25][12]: テスト
sheets[1]/rows[26][1]: 大種目
sheets[1]/rows[26][12]: 火災
sheets[1]/rows[27][1]: 保種
sheets[1]/rows[27][12]: 02：住総（地震なし）
sheets[1]/rows[28][1]: 変更事由
sheets[1]/rows[28][12]: 5
sheets[1]/rows[29][1]: 取消保険料
sheets[1]/rows[29][12]: 1234
sheets[1]/rows[30][1]: 再計上証券番号
sheets[1]/rows[30][12]: 空白
sheets[1]/rows[31][1]: 再計上明細番号
sheets[1]/rows[31][12]: 空白
sheets[1]/rows[32][1]: 証券送付区分
sheets[1]/rows[32][12]: 空白
sheets[1]/rows[33][1]: 変更確認書送付
sheets[1]/rows[33][12]: 空白
sheets[1]/rows[34][1]: 変更確認書課支社送付の理由
sheets[1]/rows[34][12]: 空白
sheets[1]/rows[35][1]: 申込日(原契約の申込日)
sheets[1]/rows[35][12]: 20260303
sheets[1]/rows[36][1]: 始期日
sheets[1]/rows[36][12]: 20260404
sheets[1]/rows[37][1]: 届出日(変更届出書の届出日)
sheets[1]/rows[37][12]: 20260606
sheets[1]/rows[38][1]: 取消・変更の計上日
sheets[1]/rows[38][12]: 20260505
sheets[1]/rows[39][1]: 異例理由（計上時）
sheets[1]/rows[39][12]: 5
sheets[1]/rows[40][1]: 理由変更者
sheets[1]/rows[40][12]: 空白
sheets[1]/rows[41][1]: 理由変更日
sheets[1]/rows[41][12]: 空白
sheets[1]/rows[42][1]: 異例取扱理由
sheets[1]/rows[42][12]: 5.当社・代理店の責による計上時等の事務ミス
sheets[1]/rows[43][1]: 具体的内容
sheets[1]/rows[43][12]: 空白
sheets[1]/rows[44][1]: 具体的説明
sheets[1]/rows[44][12]: 空白
sheets[1]/rows[45][1]: 契約者からの不満足の表明
sheets[1]/rows[45][12]: 空白
sheets[1]/rows[46][1]: (有の場合、CS・苦情システムに登録)
sheets[1]/rows[47][1]: CS・苦情システム　苦情No
sheets[1]/rows[47][12]: 空白
sheets[1]/rows[48][1]: 募集行為に問題の可能性
sheets[1]/rows[48][12]: 空白
sheets[1]/rows[49][1]: (有の場合、コンプラ情報システムに登録)
sheets[1]/rows[50][1]: コンプラ情報システム　管理No
sheets[1]/rows[50][12]: 空白

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "2031"  <- generated.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "テスト"  <- generated.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000020"  <- generated.json
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
- policyNo = "AY11002"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "ABM62"  <- generated.json
- startDate = "20260404"  <- generated.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=28: user,pointCheck,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-SHR-8F1D192A  rows 14..16  status3=coded
  screen=ANA01(batch) file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 操作結果/画面HC sel="#route3" val="" NOTE:計上情報消込処理=バッチ/非浏览器=真機人工
  - [assert] ast APログ sel="#route4" val="" NOTE:APログ確認=非浏览器=真機人工
### BLK-AUTO-E2D0C359  rows 17..18  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SGL-58EA9045  rows 19..25  status3=coded
  screen=AYG200->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 証券番号 sel="#policy_number" val="AY11002"
  - [fill] fill 明細番号 sel="#sub_policy_number" val="0000000020"
  - [check] check 消込状況 30:登録完了 sel="#reconciliation_status_4" val=""
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""

## 5. 本次运行结果（块级）
- BLK-SHR-8F1D192A  pass  rows None..None
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SGL-58EA9045  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 その他|操作結果 file=02_r015_操作結果.png url=...http://127.0.0.1:10097/ANB00/ANA01.html
- [OK ] r18 遷移|照会・検索画面 file=04_r018_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r23 表示|照会・検索画面 file=05_r023_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r25 遷移|申請・確認更新画面 file=07_r025_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-110-02-002/01_menu.png
- logs/AY-110-02-002/02_r015_操作結果.png
- logs/AY-110-02-002/04_r018_照会・検索画面.png
- logs/AY-110-02-002/05_r023_照会・検索画面.png
- logs/AY-110-02-002/07_r025_申請・確認更新画面.png
- logs/AY-110-02-002/08_BLK-SGL-58EA9045.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
