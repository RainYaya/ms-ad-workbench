# AUDIT DOSSIER — AZ-111-03-005

meta: {"domain": "AZ", "company": "MS", "functionName": "排他エラー確認：完了取消ボタン", "item": "不備登録", "documentType": "STANDARD", "sourceFile": "結合試験 試験手順書 AZ-111-03-005.xlsx"}
feasibility: class=A flow=pass manualSteps=0 proxyBlocks=0 paramIssues=0 paramsAuto=False source=generated.json
status3(case)=coded  runner_status=pass  blocks=4 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]ボタン|「検索」押下|
- r15 | CK[2]遷移|不備一覧画面|初期値 | EV:画面HC
- r16 | OP[1]入力|各項目に入力|【別紙】操作内容 入力内容：１参照
- r17 | OP[2]ボタン|「検索」押下|
- r18 | OP[3]クリック|「No.」リンク押下|
- r19 | CK[4]遷移|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：１参照 | EV:画面HC
- r20 | OP[1]ボタン|「更新」押下|点検区分が事務Sのユーザで他端末にログインし、他端末で更新ボタンを押下する
- r21 | CK[2]表示|不備内容入力画面-更新|【別紙】表示内容（他端末での画面確認） / 表示内容：２参照 | EV:画面HC
- r22 | OP[3]ボタン|「完了取消」押下|
- r23 | CK[4]表示|不備内容入力画面-更新|【別紙】表示内容 / 表示内容：３参照 | EV:画面HC

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AG22
sheets[0]/rows[0][0]: ○登録内容
sheets[0]/rows[2][0]: 1
sheets[0]/rows[2][1]: 証券番号
sheets[0]/rows[2][8]: AZ11103
sheets[0]/rows[3][1]: 明細番号
sheets[0]/rows[3][8]: 0000000005
sheets[0]/rows[4][1]: 依頼区分
sheets[0]/rows[4][8]: 照会
sheets[0]/rows[5][1]: 点検区分
sheets[0]/rows[5][8]: 営業
sheets[0]/rows[6][1]: 更新者
sheets[0]/rows[6][8]: 営業のユーザ
sheets[0]/rows[7][1]: 完了日
sheets[0]/rows[7][8]: 日付が入っていること
sheets[0]/rows[7][31]: ※完了登録済のデータ
sheets[0]/rows[8][1]: 連携
sheets[0]/rows[8][8]: 営業
sheets[0]/rows[8][31]: ※営業連携済
sheets[0]/rows[9][1]: 営業対応状況
sheets[0]/rows[9][8]: 完了
sheets[0]/rows[10][1]: 代理店対応状況
sheets[0]/rows[10][8]: 完了
sheets[0]/rows[11][1]: 不備情報　（繰り返し項目）
sheets[0]/rows[12][1]: 1
sheets[0]/rows[12][2]: 項目名
sheets[0]/rows[12][8]: T0：損保取引確認書
sheets[0]/rows[13][2]: 照会内容
sheets[0]/rows[13][8]: T007：「損保取引確認書」の添付がもれています。
sheets[0]/rows[14][2]: 不備内容
sheets[0]/rows[14][8]: （任意）
sheets[0]/rows[15][2]: 代理店照会
sheets[0]/rows[15][8]: 要
sheets[0]/rows[16][1]: 2
sheets[0]/rows[16][2]: 項目名
sheets[0]/rows[16][8]: T0：損保取引確認書
sheets[0]/rows[17][2]: 照会内容
sheets[0]/rows[17][8]: T001：支払請求書：〔請求日・代理店・扱者/仲立人・課支社受付日〕記入もれです。
sheets[0]/rows[18][2]: 不備内容
sheets[0]/rows[18][8]: （任意）
sheets[0]/rows[19][2]: 代理店照会
sheets[0]/rows[19][8]: 否
sheets[0]/rows[20][1]: その他の項目
sheets[0]/rows[20][8]: （任意）
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:AF8
sheets[1]/rows[0][0]: ○ログイン情報
sheets[1]/rows[1][1]: ＭＳのユーザかつ、点検区分が「営業」のユーザを設定。
sheets[1]/rows[3][0]: ○入力内容
sheets[1]/rows[5][0]: 1
sheets[1]/rows[5][1]: 証券番号
sheets[1]/rows[5][8]: AZ11103
sheets[1]/rows[6][1]: 明細番号
sheets[1]/rows[6][8]: 0000000005
sheets[2]/name: 【別紙】表示内容
sheets[2]/type: DISPLAY
sheets[2]/range: B2:AF18
sheets[2]/rows[0][0]: ○表示内容
sheets[2]/rows[2][0]: 1
sheets[2]/rows[2][1]: 証券番号
sheets[2]/rows[2][7]: AZ11103
sheets[2]/rows[3][1]: 明細番号
sheets[2]/rows[3][7]: 0000000005
sheets[2]/rows[4][1]: 依頼区分
sheets[2]/rows[4][7]: 照会
sheets[2]/rows[5][1]: 点検区分
sheets[2]/rows[5][7]: 営業
sheets[2]/rows[6][1]: 更新者
sheets[2]/rows[6][7]: 営業のユーザ
sheets[2]/rows[7][1]: 完了日
sheets[2]/rows[7][7]: 日付が入っていること
sheets[2]/rows[7][30]: ※完了登録済のデータ
sheets[2]/rows[8][1]: 連携
sheets[2]/rows[8][7]: 営業
sheets[2]/rows[9][1]: 営業対応状況
sheets[2]/rows[9][7]: 完了
sheets[2]/rows[10][1]: 代理店対応状況
sheets[2]/rows[10][7]: 完了
sheets[2]/rows[11][0]: 2
sheets[2]/rows[11][1]: 更新者
sheets[2]/rows[11][7]: 事務Sのユーザ
sheets[2]/rows[12][1]: 完了日
sheets[2]/rows[12][7]: 日付が入っていること
sheets[2]/rows[13][1]: 連携
sheets[2]/rows[13][7]: 営業
sheets[2]/rows[14][1]: 営業対応状況
sheets[2]/rows[14][7]: 完了
sheets[2]/rows[15][1]: 代理店対応状況
sheets[2]/rows[15][7]: 完了
sheets[2]/rows[16][0]: 3
sheets[2]/rows[16][1]: エラーメッセージ
sheets[2]/rows[16][7]: MAZG101W050のエラーメッセージが出力されること
sheets[2]/rows[16][30]: 左記メッセージが画面のメッセージ領域に表示されることを確認

