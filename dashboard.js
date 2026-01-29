// ROLE LOGIC
const roleSelect = document.getElementById("userRoleSelect");
const adminPanel = document.getElementById("adminPanel");

function handleRole() {
  adminPanel.style.display = roleSelect.value === "admin" ? "block" : "none";
}

roleSelect.addEventListener("change", handleRole);
handleRole();


// UPLOAD LOGIC
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("evidenceFile");
const uploadMsg = document.getElementById("uploadMsg");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    uploadMsg.innerText = "Please select a file";
    return;
  }

  const formData = new FormData();
  formData.append("evidence", file);

  try {
    const res = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    uploadMsg.innerText = data.message;
  } catch (err) {
    uploadMsg.innerText = "Upload failed";
  }
});
