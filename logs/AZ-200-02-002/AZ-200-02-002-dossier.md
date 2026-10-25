# AUDIT DOSSIER — AZ-200-02-002

meta: {"domain": "AZ", "company": "AD", "functionName": "開閉局", "item": "共通", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-200-02-002.xlsx"}
feasibility: class=B flow=pass manualSteps=5 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]その他|閉局用のシェルスクリプトを実行|【別紙】操作内容 入力内容：１参照
- r15 | CK[2]表示|画面HC|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r16 | OP[1]入力|ログイン画面|※開局前
- r17 | OP[2]ボタン|ログイン|
- r18 | CK[3]遷移|閉局画面|閉局画面が表示されること / （ログインできない） | EV:画面HC
- r19 | OP[1]その他|開局用のシェルスクリプトを実行|【別紙】操作内容 入力内容：２参照
- r20 | CK[2]表示|画面HC|【別紙】表示内容 / 表示内容：２参照 | EV:画面HC
- r21 | OP[1]入力|ログイン画面|※開局後
- r22 | OP[2]ボタン|ログイン|
- r23 | CK[3]遷移|不備一覧画面|遷移すること | EV:画面HC
- r24 | OP[1]クリック|「No」リンク|任意のデータ
- r25 | CK[2]遷移|回答入力画面|遷移すること | EV:画面HC
- r26 | OP[1]その他|閉局用のシェルスクリプトを実行|【別紙】操作内容 入力内容：３参照
- r27 | CK[2]表示|画面HC|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC
- r28 | OP[1]ボタン|不備一覧|※閉局後
- r29 | CK[2]遷移|閉局画面|閉局画面が表示されること | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】操作内容
sheets[0]/type: OPERATION
sheets[0]/range: B2:AV9
sheets[0]/rows[0][0]: ○入力内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 実行方法（※1）
sheets[0]/rows[2][9]: JP1Viewより「/Mi92_AZ/RINJI/AZYD4」を右クリックし、「登録実行...」を押し→「即時実行」を選択→「OK」を押す。
sheets[0]/rows[3][0]: 2
sheets[0]/rows[3][1]: 実行方法（※2）
sheets[0]/rows[3][9]: JP1Viewより「/Mi92_AZ/RINJI/AZYD2」を右クリックし、「登録実行...」を押し→「即時実行」を選択→「OK」を押す。
sheets[0]/rows[4][0]: 3
sheets[0]/rows[4][1]: 実行方法（※1）
sheets[0]/rows[4][9]: JP1Viewより「/Mi92_AZ/RINJI/AZYD4」を右クリックし、「登録実行...」を押し→「即時実行」を選択→「OK」を押す。
sheets[0]/rows[6][1]: ※1
sheets[0]/rows[6][3]: AZYD4：閉局(申込書品質管理)(代理店)(AD)
sheets[0]/rows[7][1]: ※2
sheets[0]/rows[7][3]: AZYD2：開局(申込書品質管理)(代理店)(AD)
sheets[1]/name: 【別紙】表示内容
sheets[1]/type: DISPLAY
sheets[1]/range: B2:AV9
sheets[1]/rows[0][0]: ○表示内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: 実行方法（※1）
sheets[1]/rows[2][9]: ジョブネットモニタより「/Mi92_AZ/RINJI/AZYD4」を右クリックし、「ジョブネットモニタ」→「結果を表示」を選択し、戻り値が0で正常終了していること
sheets[1]/rows[3][0]: 2
sheets[1]/rows[3][1]: 実行方法（※2）
sheets[1]/rows[3][9]: ジョブネットモニタより「/Mi92_AZ/RINJI/AZYD2」を右クリックし、「ジョブネットモニタ」→「結果を表示」を選択し、戻り値が0で正常終了していること
sheets[1]/rows[4][0]: 3
sheets[1]/rows[4][1]: 実行方法（※1）
sheets[1]/rows[4][9]: ジョブネットモニタより「/Mi92_AZ/RINJI/AZYD4」を右クリックし、「ジョブネットモニタ」→「結果を表示」を選択し、戻り値が0で正常終了していること
sheets[1]/rows[6][1]: ※1
sheets[1]/rows[6][3]: AZYD4：閉局(申込書品質管理)(代理店)(AD)
sheets[1]/rows[7][1]: ※2
sheets[1]/rows[7][3]: AZYD2：開局(申込書品質管理)(代理店)(AD)

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
- startSelector = "#act001to100"  <- auto.json
- startUrl = "/AMB/AMA01.html"  <- auto.json
- subAgentCode = "123456"  <- auto.json
- sumupSectionCode = "ABC012"  <- auto.json
- sumupStatus = "1"  <- auto.json
- sumupYearMonth = "2026/11"  <- auto.json
- user = "?"  <- auto.json
params total=34, auto-fallback=34: user,pointCheck,sectionCode,agentCode,policyNo,detailNo,inquiryId,fieldAgentId,inputType,largeItemValue,insuranceLabel,itemCode,applicationType,sumupStatus,freeCode,subAgentCode,customerName,startDate,sumupYearMonth,dailyReportSend,sumupSectionCode,reminderDate,inquiryCode,itemName,inquiryContent,defectContent,editedInquiryContent,confirmer,counterparty,completeErrorCode,inquiryMethod,requestType,startUrl,startSelector

