const C = document.getElementById("c");
const TO = document.getElementById("to");
const M = document.getElementById("m");
const X = document.getElementById("x");

const MY = localStorage.getItem("i");

/* Private Key laden */
async function prv(){
  const raw = atob(localStorage.getItem("sk"));
  const buf = Uint8Array.from(raw, c => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "pkcs8",
    buf,
    { name:"ECDH", namedCurve:"P-256" },
    false,
    ["deriveKey"]
  );
}

/* Nachricht senden */
X.onclick = async () => {
  const rid = TO.value.trim();
  const msg = M.value.trim();
  if(!rid || !msg) return;

  /* Empfänger-Public-Key holen */
  const rd = await D.collection("k").doc(rid).get();
  if(!rd.exists) return;

  const pub = await C256.imp(new Uint8Array(rd.data().p));
  const aes = await C256.aes(await prv(), pub);
  const enc = await C256.enc(aes, msg);

  /* Nachricht speichern */
  await D.collection("messages").add({
    f: MY,
    t: rid,
    p: enc,
    ts: Date.now()
  });

  M.value = "";
};

/* Nachrichten empfangen */
D.collection("messages")
 .orderBy("ts")
 .onSnapshot(async snap => {

  C.innerHTML = "";

  for(const doc of snap.docs){
    const o = doc.data();

    /* Nur relevante Nachrichten */
    if(o.f !== MY && o.t !== MY) continue;

    const other = (o.f === MY) ? o.t : o.f;

    /* Gegenüber-Public-Key */
    const rd = await D.collection("k").doc(other).get();
    if(!rd.exists) continue;

    const pub = await C256.imp(new Uint8Array(rd.data().p));
    const aes = await C256.aes(await prv(), pub);

    let text;
    try{
      text = await C256.dec(aes, o.p);
    }catch{
      text = "[decrypt failed]";
    }

    const div = document.createElement("div");
    div.textContent = o.f + ": " + text;
    C.appendChild(div);
  }
});
