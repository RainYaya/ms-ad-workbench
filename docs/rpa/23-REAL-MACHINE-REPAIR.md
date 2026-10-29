# 真机出问题怎么修（不需要 Python）

> 这一页只讲一件事：**在 SUT 上跑的时候某一步没找到控件，接下来做什么。**
> 从零写一本看 [19-REAL-MACHINE.md](19-REAL-MACHINE.md)；日常命令看 [17-USAGE.md](17-USAGE.md)；
> 字段和变量看 [22-STUDIO-FIELDS.md](22-STUDIO-FIELDS.md)。
>
> 结论先给：**真机修复 = 改数据文件（JSON/YAML），不改代码，不需要 Python，也不需要 AI。**
> 改完**不用重跑前半本**：同一个进程里按 `r` 就地续跑（§5）。

---

## 0. 一句话心智模型

一本 YAML 里写的是「点这个**标签**」。运行期由 5 个数据文件把标签翻译成 selector。
真机坏了，坏的是**这一次翻译**，不是程序本身 —— 所以修的是翻译表，不是代码。

```
flow.yaml  target: {label: 検索}
                │  flow-loader.lookup()
                ▼
ui-rowfields.json → flows/bindings.yaml → ui-controls.json → ui-dictionary.json → ui-aliases.json
                │
                ▼
selector: #select     ← 运行时真正拿去定位的东西
```

`flow-loader.mjs:94` 的 `lookup()` 就是这个顺序。**前面的命中，后面的就不看。**

⚠ 运行期的 `findLocator`（`run-flow.mjs:592`）是 `.first()`：几个元素同名时它**默默点第一个**。
"恰好 1 个"这个保证只存在于 `check-patch`。所以 §7 的第二步不能跳——它是唯一挡在"点错控件"前面的门。

---

## 1. 运行时只读这 6 个文件

| 文件 | 作用 | 谁写 | 手改安全吗 |
|---|---|---|---|
| `ui-screens.json` | 画面名 → 画面码 + 真机路由 | 人工（抓到新路由就补） | ✅ 安全，改完能离线验 |
| `ui-rowfields.json` | **覆盖层**：行内控件、日期、组合控件、特殊按钮 | `add-control --apply` 或人工 | ✅ 最安全，优先级最高 |
| `flows/bindings.yaml` | 手顺措辞 → 控件（auto / confirmed 才生效） | `build_bindings.py` + Studio 确认 | ✅ 安全，但它是**跨本共享**的 |
| `ui-controls.json` | 从**客户源码**挖出的全量控件库 | `tools/build_controls.py`（Python） | ⚠️ 是生成物，别手改；改了下次重建就丢 |
| `ui-dictionary.json` | 早期按 field_title/field_value 抽的标签表 | 生成物 | ⚠️ 同上 |
| `ui-aliases.json` | 措辞同义词（手顺说 A、画面写 B） | 人工 | ✅ 安全 |

**关键事实：`ui-controls.json` 是从 `reference/webapps/`（客户真实源码，Shift_JIS）生成的，
不是从 mock 生成的。**（`tools/build_controls.py:255` 默认 `--src reference/webapps`）
mock 只用来标记 `mockMissing`，是报告，不是来源。所以「真机和字典对不上」不是"系统是照着假页面做的"，
而是下面四种漂移之一。

---

## 2. 真机为什么会漂移（四个真实来源）

| 来源 | 表现 | 修法 |
|---|---|---|
| 快照版本差：`reference/webapps` 比线上 SUT 旧/新 | id/name 变了、按钮没了 | 覆盖层写新 selector |
| JS 动态生成的元素（结果列表、选项） | 静态 HTML 里根本没有 | 运行期按文字选；覆盖层写 `namePattern` |
| 路由/画面名差异 | capture 对不上画面、`screen not resolved` | 补 `ui-screens.json` 的 `routes` |
| 数据不同：抓包时的行值 ≠ 手顺的值 | `ANCHOR`、`chooseRow` 选不到行 | 用运行时的真实行值做 anchor |

注意最后一条：它**不是 bug**。`ANCHOR` 的意思是"模板形状已验，只是这份数据里没有这一行"。

---

## 3. 故障 → 改哪个文件（对照表）

