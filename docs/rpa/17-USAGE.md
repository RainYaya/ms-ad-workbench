# 使用说明（唯一入口）

> 最后更新：2026-10-27　适用分支：`feat/rpa-flow`
> 这份文档回答三件事：**怎么启动、每种活怎么做、出错先看哪。**
> 规则细节看 [16-LANGUAGE.md](16-LANGUAGE.md)，整条链看 [15-CHAIN.md](15-CHAIN.md)。
> **Studio 每一栏对应哪个 YAML 键、值从哪来（`env` / `values` / `case`）→
> [22-STUDIO-FIELDS.md](22-STUDIO-FIELDS.md)。**
> **真机上某一步找不到控件、要改哪个文件 → [23-REAL-MACHINE-REPAIR.md](23-REAL-MACHINE-REPAIR.md)。**
> 想先搞懂这门语言本身（类型、寻址、顺序、编译/运行的边界）→
> [20-YAML-AS-LANGUAGE.md](20-YAML-AS-LANGUAGE.md)。
> **全部操作只想在实机那台电脑上做完 → 直接看 [19-REAL-MACHINE.md](19-REAL-MACHINE.md)。**

## 0. 一次性准备

- Node.js 20+（本机实测 24）、Python 3.10+、Microsoft Edge。
- 在仓库根目录执行（下文所有命令都在根目录）：
  ```bash
  npm install          # playwright-core 等
  ```
- 不需要启动任何常驻服务；下面用到的 mock / studio 都是按需启动。

## 1. 五分钟上手：跑一本、看一遍

```bash
# ① 起 mock（另开一个终端，保持运行）
node automation/node-runner/mock-server.mjs 10117

# ② 离线检查一本（不启动浏览器；0 error 才算过）
node automation/node-runner/check-flow.mjs flows/books/AY-120-08-001.yaml

# ③ 演示模式跑（有头浏览器；页面顶部有横幅，目标有红框）
node automation/node-runner/run-flow.mjs flows/books/AY-120-08-001.yaml \
  --base http://127.0.0.1:10117/AMB/dummy.html --demo --demo-delay 1200 --yes
```

演示模式里：`--demo-delay 1500` 每步停 1.5 秒，**在浏览器窗口按 Space 暂停/继续**。
去掉 `--demo` 加 `--headless` 就是无人值守跑法。
每次运行的日志、截图、`run.json` 在 `logs/<case>-flow/`。

## 2. 文件地图（改哪个、看哪个）

| 位置 | 是什么 | 谁维护 |
|---|---|---|
| `v2/data/cases/*.js` | 手顺 + 别紙的原始数据 | 导入，不手改 |
| `ui-screens.json` | 画面名 ↔ 画面代码 ↔ 真机路由 | 人工；抓到新路由就补 |
| `ui-controls.json` | 从 HTML 挖出的控件库 | `tools/build_controls.py` |
| `ui-rowfields.json` | 行内控件/日期/组合控件覆盖（跨本共享） | 人工 + `add-control` |
| `flows/bindings.yaml` | 手顺措辞 → 控件 的绑定表 | `tools/build_bindings.py` + Studio 确认 |
| `flows/books/*.yaml` | 生成的本流程（生成后归人） | `generate_books.py`，之后人工 |
| `flows/*.yaml` | 手写流程（8 本） | 人工 |
| `flows/tests/*.yaml` | 外部 AI / 试验产出的流程 | 人工，验收后再合入 |
| `flows/overrides/<case>.yaml` | 本别覆盖（只改怎么做，不改期望） | 人工 |
| `flows/patches/*.yaml` | 控件补丁（标签 ↔ selector） | `add-control` / 人工 |
| `logs/<case>-flow/` | 运行日志、截图、下载、run.json | 运行时自动 |
| `capture-*/` | 实机 DOM 快照（**不进 git**） | `capture.mjs` |

`capture-*/`、`实机dom/` 在 `.gitignore` 里：**实机页面永远不提交**。

## 3. 日常任务

### 3.1 检查 / 跑一本流程

```bash
node automation/node-runner/check-flow.mjs <flow.yaml>      # L0 静态检查
node automation/node-runner/run-flow.mjs <flow.yaml> ...     # 跑
```

`check-flow` 退出码：0 = 无 error；1 = 有 error。`PENDING` 不是 error，但也**不是通过**。

### 3.2 真机跑

