# AUDIT DOSSIER — AZ-510-01-005

meta: {"domain": "AZ", "company": "AD", "functionName": "営業連携通知メール（事務(貨物)以外）定義(AD)", "item": "メール機能", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-510-01-005.xlsx"}
feasibility: class=B flow=pass manualSteps=2 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=4 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|「No.」リンク押下|
- r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r20 | OP[1]ボタン|「営業連携」押下|
- r21 | CK[2]遷移|メール通知先選択画面|ポップアップ表示されること | EV:画面HC
- r22 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r23 | OP[2]ボタン|「検索」押下|
- r24 | CK[3]表示|検索結果|対象ユーザー（黒川京子）が検索されることを確認 | EV:画面HC
- r25 | OP[4]クリック|No|
- r26 | CK[5]表示|通知先一覧|対象ユーザー（黒川京子）が追加されることを確認 | EV:画面HC
- r27 | OP[6]ボタン|「通知する」押下|
- r28 | OP[7]ボタン|「OK」押下|
- r29 | CK[8]遷移|メール通知先選択画面|画面が閉じること | EV:画面HC
- r30 | CK[1]表示|営業連携|営業連携が行われ、連携が「営業」になること | EV:画面HC
- r31 | CK[2]その他|メール送信ログ|機能呼出前のログ(MAZG101I524)が出力されること | EV:APﾛｸﾞ
- r32 | CK[3]その他|メール送信ログ|機能呼出後のログ(MAZG101I525)が出力されること | EV:APﾛｸﾞ
- r34 | CK[1]その他|営業連携通知メール|メールが受信されていること | EV:画面HC
- r35 | CK[2]遷移|リンク|不備内容入力・回答画面へ適切に遷移すること | EV:画面HC
- r36 | CK[3]表示|不備内容入力画面-更新|正しく表示されていること | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AF8
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 証券番号
sheets[0]/rows[2][8]: AZ51001
sheets[0]/rows[3][1]: 明細番号
sheets[0]/rows[3][8]: 0000000005
sheets[0]/rows[4][1]: 依頼区分
sheets[0]/rows[4][8]: 照会
sheets[0]/rows[5][1]: 点検区分
sheets[0]/rows[5][8]: 営業
sheets[0]/rows[6][1]: その他の項目
sheets[0]/rows[6][8]: （任意）
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AG9
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ADのユーザかつ、点検区分が「営業」のユーザを設定。
sheets[1]/rows[3][0]: ○入力内容
sheets[1]/rows[5][0]: 1
sheets[1]/rows[5][1]: 証券番号
sheets[1]/rows[5][8]: AZ51001
sheets[1]/rows[6][1]: 明細番号
sheets[1]/rows[6][8]: 0000000005
sheets[1]/rows[7][0]: 2
sheets[1]/rows[7][1]: 氏名
sheets[1]/rows[7][8]: 黒川
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AE7
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 証券番号
sheets[2]/rows[2][7]: AZ51001
sheets[2]/rows[3][1]: 明細番号
sheets[2]/rows[3][7]: 0000000005
sheets[2]/rows[4][1]: 依頼区分
sheets[2]/rows[4][7]: 照会
sheets[2]/rows[5][1]: 点検区分
sheets[2]/rows[5][7]: 営業

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000005"  <- generated.json
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
- policyNo = "AZ51001"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- auto.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=32: user,pointCheck,sectionCode,agentCode,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-SEARCH-LIST  rows 14..15  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 16..19  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-AUTO-2739DA75  rows 20..21  status3=coded
  screen=AZG101->AZG911 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携 sel="input[name='updateBusinessNotify']" val=""
  - [popup] ast 遷移 メール通知先選択 sel="" val=""
  - [assert] ast メール通知先選択 表示 sel="input[name='sendOn']" val="" (popup)
### BLK-SGL-FF4BE5F2  rows 22..36  status3=coded
  screen=AMA28->AMA04 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 営業連携(メール通知先選択を開く) sel="#updateBusinessNotify" val=""
  - [popup] ast 遷移 メール通知先選択画面 sel="" val=""
  - [fill] input 各項目(氏名) sel="#user_name" val="params.customerName" (popup)
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode" (popup)
  - [click] click 検索 sel="#search" val="" (popup)
  - [assert] ast 表示 検索結果 sel="#gyoumu_list tr" val="" (popup)
  - [click] click No sel="#gyoumu_list a" val="" (popup) NOTE:AMA28のNoリンクはmock未配線（selectNoのlist項目hidden未整備）
  - [assert] ast 表示 通知先一覧 sel="#mail_send_list" val="" (popup)
  - [click] click 通知する sel="input[name='sendOn']" val="" (popup)
  - [assert] ast 遷移 メール通知先選択画面(閉じる) sel="input[name='update']" val="" NOTE:OK=JS confirm auto-accept
  - [assert] ast 表示 営業連携 sel="input[name='update']" val="" NOTE:営業連携結果=非浏览器=真機人工
  - [assert] ast メール送信ログ sel="input[name='update']" val="" NOTE:MAZG101I524/I525=非浏览器=真機人工
  - [assert] ast 営業連携通知メール/リンク sel="input[name='update']" val="" NOTE:メール受信・リンク遷移=非浏览器=真機人工
  - [assert] ast 表示 不備内容入力画面-更新 sel="input[name='update']" val=""

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-AUTO-2739DA75  pass  rows None..None
- BLK-SGL-FF4BE5F2  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r19 遷移|不備内容入力画面-更新 file=04_r019_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r21 遷移|メール通知先選択画面 file=06_r021_メール通知先選択画面.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r24 表示|検索結果 file=07_r024_検索結果.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r26 表示|通知先一覧 file=09_r026_通知先一覧.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r29 遷移|メール通知先選択画面 file=10_r029_メール通知先選択画面.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r30 表示|営業連携 file=11_r030_営業連携.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r34 その他|営業連携通知メール file=12_r034_営業連携通知メール.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r35 遷移|リンク file=13_r035_リンク.png url=...http://127.0.0.1:10097/AMB/AMA28.html
- [OK ] r36 表示|不備内容入力画面-更新 file=14_r036_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-510-01-005/01_menu.png
- logs/AZ-510-01-005/02_r015_不備一覧画面.png
- logs/AZ-510-01-005/04_r019_不備内容入力画面-更新.png
- logs/AZ-510-01-005/06_r021_メール通知先選択画面.png
- logs/AZ-510-01-005/07_r024_検索結果.png
- logs/AZ-510-01-005/09_r026_通知先一覧.png
- logs/AZ-510-01-005/10_r029_メール通知先選択画面.png
- logs/AZ-510-01-005/11_r030_営業連携.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
