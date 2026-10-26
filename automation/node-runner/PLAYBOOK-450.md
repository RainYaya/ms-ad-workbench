# 450本 源码模拟 + 真机分级作战手册

> 手作業/AI 実行の判定基準: `docs/MANUAL-DECISION.md`。

> 目标不是“450 全绿”，而是：能自动的自动、不能自动的显式人工、别纸参数可审计。
> 当前分级见 `logs/FEASIBILITY.md`，A 类清单见 `logs/A-CASES.txt`。

## 大局（当前状态）

| 层 | 本数 | 含义 |
|---|---:|---|
| mock flow pass | 446 | 源码模拟流程通过 |
| A 全自动 | 29 | 无人工、无代理 block、参数干净；**只有这些先上真机** |
| B 自动+人工/代理 | 369 | 浏览器流程可跑，但有人工步骤或代理 block |
| C 参数待修 | 48 | 8 本手顺内多值 + 40 本 auto-only 但引用业务参数 |
| D 阻塞 | 4 | 别纸 vs 业务校验冲突，故意不强行跑绿 |

**不要**把 446 mock pass 当成真机 pass。149 个 block 含代理步骤，其中 23 个是纯代理（没有真浏览器动作）。

单本诊断页面：`http://127.0.0.1:10092/v2/index.html#/automation`。列表看分类，点进去看 block 顺序、每个 step、人工项和 params。

公司 PC 现场用：`http://127.0.0.1:10092/v2/ops/index.html`。每本一页 A4，只有结论、下一步、人工清单、输入值、画面HC、判定栏。

注意：`mock回写/mock简化/mock无后端` 不是“手作業”，是“真机应自动断言”的 mock 替代项。真机加 `--live` 才会执行这些 assert；真机 URL 映射见 `docs/URL-MAPPING.md`（`/AMB/AMA01.html` → `/mhkcmwa11/AMA01?gamid=...`）。

## 已验证的工作循环（照抄即可）

```
1. 从 run-plan.json 取该本缺的块 → blocks.json 查 pattern（事件序列）
2. 手顺行号 → screen-map.json / mock-src/<APP>/<VIEW>.html 找控件真名（grep，禁编造）
3. 缺控件 → 照 AMA04 样板 enrich（下拉选项/列表行/hidden 字段/popup URL）
4. 写 block-selectors-<域>.json（挂 cases 过滤）+ params/<category>.json
5. 起 mock-server（10090 被占就 10091+）→ node runner.mjs --case <id> --base-url http://127.0.0.1:10090/ 跑到 DONE
6. 常见坑: visibility_hidden 按钮用 force、headless 用 textContent、
   form 校验(種目Z→入力区分5/7等)挡提交、popup URL 空串、th:block 残片崩 JS
7. 参数不放心就加 `--strict-params`：block 引用值只来自 auto.json 时直接退出 3
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

1. A 类 29 本真机先行（清单 `logs/A-CASES.txt`）
2. C 类 48 本参数收尾（`logs/PARAM-REVIEW.md`）：先处理 8 本手顺内多值
3. 23 个纯代理 block 逐个改成 manual / 补真验证（`logs/BLOCK-QUALITY.md`）
4. B 类按人工 checklist 执行，不能算全自动
