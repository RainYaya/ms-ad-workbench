# 执行器设计（run-flow.mjs）

> 2026-10-26 夜实现。这是"RPA 形态"里真正能跑的那一层。

## 一句话

吃一个 `flows/*.yaml`，驱动 Edge 跑完；**失败不关浏览器，停下来问人**。

## 为什么单独写，不改 runner.mjs

`runner.mjs` 有 510 行，混着登录、菜单扫描、证据收集、trace、blocks 逻辑。
在它上面改成 flow 驱动，风险高且容易把已有的 450 本执行能力弄坏。

所以：**新写一个，只支持 10 个动作**。老的留着跑旧积木做对照。

## 三个文件

```
flow-loader.mjs    流程 YAML → 可执行步骤（含 selector 解析）
run-flow.mjs       执行 + 交互
flows/*.yaml       数据
```

### flow-loader.mjs

职责：
1. 读 YAML
2. 把每个「日文标签」在两套字典里查（静态字段 + 行内字段）
3. 产出 `{row, screen, screenKey, do, targets[{label, selector, value}]}`
4. **编译期就把 `{变量}` 替换成真实值**（否则 selector 里留着 `{募集人ID}`，永远匹配不上）

### run-flow.mjs

职责：
1. 起 Edge（`channel:'msedge'`）
2. 按 steps 顺序执行
3. 失败时进交互
4. 每步截图 + 写 `run.json` / `run.html`

## 为什么"跨页面查找"

Playwright 里弹窗是**独立的 Page**。`page.locator()` 只能查到当前页。

一开始我按 `step.popup: true` 标记来切 page，结果 `row 20`（弹窗里的 OK）等了 15 秒超时——
因为弹窗还在加载，`count()` 采一次就是 0。

最后改成：**遍历所有打开的 page，每个都试，直到命中或超时**。

```js
async function findLocator(t, timeoutMs) {
  for (;;) {
    for (const pg of context.pages().reverse()) {   // 新的（弹窗）优先
      const loc = pg.locator(t.selector).first();
      if (await loc.count()) return { loc, page: pg };
    }
    if (Date.now() > deadline) throw ...;
    await sleep(200);   // ← 重试，不是只采一次
  }
}
```

**教训**：不要靠"我猜元素在哪个 page"——去问浏览器。

## 动作清单（10 个）

| do | 语义 | 特殊处理 |
|---|---|---|
| `click` | 点击 | |
| `fill` | 输入 | 跳过 readonly/disabled |
| `fillAll` | `use:[]` 批量填 | 按字段类型分派 |
| `select` | 下拉 | 先按 label，失败再按 value |
| `check` | 复选框 | true→check，false→uncheck |
| `clickRow` | 表内行点击 | 用值定位行 |
| `expect` | 断言 | mock 阶段只记录，不阻塞 |
| `expectRows` | 行数 | 有 `min` |
| `expectMessage` | 消息 | mock 无后端，留到真机 |
| `manual` | 人工 | 停下等 Enter |

## fill 的类型分派（今晚踩的坑）

```js
if (info.type === 'hidden')        → 直接 evaluate 赋值（不能 fill）
if (info.disabled || readonly)     → 跳过，记进 missing
if (tag === 'select')              → selectOption
if (type === 'checkbox' || radio)  → check/uncheck
else                               → fill
```

**为什么**：`fill()` 对 `type="hidden"` 会超时（元素不可见），对 readonly 会静默成功但没作用——
后者是最危险的，会造成假阳性。

## 交互协议

失败时：

```
X row 20 [click] 保険種類選択画面
  element not found: [name="ok"] (pages: AMA03.html)

  [Enter]retry [s]skip [v]manual value [k]keep browser [q]quit [a]stop all >
```

| 键 | 行为 |
|---|---|
| Enter | 重试这一步（人会先去界面上看一眼） |
| s | 跳过，继续下一步 |
| v | 输入「标签 + 值」，写进 values 后重试 |
| k | 保留浏览器打开，脚本退出（**人工接管**） |
| q | 中止 |
| a | 之后全部中止（不再问） |

`k` 是现场最需要的：出错时浏览器不关，人可以自己点。

## 命令行

```cmd
node run-flow.mjs flows/AZ-110-01-009.yaml --base http://127.0.0.1:10083
node run-flow.mjs flows/AZ-110-01-009.yaml --live --base https://真机/
node run-flow.mjs flows/AZ-110-01-009.yaml --headless --yes      :: 自动，不问
node run-flow.mjs flows/AZ-110-01-009.yaml --row 32               :: 从某行开始
node run-flow.mjs flows/AZ-110-01-009.yaml --slow 500             :: 每步停 500ms
```

`--yes` = 全自动（CI/批量）。**默认是交互的**——现场用这个。

## 产出

```
logs/<CASE>-flow/
  run.json     结构化结果（每步 ok/fail/skip + url + 截图名）
  run.html     人看的表格
  NNN_rXX.png  每步截图
```

## 当前实测

```
row 14 → 31  全部 OK（18 步）
row 32       失败：点「更新」后页面仍停在 AMA03
```

**row 32 不是执行器的问题**：mock 里点「登録」后没跳到更新画面，
说明 mock 的 POST 路由把请求吞了。旧 runner 用 `block-selectors` 里的
`goto` 硬跳转绕过了这个，新执行器不这么做。

→ 要么修 mock 路由，要么流程文件里加 `goto`。
**这是待决事项，不是 bug。**

## 已解决的关键问题（今晚）

| 问题 | 现象 | 根因 | 修法 |
|---|---|---|---|
| 种目没选中 | 保险种类按钮点了没反应 | 字典抓了 `hidden` 的 `selected_large_item_code`，没抓 `select[name=large_item_list.selected]` | 优先选非 hidden 控件 |
| hidden 全被当 input | 字典 kind 全错 | 用 `inner[:400]` 判断 type，读到的是兄弟控件 | 用**控件自己的** `group(0)` |
| `{募集人ID}` 没替换 | selector 字面带花括号 | 编译期没插值 | values 构造挪到步骤循环之前 |
| 弹窗元素找不到 | row 20 等 15 秒超时 | 只查当前 page，且只采一次 | 遍历所有 page + 重试 |
| `#selectInsuransuItem` 不存在 | 按钮点击超时 | 该按钮只有 `name` 没有 `id` | 字典区 id/name，生成 `[name=]` |