先看报错在哪一步发生，再对表。所有报错都带 `row <手顺行号>`。

| 报错原文 | 发生在 | 原因 | 改哪里 |
|---|---|---|---|
| `row 42: label not in AMB/AMA04: 検索` | `check-flow` | 这个画面的字典里没有这个措辞 | `ui-rowfields.json`（`add-control --apply`）；若是同义词 → `ui-aliases.json` |
| `row 42: label ambiguous in … (N controls)` | `check-flow` | 同名控件有多个（可见按钮 + 隐藏备用） | `add-control` 写确定的 selector，或给 `target.qualifier` |
| `row 14: screen not resolved: …` | `check-flow` | 画面名不在 `ui-screens.json` | `ui-screens.json` 补画面 + `routes` |
| `row 14: screen mismatch: flow=X handPro=Y` | `check-flow` | `on:` 写错（不是真机问题） | 改 YAML 的 `on:` |
| `!! NOT IN ui-screens.json`（make-pack 的 `routes.md`） | `make-pack` | 走过的 URL 没登记 | `ui-screens.json` 的 `routes` |
| `element not found: #regist (pages: …)` | `run-flow` | 真机上这个 selector 不存在 / 名字变了 | `add-control` 换成真机上的 selector |
| `select did not match: want=要 options=[…]` | `run-flow` | 选项文字和值不一样（可能是全角/空格） | 改 `values` 的值，或加 `{label, value}` 内联 |
| `check value must be boolean` | `run-flow` | 勾选框给了字符串 | 改 YAML：`value: true` |
| `rowsAtLeast: got 0` | `run-flow` | 还不在结果画面，或搜索没出来 | 先看 `--demo` 落点；不是控件问题 |
| `ANCHOR`（`check-patch`） | `check-patch` | 模板对，锚点值不在这次 capture 里 | 用运行时真实行值再验；**不要改锚点凑绿** |
| `NO-CAPTURE`（`check-patch`） | `check-patch` | 这份 capture 没有该画面 | 补抓 |

---

## 4. 三条修复路径（成本从低到高）

### A. 先看落点（不改任何东西）

```bat
node automation\node-runner\run-flow.mjs flows\tests\X.ai.yaml --live --demo --demo-delay 1500
```

每步有横幅 + 红框，**Space 暂停**。看到哪一步停在错画面，记下 `row`。
很多"找不到控件"其实是 `on:` 写错或上一步没点成功。

### B. 就地修：用失败时自动存下的真机页面（推荐，不用重新抓）

`run-flow` 一失败，会把**当前真机页面**存进 logs，并在文件头写一行 `<!-- rpa-url: … -->`：

```
logs\<case>-flow\003_r42_FAIL.png     ← 失败画面截图
logs\<case>-flow\003_r42_FAIL.html    ← 失败画面的完整 DOM（第一行是当时的 URL）
```

为什么要有那行注释：这个 SUT 的画面标题是 JS 运行时才填的（`ui-screens.json` 里
`titleRuntime: true`），存下来的 HTML `<title>` 是空的；没有 URL 就无法把这份页面认成某个画面。
`dom-check` 读这行注释，按「路由 > 标题 > 控制器码」认画面，和别处同一条规则。

这个目录本身就能当 `--capture` 用（`dom-check.mjs` 支持"一堆 .html"的目录）。
所以修一个控件只要三步：

```bat
:: ① 从真机页面复制那个元素：DevTools → 右键元素 → Copy → Copy element
node automation\node-runner\add-control.mjs ^
  --capture logs\AZ-110-01-009-flow --screen 不備内容入力画面-更新 ^
  --label 照会内容チェックボックス ^
  --html "<input type=""checkbox"" name=""list[0].inquiry_contents_edit_flag"">" ^
  --anchor 添付書類もれ

:: ② 看它打印的 matches / anchor 结果，确认是 1 match
:: ③ 确认后再写进覆盖层（加 --apply）
```

`--apply` 会先备份到 `flows/.backup/ui-rowfields.*.json` 再写 `ui-rowfields.json`。

两个注意：

- **这个改动之前的旧 FAIL.html 没有 URL 注释**（<title> 是空的），认不出来。
  对旧文件只能用 C 重新抓一次；新跑出来的才有注释。