```bash
node run-flow.mjs flows/AZ-110-01-009.yaml --live --login \
  --login-url http://<実機>/mhkcmwa11/dummy.html \
  --start-url "http://<実機>/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00"
```

- `--login` 打开浏览器等你手动登录，登录完回车。
- 先加 `--demo` 看每一步落点，确认后再正式跑。
- 失败会截图并记录 URL / 画面 / 目标 / 候选。

### 3.3 抓实机 DOM（人操作，工具记录）

```bash
node automation/node-runner/capture.mjs \
  --url "http://<実機>/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00" \
  --out capture-20261028 --edge
```

- Edge 打开后**手动走完整本**：每换一个画面、每开一个弹窗都会自动存一份。
- 同一画面会被存很多次（每次回帖）。这是原始证据，不用管。
- 结束后 Ctrl+C，得到 `capture-YYYYMMDD/index.json` + `pages/*.html`。

### 3.4 把 capture 变成能贴给 AI 的包（新增）

聊天窗口贴不了 zip，也贴不了十几个 HTML，所以抓完先做包：

```bash
node automation/node-runner/make-pack.mjs --capture capture-20261028
```

产出 `capture-20261028/pack/`：

| 文件 | 内容 |
|---|---|
| `00-INDEX.md` | 画面清单 + 每个画面的 **手顺措辞 → 控件 id**、按钮、表格（先贴这个） |
| `01-screens.md` … | 清洗后的 HTML（去 script/style/隐藏域），每块 ≤3 万字符 |
| `routes.md` | 这次实机实际走过的 **URL → 画面名**；`!! NOT IN ui-screens.json` 的要补进去 |
| `manifest.json` | 机器可读索引 |

索引里这几节是「AI 会不会写错原语」的关键：

| 节 | 含义 |
|---|---|
| `LABELS (from HTML — authoritative)` | 标签 → 控件类型 + id/name，**选项列出下拉的全部文字**。`→ checkbox` 的栏只能写 true/false |
| `TABLE: 1行 = 1件` | 这张表的列名顺序、`NAME[n] FAMILIES`（每行各一个的控件族 + 选项）。**行内控件必须用 chooseRow + anchor**，不是 select/check |
| `UNLABELED LISTS` | 没有可见标签的列表框（如 AMA13 的 `field_list.selected`）。手顺说「选择」时指的就是这里 |
| `WINDOW: 子ウィンドウ（popup）` | 这个画面是弹窗，其中步骤必须带 `popup: true` |

规则：**一个画面只取最完整的一次快照**；同一画面按 URL/画面名合并。
如果某个画面显示 `!! ui-screens.json にこの名前が無い`，先补 `ui-screens.json` 的
`routes`（用 `routes.md` 里的 path），否则离线校验会挑错快照。

### 3.4.1 准备给网页 AI（Copilot 等）的材料包

网页 AI 不能读本地文件、不能开 zip、不能跑我们的工具。所以先把要贴的东西打成一个
**纯文本文件夹**（全部 `.txt`，任何上传框都收）：

```bash
node automation/node-runner/make-brief.mjs --case AZ-110-01-009 \
  --capture capture-AZ-110-01-009/az-110-01-009
```

产出 `brief/<case>/`：

| 文件 | 上传/粘贴 | 内容 |
|---|---|---|
| `README.txt` | 不用上传 | 给人看的步骤 |
| `00-RULES.txt` | 上传 | 语言规范全文 |
| `01-HAND.txt` | 上传 | 手顺行 + 别紙值/期望（自动从 v2 数据导出） |
| `02-INDEX.txt` | 上传 | 画面清单：措辞 → 控件类型 + id、下拉选项、行内控件族、弹窗标记 |
| `03-SCREENS-NN.txt` | 上传 | 清洗后的实机 HTML，每块 ≤3 万字符 |
| `04-ROUTES.txt` | 上传 | 实机走过的 URL → 画面名 |
| `05-PROMPT.txt` | **粘贴到对话框** | 让 AI 输出 flow + control-patch 的指令 |

`brief/` 里是实机 HTML 的副本，已在 `.gitignore`，**绝不提交**。

### 3.5 用真实 DOM 校验流程里的每个 selector

```bash
node automation/node-runner/check-patch.mjs \
  --flow <flow.yaml> --capture capture-20261028
```

每个 selector 必须在真实页面里**恰好命中 1 个可见元素**。判读：

