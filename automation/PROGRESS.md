# Progress ledger

更新: 2026-10-23

This is the per-book / per-case progress table. It is separate from static block coverage: `block full` does not mean the case was executed.

## Snapshot

| Item | Count |
|---|---:|
| Assigned cases | 450 |
| Static block full (curated + auto) | 450 |
| Curated-only full | 46 |
| Actually fully passed | 0 |
| Actually partially passed | 0 |
| Mock-only | 65 |
| Environment-blocked cases | 0 |
| Blocks | 252 (34 curated + 59 auto) |
| Event coverage | 82.4% auto-inclusive / 35.2% curated-only |
| Status3 blocks | verified 3 / coded 19 / planned 230 |
| Status3 cases | verified 0 / coded 306 / planned 144 / none 0 |

Three-state model: **verified** = live SUT pass; **coded** = implemented + mock-passed, live pending; **planned** = everything else. See STATUS3.md.

Block execution state (legacy):

| State | Blocks |
|---|---:|
| live-pass | 0 |
| mock-pass | 22 |
| blocked | 0 |
| not-implemented | 0 |
| not-run | 230 |

## Blocks

| Block | From → To | Cases | Selector | Execution | Status3 |
|---|---|---:|---|---|---|
| `BLK-AZ-MENU-SEARCH-LIST` | 申込書品質管理メニュー → 不備一覧 | 348 | source-only | mock-pass | coded |
| `BLK-AZ-LIST-FILTER-OPEN-UPDATE` | 不備一覧 → 不備内容入力画面-更新 | 308 | source-only | mock-pass | coded |
| `BLK-AUTO-04A78248` | 不備内容入力画面-更新 → 項目名検索 | 229 | draft-auto | not-run | planned |
| `BLK-AZ-INPUT-FILL` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 174 | live-verified | mock-pass | verified |
| `BLK-AZ-MENU-CREATE-INPUT` | 申込書品質管理メニュー → 不備内容入力画面-新規 | 174 | live-verified | mock-pass | verified |
| `BLK-AUTO-E2D0C359` | 異例取扱管理メニュ- → 照会・検索 | 170 | draft-auto | not-run | planned |
| `BLK-AZ-REGISTER-UPDATE` | 不備内容入力画面-新規 → 不備内容入力画面-更新 | 166 | source-only | mock-pass | coded |
| `BLK-AUTO-5C1EFE0E` | 項目名検索 → 不備内容入力画面-更新 | 118 | draft-auto | not-run | planned |
| `BLK-AZ-ITEM-SEARCH-SELECT` | 項目名検索 → 不備内容入力画面-更新 | 117 | source-only | mock-pass | coded |
| `BLK-AUTO-4F9D57E1` | 照会・検索 → 申請・確認更新 | 105 | draft-auto | not-run | planned |
| `BLK-AZ-INQUIRY-EDIT` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 99 | source-only | mock-pass | coded |
| `BLK-AUTO-2B9786A5` | 担当者検索 → 申請・確認更新 | 96 | draft-auto | not-run | planned |
| `BLK-AUTO-27C68433` | 送信先(写)選択 → 取消計上申請承認 | 93 | draft-auto | not-run | planned |
| `BLK-AUTO-3477BB6F` | BATCH → BATCH | 90 | draft-auto | not-run | planned |
| `BLK-AUTO-C8903BF5` | BATCH → BATCH | 74 | draft-auto | not-run | planned |
| `BLK-AUTO-DDA3A833` | 代理店不備一覧 → 代理店 不備内容入力画面(更新) | 64 | draft-auto | mock-pass | coded |
| `BLK-AUTO-C8BDC3F2` | 不備内容入力画面-更新 → 帳票印刷 | 62 | draft-auto | not-run | planned |
| `BLK-AUTO-E1BDF237` | 不備一覧 → 不備内容入力画面-更新 | 60 | draft-auto | not-run | planned |
| `BLK-AUTO-E0B41407` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 59 | draft-auto | not-run | planned |
| `BLK-AUTO-2739DA75` | 不備内容入力画面-更新 → メール通知先選択 | 58 | draft-auto | not-run | planned |
| `BLK-SHR-5F5035B5` | (blank) → (blank) | 57 | draft-shared | not-run | planned |
| `BLK-AUTO-042B2DAE` | 異例取扱管理メニュ- → 申請承認一覧 | 56 | draft-auto | not-run | planned |
| `BLK-AUTO-D844ADE8` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 56 | draft-auto | not-run | planned |
| `BLK-AUTO-9750F4CE` | 不備一覧 → 不備内容入力画面-更新 | 48 | draft-auto | not-run | planned |
| `BLK-AZ-AGENT-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 46 | mock-verified | mock-pass | coded |
| `BLK-AZ-INSURANCE-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 46 | live-verified | mock-pass | verified |
| `BLK-AUTO-DF07A781` | 送信先(写)選択 → 申請・確認更新 | 44 | draft-auto | not-run | planned |
| `BLK-AZ-BATCH-RUN-VERIFY` | 親子集計バッチ処理 → 親子集計バッチ処理 | 44 | source-only | not-run | planned |
| `BLK-AUTO-4C432C14` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 42 | draft-auto | not-run | planned |
| `BLK-AUTO-DEBE0BEE` | 代理店不備一覧 → 代理店 不備内容入力画面(更新) | 40 | draft-auto | not-run | planned |
| `BLK-AUTO-B8DF200B` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 37 | draft-auto | not-run | planned |
| `BLK-AUTO-0AD75340` | 代理店不備内容入力画面(更新) → 代理店 不備一覧 | 36 | draft-auto | not-run | planned |
| `BLK-AUTO-559E7D1D` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 36 | draft-auto | not-run | planned |
| `BLK-AUTO-10E5C587` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 30 | draft-auto | not-run | planned |
| `BLK-AZ-COMMON-LOGS` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 30 | source-only | not-run | planned |
| `BLK-AUTO-F974E639` | 申請・確認更新 → 送信先(写)選択 | 29 | draft-auto | not-run | planned |
| `BLK-AUTO-CE34C5B8` | 申請・確認更新 → 担当者検索 | 28 | draft-auto | not-run | planned |
| `BLK-AUTO-D2C3A480` | 申請・確認更新 → 送信先(写)選択 | 28 | draft-auto | not-run | planned |
| `BLK-SHR-40B1188F` | 照会・検索 → 照会・検索 | 27 | draft-shared | not-run | planned |
| `BLK-AUTO-1D62D29C` | 申請承認一覧 → 取消計上申請承認 | 26 | draft-auto | not-run | planned |
| `BLK-AUTO-FCB405E4` | メ-ル通知先選択 → メ-ル通知先選択 | 26 | draft-auto | not-run | planned |
| `BLK-SGL-C17F75BC` | 照会・検索 → 申請・確認更新 | 25 | draft-shared | not-run | planned |
| `BLK-SHR-D6459D48` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 25 | draft-shared | not-run | planned |
| `BLK-AUTO-9EB5A282` | 不備一覧 → 不備内容入力画面-更新 | 24 | draft-auto | not-run | planned |
| `BLK-AY-SHINSEI-TAIOUTOUROKU` | 申請・確認更新 → 申請・確認更新 | 24 | source-only | not-run | planned |
| `BLK-AUTO-7A70187A` | メ-ル通知先選択 → 不備内容入力画面-更新 | 22 | draft-auto | not-run | planned |
| `BLK-SHR-F9A1D656` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 22 | draft-shared | mock-pass | coded |
| `BLK-AUTO-18958C37` | 不備一覧 → 不備内容入力画面(更新) | 20 | draft-auto | not-run | planned |
| `BLK-AUTO-2C41848F` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 20 | draft-auto | not-run | planned |
| `BLK-AUTO-ADFFD6FB` | 申請承認一覧 → 取消計上申請承認 | 20 | draft-auto | not-run | planned |
| `BLK-AUTO-E6EAF3BB` | 取消計上申請承認 → 送信先(写)選択 | 20 | draft-auto | not-run | planned |
| `BLK-AUTO-FECF904C` | 申請・確認更新 → 申請・確認更新 | 20 | draft-auto | not-run | planned |
| `BLK-SHR-B1D2CD03` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 20 | draft-shared | not-run | planned |
| `BLK-SHR-669A1809` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 19 | draft-shared | not-run | planned |
| `BLK-AUTO-8C0E3438` | BATCH → BATCH | 18 | draft-auto | not-run | planned |
| `BLK-SHR-B0028D4D` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 18 | draft-shared | not-run | planned |
| `BLK-AUTO-FED6C2EF` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 17 | draft-auto | not-run | planned |
| `BLK-SGL-CCA9B958` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 17 | draft-singleton | not-run | planned |
| `BLK-AUTO-7364B069` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 16 | draft-auto | not-run | planned |
| `BLK-AUTO-7AAEDA04` | 不備内容入力画面-更新 → 訂正内容確認 | 16 | draft-auto | not-run | planned |
| `BLK-AUTO-94A5D816` | 申請・確認更新 → 申請・確認更新 | 16 | draft-auto | not-run | planned |
| `BLK-SHR-BF46F797` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 15 | draft-shared | not-run | planned |
| `BLK-AUTO-6F1B4715` | 訂正内容確認 → 不備内容入力画面-更新 | 14 | draft-auto | not-run | planned |
| `BLK-AUTO-8FE40BE8` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 14 | draft-auto | not-run | planned |
| `BLK-AZ-CORRECTION-CONFIRM` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 14 | source-only | mock-pass | coded |
| `BLK-AUTO-5637DF50` | 申請・確認更新 → 申請・確認更新 | 13 | draft-auto | not-run | planned |
| `BLK-AUTO-12DB90A3` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 12 | draft-auto | not-run | planned |
| `BLK-AZ-EXTERNAL-AUTH` | その他(申込書品質管理) → 申込書品質管理システム (代理店MS) | 12 | source-only | mock-pass | coded |
| `BLK-AUTO-C7A1F3E5` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 11 | draft-auto | not-run | planned |
| `BLK-AUTO-C898B5B4` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 11 | draft-auto | not-run | planned |
| `BLK-SHR-FB883F72` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 11 | draft-shared | not-run | planned |
| `BLK-AUTO-23229D4F` | 帳票印刷 → 不備内容入力画面-更新 | 10 | draft-auto | not-run | planned |
| `BLK-AUTO-23BC6F7B` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 10 | draft-auto | not-run | planned |
| `BLK-AUTO-6AD0E114` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 10 | draft-auto | not-run | planned |
| `BLK-AUTO-C4218B41` | 申請承認一覧 → 取消計上申請承認 | 10 | draft-auto | not-run | planned |
| `BLK-AY-TORIKESHI-REGISTER` | 異例取扱管理メニュー → 申請・確認更新 | 10 | source-only | mock-pass | coded |
| `BLK-SHR-EB44767A` | 申請・確認更新 → 担当者検索 | 10 | draft-shared | not-run | planned |
| `BLK-AUTO-A315BF06` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 9 | draft-auto | not-run | planned |
| `BLK-AUTO-BABA9D55` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 9 | draft-auto | not-run | planned |
| `BLK-AUTO-ECE76B71` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 9 | draft-auto | not-run | planned |
| `BLK-SHR-288BB000` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 9 | draft-shared | not-run | planned |
| `BLK-SHR-63C4E6D6` | 帳票印刷 → 不備内容入力画面-更新 | 9 | draft-shared | not-run | planned |
| `BLK-AUTO-08AD77A3` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 8 | draft-auto | not-run | planned |
| `BLK-AUTO-2B5F6E76` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 8 | draft-auto | not-run | planned |
| `BLK-SGL-60F6A775` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 8 | draft-shared | not-run | planned |
| `BLK-SGL-7A863F7A` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-6FA7E251` | 申請・確認更新 → 送信先(写)選択 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-77BF51A5` | 申請・確認更新 → 送信先(写)選択 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-805D28B8` | 取消計上申請承認 → 送信先(写)選択 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-C69800AD` | 照会・検索 → 担当者検索 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-C8E42CCF` | 申請・確認更新 → 担当者検索 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-D606FB03` | 不備一覧 → 不備一覧 | 8 | draft-shared | not-run | planned |
| `BLK-SHR-E30F6E3C` | 申請・確認更新 → 担当者検索 | 8 | draft-shared | not-run | planned |
| `BLK-AZ-UPDATE-DELETE-OK` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 7 | source-only | not-run | planned |
| `BLK-SHR-072E06D9` | 不備一覧 → 不備一覧 | 7 | draft-shared | not-run | planned |
| `BLK-SHR-73BCFD18` | 代理店 不備内容入力画面(更新) → 代理店 不備一覧 | 7 | draft-shared | not-run | planned |
| `BLK-AZ-UPDATE-SEARCH-ITEM` | 不備内容入力画面-更新 → 項目名検索 | 6 | source-only | mock-pass | coded |
| `BLK-SHR-3222CFC6` | 取消計上申請承認 → 送信先(写)選択 | 6 | draft-shared | not-run | planned |
| `BLK-SHR-ED323C11` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 6 | draft-shared | not-run | planned |
| `BLK-AUTO-C2B6BA33` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 5 | draft-auto | not-run | planned |
| `BLK-AZ-UPDATE-CL` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 5 | source-only | mock-pass | coded |
| `BLK-SHR-EB3D34F4` | メール通知先選択 → メール通知先選択 | 5 | draft-shared | not-run | planned |
| `BLK-AUTO-720382DE` | BATCH → BATCH | 4 | draft-auto | not-run | planned |
| `BLK-AZ-AGT-LIST-SEARCH` | 代理店 不備一覧 → 代理店 不備一覧 | 4 | source-only | not-run | planned |
| `BLK-AZ-AGT-SESSION-TIMEOUT` | 代理店 不備一覧 → 代理店 訂正内容確認 | 4 | source-only | not-run | planned |
| `BLK-AZ-BATCH-CONVERT-MAIL` | メール変換先取込通知バッチ処理 → メール変換先取込通知バッチ処理 | 4 | source-only | mock-pass | coded |
| `BLK-AZ-BATCH-VERIFY` | 不備項目集計バッチ処理 → 不備項目集計バッチ処理 | 4 | source-only | not-run | planned |
| `BLK-AZ-COMPLETE-REGISTER` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 4 | source-only | mock-pass | coded |
| `BLK-AZ-OPEN-CLOSE-SYS` | 運用AP → 閉局 | 4 | source-only | not-run | planned |
| `BLK-SGL-F1E0B9E5` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 4 | draft-shared | not-run | planned |
| `BLK-SHR-1D4C0178` | 帳票印刷 → 帳票印刷 | 4 | draft-shared | not-run | planned |
| `BLK-SHR-6F09B48C` | 不備一覧 → ToDo再送設定バッチ処理 | 4 | draft-shared | not-run | planned |
| `BLK-SHR-8546478D` | 取消計上申請承認 → 送信先(写)選択 | 4 | draft-shared | not-run | planned |
| `BLK-SHR-CC41ACD0` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 4 | draft-shared | not-run | planned |
| `BLK-SHR-CD031FED` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 4 | draft-shared | not-run | planned |
| `BLK-SHR-E593E2FC` | 不備一覧 → 不備一覧 | 4 | draft-shared | not-run | planned |
| `BLK-AZ-AUTH-ERROR` | その他(申込書品質管理) → 権限エラー | 3 | source-only | mock-pass | coded |
| `BLK-AZ-SESSION-TIMEOUT` | 代理店 不備一覧 → セッションタイムアウト画面 (親画面) | 3 | source-only | mock-pass | coded |
| `BLK-AZ-SYSERR-LOGIN` | その他(申込書品質管理) → システムエラー | 3 | source-only | mock-pass | coded |
| `BLK-SHR-311D55A3` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 3 | draft-shared | not-run | planned |
| `BLK-SHR-340D4343` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 3 | draft-shared | not-run | planned |
| `BLK-SHR-B3B9104B` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 3 | draft-shared | not-run | planned |
| `BLK-SHR-B42FB7FD` | 不備一覧 → 不備内容入力画面-更新 | 3 | draft-shared | not-run | planned |
| `BLK-SHR-CD763243` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 3 | draft-shared | not-run | planned |
| `BLK-SHR-D9AE66FC` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 3 | draft-shared | not-run | planned |
| `BLK-SHR-F09E159A` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 3 | draft-shared | not-run | planned |
| `BLK-AUTO-01795032` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-auto | not-run | planned |
| `BLK-AUTO-F8714C90` | 照会内容編集 → 不備内容入力画面-更新 | 2 | draft-auto | not-run | planned |
| `BLK-AZ-AGT-CSV-DOWNLOAD` | 代理店 不備一覧 → 代理店 不備一覧 | 2 | source-only | not-run | planned |
| `BLK-SGL-1ECE1684` | 帳票印刷 → 不備内容入力画面-更新 | 2 | draft-singleton | not-run | planned |
| `BLK-SGL-6163165A` | 帳票印刷 → 帳票印刷 | 2 | draft-shared | not-run | planned |
| `BLK-SGL-8986EB9F` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-singleton | not-run | planned |
| `BLK-SGL-A00738F4` | 送信先(写)選択 → 送信先(写)選択 | 2 | draft-singleton | not-run | planned |
| `BLK-SGL-FE33E38E` | 不備一覧 → 不備一覧 | 2 | draft-singleton | not-run | planned |
| `BLK-SHR-01CAB10D` | 運用AP → 閉局 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-04E83971` | 送信先(写)選択 → 送信先(写)選択 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-106D33F6` | 帳票印刷 → 帳票印刷 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-121DF781` | 募集人情報引込バッチ処理 → 募集人情報引込バッチ処理 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-269893EF` | 不備一覧 → 不備集計 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-2EEC5A3D` | フリーコード集計バッチ処理 → フリーコード集計バッチ処理 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-305661D1` | 募集人集計バッチ処理 → 募集人集計バッチ処理 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-3F6DEDE2` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-4E8C4FC2` | 不備一覧 → 不備一覧 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-5BDEF314` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-5CEC3483` | 登録件数集計情報ファイル → 登録件数集計情報ファイル | 2 | draft-shared | not-run | planned |
| `BLK-SHR-72F034C6` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-73B769C8` | 申請・確認更新 → 申請・確認更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-7A684D49` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-7EB4CA64` | 代理店 不備一覧 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-8F1D192A` | 計上情報消込処理 → 計上情報消込処理 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-950C5CC5` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-C649ACE4` | 不備内容集計バッチ処理 → 不備内容集計バッチ処理 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-C90A0006` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-CE8B86B5` | 申請・確認更新 → 送信先(写)選択 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-D0DDEEE4` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 2 | draft-shared | not-run | planned |
| `BLK-SHR-D155DA21` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-DD6D983A` | 照会・検索 → 申請・確認更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-EBEB83B0` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-ED876A58` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-EEFF5DB3` | 代理店 訂正内容確認 → セッションタイムアウト画面 (子画面) | 2 | draft-shared | not-run | planned |
| `BLK-SHR-F056442C` | 代理店 不備一覧 → 代理店 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-F07F5CF4` | 申請・確認更新 → 送信先(写)選択 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-F0C72208` | 項目名検索 → 項目名検索 | 2 | draft-shared | not-run | planned |
| `BLK-SHR-F557476E` | メール通知先選択 → 不備内容入力画面-更新 | 2 | draft-shared | not-run | planned |
| `BLK-AY-MENU-SESSION-TIMEOUT` | 異例取扱管理メニュー → セッションタイムアウト画面 (親画面) | 1 | source-only | mock-pass | coded |
| `BLK-AZ-AGT-CORRECTION-REGISTER` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-LIST-INITIAL` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-LIST-INITIAL-EMPTY` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-LIST-OPEN-UPDATE` | 代理店 不備一覧 → 代理店 不備内容入力画面(更新) | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-UPDATE-SUSPEND` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | source-only | not-run | planned |
| `BLK-SGL-022A6268` | 不備一覧 → ヘルプ | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-03D12845` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-0B2CB156` | 不備内容入力画面-更新 → システムエラー画面(親画面) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-0C5A44D1` | 計上情報消込処理 → 計上情報消込処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-0D2D641B` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-0DF6BF48` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-0EF7DA98` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-134186E1` | 帳票印刷 → 帳票印刷 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-13EBF209` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-148C85C9` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-1913A9CC` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-1CC6C3EC` | 帳票印刷 → 帳票印刷 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-1E78A599` | 帳票印刷 → 帳票印刷 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-1E856949` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-20C0D517` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-213E7E7D` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-224C9DEF` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-2268EC8E` | メール通知先選択 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-263830F1` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-2995218F` | 帳票印刷 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-2B7D45E3` | 照会・検索 → 照会・検索 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-2DDFC25D` | 帳票印刷 → 帳票印刷 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-2FF1643E` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-3017A3AA` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-31F074B9` | 照会・検索 → 申請・確認更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-3DB9518B` | 照会・検索 → 照会・検索 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-3EFB9C18` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-41743CCA` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-42508787` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-4C3588A4` | 照会・検索 → 申請・確認更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-4CB0EA5C` | 不備一覧 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-4EB596EB` | ユーザIDマスタ取込処理 → ユーザIDマスタ取込処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-557F51B3` | 照会・検索 → 照会・検索 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-58EA9045` | 照会・検索 → 申請・確認更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-637D567D` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-639A108B` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-6BEAE496` | 回答内容マスタ取込処理 → 回答内容マスタ取込処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-70B071E3` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-7597207A` | 取消計上申請登録 → 申請・確認更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-75D5F75B` | 親子集計バッチ処理 → 親子集計バッチ処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-7A4080AD` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-7EBD5C1C` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-7EE83E5A` | 申込書品質管理メニュー → 申込書品質管理メニュー | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-824C0B37` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-86665200` | 帳票印刷 → 帳票印刷 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-86B0B8B9` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-90299E43` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-952A7140` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-98A9A5DE` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-9B567CC5` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-9EBB1470` | ToDo連携データ作成バッチ処理 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-A5BF2BD4` | 帳票印刷 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-AB15C319` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-B69EF548` | 大樹生命連携データ作成バッチ処理 → 大樹生命連携データ作成バッチ処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-B84FFF40` | 閲覧システム連携ファイル作成バッチ処理 → 閲覧システム連携ファイル作成バッチ処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-BA4B4F43` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-BBEBCD49` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-BDA7A359` | 不備一覧 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-BE812D08` | 照会・検索 → 申請・確認更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-C14B22C2` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-C16D256A` | 不備一覧 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-C3BC64AD` | メール通知先選択 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-C651052A` | ToDo連携データ作成バッチ処理 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-C9C58BF8` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-CB6C5414` | 項目名検索 → 項目名検索 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-CEAA65E9` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-CFBFBCCB` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-D0508D0D` | 不備内容入力画面-更新 → 照会内容編集 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-DB2830E2` | 帳票印刷 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-DE4B3B14` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-E008F918` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-E3AD1DD9` | 項目テーブル取込処理 → 項目テーブル取込処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-EA9C1EF3` | 照会・検索 → システムエラー画面(親画面) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-ECBA7661` | 照会内容マスタ取込処理 → 照会内容マスタ取込処理 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-EF37895C` | 訂正内容確認 → システムエラー画面(子画面) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-F1F96812` | 帳票印刷 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-F54CCD41` | 親子集計バッチ処理 → 親子集計予約 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-F9980EBC` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-FBFD5CAD` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-FCF80BAC` | 帳票印刷 → 不備一覧 | 1 | draft-singleton | not-run | planned |
| `BLK-SGL-FF4BE5F2` | メール通知先選択 → リンク | 1 | draft-singleton | not-run | planned |
| `BLK-SHR-394B713D` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 0 | draft-shared | not-run | planned |

