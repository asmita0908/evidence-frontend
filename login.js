document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    // ❌ old res.ok check hata do
    if (!data.success) {
      alert(data.message || "Login failed");
      return;
    }

    // 🔐 2FA case
    if (data.require2FA) {
      localStorage.setItem("2fa_email", data.email);
      window.location.href = "2fa.html";
      return;
    }

    // ✅ token & role save
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // ✅ redirect
    window.location.href = "dashboard.html";

  } catch (err) {
    alert("Server error. Try again later.");
    console.error(err);
  }
});
