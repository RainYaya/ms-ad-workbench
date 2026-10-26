# ms-ad-runner（携带版）

公司机上解压到任意目录，与 node.exe 放一起（node.exe 可放本文件夹内）。

## 跑法
1. 双击 run.cmd（或命令行：run.cmd AZ-110-01-010）
2. 首跑需手动登录 SUT（runner 等菜单出现，最长 120 秒）
3. 証跡输出到 logs/<caseId>/

## 要求
- Edge（系统自带即可）
- node.exe（v20+）
- SUT 可访问 http://127.0.0.1:82/

## 参数
- `run.cmd` 默认 base URL: `http://127.0.0.1:82/mhkcmwa11/dummy.html`，并加 `--live`。
- 实际 SUT 的 `/AMB/AMA01.html` 会由 `url-map.mjs` 转成 `/mhkcmwa11/AMA01?gamid=AMA01&gamcd=AMA00` 这类路由。
- Mock 模式用 `node runner.mjs --case ... --base-url http://127.0.0.1:10090/`（不加 `--live`）。
- 更多见 `docs/URL-MAPPING.md`。
