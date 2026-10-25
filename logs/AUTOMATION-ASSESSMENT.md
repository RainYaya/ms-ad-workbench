# AUTOMATION ASSESSMENT

> 本文件区分「流程能跑」「証跡可审计」「别纸参数正确」「真机已验证」。

## 总览

| 指标 | 数量 |
|---|---:|
| 对象本数 | 450 |
| 有 selector 的 block | 252 |
| block 步骤总数 | 1608 |
| 带非浏览器/mock/人工 note 的步骤 | 275 |
| 含代理步骤的 block | 149 |
| force 点击步骤 | 182 |
| manual 动作步骤 | 6 |
| 含人工步骤的本 | 224 |
| 别纸参数存在不一致/缺失的本 | 41 |
| 流程+别纸参数都干净的本 | 203 |

## 结论

- 446/450 是 mock flow pass；4 本失败。
- 149 个 block 含代理/非浏览器步骤，不能当成纯浏览器自动验证。
- 224 本至少有一个手顺步骤需要人工（F12/JP1/待機/AP・DBログ/テーブル等）。
- 41 本别纸参数与 params 不一致或缺失；真机前必须修。
- 只有 203 本在「无人工步骤 + 别纸参数一致」两层都干净。

## 代理步骤最多的 block

| block | file | proxy/steps | force | manual |
|---|---|---:|---:|---:|
| `BLK-SHR-269893EF` | block-selectors-az-list-slice.json | 20/68 | 2 | 0 |
| `BLK-SHR-6F09B48C` | block-selectors-az-list-slice.json | 11/18 | 2 | 0 |
| `BLK-SGL-3DB9518B` | block-selectors-ay-nav-slice.json | 9/45 | 0 | 0 |
| `BLK-SGL-31F074B9` | block-selectors-ay-nav-slice.json | 6/32 | 1 | 0 |
| `BLK-SGL-BE812D08` | block-selectors-ay-nav-slice.json | 6/32 | 1 | 0 |
| `BLK-SHR-DD6D983A` | block-selectors-ay-nav-slice.json | 6/32 | 1 | 0 |
| `BLK-AUTO-23229D4F` | block-selectors-az-list-slice.json | 5/11 | 1 | 0 |
| `BLK-SGL-7597207A` | block-selectors-ay-form-slice.json | 5/9 | 0 | 0 |
| `BLK-SGL-7EE83E5A` | block-selectors-misc-slice.json | 5/70 | 4 | 0 |
| `BLK-SHR-1D4C0178` | block-selectors-az-list-slice.json | 5/11 | 1 | 0 |
| `BLK-SHR-77BF51A5` | block-selectors-ay-form-slice.json | 5/15 | 0 | 0 |
| `BLK-AZ-AGT-CORRECTION-REGISTER` | block-selectors-amc-slice.json | 4/11 | 1 | 0 |
| `BLK-SGL-6163165A` | block-selectors-az-list-slice.json | 4/8 | 1 | 0 |
| `BLK-SGL-FF4BE5F2` | block-selectors-ay-form-slice.json | 4/15 | 1 | 0 |
| `BLK-AZ-OPEN-CLOSE-SYS` | block-selectors-misc-slice.json | 3/6 | 0 | 0 |
| `BLK-SGL-0C5A44D1` | block-selectors-misc-slice.json | 3/4 | 0 | 0 |
| `BLK-SGL-1913A9CC` | block-selectors-amc-slice.json | 3/10 | 0 | 0 |
| `BLK-SGL-4C3588A4` | block-selectors-ay-nav-slice.json | 3/11 | 0 | 0 |
| `BLK-SGL-A00738F4` | block-selectors-ay-form-slice.json | 3/4 | 0 | 0 |
| `BLK-SGL-C16D256A` | block-selectors-az-list-slice.json | 3/4 | 0 | 0 |
| `BLK-SGL-C3BC64AD` | block-selectors-ay-form-slice.json | 3/18 | 3 | 0 |
| `BLK-SHR-01CAB10D` | block-selectors-misc-slice.json | 3/11 | 0 | 0 |
| `BLK-SHR-04E83971` | block-selectors-ay-form-slice.json | 3/4 | 0 | 0 |
| `BLK-SHR-73B769C8` | block-selectors-ay-form-slice.json | 3/4 | 0 | 0 |
| `BLK-AUTO-10E5C587` | block-selectors-az-update-slice.json | 2/6 | 1 | 0 |
| `BLK-AUTO-27C68433` | block-selectors-ay-form-slice.json | 2/9 | 0 | 0 |
| `BLK-AUTO-7364B069` | block-selectors-az-update-slice.json | 2/6 | 1 | 0 |
| `BLK-AUTO-D844ADE8` | block-selectors-az-update-slice.json | 2/5 | 1 | 0 |
| `BLK-AUTO-F8714C90` | block-selectors-misc-slice.json | 2/7 | 1 | 0 |
| `BLK-AUTO-FCB405E4` | block-selectors-misc-slice.json | 2/7 | 1 | 0 |
| `BLK-AUTO-FECF904C` | block-selectors-ay-form-slice.json | 2/5 | 1 | 0 |
| `BLK-AZ-AGT-LIST-INITIAL-EMPTY` | block-selectors-amc-slice.json | 2/3 | 0 | 0 |
| `BLK-AZ-SESSION-TIMEOUT` | block-selectors-boundary.json | 2/3 | 0 | 0 |
| `BLK-SGL-0B2CB156` | block-selectors-az-update-slice.json | 2/7 | 1 | 2 |
| `BLK-SGL-2268EC8E` | block-selectors-ay-form-slice.json | 2/11 | 2 | 0 |
| `BLK-SGL-2B7D45E3` | block-selectors-ay-nav-slice.json | 2/11 | 0 | 0 |
| `BLK-SGL-7EBD5C1C` | block-selectors-az-update-slice.json | 2/4 | 1 | 0 |
| `BLK-SGL-824C0B37` | block-selectors-az-update-slice.json | 2/4 | 1 | 0 |
| `BLK-SGL-EA9C1EF3` | block-selectors-ay-nav-slice.json | 2/11 | 1 | 2 |
| `BLK-SGL-EF37895C` | block-selectors-misc-slice.json | 2/11 | 1 | 2 |
| `BLK-SGL-F54CCD41` | block-selectors-batch-slice.json | 2/7 | 0 | 0 |
| `BLK-SGL-FBFD5CAD` | block-selectors-az-update-slice.json | 2/7 | 2 | 0 |
| `BLK-SHR-8F1D192A` | block-selectors-misc-slice.json | 2/3 | 0 | 0 |
| `BLK-SHR-950C5CC5` | block-selectors-az-update-slice.json | 2/8 | 2 | 0 |
| `BLK-SHR-CD763243` | block-selectors-az-update-slice.json | 2/4 | 1 | 0 |
| `BLK-SHR-D155DA21` | block-selectors-az-update-slice.json | 2/5 | 1 | 0 |
| `BLK-SHR-EBEB83B0` | block-selectors-az-update-slice.json | 2/9 | 1 | 0 |
| `BLK-SHR-EEFF5DB3` | block-selectors-amc-slice.json | 2/2 | 0 | 0 |
| `BLK-SHR-F557476E` | block-selectors-ay-form-slice.json | 2/10 | 2 | 0 |
| `BLK-AUTO-01795032` | block-selectors-az-update-slice.json | 1/4 | 0 | 0 |
| `BLK-AUTO-0AD75340` | block-selectors-amc-slice.json | 1/9 | 1 | 0 |
| `BLK-AUTO-2C41848F` | block-selectors-az-update.json | 1/3 | 1 | 0 |
| `BLK-AUTO-3477BB6F` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-AUTO-559E7D1D` | block-selectors-az-update-slice.json | 1/4 | 1 | 0 |
| `BLK-AUTO-5C1EFE0E` | block-selectors-az-list-slice.json | 1/12 | 0 | 0 |
| `BLK-AUTO-6AD0E114` | block-selectors-az-update-slice.json | 1/4 | 1 | 0 |
| `BLK-AUTO-6F1B4715` | block-selectors-az-update3.json | 1/3 | 1 | 0 |
| `BLK-AUTO-7A70187A` | block-selectors-misc-slice.json | 1/6 | 1 | 0 |
| `BLK-AUTO-8C0E3438` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-AUTO-8FE40BE8` | block-selectors-az-update4.json | 1/2 | 1 | 0 |
| `BLK-AUTO-BABA9D55` | block-selectors-az-update.json | 1/3 | 1 | 0 |
| `BLK-AUTO-C8903BF5` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-AUTO-C8BDC3F2` | block-selectors-az-update.json | 1/2 | 1 | 0 |
| `BLK-AUTO-DF07A781` | block-selectors-ay-form-slice.json | 1/10 | 0 | 0 |
| `BLK-AUTO-E6EAF3BB` | block-selectors-ay-form-slice.json | 1/3 | 1 | 0 |
| `BLK-AUTO-ECE76B71` | block-selectors-az-update-slice.json | 1/5 | 1 | 0 |
| `BLK-AY-SHINSEI-TAIOUTOUROKU` | block-selectors-ay-form-slice.json | 1/4 | 1 | 0 |
| `BLK-AZ-AGENT-SELECT` | block-selectors.json | 1/10 | 0 | 0 |
| `BLK-AZ-AGT-LIST-INITIAL` | block-selectors-amc-slice.json | 1/7 | 0 | 0 |
| `BLK-AZ-AGT-SESSION-TIMEOUT` | block-selectors-amc-slice.json | 1/10 | 1 | 0 |
| `BLK-AZ-AGT-UPDATE-SUSPEND` | block-selectors-amc-slice.json | 1/5 | 1 | 0 |
| `BLK-AZ-AUTH-ERROR` | block-selectors-boundary.json | 1/4 | 0 | 0 |
| `BLK-AZ-BATCH-CONVERT-MAIL` | block-selectors-boundary.json | 1/2 | 0 | 0 |
| `BLK-AZ-BATCH-RUN-VERIFY` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-AZ-BATCH-VERIFY` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-AZ-COMMON-LOGS` | block-selectors-az-update.json | 1/1 | 0 | 0 |
| `BLK-AZ-COMPLETE-REGISTER` | block-selectors.json | 1/4 | 2 | 0 |
| `BLK-AZ-EXTERNAL-AUTH` | block-selectors-boundary.json | 1/4 | 0 | 0 |
| `BLK-AZ-INSURANCE-SELECT` | block-selectors.json | 1/5 | 0 | 0 |
| `BLK-AZ-UPDATE-DELETE-OK` | block-selectors-az-update.json | 1/3 | 1 | 0 |
| `BLK-SGL-022A6268` | block-selectors-az-list-slice.json | 1/4 | 1 | 0 |
| `BLK-SGL-0EF7DA98` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-134186E1` | block-selectors-az-list-slice.json | 1/5 | 1 | 0 |
| `BLK-SGL-1CC6C3EC` | block-selectors-az-list-slice.json | 1/5 | 1 | 0 |
| `BLK-SGL-1E78A599` | block-selectors-az-list-slice.json | 1/5 | 1 | 0 |
| `BLK-SGL-1ECE1684` | block-selectors-az-list-slice.json | 1/11 | 1 | 0 |
| `BLK-SGL-213E7E7D` | block-selectors-az-update-slice.json | 1/7 | 3 | 0 |
| `BLK-SGL-2995218F` | block-selectors-az-list-slice.json | 1/8 | 1 | 0 |
| `BLK-SGL-2DDFC25D` | block-selectors-az-list-slice.json | 1/5 | 1 | 0 |
| `BLK-SGL-2FF1643E` | block-selectors-az-update-slice.json | 1/5 | 2 | 0 |
| `BLK-SGL-3017A3AA` | block-selectors-az-update-slice.json | 1/12 | 5 | 0 |
| `BLK-SGL-41743CCA` | block-selectors-sgl.json | 1/3 | 1 | 0 |
| `BLK-SGL-42508787` | block-selectors-az-update-slice.json | 1/3 | 1 | 0 |
| `BLK-SGL-4EB596EB` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-60F6A775` | block-selectors-az-update-slice.json | 1/2 | 0 | 0 |
| `BLK-SGL-6BEAE496` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-75D5F75B` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-7A4080AD` | block-selectors-az-update-slice.json | 1/8 | 3 | 0 |
| `BLK-SGL-7A863F7A` | block-selectors-az-update-slice.json | 1/2 | 0 | 0 |
| `BLK-SGL-86665200` | block-selectors-az-list-slice.json | 1/5 | 1 | 0 |
| `BLK-SGL-98A9A5DE` | block-selectors-az-update-slice.json | 1/3 | 1 | 0 |
| `BLK-SGL-9EBB1470` | block-selectors-batch-slice.json | 1/6 | 0 | 0 |
| `BLK-SGL-A5BF2BD4` | block-selectors-az-list-slice.json | 1/11 | 1 | 0 |
| `BLK-SGL-AB15C319` | block-selectors-az-update-slice.json | 1/2 | 0 | 0 |
| `BLK-SGL-B69EF548` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-B84FFF40` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-BDA7A359` | block-selectors-az-list-slice.json | 1/26 | 5 | 0 |
| `BLK-SGL-C651052A` | block-selectors-batch-slice.json | 1/8 | 0 | 0 |
| `BLK-SGL-C9C58BF8` | block-selectors-az-update-slice.json | 1/11 | 5 | 0 |
| `BLK-SGL-CCA9B958` | block-selectors-sgl.json | 1/3 | 1 | 0 |
| `BLK-SGL-CEAA65E9` | block-selectors-sgl.json | 1/7 | 1 | 0 |
| `BLK-SGL-DB2830E2` | block-selectors-az-list-slice.json | 1/11 | 1 | 0 |
| `BLK-SGL-DE4B3B14` | block-selectors-az-update-slice.json | 1/10 | 3 | 0 |
| `BLK-SGL-E008F918` | block-selectors-sgl.json | 1/2 | 0 | 0 |
| `BLK-SGL-E3AD1DD9` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-ECBA7661` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-F1E0B9E5` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SGL-F1F96812` | block-selectors-az-list-slice.json | 1/11 | 1 | 0 |
| `BLK-SGL-FCF80BAC` | block-selectors-az-list-slice.json | 1/11 | 1 | 0 |
| `BLK-SHR-072E06D9` | block-selectors-az-list-slice.json | 1/2 | 0 | 0 |
| `BLK-SHR-106D33F6` | block-selectors-az-list-slice.json | 1/7 | 1 | 0 |
| `BLK-SHR-121DF781` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SHR-2EEC5A3D` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SHR-305661D1` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SHR-311D55A3` | block-selectors-az-update-slice.json | 1/4 | 1 | 0 |
| `BLK-SHR-340D4343` | block-selectors-az-update-slice.json | 1/2 | 0 | 0 |
| `BLK-SHR-40B1188F` | block-selectors-ay-nav-slice.json | 1/7 | 0 | 0 |
| `BLK-SHR-5BDEF314` | block-selectors-az-update-slice.json | 1/4 | 1 | 0 |
| `BLK-SHR-5CEC3483` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SHR-5F5035B5` | block-selectors-batch-slice.json | 1/2 | 0 | 0 |
| `BLK-SHR-63C4E6D6` | block-selectors-az-list-slice.json | 1/7 | 1 | 0 |
| `BLK-SHR-669A1809` | block-selectors-az-update3.json | 1/2 | 0 | 0 |
| `BLK-SHR-73BCFD18` | block-selectors-amc-slice.json | 1/6 | 1 | 0 |
| `BLK-SHR-B0028D4D` | block-selectors-az-update-slice.json | 1/2 | 0 | 0 |
| `BLK-SHR-B42FB7FD` | block-selectors-az-list-slice.json | 1/10 | 1 | 0 |
| `BLK-SHR-BF46F797` | block-selectors-az-update-slice.json | 1/2 | 0 | 0 |
| `BLK-SHR-C649ACE4` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SHR-C69800AD` | block-selectors-ay-nav-slice.json | 1/14 | 1 | 0 |
| `BLK-SHR-CC41ACD0` | block-selectors-az-update-slice.json | 1/4 | 1 | 0 |
| `BLK-SHR-CE8B86B5` | block-selectors-ay-form-slice.json | 1/4 | 1 | 0 |
| `BLK-SHR-D0DDEEE4` | block-selectors-az-update4.json | 1/2 | 1 | 0 |
| `BLK-SHR-D606FB03` | block-selectors-az-update4.json | 1/1 | 0 | 0 |
| `BLK-SHR-D6459D48` | block-selectors-batch-slice.json | 1/1 | 0 | 0 |
| `BLK-SHR-D9AE66FC` | block-selectors-az-update-slice.json | 1/6 | 2 | 0 |
| `BLK-SHR-EB3D34F4` | block-selectors-ay-form-slice.json | 1/2 | 0 | 0 |
| `BLK-SHR-ED876A58` | block-selectors-az-update-slice.json | 1/3 | 1 | 0 |
| `BLK-SHR-F07F5CF4` | block-selectors-ay-form-slice.json | 1/4 | 1 | 0 |
| `BLK-SHR-F09E159A` | block-selectors-az-update-slice.json | 1/4 | 1 | 0 |
| `BLK-SHR-F9A1D656` | block-selectors-ag.json | 1/2 | 1 | 0 |

## 无人工步骤且别纸参数一致的本（41）

- `AY-100-04-001`
- `AY-100-04-002`
- `AY-100-08-003`
- `AY-120-01-003`
- `AY-120-01-004`
- `AY-120-01-005`
- `AY-120-01-006`
- `AY-120-01-007`
- `AY-120-01-008`
- `AY-120-01-009`
- `AY-120-01-010`
- `AY-120-01-011`
- `AY-120-01-012`
- `AY-120-02-015`
- `AY-120-02-016`
- `AY-120-02-017`
- `AY-120-02-018`
- `AY-120-03-002`
- `AY-120-03-003`
- `AY-120-03-004`
- `AY-120-03-005`
- `AY-120-03-006`
- `AY-120-04-009`
- `AY-120-04-010`
- `AY-120-04-011`
- `AY-120-04-012`
- `AY-120-04-013`
- `AY-120-04-014`
- `AY-120-04-015`
- `AY-120-04-016`
- `AY-120-04-017`
- `AY-120-04-018`
- `AY-120-06-003`
- `AY-120-06-004`
- `AY-120-06-005`
- `AY-120-06-006`
- `AY-120-06-007`
- `AY-120-06-008`
- `AY-120-06-009`
- `AY-120-06-010`
- `AY-120-06-011`
- `AY-120-06-012`
- `AY-120-08-002`
- `AY-120-08-003`
- `AY-120-08-004`
- `AY-120-08-005`
- `AY-120-08-006`
- `AY-120-09-004`
- `AY-120-09-005`
- `AY-120-09-006`
- `AY-120-09-007`
- `AY-120-09-008`
- `AY-120-09-009`
- `AY-120-09-010`
- `AY-120-09-011`
- `AY-120-09-012`
- `AY-120-09-013`
- `AY-121-01-011`
- `AY-121-01-012`
- `AY-121-01-013`
- `AY-121-01-014`
- `AY-121-01-015`
- `AY-121-01-016`
- `AY-121-01-017`
- `AY-121-01-018`
- `AY-121-02-002`
- `AY-121-03-005`
- `AY-121-03-006`
- `AY-121-03-007`
- `AY-121-03-008`
- `AY-121-03-009`
- `AY-121-03-010`
- `AY-121-03-011`
- `AY-121-03-012`
- `AY-121-03-013`
- `AY-121-03-014`
- `AY-121-04-017`
- `AY-121-04-018`
- `AY-121-05-002`
- `AY-121-05-003`
- `AY-121-05-004`
- `AY-121-05-005`
- `AY-121-05-006`
- `AY-121-05-007`
- `AY-121-05-008`
- `AY-121-07-002`
- `AY-121-08-003`
- `AY-121-08-004`
- `AY-121-08-005`
- `AY-121-08-006`
- `AY-121-08-007`
- `AY-121-08-008`
- `AY-121-08-009`
- `AY-121-08-010`
- `AY-121-08-011`
- `AY-121-08-012`
- `AY-122-01-006`
- `AY-122-01-007`
- `AY-122-01-008`
- `AY-130-01-001`
- `AY-130-01-002`
- `AZ-110-01-009`
- `AZ-110-01-010`
- `AZ-110-01-011`
- `AZ-110-01-012`
- `AZ-110-02-002`
- `AZ-110-02-003`
- `AZ-110-02-004`
- `AZ-110-05-008`
- `AZ-110-05-009`
- `AZ-110-05-010`
- `AZ-110-05-011`
- `AZ-110-05-012`
- `AZ-110-05-013`
- `AZ-110-05-014`
- `AZ-110-05-015`
- `AZ-110-05-016`
- `AZ-110-05-017`
- `AZ-110-13-005`
- `AZ-110-17-002`
- `AZ-110-17-003`
- `AZ-110-19-002`
- `AZ-110-24-009`
- `AZ-110-24-010`
- `AZ-110-24-011`
- `AZ-110-24-012`
- `AZ-110-24-013`
- `AZ-110-24-014`
- `AZ-110-25-002`
- `AZ-110-25-003`
- `AZ-110-25-004`
- `AZ-110-33-004`
- `AZ-111-03-001`
- `AZ-111-03-002`
- `AZ-111-03-003`
- `AZ-111-03-004`
- `AZ-111-03-005`
- `AZ-111-03-006`
- `AZ-111-05-005`
- `AZ-111-05-006`
- `AZ-111-05-007`
- `AZ-111-05-008`
- `AZ-111-05-009`
- `AZ-111-05-010`
- `AZ-111-05-011`
- `AZ-111-05-012`
- `AZ-160-03-001`
- `AZ-160-03-002`
- `AZ-160-03-003`
- `AZ-200-04-001`
- `AZ-200-07-003`
- `AZ-210-05-013`
- `AZ-210-05-014`
- `AZ-210-05-015`
- `AZ-210-05-016`
- `AZ-210-36-002`
- `AZ-210-36-003`
- `AZ-210-36-004`
- `AZ-210-37-008`
- `AZ-210-37-009`
- `AZ-210-37-010`
- `AZ-210-37-011`
- `AZ-210-37-012`
- `AZ-210-37-013`
- `AZ-210-37-014`
- `AZ-210-37-015`
- `AZ-210-37-016`
- `AZ-210-37-017`
- `AZ-210-46-003`
- `AZ-210-46-004`
- `AZ-210-46-005`
- `AZ-210-46-006`
- `AZ-210-46-007`
- `AZ-210-63-001`
- `AZ-240-03-002`
- `AZ-240-03-003`
- `AZ-310-01-011`
- `AZ-310-01-012`
- `AZ-310-01-013`
- `AZ-310-01-014`
- `AZ-310-01-015`
- `AZ-310-01-016`
- `AZ-310-01-017`
- `AZ-310-01-018`
- `AZ-310-01-019`
- `AZ-310-01-020`
- `AZ-310-02-012`
- `AZ-310-02-013`
- `AZ-310-02-014`
- `AZ-310-02-015`
- `AZ-310-02-016`
- `AZ-310-02-017`
- `AZ-310-02-018`
- `AZ-310-02-019`
- `AZ-310-02-020`
- `AZ-310-02-021`
- `AZ-310-04-020`
- `AZ-310-04-021`
- `AZ-310-04-022`
- `AZ-310-04-023`
- `AZ-310-04-024`
- `AZ-310-16-008`
- `AZ-310-16-009`

## 有人工步骤的本（224）

- `AY-100-05-001`
- `AY-100-06-003`
- `AY-100-07-001`
- `AY-100-07-002`
- `AY-100-08-001`
- `AY-100-08-002`
- `AY-100-08-004`
- `AY-100-08-005`
- `AY-110-02-001`
- `AY-110-02-002`
- `AY-120-03-001`
- `AY-120-08-001`
- `AY-121-02-001`
- `AY-121-05-001`
- `AY-121-07-001`
- `AY-410-01-008`
- `AY-410-01-009`
- `AY-410-01-010`
- `AY-410-01-011`
- `AZ-100-05-003`
- `AZ-100-05-004`
- `AZ-100-06-001`
- `AZ-100-06-003`
- `AZ-110-02-001`
- `AZ-110-14-001`
- `AZ-110-15-001`
- `AZ-110-16-001`
- `AZ-110-17-001`
- `AZ-110-18-001`
- `AZ-110-19-001`
- `AZ-110-25-001`
- `AZ-110-34-001`
- `AZ-110-35-001`
- `AZ-110-36-001`
- `AZ-110-37-001`
- `AZ-110-38-001`
- `AZ-110-39-001`
- `AZ-110-40-001`
- `AZ-110-41-001`
- `AZ-110-42-001`
- `AZ-110-62-001`
- `AZ-110-63-001`
- `AZ-110-64-001`
- `AZ-110-65-001`
- `AZ-110-66-001`
- `AZ-110-67-001`
- `AZ-110-68-001`
- `AZ-110-69-001`
- `AZ-110-70-001`
- `AZ-110-71-001`
- `AZ-110-79-001`
- `AZ-110-80-001`
- `AZ-110-81-001`
- `AZ-110-82-001`
- `AZ-111-02-003`
- `AZ-111-02-004`
- `AZ-111-02-005`
- `AZ-111-02-006`
- `AZ-112-01-001`
- `AZ-120-04-001`
- `AZ-150-04-002`
- `AZ-150-05-001`
- `AZ-150-06-001`
- `AZ-150-07-001`
- `AZ-150-08-001`
- `AZ-150-10-004`
- `AZ-150-11-001`
- `AZ-150-11-002`
- `AZ-150-12-001`
- `AZ-150-12-002`
- `AZ-150-13-001`
- `AZ-150-13-002`
- `AZ-150-13-003`
- `AZ-150-13-004`
- `AZ-160-01-004`
- `AZ-160-01-005`
- `AZ-160-01-006`
- `AZ-160-01-007`
- `AZ-200-01-001`
- `AZ-200-01-002`
- `AZ-200-01-003`
- `AZ-200-01-004`
- `AZ-200-01-005`
- `AZ-200-01-006`
- `AZ-200-01-007`
- `AZ-200-01-008`
- `AZ-200-01-009`
- `AZ-200-01-030`
- `AZ-200-01-031`
- `AZ-200-01-032`
- `AZ-200-02-001`
- `AZ-200-02-002`
- `AZ-200-03-001`
- `AZ-200-03-002`
- `AZ-200-03-003`
- `AZ-200-03-004`
- `AZ-200-07-001`
- `AZ-200-07-002`
- `AZ-200-07-004`
- `AZ-200-07-005`
- `AZ-200-07-006`
- `AZ-210-08-001`
- `AZ-210-09-001`
- `AZ-210-10-001`
- `AZ-210-11-001`
- `AZ-210-12-001`
- `AZ-210-13-001`
- `AZ-210-14-001`
- `AZ-210-15-001`
- `AZ-210-16-001`
- `AZ-210-17-001`
- `AZ-210-30-001`
- `AZ-210-31-001`
- `AZ-210-32-001`
- `AZ-210-33-001`
- `AZ-210-34-001`
- `AZ-210-35-001`
- `AZ-210-36-001`
- `AZ-210-47-001`
- `AZ-210-48-001`
- `AZ-210-49-001`
- `AZ-210-50-001`
- `AZ-210-51-001`
- `AZ-210-60-001`
- `AZ-210-61-001`
- `AZ-210-62-001`
- `AZ-210-64-001`
- `AZ-210-65-001`
- `AZ-210-66-001`
- `AZ-210-67-001`
- `AZ-210-68-001`
- `AZ-220-01-003`
- `AZ-220-01-004`
- `AZ-230-01-011`
- `AZ-230-01-012`
- `AZ-230-01-013`
- `AZ-230-01-014`
- `AZ-230-01-015`
- `AZ-230-01-016`
- `AZ-230-01-017`
- `AZ-230-01-018`
- `AZ-230-01-019`
- `AZ-230-01-020`
- `AZ-230-01-041`
- `AZ-230-01-042`
- `AZ-230-01-043`
- `AZ-230-01-044`
- `AZ-230-01-045`
- `AZ-230-01-046`
- `AZ-230-01-047`
- `AZ-230-01-048`
- `AZ-230-01-049`
- `AZ-230-01-050`
- `AZ-230-01-071`
- `AZ-230-01-072`
- `AZ-230-01-073`
- `AZ-230-01-074`
- `AZ-230-01-075`
- `AZ-230-01-076`
- `AZ-230-01-077`
- `AZ-230-01-078`
- `AZ-230-01-079`
- `AZ-230-01-080`
- `AZ-230-01-101`
- `AZ-230-01-102`
- `AZ-230-01-103`
- `AZ-230-01-104`
- `AZ-230-01-105`
- `AZ-230-01-106`
- `AZ-230-01-107`
- `AZ-230-01-108`
- `AZ-230-01-109`
- `AZ-230-01-110`
- `AZ-230-01-131`
- `AZ-230-01-132`
- `AZ-230-01-133`
- `AZ-230-01-134`
- `AZ-230-01-135`
- `AZ-230-01-136`
- `AZ-230-01-137`
- `AZ-230-01-138`
- `AZ-230-01-139`
- `AZ-230-01-140`
- `AZ-230-01-151`
- `AZ-230-01-152`
- `AZ-230-01-153`
- `AZ-230-01-154`
- `AZ-230-01-155`
- `AZ-230-01-156`
- `AZ-230-01-157`
- `AZ-310-05-001`
- `AZ-310-06-001`
- `AZ-310-07-001`
- `AZ-310-08-001`
- `AZ-310-09-001`
- `AZ-310-17-001`
- `AZ-310-18-001`
- `AZ-310-19-001`
- `AZ-310-20-001`
- `AZ-310-21-001`
- `AZ-310-22-001`
- `AZ-310-23-001`
- `AZ-310-24-001`
- `AZ-310-34-001`
- `AZ-310-35-001`
- `AZ-310-36-001`
- `AZ-310-37-001`
- `AZ-310-38-001`
- `AZ-310-39-001`
- `AZ-310-40-001`
- `AZ-310-41-001`
- `AZ-310-42-001`
- `AZ-310-43-001`
- `AZ-410-05-002`
- `AZ-410-05-003`
- `AZ-410-06-001`
- `AZ-410-06-002`
- `AZ-410-06-003`
- `AZ-410-07-001`
- `AZ-410-08-001`
- `AZ-410-09-001`
- `AZ-410-10-001`
- `AZ-410-11-001`
- `AZ-510-01-005`
