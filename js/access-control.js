alert("access-control loaded");

const seedInput = document.getElementById("seedInput");

seedInput.addEventListener("keydown", async (event) => {
  if (event.key !== "Enter") return;

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
});
