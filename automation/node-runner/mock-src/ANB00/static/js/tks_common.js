// 画面ロード完了フラグをfalseで初期化
var loadComplete = false;
// 画面ロード中にサブミットが呼び出された場合のメッセージ
var LOADING_SUBMIT_ERROR_MESSAGE = "画面表示中のため、実行できません。\n画面表示完了後、再度実行してください。";
// USERAGENTを保持
var USER_AGENT = navigator.userAgent;
// 入力制限対象記号を示す正規表現
var	PROHIBITION_CHAR_PATTERN = new RegExp(".*[%\\\"\\\'\\\\,]+.*", "m");
// 数字以外を示す正規表現
var	NO_NUMERIC_PATTERN = new RegExp("[^0-9]+", "g");
// 英数字以外を示す正規表現
var	NO_ALPHA_NUMERIC_PATTERN = new RegExp("[^0-9a-zA-Z]+", "g");
// 英数字以外を示す正規表現(英字は大文字のみ)
var	NO_UPPER_ALPHA_NUMERIC_PATTERN = new RegExp("[^0-9A-Z]+", "g");
// 英字以外を示す正規表現
var	NO_ALPHA_PATTERN = new RegExp("[^a-zA-Z]+", "g");
// 英数カナ以外を示す正規表現
var NO_ALPHA_NUMERIC_KANA_PATTERN = new RegExp("[^0-9a-zA-Zｦ-ﾟ]+", "g");
// 照会内容コード入力可能文字以外を示す正規表現(「*もしくは英数字」以外)
var	INQUIRY_CONTENTS_CODE_PATTERN = new RegExp("(^[*]$)|(^[a-zA-Z0-9]*)$", "g");
// ダウンロードファイルを判断するための正規表現(現状はzipファイルのみ)
var	DOWNLOAD_FILE_REGEX = new RegExp(".+[.]zip$", "i");

//親画面
var oyawin = '';
//子画面
var subwin = '';

// 数字、スラッシュ以外を示す正規表現
var	NO_NUMERIC_SLASH_PATTERN = new RegExp("[^0-9/]+", "g");

// 数字、小数点以外を示す正規表現
var	NO_NUMERIC_POINT_PATTERN = new RegExp("[^0-9.]+", "g");

// クリックされたボタン名を保持する
var		clickButtonName = '';

// 左トリム用正規表現
var	LEFT_TRIM_PATTERN	= new RegExp("^[ ]*", "g");

// 左トリム用正規表現
var	RIGHT_TRIM_PATTERN	= new RegExp("[ ]*$", "g");

var submitStatus = false;
var disableCheckSubmitStatus = false;

function sdeCheckDoubleSubmit() {
    var result = true;

    if (disableCheckSubmitStatus == false) {
        if (submitStatus) {
            result = false;
        } else {
            submitStatus = true;
            result = true;
        }
    }
    disableCheckSubmitStatus = false;
    return result;
}

function sdeDisableCheckSubmitOnce() {
    disableCheckSubmitStatus = true;
}

// ×ボタン無効化
function closeDisable() {
	try {
		closeObject.On();
	}
	catch(e) {
		// ×ボタン無効化ActiveX未インストール時
		;
	}
}

// ×ボタン有効化
function closeEnable() {
	try {
		closeObject.Off();
	}
	catch(e) {
		// ×ボタン無効化ActiveX未インストール時
		;
	}
}

// 処理中に非表示にする対象となるアンカーであるか判断を行う
function isHideAnchor(element) {
	// 自身のウインドウ遷移するアンカーかつ
	// ダウンロードファイル以外の場合
	return (element.target == '_self' || element.target == '');
}

// 処理中に非表示にする対象となるアンカーであるか判断を行う
function isHideEventAnchor(element) {
	// 自身のウインドウ遷移するアンカーかつ
	// ダウンロードファイル以外の場合
	return isHideAnchor(element) && element.href.match(DOWNLOAD_FILE_REGEX) == null;
}

