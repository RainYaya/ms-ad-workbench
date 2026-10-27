# 本别覆盖（flows/overrides/&lt;本&gt;.yaml）

一个本一份。只允许**改变怎么做**，不允许改变**期望什么**：`expect` / `expected`
出现即编译报错（ADR-0001、ADR-0005）。每条必须写 `reason`。

```yaml
book: AZ-110-01-009
overrides:
  - row: 30
    skip: true
    reason: "真机确认该行在现行侧不存在（2026-10-27 与书主确认）"

  - row: 32
    do: manual
    reason: "PDF 下载路径由环境决定，mock 无对应行为"

  - row: 33
    capture: 画面HC
    of: viewport
    reason: "手顺要求存证，但该行本身无操作"

  - row: 21
    valueFrom: {label: 部店課支社コード, value: "${env.DEFAULT_SECTION}"}
    reason: "别紙写的是固定值，真机环境需要换成本环境的部店"

  - row: 27
    binding: {label: 検索, selector: "#imperfectSearch"}
    reason: "画面上有两个「検索」，手顺指结果区上方那个"
```

允许的动作只有五种：`skip` / `manual` / `capture` / `valueFrom` / `binding`。
覆盖按 `row` 命中该行的**所有**步骤；`skip` 删除它们，其余在同一行内生效。

`_example.yaml` 不会被加载——加载器只找 `<本>.yaml`。
