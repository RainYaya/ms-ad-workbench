# 整条链 — 从一本手顺到一个点击

> 定稿：2026-10-27。这份文档回答三个问题：
> 文件之间谁连谁？点一下到底怎么找到控件？跑错了改哪里？
>
> 结论先行：**YAML 里没有 selector。** 书里只写"哪个画面、做什么、用哪个标签、值是什么"；
> "标签 → 控件"的对应关系在字典里。流程和参数属于业务，selector 属于前端，不混在一本 YAML 里。

---

## 0. 一句话

```
手顺数据 ──→ 控件字典 ──→ 绑定表 ──→ 本（YAML）──→ 编译 ──→ 检查 / 执行 ──→ 证据
 真值         label→id      措辞裁决      流程+参数       换 selector
```

---

## 1. 每一环是什么

```
v2/data/cases/*.js              手顺 + 別紙（唯一真值，1,386 本）
        │
        ├─ tools/build_controls.py
        │     reference/webapps/*.html ──→ ui-controls.json   54 画面 / 1,998 控件
        ├─ tools/build_ui_dictionary.py
        │     reference/webapps/*.html ──→ ui-dictionary.json label → selector
        │
        ├─ tools/build_bindings.py
        │     ──→ flows/bindings.yaml   519 条（auto 265 / 待确认 215 / confirmed 3 / blocked 36）
        │
        └─ tools/generate_books.py
              ──→ flows/books/*.yaml    131 本

ui-screens.json                 画面名 → ANB00/ANA05（人工维护，含 inferred）
ui-aliases.json                 別紙措辞 ↔ 画面措辞（人工）
ui-rowfields.json               行内控件 / 日期三段 / 组合控件（人工）
flows/*.yaml                    8 本手写（AZ-110-01-009 等）
flows/overrides/<本>.yaml        本别覆盖（只改"怎么做"）
flows/env/prod-a.yaml            环境值
        │
        ↓ flow-loader.mjs:317  compileFlow()   ← label 在这里换成 selector
        ├─→ check-flow.mjs   不跑浏览器：所有 target 都能解析吗（L0）
        └─→ run-flow.mjs     Edge 里真跑：找元素、点、填、断言、截图
                ↓
           logs/<本>-flow/{run.json, 001_r15_画面HC.png, ...}
```

| 文件 | 谁生成 | 谁消费 | 内容 |
|---|---|---|---|
| `v2/data/cases/*.js` | 人工 | 三个 build 脚本 | 手顺行、别紙、期望值 |
| `reference/webapps/*.html` | 前端源码 | `build_controls.py` / `build_ui_dictionary.py` | class / id / name |
| `ui-screens.json` | 人工维护（一次性生成后手改）| flow-loader | 手顺画面名 → 画面码 |
| `ui-controls.json` | 生成 | flow-loader、Studio | 每个画面的控件清单 + selector |
| `ui-dictionary.json` | 生成 | flow-loader | label → selector |
| `ui-aliases.json` | 人工 | flow-loader | 別紙措辞 ↔ 画面措辞的同义词 |
| `ui-rowfields.json` | 人工 | flow-loader | 行内控件、日期三段、组合控件 |
| `flows/bindings.yaml` | 生成 + Studio 确认 | flow-loader | 手顺措辞 → 控件，带 status |
| `flows/books/*.yaml` | 生成 | flow-loader | 流程 + 参数 |
| `flows/overrides/<本>.yaml` | 人工 | flow-loader | 本别例外（必须写 reason）|

真正"连接文件"的只有两个东西：

- **label**：书里的 `target.label` 去字典/binding 表里换 selector（编译期，一次性）
- **row / screen**：`on:` 决定查哪个画面的字典；`row:` 把每一步对回手顺行号，报错时你才知道是哪一行

---

## 2. 一步是怎么走完的

`flows/books/AY-120-08-001.yaml` 第 17 行：

