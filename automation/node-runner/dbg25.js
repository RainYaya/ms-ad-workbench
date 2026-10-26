const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:10098/lego.html');
await p.waitForTimeout(1000);
// 点击两块 + 选中第一块触发右面板
await p.evaluate(()=>{document.querySelectorAll('.pal-block')[0].click()});
await p.evaluate(()=>{document.querySelectorAll('.pal-block')[5].click()});
await p.waitForTimeout(400);
await p.evaluate(()=>{document.querySelectorAll('.cb-block')[0].querySelector('.cb-head').click()});
await p.waitForTimeout(600);
const r=await p.evaluate(()=>({
  blocks:document.querySelectorAll('.cb-block').length,
  selected:!!document.querySelector('.cb-block.sel'),
  seRows:document.querySelectorAll('.se-row').length,
  rtabsOn:document.querySelector('.rtab.on')?.textContent||'none',
  pvAvailable:(()=>{const pb=[...document.querySelectorAll('.cb-block')][0];return pb?pb.textContent.includes('AZG'):'?'})(),
}));
console.log('STATE:',JSON.stringify(r));
console.log('errs:',errs.length?errs:'none');
await p.screenshot({path:'../../review/ui-lego-v2.png'});
await b.close();
})();
