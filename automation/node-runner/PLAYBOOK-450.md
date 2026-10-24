# 450本全跑通作战手册（交接文档）

> 生成: 2026-10-24 · 目标: 我担当的 450 本全部在源码模拟环境跑通（mock-pass）
> 任何 AI 拿到此文档 + 仓库即可继续干活。读 WORKLOG-2026-10-24.md 了解已验证的模式。

## 大局（当前状态）

| 层 | 本数 | 含义 |
|---|---:|---|
| A 只差参数 | 30 | 块全部已 coded，生成 params 即可跑 |
| C 要铺新块 | 420 | 缺 1~9 块浏览器块（非浏览器段不算失败，见下） |

C 类按业务域: {"AZ主系统": 241, "BATCH批处理": 10, "AG代理店系": 35, "AY異例取扱": 134}

## 已验证的工作循环（照抄即可）

```
1. 从 run-plan.json 取该本缺的块 → blocks.json 查 pattern（事件序列）
2. 手顺行号 → screen-map.json / mock-src/<APP>/<VIEW>.html 找控件真名（grep，禁编造）
3. 缺控件 → 照 AMA04 样板 enrich（下拉选项/列表行/hidden 字段/popup URL）
4. 写 block-selectors-<域>.json（挂 cases 过滤）+ params/<category>.json
5. 起 mock-server（10090 被占就 10091+）→ node runner.mjs --case <id> 跑到 DONE
6. 常见坑: visibility_hidden 按钮用 force、headless 用 textContent、
   form 校验(種目Z→入力区分5/7等)挡提交、popup URL 空串、th:block 残片崩 JS
```

## 分工建议（多 AI 并行的切法）

| 战线 | 估计本数 | 文件前缀 | 说明 |
|---|---:|---|---|
| AZ 更新画面深水区 | ~180 | block-selectors-az-update* | 営業連携/代理店連携/完了/削除/メール通知先 等按钮段 |
| AY 異例取扱 | ~140 | block-selectors-ay-* | 申請依頼/承認/取消計上 + 担当者検索/送信先 popup |
| AZG200 一覧延伸 | ~40 | block-selectors-az200-* | CSV出力/完了登録(一覧侧)/選択チェック |
| 代理店系 AMC00 | ~60 | block-selectors-ag-* | AMC22/23/24 三视图 |
| A 类参数生成 | 30 | params/*.json | 纯参数活，从別紙 summaries 抄真值 |

## 交付物约定

- 每本跑通后 result.json 自动落 logs/<caseId>/（含 blocks 明细）
- 全量汇总: python 汇总脚本 → mock-results.json → execution-status.json 更新 coded
- 前端: build_blocks.py 重跑后三状态/进度条自动刷新
- 收尾必做: 路由回归 verify_routes.py + 无头浏览器自查
- 诚实铁律: 深层段没跑就在 note 写清楚，不许全本绿灯
- 新发现的前端校验规则记入 AZ-110-01-009.md 的业务规则段

## 优先级（按 ROI）

1. A 类 30 本参数化（零新块，最快见绿）
2. TOP 家族: 缺2块×20本(DDA3A833代理店+F9A1D656一時中断) / 缺3块×20本(AY検索系)
3. AZ 更新画面按钮段（COMMON-LOGS/UPDATE-DELETE 等 curated 块，覆盖面大）
4. 单例块(SGL)最后——每本独有，铺块收益=1本
