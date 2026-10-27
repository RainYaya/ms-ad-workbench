#!/usr/bin/env python3
"""Build the offline field pack for the company PC.

The pack must run without npm install, without the repo, and without network:
the kernel, the mock screens, the flows, the dictionaries, the Studio, and the
DOM capturer all travel together.  The four-layer rebuild inputs (手順/別紙 data
and the reference HTML) are included too, so the numbers in the docs can be
reproduced on that machine.

    python tools/make_bundle.py                 # dist/ms-ad-rpa-pack-YYYY-MM-DD
    python tools/make_bundle.py --out D:/tmp    # somewhere else

The staging directory is kept next to the zip so a broken file can be replaced
without rebuilding everything.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import zipfile
from datetime import date, datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUNDLE = Path(__file__).resolve().parent / "bundle"

sys.stdout.reconfigure(encoding="utf-8")

# The kernel is a closed set of files; everything else in node-runner is
# history (old block runner, debug scripts, mined selector slices).
RUNNER_FILES = [
    "flow-loader.mjs",
    "check-flow.mjs",
    "check-patch.mjs",
    "run-flow.mjs",
    "mock-server.mjs",
    "capture.mjs",
    "dom-check.mjs",
    "make-brief.mjs",
    "make-pack.mjs",
    "add-control.mjs",
    "patch-store.mjs",
    "mock-routes.json",
    "package.json",
    "package-lock.json",
]
RUNNER_DIRS = ["studio", "mock-src", "node_modules"]

# save-clip.ps1 turns the web AI's clipboard into a flow file; it is the only
# tool a Windows box needs and has no npm dependency.
TOOL_SCRIPTS = ["save-clip.ps1"]

TOOLS = [
    "rpa_common.py",
    "build_controls.py",
    "build_bindings.py",
    "generate_books.py",
    "report.py",
    "derive_screen_chain.py",
    "build_pages.py",
    "build_studio_pages.py",
]

# check-flow refuses to run without the derived screen chain, so this is a
# runtime input, not a report.
REPORT_FILES = ["screen-chain.json", "screen-chain.md", "guards.md"]

ROOT_FILES = [
    "ui-controls.json",
    "ui-dictionary.json",
    "ui-screens.json",
    "ui-aliases.json",
    "ui-rowfields.json",
    "guards.json",
    "GLOSSARY.md",
]

BUNDLE_FILES = ["READ-ME-FIRST.txt", "VERIFY.md", "verify-check.cmd",
                "studio.cmd", "mock-demo.cmd"]

REQUIREMENTS = "PyYAML>=6\n"

KEY_FILES = [
    "ui-controls.json",
    "flows/bindings.yaml",
    "flows/books-status.json",
    "docs/rpa/14-REPORT.md",
    "VERIFY.md",
]


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def copy_tree(src: Path, dst: Path, exclude=None) -> None:
    for p in src.rglob("*"):
        rel = p.relative_to(src)
        if exclude and exclude(rel):
            continue
        target = dst / rel
        if p.is_dir():
            target.mkdir(parents=True, exist_ok=True)
        else:
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(p, target)


def git(*args: str) -> str:
    try:
        return subprocess.run(["git", *args], cwd=ROOT, capture_output=True,
                              text=True, encoding="utf-8").stdout.strip()
    except Exception:
        return ""


def build(stage: Path) -> dict:
    stage.mkdir(parents=True)

    # kernel
    runner = stage / "automation" / "node-runner"
    runner.mkdir(parents=True)
    for name in RUNNER_FILES:
        shutil.copy2(ROOT / "automation" / "node-runner" / name, runner / name)
    for name in RUNNER_DIRS:
        copy_tree(ROOT / "automation" / "node-runner" / name, runner / name,
                  exclude=lambda rel: "__pycache__" in rel.parts)

    # flows: the .backup snapshots and the superseded legacy flow are history
    def flow_exclude(rel: Path) -> bool:
        return ".backup" in rel.parts or rel.name.endswith(".legacy.yaml")

    copy_tree(ROOT / "flows", stage / "flows", exclude=flow_exclude)

    # dictionaries / guards at the repo root
    for name in ROOT_FILES:
        shutil.copy2(ROOT / name, stage / name)

    (stage / "reports").mkdir()
    for name in REPORT_FILES:
        shutil.copy2(ROOT / "reports" / name, stage / "reports" / name)

    # docs: only the RPA set and the ADRs
    copy_tree(ROOT / "docs" / "rpa", stage / "docs" / "rpa")
    copy_tree(ROOT / "docs" / "adr", stage / "docs" / "adr")

    # pipeline inputs (optional for running, required for the rebuild check)
    copy_tree(ROOT / "v2" / "data" / "cases", stage / "v2" / "data" / "cases")
    copy_tree(ROOT / "reference" / "webapps", stage / "reference" / "webapps")

    (stage / "tools").mkdir()
    for name in TOOLS:
        shutil.copy2(ROOT / "tools" / name, stage / "tools" / name)
    for name in TOOL_SCRIPTS:
        shutil.copy2(ROOT / "tools" / name, stage / "tools" / name)
    (stage / "tools" / "requirements.txt").write_text(REQUIREMENTS, encoding="utf-8")

    for name in BUNDLE_FILES:
        shutil.copy2(BUNDLE / name, stage / name)

    return {"git": {"branch": git("rev-parse", "--abbrev-ref", "HEAD"),
                    "commit": git("rev-parse", "--short", "HEAD")}}


def manifest(stage: Path, extra: dict) -> dict:
    payload = [p for p in stage.rglob("*")
               if p.is_file() and p.name != "PACKAGE-MANIFEST.json"]
    top: dict = {}
    for p in payload:
        name = p.relative_to(stage).parts[0]
        row = top.setdefault(name, {"files": 0, "bytes": 0})
        row["files"] += 1
        row["bytes"] += p.stat().st_size
    data = {
        "name": stage.name,
        "generatedAt": datetime.now().isoformat(timespec="seconds"),
        "git": extra["git"],
        "files": len(payload),
        "bytes": sum(p.stat().st_size for p in payload),
        "note": "files/bytes exclude this manifest",
        "top": dict(sorted(top.items(), key=lambda kv: -kv[1]["bytes"])),
        "key": {name: {"bytes": (stage / name).stat().st_size,
                       "sha256": sha256(stage / name)}
                for name in KEY_FILES if (stage / name).exists()},
    }
    (stage / "PACKAGE-MANIFEST.json").write_text(
        json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
    return data


def zip_dir(stage: Path, zip_path: Path) -> None:
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
        for p in sorted(stage.rglob("*")):
            if p.is_file():
                z.write(p, f"{stage.name}/{p.relative_to(stage).as_posix()}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(ROOT / "dist"))
    ap.add_argument("--name", default=f"ms-ad-rpa-pack-{date.today().isoformat()}")
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    stage = out / args.name
    zip_path = out / f"{args.name}.zip"
    for p in (stage, zip_path):
        if p.is_dir():
            shutil.rmtree(p)
        elif p.exists():
            p.unlink()

    extra = build(stage)
    data = manifest(stage, extra)
    zip_dir(stage, zip_path)
    digest = sha256(zip_path)
    (out / f"{args.name}.zip.sha256").write_text(
        f"{digest}  {zip_path.name}\n", encoding="utf-8")

    mb = lambda n: f"{n / 1e6:.1f} MB"
    print(f"{stage.name}")
    print(f"  files {data['files']:,}   raw {mb(data['bytes'])}   zip {mb(zip_path.stat().st_size)}")
    for name, row in data["top"].items():
        print(f"    {mb(row['bytes']):>9}  {row['files']:>5}  {name}")
    print(f"  sha256 {digest}")
    print(f"  {zip_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
