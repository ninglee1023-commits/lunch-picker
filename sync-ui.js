(function(){
  const byId=id=>document.getElementById(id);
  const key=week=>`aisg-lunch-picker-er-sha-${week}-luca-noah`;
  const snapshot=()=>Object.fromEntries(MENU_WEEKS.map(week=>[key(week.id),localStorage.getItem(key(week.id))]).filter(([,value])=>value!==null));
  function importChanges(){
    const changes=[];
    MENU_WEEKS.forEach(week=>{
      let saved;try{saved=JSON.parse(localStorage.getItem(key(week.id)))}catch{}
      if(!saved)return;
      for(const child of ['kid1','kid2'])for(const mealId of new Set([...(saved.picks?.[child]||[]),...Object.keys(saved.reviews?.[child]||{})])){
        if(!ALL_MENU_ITEMS.some(item=>item.id===mealId&&week.days.some(day=>day.date===item.date)))continue;
        const review=validReviews(saved.reviews?.[child])[mealId];
        changes.push(review?{week:week.id,kind:'pick',child,mealId,value:review.want,reviewed:true,stars:review.stars}:{week:week.id,kind:'pick',child,mealId,value:true});
      }
      if(saved.parentPick)changes.push({week:week.id,kind:'parent',value:saved.parentPick});
    });return changes;
  }
  function apply(changes){
    const updates=new Map();
    for(const change of changes){
      const week=MENU_WEEKS.find(week=>week.id===change.week);if(!week)continue;
      let saved=updates.get(week.id);
      if(!saved){try{saved=JSON.parse(localStorage.getItem(key(week.id)))}catch{};saved={...structuredClone(defaultState),...saved,picks:{kid1:[...(saved?.picks?.kid1||[])],kid2:[...(saved?.picks?.kid2||[])]},reviews:{kid1:validReviews(saved?.reviews?.kid1),kid2:validReviews(saved?.reviews?.kid2)}};updates.set(week.id,saved)}
      if(change.kind==='pick'&&['kid1','kid2'].includes(change.child)&&typeof change.value==='boolean'&&ALL_MENU_ITEMS.some(item=>item.id===change.mealId&&week.days.some(day=>day.date===item.date))){
        const picks=new Set(saved.picks[change.child]);if(change.value)picks.add(change.mealId);else picks.delete(change.mealId);saved.picks[change.child]=[...picks];
        if(change.reviewed===true&&(change.stars===null||Number.isInteger(change.stars)&&change.stars>=1&&change.stars<=5)){
          saved.reviews[change.child][change.mealId]={want:change.value,stars:change.value?change.stars:null};
        }else{delete saved.reviews[change.child][change.mealId]}
      }else if(change.kind==='parent'&&(change.value===null||typeof change.value==='string'&&change.value.length<200)){saved.parentPick=change.value}
    }
    let changed=false;
    for(const [week,saved]of updates){const serialized=JSON.stringify(saved);if(localStorage.getItem(key(week))!==serialized){localStorage.setItem(key(week),serialized);if(week===activeWeekId)changed=true}}
    // Keep the local view and speaking state while refreshing only the selected records.
    if(changed){const view=state.view;state=loadState();state.view=view;render()}
  }
  let inviteKey = null;
  let needsMerge = false;
  let joining = false;
  const controller=LunchFamilySync.create({endpoint:window.LUNCH_SYNC_ENDPOINT,weeks:MENU_WEEKS,snapshot,importChanges,apply,onStatus(message,info){
    byId('syncStatus').textContent=message;
    byId('syncStatus').dataset.connected=String(info.connected);
    byId('syncConnect').hidden=info.connected||!!inviteKey;byId('syncConnected').hidden=!info.connected;
    byId('syncPending').textContent=info.pending?`${info.pending} 項等候上傳`:info.lastSync?'更新時間：'+new Date(info.lastSync).toLocaleTimeString('zh-HK'):'';
  }});
  window.familySync=controller;
  // Used by app.js after a deliberate favorite / final-choice change.
  window.recordLunchChange=change=>controller.record(change);
  for(const change of window.pendingLunchChanges||[])controller.record(change);
  window.pendingLunchChanges=[];
  async function run(button,action){button.disabled=true;try{await action()}catch(error){byId('syncMessage').textContent=error.message}finally{button.disabled=false}}
  byId('syncCreate').addEventListener('click',event=>run(event.currentTarget,async()=>{byId('syncMessage').textContent='';await controller.connect(LunchSyncCrypto.createCode(),true)}));
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const input = document.createElement('textarea');
      input.value = text;
      input.readOnly = true;
      document.body.append(input);
      input.select();
      try {
        if (!document.execCommand('copy')) throw new Error('複製失敗，請再試一次。');
      } finally { input.remove(); }
    }
  }
  byId('syncCopyLink').addEventListener('click',()=>run(byId('syncCopyLink'),async()=>{
    const key = controller.getInviteKey();
    if (!key) return;
    const link = new URL(location.pathname, location.origin);
    link.hash = new URLSearchParams({ family: key }).toString();
    await copy(link.href);
    byId('syncMessage').textContent = '家庭專用連結已複製，請只分享給家人。';
  }));
  byId('syncNow').addEventListener('click',()=>void controller.sync());
  byId('syncDisconnect').addEventListener('click',()=>{
    byId('syncMessage').textContent = '';
    controller.disconnect();
  });
  byId('exportChoices').addEventListener('click',()=>{
    const blob=new Blob([JSON.stringify({format:'aisg-lunch-choices-v1',exportedAt:new Date().toISOString(),weeks:snapshot()},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='aisg-lunch-choices.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);
  });
  function showSyncPanel() {
    byId('appTools').open = true;
    byId('familySyncPanel').open = true;
  }

  async function joinFromLink() {
    if (!inviteKey || joining) return;
    joining = true;
    byId('syncJoin').hidden = true;
    byId('syncInviteHint').textContent = '正在連接家庭並同步…';
    byId('syncStatus').textContent = '正在連接家庭…';
    try {
      await controller.connect(inviteKey);
      inviteKey = null;
      byId('syncInvite').hidden = true;
      byId('syncMessage').textContent = '';
    } catch (error) {
      showSyncPanel();
      if (error.status === 404) {
        inviteKey = null;
        byId('syncInvite').hidden = true;
        byId('syncConnect').hidden = false;
        byId('syncMessage').textContent = error.message;
      } else {
        byId('syncInviteHint').textContent = navigator.onLine ? '家庭連結暫時無法連接，請再試一次。' : '離線中，請連線後完成家庭同步。';
        byId('syncJoin').textContent = '重試連接';
        byId('syncJoin').hidden = false;
      }
    } finally { joining = false; }
  }

  function handleInvite() {
    const params = new URLSearchParams(location.hash.slice(1));
    if (!params.has('family')) return;
    const incoming = params.get('family');
    // The fragment stays client-side and is cleared before any connection attempt.
    history.replaceState(history.state, '', location.pathname + location.search);
    if (joining) return;
    let key;
    try { key = LunchSyncCrypto.normalizeCode(incoming); }
    catch (error) {
      showSyncPanel();
      byId('syncMessage').textContent = error.message;
      return;
    }
    const currentKey = controller.getInviteKey();
    if (currentKey) {
      if (currentKey !== key) {
        showSyncPanel();
        byId('syncMessage').textContent = '這部裝置已連接另一個家庭，仍會與原家庭同步。';
      }
      return;
    }
    inviteKey = key;
    needsMerge = importChanges().length > 0;
    byId('syncMessage').textContent = '';
    byId('syncConnect').hidden = true;
    byId('syncInvite').hidden = false;
    if (needsMerge) {
      showSyncPanel();
      byId('syncInviteHint').textContent = '這部裝置已有選餐記錄。加入後，這些記錄會與家庭記錄合併。';
      byId('syncJoin').textContent = '合併本機記錄並同步';
      byId('syncJoin').hidden = false;
    } else {
      void joinFromLink();
    }
  }

  byId('syncJoin').addEventListener('click', () => void joinFromLink());
  window.addEventListener('hashchange', handleInvite);
  window.addEventListener('online', () => { if (!needsMerge) void joinFromLink(); });
  void controller.init();
  handleInvite();
})();
