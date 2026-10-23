# Assigned tasks / automation plan

更新: 2026-10-23

源文件: `automation/tasks/assigned_20261023.txt` / **450 tasks**

## 1. Overview

| Domain | Tasks |
|---|---:|
| AZ | 309 |
| AY | 141 |

| Category | Tasks |
|---|---:|
| AZ-110 | 62 |
| AY-120 | 60 |
| AZ-230 | 57 |
| AZ-210 | 53 |
| AZ-310 | 50 |
| AY-121 | 50 |
| AZ-200 | 25 |
| AZ-111 | 18 |
| AZ-150 | 14 |
| AY-100 | 11 |
| AZ-410 | 10 |
| AY-110 | 10 |
| AZ-160 | 7 |
| AZ-100 | 4 |
| AY-410 | 4 |
| AZ-120 | 3 |
| AY-122 | 3 |
| AY-130 | 3 |
| AZ-220 | 2 |
| AZ-240 | 2 |
| AZ-112 | 1 |
| AZ-510 | 1 |

## 2. Conclusion first

- `AZ-110-01-009` / `010` / `011` / `012` are **one exact 44-row procedure signature**. Once 009 is stable, 010-012 only need parameter changes.
- `AZ-110-01-001` is the exception (42 rows, 代理店開放時); it is **not** in the assigned list.
- Other `AZ-110-01-xx` (002-008) share the same 44-row signature as 009; if assigned later, add params, not a new script.
- But the assigned list is **not 450 identical cases**: exact-signature grouping gives **215 templates**, of which **152 are single-case**. 55 distinct screens appear.
- So the correct unit is: **screen library (55) + procedure template (215) + case params (450)**. Do not build 450 scripts and do not rebuild selectors per case.

## 3. Template coverage

| Templates (top by count) | Tasks covered | Coverage |
|---:|---:|---:|
| 5 | 72 | 16.0% |
| 10 | 121 | 26.9% |
| 15 | 160 | 35.6% |
| 20 | 186 | 41.3% |
| 30 | 225 | 50.0% |
| 50 | 272 | 60.4% |
| 100 | 335 | 74.4% |

## 4. Top templates

| Template | Tasks | Rows | Scenarios | Status |
|---|---:|---:|---|---|
| `TPL-AZ-210-37-008` | 20 | 17 | AZ-210-37, AZ-310-02 | not_started |
| `TPL-AY-120-09-004` | 20 | 11 | AY-120-09, AY-121-08 | not_started |
| `TPL-AY-120-07-015` | 12 | 22 | AY-120-07, AY-121-06 | not_started |
| `TPL-AZ-110-05-008` | 10 | 42 | AZ-110-05 | not_started |
| `TPL-AZ-310-01-011` | 10 | 40 | AZ-310-01 | not_started |
| `TPL-AY-120-01-003` | 10 | 34 | AY-120-01 | not_started |
| `TPL-AY-120-06-003` | 10 | 34 | AY-120-06 | not_started |
| `TPL-AY-120-04-009` | 10 | 17 | AY-120-04 | not_started |
| `TPL-AY-121-03-005` | 10 | 17 | AY-121-03 | not_started |
| `TPL-AY-120-08-002` | 9 | 10 | AY-120-08, AY-121-07, AY-122-01 | not_started |
| `TPL-AZ-200-01-001` | 9 | 3 | AZ-200-01 | not_started |
| `TPL-AY-121-01-011` | 8 | 34 | AY-121-01 | not_started |
| `TPL-AY-110-01-011` | 8 | 25 | AY-110-01 | not_started |
| `TPL-AY-121-05-002` | 7 | 17 | AY-121-05 | not_started |
| `TPL-AZ-310-08-001` | 7 | 12 | AZ-310-08, AZ-410-06, AZ-410-08, AZ-410-09 | not_started |
| `TPL-AZ-110-24-009` | 6 | 10 | AZ-110-24 | not_started |
| `TPL-AY-120-03-002` | 5 | 38 | AY-120-03 | not_started |
| `TPL-AZ-310-04-020` | 5 | 23 | AZ-310-04 | not_started |
| `TPL-AZ-110-37-001` | 5 | 14 | AZ-110-37, AZ-110-42, AZ-210-10, AZ-210-14 | not_started |
| `TPL-AZ-110-67-001` | 5 | 13 | AZ-110-67, AZ-110-68, AZ-110-69, AZ-110-70 | not_started |

## 5. AZ-110 assigned tasks