```yaml
- row: 17
  'on': 照会・検索画面
  do: click
  target:
    label: 検索
```

运行期：

1. `pageForScreen('照会・検索画面')` → `ANB00/ANA05`（`ui-screens.json`）
2. `lookup('ANB00/ANA05', '検索')` — `flow-loader.mjs:94` → `#select`
3. `findLocator({selector: '#select'})` — `run-flow.mjs:425` → `pg.locator('#select').first()`，轮询等它出现
4. `loc.click()` — `run-flow.mjs:839` → Playwright 检查可见 / 未禁用 / 能收到点击
5. 下一行 `screenIs` 截图存证

`証券番号` 同理 → `#policy_number`，`fill` 走 `loc.fill()`。
**点的是 id / name，不是 value。**

---

## 3. target 的解析优先级（从上到下，命中即停）

| # | 来源 | 什么时候用 |
|---|---|---|
| 1 | 步骤 pin：`target.__bindings[label]` / overrides 的 `binding` | 本别特例（同画面两个「検索」）|
| 2 | `ui-rowfields.json` 覆盖层 | 行内控件 `{n}`、日期三段、组合控件 |
| 3 | `flows/bindings.yaml` 里 confirmed / auto 的规则 | 手顺措辞 ≠ 画面措辞时的人工裁决 |
| 4 | `ui-controls.json` 精确 labelKey 的唯一控件 | 主力，从真实 HTML 扫出来 |
| 5 | `ui-dictionary.json` 的 fields / buttons | 同一批数据的旧一层 |
| 6 | `ui-aliases.json` 显式同义词 | 「課支社コード」→「部店課支社ｺｰﾄﾞ」|

第 4 层同标签有多个控件时，只有**静态源码里唯一可见**的那个才算数；否则 `ambiguous`。
第 6 层之后**没有模糊匹配**（`flow-loader.mjs:169`）：猜错就是静默点错，所以查不到就返回 null。

null 的结果是编译期报错，带手顺行号：

```
row 27: label not in AMB/AMA04: 検索
row 27: label ambiguous in AMB/AMA04: 検索 (3 controls)
```

`check-flow` 里就是 error；`run-flow` 不会开浏览器就退出。这就是"字典没有就报错 + 行号"。

---

## 4. value 不参与定位

`value` 只在四个地方用：

| 用途 | 说明 |
|---|---|
| `chooseRow` 的行锚点 | 表格里含这段文字的**唯一**一行；0 行或 2+ 行都报错 |
| `select` 选选项 | `selectByText` 按选项文字匹配，NFKC + 去空白只算拼写差异 |
| `fieldIs` 回读比较 | 断言读出来的值，不看控件怎么找 |
| `fill` 写入 | 写进去的内容本身 |

---

## 5. 运行期找元素的两条特殊路径

**行内控件 `{n}`** — `run-flow.mjs:312 resolveRowName`：
name 模板（如 `gyoumu_list[{n}].field`）里的行号不是配置死的，是从当前 DOM 找出来的。
- 唯一一个行号 → 记住它（同画面后续行内控件复用）
- 表里嵌套表导致同一行重复 → 合并后唯一才通过
- 0 个或 2+ 个 → `rowfield ambiguous` 报错，不猜

**chooseRow** — `run-flow.mjs:589`：先按锚点文字找行；找不到再看 listbox（`<option>` 列表）。
0 个或 2+ 个都是错误。

两条路径的共性：**唯一性不满足就报错，绝不取第一个。**

---

## 5.1 实机页面的身份：路由 > code

`screenIs` 比对的是"这个 URL 是哪个画面"，不是标题。mock 里画面码和文件一一对应，真机不是：
同一个控制器码会渲染两个不同的手顺画面。

