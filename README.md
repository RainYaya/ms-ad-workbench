# MS-AD integration test workbench

Static workbench for the `AZ` / `AY` integration-test procedures, plus a local CDP automation set for the test SUT.

- Viewer: `v2/index.html` (GitHub Pages: <https://rainyaya.github.io/ms-ad-workbench/>)
- Automation: `automation/cdp/`
- Normalized data: `v2/data/`
- Reference webapp snapshots: `reference/webapps/` (local-only by default)

## Start here

| Document | Purpose |
|---|---|
| [`docs/USER-GUIDE.md`](docs/USER-GUIDE.md) | **日常使用说明：只看哪些页面、名词、徽章、数据流** |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Components, boundaries, data flow, deployment |
| [`docs/DATA-MODEL.md`](docs/DATA-MODEL.md) | Scenario/route/case/workflow/appendix schemas |
| [`docs/AUTOMATION.md`](docs/AUTOMATION.md) | CDP runner, screens, blocks, params, evidence |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Why the project is shaped this way |
| [`docs/REFERENCE-WEBAPPS.md`](docs/REFERENCE-WEBAPPS.md) | What the three uploaded webapps are, and what they are not |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Step-by-step plan, owners, acceptance, and what you need to provide |
| [`docs/URL-MAPPING.md`](docs/URL-MAPPING.md) | Why `/AMB/AMA01.html` becomes `/mhkcmwa11/AMA01?...`, and how to run mock vs real |
| [`docs/RUNTIME.md`](docs/RUNTIME.md) | What the runner actually loads and executes, file by file |
| [`docs/WORKLOG-2026-10-24.md`](docs/WORKLOG-2026-10-24.md) | Day log: discussions, conclusions, mistakes, and reasoning from the block-system rework |
| [`automation/blocks/SEMANTIC-NORM.md`](automation/blocks/SEMANTIC-NORM.md) | Semantic normalization rules, block taxonomy, coverage guarantees |
| [`automation/STATUS3.md`](automation/STATUS3.md) | Three-state ledger (planned/coded/verified) in human terms |
| [`automation/ASSIGNED.md`](automation/ASSIGNED.md) | The 450 assigned tasks, templates, and ordering |
| [`automation/steps/DESIGN.md`](automation/steps/DESIGN.md) | Step/block composition model |
| [`automation/steps/INVENTORY.md`](automation/steps/INVENTORY.md) | Raw 450-case step inventory and candidate blocks |
| [`automation/blocks/COVERAGE.md`](automation/blocks/COVERAGE.md) | Static block coverage: 252 blocks, 450/450 composed, 82.4% real-block events |
| [`automation/PROGRESS.md`](automation/PROGRESS.md) | Per-book/per-case progress, done/remaining/next, and block execution state |

## Viewer quick start

The viewer is plain HTML/JS and has no server dependency.

```text
Open v2/index.html directly, or:
python -m http.server 8000
http://127.0.0.1:8000/v2/index.html
```

Data is loaded lazily by category, so the initial page stays small. Progress and imported tasks live in `localStorage`; use **JSON** export for backup, **CSV** for spreadsheet results.

The **自動化** page shows block coverage and runner-ready cases. Each supported case has a copyable PowerShell command; see [`docs/AUTOMATION.md`](docs/AUTOMATION.md).

## Automation quick start

The CDP runner is for the actual SUT, not for the static viewer.

```powershell
cd C:\ms-ad-automation
powershell -ExecutionPolicy Bypass -File .\start-edge.ps1
powershell -ExecutionPolicy Bypass -File .\run-009.ps1 `
  -CaseId AZ-110-01-009 `
  -Port 9223 `
  -BaseUrl "http://127.0.0.1:82/mhkcmwa11/dummy.html"
```

Do not use a default Edge `User Data` directory with CDP. `start-edge.ps1` handles the copied-profile workaround. See [`docs/AUTOMATION.md`](docs/AUTOMATION.md).

## Current status (2026-10-23)

| Area | Status |
|---|---|
| Scenario/route/case data | Built: 347 scenarios, 1,386 cases, 1,371 workflows, 1,277 appendices |
| Route inference | 26 AZ route chains verified by `tools/verify_routes.py` |
| Viewer | Built and deployed; dashboard, scenarios, routes, tasks, case drawer, evidence, automation tab, JSON/CSV export |
| 450 assigned tasks | Grouped: 215 exact procedure signatures, 55 screens, 152 singleton signatures |
| Mock execution | 446 / 450 pass; 4 fail |
| Live execution | 3 blocks verified (009 block 1–3); no fully verified case yet |
| Block composition | 252 blocks (34 curated + 59 auto + 68 shared + 91 singleton); 450/450 composed; 82.4% real-block events; 3 verified blocks |
| `AZ-110-01-009` | Block 1–3 pass on actual SUT; block 4/5 blocked on agent search returning no rows; block 6–13 not implemented |
| `AZ-110-01-010..012` | Same 44-row procedure; parameterized runner passes mock, not yet run on actual SUT |
| Reference webapps | Extracted locally; excluded from git/Pages by default |

## Repository map

```text
v2/                 viewer + normalized data
automation/         task plan, screen evidence, CDP runner, step inventory
tools/              data build, route verification, task/step analysis
date/, workflow/    source snapshots used by the data build
reference/webapps/  client webapp snapshots (local-only)
docs/               architecture, data model, automation, decisions
HANDOFF.MD          working handoff (not the architecture spec)
```

## Non-goals

- No backend, database, authentication, or multi-user sync.
- No automatic master-data repair.
- No claim that all 450 assigned tasks share one procedure; only exact-signature groups can share a template.
- No publishing of client webapp sources until visibility is confirmed.
