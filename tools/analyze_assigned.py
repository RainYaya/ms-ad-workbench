#!/usr/bin/env python3
"""Group assigned test tasks by procedure signature and write the work plan."""
from __future__ import annotations
import json, re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "automation" / "tasks" / "assigned_20261023.txt"
OUT_JSON = ROOT / "automation" / "templates.json"
OUT_MD = ROOT / "automation" / "ASSIGNED.md"
OUT_SCREENS = ROOT / "automation" / "screens" / "SCREENS.md"


def load_cases():
    cases = {}
    for f in (ROOT / "v2" / "data" / "cases").glob("*.js"):
        s = f.read_text(encoding="utf-8")
        cases.update(json.loads(s[s.index("=") + 1:].strip().rstrip(";")))
    return cases


def signature(case):
    rows = (case.get("workflow") or {}).get("rows", []) or []
    return tuple(
        (
            str(r.get("functionName", "")).strip(),
            str(r.get("operationType", "")).strip(),
            str(r.get("operationItem", "")).strip(),
            str(r.get("verificationType", "")).strip(),
            str(r.get("verificationItem", "")).strip(),
            str(r.get("evidenceType", "")).strip(),
        )
        for r in rows
    )


def main():
    lines = SRC.read_text(encoding="utf-8-sig").splitlines()
    tasks = []
    for line in lines:
        m = re.match(r"(A[ZY]-\d{3}-\d{2}-\d{3})", line.strip())
        if not m:
            continue
        parts = line.split("\t")
        tasks.append({
            "id": m.group(1),
            "company": parts[1].strip() if len(parts) > 1 else "",
            "functionName": parts[3].strip() if len(parts) > 3 else "",
            "result": parts[5].strip() if len(parts) > 5 else "",
        })

    cases = load_cases()
    groups = defaultdict(list)
    for t in tasks:
        groups[signature(cases[t["id"]])].append(t["id"])

    templates = []
    for sig, ids in groups.items():
        ids = sorted(ids)
        templates.append({
            "id": "TPL-" + ids[0],
            "count": len(ids),
            "rowCount": len(sig),
            "caseIds": ids,
            "scenarioIds": sorted({x[:9] for x in ids}),
            "categoryIds": sorted({x[:6] for x in ids}),
            "screens": [x[0] for x in sig if x[0]],
            "status": "blocked_environment" if "AZ-110-01-009" in ids else "not_started",
        })
    templates.sort(key=lambda x: (-x["count"], -x["rowCount"], x["id"]))

    by_category = Counter(t["id"][:6] for t in tasks)
    by_domain = Counter(t["id"][:2] for t in tasks)
    screens = Counter()
    for t in tasks:
        for r in (cases[t["id"]].get("workflow") or {}).get("rows", []) or []:
            fn = str(r.get("functionName", "")).strip()
            if fn:
                screens[fn] += 1

    payload = {
        "generatedAt": "2026-10-23",
        "source": str(SRC.relative_to(ROOT)).replace("\\", "/"),
        "taskCount": len(tasks),
        "domainCounts": dict(by_domain),
        "categoryCounts": dict(by_category.most_common()),
        "templateCount": len(templates),
        "singletonTemplateCount": sum(1 for t in templates if t["count"] == 1),
        "screenCount": len(screens),
        "templates": templates,
    }
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")

    def esc(v):
        return str(v).replace("|", "\\|")

    top = templates[:20]
    az110 = []
    for t in templates:
        az = [x for x in t["caseIds"] if x.startswith("AZ-110")]
        if az:
            az110.append((t, az))
    az110.sort(key=lambda x: (-len(x[1]), x[0]["id"]))
    cumulative = 0
    lines_md = []
    lines_md.append("# Assigned tasks / automation plan\n")
    lines_md.append("更新: 2026-10-23\n")
    lines_md.append(f"源文件: `{payload['source']}` / **{len(tasks)} tasks**\n")
    lines_md.append("## 1. Overview\n")
    lines_md.append("| Domain | Tasks |\n|---|---:|")
    for k, v in by_domain.most_common():
        lines_md.append(f"| {k} | {v} |")
    lines_md.append("\n| Category | Tasks |\n|---|---:|")
    for k, v in by_category.most_common():
        lines_md.append(f"| {k} | {v} |")
    lines_md.append("\n## 2. Conclusion first\n")
    lines_md.append("- `AZ-110-01-009` / `010` / `011` / `012` are **one exact 44-row procedure signature**. Once 009 is stable, 010-012 only need parameter changes.")
    lines_md.append("- `AZ-110-01-001` is the exception (42 rows, 代理店開放時); it is **not** in the assigned list.")
    lines_md.append("- Other `AZ-110-01-xx` (002-008) share the same 44-row signature as 009; if assigned later, add params, not a new script.")
    lines_md.append("- But the assigned list is **not 450 identical cases**: exact-signature grouping gives **215 templates**, of which **152 are single-case**. 55 distinct screens appear.")
    lines_md.append("- So the correct unit is: **screen library (55) + procedure template (215) + case params (450)**. Do not build 450 scripts and do not rebuild selectors per case.")
    lines_md.append("\n## 3. Template coverage\n")
    lines_md.append("| Templates (top by count) | Tasks covered | Coverage |\n|---:|---:|---:|")
    for n in (5, 10, 15, 20, 30, 50, 100):
        covered = sum(t["count"] for t in templates[:n])
        lines_md.append(f"| {n} | {covered} | {covered / len(tasks):.1%} |")
    lines_md.append("\n## 4. Top templates\n")
    lines_md.append("| Template | Tasks | Rows | Scenarios | Status |")
    lines_md.append("|---|---:|---:|---|---|")
    for t in top:
        lines_md.append(f"| `{t['id']}` | {t['count']} | {t['rowCount']} | {esc(', '.join(t['scenarioIds'][:4]))} | {t['status']} |")
    lines_md.append("\n## 5. AZ-110 assigned tasks\n")
    lines_md.append("Some templates also contain cases from other categories; `Group total` is the whole template, `AZ-110 tasks` is only the assigned AZ-110 subset.\n")
    lines_md.append("| Template | AZ-110 tasks | Group total | Rows | AZ-110 scenarios | Status |")
    lines_md.append("|---|---:|---:|---:|---|---|")
    for t, az in az110:
        scenarios = sorted({x[:9] for x in az})
        lines_md.append(f"| `{t['id']}` | {len(az)} | {t['count']} | {t['rowCount']} | {esc(', '.join(scenarios))} | {t['status']} |")
    lines_md.append("\n## 6. Common screens (selector work)\n")
    lines_md.append("Full 55-screen list and capture status: `automation/screens/SCREENS.md`.\n")
    lines_md.append("| Screen | Occurrences |\n|---|---:|")
    for name, n in screens.most_common(25):
        lines_md.append(f"| {esc(name)} | {n} |")
    lines_md.append("\n## 7. Execution plan\n")
    lines_md.append("1. Fix the current AZ-110 block 4/5 blocker: 募集人検索 returns no rows. This affects every AZ-110 flow that uses agent search.")
    lines_md.append("2. `TPL-AZ-110-01-009` (009-012): runner and params are in place (`run-009.ps1 -CaseId`, `automation/cdp/params/AZ-110-01.json`); all four pass mock. Actual run still blocked at block 4/5 agent search. Each case needs a manual login switch (`MS-3n`, `MS-4n`, `MS-2n`).")
    lines_md.append("3. Build a screen selector registry for the 55 screens. F12/HTML is needed **once per screen**, not once per case.")
    lines_md.append("4. Implement the high-count templates first (20/20/12/10/10...). Each template gets one runner and a params table.")
    lines_md.append("5. For each template, run one representative case, then run all cases in the group by swapping params.")
    lines_md.append("6. Screenshots per verification row: `blockNN_rowNNN_*.png`, same as `automation/screens/MANIFEST.md`.")
    lines_md.append("\n## 8. Blockers / unknowns\n")
    lines_md.append("- 009 block 4/5: 募集人検索 popup returns no rows on the actual SUT; master data or search condition issue.")
    lines_md.append("- The result-row HTML of AZG905 after search is not captured yet; selection logic currently guesses radio + `closeSelect`.")
    lines_md.append("- 152 templates are single-case; their screens may still be reused, but their action sequences differ. Estimate selectors per screen first, then template scripts.")
    lines_md.append("- AY flows use a different approval state machine and different screens; they are separate from AZ templates.")
    lines_md.append("\n## 9. Step-level composition (next layer)\n")
    lines_md.append("- `automation/steps/DESIGN.md`: block/workflow model, contracts, data bindings, anti-patterns.")
    lines_md.append("- `automation/steps/INVENTORY.md`: raw 450-case step inventory and candidate blocks (not approved).")
    lines_md.append("- `automation/PROGRESS.md`: per-book/per-case done/remaining ledger.")
    lines_md.append("- Use screen-level blocks, not a flat button dictionary. Assertions and pre/post screens are mandatory.")
    lines_md.append("- 37/67 share a 6-event prefix; 009-012 share the full 44-event sequence. This is the intended reuse path.")
    OUT_MD.write_text("\n".join(lines_md) + "\n", encoding="utf-8")

    known = {
        "申込書品質管理メニュー画面": ("captured", "`AZG001_menu.html`"),
        "不備内容入力画面－新規": ("captured", "`AZG100_input.html`"),
        "不備内容入力画面－更新": ("partial", "AZG100 new-input captured; AZG101 update source `AMA04.html` -> see `SOURCE-SELECTORS.md`"),
        "不備内容入力画面-更新": ("partial", "same screen as `－更新`; AZG101 update source `AMA04.html` -> see `SOURCE-SELECTORS.md`"),
        "保険種類選択画面": ("captured", "`insurance_item_select.html`"),
        "募集人検索画面": ("partial", "`AZG905_agent_search.html` initial popup; result rows not captured"),
        "項目名検索画面": ("source_only", "AMB `AMA13.html` (AZG900); live not verified; see `SOURCE-SELECTORS.md`"),
        "照会内容編集画面": ("source_only", "AMB `AMA15.html` (AZG902); live not verified; see `SOURCE-SELECTORS.md`"),
        "訂正内容確認画面": ("source_only", "AMB `AMA19.html` (AZG906); live not verified; see `SOURCE-SELECTORS.md`"),
    }
    screen_lines = [
        "# Screen registry (assigned tasks)",
        "",
        "Generated by `tools/analyze_assigned.py`. One row per screen name in the assigned procedures.",
        "F12/HTML capture is needed once per screen, not once per case.",
        "Source-derived selector detail: `automation/screens/SOURCE-SELECTORS.md`.",
        "",
        "| Screen | Occurrences | Status | Evidence / next action |",
        "|---|---:|---|---|",
    ]
    for name, n in screens.most_common():
        status, note = known.get(name, ("not_captured", "capture HTML + selectors"))
        screen_lines.append(f"| {esc(name)} | {n} | {status} | {note} |")
    captured = sum(1 for name in screens if known.get(name, ("",))[0] == "captured")
    partial = sum(1 for name in screens if known.get(name, ("",))[0] == "partial")
    source_only = sum(1 for name in screens if known.get(name, ("",))[0] == "source_only")
    screen_lines += [
        "",
        f"Total: **{len(screens)}** screens ({captured} captured, {partial} partial, {source_only} source-only, {len(screens) - captured - partial - source_only} not captured).",
    ]
    OUT_SCREENS.write_text("\n".join(screen_lines) + "\n", encoding="utf-8")
    print(f"tasks={len(tasks)} templates={len(templates)} screens={len(screens)}")
    print(f"wrote {OUT_JSON.relative_to(ROOT)} and {OUT_MD.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