| 标记 | 含义 | 要做什么 |
|---|---|---|
| `OK (1/1)` | 命中唯一且可见 | 通过 |
| `FAIL` | 0 个 / 多个 | 改 selector 或加行锚点 |
| `ANCHOR` | 模板形状对，但手顺的锚点值不在这份 capture 的数据里 | 用 capture 自己的行值再验一次，或真机上验 |
| `PENDING` | 运行期才能解析（如 `<select>` 结果列表） | 记着，不是通过 |
| `NO-CAPTURE` | 这份 capture 里没有该画面 | 补抓 |

`ANCHOR` 不是猜：工具已经证明「控件本身存在」，只差「这一行在这份数据里」。
**不要**为了变绿把锚点改成一个看起来像的值。

### 3.6 缺控件：粘贴真实元素 → 生成补丁

```bash
node automation/node-runner/add-control.mjs \
  --capture capture-20261028 --screen 募集人検索画面 \
  --label 選択欄ラジオボタン \
  --html '<input type="radio" name="selectNo" value="0">' \
  --anchor 3028004586 \
  --out flows/patches/AZ-110-01-009.control.yaml
```

`--label` 是**手顺里的措辞**，必填。`--capture` 也可以直接指向 `logs/<case>-flow/`：
运行失败时 `run-flow` 会把当时的真机页面存成 `NNN_rXX_FAIL.html`（文件头带 `<!-- rpa-url: … -->`），
不用重新抓就能补控件。完整修复流程见 [23-REAL-MACHINE-REPAIR.md](23-REAL-MACHINE-REPAIR.md)。

- 1 个命中 → 写固定 `selector`；多个命中且给了 `--anchor` → 验证
  `tr:has(td:text-is("{value}")) …` 后写**模板**；0 个命中 → 直接报错。
- 校验通过后加 `--apply` 才写进 `ui-rowfields.json`（会自动备份到 `flows/.backup/`）。

手工另存的一堆 `.html` 也可以当 capture 用（不需要 `index.json`），
`check-patch --capture <那个目录>` 直接能校验。

### 3.7 Studio（看画面、确认绑定、直接改 YAML）

```bash
node automation/node-runner/studio/server.mjs 10200   # → http://127.0.0.1:10200
```

预览的是 **mock 画面**，不是真机。215 条 `needs-human` 绑定在这里逐条点选确认。
**Studio 不产生新真值**：左栏=文件、中间= `steps:`、右栏四个页签 = `steps` / `values` /
`bindings.yaml` / 顶层字段。每一栏和运行期字段的对照见 [22-STUDIO-FIELDS.md](22-STUDIO-FIELDS.md) §2–§4。

三件关于改流程的事：

| 想做的 | 怎么做 | 注意 |
|---|---|---|
| 调换步骤顺序 | 在步骤列表里**拖动**整行到目标位置 | 拖的是 `steps` 数组顺序，`row:` 是手顺行号，不跟着变。要移动「一块」就把这几行一起拖 |
| 新步骤不要排在最后 | 先拖到目标位置再填内容，或添加后立刻拖 | 新步骤默认追加到末尾（`row` = 上一行 +1，要手改） |
| 改 YAML 原文（含注释） | 顶部「YAML」按钮 → 直接编辑 → 「写入磁盘」或 Ctrl+S | 见下 |
| 加一步 | 左边窄条 palette 就是 **17 个原语**，点一下追加到末尾，再拖到位置 | 没有第 18 个；`branch` 已从 palette 移除（运行期不认识） |

**「YAML」视图**是唯一一条**不重排、不丢注释**的写盘路径：

- 步骤列表的「保存」是把内存里的模型重新序列化成 YAML（手写注释被替换，文件头会写明）；
  YAML 视图是**把 textarea 的字节原样写回**，注释、空行、引号、字段顺序全部保留。
- 写盘前解析一次。语法错 / 顶层不是映射 / `steps:` 不是列表 → **不写盘**，底栏用红字给出**行号 + yaml 的原因**。
- 内容与磁盘一致时不写盘，也不产生备份。
- 每次真正写盘前把原文件复制到 `flows/.backup/<名>.<时间戳>.yaml`（已 gitignore）。
- 文件原本是 CRLF 就写回 CRLF，浏览器 textarea 的 LF 不会把整个文件变成全行 diff。
- 打开时若有未保存的列表修改，会先问「先保存列表再打开原文？」；YAML 视图开着时右侧属性面板**锁住**
  （同一文件不能有两个写手：列表保存会把原文重新序列化，覆盖你的编辑）。
