# 前端守卫（点了没反应 / 字段规则）

生成：2026-10-26T15:31:30+00:00　来源：`reference/webapps/**/*.html (Shift_JIS)`

共 **601** 条，分两类：

- **precondition 32**：按钮/事件处理器里的早退。不满足时**没有报错**，必须写 `requires:`。
- **validation 569**：`formValidate`/`searchValidate` 等字段规则。用来生成参数 schema，不是前置条件。

## Precondition（点了没反应）

| 页面 | 函数 | 条件 | 行为 | 引用 |
|---|---|---|---|---|
| AMB/insurance_item_select | `popupClose` | `!windowOpenerClosedCheck()` | silent | id:insurance_item_title, name:insurance_item_list.selected, var:windowOpenerClosedCheck |
| AMB/AMA03 | `onClickSelectInsurance` | `selectedIndex <= 0` | silent | name:large_item_list.selected, name:insurance_item_list.selected, var:selectedIndex |
| AMB/AMA04 | `popupAZG911` | `execInputCheck('1', form.status_code.value) == false` | silent | name:input_type_list.selected, var:execInputCheck, var:form, var:status_code |
| AMB/AMA04 | `popupAZG911` | `execInputCheck('2', form.agent_status_code.value) == false` | silent | name:input_type_list.selected, var:execInputCheck, var:form, var:agent_status_code |
| AMB/AMA04 | `onClickSelectInsurance` | `selectedIndex <= 0` | silent | name:large_item_list.selected, name:insurance_item_list.selected, var:selectedIndex |
| AMB/AMA04 | `setFile` | `!checkUploadFiles(id, input)` | silent | name: + id + , var:checkUploadFiles, var:id, var:input |
| AMB/AMA04 | `loadAgentNotify` | `idoc.mhk_MHKPRForm` | silent | id:agentNotifyFrame, id:message_area, id:updateAgentNotify, var:idoc, var:mhk_MHKPRForm |
| AMB/AMA04 | `loadAgentNotify` | `idoc.mhk_MHKPRForm.gamid.value != 'AMA04'` | silent | id:agentNotifyFrame, id:message_area, id:updateAgentNotify, var:idoc, var:mhk_MHKPRForm |
| AMB/AMA14 | `custom_Load` | `hideGyoumuAreaFlag.value == '1'` | silent | id:hide_gyoumu_area_flag, id:gyoumu_area, id:Print, id:CopyClipboard, id:agent_deal_flag |
| AMB/AMA15 | `popupClose` | `!windowOpenerClosedCheck()` | silent | id:index_no, name: + indexNo + , var:windowOpenerClosedCheck |
| AMB/AMA18 | `popupCloseSelect` | `!windowOpenerClosedCheck()` | silent | id:field_agent_name, id:field_agent_name_post, name: + selectNo + , var:windowOpenerClosedCheck |
| AMB/AMA18 | `popupCloseSelect` | `selectNo == null` | silent | id:field_agent_name, id:field_agent_name_post, name: + selectNo + , var:selectNo |
| AMB/AMA25 | `bodyOnload` | `'[(${AMA25Form.notDisplayFlag})]' == '1'` | silent | id:div_gyoumu_area, id:print, id:copy, id:updateTempAnswer, id:updateAnswer |
| AMB/AMA27 | `clickNo` | `parentDoc.getElementById("addUser:user_id_" + i).value == selectUserId` | alert | id:list_table, var:parentDoc, var:getElementById, var:addUser, var:user_id_ |
| AMB/AMA28 | `selectNo` | `selectUserId == mailSendList[i].id` | alert | var:selectUserId, var:mailSendList, var:i, var:id |
| AMB/AMA28 | `onClickDelete` | `idx == -1` | silent | id:mail_send_list, var:idx |
| AMB/AMA28 | `onClickSendOn` | `listLen == 0` | alert | id:mail_send_list, id:updateBusinessNotifyHidden, var:listLen |
| AMB/AMA28 | `onClickSendOn` | `listLen > 99` | alert | id:mail_send_list, id:updateBusinessNotifyHidden, var:listLen |
| AMC00/AMC23 | `bodyOnload` | `'[(${AMC23Form.delete_flag})]' == '1'` | silent | id:div_gyoumu_area, id:message_area, id:print, id:copyClipboard, id:confirmed_word |
| AMC00/AMC23 | `setFile` | `!checkUploadFiles(id, input)` | silent | name: + id + , var:checkUploadFiles, var:id, var:input |
| ANB00/ANA03 | `popupAYG901` | `validate && formValidate(form) == false` | silent | var:validate, var:formValidate, var:form |
| ANB00/ANA03 | `initCancelReason` | `appBaseItemObj.value == ''` | silent | id:cancel_reason_explanation, id:concrete_content_explanation, name:application_base_item_list.selected, name:large_item_list.selected, name:cancel_reason_list.selected |
| ANB00/ANA03 | `initCancelReason` | `appBaseItemObj.value == '4'` | silent | id:cancel_reason_explanation, id:concrete_content_explanation, name:application_base_item_list.selected, name:large_item_list.selected, name:cancel_reason_list.selected |
| ANB00/ANA03 | `routeSubmit` | `validate && formValidate(form) == false` | silent | var:validate, var:formValidate, var:form |
| ANB00/ANA04 | `popupAYG901` | `validate && !formValidate(form)` | silent | name:application_status, var:validate, var:formValidate, var:form |
| ANB00/ANA04 | `routeSubmit` | `validate && formValidate(form) == false` | silent | var:validate, var:formValidate, var:form |
| ANB00/ANA11 | `deleteSelectedName` | `idx == -1` | silent | id:select_name_list, var:idx |
| ANB00/ANA11 | `popupClose` | `button.name == 'ok'` | alert | id:select_name_list, id:[(${ANA11Form.buttonName})], var:button, var:name, var:ok |
| ANB00/ANA11 | `popupClose` | `opt.length > limit_count` | alert | id:select_name_list, id:[(${ANA11Form.buttonName})], var:opt, var:limit_count |
| ANB00/ANA11 | `popupClose` | `!window.confirm(form.ok_massage.value)` | silent | id:select_name_list, id:[(${ANA11Form.buttonName})], var:window, var:confirm, var:form |
| ANB00/ANA11 | `popupClose` | `form.hide_gyoumu_area_flag.value != '1'` | alert | id:select_name_list, id:[(${ANA11Form.buttonName})], var:form, var:hide_gyoumu_area_flag |
| ANB00/ANA11 | `popupClose` | `!window.confirm('[(#{MAYG901I100})]')` | silent | id:select_name_list, id:[(${ANA11Form.buttonName})], var:window, var:confirm, var:MAYG901I100 |

## Validation（字段规则）

只列函数和条件，详细信息在 `guards.json`。

