# 碰到问题：先查代码，不许猜

> 用户明确要求（2026-10-26 23:34）：
> 「碰到问题，就查 reference，这也算一条必须记住的对吧。」
> 「测试的时候尽量多看发给你的前端引用代码，碰到什么情况，也是先看代码了解。
>   还是那个原则：之前也聊过：了解清楚了再弄。」

**这不是建议，是硬规矩。** 编号 R0，优先级高于其他所有规则。

---

## 一、查什么，在哪查

| 目录 | 是什么 | 权威性 |
|---|---|---|
| **`reference/webapps/`** | **真机前端源码快照**（Shift_JIS） | ★★★★★ **最高**。所有 selector 以它为准 |
| `automation/node-runner/mock-src/` | mock 用页面（拿去跑的） | ★★★ 基于 reference，但可能被改过 |
| `v2/mock-src/` | Pages 演示用副本 | ★★ 同源，别拿来判断 |
| `v2/data/cases/*.js` | 手顺 / 别紙的 JSON | ★★★★ 数据源 |
| `workflow/workflow-*.json` | 手顺正文（二手提取） | ★★★ 可能截断，优先用 v2 |

### 三者的实际差异（实测）

`reference/webapps/AMB/webapp/WEB-INF/views/` 有 26 个页面。
`mock-src/AMB/` 有 31 个，多出来的是：

```
dummy.html / dummy.js / index.html    ← mock 专用入口
insurance_item_select.html            ← 弹窗页（reference 里叫别的名字或没收录）
system_error.html / system_error_child.html   ← mock 造的
static/                                ← 静态资源
```

**结论**：mock 是 reference 的子集 + 几个自己造的。**判断真实结构永远看 reference。**

---

## 二、五种典型症状 → 查哪里

### 症状 1：「点了没反应，也不报错」

**先查**：那个按钮的 `onclick` 指向的函数，看它有没有守卫条件。

```bash
grep -n "function onClickSelectInsurance" -A 8 reference/webapps/AMB/webapp/WEB-INF/views/AMA03.html
```

实际找出来的：

```javascript
function onClickSelectInsurance() {
    var selectedIndex = largeItemObj.selectedIndex;
    if ( selectedIndex <= 0 ) { return; }   // ← 真凶
    ...
}
```

→ 种目没选，按钮什么都不做，**连错误都没有**。
→ 这不是 selector 问题，是**前置条件**问题。写进流程的 `requires:`。

---

### 症状 2：「元素找不到 / selector 不匹配」

**先查**：这个元素在 reference 里到底有没有，有几个。

```bash
grep -o '<input[^>]*section_code[^>]*>' reference/webapps/AMB/webapp/WEB-INF/views/AMA04.html
```

今晚就靠这个发现：`種目` 一个 label 底下有**两个**控件。

```html
<input type="hidden" id="selected_large_item_code">      ← 提交用
<select name="large_item_list.selected">                 ← 用户操作
```

字典抓了前面那个，导致往 hidden 写值，`select` 还是空的 → 又触发症状 1。

---

### 症状 3：「字段名对不上 / 别名查不到」

**先查**：别紙写的名字 vs 画面上显示的名字。

```bash
grep -o 'field_title">[^<]*' reference/webapps/AMB/webapp/WEB-INF/views/AMA19.html
```

实际差异：别紙写 `確認相手`，画面上是 `確認相手（氏名）（注1）`。
→ 加进 `ui-aliases.json`，所有用那个说法的本一起生效。

---

### 症状 4：「表内字段定位不了」

**先查**：`<tbody>` 模板，看每行长什么样。

```bash
grep -n -A 20 '<tbody' reference/webapps/AMB/webapp/WEB-INF/views/AMA18.html
```

找出来的结构：

```html
<tr>
  <td><input type="radio" name="selectNo" th:value="${stat.index}"></td>
  <td>部店課支社コード</td>
  <td>募集人ID</td>       ← 第 4 列
</tr>
```

