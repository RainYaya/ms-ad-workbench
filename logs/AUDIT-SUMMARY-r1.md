# AUDIT-SUMMARY — r1 批（B类补漏 14 本）

- 审计日: 2026-10-25 / agent: r1 / 口径: 模拟环境前端导线（bikuri 2026-10-25 拍板）
- 原则: 只新增 audit.md，未触碰 execution-status.json / blocks.json / selector / params
- 结果: **14/14 clean-with-notes**（suspicious 0、clean 0 — SOP 要求每本至少 1 疑点）

## verdict 一览

| # | caseId | 组 | 深审/组内 | verdict | 要点 |
|---|---|---|---|---|---|
| 1 | AZ-310-06-001 | 单例 | 深审 | clean-with-notes | 導線６流入部。検索块只填証券番号（明細番号未使用） |
| 2 | AZ-210-37-008 | TPL-210-37-008 代表 | 深审 | clean-with-notes | inquiryId 填入（既知）。未対応⇒対応中 0 断言 |
| 3 | AZ-210-33-001 | TPL-210-15-001 组员 | 组内 | clean-with-notes | detailNo=24 ✓。取消済/営業対応状況推移 live-pending |
| 4 | AZ-230-01-049 | 单例（20 块） | 深审 | clean-with-notes | 消息瞬间零截图、批尾块 NOTE 方向错配（新发现） |
| 5 | AZ-200-07-004 | 单例 boundary | 深审 | clean-with-notes | **fallback AZ11001 覆盖手順 AZ20007003**（新发现） |
| 6 | AZ-310-01-017 | TPL-310-01-011 代表 | 深审 | clean-with-notes | value↔label 実地検証 ✓。option 表二重源（新发现） |
| 7 | AZ-310-24-001 | 单例 | 深审 | clean-with-notes | 消息正逆対照 mock 0 証明（最 heavyweight 例） |
| 8 | AZ-210-36-002 | 单例 | 深审 | clean-with-notes | 保険種類 13 回写目視 ✓。13A0 属自動車確認 |
| 9 | AZ-210-37-010 | TPL-210-37-008 组员 | 组内 | clean-with-notes | detailNo=38 ✓。代表所見踏襲 |
| 10 | AZ-310-35-001 | TPL-110-64-001 组员 | 组内 | clean-with-notes | 事務S 条件でも pointCheck="?"（既知の適用範囲拡大） |
| 11 | AZ-200-07-006 | 单例 boundary | 深审 | clean-with-notes | バッチ案件=画面在位代理のみ。fallback 値≠別紙ﾃﾞｰﾀ（未使用） |
| 12 | AZ-310-01-019 | TPL-310-01-011 组员 | 组内 | clean-with-notes | detailNo=19 ✓。03 回写目視 ✓ |
| 13 | AZ-210-05-013 | 单例 | 深审 | clean-with-notes | **「通知しない」步骤不在**（新发现）。代理店照会「否」無検証 |
| 14 | AZ-410-08-001 | TPL-310-08-001 代表 | 深审 | clean-with-notes | 完了登録。完了日=11 固定で推移不可視 |

## 组级已知问题在本批的出现情况（标注，不计 fail）
- BLK-AUTO-DDA3A833 填 inquiryId 而非 policyNo: AZ-210-37-008 / 010（同块复用）
- planned 块混进 pass: AZ-230-01-049（BLK-SGL-F1E0B9E5）
- pointCheck auto-fallback "?": 06-001 / 33-001 / 049 / 004 / 24-001 / 36-002 / 37-008·010 / 35-001 / 006 / 05-013 / 08-001（017/019 は az-update.json の「営業」で問題なし）
- メッセージ断言缺失系: 049（#message_area 在位のみ）/ 24-001（皆無）/ 017 / 036 / 05-013（別系統: 手順網羅性欠落）
- AZG900 静的 T0/T007: 06-001 / 049 / 017 / 019 / 36-002 / 05-013 / 08-001（itemCode/inquiryCode が template 共通値）
- AY 検索积木硬编码 AY11001: 本批无 AY 手順，未出现

## 新发现（r1 批，需 bikuri 拍板）
1. **fallback 値が手順/別紙の明記値を上書き（boundary 组）**: AZ-200-07-004 は手順 r14 の証券番号
   AZ20007003 に対し policyNo=AZ11001（auto.json）で fill しており、真機では検索対象そのものが変わる。
   AZ-200-07-006 も別紙テストデータ AZ20007006 に対し同様の定義ずれ（こちらは fill 未使用で無害）。
2. **ダウンロード申請番号の入力ステップ不在**: AZ-200-07-004 r17（Z990000002）に対応する fill がなく、
   CSV出力の任意パスワード欄（ABCDEFG1）で代替（NOTE あり）。タイムゾーン検証の時刻照合キーが欠落。
3. **メッセージ表示瞬間の証跡ゼロ**: AZ-230-01-049 r36 の截图が不備一覧遷移後の AMC22 で撮られ、
   一時中断メッセージ（MAZG104l101）の画面が一客も存在しない。メッセージ断言自体が area 在位のみ。
4. **バッチ尾块の NOTE 期待方向错配**: AZ-230-01-049 r74-75（送信済 再確認）に「レコード無し」NOTE の块、
   r81（追記されない）に「追記・送信済」NOTE の块が当たっており、18時/20時の正逆期待が块側で逆転。
   実行順も r74-75 が r78-81 の後に回る。真機検証時に再対応付けが必要（mock 結果は無害）。
5. **手順網羅性欠落「通知しない」**: AZ-210-05-013 r48 の「通知しない」押下に対応する自動化ステップが
   ない（営業連携→NOTE で dialog 真機人工→OK）。打鍵数が手順と合わない。
6. **option 表の二重源**: automation/screens/AZG100_input.html（設計サンプル: 1=自動車/5=新種）と
   mock-src/AMB/AMA03.html（実サービス: 5=自動車/B=自賠責）で option 表が食い違い、前者を参照すると
   誤判定する。PLAYBOOK の「mock-src の option 表」の実体は mock-src/AMB 以下、と明記推奨。
7. **検索块の明細番号未使用（AZG 系共通）**: 別紙が証券番号＋明細番号を要求する検索（06-001/33-001/
   24-001/35-001/08-001 等）で块は #policy_number のみ fill。mock 静的行では無害だが真機で同証券に
   複数明細があるとヒット件数が別紙と食い違い得る。

## まとめ
前端导线层面では 14 本すべて手順並びに成立（塊 pass は到達性として妥当）。
mock 無後端に起因する表示内容照合・メッセージ・DB/バッチ系は全部 live-pending で既知枠内。
新発見 7 件はいずれも「pass が何を証明していないか」の範囲明確化であり、run 全体の green を覆すものではない。