- 同一画面在 logs 里可能有多份 FAIL.html，工具取**文件排序里的最后一份**（通常是最终状态）。
  想指定某一份，就把那一份单独复制到一个空目录里再 `--capture`。

> 如果 `add-control` 报 `capture has no page for screen '…'`：说明这份 HTML 既没有 URL 注释、
> 标题也认不出画面。这时走 C：用 `capture.mjs` 走一遍，或把那个 URL 补进
> `ui-screens.json` 的 `routes` 再试。

### C. 全量抓一次（画面都没走过时）

```bat
node automation\node-runner\capture.mjs --url "<真机入口>" --out capture-今天 --edge
```

浏览器打开后**手动走完整本**，每换画面自动存一份，Ctrl+C 结束。
然后回到 B（`--capture capture-今天`）。

---

## 5. 修完就续跑（`r`）——不重跑前半本

前面的 A/B/C 只解决"怎么改"。这一节解决"改完怎么继续"。

**前提**：`run-flow` 那个进程还活着，浏览器窗口还在。两种进入方式：

- 失败菜单里按 `k`（take over）：浏览器留着，跑完停在结尾提示符。
- 就是跑完了有头运行，结尾本来就停着等你按 Enter。

在提示符输入：

| 输入 | 意思 |
|---|---|
| `r` | 从**最后执行过的那一行的下一行**继续 |
| `r 23` | 从手顺第 23 行开始，**23 行本身会重做** |
| Enter | 关浏览器，结束 |

```
[Enter] 关闭浏览器   [r] 从「最后执行的行之后」继续   [r <行号>] 从该行继续（重新做这一行）
  > 
```

按下去之后发生的事，按顺序：

1. **先 `check-flow`。** 编译不过 → 打印带行号的错误并拒绝，浏览器一步也没动；
   能编译但有画面链警告 → 问一次「仍然继续？」。
2. 重读 YAML **并丢掉 6 个数据文件的缓存**（`ui-screens` / `ui-controls` / `ui-dictionary` /
   `ui-aliases` / `ui-rowfields` / `bindings.yaml`）。所以 `add-control --apply` 之后
   **不用重启进程**，直接 `r` 即可。
3. 在同一页面上接着跑：不重新登录、不回起点、前面 OK 的行不重复执行。
4. 重写 `run.json` / `run.html`；`run.json` 的 `reloads` 记下每次再読込的 `{at, row, steps}`。

**两条边界（刻意的，不是 bug）**：

- **跳回走过的行，副作用会重做一次。** `r 23` 会从 23 行一路往后重做；24 行如果写过 DB（按过「更新」），
  就再写一次。真机上先看业务状态再决定跳不跳。
- **每一步执行前仍然验画面。** 浏览器停在 30 行的画面时 `r 23`（23 行在别的画面）= `wrong screen`。
  跨画面跳回去，要么先把页面带回那个画面，要么直接重启一本。

典型用法：第 46 行是行内勾选框，`add-control` 补完 → 在失败菜单按 `r` → 从 46 行重做 → 继续 47、48……

---

## 6. `add-control` 的四种输入

| 你要什么 | 怎么写 | 说明 |
|---|---|---|
| 从 DevTools 复制的元素 | `--html '<input name="x">'` | 有 `id` 用 `#id`，没 id 用 `[name="…"]` |
| 已知 selector | `--selector 'input[name^="list["]'` | 不解析 HTML |
| 行内控件（每行一个） | 上面 + `--anchor <可见值>` | 不给 anchor 会直接报错："row-scoped and needs a row anchor" |
| 元素类型要覆盖 | `--kind radio\|checkbox\|select\|button\|link` | 一般能自动推断，推断不出时用 |

输出必须自己读一遍：

```
matches 20  visible 20        ← 说明是行内控件，必须给 anchor
anchor  添付書類もれ -> 1 match
template tr:has(td:text-is("{value}")) [name^="list["][name$=".inquiry_contents_edit_flag"]
```

- `0 matches` → selector 不在这个画面，或者 `--screen` 指错了页面。
- `visible 0` → 元素存在但隐藏。**隐藏元素不是控件**，工具会拒绝。
- 多个命中且没 anchor → 报错并列出每行文字，让你挑一个能唯一识别行的值。

`--anchor` 用**业务值**（照会コード / 募集人ID / 証券番号 / 項目コード），不要用行号。

