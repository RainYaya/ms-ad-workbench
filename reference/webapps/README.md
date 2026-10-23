# Reference webapps

Three static webapp snapshots supplied for the integration-test project. They contain **views and front-end assets only**; no backend logic, database, or master data is included.

> **Local-only by default.** These are client source snapshots. The extracted files are intentionally excluded from git and from the GitHub Pages artifact until we confirm the repo/Pages visibility is acceptable for this material. `README.md` and `manifest.json` are the only tracked files here. To publish them later, remove the ignore rules in `.gitignore`.

## Sources

| App | Archive | Files | SHA-256 |
|---|---|---:|---|
| AMB | `archives/AMBwebapp.zip` | 46 | `d008834ca3caf82efe056f1cbb3f5a604e1dd633ec3f658e71a7a4569d592742` |
| AMC00 | `archives/AMC00webapp.zip` | 28 | `c23d47e25a89f06fccd24fd583967853ca9f12978a6560f243f16f31de972022` |
| ANB00 | `archives/ANB00webapp.zip` | 28 | `b1e4af0df8b9455fd497ec803d923f88fef35bee9d7349cda07796cd64015222` |

`manifest.json` is the machine-readable record of archive size, hash, file count, and extraction path.

## App map

| App | URL root in source | System | Key view → screen code |
|---|---|---|---|
| AMB | `/mhkcmwa11/` | 申込書品質管理システム | `AMA01` → `AZG001` menu; `AMA03` → `AZG100` input; `AMA18` → `AZG905` agent search; `insurance_item_select.html` → insurance popup |
| AMC00 | `/mhkagwa11/` | 申込書品質管理システム（代理店系） | `AMC22` → `AZG206`; `AMC23` → `AZG104` / `AZG908`; `AMC24` → `AZG908` |
| ANB00 | `/mhkcmwa12/` | 異例取扱管理システム | `ANA01` → `AYG001` menu; `ANA02` → `AYG100`; `ANA03` → `AYG101`; `ANA04` → `AYG102` |

The screen codes are the IDs used by the test procedures (`AZG...` / `AYG...`). The source files are Thymeleaf/JSP-style templates, so dynamic values are placeholders such as `${AMA03Form.policy_number}`.

## What is useful

- Stable element IDs and names: `#policy_number`, `#sub_policy_number`, `#section_code`, `#agent_code`, `select[name="..."]`.
- Form actions and route names, e.g. `aZG001To03`, `aZG100Regist`, `aZG905Search`.
- Hidden fields, popup relationships, radio/checkbox names, table/list structure.
- Mapping a procedure screen to its source view before opening F12.

## What is not available

- Backend controllers, SQL, master data, authorization, and generated option lists.
- Runtime HTML after Thymeleaf rendering. `select` options are often empty in the source.
- Login credentials or session behavior. `dummy.html` is only a test login page shell.

Use these as **selector/reference material**, not as a runnable SUT. Always confirm against the live DOM.

## Encoding

Views are Shift_JIS/CP932, not UTF-8. Read them with CP932, e.g.:

```python
from pathlib import Path
text = Path("reference/webapps/AMB/webapp/WEB-INF/views/AMA03.html").read_text(encoding="cp932")
```

PowerShell 5.1 on Japanese Windows usually reads them with the ANSI code page; prefer an explicit `-Encoding Default` or a Python decode. Do not re-save them as UTF-8 without checking.

## Layout

```text
reference/webapps/
  README.md
  manifest.json
  .gitignore          # local-only extracted content
  archives/           # original zips (ignored)
  AMB/webapp/         # extracted (ignored)
  AMC00/webapp/       # extracted (ignored)
  ANB00/webapp/       # extracted (ignored)
```
