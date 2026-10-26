// 入力チェック連想配列
var inputCheck = {
 '100': [checkUnit1, checkCorrelation1]
,'101': [checkUnit1, checkCorrelation1, checkInquiryCount]
,'102': [checkUnit1, checkCorrelation1]
,'103': [checkUnit1, checkCorrelation1]
,'110': [checkUnit1, checkCorrelation1]
,'111': [checkUnit1, checkCorrelation1, checkInquiryCount]
,'112': [checkUnit1, checkCorrelation1]
,'113': [checkUnit1, checkCorrelation1]
,'120': [checkUnit1, checkCorrelation1]
,'121': [checkUnit1, checkCorrelation1, checkInquiryCount]
,'122': [checkUnit1, checkCorrelation1]
,'123': [checkUnit1, checkCorrelation1]
,'131': [checkUnit1, checkCorrelation1, checkBusinessAnswer]
,'132': [checkUnit1, checkCorrelation1, checkBusinessAnswer]
,'1400': [checkUnit1, checkCorrelation1, checkComplete]
,'1401': [checkUnit1, checkCorrelation1, checkComplete]
,'1402': [checkUnit1, checkCorrelation1, checkComplete]
,'1410': [checkUnit1, checkCorrelation1, checkInquiryCount, checkComplete]
,'1411': [checkUnit1, checkCorrelation1, checkInquiryCount, checkComplete]
,'1412': [checkUnit1, checkCorrelation1, checkInquiryCount, checkComplete]
,'1413': [checkUnit1, checkCorrelation1, checkBusinessAnswer, checkComplete]
,'1420': [checkUnit1, checkCorrelation1, checkComplete]
,'1421': [checkUnit1, checkCorrelation1, checkComplete]
,'1422': [checkUnit1, checkCorrelation1, checkComplete]
,'1423': [checkUnit1, checkCorrelation1, checkBusinessAnswer, checkComplete]
,'1430': [checkUnit1, checkCorrelation1, checkComplete]
,'1431': [checkUnit1, checkCorrelation1, checkComplete]
,'1432': [checkUnit1, checkCorrelation1, checkComplete]
,'200': []
,'201': [checkInquiryCount]
,'203': []
,'210': []
,'211': [checkInquiryCount]
,'212': [checkAgentInquiryCount]
,'213': []
,'221': [checkInquiryCount]
,'222': [checkAgentInquiryCount]
,'231': [checkAgentAnswer]
,'232': [checkAgentAnswer]
,'2400': []
,'2401': []
,'2410': [checkInquiryCount]
,'2411': [checkInquiryCount]
,'2412': [checkInquiryCount]
,'2413': [checkAgentAnswer]
,'2421': [checkAgentInquiryCount]
,'2422': [checkAgentInquiryCount]
,'2423': [checkAgentAnswer]
,'2430': []
,'2431': []
,'1copyRegist': [checkUnit2, checkCorrelation2]
};

// 単項目チェック1（コピー登録以外）
function checkUnit1() {
    return checkUnit(false);
}

// 単項目チェック2（コピー登録）
function checkUnit2() {
    return checkUnit(true);
}

// 相関チェック1（コピー登録以外）
function checkCorrelation1() {
    return checkCorrelation(false);
}

// 相関チェック2（コピー登録）
function checkCorrelation2() {
    return checkCorrelation(true);
}

// 営業回答済チェック
function checkBusinessAnswer() {
    return checkAnswer1();
}

// 代理店回答済チェック
function checkAgentAnswer() {
    return checkAnswer2();
}

//代理店照会件数チェック
function checkAgentInquiryCount() {
    return checkAgentInquiryCountFunc();
}

//照会件数チェック
function checkInquiryCount() {
    return checkInquiryCountFunc();
}

// 完了登録チェック
function checkComplete() {
    return checkCompleteFunc();
}