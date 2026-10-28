# 流程语言规范（v1）

> 这份文件是**自包含**的：只读它 + 一本手顺 + 真实页面的 DOM，就能写出一份可校验的流程。
> 不需要看实现代码，也不需要知道 selector 存在哪里。
>
> 语言只有三层：
> **流程（做什么）** → **控件补丁（标签对应哪个元素）** → **本别覆盖（这一本和别本不同在哪）**。
> 三者都是 YAML，都有固定格式，都能离线校验。
>
> 想先理解「这套东西为什么长这样」，看
> [20-YAML-AS-LANGUAGE.md](20-YAML-AS-LANGUAGE.md)（把它当编程语言讲）。

---

## 0. 你要产出什么

| 产物 | 什么时候需要 | 放在哪 |
|---|---|---|
| 流程文件 | 每次都需要，一本一个 | `flows/books/<CASE>.yaml` |
| 控件补丁 | 手顺的措辞在页面上找不到对应控件时 | 交给 `check-patch`，写进控件库 |
| 本别覆盖 | 同一措辞在本画面有歧义，或某行要人工/跳过 | `flows/overrides/<CASE>.yaml` |

**判断顺序永远是：先写流程 → 跑检查 → 按报错补控件 → 再跑检查。**
不要一开始就猜 selector。

---

## 1. 三条不可违反的规则

1. **流程里不写 CSS selector。**
   流程只写「哪个画面、做什么、用哪个手顺措辞、值是什么」。
   selector 属于控件层，只出现在控件补丁里。
2. **每个步骤带 `row`。** 它是手顺的 Excel 行号，是证据链，不许省略、不许改号。
3. **期望（`expect`）不可修改。** 手顺写要看到什么，就必须断言什么。
   如果真机行为不同，那是缺陷或环境问题，不是可以放宽的断言。

另有四条执行层禁令（违反会直接报错或被人工拦住）：

- 不许固定 `sleep`；只许等条件（画面、元素、网络空闲）。
- 不许 `force` / 去掉 `disabled`；控件不可用时必须显式失败并留截图。
- 不许运行时让模型猜控件；找不到就报错 + 行号。
- 不许把 mock 跑绿当成真机绿；`pending` 永远不算通过。

---

## 2. 画面名从哪来

**只用手顺「遷移」行里写的画面名，原样照抄。**

```
15  遷移  不備内容入力画面－新規
18  遷移  保険種類選択画面
```

- 不要写 `AMB/AMA04` 这种画面码；系统会自己解析。
- 全角「－」和半角「-」在解析时等价，但建议照抄。
- 同一段手顺里，`functionName` 列（如果有）优先于上一行的画面。

**画面链规则（检查器会逐行核对）：**

- 起始画面由流程的 `start.screen` 声明一次。
- 每条 `遷移` 行生成一个 `screenIs`，并把「当前画面」推进到该画面。
- 动作步骤的 `on` 必须等于手顺推出的当前画面。
- 动作步骤的 `expect.screen`（如果有）会成为下一步的期望画面。
- `capture` 不推进画面。

---

## 3. 流程文件骨架

```yaml
case: AZ-110-05-008              # 本号，必须和文件名一致
title: シナリオ導線５             # 可选，给人看
user: MS                         # 可选
evidencePolicy: required         # required | all | failures | none

start:
  screen: 申込書品質管理メニュー画面
  url: /AMB/AMA01.html           # mock 起始页；真机用 --start-url 覆盖

env: prod-a                      # 可选；环境值从 flows/env/prod-a.yaml 取

values:
  証券番号:   {value: AZ11005,        source: case, row: 10}
  部店課支社コード: {value: "${env.部店課支社コード}", source: env}
  回答締切日: {value: "${sys.today+7d}", source: sys}

steps:
  - row: 14
    on: 申込書品質管理メニュー画面
    do: click
    target: {label: 新規登録}

  - row: 15
    on: 不備内容入力画面－新規
    do: screenIs
    evidence: 画面HC

  - row: 16
    on: 不備内容入力画面－新規
    do: fillAll
    use: [入力区分, 契約マスタ, 種目, 証券番号]

  - row: 17
    on: 不備内容入力画面－新規
    do: click
    target: {label: "....", qualifier: 保険種類欄の横}
```

