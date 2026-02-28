document.addEventListener("DOMContentLoaded",()=>{

  const K=document.getElementById("k");
  const B=document.getElementById("e");
  const Sx=document.getElementById("s");

  B.onclick=async()=>{
    Sx.textContent="...";

    try{
      // 1️⃣ Basis-Check
      if(typeof firebase==="undefined") throw "firebase missing";
      if(typeof D==="undefined") throw "firestore missing";

      const v=K.value.trim();
      if(v.length<10){
        Sx.textContent="x";
        return;
      }

      // 2️⃣ TEMP-FIX: Klartext-Key
      const h=v;

      // 3️⃣ Firestore Test
      let d;
      try{
        d = await D.collection("keys").doc(h).get();
      }catch(e){
        throw "firestore get failed";
      }

      if(!d || !d.exists){
        Sx.textContent="x";
        return;
      }

      const o=d.data();
      if(!o || !o.i || !o.v){
        throw "invalid key document";
      }

      if(Date.now()>o.v){
        Sx.textContent="x";
        return;
      }

      // 4️⃣ Session setzen
      localStorage.setItem("i",o.i);

      // 5️⃣ Crypto init (optional, aber abgesichert)
      if(!localStorage.getItem("sk")){
        if(typeof C256==="undefined") throw "crypto missing";

        const kp=await C256.kp();
        const pub=await C256.exp(kp.publicKey);
        const prv=await crypto.subtle.exportKey("pkcs8",kp.privateKey);
        localStorage.setItem("sk",
          btoa(String.fromCharCode(...new Uint8Array(prv)))
        );

        await D.collection("k").doc(o.i)
          .set({p:Array.from(new Uint8Array(pub))},{merge:true});
      }

      // 6️⃣ Weiterleitung
      location.href="a94f0e2c8b7d1.html";

    }catch(e){
      // 🔥 JETZT siehst du den echten Fehler
      Sx.textContent = String(e);
    }
  };

});
