# AUDIT DOSSIER — AY-100-08-005

meta: {"domain": "AY", "company": "MS", "functionName": "タイムゾーン：バッチでデータ登録（非Lambda）", "item": "共通", "documentType": "EXCEPTION", "sourceFile": "結合試験 試験手順書 AY-100-08-005.xlsx"}
feasibility: class=B flow=pass manualSteps=4 proxyBlocks=2 paramIssues=0 paramsAuto=True source=auto.json
status3(case)=coded  runner_status=pass  blocks=2 skipped=[]

## 1. 手順（手順書原文，操作/確認/証跡）
- r14 | OP[1]その他|バッチ実行|【別紙】操作内容 入力内容：１参照
- r15 | CK[2]その他|操作結果|- | EV:画面HC
- r16 | CK[3]その他|取消計上申請テーブル|「登録日」の時刻が、操作内容1-1の時刻とずれがないこと | EV:DBﾀﾞﾝﾌﾟ
- r17 | CK[4]その他|APログ|操作内容1-1の時刻とずれがないこと | EV:APﾛｸﾞ
- r18 | CK[5]その他|DBログ|操作内容1-1の時刻とずれがないこと | EV:DBﾛｸﾞ

## 2. 別紙（非空叶子，输入真值 + 期待表示）
sheets[0]/name: 【別紙】事前準備
sheets[0]/type: PREPARATION
sheets[0]/range: B2:AA21
sheets[0]/rows[0][0]: ○事前確認
sheets[0]/rows[1][1]: ・試験実施前に、以下テストデータとして作成予定の証券番号と明細番号に一致するデータが、取消計上申請テーブルに存在しないことを確認
sheets[0]/rows[2][1]: ※　DBダンプも取得
sheets[0]/rows[5][0]: ○テストデータ作成
sheets[0]/rows[7][1]: 計上情報ファイル
sheets[0]/rows[8][1]: FAYA001.csv
sheets[0]/rows[10][1]: 作成日時
sheets[0]/rows[10][2]: 異例管理番号
sheets[0]/rows[10][3]: 取消計上区分
sheets[0]/rows[10][4]: 課支社コード
sheets[0]/rows[10][5]: 代理店コード
sheets[0]/rows[10][6]: 大種目コード
sheets[0]/rows[10][7]: 保種コード
sheets[0]/rows[10][8]: 証券番号
sheets[0]/rows[10][9]: 明細番号
sheets[0]/rows[10][10]: 契約者名
sheets[0]/rows[10][11]: 再計上証券番号
sheets[0]/rows[10][12]: 再計上明細番号
sheets[0]/rows[10][13]: 取消保険料
sheets[0]/rows[10][14]: 申込日
sheets[0]/rows[10][15]: 始期日
sheets[0]/rows[10][16]: 届出日
sheets[0]/rows[10][17]: 取消・変更の計上日
sheets[0]/rows[10][18]: 異例取扱理由（理由コード）
sheets[0]/rows[10][19]: 変更事由1
sheets[0]/rows[10][20]: 変更事由2
sheets[0]/rows[10][21]: 変更事由3
sheets[0]/rows[10][22]: 変更事由4
sheets[0]/rows[10][23]: 変更事由5
sheets[0]/rows[10][24]: 変更事由6
sheets[0]/rows[10][25]: 予備
sheets[0]/rows[11][1]: 20260708111111
sheets[0]/rows[11][2]: M01
sheets[0]/rows[11][3]: 1
sheets[0]/rows[11][4]: ABM62
sheets[0]/rows[11][5]: 2031
sheets[0]/rows[11][6]: 1
sheets[0]/rows[11][7]: 11
sheets[0]/rows[11][8]: AY10008
sheets[0]/rows[11][9]: 0000000001
sheets[0]/rows[11][10]: テスト
sheets[0]/rows[11][13]: 1234
sheets[0]/rows[11][14]: 20260303
sheets[0]/rows[11][15]: 20260404
sheets[0]/rows[11][16]: 20260505
sheets[0]/rows[11][17]: 20260606
sheets[0]/rows[11][18]: 5
sheets[0]/rows[11][19]: 5
sheets[0]/rows[14][0]: 〇ファイル配置：EFS（疑似環境）
sheets[0]/rows[16][1]: /proj/mhkcm/MS/AP/tks/file/recv
sheets[1]/name: 【別紙】操作内容
sheets[1]/type: OPERATION
sheets[1]/range: B2:Y8
sheets[1]/rows[0][0]: ○入力内容
sheets[1]/rows[2][0]: 1
sheets[1]/rows[2][1]: バッチサーバ（EC2）（疑似環境）で実行
sheets[1]/rows[3][1]: 実行コマンド
sheets[1]/rows[3][8]: cd /proj/mhkcm/MS/AP/tks/lib
sheets[1]/rows[4][8]: java -jar AYB001.jar
sheets[1]/rows[5][8]: echo $status
sheets[1]/rows[6][8]: 戻り値が0であること

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
### BLK-AZ-BATCH-RUN-VERIFY  rows 14..15  status3=coded
  screen=BATCH(集計バッチ) file=block-selectors-batch-slice.json
  - [assert] ast バッチ実行＋操作結果/APログ確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行/操作結果/APログ(エラー件数0件)=非浏览器=真機人工（mockは画面在位で代理）
### BLK-SGL-0C5A44D1  rows 16..18  status3=coded
  screen=ANA01(batch) file=block-selectors-misc-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast 取消計上申請テーブル sel="#route3" val="" NOTE:非浏览器=真機人工（DBダンプ確認）
  - [assert] ast APログ sel="#route4" val="" NOTE:非浏览器=真機人工（APログ確認）
  - [assert] ast DBログ sel="#route5" val="" NOTE:非浏览器=真機人工（DBログ確認）

## 5. 本次运行结果（块级）
- BLK-AZ-BATCH-RUN-VERIFY  pass  rows None..None
- BLK-SGL-0C5A44D1  pass  rows None..None

## 6. 証跡索引（画面HC 取得状况）
- [OK ] r15 その他|操作結果 file=02_r015_操作結果.png url=...http://127.0.0.1:10097/AMB/AMA01.html

## 7. KEY 截图（AI 审计员必须亲眼看的）
- logs/AY-100-08-005/01_menu.png
- logs/AY-100-08-005/02_r015_操作結果.png
- logs/AY-100-08-005/04_BLK-SGL-0C5A44D1.png

## 8. 机械预检（脚本结论，AI 仍需复核）
- none — mechanical checks all green

## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）
- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）
- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail
- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail
- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配
- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json