### 3.1 没有浏览器的本（`mode: external`）

批处理 / DB / 邮件类的手顺没有画面。写 `mode: external`，不写 `start`，
步骤只允许 `manual` / `externalIs` / `capture` / `waitUntil`。

```yaml
case: AY-100-08-005
mode: external
evidencePolicy: none
steps:
  - row: 14
    do: manual
    note: バッチ処理を実行する
  - row: 16
    do: externalIs
    expect: {external: {type: DBﾀﾞﾝﾌﾟ, note: 登録日の時刻がずれないこと}}
```

---

## 4. values：值从哪来

每条值必须写 `source`，`case` / `human` / `blank` / `auto` 还必须写数字 `row`
（别紙里的 Excel 行号）。

| source | 含义 | 例子 | 校验 |
|---|---|---|---|
| `literal` | 写死的文本/数字/布尔 | `{value: 未計上, source: literal}` | 非空 |
| `env` | 环境剖面 | `{value: "${env.部店課支社コード}", source: env}` | 剖面里必须存在 |
| `case` | 别紙数据 | `{value: AZ11005, source: case, row: 10}` | 必须有 row |
| `sys` | 系统生成 | `{value: "${sys.today+7d}", source: sys}` | 只允许白名单 |
| `prev` | **`case` 的别名（不是「上一步」）** | `{value: "${prev.保険種類}", source: prev}` | 键必须在 `values` 里；没有 row 要求 |
| `blank` | 手顺要求留空 | `{value: "", source: blank, row: 35}` | — |
| `human` | 人工临时输入 | `{value: "", source: human, row: n}` | 必须有 row |
| `auto` | 生成器打标，等同 `case` | `{value: 未計上, source: auto, row: 12}` | 必须有 row |

> `prev` 的实情：`flow-loader.mjs` 的 `resolveExpr` 把 `case` 和 `prev` 送进**同一张**
> `ctx.values`，运行期没有任何「上一步的返回值」写进去。现存 141 本没有一本用它。
> 要「人填的值传给下一步」，用 `manual` 步 + 后面的 `fillAll` 按标签名回查。
> 详见 [22-STUDIO-FIELDS.md](22-STUDIO-FIELDS.md) §5.7。

**表达式只允许三种命名空间：**

```
${env.名称}          ${case.名称}          ${prev.名称}
${sys.today}         ${sys.now}            ${sys.today+7d}
```

- `sys.today` → `YYYY/MM/DD`
- `sys.now` → `YYYY/MM/DD HH:MM`
- 不执行任意代码；`${...}` 里出现别的名字就是错误。

**约定：**

- 环境相关的值（部店課支社コード、代理店コード、URL、用户）放 `env`，不要抄进每本书。
- 手顺写「（入力なし）」「空白」的字段，不要放进 `fillAll`，或写成 `source: blank`。
- 手顺写「システム日＋7日（初期設定）」的字段，是系统初始值，不要填。
- 布尔值用于勾选框：`{value: true, source: literal}`。
- 同一个标签在多本书里值不同时，不要写进 values，直接在步骤的 `use` 项里写
  `{label: 氏名, value: "${case.担当者氏名}"}`。

---

## 5. steps：一步怎么写

每个步骤的字段：

| 字段 | 必填 | 说明 |
|---|---|---|
| `row` | 是 | 手顺 Excel 行号 |
| `on` | 浏览器本必填 | 执行前必须所在的画面 |
| `do` | 是 | 17 个原语之一 |
| `target` | 动作类必填 | 点/填哪个控件（见 §5.2） |
| `value` | fill/select/check 必填 | 填什么；可用 `${...}` |
| `use` | fillAll 必填 | 要填的标签列表 |
| `expect` | 可选 | 执行后要成立什么（见 §5.4） |
| `evidence` | 可选 | 证据类型（画面HC / ポップアップMsg …） |
| `popup: true` | 可选 | 动作发生在弹出的子窗口 |
| `popupScreen` | 可选 | 弹窗在 遷移 行里没有名字时，用**弹窗自己的画面名**查标签；`on` 仍写手顺所在的画面 |
| `note` | 可选 | 给人看的说明；不参与执行 |

