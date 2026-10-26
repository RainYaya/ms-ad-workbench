# AUDIT-SUMMARY — C 类前 24 本（AY-120-02/03/04 + AY-121-02/03）

- 审计日: 2026-10-25  审计员: AI (ZCode)  口径: 只看模拟环境（bikuri 拍板）。
- 清单: v2/data/feasibility.js class=C 按 ID 排序前 24 本。
- 组织: 7 个模板组，代表本深审 7 本（02-015 / 03-001 / 04-009 / 121-02-001 / 121-02-002 / 121-03-005 / 03-001 兼 03 组），
  组内 17 本核对「参数差异=別紙差异」+ 亲眼 2 张 KEY 截图。每本落盘 logs/<caseId>/<caseId>-audit.md（24/24）。
- 红线: 未改 execution-status.json / blocks.json / selector / params。

## verdict 一览（24 本全部 clean-with-notes，0 suspicious，0 clean）

| caseId | verdict | 消费 auto 参数 | 主要疑点 |
|---|---|---|---|
| AY-120-02-015 | clean-with-notes | customerName,sectionCode | D1 key≠別紙 |
| AY-120-02-016 | clean-with-notes | customerName,sectionCode | 同上（继承） |
| AY-120-02-017 | clean-with-notes | customerName,sectionCode | 同上（继承） |
| AY-120-02-018 | clean-with-notes | customerName,sectionCode | 同上（继承） |
| AY-120-03-001 | clean-with-notes | customerName,defectContent | D1 理由≠別紙「テスト」 |
| AY-120-03-002 | clean-with-notes | customerName,defectContent | 同上（继承） |
| AY-120-03-003 | clean-with-notes | customerName,defectContent | 同上（继承） |
| AY-120-03-004 | clean-with-notes | customerName,defectContent | 同上（继承） |
| AY-120-03-005 | clean-with-notes | customerName,defectContent | 同上（继承） |
| AY-120-03-006 | clean-with-notes | customerName,defectContent | 同上（继承） |
| AY-120-04-009 | clean-with-notes | customerName | D1 氏名≠「黒川　京子」 |
| AY-120-04-010 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-011 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-012 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-013 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-014 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-015 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-016 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-017 | clean-with-notes | customerName | 同上（继承） |
| AY-120-04-018 | clean-with-notes | customerName | 同上（继承） |
| AY-121-02-001 | clean-with-notes | customerName,defectContent | D1 理由≠別紙「テスト」 |
| AY-121-02-002 | clean-with-notes | customerName,defectContent | 同上（继承） |
| AY-121-03-005 | clean-with-notes | customerName | D1 氏名≠「黒川　京子」 |
| AY-121-03-006 | clean-with-notes | customerName | 同上（继承） |

## C 类核心发现（新・已验证）

1. **auto-fallback 消费面很窄，但消费到的全是错值（组级模式）**。34 个 auto 兜底参数里，§4 selector 真正消费的只有
   1-2 个：`customerName`（24/24 本都消费，实填 TEST）、`sectionCode`（02 组 4 本，实填 AHE61≠別紙 ABM62）、
   `defectContent`（03 组 6 本 + 121-02 组 2 本，实填「添付書類もれ」≠別紙「テスト」）。
   其余 31-33 个 key（policyNo=AZ11001、detailNo、inquiryId、insuranceLabel、itemCode、pointCheck、AY 検索积木的
   AY11001 等）为模板兜底噪音，这些本未消费——已知组级问题在本批 24 本**均不适用**，未重复误报。
2. **静態検索使错值必 pass（结构性风险）**：担当者検索 ANA10/送信先検索 ANA11 为静态注入（結果恒 1 件，hidden 真值
   部支店長/3028004586/ABM62、黒川　京子与別紙一致），不实现条件过滤。因此 key 填 TEST/AHE61 也必然命中。
   「検索条件命中」语义只能真机验证 → 全 24 本记 live-pending。
3. **defectContent 错值有截图实锤**（非推测）：03-001/03-002/121-02-001/121-02-002 最終態截图亲眼确认
   「添付書類もれ」真实落入承認理由欄（fill 生效、值≠別紙）。其余 03 组本为同模板静态残留推断。
4. **状態遷移类断言全部 live-pending**：承認済/不承認/承認待ち/異例管理番号生成/承認者・承認日更新均为后端变化，
   mock 画面静态占位「1」无法回显。这是 C 类「参数待修」之外的第二个共性缺口（mock 无后端，按口径不算 fail）。
5. BLK-AUTO-E6EAF3BB（承認→送信先 popup）在 mock 复用「承認依頼」按钮标签（NOTE 自认申請ステータス無し），
   04 组 10 本 + 121-03 组 2 本命中；前端导线成立，按钮↔状況语义=真机确认。
6. 03-001 的 #department_approve_reject（承認依頼／要再申請依頼理由）与 #section_approve_reject（承認／要再申請依頼理由）
   两 selector 与手順两段欄位的对应，在静态 mock 上无法做欄位级语义确认 → 注记 live-pending。
7. 121-02-001/002 与 120-03 组同构但対象データ不同（AY12102/0000000085-86、承認待ち→不承認 単段流）；
   121-03-005/006 与 120-04 组同构（AY12101/0000000071-72、承認流）。积木链复用正确，無跨組誤配。

## 与已知组级问题的核对结果
- AY 検索积木硬编码 AY11001：本批 24 本的検索积木（AYG202B 一覧）未消费 policyNo，硬编码未参与 → 不适用（已核对 mock-src）。
- AZ-111-03/05 消息断言缺失：不属本批（AZ 系）。
- BLK-AUTO-DDA3A833 inquiryId/policyNo：本批积木链无此块 → 不适用。
- planned 块混进 pass：本批 §5 全部 coded 块，无 planned → 未发现。
- pointCheck auto-fallback：本批消费参数中无 pointCheck → 不适用。
- AZG900 静态 T0/T007 模板：AY 系对应的是 AYG900/ANB00 静态画面系（占位「1」），已按已知瑕疵标注，不算 fail。

## 遗留（交 bikuri 拍板）
- 24 本全部建议 auditStatus=clean-with-notes（mock-done 块 + live-pending 项）。
- 修复建议（不在审计权限内）：① runner 参数按別紙注入（customerName=部支店長/黒川　京子 分步骤区分、
  sectionCode=ABM62、defectContent=テスト）；② ANA10/ANA11 検索实现条件过滤（或 mock-routes 注入検索条件校验）；
  ③ mock-routes ANA03/route15・route10 指向 ANA04（dossier NOTE 既有指摘，本批 27C68433 块每本命中）。
