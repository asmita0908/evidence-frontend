const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "index.html";
}

const tableBody = document.getElementById("casesBody");
const searchInput = document.getElementById("searchAllInput");

let allCases = [];

// Fetch cases from backend
async function fetchCases() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/cases`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    allCases = await res.json();
    displayCases(allCases);

  } catch (err) {
    alert("Error loading cases");
    console.error(err);
  }
}

// Display cases in table
function displayCases(cases) {
  tableBody.innerHTML = "";

  if (cases.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8">No cases found</td></tr>`;
    return;
  }

  cases.forEach(c => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.caseNumber}</td>
      <td>${c.date}</td>
      <td>${c.time}</td>
      <td>${c.type}</td>
      <td>${c.place}</td>
      <td>${c.criminalName}</td>
      <td>${c.description}</td>
      <td>
        <a href="${API_BASE_URL}/${c.filePath}" target="_blank">View</a>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// 🔍 Search filter
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allCases.filter(c =>
    c.caseNumber.toLowerCase().includes(value) ||
    c.type.toLowerCase().includes(value) ||
    c.place.toLowerCase().includes(value) ||
    c.criminalName.toLowerCase().includes(value) ||
    c.description.toLowerCase().includes(value)
  );

  displayCases(filtered);
});

fetchCases();
