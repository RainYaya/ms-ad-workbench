# 这个项目到底怎么运转的 —— 逐环拆解

> 目的：让你能看懂每一个环节、每一个数据结构的形状、以及**每一处取值是怎么来的**。
> 这样你才能判断"合不合理"，才能提出具体的改法。
>
> 全文分五段：① 物料从哪来 → ② 怎么变成结构化数据 → ③ 怎么变成"积木" → ④ 怎么变成能跑的东西 → ⑤ 跑的时候发生了什么。
> 每一段都写清：输入是什么形状 / 谁在处理 / 输出是什么形状 / 这里的取值规则是什么 / 已知的坑。

---

## 零、先看全景：5 个阶段，8 种数据文件

```
【阶段1 原始物料】
  3 个 Excel（手顺书 + 2 个场景一览）+ 客户端源码快照
        │
        │ tools/build_data.py（提取 Excel 单元格）
        ▼
【阶段2 结构化手顺】
  date/test_documents_*.json     ← 【別紙】操作内容/表示内容（输入值和期待值）
  workflow/workflow-<CASE>.json  ← 手顺正文（每行：谁 在什么画面 做了什么 要确认什么）
        │
        │ tools/build_blocks.py（语义归一化 + n-gram 挖掘 + DP 合成）
        ▼
【阶段3 积木体系】
  automation/blocks/blocks.json        ← 252 个积木定义 + 450 本的组合方案
  automation/blocks/workflows.json     ← 同上，workflow 部分单独一份（给构建脚本读）
  automation/blocks/case-evidence.json ← 每本每行要什么証跡
        │
        │ 人工/半自动（给积木配 selector）→ block-selectors*.json
        │ tools/generate_params_from_appendix.py（从別紙抽值）→ cdp/params/generated.json
        ▼
【阶段4 可执行定义】
  automation/node-runner/block-selectors*.json  ← 积木 → 真实 CSS selector 序列
  automation/cdp/params/*.json                  ← 每本要代入的业务值
        │
        │ automation/node-runner/runner.mjs（Playwright 驱动浏览器）
        ▼
【阶段5 执行与证据】
  logs/<CASE>/*.png                 ← 每步截图
  logs/<CASE>/<CASE>-trace.json     ← 每步链路（动作/selector/实际代入值/URL/页面快照）
  logs/<CASE>/<CASE>-evidence.json  ← 手顺每行 ↔ 截图的对应关系
  logs/<CASE>/<CASE>-node-result.json ← 块级结果
        │
        │ automation/node-runner/judge.mjs（AI 逐块审判）+ tools/audit_dossier.py（卷宗）
        ▼
【审查产物】
  logs/<CASE>/<CASE>-judgment.md/json
  logs/<CASE>/<CASE>-audit.md
  v2/data/*.js  ← 给 viewer 网页读的静态数据
```

**一句话概括这套设计**：Excel 是唯一真相源；所有中间层都是可重算的派生数据；每一层都保留对上一层的**行号引用**，所以任何一处出问题都能倒查回原始 Excel 的某一行。

---

## 一、阶段1 → 2：从 Excel 到结构化手顺

### 输入长什么样

三份 Excel：

| 文件 | 内容 | 作用 |
|---|---|---|
| `【品管SV更改】結合試験_シナリオ一覧(申込).xlsx` | 450 本的场景清单（哪本属于哪个领域/场景） | 决定分级 A/B/C/D、路线顺序 |
| `【品管SV更改】結合試験_シナリオ一覧(異例).xlsx` | 异例场景（异常系测试） | 同上，AY 系 |
| `手顺书.xlsx` | 模板/说明 | 参考 |

