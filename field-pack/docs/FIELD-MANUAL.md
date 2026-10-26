# FIELD-MANUAL — 真机现场手册（拼积木版）

> 给 bikuri：今天带去公司机的那份包，就是按这本手册组织的。
> 核心认知：**整个系统就是拼积木**。跑一本 = 手顺(数据) × 积木组合(剧本) × 控件映射(selector) × 填值(参数)。
> 这四样全是数据文件，**改完不用编译、不用重启，直接重跑**。

## 0. 五分钟心智模型（链路）

你在公司机输入一条命令，runner 按下面四层数据干活：

1. automation/blocks/blocks.json → 这本书由哪几块积木组成（剧本）
2. automation/node-runner/block-selectors*.json → 每块积木按哪些按钮/填哪些框（控件映射）
3. automation/cdp/params/*.json → 每本书要填的值（参数）
4. automation/blocks/case-evidence.json → 哪些行要截图（証跡点）

然后 runner 开 Edge 按剧本逐步执行、每步截图，全部证据落进 logs/<caseId>/。

**修改任何一层 = 只改对应的 JSON，重跑即生效。** 没有构建、没有服务要重启。

## 1. 包里有什么（目录结构不能动！）

ms-ad-field-pack/
├─ READ-ME-FIRST.txt            ← 指回本手册
├─ node.exe                     ← 自己拷进来（v20+）
├─ automation/
│  ├─ node-runner/              ← 执行器（runner.mjs + block-selectors×16 + playwright-core）
│  │   ├─ run.cmd               ← 双击入口
│  │   └─ runner.mjs            ← 主执行器（一般不用动）
│  ├─ cdp/params/               ← ★参数（改值主要改这里）
│  ├─ blocks/                   ← ★剧本（blocks.json）+ 証跡点（case-evidence.json）+ 画面规则
│  └─ cdp/*.ps1                 ← Edge 启动辅助
├─ v2/                          ← 网页（离线看进度/诊断，双击 v2/index.html）
└─ docs/
   ├─ FIELD-MANUAL.md           ← 本手册
   └─ AI-HANDOFF.md             ← 贴给网页版 AI 的交接报告

**runner 用相对路径找剧本**（../../automation/blocks），所以这棵树的位置关系不能变。
logs/ 会自动生成在包根目录下，不用预建。

## 2. 怎么跑一本

cd automation\node-runner

:: 默认方式（无头、系统 Edge）——推荐先这样确认能跑
run.cmd AZ-110-01-009

:: 完整命令版（想亲眼看画面：--headed 必须配 --edge，因为 playwright-core 不带浏览器）
node runner.mjs --case AZ-110-01-009 --base-url http://127.0.0.1:10081/mhkcmwa11/dummy.html --live --headed --edge

参数速记：
- --case <ID> 必填
- --base-url <URL> 默认走 run.cmd 里写的地址；打真 SUT 换成真地址
- --live **打真 SUT 必加**（会执行 mock 里跳过的那些"真机断言"）
- --headed --edge 想看浏览器画面时两个一起加
- 首跑要**手动登录** SUT：runner 会等菜单画面出现（最长 120 秒），你在这窗口里登录就行

## 3. 跑完看什么

logs/<caseId>/ 里面：
- NN_*.png 按步骤顺序的截图（眼睛看这个最快）
- <caseId>-node-result.json 每块积木 pass/fail + 报错栈（机器结论）
- <caseId>-evidence.json 每个証跡点的截图映射 + 页面文本

最后打印 DONE = 全部块通过；PARTIAL/FAIL = 有问题，先看 node-result.json 的 error 字段。

## 4. 常见修复三件事（学会这三件，80% 的问题自己搞定）

### 4.1 改参数（填的值不对）

参数文件在 automation/cdp/params/，优先级（runner 实际取值顺序）：

generated.json ＞ 按字母序的分类文件（AMC00 / AY-110-01 / AZ-110-01 …） ＞ auto.json（兜底）

规则：**第一个含有该 case 的文件"拥有"具体值，后面的文件只补没定义的键**。
所以想给某本书改值：改它所在分类的文件（如 AZ-110 系改 AZ-110-01.json）或直接改/加进 generated.json。

格式（每个文件都是 common（全组共用）+ cases（单本覆盖）两层）：

{
  "common": { "inputType": "2", "sectionCode": "AHE61" },
  "cases": {
    "AZ-110-01-009": {
      "policyNo": "AZ11001",
      "detailNo": "0000000009",
      "insuranceLabel": "00 ： 自賠責"
    }
  }
}

改前确认三件事：
1. **值从哪来**：別紙（手顺书附表）是唯一业务真值。改值前翻別紙。
2. **键有没有被消费**：在 block-selectors*.json 里搜 params.键名，没被引用的键改了也白改。
3. **select 的值是 value 还是 label**：how: "select" 填的是 option 的 **value**（如 B=自賠責）；
   how: "selectOptionByLabel" 填的是**显示文字**（如 "00 ： 自賠責"）。对照真机页面的 option 表。

改完直接重跑该本，看截图确认。

### 4.2 改/加积木步骤（点错按钮、少了一步）

控件映射在 automation/node-runner/block-selectors*.json（16 个文件，按**文件名字母序合并，越靠后读的越优先**——
block-selectors.json 最后读所以优先级最高；分类 slice 文件用 "cases": [...] 限定只对哪些书生效）。

单块积木的格式：

"BLK-AZ-INSURANCE-SELECT": {
  "screen": "AZG100+popup",
  "cases": ["AZ-110-01-009"],
  "steps": [
    { "event": "click (保険種類欄の横)", "action": "click", "selector": "input[name=\"selectInsuransuItem\"]" },
    { "event": "ast 遷移 保険種類選択", "action": "popup", "match": "insurance_item_select|popup.html" },
    { "event": "click 保険種類", "action": "selectOptionByLabel", "selector": "select[name=\"insurance_item_list.selected\"]", "label": "params.insuranceLabel", "in": "popup" },
    { "event": "click OK", "action": "click", "selector": "input[name=\"ok\"]", "in": "popup" }
  ]
}

cases 省略 = 对所有书生效。

action 速查：
- goto 打开页面（url）
- click 点按钮/链接（selector；点不到加 "force": true）
- fill 填输入框/下拉（selector + value，value 写 params.x 引用参数；下拉加 how: select 或 selectByLabelPrefix）
- selectOptionByLabel 按显示文字选下拉（selector + label）
- popup 断言弹窗出现（match：URL 片段，| 分隔多个候选）
- assert 断言（assert: visible / text / value / rows + selector + equals / contains / min）
- check / enable 勾选 / 激活按钮（selector）
- wait 等待（ms）

常用修饰："in": "popup"（在弹窗里操作）、"optional": true（失败只告警不算 fail）、"note"（给人看的说明）。

**加一步 = 在 steps 数组里插一条。** 改完重跑，先看 node-result.json 有没有把新步骤跑 pass，再看截图确认效果。

### 4.3 排查 fail（跑挂了）

按这个顺序看，2 分钟定位：

1. logs/<cid>/<cid>-node-result.json → 最外层 error 字段 + 哪个 block 不是 pass
2. 对照失败 block 的最后一个截图（编号最大的 NN_*.png）→ 看画面停在哪
3. 常见死法对照表：

| 症状 | 原因 | 处理 |
|---|---|---|
| Timeout waiting for selector | 页面上没找到目标 | 截图看实际画面 → 修 selector 或查前置步骤 |
| params not found | 该 case 在 params 里没有任何文件收录 | 往 generated.json 加该 case 的条目 |
| popup match 失败 | 弹窗 URL 和 match 对不上 | 手点一次记录真实 URL → 改 match |
| assert text 失败 | 断言文字和实际不一致 | 真机消息和 mock 不同是正常的，按实际消息改 contains |
| option prefix not found | 下拉里没有这个选项 | 真机选项和 mock 不同 → 改 label/value |
| 一上来就 FAIL | 残留进程/旧登录态 | 杀 node 进程重来 |

## 5. 真机特有注意事项

- 真 SUT 是 127.0.0.1:10081（localhost）→ 记得 --live
- 首跑手动登录；会话超时（60 分钟）要重登
- force: true 的按钮是真机上不可见/非活性被强点的——真机如果按钮本来该是活性的，去掉 force 试试
- dialog（确认框）runner 自动接受；如果手顺要求点"取消"分支，要人工处理
- 手顺里"バッチ実行/APログ/DB"类步骤**本来就不是自动化的**（真机人工），runner 会标 skipped，不是故障
- 跑完把整个 logs/ 拷回家回灌（或直接把 zip 发给家里的我）

## 6. 找 AI 帮忙的姿势（公司机只能用网页 AI）

1. 打开 docs/AI-HANDOFF.md，**整份复制**贴给网页 AI（它就懂这套系统了）
2. 然后贴出错现场：失败本所在分类的 selector 文件内容 + node-result.json 内容（文件小，直接全贴）
3. AI 会按交接报告里的"修复请求协议"给你输出改好的 JSON 片段 → 粘回文件 → 重跑

## 7. 红线（写了防止重演）

- **mock pass ≠ 真机 pass**。真机上每本都要按截图确认，别只看 DONE
- execution-status.json 是家里维护的三状态账本，现场不要手改
- 改任何 JSON 前先复制一份 .bak（现场没有 git）
- 手顺书（別紙）是唯一业务真值；改值之前先翻別紙
