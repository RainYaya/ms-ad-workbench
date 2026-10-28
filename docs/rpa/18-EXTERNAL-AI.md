# 外部 AI 生成流程：测试用例手顺

> 这一页是一份**可照做的验收手顺**：把四样材料贴进任意 AI 聊天窗口，让它产出能跑的流程，
> 再回到仓库用真实 DOM 验收。照抄即可复现；不是概念说明。
> **全部操作只在实机电脑上做、不回家 → [19-REAL-MACHINE.md](19-REAL-MACHINE.md)。**
> 语言规则：[16-LANGUAGE.md](16-LANGUAGE.md)。日常命令：[17-USAGE.md](17-USAGE.md)。

## 1. 判定标准（缺一不可）

| 级别 | 标准 | 命令 |
|---|---|---|
| L0 | `check-flow` 0 error，步数 = 手顺行数 | `check-flow` |
| L0.5 | 每个 selector 在真实 DOM 里恰好 1 个可见 | `check-patch --flow … --capture …` |
| L1 | mock 上跑完，pending 如实列出 | `run-flow --headless` |
| L2 | 真机跑完，截图齐全 | `run-flow --live --demo` |

`PENDING` / `ANCHOR` / `NO-CAPTURE` 都不是通过。

## 2. 准备材料：一条命令

网页 AI 的真实约束：**只能上传普通文件 / 粘贴文本，不能开 zip，不能读本地，也不会跑我们的工具。**
所以材料必须是一个纯文本文件夹：

```bash
node automation/node-runner/make-brief.mjs --case AZ-110-01-009 \
  --capture capture-AZ-110-01-009/az-110-01-009
```

`brief/<case>/` 里就是全部材料（已经全转成 `.txt`，任何上传框都收）：

| 文件 | 来源 | 用途 |
|---|---|---|
| `00-RULES.txt` | `16-LANGUAGE.md` 原文 | 语言规范 |
| `01-HAND.txt` | `v2/data/cases` 自动导出 | 手顺行 + 别紙值/期望 |
| `02-INDEX.txt` | capture pack | 措辞 → 控件 id、按钮、表格样例 |
| `03-SCREENS-NN.txt` | capture pack | 清洗后的实机 HTML |
| `04-ROUTES.txt` | capture pack | 走过的 URL → 画面名 |
| `05-PROMPT.txt` | 工具生成 | 粘贴到对话框的指令 |
| `README.txt` | 工具生成 | 给人看的步骤 |

`brief/` 含实机 HTML 副本，已在 `.gitignore`，**不提交**。

## 3. 在 Copilot 里怎么做

1. 上传 `00-RULES.txt`、`01-HAND.txt`、`02-INDEX.txt`、`03-SCREENS-*.txt`、`04-ROUTES.txt`。
2. 把 `05-PROMPT.txt` 全文粘到对话框，发送。
3. 它会回两个 YAML 代码块：flow 和（可选的）control-patch。
   存成 `flows/tests/<case>.ai.yaml` 和 `flows/patches/<case>.control.yaml`。
   **`case:` 必须是本号**，否则行覆盖/日志都会对不上。
4. 如果它说「太长/读不完」：先只传 `00`+`01`+`02` 让它写 flow；它问某个控件时再贴对应 HTML。

> 提示词的核心内容（`05-PROMPT.txt` 已含，这里只是摘要）：
> 只输出 flow + control-patch；行内控件必须 anchor；画面名照抄 遷移；值只来自别紙；
> 不确定就写 note，不要猜；手顺 44 行就是 44 步，不许合并或删除。

**不需要让它知道仓库里有哪些控件。** 推荐两轮：

1. 第一轮只要 flow（target 全部写 `{label}`）。
2. 回仓库跑 `check-flow`，把「标签找不到 / 有二义」的错误原文贴回同一个对话，
   让它只补这些的 selector（control-patch）或锚点。

这样它不用猜共享字典的内容，也不会把已有控件重写一遍。

## 4. 产出放哪

| 文件 | 位置 | 说明 |
|---|---|---|
| 流程 | `flows/tests/<case>.ai.yaml` | 测试产出，验收前不进 `flows/books/` |
| 控件补丁 | `flows/patches/<case>.control.yaml` | 与别本共享 |
| 本别覆盖 | `flows/overrides/<case>.yaml` | 仅当确实需要钉行；必须写 `reason` |