| 手顺画面 | mock URL | 真机 URL（capture 2026-10-28）|
|---|---|---|
| 申込書品質管理メニュー画面 | `/AMB/AMA01.html` | `/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00` |
| 不備内容入力画面－新規 | `/AMB/AMA03.html` | `/mhkcmwa11/AMA01/aZG001To03` |
| 不備内容入力画面-更新 | `/AMB/AMA04.html` | `/AMA03/aZG100Regist`、`/AMA04/aZG101UpdateBusinessNotify` |

只按 code 匹配会把"还停在菜单"误判成"已进入新規画面"（都是 AMA01）。所以
`ui-screens.json` 给画面加了 `routes`，每条注明来源 capture。匹配规则：

1. URL 命中某画面的 `routes` → **只认那个画面**（路由比 code 具体）
2. 没命中 → 退回控制器码（mock 走这条）

代码：`run-flow.mjs` 的 `screenNamesForUrl`。测试时用 `/AMA01/aZG001To03` 断言
"メニュー画面"会失败、断言"不備内容入力画面－新規"会通过——两个方向都验过。

真机执行还需要两个开关（不是原语，不占 17 个名额）：

- `--login [--login-url URL]`：打开登录页，人工登录后按回车；**不做自动登录**
- `--start-url URL`：登录后跳到真机起始路由（flow 里写的是 mock 路径）

对齐工具（只读，不改任何东西）：

```bat
python tools\align_capture.py --capture capture-20261028
```

它用同一套身份规则（路由优先，没有路由时退回标题/控制器码）把每个抓到的页面归到字典画面，
再拿运行期真正的 `dictSelector` 去实机 DOM 里找，输出 `mapped / missing / unbound`。
`unbound` 多数是手顺没用到、字典也没建的控件，不等于错误。

---

## 6. 跑错了看哪里

| 报错 | 真正的问题 | 改哪里 |
|---|---|---|
| `row N: label not in <screen>: X` | 字典里没这个标签 | 绑定表确认 / rowfields / 重建控件库 |
| `row N: label ambiguous in <screen>: X` | 同标签多个控件 | 绑定表选定一个（Studio「绑定」页）|
| `element not found: #xxx (pages: ...)` | 画面对了，真机没有这个节点 | selector 对齐（见第 7 节）|
| `T2 label 'X': 0 controls` | 断言读值时标签扫描失败 | 该字段的控件映射 |
| `fieldIs X: got "" want "Y"` | 值没填进去 / 回显不同 | 值来源（別紙/env）或该字段控件 |
| `screenIs` 期望 A 实际 B | 流程/画面链错，或真机跳转不同 | 手顺，或 overrides 的 `skip` / `manual` |
| `chooseRow: anchor ambiguous` | 锚点值在结果里不唯一 | 换锚点字段，不是换 selector |
| `pending` / `unresolved` | 別紙「表示内容N」未解析 | 不是失败，如实记着 |
| 卡在登录页 / URL 不对 | 无会话；真机起始路由不同 | `--login` / `--start-url`，见 5.1 |

---

## 7. selector 能修什么、不能修什么

**能修 —— 画面对了、标签对上了，只是控件定位错/缺**

报错形态是 `element not found` 或 `T2 label: 0 controls`。改法按影响面从小到大，都要留证据：

1. `flows/overrides/<本>.yaml` 加 `binding: {label: 検索, selector: "#xxx"}` + `reason`
   —— 只影响这一本
2. `ui-rowfields.json` 加一条覆盖 —— 影响所有本
3. Studio「绑定」页确认那条规则 —— 写回 `bindings.yaml`（自动备份到 `flows/.backup/`）
4. 真机 HTML 差异大 —— 重抓 DOM，重建 `ui-controls.json`

**不要**在 `flows/books/*.yaml` 里手写 selector：生成器一跑就没了，也破坏了分层。

**不能修 —— 报的是别的错**

`screenIs` 不符、值不对、別紙未解析、行锚点不唯一、登录/URL 问题，都属于第 6 节的其它行。
换 selector 只会把错误状态变成超时。

