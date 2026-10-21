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

// Reward and stock rules, including exact deadline and late return.
storage.clear();app=boot();
assert.equal(app.read('points'),0);assert.equal(app.read('availableMachines()'),2);
app.click('start');app.click('borrow');
assert.equal(app.read('availableMachines()'),1,'last clean container removes machine from borrowing count');
app.click('start');app.click('simulate');assert.equal(app.read('points'),0,'scan gives no points');
app.click('deposit');assert.equal(app.read('points'),10);
assert.equal(app.read('stations[0].clean'),0,'dirty return cannot become clean stock');
assert.equal(app.read('stations[0].returned'),1);
app.click('deposit');assert.equal(app.read('points'),10,'duplicate return cannot award twice');
app=boot();assert.equal(app.read('points'),10);assert.equal(app.read('availableMachines()'),1);
assert.equal(app.read('onTime(0,RETURN_WINDOW_MS)'),true);
assert.equal(app.read('onTime(0,RETURN_WINDOW_MS+1)'),false);
app.click('start');app.click('borrow');app.read('loan.borrowedAt=Date.now()-RETURN_WINDOW_MS-1000');
app.click('start');app.click('simulate');app.click('deposit');
assert.equal(app.read('receipt.earned'),0);assert.equal(app.read('points'),10,'late return keeps existing points');
app.read('stations.forEach(s=>s.clean=0)');app.click('start');app.click('borrow');
assert.equal(app.read('loan'),null);assert.equal(app.read('availableMachines()'),0);
assert.ok(app.read('borrow().includes("No machines have clean containers")'));
console.log('PASS: on-time rewards, deadline boundary, late returns, no duplicate points, persistence, inventory and empty-stock blocking.');

storage.clear();app=boot();
for(let i=0;i<2;i++){app.click('start');app.click('borrow');app.click('start');app.click('simulate');app.click('deposit')}
assert.equal(app.read('points'),20,'two on-time returns accumulate points');
assert.equal(boot().read('points'),20,'accumulated points survive reload');
console.log('PASS: repeated on-time returns accumulate 20 points.');
