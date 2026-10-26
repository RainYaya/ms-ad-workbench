### BLK-SHR-BF46F797  (first seen in AZ-230-01-042 rows 47..47)
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast ToDo連携テーブル sel="input[name='update']" val="" NOTE:非浏览器=真機人工（AP/DBログ・テーブル確認） / ToDo連携区分確認

### BLK-AUTO-10E5C587  (first seen in AZ-230-01-043 rows 26..30)
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 代理店連携 sel="input[name='updateAgentNotify']" val=""
  - [wait] click OK sel="" val="" NOTE:OKダイアログ=自動承認
  - [assert] ast メッセージ確認 sel="#message_area" val="" NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）
  - [assert] ast 画面確認 sel="input[name='update']" val=""
  - [assert] ast ToDo連携テーブル sel="input[name='update']" val="" NOTE:ToDo連携テーブル=非浏览器=真機人工

### BLK-AUTO-18958C37  (first seen in AZ-230-01-043 rows 40..44)
  screen=AZG200 file=block-selectors-az-list-slice.json
  - [goto] goto start screen 不備一覧 sel="" val=""
  - [fill] input 部店課支社コード sel="#section_code" val="params.sectionCode"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 遷移 不備内容入力画面(更新) sel="input[name='update']" val=""

### BLK-AUTO-559E7D1D  (first seen in AZ-230-01-043 rows 45..47)
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 更新 sel="input[name='update']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val=""
  - [assert] ast ToDo連携テーブル sel="input[name='update']" val="" NOTE:ToDo連携テーブル=非浏览器=真機人工

### BLK-SHR-B3B9104B  (first seen in AZ-230-01-044 rows 29..34)
  screen=AZG200->AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="{params.policyNo}"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 検索結果表示 sel="#gyoumu_list" val=""
  - [assert] ast 検索結果行 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast 画面確認 sel="input[name='update']" val=""

### BLK-SHR-3F6DEDE2  (first seen in AZ-230-01-045 rows 21..21)
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 連絡 sel="#agent_deal_flag_2" val=""
  - [assert] ast 確認済表示 sel="input[name='updateAnswer']" val="" NOTE:依頼区分=連絡 で回答ボタンが確認済に変わる

### BLK-SHR-EBEB83B0  (first seen in AZ-230-01-045 rows 26..34)
  screen=AZG200->AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [fill] input 証券番号 sel="#policy_number" val="{params.policyNo}"
  - [click] click 検索 sel="#select" val=""
  - [assert] ast 検索結果表示 sel="#gyoumu_list" val=""
  - [assert] ast 検索結果行 sel="#gyoumu_list tr" val=""
  - [click] click No sel="a[name='link']" val=""
  - [assert] ast ToDo連携テーブル レコード無し sel="input[name='update']" val="" NOTE:ToDo連携テーブル=非浏览器=真機人工
  - [click] click 完了取消 sel="input[name='cancelCompleteDate']" val=""
  - [assert] ast メッセージ確認 sel="#message_area" val="" NOTE:メッセージ内容=真機人工（mockはメッセージ枠のみ）

### BLK-AUTO-4C432C14  (first seen in AZ-230-01-045 rows 35..36)
  screen=AZG101 file=block-selectors-az-update4.json
  - [assert] ast 確認dialog後 sel="input[name='update']" val="" NOTE:OK=JS confirm auto-accept

### BLK-SHR-7A684D49  (first seen in AZ-230-01-045 rows 42..42)
  screen=AZG101 file=block-selectors-az-update-slice.json
  - [goto] goto start screen sel="" val=""
  - [click] click 照会 sel="#agent_deal_flag_1" val=""
  - [assert] ast 回答表示 sel="input[name='updateAnswer']" val=""

### BLK-SGL-9EBB1470  (first seen in AZ-230-01-045 rows 70..75)
  screen=不備一覧(AMA07)→不備内容入力画面-更新(AMA04) file=block-selectors-batch-slice.json
  - [assert] ast ToDo連携バッチ実行＋確認 sel="form#mhk_MHKPRForm" val="" NOTE:ToDo連携データ作成バッチ実行/確認=非浏览器=真機人工（mockは画面在位で代理）
  - [goto] goto 不備一覧 sel="" val=""
  - [fill] input 部店課支社 sel="#section_code" val="params.sectionCode"
  - [assert] ast 表示 不備一覧画面 sel="#gyoumu_list a" val=""
  - [click] click No sel="#gyoumu_list a" val=""
  - [assert] ast 遷移 不備内容入力画面-更新 sel="#update" val=""

### BLK-SGL-F1E0B9E5  (first seen in AZ-230-01-047 rows 71..72)
  screen=BATCH(ToDo連携データ作成) file=block-selectors-batch-slice.json
  - [assert] ast JP1バッチ実行＋ToDo連携テーブル確認 sel="#act001to100, form#mhk_MHKPRForm" val="" NOTE:バッチ実行＋ToDo連携テーブル(レコード無し)=非浏览器=真機人工（mockは画面在位で代理）

### BLK-SHR-EB3D34F4  (first seen in AZ-230-01-050 rows 52..52)
  screen=AMB/AMA04 file=block-selectors-ay-form-slice.json
  - [goto] goto start screen sel="" val=""
  - [assert] ast ToDo連携テーブル/APログ/FAZZ000A011 sel="input[name='update']" val="" NOTE:ToDo連携区分/AP_AZB022.log/FAZZ000A011=非浏览器=真機人工（mockは不備内容入力画面在位で代理）

