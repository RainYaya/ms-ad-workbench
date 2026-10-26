# AUDIT-PLAYBOOK — 每本手顺书的 AI 深度审计 SOP

> 2026-10-25 由 AZ-110-01-009 深审实战提炼。bikuri 原话：每一本都要这个质量。
> 核心：**质量不藏在 prompt 里，藏在数据管线里**。喂料自动汇总（dossier），机械检查自动预筛（dossier §8），AI 只做机器做不了的三件事：读手顺理解业务意图、参数↔別紙↔选项值的语义核对、亲眼看截图。

## 0. 为什么是这套流程（方法论，不许丢）

1. **assert 过 ≠ 真的对**。真实案例：mock 曾把検索結果行插在 </tbody> 外面，
   runner 靠 tr:has-text 点中表外孤儿行照样全绿。只有亲眼看截图 + 对照 mock 日志才能抓到。
2. **跑和审是两层**。run_all.mjs 负责跑（454 本已全绿），审计问的是"这个绿是真的吗"。
3. **证据有已知瑕疵**（rXX 表示/確認类截图可能拍早），审计员要会区分"执行错"和"截图时序"。
4. **裁定三态**：mock-done / live-pending / doubt。mock 全绿不改变"真机 verified 只数真机"。
5. **审计员不许改 execution-status.json**。降级/疑点写进 audit 文件，汇总后由 bikuri 拍板。

## 1. 单本审计流程（AI agent 照此执行）

输入：caseId（如 AZ-110-01-010）。

前置（一次性，全库共享）：
- 确认 mock-server 在跑且端口干净，有 mock-server 残留立即杀掉再起新的。
  **孤儿 mock = 旧路由表 = 全部假结果**（10-25 实录：10 个孤儿占了 10084-10096）。
- runner 已带 --trace 跑过该本（logs/<cid>/<cid>-trace.json 存在）。

单本步骤：
1. **读卷宗** logs/<cid>/<cid>-dossier.md（tools/audit_dossier.py 生成，9 节：
   手顺原文 / 別紙叶子 / 生效参数+来源 / 积木+selector / 运行结果 / 証跡索引 / KEY截图清单 / 机械预检 / 已知陷阱）。
2. **理解业务**：从 §1 手顺原文读出这本在测什么业务流（1-2 句），写下 intent。
3. **语义核对**（AI 的第一价值）：
   - §3 params vs §2 別紙：每个业务值（証券番号/種目/保険種類/明細番号/コード类）必须对上別紙原文；
     auto-fallback 的 key 要标注。
   - value↔label 映射：params 的 select value（如 largeItemValue=B）要与別紙 label（自賠責）对应，
     对照 mock-src 对应画面的 option 表。
   - 業務ルール：種目 Z→inputType 5/7、種目 0→9。命中则核 inputType。
4. **看运行结果**：§5 全部块 pass？skipped 列表是否= §4 中无 selector 的块（合理跳过）？
5. **看証跡**：§6 里 MISS/SOFT/MANUAL 的行是否都有合理解释（mock 无后端/人工步骤/已知时序）。
6. **亲眼看截图**（AI 的第二价值，不可省）：把 §7 列的每张 png 用 Read 工具看图，核对：
   - 输入画面：关键字段值与別紙一致；该空的空（popup 值在 popup 步骤填）。
   - popup/遷移画面：确实到达目标画面（对照 §4 每块的 assert 目标）。
   - 回写画面：popup 选择后父画面有反映（如保険種類欄出现 00 ： 自賠責）。
   - 终态画面：最后的块真的落到终态画面。
   - 占位值警报：画面出现 "1 1 1" 类占位行时，先查是静态模板默认值还是注入失败，
     以 mock 日志（POST 序列 + result row 注入记录）为准判断流程是否真的走通。
7. **裁定**：每块 mock-done / live-pending / doubt + 每本 verdict：
   - clean（全块吻合，仅已知瑕疵）
   - clean-with-notes（有疑点但可解释，写明）
   - suspicious（有无法解释的矛盾，列出）
8. **落盘**：写 logs/<cid>/<cid>-audit.md：
   intent / 参数核对结论 / 每块裁定 / 截图观察 / verdict / doubts[]。
   只新增文件，不改任何 JSON 状态文件，不动別的窗口的产出。

## 2. 批量组织

- **分组**：215 模板组（automation/templates.json）。同组手顺签名相同，只差参数。
- **批次**：A 类 29 本先行（logs/A-CASES.txt）→ 009-012 试点 → B 类按分类 →
  C 类（参数待修，预期有 doubt）→ D 类 4 本（预期冲突，只记录不修）。
- **并发**：4-6 个 agent 并行，每个 agent 一个分类或一组 caseId。
- **省 token 不省质量**：同组代表本做完整深审；组内其余本重点看"参数差异=別紙差异"+ 亲眼看 KEY 截图。

## 3. AI 审计员系统提示词（批量用，配 dossier 喂料）

你是結合試験自動化の監査者。批判的であれ。模擬環境（フロントエンドのみ、Javaバックエンドなし）で実行された結果を審査する。

入力: logs/<caseId>/<caseId>-dossier.md（9節）+ KEY截图（画像を見ること、テキストだけでは判定しない）。

やること:
1. 手順原文から業務意図を1-2文で言い表す
2. params vs 別紙: 各業務値が別紙の原文と一致するか（auto-fallback は注記）
3. select value ↔ label 対応（value=B は自賠責か？）を mock-src の option 表で確認
4. 全ブロックの pass/skip が妥当か
5. KEY截图を全て目視: 入力値/popup到達/親画面反映/終态。占位値(1 1 1)を見たら mock ログで注入確認
6. 各ブロックを mock-done / live-pending / doubt に裁定
7. pass 判定の前に必ず自問「この pass は何を欺いているか」、疑点を最低1つ挙げる

出力: logs/<caseId>/<caseId>-audit.md
- intent / params 対照(不一致のみ詳細) / ブロック裁定表 / 截图観察 / verdict(clean|clean-with-notes|suspicious) / doubts[]
- execution-status.json など状態ファイルは絶対に変更しない

## 4. 运维命令速查

- 孤儿 mock 检查/清理：PowerShell Get-CimInstance Win32_Process 过滤 mock-server → Stop-Process（10-25 实录：不清就全假）
- 起干净 mock：cd automation/node-runner; node mock-server.mjs 10097
- 带 trace 全量重跑：node tools/run_all.mjs --base http://127.0.0.1:10097/ --jobs 5 --timeout 150
- 单本卷宗：python -W ignore tools/audit_dossier.py AZ-110-01-010
- judge.mjs 可作第一道过滤，但其 evidence.status 字段 bug 未修前仅作参考

## 5. 汇总与升级路径

- 每批结束：verdict 分布统计写 logs/AUDIT-SUMMARY-<batch>.md。
- suspicious 与全部 doubt 汇成清单交 bikuri 拍板；批准后才改 execution-status.json
  （或新增 auditStatus 轴，不动三状态）。
- 审计上限自知：这套审计证明"自动化 vs 手顺 vs mock 三方吻合"，
  **永远不能证明真机行为**。mock 全绿 ≠ verified。真机验证仍是下一个独立战场。
