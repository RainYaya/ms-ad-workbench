# 内核（Kernel）— 17 个原语 + 组合规则

> 定稿：2026-10-27。这份文档是"玩具盒"的说明书。
> 原则：**原语锁死，组合无限。** 自由度来自组合，不来自加第 18 个原语。

---

## 0. 一句话

一本手顺 = 一条**可静态检查的状态链**：

```
(row, on, do, target, value, expect, requires, evidence)
```

- `row`：手顺 Excel 行号。证据链，必填。
- `on`：这一步执行前必须所在的画面。
- `do`：17 个原语之一。
- `target`：点/填哪个控件（4 种定位策略）。
- `value`：填什么（5 种来源）。
- `expect`：执行后要成立什么（6 种断言）。
- `requires`：前置条件（守卫），编译期强制。
- `evidence`：这一步要留下的证据（默认按策略）。

---

## 1. 为什么正好是 17 个

全量实测（1386 本 / 1371 本有手顺）：

| 数据 | 数量 | 推出的原语 |
|---|---|---|
| 操作行 | 18,966 | 5 种 `operationType` → click / fill / select / check / chooseRow / press |
| 非标准操作 | 590 `その他` | goto / waitUntil / manual（批处理/DB/邮件不进内核） |
| 验证行 | 11,232 | 遷移 7,138 / 表示 3,374 / Msg 822 / DL 173 / その他 2,904 |
| 证据 | 14,374 条 | capture（画面HC 9,776） |
| 守卫 | 15 个函数 / 11 页面 | requires（静态提取，见 `guards.json`） |

**加原语的门槛**：≥10 本用到，且现有 17 个无法组合出来。
达不到就写 `manual`，不要发明第 18 个。

---

## 2. 分层

```
① 原语层     17 个动作/断言，几乎不动
② 定位层     T1 字典 / T2 标签锚点 / T3 行锚点 / T4 人工
③ 字典层     ui-dictionary / ui-screens / ui-aliases / ui-rowfields / guards
④ 流程层     flows/<CASE>.yaml
⑤ 执行层     flow-loader.mjs + run-flow.mjs
⑥ 证据层     logs/<CASE>-flow/{run.json, run.html, *.png}
```

没有积木层。旧 `blocks/` 只作交叉验证样本。

---

## 3. 流程文件 schema

```yaml
case: AZ-110-01-009
start:
  screen: 申込書品質管理メニュー画面
  url: /AMB/AMA01.html
env: prod-a                     # 环境剖面，见 §6
evidencePolicy: required        # required | all | failures | none
# mode: external                # 画面の無い本（バッチ/DB/メール）。下記 §3.1

values:
  証券番号: { value: AZ11001, source: case, row: 11 }
  部店課支社コード: { value: "${env.部店課支社コード}", source: env }
  回答締切日: { value: "${sys.today+7d}", source: sys, row: 26 }

steps:
  - row: 14
    on: 申込書品質管理メニュー画面
    do: click
    target: { label: 新規登録 }

  - row: 15
    on: 不備内容入力画面－新規
    do: screenIs
    # screenIs 的期望画面就是 on；不需要重复写

  - row: 16
    on: 不備内容入力画面－新規
    do: fill
    target: { label: 証券番号 }
    value: "${case.証券番号}"
```

### 3.1 画面の無い本（`mode: external`）

バッチ / DB / メールだけの本はブラウザ画面を持たない（全 1,386 本中 38 本）。
`mode: external` を書くと、ブラウザを開かず、`manual`（人が実行）と
`externalIs`（外部の結果を人が確認）だけで表せる。`start` と `on` は書かない。

```yaml
case: AZ-150-05-001
mode: external
evidencePolicy: none
steps:
  - row: 14
    do: manual
    note: 親子集計バッチ処理を実行する
  - row: 16
    do: externalIs
    expect: {external: {type: APログ, note: エラー件数が0件であること}}
```

`check-flow` はこのモードで画面チェーンを検査しない代わりに、
`manual` / `externalIs` / `capture` / `waitUntil` 以外をエラーにする。
mock では全部 pending（未検証）で、緑にはならない。

### 兼容旧写法（迁移期）

- `screen:` 等同 `on:`
- 标签键写法 `新規登録: ""` 等同 `target: { label: 新規登録 }`
- `expect: {遷移: 表示内容１}` 是**未解析的别紙引用**，不算断言通过。
  必须改成 `expect: {ref: {appendix: 表示内容１, status: unresolved}}`
  或解析成具体 `screen/field`。

