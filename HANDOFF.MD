# HANDOFF — 結合試験ワークベンチ

最終更新: 2026-10-23

## 0. 新任务开始前

- 先读本文件，再动代码。
- 旧版根目录的 `index.html` / `js/app.js` / `css/style.css` 保留不动；新版本在 `v2/`。
- 数据由 `tools/build_data.py
tools/verify_routes.py     ← AZ R101-R126 的 pattern chain 回归检查` 生成。改数据逻辑后必须重跑，并检查 `v2/data/validation.js`。
- **运行时不会读 Excel**。Excel 只在 build 时被 openpyxl 读取一次，之后 app 读 `v2/data/*.js`；不需要每次看页面都跑 Python。

## 1. 真实目标 / 约束 / 成功标准

### 目标

把结合测试从「翻 Excel、找手顺书、手动记录」变成：

1. 打开一个离线网页，能看到 **场景 / 实施顺序 / 手顺书 / 结果**。
2. 导入自己被分配的 ID 列表，立刻看到 **哪些任务有实施顺序、前后连着做什么**。
3. 执行时能看 **手顺 + 別紙数据 + 証跡 + 实施/检証结果**，并能导出。
4. 为后续自动化留接口：每一步可以存 selector / value / expected，生成可粘贴到 F12 Console 的 JS；未来可扩展到 PowerShell + CDP。

### 约束

- 目标机只能使用 **PowerShell + 浏览器 + F12**，不能安装 Node/Python/Selenium/Playwright。
- 应用必须是**静态文件**，直接打开 `v2/index.html` 就能用；不能依赖服务器。
- `file://` 下 `fetch('data/*.json')` 会被 CORS 拦，所以数据用 `<script>` 注入 `window`。
- 实际数量以 **document-master 的文档** 为主；workflow 是抓取产物，可能缺失。
- 用户不会做全部 1000+ 件，只会做被分配的一部分；任务导入是核心入口。

### 第一版成功标准

- 打开 `v2/index.html`，无 console error。
- 能看到 347 个 scenario、1386 个 case。
- 能按 AZ/AY、分类、MS/AD、状态、欠损、实施顺序有无过滤。
- 能导入 case/scenario/category ID，看到对应 route 和前后步骤。
- 能打开 case，看手顺、別紙、証跡、自动化和结果录入。
- 能导出 JSON（进度/任务/自动化）和 CSV（结果）。
- 已知缺口（无別紙、无手顺、旧版、重复）必须显示，不能静默丢掉。

## 2. 当前入口

```
v2/index.html          ← 新应用入口（直接双击打开）
v2/js/app.js           ← 单文件 vanilla JS
v2/css/style.css
v2/data/index.js       ← categories / scenarios / routes / caseIndex（约 2.3MB）
v2/data/index.json     ← 同上纯 JSON（约 3.9MB，检查/发给 AI 用；app 不读）
v2/data/validation.js  ← 数据缺口报告
v2/data/validation.json← 同上纯 JSON
v2/data/refs.js        ← 別紙1/2、タイムゾーン、ユーザ（约 160KB）
v2/data/cases/*.js     ← 按分类懒加载的 case 明细（手顺 + 別紙）
tools/build_data.py    ← 数据构建脚本（只在开发机跑）
tools/verify_routes.py ← AZ R101-R126 的 pattern chain 回归检查
```

重新生成数据：

```powershell
python tools/build_data.py
tools/verify_routes.py     ← AZ R101-R126 的 pattern chain 回归检查
```

> 目标机不需要 Python；把整个 `v2/` 文件夹复制过去即可。

## 3. 数据源与权威顺序

| 数据 | 来源 | 用途 | 注意 |
|---|---|---|---|
| document-master | `date/document-master_20261021_172724.json` | case 主数据（1381 件） | 实际数量以它为主 |
| workflow | `workflow/*.json`（1371 件） | 手顺书主 sheet | 可能缺、可能是 `_old` |
| test_documents | `date/test_documents_*.json` | 別紙 sheet（1277 件） | 408 件 AY 没 id，但 fileName 有 |
| scenario list | 两份 `【品管SV更改】...xlsx` | scenario / flow / X / S/D / 路线 | 设计层主数据 |
| 実施順序 | 两份 Excel 的 sheet | route / 状态迁移 / 用户 | 布局复杂，需专用 parser |
| scenario-master | `date/scenario-master-AZ-AY.json` | 参考 | **不能当 hierarchy**（只有 110 scenario，且把 110/210/310/410 压成 1 个） |

