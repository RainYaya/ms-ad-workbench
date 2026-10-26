# AUDIT DOSSIER — AY-100-08-001

meta: {"domain": "AY", "company": "MS", "functionName": "タイムゾーン：データ登録・更新", "item": "共通", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-100-08-001.xlsx"}
feasibility: class=B flow=pass manualSteps=5 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「新規登録」押下|
- r15 | CK[2]遷移|取消計上申請登録画面|遷移すること | EV:（目視確認）
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「登録」押下|ボタン押下時の時刻をメモ
- r18 | CK[3]遷移|申請・確認更新画面|操作内容2-1で変更した内容が反映されること | EV:画面HC
- r19 | CK[4]その他|取消計上申請テーブル|「登録日」の時刻が、操作内容2-2の時刻とずれがないこと | EV:DBﾀﾞﾝﾌﾟ
- r20 | OP[1]入力|任意の項目の値を変更|
- r21 | OP[2]ボタン|「更新」押下|ボタン押下時の時刻をメモ
- r22 | CK[3]表示|申請・確認更新画面|操作内容3-1で変更した内容が反映されること | EV:画面HC
- r23 | CK[4]その他|取消計上申請テーブル|「更新日」の時刻が、操作内容3-2の時刻とずれがないこと | EV:DBﾀﾞﾝﾌﾟ
- r24 | CK[5]その他|APログ|操作内容1-1～3-2の時刻とずれがないこと | EV:APﾛｸﾞ
- r25 | CK[6]その他|DBログ|操作内容1-1～3-2の時刻とずれがないこと | EV:DBﾛｸﾞ
- r26 | CK[7]その他|TRログ|操作内容1-1～3-2の時刻とずれがないこと | EV:TRﾛｸﾞ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AF6
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 証券番号
sheets[0]/rows[2][8]: AY10008
sheets[0]/rows[3][1]: 明細番号
sheets[0]/rows[3][8]: 0000000001
sheets[0]/rows[4][1]: その他の項目
sheets[0]/rows[4][8]: （任意の値）

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000001"  <- generated.json
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
- policyNo = "AY10008"  <- generated.json
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
### BLK-AY-TORIKESHI-REGISTER  rows 14..18  status3=coded
  screen=AYG001->AYG100->AYG101 file=block-selectors-ay-nav-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 新規登録 sel="#route2" val=""
  - [assert] ast transition 取消計上申請登録画面 sel="#regist" val=""
  - [fill] fill 課支社CD sel="#section_code" val="AHE61"
  - [fill] fill 代理店CD sel="#agent_code" val="252H"
  - [fill] fill 証券番号 sel="#policy_number" val="AY11001"
  - [fill] fill 保険契約者名 sel="#insurant_name" val="テスト太郎"
  - [fill] select 大種目 自賠責 sel="select[name='large_item_list.selected']" val="B"
  - [fill] fill 申込日 sel="#cancel_application_date" val="2026/10/01"
  - [fill] fill 始期日 sel="#start_date" val="2026/10/01"
  - [fill] fill 届出日 sel="#notification_date" val="2026/10/02"
  - [click] click 登録 sel="#regist" val=""
  - [assert] ast transition 申請・確認更新画面 sel="#div_gyoumu_area_03" val=""
### BLK-SGL-7597207A  rows 19..26  status3=coded
  screen=ANA03 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 取消計上申請テーブル sel="#act101to001" val="" NOTE:登録データ=非浏览器=真機人工（mockは更新画面在位で代理）
  - [fill] input 任意の項目(契約者名) sel="#insurant_name" val="params.customerName"
  - [click] click 更新 sel="#update" val=""
  - [assert] ast 表示 申請・確認更新画面 sel="#act101to001" val=""
  - [assert] ast 取消計上申請テーブル sel="#act101to001" val="" NOTE:更新日=非浏览器=真機人工
  - [assert] ast APログ sel="#act101to001" val="" NOTE:APログ時刻=非浏览器=真機人工
  - [assert] ast DBログ sel="#act101to001" val="" NOTE:DBログ時刻=非浏览器=真機人工
  - [assert] ast TRログ sel="#act101to001" val="" NOTE:TRログ時刻=非浏览器=真機人工

## 5. 本次运行结果（块级）
- BLK-AY-TORIKESHI-REGISTER  pass  rows None..None
- BLK-SGL-7597207A  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r18 遷移|申請・確認更新画面 file=02_r018_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html
- [OK ] r22 表示|申請・確認更新画面 file=03_r022_申請・確認更新画面.png url=...http://127.0.0.1:10097/ANB00/ANA03.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-100-08-001/01_menu.png
- logs/AY-100-08-001/02_r018_申請・確認更新画面.png
- logs/AY-100-08-001/03_r022_申請・確認更新画面.png
- logs/AY-100-08-001/05_BLK-SGL-7597207A.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
