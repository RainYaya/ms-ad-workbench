# 在实机电脑上一条龙（不回家、不传 zip）

> 这一页只讲一件事：**全部操作都在有 SUT 的那台电脑上完成**。
> 家里那台只用来改代码；公司电脑通过 GitHub 拿到最新代码即可。
> 每一步都写了要敲的命令；没有隐藏步骤。
> **已经跑起来、只是某一步找不到控件 → 直接看 [23-REAL-MACHINE-REPAIR.md](23-REAL-MACHINE-REPAIR.md)。**

## 0. 一次性自检（只做一次）

在仓库根目录打开 PowerShell 或 cmd：

```bat
node -v
```

- 有版本号（v20 以上）→ 继续。
- 没有 → 先装 Node（LTS 版），装完重开窗口。

```bat
npm install
```

- 第一次要跑；以后除非 `package.json` 变了不用再跑。
- 跑不动（公司网络）→ 说明依赖不齐，`capture.mjs` / `run-flow.mjs` 都用不了，先解决网络/镜像。

再确认 Edge 已安装（Playwright 用 `channel: msedge`，不需要额外下浏览器）。

## 1. 拿最新代码 / 更新代码

- 能 `git`：`git pull`
- 不能 `git`：GitHub 仓库页 → **Code → Download ZIP** → 解压**覆盖**旧目录。
  `capture-*/`、`brief/` 不在 ZIP 里，覆盖不会丢。

## 2. 第一轮：在 SUT 上走一遍，抓页面

```bat
node automation\node-runner\capture.mjs --url "http://127.0.0.1:82/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00" --out capture-今天 --edge
```

浏览器打开后**手动走完整本手顺**（该点就点、该开弹窗就开）。每换一个画面自动存一份。
走完回到命令行按 `Ctrl+C`。

产物：`capture-今天\index.json` + `pages\*.html` + `.png`。**这东西只留在这台电脑，不提交。**

## 3. 一条命令，打好给 Copilot 的材料包

```bat
node automation\node-runner\make-brief.mjs --case AZ-110-01-009 --capture capture-今天
```

生成 `brief\AZ-110-01-009\`，全是 `.txt`：

```
README.txt          给你自己看的步骤（不用上传）
00-RULES.txt        语言规范
01-HAND.txt         手顺行 + 别紙值（自动导出）
02-INDEX.txt        措辞 → 控件 id / 按钮 / 表格样例
03-SCREENS-01..NN.txt  清洗后的实机 HTML
04-ROUTES.txt       走过的网址 → 画面名
05-PROMPT.txt       粘贴到对话框的指令
```

> 画面没抓全、或 `04-ROUTES.txt` 里出现 `!! NOT IN ui-screens.json`：
> 前者补抓；后者把那个 URL 补进 `ui-screens.json` 的 `routes`，再重跑第 3 步。

## 4. 在 Copilot 网页里

1. 上传 `00`、`01`、`02`、`03-*`、`04`（**逐个上传，不要打包**）。
2. 把 `05-PROMPT.txt` 全文粘进对话框，发送。
3. 它回两个 YAML 代码块（第二个可能没有）。

如果它说「太长 / 读不完」：
- 只传 `00` + `01` + `02`，先让它写 flow；
- 它问某个控件时，再把对应的 `03-SCREENS-NN.txt` 贴给它；
- 或者重新生成材料包时加 `--no-screens`。

## 5. 把 YAML 存回仓库（不用 Notepad）

**第一块（流程）**：在 Copilot 里点代码块的复制按钮，然后：

```bat
powershell -NoProfile -ExecutionPolicy Bypass -File tools\save-clip.ps1 -Path flows\tests\AZ-110-01-009.ai.yaml
```

**第二块（控件补丁，如果有）**：

```bat
powershell -NoProfile -ExecutionPolicy Bypass -File tools\save-clip.ps1 -Path flows\patches\AZ-110-01-009.control.yaml
```

脚本会去掉代码围栏、检查像不像 YAML、按 UTF-8 无 BOM 写入。
（不想用脚本就用 Notepad：另存为 → 文件名带引号 `"X.yaml"` → 编码选 UTF-8。）

检查第一行附近是不是 `case: AZ-110-01-009`——写错这个，后面的覆盖和日志都对不上。

## 6. 在这台电脑上验证（两条命令）

```bat
node automation\node-runner\check-flow.mjs flows\tests\AZ-110-01-009.ai.yaml
node automation\node-runner\check-patch.mjs --flow flows\tests\AZ-110-01-009.ai.yaml --capture capture-今天
```

- 第一条：行有没有漏、画面名对不对、标签能不能认、值有没有来源。`errors 0` 才过。
- 第二条：每个 selector 在真实页面是不是**恰好 1 个、可见**。

有错 → 把错误原文（带 `row 42` 的那种）粘回**同一个 Copilot 对话**，说「只改这些行」，
改完重复第 5、6 步。通常 1–2 轮。

判读：`ANCHOR` = 模板对、只是这份抓包的测试值和手顺不一样（不是错，也不是通过）；
`PENDING` = 运行期才能验。

## 7. 真机上跑（先演示，再正式）

```bat
node automation\node-runner\run-flow.mjs flows\tests\AZ-110-01-009.ai.yaml --live --demo --demo-delay 1200
```

- 浏览器里会显示每步横幅 + 目标红框；按 **Space** 暂停/继续。
- 看到某一步落点不对：记下行号，回第 5 步改那一行。
- 演示确认后去掉 `--demo` 就是正式跑；`--login` 用于需要人工登录的入口。

**改了一行不用重跑**（真机上最省时间的一条）：

- 某一步失败时，菜单里按 `r` → 重读 YAML，**在原地重做这一步**；按 `k` 会把浏览器留着，
  跑完停在结尾提示符，那里也可以 `r 23`（从 23 行开始）或 `r`（从下一行继续）。
- 再読込前会先跑 `check-flow`：编译不过直接拒绝，浏览器一步不动。
- 不重新登录、不回起点；前面已完成的步骤不重放。**但跳回走过的行，副作用会再做一次**
  （比如「更新」会再按一次），真机上自己判断能不能跳。
- 详见 [17-USAGE.md §3.2.1](17-USAGE.md) 与 [23-REAL-MACHINE-REPAIR.md](23-REAL-MACHINE-REPAIR.md) §5。

## 8. 安全与提交

- `capture-*/`、`brief/`、`实机dom/` 都已在 `.gitignore`，**不要提交**。
- 公开仓库里只放代码和文档，不放任何实机页面、截图、手顺数据。
- 要更新家里那台：只提交代码/文档，不要让实机内容混进 commit（`git status` 里不该出现它们）。

## 9. 一句话流程（贴在显示器上）

```
抓页面 → make-brief → 传 Copilot → 粘提示词 → 复制回来 → check-flow → check-patch → --demo 跑
```