**真正的 1310 本手顺书在别处**：`C:\ktin_local\600\G602 結合試験手順書\` 下面的独立 Excel 文件，每本一个文件、每本 2 个 sheet：
- `試験手順書` sheet → 手顺正文
- `【別紙】操作内容` / `【別紙】表示内容` sheet → 输入值和期待值

### 谁在处理

`tools/build_data.py` 的职责：
1. 扫 `date/test_documents_*.json`（这是**预先爬取好的 Excel 内容快照**，由某个采集脚本生成，不是本仓库生成）
2. 对每本提取手顺 sheet 的行，切成 11 个字段
3. 写到 `workflow/workflow-<CASE>.json`

### 输出形状：手顺行的 11 个字段

每一行（`procedure.rawRows[]`）的形状：

```json
{
  "sourceRow": 15,              // ← 关键！Excel 里的原始行号，全链路追踪用
  "itemNo": "",                 // 项番
  "functionName": "",           // 機能名（画面名）
  "operationNo": "",            // 操作番号
  "operationType": "",          // 操作種別（ボタン/入力/選択…）
  "operationItem": "",          // 操作対象（「新規登録」押下 / 各項目 …）
  "operationContent": "",       // 操作内容（填什么值）
  "verificationNo": "2",        // 確認番号
  "verificationType": "遷移",   // 確認種別（遷移/表示/値/メッセージ…）
  "verificationItem": "不備内容入力画面－新規",  // 確認対象
  "verificationContent": "初期値",             // 確認内容
  "evidenceType": "画面HC"      // 要什么証跡（画面HC/ログ/テーブル…）
}
```

**这一层的设计要点**：一行手顺可能**只有操作没有確認**，也可能**只有確認没有操作**（见上面 rawRows[1]，它有 verificationNo 但 operation 全空）。这是因为 Excel 里"做一件事"和"确认结果"是分开写的两行。

### 取值规则

- **行号必须保留**（`sourceRow`）：后面所有层都要靠它回溯。这是整套设计能审计的基础。
- **空白合并**：Excel 里有合并单元格，采集时被展开成空字符串。所以"这个字段是空的"通常表示"沿用上一行"或"这一行没有这个动作"。

### 已知坑

- 一份手顺 Excel 里可能有多个 sheet，`sheetType` 决定它是手顺还是別紙。
- 采集时 BOM 编码（`utf-8-sig`），读的时候不注意会炸（我今天就踩了）。

---

## 二、阶段2：別紙数据的形状（输入值和期待值的来源）

### 输出形状

`date/test_documents_20261021_175741.json`：

```json
{
  "generatedAt": "2026/10/21 17:57:42",
  "rootFolder": "C:\ktin_local\600\...",
  "documents": [ /* 1310 条，每本一条 */
    {
      "id": "AZ-100-01-001",
      "categoryId": "AZ-100",
      "scenarioId": "AZ-100-01",
      "fileName": "結合試験 試験手順書 AZ-100-01-001.xlsx",
      "lastModified": "2026/08/13 09:28:47",
      "sheets": [
        {
          "sheetName": "【別紙】操作内容",
          "sheetType": "OPERATION",
          "range": "B2:AF20",
          "rows": [ /* 二维数组，原样保留 */ ]
        }
      ]
    }
  ],
  "summary": { "scannedExcelFiles": 1448, "matchedDocuments": 1310, "matchedSheets": 2850 }
}
```

**关键点**：別紙是**原样的二维数组**，没有做结构化解析。为什么？因为別紙的格式千变万化（不同领域、不同书都不一样），强行结构化会丢信息。

---

## 三、阶段3：从手顺到"积木"（核心算法）

这是整个项目最抽象的一层，也是最值得你理解的。

### 3.1 先把手顺行变成"事件"（event）

**转换规则**（`tools/stepinv.py` 里的 `build_events`）：

一行手顺 → 0 个或 1 个事件：

| 手顺内容 | 变成的事件 |
|---|---|
| 有操作（operationItem 非空） | `{kind:"op", screen:"画面名", action:"click/fill/...", target:"新規登録", dataClass:"literal/params/bundle"}` |
| 只有確認（verificationItem 非空） | `{kind:"ast", screen:"画面名", assert:"transition/display/value", target:"不備内容入力画面－新規", dataClass:"..."}` |

**`dataClass` 是什么**（这是理解参数体系的关键）：
- `literal` = 手顺里写死的值（比如"押下"这个动作本身）
- `params` = 需要从別紙代入的值（比如"証券番号"这一栏）
- `bundle` = 一整组值一起填（比如"各項目"→ 一次填 16 个字段）
- `none` = 纯动作（点按钮），没有值

### 3.2 语义归一化（让"看起来不同其实一样"的手顺能合并）

这是最容易被忽略但最重要的一步。不同人写手顺用词不一样：

| 原始写法 | 归一化后 |
|---|---|
| `不備内容入力画面－新規`（全角连字符） | `不備内容入力画面-新規` |
| `不備内容入力画面-新規画面`（多个"画面"） | `不備内容入力画面-新規` |
| `「検索」押下` | `検索` |
| 同一 transition 一处写 `初期値` 一处空白 | 视为同一 pattern |

代码位置：`tools/build_blocks.py` 的 `_norm_screen` / `_norm_target` / `_norm_dc` / `event_pattern`。

**为什么这步这么重要**：450 本手顺由不同的人写，如果只做字符串精确匹配，252 个积木会膨胀成上千个。归一化把"同一业务动作的不同写法"收敛成一个 pattern。

### 3.3 两种积木的来源

**(a) 人工精选块（curated）**：`SPECS` 列表里写死
```python
("BLK-AZ-MENU-CREATE-INPUT", "AZ-110-01-009", (0, 3), ["bundle"], [], "coded", "note...")
#  块ID                       参考书          事件范围  参数     前置条件  状态
```
人工规定"这块从哪本书的哪几个事件来"，然后用 `pattern_json` 提取成模式。

**(b) 自动挖掘块（auto-mined）**：`mine_auto_blocks`

算法：
1. 把每本书的事件序列**按画面切段**（积木不跨画面）
2. 在每个段内，枚举所有长度 2~8 的子序列（n-gram）
3. 过滤条件：**必须以 op 开头、以 ast 结尾**（= "做一个动作，然后确认结果" —— 这才是完整的业务单元）
4. 去掉已经在 curated 里的 pattern
5. 统计每个 pattern 出现在多少本书里（`count`）
6. 出现次数 ≥ 阈值的，提为 `draft-auto` 候选块

**为什么是"op 开头 ast 结尾"**：这正好对应手顺的语义 —— "操作 + 确认"是一个闭合单元。"只操作不确认"或"只确认不操作"都不是完整积木。

### 3.4 用积木拼回每本书（DP 合成）

`compose(events, blocks)` —— 这是动态规划：

- 目标：用最少的积木覆盖这本书的所有事件
- 状态：`dp[i]` = 从第 i 个事件到末尾的最优覆盖代价
- 转移：在位置 i，要么用某个匹配的积木跳 `len(pattern)` 步，要么把这 1 个事件当作未覆盖的 gap
- 平局规则：**优先 curated > auto**，同类型优先**更长的积木**

输出（`blocks.json` 的 `workflows[caseId]`）：
```json
{
  "blockDetails": [
    {"block": "BLK-AZ-MENU-CREATE-INPUT", "fromRow": 14, "toRow": 15},
    {"block": "BLK-AZ-INPUT-FILL", "fromRow": 16, "toRow": 21},
    ...
  ],
  "gaps": [ /* 没被积木覆盖的事件，带 sourceRow */ ]
}
```

**这里就是你该关注的地方**：`gaps` 里的东西 = 这块手顺还没被自动化。450 本里 eventCoverage = **82.4%**（8897/10803），剩下 17.6% 就是 gaps。

### 3.5 三状态（status3）

`automation/execution-status.json` 的 `status3Map` 是**积木级**的状态。注意它的结构是
**`状态名 → [块ID 列表]`**（不是块 → 状态）：

```json
{
  "verified": ["BLK-AZ-MENU-CREATE-INPUT", "BLK-AZ-INPUT-FILL", "BLK-AZ-INSURANCE-SELECT"],
  "coded":    [/* 246 个块 */],
  "planned":  [/* 3 个块 */]
}
```

实测分布（2026-10-26）：**verified 3 / coded 246 / 未归类 3**。
那 3 块在 `blocks.json` 里还是 `draft-auto` / `draft-shared` 状态，**没有进 status3Map** —— 
也就是说 `planned` 这个键当前根本不存在，未实现的块是"缺席"而不是"标记为 planned"。

| 状态 | 含义 | 判定依据 |
|---|---|---|
| `verified` | 真机 SUT 跑通过 | 人工在真机验证过（目前只有 009 的前 3 块） |
| `coded` | 已实现，mock/源码模拟跑通 | 有 selector + mock 跑通 |
| `planned` | 还没实现 | 只有手顺，没有 selector |

**注意**：这是**积木**的状态，不是**书**的状态。一本书可能 8 块 coded + 2 块 planned。

### 3.6 执行状态（execution-status.json 的 cases）

另一套状态，是**书级**的：

```json
"cases": {
  "AZ-100-05-003": {
    "liveRun": {...},      // 真机跑的结果
    "mockRun": {...},      // mock 跑的结果
    "livePass": false,
    "mockPass": true,
    ...
  }
}
```

来源：`run_all` 批量跑完 mock 后写回。**代码里明确规定审计员不许改这个文件**（诚信红线）。

---

## 四、阶段4：从积木到能跑的东西

积木只定义了**语义**（"点搜索按钮"），要跑还得有**真实 selector**（`#act001to100`）。这一步是人工/半自动的。

