from pathlib import Path
import json,sys
sys.stdout.reconfigure(encoding='utf-8')
logs=Path('D:/Code/ms-ad/logs')
cases=sorted(set(p.parent.name for p in logs.glob('*/ *-trace.json') ) )
# glob pattern typo-safe: direct scan
cases=sorted({p.parent.name for p in logs.glob('*/*.json') if p.name.endswith('-trace.json')})
# trace-index.json 放在 logs/ 下，路径对 monitor.html 可达
(json.dumps({'generatedAt':'2026-10-25','cases':cases}))
Path('D:/Code/ms-ad/logs/trace-index.json').write_text(json.dumps({'generatedAt':'2026-10-25','cases':cases},ensure_ascii=False,indent=1),encoding='utf-8')
print('trace-index:',len(cases),'cases')
