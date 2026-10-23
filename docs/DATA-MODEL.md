# Data model

更新: 2026-10-23

## 1. Identity

All execution entities use one ID pattern:

```text
AZ-110-01-009
│  │   │  └─ case number (3 digits)
│  │   └──── scenario number (2 digits)
│  └──────── category number (3 digits)
└─────────── domain: AZ (申込) / AY (異例)
```

- Category: `AZ-110`
- Scenario: `AZ-110-01`
- Case: `AZ-110-01-009`
- Route: `AZ-R109` (separate namespace)

The case ID is the join key for document master, workflow, appendix, route, progress, evidence, and automation.

## 2. Hierarchy

```text
Category (AZ-110)
  └─ Scenario (AZ-110-01)
       ├─ Case (AZ-110-01-009)
       │    ├─ Workflow rows
       │    └─ Appendix sheets
       └─ Route references (AZ-R109, ...)
```

A scenario can have multiple cases (different patterns/conditions). A route is an ordered execution chain across scenarios, not a child of one scenario.

## 3. Source inputs

| Source | Used for |
|---|---|
| `【品管SV更改】結合試験_シナリオ一覧(申込)（2026-08-25）.xlsx` | AZ scenarios, routes, users, status matrix, ToDo patterns |
| `【品管SV更改】結合試験_シナリオ一覧(異例)（2026-08-25）.xlsx` | AY scenarios, routes, users |
| `date/document-master_*.json` | Case metadata: company, item, function, document type, comparison mark |
| `date/test_documents_*.json` | Appendix sheets per case |
| `workflow/*.json` | Workflow rows and overview per case |

`tools/build_data.py` is the only writer of `v2/data/`. Do not treat the emitted files as hand-maintained source.

## 4. Index (`v2/data/index.js` / `index.json`)

Top-level keys:

```json
{
  "meta": {},
  "categories": [],
  "scenarios": [],
  "routes": [],
  "caseIndex": {}
}
```

### 4.1 `meta`

```json
{
  "generatedAt": "2026-10-23 07:45:59",
  "sourceWorkbooks": ["...xlsx", "...xlsx"],
  "counts": {
    "scenarios": 347,
    "azScenarios": 307,
    "ayScenarios": 40,
    "cases": 1386,
    "workflowCases": 1371,
    "appendixCases": 1277,
    "azCases": 955,
    "ayCases": 431,
    "routesAz": 170,
    "routesAy": 31
  }
}
```

### 4.2 `categories[]`

```json
{
  "id": "AZ-110",
  "domain": "AZ",
  "prefix": "AZ",
  "userType": "事業会社",
  "executionType": "オンライン",
  "functionArea": "登録",
  "scenarioIds": ["AZ-110-01", "..."],
  "x": 62,
  "s": 31,
  "d": 31
}
```

`x` = planned case count; `s` / `d` = MS / AD counts. They are **not** success/deny.

### 4.3 `scenarios[]`

Key fields:

```json
{
  "id": "AZ-110-01",
  "domain": "AZ",
  "categoryId": "AZ-110",
  "categoryNo": 110,
  "no": 1,
  "title": "シナリオ導線１",
  "userType": "事業会社",
  "executionType": "オンライン",
  "functionArea": "登録",
  "x": 12, "s": 6, "d": 6,
  "perspective": ["..."],
  "flowRows": [{"row": 43, "step": "①", "screen": "...", "check": "...", "state": "..."}],
  "steps": [{"step": "①", "rows": []}],
  "dataPatterns": [{"axis": "...", "value": "..."}],
  "caseIds": ["AZ-110-01-001"],
  "caseCount": 12,
  "msCount": 6,
  "adCount": 6,
  "hasRoute": true,
  "routeRefs": [{"routeId": "AZ-R109", "order": 1, "section": "..."}]
}
```

### 4.4 `routes[]`

