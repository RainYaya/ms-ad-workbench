#!/usr/bin/env python3
"""Build v2/data/runner-defs.js: per-case effective execution definitions.

Combines:
- block selector templates (automation/node-runner/block-selectors*.json)
- per-case params (automation/cdp/params/*.json)
- per-case block composition (automation/blocks/blocks.json workflows)

The viewer renders the engineer view ("this book's effective code") from this:
sequence of blocks, each step's action/selector, and values with params
substituted. This is the same data the node runner loads at runtime.
"""
from __future__ import annotations
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.stdout.reconfigure(encoding="utf-8")

NR = ROOT / "automation" / "node-runner"
blocks_out = {}
for f in sorted(NR.glob("block-selectors*.json")):
    blocks_out.update(json.loads(f.read_text(encoding="utf-8")))

params_out = {}
for f in sorted((ROOT / "automation" / "cdp" / "params").glob("*.json")):
    try:
        d = json.loads(f.read_text(encoding="utf-8"))
    except Exception:
        continue
    common = d.get("common", {})
    for cid, pc in (d.get("cases") or {}).items():
        merged = {**common, **(pc or {})}
        if cid not in params_out or len(merged) > len(params_out[cid]):
            params_out[cid] = merged

wf = json.loads((ROOT / "automation" / "blocks" / "blocks.json").read_text(encoding="utf-8"))["workflows"]
compositions = {}
start_urls = {}
for cid, w in wf.items():
    seq = []
    for b in w.get("blockDetails", []):
        if b["block"] in blocks_out and b["block"] not in seq:
            seq.append(b["block"])
    if seq:
        compositions[cid] = seq
        p = params_out.get(cid, {})
        if p.get("startUrl"):
            start_urls[cid] = p["startUrl"]

payload = {
    "generatedAt": "2026-10-25",
    "note": "Effective execution definitions per case: block templates + params + composition. Same data the node runner uses.",
    "blocks": blocks_out,
    "params": params_out,
    "compositions": compositions,
}
js = "window.MSAD_RUNNER_DEFS = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
out = ROOT / "v2" / "data" / "runner-defs.js"
out.write_text(js, encoding="utf-8")
print(f"runner-defs.js: {len(blocks_out)} blocks, {len(params_out)} params, {len(compositions)} compositions, {len(js)//1024} KB")