// 画面上の全てのアンカーとボタンを非表示にする
function hideButtonAndAnchors(form) {
	// hide submit buttons
	var	element;
	var	i= 0;
	for (i = 0 ; i < form.elements.length ; i++) {
		element = form.elements[i];
		if ( element.type == 'submit' || element.type == 'button' )
		{
			element.style.display = "none";
		}
	}
  	// hide anchors
	var	ancs = document.getElementsByTagName('a');
	for (i = 0 ; i < ancs.length ; i++) {
		element = ancs[i];

		if ( isHideAnchor(element) == true ) {
			element.style.display = "none";
		}
	}
}

function clickAnchorEvent() {
	hideButtonAndAnchors(document.forms[0]);
}

// 戻る・進む・更新ボタン押下チェック
function bfrCheck() {
	var perfNavType = performance.getEntriesByType("navigation")[0].type;
	var menuBtn = document.querySelectorAll('[value="メニュー"]')[0];

	if (perfNavType === 'back_forward' || perfNavType === 'reload') {
		// メニュー画面以外の業務画面
		if (menuBtn != null) {
			alert('ブラウザの「戻る」「進む」「更新」を使用しないでください。\nメニュー画面へ戻ります。');
			menuBtn.click();
		// メニュー画面およびポップアップ画面
		} else {
			alert('ブラウザの「戻る」「進む」「更新」を使用しないでください。\n画面を閉じます。');
			window.close();
		}
	}
}

// 業務画面ロード時に呼び出す共通処理
function commonBodyOnload() {
	// エンターキー押下時の動作を抑制
	document.onkeypress = custom_KeyPress;

	// キーボードイベントを抑止
	document.onkeydown = cancelKeyboardEvt;

	// 右クリックメニュー抑制
	window.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	});

	// クリックボタン名を初期化
	clickButtonName = '';
	// ×ボタンを無効化する(画面が固まる事象を回避するためコメントアウト)
	// closeDisable();

	//子画面チェック（戻る・進む・更新、×ボタン押下時対策）
	window.onbeforeunload = function () {
		subWinOpenCheck();
	}

	var	ancs = document.getElementsByTagName('a');
	var element;
	var i;
	// アンカーを走査
	for (i = 0 ; i < ancs.length ; i++) {
		element = ancs[i];

		if ( isHideEventAnchor(element) == true ) {
			element.addEventListener('click', clickAnchorEvent, false);
		}
	}
	// 画面ロード完了フラグをtrueに設定
	loadComplete = true;

	// 戻る・進む・更新ボタン押下チェック
	bfrCheck();
}

// ポップアップ画面ロード時に呼び出す共通処理
function commonPopupBodyOnload() {

	oyawin = window.opener.document.getElementById('gamid').value;
	// エンターキー押下時の動作を抑制
	document.onkeypress = custom_KeyPress;
	// キーボードイベントを抑止
	document.onkeydown = cancelKeyboardEvt;
	// クリックボタン名を初期化
	clickButtonName = '';
	// ×ボタンを無効化する
	// (ポップアップ画面では実施しない)
	//closeDisable();

	// 右クリックメニュー抑制
	window.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	});

	// 画面ロード完了フラグをtrueに設定
	loadComplete = true;

	// 戻る・進む・更新ボタン押下チェック
	bfrCheck();
}

// ボタンクリック時に呼び出すメソッド
function clickButton(button) {
	// クリックボタン名を保持する変数に
	// ボタンオブジェクトのname属性を設定
	clickButtonName = button.name;
}

// モーダルダイアログモードで画面を起動する
function showPopup(url, width, height) {

	subwin = window.open(
					url,
					"popup",
					"width=" + width	+ "px," +
					"height=" + height	+ "px",
					"popup");
}

// 日付項目フォーカスイン時の処理
function dateFiledInput(field) {

	// YYYY/MM/DD形式の日付フォーマットが不正の場合、処理を行わない
	if (field.maxLength > 7) {
		if (!checkFormatYMD(field.value.split('/'))) {
			return;
		}
	}

	// 数字以外の文字を削除する
	field.value = field.value.replace(NO_NUMERIC_PATTERN, '');
}