### 5.1 17 个原语

| 类别 | 原语 | 参数 | 作用 |
|---|---|---|---|
| 动作 | `click` | target | 点击 |
| 动作 | `fill` | target, value | 写入输入框 |
| 动作 | `select` | target, value | 下拉框按**选项文字**选 |
| 动作 | `check` | target, value(bool) | 勾选/取消勾选 |
| 动作 | `chooseRow` | target{row/label, anchor} | 按可见值选中一行（表格行或列表框 option） |
| 动作 | `fillAll` | use[] | 一次填一组标签 |
| 动作 | `press` | key, target? | 按键 |
| 动作 | `goto` | url, reason | 跳转（必须写 reason） |
| 动作 | `waitUntil` | waitFor: `screenIs(画面)` / `selector(css)` / `idle` | 等条件 |
| 证据 | `capture` | of, name?, target? | 截图/存 DOM，不推进画面 |
| 断言 | `screenIs` | expect.screen（默认取 on） | 画面正确 |
| 断言 | `fieldIs` | expect.fields[] | 字段回读 |
| 断言 | `rowsAtLeast` | expect.rows.min | 结果行数 |
| 断言 | `messageIs` | expect.message.code | 报文 |
| 断言 | `downloadIs` | expect.download | 下载 |
| 断言 | `externalIs` | expect.external | 外部证据（日志/DB） |
| 人工 | `manual` | note | 停下来等人做完 |

**没有第 18 个原语。** 需要新动作时，先用 `manual`，不要发明。

### 5.2 target 的四种写法

**① 普通标签（最常见）**

```yaml
target: {label: 登録}
```

标签必须和手顺的措辞一致。查找顺序是：本别 pin → 控件覆盖 → 绑定表 →
控件库精确标签 → 别名词典。**没有模糊匹配**；查不到就报错 + 行号。

**② 同一标签有多个控件，用括号里的限定语**

手顺写 `「....」（保険種類欄の横）` 时：

```yaml
target:
  label: "...."
  qualifier: 保険種類欄の横
```

qualifier 必须和控件覆盖里登记的限定语完全一致。

**③ 行内控件，用可见值当行锚点**

手顺在结果表某一行的控件上操作（検索 / 修 / 勾选框 / radio）时，
必须给出「怎么认出这一行」的值：

```yaml
- row: 41
  on: 不備内容入力画面-更新
  do: click
  target:
    label: 修
    anchor: "${case.不備内容}"       # 表里唯一含这个值的那一行
```

- `anchor` 是**可见文本**，不是行号，不是 selector。
- 0 行或多行 → 运行期报错，不会取第一行。
- 控件覆盖里用 `{value}` 模板承接这个锚点。

**④ 选中一行：`chooseRow`**

表格行（radio / 行内链接）：

```yaml
- row: 27
  on: 募集人検索画面
  do: chooseRow
  target:
    label: 選択欄ラジオボタン
    anchor: "${case.募集人ID}"
```

列表框（一排 `<option>`）：

```yaml
- row: 37
  on: 項目名検索画面
  do: chooseRow
  target:
    label: 各項目の選択
    anchor: "${case.項目コード}"      # T0；不会误命中 T01
```

列表框的匹配规则是「等于」或「锚点 + 非字母数字边界」，
所以 `T0` 命中 `T0 ： 損保取引時確認書`，不命中 `T01 ： …`。
0 / 2+ 命中都是错误。

### 5.2.1 弹窗没有 遷移 行：`popupScreen`

手顺有时只写「弹出窗口里点 OK」，没有 遷移 行，所以 `on` 仍然是**下面那个画面**。
这时用 `popupScreen` 告诉编译器：标签去弹窗的画面里查。