---

## 4. 动作原语（8）

| 原语 | 参数 | 前置 | 效果 / 产出 | 失败 |
|---|---|---|---|---|
| `click` | target | `on` 成立、控件可见可用 | 记录点击前后画面 | 找不到 / disabled / 画面没变 |
| `fill` | target, value | 控件可写 | 记录实际写入值 | readonly / hidden 非预期 |
| `select` | target, value | 控件是 select | 记录选中 option 的文本和 value | 0 匹配 / 多匹配 |
| `check` | target, value(bool) | 控件是 checkbox/radio | 记录勾选状态 | — |
| `chooseRow` | target{row, column, anchor} | 结果 ≥1 行 | 支持表行（radio/按钮）与列表框（option）；记录命中行 | 0 行 / 多行（拒绝猜） |
| `press` | key, target? | `on` 成立 | 记录按键 | — |
| `goto` | url, reason | reason 必填 | 记录跳转前后 URL | URL 不在白名单 |
| `waitUntil` | condition(screen/selector/idle), timeout | — | 记录等待条件和耗时 | 超时 |

**动作不包含**：force 点击、enable、固定 sleep、运行时 LLM 猜控件。

---

## 5. 证据原语（1）

`capture` 是唯一不推进画面的原语。

| 参数 | 值 |
|---|---|
| `of` | `viewport`（默认）/ `fullpage` / `element` / `popup` / `all` / `dom` |
| `target` | `of: element` 时必填 |
| `evidence` | 对应手顺的证据类型（画面HC / ポップアップMsg / …） |
| `name` | 可选；默认 `r<row>_<screen>` |
| `required` | 默认 `false`；`true` 时拍不到算失败 |
| `waitFor` | 可选条件，避免拍到半渲染 |

产出：`logs/<case>-flow/NNN_rXX_<name>.png` + `run.json` 一条
`{row, screen, of, file, bytes, sha256, evidence}`。

下载（手顺证据类型「PDFﾌｧｲﾙ」）不是截图：`downloadIs` 在真机把文件存到
`logs/<case>-flow/NNN_<suggestedFilename>`，`run.json` 记
`{name, file, bytes, sha256}`。下载事件发生了但别紙「出力結果」未解析时，
该 step 仍记 **pending**（`expect.ref` 优先），不因为「落了文件」算通过。

**真值原则**：拍不到 → 记 `missing`，不许假装有证据。
同一次运行内 sha256 相同的不重复存。

自动证据的触发点（`evidencePolicy`）：
- `required`（默认）：手顺要求证据的行 + 失败 + manual
- `all`：每步
- `failures`：只失败
- `none`：关

---

## 6. 断言原语（6）与 `expect` 的类型

断言可以写成独立 step（手顺有专门的验证行时），
也可以写成动作 step 的 `expect`（手顺同一行完成操作+确认时）。

```yaml
# 独立断言行
- row: 31
  on: 不備内容入力画面-更新
  do: screenIs

# 动作 + 后置断言
- row: 30
  on: 不備内容入力画面－新規
  do: click
  target: { label: 登録 }
  expect:
    screen: 不備内容入力画面-更新
```

| 原语 | `expect` 形式 | 覆盖手顺 |
|---|---|---|
| `screenIs` | `screen: <画面名>`（默认取 `on`） | 遷移 7,138 |
| `fieldIs` | `fields: [{label, equals?/contains?}]` | 表示 3,374 |
| `rowsAtLeast` | `rows: {min: n}` | 检索结果 |
| `messageIs` | `message: {code: MAZG...}` | 出力Msg 822 |
| `downloadIs` | `download: {name?, ext?}` | 出力DL 173 |
| `externalIs` | `external: {type: DBダンプ/APログ/…, note}` | その他 2,904（人工） |

**别紙引用**：`表示内容１` 不是字段名，是别紙里的表。
未解析时写 `ref: {appendix: 表示内容１, status: unresolved}`，
计入 `pendingRuntime`，**不许当成通过**。

---

## 7. 定位策略（4）

| 级 | 怎么找 | 适用 | 失败行为 |
|---|---|---|---|
| T1 | 字典 `selector`（id 或 name） | 服务端渲染的控件 | 报错 + 行号 |
| T2 | 精确标签文本 → 该标签到下一个标签之间的控件 | 无 id 的按钮/字段 | 0 / 2+ → 报错（列出候选） |
| T3 | 行锚点：可见值定位行 → `namePattern` 取控件 | `list[n]` / `div#Result` | 0 行 / 多行 → 报错 |
| T4 | `manual` | 真解不了 | 停下等人 |