| Template | Tasks | Rows | Scenarios | Status |
|---|---:|---:|---|---|
| `TPL-AZ-110-05-008` | 10 | 42 | AZ-110-05 | not_started |
| `TPL-AZ-110-24-009` | 6 | 10 | AZ-110-24 | not_started |
| `TPL-AZ-110-37-001` | 5 | 14 | AZ-110-37, AZ-110-42, AZ-210-10, AZ-210-14, AZ-310-21 | not_started |
| `TPL-AZ-110-67-001` | 5 | 13 | AZ-110-67, AZ-110-68, AZ-110-69, AZ-110-70, AZ-110-71 | not_started |
| `TPL-AZ-110-01-009` | 4 | 44 | AZ-110-01 | blocked_environment |
| `TPL-AZ-110-36-001` | 4 | 14 | AZ-110-36, AZ-110-41, AZ-310-18, AZ-310-38 | not_started |
| `TPL-AZ-110-62-001` | 4 | 13 | AZ-110-62, AZ-110-65, AZ-310-36, AZ-410-11 | not_started |
| `TPL-AZ-110-64-001` | 4 | 13 | AZ-110-64, AZ-310-20, AZ-310-35, AZ-310-39 | not_started |
| `TPL-AZ-110-02-002` | 3 | 42 | AZ-110-02 | not_started |
| `TPL-AZ-110-14-001` | 3 | 18 | AZ-110-14, AZ-110-39, AZ-310-23 | not_started |
| `TPL-AZ-110-25-002` | 3 | 11 | AZ-110-25 | not_started |
| `TPL-AZ-110-13-005` | 2 | 23 | AZ-110-13, AZ-110-19 | not_started |
| `TPL-AZ-110-15-001` | 2 | 16 | AZ-110-15, AZ-110-34 | not_started |
| `TPL-AZ-110-17-002` | 2 | 25 | AZ-110-17 | not_started |
| `TPL-AZ-110-25-001` | 2 | 15 | AZ-110-25, AZ-310-19 | not_started |
| `TPL-AZ-110-35-001` | 2 | 30 | AZ-110-35, AZ-110-40 | not_started |
| `TPL-AZ-110-38-001` | 2 | 18 | AZ-110-38, AZ-310-22 | not_started |
| `TPL-AZ-110-63-001` | 2 | 34 | AZ-110-63, AZ-110-66 | not_started |
| `TPL-AZ-110-02-001` | 1 | 46 | AZ-110-02 | not_started |
| `TPL-AZ-110-16-001` | 1 | 30 | AZ-110-16 | not_started |
| `TPL-AZ-110-17-001` | 1 | 29 | AZ-110-17 | not_started |
| `TPL-AZ-110-18-001` | 1 | 13 | AZ-110-18 | not_started |
| `TPL-AZ-110-19-001` | 1 | 27 | AZ-110-19 | not_started |
| `TPL-AZ-110-33-004` | 1 | 8 | AZ-110-33 | not_started |
| `TPL-AZ-110-79-001` | 1 | 46 | AZ-110-79 | not_started |
| `TPL-AZ-110-80-001` | 1 | 60 | AZ-110-80 | not_started |
| `TPL-AZ-110-81-001` | 1 | 32 | AZ-110-81 | not_started |
| `TPL-AZ-110-82-001` | 1 | 60 | AZ-110-82 | not_started |

## 6. Common screens (selector work)

Full 55-screen list and capture status: `automation/screens/SCREENS.md`.

| Screen | Occurrences |
|---|---:|
| 不備内容入力画面－更新 | 434 |
| 申込書品質管理メニュー画面 | 309 |
| 不備一覧画面 | 283 |
| 申請・確認更新画面 | 179 |
| 不備内容入力画面－新規 | 175 |
| 異例取扱管理メニュー画面 | 173 |
| 項目名検索画面 | 133 |
| 照会・検索画面 | 132 |
| 不備内容入力画面-更新 | 124 |
| 送信先(写)選択画面 | 104 |
| ToDo連携データ作成バッチ処理 | 94 |
| 代理店 不備一覧画面 | 70 |
| 照会内容編集画面 | 66 |
| 代理店 不備内容入力画面（更新） | 63 |
| 担当者検索画面 | 60 |
| 取消計上申請承認画面 | 46 |
| 申請承認一覧画面 | 38 |
| 保険種類選択画面 | 37 |
| 募集人検索画面 | 37 |
| 帳票印刷画面 | 36 |
| メール通知先選択画面 | 31 |
| 訂正内容確認画面 | 29 |
| その他（申込書品質管理） | 19 |
| ★対応登録（承認時） | 12 |
| ★対応登録（不承認時） | 12 |

## 7. Execution plan

1. Fix the current AZ-110 block 4/5 blocker: 募集人検索 returns no rows. This affects every AZ-110 flow that uses agent search.
2. `TPL-AZ-110-01-009` (009-012): runner and params are in place (`run-009.ps1 -CaseId`, `automation/cdp/params/AZ-110-01.json`); all four pass mock. Actual run still blocked at block 4/5 agent search. Each case needs a manual login switch (`MS-3n`, `MS-4n`, `MS-2n`).
3. Build a screen selector registry for the 55 screens. F12/HTML is needed **once per screen**, not once per case.
4. Implement the high-count templates first (20/20/12/10/10...). Each template gets one runner and a params table.
5. For each template, run one representative case, then run all cases in the group by swapping params.
6. Screenshots per verification row: `blockNN_rowNNN_*.png`, same as `automation/screens/MANIFEST.md`.

## 8. Blockers / unknowns

- 009 block 4/5: 募集人検索 popup returns no rows on the actual SUT; master data or search condition issue.
- The result-row HTML of AZG905 after search is not captured yet; selection logic currently guesses radio + `closeSelect`.
- 152 templates are single-case; their screens may still be reused, but their action sequences differ. Estimate selectors per screen first, then template scripts.
- AY flows use a different approval state machine and different screens; they are separate from AZ templates.