```yaml
- row: 53
  on: 不備内容入力画面-更新        # 手顺画面（弹窗不是手顺画面）
  popup: true
  popupScreen: メール通知先選択画面 # 标签在这张画面里查
  do: click
  target: {label: 通知しない}
```

`on` 决定执行前必须站在哪；`popupScreen` 决定 `label` 去哪张画面解析。
不写 `popupScreen` 时两者是同一张画面（默认行为不变）。

### 5.3 fillAll 的 use

```yaml
- row: 16
  on: 不備内容入力画面－新規
  do: fillAll
  use:
    - 入力区分
    - 契約マスタ
    - 証券番号
    - {label: 氏名, value: "${case.担当者氏名}"}   # 同标签异画面时显式给值
```

- 只列「这一行要填的字段」，不列系统初始值、不列留空字段。
- 每个标签的值来自 `values`，或 `use` 项上的 `value`。
- 某个标签在本画面找不到控件 → 编译错误 + 行号。

### 5.4 expect 的六种形式

| 原语 | expect 写法 | 例子 |
|---|---|---|
| `screenIs` | `screen: 画面名` | `expect: {screen: 不備内容入力画面-更新}` |
| `fieldIs` | `fields: [{label, equals?/contains?}]` | `expect: {fields: [{label: 証券番号, equals: "${case.証券番号}"}]}` |
| `rowsAtLeast` | `rows: {min: n}` | `expect: {rows: {min: 1}}` |
| `messageIs` | `message: {code: MAZG...}` | `expect: {message: {code: MAZG000E001}}` |
| `downloadIs` | `download: {name?, ext?}` | `expect: {download: {ext: pdf}}` |
| `externalIs` | `external: {type, note}` | `expect: {external: {type: APﾛｸﾞ, note: ...}}` |

**别紙引用（未解析的「表示内容N」）：**

```yaml
expect:
  ref:
    appendix: 表示内容１
    status: unresolved
    note: 別紙の表示内容。値の突合は未実装
```

未解析 = `pending`，**不算通过**，但也不是错误。不许为了变绿把它删掉。

### 5.5 动作 + 后置断言

手顺同一行既操作又确认时：

```yaml
- row: 30
  on: 不備内容入力画面－新規
  do: click
  target: {label: 登録}
  expect: {screen: 不備内容入力画面-更新}
```

### 5.6 证据

```yaml
- row: 15
  do: screenIs
  evidence: 画面HC

- row: 18
  on: 保険種類選択画面
  popup: true
  do: capture
  of: viewport
  evidence: 画面HC
```

`evidencePolicy: required` 时，手顺要求证据的行 + 失败 + manual 自动截图。
拍不到记 `missing`，不许假装有。

---

## 6. 手顺行 → 步骤的映射

| 手顺 | 生成 |
|---|---|
| `ボタン「X」押下` | `click target:{label:X}` |
| `入力 X` + 值 | `fill`（单字段） |
| `入力 各項目に入力` + 别紙块 | `fillAll use:[块里的标签]` |
| `クリック X`（普通控件） | `click` |
| `クリック X`（结果行里） | `chooseRow` 或 `click + target.anchor` |
| `遷移 画面Y` | `screenIs`（`on: 画面Y`），有表示内容时加 `expect.ref` |
| `表示 画面Y` | `screenIs`（确认仍在该画面） |
| `表示 字段X = 值` | `fieldIs` |
| Msg / DL / その他 | `messageIs` / `downloadIs` / `externalIs` |
| `operationType=その他`（批处理等） | `manual` |

**同一画面连续多行**：每行都要有自己的步骤，哪怕只是 `screenIs`。
检查器会报告「hand-procedure row not represented」警告。

**`遷移` 到没有 HTML 的画面**：不要静默挂到上一画面；写 `manual` 并说明。

---

## 7. 报错 → 改哪里