`flows/tests/` 用于「未验收的产物」。验收后再决定：合入 `flows/books/`，或据此修手写本。

## 5. 回仓库验收（照顺序跑）

```bash
# ① 结构 / 行覆盖 / 值来源 / expect 类型
node automation/node-runner/check-flow.mjs flows/tests/<case>.ai.yaml

# ② 用真实 DOM 校验每个 selector（capture 可以是 capture.mjs 的目录，也可以是手工另存的 .html 目录）
node automation/node-runner/check-patch.mjs \
  --flow flows/tests/<case>.ai.yaml --capture capture-YYYYMMDD

# ③ 缺控件就补（粘贴真实元素，先校验再加 --apply）
node automation/node-runner/add-control.mjs --capture capture-YYYYMMDD \
  --screen <画面名> --html '<input ...>' --anchor <行值> --out flows/patches/<case>.control.yaml

# ④ mock 跑 / 真机演示
node automation/node-runner/run-flow.mjs flows/tests/<case>.ai.yaml --demo --demo-delay 1200
```

修完重跑 ① ②。**②里 0 error 且没有未解释的 ANCHOR** 才算这一级过。

## 6. 实测记录：AZ-110-01-009（2026-10-27）

### 输入

- 语言规范：`docs/rpa/16-LANGUAGE.md`
- 手顺：行 14–57（44 个操作行），画面 8 个
- 别紙：操作内容 1–5、表示内容 1–8
- 真实 DOM：`实机dom/AZ-110-01-009.zip`（41 张快照 / 9 个画面）
- 实际交给 AI 的就是 `make_brief` 产出的 10 个 `.txt`（规则 27K / 手顺 9K / 索引 14K / HTML 5 块 128K / 路由 2K / 提示词 2K）

### 产出

- `flows/tests/AZ-110-01-009.ai.yaml`：**44 步 / 44 个手顺行 / 49 个 target**
- `flows/overrides/AZ-110-01-009.yaml`：row 34「検索」钉先头行（空行无锚点）

### 结果

| 检查 | 结果 |
|---|---|
| `check-flow` | steps 44 / handRows 44 / **errors 0** / pending 8 |
| `check-patch --flow` | 54 个 selector：**OK 51** / ANCHOR 3 / PENDING 1 / errors 0 |
| 手写本对照（同一 capture，修正后） | 56 个 selector：OK 51 / ANCHOR 3 / PENDING 1 / errors 0 |

- **3 个 ANCHOR**（row 42/43/48）不是 selector 错：capture 是用别的测试数据抓的（行值是
  `訂正印もれ`，手顺值是 `添付書類もれ`）。用 capture 自己的行值复验，三个模板都是 1/1 可见。
- **对照时发现手写本有真错误**：`flows/AZ-110-01-009.yaml` 的 row 42 把 `value: true` 当成了
  行锚点（`tr:has(td:text-is("true"))`），row 43 锚点为空 → 20 命中，row 48 用 `否` 当锚点。
  这三行已按 AI 产出的写法补上 `target.anchor: ${case.不備内容}`；修正后手写本也是
  0 error / 3 ANCHOR。**AI 产出在这三行比手写本更正确。**
- **row 39**：項目名検索的结果是 `<select>` option 列表，只能运行期按选项文字选 → PENDING，
  控件补丁写了 `namePattern: field_list.selected`。

### 这次暴露、并已修掉的三件事

1. **画面路由缺失**：`不備内容入力画面-更新` 只登记了 `aZG100Regist`，真实回帖 URL 是
   `AMA04/aZG101Update`，导致 capture 同一画面被拆成两组、离线校验挑到旧快照。
   → 补齐 `ui-screens.json` 的 routes（`aZG101Update` / `aZG101UpdateCompleteDate`、
   `AMA13/aZG900Search|Select`、`AMA18/aZG905Search`、`AMA19`、`AMA15`）。
2. **ANCHOR 与 FAIL 混在一起**：行锚点不在 capture 数据里时原来直接报 ERROR。
   → `check-patch` 现在会单独验证控件本身，给出 `ANCHOR`，并说明「模板形状已验、锚点需真机数据」。
3. **手工 HTML 无法校验**：`--capture` 只认 `index.json`。
   → 现在没有 `index.json` 时按目录里的 `.html` 建索引（读 `<title>` 认画面）。

### 已知限制（写在这里，不要绕过）

