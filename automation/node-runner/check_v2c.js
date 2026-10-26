const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:8124/v2/lego.html');
await p.waitForTimeout(1500);
console.log('palette blocks:',await p.locator('.pal-block').count());
// 用 evaluate 直接点击绕过 visibility 判定
await p.evaluate(()=>{document.querySelectorAll('.pal-block')[0]?.click()});
await p.evaluate(()=>{document.querySelectorAll('.pal-block')[5]?.click()});
await p.evaluate(()=>{document.querySelectorAll('.pal-block')[10]?.click()});
await p.waitForTimeout(400);
console.log('canvas blocks:',await p.locator('.cb-block').count());
await p.evaluate(()=>{document.querySelector('.cb-block')?.querySelector('.cb-head')?.click()});
await p.waitForTimeout(300);
console.log('se-rows:',await p.locator('.se-row').count());
console.log('errors:',errs.length?errs:'none');
await p.screenshot({path:'D:/Code/ms-ad/review/ui-lego-v2-final.png',fullPage:false});
await b.close();
})().catch(e=>{console.log('FATAL',e.message.slice(0,120));process.exit(1)});