## 4. 积木组成与 selector 步骤
### BLK-AZ-OPEN-CLOSE-SYS  rows 14..19  status3=coded
  screen=dummy-login->menu file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 運用AP 閉局用シェル実行/画面HC sel="input[name=UserID]" val="" NOTE:閉局用シェルスクリプト実行+画面HC=非浏览器=真機人工
  - [fill] input ログイン画面 sel="input[name=UserID]" val="0000000001"
  - [click] click ログイン sel="input[name=menu_cm]" val=""
  - [assert] ast 遷移 閉局画面 sel="#act001to100" val="" NOTE:閉局画面(ログイン不可)=真機人工; mockはダミーログイン遷移で代替確認
  - [assert] ast 運用AP 開局用シェル実行/画面HC sel="#act001to200" val="" NOTE:開局用シェルスクリプト実行+画面HC=非浏览器=真機人工
### BLK-SHR-01CAB10D  rows 20..29  status3=coded
  screen=dummy-login->AMC22->AMC23 file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 画面HC(ログイン前) sel="input[name=UserID]" val="" NOTE:運用AP画面HC/シェル=非浏览器=真機人工
  - [fill] input ログイン画面 sel="input[name=UserID]" val="0000000001"
  - [click] click ログイン sel="input[name=menu_cm]" val=""
  - [assert] ast 遷移 不備一覧 sel="#act001to100" val="" NOTE:ログイン後メニュー到達を確認（不備一覧は次step）
  - [goto] goto 代理店 不備一覧 sel="" val=""
  - [click] click No sel="#link_tag" val=""
  - [assert] ast 遷移 回答入力 sel="#act104to22" val="" NOTE:AMC23 不備内容入力(回答入力)表示
  - [assert] ast 運用AP 閉局シェル/画面HC sel="#act104to22" val="" NOTE:閉局用シェルスクリプト実行+画面HC=非浏览器=真機人工
  - [click] click 不備一覧 sel="#act104to22" val=""
  - [assert] ast 遷移 閉局 sel="#select" val="" NOTE:閉局画面=真機人工（mockは不備一覧へ戻るのみ）

## 5. 本次运行结果（块级）
- BLK-AZ-OPEN-CLOSE-SYS  pass  rows None..None
- BLK-SHR-01CAB10D  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 表示|画面HC file=02_r015_画面HC.png url=...http://127.0.0.1:10097/AMB/dummy.html
- [SOFT] r18 遷移|閉局画面 file=- MANUAL url=...
- [OK ] r20 表示|画面HC file=03_r020_画面HC.png url=...http://127.0.0.1:10097/AMB/dummy.html
- [OK ] r23 遷移|不備一覧画面 file=05_r023_不備一覧画面.png url=...http://127.0.0.1:10097/AMC00/AMC22.html
- [OK ] r25 遷移|回答入力画面 file=06_r025_回答入力画面.png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [OK ] r27 表示|画面HC file=07_r027_画面HC.png url=...http://127.0.0.1:10097/AMC00/AMC23.html
- [SOFT] r29 遷移|閉局画面 file=- MANUAL url=...

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-200-02-002/01_menu.png
- logs/AZ-200-02-002/02_r015_画面HC.png
- logs/AZ-200-02-002/03_r020_画面HC.png
- logs/AZ-200-02-002/05_r023_不備一覧画面.png
- logs/AZ-200-02-002/06_r025_回答入力画面.png
- logs/AZ-200-02-002/07_r027_画面HC.png
- logs/AZ-200-02-002/08_BLK-SHR-01CAB10D.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- EVIDENCE NOT EXACT rows: [18, 29]
- MANUAL (non-browser) rows: [18, 29] — per MANUAL-DECISION.md these are human steps

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