```json
{
  "id": "AZ-R109",
  "domain": "AZ",
  "no": 109,
  "section": "Ⅱ-1. ...",
  "data": {
    "company": "MS",
    "policyNo": "AZ11001",
    "detailNo": "9",
    "item": "自賠責",
    "insuranceType": "0",
    "sectionCode": "AHE61",
    "agentCode": "252H"
  },
  "patterns": [
    {
      "blockNo": 1,
      "steps": [
        {
          "order": 1,
          "scenarioId": "AZ-110-01",
          "patternNo": 1,
          "caseId": "AZ-110-01-009",
          "user": {"no": 9, "id": "MS-3n", "point": "事務S"},
          "transitions": [{"button": "1A", "from": "0", "condition": "＝", "result": "0"}],
          "link": {"from": "...", "to": "..."},
          "salesStatus": {"from": "...", "to": "..."},
          "agentStatus": {"from": "...", "to": "..."}
        }
      ]
    }
  ],
  "slots": [],
  "dataOnly": false
}
```

- `patterns` = explicit route chains extracted from the workbook.
- `slots` = scenario-level slots when the route is defined by scenario rather than exact case.
- Invalid case IDs found during build are moved to `invalidCaseId` and `caseId` is set to `null`; they are reported in `validation.warnings.invalidRouteCaseIds`.

### 4.5 `caseIndex`

Small per-case metadata used by lists, filters, and badges. Full workflow/appendix is **not** here.

```json
{
  "AZ-110-01-009": {
    "id": "AZ-110-01-009",
    "domain": "AZ",
    "categoryId": "AZ-110",
    "scenarioId": "AZ-110-01",
    "company": "MS",
    "functionName": "シナリオ導線１",
    "item": "自賠責",
    "documentType": "...",
    "comparisonMark": "...",
    "comparisonRequired": false,
    "sourceRow": 43,
    "sourceFile": "結合試験 試験手順書 AZ-110-01-009.xlsx",
    "isOld": false,
    "hasWorkflow": true,
    "hasAppendix": true,
    "appendixDuplicates": []
  }
}
```

## 5. Case payload (`v2/data/cases/AZ-110.js`)

The file assigns a global:

```js
window.MSAD_CASES_AZ_110 = {
  "AZ-110-01-009": { /* full case */ }
};
```

Full case fields:

```json
{
  "id": "AZ-110-01-009",
  "domain": "AZ",
  "categoryId": "AZ-110",
  "scenarioId": "AZ-110-01",
  "company": "MS",
  "functionName": "シナリオ導線１",
  "item": "自賠責",
  "documentType": "...",
  "comparisonMark": "...",
  "comparisonRequired": false,
  "sourceRow": 43,
  "sourceFile": "...xlsx",
  "sourcePath": "...",
  "isOld": false,
  "hasWorkflow": true,
  "hasAppendix": true,
  "appendixDuplicates": [],
  "workflow": {
    "overview": {},
    "rows": []
  },
  "appendix": {
    "sheets": []
  }
}
```

`workflow` is `null` when no workflow exists; `appendix` is `null` when no appendix exists.

## 6. Workflow rows

Each row is one line of the procedure:

```json
{
  "sourceRow": 30,
  "itemNo": "6",
  "functionName": "不備内容入力画面－新規",
  "operationNo": "1",
  "operationType": "ボタン",
  "operationItem": "「登録」押下",
  "operationContent": "",
  "verificationNo": "2",
  "verificationType": "遷移",
  "verificationItem": "不備内容入力画面-更新",
  "verificationContent": "【別紙】表示内容\n表示内容：１参照",
  "evidenceType": "画面HC"
}
```

Conventions:

- `functionName` is often blank on continuation rows; the current screen is the last non-empty value.
- A row can be operation-only, verification-only, or both.
- `verificationType` includes `遷移`, `表示`, `出力（Msg）`, `その他`.
- `evidenceType` is the evidence requirement (usually `画面HC`).
- `sourceRow` is the Excel row and is used in screenshot names (`blockNN_rowNNN_...`).

## 7. Appendix sheets