---

## 7. 改完的验证顺序（都是 Node）

```bat
:: ① 结构 / 标签能不能认（离线，秒级）
node automation\node-runner\check-flow.mjs flows\tests\X.ai.yaml

:: ② 每个 selector 在真实 DOM 里是不是恰好 1 个、可见
node automation\node-runner\check-patch.mjs --flow flows\tests\X.ai.yaml --capture logs\AZ-110-01-009-flow

:: ③ 真机演示
node automation\node-runner\run-flow.mjs flows\tests\X.ai.yaml --live --demo --demo-delay 1500
```

①→②→③ 的顺序不能反。②只验证 selector，不验证值；③才验证值。

---

## 8. 影响面和备份

| 你改了 | 影响范围 | 备份 |
|---|---|---|
| `ui-rowfields.json` 的一条 | **那个画面的所有本**（不只这一本） | `flows/.backup/ui-rowfields.<时间戳>.json` |
| `flows/bindings.yaml` | 那个画面的所有本（只对 auto/confirmed 生效） | `flows/.backup/bindings.<时间戳>.yaml` |
| `ui-screens.json` 的 `routes` | 所有本（画面识别） | 无自动备份，先复制一份 |
| `ui-aliases.json` | 所有本 | 无自动备份 |
| `flows/overrides/<case>.yaml` | **只有这一本** | 无（小文件，靠 git） |

只想改一本、又不想影响别的本 → 用 `flows/overrides/<case>.yaml`：

```yaml
overrides:
  - row: 42
    reason: この行は表の行内チェック。実機の name が list[n] 形式で辞書に無い。
    binding: {label: 照会内容チェックボックス, selector: 'tr:has(td:text-is("添付書類もれ")) [name^="list["][name$=".inquiry_contents_edit_flag"]'}
```

覆盖层允许：`skip` / `do: manual` / `capture` / `valueFrom` / `binding`，
**不允许改 `expect`**（改期望 = 改考题，`flow-loader.mjs:278` 直接报错），而且必须写 `reason`。

---

## 9. 什么时候才需要 AI / Python

| 场景 | 工具 | 要 AI 吗 | 要 Python 吗 |
|---|---|---|---|
| 某个控件找不到 | `add-control` | ❌ | ❌ |
| 某个画面认不出 | `ui-screens.json` 补 routes | ❌ | ❌ |
| 某个值填错 | 改 YAML 的 `values` / `use` | ❌ | ❌ |
| 整本流程要从手顺重新生成 | `make-brief` → Copilot → `save-clip` | ✅ | ❌ |
| 从客户源码重建控件库 | `tools/build_controls.py` | ❌ | ✅ |

**关键：修一个控件不需要 AI，也不需要 Python。** AI 只在"把整本手顺翻译成 YAML"时才有用。

公司机通常没有 Python，也不需要装：上面唯一需要 Python 的是全量重建，
而全量重建需要 `reference/webapps/`，那一份本来就不随包发（客户源码，local-only）。
所以设计上真机修复一律走覆盖层 —— 这是刻意的，不是权宜之计。

---

## 10. 红线

- 不猜 selector：0 个命中就报错，不允许"看起来像"就填。
- 不手改 `ui-controls.json`：那是生成物，重建会覆盖。
- 不把 `ANCHOR` / `PENDING` / `NO-CAPTURE` 当通过。
- 不为了变绿改 `expect`，也不改捕获数据。
- `capture-*/`、`logs/`、`实机dom/` 不进公开仓库。

---

## 11. 一页流程

```
真机某步失败
  ├─ 看 logs\<case>-flow\NNN_rXX_FAIL.html / .png
  ├─ DevTools 复制正确元素
  ├─ add-control --capture logs\<case>-flow --screen <画面> --label <措辞> --html "<元素>" [--anchor <行值>]
  ├─ 确认 matches / anchor / template 都是 1
  ├─ 加 --apply（自动备份 ui-rowfields.json）
  ├─ check-flow → check-patch → --live --demo
  ├─ 「k」留住浏览器，改完在结尾提示符按 r（或 r <行号>）→ 就地续跑，不重跑前面
  └─ 还是不行 → capture.mjs 全量抓一次再回到 add-control
```
