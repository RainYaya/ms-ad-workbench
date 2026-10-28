# Studio 字段与变量速查

> 这一页回答：**Studio 每一栏对应 YAML 里的哪个键、每个键在运行期做什么、值到底从哪来。**
> 规则细节见 [16-LANGUAGE.md](16-LANGUAGE.md)；操作步骤见 [17-USAGE.md](17-USAGE.md)；
> 实机流程见 [19-REAL-MACHINE.md](19-REAL-MACHINE.md)。
>
> 依据都是代码，标注了 `文件:行号`。文档和代码不一致时，以代码为准，并把文档改回来。

---

## 0. 一张图：谁决定什么

```
v2/data/cases/*.js        手顺行 + 別紙值（唯一的值的来源，ADR-0007）
        │  导入，不手改
        ▼
ui-screens.json           画面名 → 画面码 → 真机路由
ui-controls.json          画面 → 控件（label / id / kind / choices）
ui-rowfields.json         行内控件、日期、组合控件的覆盖层
flows/bindings.yaml       手顺措辞 → 控件 的绑定表
        │
        ▼
flows/**/*.yaml           一本 = 一个 YAML = 一段程序
        │  compileFlow()：标签 → selector，${...} → 实际值
        ▼
steps[]（已解析）         每个 target 已经有 selector / value / anchor
        │  run-flow.mjs：浏览器动作
        ▼
logs/<case>-flow/         run.json（结果）+ NN_r<行号>_<证据名>.png
```

**Studio 不产生任何新的真值。** 它读同一批文件、写同一批文件，只是把「改 YAML」这件事
变成看得见画面、看得见步骤的编辑。Studio 里能做的事 = 你手改 YAML 能做的事，
一件不多、一件不少。

---

## 1. Studio 和真机是什么关系

这是最容易误解的一点，先钉死：

| 你在 Studio 看到的 | 它到底是什么 | 能证明什么 | 不能证明什么 |
|---|---|---|---|
| 画面预览（`#screenPane`） | `automation/node-runner/mock-src/` 里的 **mock HTML** | 标签在字典里存在、控件类型对不对 | 真机上有这个元素、selector 命中唯一 |
| 「▶ 运行」 | 起 `mock-server.mjs`，用 mock 跑 | 操作链顺序对、值回读一致 | 业务报文 / DB 结果 |
| 「真机」 | 只把一条命令**复制到剪贴板**（`app.js:760`），不执行 | — | 任何东西；真机必须人在场手跑 |
| 「检查」/ Ctrl+Enter | `check-flow`（离线，不碰浏览器） | 结构、行覆盖、值来源、断言类型 | selector 是否命中 |
| 「绑定」页 | `flows/bindings.yaml` + `ui-controls.json` | 手顺措辞绑到哪个控件 | 绑定本身是否正确，要人确认 |
| 证据页 | `logs/<case>-flow/` 的既有产物 | 上次跑出了什么 | 这次改动之后还对不对 |

真机的唯一证据是 `capture.mjs` 抓下来的 DOM（`capture-*/`，不进 git），
以及 `check-patch.mjs` 拿它逐个验 selector。**Studio 替代不了这两步。**

---

## 2. Studio 的五个区，分别等于 YAML 的哪一段

启动：`node automation/node-runner/studio/server.mjs 10200` → <http://127.0.0.1:10200>

