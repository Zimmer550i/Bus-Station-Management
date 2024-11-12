document.getElementById('stations').addEventListener('click', () => fetchData('stations'));
document.getElementById('busses').addEventListener('click', () => fetchData('busses'));
document.getElementById('routes').addEventListener('click', () => fetchData('routes'));
document.getElementById('employees').addEventListener('click', () => fetchData('employees'));

async function fetchData(type) {
  let apiUrl = '';

  // Select the API URL based on the button type clicked
  switch (type) {
    case 'stations':
      apiUrl = 'http://localhost/stations.php';
      break;
    case 'busses':
      apiUrl = 'http://localhost/busses.php';
      break;
    case 'routes':
      apiUrl = 'http://localhost/routes.php';
      break;
    case 'employees':
      apiUrl = 'http://localhost/employees.php';
      break;
    default:
      console.error('Invalid type');
      return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    createTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function createTable(data) {
  const tableHeader = document.getElementById('tableHeader');
  const tableBody = document.getElementById('tableBody');

  // Clear any existing table data
  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  // Create table headers dynamically from object keys
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    tableHeader.appendChild(th);
  });

  // Create table rows dynamically
  data.forEach(item => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = item[header];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}