- 静态 HTML 看不到 `confirm()` 对话框与 POST 后的页面变化；这类步骤只能运行期验证。
- capture 的测试数据与手顺数据常常不同 → 行锚点必须用「真实运行时的那份数据」再验一次。
- 一个画面会被存很多次；pack 取最完整的一次。要「搜索前/搜索后」两种状态时，先用
  `--meta-only` 看清单，再手工贴对应快照。

### 6.1 真实网页 AI 两轮实测（2026-10-27，非模拟）

这次是**真的由网页版 Copilot 生成**（上一节是我模拟），走 §2–§5 的完整流程。

**第一轮**（`flows/tests/AZ-110-01-009.copilot.yaml`）：

| 检查 | 结果 |
|---|---|
| `check-flow` | steps 44 / handRows 44 / **errors 0** / pending 9 |
| `check-patch` | 56 selectors / **errors 0** / ANCHOR 3 / PENDING 1 |

L0 全绿，但**有 4 处真错误**，其中 2 处被 ANCHOR/capture 数据差异掩盖：

1. row 16 `契約マスタ: 連動しない` —— 勾选框只收布尔值，运行期报
   `checkbox value must be boolean`（mock 实证）。
2. row 42 `check` 没写 `target.anchor` —— 加载器拿 step 的 `value` 当行锚点，
   于是锚点变成 `"true"`；而且这个 value 还是 row 51 的「電話番号チェック」，语义串行。
3. row 48 `value: {value: 否, source: literal}` —— 值写成嵌套对象，锚点变成
   `[object Object]`，check-patch 把它显示成 `ANCHOR`，看起来像"数据差异"。
4. control-patch 把行内控件写死 `list[0]`，与"行内控件必须 anchor"直接矛盾；
   数据多行时会点错行。另外 `flows/patches/*.control.yaml` **不会被自动采用**，
   只有 `add-control --apply` 写进 `ui-rowfields.json` 才生效。

**第二轮**：把 `check-flow` / `check-patch` 的错误原文贴回同一个对话，让它只改这三行。

| 检查 | 结果 |
|---|---|
| `check-flow` | steps 44 / handRows 44 / **errors 0** / pending 9 |
| `check-patch` | 56 selectors / **errors 0** / ANCHOR 3 / PENDING 1 |
| ANCHOR 内容 | 3 个全部是同一原因：`添付書類もれ` 不在 capture 的数据里（模板已验真） |

结论：**两轮收敛。** 第一轮的错不是随机的，是 4 类固定形态（值类型、行锚点回退、
值写成对象、行内控件写死行号）。这 4 类都能在 L0 变成明确报错 —— 见 §6.2。

### 6.2 为什么需要第二轮：检查器太软（根因，含行号）

| 现象 | 根因（文件:行号） | 应该怎么修 |
|---|---|---|
| 勾选框给了字符串 | `check-flow` 只校验值和来源，不看控件 `kind` | L0：`kind` 为 checkbox/radio 时，值必须是布尔 |
| 没写 anchor，错误藏起来 | `flow-loader.mjs:362`：`anchor ?? val` —— 没 anchor 就拿 value 填 `{value}` | 行内控件没写 `target.anchor` 就报 ERROR，不许回退 |
| 锚点成了 `[object Object]` | 同上，且锚点没做类型检查 | 锚点必须是字符串；对象/布尔直接 ERROR |
| ANCHOR 被当成"数据差异" | `check-patch` 只看命中数，不看锚点形态 | 锚点不是字符串 → FAIL，不是 ANCHOR |

这 4 条修完后，第二轮就是机械操作：**跑命令 → 复制输出 → 贴回对话**，
不需要人判读，也不需要仓库作者在场。

### 6.3 现场反馈修掉的东西（2026-10-28，真实公司机实测）

第一轮 Copilot 产出「能过 L0 但不好用」，现场反馈四类问题。不是改 prompt 措辞，
而是分别修在**产生材料的那一端**和**检查器**上：

