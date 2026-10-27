# 把流程 YAML 当成一门语言

> 这份文档不教命令，教**这门语言本身**。读完你应该能回答：
> 这段 YAML 为什么能跑 / 为什么跑错 / 哪里必须由人决定 / 哪些可以放心交给外部 AI。
>
> 语法参考：[16-LANGUAGE.md](16-LANGUAGE.md)（规范，自包含，可直接交给 AI）。
> 本页是**解释**：用编程语言的概念讲清楚它为什么长这样。
> 只想动手、不想看原理 → [21-WRITE-A-FLOW.md](21-WRITE-A-FLOW.md)（白话版）。

---

## 0. 一句话

**一份 YAML = 一个程序；一次运行 = 执行它一次。**

它是一门**没有循环、没有条件、没有函数**的语言。不是偷懒，是因为手顺书本身就是
一条固定的操作链；自由度来自**组合**（17 个原语 × 值 × 控件），而不是来自控制流。

---

## 1. 概念对照表

| 编程语言 | 这套系统 | 在哪 |
|---|---|---|
| 源码 | `flows/<CASE>.yaml` | 一本书一个文件 |
| 指令集 | 17 个原语（`click` / `fill` / `screenIs` …） | 16 §5.1 |
| 变量 | `values:` 里的条目 | 同一个文件 |
| 字面量 | `source: literal` | 同一个文件 |
| 外部输入 | `source: case`（别紙）、`env`（环境）、`human`（人工） | 别紙 / `flows/env/` |
| 表达式 | `${case.X}` `${env.X}` `${sys.today+7d}` | 只有白名单里的几种 |
| 前置条件 | `on:`（这一步之前必须在哪个画面） | 每个步骤 |
| 断言 | `expect:`（六种） | 每个步骤 |
| 函数调用 | 无。需要复用就**拆成另一本书** | — |
| 指针 / 符号 | `target.label` → 控件 | 解析链见 §6 |
| 数组下标 | **没有下标**。用 `anchor` 按值找行 | §6.3 |
| 类型 | 控件 `kind` + 值的形态 | §3 |
| 链接器 | `ui-controls.json` / `ui-dictionary.json` / `bindings.yaml` / `ui-rowfields.json` | 仓库根 |
| ABI | 真实 DOM（id / name / 表格结构） | 抓回来的 capture |
| 编译器 | `check-flow.mjs` | L0 |
| 链接期检查 | `check-patch.mjs` | L0.5 |
| 运行时 | `run-flow.mjs` | L1 / L2 |
| 异常 | ERROR / PENDING / ANCHOR / NO-CAPTURE | §7 |

**记住一句话：YAML 里不写 selector。** selector 是“链接产物”，写在控件层。

---

## 2. 程序结构

```yaml
case: AZ-110-01-009        # 主键：必须和文件名、手顺本号一致
title: シナリオ導線１        # 注释性质
evidencePolicy: required    # 证据策略：required | all | failures | none
start:                      # 入口
  screen: 申込書品質管理メニュー画面
  url: /mhkcmwa11/AMA01     # 真机路径；mock 用 --start-url 覆盖
env: prod-a                 # 可选：环境剖面 flows/env/prod-a.yaml

values: { ... }             # 变量表
steps: [ ... ]              # 语句序列（顺序 = 执行顺序）
```

**三个字段的含义容易混，分开记：**

| 字段 | 谁用它 | 语义 |
|---|---|---|
| `row` | 编译器 | 这一步**对应手顺第几行**。出身证明，不是执行顺序。 |
| `on` | 运行时 | 执行前**必须站在**哪个画面。不满足就失败，不会自动跳过去。 |
| `do` | 运行时 | 执行哪个原语。 |

> 执行顺序 = `steps:` 的排列顺序。`row` 只是标签，所以你可以重排，但重排后
> 每一步的 `on` 必须仍然成立（见 §8.2）。

---

## 3. 类型系统

### 3.1 值有三种「来源类型」

`case`（别紙）、`env`（环境）、`sys`（系统生成）、`literal`（写死）、
`prev`（上一步结果）、`blank`（故意留空）、`human`（人工输入）。

