# AUDIT DOSSIER — AY-122-01-007

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線７", "item": "（確認ベース）", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-122-01-007.xlsx"}
feasibility: class=A flow=pass manualSteps=0 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=3 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「照会・検索」押下|-
- r15 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r16 | OP[1]入力|画面各項目入力|【別紙】操作内容　１　参照
- r17 | OP[2]ボタン|「検索」押下|-
- r18 | CK[3]表示|照会・検索画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r19 | OP[4]クリック|「No.」リンククリック|
- r20 | CK[5]遷移|申請・確認更新画面|【別紙】表示内容　１　参照 | EV:画面HC
- r21 | OP[1]入力|画面各項目入力|【別紙】操作内容　2　参照
- r22 | OP[2]ボタン|「更新」押下|-
- r23 | CK[3]表示|申請・確認更新画面|【別紙】表示内容　2　参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: A2:AI7
sheets[0]/rows[0][1]: 〇ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[0]/rows[3][1]: 1
sheets[0]/rows[3][2]: 証券番号
sheets[0]/rows[3][11]: AY11002
sheets[0]/rows[4][2]: 明細番号
sheets[0]/rows[4][11]: 0000000025
sheets[0]/rows[5][1]: 2
sheets[0]/rows[5][2]: 異例取扱理由
sheets[0]/rows[5][11]: 6.当社・代理店の責による意図しない契約の訂正（除事務ミス）
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AL57
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
sheets[1]/rows[18][12]: 6.遡及始期日変更
sheets[1]/rows[19][1]: 課支社CD
sheets[1]/rows[19][12]: ABM62
sheets[1]/rows[20][1]: 課支社名称
sheets[1]/rows[20][12]: （ABM62）
sheets[1]/rows[21][1]: 代理店CD
sheets[1]/rows[21][12]: 2031
sheets[1]/rows[22][1]: 代理店名称
sheets[1]/rows[22][12]: （2031）
sheets[1]/rows[23][1]: 証券番号
sheets[1]/rows[23][12]: AY11002
sheets[1]/rows[24][1]: 明細番号
sheets[1]/rows[24][12]: 0000000025
sheets[1]/rows[25][1]: 保険契約者氏名
sheets[1]/rows[25][12]: テスト
sheets[1]/rows[26][1]: 大種目
sheets[1]/rows[26][12]: 積立火災
sheets[1]/rows[27][1]: 保種
sheets[1]/rows[27][12]: 06：積立しあわせ家庭
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
sheets[1]/rows[51][0]: 2
sheets[1]/rows[51][1]: 異例取扱理由
sheets[1]/rows[51][12]: 6.当社・代理店の責による意図しない契約の訂正（除事務ミス）
sheets[1]/rows[51][36]: 更新されること
sheets[1]/rows[52][1]: 更新者
sheets[1]/rows[52][12]: ログインユーザ
sheets[1]/rows[52][36]: 更新されること
sheets[1]/rows[53][1]: 更新日
sheets[1]/rows[53][12]: 理由変更したシステム日時
sheets[1]/rows[53][36]: 更新されること
sheets[1]/rows[54][1]: 理由変更者
sheets[1]/rows[54][12]: ログインユーザ
sheets[1]/rows[54][36]: 更新されること
sheets[1]/rows[55][1]: 理由変更日
sheets[1]/rows[55][12]: 理由変更したシステム日時
sheets[1]/rows[55][36]: 更新されること

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000025"  <- generated.json
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
### BLK-AUTO-E2D0C359  rows 14..15  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-AUTO-4F9D57E1  rows 16..20  status3=coded
  screen=AYG200->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 照会・検索画面 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
### BLK-AUTO-5637DF50  rows 21..23  status3=coded
  screen=ANA03 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 各項目(契約者名) sel="#insurant_name" val="params.customerName"
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val=""

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-AUTO-4F9D57E1  pass  rows None..None
- BLK-AUTO-5637DF50  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|照会・検索画面 file=02_r015_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r18 表示|照会・検索画面 file=03_r018_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r20 遷移|申請・確認更新画面 file=05_r020_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r23 表示|申請・確認更新画面 file=06_r023_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-122-01-007/01_menu.png
- logs/AY-122-01-007/02_r015_照会・検索画面.png
- logs/AY-122-01-007/03_r018_照会・検索画面.png
- logs/AY-122-01-007/05_r020_申請・確認更新画面.png
- logs/AY-122-01-007/06_r023_申請・確認更新画面.png
- logs/AY-122-01-007/08_BLK-AUTO-5637DF50.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
