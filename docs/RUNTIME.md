# Runtime / automation flow

更新: 2026-10-26

This document explains what actually happens when a case is executed. It separates four layers that were previously easy to confuse:

```text
procedure/expected data
        ↓
case parameters
        ↓
block composition + selector steps
        ↓
node runner + Edge + SUT
        ↓
screenshots / result JSON / status ledger
```

The runner does **not** read the Japanese procedure at runtime. The procedure is precompiled into a block sequence, selector steps, and parameters.

## 1. One case, end to end

For `AZ-110-02-004`:

```text
1. runner.mjs --case AZ-110-02-004
2. load params for the case
3. load blocks.json workflow for the case
4. map each block to block-selectors*.json steps
5. launch Edge
6. open base URL
7. login: UserID + menu_cm, switch to the menu window
8. execute blocks in order:
   menu create -> input fill -> insurance -> agent search -> register -> ...
9. for each step: click/fill/select/assert/popup
10. capture screenshots/evidence
11. write logs/<case>/<case>-node-result.json
12. summarize_mock.py updates mock-results.json / execution-status.json
13. build_blocks.py rebuilds viewer automation data
```

A failure in any layer looks similar in the console, but the fix is different.

## 2. Layer 1 — procedure data

Source:

```text
Excel scenario workbooks
date/document-master_*.json
date/test_documents_*.json
workflow/*.json
        ↓ tools/build_data.py
v2/data/index.js
v2/data/cases/*.js
v2/data/refs.js
v2/data/validation.js
```

`v2/data/cases/*.js` contains the workflow rows and appendix rows. This is the **source of expected data**, but it is not consumed directly by the runner.

Frontend `/v2/index.html` reads this data; that is why the appendix can look correct while a generated param is wrong.

Do not hand-edit `v2/data` for a one-case fix; rebuild it with `tools/build_data.py` if the workbook changes.

## 3. Layer 2 — parameters

```text
appendix 操作内容
        ↓ tools/generate_params_from_appendix.py
param-map.json (label → SUT code)
        ↓
generated.json (per-case params)
        ↓
runner loads params/*.json
```

Files:

| File | Role |
|---|---|
| `automation/cdp/params/param-map.json` | label→code dictionary: `自動車 → 1`, `新種 → 5`, etc. |
| `automation/cdp/params/generated.json` | appendix-derived params for A/C cases |
| `automation/cdp/params/auto.json` | shared fallback defaults |
| `automation/cdp/params/<category>.json` | curated case/category overrides |
| `automation/cdp/params/boundary.json` | error/boundary cases |
| `automation/cdp/params/param-map.json` | not a case file; used by the generator/audit |

### Precedence

`runner.mjs` loads all `params/*.json` and merges per case:

1. `generated.json` first
2. other files alphabetically
3. `auto.json` last
4. first matching file owns a non-empty value; later files only fill `undefined`/empty values

Consequence: if `generated.json` has a wrong non-empty value, a new case file will **not** override it. Fix `generated.json` or fix `param-map.json` and regenerate.

`--strict-params` only checks whether a value came from `auto.json`; it does **not** validate that a code matches the real option list.

## 4. Layer 3 — block composition and selectors

There are two different files, and this distinction is critical:

| File | Answers | Example |
|---|---|---|
| `automation/blocks/blocks.json` | **Which block, in what order?** | menu → input → insurance → agent → register |
| `automation/node-runner/block-selectors*.json` | **How does each block click/fill/assert?** | `#act001to100`, `#policy_number`, `#search` |

`blocks.json` is generated (or composed) from workflow events. It contains:

- block identity, from/to screen
- event pattern
- assertions
- `workflows[caseId].blockDetails` in execution order

`block-selectors*.json` is the hand-curated execution layer. It contains:

- steps: `click`, `fill`, `select`, `assert`, `popup`, `goto`, `manual`
- selectors, values (`params.xxx`), popup match, row assertions
- optional `cases` filters

### Plan resolution

`runner.mjs`:

1. reads `blocks.json.workflows[caseId].blockDetails`
2. for each block, finds a selector block with the same ID
3. if selector is missing, the block is **skipped**, not executed
4. if no workflow exists, falls back to selector blocks whose `cases` includes the case

This is why a case can be “block full” but still not run: composition exists, execution selector is missing or skipped.

### Selector merge

All `block-selectors*.json` files are merged. Later files can override the same block ID. Keep one owner per block; do not duplicate a block across slice files unless intentional.

## 5. Layer 4 — runner

Main files:

| File | Role |
|---|---|
| `automation/node-runner/run.cmd` | Windows wrapper: case, base URL, optional user, `--live` |
| `automation/node-runner/runner.mjs` | Playwright executor |
| `automation/node-runner/url-map.mjs` | mock/source URL → real SUT route |
| `automation/node-runner/package.json` | `playwright-core` dependency |
| `automation/node-runner/mock-server.mjs` | local mock HTTP server |
| `automation/node-runner/mock-src/` | flattened source views for mock |
| `automation/node-runner/mock-routes.json` | mock POST route map |

### Login

The real login page (`dummy.html`) contains:

```html
<input name="UserID">
<input name="BukaCode">
<input name="YakusyokuCode">
<input name="menu_cm" value="メニュー画面">
```

`menu_cm` calls:

```js
window.open(url, 'TOP', ...)
```

So the menu is a **new window**, not the login page. `runner.mjs` fills UserID, clicks `menu_cm`, then scans `context.pages()` for the menu selector and switches to that page.

