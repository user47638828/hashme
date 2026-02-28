document.addEventListener("DOMContentLoaded",()=>{
  const id = localStorage.getItem("i");
  if(!id){
    location.href="index.html";
    return;
  }

  const el = document.getElementById("i");
  if(el) el.textContent = id;
});
