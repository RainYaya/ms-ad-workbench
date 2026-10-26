# Decisions

更新: 2026-10-24

Short architecture decision log. Each entry is a decision, the reason, and the consequence. Revisit only if the stated condition changes.

## D1. Excel scenario list is the scenario source of truth

**Decision:** Use the two `結合試験_シナリオ一覧` workbooks for the 347 scenarios, not `scenario-master`.

**Reason:** `scenario-master` collapses multiple scenario families (e.g. AZ-110/210/310/410) and undercounts the workbook scope.

**Consequence:** Scenario IDs and counts come from the workbook build, not from the master JSON. Do not "fix" the 347 count to match the master.

## D2. The case/document is the execution unit

**Decision:** Track progress per case ID (`AZ-110-01-009`), not per scenario or per route.

**Reason:** One scenario can contain multiple cases with different patterns, companies, users, and appendices. A route is a chain of cases.

**Consequence:** Case drawer is the primary work surface. Dashboard rollups aggregate cases. Evidence and defects attach to cases.

## D3. Routes are cross-scenario chains

**Decision:** Keep routes as an independent entity with `patterns`/`slots`, not as a child of a scenario.

**Reason:** A route can visit `AZ-110-01-001 → AZ-110-12-001 → AZ-110-67-001`; scenarios are steps in the chain.

**Consequence:** A case can appear in multiple route references. Route progress must be derived from its cases, not stored separately.

## D4. `同上` means the same scenario, pattern tail +1

**Decision:** Interpret `同上` in route sheets as the next pattern of the same scenario, not "repeat the same case".

**Reason:** The route sheet uses `同上` to continue a pattern family; repeating the identical case would not add coverage.

**Consequence:** Route parsing advances the case number/pattern, not the scenario. `tools/verify_routes.py` checks the 26 AZ chains against this rule.

## D5. `S` / `D` mean MS / AD counts

**Decision:** Treat `S`/`D` as MS/AD company counts, not success/deny.

**Reason:** The workbook columns align with company splits; interpreting them as pass/fail produces false mismatches.

**Consequence:** `S`/`D` validation compares against `msCount`/`adCount`. `X` is the planned case count.

## D6. Viewer is static, plain JS, no backend

**Decision:** Build the viewer as static HTML/CSS/vanilla JS with generated `.js` data files.

**Reason:** It must work offline and on GitHub Pages; no server, database, or build step is available on the test machine.

**Consequence:** Progress lives in `localStorage`; export JSON for backup. There is no multi-user sync or server-side enforcement.

## D7. Lazy-load full case data by category

**Decision:** Keep only the index in `index.js`; load `cases/<category>.js` on first case access.

**Reason:** The full workflow/appendix payload is too large for one initial download.

**Consequence:** Case opening requires a script load; failures must be shown in the drawer. Do not put full case payloads back into `index.js`.

## D8. 450 tasks are not 450 scripts

**Decision:** Group the assigned tasks by exact procedure signature; build templates/screens, not one runner per case.

**Reason:** 450 tasks collapse to 215 exact 6-field signatures; 152 are singletons. Most reuse is at the screen/block level, not at whole-workflow level.

**Consequence:** `automation/templates.json` is the template registry; `automation/ASSIGNED.md` is the work plan. A case is data, not code.

## D9. Screen library + screen-level blocks

**Decision:** Capture selectors once per screen and compose workflows from blocks with `fromScreen`/`toScreen`, params, and assertions.

**Reason:** Button text alone is ambiguous (`検索` on three screens); assertions are as important as actions. 37/67 share a 6-event prefix; 009–012 share a full 44-event workflow.

**Consequence:** Do not build a flat global button dictionary. Do not reuse actions without expected state. Keep custom blocks for singletons.

## D10. 009–012 use one parameterized workflow

**Decision:** `AZ-110-01-009..012` share one 44-row workflow; only user/item/insurance/detail values differ.

**Reason:** The workflow signatures are identical. `001` is a separate 42-row exception and is not in the assigned set.

**Consequence:** `run-009.ps1 -CaseId` + `params/AZ-110-01.json`. Login switching remains manual. `002..008` share the same 44-row signature but are outside the current assignment.

## D11. Insurance is selected by visible label

**Decision:** Select insurance by normalized visible label, not a hardcoded option value.

**Reason:** `011` and `012` both use `00`; value-based selection is ambiguous. Labels differ by 種目.

**Consequence:** The popup selector normalizes whitespace and full-width colon, then matches the label. The mock has multiple labels to test this.

## D12. Reference webapps are local-only by default

**Decision:** Extract the three client webapp snapshots under `reference/webapps/`, but ignore the actual sources from git/Pages until publication is approved.

**Reason:** They are client source snapshots; GitHub Pages is public-facing. A private repo does not automatically make Pages private.

**Consequence:** Only `README.md` and `manifest.json` are tracked. The sources remain available locally for selector work. Remove the ignore rules only after a visibility decision.

## D13. GitHub Pages root with `.nojekyll`

