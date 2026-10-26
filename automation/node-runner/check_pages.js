const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:8124/v2/lego.html');
await p.waitForTimeout(1200);
console.log('palette:',await p.locator('.pal-block').count());
await p.evaluate(()=>{[...document.querySelectorAll('.pal-block')].find(b=>b.textContent.includes('LIST-FILTER'))?.click()});
await p.evaluate(()=>{document.querySelectorAll('.cb-block')[0]?.querySelector('.cb-head').click()});
await p.evaluate(()=>{[...document.querySelectorAll('.rtab')].find(t=>t.textContent.includes('プレビュー'))?.click()});
await p.waitForTimeout(1500);
const pv=await p.evaluate(()=>{const f=document.getElementById('pvFrame');return {src:f.src.slice(-35),ok:(()=>{try{return f.contentDocument.body.innerHTML.length>100}catch(e){return false}})()}});
console.log('preview:',JSON.stringify(pv));
// 読込按钮测 blocks.json fetch
await p.evaluate(()=>{window.confirm=()=>true});
await p.evaluate(()=>{document.getElementById('btnLoad').click()});
await p.waitForTimeout(2000);
console.log('errors:',errs.length?errs:'none');
await b.close();
})();
