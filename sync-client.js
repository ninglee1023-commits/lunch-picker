(function (root) {
  const CONFIG_KEY='aisg-lunch-family-sync-v1';
  const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
  const write=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  function create(options) {
    let code=null,keys=null,busy=false,stopped=false,imported=false,lastSync=0,generation=0;
    try{code=LunchSyncCrypto.normalizeCode(read(CONFIG_KEY,{}).code)}catch{}
    const queueKey=value=>'aisg-lunch-sync-queue-v1:'+value;
    let queue=code?read(queueKey(code),[]):[];
    let timer=null;
    const status=message=>{options.onStatus(message,{connected:!!code,pending:queue.length,code:code?LunchSyncCrypto.displayCode(code):'',lastSync})};
    function persist(){if(code)write(queueKey(code),queue)}
    function record(change,mode='set') {
      if(!code)return;
      queue.push({id:crypto.randomUUID(),change,mode});
      try{persist()}catch{status('本機儲存空間不足，請先匯出記錄。');return}
      status(navigator.onLine?'正在同步…':'離線：改動已保存在本機，連線後上傳。');
      clearTimeout(timer);timer=setTimeout(()=>void sync(),250);
    }
    function backup() {
      const key='aisg-lunch-before-family-sync-v4';
      if(!localStorage.getItem(key))write(key,{savedAt:new Date().toISOString(),values:options.snapshot()});
    }
    async function importLocal(snapshot) {
      const marker='aisg-lunch-sync-imported-v1:'+code;
      if(localStorage.getItem(marker))return;
      backup();
      if(!snapshot?.entries)snapshot=await request('/api/family');
      const existing=new Map();
      const field=change=>change.week+'|'+(change.kind==='pick'?`pick:${change.child}:${change.mealId}`:'parent');
      for(const entry of snapshot.entries){const change=await keys.decrypt(entry);existing.set(field(change),change)}
      const changes=options.importChanges();
      // A joining device may still hold legacy favorites without star reviews.
      // Fill missing fields, but never let that stale import replace a synced rating or rejection.
      // A deliberate local review can upgrade a legacy cloud favorite that has no review yet.
      for(const change of changes){
        const previous=existing.get(field(change));
        const upgrade=change.kind==='pick'&&change.reviewed===true&&previous&&previous.reviewed===undefined&&previous.value===true;
        queue.push({id:crypto.randomUUID(),change,mode:upgrade?'set':'if-empty'});
      }
      persist();localStorage.setItem(marker,'1');imported=true;
    }
    async function request(path,method='GET',body) {
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
      try{
        const response=await fetch(options.endpoint+path,{method,cache:'no-store',headers:{Authorization:'Bearer '+keys.token,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:controller.signal});
        if(!response.ok){const error=new Error(response.status===404?'找不到這個家庭碼，請檢查後再試。':response.status===429?'同步服務忙碌，稍後會重試。':'同步暫時未能完成，改動仍保存在本機。');error.status=response.status;throw error}
        return response.json();
      }finally{clearTimeout(timeout)}
    }
    async function apply(snapshot) {
      const changes=[];
      for(const entry of snapshot.entries||[])changes.push(await keys.decrypt(entry));
      // Local unsent edits overlay server state, so polling cannot undo a recent tap.
      for(const pending of queue)changes.push(pending.change);
      options.apply(changes);
    }
    async function sync() {
      if(!code||!keys||busy||stopped)return;
      if(!navigator.onLine){status('離線：改動已保存在本機，連線後上傳。');return}
      busy=true;status(queue.length?'正在同步…':'正在檢查更新…');
      const currentGeneration=generation;
      try{
        let snapshot=null,batches=0;
        while(queue.length&&batches++<20){
          const batch=queue.slice(0,20),operations=[];
          for(const pending of batch){
            if(!pending.encrypted){pending.encrypted=await keys.encrypt(pending.change,pending.mode);pending.encrypted.id=pending.id}
            operations.push(pending.encrypted);
          }
          persist();snapshot=await request('/api/sync','POST',{operations});
          if(currentGeneration!==generation)return;
          const acknowledged=new Set(snapshot.acknowledged||[]);
          if(!acknowledged.size)throw new Error('同步尚未確認，改動保留在本機等候重試。');
          queue=queue.filter(item=>!acknowledged.has(item.id));persist();
        }
        if(!snapshot)snapshot=await request('/api/family');
        if(currentGeneration!==generation)return;
        await apply(snapshot);lastSync=Date.now();
        status(queue.length?'仍有改動等候同步…':imported?'已同步，並已合併本機喜好。':'已同步');imported=false;
      }catch(error){if(currentGeneration===generation)status(error.name==='AbortError'?'連線逾時：改動保留在本機，稍後重試。':error.message||'同步失敗，改動仍保存在本機。')}
      finally{busy=false}
    }
    async function connect(input,makeNew=false) {
      if(busy)throw new Error('正在同步，請稍後再試。');
      const nextCode=LunchSyncCrypto.normalizeCode(input),nextKeys=await LunchSyncCrypto.open(nextCode);
      const previous={code,keys,queue};code=nextCode;keys=nextKeys;queue=read(queueKey(code),[]);busy=true;
      try{
        backup();
        const snapshot=await request('/api/family',makeNew?'POST':'GET');
        write(CONFIG_KEY,{code,joinedAt:new Date().toISOString()});
        await importLocal(snapshot);stopped=false;status('已連接家庭，正在合併本機記錄…');
      }catch(error){({code,keys,queue}=previous);status(code?'已保留原有同步連接。':'尚未啟用同步；本機選擇保留。');throw error}
      finally{busy=false}
      await sync();
    }
    async function init() {
      if(code){try{keys=await LunchSyncCrypto.open(code);await importLocal();void sync()}catch(error){status('同步未能啟動：'+error.message)}}
      else status('只儲存在這部裝置，尚未啟用同步。');
    }
    function disconnect(){generation++;stopped=true;code=null;keys=null;queue=[];localStorage.removeItem(CONFIG_KEY);status('已中斷同步；本機選擇保留。')}
    const poll=setInterval(()=>{if(document.visibilityState!=='hidden')void sync()},5000);
    window.addEventListener('online',()=>void sync());
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')void sync()});
    window.addEventListener('pagehide',()=>clearTimeout(timer));
    return {init,record,sync,connect,disconnect,getCode:()=>code?LunchSyncCrypto.displayCode(code):'',close:()=>{clearInterval(poll);clearTimeout(timer);stopped=true}};
  }
  root.LunchFamilySync={create};
})(globalThis);
