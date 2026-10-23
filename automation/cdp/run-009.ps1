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

$script:shotDir = Join-Path $PSScriptRoot '..\logs\AZ-110-01-009'
$script:shots = @()
if (-not (Test-Path $script:shotDir)) { New-Item -ItemType Directory -Path $script:shotDir -Force | Out-Null }

function Save-StepShot {
    param($Conn, [int]$Block, [int]$Row, [string]$Name)
    $file = Join-Path $script:shotDir (('block{0:D2}_row{1:D3}_{2}.png' -f $Block, $Row, $Name))
    Save-CdpScreenshot -Conn $Conn -Path $file
    $script:shots += [pscustomobject]@{ block = $Block; sourceRow = $Row; file = $file }
    Write-Host "SHOT $file"
}

if ($StartEdge) {
    Start-CdpEdge -Port $Port -Profile $Profile -Url $BaseUrl -Headless:$Headless
}

Write-Host 'Waiting for the menu page. If a login screen appears, log in now...'
$page = Connect-CdpPageWithSelector `
    -UrlPattern $PagePattern `
    -Selector '#act001to100' `
    -Port $Port `
    -TimeoutSec $WaitMenuSec
Send-Cdp -Conn $page -Method 'Page.enable' | Out-Null

Write-Host 'STEP 1: click new registration'
Invoke-CdpJs -Conn $page -Expression "document.querySelector('#act001to100').click(); 'clicked'" | Out-Null
Wait-CdpJs -Conn $page -Expression "!!document.querySelector('#policy_number')" -TimeoutSec 30 | Out-Null
Save-StepShot -Conn $page -Block 1 -Row 15 -Name 'AZG100'

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
Save-StepShot -Conn $page -Block 2 -Row 16 -Name 'AZG100_filled'

Write-Host 'STEP 3: insurance popup'
Invoke-CdpJs -Conn $page -Expression "document.querySelector('input[name=""selectInsuransuItem""]').click(); 'popup opened'" | Out-Null
$popup = Connect-CdpPage -UrlPattern $PopupPattern -Port $Port -TimeoutSec 20
Send-Cdp -Conn $popup -Method 'Page.enable' | Out-Null
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
Save-StepShot -Conn $popup -Block 3 -Row 18 -Name 'insurance_popup'
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
Save-StepShot -Conn $page -Block 3 -Row 21 -Name 'AZG100_after_insurance'

Write-Host 'STEP 4: agent search popup'
Invoke-CdpJs -Conn $page -Expression "document.querySelector('input[name=""selectFieldAgent""]').click(); 'agent popup opened'" | Out-Null
$agent = Connect-CdpPageWithSelector -UrlPattern $PagePattern -Selector '#section_code_key' -Port $Port -TimeoutSec 20
Send-Cdp -Conn $agent -Method 'Page.enable' | Out-Null
Wait-CdpJs -Conn $agent -Expression "!!document.querySelector('#section_code_key')" -TimeoutSec 20 | Out-Null
Save-StepShot -Conn $agent -Block 4 -Row 23 -Name 'agent_popup'

$agentFill = Invoke-CdpJs -Conn $agent -Expression @'
(() => {
  const set = (s, v) => {
    const el = document.querySelector(s);
    if (!el) throw new Error('not found: ' + s);
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  set('#section_code_key', 'AHE61');
  set('#agent_code_key', '252H');
  return JSON.stringify({ section: document.querySelector('#section_code_key')?.value, agent: document.querySelector('#agent_code_key')?.value });
})()
'@
Write-Host "agent popup values: $agentFill"
Invoke-CdpJs -Conn $agent -Expression "document.querySelector('#search').click(); 'search clicked'" | Out-Null
Wait-CdpJs -Conn $agent -Expression "document.querySelectorAll('#gyoumu_list tr').length > 0" -TimeoutSec 20 | Out-Null
Save-StepShot -Conn $agent -Block 5 -Row 26 -Name 'agent_results'

$agentDiagnostic = Invoke-CdpJs -Conn $agent -Expression @'
JSON.stringify({
  count: document.querySelectorAll('#gyoumu_list tr').length,
  rows: [...document.querySelectorAll('#gyoumu_list tr')].slice(0, 5).map((tr) => tr.innerText.replace(/\s+/g, ' ').trim()),
  inputs: [...document.querySelectorAll('#gyoumu_list input')].map((i) => ({ type: i.type, name: i.name, id: i.id, value: i.value })),
  buttons: [...document.querySelectorAll('input[type="button"],input[type="submit"]')].map((b) => ({ name: b.name, value: b.value, id: b.id, visibility: getComputedStyle(b).visibility }))
})
'@
Write-Host "agent results: $agentDiagnostic"

$agentSelected = Invoke-CdpJs -Conn $agent -Expression @'
(() => {
  const rows = [...document.querySelectorAll('#gyoumu_list tr')];
  const row = rows.find((tr) => tr.innerText.includes('3028004586'));
  if (!row) throw new Error('agent row 3028004586 not found; count=' + rows.length);
  const hit = row.querySelector('input[type="radio"],input[type="checkbox"],a,button') || row;
  hit.click();
  const select = document.querySelector('input[name="closeSelect"]');
  if (!select) throw new Error('closeSelect not found');
  select.click();
  return 'selected';
})()
'@
Write-Host "agent select: $agentSelected"
Wait-CdpJs -Conn $page -Expression "document.querySelector('#field_agent_id')?.value === '3028004586'" -TimeoutSec 10 | Out-Null
Save-StepShot -Conn $page -Block 5 -Row 29 -Name 'AZG100_after_agent'

$logDir = Join-Path $PSScriptRoot '..\logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
[IO.File]::WriteAllText(
    (Join-Path $logDir 'AZ-110-01-009-step5.json'),
    (@{
        filled = ($filled | ConvertFrom-Json)
        insuranceParent = ($parent | ConvertFrom-Json)
        agentPopup = ($agentFill | ConvertFrom-Json)
        agentResults = ($agentDiagnostic | ConvertFrom-Json)
        screenshots = $script:shots
    } | ConvertTo-Json -Depth 10)
)
[IO.File]::WriteAllText(
    (Join-Path $logDir 'AZ-110-01-009-screenshots.json'),
    ($script:shots | ConvertTo-Json -Depth 10)
)
Write-Host 'DONE'