| 报错 | 真正的问题 | 改哪里 |
|---|---|---|
| `row N: label not in AMB/XXXX: 标签` | 页面上没有这个措辞的控件 | 写控件补丁（§8） |
| `row N: label ambiguous in AMB/XXXX: 标签 (n controls)` | 同标签多个控件 | 控件补丁加 `qualifier`，或本别覆盖 `binding` |
| `row N: screen mismatch: flow=A handPro=B` | 画面链错了 | 改 `on`，不要改手顺 |
| `row N: hand-procedure row not represented` | 漏了一行 | 补该行的步骤 |
| `row N: ... not defined in values` | 步骤引用了不存在的值 | 在 `values` 里补，或改表达式 |
| `row N: unknown expect key 'X'` | 用了不存在的断言名 | 改成 §5.4 的六种之一 |
| `row N: pendingRuntime 'X' has no note` | 行内控件需要运行期解析，但没写说明 | 在控件补丁里加 note |
| `chooseRow: anchor not found` | 锚点值在这一页不存在 | 换锚点字段（不是换 selector） |
| `chooseRow: anchor ambiguous` | 锚点不唯一 | 换更具体的值 |
| `element not found: #xxx` | 画面对了，真机没有这个节点 | 重新抓 DOM，补控件覆盖 |
| `rowfield ambiguous: name[{n}] indices[0..19]` | 行内控件的行号不唯一 | 给该步骤加 `target.anchor`，并在控件补丁里用 `{value}` 模板 |
| `row N: 行内控件「X」必须写 target.anchor` | 行内/列表控件缺锚点。`flow-loader.mjs:362` 会拿步骤的 value 当锚点，`value: true` 就变成找 `tr:has(td:text-is("true"))` | 写 `anchor: "${case.别纸名}"` |
| `row N: target.anchor 必须是字符串 / 是非法值 "true"` | 布尔或对象漏进了锚点，能拼出合法 selector 但永远匹配不到 | 锚点只能是字符串业务值 |
| `row N: X 是 checkbox，值必须是 true/false` | 别纸写「連動しない」，AI 照抄成字符串 | `{value: false, source: literal, row: N, note: "別紙「連動しない」= OFF"}` |
| `row N: select 的 value 是布尔 / 对象 / "[object Object]"` | 下拉框的值是**选项的显示文字** | 写 options 里的原文，例如 `添付書類もれ` |
| `row N: value 是对象 / "[object Object]"` | 值只能是一个字符串/数字/布尔 | 拆开写，不要嵌套对象 |
| `WARN 手顺里有弹出窗口操作，但整份 flow 一个 popup: true 都没有` | 弹窗里的控件会被当主画面找 | 给弹窗内的步骤加 `popup: true`（§5.2.1） |
| `L0 全绿但真机失败` | 检查器只验证「解析成字符串」，不验证真机节点 | 用 `check-patch` 对真实 DOM 校验（§11） |

上表后五行是 2026-10-28 新增的**硬校验**（`check-flow.mjs` §5.5）：它们全部来自
「第一轮 Copilot 生成物 L0 全绿、真机全错」的实测，以前的检查器只看形状不看类型。
其中「checkbox 必须是布尔」对**行内控件**同样生效：行内控件的 `kind` 是 `rowfield`，
真实元素类型记在 `ctlKind`（`ui-rowfields.json` 的 `kind` 字段 → `flow-loader` → `check-flow`）。
`ui-rowfields.json` 里没写 `kind` 的行内控件，这条校验只能跳过——补 `kind` 才有效。

**不要**用以下方式「修复」：改断言、删步骤、加 sleep、强制点击、
在 flows 里手写 selector。

---

## 8. 控件补丁格式（固定）

```yaml
kind: control-patch
case: AZ-110-05-008               # 可选，来源
screen: 募集人検索画面             # 可选：默认画面名（每条 entry 也可以自己写 screen）
entries:
  - screen: 募集人検索画面         # 可选；不写就用上面的默认值
    label: 選択欄ラジオボタン       # 手顺措辞，原样
    selectorTemplate: 'tr:has(td:text-is("{value}")) input[name="selectNo"]'
    how: rowByText                # 可选提示
    sample: "3028004586"          # 离线校验用的锚点样例；不参与运行
    note: "実機 capture 2026-10-28；结果行 radio"
```

