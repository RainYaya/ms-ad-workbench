# Source-derived selectors (AMB webapp)

Status: **source-only** unless marked live-verified. These are extracted from the Thymeleaf views in `reference/webapps/AMB` (CP932). They are hypotheses for the selector registry, not proof that the live SUT renders the same DOM.

Source app: `/mhkcmwa11/` / 申込書品質管理システム.

| Screen | Source view | Key selectors | Status |
|---|---|---|---|
| AZG001 menu | `AMA01.html` | `#act001to100` 新規登録, `#act001to200` 検索, `#act001to201` 集計, `#act001to103` 親子集計, `#act001to207` メール登録 | live-verified |
| AZG100 input | `AMA03.html` | `#policy_number`, `#sub_policy_number`, `#section_code`, `#agent_code`, `#sub_agent_code`, `#free_code_1`, `#field_agent_id`, `#insurant_name`, `#start_date`, `#change_date`, `#sumup_year_month`, `#daily_report_send`, `#sumup_section_code`, `#reminder_date`, `#regist`; `select[name="input_type_list.selected"]`, `select[name="large_item_list.selected"]`, `select[name="insurance_item_list.selected"]`, `select[name="application_form_type_list.selected"]`, `select[name="sumup_status_list.selected"]`; `input[name="selectInsuransuItem"]`, `input[name="selectFieldAgent"]` | live-verified for 009 block 1–3 |
| Insurance popup | `insurance_item_select.html` | `select[name="insurance_item_list.selected"]`, `input[name="ok"]`, `input[name="cancel"]`; options populated at runtime | live-verified for 009 |
| AZG905 agent search | `AMA18.html` | `#section_code_key`, `#agent_code_key`, `#field_agent_id_key`, `#field_agent_name_key`, `#search`, `#gyoumu_list`, `input[name="closeSelect"]`, `input[name="close"]`; row radio `input[name="selectNo"]` | popup/live initial verified; result-row DOM still missing |
| AZG101 update | `AMA04.html` | `#update` 更新（source は `visibility_hidden`; runtime で表示）, `#updateCompleteDate` 完了登録, `#cancelCompleteDate` 完了取消, `#delete` 削除（source は `visibility_hidden`; runtime で表示）, `input[name="act101to906"]` 訂正内容確認書, `#act101to200` 一覧画面, `#act101to100` 入力画面; row buttons `name="imperfectSearch[${stat.index}]"` (検索), `name="editInquiryContents[${stat.index}]"` (修), `name="imperfectClear[${stat.index}]"` (CL); `name="updateAnswer"` 回答, `name="updateBusinessNotify"` 営業連携 | source-only |
| AZG900 item-name search | `AMA13.html` | `#search`, `#field_code_key`, `#field_name_key`, `#inquiry_contents_code_key`, `#inquiry_contents_name_key`, `#select`; `select[name="field_list.selected"]`, `select[name="inquiry_contents_list.selected"]`, `select[name="imperfect_list.selected"]` | source-only |
| AZG902 inquiry edit | `AMA15.html` | `#inquiry_content_code`, `#inquiry_content_name`, `#inquiry_content_name_edit` | source-only |
| AZG906 correction confirmation | `AMA19.html` | `#regist`, `#tel_confirm_check`, `#email_confirm_check`; row names `tableRecordUploadList[${stat.index}].correct_field` and `th:id="\|tableRecord:${stat.index}:correct_contents\|"` | source-only |

## What is reliable

- Static IDs/names that are not Thymeleaf expressions.
- `formaction` values: they tell which server route a button submits to (e.g. `/AMA04/aZG101Update`, `/AMA13/aZG900Search`).
- `onclick` handlers: they tell which popup opens (e.g. `popupAZG900`, `popupAZG902`, `popupAZG906`, `popupAZG905`).
- Hidden fields and form names.

## What is not reliable from source alone

- `th:name="|imperfectSearch[${stat.index}]|"` becomes `imperfectSearch[0]`, `[1]`, ... only at render time. The count depends on backend data.
- `select` options are often empty; master data comes from the backend.
- `th:if`/JS conditions and validation/error branches depend on runtime state.
- The actual screen after submit depends on the backend response, not just the form action.

## Rule

- Use source-derived selectors to **prefill** the screen registry and block drafts.
- Mark them `source-only` until a live DOM capture confirms them.
- Execution must use `live` or `mock` selectors; source-only selectors are hypotheses.

## Next captures needed

1. AZG101 update screen after `#regist` (block 6).
2. AZG900 item-name search popup (blocks 7–8).
3. AZG902 inquiry edit popup (block 9–10).
4. AZG906 correction confirmation popup (block 11–12).
5. AZG101 after `完了登録` / `更新` (block 13).