### 4.1 block-selectors 的形状

```json
{
  "BLK-AZ-MENU-CREATE-INPUT": {
    "screen": "AZG001",                     // 画面码
    "steps": [                              // 有序的 Playwright 动作序列
      {"event": "goto start screen", "action": "goto", "url": "/AMB/AMA01.html"},
      {"event": "click 新規登録", "action": "click", "selector": "#act001to100", "source": "html-captured"},
      {"event": "ast transition 不備内容入力画面-新規", "action": "assert", "assert": "visible", "selector": "#policy_number"}
    ],
    "cases": ["AZ-110-01-009", "AZ-110-01-010", ...]   // 哪些书用这块
  }
}
```

11 种 action：`goto / click / fill / selectOptionByLabel / check / enable / wait / popup / assert / manual / setValue`

**关键字段**：
- `source: "html-captured"` = selector 是从真实 HTML 快照里提取的（可信）
- `force: true` = 强制点击 disabled 元素（**危险信号**，AI 审判会把这类标 SUSPECT）
- `optional: true` = 断言失败不报错（**危险信号**，等于没验证）

### 4.2 参数的 5 层优先级（这是最容易搞混的地方）

runner 的 `loadParams(caseId)` 按**排序后的文件名顺序**加载，先命中的文件拥有具体值，后来的只填空：

