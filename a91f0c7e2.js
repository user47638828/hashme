document.addEventListener("DOMContentLoaded",()=>{

  const K=document.getElementById("k");
  const B=document.getElementById("e");
  const Sx=document.getElementById("s");

  B.onclick=async()=>{
    Sx.textContent="...";

    try{
      const v=K.value.trim();
      if(v.length<10){
        Sx.textContent="x";
        return;
      }

      const h=v;

      const p=D.collection("keys").doc(h).get();
      const d=await Promise.race([
        p,
        new Promise((_,r)=>setTimeout(()=>r("timeout"),8000))
      ]);

      if(d==="timeout"){ Sx.textContent="net"; return; }
      if(!d.exists){ Sx.textContent="x"; return; }

      const o=d.data();
      if(Date.now()>o.v){ Sx.textContent="x"; return; }

      S("i",o.i);

      if(!G("sk")){
        const kp=await C256.kp();
        const pub=await C256.exp(kp.publicKey);
        const prv=await crypto.subtle.exportKey("pkcs8",kp.privateKey);
        S("sk",btoa(String.fromCharCode(...new Uint8Array(prv))));
        await D.collection("k").doc(o.i)
          .set({p:Array.from(new Uint8Array(pub))},{merge:true});
      }

      location.href="a94f0e2c8b7d1.html";

    }catch(e){
      Sx.textContent="err";
    }
  };

});