**禁止**：模糊相似度兜底、同名多 id 任选一个、把 hidden 当可见控件。

T2 用精确标签文本，不用模糊包含。标签与下一个标签之间可能同时有输入框和
「....」弹窗按钮：只取唯一的**可读**控件（input/select/textarea，排除 button/hidden）；
可读控件 2 个以上 = 报错。没有可读控件时才取唯一的按钮。

T3 的索引在运行时发现，不在编译期猜。运行时规则（实测于 009）：

1. **表行 + 行内控件**：`tr:has-text(anchor)` 命中唯一行，再取该行内 `namePattern` 控件。
   0 行 / 2 行 → 报错。
2. **列表框（不是表）**：结果是一排 `<option>`（如 AMA13 項目名検索）时，
   取文本与 anchor 匹配的唯一 option。匹配只认「等于」或「anchor + 非字母数字边界」，
   所以 `T0` 不会命中 `T00`。0 / 2+ → 报错。
3. **`namePattern` 的 `{n}`**：
   - 全页只有一个 index → 用它；
   - 表格里只有一个可见数据行带该 name 族 → 用该行的 index；
   - mock/模板里同行的兄弟控件丢了 name（如可见「修」按钮）时，
     复用同一画面上一步已经解析出的行 index；
   - 以上都不成立 → 报错，不按 0/1 猜。
4. **一个手顺标签 = 多个控件**（如「確認日・確認時刻」= 年/月/日/午前午後/時/分）：
   在 `ui-rowfields.json` 里声明 `parts`，运行时按 `YYYY/MM/DD HH:MM` 拆分并逐项回读。
   拆分规则固定：24h→12h、0 时=午前 0 时、12 时=午後 0 时。
5. **一个标签 = 一组 radio**（如「代理店への募集状況の確認要否」）：
   overlay 写 `choices: {必要: #radio1, 不要: #radio2}`，按**选择项的文字**选，
   不按位置选。文字不在 choices 里就报错。
6. **结果表的「NO」是行内链接**，不是按钮：把行内链接的 selector 放进字典
   （如 `#gyoumu_list tr a[onclick^="popupCloseNo"]`）。`chooseRow` 的 selector
   目标必须**恰好命中 1 个**；0 或 2+ 都是错误，不点第一个。
7. **同一个标签在不同画面有不同值**（如「氏名」在担当者検索和送信先選択）：
   `fillAll` 的项写成 `{label: 氏名, value: "${case.担当者氏名}"}`。
   flow 级 `values` 里没有该标签时，用项上的值。
8. **断言（fieldIs / screenIs.expect.fields）先查字典/overlay 的精确 selector**，
   查不到才退回 T2 标签扫描。断言不猜控件，只读已声明的控件。
9. **同名按钮在字典里有多个**（如「申請依頼」有可见按钮和隐藏的 submit）：
   取 DOM 顺序第一个；隐藏的候选会在点击的「可见」检查处失败，
   不会静默点到别的按钮。

**mock 绿 ≠ 真机绿**：`messageIs` / `downloadIs` / `externalIs` / `manual`
在 mock（或 `--yes` 跳过人工确认）时找不到目标，一律记 `pending`，
不计入 done。mock 只证明流程能走通，不证明业务报文。

**mock 保真修复**：mock 生成器会丢 `th:name`，也会把 Thymeleaf 条件冻成常量。
发现时按 `reference/webapps/`（权威）补回控件的 name/可见性，
不许为了跑通放宽断言或改流程。009 已修：AMA04 可见行的 checkbox/「修」按钮、
AMA19 訂正項目/訂正内容输入框、AMA19「登録」按钮可见条件。

---

## 8. 值来源（5）与表达式

| source | 含义 | 例子 | 校验 |
|---|---|---|---|
| `literal` | 写死 | `"現地"` | 非空 |
| `env` | 环境剖面 | `${env.部店課支社コード}` | 剖面里必须存在 |
| `case` | 别紙值 | `${case.証券番号}` | 必须有 row |
| `sys` | 系统生成 | `${sys.today}` / `${sys.today+7d}` | 只允许白名单 |
| `prev` | 上一步的值 | `${prev.保険種類}` | 上一步必须产生该值 |