## 3. 生效参数（runner 实际取值 + 来源文件）
- agentCode = "252H"  <- az-update.json
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
- policyNo = "AZ11103"  <- generated.json
- reminderDate = "2026/10/30"  <- auto.json
- requestType = "照会"  <- auto.json
- sectionCode = "AHE61"  <- az-update.json
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
### BLK-AZ-LIST-FILTER-OPEN-UPDATE  rows 16..19  status3=coded
  screen=AZG200→AZG101 file=block-selectors-az200.json
  - [fill] inputBundle 各項目 sel="#policy_number" val="params.policyNo"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 結果表示 sel="#gyoumu_list tr" val=""
  - [click] click No.リンク sel="#gyoumu_list a[name=link]" val=""
  - [assert] ast 遷移 更新画面 sel="input[name=\"update\"]" val=""
### BLK-AUTO-E0B41407  rows 20..21  status3=coded
  screen=AZG101 file=block-selectors-az-update2.json
  - [click] click 更新 sel="input[name='update']" val=""
  - [assert] ast 表示確認 sel="input[name='update']" val=""
### BLK-SHR-72F034C6  rows 22..23  status3=coded
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 完了取消 sel="input[name='cancelCompleteDate']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val=""

## 5. 本次运行结果（块级）
- BLK-AZ-MENU-SEARCH-LIST  pass  rows None..None
- BLK-AZ-LIST-FILTER-OPEN-UPDATE  pass  rows None..None
- BLK-AUTO-E0B41407  pass  rows None..None
- BLK-SHR-72F034C6  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 遷移|不備一覧画面 file=02_r015_不備一覧画面.png url=...http://127.0.0.1:10097/AMB/AMA07.html
- [OK ] r19 遷移|不備内容入力画面-更新 file=04_r019_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r21 表示|不備内容入力画面-更新 file=05_r021_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html
- [OK ] r23 表示|不備内容入力画面-更新 file=07_r023_不備内容入力画面-更新.png url=...http://127.0.0.1:10097/AMB/AMA04.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AZ-111-03-005/01_menu.png
- logs/AZ-111-03-005/02_r015_不備一覧画面.png
- logs/AZ-111-03-005/04_r019_不備内容入力画面-更新.png
- logs/AZ-111-03-005/05_r021_不備内容入力画面-更新.png
- logs/AZ-111-03-005/07_r023_不備内容入力画面-更新.png
- logs/AZ-111-03-005/09_BLK-SHR-72F034C6.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