| 区 | 里面是什么 | 对应 YAML |
|---|---|---|
| 左栏 | `flows/*.yaml` + `flows/books/*.yaml` 清单，`本` 标签 = books/ | 文件的 `case` / `title` |
| 顶部 `flowSelect` | 当前打开的一本 | 整个文件 |
| 中央 `步骤` 列表 | 一行 = `steps[]` 的一项，`r17` 是 `row:`，不是序号 | `steps:` |
| 左窄条 `palette` | 17 个原语按钮，点一下追加一步 | 新建 `steps[]` 项 |
| 右栏「步骤」 | 当前选中那一步的所有字段 | 一个 `steps[]` 项 |
| 右栏「数据」 | 键 / 值 / source / row / note 五列 | `values:` |
| 右栏「绑定」 | 绑定表（含 needs-human 队列），点控件 = 确认绑定 | `flows/bindings.yaml` |
| 右栏「流程」 | case / title / user / env / pointCheck / evidencePolicy / mode / start | 顶层字段 |
| 底栏「运行日志」 | `run-flow` 的 stdout | — |
| 底栏「证据」 | `logs/<case>-flow/` 的清单 | — |
| 底栏「检查输出」 | `check-flow` 原文 | — |
| 顶部「YAML」 | 原文编辑，Ctrl+S 原样写回 | 整个文件（唯一不重排的写路径） |

两条写盘路径的区别（很重要）：

| 路径 | 接口 | 结果 |
|---|---|---|
| 列表「保存」/ Ctrl+S（YAML 未开） | `POST /api/flow/save` | 把内存模型**重新序列化**，手写注释被替换 |
| YAML 视图「写入磁盘」/ Ctrl+S（YAML 开着） | `POST /api/flow/save-raw` | 把 textarea 的字节**原样写回**，注释/空行/引号/字段顺序全保留 |

两条都会先备份到 `flows/.backup/<名>.<时间戳>.yaml`。

**排序**：拖动的只是 `steps` 数组顺序；`row:` 是手顺 Excel 行号，不跟着变。
唯一改变执行顺序的地方是数组顺序——`row` 只用于报错、证据文件名和行覆盖。

---

## 3. 顶层字段（右栏「流程」页）

| 键 | 必填 | 作用 | 谁用 |
|---|---|---|---|
| `case` | 是 | 本号。必须能在 `reports/screen-chain.json` 里找到，否则 L0 报错 | `check-flow.mjs:73` |
| `title` | 否 | 人看的标题 | Studio 列表 |
| `user` | 否 | 执行者标记，只打印 | — |
| `env` | 视情况 | 环境剖面名，读 `flows/env/<名>.yaml` 的 `values:` | `flow-loader.mjs:198` |
| `pointCheck` | 否 | 旧 runner 的标签，**`run-flow` 不使用** | `runner.mjs` 才打印 |
| `mode` | 否 | `external` = 没有浏览器的本（批处理/DB/邮件） | `check-flow.mjs:79` |
| `evidencePolicy` | 否 | `required`(默认) / `all` / `failures` / `none` | `run-flow.mjs:52` |
| `start.screen` | 浏览器本必填 | 起始画面名；第一步的画面要能和它吻合 | `check-flow.mjs:97` |
| `start.url` | 建议 | 起始 URL（mock 相对路径 / 真机绝对 URL） | `run-flow.mjs:1040` |
| `values` | 否 | 本别数据。**键名 = 标签名** | 见 §5 |
| `steps` | 是 | 步骤数组 | — |

`mode: external` 的本：不写 `start`，步骤只允许 `manual` / `externalIs` / `capture` / `waitUntil`，
`check-flow.mjs:119` 会拦其他原语。

---

## 4. 步骤字段（右栏「步骤」页）

