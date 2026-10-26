(function(){
  const byId=id=>document.getElementById(id);
  const key=week=>`aisg-lunch-picker-er-sha-${week}-luca-noah`;
  const snapshot=()=>Object.fromEntries(MENU_WEEKS.map(week=>[key(week.id),localStorage.getItem(key(week.id))]).filter(([,value])=>value!==null));
  function importChanges(){
    const changes=[];
    MENU_WEEKS.forEach(week=>{
      let saved;try{saved=JSON.parse(localStorage.getItem(key(week.id)))}catch{}
      if(!saved)return;
      for(const child of ['kid1','kid2'])for(const mealId of new Set(saved.picks?.[child]||[])){
        if(ALL_MENU_ITEMS.some(item=>item.id===mealId&&week.days.some(day=>day.date===item.date)))changes.push({week:week.id,kind:'pick',child,mealId,value:true});
      }
      if(saved.parentPick)changes.push({week:week.id,kind:'parent',value:saved.parentPick});
    });return changes;
  }
  function apply(changes){
    const updates=new Map();
    for(const change of changes){
      const week=MENU_WEEKS.find(week=>week.id===change.week);if(!week)continue;
      let saved=updates.get(week.id);
      if(!saved){try{saved=JSON.parse(localStorage.getItem(key(week.id)))}catch{};saved={...structuredClone(defaultState),...saved,picks:{kid1:[...(saved?.picks?.kid1||[])],kid2:[...(saved?.picks?.kid2||[])]}};updates.set(week.id,saved)}
      if(change.kind==='pick'&&['kid1','kid2'].includes(change.child)&&typeof change.value==='boolean'&&ALL_MENU_ITEMS.some(item=>item.id===change.mealId&&week.days.some(day=>day.date===item.date))){
        const picks=new Set(saved.picks[change.child]);if(change.value)picks.add(change.mealId);else picks.delete(change.mealId);saved.picks[change.child]=[...picks];
      }else if(change.kind==='parent'&&(change.value===null||typeof change.value==='string'&&change.value.length<200)){saved.parentPick=change.value}
    }
    for(const [week,saved]of updates)localStorage.setItem(key(week),JSON.stringify(saved));
    // Keep the local view and speaking state while refreshing only the selected records.
    const view=state.view;state=loadState();state.view=view;render();
  }
  const controller=LunchFamilySync.create({endpoint:window.LUNCH_SYNC_ENDPOINT,weeks:MENU_WEEKS,snapshot,importChanges,apply,onStatus(message,info){
    byId('syncStatus').textContent=message;
    byId('syncStatus').dataset.connected=String(info.connected);
    byId('syncConnect').hidden=info.connected;byId('syncConnected').hidden=!info.connected;
    byId('familyCode').textContent=info.code;byId('syncPending').textContent=info.pending?`${info.pending} 項等候上傳`:info.lastSync?'更新時間：'+new Date(info.lastSync).toLocaleTimeString('zh-HK'):'';
  }});
  window.familySync=controller;
  // Used by app.js after a deliberate favorite / final-choice change.
  window.recordLunchChange=change=>controller.record(change);
  for(const change of window.pendingLunchChanges||[])controller.record(change);
  window.pendingLunchChanges=[];
  async function run(button,action){button.disabled=true;try{await action()}catch(error){byId('syncMessage').textContent=error.message}finally{button.disabled=false}}
  byId('syncCreate').addEventListener('click',event=>run(event.currentTarget,async()=>{byId('syncMessage').textContent='';await controller.connect(LunchSyncCrypto.createCode(),true)}));
  byId('syncJoinForm').addEventListener('submit',event=>{event.preventDefault();run(byId('syncJoin'),async()=>{byId('syncMessage').textContent='';await controller.connect(byId('syncCodeInput').value)})});
  const copy=async text=>{try{await navigator.clipboard.writeText(text)}catch{const input=document.createElement('textarea');input.value=text;document.body.append(input);input.select();document.execCommand('copy');input.remove()}};
  byId('syncCopyCode').addEventListener('click',()=>run(byId('syncCopyCode'),async()=>{await copy(controller.getCode());byId('syncMessage').textContent='家庭碼已複製。'}));
  byId('syncCopyLink').addEventListener('click',()=>run(byId('syncCopyLink'),async()=>{await copy(location.origin+location.pathname+'#family='+LunchSyncCrypto.normalizeCode(controller.getCode()));byId('syncMessage').textContent='連接連結已複製，請只分享給家人。'}));
  byId('syncNow').addEventListener('click',()=>void controller.sync());
  byId('syncDisconnect').addEventListener('click',()=>controller.disconnect());
  byId('exportChoices').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify({format:'aisg-lunch-choices-v1',exportedAt:new Date().toISOString(),weeks:snapshot()},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='aisg-lunch-choices.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
  });
  try{const params=new URLSearchParams(location.hash.slice(1)),family=params.get('family');if(family){byId('syncCodeInput').value=LunchSyncCrypto.displayCode(family);byId('familySyncPanel').open=true;history.replaceState(null,'',location.pathname+location.search)}}catch{}
  void controller.init();
})();
