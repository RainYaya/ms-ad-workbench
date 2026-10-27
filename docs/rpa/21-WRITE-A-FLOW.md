# 白话版：自己写一本流程（从零到能跑）

> 这页不讲原理，只讲**动手顺序**。
> 原理看 [20-YAML-AS-LANGUAGE.md](20-YAML-AS-LANGUAGE.md)，语法看 [16-LANGUAGE.md](16-LANGUAGE.md)。
>
> 一句话：**一份 YAML 就是一本手顺。你只要回答三个问题——在哪、做什么、填什么。**

---

## 0. 先记住这张表

| 你脑子里的动作 | YAML 里写什么 |
|---|---|
| 这一步在第几行手顺 | `row: 数字`（照抄手顺行号） |
| 现在应该在哪个画面 | `on: 画面名`（照抄手顺「遷移」那一行） |
| 要做什么 | `do: 动作名` |
| 对哪个按钮 / 输入框 | `target: {label: 手顺上的那个字}` |
| 填什么 | `value: "${case.别紙里的名字}"` |
| 这一行要有几个字段 | `use: [字段1, 字段2]` |

**先不用管 selector。** 你只写“手顺上的字”，系统自己去查控件。

---

## 1. 动手前，手里要有三样东西

1. **手顺**（这一本的 Excel）——告诉你每一行做什么。
2. **别紙**（值）——告诉你填什么。
3. **真实页面**（capture）——告诉你页面上到底有什么。

第 3 样怎么来：

```bat
node automation\node-runner\capture.mjs --url "http://127.0.0.1:82/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00" --out capture-今天 --edge
```

浏览器打开后，**手动把这一本走一遍**，走完 Ctrl+C。

> 没有真实页面也能写，但 `check-patch` 用不了，等于闭着眼睛写。**最好先抓。**

---

## 2. 把材料摊开（不用自己整理）

```bat
node automation\node-runner\make-brief.mjs --case AZ-110-01-009 --capture capture-今天
```

打开 `brief\AZ-110-01-009\`：

| 文件 | 看它干嘛 |
|---|---|
| `01-HAND.txt` | **这就是你的“程序清单”**：第几行、做什么、值是什么 |
| `02-INDEX.txt` | 页面上有哪些字（按钮、输入框、表格） |
| `03-SCREENS-*.txt` | 真实 HTML，查控件时用 |
| `04-ROUTES.txt` | 走过的网址 → 画面名 |

**写流程时，眼睛只盯 `01-HAND.txt`。** 一行手顺 = 一个步骤。

---

## 3. 先搭骨架（复制这段就能开始）

新建 `flows/tests/AZ-110-01-009.mine.yaml`：

```yaml
case: AZ-110-01-009
title: シナリオ導線１
evidencePolicy: required

start:
  screen: 申込書品質管理メニュー画面
  url: /mhkcmwa11/AMA01

values:
  # 先空着，下面第 5 步再填

steps:
  # 一行手顺 = 一个步骤，下面第 4 步再填
```

`case` 必须和本号一致。`start.screen` 写手顺第一行之前的那个画面。

---

## 4. 一行手顺 → 一个步骤（抄这段对照表）

| 手顺上写 | 你就写 |
|---|---|
| `ボタン「X」押下` | `do: click` + `target: {label: X}` |
| `入力 X`（一个字段） | `do: fill` + `target: {label: X}` + `value` |
| `入力 各項目に入力`（一整个别紙块） | `do: fillAll` + `use: [块里所有字段]` |
| `遷移 画面Y` | `do: screenIs` + `on: 画面Y` |
| `表示 画面Y` | `do: screenIs` + `on: 画面Y` |
| `表示 X = 值` | `do: fieldIs` + `expect: {fields: [{label: X, equals: 值}]}` |
| `Msg「MAZG...」` | `do: messageIs` + `expect: {message: {code: MAZG...}}` |
| `DL 文件` | `do: downloadIs` + `expect: {download: {ext: pdf}}` |
| 批处理 / DB / 邮件 | `do: manual` 或 `mode: external` |

**照抄这五个模板：**

```yaml
# ① 点按钮
- row: 14
  on: 申込書品質管理メニュー画面
  do: click
  target: {label: 新規登録}

