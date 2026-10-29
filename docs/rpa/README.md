# RPA 重构（feat/rpa-flow 分支）

> 在线版（GitHub Pages）：[rainyaya.github.io/ms-ad-workbench](https://rainyaya.github.io/ms-ad-workbench/)
> 在线 Studio（只读快照，真画面可点）：[rainyaya.github.io/ms-ad-workbench/studio](https://rainyaya.github.io/ms-ad-workbench/studio/)

2026-10-26 起，ms-ad 自动化从"积木拼装"转向 RPA 形态。

## 为什么重做

原设计的问题（全部实测）：

- 1613 个执行步骤里只有 **10%** 引用参数，其余硬编码（`AHE61` 写死 17 次）
- 252 个积木里 **125 个只被 1-2 本用** —— 是手顺的化石，不是积木
- 一本要跨 10 积木 + 16 selector 文件 + 9 params 文件，改一处要穿四层
- 出错就 `throw` 关浏览器，真机上没法 debug
- 60 本"跑通了"其实是代入 `auto.json` 的同一套假数据

## 新形态

```
一本手顺 = 一个 YAML 文件
        ↓ 从字典查 selector（不写 CSS）
        ↓ 每个步骤带 Excel 行号
   真的能跑，也能手动改
```

## 文档索引（按阅读顺序）

| # | 文件 | 内容 |
|---|---|---|
| 1 | [00-DECISIONS.md](00-DECISIONS.md) | 已定的 8 条决策 + 为什么 + 何时该推翻 |
| 2 | [01-PITFALLS.md](01-PITFALLS.md) | 16 个踩过的坑（编码/解析/业务/工具） |
| 3 | [02-DEV-RULES.md](02-DEV-RULES.md) | 写代码前的硬约束 + 验证标准 |
| 4 | [17-USAGE.md](17-USAGE.md) | **使用说明（唯一入口）**：怎么启动、每种活怎么做、出错先看哪 |
| 5 | [03-STATUS.md](03-STATUS.md) | 当前进度 + 明天做什么 + 待解清单 |
| 6 | [04-ARCHITECTURE.md](04-ARCHITECTURE.md) | 数据怎么流 + 和旧体系关系 |
| 7 | [05-EXECUTOR.md](05-EXECUTOR.md) | 执行器设计：为什么这样写、6键交互、所学教训 |
| 8 | [06-ROADMAP.md](06-ROADMAP.md) | **施工顺序** 8 步，每步的验收标准和卡住怎么办 |
| 9 | [07-REQUIREMENTS.md](07-REQUIREMENTS.md) | **用户原话 + 需求定义** + 11 条硬约束 |
| 10 | [08-FEASIBILITY.md](08-FEASIBILITY.md) | **可行性实测**：24 条共享配置覆盖 86% 的行 |
| 11 | [09-AI-VERIFY.md](09-AI-VERIFY.md) | **AI Agent 确认流程/参数/可行性的工作规程** |
| 12 | [10-DEBUG-BY-CODE.md](10-DEBUG-BY-CODE.md) | **R0 规矩：碰到问题先查代码** + 5种症状排查表 |
| 13 | [11-KERNEL.md](11-KERNEL.md) | **17 原语内核**：动作/证据/断言、T1–T4、值来源、失败协议 |
| 14 | [GOAL.md](GOAL.md) | 目标与红线（自由度来自组合，流程正确 + 值正确） |
| 15 | [12-DIFF.md](12-DIFF.md) | 旧积木 vs 新内核：一页对照 + 迁移顺序 |
| 16 | [13-DESIGN.md](13-DESIGN.md) | **四层真值 / 两种身份 / 绑定层 / Studio / 完成标准** |
| 17 | [14-REPORT.md](14-REPORT.md) | **当前覆盖率与 L0/L1/L2 实测**（`tools/report.py` 生成） |
| 18 | [15-CHAIN.md](15-CHAIN.md) | **整条链**：文件谁连谁、一次点击怎么定位、跑错改哪里 |
| 19 | [16-LANGUAGE.md](16-LANGUAGE.md) | **语言规范（自包含）**：手顺 + 真实页面 → 能跑的流；可整篇交给外部 AI |
| 20 | [18-EXTERNAL-AI.md](18-EXTERNAL-AI.md) | **外部 AI 生成流程的测试手顺** + AZ-110-01-009 验收记录 |
| 21 | [19-REAL-MACHINE.md](19-REAL-MACHINE.md) | **在实机电脑上一条龙**：抓页面 → 打材料包 → Copilot → 校验 → 跑（不回家） |
| 22 | [20-YAML-AS-LANGUAGE.md](20-YAML-AS-LANGUAGE.md) | **把流程 YAML 当编程语言讲**：类型、求值、寻址、编译/运行边界、定制化配方 |
| 23 | [21-WRITE-A-FLOW.md](21-WRITE-A-FLOW.md) | **白话版：自己写一本流程**（从零到能跑，含模板与自查清单） |
| 24 | [22-STUDIO-FIELDS.md](22-STUDIO-FIELDS.md) | **Studio 每栏对应哪个 YAML 键 + 每个字段/原语/证据 + `env`/`values`/`case` 怎么组合** |
| 25 | [23-REAL-MACHINE-REPAIR.md](23-REAL-MACHINE-REPAIR.md) | **真机某步找不到控件怎么修**：故障 → 改哪个文件 → 改完就地续跑（`r`）→ 不需要 Python/AI |
| 26 | [../adr/](../adr/) | ADR 0001–0007：为什么是这四层、为什么删掉模糊匹配、画面从哪来、值从哪来 |

## 现在能用什么

```bash
# 0. 重建四层真值（每次改 HTML / 手顺数据后跑这个顺序）
python tools/build_controls.py        # 前端 HTML → 控件库 ui-controls.json
python tools/build_bindings.py        # 手顺措辞 → 绑定表 flows/bindings.yaml
python tools/generate_books.py        # 手顺 + 别紙 + 绑定 → flows/books/*.yaml
python tools/report.py --write docs/rpa/14-REPORT.md

# 1. 离线检查（画面链 / 行覆盖 / 定位 / 值来源 / expect 类型）
node automation/node-runner/check-flow.mjs flows/books/AY-120-08-001.yaml

# 1.5 用真实 DOM 校验每个 selector（必须是抓回来的实机页面）
node automation/node-runner/check-patch.mjs \
  --flow flows/books/AZ-110-05-008.yaml --capture capture-20261028

# 1.6 缺控件：粘贴真实元素 → 生成控件补丁（先校验，再 --apply）
node automation/node-runner/add-control.mjs \
  --capture capture-20261028 --screen 募集人検索画面 \
  --html '<input type="radio" name="selectNo" value="0">' --anchor 3028004586 \
  --out flows/patches/AZ-110-05-008.control.yaml

# 1.7 给网页 AI（Copilot）准备材料包：brief/<本>/ 下全是 .txt，可直接上传
node automation/node-runner/make-brief.mjs --case AZ-110-01-009 --capture capture-AZ-110-01-009/az-110-01-009

# 2. 可视化检阅 + 绑定确认
node automation/node-runner/studio/server.mjs 10200   # → http://127.0.0.1:10200

# 3. mock 上跑完整流程
cd automation/node-runner
node mock-server.mjs 10117
node run-flow.mjs ../../flows/books/AY-120-08-001.yaml \
  --base http://127.0.0.1:10117/AMB/dummy.html --headless --yes

# 4. 真机跑（先抓 DOM 对齐；--login 打开浏览器等人工登录）
node run-flow.mjs ../../flows/AZ-110-05-008.yaml --live --login \
  --login-url http://真机/mhkcmwa11/dummy.html \
  --start-url "http://真机/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00" --to-row 20

# 4.5 演示模式：页面顶部横幅 + 目标红框 + 每步停留；窗口里按 Space 暂停
node run-flow.mjs ../../flows/AZ-110-05-008.yaml --live --demo --demo-delay 1500

# 5. 真机抓 DOM（人操作，自动存）
node capture.mjs --url https://真机/AMB/AMA01.html --out capture-1027 --edge

# 5.1 把 capture 变成能贴给外部 AI 的包（00-INDEX.md + 清洗后的 HTML 分块）
node make-pack.mjs --capture capture-1027

# 5.5 用抓回来的 DOM 对齐字典（只读，不改任何东西）
python tools/align_capture.py --capture capture-1027

# 6. 重建在线文档 + Studio 只读快照（先 docs 后 studio）
python tools/build_pages.py --out .pages-out
python tools/build_studio_pages.py --out .pages-out/studio
```

`tools/compile_flow.py` 已落后于 `flow-loader.mjs`，只作历史参考；
编译/检查/执行的唯一路径是 `flow-loader.mjs` + `check-flow.mjs` + `run-flow.mjs`。

## 当前覆盖（2026-10-27 实测）

| 指标 | 数值 |
|---|---|
| 手顺里的本 | 1,386（其中 1,371 有操作行，15 本无手顺） |
| 可直接生成的本（auto/confirmed 绑定 + 别紙值齐全） | 130 |
| 生成后 L0（0 error、步数=手顺行数） | 138 / 138（130 生成 + 8 手写） |
| 绑定规则 | 519（auto 265 / confirmed 3 / needs-human 215 / blocked 36） |
| 控件库 | 54 画面 / 1,998 控件 |
| mock 跑通（L1） | AY-120-08-001 等，见 [14-REPORT.md](14-REPORT.md) |

剩下的本不是"生不出来"，而是卡在四类**明确**的原因上，全部列在
`flows/books-status.json` 与 `14-REPORT.md` 第 4 节：别紙标签在画面上找不到
（多为「課支社コード」vs「部店課支社ｺｰﾄﾞ」这类措辞差）、绑定待人工确认、
别紙写着「その他項目は別紙参照」而值未解析、手顺本身没有画面（批处理/非浏览器小节）。

## 目录

```
ui-controls.json        控件库：从 reference HTML 挖出的全部交互控件（生成物）
ui-dictionary.json      画面 / 字段 / 按钮 / 行内字段（生成物，逐步被控件库取代）
ui-screens.json         手顺画面名 → 画面码
ui-aliases.json         别紙说法 → 前端说法
ui-rowfields.json       手维护覆盖层：行内控件 / 组合控件 / 限定按钮
bindings.yaml           绑定表：画面 + 措辞 → 控件（生成物，人工确认写回）
flows/                  手写/精修的本；flows/books/ 生成的本；flows/env/ 环境值
flows/overrides/        本别覆盖（只许改怎么做，不许改期望）
tools/rpa_common.py     手顺/别紙解析的唯一定义（归一化必须与 flow-loader 一致）
tools/build_controls.py 控件库生成
tools/build_bindings.py 绑定表生成
tools/generate_books.py 本生成
tools/report.py         L0/L1/L2 报告
automation/node-runner/flow-loader.mjs   编译
automation/node-runner/check-flow.mjs    离线检查
automation/node-runner/run-flow.mjs      执行（mock / 真机）
automation/node-runner/studio/           Studio（预览 / 拾取 / 绑定确认 / 运行）
automation/node-runner/capture.mjs       真机 DOM 抓取
```


## 核心原则

**宁可报错，绝不猜。**

今天所有问题的根源都是"看起来差不多"被当成"对"。
字典查不到就带行号报错，运行期才能确定的就标 `pendingRuntime`。