```js
files.sort((a,b) => {
  if (a === 'auto.json') return 1;        // auto 永远最后
  if (b === 'auto.json') return -1;
  if (a === 'generated.json') return -1;  // generated 永远最前
  if (b === 'generated.json') return 1;
  return a.localeCompare(b);
});
```

| 顺序 | 文件 | 可信度 | 内容来源 |
|---|---|---|---|
| 1 | `generated.json` | 最高 | 从別紙自动抽取（363 本有值） |
| 2 | `AZ-110-01.json` 等 | 高 | 手工维护的业务参数 |
| 3 | `az-update.json` / `AY-110-01.json` | 中 | 特定流程参数 |
| 4 | `boundary.json` / `bulk.json` | 中 | 边界/批量测试参数 |
| 5 | `auto.json` | 最低 | 全自动兜底（450 本全有，但很多是占位值） |

**`PARAM_SOURCES` 记录每个值来自哪个文件**。`--strict-params` 模式下，如果某参数来自 auto.json 或缺失，直接报错退出 —— 这是防止"用兜底值假装跑通"的保险丝。

### 4.3 参数从別紙怎么抽

`param-map.json` 定义"中文列名 → 英文参数名"的映射：

```json
{
  "inputs": {
    "policyNo": ["証券番号", "保険証券番号"],
    "sectionCode": ["部店課支社コード"],
    "agentCode": ["代理店コード"]
  }
}
```

`tools/generate_params_from_appendix.py` 用这张表去別紙的行里找值。同一本的多张 sheet 会合并，冲突时按优先级。

**已知的业务规则修正**：`種目=Z`（種目共通）时 `inputType` 必须是 5 或 7，`種目=0` 时必须是 9 —— 別紙写 2，但源码校验会拒收。这是"三方矛盾"的典型案例（手顺书 vs 代码 vs 真机），已在 `generated.json` 里按源码规则覆盖，并加了 `_deviationNote` 注明偏离原因。

---

## 五、阶段5：跑的时候到底发生了什么

### 5.1 执行顺序怎么定

