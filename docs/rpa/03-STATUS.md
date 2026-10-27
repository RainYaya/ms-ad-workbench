# 当前进度 / 下一步

> 最后更新：2026-10-27

## 一句话（2026-10-27 深夜）

全量生成跑通了：1,386 本里 139 本可以只靠 `auto/confirmed` 绑定 + 别紙值直接生成，
L0 **139/139**（0 error 且步数 = 手顺行数），另有 8 本手写流程；`AY-120-08-001` 在 mock 上实跑
8 done / 5 pending / 0 failed。剩下 1,247 本不是失败，而是卡在三类明确原因上，
逐本写在 `flows/books-status.json`；其中 215 条待确认绑定可在 Studio 的
「绑定」页逐条点选。没有一条是"猜"出来的。

2026-10-27 用 AZ-110-05-008 的实机 DOM 做了第一轮对齐：确认 3 条绑定（保険種類、
两处「....」按钮），生成本从 122 升到 130；新增真机路由表（`ui-screens.json` 的 `routes`）、
`--login` / `--start-url` 和只读对齐工具 `tools/align_capture.py`。详见
[15-CHAIN.md](15-CHAIN.md) 第 5.1 节。

**验收轮（AZ-110-05-008 整本）**：只拿手顺 + 别紙 + 实机 DOM，从头生成了 42 步的
`flows/books/AZ-110-05-008.yaml`，`check-flow` 0 error / 42 行全覆盖；再用
`check-patch --flow … --capture capture-20261028` 在真实页面里逐个校验，**53/53 个
selector 都恰好命中 1 个可见元素**。过程中暴露的缺口（不是绿灯）记在
[16-LANGUAGE.md](16-LANGUAGE.md) 与本节末尾：row 32 需要本别覆盖（登録直后的空行没有锚点值）、
6 处别紙「表示内容」仍是 pending、項目名検索 的列表框只能在运行期解析、訂正内容確認 的
20 行空白行按手顺固定第 1 行。

同轮落地：**语言规范**（`16-LANGUAGE.md`，可整篇交给外部 AI）、**Add Control**
（`add-control.mjs` + `check-patch.mjs`：粘贴真实元素 → 校验 → 写控件补丁）、
**演示模式**（`run-flow --demo`：页面横幅 + 目标红框 + 可调停留 + Space 暂停）。

**第二本验收（AZ-110-01-009，外部 AI 模拟）**：只给规范 + 手顺 14–57 + 别紙 1–8 +
实机 capture，产出 `flows/tests/AZ-110-01-009.ai.yaml`（44 步 / 44 行，0 error）。
真实 DOM 校验 54 个 selector：**OK 51 / ANCHOR 3 / PENDING 1 / errors 0**。同一 capture 下
对照发现手写本 row 42/43/48 没写行锚点（row 42 还把 `value: true` 当锚点）→ 已按 AI 写法
修正，修正后两边同为 0 error / 3 ANCHOR。规程见
[18-EXTERNAL-AI.md](18-EXTERNAL-AI.md)。这轮同时改了抓取后的交接方式：
`make-pack.mjs` 生成可粘贴的包；`--capture` 支持手工 HTML 目录；`check-patch` 用
`ANCHOR` 区分「selector 错」与「锚点不在这份数据里」。

关键修正：**操作行的画面来自 `functionName` 列向下继承**，不是从 `遷移` 行反推
（ADR-0006）。这一条把"画面不明"的行从 1,843 降到 0，绑定规则从 455 降到 409。
另两条同批修正：绑定表开始应用 `ui-aliases.json` 里的**显式同义词**（課支社コード → 部店課支社ｺｰﾄﾞ 等，19 条）；别紙里的「その他項目は別紙参照」按**未解析**处理并阻塞该本（162 本），不再生成"只填一半输入"的流程。`tools/derive_screen_chain.py` 的画面派生率从 91.2% 升到 100%。

## 本阶段产出

