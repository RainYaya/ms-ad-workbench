# 验收手册（公司电脑）

这个包是把 `feat/rpa-flow` 上当前的四层真值 + 内核 + Studio 打成一个可离线运行的目录。
**包里的数字都是 2026-10-29 实测的**；下面每条验收都写了"应该看到什么"。
对不上就是有问题，别改断言，把输出发回来。
（本手册对应 `pack-2026-10-29` 这个快照。仓库里的 `flows/books/` 之后又加入了全量草稿本，
重新打出来的包里条数会更多——以本文档对应 zip 里 `PACKAGE-MANIFEST.json` 为准。）

所有命令都在**包根目录**执行（`ms-ad-rpa-pack-2026-10-29-books`）。
如果 `node` 不在 PATH，把便携版 `node.exe` 放到包根目录，cmd 会优先找当前目录。

---

## 0. 包里有什么 / 没有什么

有：

```
automation/node-runner/   执行器：flow-loader / check-flow / check-patch / run-flow / mock-server /
                          capture / make-brief / make-pack / add-control / dom-check / studio
automation/node-runner/mock-src/   65 个 mock 画面（Studio 预览和 mock 跑都用它）
automation/node-runner/node_modules/   playwright-core + js-yaml（不用 npm install）
flows/                    手写本 8 + flows/books/ 1365 本（1232 草稿）+ tests/ + env/ + overrides/ + patches/
ui-controls.json          54 画面 / 1,998 控件（生成物）
ui-screens.json           手顺画面名 → 画面码 + 真机路由
ui-aliases.json           别紙措辞 → 画面措辞（显式同义词）
ui-rowfields.json         人工覆盖层（行内控件 / 组合控件）
flows/bindings.yaml       绑定表（auto / confirmed / needs-human / blocked）
guards.json               前置/校验（32 前置 / 569 校验）
reports/screen-chain.json check-flow 的画面链依据（100% 派生）
docs/rpa/ docs/adr/       设计、状态、报告、ADR（17-USAGE / 19-REAL-MACHINE / 20 / 21 / 22 是入口）
tools/                    重建脚本（Python，仅重建时需要）+ save-clip.ps1（剪贴板 → YAML）
v2/data/cases/            手顺/别紙源数据（仅重建、make-brief 需要）
```

没有：`logs/`（运行证据，自动生成）、`reference/webapps/`（客户源码快照，local-only，
打包默认不带；确需重建控件库时用 `--with-reference` 显式生成）、`capture-*/`（实机页面）。

边界：mock 绿只证明"操作链正确"，不证明"业务报文/DB 结果正确"。
L2（真机）目前仍是 0，靠第 4 节去补。

---

## 1. 解包 & 环境

```bat
cd ms-ad-rpa-pack-2026-10-29-books
node -v
```

- 期望 `v20` 或更高。没有就放一个便携版 `node.exe` 到包根目录。
- 需要 Edge（系统自带即可）。`run-flow` 和 `capture` 都固定用 `msedge`。
- Python 只有第 3 节需要；不装也不影响 1–2 节。

自检一下文件数（可选）：

```bat
node -e "const m=require('./PACKAGE-MANIFEST.json');console.log(m.files,m.bytes,m.git)"
```

---

## 2. 必做：三项验收

### 2.1 离线检查（10 秒）

```bat
node automation\node-runner\check-flow.mjs flows\AZ-110-01-009.yaml
node automation\node-runner\check-flow.mjs flows\books\AY-120-08-001.yaml
node automation\node-runner\check-flow.mjs flows\AZ-150-05-001.yaml
```

期望（只看这三行就够）：

```
case AZ-110-01-009
  steps 45  handRows 44  targets 51
  errors 0  warnings 0  pending 16

case AY-120-08-001
  steps 13  handRows 13  targets 8
  errors 0  warnings 0  pending 2

case AZ-150-05-001
  steps 3  handRows 3  targets 0
  errors 0  warnings 0  pending 0
```

`pending` 不是错误：是別紙里「初期値 / 表示内容」这类还没解析成具体字段的验证点。
**errors 必须是 0。** 有 error 就把整段输出发我。

也可以双击 `verify-check.cmd`，一次跑完三项。

### 2.2 Studio（5 分钟）

```bat
node automation\node-runner\studio\server.mjs 10200
```

浏览器打开 <http://127.0.0.1:10200>。要确认：

