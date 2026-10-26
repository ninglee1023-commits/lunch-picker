(function (root) {
  const encoder=new TextEncoder(), decoder=new TextDecoder();
  const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
  const digest=async text=>hex(await crypto.subtle.digest('SHA-256',encoder.encode(text)));
  const base64=bytes=>btoa(String.fromCharCode(...bytes)).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'');
  const unbase64=text=>Uint8Array.from(atob(text.replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));
  function normalizeCode(code) {
    const value=String(code||'').toUpperCase().replace(/[\s-]/g,'');
    if(value.length!==24||Array.from(value).some(c=>!alphabet.includes(c)))throw new Error('請輸入完整的 24 字元家庭碼。');
    return value;
  }
  function createCode(){return Array.from(crypto.getRandomValues(new Uint8Array(24)),b=>alphabet[b&31]).join('');}
  function displayCode(code){return normalizeCode(code).match(/.{4}/g).join('-');}
  async function open(code) {
    code=normalizeCode(code);
    const source=await crypto.subtle.importKey('raw',encoder.encode(code),'HKDF',false,['deriveKey']);
    const derive=(info,algorithm,uses)=>crypto.subtle.deriveKey({name:'HKDF',hash:'SHA-256',salt:encoder.encode('AISG Lunch Family Sync v1'),info:encoder.encode(info)},source,algorithm,false,uses);
    const encryptionKey=await derive('encryption',{name:'AES-GCM',length:256},['encrypt','decrypt']);
    const indexKey=await derive('index',{name:'HMAC',hash:'SHA-256',length:256},['sign']);
    const token=await digest('AISG Lunch Sync auth:'+code);
    const entryKey=async value=>hex(await crypto.subtle.sign('HMAC',indexKey,encoder.encode(value)));
    return {
      token,
      async encrypt(change,mode='set'){
        const index=await entryKey(change.week+'|'+(change.kind==='pick'?`pick:${change.child}:${change.mealId}`:'parentPick'));
        const iv=crypto.getRandomValues(new Uint8Array(12));
        const encrypted=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode(index)},encryptionKey,encoder.encode(JSON.stringify(change))));
        const bytes=new Uint8Array(iv.length+encrypted.length);bytes.set(iv);bytes.set(encrypted,iv.length);
        return {id:crypto.randomUUID(),entryKey:index,payload:base64(bytes),mode};
      },
      async decrypt(entry){
        const bytes=unbase64(entry.payload);
        const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes.slice(0,12),additionalData:encoder.encode(entry.entry_key||entry.entryKey)},encryptionKey,bytes.slice(12));
        const value=JSON.parse(decoder.decode(plain));
        const expected=await entryKey(value.week+'|'+(value.kind==='pick'?`pick:${value.child}:${value.mealId}`:'parentPick'));
        if(expected!==(entry.entry_key||entry.entryKey))throw new Error('家庭記錄驗證失敗');
        return value;
      }
    };
  }
  root.LunchSyncCrypto={open,createCode,displayCode,normalizeCode};
})(globalThis);
