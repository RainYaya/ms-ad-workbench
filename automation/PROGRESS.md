# Progress ledger

更新: 2026-10-23

This is the per-book / per-case progress table. It is separate from static block coverage: `block full` does not mean the case was executed.

## Snapshot

| Item | Count |
|---|---:|
| Assigned cases | 450 |
| Static block full (curated + auto) | 78 |
| Curated-only full | 46 |
| Actually fully passed | 0 |
| Actually partially passed | 1 |
| Mock-only | 3 |
| Environment-blocked cases | 1 |
| Blocks | 61 (33 curated + 28 auto) |
| Event coverage | 72.3% auto-inclusive / 34.5% curated-only |
| Status3 blocks | verified 3 / coded 1 / planned 57 |
| Status3 cases | verified 1 / coded 97 / planned 352 / none 0 |

Three-state model: **verified** = live SUT pass; **coded** = implemented + mock-passed, live pending; **planned** = everything else. See STATUS3.md.

Block execution state (legacy):

| State | Blocks |
|---|---:|
| live-pass | 3 |
| mock-pass | 0 |
| blocked | 1 |
| not-implemented | 6 |
| not-run | 51 |

## Blocks

| Block | From → To | Cases | Selector | Execution | Status3 |
|---|---|---:|---|---|---|
| `BLK-AZ-MENU-SEARCH-LIST` | 申込書品質管理メニュー → 不備一覧 | 204 | source-only | not-run | planned |
| `BLK-AZ-LIST-FILTER-OPEN-UPDATE` | 不備一覧 → 不備内容入力画面-更新 | 184 | source-only | not-run | planned |
| `BLK-AUTO-04A78248` | 不備内容入力画面-更新 → 項目名検索 | 128 | draft-auto | not-run | planned |
| `BLK-AUTO-E2D0C359` | 異例取扱管理メニュ- → 照会・検索 | 125 | draft-auto | not-run | planned |
| `BLK-AUTO-4F9D57E1` | 照会・検索 → 申請・確認更新 | 105 | draft-auto | not-run | planned |
| `BLK-AZ-INPUT-FILL` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 101 | live-verified | live-pass | verified |
| `BLK-AZ-MENU-CREATE-INPUT` | 申込書品質管理メニュー → 不備内容入力画面-新規 | 101 | live-verified | live-pass | verified |
| `BLK-AZ-REGISTER-UPDATE` | 不備内容入力画面-新規 → 不備内容入力画面-更新 | 97 | source-only | not-implemented | planned |
| `BLK-AZ-ITEM-SEARCH-SELECT` | 項目名検索 → 不備内容入力画面-更新 | 74 | source-only | not-implemented | planned |
| `BLK-AUTO-27C68433` | 送信先(写)選択 → 取消計上申請承認 | 70 | draft-auto | not-run | planned |
| `BLK-AZ-INQUIRY-EDIT` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 65 | source-only | not-implemented | planned |
| `BLK-AUTO-5C1EFE0E` | 項目名検索 → 不備内容入力画面-更新 | 59 | draft-auto | not-run | planned |
| `BLK-AUTO-E0B41407` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 55 | draft-auto | not-run | planned |
| `BLK-AUTO-2B9786A5` | 担当者検索 → 申請・確認更新 | 52 | draft-auto | not-run | planned |
| `BLK-AZ-COMMON-LOGS` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 48 | source-only | not-run | planned |
| `BLK-AUTO-3477BB6F` | BATCH → BATCH | 43 | draft-auto | not-run | planned |
| `BLK-AUTO-D844ADE8` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 43 | draft-auto | not-run | planned |
| `BLK-AUTO-94A5D816` | 申請・確認更新 → 申請・確認更新 | 37 | draft-auto | not-run | planned |
| `BLK-AUTO-C8903BF5` | BATCH → BATCH | 37 | draft-auto | not-run | planned |
| `BLK-AZ-AGENT-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 37 | mock-verified | blocked | coded |
| `BLK-AZ-INSURANCE-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 37 | live-verified | live-pass | verified |
| `BLK-AUTO-DDA3A833` | 代理店不備一覧 → 代理店 不備内容入力画面(更新) | 32 | draft-auto | not-run | planned |
| `BLK-AUTO-2C41848F` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 30 | draft-auto | not-run | planned |
| `BLK-AUTO-E1BDF237` | 不備一覧 → 不備内容入力画面-更新 | 30 | draft-auto | not-run | planned |
| `BLK-AUTO-4C432C14` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 28 | draft-auto | not-run | planned |
| `BLK-AUTO-DF07A781` | 送信先(写)選択 → 申請・確認更新 | 26 | draft-auto | not-run | planned |
| `BLK-AUTO-9750F4CE` | 不備一覧 → 不備内容入力画面-更新 | 24 | draft-auto | not-run | planned |
| `BLK-AZ-BATCH-RUN-VERIFY` | 親子集計バッチ処理 → 親子集計バッチ処理 | 22 | source-only | not-run | planned |
| `BLK-AUTO-DEBE0BEE` | 代理店不備一覧 → 代理店 不備内容入力画面(更新) | 20 | draft-auto | not-run | planned |
| `BLK-AUTO-FECF904C` | 申請・確認更新 → 申請・確認更新 | 20 | draft-auto | not-run | planned |
| `BLK-AUTO-0AD75340` | 代理店不備内容入力画面(更新) → 代理店 不備一覧 | 18 | draft-auto | not-run | planned |
| `BLK-AUTO-1D62D29C` | 申請承認一覧 → 取消計上申請承認 | 18 | draft-auto | not-run | planned |
| `BLK-AUTO-86C702E1` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 16 | draft-auto | not-run | planned |
| `BLK-AUTO-6F1B4715` | 訂正内容確認 → 不備内容入力画面-更新 | 14 | draft-auto | not-run | planned |
| `BLK-AZ-CORRECTION-CONFIRM` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 14 | source-only | not-implemented | planned |
| `BLK-AUTO-720382DE` | BATCH → BATCH | 13 | draft-auto | not-run | planned |
| `BLK-AUTO-9EB5A282` | 不備一覧 → 不備内容入力画面-更新 | 12 | draft-auto | not-run | planned |
| `BLK-AZ-EXTERNAL-AUTH` | その他(申込書品質管理) → 申込書品質管理システム (代理店MS) | 12 | source-only | not-run | planned |
| `BLK-AUTO-1EAEE77F` | 申請承認一覧 → 取消計上申請承認 | 10 | draft-auto | not-run | planned |
| `BLK-AUTO-23229D4F` | 帳票印刷 → 不備内容入力画面-更新 | 10 | draft-auto | not-run | planned |
| `BLK-AY-TORIKESHI-REGISTER` | 異例取扱管理メニュー → 申請・確認更新 | 9 | source-only | not-run | planned |
| `BLK-AZ-UPDATE-DELETE-OK` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 7 | source-only | not-run | planned |
| `BLK-AZ-UPDATE-CL` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 5 | source-only | not-run | planned |
| `BLK-AZ-UPDATE-SEARCH-ITEM` | 不備内容入力画面-更新 → 項目名検索 | 5 | source-only | not-implemented | planned |
| `BLK-AZ-AGT-LIST-SEARCH` | 代理店 不備一覧 → 代理店 不備一覧 | 4 | source-only | not-run | planned |
| `BLK-AZ-BATCH-CONVERT-MAIL` | メール変換先取込通知バッチ処理 → メール変換先取込通知バッチ処理 | 4 | source-only | not-run | planned |
| `BLK-AZ-COMPLETE-REGISTER` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 4 | source-only | not-implemented | planned |
| `BLK-AZ-AUTH-ERROR` | その他(申込書品質管理) → 権限エラー | 3 | source-only | not-run | planned |
| `BLK-AZ-SESSION-TIMEOUT` | 代理店 不備一覧 → セッションタイムアウト画面 (親画面) | 3 | source-only | not-run | planned |
| `BLK-AZ-SYSERR-LOGIN` | その他(申込書品質管理) → システムエラー | 3 | source-only | not-run | planned |
| `BLK-AZ-AGT-SESSION-TIMEOUT` | 代理店 不備一覧 → 代理店 訂正内容確認 | 2 | source-only | not-run | planned |
| `BLK-AZ-BATCH-VERIFY` | 不備項目集計バッチ処理 → 不備項目集計バッチ処理 | 2 | source-only | not-run | planned |
| `BLK-AZ-OPEN-CLOSE-SYS` | 運用AP → 閉局 | 2 | source-only | not-run | planned |
| `BLK-AUTO-F8714C90` | 照会内容編集 → 不備内容入力画面-更新 | 1 | draft-auto | not-run | planned |
| `BLK-AY-MENU-SESSION-TIMEOUT` | 異例取扱管理メニュー → セッションタイムアウト画面 (親画面) | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-CORRECTION-REGISTER` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-CSV-DOWNLOAD` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-LIST-INITIAL` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-LIST-INITIAL-EMPTY` | 代理店 不備一覧 → 代理店 不備一覧 | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-LIST-OPEN-UPDATE` | 代理店 不備一覧 → 代理店 不備内容入力画面(更新) | 1 | source-only | not-run | planned |
| `BLK-AZ-AGT-UPDATE-SUSPEND` | 代理店 不備内容入力画面(更新) → 代理店 不備内容入力画面(更新) | 1 | source-only | not-run | planned |

Block state is aggregate across cases: a block with a live pass is `live-pass`; `blocked` wins over `mock-pass` (the agent block is blocked on 009 but mock-pass on 010–012). Per-case mock counts are in `progress/cases.md`.

## Pilot books

`Next (not live)` is the first block that has not passed on the actual SUT. A mock-only block still counts as remaining for actual execution.

| Case | Book / template | Static | Done / blocks | Live | Mock | Blocked | Not impl | Remaining | Next (not live) |
|---|---|---|---:|---:|---:|---:|---:|---:|---|
| `AZ-110-01-009` | `TPL-AZ-110-01-009` | full | 3/10 | 3 | 0 | 1 | 6 | 7 | BLK-AZ-AGENT-SELECT |
| `AZ-110-01-010` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 4 | 0 | 6 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-01-011` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 4 | 0 | 6 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-01-012` | `TPL-AZ-110-01-009` | full | 0/10 | 0 | 4 | 0 | 6 | 10 | BLK-AZ-MENU-CREATE-INPUT |
| `AZ-110-37-001` | `TPL-AZ-110-37-001` | full | 0/4 | 0 | 0 | 0 | 0 | 4 | BLK-AZ-MENU-SEARCH-LIST |
| `AZ-110-67-001` | `TPL-AZ-110-67-001` | full | 0/4 | 0 | 0 | 0 | 0 | 4 | BLK-AZ-MENU-SEARCH-LIST |

## Next gaps

| Cases | Event |
|---:|---|
| 114 | `(blank):other::literal` |
| 86 | `不備内容入力画面-更新:display:不備内容入力画面-更新:bundle` |
| 65 | `不備内容入力画面-更新:other:ToDo連携テーブル:literal` |
| 62 | `申請・確認更新:transition:送信先(写)選択:literal` |
| 61 | `申請・確認更新:inputBundle:各項目:bundle` |
| 55 | `不備内容入力画面-更新:other::literal` |
| 52 | `申請・確認更新:transition:担当者検索:literal` |
| 46 | `ToDo連携データ作成バッチ処理:other::literal` |
| 42 | `不備内容入力画面-更新:click:営業連携:none` |
| 39 | `不備内容入力画面-更新:click:OK:none` |
| 39 | `不備内容入力画面-更新:click:完了登録:none` |
| 38 | `不備内容入力画面-更新:click:連携取消:none` |
| 38 | `異例取扱管理メニュー:click:申請・承認:none` |
| 38 | `異例取扱管理メニュー:transition:申請承認一覧:literal` |
| 35 | `不備内容入力画面-更新:click:印刷:none` |

## Full ledgers

- `progress/cases.md`: all 450 cases with done/remaining/next
- `progress/templates.md`: 215 exact procedure templates with aggregate progress
- `blocks/COVERAGE.md`: static block composition and gaps
- `../docs/ROADMAP.md`: owner/next-step plan

## 009 note

`AZ-110-01-009` is environment-blocked at block 4/5 (agent search returns no data). Per instruction, do not diagnose further and do not treat it as a selector bug. Continue with block 6–13 and other block families. Keep the case status `blocked` until the environment allows a rerun.
