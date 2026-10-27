# Save the YAML on the clipboard to a file (UTF-8, no BOM).
# Why: Notepad gets the extension and the encoding wrong, and a BOM breaks YAML.
#
# Usage (repo root, cmd or PowerShell):
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools/save-clip.ps1 -Path flows/tests/AZ-110-01-009.ai.yaml
#
# It does three things:
#   1. strips the Markdown fence (```yaml ... ```)
#   2. refuses to write when the text does not look like YAML
#   3. writes UTF-8 without BOM, creating the parent folder if needed
param(
    [Parameter(Mandatory = $true)][string]$Path
)

$text = Get-Clipboard -Raw
if ([string]::IsNullOrWhiteSpace($text)) {
    Write-Error "Clipboard is empty. Copy the YAML block from Copilot first."
    exit 1
}

$text = $text -replace '(?s)^\s*```[a-zA-Z]*[ \t]*\r?\n', ''
$text = $text -replace '(?s)\r?\n```\s*$', ''
$text = $text.Trim()

if ($text -notmatch '(?m)^(case|kind|book|overrides)\s*:') {
    Write-Error "Not YAML (no case:/kind:/book:/overrides: line at the start of a line). Nothing written."
    exit 1
}

$dir = Split-Path -Parent $Path
if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force $dir | Out-Null
}

$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText((Join-Path (Get-Location) $Path), $text, $utf8)

$lines = ($text -split "`r?`n")
Write-Host ("wrote " + $Path + "  (" + $lines.Count + " lines)")
Write-Host ("first: " + $lines[0])
Write-Host ("last:  " + $lines[$lines.Count - 1])