// 金額項目フォーカスイン時の処理
function numberFiledInput(field) {

	var	convStr = field.value;

	// マイナス符号フラグ
	var minusFlg = false;

	// マイナス符号チェック
	if (convStr.charAt(0) == '-') {
		minusFlg = true;
	}

	// 数字以外の文字を削除する
	convStr = field.value.replace(NO_NUMERIC_PATTERN, '');

	if (minusFlg) {
		convStr = '-' + convStr;
	}

	field.value = convStr;
}

// 金額項目フォーカスイン時の処理
function floatNumberFiledInput(field) {

	var	convStr = field.value;

	// マイナス符号フラグ
	var minusFlg = false;

	// マイナス符号チェック
	if (convStr.charAt(0) == '-') {
		minusFlg = true;
	}

	// 数字以外の文字を削除する
	convStr = field.value.replace(NO_NUMERIC_POINT_PATTERN, '');

	if (minusFlg) {
		convStr = '-' + convStr;
	}

	field.value = convStr;
}

// 日付項目フォーカスアウト時の処理
function dateFiledOutput(field, maxlength) {

	if (maxlength > 6) {
		var dfStr = field.value.replace(NO_NUMERIC_SLASH_PATTERN, '');

		field.value = dfStr;

		var dfStrArray = dfStr.split('/');

		if (dfStrArray.length == 1) {
			// スラッシュがない場合、日付編集処理へ

		} else if (checkFormatYMD(dfStrArray)) {
			// 日付フォーマット正常

			if (dfStrArray[1].length == 1) {
				// 月が1桁の場合、前0パディング
				dfStrArray[1] = '0' + dfStrArray[1];
			}

			if (dfStrArray[2].length == 1) {
				// 日が1桁の場合、前0パディング
				dfStrArray[2] = '0' + dfStrArray[2];
			}

			// スラッシュを挿入した日付をフィールドに設定し、処理終了
			field.value = dfStrArray[0] + '/' + dfStrArray[1] + '/' + dfStrArray[2];

			return;

		} else {
			// 日付フォーマット異常の場合、処理終了
			return;
		}
	}

	var	convStr = field.value;
	convStr = convStr.replace(NO_NUMERIC_PATTERN, '');

	if ( convStr.length > maxlength ) {
		convStr = convStr.substr(0,maxlength)
	}
	if ( convStr.length > 6 ) {
		convStr = convStr.substr(0,4) + '/' + convStr.substr(4,2) + '/' + convStr.substr(6);
	}
	else if ( convStr.length > 4 ) {
		convStr = convStr.substr(0,4) + '/' + convStr.substr(4);
	}
	field.value = convStr;
}

// YYYY/MM/DD形式のフォーマットチェック
function checkFormatYMD(trgArray) {

	if (trgArray.length != 3
		|| trgArray[0].length != 4
		|| trgArray[1].length < 1
		|| trgArray[1].length > 2
		|| trgArray[2].length < 1
		|| trgArray[2].length > 2) {

		// 日付フォーマット不正
		return false;
	} else {
		return true;
	}
}

// 明細番号フォーカスアウト時の処理
function subPolicyNumberOutput(field) {
	var	convStr = field.value;
	//convStr = convStr.replace(NO_ALPHA_NUMERIC_PATTERN, '');

	// 文字入力時でかつ10文字未満の場合
	if ( convStr != null && 0 < convStr.length && convStr.length < 10 ) {
		convStr = "0000000000".substr(0, 10 - convStr.length) + convStr;
	}
	field.value = convStr;
}

// 金額項目フォーカスアウト時の処理
function numberFiledOutput(field) {
	var	convStr = field.value;

	// マイナス符号フラグ
	var minusFlg = false;

	// マイナス符号チェック
	if (convStr.charAt(0) == '-') {
		minusFlg = true;
	}

	convStr = convStr.replace(NO_NUMERIC_PATTERN, '');

	var len = convStr.length;
	var subLen = 0;

	for (var i = 1; i < len / 3; i++) {
		subLen = convStr.length - (i * 3 + (i - 1));
		convStr = convStr.substr(0, subLen) + ',' + convStr.substr(subLen);
	}

	if (minusFlg) {
		convStr = '-' + convStr;
	}

	field.value = convStr;
}

