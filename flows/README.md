# flows/ — 一本手順書 = 1 ファイル

## これは何か

手順書(Excel)の「画面・操作・確認」を、そのまま実行できる形に書き下したもの。
CSS は書かない。ラベルだけ書く。id は `ui-dictionary.json` から引く。

```
flows/AZ-110-01-009.yaml          ← 人が読む/直す。1本1ファイル
        │  python tools/compile_flow.py
        ▼
{ row, screen, do, targets[{label,selector,value}] }   ← 実行器が食う形
        │
        │  selector は辞書から。無ければ row 番号付きでエラー
        ▼
ui-dictionary.json ← tools/build_ui_dictionary.py ← reference/webapps/*.html (Shift_JIS)
ui-screens.json    ← 手順書の画面名 → 画面コード（人手で育てる）
ui-aliases.json    ← 手順書の言い回し → 画面上のラベル（人手で育てる）
```

## 書き方

```yaml
- row: 24                    # 手順書 Excel の行番号。これが証跡の鎖になる
  screen: 募集人検索画面        # 手順書に書いてある画面名をそのまま
  do: fill
  部店課支社コード: "{部店課支社コード}"   # 値は values を参照
```

期待値は `expect:` に入れる（フォーム項目と混ぜない）:

```yaml
- row: 31
  screen: 不備内容入力画面-更新
  do: expect
  expect:
    遷移: 表示内容１
```

## do: の種類

| do | 意味 |
|---|---|
| `click` | ボタン/リンク押下 |
| `fill` | 入力 |
| `fillAll` | `use:` に並べた項目をまとめて入力 |
| `select` | プルダウン選択 |
| `check` | チェックボックス |
| `clickRow` | 表の行内をクリック（値で行を特定） |
| `expect` | 画面遷移/表示の確認 |
| `expectRows` | 検索結果の行数確認 |
| `expectMessage` | メッセージ確認 |
| `manual` | ここは人がやる（実行器が止まる） |

## 3つの解決レベル

コンパイラは各ターゲットを次のどれかに分類する。**黙って推測しない。**

1. **`selector`**: 辞書に id がある → `#section_code_key`
2. **`rowfield`**: 表の行内で実行時に決まる → `tr:has(td:has-text("3028004586")) input[name=selectNo]`
3. **`runtime-resolve`**: テンプレートに構造が無く実機でしか決まらない → `pendingRuntime` に出る

3 番目は失敗ではなく「真機で埋める宿題」。`--live` で実機 DOM を取ったときに解消する。

## 今の状態 (009)

```
steps 44 / targets 18/24 解決 / errors 0 / 真機待ち 1 (row 39)
```

## 未解決として記録されているもの

- `AMA13` の検索結果は `<div id="Result">` に JS で挿入される。行選択の selector は実機観察が必要
- `AMA04` の照会内容チェック/代理店照会は `list[n].xxx` の動的 name。行の特定方法を実機で確定
- 画面名 `異例取扱管理メニュー画面`(手順書) vs `異例取扱管理システム　メニュー画面`(画面) は表記ゆれ。173行が影響
