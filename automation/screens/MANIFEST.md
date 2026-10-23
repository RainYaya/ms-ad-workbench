# Screen / HTML registry

保存的是 F12 复制出来的 DOM 片段（不是完整可独立打开的页面）。用途：以后不用重新要 HTML，直接查 selector。

| File | Screen | URL / popup | Block | Key selectors | Screenshot |
|---|---|---|---|---|---|
| `AZG001_menu.html` | AZG001 メニュー画面 | `/mhkcmwa11/AMA01/...` | 1 | `#act001to100` 新規登録 | `block01_row015_AZG100.png`（点击后） |
| `AZG100_input.html` | AZG100 不備内容入力画面 | `/mhkcmwa11/AMA03/...` | 2-4 | `#policy_number`, `#sub_policy_number`, `#section_code`, `#agent_code`, `select[name="input_type_list.selected"]`, `select[name="large_item_list.selected"]`, `input[name="selectInsuransuItem"]`, `input[name="selectFieldAgent"]`, `#regist` | `block02_row016_AZG100_filled.png` |
| `insurance_item_select.html` | 保険種類選択 popup | `http://127.0.0.1:10081/mhkcmwa11/insurance_item_select.html` | 3 | `select[name="insurance_item_list.selected"]`（009 は option `00A0`）, `input[name="ok"]` | `block03_row018_insurance_popup.png` |
| `AZG905_agent_search.html` | AZG905 募集人検索 popup | `popupAZG905()`（新窗口, `gamid=AMA18`） | 4-5 | `#section_code_key`, `#agent_code_key`, `#field_agent_id_key`, `#field_agent_name_key`, `#search`, `#gyoumu_list`, `input[name="closeSelect"]` | `block04_row023_agent_popup.png`, `block05_row026_agent_results.png` |

## Screenshot order

Screenshots are captured at the verification rows of the 手順書, in execution order:

| Block | Source row | Evidence | File |
|---|---|---|---|
| 1 | 15 | 遷移 不備内容入力画面-新規 | `block01_row015_AZG100.png` |
| 2 | 16 | 入力画面 | `block02_row016_AZG100_filled.png` |
| 3 | 18 | 遷移 保険種類選択画面 | `block03_row018_insurance_popup.png` |
| 3 | 21 | 遷移 不備内容入力画面-新規 | `block03_row021_AZG100_after_insurance.png` |
| 4 | 23 | 遷移 募集人検索画面 | `block04_row023_agent_popup.png` |
| 5 | 26 | 表示 募集人検索画面 | `block05_row026_agent_results.png` |
| 5 | 29 | 遷移 不備内容入力画面-新規 | `block05_row029_AZG100_after_agent.png` |

Output directory: `automation/logs/<CaseId>/`（例: `automation/logs/AZ-110-01-009/`）。009〜012 は同じ順序・同じファイル名。

## Notes

- `AZG905_agent_search.html` is the initial popup, before search; `#gyoumu_list` is empty/hidden. Need result-row HTML after clicking `#search` to fix the selection step.
- `insurance_item_select.html` initial select has option `00A0` (`00 ： 自賠責`).
- Popup windows are separate CDP targets; `run-009.ps1` uses `Connect-CdpPage` / `Connect-CdpPageWithSelector`.
- 保険種類は value ではなく表示 label（空白・全角コロン正規化）で選ぶ。`010` は `02 ： 国内貨物総合保険`、`011` は `00 ： 種目共通`、`012` は `00 ： その他`。
- Block 6〜13 の screenshot (`row031`, `row035`, `row038`, `row041`, `row044`, `row047`, `row050`, `row053`, `row055`, `row057`) は未実装。
- Source-derived selectors for AZG101/AZG900/AZG902/AZG906: `SOURCE-SELECTORS.md`（source-only; live verification required）。
- AY source-derived selectors for AYG200/AYG901/AYG101/102/AYG900: `SOURCE-SELECTORS-AY.md`（source-only）。
