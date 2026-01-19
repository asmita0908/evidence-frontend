document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('https://evidence-backend-uim6.onrender.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        // ✅ SAVE TOKEN (VERY IMPORTANT)
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        alert('Login successful!');
        window.location.href = 'dashboard.html';
      } else {
        alert(data.message || 'Invalid login credentials');
      }
    })
    .catch(error => {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    });
});