**一个反直觉的坑**：选择器写错但语法合法，`check-flow` 照样绿。
L0 只验证"能不能解析到字符串"，不验证真机有没有这个节点。**L0 全绿 ≠ 真机绿。**

判断真机 selector 是否可信，看两个信号：

- selector 里带 `${` 或 `|`（Thymeleaf 未渲染的原始模板，例如 `[name="|imperfectSearch[${stat.index}]|"]`）→ 一定匹配不到
- selector 是 `#id` / `[name="..."]`，且与真机抓到的 DOM 一致 → 可信

---

## 8. Studio 的位置

Studio 不执行任何新逻辑，只是同一批文件的读写界面：

| 面板 | 作用 | 注意 |
|---|---|---|
| 左 | 139 本（`books/` 131 + 手写 8）| — |
| 中 | 步骤卡片，一行一手顺行 | — |
| 右 | 步骤 / 数据 / 绑定 / 流程 | — |
| 顶部「画面」 | 开预览 | **预览用的是 mock-src 的 HTML，不是真机** |
| 悬停控件 | 底部显示 `登録  #regist` | 显示的就是查到的 selector |
| 点预览里的控件 | 把该控件设成当前步骤 target | 变「未保存」，要按保存才写 YAML |
| 「绑定」页 | 215 条待确认队列 | 点控件 = 确认规则，直接写 `bindings.yaml` |

它解决的是"看得见地确认 label → 控件"，**不解决**"真机 HTML 和 mock 不一样"。
后者只有两条路：`capture.mjs` 在真机抓，或拿抓回来的 HTML 对齐字典。

---

## 9. 现在的边界

| 项 | 状态 |
|---|---|
| 131 本生成 + 8 本手写，L0 139/139 | 有 |
| mock 实跑（AY-120-08-001，8 步）| 有 |
| 真机抓 DOM（`capture.mjs`）| 有工具，AZ-110-05-008 已抓（43 页 / 19 个真实 DOM）|
| 真机 selector 对齐 | 工具有了（`tools/align_capture.py`）；AZ-110-05-008 实测 missing 1 / unbound 123 |
| 真机 URL 映射 | **部分**：`routes` 覆盖本次抓到的画面 + `--start-url` |
| 登录 / 会话 | **手动**：`--login` 打开浏览器等人工登录 |
| L2（真机通过）| 0 |

真机之前最有价值的一步不是继续点 Studio，而是把 `capture-*.zip` 拿回来，做三件事：
对齐真机 id/name、确认 Shift_JIS / 弹窗 / 行内 name 规律、把 215 条待确认里的高价值项标出候选。

---

## 附：关键代码位置

| 位置 | 作用 |
|---|---|
| `automation/node-runner/flow-loader.mjs:39` | `loadBindings`：只加载 auto/confirmed 的规则 |
| `automation/node-runner/flow-loader.mjs:94` | `lookup`：六层优先级 |
| `automation/node-runner/flow-loader.mjs:317` | `compileFlow`：把 label 换成 selector |
| `automation/node-runner/flow-loader.mjs:342` | 本别 pin 优先于字典 |
| `automation/node-runner/flow-loader.mjs:514` | `dictSelector`：断言专用 |
| `automation/node-runner/run-flow.mjs:312` | `resolveRowName`：行内控件 `{n}` |
| `automation/node-runner/run-flow.mjs:363` | `resolveByLabel`：标签扫描（断言兜底）|
| `automation/node-runner/run-flow.mjs:425` | `findLocator`：跨页面找元素 |
| `automation/node-runner/run-flow.mjs:589` | `chooseRow`：行锚点 / listbox |
| `automation/node-runner/run-flow.mjs:638` | `checkFields`：断言回读 |
| `automation/node-runner/run-flow.mjs:839` | 动作分发：click / fill / select / check |