// 金額項目フォーカスアウト時の処理
function floatNumberFiledOutput(field) {
	var	convStr = field.value;

	// マイナス符号フラグ
	var minusFlg = false;

	// マイナス符号チェック
	if (convStr.charAt(0) == '-') {
		minusFlg = true;
	}

	convStr = convStr.replace(NO_NUMERIC_POINT_PATTERN, '');

	var len = convStr.indexOf(".") == -1 ? convStr.length : convStr.indexOf(".");
	var subLen = 0;

	for (var i = 1; i < len / 3; i++) {
		subLen = (convStr.indexOf(".") == -1 ? convStr.length : convStr.indexOf(".")) - (i * 3 + (i - 1));
		convStr = convStr.substr(0, subLen) + ',' + convStr.substr(subLen);
	}

	if (minusFlg) {
		convStr = '-' + convStr;
	}

	field.value = convStr;
}

// バリデーションチェック時のメッセージ表示
function showValidateMessage(form, field, message) {
	var	focusField;
	if (field.type == 'hidden') {
		focusField = form;
	} else {
		focusField = field;
	}
	alert(message);

	if (form.validate_search_display != null) {
		openSearch(form.validate_search_display.value);
	}
	focusField.focus();
}

// 正規表現チェック
function isRegExp(form, field, regex, not, message) {
	if ( !isEmptyField(field) ) {
		// 不正文字を含んでいるか？
		var		value = field.value;

		var		matchFlag = value.match(regex) != null;
		if ( not ) {
			matchFlag = !matchFlag;
		}
		// 条件に一致しなかったらエラーメッセージ表示＆フォーカス設定
		if ( !matchFlag ) {
			showValidateMessage(form, field, message);
			return false;
		}
	}
	return true;
}

// 空フィールドチェック
function isEmptyField(field) {
	return (field == null || field.value == null || field.value == '');
}

// 必須チェック
function isRequired(form, field, message) {
	// 文字列入力チェック
	if ( isEmptyField(field) ) {
		showValidateMessage(form, field, message);
		return false;
	}
	return true;
}

// 英字チェック
function isAlpha(form, field, message) {
	// 不正文字を含んでいるか？
	return isRegExp(form, field, NO_ALPHA_PATTERN, true, message);
}

// 英数文字チェック
function isAlphaNumeric(form, field, message) {
	// 不正文字を含んでいるか？
	return isRegExp(form, field, NO_ALPHA_NUMERIC_PATTERN, true, message);
}

// 英数文字チェック(英字は大文字)
function isUpperAlphaNumeric(form, field, message) {
	// 不正文字を含んでいるか？
	return isRegExp(form, field, NO_UPPER_ALPHA_NUMERIC_PATTERN, true, message);
}

// 英数文字チェック
function isNumeric(form, field, message) {
	// 不正文字を含んでいるか？
	return isRegExp(form, field, NO_NUMERIC_PATTERN, true, message);
}

// 英数カナ文字チェック
function isAlphaNumericKana(form, field, message) {
    // 不正文字を含んでいるか？
    return isRegExp(form, field, NO_ALPHA_NUMERIC_KANA_PATTERN, true, message);
}

// 禁止文字チェック
function isProhibitionChar(form, field, message) {
	return isRegExp(form, field, PROHIBITION_CHAR_PATTERN, true, message);
}

// 照会CDチェック
function isInqueryContentsCode(form, field, message) {
	return isRegExp(form, field, INQUIRY_CONTENTS_CODE_PATTERN, false, message);
}

function checkDate(y, m, d) {
	var di = new Date(y, m-1, d);
	if( di.getFullYear() == y && di.getMonth() == m-1 && di.getDate() == d ) {
		if (y >= 9999 && m >= 12 && d >= 31) {
			return false;
		}
		return true;
	}
	return false;
}

// 日付チェック
function isValidDateYMD(form, field, message) {
	if ( !isEmptyField(field) ) {
		var	dateArray = field.value.split("/");
		var	result = false;
		if ( dateArray.length == 3 && dateArray[0].length == 4 && dateArray[1].length == 2 && dateArray[2].length == 2) {
			result = checkDate(parseInt(dateArray[0], 10), parseInt(dateArray[1], 10), parseInt(dateArray[2], 10) );
		}
		if ( !result ) {
			showValidateMessage(form, field, message);
			return false;
		}
	}
	return true;
}

