const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:10098/lego.html');
await p.waitForTimeout(1000);
// 点击 AYG101 组（95 块的深水区）再选 AZG100 组块，测 preview iframe
await p.evaluate(()=>{document.querySelectorAll('.grp>summary').forEach(s=>s.click())});
await p.waitForTimeout(400);
await p.evaluate(()=>{[...document.querySelectorAll('.pal-block')].find(b=>b.textContent.includes('LIST-FILTER'))?.click()});
await p.evaluate(()=>{[...document.querySelectorAll('.pal-block')].find(b=>b.textContent.includes('INPUT-FILL'))?.click()});
await p.waitForTimeout(400);
await p.evaluate(()=>{document.querySelectorAll('.cb-block')[0]?.querySelector('.cb-head').click()});
await p.waitForTimeout(400);
await p.evaluate(()=>{[...document.querySelectorAll('.rtab')].find(t=>t.textContent.includes('プレビュー'))?.click()});
await p.waitForTimeout(1200);
const r=await p.evaluate(()=>({
  blocks:document.querySelectorAll('.cb-block').length,
  pvVisible:document.getElementById('pvFrame').style.display!=='none',
  pvSrc:document.getElementById('pvFrame').src.slice(-30),
  pvHint:document.getElementById('pvHint').textContent.slice(0,50),
}));
console.log('PREVIEW:',JSON.stringify(r));
await p.screenshot({path:'../../review/ui-lego-v2-preview.png'});
await b.close();
})();
