# Architecture

更新: 2026-10-23

## 1. Purpose

This repo has three jobs:

1. **Make the test scope navigable** — turn the two scenario workbooks into a browsable scenario → route → case hierarchy.
2. **Make execution evidence persistent** — record status/result/defect/evidence per case, not in chat.
3. **Make repeat execution cheap** — drive the local SUT through CDP with reusable screen/block/parameter definitions.

It is deliberately split into a **static viewer** and a **local automation harness**. The viewer is deployed; the harness runs on the test machine because it needs Edge and the SUT.

## 2. Component map

```text
Excel scenario workbooks ─┐
document-master JSON     ─┼─> tools/build_data.py ─> v2/data/index.js
test_documents JSON      ─┤                         v2/data/cases/*.js
workflow/*.json          ─┘                         v2/data/refs.js
                                                    v2/data/validation.js
                                                              │
                                                              ▼
                                                     v2/ static viewer
                                                     (localStorage progress)

automation/tasks/*.txt ─> tools/analyze_assigned.py ─> templates.json / ASSIGNED.md
workflow rows         ─> tools/analyze_steps.py    ─> steps/inventory.json / INVENTORY.md
                                                              │
automation/runners.json + blocks ─> tools/build_blocks.py ─> blocks/blocks.json / COVERAGE.md
                                                              │
                                                              ▼
                                                   v2/data/automation.js (viewer)
                                                              │
                                                              ▼
automation/cdp ─> Edge (CDP) ─> SUT at 127.0.0.1:10081 ─> screenshots/logs
```

The viewer and the runner share **the same normalized procedure data and IDs**, but they do not share a database. The viewer reads static JS; the runner reads its own params JSON and CDP scripts.

## 3. Repository layout

| Path | Responsibility |
|---|---|
| `v2/index.html` | Viewer shell, nav, filters, drawer |
| `v2/js/app.js` | Viewer logic: routing, rendering, progress, task import, export, automation locator editor |
| `v2/css/style.css` | Viewer styling |
| `v2/data/index.js` | `MSAD_INDEX`: categories, scenarios, routes, case index |
| `v2/data/cases/*.js` | `MSAD_CASES_<CATEGORY>`: full workflow + appendix payloads, lazy-loaded |
| `v2/data/refs.js` | `MSAD_REFS`: users, timezone, status matrix, ToDo patterns/routes |
| `v2/data/validation.js` | `MSAD_VALIDATION`: counts and known data-quality warnings |
| `v2/data/automation.js` | `MSAD_AUTOMATION`: block coverage + runner readiness for the 自動化 page |
| `tools/build_data.py` | Excel/JSON → normalized data |
| `tools/verify_routes.py` | Route chain verification against workbook inference |
| `tools/analyze_assigned.py` | 450-task grouping, template registry, screen registry, assigned plan |
| `tools/analyze_steps.py` | Raw step inventory and candidate block mining |
| `tools/build_blocks.py` | Block registry, static composer, coverage report, viewer payload |
| `automation/AZ-110-01-009.md` | Canonical 009 progress, params, selectors, blockers |
| `automation/ASSIGNED.md` | 450-task plan and execution order |
| `automation/templates.json` | 215 exact procedure templates |
| `automation/screens/` | Captured HTML, screen manifest, screen registry |
| `automation/blocks/` | Block registry, coverage, pilot composition |
| `automation/cdp/` | PowerShell CDP client, Edge starter, template runner, mock, params |
| `automation/steps/` | Composition design + raw inventory |
| `automation/runners.json` | Runner/case registry consumed by the viewer |
| `reference/webapps/` | Client source snapshots; local-only by default |
| `legacy.html` | Previous root application, retained for fallback |

## 4. Viewer design

### 4.1 Navigation model

```text
Dashboard
  ├─ category rollup
  ├─ scenarios
  │    └─ scenario detail (flow + cases + routes)
  ├─ routes (implementation order)
  ├─ files (source files / appendices)
  ├─ tasks (imported assignment list)
  ├─ automation (block coverage, runner commands)
  └─ refs (users, timezone, status matrix, ToDo patterns)
```

A case opens in a drawer from any list. The drawer has five tabs:

| Tab | Content |
|---|---|
| 手順 | Workflow rows grouped into blocks; operation and verification side by side |
| 別紙 | Input/expected appendix tables, compact or raw |
| 証跡 | One checkbox per `evidenceType` row |
| 自動化 | Locator JSON, generated Console snippet, seed rows, selector suggestions |
| メモ | Free text |

### 4.2 Data loading