1. 左侧列表 **1373 条**；`books/` 开头的带「本」标签（**1365 本**，其中 1232 本是草稿：
   文件头有 `# DRAFT:`，标记【未自動化】的行要人补）。
2. 点 `AY-110-01-001` → **28 步**。先点右上角「画面」按钮打开预览（默认是关的）。
   点 `row 17` → 预览切到「取消計上申請登録画面」。
   把鼠标移到「登録」按钮：按钮出现绿框，底部一行显示 `登録  #regist`。
3. 左侧筛选框输入 `AZ-240` → 只剩 `AZ-240-01-001`（14 步）。
4. 顶部「绑定队列」→ 默认 `待确认`，列表 **211 条**，下面写
   「共 519 条规则；待确认 211 条」。
   点一条没有 selector 的规则（例如 `B0007「OK」ボタン押下`）→ 画面打开，
   顶部写「未确认（无 selector）」；这是对的，不是 bug。
5. 再点「步骤」回到编辑视图；`screenPane` 用 × 关掉。
6. 顶部「YAML」按钮 → 中间变成原文（245 行左右），**从第一行开始**显示，右侧属性面板变灰。
   在任意一行末尾加个空格 → 顶部显示「未写入」；按 Ctrl+S → 底栏写「已写入」并给出备份路径。
   再在 YAML 里故意删掉一行缩进 → Ctrl+S → 底栏红字给出**行号**并且**没有写盘**。
   点 × 关闭 YAML 视图，步骤列表回来。全程左侧列表 1373 条不变。
7. 拖动：把第 2 步拖到第 5 步的位置 → 顺序变化、「未保存」亮起。**不要保存**，
   按 F5 刷新确认回到磁盘顺序。

⚠ Studio 是**可写**的：**点击画面里的控件 = 把该控件设成这一步的 target**（会变成
「未保存」）；在「绑定」页点击控件 = 确认那条绑定并写回 `bindings.yaml`。
验收时**只用鼠标悬停看 selector，不要点控件、不要点保存/运行**。
如果不小心点了，别保存，刷新页面即可。

在线只读快照（Pages）会自动高亮当前步骤的 target 并显示 selector；
本地 Studio 是悬停时显示。两边行为不同是设计如此。

### 2.3 mock 实跑（1 分钟）

开两个窗口，都在包根目录：

```bat
:: 窗口 A
node automation\node-runner\mock-server.mjs 10117

:: 窗口 B
node automation\node-runner\run-flow.mjs flows\books\AY-120-08-001.yaml --base http://127.0.0.1:10117/AMB/dummy.html --headless --yes
```

期望最后一行：

```
done 8  pending 5  failed 0  skipped 0  evidence 3
```

然后看证据：

```
logs\AY-120-08-001-flow\
  run.json          结果、失败项、证据清单
  001_r15_画面HC.png
  003_r20_画面HC.png
  004_r23_画面HC.png
```

打开三张 PNG：应该是「照会・検索」「申請・確認更新」等真实 mock 画面，日文不乱码。

**要确认的不是"全绿"，而是这 8 done 的每一步都落在正确画面、值回读一致。**
5 个 pending 是「表示内容 1 / 2」未解析，如实记着，不算通过。

也可以双击 `mock-demo.cmd`（会自动开 mock 窗口再跑）。

---

## 3. 可选：从零重建四层真值（10 分钟）

只有想验证"数据 → 绑定 → 本"这条链时才做。需要 Python 3.10+：

```bat
pip install pyyaml          :: 公司机不能上网就跳过第 3 节，不影响第 2、4 节
python tools\build_controls.py
python tools\build_bindings.py
python tools\generate_books.py
python tools\report.py --check --write docs\rpa\14-REPORT.md
```

期望：

| 步骤 | 期望 |
|---|---|
| build_controls | `54 screens / 1998 controls`（写 `ui-controls.json`） |
| build_bindings | `519 rules`：auto 265 / needs-human 211 / blocked 36（其中 7 条已在 Studio 确认，重建会保留） |
| generate_books | `books 1386 written 1371 (new 0)`；kept 1363 / blocked 15 / hand-written 8 |
| report --check | `L0 1321 / 1373`（52 本有 error，全是画面链冲突/批处理首行，见 `14-REPORT.md`）；`L1` = 你实际跑过的本数（全新包是 0，跑过 2.3 就是 1）；`L2 0` |

