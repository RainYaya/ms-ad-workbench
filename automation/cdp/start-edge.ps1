param(
    [int]$Port = 9223,
    [string]$Profile = "$env:TEMP\msad-edge-copy",
    [string]$Url = 'http://127.0.0.1:82/mhkcmwa11/dummy.html',
    [switch]$RecreateProfile
)

$ErrorActionPreference = 'Stop'

try {
    Invoke-RestMethod "http://127.0.0.1:$Port/json/version" | Out-Null
    Write-Host "CDP is already running on port $Port"
    return
} catch {
    # port is not listening; continue
}

$edge = @(
    'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
    'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw 'Edge not found.' }

$cookie = Join-Path $Profile 'Default\Network\Cookies'
if ($RecreateProfile -or -not (Test-Path $cookie)) {
    Write-Host 'Closing Edge and copying the current Edge profile...'
    Get-Process msedge -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 5

    $src = "$env:LOCALAPPDATA\Microsoft\Edge\User Data"
    if (Test-Path $Profile) { Remove-Item $Profile -Recurse -Force }
    robocopy $src $Profile /E /XD Cache "Code Cache" GPUCache "ShaderCache" "Service Worker" Crashpad /XF SingletonLock SingletonCookie SingletonSocket lockfile /R:1 /W:1 | Out-Null
    if (-not (Test-Path $cookie)) {
        throw "Profile copy failed: $cookie not found. Close Edge and retry with -RecreateProfile."
    }
} else {
    Write-Host 'Using existing copied profile. Closing Edge before starting CDP...'
    Get-Process msedge -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 3
}

$edgeArgs = @(
    "--remote-debugging-port=$Port",
    "--user-data-dir=$Profile",
    '--profile-directory=Default',
    '--no-first-run',
    '--no-default-browser-check',
    '--new-window',
    $Url
)
Start-Process $edge -ArgumentList $edgeArgs

$end = (Get-Date).AddSeconds(30)
while ((Get-Date) -lt $end) {
    try {
        Invoke-RestMethod "http://127.0.0.1:$Port/json/version" | Out-Null
        Write-Host "CDP ready: http://127.0.0.1:$Port/json/version"
        Write-Host 'Log in as MS-3n / 事務S if the login screen appears.'
        return
    } catch {
        Start-Sleep -Milliseconds 300
    }
}

throw "Edge CDP port $Port did not become ready. Check edge://policy for RemoteDebuggingAllowed."
