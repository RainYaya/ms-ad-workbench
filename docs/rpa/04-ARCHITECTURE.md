# 架构 — 数据怎么流

## 总图

```
【输入】真实前端 HTML (Shift_JIS)
reference/webapps/AMB|AMC00|ANB00/webapp/WEB-INF/views/*.html
        │
        │ tools/build_ui_dictionary.py      ← 也能吃真机抓的页面
        ▼
【字典】ui-dictionary.json
  screens: { "AMB/AMA04": { title, fields[], buttons[] } }
  rowfields: { "AMB/AMA04": [{label, namePattern, selectorTemplate}] }
        │
        │  ┌── ui-screens.json    手顺画面名 → 画面码
        │  ├── ui-aliases.json    别紙说法 → 前端说法
        │  │
        │  │   ┌── 手顺 JSON (v2/data/cases/*.js)
        │  │   │      ↓ AI 阅读 + 人确认
        │  │   │   flows/<CASE>.yaml
        ▼  ▼   ▼
   tools/compile_flow.py
        │
        ▼
【可执行】{ row, screen, screenKey, do, targets[{label, selector, value}], expect }
        │
        │ runner.mjs (待接)
        ▼
     Edge (Playwright)
```

## 三个文件的职责

### ui-dictionary.json — 唯一的 selector 来源

```json
{
 "screens": {
  "AMB/AMA04": {
   "file": "AMA04.html",
   "title": "[[]]",
   "fields": [
    {"label": "部店課支社ｺｰﾄﾞ", "key": "部店課支社ｺｰﾄﾞ",
     "id": "section_code", "kind": "input", "selector": "#section_code"},
    {"label": "代理店名", "key": "代理店名", "id": null, "kind": "text-only"}
   ],
   "buttons": [
    {"label": "更新", "key": "更新", "id": "update", "selector": "#update"}
   ]
  }
 },
 "rowfields": {
  "AMB/AMA04": [
   {"label": "照会内容チェックボックス", "namePattern": "list[{n}].inquiry_contents_edit_flag",
    "how": "check"}
  ]
 }
}
```

**注意**：`rowfields` 和 `qualifiedButtons` **不在这个文件里**，在 `ui-rowfields.json`
（手工维护）。这个文件是 100% 生成的，随时可以删掉重建。

**要点**：
- `id: null` = 只显示字段，只能断言
- `kind` 区分 `input` / `select` / `textarea` / `button` / `text-only`
- `rowfields` = 表内动态字段，`{n}` 是行索引

### ui-rowfields.json — 手工维护的补充

```json
{
 "rowfields": {
  "AMB/AMA18": [
   {"label": "選択欄", "selectorTemplate": "tr:has(td:has-text(\"{value}\")) input[name=selectNo]"}
  ]
 },
 "qualifiedButtons": {
  "AMB/AMA04": [
   {"label": "....", "qualifier": "保険種類欄の横", "id": "selectInsuransuItem"}
  ]
 }
}
```

**为什么单独一个文件**：这两段是人从真机/代码分析得出、模板里推不出来的信息。
如果和生成物放一起，每次重跑生成器就会被清空（踩过，见 P17）。

### ui-screens.json — 手顺画面名到画面码

```json
{
 "screens": {
  "募集人検索画面": {"app": "AMB", "code": "AMA18", "status": "inferred"},
  "異例取扱管理メニュー画面": {"app": "ANB00", "code": "ANA01",
                              "status": "unknown", "note": "表記ゆれ 173 行"}
 }
}
```

**status 含义**：
- `confirmed` — 真机/mock 确认过（目前只 1 个）
- `inferred` — 从 URL 规则推的（25 个，**全部需要真机确认**）
- `unknown` — 未解（10 个，多是批处理/邮件类，本不需要浏览器）

### flows/<CASE>.yaml — 一本手顺

三段：`values` / `steps` / `evidence`。

**关键设计**：`row` 字段贯穿全部 —— 每个值和每个步骤都指回 Excel 行号。

## compile_flow.py 的判定逻辑

对每个 `targets` 里的 `label`：

```
1. 查 rowfields[当前画面]
   有 → kind=rowfield
        ├ 有 selectorTemplate → 填入 value 生成 selector
        └ 无 → pendingRuntime（列出来等真机）

2. 查 screens[当前画面].fields/buttons
   有唯一匹配 → kind=field/button，用 #id
   同名多 id  → 拒绝，报错
   没有       → 查 ui-aliases.json 再来一遍
   还没有     → 报错（带 row 号）
```

**不会做的事**：用相似度硬凑一个 selector。

## runner.mjs 待改的地方

现在的 runner 吃老格式：
```json
{ "blockId": { "screen": "AZG001", "steps": [{action, selector, value}], "cases": [...] } }
```

要接新格式：
```json
{ "case": "...", "steps": [{ "row": 24, "screenKey": "AMB/AMA18",
                            "do": "fill", "targets": [{"label":"...","selector":"#...","value":"..."}] }] }
```

**建议做法**：不要改 runner.mjs。写一个新的 `run-flow.mjs`，只支持 10 个动作，
把老 runner 留着跑旧积木做对照。

理由：runner.mjs 有 510 行，混着登录、菜单扫描、证据收集、trace。改它风险高。

## 动作清单（10 个）

| do | 参数 | 说明 |
|---|---|---|
| `click` | targets | 点按钮/链接 |
| `fill` | targets | 输入 |
| `fillAll` | `use: [标签...]` | 批量输入（从 values 取值） |
| `select` | targets | 下拉框 |
| `check` | targets | 复选框 |
| `clickRow` | targets | 表内行，用值定位 |
| `expect` | `expect: {类型: 值}` | 断言（迁移/显示/值） |
| `expectRows` | `min` | 表格行数 |
| `expectMessage` | `expect: {出力: 码}` | 消息 |
| `manual` | `note` | 停下等人工 |

## 和旧体系的关系

| 旧 | 新 | 动作 |
|---|---|---|
| blocks.json (252 块) | **保留**，作模板库 | 不删 |
| block-selectors*.json (16 个) | 被 ui-dictionary.json 替代 | 迁移完可归档 |
| cdp/params/*.json (9 个叠加) | 被 flows/*.yaml 的 `values:` 替代 | 迁移完可归档 |
| runner.mjs | 保留，新写 run-flow.mjs | 不动 |
| build_blocks.py | n-gram+DP 部分废弃 | 保留文件，不再跑 |