表达式只允许上述形式。**不执行任意代码。**
环境值（部店課支社コード、代理店コード、base URL、user）必须放 `env`，
不许复制进 450 本。

---

## 9. 状态链

### 9.1 画面怎么来

手顺的 `verificationType == 遷移` 行给出目标画面。
按 rows 顺序推：起始画面（case 级，人工/AI 确认一次）→ 每次遷移更新。

`verificationType == 表示` 行如果 `verificationItem` **就是画面名**（不是字段名，
且精确/变体命中 `ui-screens.json`），也视为一次画面确认。例如 AZ-240-01-001
行 20 按「一覧画面」、行 21 用表示确认「代理店 不備一覧画面」——
只看遷移会把行 22–24 判成还停在详细画面。未知名不匹配、不做模糊兜底。

实测：18,966 个操作行里 **17,294 行（91.2%）** 能由这条规则确定画面；
剩下 1,672 行是每个 case 的起始画面（菜单/一覧），一个 case 只差一个。

### 9.2 检查规则

1. 每个 step 的 `on` 必须等于**手顺派生的当前画面**（按 sourceRow）。
2. 动作 step 的 `expect.screen`（若有）成为下一步的期望画面。
3. 没有 `expect.screen` 的动作不推进画面。
4. `capture` 不推进画面。
5. 冲突 → 编译错误 + 行号。

这条检查**离线可跑全量**，不需要浏览器。

---

## 10. 失败协议（真机）

```
X row 20 [click] 保険種類選択画面
  element not found: [name="ok"] (pages: AMA03.html)

  [Enter]retry [s]skip [v]manual value [k]keep browser [q]quit [a]stop all >
```

| 键 | 行为 |
|---|---|
| Enter | 重试（人先看一眼界面） |
| s | 跳过 |
| v | 手填值，写进 values 后重试 |
| k | 保留浏览器，脚本退出（**人工接管**） |
| q | 中止 |
| a | 之后全部中止 |

失败时自动截图 + 记录当时的 URL / 画面 / 目标 / 候选。

---

## 11. 编译器检查清单

一条 flow 算"通过"，必须全部为真：

- [ ] 每个 step 有 `row`，且覆盖手顺范围（或显式注释跳过原因）
- [ ] `on` 与手顺派生画面一致（§9.2）
- [ ] `do` ∈ 17 原语
- [ ] 动作 step 的 target 能被 T1–T3 确定；否则报错带行号
- [ ] fill/select/check 有 `value` 且来源合法
- [ ] 每个 value 有 `row` + `source`
- [ ] `expect` 类型合法；未解析的别紙引用进 `pendingRuntime`
- [ ] `requires` 覆盖已知守卫（`guards.json`）
- [ ] 400/450 本批量前，格式不再变

---

## 12. 与旧系统的映射（交叉验证用）

| 旧 | 新 | 处理 |
|---|---|---|
| `blocks.json` 252 块 | 无 | 保留作样本，不作单位 |
| `screen-rules.json` 29 条 | `ui-screens.json` | 吸收 |
| assert `visible/hidden/rows/value/text` | `screenIs/fieldIs/rowsAtLeast` | 吸收 |
| `captureRow` / `trace` | `capture` | 吸收 |
| `selectByLabelPrefix` | `select` 显式降级 | 吸收 |
| `goto` / `wait` | `goto` / `waitUntil` | 保留为逃生舱，必须写 reason |
| `force` / `enable` | 无 | **禁止** |
| 固定 `wait ms` | 无 | 禁止 |
| note 正则分类人工 | `manual` / `externalIs` 显式字段 | 替换 |
| "mock full" | live-verified 才算 | 替换 |

旧系统 252 块只有 4 个验证过、240 个无前置、force 184 次、goto 213 次。
**它的本体论对，分解错。** 只借鉴，不继承。

---

## 13. 非目标

- 第 18 个原语
- 运行时 LLM 猜控件 / 自愈 selector / 视觉识别
- DB / 批处理 / 邮件 / JP1 进内核（用 `externalIs` + manual）
- 无人值守全自动
- 把 mock 绿当成功
- 手改 `execution-status.json`

---

## 14. 迁移顺序

1. 009 用新 schema 重写（保留旧文件做对照）
2. `tools/derive_screen_chain.py` 产出全量画面链
3. `tools/extract_guards.py` 产出 `guards.json`
4. `check-flow.mjs` 校验 009 → 0 错
5. 其余 3 本（AY / 异常 / 批处理）验证格式
6. 格式定稿后批量生成
