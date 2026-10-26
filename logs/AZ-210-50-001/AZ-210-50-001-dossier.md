# AUDIT DOSSIER — AZ-210-50-001

meta: {"domain": "AZ", "company": "MS", "functionName": "シナリオ導線５０（現新あり）", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-210-50-001.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=1 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r15 | OP[2]ボタン|「検索」押下|
- r16 | OP[3]クリック|「No.」リンク押下|
- r17 | CK[4]遷移|代理店 不備内容入力画面（更新）|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r18 | CK[5]その他|APログ|ログに出力されること | EV:APﾛｸﾞ
- r19 | CK[6]その他|DBログ|ログに出力されること | EV:DBﾛｸﾞ
- r20 | CK[7]その他|申込書テーブル|- | EV:DBﾀﾞﾝﾌﾟ
- r21 | CK[8]その他|申込不備テーブル|- | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AG8
sheets[0]/rows[0][0]: ○ログイン情報
sheets[0]/rows[1][1]: ＭＳのユーザかつ、申込書の操作が可能なユーザを設定。
sheets[0]/rows[3][0]: ○入力内容
sheets[0]/rows[5][0]: 1
sheets[0]/rows[5][1]: 証券番号
sheets[0]/rows[5][8]: AZ21036
sheets[0]/rows[5][31]: シナリオID
sheets[0]/rows[6][1]: 明細番号
sheets[0]/rows[6][8]: 0000000045
sheets[0]/rows[6][31]: シナリオの枝番
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AF5
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 4
sheets[1]/rows[2][1]: メッセージエリア
sheets[1]/rows[2][7]: メッセージID:MAZG206W100が表示されること
sheets[1]/rows[3][1]: 申込情報
sheets[1]/rows[3][7]: 一覧にデータが表示されないこと

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- AMC00.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000045"  <- generated.json
- editedInquiryContent = "編集済み。"  <- auto.json
- fieldAgentId = "3028004586"  <- AMC00.json
- freeCode = "1234567890"  <- AMC00.json
- inputType = "2"  <- auto.json
- inquiryCode = "T007"  <- auto.json
- inquiryContent = "T007：「損保取引確認書」の添付がもれています。"  <- auto.json
- inquiryId = "0000000012"  <- AMC00.json
- inquiryMethod = "1：品質管理"  <- auto.json
- insuranceLabel = "00 ： 自賠責"  <- auto.json
- itemCode = "T0"  <- auto.json
- itemName = "T0：損保取引確認書"  <- auto.json
- largeItemValue = "B"  <- auto.json
- pointCheck = "?"  <- AMC00.json
- policyNo = "AZ21036"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- AMC00.json
- startDate = "2026/11/01"  <- auto.json
- startSelector = "#select"  <- AMC00.json
- startUrl = "/AMC00/AMC22.html"  <- AMC00.json
- subAgentCode = "123456"  <- AMC00.json
- subPolicyNo = "0012"  <- AMC00.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- AMC00.json
params total=35, auto-fallback=22: inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType

## 4. 积木组成与 selector 步骤
### BLK-AUTO-DDA3A833  rows 14..17  status3=coded
  screen=代理店不備一覧(AMC22)→代理店 不備内容入力画面(更新)(AMC23) file=block-selectors-ag.json
  - [goto] goto start screen sel="" val=""
  - [fill] inputBundle 各項目 sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 各項目 sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.inquiryId"
  - [fill] inputBundle 各項目 sel="#field_agent_id" val="params.fieldAgentId"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果行 sel="#gyoumu_list a" val=""
  - [click] click No.リンク sel="#link_tag" val=""
  - [assert] ast 遷移 代理店 不備内容入力画面(更新) sel="#updateTempAnswer" val=""
### BLK-SGL-E008F918  rows 18..21  status3=coded
  screen=AZG101/AMC23 file=block-selectors-sgl.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 非浏览器确认 sel="#select" val="" NOTE:AP/DB/テーブル=真機人工

## 5. 本次运行结果（块级）
- BLK-AUTO-DDA3A833  pass  rows None..None
- BLK-SGL-E008F918  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r17 遷移|代理店 不備内容入力画面(更新) file=02_r017_代理店_不備内容入力画面(更新).png url=...http://127.0.0.1:10097/AMC00/AMC23.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-210-50-001/01_menu.png
- logs/AZ-210-50-001/02_r017_代理店_不備内容入力画面(更新).png
- logs/AZ-210-50-001/04_BLK-SGL-E008F918.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
