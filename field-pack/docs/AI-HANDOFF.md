# AI-HANDOFF — ms-ad 結合試験自動化システム 交接报告（给网页版 AI）

> 用法：bikuri 会在公司机（无法装任何工具，只能用网页 AI）把本文整份贴给你。
> 你读完就拥有这套系统的全部上下文。你的任务：帮 bikuri 修 runner 的数据文件（JSON），输出**可直接粘贴的 JSON 片段**。

## 1. 这套系统是什么

結合試験（集成测试）自动化执行器。450 本手顺书（Excel 测试规程），每本是一串"操作+确认"步骤。
系统把它们拆成**积木（block）**复用，用 Node + Playwright 驱动系统自带 Edge 浏览器执行，逐步截图留证。

- 运行环境：Windows 公司机，不能装软件。只有 node.exe（绿色版）+ 本包文件 + 系统 Edge。
- 无 git、无构建、无服务进程。**全部逻辑都在 JSON 数据文件里，改完即生效。**

## 2. 执行一条命令时发生了什么

node runner.mjs --case AZ-110-01-009 --base-url http://127.0.0.1:10081/mhkcmwa11/dummy.html --live --headed --edge

runner 依次读取（全部相对 runner.mjs 所在目录）：
1. ../../automation/blocks/blocks.json → workflows["AZ-110-01-009"].blockDetails：本书由哪几块积木组成、顺序、覆盖手顺哪些行
2. ./block-selectors*.json（16 个文件按文件名排序合并，后读的优先）→ 每块积木的步骤定义（selector/值/断言）
3. ../../automation/cdp/params/*.json → 本书的参数值。优先级：generated.json ＞ 字母序分类文件 ＞ auto.json；
   第一个含该 case 的文件"拥有"具体值，后续文件只补 undefined/空串的键
4. ../../automation/blocks/case-evidence.json → 哪些手顺行需要画面截图（画面HC）
5. ../../automation/blocks/screen-rules.json → 証跡截图的 URL 匹配规则

然后启动 Edge（channel: msedge），按剧本逐步执行，截图 + 结果写进 ../../logs/<caseId>/。

## 3. 数据文件格式（你要修的就是这些）

### 3.1 block-selectors*.json（控件映射，改步骤改这里）

{
  "cases": ["AZ-110-01-009"],
  "BLK-AZ-INSURANCE-SELECT": {
    "screen": "AZG100+popup",
    "steps": [
      { "event": "click (保険種類欄の横)", "action": "click", "selector": "input[name=\"selectInsuransuItem\"]" },
      { "event": "ast 遷移", "action": "popup", "match": "insurance_item_select|popup.html" },
      { "event": "click 保険種類", "action": "selectOptionByLabel", "selector": "select[name=\"insurance_item_list.selected\"]", "label": "params.insuranceLabel", "in": "popup" },
      { "event": "click OK", "action": "click", "selector": "input[name=\"ok\"]", "in": "popup" }
    ]
  }
}

action 全集：goto(url) / click(selector, force?) / fill(selector, value, how?: select|selectByLabelPrefix) /
selectOptionByLabel(selector, label) / popup(match) / assert(assert: visible|text|value|rows, selector, equals?, contains?, min?) /
check(selector) / enable(selector) / wait(ms)。

修饰键："in": "popup"（在弹窗内操作）、"optional": true（失败只 WARN）、"force": true（跳过可见性检查点）、
"note"（说明文字，给人看）。value/label 里的 params.xxx 会被参数解析替换。

同名积木出现在多个文件时：**排后面的文件整体覆盖前面的**（不是按步骤合并）。

### 3.2 cdp/params/*.json（参数，改值改这里）

{
  "common": { "inputType": "2", "sectionCode": "AHE61" },
  "cases": {
    "AZ-110-01-009": { "policyNo": "AZ11001", "detailNo": "0000000009", "insuranceLabel": "00 ： 自賠責" }
  }
}

合并规则：对每个文件，生效值 = { ...common, ...cases[caseId] }；
第一个含该 case 的文件拥有其定义的所有键，后续文件只填现有值 undefined 或 "" 的键。auto.json 永远最后。

### 3.3 值的两种形态（改 select 必看）

- how: "select" → value 必须是 option 的 **value 属性**（例：種目 自賠責 = "B"）
- how: "selectOptionByLabel" → label 是**显示文字**（例：保険種類 = "00 ： 自賠責"，注意全角冒号两侧空格）
- how: "selectByLabelPrefix" → label 是显示文字的前缀

## 4. 修复请求协议（bikuri 会这样问你，你这样答）

bikuri 会贴给你：
(a) 失败本的 caseId 与报错（runner 的 console 输出或 node-result.json 的 error）
(b) 相关的 block-selectors*.json 内容（或其中该块的片段）
(c) 相关的 params 文件内容
(d) 有时还有真实页面的 HTML 片段（他手抄的按钮/输入框定义）

你输出（严格按此格式）：
1. **诊断**：一句话说明根因（selector 错 / 值错 / 缺步骤 / popup match 错 / 参数优先级被覆盖）
2. **修改方案**：指出改哪个文件、哪个键
3. **完整 JSON 片段**：给出**整块积木**或**整个 case 条目**的修改后完整 JSON（不要给 diff，bikuri 没法手工合 diff）
4. **验证命令**：让他改完跑哪条命令、看哪个文件确认

判定优先级（你排查时的思考顺序）：
1. params not found → 先修参数文件（3.2）
2. Timeout/popup match 失败 → 修 selector 或 match（3.1）；如果 bikuri 贴了真实 HTML，以真实 HTML 的 name/id 为准
3. assert 失败但流程走完了 → 修断言的文字/条件（真机消息与模拟环境不同是正常的）
4. "填的值不对"类 → 修 params，注意 3.3 的 value/label 形态
5. "少了一步"类 → 在该块 steps 数组插入步骤（先确认 selector 真实存在）

## 5. 重要背景知识（避免你修错方向）

- **业务真值 = 手顺书的別紙**（附表）。bikuri 会提供。不要凭常识编值。
- select 的 value↔label 对应：让 bikuri 从真机页面 F12 抄 option 列表。本包 mock-src 下的画面 HTML 是静态重建，可能与真机有差异——**真机 HTML 优先**。
- 步骤里 "batch/DB/日志/メール" 类操作**设计上就不自动化**（真机人工），runner 标 skipped 是正常的，不要试图补这些。
- 一本手顺 = 多块积木组合，同一块可能在一本书里重复出现；块与手顺行的对应在 blocks.json 的 blockDetails（fromRow/toRow），修块时不要破坏行覆盖。
- --live 标志下，模拟环境里被跳过的"真机断言"会真正执行——真机跑出的 fail 可能是模拟环境从来没测过的断言，属正常暴露。
- 改 JSON 前让 bikuri 先复制 .bak（现场无 git）。
- 已知系统性问题（2026-10-25 审计结论）：部分积木填错键（inquiryId 填进証券番号栏，约 32 本波及）、
  点検区分参数未落实、消息断言空真、insuranceLabel 与別紙漂移。如果 fail 症状与这些吻合，优先怀疑同类问题。

## 6. 输出示例

bikuri: "AZ-210-46-003 跑挂了，error: option prefix not found: 13：クルマの保険。这是保種 select 的 HTML：<select name=\"insurance_item_list.selected\"><option value=\"11A0\">11：クルマの保険・一般用</option>...</select>"

你答:
1. 诊断: selectOptionByLabel 的 label 前缀 "13：クルマの保険" 在真机 option 里不存在，真机用的是 11 番台。
2. 修改方案: 改 params 里该 case 的 insuranceLabel，改成与真机 option 文字一致。
3. JSON:
"AZ-210-46-003": { "insuranceLabel": "11：クルマの保険・一般用" }
4. 验证: node runner.mjs --case AZ-210-46-003 <base-url> --live --headed --edge
   跑完看 logs/AZ-210-46-003/ 的 06_r021*.png 確認保険種類欄回写。
