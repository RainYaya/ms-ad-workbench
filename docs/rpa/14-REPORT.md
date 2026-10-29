# RPA completion report

*generated 2026-10-29T10:45:06*

## 1. Corpus

- books in 手順データ: 1386
- generated flows: 1371  (blocked 15)
- hand-written flows kept: 8
- binding rules: 519  {'auto': 265, 'confirmed': 7, 'needs-human': 211, 'blocked': 36}
- binding types: {'template': 169, 'directive': 25, 'rowlink': 28, 'explicit': 151, 'no-screen': 36, 'field': 110}

## 2. Completion levels

- L0 static pass: 1321 / 1373
- L1 mock pass:   6
- L2 live pass:   0

### L0 failures

- `AY-100-08-003`: 4 error(s)
- `AY-100-08-009`: 4 error(s)
- `AY-100-09-002`: 2 error(s)
- `AY-110-02-001`: 1 error(s)
- `AY-110-02-002`: 1 error(s)
- `AY-110-02-003`: 1 error(s)
- `AY-110-02-004`: 1 error(s)
- `AY-110-02-005`: 1 error(s)
- `AY-110-02-006`: 1 error(s)
- `AY-110-02-007`: 1 error(s)
- `AY-110-02-008`: 1 error(s)
- `AY-110-02-009`: 1 error(s)
- `AY-110-02-010`: 1 error(s)
- `AY-110-02-011`: 1 error(s)
- `AY-110-02-012`: 1 error(s)
- `AY-130-02-001`: 28 error(s)
- `AY-130-02-002`: 28 error(s)
- `AY-130-03-001`: 5 error(s)
- `AY-130-03-002`: 5 error(s)
- `AY-410-01-001`: 5 error(s)
- `AY-410-01-002`: 5 error(s)
- `AY-410-01-003`: 5 error(s)
- `AY-410-01-004`: 5 error(s)
- `AY-410-01-005`: 5 error(s)
- `AY-410-01-006`: 5 error(s)
- `AY-410-01-007`: 5 error(s)
- `AY-410-01-008`: 5 error(s)
- `AY-410-01-009`: 5 error(s)
- `AY-410-01-010`: 5 error(s)
- `AY-410-01-011`: 5 error(s)
- `AY-410-01-012`: 5 error(s)
- `AY-410-01-013`: 5 error(s)
- `AY-410-01-014`: 5 error(s)
- `AY-410-01-015`: 5 error(s)
- `AZ-130-01-001`: 4 error(s)
- `AZ-130-01-002`: 23 error(s)
- `AZ-150-06-001`: 1 error(s)
- `AZ-200-07-003`: 4 error(s)
- `AZ-200-07-009`: 4 error(s)
- `AZ-210-63-001`: 1 error(s)
- `AZ-220-02-001`: 2 error(s)
- `AZ-220-02-002`: 2 error(s)
- `AZ-230-01-019`: 1 error(s)
- `AZ-230-01-026`: 1 error(s)
- `AZ-230-01-033`: 1 error(s)
- `AZ-230-01-065`: 4 error(s)
- `AZ-230-01-073`: 1 error(s)
- `AZ-230-01-100`: 1 error(s)
- `AZ-230-01-107`: 1 error(s)
- `AZ-230-01-114`: 1 error(s)
- `AZ-230-01-146`: 4 error(s)
- `AZ-230-01-154`: 1 error(s)

## 3. Review queue

- needs-human: 211
- blocked: 36
- auto: 265
- confirmed: 7

## 4. Blocked books — why

- 452× 行内控件「検索」に target.anchor が無い（手順/別紙に行を特定する値が書かれていない）
- 356× binding type explicit not emittable
- 240× 行内控件「修」に target.anchor が無い（手順/別紙に行を特定する値が書かれていない）
- 229× fillAll but no appendix 操作内容 block fits AMB/AMA15
- 226× fillAll but no appendix 操作内容 block fits AMB/AMA13
- 224× appendix labels not on AMB/AMA13: 編集照会内容 (needs-human)
- 206× fillAll but no appendix 操作内容 block fits AMB/AMA07
- 187× binding B0032 is needs-human (代理店照会)
- 162× 別紙の入力項目が未解析（その他項目は別紙参照）
- 128× binding B0035 is needs-human (「通知しない」押下)
- 114× fillAll but no appendix 操作内容 block fits ANB00/ANA05
- 104× fillAll but no appendix 操作内容 block fits AMC00/AMC22
- 98× binding B0459 is needs-human (証券番号・明細番号)
- 91× binding B0202 is needs-human (部店課支社)
- 85× fillAll but no appendix 操作内容 block fits AMB/AMA19
- 80× binding B0067 is needs-human (「承認」押下)
- 74× binding B0065 is needs-human (「名前を付けて保存」押下)
- 72× binding B0069 is needs-human (登録内容入力)
- 57× binding B0080 is needs-human (「不承認」押下)
- 56× binding B0081 is needs-human (「不承認取消」押下)

## 5. Flows with evidence

- `AY-110-01-001` (hand): done 11 / pending 5 / failed 1 / evidence 7
- `AY-120-08-002` (hand): done 6 / pending 4 / failed 0 / evidence 3
- `AZ-110-01-009` (hand): done 19 / pending 10 / failed 1 / evidence 5
- `AZ-110-01-010` (hand): done 29 / pending 16 / failed 0 / evidence 3
- `AZ-110-01-011` (hand): done 12 / pending 5 / failed 1 / evidence 3
- `AZ-110-01-012` (hand): done 12 / pending 5 / failed 1 / evidence 3
- `AZ-150-05-001` (hand): done 0 / pending 3 / failed 0 / evidence 0
- `AZ-240-01-001` (hand): done 9 / pending 5 / failed 0 / evidence 2
- `AY-120-08-001` (book): done 8 / pending 5 / failed 0 / evidence 3
- `AY-120-08-002` (book): done 6 / pending 4 / failed 0 / evidence 3
- `AY-120-08-003` (book): done 8 / pending 2 / failed 0 / evidence 3
- `AZ-150-05-001` (book): done 0 / pending 3 / failed 0 / evidence 0
- `AZ-230-01-001` (book): done 4 / pending 0 / failed 1 / evidence 3