| 字段 | 必填 | 运行期做什么 | 代码 |
|---|---|---|---|
| `row` | 是 | 手顺行号。用于报错、行覆盖、证据文件名 | 全链路 |
| `on` | 浏览器本必填 | **执行前**必须所在的画面。加载器用它来查字典 | `flow-loader.mjs:386` |
| `do` | 是 | 17 个原语之一 | 见 §4.1 |
| `target` | 动作类必填 | 操作哪个控件（§4.2） | — |
| `value` | fill/select 必填；check 必填布尔 | 写什么 | `run-flow.mjs:996` |
| `use` | fillAll 必填 | 要填的标签列表，可写 `{label, value}` | §5.6 |
| `expect` | 断言类必填 | 执行后要成立什么（§4.3） | — |
| `evidence` | 否 | 证据类型，**就是文件名里的标签**，自由字符串 | `run-flow.mjs:1107` |
| `popup: true` | 否 | 这一步在子窗口里执行 | `run-flow.mjs:1069` |
| `popupScreen` | 否 | 弹窗在 遷移 行里没有名字时，用弹窗自己的画面名查标签 | `flow-loader.mjs:391` |
| `note` | 否 | 给人看，不参与执行 | — |
| `reason` | goto 必填 | 为什么要直接跳 URL | `run-flow.mjs:957` |
| `key` | press 用 | 键名，默认 `Enter` | — |
| `waitFor` | waitUntil 用 | `screenIs(画面)` / `selector(css)` / `idle` | `run-flow.mjs:937` |
| `of` / `name` | capture 用 | 截什么 / 证据名 | `run-flow.mjs:925` |
| `requires` | 否 | 前置条件（数组），加载器保留 | `flow-loader.mjs:403` |
| `min` | 旧写法 | `rowsAtLeast` 的旧字段，新写法用 `expect.rows.min` | `run-flow.mjs:847` |

### 4.1 17 个原语

| 类别 | 原语 | 参数 | 做什么 |
|---|---|---|---|
| 动作 | `click` | target | 点击（目标可以是 `@dialog:confirm` 等对话框） |
| 动作 | `fill` | target, value | 写入；目标是 `<select>` 时按选项文字选 |
| 动作 | `select` | target, value | 下拉框按**选项文字**选；选不中直接报错并列出现有选项 |
| 动作 | `check` | target, value(bool) | 勾选/取消；值不是布尔直接报错 |
| 动作 | `chooseRow` | target{label, anchor} | 按**可见值**选中表格行或列表框 option |
| 动作 | `fillAll` | use[] | 一次填一组标签，值按标签名从 `values` 取 |
| 动作 | `press` | key, target? | 按键 |
| 动作 | `goto` | url, reason | 跳转，必须写 reason |
| 动作 | `waitUntil` | waitFor | 等条件，不固定 sleep |
| 证据 | `capture` | of, name? | 截图/存 DOM，不推进画面 |
| 断言 | `screenIs` | expect.screen | 画面正确 |
| 断言 | `fieldIs` | expect.fields[] | 字段回读 |
| 断言 | `rowsAtLeast` | expect.rows.min | 结果行数 |
| 断言 | `messageIs` | expect.message.code | 报文代码 |
| 断言 | `downloadIs` | expect.download | 下载（扩展名/文件名） |
| 断言 | `externalIs` | expect.external | 外部证据（APログ / DBダンプ） |
| 人工 | `manual` | note | 停下来等人做完 |

**没有第 18 个。** 需要新动作时先用 `manual`，不要发明（`16-LANGUAGE.md` §5.1）。
未实现的动作在运行期会走到 `run-flow.mjs:1012` 的 `unknown action:` 并失败。

### 4.2 target 的四种写法

| 写法 | 什么时候用 | 例子 |
|---|---|---|
| `{label}` | 普通控件 | `target: {label: 検索}` |
| `{label, qualifier}` | 同一标签有多个控件 | `target: {label: "....", qualifier: 保険種類欄の横}` |
| `{label, anchor}` | **行内控件**：表格某行里的勾选框/下拉/按钮 | `target: {label: 照会内容チェックボックス, anchor: "${case.不備内容}"}` |
| `{row: 行内标签名, anchor}` | chooseRow 的历史写法，`row` 当标签用 | 同 chooseRow |

查找顺序（`flow-loader.mjs` 的 `lookup`）：本别 pin → `ui-rowfields.json` → `bindings.yaml`
→ `ui-controls.json` 精确标签 → `ui-dictionary.json` → 别名 → 找不到 = 编译错误 + 行号。
**没有模糊匹配。**