### 层级

```
Category (AZ-110)
  └ Scenario (AZ-110-01)          ← 设计/覆盖单位
      └ Case / 手順書 (AZ-110-01-001)  ← 执行/结果单位
Route (AZ-R101 / AY-C01)          ← 顺序/依赖；AZ 是 case 级 pattern chain，AY 是 case×step
Reference (別紙1/2, タイムゾーン, ユーザ)
```

- Case ID = 4 段，前 3 段是 Scenario ID。
- AZ 的 route 只引用 Scenario，不带 pattern 番号。
- AY 的 route case 番号与 pattern 番号基本一一对应（case 1 ↔ pattern 001）。

## 4. 关键数字（2026-10-23 构建）

- Scenario: **347**（AZ 307 + AY 40）
- Category: **27**（AZ 18 + AY 9）
- Case: **1386**（document-master 1381 + workflow-only 5）
- workflow: **1371**
- 別紙あり: **1277**
- Route: **170 AZ**（171 pattern chain）+ **31 AY**（1 template + 30 case）
- AZ route 覆盖: **241 / 241**（110/210/310/410 全部）
- AY route 覆盖: **22 / 22**（110/120/121/122）
- 缺口: 別紙なし **94**、手順書なし **15**、旧版 **35**、別紙重複 **31**、X 不一致 **9**、S/D 不一致 **3**、ルート上の未作成 case **9**

## 5. 踩过的坑（必须避免）

### 5.1 X / S / D / document 数 / workflow 数不是同一个数

- AZ: X=948，workflow=947，document=955。
- AY: X=422，workflow=424，document=426。
- 例: `AZ-100-06` X=2，document=4（親/子 × MS/AD），workflow=2。
- **不要把 X 当进度分母**；进度用 case 数。
- `S/D` 在数值上就是 **MS/AD 的件数**。证据：`AZ-510-01` S=4/D=1 对应 4 MS + 1 AD；`AZ-100-08` 7/7；`AZ-200-07` 6/5。
- S/D 有空值（AZ 合计 897 vs X 948；AY 全空），per-case 的 MS/AD 以 document-master `company` 为准。

### 5.2 番号体系

- 场景一览里的 `001 / 012 / 013 / 024` 是 **pattern 番号**（同一 scenario 内），不是分类内全局号。
- `AZ-110-01` 的 patterns 是 001〜012；route 101〜112 正好一一对应。
- `AZ-210-01` X=5，但场景一览出现 001 和 012；这可能是 route/user 侧的通番，不能直接当 case 清单。
- **join 一律用 4 段 Case ID**，不要用这些通番去跨 scenario 匹配。

### 5.3 scenario-master 不能当主数据

- 只有 110 scenario（AZ 70 + AY 40），而 Excel 是 307 + 40。
- 它把 `AZ-110 / 210 / 310 / 410` 各自压成 1 个 scenario（“シナリオ導線”），导致 237 个 AZ scenario 没有名字/统计。
- 旧版根目录应用就是踩了这个坑；新应用已改用 Excel scenario list。

### 5.4 旧版 / 重复 / 欠损

- `test_documents` 有 31 组重复 ID（`_old`、`_参考`、`_修正版見本`）。
- `workflow` 有 35 件来自 `_old` / 廃止前。
- 应用会选择“当前版”別紙（非 `_old` / 非 `_参考` / 非 `見本`），并在 case 上打 `別紙重複` / `旧版`。
- 94 件有 workflow 但没別紙；15 件 document-master 有计划但没 workflow。
- **不要静默删除**；默认隐藏旧版，但 validation modal 里可查。

### 5.5 実施順序 sheet 的布局坑

- 不是规整表格：header 行、data 行、`(同上)`、空 route、`#REF!` 混在一起。
- **AZ 的 C 行不是“一条 route”，而是一条 pattern chain**：101、102、103… 每条是一组 case 的链。
- `(同上)` 不是“重复上面的 scenario”，而是**同一 scenario 的 pattern 尾号 +1**。
  例：
  - 101: `AZ-110-01-001 → AZ-110-12-001 → AZ-110-67-001`
  - 102: `AZ-110-01-002 → AZ-110-13-001 → AZ-110-37-001`
  - 103: `AZ-110-01-003 → AZ-110-13-002 → AZ-110-38-001 → AZ-110-70-001`
