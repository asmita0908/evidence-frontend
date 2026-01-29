document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // ✅ token save
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);

    // ✅ redirect
    window.location.href = "dashboard.html";

  } catch (err) {
    alert("Server error. Try again later.");
    console.error(err);
  }
});
