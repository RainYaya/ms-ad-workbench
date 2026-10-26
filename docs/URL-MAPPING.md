# URL mapping: mock/source vs real SUT

更新: 2026-10-23

## The mismatch

The mock/source app uses static view paths:

```text
/AMB/AMA01.html
/AMC00/AMC22.html
/ANB00/ANA01.html
```

The real SUT is a Spring-style routed app:

```text
http://127.0.0.1:82/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00
http://127.0.0.1:82/mhkagwa11/AMC22?gamid=AMC22&gamcd=AMC00
http://127.0.0.1:82/mhkcmwa12/ANA01?gamid=ANA01&gamcd=ANA00
```

These are the **same screen**, different URL shape.

## Fix

One resolver in `automation/node-runner/url-map.mjs` maps the three app prefixes:

| Mock/source | Real root | `gamcd` |
|---|---|---|
| `/AMB/<VIEW>.html` | `/mhkcmwa11/<VIEW>` | `AMA00` |
| `/AMC00/<VIEW>.html` | `/mhkagwa11/<VIEW>` | `AMC00` |
| `/ANB00/<VIEW>.html` | `/mhkcmwa12/<VIEW>` | `ANA00` |

It is applied to:

- `startUrl` from params
- `step.url` in `block-selectors*.json`
- `loginUrl` when routed through `step.url`

It is **not** applied to selector text, popup match strings, screen-rules view codes, or procedure data. Those already use view names (`AMA01`, `AMC22`, etc.), not `.html`.

## Why it is not 450 edits

Inventory:

- 3 start URL patterns: `/AMB/AMA01.html`, `/AMC00/AMC22.html`, `/ANB00/ANA01.html`
- 18 unique `step.url` values across all block selectors (215 `.html` occurrences in total)
- 3 app root mappings
- 0 selector changes required for the URL shape itself

So this is a **central resolver + base URL profile**, not a 450-case rewrite. The 215 occurrences are the same 18 routes repeated across blocks/cases. The chain reaction is limited to:

1. Base URL/port (82 vs mock 10081/10090)
2. `--live` flag (enable real assertions and URL mapping)
3. Any SUT route that does not follow the three root patterns (add a mapping exception)

## Commands

Real SUT (run.cmd adds `--live`):

```powershell
run.cmd AZ-110-01-009 http://127.0.0.1:82/mhkcmwa11/dummy.html
```

Direct node:

```powershell
node runner.mjs --case AZ-110-01-009 `
  --base-url http://127.0.0.1:82/mhkcmwa11/dummy.html `
  --live
```

Mock (no `--live`; keeps `/AMB/*.html`):

```powershell
node runner.mjs --case AZ-110-01-009 --base-url http://127.0.0.1:10090/
```

`base-url` can be the login entry or the actual routed entry. The only requirement is that it has the right host/port and that `startUrl`/`step.url` can be resolved against it.

Login is optional/automatic:

```powershell
run.cmd AZ-110-01-009 http://127.0.0.1:82/mhkcmwa11/dummy.html MS-3n
node runner.mjs --case AZ-110-01-009 --base-url http://127.0.0.1:82/mhkcmwa11/dummy.html --live --user MS-3n
```

The runner fills `input[name="UserID"]`, optional `BukaCode`/`YakusyokuCode`, then clicks `input[name="menu_cm"]`. If no user is supplied, it leaves login manual.

## Known exceptions

- If a popup route does not contain the view code (`AMA18`), the existing `step.match` must be updated; the URL resolver does not guess popups.
- If the real login page is not `dummy.html`, pass the real entry as `--base-url`.
- If the real app uses a different context path/port, change the root map in `url-map.mjs` or pass a base URL that already includes it.
- `--live` is required for a local SUT on port 82. Without it, the runner treats the target as mock and skips mock-only assertions/URL mapping.

## Verification

`automation/node-runner/url-map.test.mjs` asserts the three roots and mock passthrough:

```powershell
node automation/node-runner/url-map.test.mjs
```