- ユーザー提示の文面は `AZ-100-...` だが、貼られた表は `AZ-110-...`。当前按表（AZ-110）实现；若真实 ID 是 AZ-100，需要改 parser。
- ユーザー提示の 102 の最後は `AZ-110-67-001` だが、表は `AZ-110-37-001`。当前按表（37）实现；若 67 才对，需要改。
- 新出现的 scenario 从 `001` 开始；`同上` 只递增它上面同一列的 scenario。
- scenario 行可能在 C 行之前（Ⅱ-1/2/4），也可能在 C 行之后（Ⅱ-3 的多 pattern 块）；parser 两种都处理。
- 不能按 slot 只存一个 scenario；必须按 block 生成 pattern chain，并用 **caseId** 匹配任务。
- route block 必须在下一个 section header 处截断，否则会吞掉下一个 section。
- AY 的 case 1 序列在 header 行（18–21），data case 从 23 行开始；`(同上)` 只继承上一 case，blank 要清空。
- AY-C30 目前 0 step（Excel 最后一行布局缺失）；不要误认为 bug。

### 5.6 `file://` 与静态数据

- `fetch('data/*.json')` 在 `file://` 下会被 CORS 拦。
- 数据统一输出成 `window.MSAD_* = ...` 的 `.js`，用 `<script>` 注入。
- case 明细按 category 懒加载，避免 26MB 一次性 parse。
- 不要引入需要构建的框架/依赖；目标机不能装。

### 5.7 別紙的稀疏宽表

- 別紙原始 rows 很稀疏（几十列，很多空）。
- 直接 raw table 会非常宽、难读。
- 默认用 **compact**（非空单元格折叠成 label/value），可切 `表形式`。
- 数字开头的行当 section（`# 1`），不要当 label。

### 5.8 进度存储

- `localStorage` key: `msad.progress.v1` / `msad.tasks.v1` / `msad.automation.v1`。
- `file://` 下 localStorage 一般可用；若目标机浏览器禁用，用 JSON 导出/导入兜底。
- 导出 JSON 包含 progress/tasks/automation；CSV 只包含结果字段。

### 5.9 UI 文案

- 用户明确要求：**不要堆不必要的二级标签和说明，让布局自己解释**。
- 已删掉大部分 `hint`/描述；新增 UI 时优先用 badge、列、分组、颜色表达。
- 参考资料的说明卡可以保留，因为用户明确说没看懂別紙1/2 的搭配。

### 5.10 交互原则（2026-10-23 追加）

- **不要为了看 case 而整页跳转**。从 scenario / route / files / tasks 点 case，一律打开右侧 drawer；原页面（尤其是 route chain）保持可见。
- Route 的每一步现在是“可执行卡片”：case ID、功能名、手順/証跡数、別紙关键值（証券番号/明細/種目等）、前 1-2 个操作、状态。
- 点 route step 直接打开 drawer；drawer 顶部显示 `caseId · R101 / 1` 上下文，并提供「前へ / 次へ」沿 route 移动。
- scenario 的 route card 直接显示 chain 的前 4 个 case ID，不用先进 route 才知道内容。
- Drawer 内可以改实施/验证/结果/証跡；保存后 route 上的状态会刷新。
- 深链接 `#/case/<id>` 仍保留整页显示；drawer 右上「全画面」可切换。
- 继续避免不必要的二级标签/说明；用布局、badge、预览行表达。

## 6. 自动化接口（已留）

### 数据格式

Case 级：

```json
{
  "scriptType": "console",
  "locators": [
    {
      "sourceRow": 14,
      "action": "click",
      "selector": "button.new",
      "value": "",
      "expected": ""
    }
  ]
}
```

- `action`: `click` / `input` / `assert` / `wait`
- `sourceRow`: 对应手顺书的 Excel 行（手顺 tab 左侧显示）
- `selector`: CSS selector（Console 用）
- `value`: 输入值
- `expected`: 断言文本

### 应用内功能

