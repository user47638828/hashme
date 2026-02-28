const C=document.getElementById("c");
const TO=document.getElementById("to");
const M=document.getElementById("m");
const X=document.getElementById("x");

X.onclick=async()=>{
 if(!TO.value||!M.value)return;
 await D.collection("msg").add({f:localStorage.getItem("i"),t:TO.value,m:M.value,ts:Date.now()});
 M.value="";
};

D.collection("msg").orderBy("ts").onSnapshot(s=>{
 C.innerHTML="";
 s.forEach(d=>{
  const o=d.data();
  if(o.f===localStorage.getItem("i")||o.t===localStorage.getItem("i")){
   const p=document.createElement("div");
   p.textContent=o.f+": "+o.m;
   C.appendChild(p);
  }
 });
});
