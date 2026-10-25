# 式样书优先的环境复原与审查流程

> 目的：先证明 mock 符合式样书，再开始一本本测试。
> 不是“跑到绿”，而是“先建立可审查的环境基线”。

## 0. 原则

1. **式样书是唯一业务真值源**。block、mock、params 都不能反过来定义业务。
2. **环境先冻结，再审查**。审查期间不改 mock，避免“改到审查通过”。
3. **审查者独立**。审查者先只看式样书写出预期，再看 mock；不能先看 block 实现。
4. **前端能复原前端，后端不能假装**。batch / APログ / DB / メール / 外部系统必须显式人工或契约模拟。

## 1. 正确顺序

```text
450 本式样书
  ↓
① 规格模型（画面 / 字段 / 按钮 / 迁移 / 校验 / 主档）
  ↓
② 从模型生成或修复 mock
  ↓
③ 独立符合性审查（式样书 vs mock 行为）
  ↓
④ 环境冻结 / 版本化
  ↓
⑤ 从式样书生成测试 block
  ↓
⑥ 在冻结环境上跑 450 本
  ↓
⑦ 产出 evidence / 人工清单
```

当前项目是反过来的：

```text
失败本 → 补 mock → 再跑 → 绿了算通过
```

这会产生循环论证：block 从手顺来，mock 从 block 来，最后 block 在 mock 上通过。

## 2. ① 规格模型

每个画面一个文件，建议：

```text
spec-model/
  screens/
    AMA03.json
    AMA04.json
    ...
  transitions.json
  validations.json
  master-data.json
  provenance.json
```

画面模型最小字段：

```json
{
  "screenId": "AMA03",
  "name": "不備内容入力画面-新規",
  "fields": [
    {"name": "policy_number", "label": "証券番号", "type": "text", "required": true}
  ],
  "buttons": [
    {"code": "1A", "label": "更新", "transition": "AMA04"}
  ],
  "validations": [
    {"when": {"large_item": "Z"}, "require": {"input_type": ["5", "7"]}, "message": "..."}
  ],
  "source": [{"caseId": "AZ-110-01-009", "sheet": "操作内容", "row": 16}]
}
```

要求：

- 每条字段/迁移/校验都有出处。
- 冲突不要合并；保留 `conflicts` 列表。
- 区分“画面观察”与“后端结果”。

## 3. ② 生成 / 修复 mock

- 优先从模型生成，不再手写补丁。
- 主档数据必须来自式样书或明确标注 `synthetic`。
- 不允许为了单个测试本增加只对该本有效的选项/字段。
- 后端副作用用契约桩表示，明确 `manual` / `stub` / `simulated`。

## 4. ③ 独立符合性审查

审查者只看式样书，先写“预期行为”，再操作 mock。

每个画面输出：

```text
screen: AMA03
expected fields: ...
expected buttons: ...
expected transitions: ...
expected validations: ...
observed: ...
diff: ...
verdict: pass / fail / manual
```

审查必须包含：

- 正向：合法输入能迁移。
- 反向：非法输入被拒绝，消息正确。
- 边界：空值、长度、上下限、重复。
- 主档：选项存在且值正确。
- 副作用：哪些是 mock 不能证明的，必须人工。

审查期间：

- mock 冻结，不改代码。
- 审查者不看 block-selectors，避免被实现带偏。
- 发现差异先记录，不现场修。

## 5. ④ 环境冻结

审查通过后打基线：

```text
mock-baseline-v1
spec-model-v1
conformance-report-v1
```

后续测试只针对这个基线。  
任何 mock 修改都必须重新跑对应画面的 conformance。

## 6. ⑤ 测试 block 生成

- block 从式样书 + 模型生成，不从 mock DOM 反推。
- 参数从别纸生成，`auto.json` 只留技术默认。
- mock 不能验证的步骤显式 `manual` 或 `live-assert`，不允许用别的画面冒充。

## 7. ⑥ 跑 450 本

验收不只看 pass：

```text
flow pass
+ evidence exact
+ params match
+ no pure-proxy block
+ no unexplained mock-only
+ manual steps = 手顺人工行
```

## 8. ⑦ Evidence

- 每个 画面HC 行：目标画面 URL + 截图。
- 每个 manual 行：人工确认项，不产假截图。
- 每个 mock 代替断言：真机 `--live` 执行，或明确人工。
- 证据目录按 case/row 命名，能追溯到式样书行。

## 9. 当前项目怎么迁移

1. 冻结现有 mock，不再按失败本补。
2. 从 450 本抽规格模型（42 个画面名 / 65 个 HTML / 3322 flow 行）。
3. 和现有 mock 做 diff：
   - mock 有、式样书没有
   - 式样书有、mock 没有
   - 规则不同
4. 只重建差异大的画面。
5. 用现有 450 本做回归，不用现有 block 当实现来源。
6. 达成基线后，再恢复一本本测试。

## 10. 完成标准

```text
每个 flow 行有模型映射
每个 check 行有 mock 规则或 manual 标记
纯代理 block = 0
mock 主档可追溯
4 个规则冲突有结论
审查报告签字
```

在此之前，446/450 只能叫“夹具可运行”，不能叫“环境符合”。
