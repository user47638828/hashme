const C256={
  async kp(){return crypto.subtle.generateKey({name:"ECDH",namedCurve:"P-256"},true,["deriveKey"])},
  async exp(k){return crypto.subtle.exportKey("raw",k)},
  async imp(b){return crypto.subtle.importKey("raw",b,{name:"ECDH",namedCurve:"P-256"},true,[])},
  async aes(pr,pb){return crypto.subtle.deriveKey({name:"ECDH",public:pb},pr,{name:"AES-GCM",length:256},false,["encrypt","decrypt"])},
  async enc(a,m){
    const iv=crypto.getRandomValues(new Uint8Array(12));
    const c=await crypto.subtle.encrypt({name:"AES-GCM",iv},a,new TextEncoder().encode(m));
    return {iv:Array.from(iv),c:Array.from(new Uint8Array(c))}
  },
  async dec(a,o){
    const p=await crypto.subtle.decrypt({name:"AES-GCM",iv:new Uint8Array(o.iv)},a,new Uint8Array(o.c));
    return new TextDecoder().decode(p)
  }
};