| 产出 | 状态 | 说明 |
|---|---|---|
| `tools/build_controls.py` | ✅ | 54 画面 / 1,998 控件；含 checkbox/radio/textarea/link/file/dialog |
| `tools/build_bindings.py` | ✅ | 519 条规则：template 169 / field 110 / directive 25 / rowlink 28 / explicit 151 / no-screen 36 |
| `tools/generate_books.py` | ✅ | 手顺 + 别紙 + 绑定 → `flows/books/*.yaml`；阻塞必带原因 |
| `tools/report.py` | ✅ | L0/L1/L2 报告 → `docs/rpa/14-REPORT.md` |
| `flows/overrides/` | ✅ | 本别覆盖：skip/manual/capture/valueFrom/binding，拒绝 `expect` |
| `studio/` | ✅ | 预览 mock 画面、悬停高亮、点选即绑定、待确认队列、列表含 139 本；Pages 上有只读快照（`tools/build_studio_pages.py`） |
| `16-LANGUAGE.md` | ✅ | 自包含语言规范：手顺 + 真实页面 → 能跑的流；外部 AI 可直接用 |
| `add-control.mjs` / `check-patch.mjs` | ✅ | 粘贴真实元素 → 生成/校验控件补丁；用真实 DOM 逐个校验流程 selector |
| `run-flow --demo` | ✅ | 演示模式：页面横幅 + 目标红框 + `--demo-delay` + Space 暂停 |
| `17-USAGE.md` | ✅ | 使用说明（唯一入口）：启动、六类日常操作、出错先看哪 |
| `make-pack.mjs` | ✅ | capture → 可粘贴的包（清单 + 清洗 HTML 分块）；外部 AI 交接的标准格式 |
| `make-brief.mjs` | ✅ | 一本 → `brief/<本>/*.txt`，直接上传网页 AI（规则/手顺/索引/HTML/提示词）；纯 Node |
| `save-clip.ps1` | ✅ | 把 Copilot 回的 YAML 从剪贴板存成 UTF-8 文件，去掉代码围栏 |
| `19-REAL-MACHINE.md` | ✅ | 在实机电脑上一条龙：抓页面 → 打材料包 → Copilot → 校验 → 跑 |
| `18-EXTERNAL-AI.md` | ✅ | 外部 AI 生成流程的测试手顺 + AZ-110-01-009 验收记录 |
| ADR 0001–0007 | ✅ | 四层真值 / 两种身份 / 绑定表 / 闭集原语 / 三级完成 / 画面来源 / 值来源 |

## 上一阶段（保留）

### 一句话

009 已经从 YAML 在 mock 上跑完全部 45 步：0 failed / 0 skipped，
29 步已验证，16 步是**未解析的别紙引用 / mock 无报文**，如实记 pending。
AY-110-01-001（例外系）行 14–28 同样跑通（11 done / 5 pending / 0 fail），
行 29 点「申請依頼」没有弹出选择画面（别紙与 reference 校验矛盾），行 30 如实失败。
AZ-240-01-001（帳票出力/PDF）14 步全过：9 done / 5 pending / 0 failed。
AY-120-08-002（更新系）10 步：6 done / 4 pending / 0 failed。
AZ-150-05-001（バッチ）mode: external，3 步 pending（mock では検証不能）。
4 種類の本（登録/例外/帳票出力/更新/バッチ）が同じ格式で書けることを確認済み。
下一步是拿真机确认这些 pending，再复制到其他类型的本。

## 已完成（可运行）

| 产出 | 状态 | 说明 |
|---|---|---|
| `docs/rpa/11-KERNEL.md` | ✅ 定稿 | 17 原语、4 定位策略、5 值来源、失败协议 |
| `tools/derive_screen_chain.py` | ✅ 跑过 | 1,386 本 / 18,966 操作行 / **100%** 能派生画面（ADR-0006） |
| `reports/screen-chain.json` | ✅ 生成 | 每本每行 before/after 画面 |
| `tools/extract_guards.py` + `guards.json` | ✅ 跑过 | 601 条：32 前置 / 569 校验，27 画面 |
| `ui-screens.json` | ✅ 50/50 映射 | 未定的显式 `status: unknown`，不猜 |
| `automation/node-runner/flow-loader.mjs` | ✅ | 新 schema、env/case/sys 值、T1–T3、pendingRuntime |
| `automation/node-runner/check-flow.mjs` | ✅ | 离线检查：画面链 / 覆盖 / 目标 / 值来源 / expect 类型 |
| `automation/node-runner/run-flow.mjs` | ✅ | 17 原语、证据、失败交互、shell 断言、行 index 运行时解析 |
| `flows/AZ-110-01-009.yaml` | ✅ 跑通 | 45 步 / 34 值 / 0 error |
| `flows/env/prod-a.yaml` | ✅ | 环境值（部店課支社コード / 代理店コード） |