| 页面 | 函数 | 条件 |
|---|---|---|
| AMB/AMA03 | `custom_Submit` | `clickButtonName == 'regist'` |
| AMB/AMA03 | `custom_Submit` | `formValidate(form) == false` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, inputTypeObj, '[(#{MAZG100W001})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, largeItemObj, '[(#{MAZG100W002})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, form.policy_number, '[(#{MAZG100W004})]') \|\| !isAlphaNumeric(form, form.policy_number, '[(#{MAZG100W005})]')` |
| AMB/AMA03 | `formValidate` | `!isAlphaNumeric(form, form.sub_policy_number, '[(#{MAZG100W006})]')` |
| AMB/AMA03 | `formValidate` | `!isAlphaNumeric(form, form.field_agent_id, '[(#{MAZG100W026})]')` |
| AMB/AMA03 | `formValidate` | `!isMaxLenB(form, form.insurant_name, 120, '[(#{MAZG100W007})]') \|\| !isProhibitionChar(form, form.insurant_name, '[(#{MAZG100W008})]')` |
| AMB/AMA03 | `formValidate` | `!isMinLenB(form, form.section_code, 3, '[(#{MAZG100W009})]') \|\| !isAlphaNumeric(form, form.section_code, '[(#{MAZG100W009})]')` |
| AMB/AMA03 | `formValidate` | `!isAlphaNumeric(form, form.agent_code, '[(#{MAZG100W011})]')` |
| AMB/AMA03 | `formValidate` | `!isAllHankaku(form, form.sub_agent_code, '[(#{MAZG100W013})]') \|\| !isProhibitionChar(form, form.sub_agent_code, '[(#{MAZG100W013})]')` |
| AMB/AMA03 | `formValidate` | `!isAllHankaku(form, form.free_code_1, '[(#{MAZG100W023})]')` |
| AMB/AMA03 | `formValidate` | `!isValidDateYMD(form, form.start_date, '[(#{MAZG100W014})]')` |
| AMB/AMA03 | `formValidate` | `!isValidDateYMD(form, form.change_date, '[(#{MAZG100W015})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, appFormTypeObj, '[(#{MAZG100W016})]')` |
| AMB/AMA03 | `formValidate` | `!isValidYearMonth(form, form.sumup_year_month, '[(#{MAZG100W017})]')` |
| AMB/AMA03 | `formValidate` | `!isAlphaNumeric(form, form.daily_report_send, '[(#{MAZG100W019})]')` |
| AMB/AMA03 | `formValidate` | `!isMinLenB(form, form.sumup_section_code, 3, '[(#{MAZG100W028})]') \|\| !isAlphaNumeric(form, form.sumup_section_code, '[(#{MAZG100W028})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, sumupStatusObj, '[(#{MAZG100W030})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, form.reminder_date, '[(#{MAZG100W020})]') \|\| !isValidDateYMD(form, form.reminder_date, '[(#{MAZG100W021})]')` |
| AMB/AMA03 | `formValidate` | `largeItemObj.value == '0'` |
| AMB/AMA03 | `formValidate` | `inputTypeObj.value != '9'` |
| AMB/AMA03 | `formValidate` | `form.company_kbn.value == 'AD'` |
| AMB/AMA03 | `formValidate` | `largeItemObj.value == '5' \|\| largeItemObj.value == '7'` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, insuranceItemObj, '[(#{MAZG100W003})]')` |
| AMB/AMA03 | `formValidate` | `form.company_kbn.value == 'MS'` |
| AMB/AMA03 | `formValidate` | `largeItemObj.value == '5' \|\| largeItemObj.value == '7' \|\| largeItemObj.value == 'X'` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, insuranceItemObj, '[(#{MAZG100W029})]')` |
| AMB/AMA03 | `formValidate` | `!form.import_flag.checked` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, form.section_code, '[(#{MAZG100W010})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, form.agent_code, '[(#{MAZG100W012})]')` |
| AMB/AMA03 | `formValidate` | `!isRequired(form, form.sumup_year_month, '[(#{MAZG100W018})]')` |
| AMB/AMA03 | `formValidate` | `form.reminder_date.value < registrationDate` |
| AMB/AMA03 | `formValidate` | `largeItemObj.value == 'Z'` |
| AMB/AMA03 | `formValidate` | `inputTypeObj.value != '5' && inputTypeObj.value != '7'` |
| AMB/AMA04 | `execInputCheck` | `inputCheckNo[key]` |
| AMB/AMA04 | `execInputCheck` | `inputCheckFunctions[i]() == false` |
| AMB/AMA04 | `checkUnit` | `!isRequired(form, inputTypeObj, '[(#{MAZG101W001})]')` |
| AMB/AMA04 | `checkUnit` | `!isRequired(form, largeItemObj, '[(#{MAZG101W002})]')` |
| AMB/AMA04 | `checkUnit` | `!isRequired(form, form.policy_number, '[(#{MAZG101W004})]') \|\| !isAlphaNumeric(form, form.policy_number, '[(#{MAZG101W005})]')` |
| AMB/AMA04 | `checkUnit` | `!isAlphaNumeric(form, form.sub_policy_number, '[(#{MAZG101W006})]')` |
| AMB/AMA04 | `checkUnit` | `!isAlphaNumeric(form, form.field_agent_id, '[(#{MAZG101W038})]')` |
| AMB/AMA04 | `checkUnit` | `!isMaxLenB(form, form.insurant_name, 120, '[(#{MAZG101W007})]') \|\| !isProhibitionChar(form, form.insurant_name, '[(#{MAZG101W008})]')` |
| AMB/AMA04 | `checkUnit` | `(copyRegistFlag == true && !isRequired(form, form.section_code, '[(#{MAZG101W029})]') ) \|\| !isMinLenB(form, form.section_code, 3, '[(#{MAZ` |
| AMB/AMA04 | `checkUnit` | `(copyRegistFlag == true && !isRequired(form, form.agent_code, '[(#{MAZG101W030})]') ) \|\| !isAlphaNumeric(form, form.agent_code, '[(#{MAZG1` |
| AMB/AMA04 | `checkUnit` | `!isAllHankaku(form, form.sub_agent_code, '[(#{MAZG101W013})]') \|\| !isProhibitionChar(form, form.sub_agent_code, '[(#{MAZG101W013})]')` |
| AMB/AMA04 | `checkUnit` | `!isAllHankaku(form, form.free_code_1, '[(#{MAZG101W032})]')` |
| AMB/AMA04 | `checkUnit` | `!isValidDateYMD(form, form.start_date, '[(#{MAZG101W014})]')` |
| AMB/AMA04 | `checkUnit` | `!isValidDateYMD(form, form.change_date, '[(#{MAZG101W015})]')` |
| AMB/AMA04 | `checkUnit` | `!isRequired(form, appFormTypeObj, '[(#{MAZG101W016})]')` |
| AMB/AMA04 | `checkUnit` | `!isValidYearMonth(form, form.sumup_year_month, '[(#{MAZG101W017})]')` |
| AMB/AMA04 | `checkUnit` | `!isAlphaNumeric(form, form.daily_report_send, '[(#{MAZG101W019})]')` |
| AMB/AMA04 | `checkUnit` | `!isMinLenB(form, form.sumup_section_code, 3, '[(#{MAZG101W040})]') \|\| !isAlphaNumeric(form, form.sumup_section_code, '[(#{MAZG101W040})]')` |
| AMB/AMA04 | `checkUnit` | `!isRequired(form, form.reminder_date, '[(#{MAZG101W020})]') \|\| !isValidDateYMD(form, form.reminder_date, '[(#{MAZG101W021})]')` |
| AMB/AMA04 | `checkUnit` | `!isRequired(form, sumupStatusObj, '[(#{MAZG101W054})]')` |
| AMB/AMA04 | `checkUnit` | `!isMaxLenB(form, form.forms_message, 1296, '[(#{MAZG101W024})]') \|\| !isProhibitionChar(form, form.forms_message, '[(#{MAZG101W025})]')` |
| AMB/AMA04 | `checkUnit` | `!isMaxLenB(form, form.inhouse_message, 200, '[(#{MAZG101W026})]') \|\| !isProhibitionChar(form, form.inhouse_message, '[(#{MAZG101W027})]')` |
| AMB/AMA04 | `checkUnit` | `form['tableRecordUploadList[' + uploadIndex + '].insert_file_flag'].value == '1'` |
| AMB/AMA04 | `checkUnit` | `!fileExists` |
| AMB/AMA04 | `checkCorrelation` | `largeItemObj.value == '0'` |
| AMB/AMA04 | `checkCorrelation` | `inputTypeObj.value != '9'` |
| AMB/AMA04 | `checkCorrelation` | `largeItemObj.value == 'Z'` |
| AMB/AMA04 | `checkCorrelation` | `!(inputTypeObj.value == '5' \|\| inputTypeObj.value == '7')` |
| AMB/AMA04 | `checkCorrelation` | `form.company_kbn.value == 'AD'` |
| AMB/AMA04 | `checkCorrelation` | `largeItemObj.value == '5' \|\| largeItemObj.value == '7'` |
| AMB/AMA04 | `checkCorrelation` | `!isRequired(form, insuranceItemObj, '[(#{MAZG101W003})]')` |
| AMB/AMA04 | `checkCorrelation` | `form.company_kbn.value == 'MS'` |
| AMB/AMA04 | `checkCorrelation` | `largeItemObj.value == '5' \|\| largeItemObj.value == '7' \|\| largeItemObj.value == 'X'` |
| AMB/AMA04 | `checkCorrelation` | `!isRequired(form, insuranceItemObj, '[(#{MAZG101W041})]')` |
| AMB/AMA04 | `checkCorrelation` | `!form.import_flag.checked && copyRegistFlag == false` |
| AMB/AMA04 | `checkCorrelation` | `!isRequired(form, form.section_code, '[(#{MAZG101W010})]')` |
| AMB/AMA04 | `checkCorrelation` | `!isRequired(form, form.agent_code, '[(#{MAZG101W012})]')` |
| AMB/AMA04 | `checkCorrelation` | `!isRequired(form, form.sumup_year_month, '[(#{MAZG101W018})]')` |
| AMB/AMA04 | `checkCorrelation` | `form.reminder_date.value < registrationDate` |
| AMB/AMA04 | `checkCorrelation` | `fieldCode != null && fieldCode.length > 0` |
| AMB/AMA04 | `checkCorrelation` | `agentDealFlag == '1' && (inquiryContentsId == null \|\| inquiryContentsId.length == 0)` |
| AMB/AMA04 | `checkCorrelation` | `!isMaxLenB(form, form[listName + 'answer_message'], 300, '[(#{MAZG101W043})]') \|\| !isProhibitionChar(form, form[listName + 'answer_message` |
| AMB/AMA04 | `checkCorrelation` | `sumSize > 5242880` |
| AMB/AMA04 | `checkUploadFiles` | `sumSize + fileSize > 5242880` |
| AMB/AMA04 | `checkAnswer1` | `agentDealFlag == '1'` |
| AMB/AMA04 | `checkAnswer1` | `agentDealFlag == '2'` |
| AMB/AMA04 | `checkAnswer2` | `agentDealFlag == '1'` |
| AMB/AMA04 | `checkAnswer2` | `agentDealFlag == '2'` |
| AMB/AMA04 | `checkAnswer` | `fieldCode != null && fieldCode.length > 0` |
| AMB/AMA04 | `checkAnswer` | `form[listName + 'agent_inquiry_flag.selected'].value == agentInquiryFlag` |
| AMB/AMA04 | `checkAnswer` | `agentDealFlag == '1'` |
| AMB/AMA04 | `checkAnswer` | `form[listName + 'answer_contents.selected'].value == '10000'` |
| AMB/AMA04 | `checkAnswer` | `form[listName + 'answer_contents.selected'].value == '0'` |
| AMB/AMA04 | `checkAnswer` | `!isRequired(form, form[listName + 'answer_message'], errorMessage)` |
| AMB/AMA04 | `checkAnswer` | `!targetExistsFlag` |
| AMB/AMA04 | `checkAgentInquiryCountFunc` | `getInquiryCount('2') == '0'` |
| AMB/AMA04 | `checkInquiryCountFunc` | `getInquiryCount('1') == '0' && getInquiryCount('2') == '0'` |
| AMB/AMA04 | `checkInquiryCountFunc` | `agentDealFlag == '1'` |
| AMB/AMA04 | `checkInquiryCountFunc` | `agentDealFlag == '2'` |
| AMB/AMA04 | `checkCompleteFunc` | `getRadioSelectedValue(form.agent_deal_flag_radio) == '2'` |
| AMB/AMA04 | `checkCompleteFunc` | `form.check_type.value == '1' && (form.notify_status.value == '0' \|\| form.notify_status.value == '9')` |
| AMB/AMA04 | `checkCompleteFunc` | `form.status_code.value == '3' && (form.agent_status_code.value == '0' \|\| form.agent_status_code.value == '3')` |
| AMB/AMA04 | `checkCompleteFunc` | `form.agent_status_code.value == '3' && (form.status_code.value == '0' \|\| form.status_code.value == '3')` |
| AMB/AMA04 | `custom_Submit` | `clickButtonName == 'delete'` |
| AMB/AMA04 | `custom_Submit` | `window.confirm(confMessage)` |
| AMB/AMA04 | `custom_Submit` | `form.check_status_name.value != ""` |
| AMB/AMA04 | `custom_Submit` | `validate` |
| AMB/AMA04 | `custom_Submit` | `execInputCheck('1', form.status_code.value) == false` |
| AMB/AMA04 | `custom_Submit` | `execInputCheck('2', form.agent_status_code.value) == false` |
| AMB/AMA04 | `custom_Submit` | `confMessage != null` |
| AMB/AMA04 | `getInquiryCount` | `fieldCode != null && fieldCode.length > 0` |
| AMB/AMA04 | `getInquiryCount` | `document.mhk_MHKPRForm['tableRecordList[' + indexNo + '].agent_inquiry_flag'].value == agentInquiryFlag` |
| AMB/AMA06 | `custom_Submit` | `clickButtonName == '103toClose'` |
| AMB/AMA06 | `custom_Submit` | `window.confirm('[(#{MAZG000I001})]')` |
| AMB/AMA06 | `custom_Submit` | `clickButtonName == 'feasibleHidden'` |
| AMB/AMA06 | `custom_Submit` | `getRadioSelectedValue(form.extract_type) == '1'` |
| AMB/AMA06 | `custom_Submit` | `form.regist_section_code.value == ''` |
| AMB/AMA06 | `custom_Submit` | `!isMinLenB(form, form.regist_section_code, 3, '[(#{MAZG103W002})]') \|\| !isAlphaNumeric(form, form.regist_section_code, '[(#{MAZG103W002})]` |
| AMB/AMA06 | `custom_Submit` | `form.regist_agent_code.value == ''` |
| AMB/AMA06 | `custom_Submit` | `!isAlphaNumeric(form, form.regist_agent_code, '[(#{MAZG103W004})]')` |
| AMB/AMA06 | `custom_Submit` | `isNisseiParentAgent(form.regist_section_code, form.regist_agent_code)` |
| AMB/AMA06 | `custom_Submit` | `clickButtonName == 'delete'` |
| AMB/AMA06 | `custom_Submit` | `window.confirm('[(#{MAZG103I002})]')` |
| AMB/AMA06 | `custom_Submit` | `clickButtonName == 'regist'` |
| AMB/AMA06 | `custom_Submit` | `!isRequired(form, form.from_registration_year, '[(#{MAZG103W010})]') \|\| !isNumeric(form, form.from_registration_year, '[(#{MAZG103W011})]'` |
| AMB/AMA06 | `custom_Submit` | `!isRequired(form, form.from_registration_month, '[(#{MAZG103W010})]') \|\| !isNumeric(form, form.from_registration_month, '[(#{MAZG103W012})` |
| AMB/AMA06 | `custom_Submit` | `!isRequired(form, form.to_registration_year, '[(#{MAZG103W010})]') \|\| !isNumeric(form, form.to_registration_year, '[(#{MAZG103W014})]') \|` |
| AMB/AMA06 | `custom_Submit` | `!isRequired(form, form.to_registration_month, '[(#{MAZG103W010})]') \|\| !isNumeric(form, form.to_registration_month, '[(#{MAZG103W015})]') ` |
| AMB/AMA06 | `custom_Submit` | `from > to` |
| AMB/AMA06 | `custom_Submit` | `form.input_type_1.checked == false && form.input_type_2.checked == false && form.input_type_3.checked == false && form.input_type_4.checked ` |
| AMB/AMA06 | `custom_Submit` | `form.application_form_type_1.checked == false && form.application_form_type_2.checked == false && form.application_form_type_3.checked == fa` |
| AMB/AMA06 | `custom_Submit` | `toOption == null \|\| toOption.length == 0` |
| AMB/AMA06 | `custom_Submit` | `form.total_unit_1.checked == false && form.total_unit_2.checked == false` |
| AMB/AMA06 | `custom_Submit` | `form.total_target_1.checked == false && form.total_target_2.checked == false && form.total_target_3.checked == false && form.total_target_4.` |
| AMB/AMA06 | `checkFile` | `getRadioSelectedValue(form.extract_type) == '2'` |
| AMB/AMA06 | `checkFile` | `form.oyako_teigi_file.value == ''` |
| AMB/AMA06 | `checkFile` | `len > form.agent_limit_count.value` |
| AMB/AMA07 | `searchValidate` | `!isMinLenB(form, form.section_code, lengthMin, messageWarn) \|\| !isAlphaNumeric(form, form.section_code, messageWarn)` |
| AMB/AMA07 | `searchValidate` | `!isAlphaNumeric(form, form.agent_code, '[(#{MAZG200W003})]')` |
| AMB/AMA07 | `searchValidate` | `!isMinLenB(form, form.register_section_code, 3, '[(#{MAZG200W025})]') \|\| !isAlphaNumeric(form, form.register_section_code, '[(#{MAZG200W02` |
| AMB/AMA07 | `searchValidate` | `!isMinLenB(form, form.sumup_section_code, lengthMin, messageWarn) \|\| !isAlphaNumeric(form, form.sumup_section_code, messageWarn)` |
| AMB/AMA07 | `searchValidate` | `!isAllHankaku(form, form.sub_agent_code, '[(#{MAZG200W032})]') \|\| !isProhibitionChar(form, form.sub_agent_code, '[(#{MAZG200W032})]')` |
| AMB/AMA07 | `searchValidate` | `!isAllHankaku(form, form.free_code_1, '[(#{MAZG200W033})]')` |
| AMB/AMA07 | `searchValidate` | `!isAlphaNumeric(form, form.field_agent_id, '[(#{MAZG200W034})]')` |
| AMB/AMA07 | `searchValidate` | `!isAlphaNumeric(form, form.register_code, '[(#{MAZG200W022})]')` |
| AMB/AMA07 | `searchValidate` | `document.getElementById("select_search_item_key").value == 1` |
| AMB/AMA07 | `searchValidate` | `!isAlphaNumeric(form, form.policy_number, '[(#{MAZG200W004})]')` |
| AMB/AMA07 | `searchValidate` | `!isRegExp(form, form.policy_number, NO_NUMERIC_PATTERN, true, '[(#{MAZG200W059})]') \|\| !isMaxLenB(form, form.policy_number, maxlength, '[(` |
| AMB/AMA07 | `searchValidate` | `!isAlphaNumeric(form, form.sub_policy_number, '[(#{MAZG200W005})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.sumup_year, '[(#{MAZG200W006})]') \|\| !isLenB(form, form.sumup_year, 4, '[(#{MAZG200W006})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.sumup_month, '[(#{MAZG200W007})]') \|\| !isIntRange(form, form.sumup_month, 1, 12, '[(#{MAZG200W008})]')` |
| AMB/AMA07 | `searchValidate` | `!isMaxLenB(form, form.business_staff_code, 1, '[(#{MAZG200W049})]') \|\| !isAlphaNumericQuestion(form, form.business_staff_code, '[(#{MAZG20` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.regist_year_from, '[(#{MAZG200W010})]') \|\| !isLenB(form, form.regist_year_from, 4, '[(#{MAZG200W010})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.regist_month_from, '[(#{MAZG200W011})]') \|\| !isIntRange(form, form.regist_month_from, 1, 12, '[(#{MAZG200W012})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.regist_day_from, '[(#{MAZG200W013})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.regist_year_to, '[(#{MAZG200W015})]') \|\| !isLenB(form, form.regist_year_to, 4, '[(#{MAZG200W015})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.regist_month_to, '[(#{MAZG200W016})]') \|\| !isIntRange(form, form.regist_month_to, 1, 12, '[(#{MAZG200W017})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.regist_day_to, '[(#{MAZG200W018})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.reminder_year_from, '[(#{MAZG200W035})]') \|\| !isLenB(form, form.reminder_year_from, 4, '[(#{MAZG200W035})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.reminder_month_from, '[(#{MAZG200W036})]') \|\| !isIntRange(form, form.reminder_month_from, 1, 12, '[(#{MAZG200W037})]` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.reminder_day_from, '[(#{MAZG200W038})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.reminder_year_to, '[(#{MAZG200W040})]') \|\| !isLenB(form, form.reminder_year_to, 4, '[(#{MAZG200W040})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.reminder_month_to, '[(#{MAZG200W041})]') \|\| !isIntRange(form, form.reminder_month_to, 1, 12, '[(#{MAZG200W042})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.reminder_day_to, '[(#{MAZG200W043})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.answer_date_year, '[(#{MAZG200W050})]') \|\| !isLenB(form, form.answer_date_year, 4, '[(#{MAZG200W050})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.answer_date_month, '[(#{MAZG200W051})]') \|\| !isIntRange(form, form.answer_date_month, 1, 12, '[(#{MAZG200W052})]')` |
| AMB/AMA07 | `searchValidate` | `!isNumeric(form, form.answer_date_day, '[(#{MAZG200W053})]')` |
| AMB/AMA07 | `searchValidate` | `isDownload && (!isRequired(form, form.download_number, '[(#{MAZG200W026})]') \|\| !isUpperAlphaNumeric(form, form.download_number, '[(#{MAZG` |
| AMB/AMA07 | `searchValidate` | `document.getElementById('relation_agent').checked == false` |
| AMB/AMA07 | `searchValidate` | `conditionOK == false` |
| AMB/AMA07 | `searchValidate` | `form.company_kbn.value == 'MS'` |
| AMB/AMA07 | `searchValidate` | `form.section_code.value == ''` |
| AMB/AMA07 | `searchValidate` | `form.agent_code.value == ''` |
| AMB/AMA07 | `searchValidate` | `document.getElementById('relation_agent').checked && form.agent_code.value == ''` |
| AMB/AMA07 | `searchValidate` | `checkAllInput(form, new Array(form.sumup_year, form.sumup_month), '[(#{MAZG200W009})]', false) == -1` |
| AMB/AMA07 | `searchValidate` | `inputFieldCount == -1` |
| AMB/AMA07 | `searchValidate` | `inputFieldCount == 6` |
| AMB/AMA07 | `searchValidate` | `!isValidDate(form, form.regist_year_from, form.regist_month_from, form.regist_day_from, '[(#{MAZG200W014})]')` |
| AMB/AMA07 | `searchValidate` | `!isValidDate(form, form.regist_year_to, form.regist_month_to, form.regist_day_to, '[(#{MAZG200W019})]')` |
| AMB/AMA07 | `searchValidate` | `to < from` |
| AMB/AMA07 | `searchValidate` | `inputFieldCount == -1` |
| AMB/AMA07 | `searchValidate` | `inputFieldCount == 6` |
| AMB/AMA07 | `searchValidate` | `!isValidDate(form, form.reminder_year_from, form.reminder_month_from, form.reminder_day_from, '[(#{MAZG200W039})]')` |
| AMB/AMA07 | `searchValidate` | `!isValidDate(form, form.reminder_year_to, form.reminder_month_to, form.reminder_day_to, '[(#{MAZG200W044})]')` |
| AMB/AMA07 | `searchValidate` | `to < from` |
| AMB/AMA07 | `searchValidate` | `inputFieldCount == -1` |
| AMB/AMA07 | `searchValidate` | `inputFieldCount == 3` |
| AMB/AMA07 | `searchValidate` | `!isValidDate(form, form.answer_date_year, form.answer_date_month, form.answer_date_day, '[(#{MAZG200W055})]')` |
| AMB/AMA07 | `searchValidate` | `!(document.getElementById('status_code_4').checked \|\| document.getElementById('agent_status_code_4').checked)` |
| AMB/AMA07 | `custom_Submit` | `clickButtonName == '200toClose'` |
| AMB/AMA07 | `custom_Submit` | `window.confirm('[(#{MAZG000I001})]')` |
| AMB/AMA07 | `custom_Submit` | `clickButtonName == 'updateCompleteDate'` |
| AMB/AMA07 | `custom_Submit` | `clickButtonName == 'outputCSV'` |
| AMB/AMA07 | `custom_Submit` | `searchValidate(form, true) == false` |
| AMB/AMA07 | `custom_Submit` | `clickButtonName == 'select' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| AMB/AMA08 | `custom_Submit` | `clickButtonName == 'act201to001' \|\| clickButtonName == 'close'` |
| AMB/AMA08 | `custom_Submit` | `!isAlphaNumeric(form, form.head_office_code, '[(#{MAZG201W001})]')` |
| AMB/AMA08 | `custom_Submit` | `!isMinLenB(form, form.section_code, 3, '[(#{MAZG201W002})]') \|\| !isAlphaNumeric(form, form.section_code, '[(#{MAZG201W002})]')` |
| AMB/AMA08 | `custom_Submit` | `!isAlphaNumeric(form, form.agent_code, '[(#{MAZG201W003})]')` |
| AMB/AMA08 | `custom_Submit` | `!isRequired(form, form.from_registration_year, '[(#{MAZG201W013})]') \|\| !isNumeric(form, form.from_registration_year, '[(#{MAZG201W006})]'` |
| AMB/AMA08 | `custom_Submit` | `!isRequired(form, form.from_registration_month, '[(#{MAZG201W013})]') \|\| !isNumeric(form, form.from_registration_month, '[(#{MAZG201W007})` |
| AMB/AMA08 | `custom_Submit` | `!isRequired(form, form.to_registration_year, '[(#{MAZG201W013})]') \|\| !isNumeric(form, form.to_registration_year, '[(#{MAZG201W009})]') \|` |
| AMB/AMA08 | `custom_Submit` | `!isRequired(form, form.to_registration_month, '[(#{MAZG201W013})]') \|\| !isNumeric(form, form.to_registration_month, '[(#{MAZG201W010})]') ` |
| AMB/AMA08 | `custom_Submit` | `isEmptyField(form.section_code) && isEmptyField(form.agent_code)` |
| AMB/AMA08 | `custom_Submit` | `isEmptyField(form.section_code) && !isEmptyField(form.agent_code)` |
| AMB/AMA08 | `custom_Submit` | `from > to` |
| AMB/AMA11 | `searchValidate` | `!isLenB(form, form.reserve_no_key, 12, '[(#{MAZG204W001})]') \|\| !isAlphaNumeric(form, form.reserve_no_key, '[(#{MAZG204W001})]')` |
| AMB/AMA11 | `custom_Submit` | `clickButtonName == '204toClose'` |
| AMB/AMA11 | `custom_Submit` | `window.confirm('[(#{MAZG000I001})]')` |
| AMB/AMA11 | `custom_Submit` | `clickButtonName == 'select' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| AMB/AMA11 | `custom_Submit` | `clickButtonName != null && clickButtonName != "" && clickButtonName != "act204to001" && clickButtonName != "act204to103" && clickButtonName ` |
| AMB/AMA11 | `custom_Submit` | `clickButtonName.length > 6 && clickButtonName.slice(0,6) == 'delete'` |
| AMB/AMA11 | `custom_Submit` | `window.confirm('[(#{MAZG204I001})]')` |
| AMB/AMA13 | `custom_Submit` | `!windowOpenerClosedCheck()` |
| AMB/AMA13 | `custom_Submit` | `clickButtonName == 'search'` |
| AMB/AMA13 | `custom_Submit` | `!isAlphaNumeric(form, form.field_code_key, '[(#{MAZG900W001})]')` |
| AMB/AMA13 | `custom_Submit` | `!isProhibitionChar(form, form.field_name_key, '[(#{MAZG900W005})]')` |
| AMB/AMA13 | `custom_Submit` | `!isInqueryContentsCode(form, form.inquiry_contents_code_key, '[(#{MAZG900W002})]')` |
| AMB/AMA13 | `custom_Submit` | `!isProhibitionChar(form, form.inquiry_contents_name_key, '[(#{MAZG900W006})]')` |
| AMB/AMA13 | `custom_Submit` | `clickButtonName == 'select'` |
| AMB/AMA13 | `custom_Submit` | `!isRequired(form, form['field_list.selected'], '[(#{MAZG900W003})]')` |
| AMB/AMA13 | `custom_Submit` | `!isRequired(form, form['imperfect_list.selected'], '[(#{MAZG900W004})]')` |
| AMB/AMA14 | `custom_Submit` | `!windowOpenerClosedCheck()` |
| AMB/AMA14 | `custom_Submit` | `typeof(tel) != 'undefined'` |
| AMB/AMA14 | `custom_Submit` | `!isNumericHyphen(form, tel, '[(#{MAZG901W004})]')` |
| AMB/AMA14 | `custom_Submit` | `typeof(fax) != 'undefined'` |
| AMB/AMA14 | `custom_Submit` | `!isNumericHyphen(form, fax, '[(#{MAZG901W005})]')` |
| AMB/AMA14 | `custom_Submit` | `!isMaxLenB(form, sectionName, 28, '[(#{MAZG901W006})]')` |
| AMB/AMA14 | `custom_Submit` | `!isProhibitionChar(form, sectionName, '[(#{MAZG901W007})]')` |
| AMB/AMA14 | `custom_Submit` | `!isMaxLenB(form, messageField, 1296, '[(#{MAZG901W001})]')` |
| AMB/AMA14 | `custom_Submit` | `!isProhibitionChar(form, messageField, '[(#{MAZG901W002})]')` |
| AMB/AMA14 | `custom_Submit` | `clickButtonName == 'CopyClipboard'` |
| AMB/AMA14 | `custom_Submit` | `!window.confirm('[(#{MAZG901I001})]')` |
| AMB/AMA15 | `formValidate` | `!isMaxLenBWithoutRegExp(form, form.inquiry_content_name_edit, 342, new RegExp('\r\n\|\n', 'igm'), '[(#{MAZG902W001})]') \|\| !isProhibitionC` |
| AMB/AMA18 | `searchValidate` | `!isRequired(form, form.section_code_key, '[(#{MAZG905W001})]') \|\| !isMinLenB(form, form.section_code_key, 5, '[(#{MAZG905W002})]') \|\| !i` |
| AMB/AMA18 | `searchValidate` | `!isAlphaNumeric(form, form.agent_code_key, '[(#{MAZG905W003})]')` |
| AMB/AMA18 | `searchValidate` | `!isMinLenB(form, form.field_agent_id_key, 3, '[(#{MAZG905W004})]') \|\| !isAlphaNumeric(form, form.field_agent_id_key, '[(#{MAZG905W004})]')` |
| AMB/AMA18 | `searchValidate` | `!isMaxLenB(form, form.field_agent_name_key, 400, '[(#{MAZG905W005})]') \|\| !isProhibitionChar(form, form.field_agent_name_key, '[(#{MAZG905` |
| AMB/AMA18 | `custom_Submit` | `!windowOpenerClosedCheck()` |
| AMB/AMA18 | `custom_Submit` | `clickButtonName == 'search' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| AMB/AMA19 | `custom_Submit` | `!windowOpenerClosedCheck()` |
| AMB/AMA19 | `custom_Submit` | `clickButtonName == 'regist'` |
| AMB/AMA19 | `custom_Submit` | `clickButtonName == 'delete'` |
| AMB/AMA19 | `formValidate` | `!isRequired(form, form.confirm_user_name, '[(#{MAZG906W001})]') \|\| !isMaxLenB(form, form.confirm_user_name, 56, '[(#{MAZG906W003})]') \|\|` |
| AMB/AMA19 | `formValidate` | `!isNumeric(form, form.confirm_date_year, '[(#{MAZG906W006})]') \|\| !isLenB(form, form.confirm_date_year, 4, '[(#{MAZG906W006})]')` |
| AMB/AMA19 | `formValidate` | `!isNumeric(form, form.confirm_date_month, '[(#{MAZG906W007})]') \|\| !isIntRange(form, form.confirm_date_month, 1, 12, '[(#{MAZG906W008})]')` |
| AMB/AMA19 | `formValidate` | `!isNumeric(form, form.confirm_date_day, '[(#{MAZG906W009})]')` |
| AMB/AMA19 | `formValidate` | `!isNumeric(form, form.confirm_date_hour, '[(#{MAZG906W011})]') \|\| !isIntRange(form, form.confirm_date_hour, 0, 11, '[(#{MAZG906W012})]')` |
| AMB/AMA19 | `formValidate` | `!isNumeric(form, form.confirm_date_minute, '[(#{MAZG906W013})]') \|\| !isIntRange(form, form.confirm_date_minute, 0, 59, '[(#{MAZG906W014})]` |
| AMB/AMA19 | `formValidate` | `!isMaxLenB(form, form.confirm_target_name, 112, '[(#{MAZG906W017})]') \|\| !isProhibitionChar(form, form.confirm_target_name, '[(#{MAZG906W0` |
| AMB/AMA19 | `formValidate` | `!isNumericHyphen(form, form.confirm_target_tel, '[(#{MAZG906W018})]')` |
| AMB/AMA19 | `formValidate` | `!isMaxLenB(form, form['tableRecordUploadList[' + i + '].correct_field'], 30, '[(#{MAZG906W022})]') \|\| !isProhibitionChar(form, form['table` |
| AMB/AMA19 | `formValidate` | `!isMaxLenB(form, form['tableRecordUploadList[' + i + '].correct_contents'], 72, '[(#{MAZG906W025})]') \|\| !isProhibitionChar(form, form['ta` |
| AMB/AMA19 | `formValidate` | `inputCount == -1` |
| AMB/AMA19 | `formValidate` | `inputCount == 5` |
| AMB/AMA19 | `formValidate` | `getRadioSelectedValue(form.confirm_date_ampm) == null` |
| AMB/AMA19 | `formValidate` | `!isValidDate(form, form.confirm_date_year, form.confirm_date_month, form.confirm_date_day, '[(#{MAZG906W010})]')` |
| AMB/AMA19 | `formValidate` | `!form.email_confirm_check.checked` |
| AMB/AMA19 | `formValidate` | `!isRequired(form, form.confirm_target_name, '[(#{MAZG906W015})]')` |
| AMB/AMA19 | `formValidate` | `!form.tel_confirm_check.checked && !isRequired(form, form.confirm_target_tel, '[(#{MAZG906W019})]')` |
| AMB/AMA19 | `formValidate` | `correctFieldInputFlag == false` |
| AMB/AMA19 | `formValidate` | `correctContentsInputFlag == false` |
| AMB/AMA26 | `searchValidate` | `!isRequired(form, form.section_code, '[(#{MAZG207W001})]') \|\| !isMinLenB(form, form.section_code, 5, '[(#{MAZG207W002})]') \|\| !isAlphaNu` |
| AMB/AMA26 | `custom_Submit` | `clickButtonName == 'search'` |
| AMB/AMA26 | `custom_Submit` | `searchValidate(form)` |
| AMB/AMA27 | `searchValidate` | `!isMaxLenB(form, form.user_name, 22, '[(#{MAZG910W001})]') \|\| !isProhibitionChar(form, form.user_name, '[(#{MAZG910W002})]')` |
| AMB/AMA27 | `searchValidate` | `!isMinLenB(form, form.section_code, 3, '[(#{MAZG910W003})]') \|\| !isAlphaNumeric(form, form.section_code, '[(#{MAZG910W003})]')` |
| AMB/AMA27 | `searchValidate` | `isEmptyField(form.user_name) && isEmptyField(form.section_code)` |
| AMB/AMA27 | `custom_Submit` | `!windowOpenerClosedCheck()` |
| AMB/AMA27 | `custom_Submit` | `clickButtonName == 'search' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| AMB/AMA28 | `resetValidate` | `isEmptyField(form.section_code_set)` |
| AMB/AMA28 | `resetValidate` | `!isMinLenB(form, form.section_code_set, 5, '[(#{MAZG911W009})]') \|\| !isAlphaNumeric(form, form.section_code_set, '[(#{MAZG911W009})]')` |
| AMB/AMA28 | `searchValidate` | `!isMaxLenB(form, form.user_name, 22, '[(#{MAZG911W001})]') \|\| !isProhibitionChar(form, form.user_name, '[(#{MAZG911W002})]')` |
| AMB/AMA28 | `searchValidate` | `!isMinLenB(form, form.section_code, 3, '[(#{MAZG911W003})]') \|\| !isAlphaNumeric(form, form.section_code, '[(#{MAZG911W003})]')` |
| AMB/AMA28 | `searchValidate` | `isEmptyField(form.user_name) && isEmptyField(form.section_code)` |
| AMB/AMA28 | `custom_Submit` | `!windowOpenerClosedCheck()` |
| AMB/AMA28 | `custom_Submit` | `clickButtonName == 'reset'` |
| AMB/AMA28 | `custom_Submit` | `!resetValidate(form)` |
| AMB/AMA28 | `custom_Submit` | `clickButtonName == 'search' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| AMB/AMA28 | `custom_Submit` | `!searchValidate(form)` |
| AMC00/AMC22 | `searchValidate` | `!isAlphaNumeric(form, form.section_code, '[(#{MAZG206W002})]')` |
| AMC00/AMC22 | `searchValidate` | `!isAlphaNumeric(form, form.agent_code, '[(#{MAZG206W003})]')` |
| AMC00/AMC22 | `searchValidate` | `sumiseiTaijuKeiyu == "sumiseiTaijuUser"` |
| AMC00/AMC22 | `searchValidate` | `!checkRelationAgent(form, form.relation_agent, '[(#{MAZG206W040})]')` |
| AMC00/AMC22 | `searchValidate` | `!isAllHankaku(form, form.sub_agent_code, '[(#{MAZG206W004})]') \|\| !isProhibitionChar(form, form.sub_agent_code, '[(#{MAZG206W004})]')` |
| AMC00/AMC22 | `searchValidate` | `!isAllHankaku(form, form.free_code_1, '[(#{MAZG206W005})]')` |
| AMC00/AMC22 | `searchValidate` | `document.getElementById("select_search_item_key").value == 1` |
| AMC00/AMC22 | `searchValidate` | `!isAlphaNumeric(form, form.policy_number, '[(#{MAZG206W007})]')` |
| AMC00/AMC22 | `searchValidate` | `!isRegExp(form, form.policy_number, NO_NUMERIC_PATTERN, true, '[(#{MAZG206W041})]') \|\| !isMaxLenB(form, form.policy_number, maxlength, '[(` |
| AMC00/AMC22 | `searchValidate` | `!isAlphaNumeric(form, form.sub_policy_number, '[(#{MAZG206W008})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.sumup_year, '[(#{MAZG206W009})]') \|\| !isLenB(form, form.sumup_year, 4, '[(#{MAZG206W009})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.sumup_month, '[(#{MAZG206W010})]') \|\| !isIntRange(form, form.sumup_month, 1, 12, '[(#{MAZG206W011})]')` |
| AMC00/AMC22 | `searchValidate` | `!isAlphaNumeric(form, form.field_agent_id, '[(#{MAZG206W006})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.regist_year_from, '[(#{MAZG206W013})]') \|\| !isLenB(form, form.regist_year_from, 4, '[(#{MAZG206W013})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.regist_month_from, '[(#{MAZG206W014})]') \|\| !isIntRange(form, form.regist_month_from, 1, 12, '[(#{MAZG206W015})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.regist_day_from, '[(#{MAZG206W016})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.regist_year_to, '[(#{MAZG206W018})]') \|\| !isLenB(form, form.regist_year_to, 4, '[(#{MAZG206W018})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.regist_month_to, '[(#{MAZG206W019})]') \|\| !isIntRange(form, form.regist_month_to, 1, 12, '[(#{MAZG206W020})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.regist_day_to, '[(#{MAZG206W021})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.reminder_year_from, '[(#{MAZG206W025})]') \|\| !isLenB(form, form.reminder_year_from, 4, '[(#{MAZG206W025})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.reminder_month_from, '[(#{MAZG206W026})]') \|\| !isIntRange(form, form.reminder_month_from, 1, 12, '[(#{MAZG206W027})]` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.reminder_day_from, '[(#{MAZG206W028})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.reminder_year_to, '[(#{MAZG206W030})]') \|\| !isLenB(form, form.reminder_year_to, 4, '[(#{MAZG206W030})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.reminder_month_to, '[(#{MAZG206W031})]') \|\| !isIntRange(form, form.reminder_month_to, 1, 12, '[(#{MAZG206W032})]')` |
| AMC00/AMC22 | `searchValidate` | `!isNumeric(form, form.reminder_day_to, '[(#{MAZG206W033})]')` |
| AMC00/AMC22 | `searchValidate` | `isDownload && sumiseiPW != "notSumiseiUser" && !checkSumiseiPassword(form, form.password, sumiseiPW, '[(#{MAZG206W038})]')` |
| AMC00/AMC22 | `searchValidate` | `isDownload && (!isRequired(form, form.password, '[(#{MAZG206W037})]') \|\| !isMinLenB(form, form.password, 7,'[(#{MAZG206W037})]')\|\| !isAl` |
| AMC00/AMC22 | `searchValidate` | `sumiseiTaijuKeiyu == "sumiseiTaijuUser"` |
| AMC00/AMC22 | `searchValidate` | `conditionOK == false` |
| AMC00/AMC22 | `searchValidate` | `conditionOK == false` |
| AMC00/AMC22 | `searchValidate` | `checkAllInput(form, new Array(form.sumup_year, form.sumup_month), '[(#{MAZG206W012})]', false) == -1` |
| AMC00/AMC22 | `searchValidate` | `inputFieldCount == -1` |
| AMC00/AMC22 | `searchValidate` | `inputFieldCount == 6` |
| AMC00/AMC22 | `searchValidate` | `!isValidDate(form, form.regist_year_from, form.regist_month_from, form.regist_day_from, '[(#{MAZG206W017})]')` |
| AMC00/AMC22 | `searchValidate` | `!isValidDate(form, form.regist_year_to, form.regist_month_to, form.regist_day_to, '[(#{MAZG206W022})]')` |
| AMC00/AMC22 | `searchValidate` | `to < from` |
| AMC00/AMC22 | `searchValidate` | `inputFieldCount == -1` |
| AMC00/AMC22 | `searchValidate` | `inputFieldCount == 6` |
| AMC00/AMC22 | `searchValidate` | `!isValidDate(form, form.reminder_year_from, form.reminder_month_from, form.reminder_day_from, '[(#{MAZG206W029})]')` |
| AMC00/AMC22 | `searchValidate` | `!isValidDate(form, form.reminder_year_to, form.reminder_month_to, form.reminder_day_to, '[(#{MAZG206W034})]')` |
| AMC00/AMC22 | `searchValidate` | `to < from` |
| AMC00/AMC22 | `custom_Submit` | `clickButtonName == '206toClose'` |
| AMC00/AMC22 | `custom_Submit` | `window.confirm('[(#{MAZG000I001})]')` |
| AMC00/AMC22 | `custom_Submit` | `clickButtonName == 'outputCSV'` |
| AMC00/AMC22 | `custom_Submit` | `searchValidate(form, true) == false` |
| AMC00/AMC22 | `custom_Submit` | `clickButtonName == 'select' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| AMC00/AMC23 | `custom_Submit` | `clickButtonName == 'updateAnswer'` |
| AMC00/AMC23 | `custom_Submit` | `inputCheck(form)` |
| AMC00/AMC23 | `custom_Submit` | `clickButtonName == 'updateConfirmed'` |
| AMC00/AMC23 | `custom_Submit` | `inputCheck(form)` |
| AMC00/AMC23 | `custom_Submit` | `clickButtonName == 'updateTempAnswer' \|\| clickButtonName == 'print' \|\| clickButtonName == 'copyClipboard'` |
| AMC00/AMC23 | `inputCheck` | `clickButtonName == 'updateAnswer'` |
| AMC00/AMC23 | `inputCheck` | `form['list[' + indexNo + '].answer_contents.selected'].value == '10000'` |
| AMC00/AMC23 | `inputCheck` | `!isMaxLenB(form, form['tableRecordList[' + indexNo + '].answer_message'], 300, '[(#{MAZG104W002})]') \|\| !isProhibitionChar(form, form['tab` |
| AMC00/AMC23 | `inputCheck` | `form['tableRecordUploadList[' + uploadIndex + '].insert_file_flag'].value == '1'` |
| AMC00/AMC23 | `inputCheck` | `!fileExists` |
| AMC00/AMC23 | `inputCheck` | `clickButtonName == 'updateAnswer'` |
| AMC00/AMC23 | `inputCheck` | `form['list[' + indexNo + '].answer_contents.selected'].value == '0'` |
| AMC00/AMC23 | `inputCheck` | `'[(${commonForm.companyCode})]' == 'MS'` |
| AMC00/AMC23 | `inputCheck` | `!isRequired(form, form['tableRecordList[' + indexNo + '].answer_message'], '[(#{MAZG104W006})]')` |
| AMC00/AMC23 | `inputCheck` | `'[(${commonForm.companyCode})]' == 'AD'` |
| AMC00/AMC23 | `inputCheck` | `!isRequired(form, form['tableRecordList[' + indexNo + '].answer_message'], '[(#{MAZG104W012})]')` |
| AMC00/AMC23 | `inputCheck` | `sumSize > 5242880` |
| AMC00/AMC23 | `checkUploadFiles` | `sumSize + fileSize > 5242880` |
| AMC00/AMC24 | `custom_Submit` | `!window.opener \|\| window.opener.closed` |
| AMC00/AMC24 | `custom_Submit` | `clickButtonName == 'regist'` |
| AMC00/AMC24 | `custom_Submit` | `clickButtonName == 'delete'` |
| AMC00/AMC24 | `formValidate` | `!isRequired(form, form.confirm_user_name, '[(#{MAZG908W001})]') \|\| !isMaxLenB(form, form.confirm_user_name, 56, '[(#{MAZG908W003})]') \|\|` |
| AMC00/AMC24 | `formValidate` | `!isNumeric(form, form.confirm_date_year, '[(#{MAZG908W006})]') \|\| !isLenB(form, form.confirm_date_year, 4, '[(#{MAZG908W006})]')` |
| AMC00/AMC24 | `formValidate` | `!isNumeric(form, form.confirm_date_month, '[(#{MAZG908W007})]') \|\| !isIntRange(form, form.confirm_date_month, 1, 12, '[(#{MAZG908W008})]')` |
| AMC00/AMC24 | `formValidate` | `!isNumeric(form, form.confirm_date_day, '[(#{MAZG908W009})]')` |
| AMC00/AMC24 | `formValidate` | `!isNumeric(form, form.confirm_date_hour, '[(#{MAZG908W011})]') \|\| !isIntRange(form, form.confirm_date_hour, 0, 11, '[(#{MAZG908W012})]')` |
| AMC00/AMC24 | `formValidate` | `!isNumeric(form, form.confirm_date_minute, '[(#{MAZG908W013})]') \|\| !isIntRange(form, form.confirm_date_minute, 0, 59, '[(#{MAZG908W014})]` |
| AMC00/AMC24 | `formValidate` | `!isMaxLenB(form, form.confirm_target_name, 112, '[(#{MAZG908W017})]') \|\| !isProhibitionChar(form, form.confirm_target_name, '[(#{MAZG908W0` |
| AMC00/AMC24 | `formValidate` | `!isNumericHyphen(form, form.confirm_target_tel, '[(#{MAZG908W018})]')` |
| AMC00/AMC24 | `formValidate` | `!isMaxLenB(form, form['tableRecordUploadList[' + i + '].correct_field'], 30, '[(#{MAZG908W022})]') \|\| !isProhibitionChar(form, form['table` |
| AMC00/AMC24 | `formValidate` | `!isMaxLenB(form, form['tableRecordUploadList[' + i + '].correct_contents'], 72, '[(#{MAZG908W025})]') \|\| !isProhibitionChar(form, form['ta` |
| AMC00/AMC24 | `formValidate` | `inputCount == -1` |
| AMC00/AMC24 | `formValidate` | `inputCount == 5` |
| AMC00/AMC24 | `formValidate` | `getRadioSelectedValue(form.confirm_date_ampm) == null` |
| AMC00/AMC24 | `formValidate` | `!isValidDate(form, form.confirm_date_year, form.confirm_date_month, form.confirm_date_day, '[(#{MAZG908W010})]')` |
| AMC00/AMC24 | `formValidate` | `!form.email_confirm_check.checked` |
| AMC00/AMC24 | `formValidate` | `!isRequired(form, form.confirm_target_name, '[(#{MAZG908W015})]')` |
| AMC00/AMC24 | `formValidate` | `!form.tel_confirm_check.checked && !isRequired(form, form.confirm_target_tel, '[(#{MAZG908W019})]')` |
| AMC00/AMC24 | `formValidate` | `correctFieldInputFlag == false` |
| AMC00/AMC24 | `formValidate` | `correctContentsInputFlag == false` |
| ANB00/ANA02 | `custom_Submit` | `clickButtonName == 'regist'` |
| ANB00/ANA02 | `custom_Submit` | `formValidate(form) == false` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, appBaseItemObj, '[(#{MAYG100W001})]')` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.section_code, '[(#{MAYG100W002})]') \|\| !isMinLenB(form, form.section_code, 3, '[(#{MAYG100W003})]') \|\| !isAlphaNu` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.agent_code, '[(#{MAYG100W004})]') \|\| !isAlphaNumeric(form, form.agent_code, '[(#{MAYG100W005})]')` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.policy_number, '[(#{MAYG100W006})]') \|\| !isUpperAlphaNumeric(form, form.policy_number, '[(#{MAYG100W007})]')` |
| ANB00/ANA02 | `formValidate` | `!isUpperAlphaNumeric(form, form.sub_policy_number, '[(#{MAYG100W008})]')` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.insurant_name, '[(#{MAYG100W009})]') \|\| !isMaxLenB(form, form.insurant_name, 120, '[(#{MAYG100W010})]') \|\| !isPro` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, largeItemObj, '[(#{MAYG100W012})]')` |
| ANB00/ANA02 | `formValidate` | `!isValidFloatNumber(form, form.cancel_premium, -9999999999999.99, 9999999999999.99, '[(#{MAYG100W014})]')` |
| ANB00/ANA02 | `formValidate` | `appBaseItemObj.value == '4' && !isUpperAlphaNumeric(form, form.re_policy_number, '[(#{MAYG100W029})]')` |
| ANB00/ANA02 | `formValidate` | `appBaseItemObj.value == '4' && !isUpperAlphaNumeric(form, form.re_sub_policy_number, '[(#{MAYG100W030})]')` |
| ANB00/ANA02 | `formValidate` | `!isMaxLenB(form, form.change_confirm_send_reason, 400, '[(#{MAYG100W018})]') \|\| !isProhibitionChar(form, form.change_confirm_send_reason, ` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.cancel_application_date, '[(#{MAYG100W020})]') \|\| !isValidDateYMD(form, form.cancel_application_date, '[(#{MAYG100W` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.start_date, '[(#{MAYG100W022})]') \|\| !isValidDateYMD(form, form.start_date, '[(#{MAYG100W023})]')` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.notification_date, '[(#{MAYG100W026})]') \|\| !isValidDateYMD(form, form.notification_date, '[(#{MAYG100W027})]')` |
| ANB00/ANA02 | `formValidate` | `appBaseItemObj.value == '4'` |
| ANB00/ANA02 | `formValidate` | `largeItemObj.value != '4' && largeItemObj.value != '6' && largeItemObj.value != '8' && largeItemObj.value != 'X'` |
| ANB00/ANA02 | `formValidate` | `largeItemObj.value == '5' \|\| largeItemObj.value == '7'` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, insuranceItemObj, '[(#{MAYG100W028})]')` |
| ANB00/ANA02 | `formValidate` | `appBaseItemObj.value != '3' && largeItemObj.value != 'M'` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, policySendTypeObj, '[(#{MAYG100W015})]')` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, changeConfirmSendTypeObj, '[(#{MAYG100W016})]')` |
| ANB00/ANA02 | `formValidate` | `changeConfirmSendTypeObj.value == '2' && !isRequired(form, form.change_confirm_send_reason, '[(#{MAYG100W017})]')` |
| ANB00/ANA02 | `formValidate` | `appBaseItemObj.value == '4'` |
| ANB00/ANA02 | `formValidate` | `form.notification_date.value <= form.start_date.value` |
| ANB00/ANA02 | `formValidate` | `appBaseItemObj.value != '3'` |
| ANB00/ANA02 | `formValidate` | `!isRequired(form, form.sumup_date, '[(#{MAYG100W024})]') \|\| // !isValidDateYMD(form, form.sumup_date, '[(#{MAYG100W025})]')` |
| ANB00/ANA03 | `custom_Submit` | `clickButtonName == 'actionRegist'` |
| ANB00/ANA03 | `custom_Submit` | `actionRegistValidate(form) == false` |
| ANB00/ANA03 | `custom_Submit` | `validate && formValidate(form) == false` |
| ANB00/ANA03 | `custom_Submit` | `confMessage != null && !window.confirm(confMessage)` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, appBaseItemObj, '[(#{MAYG101W001})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.section_code, '[(#{MAYG101W002})]')) \|\| !isMinLenB(form, form.section_code, 3, '[(#{MAYG101W003})]') \` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.agent_code, '[(#{MAYG101W004})]')) \|\| !isAlphaNumeric(form, form.agent_code, '[(#{MAYG101W005})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.policy_number, '[(#{MAYG101W006})]')) \|\| !isUpperAlphaNumeric(form, form.policy_number, '[(#{MAYG101W0` |
| ANB00/ANA03 | `formValidate` | `!isUpperAlphaNumeric(form, form.sub_policy_number, '[(#{MAYG101W008})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.insurant_name, '[(#{MAYG101W009})]')) \|\| !isMaxLenB(form, form.insurant_name, 120, '[(#{MAYG101W010})]` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, largeItemObj, '[(#{MAYG101W012})]')` |
| ANB00/ANA03 | `formValidate` | `!isValidFloatNumber(form, form.cancel_premium, -9999999999999.99, 9999999999999.99, '[(#{MAYG101W014})]')` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value == '4' && !isUpperAlphaNumeric(form, form.re_policy_number, '[(#{MAYG101W084})]')` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value == '4' && !isUpperAlphaNumeric(form, form.re_sub_policy_number, '[(#{MAYG101W085})]')` |
| ANB00/ANA03 | `formValidate` | `!isMaxLenB(form, form.change_confirm_send_reason, 400, '[(#{MAYG101W018})]') \|\| !isProhibitionChar(form, form.change_confirm_send_reason, ` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.cancel_application_date, '[(#{MAYG101W020})]')) \|\| !isValidDateYMD(form, form.cancel_application_date,` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.start_date, '[(#{MAYG101W022})]')) \|\| !isValidDateYMD(form, form.start_date, '[(#{MAYG101W023})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.notification_date, '[(#{MAYG101W026})]')) \|\| !isValidDateYMD(form, form.notification_date, '[(#{MAYG10` |
| ANB00/ANA03 | `formValidate` | `(required \|\| form.application_status.value == '31') && !isRequired(form, cancelReasonObj, '[(#{MAYG101W028})]')` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, concreteContentObj, '[(#{MAYG101W029})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.concrete_explanation, '[(#{MAYG101W030})]')) \|\| !isMaxLenB(form, form.concrete_explanation, 800, '[(#{` |
| ANB00/ANA03 | `formValidate` | `required && !isRequiredRadio(form, form.agent_invitation_status, '[(#{MAYG101W033})]')` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, contractRelationObj, '[(#{MAYG101W034})]')` |
| ANB00/ANA03 | `formValidate` | `required && form.approve_pattern.value == '1' && isEmptyField(form.req_applicant_id)` |
| ANB00/ANA03 | `formValidate` | `required && form.approve_pattern.value == '0' && isEmptyField(form.req_approver_id)` |
| ANB00/ANA03 | `formValidate` | `required && (largeItemObj.value == '5' \|\| largeItemObj.value == '7')` |
| ANB00/ANA03 | `formValidate` | `!isRequired(form, insuranceItemObj, '[(#{MAYG101W037})]')` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value == '4'` |
| ANB00/ANA03 | `formValidate` | `!(largeItemObj.value == '4' \|\| largeItemObj.value == '6' \|\| largeItemObj.value == '8' \|\| largeItemObj.value == 'X' \|\| (!required && ` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value != '3' && largeItemObj.value != 'M'` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, policySendTypeObj, '[(#{MAYG101W015})]')` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, changeConfirmSendTypeObj, '[(#{MAYG101W016})]')` |
| ANB00/ANA03 | `formValidate` | `required && changeConfirmSendTypeObj.value == '2' && !isRequired(form, form.change_confirm_send_reason, '[(#{MAYG101W017})]')` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value == '6'` |
| ANB00/ANA03 | `formValidate` | `form.start_date.value > form.notification_date.value` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value == '4'` |
| ANB00/ANA03 | `formValidate` | `form.start_date.value > form.notification_date.value` |
| ANB00/ANA03 | `formValidate` | `appBaseItemObj.value != '3'` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.sumup_date, '[(#{MAYG101W024})]')) \|\| // !isValidDateYMD(form, form.sumup_date, '[(#{MAYG101W025})]')` |
| ANB00/ANA03 | `formValidate` | `form.agent_invitation_status[0].checked` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.agent_date, '[(#{MAYG101W038})]')) \|\| !isValidDateYMD(form, form.agent_date, '[(#{MAYG101W039})]')` |
| ANB00/ANA03 | `formValidate` | `required && !form.agent_interview.checked && !form.agent_tel.checked && !form.agent_other.checked` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.agent_user, '[(#{MAYG101W041})]')) \|\| !isMaxLenB(form, form.agent_user, 22, '[(#{MAYG101W042})]') \|\|` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.agent_target, '[(#{MAYG101W044})]')) \|\| !isMaxLenB(form, form.agent_target, 40, '[(#{MAYG101W045})]') ` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, agentInvitationMethodObj, '[(#{MAYG101W047})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.agent_invitation_date, '[(#{MAYG101W048})]')) \|\| !isValidDateYMD(form, form.agent_invitation_date, '[(` |
| ANB00/ANA03 | `formValidate` | `required && agentInvitationMethodObj.value == '5' && !isRequired(form, form.agent_other_invitation, '[(#{MAYG101W050})]')` |
| ANB00/ANA03 | `formValidate` | `!isMaxLenB(form, form.agent_other_invitation, 60, '[(#{MAYG101W051})]') \|\| !isProhibitionChar(form, form.agent_other_invitation, '[(#{MAYG` |
| ANB00/ANA03 | `formValidate` | `required && agentExplainCols != ''` |
| ANB00/ANA03 | `formValidate` | `!agentExplain.checked` |
| ANB00/ANA03 | `formValidate` | `required && !isRequiredRadio(form, form.agent_proceed_user, '[(#{MAYG101W054})]')` |
| ANB00/ANA03 | `formValidate` | `required && form.agent_proceed_user[1].checked` |
| ANB00/ANA03 | `formValidate` | `!form.agent_sign.checked` |
| ANB00/ANA03 | `formValidate` | `!form.agent_procedure.checked` |
| ANB00/ANA03 | `formValidate` | `cancelReasonObj.value == 'a' \|\| cancelReasonObj.value == 'h'` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.agent_lead, '[(#{MAYG101W056})]')) \|\| !isMaxLenB(form, form.agent_lead, 800, '[(#{MAYG101W057})]') \|\` |
| ANB00/ANA03 | `formValidate` | `required && form.start_date.value && form.notification_date.value && contractRelationObj.value` |
| ANB00/ANA03 | `formValidate` | `(form.notification_date.value < form.start_date.value && contractRelationObj.value != '1') \|\| (form.notification_date.value >= form.start_` |
| ANB00/ANA03 | `formValidate` | `contractRelationObj.value == '2'` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.contract_date, '[(#{MAYG101W060})]')) \|\| !isValidDateYMD(form, form.contract_date, '[(#{MAYG101W061})]` |
| ANB00/ANA03 | `formValidate` | `required && !form.contract_interview.checked && !form.contract_tel.checked && !form.contract_other.checked` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.contract_user, '[(#{MAYG101W063})]')) \|\| !isMaxLenB(form, form.contract_user, 22, '[(#{MAYG101W064})]'` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.contract_target, '[(#{MAYG101W066})]')) \|\| !isMaxLenB(form, form.contract_target, 120, '[(#{MAYG101W06` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, contractInvitationMethodObj, '[(#{MAYG101W069})]')` |
| ANB00/ANA03 | `formValidate` | `(required && !isRequired(form, form.contract_invitation_date, '[(#{MAYG101W070})]')) \|\| !isValidDateYMD(form, form.contract_invitation_dat` |
| ANB00/ANA03 | `formValidate` | `required && contractInvitationMethodObj.value == '5' && !isRequired(form, form.contract_other_invitation, '[(#{MAYG101W072})]')` |
| ANB00/ANA03 | `formValidate` | `!isMaxLenB(form, form.contract_other_invitation, 60, '[(#{MAYG101W073})]') \|\| !isProhibitionChar(form, form.contract_other_invitation, '[(` |
| ANB00/ANA03 | `formValidate` | `required && contractExplainCols != ''` |
| ANB00/ANA03 | `formValidate` | `!contractExplain.checked` |
| ANB00/ANA03 | `formValidate` | `required && !isRequired(form, contractCancelReasonObj, '[(#{MAYG101W076})]')` |
| ANB00/ANA03 | `formValidate` | `required && contractCancelReasonObj.value == '2' && !isRequired(form, form.contract_cancel_reason_note, '[(#{MAYG101W077})]')` |
| ANB00/ANA03 | `formValidate` | `!isMaxLenB(form, form.contract_cancel_reason_note, 500, '[(#{MAYG101W078})]') \|\| !isProhibitionChar(form, form.contract_cancel_reason_note` |
| ANB00/ANA03 | `formValidate` | `required && form.no_satisfaction.checked && !isRequired(form, form.complaint_number, '[(#{MAYG101W080})]')` |
| ANB00/ANA03 | `formValidate` | `form.no_satisfaction.checked && !isAlphaNumeric(form, form.complaint_number, '[(#{MAYG101W081})]')` |
| ANB00/ANA03 | `formValidate` | `form.company_kbn.value == 'AD'` |
| ANB00/ANA03 | `formValidate` | `required && form.invitation_problem.checked && !isRequired(form, form.compliance_number, '[(#{MAYG101W082})]')` |
| ANB00/ANA03 | `formValidate` | `form.invitation_problem.checked && !isAlphaNumeric(form, form.compliance_number, '[(#{MAYG101W083})]')` |
| ANB00/ANA03 | `actionRegistValidate` | `!isMaxLenB(form, form.disapprove_correspond, 800, '[(#{MAYG101W088})]') \|\| !isProhibitionChar(form, form.disapprove_correspond, '[(#{MAYG1` |
| ANB00/ANA04 | `custom_Submit` | `clickButtonName == 'approve' \|\| clickButtonName == 'disapprove' \|\| clickButtonName == 'reject'` |
| ANB00/ANA04 | `formValidate` | `clickButtonName == 'approve'` |
| ANB00/ANA04 | `formValidate` | `appStatus == '10'` |
| ANB00/ANA04 | `formValidate` | `!isMaxLenB(form, form.section_approve_reject, 300, '[(#{MAYG102W002})]') \|\| !isProhibitionChar(form, form.section_approve_reject, '[(#{MAY` |
| ANB00/ANA04 | `formValidate` | `isEmptyField(form.req_approver_id)` |
| ANB00/ANA04 | `formValidate` | `form.company_kbn.value == 'AD'` |
| ANB00/ANA04 | `formValidate` | `generalManagerFlg == false` |
| ANB00/ANA04 | `formValidate` | `appStatus == '11'` |
| ANB00/ANA04 | `formValidate` | `!isMaxLenB(form, form.department_approve_reject, 300, '[(#{MAYG102W006})]') \|\| !isProhibitionChar(form, form.department_approve_reject, '[` |
| ANB00/ANA04 | `formValidate` | `clickButtonName == 'disapprove'` |
| ANB00/ANA04 | `formValidate` | `appStatus == '10' && (!isRequired(form, form.section_approve_reject, '[(#{MAYG102W001})]') \|\| !isMaxLenB(form, form.section_approve_reject` |
| ANB00/ANA04 | `formValidate` | `appStatus == '11' && (!isRequired(form, form.department_approve_reject, '[(#{MAYG102W005})]') \|\| !isMaxLenB(form, form.department_approve_` |
| ANB00/ANA04 | `formValidate` | `clickButtonName == 'reject'` |
| ANB00/ANA04 | `formValidate` | `appStatus == '10' && (!isRequired(form, form.section_approve_reject, '[(#{MAYG102W001})]') \|\| !isMaxLenB(form, form.section_approve_reject` |
| ANB00/ANA04 | `formValidate` | `appStatus == '11' && (!isRequired(form, form.department_approve_reject, '[(#{MAYG102W005})]') \|\| !isMaxLenB(form, form.department_approve_` |
| ANB00/ANA05 | `searchValidate` | `!isMinLenB(form, form.section_code, 3, '[(#{MAYG200W001})]') \|\| !isAlphaNumeric(form, form.section_code, '[(#{MAYG200W001})]')` |
| ANB00/ANA05 | `searchValidate` | `!isAlphaNumeric(form, form.agent_code, '[(#{MAYG200W002})]')` |
| ANB00/ANA05 | `searchValidate` | `!isUpperAlphaNumeric(form, form.policy_number, '[(#{MAYG200W003})]')` |
| ANB00/ANA05 | `searchValidate` | `!isUpperAlphaNumeric(form, form.sub_policy_number, '[(#{MAYG200W004})]')` |
| ANB00/ANA05 | `searchValidate` | `!isUpperAlphaNumeric(form, form.re_policy_number, '[(#{MAYG200W062})]')` |
| ANB00/ANA05 | `searchValidate` | `!isUpperAlphaNumeric(form, form.re_sub_policy_number, '[(#{MAYG200W063})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_registration_year, '[(#{MAYG200W005})]') \|\| !isLenB(form, form.from_registration_year, 4, '[(#{MAYG200W005})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_registration_month, '[(#{MAYG200W006})]') \|\| !isIntRange(form, form.from_registration_month, 1, 12, '[(#{MAYG20` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_registration_day, '[(#{MAYG200W008})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_registration_year, '[(#{MAYG200W009})]') \|\| !isLenB(form, form.to_registration_year, 4, '[(#{MAYG200W009})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_registration_month, '[(#{MAYG200W010})]') \|\| !isIntRange(form, form.to_registration_month, 1, 12, '[(#{MAYG200W01` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_registration_day, '[(#{MAYG200W012})]')` |
| ANB00/ANA05 | `searchValidate` | `!isAlphaNumeric(form, form.register, '[(#{MAYG200W060})]')` |
| ANB00/ANA05 | `searchValidate` | `!isMinLenB(form, form.register_section_code, 3, '[(#{MAYG200W061})]') \|\| !isAlphaNumeric(form, form.register_section_code, '[(#{MAYG200W06` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_app_input_year, '[(#{MAYG200W013})]') \|\| !isLenB(form, form.from_app_input_year, 4, '[(#{MAYG200W013})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_app_input_month, '[(#{MAYG200W014})]') \|\| !isIntRange(form, form.from_app_input_month, 1, 12, '[(#{MAYG200W015}` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_app_input_day, '[(#{MAYG200W016})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_app_input_year, '[(#{MAYG200W017})]') \|\| !isLenB(form, form.to_app_input_year, 4, '[(#{MAYG200W017})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_app_input_month, '[(#{MAYG200W018})]') \|\| !isIntRange(form, form.to_app_input_month, 1, 12, '[(#{MAYG200W019})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_app_input_day, '[(#{MAYG200W020})]')` |
| ANB00/ANA05 | `searchValidate` | `!isAlphaNumeric(form, form.app_input_user, '[(#{MAYG200W021})]')` |
| ANB00/ANA05 | `searchValidate` | `!isMinLenB(form, form.app_input_section_code, 3, '[(#{MAYG200W022})]') \|\| !isAlphaNumeric(form, form.app_input_section_code, '[(#{MAYG200W` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_application_year, '[(#{MAYG200W023})]') \|\| !isLenB(form, form.from_application_year, 4, '[(#{MAYG200W023})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_application_month, '[(#{MAYG200W024})]') \|\| !isIntRange(form, form.from_application_month, 1, 12, '[(#{MAYG200W` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_application_day, '[(#{MAYG200W026})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_application_year, '[(#{MAYG200W027})]') \|\| !isLenB(form, form.to_application_year, 4, '[(#{MAYG200W027})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_application_month, '[(#{MAYG200W028})]') \|\| !isIntRange(form, form.to_application_month, 1, 12, '[(#{MAYG200W029}` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_application_day, '[(#{MAYG200W030})]')` |
| ANB00/ANA05 | `searchValidate` | `!isAlphaNumeric(form, form.application_request_user, '[(#{MAYG200W031})]')` |
| ANB00/ANA05 | `searchValidate` | `!isMinLenB(form, form.req_applicant_section_code, 3, '[(#{MAYG200W032})]') \|\| !isAlphaNumeric(form, form.req_applicant_section_code, '[(#{` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_approval_year, '[(#{MAYG200W033})]') \|\| !isLenB(form, form.from_approval_year, 4, '[(#{MAYG200W033})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_approval_month, '[(#{MAYG200W034})]') \|\| !isIntRange(form, form.from_approval_month, 1, 12, '[(#{MAYG200W035})]` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.from_approval_day, '[(#{MAYG200W036})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_approval_year, '[(#{MAYG200W037})]') \|\| !isLenB(form, form.to_approval_year, 4, '[(#{MAYG200W037})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_approval_month, '[(#{MAYG200W038})]') \|\| !isIntRange(form, form.to_approval_month, 1, 12, '[(#{MAYG200W039})]')` |
| ANB00/ANA05 | `searchValidate` | `!isNumeric(form, form.to_approval_day, '[(#{MAYG200W040})]')` |
| ANB00/ANA05 | `searchValidate` | `!isMinLenB(form, form.req_approver_section_code, 3, '[(#{MAYG200W041})]') \|\| !isAlphaNumeric(form, form.req_approver_section_code, '[(#{MA` |
| ANB00/ANA05 | `searchValidate` | `!isAlphaNumeric(form, form.reference_number, '[(#{MAYG200W042})]')` |
| ANB00/ANA05 | `searchValidate` | `isDownload && (!isRequired(form, form.download_number, '[(#{MAYG200W064})]') \|\| !isUpperAlphaNumeric(form, form.download_number, '[(#{MAYG` |
| ANB00/ANA05 | `searchValidate` | `conditionOK == false` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == -1` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == 6` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.from_registration_year, form.from_registration_month, form.from_registration_day, '[(#{MAYG200W046})]')` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.to_registration_year, form.to_registration_month, form.to_registration_day, '[(#{MAYG200W047})]')` |
| ANB00/ANA05 | `searchValidate` | `to < from` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == -1` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == 6` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.from_app_input_year, form.from_app_input_month, form.from_app_input_day, '[(#{MAYG200W050})]')` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.to_app_input_year, form.to_app_input_month, form.to_app_input_day, '[(#{MAYG200W051})]')` |
| ANB00/ANA05 | `searchValidate` | `to < from` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == -1` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == 6` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.from_application_year, form.from_application_month, form.from_application_day, '[(#{MAYG200W054})]')` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.to_application_year, form.to_application_month, form.to_application_day, '[(#{MAYG200W055})]')` |
| ANB00/ANA05 | `searchValidate` | `to < from` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == -1` |
| ANB00/ANA05 | `searchValidate` | `inputFieldCount == 6` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.from_approval_year, form.from_approval_month, form.from_approval_day, '[(#{MAYG200W058})]')` |
| ANB00/ANA05 | `searchValidate` | `!isValidDate(form, form.to_approval_year, form.to_approval_month, form.to_approval_day, '[(#{MAYG200W059})]')` |
| ANB00/ANA05 | `searchValidate` | `to < from` |
| ANB00/ANA05 | `custom_Submit` | `clickButtonName == 'select' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| ANB00/ANA05 | `custom_Submit` | `clickButtonName == 'outputCSV'` |
| ANB00/ANA05 | `custom_Submit` | `searchValidate(form, true) == false` |
| ANB00/ANA05 | `custom_Submit` | `clickButtonName == 'act200to001' \|\| clickButtonName == 'act200to100' \|\| clickButtonName == 'close' \|\| clickButtonName == 'link101'` |
| ANB00/ANA06 | `custom_Submit` | `clickButtonName == 'act201to001' \|\| clickButtonName == 'close'` |
| ANB00/ANA06 | `custom_Submit` | `!isRequiredRadio(form, form.sumup_type, '[(#{MAYG201W014})]')` |
| ANB00/ANA06 | `custom_Submit` | `!isAlphaNumeric(form, form.head_office_code, '[(#{MAYG201W001})]')` |
| ANB00/ANA06 | `custom_Submit` | `!isMinLenB(form, form.section_code, 3, '[(#{MAYG201W002})]') \|\| !isAlphaNumeric(form, form.section_code, '[(#{MAYG201W002})]')` |
| ANB00/ANA06 | `custom_Submit` | `!isAlphaNumeric(form, form.agent_code, '[(#{MAYG201W003})]')` |
| ANB00/ANA06 | `custom_Submit` | `!isRequired(form, form.from_sumup_year, '[(#{MAYG201W013})]') \|\| !isNumeric(form, form.from_sumup_year, '[(#{MAYG201W004})]') \|\| !isLenB` |
| ANB00/ANA06 | `custom_Submit` | `!isRequired(form, form.from_sumup_month, '[(#{MAYG201W013})]') \|\| !isNumeric(form, form.from_sumup_month, '[(#{MAYG201W005})]') \|\| !isIn` |
| ANB00/ANA06 | `custom_Submit` | `!isRequired(form, form.to_sumup_year, '[(#{MAYG201W013})]') \|\| !isNumeric(form, form.to_sumup_year, '[(#{MAYG201W007})]') \|\| !isLenB(for` |
| ANB00/ANA06 | `custom_Submit` | `!isRequired(form, form.to_sumup_month, '[(#{MAYG201W013})]') \|\| !isNumeric(form, form.to_sumup_month, '[(#{MAYG201W008})]') \|\| !isIntRan` |
| ANB00/ANA06 | `custom_Submit` | `isEmptyField(form.head_office_code) && isEmptyField(form.section_code) && isEmptyField(form.agent_code)` |
| ANB00/ANA06 | `custom_Submit` | `!isEmptyField(form.agent_code) && isEmptyField(form.section_code)` |
| ANB00/ANA06 | `custom_Submit` | `from > to` |
| ANB00/ANA07 | `custom_Submit` | `clickButtonName == 'select' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| ANB00/ANA07 | `custom_Submit` | `clickButtonName == 'act202to001' \|\| clickButtonName == 'act202to100' \|\| clickButtonName == 'close' \|\| clickButtonName == 'link101'` |
| ANB00/ANA10 | `searchValidate` | `!isMaxLenB(form, form.user_name_key, 22, '[(#{MAYG900W001})]') \|\| !isProhibitionChar(form, form.user_name_key, '[(#{MAYG900W002})]')` |
| ANB00/ANA10 | `searchValidate` | `!isMinLenB(form, form.section_code_key, 3, '[(#{MAYG900W003})]') \|\| !isAlphaNumeric(form, form.section_code_key, '[(#{MAYG900W003})]')` |
| ANB00/ANA10 | `searchValidate` | `isEmptyField(form.user_name_key) && isEmptyField(form.section_code_key)` |
| ANB00/ANA10 | `custom_Submit` | `clickButtonName == 'search' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| ANB00/ANA11 | `searchValidate` | `!isMaxLenB(form, form.user_name_key, 22, '[(#{MAYG901W001})]') \|\| !isProhibitionChar(form, form.user_name_key, '[(#{MAYG901W002})]')` |
| ANB00/ANA11 | `searchValidate` | `!isMinLenB(form, form.section_code_key, 3, '[(#{MAYG901W003})]') \|\| !isAlphaNumeric(form, form.section_code_key, '[(#{MAYG901W003})]')` |
| ANB00/ANA11 | `searchValidate` | `isEmptyField(form.user_name_key) && isEmptyField(form.section_code_key)` |
| ANB00/ANA11 | `custom_Submit` | `clickButtonName == 'search' \|\| clickButtonName == 'nextPage' \|\| clickButtonName == 'prevPage'` |
| ANB00/ANA11 | `custom_Submit` | `searchValidate(form)` |

## 怎么用

1. `compile` 时，若某 step 的 target 命中该页面的按钮，而 flow 没有声明对应 `requires:`，报警告。
2. `requires` 的字段必须在之前被 fill/select 过，或来自 `env`。
3. 真机上守卫触发 = 前置条件不满足，不是 selector 错。
4. validation 条件用来反推字段 schema（必填/长度/格式/交叉校验），不直接进 `requires`。
