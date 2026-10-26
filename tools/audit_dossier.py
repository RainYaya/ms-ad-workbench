#!/usr/bin/env python3
"""Build an audit dossier for one case: everything an AI auditor needs in one file.

Dossier = procedure rows + appendix truth + effective params(+sources) + block
composition + selector steps + run result + evidence index + key screenshots
+ mechanical pre-check results.

Usage:
  python tools/audit_dossier.py AZ-110-01-009            # write logs/<cid>/<cid>-dossier.md
  python tools/audit_dossier.py AZ-110-01-009 --stdout   # print instead of write

No judgment here — extraction and mechanical checks only. AI judgment happens
afterwards (docs/AUDIT-PLAYBOOK.md).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNNER = ROOT / "automation" / "node-runner"

sys.stdout.reconfigure(encoding="utf-8")


def load_data_js(cat: str):
    txt = (ROOT / "v2/data/cases" / f"{cat}.js").read_text(encoding="utf-8")
    return json.loads(txt[txt.index("=") + 1:].rstrip().rstrip(";& \t\n"))


def load_window_js(path: Path):
    txt = path.read_text(encoding="utf-8")
    return json.loads(txt[txt.index("=") + 1:].rstrip().rstrip(";& \t\n"))


def load_params(cid: str):
    """Mirror runner.mjs loadParams: auto.json is last-priority fallback,
    generated.json first; first file owning the case wins concrete values,
    later files only fill undefined/empty keys."""
    pdir = ROOT / "automation" / "cdp" / "params"
    def sort_key(name: str):
        if name == "auto.json":
            return (2, name)
        if name == "generated.json":
            return (0, name)
        return (1, name)
    files = sorted([f.name for f in pdir.glob("*.json")], key=sort_key)
    out, sources = {}, {}
    for fname in files:
        try:
            d = json.loads((pdir / fname).read_text(encoding="utf-8-sig"))
        except Exception:
            continue
        case = (d.get("cases") or {}).get(cid)
        if case is None:
            continue
        cur = {**(d.get("common") or {}), **case}
        if not out:
            out = dict(cur)
            for k in cur:
                sources[k] = fname
        else:
            for k, v in cur.items():
                if out.get(k) in (None, ""):
                    out[k] = v
                    sources[k] = fname
    return out, sources


def load_selectors(cid: str):
    merged = {}
    for f in sorted(RUNNER.glob("block-selectors*.json")):
        try:
            d = json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            continue
        filt = d.get("cases")
        if filt and cid not in filt:
            continue
        for blk, ent in d.items():
            if blk == "cases" or blk in merged:
                continue
            merged[blk] = {"file": f.name, **(ent if isinstance(ent, dict) else {"steps": ent})}
    return merged


def appendix_leaves(sheets):
    lines = []
    def walk(path, obj):
        if isinstance(obj, dict):
            for k, v in obj.items():
                walk(f"{path}/{k}", v)
        elif isinstance(obj, list):
            for i, v in enumerate(obj):
                walk(f"{path}[{i}]", v)
        elif obj not in (None, ""):
            lines.append(f"{path}: {obj}")
    if isinstance(sheets, dict):
        for name, sh in sheets.items():
            walk(str(name), sh)
    else:
        walk("sheets", sheets)
    return lines


def key_shots(result: dict, evidence: list, cap: int = 8):
    shots = result.get("shots") or []
    picked = []
    if shots:
        picked.append(shots[0])
    for e in evidence:
        f = e.get("file")
        if f and f in shots and f not in picked:
            picked.append(f)
    blk_shots = [s for s in shots if re.match(r"\d+_BLK-", s)]
    if blk_shots and blk_shots[-1] not in picked:
        picked.append(blk_shots[-1])
    return picked[:cap]


def main():
    cid = sys.argv[1]
    to_stdout = "--stdout" in sys.argv
    cat = "-".join(cid.split("-")[:2])

    case = load_data_js(cat)[cid]
    rows = case["workflow"]["rows"]
    feas = load_window_js(ROOT / "v2/data/feasibility.js").get(cid, {})
    blocks_blob = json.loads((ROOT / "automation/blocks/blocks.json").read_text(encoding="utf-8"))
    wf = blocks_blob["workflows"].get(cid)
    params, psrc = load_params(cid)
    selectors = load_selectors(cid)
    log_dir = ROOT / "logs" / cid
    result, evidence = {}, []
    rf = log_dir / f"{cid}-node-result.json"
    if rf.exists():
        result = json.loads(rf.read_text(encoding="utf-8"))
    ef = log_dir / f"{cid}-evidence.json"
    if ef.exists():
        evidence = json.loads(ef.read_text(encoding="utf-8")).get("evidence", [])

    L = []
    L.append(f"# AUDIT DOSSIER — {cid}")
    L.append("")
    L.append(f"meta: {json.dumps({k: case.get(k) for k in ('domain','company','functionName','item','documentType','sourceFile')}, ensure_ascii=False)}")
    L.append(f"feasibility: class={feas.get('class')} flow={feas.get('flow')} manualSteps={feas.get('manualSteps')} proxyBlocks={feas.get('proxyBlocks')} paramIssues={feas.get('paramIssues')} paramsAuto={feas.get('paramsAuto')} source={feas.get('source')}")
    L.append(f"status3(case)={wf.get('status3') if wf else '?'}  runner_status={result.get('status')}  blocks={len(result.get('blocks') or [])} skipped={result.get('skipped') or []}")
    L.append("")

    L.append("## 1. 手順（手順書原文，操作/確認/証跡）")
    for r in rows:
        parts = [f"r{r.get('sourceRow')}"]
        if r.get("operationItem"):
            parts.append(f"OP[{r.get('operationNo') or ''}]{r.get('operationType','')}|{r.get('operationItem','')}|{(r.get('operationContent') or '').replace(chr(10), ' ')}")
        if r.get("verificationItem"):
            parts.append(f"CK[{r.get('verificationNo') or ''}]{r.get('verificationType','')}|{r.get('verificationItem','')}|{(r.get('verificationContent') or '').replace(chr(10), ' / ')}")
        if r.get("evidenceType"):
            parts.append(f"EV:{r.get('evidenceType')}")
        L.append("- " + " | ".join(parts))
    L.append("")

    L.append("## 2. 別紙（非空叶子，输入真值 + 期待表示）")
    apx = case.get("appendix") or {}
    L.extend(appendix_leaves((apx.get("sheets") if isinstance(apx, dict) else apx) or {}))
    L.append("")

    L.append("## 3. 生效参数（runner 实际取值 + 来源文件）")
    auto_keys = [k for k, s in psrc.items() if s == "auto.json"]
    for k in sorted(params):
        L.append(f"- {k} = {json.dumps(params[k], ensure_ascii=False)}  <- {psrc.get(k, '?')}")
    L.append(f"params total={len(params)}, auto-fallback={len(auto_keys)}{': ' + ','.join(auto_keys) if auto_keys else ''}")
    L.append("")

    L.append("## 4. 积木组成与 selector 步骤")
    details = (wf or {}).get("blockDetails") or []
    for b in details:
        blk = b["block"]
        ent = selectors.get(blk)
        L.append(f"### {blk}  rows {b.get('fromRow')}..{b.get('toRow')}  status3={b.get('status3')}")
        if not ent:
            L.append("  (no selector entry — runner reports it skipped)")
            continue
        L.append(f"  screen={ent.get('screen','?')} file={ent.get('file')}")
        for s in ent.get("steps", []):
            flag = []
            if s.get("optional"):
                flag.append("optional")
            if s.get("in") == "popup":
                flag.append("popup")
            note = f" NOTE:{s['note']}" if s.get("note") else ""
            L.append(f"  - [{s.get('action')}] {s.get('event','')} sel={json.dumps(s.get('selector',''), ensure_ascii=False)} val={json.dumps(s.get('value', s.get('label', s.get('contains',''))), ensure_ascii=False)}{' (' + ','.join(flag) + ')' if flag else ''}{note}")
    L.append("")

    L.append("## 5. 本次运行结果（块级）")
    for b in result.get("blocks") or []:
        L.append(f"- {b.get('block')}  {b.get('status')}  rows {b.get('fromRow')}..{b.get('toRow')}")
    L.append("")

    L.append("## 6. 証跡索引（画面HC 取得状况）")
    for e in evidence:
        mark = "OK " if e.get("exact") else ("MISS" if e.get("missing") else "SOFT")
        manual = " MANUAL" if e.get("manual") else ""
        L.append(f"- [{mark}] r{e.get('row')} {e.get('type')}|{(e.get('item') or '')[:30]} file={e.get('file') or '-'}{manual} url=...{(e.get('url') or '')[-40:]}")
    L.append("")

    L.append("## 7. KEY 截图（AI 审计员必须亲眼看的）")
    for f in key_shots(result, evidence):
        L.append(f"- logs/{cid}/{f}")
    L.append("")

    L.append("## 8. 机械预检（脚本结论，AI 仍需复核）")
    issues = []
    # coverage continuity: every procedure sourceRow inside some block range
    covered = set()
    for b in details:
        a, z = b.get("fromRow"), b.get("toRow")
        if a is None or z is None:
            continue
        idx = {r.get("sourceRow") for r in rows}
        covered |= {n for n in idx if a <= n <= z}
    all_rows = {r.get("sourceRow") for r in rows}
    gaps = sorted(all_rows - covered)
    if gaps:
        issues.append(f"COVERAGE GAPS: rows {gaps} not inside any block range")
    # selector params resolution
    missing_params = set()
    used_blocks = {b["block"] for b in details}
    for blk, ent in selectors.items():
        if blk not in used_blocks:
            continue  # only check blocks this case actually composes
        for s in ent.get("steps", []):
            for v in (s.get("value"), s.get("label")):
                for m in re.finditer(r"params[.](\w+)", str(v or "")):
                    if m.group(1) not in params:
                        missing_params.add(m.group(1))
    if missing_params:
        issues.append(f"PARAMS MISSING: {sorted(missing_params)}")
    # blocks without selectors
    no_sel = [b["block"] for b in details if b["block"] not in selectors]
    if no_sel:
        issues.append(f"BLOCKS WITHOUT SELECTORS: {no_sel}")
    # evidence soft/missing
    soft = [e.get("row") for e in evidence if not e.get("exact")]
    if soft:
        issues.append(f"EVIDENCE NOT EXACT rows: {soft}")
    manual = [e.get("row") for e in evidence if e.get("manual")]
    if manual:
        issues.append(f"MANUAL (non-browser) rows: {manual} — per MANUAL-DECISION.md these are human steps")
    if not issues:
        issues.append("none — mechanical checks all green")
    L.extend(f"- {x}" for x in issues)
    L.append("")
    L.append("## 9. 审计员提示（来自 009 深审的已知陷阱，勿重复误报）")
    L.append("- assert 过 ≠ 真的对：mock 曾把検索結果行插到 </tbody> 外，runner 照样 pass（已修，2026-10-25）")
    L.append("- 検索結果確認（rXX 表示/確認类）的証跡截图按 URL 规则抓，同 URL 重渲染会拍到响应落地前瞬间 —— 执行对但截图可能早了，标注即可不算 fail")
    L.append("- mock 无后端：エラーメッセージ/DB/メール/バッチ 相关断言均为 optional/mock-only，裁定为『真机 pending』而非 fail")
    L.append("- 業務ルール：種目 Z→入力区分必须 5/7、種目 0→9；核 params 时若命中此规则需确认 inputType 与之匹配")
    L.append("- 裁定三态：mock-done（模拟层吻合）/ live-pending（需真机确认）/ doubt（写清疑点）。不许自动改 execution-status.json")

    text = "\n".join(L) + "\n"
    if to_stdout:
        print(text)
    else:
        out = log_dir / f"{cid}-dossier.md"
        log_dir.mkdir(parents=True, exist_ok=True)
        out.write_text(text, encoding="utf-8", newline="\n")
        print(f"dossier -> {out}  ({len(text)} chars)")


if __name__ == "__main__":
    main()