→ 于是能写出 `tr:has(td:has-text("3028004586")) input[name=selectNo]`。

**如果 `<tbody>` 是空的**（如 AMA13 的 `<div id="Result">`），
那就是 JS 动态插入，**必须真机抓**，写进 `pendingRuntime`。

---

### 症状 5：「跑完了但结果不对」

**先查**：手顺原文，不是别紙摘要。

```bash
python -c "读 v2/data/cases/ 里那本，打印 workflow.rows 全部"
```

常见三件事：
1. 手顺某一行需要人工操作，被当成自动跳过
2. 期望值写错（别紙和手顺不一致）
3. **mock 和后端行为不同**（如 POST 不跳转）

**不要**在这时候改断言让它过。

---

## 三、查代码的标准动作（照着做）

遇到问题，按这个顺序，**不许跳步**：

```
1. 定位到具体画面码（如 AMA04）
2. 在 reference/webapps/<app>/webapp/WEB-INF/views/<code>.html 打开它
   ⚠️ 编码是 Shift_JIS，用 python decode('cp932') 或 iconv
3. 搜关键词：字段名 / id / name / 按钮 value
4. 看三样东西：
   a) 元素本身（tag / type / id / name）
   b) 它的父级（在哪个 div / tr 里）
   c) 它的事件（onclick / onchange 指向哪个函数）
5. 事件函数也要看（守卫条件通常在这里）
6. 记下结论 → 才动手改
```

**关键**：第 4 步的 (b) 和 (c) 最常被忽略，但问题往往就在那里。

---

## 四、今晚的反面教材（写下来不许重犯）

### 反面：改-跑-错-改 空转 1 小时

我为了修 `種目` 没被选中，连续改了 5 次代码、跑了 5 次完整流程（每次 60-80 秒），全错。

**实际该做的**：打开 `AMA03.html`，看那两行 HTML，30 秒就能看出双控件问题。

### 正面：读 5 分钟代码解决

最后我停下不跑了，`grep` 了一下 `種目` → 立刻看到 hidden + select。

### 更早的正面例子：P8

`種目` 没选 → 保险按钮无反应。也是靠读 JS 的 `if (selectedIndex <= 0) return;` 找到的，
不是靠反复试。

---

## 五、这条规矩怎么写进工作流

### 给 AI 自己的

```
改任何代码之前，必须能回答：
  「现在的实际结构是什么？」（引用具体文件 + 行号）
  「为什么现在会失败？」（引用具体代码）
回答不出来 = 不许动手
```

### 给批量迁移的

每本生成流程文件之前：
1. 列出这本涉及的画面
2. 对每个画面，确认字典里有它
3. 字典里没有的字段 → 查 reference → 还是没有 → `pendingRuntime`
4. **不许**因为"应该差不多"就用别的字段代替

---

## 六、一句话总结

> **问题不在"猜错了"，在"允许自己猜"。**

真机上每一个"点了没反应"背后，都有一行代码在说为什么。
代码就在 `reference/webapps/` 里，Shift_JIS，随时可读。

---

## 附：常用命令

```bash
# 用正确编码读
python -c "
import sys; sys.stdout.reconfigure(encoding='utf-8')
print(open('reference/webapps/AMB/webapp/WEB-INF/views/AMA04.html','rb').read().decode('cp932','replace'))
"

# 找某字段的完整标签块
python -c "
import sys,re; sys.stdout.reconfigure(encoding='utf-8')
t=open('.../AMA04.html','rb').read().decode('cp932','replace')
i=t.find('種目'); print(t[i-100:i+500])
"

# 找 JS 函数
grep -n -A 10 "function onClickSelectInsurance" <file>

# 找表格结构
grep -n -A 20 "<tbody" <file>

# 比较 reference 和 mock 有没有差异
diff <(iconv -f cp932 -t utf-8 reference/.../AMA04.html) \
     <(iconv -f utf-8 -t utf-8 automation/node-runner/mock-src/AMB/AMA04.html)
```
