/*
######################################################################
 ﾌｧｲﾙ番号		：
 ﾌｧｲﾙ名称		：default.js
 ﾌｧｲﾙ略称		：default.html用ﾓｼﾞｭｰﾙ群
 著作権			：Copyright CrossCAT co.,ltd. All Rights Reserved.
 作成者			：平川一
 作成開始日		：2019.03.05
 最終更新日		：2019.06.13
 修正履歴		：cookieの設定ができないのでクライアントモード使用不可
 				：（2019.06.13 現在）
######################################################################
*/

var EXPIRES_DAY = 3;

var cookieNameUserId = 'usr';
var cookieNameBukaCode = 'buk';
var cookieNamePostCode = 'pst';

var cookieNameUid = 'uid';
var cookieNameInputUid = 'Input_Uid';
var cookieNameParam005 = 'Param005';
var cookieNameParam030 = 'Param030';

var cookieDomain = '';

var mode;
var CLIENT_MODE = '1';
var SERVER_MODE = '2';

// --------------------------------------------------
// 接続先のホスト名を保持する連想配列
// --------------------------------------------------
var gl_arr_Environment = new Array();

// MS
//gl_arr_Environment['127.0.0.1'] = { Enterprise:'MS', ConnectType:'000', Division:'cm'};	// ローカル環境（事業会社）
gl_arr_Environment['local.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'000', Division:'cm',ip:'127.0.0.1'};	// ローカル環境（事業会社）
gl_arr_Environment['local.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'000', Division:'ag',ip:'127.0.0.1'};	// ローカル環境（代理店）

gl_arr_Environment['wwwt.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'100', Division:'cm'};	// 結合環境 LoadBalancer（事業会社）
gl_arr_Environment['wwwt.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'100', Division:'ag', ip:'189.200.120.70'};	// 結合環境 LoadBalancer（代理店）

gl_arr_Environment['wwwq.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'200', Division:'cm'};	// 疑似環境 疑似面　LoadBalancer（事業会社）
gl_arr_Environment['wwwq.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'200', Division:'ag', ip:'189.46.52.12'};	// 疑似環境 疑似面　LoadBalancer（代理店）
gl_arr_Environment['wwwq11.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'201', Division:'cm'};	// 　疑似環境　疑似面　#1（事業会社）
gl_arr_Environment['wwwq11.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'201', Division:'ag', ip:'189.46.52.12'};	// 　疑似環境　疑似面　#1（代理店）
gl_arr_Environment['wwwq12.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'202', Division:'cm'};	// 　疑似環境　疑似面　#2（事業会社）
gl_arr_Environment['wwwq12.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'202', Division:'ag', ip:'189.46.52.18'};	// 　疑似環境　疑似面　#2（代理店）

gl_arr_Environment['wwwq2.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'210', Division:'cm'};	// 疑似環境 ユーザ打鍵面　LoadBalancer（事業会社）
gl_arr_Environment['wwwq2.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'210', Division:'ag', ip:'189.46.52.14'};	// 疑似環境 ユーザ打鍵面　LoadBalancer（代理店）
gl_arr_Environment['wwwq21.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'211', Division:'cm'};	// 　疑似環境　ユーザ打鍵面　#1（事業会社）
gl_arr_Environment['wwwq21.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'211', Division:'ag', ip:'189.46.52.14'};	// 　疑似環境　ユーザ打鍵面　#1（代理店）
gl_arr_Environment['wwwq22.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'212', Division:'cm'};	// 　疑似環境　ユーザ打鍵面　#2（事業会社）
gl_arr_Environment['wwwq22.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'212', Division:'ag', ip:'189.46.52.20'};	// 　疑似環境　ユーザ打鍵面　#2（代理店）

gl_arr_Environment['www2.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'300', Division:'cm'};	// 本番環境 稼働確認面　LoadBalancer（事業会社）
gl_arr_Environment['www2.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'300', Division:'ag'};	// 本番環境 稼働確認面　LoadBalancer（代理店）
gl_arr_Environment['www21.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'301', Division:'cm'};	// 　本番環境 稼働確認面　#1（事業会社）
gl_arr_Environment['www21.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'301', Division:'ag'};	// 　本番環境 稼働確認面　#1（代理店）
gl_arr_Environment['www22.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'302', Division:'cm'};	// 　本番環境 稼働確認面　#2（事業会社）
gl_arr_Environment['www22.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'302', Division:'ag'};	// 　本番環境 稼働確認面　#2（代理店）
gl_arr_Environment['www23.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'303', Division:'cm'};	// 　本番環境 稼働確認面　#3（事業会社）
gl_arr_Environment['www23.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'303', Division:'ag'};	// 　本番環境 稼働確認面　#3（代理店）

gl_arr_Environment['www.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'310', Division:'cm'};	// 本番環境 本番稼働面　LoadBalancer（事業会社）
gl_arr_Environment['www.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'310', Division:'ag'};	// 本番環境 本番稼働面　LoadBalancer（代理店）
gl_arr_Environment['www11.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'311', Division:'cm'};	// 　本番環境 本番稼働面　#1（事業会社）
gl_arr_Environment['www11.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'311', Division:'ag'};	// 　本番環境 本番稼働面　#1（代理店）
gl_arr_Environment['www12.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'312', Division:'cm'};	// 　本番環境 本番稼働面　#2（事業会社）
gl_arr_Environment['www12.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'312', Division:'ag'};	// 　本番環境 本番稼働面　#2（代理店）
gl_arr_Environment['www13.azmhk-cm.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'313', Division:'cm'};	// 　本番環境 本番稼働面　#3（事業会社）
gl_arr_Environment['www13.azmhk-ag.ms.ms-ad-ins.com'] = { Enterprise:'MS', ConnectType:'313', Division:'ag'};	// 　本番環境 本番稼働面　#3（代理店）


// AD
gl_arr_Environment['local.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'000', Division:'cm',ip:'127.0.0.1'};	// ローカル環境（事業会社）
gl_arr_Environment['local.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'000', Division:'ag', ip:'127.0.0.1'};	// ローカル環境（代理店）

gl_arr_Environment['wwwt.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'100', Division:'cm'};	// 結合環境 LoadBalancer（事業会社）
gl_arr_Environment['wwwt.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'100', Division:'ag', ip:'189.200.120.71'};	// 結合環境 LoadBalancer（代理店）

gl_arr_Environment['wwwq.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'200', Division:'cm'};	// 疑似環境 疑似面　LoadBalancer（事業会社）
gl_arr_Environment['wwwq.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'200', Division:'ag', ip:'189.46.52.13'};	// 疑似環境 疑似面　LoadBalancer（代理店）
gl_arr_Environment['wwwq11.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'201', Division:'cm'};	// 　疑似環境　疑似面　#1（事業会社）
gl_arr_Environment['wwwq11.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'201', Division:'ag', ip:'189.46.52.13'};	// 　疑似環境　疑似面　#1（代理店）
gl_arr_Environment['wwwq12.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'202', Division:'cm'};	// 　疑似環境　疑似面　#2（事業会社）
gl_arr_Environment['wwwq12.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'202', Division:'ag', ip:'189.46.52.19'};	// 　疑似環境　疑似面　#2（代理店）

gl_arr_Environment['wwwq2.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'210', Division:'cm'};	// 疑似環境 ユーザ打鍵面　LoadBalancer（事業会社）
gl_arr_Environment['wwwq2.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'210', Division:'ag', ip:'189.46.52.15'};	// 疑似環境 ユーザ打鍵面　LoadBalancer（代理店）
gl_arr_Environment['wwwq21.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'211', Division:'cm'};	// 　疑似環境　ユーザ打鍵面　#1（事業会社）
gl_arr_Environment['wwwq21.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'211', Division:'ag', ip:'189.46.52.15'};	// 　疑似環境　ユーザ打鍵面　#1（代理店）
gl_arr_Environment['wwwq22.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'212', Division:'cm'};	// 　疑似環境　ユーザ打鍵面　#2（事業会社）
gl_arr_Environment['wwwq22.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'212', Division:'ag', ip:'189.46.52.21'};	// 　疑似環境　ユーザ打鍵面　#2（代理店）

gl_arr_Environment['www2.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'300', Division:'cm'};	// 本番環境 稼働確認面　LoadBalancer（事業会社）
gl_arr_Environment['www2.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'300', Division:'ag'};	// 本番環境 稼働確認面　LoadBalancer（代理店）
gl_arr_Environment['www21.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'301', Division:'cm'};	// 　本番環境 稼働確認面　#1（事業会社）
gl_arr_Environment['www21.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'301', Division:'ag'};	// 　本番環境 稼働確認面　#1（代理店）
gl_arr_Environment['www22.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'302', Division:'cm'};	// 　本番環境 稼働確認面　#2（事業会社）
gl_arr_Environment['www22.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'302', Division:'ag'};	// 　本番環境 稼働確認面　#2（代理店）
gl_arr_Environment['www23.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'303', Division:'cm'};	// 　本番環境 稼働確認面　#3（事業会社）
gl_arr_Environment['www23.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'303', Division:'ag'};	// 　本番環境 稼働確認面　#3（代理店）

gl_arr_Environment['www.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'310', Division:'cm'};	// 本番環境 本番稼働面　LoadBalancer（事業会社）
gl_arr_Environment['www.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'310', Division:'ag'};	// 本番環境 本番稼働面　LoadBalancer（代理店）
gl_arr_Environment['www11.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'311', Division:'cm'};	// 　本番環境 本番稼働面　#1（事業会社）
gl_arr_Environment['www11.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'311', Division:'ag'};	// 　本番環境 本番稼働面　#1（代理店）
gl_arr_Environment['www12.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'312', Division:'cm'};	// 　本番環境 本番稼働面　#2（事業会社）
gl_arr_Environment['www12.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'312', Division:'ag'};	// 　本番環境 本番稼働面　#2（代理店）
gl_arr_Environment['www13.azmhk-cm.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'313', Division:'cm'};	// 　本番環境 本番稼働面　#3（事業会社）
gl_arr_Environment['www13.azmhk-ag.ad.ms-ad-ins.com'] = { Enterprise:'AD', ConnectType:'313', Division:'ag'};	// 　本番環境 本番稼働面　#3（代理店）



// --------------------------------------------------
// 接続先のコンテンツ（ディレクトリ＋ファイル）を保持する連想配列
// ローカル環境用Format:gl_arr_Contents[ 'LOCAL_事業会社' ][ 'コンテンツ識別子' ]
// 　サーバ環境用Format:gl_arr_Contents[ 'SERVER' ][ 'コンテンツ識別子' ]
// --------------------------------------------------
var gl_arr_Contents = new Array();
gl_arr_Contents[ 'LOCAL_MS' ] = new Array();
gl_arr_Contents[ 'LOCAL_AD' ] = new Array();
gl_arr_Contents[ 'SERVER_MS' ] = new Array();
gl_arr_Contents[ 'SERVER_AD' ] = new Array();


//LOCAL
gl_arr_Contents[ 'LOCAL_MS' ][ 'MHK001' ] = 'mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00';		// 事業会社向け　申込書品質管理　メニュー(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'MHK001' ] = 'mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00';		// 事業会社向け　申込書品質管理　メニュー(AD)
gl_arr_Contents[ 'LOCAL_MS' ][ 'MHK002' ] = 'mhkcmwa11/AMA09?gamid=AMA09&gamcd=AMA00';		// 事業会社向け　申込書品質管理　調査一覧(MS)
gl_arr_Contents[ 'LOCAL_MS' ][ 'MHK003' ] = 'mhkcmwa11/AMA04?gamid=AMA04&gamcd=AMA00';		// 事業会社向け　申込書品質管理　不備回答入力(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'MHK003' ] = 'mhkcmwa11/AMA04?gamid=AMA04&gamcd=AMA00';		// 事業会社向け　申込書品質管理　不備回答入力(AD)
gl_arr_Contents[ 'LOCAL_MS' ][ 'MHK004' ] = 'mhkcmwa11/AMA07?gamid=AMA07&gamcd=AMA00&mode=ET';		// 事業会社向け　申込書品質管理　不備一覧(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'MHK004' ] = 'mhkcmwa11/AMA07?gamid=AMA07&gamcd=AMA00&mode=ET';		// 事業会社向け　申込書品質管理　不備一覧(AD)

gl_arr_Contents[ 'LOCAL_MS' ][ 'TKS001' ] = 'mhkcmwa12/ANA01?gamid=ANA01&gamcd=ANA00';		// 事業会社向け　異例取扱管理　　メニュー(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'TKS001' ] = 'mhkcmwa12/ANA01?gamid=ANA01&gamcd=ANA00';		// 事業会社向け　異例取扱管理　　メニュー(AD)
gl_arr_Contents[ 'LOCAL_MS' ][ 'TKS002' ] = 'mhkcmwa12/ANA05?gamid=ANA05&gamcd=ANA00';		// 事業会社向け　異例取扱管理　　取消計上申請一覧(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'TKS002' ] = 'mhkcmwa12/ANA05?gamid=ANA05&gamcd=ANA00';		// 事業会社向け　異例取扱管理　　取消計上申請一覧(AD)

gl_arr_Contents[ 'LOCAL_MS' ][ 'MHK101' ] = 'mhkagwa11/AMC22?gamid=AMC22&gamcd=AMC00';		// 代理店向け　　申込書品質管理　不備一覧(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'MHK101' ] = 'mhkagwa11/AMC22?gamid=AMC22&gamcd=AMC00';		// 代理店向け　　申込書品質管理　不備一覧(AD)
gl_arr_Contents[ 'LOCAL_MS' ][ 'MHK102' ] = 'mhkagwa11/AMC23?gamid=AMC23&gamcd=AMC00';		// 代理店向け　　申込書品質管理　不備内容回答(MS)
gl_arr_Contents[ 'LOCAL_AD' ][ 'MHK102' ] = 'mhkagwa11/AMC23?gamid=AMC23&gamcd=AMC00';		// 代理店向け　　申込書品質管理　不備内容回答(AD)

// SERVER
gl_arr_Contents[ 'SERVER_MS' ][ 'MHK001' ] = 'index.html';							// 事業会社向け　申込書品質管理　メニュー(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'MHK001' ] = 'index.html';							// 事業会社向け　申込書品質管理　メニュー(AD)
gl_arr_Contents[ 'SERVER_MS' ][ 'MHK002' ] = 'index.html?mode=1';					// 事業会社向け　申込書品質管理　調査一覧(MS)
gl_arr_Contents[ 'SERVER_MS' ][ 'MHK003' ] = 'index.html?mode=TD';					// 事業会社向け　申込書品質管理　不備回答入力(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'MHK003' ] = 'index.html?mode=TD';					// 事業会社向け　申込書品質管理　不備回答入力(AD)
gl_arr_Contents[ 'SERVER_MS' ][ 'MHK004' ] = 'index.html?mode=ET';					// 事業会社向け　申込書品質管理　不備一覧(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'MHK004' ] = 'index.html?mode=ET';					// 事業会社向け　申込書品質管理　不備一覧(AD)

gl_arr_Contents[ 'SERVER_MS' ][ 'TKS001' ] = 'index.html';					// 事業会社向け　異例取扱管理　　メニュー(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'TKS001' ] = 'index.html';					// 事業会社向け　異例取扱管理　　メニュー(AD)
gl_arr_Contents[ 'SERVER_MS' ][ 'TKS002' ] = 'index.html?mode=1';			// 事業会社向け　異例取扱管理　　取消計上申請一覧(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'TKS002' ] = 'index.html?mode=1';			// 事業会社向け　異例取扱管理　　取消計上申請一覧(AD)

gl_arr_Contents[ 'SERVER_MS' ][ 'MHK101' ] = 'index.html';							// 代理店向け　　申込書品質管理　不備一覧(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'MHK101' ] = 'index.html';							// 代理店向け　　申込書品質管理　不備一覧(AD)
gl_arr_Contents[ 'SERVER_MS' ][ 'MHK102' ] = 'index.html';							// 代理店向け　　申込書品質管理　不備内容回答(MS)
gl_arr_Contents[ 'SERVER_AD' ][ 'MHK102' ] = 'index.html';							// 代理店向け　　申込書品質管理　不備内容回答(AD)



/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：set_EnvironmentData
 ﾓｼﾞｭｰﾙ略称	：画面表示処理
 ﾓｼﾞｭｰﾙ概要	：動作環境に応じた画面UI設定を行う。
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：2019.03.05
 作成者		：平川一
 修正		：
**********************************************************************
*/
function set_EnvironmentData()
{

	var lo_str_HostName;		// ホスト情報格納変数
	var form = document.mainForm;	// フォーム

	// cookieからの入力値復元
	// 事業会社
	form.UserID.value = getCookie(cookieNameUserId);
	form.BukaCode.value = getCookie(cookieNameBukaCode);
	form.YakusyokuCode.value = getCookie(cookieNamePostCode);

	// 代理店
	form.input_uid.value = getCookie(cookieNameUid);
	form.input_inputUid.value = getCookie(cookieNameInputUid);
	form.input_param005.value = getCookie(cookieNameParam005);

	var editParam030 = getCookie(cookieNameParam030);
	if (editParam030 == ',' || editParam030 == '') {
		editParam030 = '';
	} else {
		editParam030 = editParam030.split(',')[0];
	}

	form.input_param030.value = editParam030;

	// 1. ホスト名を取得し、動作しているサーバ環境を特定する。

	//　locationオブジェクトについて
	// 	location.href			http://www.htmq.com:8000/js/index.php?q=javascript#link
	// 	location.protocol		http:
	// 	location.hostname		www.htmq.com
	// 	location.host			www.htmq.com:8000
	// 	location.port			8000
	// 	location.pathname		/js/index.php
	// 	location.search			?q=javascript
	// 	location.hash			#link

	lo_str_HostName = location.hostname;	// ホスト名の取得
	//lo_str_HostName = 'AD310';			// debug用

	if(gl_arr_Environment[lo_str_HostName]) {
		// サーバ環境での動作
		document.all[ 'Debug' ].innerHTML = set_ServerMode( lo_str_HostName );

	// 定義外のホストの場合
	} else {
		// ローカル環境での動作（結合環境・疑似環境）
		document.all[ 'Debug' ].innerHTML = set_ClientMode();
	}

	// 事業会社による表示制御
	controlByCompany();
	// 代理店認証経路による表示制御
	controlByAuth();
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：getCookie
 ﾓｼﾞｭｰﾙ略称	：cooki取得処理
 ﾓｼﾞｭｰﾙ概要	：cookieを取得する。
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：
 作成者		：
 修正		：
**********************************************************************
*/
function getCookie(cookieName) {
	var	i;
	var	cookies	= document.cookie.split(';');
	var	result	= '';

	for (i = 0 ; i < cookies.length ; i++ ) {
		var	cookie	= cookies[i];
		var	index	= cookie.indexOf('=');

		var	searchCookieName = cookie.substring(0, index);

		if ( searchCookieName == cookieName ||
			 searchCookieName == ' ' + cookieName ) {
			result = cookie.substring(index + 1);
			break;
		}
	}

	return result;
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：set_ServerMode
 ﾓｼﾞｭｰﾙ略称	：サーバモード設定処理
 ﾓｼﾞｭｰﾙ概要	：サーバで挙動した際の画面UI設定を行う。
 引数		：arg_HostData	/ ホスト情報
 戻値		：挙動するモードの情報。
 作成日		：2019.03.05
 作成者		：平川一
 修正		：
**********************************************************************
*/
function set_ServerMode( arg_HostData )
{

	// 0. 初期処理
	var lo_str_HostName = arg_HostData;			// 挙動するホスト情報
	var lo_str_EnvironmentType = '';			// 挙動環境タイプ格納変数（ConnectTypeの上1桁）
	var lo_str_APGType = '';					// 挙動AGPタイプ格納変数（ConnectTypeの上2桁）
	var lo_str_Division = '';					// 分類 事業会社／代理店
	var lo_str_StyleSheet = 'Environment';		// アクティブな環境のスタイルシート


	// 1. サーバサイドで挙動した際の画面UI設定
	// 環境情報配列分ループする。
	for( var lo_Key in gl_arr_Environment )
	{

		// 挙動するホスト情報と合致した場合。（配列に定義ある内容で挙動する。
		if( lo_Key == lo_str_HostName )
		{

			// ①. ホスト名から環境を判定する。
			lo_str_EnvironmentType = gl_arr_Environment[ lo_Key ][ 'ConnectType' ].substring(0, 1) + '00';		// 挙動環境タイプ
			lo_str_APGType =  gl_arr_Environment[ lo_Key ][ 'ConnectType' ].substring(0, 2) + '0';				// 挙動APGタイプ
			lo_str_Division = gl_arr_Environment[ lo_Key ][ 'Division' ];										// 分類


			// ②. 環境のラベルのスタイルシートを変更する。
			document.all[ 'Environment_' + lo_str_EnvironmentType ].className = lo_str_StyleSheet;

			// ③. 事業会社の設定（動作環境以外は非表示）
			switch( gl_arr_Environment[ lo_Key ][ 'Enterprise' ] )
			{
				case 'MS':

					document.all[ 'Enterprise' ][ 0 ].checked = true; 		// 事業会社 -MS を選択状態にする。

//					document.all[ 'Enterprise' ][ 0 ].disabled  = true;		// 事業会社ラジオボタンを非活性にする。
//					document.all[ 'Enterprise' ][ 1 ].disabled  = true;		// 事業会社ラジオボタンを非活性にする。

					break;

				case 'AD':

					document.all[ 'Enterprise' ][ 1 ].checked = true;		// 事業会社 -MS を選択状態にする。

//					document.all[ 'Enterprise' ][ 0 ].disabled  = true;		// 事業会社ラジオボタンを非活性にする。
//					document.all[ 'Enterprise' ][ 1 ].disabled  = true;		// 事業会社ラジオボタンを非活性にする。

					break;

				default:

					document.all[ 'Enterprise' ][ 0 ].checked = true;		// 事業会社は特定せず。デフォルト設定（MS社）を行う。

					break;
			}


			// ④. 接続サーバの設定（動作環境以外は非表示）
			// 選択可能範囲のみ表示する。
			document.all[ 'ConnectServer_' + lo_str_APGType ].style.display = 'block';

			// 選択可能範囲のLBをデフォルト選択として設定する。
			for( var i = document.all[ 'ConnectServer' ].length; i--; ) document.all[ 'ConnectServer' ][ i ].checked = ( document.all[ 'ConnectServer' ][i].value == lo_str_APGType ) ? true : false;

			document.all[ 'Division_' + lo_str_Division ].style.display = 'block';


			// 環境が特定できた為、ループ処理を終了する。
			break;

		}
	}

	// ⑤. 動作モード設定
	mode = SERVER_MODE;

	// 2. 復帰処理
	// 画面にサーバモードでの挙動を表示する。
	return 'Mode = Server Mode（ Host = ' + lo_str_HostName + ' / EnvironmentType = ' + lo_str_EnvironmentType.substring(0, 1) + ' / APGType = ' + lo_str_APGType.substring(1, 2) + ' / Division = ' + lo_str_Division + '）';

}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：set_ClientMode
 ﾓｼﾞｭｰﾙ略称	：クライアントモード設定処理
 ﾓｼﾞｭｰﾙ概要	：クライアントで挙動した際の画面UI設定を行う。
 引数		：( Nothing )
 戻値		：挙動するモードの情報。
 作成日		：2019.03.05
 作成者		：平川一
 修正		：
**********************************************************************
*/
function set_ClientMode()
{

	// 0. 初期処理
	var lo_str_StyleSheet = 'Environment';		// アクティブな環境のスタイルシート


	// 1. クライアントで挙動した際の画面UI設定

	// ①. ホスト名から環境を判定する。
	//
	// （クライアントモードは当該処理なし）
	//

	// ②. 環境のラベルのスタイルシートを変更する。
	document.all[ 'Environment_000' ].className = lo_str_StyleSheet;	// ローカル環境アクティブ
	document.all[ 'Environment_100' ].className = lo_str_StyleSheet;	// 結合環境アクティブ
	document.all[ 'Environment_200' ].className = lo_str_StyleSheet;	// 疑似環境アクティブ

	// ③. 事業会社の設定（デフォルト設定）
	// クライアントモードの為、事業会社は特定せず。デフォルト設定（MS社）を行う。
	document.all[ 'Enterprise' ][ 0 ].checked = true;

	// ④. 接続サーバの設定（本番環境は非表示）
	document.all[ 'ConnectServer_000' ].style.display = 'block';		// ローカル環境
	document.all[ 'ConnectServer_100' ].style.display = 'block';		// 結合環境
	document.all[ 'ConnectServer_200' ].style.display = 'block';		// 疑似環境 - 疑似面
	document.all[ 'ConnectServer_210' ].style.display = 'block';		// 疑似環境 - ユーザ打鍵環境

	// ⑤. その他の項目を表示
	document.all[ 'Division_cm' ].style.display = 'block';
	document.all[ 'Division_ag' ].style.display = 'block';

	// ⑥. 動作モード設定
	mode = CLIENT_MODE;

	// 2. 復帰処理
	return 'Mode = ClientMode';		// 画面にクライアントモードでの挙動を表示する。
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：controlByCompany
 ﾓｼﾞｭｰﾙ略称	：MS/ADによる項目表示制御
 ﾓｼﾞｭｰﾙ概要	：
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：2019.06.13
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function controlByCompany() {
	var form = document.mainForm;

	// MS
	if (form.Enterprise[0].checked) {
		form.checkList_cm.disabled = false;
		form.checkListFromMail_cm.disabled = false;

		form.nissei.disabled = true;
		form.input_param005.disabled = false;
		form.input_param030.disabled = true;

	// AD
	} else {
		form.checkList_cm.disabled = true;
		form.checkListFromMail_cm.disabled = true;

		form.nissei.disabled = false;
		form.input_param005.disabled = true;
		form.input_param030.disabled = false;
	}
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：controlByAuth
 ﾓｼﾞｭｰﾙ略称	：代理店認証経路による項目表示制御
 ﾓｼﾞｭｰﾙ概要	：
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：2019.06.13
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function controlByAuth() {
	var form = document.mainForm;

	// ICEWALL
	if (form.AgentAuth[0].checked) {
		form.needs1.disabled = true;
		form.gwList.disabled = true;
		form.fqdnList.disabled = true;
		form.input_inputUid.disabled = false;
		form.input_uid.disabled = true;

	// GW／DL
	} else {
		form.input_inputUid.disabled = true;
		form.input_uid.disabled = false;

		if (form.AgentAuth[2].checked) {
			// DL
			form.needs1.disabled = false;
			form.gwList.disabled =true;
			form.fqdnList.disabled = true;
		} else {
			// GW
			form.needs1.disabled = true;
			form.gwList.disabled = false;
			form.fqdnList.disabled = false;

			if (form.fqdnList.options.length == 0) {
				controlFqdn();
			}
		}
	}
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：controlFqdn
 ﾓｼﾞｭｰﾙ略称	：GW認証経路による導線リスト表示制御
 ﾓｼﾞｭｰﾙ概要	：
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：2019.08.20
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function controlFqdn() {
	var form = document.mainForm;

	// 共同GWの場合、導線リストを設定する
	if (form.AgentAuth[1].checked) {

		// MSの場合、導線リストのvalueにFQDNを設定
		if (form.Enterprise[0].checked) {
			// NGW
			if (form.gwList.value == 'ngw') {
				form.fqdnList.options.length = 7;
				form.fqdnList.options[0].value = 'https://www7.hoken-gw.net';
				form.fqdnList.options[0].text = 'NTTD共同GW';
				form.fqdnList.options[1].value = 'http://www7.hoken-gw.net';
				form.fqdnList.options[1].text = '専用線アクセス時のNTTD共同GW';
				form.fqdnList.options[2].value = 'http://fed7.hoken-gw.net';
				form.fqdnList.options[2].text = 'NTTD共同GW（三生専用）';
				form.fqdnList.options[3].value = 'https://fed8.hoken-gw.net';
				form.fqdnList.options[3].text = 'NTTD共同GW（三生専用）(疎通用)';
				form.fqdnList.options[4].value = 'http://fed8.hoken-gw.net';
				form.fqdnList.options[4].text = 'NTTD共同GW（専用線、三生専用）';
				form.fqdnList.options[5].value = 'https://smt7.hoken-gw.net';
				form.fqdnList.options[5].text = 'NTTD共同GW（スマートデバイス）';
				form.fqdnList.options[6].value = 'http://xxx.net';
				form.fqdnList.options[6].text = 'その他（定義対象外）';

			// HQW
			} else if (form.gwList.value == 'hgw') {
				form.fqdnList.options.length = 1;
				form.fqdnList.options[0].value = 'https://www-t.h.netforward-gw.jp';
				form.fqdnList.options[0].text = '日立共同GW';

			// FGW
			} else if (form.gwList.value == 'fgw') {
				form.fqdnList.options.length = 1;
				form.fqdnList.options[0].value = 'https://twww.hokengw.ne.jp';
				form.fqdnList.options[0].text = '富士通共同GW';
			}

		// ADの場合、導線リストのvalueにクッキー名を設定
		} else {
			// NGW
			if (form.gwList.value == 'ngw') {
				form.fqdnList.options.length = 2;
				form.fqdnList.options[0].value = 'GW_INFO';
				form.fqdnList.options[0].text = 'NTTD共同GW';
				form.fqdnList.options[1].value = 'GWSMT_SSO_INFO';
				form.fqdnList.options[1].text = 'NTTD共同GW（スマートデバイス）';

			// HQW
			} else if (form.gwList.value == 'hgw') {
				form.fqdnList.options.length = 2;
				form.fqdnList.options[0].value = 'HIS_GW_INFO1';
				form.fqdnList.options[0].text = '日立共同GW(1)';
				form.fqdnList.options[1].value = 'HKIS_GW_INFO1';
				form.fqdnList.options[1].text = '日立共同GW(2)';

			// FGW
			} else if (form.gwList.value == 'fgw') {
				form.fqdnList.options.length = 1;
				form.fqdnList.options[0].value = 'HG_INFO';
				form.fqdnList.options[0].text = '富士通共同GW';
			}
		}
	} else {
		// 導線リストをクリア
		form.fqdnList.options.length = 0;
	}

}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：set_Event
 ﾓｼﾞｭｰﾙ略称	：事業会社画面表示処理関数
 ﾓｼﾞｭｰﾙ概要	：指定されたコンテンツタイプのURLを取得する。
			：gl_arr_Contents[ 事業会社 ][ コンテンツタイプ ] = コンテンツURL；
 引数		：arg_ContentsType		/ コンテンツ識別子
 			：arg_Division			/ 事業会社・代理店識別子
 戻値		：URL
 作成日		：2019.03.05
 作成者		：平川一
 修正		：
**********************************************************************
*/
function set_Event( arg_ContentsType, arg_Division)
{
	// 0. 初期処理
	var lo_str_ConnectServer = '';
	var lo_str_Enterprise = '';
	var lo_str_HostURL = '';
	var lo_str_Location = '';
	var lo_str_port = '';

	// 1. 状態の取得
	//  ①. 事業会社の選択状態の取得
	for( var i = document.all[ 'Enterprise' ].length; i--; ) lo_str_Enterprise = ( document.all[ 'Enterprise' ][i].checked ) ? document.all[ 'Enterprise' ][i].value : lo_str_Enterprise;

	//  ②. 環境状態の選択状態の取得
	for( var i = document.all[ 'ConnectServer' ].length; i--; ) lo_str_ConnectServer = ( document.all[ 'ConnectServer' ][i].checked ) ? document.all[ 'ConnectServer' ][i].value : lo_str_ConnectServer;

	//  ③. 接続先がローカルか判定
	if (lo_str_ConnectServer == '000') {
		lo_str_Location = 'LOCAL_' + lo_str_Enterprise;
	} else {
		lo_str_Location = 'SERVER_' + lo_str_Enterprise;

		// ポート番号の指定(クライアントモード時に使用)
		if (arg_Division == 'cm') {

			// 事業会社
			lo_str_port = ':8091';
		} else {

			// 代理店
			lo_str_port = ':8092';
		}
	}

	//  ④. コンテンツファイルパスを取得し、URLを生成
	lo_str_HostURL = gl_arr_Contents[ lo_str_Location ][ arg_ContentsType ];

	if (mode == CLIENT_MODE) {
		// クライアントモードの場合

		for (var lo_Key in gl_arr_Environment) {
			if (   gl_arr_Environment[ lo_Key ][ 'Enterprise' ] == lo_str_Enterprise
			    && gl_arr_Environment[ lo_Key ][ 'ConnectType' ] == lo_str_ConnectServer
			    && gl_arr_Environment[ lo_Key ][ 'Division' ] == arg_Division
			   ) {
				// ホスト名を取得し、URLを生成
				//lo_str_HostURL = 'http://' + lo_Key + lo_str_port + '/' + lo_str_HostURL;
				// 開発環境用 TODO
				lo_str_HostURL = location.protocol + '//' + location.host + '/' + lo_str_HostURL;
				// cookieの有効ドメインを指定
				cookieDomain = lo_Key;
				break;
			}
		}
	} else {
		// サーバモードの場合
		lo_str_HostURL = location.protocol + '//' + location.host + '/' + lo_str_HostURL;
	}

	return lo_str_HostURL;

}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：set_EventForCM
 ﾓｼﾞｭｰﾙ略称	：事業会社画面表示処理関数
 ﾓｼﾞｭｰﾙ概要	：事業会社向けにcookieを設定し、画面を表示する。
 引数		：arg_ContentsType		/ コンテンツ識別子
 戻値		：( Nothing )
 作成日		：2019.06.13
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function set_EventForCM( arg_ContentsType ) {
	// URL取得
	var url = set_Event(arg_ContentsType, 'cm');

	// 回答入力画面を表示する場合
	if (arg_ContentsType == 'MHK003') {
		var appFrmId = document.mainForm.ID;
		if (appFrmId.value) {
			if (url.indexOf('?') == -1) {
				url += '?';
			} else {
				url += '&';
			}
			url += 'ID=' + appFrmId.value;

		} else {
			alert('申込書IDが未入力です。');
			appFrmId.focus();
			return;
		}
	}

	// 閲覧システムからの遷移の場合
	if (arg_ContentsType == 'MHK004') {

		var polnum = document.mainForm.policyNumber;

		if (polnum.value) {
			url += '&021=' + polnum.value;
		} else {
			alert('証券番号が未入力です。');
			polnum.focus();
			return;
		}

	}

	// cookie設定
	setCookiesForCM();

	// 画面を開く
	window.open(url, 'TOP', 'toolbar=no,location=no,directries=no,scrollbars=no,width=900,height=640');
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：setCookiesForCM
 ﾓｼﾞｭｰﾙ略称	：事業会社向けcookie設定処理
 ﾓｼﾞｭｰﾙ概要	：事業会社用のcookieを設定する。
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：2019.06.13
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function setCookiesForCM() {
	var form = document.mainForm;

	setCookie(cookieNameUserId, form.UserID.value, EXPIRES_DAY);
	setCookie(cookieNameBukaCode, form.BukaCode.value, EXPIRES_DAY);
	setCookie(cookieNamePostCode, form.YakusyokuCode.value, EXPIRES_DAY);

	if (form.Enterprise[0].checked) {
		setCookie('access-ms', '1', EXPIRES_DAY);
	} else {
		setCookie('access-ms', '', EXPIRES_DAY);
	}

	if (form.Enterprise[1].checked) {
		setCookie('access-ad', '1', EXPIRES_DAY);
	} else {
		setCookie('access-ad', '', EXPIRES_DAY);
	}
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：setCookie
 ﾓｼﾞｭｰﾙ略称	：cooki設定処理
 ﾓｼﾞｭｰﾙ概要	：cookieを設定する。
 引数		：( Nothing )
 戻値		：( Nothing )
 作成日		：
 作成者		：
 修正		：
**********************************************************************
*/
function setCookie(cookieName, value, expiresDay) {
	var expiresDate = new Date();
	expiresDate.setDate(expiresDate.getDate() + expiresDay);

	if (cookieDomain) {
		// クライアントモードの場合、cookieの有効範囲を指定された環境のドメインにする
		document.cookie = cookieName + '=' + value + '; domain=' + cookieDomain + '; path=/';
	} else if (value) {
		document.cookie = cookieName + '=' + value + '; path=/; expires=' + expiresDate.toGMTString();
	}
}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：set_EventForAG
 ﾓｼﾞｭｰﾙ略称	：代理店画面表示処理関数
 ﾓｼﾞｭｰﾙ概要	：代理店向けにcookieを設定し、画面を表示する。
 引数		：arg_ContentsType		/ コンテンツ識別子
 戻値		：( Nothing )
 作成日		：2019.06.13
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function set_EventForAG( arg_ContentsType ) {
	// URL取得
	var url = set_Event(arg_ContentsType, 'ag');

	// 回答入力画面を表示する場合
	if (arg_ContentsType == 'MHK102') {
		var appFrmId = document.mainForm.input_applicationFormId;
		if (appFrmId.value) {
			if (url.indexOf('?') == -1) {
				url += '?';
			} else {
				url += '&';
			}
			url += 'ID=' + appFrmId.value;

		} else {
			alert('申込書IDが未入力です。')
			appFrmId.focus();
			return;
		}
	}

	// cookie設定＆画面を開く
	openWindowForAG(url);

}

/*
**********************************************************************
 ﾓｼﾞｭｰﾙ番号	：
 ﾓｼﾞｭｰﾙ名称	：openWindowForAG
 ﾓｼﾞｭｰﾙ略称	：代理店画面表示処理関数
 ﾓｼﾞｭｰﾙ概要	：代理店用のcookieを設定＆HTTPヘッダに必要な情報を付与し、
			：不備一覧画面を非同期通信で呼び出す。
			：不備一覧画面documentより、hubssesidを取得し、
			：index.htmlを表示するときのクエリストリングに設定する
 引数		：url	index.htmlオープン用のURL
 戻値		：( Nothing )
 作成日		：2019.06.13
 作成者		：岡野庄平
 修正		：
**********************************************************************
*/
function openWindowForAG(url) {
	var form = document.mainForm;

	setCookie(cookieNameUid, form.input_uid.value, EXPIRES_DAY);
	setCookie(cookieNameInputUid, form.input_inputUid.value, EXPIRES_DAY);
	setCookie(cookieNameParam005, form.input_param005.value, EXPIRES_DAY);

	// param030は「ID,PW」形式のため入力がある場合はそれを再現（後続でID部のみ使用する）
	var editParam030 = form.input_param030.value;
	if (editParam030 == ',' || editParam030 == '') {
		editParam030 = ''
	} else {
		editParam030 = editParam030 + ',';
	}

	setCookie(cookieNameParam030, editParam030, EXPIRES_DAY);


	// URLにクエリストリングhubsessidを付与するため編集
	if (url.indexOf('?') == -1) {
		url += '?';
	} else {
		url += '&';
	}

	// ローカル環境であるか判定
	var isLocal = (url.indexOf('local') !== -1);

	// 開発端末のIEバージョンに応じた機能を使用
	var agent = window.navigator.userAgent.toLowerCase();

	var isIE11 = (agent.indexOf('trident/7') !== -1);

	if (isIE11) {
		// IE11
		var urlForXHR = '';

		if (isLocal) {
			urlForXHR = url;
		} else {
			urlForXHR = '/mhkagwa11/AMC22?gamid=AMC22&gamcd=AMC00';
		}

		// Needs1の場合、xhr.open前にクエリストリングを付与
		if (form.AgentAuth[2].checked && form.needs1.checked) {
			// needs1
			if (isLocal) {
				urlForXHR += 'DTZ0050=ND';
			} else {
				urlForXHR += '&DTZ0050=ND';
			}

		}

		var xhr = new XMLHttpRequest();
		xhr.open("POST", urlForXHR);

		// MS
		if (form.Enterprise[0].checked) {
			// ICEWALL
			if (form.AgentAuth[0].checked) {
				setCookie('MS_AG_INFO', 'xxxxxxx', EXPIRES_DAY);

			// GW
			} else if (form.AgentAuth[1].checked) {

				// HGW
				if (form.gwList.value == 'hgw') {
					xhr.setRequestHeader('gw_host', form.fqdnList.value);

				// NGW／FGW
				} else {
					xhr.setRequestHeader('gw-host', form.fqdnList.value);
				}

			// DL
			} else {
				setCookie('MSI_IW_INFO', 'xxxxxxx', EXPIRES_DAY);
			}

		// AD
		} else {
			// ICEWALL
			if (form.AgentAuth[0].checked) {
				setCookie('AD_AG_INFO', 'xxxxxxx', EXPIRES_DAY);

			// GW
			} else if (form.AgentAuth[1].checked) {
				setCookie(form.fqdnList.value, 'xxxxxxx', EXPIRES_DAY);

			// DL
			} else {
				setCookie('AD_DL_INFO', 'xxxxxxx', EXPIRES_DAY);
			}

			// 日本生命
			if (form.nissei.checked) {
				setCookie('AD_TS_INFO', 'xxxxxxx', EXPIRES_DAY);
			}
		}



		xhr.setRequestHeader("uid", form.input_uid.value);
		xhr.setRequestHeader("input_uid", form.input_inputUid.value);
		xhr.setRequestHeader("param005", form.input_param005.value);
		xhr.setRequestHeader("param030", editParam030);

		xhr.responseType = "document";

	    xhr.addEventListener("load", function(ev) {
	    	// 非同期通信後の戻り値であるdocumentからhubsessidを取得し、クエリストリングに設定
	        url += 'hubsessid=' + xhr.responseXML.getElementById("hubsessid").value;
	        window.open(url, 'TOP', 'toolbar=no,location=no,directries=no,scrollbars=no,width=900,height=640');
	    });

	    xhr.send();

	} else {
		var urlForJSP = '';
		var jspPath = 'dummy_mhk_agent.jsp';
		if (isLocal) {
			urlForJSP = url;

		} else {
			var prtclHost = location.protocol + '//' + location.hostname + ':' + location.port + '/';
			var pathname = '';

			if (url.indexOf('?ID=') !== -1) {
				pathname = 'AMC23?gamid=AMC23&gamcd=AMC00&' + url.slice(url.indexOf('?ID=') + 1);
			} else {
				pathname = 'AMC22?gamid=AMC22&gamcd=AMC00';
			}

			urlForJSP = location.protocol + '//' + gl_arr_Environment[location.hostname]['ip'] + ':' + location.port + '/mhkagwa11/' + pathname;
			jspPath = prtclHost + 'mhkagwa11/' + jspPath;
		}


		// urlの特定部分が除去されるため編集
		setCookie('url', urlForJSP.replace(/\?/g, '%query%').replace(/=/g, '%equal%').replace(/&/g, '%ampersand%')
				.replace(/:/g, '%colon%'), EXPIRES_DAY);
		// ダミーjsp呼び出し
		window.open(jspPath, 'TOP', 'width=900,height=640,status=yes');
	}
}





/*
**********************************************************************
// 【Debug用ﾒｿｯﾄﾞ（引数：DOMを確認したいｵﾌﾞｼﾞｪｸﾄ）】
//	var lo_obj_Target = document.all[ 'Enterprise' ][ 0 ];
//	document.all[ 'Debug' ].innerHTML = get_DOM( lo_obj_Target );
//	alert( 'Target = ' + lo_obj_Target );
**********************************************************************
*/
function get_DOM( arg_Object )
{
	// 0. 初期処理
	// 　①. 操作対象の設定
//	var lo_obj_Object = event.srcElement;	// ｲﾍﾞﾝﾄが発生したｴﾚﾒﾝﾄを操作したい場合。
	var lo_obj_Object = arg_Object;			// 引数で取得したｵﾌﾞｼﾞｪｸﾄを操作したい場合。

	// 　②. 改行文字の設定
 	var lo_str_CrRf = '<br>'; 				// 画面に出力したい場合。
//	var lo_str_CrRf = '\n'; 				// MessageBoxに出力したい場合。

	// 　③. 初期化処理
	var lo_str_DOM_tmp = '';


	// 1. ｵﾌﾞｼﾞｪｸﾄ操作（再帰しない場合）
	for( var lo_str_Property in lo_obj_Object )
	{
		// ﾌｫｰﾏｯﾄ： [ ﾌﾟﾛﾊﾟﾃｨ名 ] = ﾌﾟﾛﾊﾟﾃｨ値 + 改行
		lo_str_DOM_tmp += '[ ' + lo_str_Property + ' ] = ' + lo_obj_Object[ lo_str_Property ] + lo_str_CrRf;
	}

	// 2. ｽﾃｰﾀｽﾊﾞｰに出力する。
	// window.status = document.body.scrollTop + event.clientY;


	// 3. 終了処理
	// 操作情報を返却する。
	return lo_str_DOM_tmp;
}