Block state is aggregate across cases: a block with a live pass is `live-pass`; `blocked` wins over `mock-pass` (the agent block is blocked on 009 but mock-pass on 010–012). Per-case mock counts are in `progress/cases.md`.

## Pilot books

`Next (not live)` is the first block that has not passed on the actual SUT. A mock-only block still counts as remaining for actual execution.

| Case | Book / template | Static | Done / blocks | Live | Mock | Blocked | Not impl | Remaining | Next (not live) |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| `AZ-110-01-009` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 10 | 0 | 0 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-01-010` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 10 | 0 | 0 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-01-011` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 10 | 0 | 0 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-01-012` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 10 | 0 | 0 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-37-001` | `TPL-AZ-110-37-001` | full | 0/4 | 0 | 3 | 0 | 0 | 4 | BLK-AZ-MENU-SEARCH-LIST |
| `AZ-110-67-001` | `TPL-AZ-110-67-001` | full | 0/4 | 0 | 0 | 0 | 0 | 4 | BLK-AZ-MENU-SEARCH-LIST |

## Next gaps

| Cases | Event |
|---:|---|
| 114 | `(blank):other::literal` |
| 55 | `不備内容入力画面-更新:other::literal` |
| 46 | `ToDo連携データ作成バッチ処理:other::literal` |
| 42 | `不備内容入力画面-更新:display:不備内容入力画面-更新:bundle` |
| 34 | `申請・確認更新:transition:担当者検索:literal` |
| 31 | `照会・検索:click:検索:none` |
| 30 | `代理店 不備内容入力画面(更新):click:一時中断:none` |
| 28 | `不備内容入力画面-更新:click:代理店照会:literal` |
| 28 | `照会・検索:inputBundle:各項目:bundle` |
| 22 | `不備内容入力画面-更新:click:連携取消:none` |
| 21 | `帳票印刷:click:閉じる:none` |
| 21 | `不備内容入力画面-更新:input:代理店照会:literal` |
| 20 | `照会・検索:click:検索結果出力:none` |
| 18 | `帳票印刷:click:帳票出力:none` |
| 17 | `照会・検索:transition:申請・確認更新:literal` |

## Full ledgers

- `progress/cases.md`: all 450 cases with done/remaining/next
- `progress/templates.md`: 215 exact procedure templates with aggregate progress
- `blocks/COVERAGE.md`: static block composition and gaps
- `../docs/ROADMAP.md`: owner/next-step plan

## 009 note

`AZ-110-01-009` is environment-blocked at block 4/5 (agent search returns no data). Per instruction, do not diagnose further and do not treat it as a selector bug. Continue with block 6–13 and other block families. Keep the case status `blocked` until the environment allows a rerun.
