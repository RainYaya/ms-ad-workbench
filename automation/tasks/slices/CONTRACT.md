# Parallel block implementation contract

Repo: `D:/Code/ms-ad`. Goal: all 450 books mock-pass end-to-end.

## Mandatory reading before work
1. `automation/node-runner/PLAYBOOK-450.md`
2. `automation/tasks/slices/<your-slice>.json` — exact blocks, case lists, patterns, source cases.
3. Existing working examples: `automation/node-runner/block-selectors-az-update4.json`, `block-selectors-sgl.json`, `block-selectors.json`, `block-selectors-ay.json`.
4. `automation/node-runner/screen-map.json`, `mock-src/<APP>/<VIEW>.html`, `reference/webapps/<APP>/webapp/WEB-INF/views/<VIEW>.html`.
5. `automation/blocks/workflows.json` for each case's full block order.

## Loop per block
- Find the block in `blocks.json` (`pattern`, `sourceCase`), then the procedure rows in `workflow/workflow-<sourceCase>.json` (`rawRows`) and the view/control names in `mock-src` / `reference/webapps`.
- Write a `steps` array in your own file `automation/node-runner/block-selectors-<slice>.json`. Key = block id. Use `cases` from the slice JSON.
- Make the block self-contained: first step `{"event":"goto start screen","action":"goto","url":"/APP/VIEW.html"}` when the block starts on a known full page. Do not add goto to blocks whose first step is `in:"popup"`.
- Use only real control names found in the HTML. Never invent a selector.
- `visibility:hidden` controls: add `"force": true` to click.
- Non-browser confirmations (`APログ`, `DBログ`, `テーブル`) are allowed as a visible proxy assert with a `note: "非浏览器=真機人工"` (same convention as `block-selectors-az-update.json`).
- Popups: use `{"action":"popup","match":"AMA13|aZG900"}` before `in:"popup"` steps.
- Add missing mock controls/options only in files you own; otherwise report the needed change.

## Run / verify
- Start your own mock server: `node mock-server.mjs <PORT>` from `automation/node-runner` (port assigned in your task).
- Run: `node runner.mjs --case <ID> --base-url http://127.0.0.1:<PORT>/`
- Success = `DONE <case> — n/n blocks` and result `status:"pass"`. `PARTIAL` means a block is still missing from your slice.
- Work highest-count blocks first. Verify at least one representative case per block, then all cases in the slice when feasible.
- If a failure is in a block owned by another slice or in `runner.mjs`, report it; do not fix other slices.

## File ownership (hard rules)
- You may create/edit ONLY: `automation/node-runner/block-selectors-<your-slice>.json`, `automation/cdp/params/<your-slice>.json`, and the mock files listed in your task.
- NEVER edit `runner.mjs`, `mock-server.mjs`, `execution-status.json`, `mock-results.json`, `automation/blocks/*`, `automation/PROGRESS.md`, `v2/*`, or another slice's selector/params file.
- Do not run `tools/build_blocks.py` or `tools/summarize_mock.py`.
- Re-read a file immediately before editing it (another agent may have changed it).

## Report back
- Blocks implemented and their block IDs.
- Cases verified DONE (count + sample IDs).
- Cases still PARTIAL/FAIL with the exact missing block or error.
- Files changed.
- Any mock/source change you could not make because the file is owned by another slice.
