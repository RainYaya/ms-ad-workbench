# flows/ — 一本手順書 = 1 ファイル

## これは何か

手順書(Excel)の「画面・操作・確認」を、そのまま実行できる形に書き下したもの。
CSS は書かない。ラベルだけ書く。selector は辞書から引く。
仕様は [../docs/rpa/11-KERNEL.md](../docs/rpa/11-KERNEL.md)。

```
flows/AZ-110-01-009.yaml
        │ automation/node-runner/flow-loader.mjs
        ▼
{ row, on, do, targets[{label,selector,value}], expect }   ← 実行器が食う形
        │ selector は ui-dictionary.json / ui-rowfields.json から
        ▼
automation/node-runner/run-flow.mjs   （mock / 真機）
```

| ファイル | 用途 |
|---|---|
| `flows/env/*.yaml` | 環境値（部店課支社コード、代理店コード、base URL） |
| `*.legacy.yaml` | 旧 schema の退避版（参照用、実行しない） |

## 今ある本

| 本 | 内容 | 状态 |
|---|---|---|
| `AZ-110-01-009.yaml` | 不備登録→修正→完了（自賠責） | mock 29 done / 16 pending / 0 fail |
| `AZ-110-01-010.yaml` | 同模板（貨物） | mock 29 done / 16 pending / 0 fail |
| `AZ-110-01-011.yaml` | 同模板（種目共通） | 别紙の入力区分と大種目ルールが矛盾。行 30 で正しく止まる |
| `AZ-110-01-012.yaml` | 同模板（その他） | 同上 |
| `AY-110-01-001.yaml` | 例外系（取消計上申請→申請依頼） | 行 14–28 绿（11 done / 5 pending）。行 30 被别紙矛盾挡住 |
| `AZ-240-01-001.yaml` | 帳票出力（不備一覧→更新→印刷PDF→一覧→2周目） | 14 步 9 done / 5 pending / 0 fail。downloadIs は mock では pending |
| `AZ-150-05-001.yaml` | バッチ（親子集計 / 正常終了） | mode: external。3 步すべて pending（mock では何も検証できない） |
| `AY-120-08-002.yaml` | 更新系（照会・検索→No.→申請・確認更新→更新） | 10 步 6 done / 4 pending / 0 fail |

pending は「未検証」であって成功ではない。詳細は `docs/rpa/03-STATUS.md`。

## 書き方

```yaml
values:
  証券番号: {value: "AZ11001", source: case, row: 10}

steps:
  - row: 24                   # 手順書 Excel の行番号。証跡の鎖
    on: 不備内容入力画面－新規   # この step の前にいるべき画面
    do: fill
    target: {label: 証券番号}
    value: "${case.証券番号}"

  - row: 31
    on: 不備内容入力画面-更新
    do: screenIs              # 遷移の確認
    expect:
      fields:                 # 表示内容も同じ行で確認できる
        - {label: 保険契約者名, equals: "TEST"}
      ref: {appendix: 表示内容１, status: unresolved}
```

- `on` は手順から派生した画面と照合される。合わなければコンパイルエラー。
- `target` は `{label}`（T2）か、辞書の行内フィールド（T3）。CSS は書かない。
- `value` は `literal` / `${env.x}` / `${case.x}` / `${sys.today+7d}` / `${prev.x}`。
- 一つの手順ラベルが複数控件（radio、日時）のときは `ui-rowfields.json` に
  `choices` / `parts` を書く。
- 同じラベルが別画面で違う値のときは `fillAll` の項に
  `{label: 氏名, value: "${case.担当者氏名}"}` と書く。
- 別紙の「表示内容N」が未解析なら `ref: {appendix: ..., status: unresolved}`。
  これは **pending** であって成功ではない。
- ダウンロードは `downloadIs`。`expect.download: {ext: pdf}` だけでは合格にせず、
  内容が未解析なら `expect.ref` を併記して pending のままにする
  （`AZ-240-01-001.yaml` 行 19/27）。真機では PDF を `logs/<case>-flow/` に保存する。

### バッチ / DB / メールだけの本（mode: external）

画面操作が無い本（全 1,386 本中 38 本がバッチのみ）は `mode: external` を書く。
ブラウザを開かず、`manual`（人が実行）と `externalIs`（外部の結果を人が確認）
だけで表す。`start` も `on` も書かない。

```yaml
case: AZ-150-05-001
mode: external
evidencePolicy: none

steps:
  - row: 14
    do: manual
    note: 親子集計バッチ処理を実行する
  - row: 15
    do: externalIs
    expect: {external: {type: 操作結果, note: "正常終了（-）"}}
```

`check-flow` は external モードで画面チェーンを検査しない代わりに、
`manual` / `externalIs` / `capture` / `waitUntil` 以外をエラーにする。
`--yes` で走らせると全部 pending（未検証）になる。mock で緑にはならない。

## do: の種類（17 原語）

| 分類 | do |
|---|---|
| 動作 | `click` / `fill` / `select` / `check` / `chooseRow` / `press` / `goto` / `waitUntil` |
| 証跡 | `capture` |
| 断言 | `screenIs` / `fieldIs` / `rowsAtLeast` / `messageIs` / `downloadIs` / `externalIs` |
| 人 | `manual` |

`clickRow` / `expect` / `expectRows` / `expectMessage` は旧 schema。
`*.legacy.yaml` 以外では使わない。

## 実行

```bash
# 1. 离线检查（画面链 / 行覆盖 / 定位 / 值来源 / expect 类型）
node automation/node-runner/check-flow.mjs flows/AZ-110-01-009.yaml

# 2. mock
cd automation/node-runner
node mock-server.mjs 10117
node run-flow.mjs ../../flows/AZ-110-01-009.yaml \
  --base http://127.0.0.1:10117/AMB/dummy.html --headless --yes
```

`tools/compile_flow.py` は DEPRECATED。コンパイルは `flow-loader.mjs` のみ。