# ② 确认画面（幾乎每行「遷移」都要一个）
- row: 15
  on: 不備内容入力画面－新規
  do: screenIs
  evidence: 画面HC

# ③ 一次填一组
- row: 16
  on: 不備内容入力画面－新規
  do: fillAll
  use: [入力区分, 契約マスタ, 種目]

# ④ 填一个
- row: 24
  on: 募集人検索画面
  popup: true
  do: fill
  target: {label: 部店課支社コード}
  value: "${case.部店課支社コード}"

# ⑤ 弹出窗口里的操作（别忘 popup: true）
- row: 27
  on: 募集人検索画面
  popup: true
  do: chooseRow
  target:
    label: 選択欄ラジオボタン
    anchor: "${case.募集人ID}"
```

**规则只有一句话：手顺有几行操作，就写几个步骤；一行都不许省。**

（`screenIs` 也算一行。同一画面连续几行，就连续写几个 `screenIs`。）

---

## 5. 值：从别紙来，不从“上次跑通的值”来

```yaml
values:
  証券番号: {value: AZ11001, source: case, row: 10}
  部店コード: {value: "${env.部店課支社コード}", source: env}
  確認日: {value: "${sys.now}", source: sys}
  契約マスタ: {value: false, source: literal, row: 7}
```

- `source: case` → 别紙里的值，**必须写 row**（别紙行号）。
- `source: env` → 环境值，放 `flows/env/`，不要抄进每本书。
- `source: sys` → 只有 `today` / `now` / `today+7d`。
- **勾选框只写 `true` / `false`。** 别紙写「連動しない」就写 `false`。
- 别紙里没有的值 → 不要编。留空，跑的时候会显示 `PENDING`，让你现场确认。

**值写在两个地方：**
- 所有行都用同一个值 → 放 `values:`。
- 只有这一行用 → 直接写在步骤里：`value: "${case.担当者氏名}"`。

---

## 6. 行内控件：怎么“认出那一行”

页面上有 20 行，你要点第 7 行的按钮。**不要写“第 7 行”，写“这一行里有什么字”。**

```yaml
# 表格里点「修」，但要找“不備内容 = 添付書類もれ”的那一行
- row: 43
  on: 不備内容入力画面-更新
  do: click
  target:
    label: 修
    anchor: "${case.不備内容}"

# 表格里勾选某一行的复选框
- row: 42
  on: 不備内容入力画面-更新
  do: check
  target:
    label: 照会内容チェックボックス
    anchor: "${case.不備内容}"
  value: true

# 结果表里点某一行的 radio
- row: 27
  on: 募集人検索画面
  popup: true
  do: chooseRow
  target:
    label: 選択欄ラジオボタン
    anchor: "${case.募集人ID}"
```

**`anchor` 必须是“这一行才有”的值，而且必须是字符串。**
找不到就是 0 行（报错），找到两行也是报错——它不会替你挑。

> 最容易犯的错：**没写 anchor**。这时系统会拿 `value` 去当锚点，
> `value: true` 就变成“找文字是 true 的那一行”，看起来能跑，其实全错。

---

## 7. 弹窗：两个字段

| 字段 | 什么时候写 | 写什么 |
|---|---|---|
| `popup: true` | 这一步是在**弹出的窗口**里点的 | 固定写 true |
| `popupScreen` | 手顺里没写弹窗的画面名，但你知道它叫什么 | 弹窗的画面名 |

```yaml
- row: 24
  on: 募集人検索画面      # 手顺写的画面
  popup: true            # 动作发生在弹窗里
  do: fill
  target: {label: 部店課支社コード}
```

不写 `popup: true` 的后果：程序在主窗口里找弹窗的按钮，找不到，
报 `element not found`。**这一点 `check-flow` 查不出来，只有跑才知道。**

---

## 8. 写完，跑三条命令

```bat
:: ① 结构检查（快，0 error 才算过）
node automation\node-runner\check-flow.mjs flows\tests\AZ-110-01-009.mine.yaml

:: ② 拿真实页面校验每个按钮（必须 1/1 命中）
node automation\node-runner\check-patch.mjs --flow flows\tests\AZ-110-01-009.mine.yaml --capture capture-今天

