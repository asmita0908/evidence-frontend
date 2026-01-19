window.onload = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Please login first');
    window.location.href = 'index.html';
  }
};

function searchCases() {
  const query = document.getElementById('searchInput').value;

  fetch(`https://evidence-backend-uim6.onrender.com/api/cases/search?query=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('results');
      container.innerHTML = '';

      if (data.length === 0) {
        container.innerHTML = '<p>No cases found</p>';
        return;
      }

      data.forEach(c => {
        container.innerHTML += `
          <div style="border:1px solid black; margin:10px; padding:10px">
            <h4>Case No: ${c.caseNumber}</h4>
            <p>Place: ${c.place}</p>
            <p>Type: ${c.type}</p>
            <p>Criminal: ${c.criminalName || 'N/A'}</p>
            ${c.file
              ? `<a href="https://evidence-backend-uim6.onrender.com/uploads/${c.file}" target="_blank">View File</a>`
              : 'No File'}
          </div>
        `;
      });
    })
    .catch(err => {
      console.error(err);
      alert('Error fetching cases');
    });
}
