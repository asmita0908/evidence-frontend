document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Signup successful 🎉");
      window.location.href = "index.html"; // login page
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (error) {
    console.error(error);
    alert("Server error");
  }
});
