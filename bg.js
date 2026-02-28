const c=document.getElementById("bg");
const x=c.getContext("2d");

let w,h,lines=[];

function resize(){
  w=c.width=window.innerWidth;
  h=c.height=window.innerHeight;
}
window.addEventListener("resize",resize);
resize();

for(let i=0;i<90;i++){
  lines.push({
    x:Math.random()*w,
    y:Math.random()*h,
    l:Math.random()*30+10,
    s:Math.random()*0.6+0.2
  });
}

function draw(){
  x.clearRect(0,0,w,h);
  x.strokeStyle="#0f0";
  x.lineWidth=0.4;

  for(const o of lines){
    x.beginPath();
    x.moveTo(o.x,o.y);
    x.lineTo(o.x+o.l,o.y);
    x.stroke();

    o.x+=o.s;
    if(o.x> w) o.x=-o.l;
  }

  requestAnimationFrame(draw);
}
draw();