### 009 离线检查

```
steps 45  handRows 44  targets 51
errors 0  warnings 1  pending 22
WARN row 14: 起始画面不在手顺遷移里（输入，不派生）
```

### 009 mock 实跑（2026-10-27）

```
done 29  pending 16  failed 0  skipped 0
pending:
  行 15/18/23/35/44/50  別紙「初期値」
  行 21/29              別紙「選択内容」
  行 31/33/38/41/47/53/57  別紙「表示内容N」
  行 55                 messageIs MAZG101W047（mock 无此报文）
```

- 0 failed 说明流程与参数正确：每一步都在正确画面、控件可见可用、写入值回读一致。
- 行 29 在「表示内容」未解析的情况下，仍额外验证了弹窗回填：
  `募集人ID = 3028004586`（`{"label":"募集人ID","actual":"3028004586"}`）。
- 16 pending 不是失败，是**未验证**；不许算通过，也不许改断言让它变绿。
- mock 只证明「操作链正确」，不证明「业务报文/DB 结果正确」。

## 这一轮修掉的真实问题（按权威顺序查代码得到）

| 位置 | 问题 | 依据 |
|---|---|---|
| 行 16 | 漏填 `回答締切日`（reminder_date）和 `計上状態`，`formValidate` 静默返回 false，登録不跳转 | `AMA03.html formValidate` / `isRequired` |
| 行 34/39 | 缺少 `popup: true`，chooseRow 在主页面找弹窗的行 | 运行日志 |
| 行 39 | 結果是 `<select size=10>` 的 option，不是 tr | `AMA13.html` |
| 行 42/43/48 | 行内控件 name 带 `{n}`，全页有 0..19 个 index；按「唯一 index / 唯一可见行 / 上一步解析出的行」确定 | `reference/.../AMA04.html` 1992/1997 行 |
| 行 45 | 画面标签是「編集照会内容」，不是「照会内容」 | `AMA15.html` textarea |
| 行 51 | 「確認日・確認時刻」是一个标签 6 个控件；訂正内容 name 是 `correct_contents` | `reference/.../AMA19.html` 298–304/350–353 行 |
| 行 52 | 登録按钮在 mock 被条件冻成不可见 | `reference/.../AMA19.html` 46–50 行 |
| mock 保真 | AMA04 可见行的 checkbox / 「修」按钮丢 name；AMA19 訂正输入框丢 name | 同上，已按 reference 补回 |

## 同模板 4 本验证（2026-10-27）

AZ-110-01-009～012 是同一模板、同一 45 步流程，只有参数不同。
用同一份 flow 结构生成 4 个文件，分别 check + mock 跑：

| 本 | 種目 / 保険種類 / 明細 | 结果 |
|---|---|---|
| 009 | 自賠責 / 00：自賠責 / 0000000009 | ✅ 29 done / 16 pending / 0 fail |
| 010 | 貨物 / 02：国内貨物総合保険 / 0000000010 | ✅ 29 done / 16 pending / 0 fail |
| 011 | 種目共通 / 00：種目共通 / 0000000011 | ❌ 行 30 登録不跳转 |
| 012 | その他 / 00：その他 / 0000000012 | ❌ 行 30 登録不跳转 |

**011 的失败是值不对，不是流程不对。** 运行时读到的画面状态：

```
input_type_list.selected = 2 (現地)
large_item_list.selected = Z (種目共通)
```

`reference/webapps/AMB/.../AMA03.html` 第 301–307 行明确规定：
大種目 `Z` 时入力区分必须是 `5`(機械) 或 `7`(機械(他))，否则 `formValidate` 返回 false。
`large_item=0`（その他）同理，要求入力区分 `9`（その他）。
别紙写的都是「現地」，所以 011/012 按现参数**根本登不进去**。

**处理方式**：不改 flow、不改 mock、不放宽断言。
这 4 本需要人去确认：是别紙的入力区分写错，还是这两本本来就是异常系。
在确认之前，011/012 的 flow 保留为「会正确失败」的证据。

这组对照同时证明了两件事：
1. 流程正确 + 值正确 → 同一套步骤能直接复用（009/010）。
2. 值不正确 → 内核会在正确的步骤报错，不会把 mock 绿当成成功（011/012）。

## AY-110-01-001（例外系 / 不同业务线）验证（2026-10-27）

