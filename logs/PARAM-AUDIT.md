# PARAM AUDIT

> 別紙「操作内容」の入力値と、実際に runner が使う params の照合。

| metric | count |
|---|---:|
| cases | 450 |
| appendixItems | 1424 |
| match | 1265 |
| mismatch | 0 |
| missingParam | 0 |
| multiValue | 8 |
| rule | 151 |
| autoCases | 56 |

## 不一致

| case | label | 別紙 | params | key |
|---|---|---|---|---|

## 複数値（手順内で値が変わる）

| case | label | 別紙の値 | params | key |
|---|---|---|---|---|
| `AY-130-02-001` | 課支社コード | AAAAA / ABM62 | ABM62 | sectionCode |
| `AZ-112-01-001` | 課支社コード | AHK81 / AHK02 / AAAAA / A3M61 / A3M02 | A3M02 | sectionCode |
| `AZ-120-03-001` | 明細番号 | 0000000001 / 0000000002 | 0000000002 | detailNo |
| `AZ-120-03-002` | 明細番号 | 0000000001 / 0000000002 | 0000000002 | detailNo |
| `AZ-160-01-004` | 明細番号 | 0000000007 / 0000000008 | 0000000008 | detailNo |
| `AZ-160-01-005` | 明細番号 | 0000000009 / 0000000010 | 0000000010 | detailNo |
| `AZ-160-01-006` | 明細番号 | 0000000001 / 0000000002 | 0000000002 | detailNo |
| `AZ-160-01-007` | 明細番号 | 0000000003 / 0000000004 | 0000000004 | detailNo |
