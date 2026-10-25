# PROJECT-TOUR —— 这个仓库到底是什么、每一块是干什么的

> 写给 bikuri：目标是让你重新有掌控感。
> 核对时间：2026-10-25（基于 git HEAD `6c92d6d`，分支 `feature/evidence-ui`，41 个提交未推送）。
> 旧文档状态已核对：README/HANDOFF/STATUS3/ARCHITECTURE 停在 10-23/10-24，
> 数据真值以 `automation/execution-status.json` + `v2/data/automation.js` 为准，本文数字都来自这两个文件。

## 一句话

这是一套「結合試験工作台」：把你手上的 450 本手顺书（Excel）变成**可浏览、可导入、可自动执行、可留证**的系统 ——
静态网页负责"看"，node/CDP runner 负责"跑"，Excel 源和源码快照负责"喂"。

## 1. 先建立心智模型：它就是一条流水线

```
原始材料（Excel / JSON 快照）          ← 你公司拿到的、别人发的
   date/*.json + workflow/*.json + 两份 Excel
        │
        ▼  build（Python，只在开发机跑）
   规整数据  v2/data/*.js               ← 网页吃这个，文件即数据库
        │
        ▼  看（纯静态网页，双击就开）
   v2/index.html
   - dashboard / scenario / route / files / tasks / refs
   - 自動化页：每本书一张"能不能跑+跑到哪"的诊断卡
   - ops 页：每本书一页 A4 现场作业单（给公司机打印用）
        │
        ▼  跑（Node + CDP，公司机上）
   automation/node-runner/
   - mock-server.mjs：用 captured HTML 造一个假 SUT（模拟环境）
   - runner.mjs：读积木定义 + selector + 参数 → 开 Edge 逐步执行 → 截图落证
   - demo.mjs：可视化演示模式（横幅+红框+慢放，给人看的）
        │
        ▼  留证
   logs/<caseId>/                       ← 每本书一个结果目录（455 个）
   （截图、result.json、步骤明细）
   build 脚本再把这些回灌进 v2/data/automation.js 的三状态/覆盖数字
```

记住这个闭环，剩下的都是零件。

## 2. 仓库总图（按"谁在生产、谁在使用"分层）

| 层 | 目录/文件 | 干什么 | 谁用 |
|---|---|---|---|
| 原料 | `date/`、`workflow/`、两份 Excel、`手顺书.xlsx` | document-master / 別紙 / workflow 手顺 / 场景一览 | build 脚本 |
| 提炼 | `tools/`（18 个 Python + 3 个 .mjs） | 一次性把原料炼成规整数据与报告 | 开发机 |
| 数据 | `v2/data/`（14 个 .js + cases/） | 网页的"数据库"，`window.MSAD_*` | 前端 |
| 前端 | `v2/`（index.html + app.js 2710 行 + ops/） | 人看的界面，无后端、无构建 | 你 / 现场人员 |
| 执行 | `automation/node-runner/` | 模拟环境 + runner + selector + 参数 | runner / 你 |
| 基建 | `automation/cdp/` | PowerShell 起 Edge（CDP 9223 端口）+ 009 模板 runner | 公司机 |
| 证据 | `logs/`（361MB，已入 git） | 455 个结果目录：截图 + result.json | 回灌 build |
| 参考 | `reference/webapps/` | 3 个客户 webapp 的 HTML 快照（AMB/AMC00/ANB00） | 找控件真名 |
| 文档 | `docs/` + 根目录 `HANDOFF.MD`/`README.md` | 架构、数据模型、决策、日志 | 所有人 |
| 旧物 | `index.html`/`js/`/`css/`/`legacy.html` | v1 版本，保留不再改 | 无（fallback） |

## 3. 数据从哪来 → 到哪去（关键链路）

### 3.1 原料层
| 文件 | 数量 | 作用 |
|---|---|---|
| `date/document-master_20261021_172724.json` | 4 个顶层组 | case 主数据（1381 本的底账） |
| `date/test_documents_20261021_175741.json` | 同上 | 別紙（输入/期待值）1277 本 |
| `workflow/*.json` | 1371 个 | 每本书的手顺书主表（一行一个操作/确认） |
| `【品管SV更改】...xlsx` ×2 | 2 个 | scenario 一览 + 実施順序（route 链）——设计层主数据 |
| `date/scenario-master-AZ-AY.json` | 1 | 只有 110 场景，**不能当主数据**（旧版踩的坑） |

