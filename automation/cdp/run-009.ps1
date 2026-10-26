param(
    [int]$Port = 9222,
    [string]$CaseId = 'AZ-110-01-009',
    [string]$ParamsFile = "$PSScriptRoot\params\AZ-110-01.json",
    [string]$BaseUrl = 'http://127.0.0.1:82/mhkcmwa11/dummy.html',
    [string]$PagePattern = '*127.0.0.1:82*',
    [string]$PopupPattern = '*insurance_item_select*',
    [switch]$StartEdge,
    [switch]$Headless,
    [string]$Profile = "$env:TEMP\msad-cdp-profile",
    [int]$WaitMenuSec = 120
)

$ErrorActionPreference = 'Stop'
. "$PSScriptRoot\Cdp.ps1"

if (-not (Test-Path $ParamsFile)) { throw "Params file not found: $ParamsFile" }
$allParams = Get-Content $ParamsFile -Raw -Encoding UTF8 | ConvertFrom-Json
$caseParams = $allParams.cases.$CaseId
if (-not $caseParams) { throw "Case not found in params: $CaseId" }
$P = [pscustomobject]@{}
foreach ($prop in $allParams.common.psobject.Properties) { $P | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value }
foreach ($prop in $caseParams.psobject.Properties) { $P | Add-Member -NotePropertyName $prop.Name -NotePropertyValue $prop.Value -Force }
$PJson = $P | ConvertTo-Json -Compress -Depth 10
Write-Host ("CASE {0} expected login: {1} / {2}" -f $CaseId, $P.user, $P.pointCheck)
$commonJson = $allParams.common | ConvertTo-Json -Compress -Depth 10
$insuranceLabelJson = $P.insuranceLabel | ConvertTo-Json -Compress
$agentIdJson = $P.fieldAgentId | ConvertTo-Json -Compress

$script:shotDir = Join-Path $PSScriptRoot ("..\logs\" + $CaseId)
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
$fill = (@'
(async () => {
  const P = __PARAMS__;
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

  setSelect('select[name="input_type_list.selected"]', P.inputType);
  setSelect('select[name="large_item_list.selected"]', P.largeItemValue);
  await new Promise((r) => setTimeout(r, 300));

  setInput('#policy_number', P.policyNo);
  setInput('#sub_policy_number', P.detailNo);
  setInput('#section_code', P.sectionCode);
  setInput('#agent_code', P.agentCode);
  setInput('#sub_agent_code', P.subAgentCode);
  setInput('#free_code_1', P.freeCode);
  setInput('#insurant_name', P.customerName);
  setInput('#start_date', P.startDate);
  setSelect('select[name="application_form_type_list.selected"]', P.applicationType);
  setInput('#sumup_year_month', P.sumupYearMonth);
  setInput('#daily_report_send', P.dailyReportSend);
  setInput('#sumup_section_code', P.sumupSectionCode);
  setSelect('select[name="sumup_status_list.selected"]', P.sumupStatus);
  setInput('#reminder_date', P.reminderDate);

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
'@).Replace('__PARAMS__', $PJson)
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
$popupResult = Invoke-CdpJs -Conn $popup -Expression (@'
(() => {
  const sel = document.querySelector('select[name="insurance_item_list.selected"]');
  if (!sel) throw new Error('insurance select not found');
  const target = __INSURANCE_LABEL__;
  const norm = (s) => String(s).replace(/\s+/g, '').replace(/\uFF1A/g, ':');
  const opt = [...sel.options].find((o) => norm(o.textContent).startsWith(norm(target)));
  if (!opt) throw new Error('insurance option not found: ' + target + ' / ' + [...sel.options].map((o) => o.textContent).join('|'));
  sel.value = opt.value;
  sel.dispatchEvent(new Event('change', { bubbles: true }));
  const ok = document.querySelector('input[name="ok"]');
  if (!ok) throw new Error('OK button not found');
  ok.click();
  return JSON.stringify({ value: opt.value, text: opt.textContent });
})()
'@).Replace('__INSURANCE_LABEL__', $insuranceLabelJson)
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

$agentFill = Invoke-CdpJs -Conn $agent -Expression (@'
(() => {
  const C = __COMMON__;
  const set = (s, v) => {
    const el = document.querySelector(s);
    if (!el) throw new Error('not found: ' + s);
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  };
  set('#section_code_key', C.sectionCode);
  set('#agent_code_key', C.agentCode);
  return JSON.stringify({ section: document.querySelector('#section_code_key')?.value, agent: document.querySelector('#agent_code_key')?.value });
})()
'@).Replace('__COMMON__', $commonJson)
Write-Host "agent popup values: $agentFill"
Invoke-CdpJs -Conn $agent -Expression "document.querySelector('#search').click(); 'search clicked'" | Out-Null
try {
    Wait-CdpJs -Conn $agent -Expression "document.querySelectorAll('#gyoumu_list tr').length > 0" -TimeoutSec 20 | Out-Null
} catch {
    $noRows = ''
    try {
        $noRows = Invoke-CdpJs -Conn $agent -Expression @'
JSON.stringify({
  href: location.href,
  title: document.title,
  readyState: document.readyState,
  searchCount: document.querySelector('.gyoumu_search_count')?.innerText,
  section: document.querySelector('#section_code_key')?.value,
  agentCode: document.querySelector('#agent_code_key')?.value,
  fieldAgentId: document.querySelector('#field_agent_id_key')?.value,
  rows: document.querySelectorAll('#gyoumu_list tr').length,
  listText: document.querySelector('#gyoumu_list')?.innerText,
  body: (document.body?.innerText || '').slice(0, 800)
})
'@
    } catch {
        $noRows = $_.Exception.Message
    }
    Save-StepShot -Conn $agent -Block 5 -Row 26 -Name 'agent_no_results'
    Write-Host "agent no-results diagnostic: $noRows"
    throw
}
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

$agentSelected = Invoke-CdpJs -Conn $agent -Expression (@'
(() => {
  const target = __AGENT_ID__;
  const rows = [...document.querySelectorAll('#gyoumu_list tr')];
  const row = rows.find((tr) => tr.innerText.includes(target));
  if (!row) throw new Error('agent row ' + target + ' not found; count=' + rows.length);
  const hit = row.querySelector('input[type="radio"],input[type="checkbox"],a,button') || row;
  hit.click();
  const select = document.querySelector('input[name="closeSelect"]');
  if (!select) throw new Error('closeSelect not found');
  select.click();
  return 'selected';
})()
'@).Replace('__AGENT_ID__', $agentIdJson)
Write-Host "agent select: $agentSelected"
Wait-CdpJs -Conn $page -Expression "document.querySelector('#field_agent_id')?.value === $agentIdJson" -TimeoutSec 10 | Out-Null
Save-StepShot -Conn $page -Block 5 -Row 29 -Name 'AZG100_after_agent'

$logDir = Join-Path $PSScriptRoot '..\logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
[IO.File]::WriteAllText(
    (Join-Path $logDir ($CaseId + '-step5.json')),
    (@{
        filled = ($filled | ConvertFrom-Json)
        insuranceParent = ($parent | ConvertFrom-Json)
        agentPopup = ($agentFill | ConvertFrom-Json)
        agentResults = ($agentDiagnostic | ConvertFrom-Json)
        screenshots = $script:shots
    } | ConvertTo-Json -Depth 10)
)
[IO.File]::WriteAllText(
    (Join-Path $logDir ($CaseId + '-screenshots.json')),
    ($script:shots | ConvertTo-Json -Depth 10)
)
Write-Host "DONE $CaseId"
