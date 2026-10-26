# AUDIT DOSSIER — AZ-200-07-003

meta: {"domain": "AZ", "company": "MS", "functionName": "タイムゾーン：検索", "item": "共通", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-200-07-003.xlsx"}
feasibility: class=A flow=pass manualSteps=0 proxyBlocks=0 paramIssues=0 paramsAuto=False source=boundary.json
status3(case)=coded  runner_status=pass  blocks=4 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r15 | OP[2]ボタン|「検索」押下|
- r16 | CK[3]表示|不備一覧画面|登録日が「26/10/01」のデータのみ表示されること | EV:画面HC
- r17 | OP[4]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r18 | OP[5]ボタン|「検索」押下|
- r19 | CK[6]表示|不備一覧画面|登録日が「26/10/02」のデータのみ表示されること | EV:画面HC
- r20 | OP[7]入力|各項目に入力|【別紙】操作内容 入力内容：３参照
- r21 | OP[8]ボタン|「検索」押下|
- r22 | CK[9]表示|不備一覧画面|登録日が「26/10/30」のデータのみ表示されること | EV:画面HC
- r23 | OP[10]入力|各項目に入力|【別紙】操作内容 入力内容：４参照
- r24 | OP[11]ボタン|「検索」押下|
- r25 | CK[12]表示|不備一覧画面|登録日が「26/11/01」のデータのみ表示されること | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:Y17
sheets[0]/rows[0][0]: ○テストデータ
sheets[0]/rows[2][0]: 事業会社のシステムで「登録日」が以下のデータを登録し、代理店連携すること
sheets[0]/rows[4][0]: 1
sheets[0]/rows[4][1]: 証券番号
sheets[0]/rows[4][8]: AZ20007003
sheets[0]/rows[5][1]: 明細番号
sheets[0]/rows[5][8]: 0000000001
sheets[0]/rows[6][1]: 登録日
sheets[0]/rows[6][8]: 2026-10-01 23:59:59
sheets[0]/rows[7][0]: 2
sheets[0]/rows[7][1]: 証券番号
sheets[0]/rows[7][8]: AZ20007003
sheets[0]/rows[8][1]: 明細番号
sheets[0]/rows[8][8]: 0000000002
sheets[0]/rows[9][1]: 登録日
sheets[0]/rows[9][8]: 2026-10-02 00:00:00
sheets[0]/rows[10][0]: 3
sheets[0]/rows[10][1]: 証券番号
sheets[0]/rows[10][8]: AZ20007003
sheets[0]/rows[11][1]: 明細番号
sheets[0]/rows[11][8]: 0000000003
sheets[0]/rows[12][1]: 登録日
sheets[0]/rows[12][8]: 2026-10-30 23:59:59
sheets[0]/rows[13][0]: 4
sheets[0]/rows[13][1]: 証券番号
sheets[0]/rows[13][8]: AZ20007003
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
- errorCode = "MAZG000E001"  <- boundary.json
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
- loginUrl = "/AMB/dummy.html"  <- boundary.json
- menuSelector = "input[name=menu_cm]"  <- boundary.json
- pointCheck = "?"  <- boundary.json
- policyNo = "AZ11001"  <- auto.json
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
- user = "?"  <- boundary.json
- userId = "MS3N"  <- boundary.json
params total=38, auto-fallback=32: sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-AGT-LIST-SEARCH  rows 14..16  status3=coded
  screen=代理店 不備一覧(AMC22) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(部店コード) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目(証券番号) sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 不備一覧画面 表示 sel="#gyoumu_list a" val=""
### BLK-AZ-AGT-LIST-SEARCH  rows 17..19  status3=coded
  screen=代理店 不備一覧(AMC22) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(部店コード) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目(証券番号) sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 不備一覧画面 表示 sel="#gyoumu_list a" val=""
### BLK-AZ-AGT-LIST-SEARCH  rows 20..22  status3=coded
  screen=代理店 不備一覧(AMC22) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(部店コード) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目(証券番号) sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 不備一覧画面 表示 sel="#gyoumu_list a" val=""
### BLK-AZ-AGT-LIST-SEARCH  rows 23..25  status3=coded
  screen=代理店 不備一覧(AMC22) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目(部店コード) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目(証券番号) sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 不備一覧画面 表示 sel="#gyoumu_list a" val=""

## 5. 本次运行结果（块级）
- BLK-AZ-AGT-LIST-SEARCH  pass  rows None..None
- BLK-AZ-AGT-LIST-SEARCH  pass  rows None..None
- BLK-AZ-AGT-LIST-SEARCH  pass  rows None..None
- BLK-AZ-AGT-LIST-SEARCH  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r16 表示|不備一覧画面 file=02_r016_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [OK ] r19 表示|不備一覧画面 file=03_r019_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [OK ] r22 表示|不備一覧画面 file=04_r022_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [OK ] r25 表示|不備一覧画面 file=05_r025_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-200-07-003/01_menu.png
- logs/AZ-200-07-003/02_r016_不備一覧画面.png
- logs/AZ-200-07-003/03_r019_不備一覧画面.png
- logs/AZ-200-07-003/04_r022_不備一覧画面.png
- logs/AZ-200-07-003/05_r025_不備一覧画面.png
- logs/AZ-200-07-003/09_BLK-AZ-AGT-LIST-SEARCH.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