`flows/AY-110-01-001.yaml`。28 行手顺 / 4 画面：
ANA01 メニュー → ANA02 取消計上申請登録 → ANA03 申請・確認更新
→ popup ANA10 担当者検索 / ANA11 送信先(写)選択。

| 检查 | 结果 |
|---|---|
| check-flow | 0 errors / 28 steps / 34 targets / 8 pending |
| mock 行 14–28 | 11 done / 5 pending / 0 failed / 0 skipped（行 29 点击成功但未弹窗） |
| mock 行 29– | ❌ 行 30 找不到送信先(写)選択画面（见下），不是流程错误 |

行 26 是这一本的真实验证点：popup 选人后，`申請依頼先 = 課支社長`
回填到 ANA03（`#req_applicant_name`），并作为 `fieldIs` 断言通过。

### 新增的定位形状（已进内核/字典）

1. **1 个标签 = 2 个 radio**（代理店への募集状況の確認要否）：
   `ui-rowfields.json` 用 `choices: {必要: #..., 不要: #...}`，按选择项文字选中。
2. **结果表「NO」**：不是文本按钮，是 No. 列的 `<a onclick=...>`。
   放进字典（ANA10 `popupCloseNo` / ANA11 `selectNo`），
   `chooseRow` 对 selector 型目标要求**恰好 1 个**匹配，多行就报错。
3. **同画面同名按钮 3 个**（申請依頼）：字典保留 DOM 顺序第一个；
   隐藏的候选项会在点击时因不可见而失败，不会被静默点中。
4. **同一标签跨画面不同值**（氏名）：`fillAll` 的项可以写
   `{label: 氏名, value: "${case.担当者氏名}"}`。
5. **断言也查字典**：`fieldIs` / `screenIs` 先用 overlay/字典的精确 selector，
   查不到才退回 T2 标签扫描。

### 已知矛盾（未改值、未改断言绕过）

- 别紙 行 25：`保険始期日と届出日の関係 = 届出日は始期日以降　<ルールに則り、保険契約者ヒアリング不要>`
- `reference/webapps/ANB00/.../ANA03.html` 1350–1353 行：
  `届出日 >= 始期日` 且 `value == '1'` → `MAYG101W059` 相関エラー。
- 同 1361 行以降：`value == '2'` → 契約者ヒアリング実施日/方法/実施者… が必須。
- 别紙の表示内容2 では、そのヒアリング項目はすべて「空白」。
- **所以 value=1 和 value=2 都不通**。第三个值是否存在、或别紙日期是否写反，
  需要在真机/书主确认。

处理：行 19 的该字段保持未填，`expect.ref` 记 unresolved；
行 29 点「申請依頼」时 `formValidate` 静默返回 false，不弹窗；
行 30 的 `screenIs` 如实失败。这是**别紙的问题**，不是 runner 的问题。

### mock 保真调整（只对齐数据，不放宽断言）

- ANA02/ANA03 的选项数据：大種目「自動車」、保種「11：クルマの保険/…」、
  証券送付区分/変更確認書送付「直送」、異例取扱理由 A、具体的内容。
- ANA03 的「更新」不提交（`return false`）：mock 没有 session 存储，
  重新渲染会把已输入内容清空，后续按钮就按空值校验。
  保持 DOM 等价于「同一画面再表示、输入值保留」。
- ANA10 的结果行氏名改为「課支社長」，与别紙 操作内容3 / 表示内容2 一致。

## AZ-240-01-001（帳票出力 / PDF ダウンロード）验证（2026-10-27）

`flows/AZ-240-01-001.yaml`。14 行手顺 / 2 画面 + 2 周回：
AMC22 代理店 不備一覧（検索→No.リンク）→ AMC23 代理店 不備内容入力（更新）
→ 印刷(PDF) → 一覧画面 → 同じ流れをもう一度（明細番号だけ違う）。

| 检查 | 结果 |
|---|---|
| check-flow | 0 errors / 14 steps / 11 targets / 5 pending |
| mock 全 14 步 | 9 done / 5 pending / 0 failed / 0 skipped |
| pending | 表示内容1/2、出力結果1/2、入力内容1の検索結果（いずれも未解析/mock不能） |

这是**第三种类型**（帳票出力），验证了内核在没有新增原语的情况下能表达：

