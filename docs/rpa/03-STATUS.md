# 当前进度 / 明天怎么做

> 最后更新：2026-10-26 夜

## 已完成

| 产出 | 状态 | 规模 |
|---|---|---|
| `tools/build_ui_dictionary.py` | ✅ 可用 | 53 画面 / 106 可输入字段 / 131 只显示 / 295 按钮 |
| `ui-dictionary.json` | ✅ 生成 | 含 rowfields（4 画面 7 条） |
| `ui-screens.json` | ✅ 人工整理 | 36 个手顺画面名 100% 覆盖（25 inferred / 10 unknown / 1 confirmed） |
| `ui-aliases.json` | ✅ 初版 | 16 条同义映射 |
| `tools/compile_flow.py` | ✅ 可用 | 三种解析级别 + pendingRuntime |
| `flows/AZ-110-01-009.yaml` | ✅ 编译通过 | 44 步 / 34 值 / 0 error / 6 pendingRuntime |
| `flows/README.md` | ✅ 格式说明 | |
| `automation/node-runner/capture.mjs` | ✅ mock 验证通过 | 真机 DOM 抓取器 |
| `automation/node-runner/CAPTURE.md` | ✅ 现场手册 | |

**当前 009 编译结果**：
```
steps 44   targets 17/24   errors 0
pendingRuntime 6 (row 34/39/42/43/45/48)
```

## 明天（2026-10-27）要做的

### 步骤 1：跑 009，顺便抓 DOM

```cmd
cd automation\node-runner
node capture.mjs --url https://真机/AMB/AMA01.html --out capture-1027 --edge
```

然后 **手动把 009 走一遍**（顺便摸环境，两部分都要）。

**注意**（血泪）：
- **`種目` 必须先选**，不选点保险种类按钮完全没反应（P8）
- 认不到的画面/点了没反应的步骤，**记下来是哪一步**
- 走完 `Ctrl+C`

### 步骤 2：把 `capture-1027` 发回来

我会做：
1. `python tools/build_ui_dictionary.py --src capture-1027/pages --merge`
2. 从真实 DOM 确定 6 个 pendingRuntime
3. 更新 `ui-screens.json` 里 25 个 `inferred` → `confirmed`
4. 重新编译 009

### 步骤 3：接着做执行器

`runner.mjs` 接新格式（见 04-ARCHITECTURE）。这一步之后 009 能真的从 YAML 跑。

---

## 待解决问题的完整清单

### A. 需要真机数据（6 个）

| row | 字段 | 卡在哪 |
|---|---|---|
| 34 | 検索 | `form['imperfectSearch['+indexNo+']']` JS 拼接 |
| 39 | 選択欄 | 结果在 `<div id="Result">`，JS 插入 |
| 42 | 照会内容チェックボックス | `list[n].inquiry_contents_edit_flag` |
| 43 | 修 | `editInquiryContents[n]` |
| 45 | 照会内容 | AMA15 字段 JS 生成 |
| 48 | 代理店照会 | `list[n].agent_inquiry_flag.selected` |

### B. 需要人判断（不改代码）

| 问题 | 现状 | 需要什么 |
|---|---|---|
| `異例取扱管理メニュー画面` vs `異例取扱管理システム　メニュー画面` | unknown | 真机看一眼标题就知道 |
| 25 个 `inferred` 画面映射 | 靠 URL 规则猜的 | 真机确认 |
| 别紙 55 个标签查不到（27% 行） | 同义/只显示/表内 | 逐类归因，不是全要填 |

### C. 已标记但没修的设计债

| 项 | 说明 |
|---|---|
| `do: manual` 交互 | 执行器支持停下等人，**还没实现** |
| 失败不退出 | 计划中的 RPA 交互模式 |
| 450 本批量生成 | 等格式确认 |
| lego 导出格式对接 | v2/lego.html 的导出改成 flow YAML |

---

## 关于 252 个积木的去向

**不要删。** 定位改成"模板片段库"。

- 迁移期间：新流程 vs 旧积木可对照
- 出问题：能退回旧路径
- 用户原话："之前的自动化不能浪费，本身也可以成为模板"

**唯一确定要废弃的**：`build_blocks.py` 的 n-gram 挖掘 + DP 合成（它优化的是"覆盖率"不是"对不对"）。

---

## 怎么恢复上下文（给未来的我）

按这个顺序读：

1. `docs/rpa/00-DECISIONS.md` — 定了什么、为什么
2. `docs/rpa/01-PITFALLS.md` — 16 个坑，别再踩
3. `docs/rpa/02-DEV-RULES.md` — 写代码前的硬约束
4. `docs/rpa/04-ARCHITECTURE.md` — 数据怎么流
5. `flows/AZ-110-01-009.yaml` — 格式长什么样（看真货）
6. `flows/README.md` — 怎么读那个 yaml

**不要读**：`docs/PIPELINE-DEEP-DIVE.md`（那是旧架构的说明，已经过时）

---

## 关键数字速查（2026-10-26 实测）

```
450 本，10803 行手顺
252 个积木（125 个只被 1-2 本用）
1613 个执行步骤，其中 177 步引用 params（10%）
画面前端匹配：36 种浏览器画面，100% 有映射（但 25 个是猜的）
别紙标签：91 种，字典能查到 36 种（73.5% 行覆盖）
全局假数据：60 本在用 auto.json 兜底值
```