- 手顺 tab：每行显示 sourceRow / 操作 / 确认 / 証跡。
- 自动化 tab：
  - `操作行の雛形を生成`：为每个操作/确认行生成空 locator。
  - `F12 の outerHTML から selector 候補を生成`：粘贴 outerHTML，自动给 `#id` / `[name]` / `[data-testid]` / class / XPath text 候选。
  - `Console 片段を生成`：生成可粘贴到被测试系统 Console 的 JS。
  - `ケースJSON`：导出 meta + 手顺 + 別紙 + automation，方便发给 AI 分析。
- 全局 JSON/CSV 导出、任务导入、locator pack 导入。

### 下一步自动化路线

1. 用户在 SUT 的 F12 里复制 outerHTML，贴进自动化 tab，选 selector。
2. AI 读 `ケースJSON` + outerHTML，补全 locator / value / expected。
3. Console 片段逐步骤执行；结果回填到 app。
4. 之后用 PowerShell + CDP（`--remote-debugging-port`）做批量执行和 `Page.captureScreenshot`。
5. PowerShell 截屏兜底（无需安装）：

```powershell
Add-Type -AssemblyName System.Windows.Forms,System.Drawing
$b = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bmp = New-Object System.Drawing.Bitmap $b.Width, $b.Height
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($b.Location, [System.Drawing.Point]::Empty, $b.Size)
$bmp.Save("$env:USERPROFILE\Desktop\sut.png")
```

## 7. 已知限制

- AZ route parser 已按 pattern chain 还原；Ⅱ-3 的 scenario-only 块会附到最后一条 case；Ⅱ-4 有 9 个 pattern 尾号超过已创建 case（标 `未作成`，不计入匹配）；AY-C30 0 step。
- 別紙1/2 目前是原始表 + 说明卡，没有完全结构化。
- 没有实现真正的 CDP runner / 自动截图 / 自动回填；只有 Console 片段和接口。
- 任务导入支持 case/scenario/category ID 的文本/CSV/JSON，不支持直接读 `.xlsx`（先另存 CSV）。
- Dashboard 的“总ケース”包含旧版；旧版在文件列表默认隐藏，validation 里可查。
- CSV 的 `evidenceTotal` 只有已加载分类才有值。

## 8. 下一步建议

1. 用 `AZ-110-01-002` 或一个明天能拿到的真实页面，跑通 **1 个 case 的 1 个 input / 1 个 click / 1 个 assert**。
2. 收集 F12 信息：页面 URL、是否 iframe、元素 outerHTML、试过的 selector、期望结果。
3. 把 locator pack 填进 `ケースJSON`，验证 Console 片段。
4. 再决定是否做 PowerShell CDP runner、截图、批量执行。
5. 数据更新时重跑 `python tools/build_data.py
tools/verify_routes.py     ← AZ R101-R126 的 pattern chain 回归检查`，检查 validation 数量。

## 9. 验证基线

- 浏览器打开 `v2/index.html`，console 无 error。
- Dashboard: 総ケース 1,386 / シナリオ 347 / データ欠損 109。
- Scenario `AZ-110-01`: 12 cases, 12 route refs, 状態遷移 13 行。
- Route `AZ-R101`: 3 steps = `AZ-110-01-001 → AZ-110-12-001 → AZ-110-67-001`。
- `python tools/verify_routes.py` → `PASS: 26 route chains (R101-R126) match the workbook inference.`
- Route step click → right drawer; drawer header shows `caseId · route / step`; 前へ/次へ moves along the chain; drawer saves update the route step status without closing.
- Task 导入 `AZ-110-01-001` + `AY-120-01-001`: 任务 2 件；默认 route `AZ-R101`；AY 只匹配 `AY-C01`。
- Case `AZ-110-01-001`: 手顺 42 行、証跡 18、別紙 compact 34 行、automation 可生成约 44 locators。
- 导出 JSON/CSV 不报错。

## 10. 文件地图

```
HANDOFF.MD
tools/build_data.py
tools/verify_routes.py     ← AZ R101-R126 的 pattern chain 回归检查
v2/index.html
v2/css/style.css
v2/js/app.js
v2/data/index.js
v2/data/refs.js
v2/data/validation.js
v2/data/cases/<category>.js
```

旧版（保留，不再扩展）：

```
index.html
js/app.js
css/style.css
```
