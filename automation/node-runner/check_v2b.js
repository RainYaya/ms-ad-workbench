const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:8124/v2/lego.html');
await p.waitForTimeout(1200);
await p.locator('.pal-block').first().click();
await p.locator('.pal-block').nth(5).click();
await p.locator('.pal-block').nth(10).click();
await p.waitForTimeout(400);
console.log('canvas blocks:',await p.locator('.cb-block').count());
// 点第2块的 head 选中
await p.locator('.cb-block').nth(1).locator('.cb-head').click();
await p.waitForTimeout(300);
// 切到パラメータ tab
await p.locator('.rtab[data-rt="params"]').click();
await p.waitForTimeout(300);
console.log('params fields:',await p.locator('.pf').count());
// 切到プレビュー tab
await p.locator('.rtab[data-rt="preview"]').click();
await p.waitForTimeout(1500);
console.log('preview visible:',await p.locator('#pvFrame').isVisible());
// 回ステップ tab
await p.locator('.rtab[data-rt="steps"]').click();
await p.waitForTimeout(300);
console.log('se-rows:',await p.locator('.se-row').count());
console.log('errors:',errs.length?errs:'none');
await p.screenshot({path:'D:/Code/ms-ad/review/ui-lego-v2-final.png',fullPage:false});
await b.close();
})().catch(e=>{console.log('FATAL',e.message.slice(0,120));process.exit(1)});