// 日付チェック
function isValidDate(form, yearField, monthField, dayField, message) {
	var	result = false;
	result = checkDate(parseInt(yearField.value, 10), parseInt(monthField.value, 10), parseInt(dayField.value, 10) );
	if ( !result ) {
		showValidateMessage(form, yearField, message);
		return false;
	}
	return true;
}

// 最小バイト数(半角文字数)チェック
function isMinLenB(form, field, minlength, message) {
	if ( !isEmptyField(field) && calcByteSize(field.value) < minlength ) {
		showValidateMessage(form, field, message);
		return false;
	}
	return true;
}

// 最大バイト数(半角文字数)チェック
function isMaxLenB(form, field, maxlength, message) {
	if ( !isEmptyField(field) && calcByteSize(field.value) > maxlength ) {
		showValidateMessage(form, field, message);
		return false;
	}
	return true;
}

// 最大バイト数(半角文字数)チェック
function isMaxLenBWithoutRegExp(form, field, maxlength, reg, message) {
	if ( !isEmptyField(field) && calcByteSize(field.value.replace(reg, "")) > maxlength ) {
		showValidateMessage(form, field, message);
		return false;
	}
	return true;
}

// バイト数(半角文字数)チェック
function isLenB(form, field, maxlength, message) {
	if ( !isEmptyField(field) && calcByteSize(field.value) != maxlength ) {
		showValidateMessage(form, field, message);
		return false;
	}
	return true;
}

// 数値 範囲チェック
function isIntRange(form, field, min, max, message) {
	if ( !isEmptyField(field) ) {
		var		value = parseInt(field.value, 10);
		var		result = min <= value && value <= max;
		if ( result == false ) {
			showValidateMessage(form, field, message);
		}
		return result;
	}
	else {
		return true;
	}
}

// 半角文字チェック
function isAllHankaku(form, field, message) {
	var	value = field.value;

	// 文字数とバイトサイズが異なる場合、全角文字が含まれている
	if ( !isEmptyField(field) && value.length != calcByteSize(value) ) {
		showValidateMessage(form, field, message);
		return false;
	}
	return true;
}

// 日付チェック
function isValidYearMonth(form, yearMonthField, message) {
	if ( !isEmptyField(yearMonthField) ) {
		var	yearMonth = yearMonthField.value;
		if ( yearMonth.length != 7 || yearMonth.substr(4,1) != "/" ) {
			showValidateMessage(form, yearMonthField, message);
			return false;
		}
		if ( !checkDate(yearMonth.substr(0,4), yearMonth.substr(5), "1") ) {
			showValidateMessage(form, yearMonthField, message);
			return false;
		}
	}
	return true;
}

// 文字列長チェック
function isStringLength(str, slength, slenCount) {
    if (str == undefined || str == null) {
        return true;
    }
    if (slength == undefined || slength == null) {
        return true;
    }
    if (slenCount == undefined || slenCount == null) {
        return true;
    }
    var strlen =0;
    var maxlength = parseInt(slength, 10);
    for (i = 0; i < str.length; i++) {
        if (isZenkaku(str.charCodeAt(i))) {
            strlen = strlen + 2;
        }
        else {
            strlen++;
        }
    }
    if (slenCount == "zenkaku" && 0 <= strlen && strlen <= (maxlength * 2)) {
        return true;
    }
    if (slenCount == "hankaku" && 0 <= strlen && strlen <= maxlength) {
        return true;
    }
    return false;
}

// 全角文字のチェック
function isZenkaku(code2) {
    if ((code2 != 0x0009 || code2 != 0x000A || code2 != 0x000D || code2 != 0x0020)
            && (code2 <= 0x007F)) {
        return false;
    }
    if (0xFF61 <= code2 && code2 <= 0xFF9F) {
        return false;
    }
    return true;
}