**Decision:** Deploy `main` root to Pages, with root `index.html` redirecting to `v2/index.html`.

**Reason:** No build step; the viewer is static. Jekyll processing breaks the generated assets.

**Consequence:** `.nojekyll` is required. Adding a server-side route or build step would break the deployment model.

## D14. Static composition is not execution proof

**Decision:** Show block coverage and runner readiness separately in the viewer; label matched workflows `block full`, not `done`.

**Reason:** A workflow can match every block pattern while selectors are `source-only`, the runner is incomplete, or the actual SUT is blocked. The 009 case is both 100% block-composed and blocked at block 4/5.

**Consequence:** The 自動化 page exposes coverage and runner status independently. `block full` + `blocked` is a valid, visible combination. Do not derive test completion from block coverage.

## D15. Auto-mined blocks are candidates

**Decision:** Auto-mine repeated event n-grams as `draft-auto` blocks, but keep a separate curated-only coverage number.

**Reason:** Auto mining raises mechanical coverage quickly and exposes reusable shapes, but it can overfit surface text and produce blocks that are not safe to execute.

**Consequence:** The viewer and ledger show both auto-inclusive and curated-only coverage. `draft-auto` blocks never carry a live/mock execution status; they are `not-run`/`not-implemented` until manually promoted.

## D13. Semantic normalization precedes block matching (2026-10-24)

**Decision:** `event_pattern()` normalizes writing variants (quotes/押下/画面 suffixes, fullwidth dashes, click dataClass, transition dataClass, AZ/AY sibling menus, generic batch screens, login labels) before any block matching or mining.

**Reason:** 450 books written by many authors describe the same business action several ways; raw string comparison left 49 books unmatched (e.g. AZ-150-13-004 vs AZ-160-01-004 differ only in notation). Business-distinct actions (権限エラー ≠ システムエラー, MS ≠ 代理店, button names) are never merged.

**Consequence:** All match/mining paths go through the same normalization. Adding a new variant rule means editing one function and re-running build_blocks. See `automation/blocks/SEMANTIC-NORM.md`.

## D14. Every book must be 100% covered (no naked events)

**Decision:** After composition, any uncovered run becomes a shared block (cross-book) or a per-book singleton block via a final sweep.

**Reason:** A book missing steps cannot be automated end-to-end; uncovered rows also inflated statistics (a false "verified" case came from ignoring uncovered rows).

**Consequence:** `uncovered` is always 0; singleton blocks are implementation TODOs, not abstractions. Block count includes these deliberately.

## D15. Blocks are classified: primitives vs families

**Decision:** Every block carries `kind`: family / primitive-nav / primitive-act / primitive-fill / primitive-verify.

**Reason:** The SUT is ~dozens of parameterized operations; single-event blocks and click+transition pairs are atoms, not business flows. Mixing them inflated the registry (294 blocks) and hid real duplication.

**Consequence:** Registry reads in two groups; parameterized merging of same-skeleton families is done per-family with human review, never automated (更新/確認済/完了登録 share a skeleton with different business consequences).

## D16. Execution truth lives only in status3Map (three states)

**Decision:** planned / coded / verified, single source in `automation/execution-status.json:status3Map`; build regenerates everything downstream.

**Reason:** The previous six-plus status codes were unreadable and produced a 68% "coverage" that counted never-executed drafts. Static composition and execution progress are separate dimensions and must never share a KPI.

**Consequence:** Changing a block's state = edit status3Map + re-run build_blocks. Viewer, PROGRESS.md, blocks.json all refresh; no second ledger.

## D17. Toolchain: node.exe + playwright-core replaces PowerShell CDP (planned)

**Decision:** The runner will be Node (single-file node.exe + playwright-core folder), deployed to the company machine via GitHub download; PowerShell remains only as a thin launcher.

**Reason:** PS hand-rolled WebSocket CDP (185 lines) made every block a quoting ordeal; Edge-155 default-profile CDP and popup races consumed days. Playwright eliminates those classes of bugs. Company machine allows files but no installs; portability verified pending (node hello-world).

**Consequence:** Runner development targets the captured HTML in `automation/screens/` (dev machine) with live verification only on the company machine. Four screens are still missing (AZG101/AZG900/AZG902/AZG906) and must be captured by the user.

## D16. Coded parameters must be checked against the actual option list

**Decision:** Treat every label→code dictionary (`inputType`, `largeItemValue`, `sumupStatus`, …) as a SUT interface that must be verified against the real `<option value>` list; do not infer it from an old map or from mock success.

**Reason:** The appendix is correct but stores labels (`自動車`), while the runner needs codes (`1`). A hand-written map had `自動車=5`; the real page has `自動車=1`, `新種=5`. The generated params were wrong even though the appendix and frontend were right. Mock flow pass did not exercise the real filtered insurance options.

**Consequence:** Regenerating `generated.json` is not enough if `param-map.json` is wrong. Add a validation/audit step comparing coded values with the live option lists. A live 02-004 run caught this; mock-only runs must not be treated as proof of coded values.
