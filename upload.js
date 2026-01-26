document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Login required");
    window.location.href = "index.html";
    return;
  }

  alert("Next step: Backend + Blockchain integration");
});
