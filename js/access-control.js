const seedInput = document.getElementById("seedInput");

const attemptAccess = async () => {
  const seed = seedInput.value.trim();
  if (!seed) return;

  const seedHash = await hashSHA256(seed);
  const accessGranted = await Backend.verifySeed(seedHash);

  if (accessGranted) {
    sessionStorage.setItem("identitySeed", seed);
    window.location.href = "terminal.html";
  } else {
    document.body.innerHTML = "";
  }
};

seedInput.addEventListener("change", attemptAccess);
seedInput.addEventListener("keydown", e => {
  if (e.key === "Enter") attemptAccess();
});
