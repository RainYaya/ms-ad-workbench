# AUDIT DOSSIER — AZ-160-03-001

meta: {"domain": "AZ", "company": "MS", "functionName": "送り状（機械）", "item": "帳票出力", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-160-03-001.xlsx"}
feasibility: class=B flow=pass manualSteps=0 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | CK[3]表示|不備一覧画面|2-1にて入力したデータが検索結果に / 表示されていることを確認 | EV:画面HC
- r19 | OP[4]クリック|「No.1」リンク押下|
- r20 | CK[5]遷移|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r21 | OP[1]ボタン|「送り状印刷」押下|
- r22 | CK[2]出力（DL）|帳票|【別紙】送り状（機械） / 出力内容：１参照 | EV:PDFﾌｧｲﾙ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AF8
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[3][0]: 1
sheets[0]/rows[3][1]: 部店課支社コード
sheets[0]/rows[3][8]: AED61
sheets[0]/rows[4][1]: 代理店コード
sheets[0]/rows[4][8]: 1003
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ16003001
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000001
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AH20
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[3][0]: 1
sheets[1]/rows[3][1]: 証券番号
sheets[1]/rows[3][10]: AZ16003001
sheets[1]/rows[4][1]: 明細番号
sheets[1]/rows[4][10]: 0000000001
sheets[1]/rows[5][1]: 部店課支社コード
sheets[1]/rows[5][10]: AED61
sheets[1]/rows[6][1]: 代理店コード
sheets[1]/rows[6][10]: 1003
sheets[1]/rows[7][1]: 代理店名
sheets[1]/rows[7][10]: 株式会社　滞🈶
sheets[1]/rows[8][1]: 募集人 
sheets[1]/rows[8][10]: 募集人IDに紐づく名称
sheets[1]/rows[9][1]: 照会ID
sheets[1]/rows[9][10]: 「自動設定」（シーケンスにより設定させるため）
sheets[1]/rows[10][1]: 種目
sheets[1]/rows[10][10]: 新種
sheets[1]/rows[11][1]: 保険種類
sheets[1]/rows[11][10]: 契約保証
sheets[1]/rows[12][1]: 保険始期日
sheets[1]/rows[12][10]: 2022/02/01
sheets[1]/rows[13][1]: 変更日
sheets[1]/rows[13][10]: 2024/05/30
sheets[1]/rows[14][1]: 契約者名
sheets[1]/rows[14][10]: 契約　テスト
sheets[1]/rows[15][1]: 点検区分
sheets[1]/rows[15][10]: 機械
sheets[1]/rows[16][1]: 連携
sheets[1]/rows[16][10]: 代理店
sheets[1]/rows[17][1]: 営業対応状況
sheets[1]/rows[17][10]: 完了
sheets[1]/rows[18][1]: 代理店対応状況
sheets[1]/rows[18][10]: 完了

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "1003"  <- generated.json
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
- policyNo = "AZ16003001"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AED61"  <- generated.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=30: user,pointCheck,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-MENU-SEARCH-LIST  rows 14..15  status3=coded
  screen=AZG001→AZG200 file=block-selectors-az200.json
  - [goto] goto start screen sel="" val=""
  - [click] click 検索 sel="#act001to200" val=""
  - [assert] ast 遷移 不備一覧 sel="#select" val=""
### BLK-SHR-B42FB7FD  rows 16..22  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] inputBundle 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 証券番号 sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 明細番号 sel="#sub_policy_number" val="params.detailNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No.1 sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="input[name='update']" val=""
  - [click] click 送り状印刷 sel="input[name='printInvoicePDF']" val=""
  - [assert] ast 帳票(送り状)出力 sel="input[name='update']" val="" NOTE:帳票(送り状)DL=真機人工（mockは画面再表示のみ）

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SHR-B42FB7FD  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r18 表示|不備一覧画面 file=03_r018_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r20 遷移|不備内容入力画面-更新 file=05_r020_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-160-03-001/01_menu.png
- logs/AZ-160-03-001/02_r015_不備一覧画面.png
- logs/AZ-160-03-001/03_r018_不備一覧画面.png
- logs/AZ-160-03-001/05_r020_不備内容入力画面-更新.png
- logs/AZ-160-03-001/06_BLK-SHR-B42FB7FD.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
