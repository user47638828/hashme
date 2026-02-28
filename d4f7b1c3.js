const C=document.getElementById("c");
const TO=document.getElementById("to");
const M=document.getElementById("m");
const X=document.getElementById("x");

async function prv(){
  const r=Uint8Array.from(atob(G("sk")),c=>c.charCodeAt(0));
  return crypto.subtle.importKey("pkcs8",r,{name:"ECDH",namedCurve:"P-256"},false,["deriveKey"])
}

X.onclick=async()=>{
  const rid=TO.value.trim(), msg=M.value.trim();
  if(!rid||!msg) return;
  const rd=await D.collection("k").doc(rid).get();
  if(!rd.exists) return;
  const pb=await C256.imp(new Uint8Array(rd.data().p));
  const a=await C256.aes(await prv(),pb);
  const p=await C256.enc(a,msg);
  await D.collection("m").add({f:G("i"),t:rid,p,ts:Date.now()});
  M.value="";
};

D.collection("m").orderBy("ts").onSnapshot(async s=>{
  C.innerHTML="";
  for(const d of s.docs){
    const o=d.data();
    if(o.t===G("i")){
      const sd=await D.collection("k").doc(o.f).get();
      if(!sd.exists) continue;
      const pb=await C256.imp(new Uint8Array(sd.data().p));
      const a=await C256.aes(await prv(),pb);
      const txt=await C256.dec(a,o.p);
      const div=document.createElement("div");
      div.textContent=o.f+": "+txt;
      C.appendChild(div);
    }
  }
});
