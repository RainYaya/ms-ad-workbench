const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:10098/lego.html');
await p.waitForTimeout(1200);
await p.locator('.pal-block').first().click();
await p.locator('.pal-block').nth(5).click();
await p.waitForTimeout(600);
const r=await p.evaluate(()=>({blocks:document.querySelectorAll('.cb-block').length,sel:!!document.querySelector('.cb-block.sel'),rtabs:document.querySelectorAll('.rtab').length,seRows:document.querySelectorAll('.se-row').length,pvFrame:!!document.getElementById('pvFrame')}));
console.log('STATE:',JSON.stringify(r));
console.log('errs:',errs.length?errs:'none');
await p.screenshot({path:'../../review/ui-lego-v2.png'});
await b.close();
})();
