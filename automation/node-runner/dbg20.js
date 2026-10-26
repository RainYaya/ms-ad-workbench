const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const ctx=await b.newContext();
const p=await ctx.newPage();
await p.setViewportSize({width:1440,height:950});
await p.goto('http://127.0.0.1:10098/lego.html');
await p.waitForTimeout(1200);
const r=await p.evaluate(()=>({title:document.title,palette:document.querySelectorAll('.pal-block,.pblk').length,canvas:document.querySelectorAll('.cb-block,.cblk').length,btns:[...document.querySelectorAll('button')].map(b=>b.textContent.trim().slice(0,14)).slice(0,10)}));
console.log(JSON.stringify(r,null,1));
await p.screenshot({path:'../../review/ui-lego-current.png'});
await b.close();
})();