`report.py --check` 会对 1373 个 flow 各跑一次 check-flow，约 8-12 分钟。
不带 `--check` 则没有 L0 结果（会显示 `0 / 1373`），那不代表失败，只是没检查。
如果 `node` 不在 PATH，把 `node.exe` 放包根目录也行，`report.py` 会优先找它。

注意：这一步会覆盖 `ui-controls.json`、`flows/bindings.yaml`、
`flows/books/*.yaml`、`flows/books-status.json`、`docs/rpa/14-REPORT.md`。
生成是确定性的，但时间戳会变。想留着原始包就先复制一份目录。

`python tools\report.py --check` 会再跑 130 次 check-flow，比较慢，可以跳过。

---

## 4. 真机抓 DOM（公司网络）

这一步不需要 Python，也不需要先跑第 3 节。**只抓，不改任何东西。**

```bat
node automation\node-runner\capture.mjs --url <真机入口URL> --out capture-20261029 --edge
```

会发生什么：

1. 打开一个新的 Edge 窗口（用独立配置，不碰你平时的浏览器）。
2. **你手动登录**，然后按手顺走一遍：每个画面停 1.5 秒再点下一步。
3. 每次页面跳转 / 弹窗 / 输入停下来，自动保存：
   ```
   capture-20261029\
     index.json          每页的 url / title / charset / 控件数 / 弹窗标记
     pages\001_<画面名>.html    完整 DOM
     pages\001_<画面名>.json    id / name / label→id / 按钮 / 表格结构 / body 文本
     pages\001_<画面名>.png     整屏截图
   ```
4. 走完按 **Ctrl+C**，会打印 `saved N pages` 并写最终 `index.json`。

抓的时候注意：

- 先走最普通的一条：菜单 → 照会/検索 → 输入 → 検索 → 一览 → No. 链接。
- 有弹窗（担当者検索、送信先选择）也要点开，popup 会单独保存。
- 遇到「別紙参照」的页面不用管，抓 DOM 就够。
- 别在抓取期间改 SUT 的数据（不要真的提交）；只走到能看见目标控件为止。
- 如果 URL 需要 VPN / 证书例外，先手动确认能打开。

**回传**：把整个 `capture-20261029` 文件夹压成 zip 发回来。里面是公司画面，
只在我俩之间传；我拿它做三件事：

1. 对齐 `ui-controls.json` 的 selector（真机 id/name 与 mock 不一致的地方）。
2. 确认 `charset`（预期 `Shift_JIS`）、弹窗形状、行内控件的 name 规律。
3. 把 218 条 needs-human 里的高价值项标出候选，再交给你确认。

---

## 5. 回传清单（最短）

发我这些就够：

1. `verify-check.cmd` 的完整输出（或截图）。
2. mock 跑完的 `logs\AY-120-08-001-flow\run.json`。
3. Studio 左侧条数、绑定队列右下角数字的截图（1373 / 211）。
4. `capture-20261029.zip`（真机抓取）。
5. 三个问题的回答：
   - `node -v` 和 Edge 版本？
   - 2.2 里 `#regist` 高亮到了吗？第 4 条点规则时提示是不是「未确认（无 selector）」？
   - 真机抓取的画面标题列表（`index.json` 里的 `title`）里，有没有和手顺叫法不一致的？

---

## 6. 常见问题

**`node` 不是内部或外部命令**
把便携版 `node.exe` 放到包根目录；或把它的目录加进 PATH。所有命令都在包根目录跑。

**mock-server 端口被占用**
换端口，`--base` 跟着换：
`node automation\node-runner\mock-server.mjs 10317` +
`--base http://127.0.0.1:10317/AMB/dummy.html`。

**run-flow 报 Edge 启动失败**
公司策略可能禁用了自动化。先在地址栏手动打开 Edge 确认能启动；
仍失败就把报错发我，不要改成 Chrome（selector 和 UA 会变）。

**Studio 画面显示"该画面未收录 HTML"**
说明这个步骤的画面是批处理/弹窗外/未映射，正常。Studio 里 `batch` 标签就是这类本。

**中文乱码**
包里都是 UTF-8；Windows 控制台如果是 936 代码页，`type` 文档会乱码，
用 VS Code / 记事本打开即可。mock 画面是 UTF-8，浏览器里不会乱。