### 3.2 提炼层（tools/，改数据逻辑后要重跑）
| 脚本 | 产出 | 一句话 |
|---|---|---|
| `build_data.py` (915 行) | `v2/data/index.js + cases/*.js + refs.js + validation.js` | 总管：Excel/JSON → 网页数据 |
| `verify_routes.py` | PASS 26 链 | route 回归检查，**每次收尾必跑** |
| `analyze_assigned.py` | `templates.json` / `ASSIGNED.md` | 450 本分组成 215 个模板 |
| `analyze_steps.py` (412 行) | `steps/inventory.json` | 10803 行手顺 → 原子动作清单 |
| `build_blocks.py` (1185 行) | `blocks/blocks.json` + `STATUS3.md` + `automation.js` | 积木化 + 三状态 + 前端数据，核心枢纽 |
| `build_feasibility.py` | `logs/FEASIBILITY.md` + `feasibility.js` | A/B/C/D 分级 |
| `build_evidence_data.py` / `check_evidence.mjs` | `evidence.js` + 手工清单 | 証跡/人工步骤回灌 |
| `build_param_audit.py` / `build_params_meta.py` / `generate_params_from_appendix.py` | params 系列 | 从別紙抄真值 → 参数 → 与別紙对照审计 |
| `build_ops_sheets.py` | `v2/ops/index.html` 等 | 450 张 A4 作业单 |
| `build_summary_input.py` | `review/business-summaries/_input/` | 业务摘要的原料 |
| `build_runner_defs.py` / `build_param_review.py` / `assess_automation.py` / `summarize_mock.py` | 各类报告 | 辅助 |
| `run_all.mjs` | 批量跑 runner | 454 本全量批跑器 |

### 3.3 数据层（v2/data/，网页的数据库）
| 文件 | 内容 |
|---|---|
| `index.js` (2.4MB) | 347 场景 / 27 分类 / 170+31 route / 1386 case 的索引 |
| `cases/*.js` (27 个) | 按分类懒加载的书内明细（手顺+別紙全文） |
| `automation.js` (0.76MB) | 积木覆盖 + 三状态 + 每本诊断（**454 本全 mockPass**） |
| `feasibility.js` | A/B/C/D 分级 |
| `params.js` / `param-audit.js` | 参数 + 与別紙的对照审计 |
| `evidence.js` | 証跡/人工步骤 |
| 其余 | `refs.js` 参照 / `validation.js` 数据缺口 / `schedule.js` 排程 / `stale.js` 旧版标记 / `summaries.js` 摘要 / `block-quality.js` 积木质量 / `runner-defs.js` runner 定义 |

### 3.4 执行层（automation/node-runner/）
| 文件 | 作用 |
|---|---|
| `mock-server.mjs` (132 行) | 静态假 SUT：174 条路由，按 captured HTML 回页面 |
| `mock-src/` | 客户 webapp 静态化后的页面（含防御改写） |
| `runner.mjs` (460 行) | 主执行器：读 blocks+selectors+params → CDP 开 Edge → 逐步执行 → 落证 |
| `block-selectors*.json` (16 个) | **积木 → 真实控件名**的映射（多文件合并，支持 cases 过滤） |
| `params/` | 每分类参数文件（別紙真值 + auto 兜底） |
| `run-plan.json` | 三层作战规划（A 参数 30 / B 非浏览器 / C 新块 420→190 家族） |
| `runnable-now.json` / `mock-results.json` / `screen-map.json` | 现在能跑的 / 批跑结果 / 画面映射 |
| `run.cmd` | 公司机双击入口（node.exe 放同目录） |
| `PLAYBOOK-450.md` | 交接手册（多 AI 并行怎么切） |

## 4. 领域概念（5 分钟版）

| 词 | 是什么 |
|---|---|
| Case / 手顺书 | 一本书，ID 四段如 `AZ-110-01-009`。执行和记结果的最小单位，共 1386 本（你被分了 450） |
| Scenario | 三段 ID `AZ-110-01`，设计/覆盖单位，347 个 |
| Route（实施顺序） | 一串 case 的执行链（如 AZ-R101 = 001→12→67），保证"先做谁后做谁" |
| 积木 block | 跨书反复出现的连续操作段（如"菜单→新規登録→入力画面"），252 块，自动化复用的核心 |
| 三状态 | planned（没写代码）/ coded（写了+模拟环境通过）/ verified（**真机**通过） |
| 別紙 | 每本书的"填什么值"（操作内容）+"画面该显示什么"（表示内容）两张附表 |
| A/B/C/D 分级 | A 29 本（干净可全自动）/ B 369（有人工步骤）/ C 48（参数待修）/ D 4（别纸与业务规则冲突，故意不跑绿） |
| mock / live | mock = 打模拟环境（源码快照）；live = 真机。真机加 `--live` 才执行 mock 替代断言 |