一个补丁文件可以覆盖多张画面：每条 entry 写自己的 `screen`，
顶层的 `screen` 只是默认值。`check-patch` 按画面分组校验，`--apply` 一次备份一次写入。

### 8.1 一条 entry 的字段

| 字段 | 说明 |
|---|---|
| `screen` | 这条控件属于哪张画面（不写则用补丁顶层 `screen`） |
| `label` | 手顺措辞。查找时做 NFKC + 去空白，不做模糊匹配 |
| `selector` | 固定 selector，必须恰好命中 1 个可见元素 |
| `selectorTemplate` | 含 `{value}` 的模板；运行时 `{value}` 先代入 `target.anchor`，没有 anchor 才代入步骤的 `value` |
| `namePattern` | 行内 name 模板（含 `{n}`）。只写它 = 运行期解析，离线记为 pending |
| `choices` | 一个标签对应一组 radio：`{必要: '#r1', 不要: '#r2'}`，按**选项文字**选 |
| `parts` | 一个标签对应多个控件（日期+午前/午後+时+分），见 §8.3 |
| `qualifier` | 仅用于「同一标签多个控件」的限定（配合 `qualifiedButtons`） |
| `sample` | 模板校验用的样例锚点，离线检查必填（模板条目） |
| `note` | 为什么这样写；证据来源 |

**selector 的写法限制：**

- 优先 `#id` 或 `[name="..."]`。
- 允许 `tr:has(td:text-is("{value}")) <base>` 这类**以可见文本定位行**的模板。
- 不许用 `nth-child`、`div > div` 这类位置选择器。
- 不许用 `value="..."` 定位会变化的控件。
- selector 里出现 `${` 或 `|` 表示模板没渲染，一定匹配不到。
- 名字里带动态行号时，用 `{n}`，不要写死 `[0]`（除非手顺明确指定第 1 行）。

### 8.2 三类典型补丁

**① 结果行里的 radio（行内控件）**

```yaml
- label: 選択欄ラジオボタン
  selectorTemplate: 'tr:has(td:text-is("{value}")) input[name="selectNo"]'
  sample: "3028004586"
```

**② 结果行里的按钮（同一个 name 出现 20 次）**

```yaml
- label: 検索
  selectorTemplate: 'tr:has(td:text-is("{value}")) input[name^="imperfectSearch["]'
  sample: "添付書類もれ"
```

流程里对应：

```yaml
- row: 32
  do: click
  target: {label: 検索, anchor: "${case.不備内容}"}
```

**③ 一个标签 = 一组 radio / 六个日期控件**

```yaml
- label: 代理店への募集状況の確認要否
  selector: 'input[name="agent_invitation_status"]'
  choices: {必要: '#agent_invitation_status_1', 不要: '#agent_invitation_status_2'}
```

```yaml
- label: 確認日・確認時刻
  how: datetime
  parts:
    - {part: yyyy, selector: '#confirm_date_year'}
    - {part: MM,   selector: '#confirm_date_month'}
    - {part: dd,   selector: '#confirm_date_day'}
    - {part: ampm, selector: '#confirm_date_ampm_0', selectorPm: '#confirm_date_ampm_1'}
    - {part: hh12, selector: '#confirm_date_hour'}
    - {part: mm,   selector: '#confirm_date_minute'}
```

`datetime` 的值必须是 `YYYY/MM/DD HH:MM`，运行时自动拆成 12 小时制。

### 8.3 什么时候该写补丁

- 检查器报 `label not in ...`，而你确定页面上有这个东西。
- 真机 DOM 和 mock 不一致（id 变了、name 加了行号、按钮在表格里）。
- 一个手顺标签对应多个控件（radio 组、日期组、组合控件）。

**不要**为了一个本写补丁：补丁是全本共享的。只影响一本时用本别覆盖。

---

## 9. 从真实页面粘贴元素 → 生成补丁

