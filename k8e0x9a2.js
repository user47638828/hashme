document.addEventListener("DOMContentLoaded", async ()=>{
  const id = localStorage.getItem("i");
  if(!id){
    location.href="index.html";
    return;
  }

  // ID anzeigen
  const el = document.getElementById("i");
  if(el) el.textContent = id;

  // 🔑 Public-Key sicherstellen
  if(!localStorage.getItem("sk")){
    // Keypair erzeugen
    const kp = await C256.kp();

    // Private Key speichern
    const prv = await crypto.subtle.exportKey("pkcs8", kp.privateKey);
    localStorage.setItem(
      "sk",
      btoa(String.fromCharCode(...new Uint8Array(prv)))
    );

    // Public Key exportieren
    const pub = await C256.exp(kp.publicKey);

    // In Firestore hochladen
    await D.collection("k").doc(id).set({
      p: Array.from(new Uint8Array(pub))
    });
  }
});
