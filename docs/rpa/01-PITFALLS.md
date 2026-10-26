# 踩过的坑 — 别再踩第二次

> 全部是 2026-10-26 实测踩出来的。每条都写清现象、原因、解法。

## ★ 最贵的三个

### P1. 前端 HTML 全是 Shift_JIS

**现象**：读 HTML 出来全是乱码（`\x90\\x8d\x9e...`），标签变成 `�w��`

**原因**：`reference/webapps/**/*.html` 全部是 Shift_JIS / CP932。按 UTF-8 读必炸。

**解法**：
```python
for enc in ('cp932', 'shift_jis', 'utf-8-sig', 'utf-8', 'euc_jp'):
    try:
        text = raw.decode(enc)
        if re.search(r'[\u3040-\u30ff]', text):   # 有假名就是对的
            return text
    except UnicodeDecodeError:
        continue
```

**注意**：33 个是 shift_jis、4 个是 cp932、剩下是没有日文的页面。**不要只试一个编码。**

---

### P2. mjs 脚本必须在 node-runner 目录跑

**现象**：`Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'playwright-core'`

**原因**：Node 按 **cwd** 找 `node_modules`，不是按脚本位置。`playwright-core` 只装在了 `automation/node-runner/node_modules`。

**解法**：
- 所有 mjs 放 `automation/node-runner/`
- 或者运行时 `cd` 到那里
- 这次在 `tools/capture/` 下建文件，白跑一遍才知道，又搬回去

---

### P3. `chromium.launch()` 不指定 channel 会找不到浏览器

**现象**：`Executable doesn't exist at ...chromium_headless_shell-1248\...`

**原因**：项目只装了 `playwright-core`，**没有下载浏览器**。必须用系统 Edge。

**解法**：
```javascript
chromium.launch({ headless: !headed, channel: 'msedge' })
```

**这也是设计约束不是 bug**：真机装不了浏览器。

---

## 解析器的坑

### P4. `title="..."` 属性会吃掉标签

**现象**：`確認相手` 提取不到，字段数少了 49 个（194 → 243）

**原因**：
```html
<div class="gyoumu_field_title" title="一大段业务说明...">
  確認相手（氏名）（注1）
</div>
```
正则 `<div class="...field_title">\s*([^<]+)</div>` 匹配不到，因为 `>` 前还有 `title` 属性。

**解法**：`<div class="[^"]*field_title[^"]*"[^>]*>\s*([^<]{1,60}?)\s*</div>`

**教训**：提取到的字段数突然下降，先怀疑正则漏了属性。

---

### P5. 半角/全角假名不是同一个字

**现象**：`ｻﾌﾞｺｰﾄﾞ`（前端）vs `サブコード`（手顺）匹配不上

**解法**：统一归一化
```python
unicodedata.normalize('NFKC', s)      # 半角→全角
s.replace('コード', 'ｺｰﾄﾞ')          # 再统一回前端写法
s.replace('ID', 'ＩＤ')
```

**坑**：只做 NFKC 反而更差（64.4% vs 69.3%），因为前端用半角。**两边都归一化到同一个方向。**

---

### P6. 长音符/连字符有多种写法

`不備内容入力画面－新規`（全角－）/ `不備内容入力画面-新規`（半角-）/ `ｰ`（半角长音）

**解法**：归一化时 `.replace('－','-').replace('ー','-').replace('ｰ','-')`

---

### P7. 模糊匹配会点错按钮

**现象**：`選択欄`（表格行的单选钮）被匹配到 `選択`（确认按钮 `#closeSelect`）

**原因**：纯 substring 匹配太松。`row 39` 还错配到 `#select`。

**解法**：重叠度门槛 + 歧义拒绝
```python
if min(len(n), len(k)) / max(len(n), len(k)) < 0.6: skip
if len(set(v["id"] for v in 同名字段)) > 1: return None   # 拒绝猜
```

---

## 业务的坑

### P8. 种目没选，保险种类按钮点了没反应

**现象**：点 `....`（保险种类），弹窗不开，**也不报错**

**原因**（AMA03 源码）：
```javascript
function onClickSelectInsurance() {
    var selectedIndex = largeItemObj.selectedIndex;
    if ( selectedIndex <= 0 ) { return; }   // 静默 return
    ...
}
```

