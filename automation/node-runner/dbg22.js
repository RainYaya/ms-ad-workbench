const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const p=await b.newPage();
const fails=[];
p.on('response',r=>{if(r.status()>=400)fails.push(r.status()+' '+r.url())});
await p.goto('http://127.0.0.1:10098/lego.html');
await p.waitForTimeout(1200);
console.log('404s:',fails);
await b.close();
})();