```
1. 加载所有 block-selectors*.json → SEL_ALL（当前 252 块）
2. 读 blocks.json 的 workflows[caseId].blockDetails → 这本书的积木顺序
3. 按这个顺序重排 SEL：
     for (const b of wf.blockDetails)
       if (!ordered[b.block]) ordered[b.block] = SEL_ALL[b.block];
4. 遍历 ordered 的每个块 → 遍历每块的每个 step → 执行
```

**重复块是被保留的**。runner 用的是 `forEach` + `push`，没有去重：

```js
wf.blockDetails.forEach((b, idx) => {
  if (SEL_ALL[b.block]) SEL_SEQ.push([b.block, SEL_ALL[b.block], evBlocks[idx]]);
  else if (!seenMissing.has(b.block)) { seenMissing.add(b.block); skipped.push(b.block); }
});
```

450 本里有 **128 本含重复块**（最多的一本 `AZ-150-04-002` 有 22 块，其中 `BLK-AUTO-C8BDC3F2` 出现 4 次）。
实测验证：`AZ-111-02-003` 的 `BLK-AZ-MENU-CREATE-INPUT` 和 `BLK-AZ-INPUT-FILL` 各执行 2 次，7 块全部跑完。

> 历史注：早期版本曾用 `if (!ordered[b.block])` 去重，导致重复块只跑一次。AI 审判在
> `AZ-110-01-009` 报告过「手顺行 32 的更新点击不存在」，那是修复前的旧数据。**现已修复**。

### 5.2 每一步的执行细节

对每个 step：

1. `sel(step.selector)` 把 `{params.xxx}` 替换成实际值
2. 按 `action` 分派到 Playwright 具体方法
3. 记录 trace 条目（动作/selector/实际值/URL/页面快照/截图）
4. 出错就抛异常 → 整个 case 标 fail，后续块不执行

trace 条目的形状（这是审计的原料）：

```json
{
  "n": 5,
  "block": "BLK-AZ-INPUT-FILL",
  "event": "inputBundle 各項目",
  "action": "fill",
  "selector": "select[name=\"large_item_list.selected\"]",
  "value": "params.largeItemValue",
  "resolvedValue": "B",
  "url": "http://127.0.0.1:10095/AMB/AMA03.html",
  "pageSnapshot": {
    "gamid": "AMA03",
    "visibleButtons": ["メニュー", "一覧画面", "登録", "終　了"]
  },
  "screenshot": "08_trace_005_inputBundle_各項目.png"
}
```

`resolvedValue` 是我加的关键字段：`value` 是模板，`resolvedValue` 才是真正填进去的东西。没有它就无法判断"参数是不是真的代入了"。

### 5.3 证据是怎么对上的

跑之前，`case-evidence.json` 已经记录了"这本书每行手顺要什么証跡"。跑的时候：

- 遇到 `verificationItem` 非空的行 → 截图，文件名 `<序号>_r<行号>_<手顺写的画面名>.png`
- 跑完比对：要求的行都有图 → `exact`；只有块结束图 → `blockEnd`；非浏览器 → `manual`；缺 → `missing`

```json
{
  "summary": {"hc": 17, "exact": 17, "blockEnd": 0, "manual": 0, "missing": 0},
  "rows": {"15": {"status": "exact", "file": "02_r015_不備内容入力画面-新規.png"}}
}
```

---

## 六、为什么这样设计（每个决策的理由与代价）

| 设计 | 理由 | 代价 |
|---|---|---|
| Excel 是唯一真相源 | 手顺书由业务方维护，不能改 | 手顺更新要重跑提取 |
| 中间层全部可重算 | 出错能从头重建 | 要维护 20+ 构建脚本 |
| 保留 sourceRow | 任何结论能倒查回 Excel 行 | 数据体积变大 |
| 积木用 pattern 而非 selector | 语义稳定，selector 常变 | 需要额外 selector 层 |
| 参数分 5 层优先级 | 不同来源可信度不同 | 容易搞混哪个值生效 |
| 状态分积木级/书级两套 | 积木可复用，书是验收单位 | 两个概念容易混 |
| mock 环境独立 | 不依赖真机，能批量跑 | mock 与真机有语义差 |

---

## 七、目前的问题（你该知道的风险点）

### 7.1 结构性缺陷