`anchor` 是「用业务值认行」，不是「行号」。0 个命中或 2 个以上命中都是错误。

⚠ `flow-loader.mjs:362` 有个历史回退：`target.anchor` 没写时，拿这一步的 `value` 当锚点。
所以行内控件**必须显式写 anchor**；不写不会报错，但会按 `value` 去认行（经常认错）。
`check-flow` 对行内控件会检查 anchor 是否存在、是否为字符串。

### 4.3 expect 的六种形态

| 原语 | `expect` 写什么 | 备注 |
|---|---|---|
| `screenIs` | `{screen: 画面名}`，不写则取 `on` | 也可以挂在 click / chooseRow 上做后置条件 |
| `fieldIs` | `{fields: [{label, equals} \| {label, contains}]}` | 回读，值不一致就失败 |
| `rowsAtLeast` | `{rows: {min: n, selector?}}` | 默认数 `table tbody tr` |
| `messageIs` | `{message: {code: MYG901I001}}` | 报文代码 |
| `downloadIs` | `{download: {ext: pdf, name: 包含文字}}` | 下载 |
| `externalIs` | `{external: {type: APログ, note: 确认什么}}` | 无浏览器证据 |

另有 `expect.ref: {appendix: 表示内容１, status: unresolved, note: 为什么不能验证}`：
别紙里「表示内容」这类还没解析成具体字段的验证点。`status: unresolved` 时
`check-flow` 记成 **PENDING**——不是错误，也**不是通过**。

---

## 5. 变量：值到底从哪来

### 5.1 一条 `values` 的四个部分

```yaml
values:
  証券番号:                    # ← 键名必须是标签名（见 §5.5）
    value: AY12003             # 值，或 ${...} 表达式
    source: case               # 来源，必须写；见 §5.2
    row: 4                     # 别紙 Excel 行号；case/human/blank/auto 必填
    note: 別紙【操作内容】1     # 可选，给人看
```

`source: case|human|blank|auto` **没有数字 `row` 就是编译错误**
（`check-flow.mjs:187`）——这是为了防止「值不知道从哪来也能跑」。

### 5.2 八个 source

| source | 含义 | 运行期行为 | 校验 |
|---|---|---|---|
| `literal` | 写死 | 原样用 | 非空（约定，不强制） |
| `env` | 环境剖面 | `${env.X}` 在编译时展开 | `flows/env/<profile>.yaml` 里必须存在 |
| `case` | 別紙数据 | 原样用 | 必须有数字 `row` |
| `sys` | 系统生成 | `${sys.today}` 等编译时算一次 | 只允许白名单，见 §5.3 |
| `prev` | 历史上叫「上一步的值」 | **实际等同 `case`**（见 §5.7） | 不要求 `row`；`${prev.X}` 必须能在 `values` 里找到 |
| `blank` | 手顺要求留空 | 值为 `''`，**静默跳过不填** | 必须有数字 `row` |
| `human` | 留给人现场填 | 值为 `''`，**静默跳过不填** | 必须有数字 `row` |
| `auto` | 生成器打标 | 等同 `case` | 必须有数字 `row` |

`source` 只是**溯源标签**，不改变值的展开方式。真正会改变行为的只有三种：
`blank` / `human`（值为空，跳过不填）、以及 `value` 里有没有 `${...}`。

`run.json` 的 `missing` **不是** blank/human 的清单。它只在三种情况记录
（`run-flow.mjs:656/708/723`）：标签在 `values` 里根本没有条目、控件 readonly/disabled、
元素类型不认识。也就是说：**写 `source: human` 而值是空，不会出现在 `missing` 里。**

### 5.3 三个命名空间 + 六种表达式

```
${env.名称}      ${case.名称}      ${prev.名称}
${sys.today}     ${sys.now}        ${sys.today+7d}
```

