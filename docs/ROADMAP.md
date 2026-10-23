# Roadmap / TODO

更新: 2026-10-23

## 0. 原则

1. **不读 450 本**。手顺已经解析成 450 case / 10,803 event；用 block coverage 找缺口。
2. **先垂直切片，再横向扩展**。先让 009 全流程真的跑通，再把 37/67 的公共前缀跑通，最后才批量映射。
3. **静态匹配不等于执行成功**。`block full` 只表示 event 匹配 block；runner/selector/SUT 状态必须单独显示。
4. **一个 block 必须有** `fromScreen` / `toScreen` / params / assertions，否则不能拼。
5. **source-only 不能直接执行**。外部 HTML 只能预填 selector；执行前必须 live 验证。

## 1. 当前 checkpoint

- Viewer、数据、路由、证据、任务、导出：已完成。
- 215 个精确手顺模板、55 个画面、152 个单例：已归类。
- 15 个 block：已注册。
- 静态组合：12 full / 438 partial；3,337 / 10,803 event（30.9%）。
- Runner：009–012 四个 case；009 实际卡在 block 4/5，010–012 mock 通过。
- 外部 webapp：已解压参考；source selector 已抽取；默认不进 git/Pages。
- 前端：新增「自動化」页面和 case drawer 执行命令复制。

## 2. 你需要做的事

| # | 你需要做什么 | 什么时候 | 产出 |
|---:|---|---|---|
| 1 | 保持 SUT 在 `127.0.0.1:10081` 可访问，并告诉我何时可用 | 下一次实际执行前 | SUT 可访问 |
| 2 | 在 009 block 4/5 跑一次诊断，把 `agent no-results diagnostic` 整行或 `#gyoumu_list` HTML 发我 | 下一次实际执行 | 判断是主数据、检索条件还是 selector |
| 3 | 确认/提供各 case 的登录方式；至少确认 MS-3n / MS-4n / MS-2n 的切换方式 | 009、010–012 实际执行前 | 可重复登录 |
| 4 | 审一下 009–012 与 37/67 的 pilot 组合是否符合业务语义（尤其 37 的 CL、67 的删除确认、009 的 `MAZG101W047`） | 本轮设计确认 | 认可/修正 block 边界 |
| 5 | 决定 reference webapps 是否允许进入 git/Pages；当前默认 local-only | 需要版本化参考源码时 | 公开/私有策略 |
| 6 | 遇到未知画面时，按我给的清单提供 F12 outerHTML 或截图 | 只在 source 不足时 | selector 证据 |
| 7 | 如果某个模板/场景更紧急，直接指定；否则按本路线优先级 | 每次阶段切换 | 优先级 |

你不需要手写代码、不需要读全部手顺、不需要手工整理 450 个参数。

## 3. 里程碑

### M0 — 控制面（已完成）

- [x] 数据标准化 / 路由验证 / viewer
- [x] 450 任务分组、215 模板、55 画面
- [x] block 注册表、composer、覆盖率
- [x] 前端「自動化」页面、case 执行命令
- [x] source selector 草案

**验收**：能在一个页面看到 full/partial、block 使用数、runner 状态；能从一个 case 复制命令。

### M1 — 009 垂直切片（下一步）

- [ ] **M1.1** 解决 009 block 4/5：募集人検索 0 行
  - Owner: 你（运行/发诊断）+ 我（分析）
  - 试：`AHE61/252H`、清空 agent code、仅 `field_agent_id=3028004586`
  - 证据：`agent no-results diagnostic` + 结果行 HTML
- [ ] **M1.2** 实现 009 block 6–13
  - Owner: 我
  - 依据：`automation/AZ-110-01-009.md` + `SOURCE-SELECTORS.md`
  - 画面：AZG101 / AZG900 / AZG902 / AZG906
- [ ] **M1.3** 实际跑 009，按 row 15/16/18/21/23/26/29/31/35/38/41/44/47/50/53/55/57 截图
  - Owner: 你执行 + 我驱动/分析
- [ ] **M1.4** 实际跑 010–012，逐 case 切换 MS-4n / MS-3n / MS-2n
- [ ] **M1.5** 更新 `AZ-110-01-009.md`、coverage、runner 状态

**验收**：009 全 44 event 实际通过；010–012 只换参数和登录用户；证据齐全；已知 blocker 清零或有明确记录。

### M2 — 通用 block executor + 37/67

- [ ] **M2.1** 冻结 selector schema：`source-only` / `mock` / `live-verified`，记录 screen、selector、source、lastVerified
- [ ] **M2.2** 把当前 hardcoded 009 runner 抽成 block executor：读取 `blocks.json` + params + selectors，执行 block 序列
- [ ] **M2.3** 每个 block 支持 pre/post screen、assertion、截图钩子、失败诊断
- [ ] **M2.4** 让 37/67 从公共前缀 + 两个 tail block 运行，不复制前缀代码
- [ ] **M2.5** 增加 runner registry，让 viewer 自动显示更多可执行 case