1. **同一画面反复**：同じ fillAll/検索/chooseRow を 2 周。値だけ違う。
2. **popup ではない遷移**：No.リンク → 詳細画面 → 一覧に戻る → また検索。
3. **downloadIs**：`expect.download.ext: pdf`。mock は download を返さないので pending。
   真機では PDF を `logs/<case>-flow/NNN_<file>` に保存し、bytes/sha256 を run.json に残す。
4. **出力 DL と別紙引用の併記**：`downloadIs` に `expect.ref` を書くと、
   ファイルが落ちても内容が未解析なら pending のまま（download だけでは合格にしない）。

### 发现并修掉的两个真问题（都是代码，不是本的问题）

| 位置 | 问题 | 依据 |
|---|---|---|
| `derive_screen_chain.py` | 行 20 按「一覧画面」回到 AMC22、行 21 用**表示**确认「代理店 不備一覧画面」，但派生规则只看 `遷移`，导致行 22–24 仍被判成 AMC23 | AZ-240 手顺 20–24 行 |
| `run-flow.mjs codeFromUrl` | URL `/AMC00/AMC22.html` 取到目录名 `AMC00`，`screenIs` 全错（反过来 `/AMA18/aZG905Search` 的代码在目录里） | 实际运行日志 |

修法：

- 派生规则增加一条：`表示` 行的 `verificationItem` **精确/变体命中** `ui-screens.json`
  的已知画面时，也更新当前画面。未知名不匹配、不做模糊兜底。
  全量覆盖 90.9% → **91.2%**（17,234 → 17,294 行），unknown initial 72 → 66 本。
  已回归 009/010/011/012/AY：全部 0 error，步数不变。
- `codeFromUrl` 先取**文件名**（`AMC22.html` → AMC22），文件名没有代码时再取
  路径第一段（`/AMA18/aZG905Search` → AMA18）。两条实际形状都覆盖。

### 新增字典项（都有出处）

- `AMC00/AMC22`: 証券番号 `#policy_number`、明細番号 `#sub_policy_number`、
  結果行のNo. `#link_tag`（status: **mock-only**；mock 以外の複数行 id 未確認）。
- `AMC00/AMC23`: `一覧画面` → `#act104to22`（status: **alias**；画面の表示は
  「不備一覧」。mock-routes の aZG104To22 も同じ対応）。
- `ui-screens.json`: `代理店 不備内容入力画面-更新`（半角-）を追加。
  手顺書は全角（）と半角-が混在し、`norm()` では同一にならないため。

### まだ真机で確認すること

- `#link_tag` が真機の検索結果でも行リンクとして使えるか（複数行時の id/name）。
- AMC23 の「一覧画面」ボタンの実ラベル。
- PDF のファイル名・出力内容（別紙【出力結果】は appendix にシートが無い）。
  なお `run-flow.mjs` の「download を保存して sha256 を記録」は mock では
  発火しないため**未検証**。真機で最初に確認する。
- 表示内容1/2 の 21 項目（hidden input で確認できる見込み）。

## AZ-150-05-001（バッチ / ブラウザ外）验证（2026-10-27）

`flows/AZ-150-05-001.yaml`。3 行だけの本：バッチ実行 → 操作結果 → APログ。
全 1,386 本中 **38 本**がこの形（画面操作なし、バッチ/DB/メールのみ）。

| 检查 | 结果 |
|---|---|
| check-flow | 0 errors / 3 steps / 0 targets |
| mock（--yes） | 0 done / 3 pending / 0 failed |

これは新しい原語ではなく、既に決めていた `manual` + `externalIs` を
**画面なしの本でも書けるようにしただけ**（`mode: external`）。

- ブラウザを開かない（`start` も `on` も不要）。
- `check-flow` は画面チェーンの代わりに、`manual` / `externalIs` / `capture` /
  `waitUntil` 以外をエラーにする。
- mock では全部 pending。人が実行して結果を見る本なので、mock 緑にはならない。

これで目標の「4 本不同类型」は 登録系（009/010）/ 例外（AY）/ 帳票出力（AZ-240）
/ バッチ（AZ-150）が揃った。純粋な「更新系」の本はまだ（AY-100-07 など）。

## AY-120-08-002（更新系）验证（2026-10-27）

`flows/AY-120-08-002.yaml`。10 行：
異例取扱管理メニュー → 照会・検索(ANA05) → No.リンク → 申請・確認更新(ANA03)
→ 異例取扱理由と具体的内容を直して「更新」。