```json
{
  "name": "【別紙】操作内容",
  "type": "...",
  "range": "...",
  "rows": [["○入力内容"], ["1", "入力区分", "現地"], ["..."]]
}
```

Appendix is intentionally stored as a **ragged table**, not parsed fields. The viewer renders compact/raw views; automation params must explicitly map the rows it consumes.

## 8. Progress / evidence / automation

`msad.progress.v1`:

```json
{
  "AZ-110-01-009": {
    "execution": "NOT_STARTED | IN_PROGRESS | DONE | BLOCKED",
    "result": "OK | NG | ''",
    "verify": "NOT_STARTED | DONE",
    "defectNo": "BUG-001",
    "executedAt": "2026-10-23",
    "executedBy": "name",
    "verifiedAt": "2026-10-23",
    "verifiedBy": "name",
    "memo": "...",
    "evidence": {
      "30-画面HC": true
    }
  }
}
```

Evidence key = `sourceRow-evidenceType`; one checkbox per workflow row that has `evidenceType`.

`msad.automation.v1`:

```json
{
  "AZ-110-01-009": {
    "scriptType": "console",
    "locators": [
      {
        "sourceRow": 14,
        "action": "click | input | assert | wait",
        "selector": "#act001to100",
        "value": "",
        "expected": ""
      }
    ]
  }
}
```

This is the **viewer's lightweight locator editor**, not the CDP runner's params. The CDP runner lives in `automation/cdp/`.

## 9. Validation

`v2/data/validation.json` records build-time inconsistencies:

- `missingAppendix` — workflow exists but no appendix
- `missingWorkflow` — document exists but no workflow
- `old` — old/abolished source
- `xMismatch` — planned X vs actual case count
- `sdMismatch` — S/D vs MS/AD counts (AZ only)
- `duplicateAppendix` — multiple appendix candidates per case
- `invalidRouteCaseIds` — route references a case that does not exist
- `appendixWithoutId` — appendix file without a case ID

The dashboard surfaces these counts; the viewer does not auto-repair them.

## 10. Invariants

1. Case IDs are immutable and unique.
2. `sourceRow` is the screenshot/evidence row key within a case.
3. `v2/data` is generated; rebuild it from source inputs.
4. Progress is per case, not per scenario or route.
5. A route can include cases from multiple scenarios; do not assume one route = one scenario.
6. `S`/`D` are MS/AD counts; `X` is the planned case count.
7. Missing workflow/appendix is data, not a UI bug; it must remain visible.

## 11. Automation coverage payload

`v2/data/automation.js` is generated by `tools/build_blocks.py`:

```js
window.MSAD_AUTOMATION = {
  summary: {
    caseCount: 450,
    fullCount: 12,
    partialCount: 438,
    eventCount: 10803,
    coveredEvents: 3337,
    eventCoverage: 0.3089,
    blockCount: 15,
    fullCaseIds: [],
    topGaps: []
  },
  blocks: [
    {
      id: "BLK-AZ-MENU-SEARCH-LIST",
      fromScreen: "申込書品質管理メニュー",
      toScreen: "不備一覧",
      params: [],
      status: "source-only",
      usedByCases: 195
    }
  ],
  cases: {
    "AZ-110-01-009": {
      status: "full",
      blocks: ["BLK-AZ-MENU-CREATE-INPUT"],
      eventCount: 44,
      coveredEvents: 44,
      uncoveredCount: 0,
      runner: {
        script: "run-009.ps1",
        paramsFile: "params/AZ-110-01.json",
        status: "blocked",
        scope: "blocks 1-5 implemented; blocks 6-13 are composition-only",
        baseUrl: "http://127.0.0.1:10081/mhkcmwa11/dummy.html",
        port: 9223
      }
    }
  },
  runners: { runners: [] }
};
```

`automation/blocks/blocks.json` is the detailed source: block patterns, assertions, source case/range, usedByCases, and full workflows. `automation/blocks/workflows.json` holds per-case block sequences and uncovered events.

The viewer must not treat `status: "full"` as execution success. Runner status is separate.
