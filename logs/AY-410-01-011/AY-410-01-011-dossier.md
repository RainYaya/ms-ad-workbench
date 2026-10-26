# AUDIT DOSSIER — AY-410-01-011

meta: {"domain": "AY", "company": "MS", "functionName": "承認者不承認取消通知メール", "item": "メール機能", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-410-01-011.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「照会・検索」押下|
- r15 | CK[2]遷移|照会・検索画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|「No.」リンク押下|
- r19 | CK[4]遷移|申請・確認更新画面|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r20 | OP[1]ボタン|「不承認取消」押下|-
- r21 | CK[2]遷移|送信先(写)選択画面|初期値 | EV:画面HC
- r22 | OP[3]入力|「氏名」|黒川　京子
- r23 | OP[4]ボタン|「検索」押下|-
- r24 | CK[5]表示|送信先(写)選択画面|入力項目に該当する検索結果が表示される | EV:画面HC
- r25 | OP[6]クリック|「NO」をクリック|-
- r26 | OP[7]ボタン|「OK」押下|-
- r27 | CK[8]出力（Msg）|メッセージ|「MAYG901I006」が表示される | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r28 | OP[9]ボタン|「OK」押下|-
- r29 | CK[10]遷移|申請・確認更新画面|【申請・確認状況】：承認待ち | EV:画面HC
- r30 | CK[11]その他|APログ|メールの送信日時確認 | EV:APﾛｸﾞ
- r31 | CK[12]その他|取消計上申請テーブル|更新されること | EV:DBﾀﾞﾝﾌﾟ
- r41 | OP[13]その他|システムズ様にメール送信情報を連携|
- r42 | OP[14]その他|メール内のリンクを押下|
- r43 | CK[15]その他|異例取扱管理システム|異例取扱管理システム / 照会・検索画面への遷移を確認 | EV:画面HC
- r44 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r45 | OP[2]ボタン|「検索」押下|
- r46 | OP[3]クリック|「No.」リンク押下|
- r47 | CK[4]遷移|申請・確認更新画面|【申請・確認状況】：承認待ち | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AF7
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 証券番号
sheets[0]/rows[2][8]: AY41001
sheets[0]/rows[3][1]: 明細番号
sheets[0]/rows[3][8]: 0000000011
sheets[0]/rows[4][1]: 申請・確認状況
sheets[0]/rows[4][8]: 不承認
sheets[0]/rows[5][1]: その他の項目
sheets[0]/rows[5][8]: 部支店長承認になるよう、任意で設定する。
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AF6
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ＭＳのユーザかつ、「部支店長」のユーザを設定。
sheets[1]/rows[3][0]: 1
sheets[1]/rows[3][1]: 証券番号
sheets[1]/rows[3][8]: AY41001
sheets[1]/rows[4][1]: 明細番号
sheets[1]/rows[4][8]: 0000000011
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AE5
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 証券番号
sheets[2]/rows[2][7]: AY41001
sheets[2]/rows[3][1]: 明細番号
sheets[2]/rows[3][7]: 0000000011

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000011"  <- generated.json
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
- policyNo = "AY41001"  <- generated.json
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
### BLK-SHR-DD6D983A  rows 16..47  status3=coded
  screen=AYG200->AYG101->AYG901 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
  - [click] click 不承認取消 sel="#cancelButton" val=""
  - [popup] popup 送信先(写)選択 sel="" val=""
  - [fill] fill 氏名 sel="#user_name_key" val="黒川　京子" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast display 送信先(写)選択画面 sel="#gyoumu_list" val="" (popup)
  - [click] click No sel="#gyoumu_list a" val="" (popup)
  - [assert] ast 送信先(写)一覧に追加 sel="#select_name_list" val="" (popup)
  - [click] click OK sel="input[name='ok']" val="" (popup)
  - [assert] ast message メッセージ sel="#popup_message_area" val="MAYG901" (popup) NOTE:非浏览器=真機人工（ポップアップMsg本文）
  - [click] click OK 確定 sel="input[name='ok']" val="" (popup)
  - [assert] ast transition 申請・確認更新画面に復帰 sel="#div_gyoumu_area_03" val=""
  - [assert] ast other APログ sel="#div_gyoumu_area_03" val="" NOTE:非浏览器=真機人工（APログ）
  - [assert] ast other 取消計上申請テーブル sel="#div_gyoumu_area_03" val="" NOTE:非浏览器=真機人工（取消計上申請テーブル）
  - [assert] ast other メール送信情報連携 sel="#div_gyoumu_area_03" val="" NOTE:非浏览器=真機人工（システムズ様へメール送信情報連携）
  - [assert] ast other メール内リンク sel="#div_gyoumu_area_03" val="" NOTE:非浏览器=真機人工（メール内リンク押下）
  - [goto] goto 異例メニュー sel="" val=""
  - [assert] ast 異例取扱管理システム表示 sel="#route3" val=""
  - [goto] goto 照会・検索画面 sel="" val=""
  - [assert] ast other 異例取扱管理システム 照会・検索へ遷移 sel="#select" val="" NOTE:非浏览器=真機人工（メールリンクから照会・検索へ遷移）
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [click] click 検索 sel="#select" val=""
  - [click] click No リンク sel="#gyoumu_list a[name='link101']" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""

## 5. 本次运行结果（块级）
- BLK-AUTO-E2D0C359  pass  rows None..None
- BLK-SHR-DD6D983A  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|照会・検索画面 file=02_r015_照会・検索画面.png url=...http://127.0.0.1:10097/ANB00/ANA05.html
- [OK ] r19 遷移|申請・確認更新画面 file=04_r019_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r21 遷移|送信先(写)選択画面 file=05_r021_送信先(写)選択画面.png url=...ncel&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r24 表示|送信先(写)選択画面 file=06_r024_送信先(写)選択画面.png url=...ncel&gamid=ANA11&gamcd=ANA00&hubsessid=1
- [OK ] r29 遷移|申請・確認更新画面 file=07_r029_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r43 その他|異例取扱管理システム file=08_r043_異例取扱管理システム.png url=...http://127.0.0.1:10097/ANB00/ANA01.html
- [OK ] r47 遷移|申請・確認更新画面 file=09_r047_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-410-01-011/01_menu.png
- logs/AY-410-01-011/02_r015_照会・検索画面.png
- logs/AY-410-01-011/04_r019_申請・確認更新画面.png
- logs/AY-410-01-011/05_r021_送信先(写)選択画面.png
- logs/AY-410-01-011/06_r024_送信先(写)選択画面.png
- logs/AY-410-01-011/07_r029_申請・確認更新画面.png
- logs/AY-410-01-011/08_r043_異例取扱管理システム.png
- logs/AY-410-01-011/09_r047_申請・確認更新画面.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