- 关掉视图后，步骤列表用刚写盘的模型重画；`Ctrl+Enter` 检查、`▶ 运行` 跑的都是**磁盘上的版本**，
  原文有未写盘的修改时会先提醒。

### 3.8 重新生成 / 更新文档

```bash
python tools/build_controls.py     # HTML → 控件库
python tools/build_bindings.py     # 手顺措辞 → 绑定表
python tools/generate_books.py     # 生成缺失的本（已有文件默认保留；--force 覆盖）
python tools/report.py --check --write docs/rpa/14-REPORT.md
python tools/build_pages.py --out .pages-out
```

`generate_books.py` 的两个开关（只影响"生成草稿"，不影响任何已存在的本）：

| 开关 | 作用 |
|---|---|
| `--cases <文件>` | 只生成清单里的本（每行一个本番号，`#` 开头的行跳过）。状态文件会合并回全量，不会缩成清单的条数 |
| `--partial` | 某一行实在表达不了时**不再中断整本**，而是把那一行留成 `do: manual` + `note: 【未自動化】<原因>`，其余照常生成；文件头写 `# DRAFT:` 和未自動化行数 |

```bash
python tools/generate_books.py --partial --cases automation/tasks/assigned_20261023.txt
grep -l "^# DRAFT:" flows/books/*.yaml | wc -l      # 有多少本草稿
grep -h "【未自動化】" flows/books/*.yaml | sort | uniq -c | sort -rn   # 卡在哪、为什么
```

草稿的意思是：**行覆盖是完整的，值是真的，只有标记【未自動化】的那几行要人补**。
生成器自己在下面四种情况下会写 manual 而不是瞎猜：

1. 结果表 No. リンク所在画面没在 `ui-rowfields.json` 登记 `結果行のNo.`（先用 `add-control` 补）；
2. 目标控件是行内控件（`ui-rowfields.json` 里 `rowByText` 一类），而手顺/別紙没写"哪一行"的值；
3. 绑定还是 `needs-human` / `explicit`，或別紙那一块没解析出来；
4. 手顺的 `「....」（保険種類欄の横）` 这类同标签多控件：会拆成 `{label, qualifier}`，交给
   `ui-rowfields.json` 的 `qualifiedButtons` 认；认不出来才 manual。

## 4. 外部 AI 生成流程（完整规程见 18-EXTERNAL-AI.md）

```bash
node automation/node-runner/make-brief.mjs --case <本> --capture <capture目录>   # ① 打材料包
# ② 把 brief/<本>/ 里的文件上传到 Copilot，粘贴 05-PROMPT.txt
# ③ 把产出存成 flows/tests/<本>.ai.yaml（+ flows/patches/<本>.control.yaml）
node automation/node-runner/check-flow.mjs flows/tests/<本>.ai.yaml
node automation/node-runner/check-patch.mjs --flow flows/tests/<本>.ai.yaml --capture <capture目录>
# ④ 有错把错误原文粘回同一个对话，只改出错的行；通过后 --demo 看一遍
```

## 5. 出错先看哪（R0）

1. 先跑 `check-flow`，读 **行号 + 错误原文**；错误表在 [16-LANGUAGE.md](16-LANGUAGE.md) 第 7 节。
2. 标签找不到：`check-patch` 看该画面有没有这个控件；没有就 `add-control`。
3. 画面不对：看 `ui-screens.json` 的 `routes` 是否覆盖真实 URL（抓到的 URL 就是证据）。
4. 运行期错行：加 `target.anchor`；确实无锚点（如刚登记的空行）才用本别覆盖钉死行号，并写 `reason`。
5. 真机上某一步找不到控件：按 [23-REAL-MACHINE-REPAIR.md](23-REAL-MACHINE-REPAIR.md) 的对照表，用失败时存下的 `logs/<case>-flow/NNN_rXX_FAIL.html` 补控件，不需要重新抓、不需要 Python。
6. 还不明白：按 [10-DEBUG-BY-CODE.md](10-DEBUG-BY-CODE.md) 的要求，先回答「现在实际结构是什么（文件+行号）」，再动手。

## 6. 红线（任何用法都不例外）

- 不猜 selector；查不到就报错 + 行号。
- 不用 force/enable 绕过 disabled。
- 不固定 sleep，只等条件。
- 不改断言来变绿；不手改执行结果。
- mock 绿不算成功；`PENDING` / `ANCHOR` / `NO-CAPTURE` 都不是通过。
- 实机页面、截图、capture 不进公开仓库。