## 5. 现在到底做到哪了（口径已核对，别再被旧文档骗）

| 口径 | 数字 | 出处 |
|---|---|---|
| 手顺行 | 10,803 行 | analyze_steps |
| 模板 | 215 种 | templates.json |
| 积木 | 252 块 = 3 verified + 246 coded + 3 planned | blocks.json |
| case 级 | **454/450 全部 mockPass**（logs 455 个目录含 1 个 demo） | execution-status.json |
| 真机 verified | 只有 009 的前 3 块积木（菜单→入力→保険種類popup） | status3Map.verified |
| 分级 | A 29 / B 369 / C 48 / D 4 | FEASIBILITY.md |

**一句话：源码模拟层面全通了，真机只啃了 3 块积木。** 下一步的杠杆是 A 类 29 本先上公司机。

注意口径陷阱：`STATUS3.md` 文档还写着"97 coded"（10-24 上午的快照），真值看 `execution-status.json`；
README 的状态表也停在 10-23。**旧文档的数字一律不信，以 JSON 真值源为准。**

## 6. 双机结构（这是理解这个项目的钥匙）

```
家用机（这台）= 开发机                    公司机 = 执行机
├─ 跑 Python build                        ├─ 不装任何东西（无管理员权限）
├─ 起模拟环境（mock-server 10090+）       ├─ node.exe 绿色版 + run.cmd
├─ 改 selector / 参数 / 积木              ├─ run.cmd <caseId> → Edge CDP
└─ git push / publish                     └─ 証跡截图拷回来（logs/）
```

- 公司机不需要 Python，整个 `v2/` 拷过去就能看。
- runner 携带版部署见 `automation/node-runner/README.md`：解压、双击 run.cmd、首跑手动登录 SUT（等菜单出现最长 120 秒）。

## 7. 各目录/文件速查表（Find-in-page 用）

根目录：
- `index.html` / `legacy.html` / `js/` / `css/` —— v1 旧版，**别动，也别再看它学结构**
- `v2/` —— 新版全部
- `HANDOFF.MD` —— 10-23 版交接文档（数据层细节和踩坑清单仍然最全，但自动化部分已过时）
- `README.md` —— 10-23 版，GitHub Pages 说明还有效（.nojekyll 别删）
- `test_documents_*.zip` —— 原始 zip，`date/` 里的 JSON 就是从这来的
- `手顺书.xlsx` —— 单本样例（AZ-110-38-001），拆解审查.md 用它做的实例教学
- `【品管SV更改】...xlsx` ×2 —— scenario 一览 + 実施順序，设计层主数据

automation/：
- `AZ-110-01-009.md` —— **真机 selector 与业务规则的单点记录**（種目Z→入力区分5/7 之类），做真机前必读
- `ASSIGNED.md` —— 450 本怎么分组、什么顺序
- `templates.json` —— 215 模板注册表
- `execution-status.json` —— **三状态真值源**（cases 454 + status3Map）
- `runners.json` —— runner/case 注册，前端吃它
- `screens/` + `MANIFEST.md` —— 真实画面 HTML 捕获（找控件真名，禁编造）
- `blocks/` —— blocks.json（252 块）/ SEMANTIC-NORM.md（归一规则）/ COVERAGE.md / PILOT.md / progress.json / case-evidence.json
- `steps/` —— DESIGN.md（积木组合设计）/ inventory.json（10803 行原始清单）
- `node-runner/` —— 见 §3.4
- `cdp/` —— PowerShell CDP 客户端（start-edge.ps1 / Cdp.ps1 / run-009.ps1 / mock / params）
- `logs/` —— 455 个结果目录 + 顶层报告（FEASIBILITY / PARAM-REVIEW / BLOCK-QUALITY / MANUAL-CHECKLIST / PARAMS-COVERAGE / AUTOMATION-ASSESSMENT / A-CASES.txt / NOTES-RAW.txt）
- `progress/` —— 进度暂存

docs/：
- `ARCHITECTURE.md` 架构（组件图仍准确）/ `DATA-MODEL.md` 数据结构 / `AUTOMATION.md` CDP 运维
- `DECISIONS.md` D1~D17 决策账 / `WORKLOG-2026-10-24.md` 全天日志（含 6 条错误教训）
- `TEST-LOGIC.md` 测试逻辑 / `MANUAL-DECISION.md` **人/AI 分工唯一标准**（判定以手顺书行为准，batch/DB/日志=人，click/输入/画面断言=AI）
- `REFERENCE-WEBAPPS.md` 3 个 webapp 是什么 / `ROADMAP.md` 计划 / `README.md` 文档导读

