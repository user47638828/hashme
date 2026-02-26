(async () => {
  const seed = sessionStorage.getItem("identitySeed");

  if (!seed) {
    document.body.innerHTML = "";
    return;
  }

  const identityHash = await hashSHA256("IDENTITY::" + seed);
  const connectHash = await hashSHA256("CONNECT::" + seed);

  const fingerprint =
    identityHash.slice(0, 8) + ":" +
    identityHash.slice(8, 16) + ":" +
    identityHash.slice(16, 24);

  const connectKey =
    "CK-" + connectHash.slice(0, 32);

  document.getElementById("identityFingerprint").textContent = fingerprint;
  document.getElementById("connectKey").textContent = connectKey;
})();
