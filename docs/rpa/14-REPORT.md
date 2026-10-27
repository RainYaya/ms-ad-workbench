# RPA completion report

*generated 2026-10-27T16:19:50*

## 1. Corpus

- books in 手順データ: 1386
- generated flows: 139  (blocked 1247)
- hand-written flows kept: 8
- binding rules: 519  {'auto': 265, 'needs-human': 215, 'confirmed': 3, 'blocked': 36}
- binding types: {'template': 169, 'directive': 25, 'rowlink': 28, 'explicit': 151, 'no-screen': 36, 'field': 110}

## 2. Completion levels

- L0 static pass: 139 / 139
- L1 mock pass:   5
- L2 live pass:   0

## 3. Review queue

- needs-human: 215
- blocked: 36
- auto: 265
- confirmed: 3

## 4. Blocked books — why

- 396× appendix labels not on AMB/AMA07: 証券番号 (no-control)
- 162× 別紙の入力項目が未解析（その他項目は別紙参照）
- 115× binding B0039 is needs-human (選択欄ラジオボタン)
- 81× appendix labels not on AMC00/AMC22: 証券番号 (no-control), 明細番号 (needs-human)
- 39× binding B0112 is needs-human (課支社長　申請表示条件の「10：申請依頼」)
- 38× binding B0081 is needs-human (「不承認取消」押下)
- 36× fillAll but no appendix 操作内容 block fits ANB00/ANA03
- 36× binding B0083 is needs-human (「要再申請」押下)
- 36× binding B0069 is needs-human (登録内容入力)
- 36× binding B0084 is needs-human (承認表示条件の「11：承認待ち」)
- 36× no binding for 'ログイン画面' on None/None
- 22× binding B0090 is needs-human (証券番号)
- 21× binding B0143 is needs-human (部支店長　承認表示条件の「11：承認待ち」)
- 18× no binding for 'ダミーログイン画面' on None/None
- 17× appendix labels not on ANB00/ANA02: 申請・確認基準項目 (needs-human), 保険契約者氏名 (needs-human), 保種 (ne
- 15× no workflow rows
- 12× binding B0160 is needs-human (「消込状況」)
- 11× appendix labels not on AMB/AMA07: 証券番号 (no-control), 対応状況 (needs-human)
- 8× appendix labels not on ANB00/ANA05: 作成日時 (needs-human), 取消計上区分 (needs-human), 課支社コード (need
- 8× appendix labels not on AMB/AMA03: その他の項目 (needs-human)

## 5. Flows with evidence

- `AY-110-01-001` (hand): done 11 / pending 5 / failed 1 / evidence 7
- `AY-120-08-002` (hand): done 6 / pending 4 / failed 0 / evidence 3
- `AZ-110-01-009` (hand): done 29 / pending 16 / failed 0 / evidence 3
- `AZ-110-01-010` (hand): done 29 / pending 16 / failed 0 / evidence 3
- `AZ-110-01-011` (hand): done 12 / pending 5 / failed 1 / evidence 3
- `AZ-110-01-012` (hand): done 12 / pending 5 / failed 1 / evidence 3
- `AZ-150-05-001` (hand): done 0 / pending 3 / failed 0 / evidence 0
- `AZ-240-01-001` (hand): done 9 / pending 5 / failed 0 / evidence 2
- `AY-120-08-001` (book): done 4 / pending 0 / failed 0 / evidence 4