| 表达式 | 结果 |
|---|---|
| `${sys.today}` | `YYYY/MM/DD` |
| `${sys.now}` | `YYYY/MM/DD HH:MM` |
| `${sys.today+Nd}` | N 天后的日期，`N` 是数字 |
| `${env.X}` | `flows/env/<flow.env>.yaml` 的 `values.X` |
| `${case.X}` | 本文件 `values.X` 解析后的值 |
| `${prev.X}` | **同 `${case.X}`**（实现上共用一张表） |

不执行任意代码。`${...}` 里出现别的名字是错误（`check-flow.mjs:196`）。
一个字段里也可以嵌多个：`${case.証券番号}-${sys.today}`。

**两个时必须知道的边界：**

1. **有 `env:` 才读得到 env。** 运行期 `resolveExpr` 对 `${env.X}` 一律走
   `ctx.env?.[name] ?? ''`（`flow-loader.mjs:229`）：没有剖面就是空字符串。
   所以 `check-flow` 把「用了 `${env.X}` 却没写顶层 `env:`」直接判为错误
   （`check-flow.mjs:209`），而不是让它静默填空。
2. **步骤里的 `${...}` 在编译时一次性展开。** 展开后的字符串就是运行期要填的值。
   运行期唯一会重新读 `values` 的是 `fillAll`（按标签名回查，`run-flow.mjs:651`）。

### 5.4 解析顺序（两遍）

`compileFlow`（`flow-loader.mjs:321`）先建 `values`，再解析步骤：

```
第 1 遍：values[x].resolved = values[x].value      （原样放进去）
第 2 遍：values[x].resolved = resolveValue(value)  （此时 ${case.y} 已能查到 y）
然后  ：每个 step 的 value / target.anchor 用同一套 ctx 解析
```

所以 `values` 内部可以互相引用，且**声明顺序无所谓**：

```yaml
values:
  契約者氏名: {value: "${case.顧客名}", source: case, row: 12}
  顧客名:     {value: 山田 太郎, source: case, row: 10}
```

### 5.5 三条取值路径（最容易混的地方）

| 原语 | 值从哪来 | 例子 |
|---|---|---|
| `fillAll` | **按标签名回查 `values`**，运行期读取 | `use: [証券番号]` → `values.証券番号` |
| `fill` / `select` | 这一步的 `value:` | `value: "${case.証券番号}"` |
| `check` | 这一步的 `value:`，必须是布尔 | `value: true` |
| `chooseRow` | `target.anchor`（认行用），不是要填的值 | `anchor: "${case.不備内容}"` |
| `fieldIs` | `expect.fields[].equals / contains` | — |

**这就是为什么 `values` 的键名必须等于标签名**：`fillAll` 只认这个名字。
同一标签在不同画面需要不同值时，不要改 `values`，在步骤里写显式项：

```yaml
- row: 26
  on: 担当者検索画面
  do: fillAll
  use:
    - {label: 氏名, value: "${case.担当者氏名}"}
    - 部署
```

显式项的优先级：`values[标签]` > `{label, value}` 里的 value > 编译出的 target.value
（`run-flow.mjs:651`）。没值也没显式项 → 记进 `missing`，不填，不报错。

### 5.6 env / values / use 内联：怎么选

| 放哪 | 适合什么 | 换环境要改几处 |
|---|---|---|
| `flows/env/<profile>.yaml` → `env.X` | 部店課支社コード、代理店コード、URL、账号 | 1 处 |
| 本文件 `values:` | 别紙给的本别数据（証券番号、日付、人名） | 0 处（跟着本走） |
| 步骤 `use` 里的 `{label, value}` | 同一标签在不同画面值不同 | 0 处 |

判断标准只有一条：**这个值会不会因为「在哪台环境跑」而变？** 会 → env；
不会、随本变 → values；只是这一处特殊 → 内联。

现在只有两个 env 值（`flows/env/prod-a.yaml`）：

```yaml
values:
  部店課支社コード: AHE61
  代理店コード: 252H
```