// 金額チェック
function isValidNumber(form, field, min, max, message) {
	if (!isEmptyField(field)) {

		// マイナス符号フラグ
		var minusFlg = false;

		// マイナス符号チェック
		if (field.value.charAt(0) == '-') {
			minusFlg = true;
		}

		// 数値以外を除去
		var	value = field.value.replace(NO_NUMERIC_PATTERN, '');
		value = parseInt(value, 10);

		if (minusFlg) {
			value = value * (-1);
		}

		// 範囲チェック
		if (!(min <= value && value <= max)) {
			showValidateMessage(form, field, message);
			return false;
		}
	}
	return true;
}

// 金額チェック(小数可)
function isValidFloatNumber(form, field, min, max, message) {
	if (!isEmptyField(field)) {
	    min = parseFloat(min);
	    max = parseFloat(max);

		// マイナス符号フラグ
		var minusFlg = false;

		// マイナス符号チェック
		if (field.value.charAt(0) == '-') {
			minusFlg = true;
		}

		// 数値と小数点以外を除去
		var	value = field.value.replace(NO_NUMERIC_POINT_PATTERN, '');
		var strValue = value;
		var floatValue = parseFloat(value);

		if (minusFlg) {
			floatValue = floatValue * (-1);
		}

		// 範囲チェック
		if (strValue.split(".").length >= 3 || (strValue.indexOf(".") != -1 && (strValue.length - strValue.indexOf(".")) > 3) ||  !(min <= floatValue && floatValue <= max)) {
			showValidateMessage(form, field, message);
			return false;
		}
	}
	return true;
}

// バイトサイズの算出
function calcByteSize(value) {
    var byteSize =0;

    for (i = 0; i < value.length; i++) {
        if (isZenkaku(value.charCodeAt(i))) {
            byteSize = byteSize + 2;
        }
        else {
            byteSize++;
        }
    }
    return byteSize;
}

// 要素名からインデックス番号を取得
function getNameToIndexNo(name) {
	var		regexHead	= new RegExp(".+\\[", "g");
	var		regexTail	= new RegExp("].*", "g");
	var		indexNo = name.replace(regexHead, "").replace(regexTail, "");
	return parseInt(indexNo, 10);
}

// エンターキー押下時の処理のカスタマイズ
function custom_KeyPress(){

	var src = window.event.srcElement;

	if( window.event.keyCode == 13) {

		if (src.type != 'submit'
	      && src.type != 'button'
	      && src.type != 'textarea' ) {
	      return false;
	    }
    }

	return true;
}

// 要素配列内で未入力の項目をチェックする
function checkAllInput(form, checkFields, message, required) {
	var		inputField = 0;
	var		i;
	var		firstEmptyField = null;
	for (i = 0 ; i < checkFields.length ; i++) {
		if ( isEmptyField(checkFields[i]) ) {
			if ( firstEmptyField == null ) {
				firstEmptyField = checkFields[i];
			}
		}
		else {
			inputField++;
		}
	}
	// 必須フラグがfalseですべての項目が未入力時は
	// 未入力フィールドをnullでクリア
	if ( inputField == 0 && !required ) {
		firstEmptyField = null;
	}
	// 未入力フィールドが存在するか？
	if ( firstEmptyField != null ) {
		// 存在したらメッセージ表示を行う
		showValidateMessage(form, firstEmptyField, message);
		inputField = -1;
	}
	return inputField;
}

// ラジオボタンで選択中の値を取得する
function getRadioSelectedValue(radio) {
	var		selectedValue = null;
	for(i = 0 ; i< radio.length ; i++ ) {
		var		item = radio[i];
		if ( item.checked ) {
			selectedValue = item.value;
			break;
		}
	}
	return selectedValue;
}

// 右トリム
function rtrim(value) {
	var	result = '';
	if ( value != null && value.length > 0 ) {
		result = value.replace(RIGHT_TRIM_PATTERN, '');
	}
	return result;
}

// 左トリム
function ltrim(value) {
	var	result = '';
	if ( value != null && value.length > 0 ) {
		result = value.replace(LEFT_TRIM_PATTERN, '');
	}
	return result;
}

function trim(value) {
	return ltrim(rtrim(value));
}

