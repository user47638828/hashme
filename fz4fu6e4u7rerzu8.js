const F={apiKey:"DEIN_KEY",projectId:"DEIN_PROJEKT"};
firebase.initializeApp(F);
const D=firebase.firestore();
const E=t=>new TextEncoder().encode(t);
const H=async v=>{
 const r=await crypto.subtle.digest("SHA-256",E(v));
 return Array.from(new Uint8Array(r)).map(b=>b.toString(16).padStart(2,"0")).join("");
};
const S=(k,v)=>localStorage.setItem(k,v);
const G=k=>localStorage.getItem(k);
