# Block pilot

更新: 2026-10-23

Two proofs before scaling to 450 cases:

1. **009–012** — one full workflow, four parameter sets.
2. **37 / 67** — one shared prefix, two different tails.

This file is the **pilot rationale**. The machine-readable registry is `blocks.json` (15 blocks: the 8 pilot blocks plus the 009 block 6–13 decomposition). Coverage: `COVERAGE.md`.

Selectors marked `source-only` must be confirmed against the live DOM.

## Block contract

```text
BLK-*
  fromScreen
  toScreen
  params
  preconditions
  steps[]       # ACT / AST references
  assertions[]  # mandatory postconditions
  status        # draft | source-only | live-verified
  usedByCases   # filled by composition, not hand-maintained
```

## Pilot blocks

### BLK-AZ-MENU-SEARCH-LIST

- `fromScreen`: `AZG001` 申込書品質管理メニュー
- `toScreen`: 不備一覧（source: `AZG200`）
- `params`: none
- `steps`: click `#act001to200`（検索）
- `assertions`: transition 不備一覧 / 初期値
- `status`: selector `#act001to200` live-verified on AZG001; the transition is procedure-verified. This block is for 37/67-style flows, not the 009 new-registration flow.

### BLK-AZ-LIST-FILTER-OPEN-UPDATE

- `fromScreen`: 不備一覧
- `toScreen`: `AZG101` 不備内容入力画面-更新
- `params`: `caseSearch` = `{ policyNo, detailNo }` (plus optional filters)
- `preconditions`: at least one result row
- `steps`: input bundle → click 検索 → click `No` row link
- `assertions`: result rows visible; transition 更新; `expected#1`
- `status`: selector for search source-only; row link/expected live-required
- `usedByCases`: 152 candidate cases in the raw inventory

### BLK-AZ-UPDATE-CL

- `fromScreen`: `AZG101` 更新
- `toScreen`: `AZG101` 更新
- `params`: none
- `steps`: click `CL`（`name="imperfectClear[n]"`）for the target row
- `assertions`: 不備情報がクリアされること
- `status`: source-only (`AMA04.html`); 37 tail

### BLK-AZ-UPDATE-DELETE-OK

- `fromScreen`: `AZG101` 更新
- `toScreen`: `AZG101` 更新
- `params`: none
- `steps`: click `#delete` → click confirmation `OK`
- `assertions`: record no longer displayed; `MAZG101I100` message
- `status`: source-only; 67 tail

### BLK-AZ-MENU-CREATE-INPUT

- `fromScreen`: `AZG001`
- `toScreen`: `AZG100`
- `steps`: click `#act001to100`（新規登録）
- `assertions`: transition 不備内容入力画面-新規
- `status`: live-verified (009 block 1)

### BLK-AZ-INPUT-FILL

- `fromScreen`: `AZG100`
- `toScreen`: `AZG100`
- `params`: `caseInput` bundle
- `steps`: fill input type, item, policy, detail, section, agent, sub/free code, customer, start date, application type, sumup fields, reminder date
- `assertions`: values read back from the screen
- `status`: live-verified (009 block 2)

### BLK-AZ-INSURANCE-SELECT

- `fromScreen`: `AZG100`
- `toScreen`: `AZG100`
- `params`: `insuranceLabel`
- `steps`: click `input[name="selectInsuransuItem"]` → wait popup → select by normalized label → click `input[name="ok"]`
- `assertions`: popup closes; parent hidden value/title updated
- `status`: live-verified (009 block 3)

### BLK-AZ-AGENT-SELECT

- `fromScreen`: `AZG100`
- `toScreen`: `AZG100`
- `params`: `sectionCode`, `agentCode`, `fieldAgentId`
- `steps`: click `input[name="selectFieldAgent"]` → fill `#section_code_key` / `#agent_code_key` → click `#search` → select row → click `input[name="closeSelect"]`
- `assertions`: `#field_agent_id` equals param; `#field_agent_name` populated
- `status`: block 4/5 actual SUT **blocked**; mock passes

## Compositions

### 009–012

```text
WKF-AZ-110-01-009
  BLK-AZ-MENU-CREATE-INPUT
  BLK-AZ-INPUT-FILL
  BLK-AZ-INSURANCE-SELECT
  BLK-AZ-AGENT-SELECT
  ... blocks 6–13 pending ...
```

One workflow, four parameter sets. `009` / `010` / `011` / `012` differ only in user, item, insurance label, and detail number.

### 37 / 67

```text
WKF-AZ-110-37-001
  BLK-AZ-MENU-SEARCH-LIST
  BLK-AZ-LIST-FILTER-OPEN-UPDATE
  BLK-AZ-UPDATE-CL

WKF-AZ-110-67-001
  BLK-AZ-MENU-SEARCH-LIST
  BLK-AZ-LIST-FILTER-OPEN-UPDATE
  BLK-AZ-UPDATE-DELETE-OK
```

The first two blocks are identical. Only the tails differ. Do not duplicate the prefix in two scripts.

## Acceptance criteria

A pilot is successful when:

1. 009–012 compose from one WKF with four param sets; no case-specific JS in the blocks.
2. 37/67 compose from the same two prefix blocks; no duplicated prefix code.
3. Every block has `fromScreen`, `toScreen`, params, and assertions.
4. The composer can report **uncovered steps** instead of silently dropping them.
5. Source-only selectors are clearly marked and never presented as live-verified.

## Next actions

1. Curate these 8 blocks against the live DOM (or source + mock).
2. Add block 6–13 definitions for 009.
3. Build the case → block coverage report.
4. Only then scale to the high-frequency templates.
