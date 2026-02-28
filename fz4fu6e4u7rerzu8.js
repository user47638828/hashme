firebase.initializeApp({
  apiKey:"AIzaSyDhF-31FZGTuNhQdI7UUQqG5mKRDe4VWLc",
  projectId:"hashme-dev-fbe21"
});
const D=firebase.firestore();

const S=(k,v)=>localStorage.setItem(k,v);
const G=k=>localStorage.getItem(k);

const H=async v=>{
  const e=new TextEncoder().encode(v);
  const r=await crypto.subtle.digest("SHA-256",e);
  return Array.from(new Uint8Array(r)).map(b=>b.toString(16).padStart(2,"0")).join("");
};