### 9.1 你要复制什么

在真实页面按 F12，选中目标元素，复制**整个开始标签**：

```html
<input type="radio" name="selectNo" value="0">
```

或者复制浏览器给的 selector（`#xxx` / `[name="xxx"]`）。

### 9.2 命令

```bash
node automation/node-runner/add-control.mjs \
  --screen 募集人検索画面 \
  --label 選択欄ラジオボタン \
  --html '<input type="radio" name="selectNo" value="0">' \
  --capture capture-20261028 \
  --anchor 3028004586 \
  --out flows/patches/AZ-110-05-008.control.yaml
```

工具会：

1. 从元素里取 `id` / `name` / `type` / 标签名；
2. 在**真实抓取的 DOM** 里数这个 selector 命中几个；
3. 0 个 → 报错（页面不对 / selector 不对）；
4. 1 个 → 生成固定 `selector` 补丁；
5. 2+ 个 → 需要行锚点；有 `--anchor` 时自动生成 `selectorTemplate` 并校验，
   没有锚点就报「needs a row anchor」，不会替你选第一个。

加 `--apply` 直接写入控件库（会先备份）；不加只输出补丁 YAML。

### 9.3 补丁的校验

```bash
node automation/node-runner/check-patch.mjs \
  --patch flows/patches/AZ-110-05-008.control.yaml \
  --capture capture-20261028
```

输出逐条：`OK 1 visible` / `ERROR 0 matches` / `ERROR 2 matches (needs row anchor)`。
`--apply` 在全部通过后写入 `ui-rowfields.json`。

---

## 10. 本别覆盖（只改怎么做，不改期望）

```yaml
kind: flow-patch
case: AZ-110-05-008
overrides:
  - row: 27
    binding: {label: 検索, selector: '#imperfectSearch'}
    reason: "画面上有两个「検索」，手顺指结果区上方那个"

  - row: 32
    do: manual
    reason: "PDF 下载路径由环境决定"

  - row: 33
    capture: 画面HC
    of: viewport
    reason: "手顺要求存证，但该行本身无操作"
```

允许的动作只有五种：`skip` / `manual` / `capture` / `valueFrom` / `binding`。
每条必须写 `reason`。`expect` / `expected` 出现即编译错误。

`skip` 会删掉该行的所有步骤；其余在同一行内生效。覆盖按 `row` 匹配。

---

## 11. 校验命令与判读

### 11.1 流程

```bash
node automation/node-runner/check-flow.mjs flows/books/AZ-110-05-008.yaml
```

- exit 0 = L0 通过（0 error）
- `ERROR` = 必须修
- `WARN` = 需要看，通常是漏行或旧写法
- `PENDING` = 运行期才能确定 / 别紙未解析；不是通过

L0 验证的是：画面链、行覆盖、标签能否解析、值的来源、expect 类型。
**L0 不验证真机节点是否存在。**

### 11.2 控件补丁

```bash
node automation/node-runner/check-patch.mjs \
  --patch <补丁.yaml> --capture <capture-dir>
```

- 每个 `selector` / 模板（用 `sample` 代入）必须在真实 DOM 里恰好命中 1 个可见元素。
- `namePattern` only 的条目记为 `PENDING (runtime-resolved)`，不是 OK。
- 没有 `--capture` 时不猜：直接报错，要求提供真实 DOM。
- `--capture` 可以是 `capture.mjs` 的目录（有 `index.json`），也可以是手工另存的一堆 `.html`。
- 用 `--flow <流程>` 可以一次校验整本流程编译出来的所有 selector。

判读：

| 标记 | 含义 |
|---|---|
| `OK (1/1)` | 通过 |
| `FAIL` | selector 错（0 个或多个） |
| `ANCHOR` | 模板形状对（控件存在），但**手顺的锚点值不在这次 capture 的数据里**；换真实数据再验，不许改成“看起来像”的值 |
| `PENDING` | 运行期才能解析 |
| `NO-CAPTURE` | 这份 capture 没有该画面 |

### 11.3 真实执行