| 现场说法 | 根因（文件:行号） | 修法 |
|---|---|---|
| 「它也没 popup」 | prompt 里 `popup` 只是一句提示，没有自检项；索引里根本没标哪张画面是子窗口 | `make-pack.mjs` 索引加 `WINDOW: 子ウィンドウ（popup）` 行和「※ このボタンで子ウィンドウが開く」；prompt 加【D. popup】强制项；`check-flow` 加启发式告警 |
| 「要 select 它用了 chooseRow」 | `capture.mjs` 在字段块里取**第一个** input，取到的是隐藏的 `selected_imperfect_code`；`make-pack` 随后又把隐藏 input 从 HTML 里删了，AI 无从发现 | capture 改为**按控件排序选**（隐藏 +10、`select` 0、`textarea` 1、其他 2），并记录 `options`；索引直接写 `没有选项: … → select #…` |
| 「check 语法是填 false，它写成字符串 'false'」 | L0 只校验值和来源，不看控件类型 | `check-flow.mjs` §5.5：checkbox/radio 非布尔 = ERROR（radio 组按 choices 文字寻址，豁免）；`generate_books.py` 把别纸的「連動する/チェックオン」直接转成布尔并注明来源 |
| 「一个详细约束都没有，AI 生成的不好用」 | `05-PROMPT.txt` 只有格式说明，没有「写错了会怎样」 | prompt 重写为【A 值类型】【B 原语选择】【C anchor 必填】【D popup】【E 一行多操作】【F 输出前自检】六段，附「误/正」对照 |

还有一个**材料陈旧**的坑：`make-brief` 以前「pack 已存在就不重建」，于是一个用旧版
`make-pack` 生成的索引被反复寄出去。现在默认**每次重建**，除非显式 `--no-pack`。

再往后查索引本身，又发现两处让它「看不懂页面」的硬伤（都是实测复现，不是推测）：

| 索引里的症状 | 根因（文件:行号） | 修法 |
|---|---|---|
| 一张表被压成一条 1700 字的假标签「項目ｺｰﾄﾞ 項目名 不備内容 照会内容 …」 | `make-pack.mjs` 的 `labelsFromHtml` 用惰性正则跨 `field_title` 单元格匹配，把整行表头当成一个 label；顺带把「保険種類」整个吞掉 | 改成「每个 title 单元格拥有到下一个 title 之前的 HTML」，span 里没有控件就跳过 |
| 表头 `th: (none)`，AI 不知道「代理店照会」是每行一个 `<select>` | 这个应用的列头渲染在 `<table>` **外面**，`capture.mjs:105` 只读 `<th>`，读到空 | 新增 `tableColumnsFromHtml`：输出列名顺序 + `NAME[n] FAMILIES`（每行的控件族和选项）+ 「行内控件用 chooseRow + anchor」 |
| 行内勾选框写字符串 `'false'` 也过 L0 | `add-control.mjs` 算出了元素 `kind` 却在 rowByText 分支把 `kind` 丢了；`flow-loader` 又统一覆盖成 `kind: 'rowfield'`，类型彻底消失 | `add-control` 保留 `kind`；loader 多带一个 `ctlKind`；`check-flow` 对 rowfield 用 `ctlKind` 判布尔 |

最后一条特别值得记：我一开始只修了普通控件，**行内勾选框完全没被拦住** ——
你遇到的正是行内那种。现在有实测反证（`flows/tests/AZ-110-01-009.copilot.yaml`
把 row 42 的值改成 `"連動しない"`，L0 报
`row 42: 照会内容チェックボックス 是 checkbox，值必须是 true/false`）。

## 7. 结论：到底行不行

| 问题 | 答案 |
|---|---|
| 网页 AI 能生成能跑的流吗？ | **能。** 两本实测：AZ-110-05-008（42 步）、AZ-110-01-009（44 步），都是 0 编译错误、selectors 真实 DOM 全部命中或可解释 |
| 贴完就能直接跑吗？ | **不能直接当成品跑。** 聊天窗口验证不了「selector 唯一」和「锚点在这一行」，必须回仓库跑 `check-flow` + `check-patch` 两条命令 |
| 需要给它本地文件/Agent 能力吗？ | **不需要。** 材料全是纯文本；它不需要跑任何脚本 |
| 第一本要多久？ | 30–60 分钟（含 1–2 轮纠错）；之后一本 10–20 分钟 + 校验几分钟 |
| 最可能失败在哪？ | ① 画面没收全（AI 只能照 HTML 写）；② 手顺 44 行被合并/漏行（`check-flow` 会报行覆盖）；③ 行内控件没写 anchor（`check-patch` 会 20 命中/0 命中） |

一句话：**AI 负责“翻译”，仓库负责“验证”。** 翻译这步已经证明可行；验证这两条命令不能省。
