# Reference webapps

更新: 2026-10-23

The three uploaded archives are **static view snapshots**, not a runnable SUT.

Full inventory, hashes, app map, and local-only policy: [`../reference/webapps/README.md`](../reference/webapps/README.md).

## What they are

| App | URL root | System | Useful for |
|---|---|---|---|
| AMB | `/mhkcmwa11/` | 申込書品質管理システム | AZG001/AZG100/AZG905 selectors, insurance popup, form actions |
| AMC00 | `/mhkagwa11/` | 申込書品質管理システム（代理店系） | AZG206/AZG104/AZG908 screens |
| ANB00 | `/mhkcmwa12/` | 異例取扱管理システム | AYG001/AYG100/AYG101/AYG102 screens |

The views are Thymeleaf/JSP-style templates with `${...Form...}` placeholders. Dynamic values and option lists are not present.

## How to use them

1. **Map a procedure screen to a source view.** Example: `AZG100` → `AMB/webapp/WEB-INF/views/AMA03.html`.
2. **Extract stable selectors** (`id`, `name`, form action, popup relationship).
3. **Verify against the live DOM.** The source template is not the rendered page.
4. **Do not use it for master data.** Select options are often empty; the backend supplies them.

## Source-derived selectors

A first selector draft extracted from AMB is in [`../automation/screens/SOURCE-SELECTORS.md`](../automation/screens/SOURCE-SELECTORS.md). It covers AZG101 update, AZG900 item search, AZG902 inquiry edit, AZG906 correction confirmation, and marks each selector as `source-only` until live-verified.

## What they cannot do

- Run without a backend.
- Provide authentication, SQL, master data, or business rules.
- Replace the actual SUT for evidence.

## Visibility

The extracted `AMB/`, `AMC00/`, `ANB00/`, and `archives/` content is ignored by git via `reference/webapps/.gitignore`. Only the README and manifest are tracked. This is deliberate: GitHub Pages would serve the source files publicly if they were committed to the Pages source.

If the repo/Pages visibility is confirmed acceptable, remove the ignore rules and commit the extracted sources. Until then, keep them local.

## Encoding

Views are CP932/Shift_JIS. Decode explicitly:

```python
from pathlib import Path
text = Path("reference/webapps/AMB/webapp/WEB-INF/views/AMA03.html").read_text(encoding="cp932")
```