没被任何一本用到的 env 值是正常的；用到时在步骤里写 `value: "${env.部店課支社コード}"`，
并在顶层写 `env: prod-a`。

### 5.7 关于 `prev`：文档和代码不一致，以代码为准

`16-LANGUAGE.md` 和 `11-KERNEL.md` 写 `prev` 是「上一步的结果」。**代码不是这样。**

- `resolveExpr`（`flow-loader.mjs:229`）把 `env` 之外的 `case` 和 `prev` 送进**同一张**
  `ctx.values`；
- 运行期唯一会写 `values` 的是失败时的人工输入 `[v]manual value`
  （`run-flow.mjs:1141`），写的是 `{label, value}`，不是「上一步的返回值」；
- 现存 141 本里没有任何一本用 `${prev.*}`。

所以：**`prev.X` 现在等价于 `case.X`**。它没有「上一步」的语义，不要按那个意思用。
需要「人填的值传给下一步」时，真正生效的路径是：`manual` 步 → 人工输入写进 `values`
→ 后面的 `fillAll` 按标签名回查时取到它（§5.5）。

---

## 6. 组合示例

### 6.1 最小可用的一本（真实结构，可对照）

```yaml
case: AY-120-08-001
title: シナリオ導線１（現新あり）
user: MS
evidencePolicy: required
start:
  screen: 異例取扱管理メニュー画面
  url: /ANB00/ANA01.html
values:
  証券番号: {value: AY12003, source: case, row: 4}
  明細番号: {value: "0000000049", source: case, row: 5}
steps:
- row: 14
  on: 異例取扱管理メニュー画面
  do: click
  target: {label: 照会・検索}
- row: 15
  on: 照会・検索画面
  do: screenIs
  evidence: 画面HC
- row: 16
  on: 照会・検索画面
  do: fillAll
  use: [証券番号, 明細番号]
```

读法：`row 14` 在菜单画面点「照会・検索」；`row 15` 断言到了照会画面并截图；
`row 16` 一次填两个值——**值按标签名从 `values` 里取**，所以键名写成 `証券番号`。

### 6.2 env → values → 步骤 三级引用

`flows/env/prod-a.yaml`：

```yaml
values:
  部店課支社コード: AHE61
```

本文件：

```yaml
env: prod-a
values:
  部店課支社:
    value: "${env.部店課支社コード}"   # 编译时展开成 AHE61
    source: env                        # 溯源标签
steps:
- row: 20
  on: 照会・検索画面
  do: fillAll
  use: [部店課支社]
```

注意两个名字：`env: prod-a` 是**选剖面**，`env.部店課支社コード` 是**取剖面里的键**。
换环境只要改 `env:` 一行（或换一个 profile 文件）。

### 6.3 行内控件（表格某一行里的勾选框）

```yaml
- row: 42
  on: 不備内容入力画面-更新
  do: check
  target:
    label: 照会内容チェックボックス
    anchor: "${case.不備内容}"      # 用业务值认行，不是行号
  value: true                       # 布尔，不是字符串
```

`anchor` 的值必须在这份数据里真实出现；`check-patch` 验不到时会报 **ANCHOR**
（模板形状已验，只差这一行数据），不是 FAIL，也不是通过。

### 6.4 弹窗

先给画面名加 `popup: true`（这一步在子窗口里动作）。弹窗在 遷移 行里没有自己的名字时，
再补 `popupScreen` 指明用**弹窗自己的**画面名查标签：

```yaml
- row: 24
  on: 照会・検索画面          # 手顺所在画面不变
  popup: true
  popupScreen: 募集人検索画面  # 标签在这个画面的字典里
  do: click
  target: {label: 検索}
```

### 6.5 同一标签、不同画面、不同值

```yaml
- row: 26
  on: 担当者検索画面
  do: fillAll
  use:
    - 部署
    - {label: 氏名, value: "${case.担当者氏名}"}
```

