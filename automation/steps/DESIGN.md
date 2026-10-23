# Step / block composition design

更新: 2026-10-23

## 1. Model

```
CASE  = WKF + PARAMS
WKF   = ordered/graph of BLK
BLK   = fromScreen + [ACT|AST...] + toScreen + PARAMS schema + preconditions
ACT   = screen + action + target + dataBinding
AST   = screen + assertion + target + expectedBinding
```

Five layers, not one flat step list:

| Layer | ID | What it is |
|---|---|---|
| Screen | `SCR-*` | Actual page/popup; stable URL/title/selector root |
| Action | `ACT-*` | One field-level write or one click/select/check |
| Assertion | `AST-*` | One observable check: screen, field, row set, message, log, DB |
| Block | `BLK-*` | Reusable screen-level cluster with pre/post screen and param schema |
| Workflow | `WKF-*` | Composition of blocks for one procedure signature |
| Case | `CASE-*` | WKF + concrete parameter set |

A block is **not** just a text fragment. It has:

- `fromScreen` / `toScreen`: where it can start and what it guarantees.
- `params`: typed inputs it consumes (`policyNo`, `detailNo`, `bundle:caseSearch`, ...).
- `assertions`: what must be true before the next block starts.
- `variants`: explicit branches, not hidden `if` in code.

## 2. Canonical step signature

```
screen | action | target | dataBinding | assertion
```

Normalize only obvious synonyms:

- whitespace, full-width/half-width, dash variants
- `「検索」押下` / `「検索」ボタン押下` / `検索ボタン押下` -> `click / 検索`
- `No` / `NO` / `No.` -> `No`
- `別紙 入力内容：N参照` -> `bundle:input#N`
- `別紙 表示内容：N参照` -> `bundle:expected#N`

Do **not** merge:

- `OK` on different popups/screens
- `検索` on 不備一覧 / メニュー / 照会・検索
- `選択` with different row/radio preconditions
- `削除` with/without confirmation

Screen context is part of the key. A global button dictionary is not enough.

## 3. Data binding

Every value is one of:

| Binding | Example | Treatment |
|---|---|---|
| `literal` | `AHE61` | fixed in template |
| `case` | `policyNo` | from params |
| `bundle` | `inputContent#1` | 別紙 field map, expanded to field-level writes |
| `derived` | system date +7, login user, 照会ID | computed at run time |
| `expected` | `表示内容#1` | expected state bundle, not input |

`各項目に入力` is a **bundle operation**, not an atomic action. The block stores the bundle schema; the executor expands it to field-level actions. That keeps the block readable while still making each field parameterized and assertable.

`表示内容：N参照` and `初期値` are **expected-state bundles**. They must be expanded to field/row assertions. If only operations are reused, the result is action automation without test verification.

## 4. Block examples

### BLK-MENU-SEARCH-LIST

```
from: 申込書品質管理メニュー
  click 検索
  assert transition 不備一覧 (初期値)
to: 不備一覧
```

Used by 165 assigned cases.

### BLK-LIST-SEARCH-OPEN-UPDATE

```
from: 不備一覧
  input bundle: caseSearch
  click 検索
  click No (first matching row policy)
  assert transition 不備内容入力画面-更新 (expected#1)
to: 不備内容入力画面-更新
```

Used by 152 assigned cases. `caseSearch` includes `証券番号`, `明細番号`, and optional filters.

### 37 / 67 composition

`AZ-110-37-001` and `AZ-110-67-001` share the first **6 events** exactly:

```
BLK-MENU-SEARCH-LIST
BLK-LIST-SEARCH-OPEN-UPDATE
```

Then they diverge:

| Case | Tail |
|---|---|
| 37 | `click CL (営業照会の不備情報全て)` -> display -> `click 更新` -> AP/DB log |
| 67 | `click 削除` -> `click OK` -> display -> AP/DB log -> 申込書テーブル |

So the shared part is one composition, not two scripts. The tails are different blocks.

### 009-012

All four cases share the complete 44-event sequence. Only parameters differ:

- 種目 / 保険種類: 自賠責, 貨物, 種目共通, その他
- 明細番号: 0000000009..12
- login user / 点検区分: MS-3n, MS-4n, MS-2n
- 保険種類は value ではなく表示 label で選ぶ

This is the strongest case: one workflow, four parameter sets.

## 5. Reuse rules

1. **Assertions are first-class.** A block without a postcondition cannot be safely composed.
2. **Contract first.** `fromScreen` and `toScreen` are mandatory; otherwise blocks cannot be connected.
3. **Parameterize data, not control flow.** Do not put case-specific `if` branches into a block. Model branches as block variants.
4. **Keep bundles readable.** One `inputBundle` step can expand to many field-level actions internally.
5. **Allow custom blocks.** 152 exact signatures are singletons; forcing reuse creates false abstractions. Keep `BLK-CUSTOM-*` and report them.
6. **Reuse is measured, not assumed.** Track each block's `usedByCases` and `usedByWorkflows`. A block used once is not a reuse win.
7. **Screen selectors are captured once.** 55 raw screen names; selector failures are fixed once, not per case.

## 6. What "全部梳理" means

1. **Inventory**: all workflow rows of 450 assigned cases; normalize and assign IDs.
2. **Pair**: operation row + verification row -> action/assertion event sequence.
3. **Expand**: 別紙 input/expected tables -> typed bundles.
4. **Mine**: repeated contiguous events per screen -> candidate blocks.
5. **Curate**: manually review candidate blocks, set boundaries, pre/postconditions, variants.
6. **Compose**: each case = ordered/graph of block IDs; gap report for uncomposable cases.
7. **Implement**: high-frequency blocks first; custom blocks last.
8. **Verify**: run 009-012 as one workflow; 37/67 as shared-prefix proof; then expand.

## 7. Anti-patterns

- A flat dictionary of button texts: `検索` is not reusable without screen context.
- Treating `各項目に入力` as one opaque step: hides the fields that actually vary.
- Reusing only actions and hand-writing assertions per case: still O(cases).
- Over-normalizing `No/NO` and `OK` across screens: merges different semantics.
- Forcing all 450 into one workflow: loses branches/loops/error paths.
- Building 450 scripts: duplicate selectors, duplicate waits, duplicate evidence logic.

## 8. Prototype status

`automation/steps/INVENTORY.md` and `inventory.json` are the **raw inventory + candidate blocks**:

- 450 cases, 10,803 events
- 55 raw screen names (51 canonical after dash/画面 normalization)
- 395 operation signatures, 441 assertion signatures
- 215 exact 6-field procedure signatures
- 37/67 common event prefix = 6; 009/010 common event prefix = 44

These are candidate blocks, not approved. The next step is manual curation and 別紙 bundle expansion.
