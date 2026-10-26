# RPA 重构（feat/rpa-flow 分支）

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
| 4 | [03-STATUS.md](03-STATUS.md) | 当前进度 + 明天做什么 + 待解清单 |
| 5 | [04-ARCHITECTURE.md](04-ARCHITECTURE.md) | 数据怎么流 + 和旧体系关系 |
| 6 | [05-EXECUTOR.md](05-EXECUTOR.md) | 执行器设计：为什么这样写、6键交互、所学教训 |
| 7 | [06-ROADMAP.md](06-ROADMAP.md) | **施工顺序** 8 步，每步的验收标准和卡住怎么办 |
| 8 | [07-REQUIREMENTS.md](07-REQUIREMENTS.md) | **用户原话 + 需求定义** + 11 条硬约束 |

## 现在能用什么

```bash
# 1. 从 HTML 生成字典（也能吃真机抓的页面）
python tools/build_ui_dictionary.py
python tools/build_ui_dictionary.py --src capture-1027/pages --merge

# 2. 把流程文件编译成可执行结构
python tools/compile_flow.py flows/AZ-110-01-009.yaml
python tools/compile_flow.py flows/AZ-110-01-009.yaml --json out.json

# 3. 真机抓 DOM（人操作，自动存）
cd automation/node-runner
node capture.mjs --url https://真机/AMB/AMA01.html --out capture-1027 --edge
```

## 目录

```
ui-dictionary.json      画面 / 字段 / 按钮 / 行内字段
ui-screens.json         手顺画面名 → 画面码
ui-aliases.json         别紙说法 → 前端说法
flows/                  一本一个 YAML
tools/build_ui_dictionary.py
tools/compile_flow.py
automation/node-runner/capture.mjs
```

## 核心原则

**宁可报错，绝不猜。**

今天所有问题的根源都是"看起来差不多"被当成"对"。
字典查不到就带行号报错，运行期才能确定的就标 `pendingRuntime`。