`case` / `human` / `blank` / `auto` 必须写 `row`（别紙行号）——**没有行号的值不合法**。

### 3.2 控件有「控件类型」

`text` / `select` / `checkbox` / `radio` / `button` / `rowfield`（行内）/
`datetime`（日期组合）/ `dialog`（浏览器弹窗伪控件）。

### 3.3 四条硬规则

| 规则 | 反例 | 正确写法 |
|---|---|---|
| 勾选框 / 单选只收**布尔** | `契約マスタ: 連動しない` | `契約マスタ: false`（別紙「連動しない」= OFF） |
| 下拉框的值是**选项文字**，不是 value | `保険種類: "00"` | `保険種類: "00：自賠責"` |
| 行内控件的锚点必须是**字符串** | `anchor: true` / 对象 | `anchor: "${case.不備内容}"` |
| 一条值只能对应一个形态 | `value: {value: 否, source: literal}` | `value: "否"` |

**这些错误编译器现在抓不全**（见 §7.2），所以你要自己先按这张表过一遍。

---

## 4. 求值

```yaml
values:
  証券番号: {value: AZ11001, source: case, row: 10}
  部店コード: {value: "${env.部店課支社コード}", source: env}
  確認日: {value: "${sys.now}", source: sys}
```

- `${...}` 只有这几种：`${case.名}` `${env.名}` `${prev.名}` `${sys.today}`
  `${sys.now}` `${sys.today+7d}`。**不是代码**，没有函数、没有运算。
- 值在**步骤执行时**求值，不是加载时——所以 `prev` 能拿到上一步的结果。
- 引用了不存在的名字 → 编译错误（带步骤行号）。
- 别紙值缺失 → 该值 `unresolved`，用到它的断言变成 `PENDING`。**PENDING 不是通过。**

---

## 5. 语句：17 个原语

| 类别 | 原语 | 参数 | 失败意味着 |
|---|---|---|---|
| 动作 | `click` | target | 控件不在 / 不可见 |
| 动作 | `fill` | target, value | 输入框不在 |
| 动作 | `select` | target, value | 选项文字找不到 |
| 动作 | `check` | target, value(bool) | 值不是布尔 / 勾不上 |
| 动作 | `chooseRow` | target{label, anchor} | 0 行或多行 |
| 动作 | `fillAll` | use[] | 某个标签在本画面没有控件 |
| 动作 | `press` | key | — |
| 动作 | `goto` | url, reason | reason 必填 |
| 等待 | `waitUntil` | screenIs / selector / idle | 超时 |
| 证据 | `capture` | of, name | 拍不到（记 missing） |
| 断言 | `screenIs` | expect.screen（默认取 on） | 画面不对 |
| 断言 | `fieldIs` | expect.fields | 回读不一致 |
| 断言 | `rowsAtLeast` | expect.rows.min | 行数不足 |
| 断言 | `messageIs` | expect.message.code | 报文不对 |
| 断言 | `downloadIs` | expect.download | 没下载 / 文件名类型不对 |
| 断言 | `externalIs` | expect.external | 外部证据未确认 |
| 人工 | `manual` | note | 停下来等人 |

**没有第 18 个。** 需要新动作时，用 `manual` 并写清楚，不要发明。

### 5.1 断言不能改

`expect` 是手顺要求的“看到什么”。真机对不上时，改的是**实现**（selector、
锚点、画面），不是断言。改断言 = 把测试删掉让它变绿。

---

## 6. 寻址：`label` 怎么变成控件

### 6.1 解析链（从上到下，第一个命中的赢）

1. 本别 pin（`target.__bindings` / 本别覆盖）
2. `ui-rowfields.json`（人工维护：行内控件、日期组合、限定按钮）
3. `bindings.yaml`（`画面|措辞` → 控件，人工确认过的）
4. `ui-controls.json`（从真实 HTML 挖的控件库，**精确标签**，多个候选就报 ambiguous）
5. `ui-dictionary.json`（旧的画面/字段/按钮表）
6. `ui-aliases.json`（别紙说法 → 前端说法）
7. 都没有 → **编译错误 + 手顺行号**

