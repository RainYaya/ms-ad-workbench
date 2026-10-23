param(
    [int]$Port = 9222,
    [string]$BaseUrl = 'http://127.0.0.1:10081/mhkcmwa11/dummy.html',
    [string]$PagePattern = '*127.0.0.1:10081*',
    [string]$PopupPattern = '*insurance_item_select.html*',
    [switch]$StartEdge,
    [switch]$Headless,
    [string]$Profile = "$env:TEMP\msad-cdp-profile",
    [int]$WaitMenuSec = 120
)

$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\Cdp.ps1"

if ($StartEdge) {
    Start-CdpEdge -Port $Port -Profile $Profile -Url $BaseUrl -Headless:$Headless
}

$page = Connect-CdpPage -UrlPattern $PagePattern -Port $Port -TimeoutSec 30
Send-Cdp -Conn $page -Method 'Page.enable' | Out-Null

$hasMenu = Invoke-CdpJs -Conn $page -Expression "!!document.querySelector('#act001to100')"
if (-not $hasMenu) {
    Write-Host "If a login screen appears, log in now. Waiting up to $WaitMenuSec sec for the menu..."
    Send-Cdp -Conn $page -Method 'Page.navigate' -Params @{ url = $BaseUrl } | Out-Null
    Wait-CdpJs -Conn $page -Expression "!!document.querySelector('#act001to100')" -TimeoutSec $WaitMenuSec | Out-Null
}

Write-Host 'STEP 1: click new registration'
Invoke-CdpJs -Conn $page -Expression "document.querySelector('#act001to100').click(); 'clicked'" | Out-Null
Wait-CdpJs -Conn $page -Expression "!!document.querySelector('#policy_number')" -TimeoutSec 30 | Out-Null

Write-Host 'STEP 2: fill input screen'
$fill = @'
(async () => {
  const q = (s) => document.querySelector(s);
  const must = (s) => { const el = q(s); if (!el) throw new Error('not found: ' + s); return el; };
  const setInput = (s, v) => {
    const el = must(s);
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  const setSelect = (s, v) => {
    const el = must(s);
    el.value = v;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    if (el.value !== v) throw new Error('select failed: ' + s + ' -> ' + el.value);
  };

  const gid = q('input[name="gamid"]')?.value;
  if (gid !== 'AMA03') throw new Error('AZG100 not detected: gamid=' + gid);

  setSelect('select[name="input_type_list.selected"]', '2');
  setSelect('select[name="large_item_list.selected"]', 'B');
  await new Promise((r) => setTimeout(r, 300));

  setInput('#policy_number', 'AZ11001');
  setInput('#sub_policy_number', '0000000009');
  setInput('#section_code', 'AHE61');
  setInput('#agent_code', '252H');
  setInput('#sub_agent_code', '123456');
  setInput('#free_code_1', '1234567890');
  setInput('#insurant_name', 'TEST');
  setInput('#start_date', '2026/11/01');
  setSelect('select[name="application_form_type_list.selected"]', '1');
  setInput('#sumup_year_month', '2026/11');
  setInput('#daily_report_send', '1234567890AB');
  setInput('#sumup_section_code', 'ABC012');
  setSelect('select[name="sumup_status_list.selected"]', '1');
  setInput('#reminder_date', '2026/10/30');

  return JSON.stringify({
    inputType: q('#selected_input_type_code')?.value,
    largeItem: q('#selected_large_item_code')?.value,
    policy: q('#policy_number')?.value,
    detail: q('#sub_policy_number')?.value,
    start: q('#start_date')?.value,
    sumup: q('#sumup_year_month')?.value,
    reminder: q('#reminder_date')?.value
  });
})()
'@
$filled = Invoke-CdpJs -Conn $page -Expression $fill
Write-Host "AZG100 values: $filled"
Save-CdpScreenshot -Conn $page -Path (Join-Path $PSScriptRoot '..\logs\009-block2.png')

Write-Host 'STEP 3: insurance popup'
Invoke-CdpJs -Conn $page -Expression "document.querySelector('input[name=""selectInsuransuItem""]').click(); 'popup opened'" | Out-Null
$popup = Connect-CdpPage -UrlPattern $PopupPattern -Port $Port -TimeoutSec 20
try {
    Wait-CdpJs -Conn $popup -Expression "!!document.querySelector('select[name=""insurance_item_list.selected""]')" -TimeoutSec 20 | Out-Null
} catch {
    $diag = ''
    try {
        $diag = Invoke-CdpJs -Conn $popup -Expression @'
JSON.stringify({
  href: location.href,
  title: document.title,
  readyState: document.readyState,
  selects: [...document.querySelectorAll('select')].map((s) => s.name),
  iframes: [...document.querySelectorAll('iframe')].map((f) => f.src),
  body: (document.body?.innerText || '').slice(0, 500)
})
'@
    } catch {
        $diag = $_.Exception.Message
    }
    Write-Host "popup diagnostic: $diag"
    throw
}
$popupResult = Invoke-CdpJs -Conn $popup -Expression @'
(() => {
  const sel = document.querySelector('select[name="insurance_item_list.selected"]');
  if (!sel) throw new Error('insurance select not found');
  sel.value = '00A0';
  sel.dispatchEvent(new Event('change', { bubbles: true }));
  if (sel.value !== '00A0') throw new Error('select failed: ' + sel.value);
  const ok = document.querySelector('input[name="ok"]');
  if (!ok) throw new Error('OK button not found');
  ok.click();
  return 'ok';
})()
'@
Write-Host "popup: $popupResult"
Start-Sleep -Seconds 1

$parent = Invoke-CdpJs -Conn $page -Expression @'
JSON.stringify({
  selectValue: document.querySelector('select[name="insurance_item_list.selected"]')?.value,
  selectText: document.querySelector('select[name="insurance_item_list.selected"]')?.selectedOptions?.[0]?.textContent,
  hiddenValue: document.querySelector('#selected_insurance_item_code')?.value,
  titleText: document.querySelector('#insurance_item_title')?.innerText
})
'@
Write-Host "parent: $parent"
Save-CdpScreenshot -Conn $page -Path (Join-Path $PSScriptRoot '..\logs\009-block3.png')

$logDir = Join-Path $PSScriptRoot '..\logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
[IO.File]::WriteAllText(
    (Join-Path $logDir 'AZ-110-01-009-step3.json'),
    (@{ filled = ($filled | ConvertFrom-Json); parent = ($parent | ConvertFrom-Json) } | ConvertTo-Json -Depth 10)
)
Write-Host 'DONE'