```bash
node automation/node-runner/run-flow.mjs flows/books/AZ-110-05-008.yaml \
  --live --login --login-url <登录页> --start-url <真机起始路由>
```

**外部 AI 路线**（材料怎么贴）：

```bash
# capture（或手工另存的一堆 .html）→ 一个能贴进聊天窗口的包
node automation/node-runner/make-pack.mjs --capture capture-YYYYMMDD
#   pack/00-INDEX.md    画面清单 + 手顺措辞→控件 id + 按钮 + 表格样例（先贴这个）
#   pack/01-screens.md  清洗后的 HTML，每块 ≤3 万字符
```

完整规程和验收记录见 [18-EXTERNAL-AI.md](18-EXTERNAL-AI.md)。

- `--login`：打开浏览器，人工登录后回车；不做自动登录。
- `--start-url`：流程里的 mock 路径换成真机路由。
- 失败时自动截图，记录 URL / 画面 / 目标 / 候选。

**演示模式**（给人看执行过程，不改变任何判定）：

```bash
node automation/node-runner/run-flow.mjs flows/books/AZ-110-05-008.yaml \
  --live --demo --demo-delay 1500
```

- 每一步在页面顶部显示横幅：`r<行号> <原语> <画面>`，下一行是标签 / selector / 锚点 / 值。
- 目标控件画红框并贴标签。
- 默认每步停 1.2 秒；`--demo-delay MS` 调快慢。
- 在浏览器窗口按 **Space** 暂停 / 继续（页面内监听，不影响页面操作）。
- `--demo` 强制有头浏览器；不断言、不改值、不跳过任何检查。

### 11.4 完成标准

| 级别 | 标准 |
|---|---|
| L0 | `check-flow` 0 error，步骤数 = 手顺行数 |
| L1 | mock 上全绿（done），pending 如实列出 |
| L2 | 真机上全绿，截图齐全 |

`pending` 不是绿。mock 绿不是 L2。

---

## 12. 一页速查

```
一本手顺 → 一个 flow YAML
一行手顺 → 一个 step（带 row）
画面名   → 照抄 遷移 行
标签     → 照抄手顺措辞，不猜 selector
值       → 别紙原值 + source + row
行内控件 → target.anchor = 可见值
选中一行 → chooseRow + anchor
看不到控件 → 控件补丁（selector / selectorTemplate{sample} / choices / parts）
同标签歧义 → 本别覆盖 binding + reason
检查     → check-flow（流程）/ check-patch（真实 DOM）
演示     → run-flow --demo --demo-delay MS（Space 暂停）
绿       → L0 → L1(mock) → L2(真机)，pending 不算绿
```

---

## 附录 A：真实 DOM 里能拿到的信息

抓取器保存的是渲染后的 DOM。一个元素你至少能看到：

- `id`（可能为空；可能带 `:`，selector 里写成 `[id="a:b"]`）
- `name`（表单提交名；行内控件常带 `[n]` 或 `list[n].field`）
- `type`（text / radio / checkbox / button / hidden）
- 可见文本（按钮的 `value`、`<option>` 的文本、单元格文本）

**定位优先级：**

1. `#id`（唯一且不含模板占位符）
2. `[name="..."]`（唯一）
3. 行锚点 + name 前缀：`tr:has(td:text-is("{value}")) input[name^="..."]`
4. 标签文字 → 相邻控件（只在断言回读时作为兜底）

**不要用：** 位置选择器、颜色/样式、`value`、可见文本直接点（除非它是行锚点）。

---

## 附录 B：手顺措辞与页面措辞不一致时

手顺写「部店課支社コード」，页面写「部店課支社ｺｰﾄﾞ」；
手顺写「保険種類欄の横」，页面只有一个「....」按钮。

这类差异由**控件覆盖/绑定**解决，不在流程里改字：

```yaml
entry:
  label: 部店課支社コード        # 手顺措辞
  selector: '#section_code'      # 页面控件
```

同一个标签在不同画面有不同控件时，补丁按 `screen` 分开，互不影响。