If `--user`/`loginUser` is absent, login remains manual. If present, it is automatic.

### URL mapping

Mock/source paths:

```text
/AMB/AMA01.html
/AMC00/AMC22.html
/ANB00/ANA01.html
```

Real SUT:

```text
/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00
/mhkagwa11/AMC22?gamid=AMC22&gamcd=AMC00
/mhkcmwa12/ANA01?gamid=ANA01&gamcd=ANA00
```

`url-map.mjs` handles `startUrl` and `step.url` when `--live` is active.

### Step execution

For each step:

- `click` → locator click
- `fill` → input/select (including label-prefix option matching)
- `assert` → visible/hidden/rows/value/text
- `popup` → wait for a page whose URL contains `match`
- `goto` → navigate, but skip if already at the target
- `manual` → record a manual step, do not click

`params.x` is substituted in values; `{params.x}` is substituted in selectors.

## 6. Evidence and result files

```text
logs/<caseId>/
  01_menu.png
  02_r015_....png
  <caseId>-evidence.json
  <caseId>-node-result.json
  <caseId>-trace.json / .html   (with --trace)
```

Result shape:

```json
{
  "caseId": "AZ-110-02-004",
  "status": "pass | partial | fail",
  "blocks": [{"block": "BLK-...", "status": "pass", "fromRow": 14, "toRow": 15}],
  "skipped": ["BLK-..."],
  "shots": ["01_menu.png"],
  "evidence": []
}
```

`tools/summarize_mock.py` reads the latest `*-node-result.json` per case, writes:

- `automation/node-runner/mock-results.json`
- `automation/execution-status.json` (`mockPass`, `notRun`, `status3Map.coded`)

## 7. Viewer data

The viewer does not execute tests. It displays generated data:

| Viewer file | Generated by | Content |
|---|---|---|
| `v2/data/automation.js` | `tools/build_blocks.py` | coverage, block status, runner command |
| `v2/data/runner-defs.js` | `tools/build_runner_defs.py` | per-case block sequence + effective steps |
| `v2/data/params.js` | `tools/build_params_meta.py` | parameter provenance |
| `v2/data/feasibility.js` | `tools/build_feasibility.py` | A/B/C/D feasibility |
| `v2/data/block-quality.js` | block audit | block quality |
| `v2/data/evidence.js` | `tools/build_evidence_data.py` | evidence/manual view |

The **自動化** page and case drawer show these files. Copying the PowerShell command from the viewer only copies text; it does not run anything.

## 8. Mock vs live

| | Mock | Live |
|---|---|---|
| URL | `/AMB/AMA01.html` | `/mhkcmwa11/AMA01?gamid=...` |
| Server | `mock-server.mjs` | real SUT |
| Backend | simulated routes | real Spring app |
| `--live` | not passed | required |
| Dynamic options | simplified | real filtered options |
| Mock pass | means flow shape works | **not** proof of live correctness |

The 446 mock passes are not 446 live passes. The actual environment exposes parameter-code and dynamic-filtering errors that mock does not.

## 9. Where to fix a failure

| Symptom | Layer | File |
|---|---|---|
| `params not found` | case scope/params | `params/*.json`, `run-plan.json` |
| `option not found` | code mapping or selected parent field | `param-map.json` → regenerate `generated.json` |
| input fills an extra field | selector steps | `block-selectors*.json` |
| menu not visible / no next click | login new window | `runner.mjs` menu scan |
| wrong URL / `/AMB/...` on live | URL layer | `url-map.mjs`, base URL, `--live` |
| block skipped | selector missing | `block-selectors*.json` block ID |
| locator timeout | selector/DOM | `block-selectors*.json`, actual HTML |
| assertion fail | expected state | `screen-rules.json`, `case-evidence.json` |
| status not updated | result aggregation | `tools/summarize_mock.py`, `execution-status.json` |
| viewer shows stale | generated data | rerun `build_blocks.py` / `build_runner_defs.py` |

## 10. Regeneration commands

```powershell
# Params from appendix (after fixing param-map.json)
python tools/generate_params_from_appendix.py

# Block composition / coverage / viewer automation data
python tools/build_blocks.py

# Viewer per-case execution definitions
python tools/build_runner_defs.py

# Aggregate latest mock results into status ledger
python tools/summarize_mock.py

# Optional viewer metadata
python tools/build_params_meta.py
python tools/build_feasibility.py
```

## 11. Concrete example: AZ-110-02-004

Current plan: 12 blocks.

```text
BLK-AZ-MENU-CREATE-INPUT
BLK-AZ-INPUT-FILL
BLK-AZ-INSURANCE-SELECT
BLK-AZ-AGENT-SELECT
BLK-AZ-REGISTER-UPDATE
BLK-AUTO-C8BDC3F2
BLK-SHR-63C4E6D6
BLK-AUTO-04A78248
BLK-AZ-ITEM-SEARCH-SELECT
BLK-AZ-INQUIRY-EDIT
BLK-SGL-CCA9B958
BLK-AUTO-4C432C14
```

Observed failures and their layers:

1. `option not found: 11:クルマ...`
   - `largeItemValue` was `5` (新種) instead of `1` (自動車)
   - layer: **param-map → generated.json**
2. agent search input three values
   - block filled section + agent code + field agent ID
   - procedure only says section
   - layer: **block-selectors**
3. login/menu click issue
   - `menu_cm` opens a new window
   - layer: **runner page selection**

This is the key rule: a console error does not tell you the layer; trace back to the step/params/selector that produced it.
