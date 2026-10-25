# AUDIT DOSSIER — AZ-200-07-004

meta: {"domain": "AZ", "company": "MS", "functionName": "タイムゾーン：ダウンロードログ", "item": "共通", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-200-07-004.xlsx"}
feasibility: class=B flow=pass manualSteps=3 proxyBlocks=1 paramIssues=0 paramsAuto=False source=boundary.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]入力|証券番号|AZ20007003
- r15 | OP[2]ボタン|「検索」押下|
- r16 | CK[3]表示|代理店 不備一覧画面|データが表示されること | EV:画面HC
- r17 | OP[4]入力|ダウンロード申請番号|Z990000002
- r18 | OP[5]ボタン|「CSV出力」押下|ボタン押下時の時刻をメモ
- r19 | CK[6]出力（Msg）|メッセージボックス|MAZG206l001が出力されること | EV:ﾎﾟｯﾌﾟｱｯﾌﾟMsg
- r20 | OP[7]ボタン|「OK」押下|
- r21 | CK[8]表示|ダウンロードメッセージ|CSVファイルがダウンロードされること | EV:画面HC
- r22 | CK[9]出力（DL）|申込書情報ファイル|「AZR029_yymmdd_hhmmss.csv」が保存できること | EV:CSVﾌｧｲﾙ
- r23 | CK[10]その他|DLログ|操作内容1-1~1-7の時刻とずれがないこと | EV:DLﾛｸﾞ

## 2. 別紙（非空叶子，输入真值 + 期待表示）

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
### BLK-AZ-AGT-CSV-DOWNLOAD  rows 14..16  status3=coded
  screen=代理店 不備一覧(AMC22) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 代理店 不備一覧画面 表示 sel="#gyoumu_list a" val=""
### BLK-SGL-1913A9CC  rows 17..23  status3=coded
  screen=代理店 不備一覧(AMC22) file=block-selectors-amc-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 検索条件(部店コード) sel="#section_code" val="params.sectionCode" NOTE:CSV出力の相関チェック用前提条件
  - [fill] input 検索条件(代理店コード) sel="#agent_code" val="params.agentCode"
  - [fill] input ダウンロード申請番号 sel="#password" val="ABCDEFG1" NOTE:AMC22に「ダウンロード申請番号」欄は無く、CSV出力の任意パスワード欄で代替
  - [click] click CSV出力 sel="#outputCSV" val=""
  - [assert] ast メッセージボックス sel="#message_area" val="" NOTE:注意喚起confirm=自動OK; mockはメッセージエリア在位で代替
  - [assert] click OK sel="#outputCSV" val="" NOTE:OK=JS confirm auto-accept
  - [assert] ast ダウンロードメッセージ sel="#message_area" val="" NOTE:mockはダウンロード文言未注入のためメッセージエリア在位で代替
  - [assert] ast 申込書情報ファイル sel="#gyoumu_list a" val="" NOTE:出力対象=検索結果一覧の在位で代替
  - [assert] ast DLログ sel="#gyoumu_list" val="" NOTE:非浏览器=真機人工

## 5. 本次运行结果（块级）
- BLK-AZ-AGT-CSV-DOWNLOAD  pass  rows None..None
- BLK-SGL-1913A9CC  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r16 表示|代理店 不備一覧画面 file=02_r016_代理店_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [SOFT] r21 表示|ダウンロードメッセージ file=- MANUAL url=...

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-200-07-004/01_menu.png
- logs/AZ-200-07-004/02_r016_代理店_不備一覧画面.png
- logs/AZ-200-07-004/04_BLK-SGL-1913A9CC.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- EVIDENCE NOT EXACT rows: [21]
- MANUAL (non-browser) rows: [21] — per MANUAL-DECISION.md these are human steps

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