### 6.6 人工一步，后面接着用

```yaml
values:
  確認相手の電話番号: {value: "", source: human, row: 35}
steps:
- row: 35
  do: manual
  note: 電話で確認相手に架電し、相手の電話番号を控える
- row: 36
  on: 照会・検索画面
  do: fillAll
  use: [確認相手の電話番号]     # 人工 [v] 输入的值在这里被取到
```

`--yes`（无人值守）时 `manual` 只记 PENDING，不会停下来问，那次人工输入也就不会写进 `values`。

---

## 7. 常见改法（菜谱）

| 想做的事 | 改哪里 | 别忘 |
|---|---|---|
| 改一个值 | 「数据」页对应行 | `row` 保持别紙行号 |
| 加一步 | palette 点原语 → 拖到位置 → 填字段 | 新步骤默认追加在末尾 |
| 换环境 | 「流程」页 `env` | 剖面文件里要有那个键 |
| 换一本的数据 | 只改 `values` 和 `start` | 顶层 `case` 必须同时改 |
| 行内控件认错行 | 给 `target.anchor` 换成真正的业务值 | 别改成"看起来像"的值 |
| 弹窗标签找不到 | `popup: true` + `popupScreen` | `on` 仍写手顺画面 |
| 等页面稳定 | `waitUntil` + `screenIs(画面)` / `selector(#id)` | 不许 sleep |
| 没有浏览器 | `mode: external`，只留 manual/externalIs | 不写 `start` |
| 别紙还没解析 | `expect.ref: {appendix: 表示内容１, status: unresolved}` | 会记 PENDING，不是通过 |
| 加截图证据 | 步骤加 `evidence: 画面HC` | `evidencePolicy: none` 时不截 |

---

## 8. 改完必须跑什么

| 门 | 命令 | 通过条件 |
|---|---|---|
| L0 结构 | `check-flow.mjs <yaml>` | `errors 0`（`PENDING` 不是通过） |
| L0.5 真实 DOM | `check-patch.mjs --flow <yaml> --capture <dir>` | 每个 selector `OK (1/1)`；`ANCHOR` / `NO-CAPTURE` / `PENDING` 都要解释 |
| L1 mock | `run-flow.mjs <yaml> --base http://127.0.0.1:10117/AMB/dummy.html --headless --yes` | 不是"全绿"，而是每步落在正确画面、值回读一致 |
| L2 真机 | `run-flow.mjs <yaml> --live --login --demo` | 截图齐全，人在场看 |

Studio 里：「检查」= L0；「▶ 运行」= L1；L0.5 和 L2 必须在终端做。

---

## 9. 一页速查

```
一本 = 一段程序
  case / env / values / start / evidencePolicy   ← 参数区
  steps[]                                        ← 指令区
    一个 step = row + on + do + target/value/use + expect + evidence

值从哪来
  fillAll  → values[标签名]          （运行期查，人工输入可覆盖）
  fill     → 本步 value: ${case.x}
  chooseRow→ target.anchor            （认行，不是填值）
  env      → flows/env/<env>.yaml     （顶层 env: 选剖面）

表达式
  ${case.x}  ${prev.x}(=case.x)  ${env.x}  ${sys.today|now|today+Nd}
  全部在编译时展开；${...} 里的名字不存在 = 错误

三个不许
  不许猜 selector（找不到就报错+行号）
  不许用 sleep（只等条件：waitUntil）
  不许为了变绿改断言 / 把 PENDING、ANCHOR 当通过
```

---

相关：[16-LANGUAGE.md](16-LANGUAGE.md)（规则全集）·
[17-USAGE.md](17-USAGE.md)（怎么做）·
[20-YAML-AS-LANGUAGE.md](20-YAML-AS-LANGUAGE.md)（为什么这样设计）·
[21-WRITE-A-FLOW.md](21-WRITE-A-FLOW.md)（白话版写一本）