**没有模糊匹配。** “差不多”不成立。

### 6.2 四种 target

```yaml
target: {label: 登録}                          # ① 普通
target: {label: "....", qualifier: 保険種類欄の横}   # ② 同标签多个控件
target: {label: 修, anchor: "${case.不備内容}"}     # ③ 行内控件（按值找行）
target: {label: 選択欄ラジオボタン, anchor: "${case.募集人ID}"}  # ④ chooseRow
```

### 6.3 `anchor` 是“按值寻址”，不是下标

```yaml
do: chooseRow
target:
  label: 選択欄ラジオボタン
  anchor: "${case.募集人ID}"     # 3028004586
```

翻译成人话：**在结果表里找“某一格文字恰好是这个值”的那一行**，点那一行的 radio。

- 0 行 → 报错（不会取第一行）
- 2 行以上 → 报错（锚点不唯一）
- 换数据 → 自动跟着变，因为值来自别紙

**为什么禁止 `nth-child` / `list[0]`：** 行号会在真实数据里变；按值寻址才稳。

### 6.4 selector 模板里的 `{value}`

控件补丁写：

```yaml
selectorTemplate: 'tr:has(td:text-is("{value}")) input[name="selectNo"]'
```

运行时把 `{value}` 代入 **`target.anchor`**；**没有 anchor 时才代入步骤的 `value`**
（`flow-loader.mjs:362`）。

> 这就是本次踩到的坑：没写 anchor 时，`value: true` 会变成
> `tr:has(td:text-is("true"))`，看起来很合法，其实是错的。
> **行内控件一律显式写 anchor。**

---

## 7. 三个时间点：编译、链接、运行

### 7.1 四层关卡

| 层 | 命令 | 能证明什么 | 证明不了什么 |
|---|---|---|---|
| L0 编译 | `check-flow` | 结构、画面链、行覆盖、值来源、expect 类型 | 控件在不在、值形态对不对、顺序对不对 |
| L0.5 链接 | `check-patch` | 每个 selector 在**真实 DOM** 里恰好 1 个可见 | 数据对不对、弹窗行为、运行顺序 |
| L1 mock | `run-flow --headless` | 机械动作连得起来 | 真机数据、真弹窗、真报文 |
| L2 真机 | `run-flow --live --demo` | 真的能跑 | 证据是否齐全（看 `evidencePolicy`） |

### 7.2 编译器**不会**替你判断的事（实测清单）

- **顺序**：把一步搬到前面，`check-flow` 依然 0 error（它只对每步的 `on` 和手顺行，
  不对前后关系）。顺序只有运行期才验。
- **弹窗**：漏了 `popup: true`，编译和链接都看不出来；运行期会在主窗口找弹窗里的控件。
- **值形态**：勾选框给了字符串，L0 放行，运行期才报。
- **语义**：把“電話番号チェック”当成“照会内容”的值，机器不知道，只有人能发现。

> 所以：**L0 全绿 ≠ 能跑。** 这是设计上的诚实，不是缺陷；缺陷是这些错误还不够显眼。

### 7.3 结果标记

| 标记 | 含义 |
|---|---|
| `OK` | 通过 |
| `ERROR` | 必须改 |
| `PENDING` | 运行期才能确定 / 别紙未解析 —— **不是通过** |
| `ANCHOR` | 模板形状对，锚点值不在这份数据里 —— 需真实数据复验 |
| `NO-CAPTURE` | 这份 capture 没有该画面 |
| `FAIL` | 0 命中或多命中 |

### 7.4 运行失败协议

真机上失败时，命令行会停下问你：

```
[Enter]retry  [s]skip  [v]manual value  [k]take over  [q]quit  [a]stop all
```

- `s` 跳过会记在 `run.json` 里（skip 不是通过）。
- `k` 接管：浏览器保持打开，你手动做完再决定。
- 任何情况下都会**先截图再问**，失败现场不会被覆盖。

