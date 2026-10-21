const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const script=readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const storage=new Map();
function boot(){
 const handlers={}, elements=new Map();
 const context=vm.createContext({Date,JSON,Number,Math,setInterval:()=>0,sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},window:{scrollTo(){}},document:{getElementById(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',focus(){},setAttribute(){}});return elements.get(id)},addEventListener:(event,fn)=>handlers[event]=fn}});
 vm.runInContext(script,context);
 return {read:code=>vm.runInContext(code,context),click(action){handlers.click({target:{closest:()=>({dataset:{action},disabled:false})}})}};
}
let app=boot();
assert.equal(app.read('loan'),null);
app.click('deposit');assert.equal(app.read('loan'),null);
app.click('start');app.click('borrow');
const start=app.read('loan.borrowedAt');assert.ok(start);
app.click('start');app.click('borrow');assert.equal(app.read('loan.borrowedAt'),start,'duplicate borrow must preserve loan');
app=boot();assert.equal(app.read('loan.borrowedAt'),start,'reload preserves timestamp');
app.click('start');app.click('deposit');assert.ok(app.read('loan'),'deposit before identification cannot clear loan');
app.click('simulate');assert.ok(app.read('loan'),'scan alone does not close loan');
app.click('deposit');assert.equal(app.read('loan'),null);
const held=app.read('receipt.durationMs');assert.ok(held>=0);
app.click('deposit');assert.equal(app.read('receipt.durationMs'),held,'duplicate return is ignored');
assert.equal(boot().read('loan'),null,'returned loan stays cleared after reload');
app.click('start');app.click('borrow');assert.ok(app.read('loan'),'new loan allowed after completed return');
assert.equal(app.read('duration(3661000)'),'1h 1m 1s');
console.log('PASS: empty start, single-loan guard, reload, scan/deposit separation, duplicate return, reborrow and duration.');