review/：
- `拆解审查.md` —— **入门最好的教学文档**：拿一本真 Excel 拆给你看"上一个 AI 到底做了什么"
- `business-summaries/` —— 按模板写的业务摘要（进行中）
- `ui-*.png` / `s3-drawer-009.png` —— UI 截图存档

evidence/：3 个 xlsx（証跡汇总导出）。
reference/webapps/：AMB / AMC00 / ANB00 三套客户 webapp 快照（共 102 文件），本地保留，git 只存 manifest。

## 8. 文档可信度标注（哪些话还能信）

| 文档 | 状态 |
|---|---|
| `HANDOFF.MD` §1-5（目标/数据源/坑） | ✅ 仍然权威，数据层的坑基本都在这 |
| `HANDOFF.MD` §6-8（自动化/已知限制） | ⚠️ 已过时——"没有实现真正的 CDP runner"已被 node-runner 推翻 |
| `README.md` 状态表 | ⚠️ 停在 10-23（45 块/68% 是旧口径） |
| `docs/ARCHITECTURE.md` | ✅ 组件图和分层仍准确 |
| `automation/STATUS3.md` | ❌ 还停在 97 coded，真值看 execution-status.json（246） |
| `logs/FEASIBILITY.md` 等顶层报告 | ✅ 最新收尾轮产物 |
| `review/拆解审查.md` | ✅ 概念教学最清晰 |

## 9. 如果哪天断片了，按这个顺序恢复记忆

1. 本文 §1 流水线图 → §5 口径表
2. `review/拆解审查.md`（30 分钟，理解"手顺书→模板→积木"）
3. `docs/WORKLOG-2026-10-24.md`（那一天把目标校准成"机器执行"，以及为什么）
4. `automation/node-runner/PLAYBOOK-450.md`（单本怎么跑）
5. 打开 `v2/index.html#/automation` 亲手点一本 —— 界面自己会解释

## 10. 明确不该做的事（历史事故，写下来防止重演）

- **不要把 mock pass 说成真机 pass** —— 项目最大的诚信红线，三状态体系就是为这个立的
- 别静默丢数据（旧版/重复/欠损必须可见，HANDOFF §5.4）
- 别用 scenario-master 当层级主数据（只有 110 场景，压平了 237 个 AZ 场景）
- 别把 X 数当进度分母（X=948 vs case=1386，口径不同）
- `.nojekyll` 别删（Pages 构建会挂）
- 家用机不是执行机 —— runner 别在家里"测真机"
- 改数据逻辑后必跑 `build_data.py` + `verify_routes.py`，看 validation 数量
- 解释数字变化必须查 git/数据，不能猜（假阳性 verified 的教训）

## 11. 公司机最小携带清单（2026-10-25 按 runner.mjs 实际读取面核对）

跑真机（live）必须 —— 合计约 25MB + node.exe：

| 项 | 体积 | 为什么 |
|---|---|---|
| `node.exe`（v20+，绿色版） | ~70MB | 唯一外部依赖，免安装放同目录 |
| `automation/node-runner/`：`runner.mjs`、`run.cmd`、`package.json`、`node_modules/`（只有 playwright-core ~14MB，走系统 Edge，不下载浏览器）、`block-selectors*.json` ×16 | ~19MB | 执行器本体 |
| `automation/cdp/params/*.json` | 小 | 每本书要填的值（別紙真值 + auto 兜底），runner 唯一参数来源 |
| `automation/blocks/`：`blocks.json`、`case-evidence.json`、`screen-rules.json` | ~4.4MB | 积木组合 + 人工步骤判定 + 画面规则，runner 的"剧本" |
| `logs/` | 自动生成 | 証跡输出，跑完拷回开发机 |

注意：目录层级保持 `automation/` 结构（runner 用 `../../automation/blocks` 相对路径找剧本）。

可选加项：
- 想在公司机离线演示 → 加 `mock-server.mjs` + `mock-routes.json` + `mock-src/`（4.7MB）
- 给人看进度/作业单 → 加 `v2/`（删掉 `data/index.json`，app 不读它）约 30MB

**不用带**（工厂部分，留在开发机）：`date/`、`workflow/`、Excel×3、zip、`tools/`、`reference/`、
`automation/screens/`、`automation/steps/`、历史 `logs/`（361MB）、`docs/`、`review/`、`evidence/`、`.git`。
