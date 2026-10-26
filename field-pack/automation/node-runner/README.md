# ms-ad-runner（携带版）

公司机上解压到任意目录，与 node.exe 放一起（node.exe 可放本文件夹内）。

## 跑法
1. 双击 run.cmd（或命令行：run.cmd AZ-110-01-010）
2. 首跑需手动登录 SUT（runner 等菜单出现，最长 120 秒）
3. 証跡输出到 logs/<caseId>/

## 要求
- Edge（系统自带即可）
- node.exe（v20+）
- SUT 可访问 http://127.0.0.1:10081/

## 参数
- base-url 默认 http://127.0.0.1:10081/mhkcmwa11/dummy.html，改的话编辑 run.cmd