| 检查 | 结果 |
|---|---|
| check-flow | 0 errors / 10 steps / 8 targets / 4 pending |
| mock | 6 done / 4 pending / 0 failed / 0 skipped |
| pending | 初期値、検索結果、表示内容1、表示内容2 |

这是第一种**纯更新**的本：不新建记录，检索已有记录、改两个字段、更新。
新增的定位形状：

1. **No. リンクに id が無い**：`<a name="link101" onclick=...>`。
   字典用 `#gyoumu_list a[name="link101"]`，`chooseRow` 仍要求恰好 1 个。
2. **既存レコードの更新**：mock の ANA03 は「更新」で再表示しない（DOM 保持）ため、
   行 23 の screenIs は画面滞在だけを検証。更新結果（更新者/更新日/値）は pending。

### mock 保真（データだけ、断言は緩めていない）

- ANA03 の `cancelReasons` に G（事務ミスによる解消）、`concreteContents` に
  `C002 / 社員による二重計上` を追加。別紙の値が選択肢に無いと select できないため。
- 真機で確認すること：既存レコードの更新でも「保険始期日と届出日の関係」が
  必須か（AY-110-01-001 の 申請依頼 では必須だった）。mock の「更新」は
  検証を通らない（`return false`）ので、この点は mock では分からない。

## 下一步（按顺序）

1. **真机确认 pending（009）**
   - 16 个别紙引用逐个解析成 `fieldIs` / `screenIs` 的具体字段
   - 确认 `messageIs` 的 MAZG101W047 真实出现位置（弹窗还是页面）
   - 真机跑一遍，把 mock 的绿色变成业务真值
2. **确认 011/012 的别紙参数**：入力区分=現地 与 種目共通/その他 矛盾，
   需要书主确认是别紙写错还是这两本本来就是异常系。不要改代码绕过。
3. **再选 3–4 本不同类型**（AY 更新、其他业务线、例外、批量），
   每本先 check-flow 再 mock 跑，记录新增的定位形状。
   - AY-110-01-001（例外系）已做：行 14–28 绿；行 30 被别紙矛盾挡住。
   - AZ-240-01-001（帳票出力/PDF）已做：14 步全过，downloadIs 进内核。
   - AZ-150-05-001（バッチ）已做：mode: external，3 步 pending のみ。
   - AY-120-08-002（更新系）已做：10 步 6 done / 4 pending / 0 fail。
   剩下的：ANB00/AMB 以外の業務線（例: 他システム連携）。
4. ~~**写 `docs/rpa/12-DIFF.md`**：旧积木 vs 新内核，一页对照。~~ ✅ 已写
5. **冻结格式后再批量生成** 450 本（现在不要批量）。
6. `tools/compile_flow.py` 已在文件头标 `DEPRECATED`；
   编译/检查/执行只走 `flow-loader.mjs` + `check-flow.mjs` + `run-flow.mjs`。

## 仍然需要人判断

| 问题 | 现状 | 需要什么 |
|---|---|---|
| 異例取扱管理メニュー画面 vs 異例取扱管理システム　メニュー画面 | unknown | 真机标题 |
| 25 个 `inferred` 画面映射 | URL 规则推定 | 真机确认 |
| 别紙未解析标签 | 逐类处理 | 人工/真机 |

## 关于 252 个旧积木

**不要删**，定位为「模板片段库」，迁移期可对照、可退回。
唯一确定废弃的是 `build_blocks.py` 的 n-gram 挖掘 + DP 合成
（它优化覆盖率，不优化正确性）。

## 怎么恢复上下文

1. `docs/rpa/00-DECISIONS.md`
2. `docs/rpa/01-PITFALLS.md`
3. `docs/rpa/02-DEV-RULES.md`
4. `docs/rpa/11-KERNEL.md`
5. `docs/rpa/04-ARCHITECTURE.md`
6. `flows/AZ-110-01-009.yaml` + `flows/README.md`

**不要读**：`docs/PIPELINE-DEEP-DIVE.md`（旧架构）。

## 关键数字

```
450 本，10,803 行手顺
1,386 本有 workflow 数据，18,966 操作行
画面派生覆盖 91.2%（17,294 / 18,966）
50 个手顺画面名，全部映射到 ui-screens.json
601 条 guards：32 前置 / 569 校验
旧积木 252 个，只有 4 个 live-verified
```