**验收**：009–012 不需要 case 专用 JS；37/67 共用两个前缀 block；失败时能指出 block/selector，而不是整本重跑。

### M3 — 高频 block 扩展

按当前未覆盖 event 排序：

- [ ] **M3.1** 照会・検索：input → 検索 → No → 申請・確認更新
- [ ] **M3.2** 送信先(写)選択：検索 → No → OK
- [ ] **M3.3** 更新画面：OK / display / status 公共块
- [ ] **M3.4** 項目名検索 → 选择 → 更新（AZG900）
- [ ] **M3.5** 照会内容編集 / 訂正内容確認（AZG902/AZG906）
- [ ] **M3.6** 重跑 `tools/build_blocks.py`，更新 coverage

**阶段目标（复核点，不是承诺）**：event 覆盖率 ≥ 50%，top 3 未覆盖家族各下降 ≥ 50%，并新增至少一个可执行 runner。

### M4 — 按模板扩展到 450

优先模板（按任务数）：

| Template | Tasks | Rows |
|---|---:|---:|
| `TPL-AZ-210-37-008` | 20 | 17 |
| `TPL-AY-120-09-004` | 20 | 11 |
| `TPL-AY-120-07-015` | 12 | 22 |
| `TPL-AZ-110-05-008` | 10 | 42 |
| `TPL-AZ-310-01-011` | 10 | 40 |

步骤：

- [ ] **M4.1** 每个模板选 1 个代表 case，验证 block 组合
- [ ] **M4.2** 补齐该模板的 params schema / 登录用户 / 别紙映射
- [ ] **M4.3** 组内批量跑；记录每 case 证据
- [ ] **M4.4** 单例模板保留 custom block，不强行复用
- [ ] **M4.5** 每个模板完成后更新 coverage / runner registry

**验收**：450 case 都有三选一状态：`automated` / `blocked` / `manual`，且没有未分类项。

### M5 — 运营与回归

- [ ] 数据重新导入时跑 `build_data.py` + `verify_routes.py` + `analyze_assigned.py` + `analyze_steps.py` + `build_blocks.py`
- [ ] SUT/画面变更时只更新 selector registry，不重写 case
- [ ] 每次跑批输出截图、JSON 结果、失败诊断
- [ ] 文档只保留：架构、数据模型、自动化、决策、路线图

## 4. 接下来 10 步（立即执行）

1. **[你]** 把 SUT 恢复到 `127.0.0.1:10081` 可访问。
2. **[你]** 跑 009 到 block 4/5，发诊断/HTML。
3. **[我]** 依据 source selector 先补 009 block 6–13 的 selector 草案。
4. **[我]** 实现 block 6–13 的 runner 代码，先 mock。
5. **[你+我]** 实际跑 009，修到全 44 event 通过。
6. **[我]** 用同一 runner 跑 010–012 的 mock；你按用户切换实际跑。
7. **[我]** 新增照会・検索 block family。
8. **[我]** 新增送信先(写)選択 block family。
9. **[我]** 重跑 coverage，更新前端「自動化」页。
10. **[你]** 看 coverage 的 top gaps，确认下一批模板优先级。

## 5. 阻塞与风险

| 风险 | 影响 | 处理 |
|---|---|---|
| 009 募集人検索 0 行 | 009–012 实际全流程无法完成 | 诊断/主数据/检索条件；不要改 selector 掩盖 |
| 登录用户需手动切换 | 010–012 可能用错权限 | runner 打印 expected login；每 case 手动确认 |
| source-only selector 未经 live 验证 | 执行可能点错/找不到 | 标状态；执行只用 live/mock |
| 37/67 尾部语义 | CL/删除确认可能理解错 | 你审 block 边界和断言 |
| reference webapps 公开风险 | 客户源码暴露 | 默认 local-only；确认后再入库 |
| 450 中 152 个单例 | 无法全部 block 复用 | 保留 custom block；不要强行合并 |

## 6. 完成定义（Definition of Done）

一个 case 完成，必须同时有：

- [ ] 实际执行结果（不是 block 匹配）
- [ ] 每个 verification row 的截图/证据
- [ ] OK/NG、defectNo、executedAt/By、verifiedAt/By
- [ ] 若 blocked，有具体失败点和诊断
- [ ] 对应 block/selector 的状态（live/mock/source）
- [ ] coverage 页面状态一致

一个 block 完成，必须有：

- [ ] `fromScreen` / `toScreen`
- [ ] params schema
- [ ] assertions
- [ ] live-verified selector（或明确的 mock 限制）
- [ ] 至少一个真实 case 使用
