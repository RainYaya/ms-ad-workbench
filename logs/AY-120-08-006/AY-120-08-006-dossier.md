# AUDIT DOSSIER — AY-120-08-006

meta: {"domain": "AY", "company": "MS", "functionName": "シナリオ導線６", "item": "更新", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-120-08-006.xlsx"}
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
sheets[0]/range: A2:AI8
sheets[0]/rows[0][1]: 〇ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、「営業」のユーザを設定。
sheets[0]/rows[3][1]: 1
sheets[0]/rows[3][2]: 証券番号
sheets[0]/rows[3][11]: AY12003
sheets[0]/rows[4][2]: 明細番号
sheets[0]/rows[4][11]: 0000000054
sheets[0]/rows[5][1]: 2
sheets[0]/rows[5][2]: 異例取扱理由
sheets[0]/rows[5][11]: G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消
sheets[0]/rows[6][2]: 具体的内容
sheets[0]/rows[6][11]: 社員による二重計上
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AL86
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 申請・確認状況
sheets[1]/rows[2][12]: 要再申請
sheets[1]/rows[3][1]: 異例管理番号
sheets[1]/rows[3][12]: 空白
sheets[1]/rows[4][1]: 消込状況
sheets[1]/rows[4][12]: 未消込
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
sheets[1]/rows[12][12]: 要再申請依頼したユーザ（部支店長）
sheets[1]/rows[13][1]: 要再申請依頼日
sheets[1]/rows[13][12]: 要再申請依頼したシステム日時
sheets[1]/rows[14][1]: 登録者
sheets[1]/rows[14][12]: 登録したユーザ（営業）
sheets[1]/rows[15][1]: 登録日
sheets[1]/rows[15][12]: 新規入力時のシステム日
sheets[1]/rows[16][1]: 更新者
sheets[1]/rows[16][12]: 前回更新したユーザ（部支店長）
sheets[1]/rows[17][1]: 更新日
sheets[1]/rows[17][12]: 前回更新したシステム日時
sheets[1]/rows[18][1]: 申請・確認基準項目
sheets[1]/rows[18][12]: 1.再計上契約のない取消計上
sheets[1]/rows[18][36]: 新規入力時の入力内容と同一
sheets[1]/rows[19][1]: 課支社CD
sheets[1]/rows[19][12]: ABM62
sheets[1]/rows[19][36]: 新規入力時の入力内容と同一
sheets[1]/rows[20][1]: 課支社名称
sheets[1]/rows[20][12]: （ABM62）
sheets[1]/rows[21][1]: 代理店CD
sheets[1]/rows[21][12]: 2031
sheets[1]/rows[21][36]: 新規入力時の入力内容と同一
sheets[1]/rows[22][1]: 代理店名称
sheets[1]/rows[22][12]: （2031）
sheets[1]/rows[23][1]: 証券番号
sheets[1]/rows[23][12]: AY12003
sheets[1]/rows[23][36]: 新規入力時の入力内容と同一
sheets[1]/rows[24][1]: 明細番号
sheets[1]/rows[24][12]: 0000000054
sheets[1]/rows[24][36]: 新規入力時の入力内容と同一
sheets[1]/rows[25][1]: 保険契約者氏名
sheets[1]/rows[25][12]: テスト
sheets[1]/rows[25][36]: 新規入力時の入力内容と同一
sheets[1]/rows[26][1]: 大種目
sheets[1]/rows[26][12]: 長期医療
sheets[1]/rows[26][36]: 新規入力時の入力内容と同一
sheets[1]/rows[27][1]: 保種
sheets[1]/rows[27][12]: 01：介護費用保険
sheets[1]/rows[27][36]: 新規入力時の入力内容と同一
sheets[1]/rows[28][1]: 取消保険料
sheets[1]/rows[28][12]: 1234
sheets[1]/rows[28][36]: 新規入力時の入力内容と同一
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
sheets[1]/rows[35][12]: 20260404
sheets[1]/rows[35][36]: 新規入力時の入力内容と同一
sheets[1]/rows[36][1]: 届出日(変更届出書の届出日)
sheets[1]/rows[36][12]: 20260505
sheets[1]/rows[36][36]: 新規入力時の入力内容と同一
sheets[1]/rows[37][1]: 取消・変更の計上日
sheets[1]/rows[37][12]: 空白
sheets[1]/rows[38][1]: 異例取扱理由
sheets[1]/rows[38][12]: A.当社・代理店の責による意図しない保険契約の解消
sheets[1]/rows[38][36]: 新規入力時の入力内容と同一
sheets[1]/rows[39][1]: 具体的内容
sheets[1]/rows[39][12]: 募集人(代理店)の説明誤り
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
sheets[1]/rows[54][12]: 届出日(変更届出書の届出日)は始期日以降　　<ルールに則り、保険契約者ヒアリング不要>
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
sheets[1]/rows[74][1]: 申請依頼先
sheets[1]/rows[74][12]: 課支社長
sheets[1]/rows[74][36]: 新規入力時の入力内容と同一
sheets[1]/rows[75][1]: 申請代行者
sheets[1]/rows[75][12]: 課支社長
sheets[1]/rows[76][1]: 承認依頼／要再申請依頼理由
sheets[1]/rows[76][12]: テスト
sheets[1]/rows[77][1]: 承認依頼先
sheets[1]/rows[77][12]: 部支店長
sheets[1]/rows[78][1]: 承認代行者
sheets[1]/rows[78][12]: 部支店長
sheets[1]/rows[79][1]: 承認／要再申請依頼理由
sheets[1]/rows[79][12]: 空白
sheets[1]/rows[80][1]: 承認後・不承認後の対応
sheets[1]/rows[80][12]: 空白
sheets[1]/rows[81][0]: 2
sheets[1]/rows[81][1]: 更新者
sheets[1]/rows[81][12]: 更新したユーザ（営業）
sheets[1]/rows[81][36]: 更新されること
sheets[1]/rows[82][1]: 更新日
sheets[1]/rows[82][12]: 更新したシステム日時
sheets[1]/rows[82][36]: 更新されること
sheets[1]/rows[83][1]: 異例取扱理由
sheets[1]/rows[83][12]: G.当社・代理店の責による計上時等の事務ミスによる保険契約の解消
sheets[1]/rows[83][36]: 更新されること
sheets[1]/rows[84][1]: 具体的内容
sheets[1]/rows[84][12]: 社員による二重計上
sheets[1]/rows[84][36]: 更新されること

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000054"  <- generated.json
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
- policyNo = "AY12003"  <- generated.json
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
- logs/AY-120-08-006/01_menu.png
- logs/AY-120-08-006/02_r015_照会・検索画面.png
- logs/AY-120-08-006/03_r018_照会・検索画面.png
- logs/AY-120-08-006/05_r020_申請・確認更新画面.png
- logs/AY-120-08-006/06_r023_申請・確認更新画面.png
- logs/AY-120-08-006/08_BLK-AUTO-5637DF50.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
