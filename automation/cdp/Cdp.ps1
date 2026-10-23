$ErrorActionPreference = 'Stop'

function Receive-CdpMessage {
    param($Conn)
    $buffer = New-Object byte[] 1048576
    $sb = New-Object System.Text.StringBuilder
    do {
        $segment = New-Object 'System.ArraySegment[byte]' -ArgumentList @(,$buffer)
        $result = $Conn.Ws.ReceiveAsync($segment, [Threading.CancellationToken]::None).Result
        if ($result.MessageType -eq [System.Net.WebSockets.WebSocketMessageType]::Close) {
            throw 'CDP socket closed'
        }
        [void]$sb.Append([Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count))
    } while (-not $result.EndOfMessage)
    return ($sb.ToString() | ConvertFrom-Json)
}

function Send-Cdp {
    param(
        $Conn,
        [string]$Method,
        [hashtable]$Params = @{}
    )
    $id = [int]$Conn.NextId
    $Conn.NextId = $id + 1
    $payload = @{ id = $id; method = $Method; params = $Params } | ConvertTo-Json -Compress -Depth 50
    $bytes = [Text.Encoding]::UTF8.GetBytes($payload)
    $segment = New-Object 'System.ArraySegment[byte]' -ArgumentList @(,$bytes)
    $Conn.Ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, [Threading.CancellationToken]::None).Wait()
    while ($true) {
        $msg = Receive-CdpMessage -Conn $Conn
        if ($msg.id -eq $id) {
            if ($msg.error) {
                throw ("CDP error: " + ($msg.error | ConvertTo-Json -Compress -Depth 10))
            }
            return $msg.result
        }
    }
}

function Invoke-CdpJs {
    param(
        $Conn,
        [string]$Expression
    )
    $r = Send-Cdp -Conn $Conn -Method 'Runtime.evaluate' -Params @{
        expression = $Expression
        awaitPromise = $true
        returnByValue = $true
        userGesture = $true
    }
    if ($r.exceptionDetails) {
        $desc = $r.exceptionDetails.exception.description
        throw ("JS error: " + $r.exceptionDetails.text + " " + $desc)
    }
    return $r.result.value
}

function Wait-CdpJs {
    param(
        $Conn,
        [string]$Expression,
        [int]$TimeoutSec = 20
    )
    $end = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $end) {
        try {
            $v = Invoke-CdpJs -Conn $Conn -Expression $Expression
            if ($v) { return $v }
        } catch {
            # page may be navigating; retry
        }
        Start-Sleep -Milliseconds 250
    }
    throw "Timeout waiting for: $Expression"
}

function Get-CdpTargets {
    param([int]$Port = 9222)
    return @(Invoke-RestMethod "http://127.0.0.1:$Port/json")
}

function Connect-CdpTarget {
    param(
        [string]$WebSocketUrl,
        [int]$Port = 9222
    )
    $ws = New-Object System.Net.WebSockets.ClientWebSocket
    $ws.ConnectAsync([Uri]$WebSocketUrl, [Threading.CancellationToken]::None).Wait()
    return [pscustomobject]@{ Ws = $ws; NextId = 1; Port = $Port }
}

function Connect-CdpPage {
    param(
        [string]$UrlPattern,
        [int]$Port = 9222,
        [int]$TimeoutSec = 30
    )
    $end = (Get-Date).AddSeconds($TimeoutSec)
    while ((Get-Date) -lt $end) {
        $targets = Get-CdpTargets -Port $Port
        $t = $targets | Where-Object { $_.type -eq 'page' -and $_.url -like $UrlPattern } | Select-Object -First 1
        if ($t) {
            return Connect-CdpTarget -WebSocketUrl $t.webSocketDebuggerUrl -Port $Port
        }
        Start-Sleep -Milliseconds 300
    }
    throw "CDP target not found: $UrlPattern"
}

function Save-CdpScreenshot {
    param(
        $Conn,
        [string]$Path
    )
    $dir = Split-Path -Parent $Path
    if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $r = Send-Cdp -Conn $Conn -Method 'Page.captureScreenshot' -Params @{ format = 'png' }
    [IO.File]::WriteAllBytes($Path, [Convert]::FromBase64String($r.data))
}

function Start-CdpEdge {
    param(
        [int]$Port = 9222,
        [string]$Profile = "$env:TEMP\msad-cdp-profile",
        [string]$Url = 'about:blank',
        [switch]$Headless
    )
    $candidates = @(
        'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        'C:\Program Files\Microsoft\Edge\Application\msedge.exe',
        'C:\Program Files\Google\Chrome\Application\chrome.exe',
        'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
    )
    $edge = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
    if (-not $edge) { throw "Edge/Chrome not found. Pass an existing browser path." }
    $edgeArgs = @(
        "--remote-debugging-port=$Port",
        "--user-data-dir=$Profile",
        '--no-first-run',
        '--new-window'
    )
    if ($Headless) { $edgeArgs += '--headless=new' }
    $edgeArgs += $Url
    Start-Process $edge -ArgumentList $edgeArgs
    $end = (Get-Date).AddSeconds(30)
    while ((Get-Date) -lt $end) {
        try {
            Invoke-RestMethod "http://127.0.0.1:$Port/json/version" | Out-Null
            return
        } catch {
            Start-Sleep -Milliseconds 300
        }
    }
    throw "Edge CDP port $Port did not become ready"
}