:: ③ 真机上看着跑（先 --demo，每步都有红框）
node automation\node-runner\run-flow.mjs flows\tests\AZ-110-01-009.mine.yaml --live --login --demo --demo-delay 1500
```

### 报错 → 改哪里（照着改就行）

| 屏幕上写 | 意思 | 你改什么 |
|---|---|---|
| `row 16: label not in AMB/AMA04: 契約マスタ` | 这个画面上没这个字 | 检查措辞是否照抄；真没有就补控件（§9） |
| `row 16: label ambiguous ... (3 controls)` | 同一个字有三个控件 | `target` 加 `qualifier` |
| `row 17: screen mismatch: flow=A handPro=B` | 你的 `on` 抄错了 | 改 `on`，照抄手顺「遷移」 |
| `row 46: hand-procedure row not represented` | 你漏了这一行 | 补一个步骤 |
| `row 30: ... not defined in values` | 用了没定义的值 | 去 `values` 补，或改名字 |
| `chooseRow: anchor not found` | 页面上找不到这个值 | 换一个“这一行才有”的字段当锚点 |
| `chooseRow: anchor ambiguous` | 这个值出现在两行 | 换更特别的字段 |
| `element not found: #xxx` | 画面对了，真没有这个控件 | 重新抓页面，补控件 |
| `wrong screen: want X; at Y` | 顺序不对 / 弹窗没标 | 检查搬块、`popup: true` |

**永远不要**用这些办法“修”：
改断言、删步骤、加 sleep、强制点击、在流程里写 selector。

---

## 9. 缺控件怎么办（不用自己写 selector）

1. 在真实页面按 F12，右键目标 → Copy → Copy element。
2. 只复制**开始标签**，比如：

```html
<input type="radio" name="selectNo" value="0">
```

3. 跑：

```bat
node automation\node-runner\add-control.mjs --capture capture-今天 ^
  --screen 募集人検索画面 ^
  --html "<input type=\"radio\" name=\"selectNo\" value=\"0\">" ^
  --anchor 3028004586 ^
  --out flows\patches\AZ-110-01-009.control.yaml
```

4. 工具说 `OK (1/1)` 或模板校验通过，再决定要不要 `--apply` 写进共享控件库。

**行内控件让工具生成 `{value}` 模板，不要手写 `list[0]`。**

---

## 10. 替换、加行、改顺序

**改值** → 只动 `values`。

**加一行手顺** → 在 `steps` 里找个位置插一个步骤（`row` 写新的手顺行号）。

**改顺序** → 只改 `steps` 的排列，`row` 不动。
但记住：**搬就搬整块**（点开 → 进子画面 → 操作 → 回来）。
只搬一条，`check-flow` 依然 0 error，跑起来才会撞墙。

**删一行** → 不要删。手顺有的行必须都有步骤；不用做的写 `do: manual` 并说明原因。

**改断言** → 不许。断言是手顺要求看到的东西。

---

## 11. 给网页 AI 的话（照抄）

给 AI 的时候，**不要让它重写整本**。只贴三样：

1. 报错原文（一行）；
2. 出问题的那一小块 HTML；
3. 别紙的值。

再加这几句：

```
只修改 row 27 的 target，其他行不要动。
0 行或多行都算错，不要猜，不要取第一行。
不许写死行号（不要 list[0]、nth-child）。
锚点必须是字符串，并且是这一行才有的值。
勾选框只写 true / false。
不确定就在 note 里写清楚，不要编。
```

它回 YAML 之后：**存文件 → `check-flow` → `check-patch` → `--demo`**，一条都不能省。

---

## 12. 打印这一页就够了（检查清单）

```
□ case 和文件本号一致
□ start.screen 是手顺最开始的画面
□ 手顺每一行操作都有对应步骤（行数相等）
□ 每个动作的 on 照抄了「遷移」的画面名
□ 值是别紙来的，source 写了，case 带了 row
□ 勾选框只写 true / false
□ 行内控件都写了 anchor（字符串）
□ 弹窗里的动作都写了 popup: true
□ 没有手写 selector
□ 没有改 expect
□ check-flow 0 error
□ check-patch 0 error（ANCHOR 能解释）
□ --demo 看到每一步红框落在正确的控件上
□ PENDING 全部人工确认过
```