`index.js` contains only the index. Full case payloads live in per-category `cases/*.js` and are injected as script tags on first access (`ensureCaseData`). This keeps the initial page usable on a modest connection.

### 4.3 Persistence

All mutable state is browser-local:

| Key | Shape |
|---|---|
| `msad.progress.v1` | `{ [caseId]: { execution, result, verify, defectNo, executedAt, executedBy, verifiedAt, verifiedBy, memo, evidence } }` |
| `msad.tasks.v1` | `{ ids: string[], importedAt: string }` |
| `msad.automation.v1` | `{ [caseId]: { scriptType, locators: [...] } }` |
| `msad.ui.v1` | UI preferences |

**Consequence:** clearing browser storage loses progress. Export JSON regularly; CSV is for reporting, not round-trip import.

### 4.4 Export

- **JSON** (`exportAll`): versioned payload with `progress`, `tasks`, `automation`; can be merged back.
- **CSV** (`exportCsv`): per-case result row, UTF-8 BOM, for spreadsheet use.
- **Case JSON** (`exportCase`): one case with metadata, workflow/appendix, automation, progress.

## 5. Data flow and source of truth

1. `tools/build_data.py` reads the two scenario workbooks, `document-master`, `test_documents`, and `workflow/*.json`.
2. It emits `v2/data/index.js`, `cases/*.js`, `refs.js`, `validation.js`.
3. The viewer never reads Excel at runtime.
4. The case ID (`AZ-110-01-009`) is the join key across document master, workflow, appendix, route, progress, automation, and evidence.

**Source of truth:** the workbook/document set, not the browser state and not the viewer. If a procedure changes, rebuild data; do not hand-edit `v2/data` unless it is a deliberate patch.

See [`DATA-MODEL.md`](DATA-MODEL.md) for field-level schemas.

## 6. Automation design

The automation harness is separate from the viewer:

- `Cdp.ps1` — minimal CDP client: connect, evaluate, wait, popup targeting, screenshot.
- `start-edge.ps1` — closes Edge, copies the profile to a non-default directory, launches with `--remote-debugging-port`.
- `run-009.ps1` — template runner for `AZ-110-01-009..012`; reads `params/AZ-110-01.json`, executes blocks 1–5, captures screenshots.
- `automation/cdp/mock/` — local mock used to test the runner without the SUT.

Execution logic is **procedural, not record-and-playback**: selectors and waits are explicit; screenshots are named by block/sourceRow.

The intended next layer is a block library:

```text
CASE -> WKF -> BLK -> ACT/AST
```

A block has `fromScreen`, `toScreen`, parameters, and assertions. See [`AUTOMATION.md`](AUTOMATION.md) and [`../automation/steps/DESIGN.md`](../automation/steps/DESIGN.md).

## 7. Deployment

- GitHub repo: `RainYaya/ms-ad-workbench` (private).
- Pages: `main` branch, root `/`, `.nojekyll` required.
- Root `index.html` redirects to `v2/index.html`.
- `v2/` is plain static files; no build step.
- `reference/webapps/` is excluded from git/Pages by default because it contains client source snapshots.

**Do not** add a server-side assumption to the viewer. It must keep working from `file://` and GitHub Pages.

## 8. Current status

| Area | State |
|---|---|
| Data build | 347 scenarios (307 AZ / 40 AY), 1,386 cases, 1,371 workflows, 1,277 appendices |
| Routes | 170 AZ + 31 AY; 26 AZ chains verified |
| Viewer | Complete for browsing, progress, evidence, tasks, export |
| Assigned tasks | 450 (309 AZ / 141 AY), 215 exact signatures, 55 screens |
| 009 | Actual block 1–3 pass; block 4/5 blocked; block 6–13 pending |
| 010–012 | Parameterized, mock pass; actual pending |
| Static block composition | 34 auto-inclusive / 12 curated-only full; 416 partial; 7,345/10,803 events (68.0% / 30.9%) |

## 9. Boundaries / non-goals

- No backend, DB, auth, or multi-user sync.
- No automatic repair of missing appendix/workflow data.
- No assumption that all 450 tasks are one procedure.
- No publication of reference webapp sources without a visibility decision.

## 10. Related documents

- [`DATA-MODEL.md`](DATA-MODEL.md)
- [`AUTOMATION.md`](AUTOMATION.md)
- [`DECISIONS.md`](DECISIONS.md)
- [`REFERENCE-WEBAPPS.md`](REFERENCE-WEBAPPS.md)
- [`../automation/ASSIGNED.md`](../automation/ASSIGNED.md)
