# Progress ledger

更新: 2026-10-23

This is the per-book / per-case progress table. It is separate from static block coverage: `block full` does not mean the case was executed.

## Snapshot

| Item | Count |
|---|---:|
| Assigned cases | 450 |
| Static block full (curated + auto) | 34 |
| Curated-only full | 12 |
| Actually fully passed | 0 |
| Actually partially passed | 1 |
| Mock-only | 3 |
| Environment-blocked cases | 1 |
| Blocks | 45 (15 curated + 30 auto) |
| Event coverage | 68.0% auto-inclusive / 30.9% curated-only |

Block execution state:

| State | Blocks |
|---|---:|
| live-pass | 3 |
| mock-pass | 0 |
| blocked | 1 |
| not-implemented | 6 |
| not-run | 35 |

## Blocks

| Block | From → To | Cases | Selector | Execution |
|---|---|---:|---|---|
| `BLK-AZ-MENU-SEARCH-LIST` | 申込書品質管理メニュー → 不備一覧 | 195 | source-only | not-run |
| `BLK-AZ-LIST-FILTER-OPEN-UPDATE` | 不備一覧 → 不備内容入力画面-更新 | 183 | source-only | not-run |
| `BLK-AUTO-6008B34F` | 異例取扱管理メニュー → 照会・検索 | 125 | draft-auto | not-run |
| `BLK-AUTO-04A78248` | 不備内容入力画面-更新 → 項目名検索 | 122 | draft-auto | not-run |
| `BLK-AUTO-1EEBB2B8` | 照会・検索 → 申請・確認更新 | 105 | draft-auto | not-run |
| `BLK-AZ-INPUT-FILL` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 101 | live-verified | live-pass |
| `BLK-AZ-MENU-CREATE-INPUT` | 申込書品質管理メニュー → 不備内容入力画面-新規 | 101 | live-verified | live-pass |
| `BLK-AZ-REGISTER-UPDATE` | 不備内容入力画面-新規 → 不備内容入力画面-更新 | 97 | source-only | not-implemented |
| `BLK-AZ-ITEM-SEARCH-SELECT` | 項目名検索 → 不備内容入力画面-更新 | 74 | source-only | not-implemented |
| `BLK-AUTO-FD73D84C` | 送信先(写)選択 → 取消計上申請承認 | 70 | draft-auto | not-run |
| `BLK-AZ-INQUIRY-EDIT` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 65 | source-only | not-implemented |
| `BLK-AUTO-F56B85CA` | 項目名検索 → 不備内容入力画面-更新 | 59 | draft-auto | not-run |
| `BLK-AUTO-2B9786A5` | 担当者検索 → 申請・確認更新 | 52 | draft-auto | not-run |
| `BLK-AZ-COMMON-LOGS` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 44 | source-only | not-run |
| `BLK-AUTO-931AC2FA` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 43 | draft-auto | not-run |
| `BLK-AUTO-D844ADE8` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 43 | draft-auto | not-run |
| `BLK-AUTO-8A6FB9D4` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 37 | draft-auto | not-run |
| `BLK-AZ-AGENT-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 37 | mock-verified | blocked |
| `BLK-AZ-INSURANCE-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 37 | live-verified | live-pass |
| `BLK-AUTO-81969DB3` | 代理店 不備一覧 → 代理店 不備内容入力画面(更新) | 32 | draft-auto | not-run |
| `BLK-AUTO-13B0C467` | 不備一覧 → 不備内容入力画面-更新 | 30 | draft-auto | not-run |
| `BLK-AUTO-EFF4EAC7` | 送信先(写)選択 → 申請・確認更新 | 26 | draft-auto | not-run |
| `BLK-AUTO-4C432C14` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 25 | draft-auto | not-run |
| `BLK-AUTO-2C41848F` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 22 | draft-auto | not-run |
| `BLK-AUTO-CDE71664` | 不備一覧 → 不備内容入力画面-更新 | 21 | draft-auto | not-run |
| `BLK-AUTO-FECF904C` | 申請・確認更新 → 申請・確認更新 | 20 | draft-auto | not-run |
| `BLK-AUTO-94A5D816` | 申請・確認更新 → 申請・確認更新 | 19 | draft-auto | not-run |
| `BLK-AUTO-40B3B4B5` | 申請承認一覧 → 取消計上申請承認 | 18 | draft-auto | not-run |
| `BLK-AUTO-841A4E18` | 代理店 不備内容入力画面(更新) → 代理店 不備一覧 | 18 | draft-auto | not-run |
| `BLK-AUTO-8F421CAC` | 代理店 不備一覧 → 代理店 不備内容入力画面(更新) | 18 | draft-auto | not-run |
| `BLK-AUTO-D2C3A480` | 申請・確認更新 → 送信先(写)選択 | 18 | draft-auto | not-run |
| `BLK-AUTO-8B197C02` | 訂正内容確認 → 不備内容入力画面-更新 | 14 | draft-auto | not-run |
| `BLK-AZ-CORRECTION-CONFIRM` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 14 | source-only | not-implemented |
| `BLK-AUTO-86C702E1` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 12 | draft-auto | not-run |
| `BLK-AUTO-435A27C8` | 帳票印刷 → 不備内容入力画面-更新 | 10 | draft-auto | not-run |
| `BLK-AUTO-6BC4A518` | 申請承認一覧 → 取消計上申請承認 | 10 | draft-auto | not-run |
| `BLK-AUTO-A9DB855D` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 9 | draft-auto | not-run |
| `BLK-AUTO-1C0EFAAD` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 8 | draft-auto | not-run |
| `BLK-AZ-UPDATE-DELETE-OK` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 5 | source-only | not-run |
| `BLK-AZ-UPDATE-SEARCH-ITEM` | 不備内容入力画面-更新 → 項目名検索 | 5 | source-only | not-implemented |
| `BLK-AUTO-50168786` | ToDo連携データ作成バッチ処理 → ToDo連携データ作成バッチ処理 | 4 | draft-auto | not-run |
| `BLK-AZ-COMPLETE-REGISTER` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 4 | source-only | not-implemented |
| `BLK-AZ-UPDATE-CL` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 3 | source-only | not-run |
| `BLK-AUTO-F0C72208` | 項目名検索 → 項目名検索 | 2 | draft-auto | not-run |
| `BLK-AUTO-EF1B278F` | 照会内容編集 → 不備内容入力画面-更新 | 1 | draft-auto | not-run |

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
| 152 | `不備内容入力画面-更新:display:不備内容入力画面-更新:bundle` |
| 114 | `(blank):other::literal` |
| 65 | `不備内容入力画面-更新:other:ToDo連携テーブル:literal` |
| 61 | `申請・確認更新:inputBundle:各項目:bundle` |
| 55 | `不備内容入力画面-更新:other::literal` |
| 52 | `申請・確認更新:transition:担当者検索:literal` |
| 51 | `不備内容入力画面-更新:click:更新:none` |
| 50 | `不備内容入力画面-更新:click:営業連携:none` |
| 46 | `ToDo連携データ作成バッチ処理:other::literal` |
| 44 | `申請・確認更新:transition:送信先(写)選択:literal` |
| 40 | `不備一覧:display:不備一覧画面:literal` |
| 39 | `不備内容入力画面-更新:click:OK:none` |
| 39 | `不備内容入力画面-更新:click:完了登録:none` |
| 39 | `不備一覧:click:検索:none` |
| 38 | `不備内容入力画面-更新:click:連携取消:none` |

## Full ledgers

- `progress/cases.md`: all 450 cases with done/remaining/next
- `progress/templates.md`: 215 exact procedure templates with aggregate progress
- `blocks/COVERAGE.md`: static block composition and gaps
- `../docs/ROADMAP.md`: owner/next-step plan

## 009 note

`AZ-110-01-009` is environment-blocked at block 4/5 (agent search returns no data). Per instruction, do not diagnose further and do not treat it as a selector bug. Continue with block 6–13 and other block families. Keep the case status `blocked` until the environment allows a rerun.
