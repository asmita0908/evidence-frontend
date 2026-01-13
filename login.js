document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // ✅ URL ko quotes ('') mein band kiya gaya hai aur http:// protocol add kiya gaya hai
    fetch('https://evidence-backend-uim6.onrender.com', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
        // Response successful hai ya nahi, pehle check karo
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
      if (data.success) { // Assuming backend returns { success: true, ... }
        alert('Login successful! Redirecting...');
        window.location.href = 'dashboard.html';  // Redirect after login
      } else {
        alert('Login failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Agar connection ya server down ho toh yeh alert aayega
      alert('An error occurred. Check if the AWS server is running and port 5000 is open.');
    });
});