**教训**：这类"守卫条件"在模板里看不出来，手顺只写"各項目に入力"。**必须在流程文件里写 `requires:`。**

---

### P9. 表内字段的 name 是运行时拼的

**现象**：`照会内容チェックボックス` / `代理店照会` / `修` / `検索` 都解析不出来

**原因**：
```javascript
form['imperfectSearch[' + indexNo + ']']
form['list[' + indexNo + '].inquiry_contents_edit_flag']
```
模板里只有 JS 字符串拼接，**没有静态 HTML 元素**。

**解法**：标成 `pendingRuntime`，等真机 DOM。或用手顺行的文本定位：
```
tr:has(td:has-text("3028004586")) input[name=selectNo]
```

---

### P10. 搜索结果可能是 JS 插入的空 div

**现象**：`AMA13`（項目名検索）找不到任何 `<table>` / `<tbody>`

**原因**：
```html
<div class="item" id="Result"></div>
```
结果由 JS 填进去，模板里是空的。

**解法**：只能真机抓。`ui-dictionary.json` 里标 `status: runtime-resolve`。

---

### P11. 画面名对不上（173 行受影响）

**现象**：手顺 `異例取扱管理メニュー画面` vs 前端 `<title>異例取扱管理システム　メニュー画面`

**原因**：少了「システム」三个字 + 全角空格

**现状**：`ui-screens.json` 里标 `status: unknown`，等真机确认。
**影响**：159/439 本有映射不上的行，其中最严重 11 本（AZ-200-01 组）整本 100% 对不上。

---

## 数据处理坑

### P12. 参数"看起来齐"是假象

**现象**：391/450 本显示"参数全齐"

**真相**：`auto.json` 有 30 个全局兜底值（`sectionCode=AHE61` / `agentCode=252H` / `policyNo=AZ11001`），
**任何本缺值都会拿到这几个**。60 本"跑通了"其实是代入同一套假数据。

**教训**：看到"全覆盖"先查兜底。

---

### P13. 9 个 param 文件叠加，靠"谁先命中"

`generated.json` / `auto.json` / `AZ-110-01.json` / `bulk.json` …
同一个键在不同文件里有不同值（`insuranceLabel`：`00 ： 自賠責` vs `00：自賠責`）。

靠代码里的 `replace('\uFF1A',':')` 掩盖分歧。**真机下拉框一变就必炸。**

**新设计**：一本一个 `flows/*.yaml`，`values:` 块里只写一本的值。没有叠加。

---

## 工具使用坑

### P14. Bash heredoc 写大文件会被截断

**现象**：8KB 以上的中文内容写进去只有一半

**解法**：大文件用 Write 工具，不要用 bash heredoc。

### P15. Windows 控制台 GBK，日文输出会崩

**解法**：`PYTHONIOENCODING=utf-8` + 脚本内 `sys.stdout.reconfigure(encoding='utf-8')`

### P16. mock 端口被孤儿进程占用

**现象**：`EADDRINUSE` 静默死，但看起来像"路由 404"

**解法**：起 mock 前先 `pkill -f mock-server`，或者每次换端口（10083 → 10097 → 10109）

---

## ★ 数据丢失的坑

### P17. 生成器会覆盖手工配置（已修）

**现象**：`build_ui_dictionary.py` 重跑一次，`compile_flow.py` 立刻报 5 个错——
之前手工加进 `ui-dictionary.json` 的 `rowfields` 和 `qualifiedButtons` 全没了。

**原因**：手工维护的数据和生成的数据混在同一个文件里，生成器整个重写。

**解法（结构性）**：**手工段独立成 `ui-rowfields.json`**，永不被覆盖。

```
ui-dictionary.json   ← 100% 生成，随时可删可重建
ui-rowfields.json    ← 100% 手工，只有人改
ui-screens.json      ← 100% 人工整理
ui-aliases.json      ← 100% 人工整理
```

**验证方法**：连续跑两次 `build_ui_dictionary.py` + `compile_flow.py`，结果必须一致。

**教训**：**生成物和人工物必须分文件。** 只要混在一起，早晚被覆盖一次，
而且是在你以为"改好了"之后才发现。这类 bug 不报错，只是静默丢失。