// 担当者クリア
function clearUser(name) {
	document.tks_TKSPRForm[name + '_id'].value = '';
	document.tks_TKSPRForm[name + '_sec_code'].value = '';
	document.tks_TKSPRForm[name + '_name'].value = '';
	document.getElementById(name + '_name').innerText = ' ';
	document.getElementById(name + '_name').title = '';
	var	check_sec_code_1_5 = document.tks_TKSPRForm[name + '_check_sec_code_1_5'];
	if (check_sec_code_1_5 != null) {
		check_sec_code_1_5.value = '';
	}
	return;
}

// ラジオボタンの必須チェック
function isRequiredRadio(form, checkFields, message) {
	for (var i = 0 ; i < checkFields.length ; i++) {
		if (checkFields[i].checked) {
			return true;
		}
	}

	// すべて未チェックの場合
	showValidateMessage(form, checkFields[0], message);

	return false;
}

// キーボードイベント抑止
function cancelKeyboardEvt() {
	// 更新ショートカットキー抑止
	if( window.event.ctrlKey ){
		var keyCodeValue = window.event.key;

		if( keyCodeValue === "r" || keyCodeValue === "R" || keyCodeValue === "F5" ){
			event.preventDefault;
			return false;
		}
	}

	if( window.event.key === "F5" ) {
		event.preventDefault;
		return false;
	}

	// 戻る・進むショートカットキー抑止
	if( window.event.altKey ){
		var keyCodeValue = window.event.key;

		if( keyCodeValue === "ArrowLeft" || keyCodeValue === "ArrowRight" ){
			event.preventDefault;
			return false;
		}
	}
	return true;
}

function preSubmit(form) {
    // ロード完了フラグをチェック
    if ( loadComplete == false) {
    	// falseの場合、画面ロード中とみなし ロード中メッセージを表示
	   	alert(LOADING_SUBMIT_ERROR_MESSAGE);
      	return false;
    }

    var		submitFlag = true;
    if ( typeof(custom_Submit) != 'undefined' ) {
    	submitFlag = custom_Submit(form);
    }
   	return submitFlag;
}

function postSubmit(form) {
    if ( disableCheckSubmitStatus == false ) {
	    hideButtonAndAnchors(form);
	}
    return true;
}

function submitAYG001(form,func) {
    return submitANA00(form);
}

function submitAYG100(form,func) {
    return submitANA00(form);
}

function submitAYG101(form,func) {
    return submitANA00(form);
}

function submitAYG900(form,func) {
    return submitANA00(form);
}

function submitAYG200(form,func) {
    return submitANA00(form);
}

function submitAYG102(form,func) {
    return submitANA00(form);
}

function submitAYG901(form,func) {
    return submitANA00(form);
}

function submitAYG201(form,func) {
    return submitANA00(form);
}

function submitAYG202(form,func) {
    return submitANA00(form);
}

function submitAYG203(form,func) {
    return submitANA00(form);
}

function submitAYG800(form,func) {
    return submitANA00(form);
}

function submitAYG997(form,func) {
    return submitANA00(form);
}

function submitAYG999(form,func) {
    return submitANA00(form);
}

function submitANA00(form) {
    if (preSubmit(form)==false) {
        return false;
    }

    if (postSubmit(form)==false) {
        return false;
    }
    return sdeCheckDoubleSubmit();
}

function closeSubmit(closeButton, message) {
    if ( confirm(message) ) {
        if(closeButton != null) {
            closeButton.click();
        }
    }
    return false;
}

//ポップアップ画面終了時に行う親画面現存チェック
function windowOpenerClosedCheck() {
	if (!window.opener || window.opener.closed) {
		window.close();
		return false;
	}

	var oyaGamid = window.opener.document.getElementById('gamid').value;
	if (oyawin != oyaGamid) {
		window.close();
		return false;
	}
	return true;
}

// 子画面開閉チェック
function subWinOpenCheck() {
	if (!subwin || subwin.closed) {
		// 子画面が存在しないとき、変数を初期化する
		subwin = '';

	} else {
		// 子画面が開いている場合、子画面を閉じる
		subwin.close();
		subwin = '';
	}
}