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
| [`docs/PIPELINE-DEEP-DIVE.md`](docs/PIPELINE-DEEP-DIVE.md) | **逐环拆解：数据怎么从 Excel 变成能跑的东西，每层形状/取值规则/已知坑** |
| [`docs/WHY-THIS-WAY.md`](docs/WHY-THIS-WAY.md) | **每个设计决策的「为什么」与「代价」——想改之前先看这个** |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Components, boundaries, data flow, deployment |
| [`docs/DATA-MODEL.md`](docs/DATA-MODEL.md) | Scenario/route/case/workflow/appendix schemas |
| [`docs/AUTOMATION.md`](docs/AUTOMATION.md) | CDP runner, screens, blocks, params, evidence |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Why the project is shaped this way |
| [`docs/REFERENCE-WEBAPPS.md`](docs/REFERENCE-WEBAPPS.md) | What the three uploaded webapps are, and what they are not |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Step-by-step plan, owners, acceptance, and what you need to provide |
| [`docs/URL-MAPPING.md`](docs/URL-MAPPING.md) | Why `/AMB/AMA01.html` becomes `/mhkcmwa11/AMA01?...`, and how to run mock vs real |
| [`docs/RUNTIME.md`](docs/RUNTIME.md) | What the runner actually loads and executes, file by file |
| [`docs/rpa/17-USAGE.md`](docs/rpa/17-USAGE.md) | **RPA 使用说明（唯一入口）：一条龙工具链、Studio（拖动排序 / 直接改 YAML）、六个校验门** |
| [`docs/rpa/22-STUDIO-FIELDS.md`](docs/rpa/22-STUDIO-FIELDS.md) | **Studio 与真机的关系、每个字段/原语/证据、以及 `env` / `values` / `case` 变量怎么组合** |
| [`docs/rpa/23-REAL-MACHINE-REPAIR.md`](docs/rpa/23-REAL-MACHINE-REPAIR.md) | **真机上某一步找不到控件怎么办：故障 → 改哪个文件 → 改完就地续跑（`r`），不必用 Python / AI** |
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

## Current status (2026-10-26, verified against live data)

| Area | Status |
|---|---|
| Scenario/route/case data | 1,371 workflow files; 1,310 appendix documents matched from 1,448 scanned Excel files |
| Viewer | Deployed on Pages; dashboard, scenarios, routes, tasks, case drawer, evidence, automation tab, **lego workbench**, JSON/CSV export |
| 450 assigned tasks | All composed: 450/450 |
| Block composition | **252 blocks**; 10,803 events, 8,897 covered = **82.4%**; 1,906 events in gaps |
| Block status3 | verified **3** / coded **246** / unclassified **3** (still `draft-*` in blocks.json) |
| Mock execution | 446/450 pass (4 were D-class rule conflicts, now fixed → 450/450 after param rules) |
| **Full 450-book AI audit** | **clean 7 / clean-with-notes 432 / suspicious 11** — see `logs/AUDIT-SUMMARY-FINAL.md` |
| AI judge layer | `judge.mjs` — per-block adversarial review; first run on 009: 0 clean pass, 3 fail + 7 with-doubts |
| Live execution | 3 blocks verified on real SUT (009 block 1–3); no fully verified case yet |
| Reference webapps | Extracted locally; excluded from git/Pages by default |

### What changed since 2026-10-23

- All 450 books ran through the mock pipeline and received a per-book audit report (`logs/<CASE>/<CASE>-audit.md`)
- D-class rule conflicts fixed: `種目 Z → inputType 5/7`, `種目 0 → 9` (appendix said 2; source validation was right)
- `AZ-210-46` group (6 books) block expanded from 2 to 9 steps to match procedure rows 20–26
- Step-level trace added to runner (`trace.jsonl` with resolved param values + page snapshots)
- `judge.mjs` added: AI reviews each block adversarially, requires counter-evidence for every pass
- Lego workbench added: 252 blocks, visual composition, exports runner-ready JSON

## Repository map

```text
v2/                 viewer (index.html) + lego workbench (lego.html) + normalized data
automation/         252 block definitions, selector files, params, node-runner, execution status
tools/              20 build/analysis scripts (build_data → build_blocks → build_runner_defs)
date/, workflow/    source snapshots used by the data build
reference/webapps/  client webapp snapshots (local-only, mock source)
logs/               per-case execution evidence, traces, judgments, audit reports
docs/               architecture (start with PIPELINE-DEEP-DIVE.md), data model, decisions
HANDOFF.MD          working handoff (not the architecture spec)

Removed in 2026-10-26 cleanup: field-pack/ (in-repo duplicate of the zip),
legacy.html + root css/js (v1 viewer, unreferenced), dist/, one-off audit task files.
```

## Non-goals

- No backend, database, authentication, or multi-user sync.
- No automatic master-data repair.
- No claim that all 450 assigned tasks share one procedure; only exact-signature groups can share a template.
- No publishing of client webapp sources until visibility is confirmed.
