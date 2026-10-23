# Progress ledger

更新: 2026-10-23

This is the per-book / per-case progress table. It is separate from static block coverage: `block full` does not mean the case was executed.

## Snapshot

| Item | Count |
|---|---:|
| Assigned cases | 450 |
| Static block full | 12 |
| Actually fully passed | 0 |
| Actually partially passed | 1 |
| Mock-only | 3 |
| Environment-blocked cases | 1 |
| Blocks | 15 |

Block execution state:

| State | Blocks |
|---|---:|
| live-pass | 3 |
| mock-pass | 0 |
| blocked | 1 |
| not-implemented | 6 |
| not-run | 5 |

## Blocks

| Block | From → To | Cases | Selector | Execution |
|---|---|---:|---|---|
| `BLK-AZ-MENU-SEARCH-LIST` | 申込書品質管理メニュー → 不備一覧 | 195 | source-only | not-run |
| `BLK-AZ-LIST-FILTER-OPEN-UPDATE` | 不備一覧 → 不備内容入力画面-更新 | 183 | source-only | not-run |
| `BLK-AZ-INPUT-FILL` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 101 | live-verified | live-pass |
| `BLK-AZ-MENU-CREATE-INPUT` | 申込書品質管理メニュー → 不備内容入力画面-新規 | 101 | live-verified | live-pass |
| `BLK-AZ-REGISTER-UPDATE` | 不備内容入力画面-新規 → 不備内容入力画面-更新 | 97 | source-only | not-implemented |
| `BLK-AZ-ITEM-SEARCH-SELECT` | 項目名検索 → 不備内容入力画面-更新 | 74 | source-only | not-implemented |
| `BLK-AZ-INQUIRY-EDIT` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 65 | source-only | not-implemented |
| `BLK-AZ-COMMON-LOGS` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 64 | source-only | not-run |
| `BLK-AZ-AGENT-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 37 | mock-verified | blocked |
| `BLK-AZ-INSURANCE-SELECT` | 不備内容入力画面-新規 → 不備内容入力画面-新規 | 37 | live-verified | live-pass |
| `BLK-AZ-CORRECTION-CONFIRM` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 14 | source-only | not-implemented |
| `BLK-AZ-UPDATE-DELETE-OK` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 5 | source-only | not-run |
| `BLK-AZ-UPDATE-SEARCH-ITEM` | 不備内容入力画面-更新 → 項目名検索 | 5 | source-only | not-implemented |
| `BLK-AZ-COMPLETE-REGISTER` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 4 | source-only | not-implemented |
| `BLK-AZ-UPDATE-CL` | 不備内容入力画面-更新 → 不備内容入力画面-更新 | 3 | source-only | not-run |

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
| 262 | `不備内容入力画面-更新:display:不備内容入力画面-更新:bundle` |
| 208 | `送信先(写)選択:click:OK:none` |
| 141 | `不備内容入力画面-更新:click:OK:none` |
| 136 | `照会・検索:click:検索:none` |
| 133 | `照会・検索:inputBundle:各項目:bundle` |
| 128 | `不備内容入力画面-更新:transition:項目名検索:literal` |
| 125 | `異例取扱管理メニュー:click:照会・検索:none` |
| 125 | `異例取扱管理メニュー:transition:照会・検索:literal` |
| 122 | `不備内容入力画面-更新:click:検索:none` |
| 121 | `照会・検索:display:照会・検索画面:literal` |
| 121 | `照会・検索:click:No:none` |
| 114 | `(blank):other::literal` |
| 111 | `照会・検索:transition:申請・確認更新:bundle` |
| 107 | `ToDo連携データ作成バッチ処理:other:ToDo連携テーブル:literal` |
| 104 | `送信先(写)選択:click:検索:none` |

## Full ledgers

- `progress/cases.md`: all 450 cases with done/remaining/next
- `progress/templates.md`: 215 exact procedure templates with aggregate progress
- `blocks/COVERAGE.md`: static block composition and gaps
- `../docs/ROADMAP.md`: owner/next-step plan

## 009 note

`AZ-110-01-009` is environment-blocked at block 4/5 (agent search returns no data). Per instruction, do not diagnose further and do not treat it as a selector bug. Continue with block 6–13 and other block families. Keep the case status `blocked` until the environment allows a rerun.
