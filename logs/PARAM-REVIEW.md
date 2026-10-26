# PARAM REVIEW（残作業）

> 这里只列真正需要人确认的参数。不要用 auto.json 的业务默认值强行变绿。

- C 类合计：48 本
- 手顺内多值：8 本
- auto-only 但 block 实际引用业务参数：40 本
- 其他：0 本

## 1. 手顺内多值（单一 params 无法表达）

别纸同一个项目在步骤中取不同值。要么把 block 改成按步骤取参数，要么人工确认哪一步用哪个值。

| case | 项目 | 别纸值 | 当前 params |
|---|---|---|---|
| `AY-130-02-001` | 課支社コード | AAAAA / ABM62 | ABM62 |
| `AZ-112-01-001` | 課支社コード | AHK81 / AHK02 / AAAAA / A3M61 / A3M02 | A3M02 |
| `AZ-120-03-001` | 明細番号 | 0000000001 / 0000000002 | 0000000002 |
| `AZ-120-03-002` | 明細番号 | 0000000001 / 0000000002 | 0000000002 |
| `AZ-160-01-004` | 明細番号 | 0000000007 / 0000000008 | 0000000008 |
| `AZ-160-01-005` | 明細番号 | 0000000009 / 0000000010 | 0000000010 |
| `AZ-160-01-006` | 明細番号 | 0000000001 / 0000000002 | 0000000002 |
| `AZ-160-01-007` | 明細番号 | 0000000003 / 0000000004 | 0000000004 |

## 2. auto-only 但 block 引用业务参数

这些本的 block 会读 `params.*`，但别纸「操作内容」没有可抽取的输入值，当前只能落到 auto.json。需要补别纸解析或人工给值。

| case | 引用 key | 当前 source |
|---|---|---|
| `AY-120-02-015` | customerName, sectionCode | auto.json |
| `AY-120-02-016` | customerName, sectionCode | auto.json |
| `AY-120-02-017` | customerName, sectionCode | auto.json |
| `AY-120-02-018` | customerName, sectionCode | auto.json |
| `AY-120-03-001` | customerName, defectContent | auto.json |
| `AY-120-03-002` | customerName, defectContent | auto.json |
| `AY-120-03-003` | customerName, defectContent | auto.json |
| `AY-120-03-004` | customerName, defectContent | auto.json |
| `AY-120-03-005` | customerName, defectContent | auto.json |
| `AY-120-03-006` | customerName, defectContent | auto.json |
| `AY-120-04-009` | customerName | auto.json |
| `AY-120-04-010` | customerName | auto.json |
| `AY-120-04-011` | customerName | auto.json |
| `AY-120-04-012` | customerName | auto.json |
| `AY-120-04-013` | customerName | auto.json |
| `AY-120-04-014` | customerName | auto.json |
| `AY-120-04-015` | customerName | auto.json |
| `AY-120-04-016` | customerName | auto.json |
| `AY-120-04-017` | customerName | auto.json |
| `AY-120-04-018` | customerName | auto.json |
| `AY-121-02-001` | customerName, defectContent | auto.json |
| `AY-121-02-002` | customerName, defectContent | auto.json |
| `AY-121-03-005` | customerName | auto.json |
| `AY-121-03-006` | customerName | auto.json |
| `AY-121-03-007` | customerName | auto.json |
| `AY-121-03-008` | customerName | auto.json |
| `AY-121-03-009` | customerName | auto.json |
| `AY-121-03-010` | customerName | auto.json |
| `AY-121-03-011` | customerName | auto.json |
| `AY-121-03-012` | customerName | auto.json |
| `AY-121-03-013` | customerName | auto.json |
| `AY-121-03-014` | customerName | auto.json |
| `AZ-150-04-002` | policyNo | auto.json |
| `AZ-150-13-001` | agentCode, policyNo, sectionCode | auto.json |
| `AZ-150-13-002` | agentCode, policyNo, sectionCode | auto.json |
| `AZ-150-13-003` | agentCode, policyNo | auto.json |
| `AZ-150-13-004` | agentCode, policyNo | auto.json |
| `AZ-200-03-002` | confirmer | auto.json |
| `AZ-200-03-004` | confirmer | auto.json |
| `AZ-220-01-003` | agentCode, policyNo, sectionCode | auto.json |

## 3. 其他 C 类

| case | 理由 |
|---|---|
