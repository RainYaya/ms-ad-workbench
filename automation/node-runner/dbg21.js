const {chromium}=require('playwright-core');
(async()=>{
const b=await chromium.launch({headless:true,channel:'msedge'});
const p=await b.newPage();
const errs=[];
p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
p.on('console',m=>{if(m.type()==='error')errs.push('CONS '+m.text().slice(0,80))});
await p.goto('http://127.0.0.1:10098/lego.html');
await p.waitForTimeout(1500);
console.log('errors:',errs.slice(0,5));
await b.close();
})();
