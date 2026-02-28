if(!localStorage.getItem("i")){
 location.href="index.html";
}else{
 const el=document.getElementById("i");
 if(el)el.textContent=localStorage.getItem("i");
}
