# AUDIT DOSSIER — AZ-150-11-002

meta: {"domain": "AZ", "company": "AD", "functionName": "メール通知先変換（正常終了）", "item": "業務（随時）", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-150-11-002.xlsx"}
feasibility: class=B flow=pass manualSteps=3 proxyBlocks=1 paramIssues=0 paramsAuto=False source=boundary.json
status3(case)=coded  runner_status=pass  blocks=1 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１参照
- r15 | CK[2]その他|操作結果|- | EV:画面HC
- r16 | CK[3]その他|APログ|登録件数が想定通りであること | EV:APﾛｸﾞ
- r17 | CK[4]その他|メール通知先変換テーブル|【別紙】事前準備.xlsx　のシート「登録ファイル」通りにデータが反映されていること | EV:DBﾀﾞﾝﾌﾟ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:Y8
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[2][1]: 新環境：バッチサーバ（EC2）（疑似環境）で実行
sheets[0]/rows[3][0]: 1
sheets[0]/rows[3][1]: 実行コマンド
sheets[0]/rows[3][8]: cd /proj/mhkcm/AD/AP/mhk/lib
sheets[0]/rows[4][8]: java -jar AZB025A.jar
sheets[0]/rows[5][8]: echo $status
sheets[0]/rows[6][8]: 戻り値が0であること

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
### BLK-AZ-BATCH-CONVERT-MAIL  rows 14..17  status3=coded
  screen=menu file=block-selectors-boundary.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast バッチ入口確認 sel="#act001to201" val="" NOTE:JP1バッチ実行+テーブル/ログ確認=非浏览器人工

## 5. 本次运行结果（块级）
- BLK-AZ-BATCH-CONVERT-MAIL  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 その他|操作結果 file=02_r015_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-150-11-002/01_menu.png
- logs/AZ-150-11-002/02_r015_操作結果.png
- logs/AZ-150-11-002/03_BLK-AZ-BATCH-CONVERT-MAI.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
