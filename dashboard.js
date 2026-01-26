const userRoleEl = document.getElementById("userRole");
const adminPanel = document.getElementById("adminPanel");
const officerPanel = document.getElementById("officerPanel");
const viewerPanel = document.getElementById("viewerPanel");

if (userRoleEl) {
  userRoleEl.innerText = `Role: ${role}`;
}

if (adminPanel) adminPanel.style.display = "none";
if (officerPanel) officerPanel.style.display = "none";
if (viewerPanel) viewerPanel.style.display = "none";

if (role === "admin" && adminPanel) {
  adminPanel.style.display = "block";
}
else if (role === "officer" && officerPanel) {
  officerPanel.style.display = "block";
}
else if (role === "viewer" && viewerPanel) {
  viewerPanel.style.display = "block";
}
