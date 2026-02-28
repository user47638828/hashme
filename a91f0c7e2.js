const K=document.getElementById("k");
const B=document.getElementById("e");
const Sx=document.getElementById("s");

B.onclick=async()=>{
 const v=K.value.trim();
 if(v.length<10){Sx.textContent="x";return}
 const h=await H(v);
 const d=await D.collection("keys").doc(h).get();
 if(!d.exists){Sx.textContent="x";return}
 const o=d.data();
 if(Date.now()>o.v){Sx.textContent="x";return}
 S("i",o.i);
 location.href="a94f0e2c8b7d1.html";
};
