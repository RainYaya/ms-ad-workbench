# AUDIT DOSSIER — AY-100-08-003

meta: {"domain": "AY", "company": "MS", "functionName": "タイムゾーン：検索", "item": "共通", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-100-08-003.xlsx"}
feasibility: class=A flow=pass manualSteps=0 proxyBlocks=0 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「照会・検索」押下|-
- r15 | CK[2]遷移|照会・検索画面|遷移すること | EV:（目視確認）
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|-
- r18 | CK[3]表示|照会・検索画面|【別紙】事前準備で登録したデータ（事前準備1） / が表示されること | EV:画面HC
- r19 | OP[4]クリック|「No」リンク|【別紙】事前準備 テストデータ：１参照
- r20 | CK[5]遷移|申請・確認更新画面|登録日が「2026/10/01」 | EV:画面HC
- r21 | OP[6]ボタン|「申請一覧」押下|-
- r22 | CK[7]遷移|照会・検索画面|確認内容2-3の検索結果 | EV:画面HC
- r23 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r24 | OP[2]ボタン|「検索」押下|
- r25 | CK[3]表示|照会・検索画面|【別紙】事前準備で登録したデータ（事前準備2） / が表示されること | EV:画面HC
- r26 | OP[4]クリック|「No」リンク|【別紙】事前準備 テストデータ：2参照
- r27 | CK[5]遷移|申請・確認更新画面|登録日が「2026/10/02」 | EV:画面HC
- r28 | OP[6]ボタン|「申請一覧」押下|-
- r29 | CK[7]遷移|照会・検索画面|確認内容3-3の検索結果 | EV:画面HC
- r30 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：３参照
- r31 | OP[2]ボタン|「検索」押下|
- r32 | CK[3]表示|照会・検索画面|【別紙】事前準備で登録したデータ（事前準備3） / が表示されること | EV:画面HC
- r33 | OP[4]クリック|「No」リンク|【別紙】事前準備 テストデータ：3参照
- r34 | CK[5]遷移|申請・確認更新画面|登録日が「2026/10/30」 | EV:画面HC
- r35 | OP[6]ボタン|「申請一覧」押下|-
- r36 | CK[7]遷移|照会・検索画面|確認内容4-3の検索結果 | EV:画面HC
- r37 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：４参照
- r38 | OP[2]ボタン|「検索」押下|
- r39 | CK[3]表示|照会・検索画面|【別紙】事前準備で登録したデータ（事前準備4） / が表示されること | EV:画面HC
- r40 | OP[4]クリック|「No」リンク|【別紙】事前準備 テストデータ：4参照
- r41 | CK[5]遷移|申請・確認更新画面|登録日が「2026/11/01」 | EV:画面HC
- r42 | OP[6]ボタン|「申請一覧」押下|-
- r43 | CK[7]遷移|照会・検索画面|確認内容5-3の検索結果 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:Y17
sheets[0]/rows[0][0]: ○テストデータ
sheets[0]/rows[2][0]: 「登録日」が以下のデータを登録すること
sheets[0]/rows[4][0]: 1
sheets[0]/rows[4][1]: 証券番号
sheets[0]/rows[4][8]: AY10008003
sheets[0]/rows[5][1]: 明細番号
sheets[0]/rows[5][8]: 0000000001
sheets[0]/rows[6][1]: 登録日
sheets[0]/rows[6][8]: 2026-10-01 23:59:59
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: 証券番号
sheets[0]/rows[7][8]: AY10008003
sheets[0]/rows[8][1]: 明細番号
sheets[0]/rows[8][8]: 0000000002
sheets[0]/rows[9][1]: 登録日
sheets[0]/rows[9][8]: 2026-10-02 00:00:00
sheets[0]/rows[10][0]: 3
sheets[0]/rows[10][1]: 証券番号
sheets[0]/rows[10][8]: AY10008003
sheets[0]/rows[11][1]: 明細番号
sheets[0]/rows[11][8]: 0000000003
sheets[0]/rows[12][1]: 登録日
sheets[0]/rows[12][8]: 2026-10-30 23:59:59
sheets[0]/rows[13][0]: 4
sheets[0]/rows[13][1]: 証券番号
sheets[0]/rows[13][8]: AY10008003
sheets[0]/rows[14][1]: 明細番号
sheets[0]/rows[14][8]: 0000000004
sheets[0]/rows[15][1]: 登録日
sheets[0]/rows[15][8]: 2026-11-01 00:00:00
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:Y7
sheets[1]/rows[0][0]: ○入力内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 登録日
sheets[1]/rows[2][8]: 2026年10月01日　～　2026年10月01日
sheets[1]/rows[3][0]: 2
sheets[1]/rows[3][1]: 登録日
sheets[1]/rows[3][8]: 2026年10月02日　～　2026年10月02日
sheets[1]/rows[4][0]: 3
sheets[1]/rows[4][1]: 登録日
sheets[1]/rows[4][8]: 2026年10月30日　～　2026年10月30日
sheets[1]/rows[5][0]: 4
sheets[1]/rows[5][1]: 登録日
sheets[1]/rows[5][8]: 2026年11月01日　～　2026年11月01日

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
### BLK-AUTO-E2D0C359  rows 14..15  status3=coded
  screen=AYG001->AYG200 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast AYメニュー表示 sel="#route3" val=""
  - [click] click 照会・検索 sel="#route3" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [assert] ast 検索結果エリア sel="#gyoumu_list" val=""
### BLK-SGL-557F51B3  rows 16..43  status3=coded
  screen=AYG200<->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast display 検索結果 sel="#gyoumu_list a" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請一覧 sel="#act101to200" val=""
  - [assert] ast transition 照会・検索画面 sel="#select" val=""
  - [fill] fill 課支社CD 2周目 sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD 2周目 sel="#agent_code" val="252H"
  - [fill] fill 証券番号 2周目 sel="#policy_number" val="AY11001"
  - [click] click 検索 2周目 sel="#select" val=""
  - [assert] ast display 検索結果 2周目 sel="#gyoumu_list a" val=""
  - [click] click No リンク 2周目 sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 2周目 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請一覧 2周目 sel="#act101to200" val=""
  - [assert] ast transition 照会・検索画面 2周目 sel="#select" val=""
  - [fill] fill 課支社CD 3周目 sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD 3周目 sel="#agent_code" val="252H"
  - [fill] fill 証券番号 3周目 sel="#policy_number" val="AY11001"
  - [click] click 検索 3周目 sel="#select" val=""
  - [assert] ast display 検索結果 3周目 sel="#gyoumu_list a" val=""
  - [click] click No リンク 3周目 sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 3周目 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請一覧 3周目 sel="#act101to200" val=""
  - [assert] ast transition 照会・検索画面 3周目 sel="#select" val=""
  - [fill] fill 課支社CD 4周目 sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD 4周目 sel="#agent_code" val="252H"
  - [fill] fill 証券番号 4周目 sel="#policy_number" val="AY11001"
  - [click] click 検索 4周目 sel="#select" val=""
  - [assert] ast display 検索結果 4周目 sel="#gyoumu_list a" val=""
  - [click] click No リンク 4周目 sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 4周目 sel="#div_gyoumu_area_03" val=""
  - [click] click 申請一覧 4周目 sel="#act101to200" val=""
  - [assert] ast transition 照会・検索画面 4周目 sel="#select" val=""

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SGL-557F51B3  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r18 表示|照会・検索画面 file=02_r018_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r20 遷移|申請・確認更新画面 file=04_r020_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r22 遷移|照会・検索画面 file=05_r022_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r25 表示|照会・検索画面 file=06_r025_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r27 遷移|申請・確認更新画面 file=07_r027_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r29 遷移|照会・検索画面 file=08_r029_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r32 表示|照会・検索画面 file=09_r032_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r34 遷移|申請・確認更新画面 file=10_r034_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r36 遷移|照会・検索画面 file=11_r036_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r39 表示|照会・検索画面 file=12_r039_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r41 遷移|申請・確認更新画面 file=13_r041_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r43 遷移|照会・検索画面 file=14_r043_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-100-08-003/01_menu.png
- logs/AY-100-08-003/02_r018_照会・検索画面.png
- logs/AY-100-08-003/04_r020_申請・確認更新画面.png
- logs/AY-100-08-003/05_r022_照会・検索画面.png
- logs/AY-100-08-003/06_r025_照会・検索画面.png
- logs/AY-100-08-003/07_r027_申請・確認更新画面.png
- logs/AY-100-08-003/08_r029_照会・検索画面.png
- logs/AY-100-08-003/09_r032_照会・検索画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