1. **gaps 没有补全路径** — 17.6% 事件（1906 个）未被积木覆盖，没有流程化的"如何补"方案。
2. **status3 只反映「块是否实现」，不反映「书是否跑通」** — 当前 verified 3 / coded 246 / planned 3。
   450 本全量审计的结论（clean 7 / clean-with-notes 432 / suspicious 11）**没有回写到 status3**，
   因为两者是不同维度。`STATUS3.md` 里如果出现"coded 数=通过数"的暗示就是误导。
3. **两套状态易混** — 积木 verified/coded/planned vs 书 livePass/mockPass，名字近含义远。
4. **`skipped[]` 是防御性代码，当前为空** — 如果某块在 blocks.json 里有但 block-selectors 里没有，runner 会记进 `skipped[]` 并把 status 标 `partial`。实测当前 **252 块 selector 全部齐全，0 本受影响**，`skipped` 恒为空。这一层是为将来新增积木时的容错，不是现有风险。

### 7.2 数据一致性

5. **参数优先级不可见** — 跑的时候用了哪个文件，只有扒 trace 才知道，网页上看不到。
6. **auto.json 的兜底范围是「导航起点」而非业务值** — 实测：generated 有 363 本业务值，
   auto 有 450 本；**87 本没有 generated 值，只有 auto 提供的 `startUrl` / `startSelector`**（起始画面和入口按钮）。
   这意味着这 87 本如果手顺里有业务输入，会落到 `P[k] === undefined` → selector 里留下空字符串。
   风险不是"用错值"，而是**空值静默通过**（`assert value` 在 `want===null && has===null` 时也判 OK）。
7. **mock 的语义天花板** — 静态页面上"状态迁移"类验证（未対応→対応中）根本无法验证。

### 7.3 可维护性

8. **20 个构建脚本无统一入口** — 改造数据要人工判断跑哪几个、什么顺序。核心链路是 `build_data.py` → `build_blocks.py` → `build_runner_defs.py` / `build_evidence_data.py`，其余是分析/审计辅助。
9. **selector 分 17 个文件** — 避免单文件过大（252 块），但"这块 selector 在哪"要 grep。runner 用 `readdirSync().filter(/^block-selectors.*json$/)` 全部加载合并，新增文件自动生效。
10. **文档与数据脱节** — `STATUS3.md`/`README.md` 的数字已过期，新读者会被误导。

---

## 八、要改的话，从哪入手（按收益排序）

| 改动 | 影响面 | 难度 |
|---|---|---|
| gaps 清单可视化（哪本书还缺哪步） | 让 17.6% 缺口可见 | 中 |
| result.json 加 param 来源字段 | 所有书的参数可追溯 | 低 |
| status3 从跑批结果自动回写 | 消除文档滞后 | 中 |
| gaps → 自动生成待实现块清单 | 17.6% 缺口有路径 | 中 |
| 23 个脚本合并成一条命令 | 改造效率 | 中 |
| 参数优先级可视化到 viewer | 不开 trace 也能看 | 中 |

---

## 九、自检命令（验证我说的每条都对）

> Windows 控制台显示日文会乱码，所有命令加 `python -X utf8`，或先设 `set PYTHONIOENCODING=utf-8`。

```bash
# ① 手顺行的字段形状
python -X utf8 -c "import json;d=json.load(open('workflow/workflow-AZ-110-01-009.json',encoding='utf-8-sig'));print(d['workflow']['procedure']['rawRows'][0])"

# ② 积木的 pattern 结构
python -X utf8 -c "import json;b=json.load(open('automation/blocks/blocks.json',encoding='utf-8-sig'));print(b['blocks'][0]['pattern'][:2])"

# ③ 这本书用了哪几块
python -X utf8 -c "import json;b=json.load(open('automation/blocks/blocks.json',encoding='utf-8-sig'));print(b['workflows']['AZ-110-01-009']['blockDetails'])"

# ④ 参数实际来源
grep -m1 'phase.*params' logs/AZ-110-01-009/trace.jsonl

# ⑤ 事件覆盖率
python -X utf8 -c "import json;b=json.load(open('automation/blocks/blocks.json',encoding='utf-8-sig'));print(b['summary'])"

# ⑥ 执行状态真值
python -X utf8 -c "import json;d=json.load(open('automation/execution-status.json',encoding='utf-8-sig'));print(len(d['cases']),'books')"
```
