# AUDIT DOSSIER — AZ-120-03-002

meta: {"domain": "AZ", "company": "AD", "functionName": "一括完了", "item": "不備検索", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-120-03-002.xlsx"}
feasibility: class=C flow=pass manualSteps=0 proxyBlocks=1 paramIssues=1 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|選択チェックボックス|全てチェックオンにする
- r19 | OP[4]ボタン|「完了登録」押下|「完了登録」押下前に、全てのデータを他のユーザで「依頼区分」について、「連絡」から「照会」に変更する
- r20 | CK[5]表示|不備内容入力画面－更新|依頼区分が「照会」かつ完了日が空白であること / （操作内容2-4を行ったユーザの画面で確認する） | EV:画面HC
- r21 | CK[6]表示|不備一覧画面|「MAZG200W024」のエラーメッセージが表示されること | EV:画面HC
- r22 | OP[7]入力|各項目に入力|【別紙】操作内容 入力内容：２参照
- r23 | OP[8]ボタン|「検索」押下|
- r24 | OP[9]クリック|選択チェックボックス|全てチェックオンにする（No.１とNo.2のデータ）
- r25 | OP[10]ボタン|「完了登録」押下|
- r26 | CK[10]表示|不備一覧画面|項番2-8でチェックオンにしたデータが非表示になること | EV:画面HC
- r27 | OP[11]クリック|「4:完了」チェックボックス|チェックボックスオンにする
- r28 | OP[12]ボタン|「検索」押下|
- r29 | CK[13]表示|不備一覧画面|項番2-8でチェックオンにしたデータが表示されること | EV:画面HC
- r30 | OP[14]クリック|No.リンク|項番2-8でチェックオンにしたデータ
- r31 | CK[15]表示|不備内容入力画面－更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AF14
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: エラーとなるデータ
sheets[0]/rows[3][0]: 1
sheets[0]/rows[3][1]: 証券番号
sheets[0]/rows[3][8]: AZ12003
sheets[0]/rows[4][1]: 明細番号
sheets[0]/rows[4][8]: 0000000001
sheets[0]/rows[5][1]: 依頼区分
sheets[0]/rows[5][8]: 連絡
sheets[0]/rows[6][1]: その他の項目
sheets[0]/rows[6][8]: （任意）
sheets[0]/rows[8][0]: 正常なデータ（コピー登録で同じデータを2つ用意しておくこと）
sheets[0]/rows[9][0]: 1
sheets[0]/rows[9][1]: 証券番号
sheets[0]/rows[9][8]: AZ12003
sheets[0]/rows[10][1]: 明細番号
sheets[0]/rows[10][8]: 0000000002
sheets[0]/rows[11][1]: 依頼区分
sheets[0]/rows[11][8]: 連絡
sheets[0]/rows[12][1]: その他の項目
sheets[0]/rows[12][8]: （任意）
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AF10
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ADのユーザを設定。
sheets[1]/rows[3][0]: ○入力内容
sheets[1]/rows[5][0]: 1
sheets[1]/rows[5][1]: 証券番号
sheets[1]/rows[5][8]: AZ12003
sheets[1]/rows[6][1]: 明細番号
sheets[1]/rows[6][8]: 0000000001
sheets[1]/rows[7][0]: 2
sheets[1]/rows[7][1]: 証券番号
sheets[1]/rows[7][8]: AZ12003
sheets[1]/rows[8][1]: 明細番号
sheets[1]/rows[8][8]: 0000000002
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AF6
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 完了日
sheets[2]/rows[2][7]: 作業日
sheets[2]/rows[3][1]: 営業対応状況
sheets[2]/rows[3][7]: 完了
sheets[2]/rows[4][1]: 代理店対応状況
sheets[2]/rows[4][7]: 完了

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- auto.json
- applicationType = "1"  <- auto.json
- completeErrorCode = "MAZG101W047"  <- auto.json
- confirmer = "TEST"  <- auto.json
- counterparty = "確認相手TEST"  <- auto.json
- customerName = "TEST"  <- auto.json
- dailyReportSend = "1234567890AB"  <- auto.json
- defectContent = "添付書類もれ"  <- auto.json
- detailNo = "0000000002"  <- generated.json
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
- policyNo = "AZ12003"  <- generated.json
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
### BLK-SGL-BDA7A359  rows 16..31  status3=coded
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] inputBundle 検索条件 sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 代理店コード sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 証券番号 sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 明細番号 sel="#sub_policy_number" val="params.detailNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click 選択チェックボックス sel="input[name='itemSelected.checked']" val=""
  - [click] click 完了登録 sel="#updateCompleteDate" val=""
  - [goto] goto 完了登録後 更新画面 sel="" val=""
  - [assert] ast 表示 不備内容入力画面-更新 sel="input[name='update']" val="" NOTE:完了登録エラー時の画面=真機人工
  - [goto] goto 不備一覧へ戻る sel="" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [fill] inputBundle 検索条件(2回目) sel="#section_code" val="params.sectionCode"
  - [fill] inputBundle 代理店コード(2回目) sel="#agent_code" val="params.agentCode"
  - [fill] inputBundle 証券番号(2回目) sel="#policy_number" val="params.policyNo"
  - [fill] inputBundle 明細番号(2回目) sel="#sub_policy_number" val="params.detailNo"
  - [click] click 検索(2回目) sel="#select" val=""
  - [click] click 選択チェックボックス(2回目) sel="input[name='itemSelected.checked']" val=""
  - [click] click 完了登録(2回目) sel="#updateCompleteDate" val=""
  - [assert] ast 表示 不備一覧画面(2回目) sel="#gyoumu_list tr" val=""
  - [click] click 4:完了チェックボックス sel="#complete_status" val=""
  - [click] click 検索(3回目) sel="#select" val=""
  - [assert] ast 表示 不備一覧画面(3回目) sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 表示 不備内容入力画面-更新 sel="input[name='update']" val=""

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-SGL-BDA7A359  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r20 表示|不備内容入力画面-更新 file=04_r020_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r21 表示|不備一覧画面 file=05_r021_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r26 表示|不備一覧画面 file=06_r026_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r29 表示|不備一覧画面 file=07_r029_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r31 表示|不備内容入力画面-更新 file=08_r031_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-120-03-002/01_menu.png
- logs/AZ-120-03-002/02_r015_不備一覧画面.png
- logs/AZ-120-03-002/04_r020_不備内容入力画面-更新.png
- logs/AZ-120-03-002/05_r021_不備一覧画面.png
- logs/AZ-120-03-002/06_r026_不備一覧画面.png
- logs/AZ-120-03-002/07_r029_不備一覧画面.png
- logs/AZ-120-03-002/08_r031_不備内容入力画面-更新.png
- logs/AZ-120-03-002/09_BLK-SGL-BDA7A359.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