---

## 8. 定制化：四种改法

### 8.1 改值

只动 `values:`，不动 `steps:`。

```yaml
契約マスタ: {value: false, source: literal, row: 7}
```

判断依据永远是别紙，不是“上次跑通过的值”。

### 8.2 改顺序（最容易骗过检查器的地方）

- 执行顺序 = `steps:` 排列；`row` 不要动。
- **搬就搬整块**：“点开 → 进入子画面 → 操作 → 回到原画面”必须一起搬。
- 只搬一条，L0 仍然全绿，但运行期会在某一步报
  `wrong screen: want X; at Y`。
- 改完必须 `run-flow --demo` 看一遍；`check-flow` 不管顺序。

### 8.3 加一步

照手顺新增一行：

```yaml
- row: 23          # 手顺行号
  on: 募集人検索画面
  popup: true      # 动作发生在弹窗里就写
  do: fill
  target: {label: 部店課支社コード}
  value: "${case.部店課支社コード}"
```

落不下来时，先看 `check-flow` 的报错，再决定是补值、补控件，还是这行本来就该是 `manual`。

### 8.4 新控件

流程里**永远不写 selector**。缺控件时：

1. 复制真实元素的开始标签（F12）；
2. `add-control.mjs` 校验并生成补丁；
3. `--apply` 才写进 `ui-rowfields.json`（自动备份）。

行内控件用 `selectorTemplate` + `{value}`，不许写死 `list[0]`。

---

## 9. 和外部 AI 协作时的“语言约定”

网页 AI 没有仓库、不能跑工具，所以你要用**它听得懂、也验证得了**的方式说：

| 你给它 | 它应该产出 |
|---|---|
| 语言规范（`00-RULES.txt`） | 只输出 flow + control-patch 两个 YAML |
| 手顺 + 别紙（`01-HAND.txt`） | 每行一步，`row` 不许合并/删除 |
| 真实 DOM 索引 + HTML（`02` / `03-*`） | `target` 只写 `{label}`，行内控件带 `anchor` |
| 路由（`04-ROUTES.txt`） | `on` 照抄 遷移 的画面名 |

**给它错误原文时，只贴这三样：** 报错行、涉及的真实 HTML、别紙的值。
不要贴整本 YAML 让它“重写一遍”——它会顺手改掉你已经验过的行。

**判定口径要写死：**

> 0 行或多行都是错，不要猜；不许写死行号；锚点必须是字符串；
> 勾选框只写 true/false；不确定就写 note，不要编。

---

## 10. 这门语言故意不做的事

| 不做 | 为什么 | 替代 |
|---|---|---|
| 循环 | 手顺没有“重复 N 次”的语义 | 拆分成本，或 `manual` |
| 条件分支 | 分支写进 YAML 就变成“猜业务” | 不同情况 = 不同的本 |
| 函数/子流程 | 复用靠**控件层 + 绑定层**，不靠代码 | 共享控件补丁、绑定表 |
| 变量赋值 | 值只来自别紙 / 环境 / 系统 | `${prev.X}` 取上一步结果 |
| 运行时推断 | 猜出来的绿不算绿 | 报错 + 行号 + 截图 |

---

## 11. 一页速查

```
程序      = 一本书一个 YAML
顺序      = steps 排列（不是 row）
前置      = on（运行时会验）
断言      = expect（不许改）
值        = values（source 必填，case 要 row）
表达式    = ${case.X} ${env.X} ${prev.X} ${sys.today|now|today+7d}
控件      = target.label → 解析链（5 级）→ 无模糊匹配
行        = anchor（按值，不按下标）
弹窗      = popup: true（标签在弹窗里查：popupScreen）
形态      = 勾选框布尔 / 下拉选项文字 / 锚点字符串
编译      = check-flow（不管顺序、不管弹窗、不管值形态）
链接      = check-patch（真实 DOM，1/1 才是 OK）
运行      = run-flow（--demo 看顺序；失败先截图再问）
四周目    = 抓 → 打材料包 → AI → 存文件 → check → patch → demo
```
