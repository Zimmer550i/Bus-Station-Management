document.getElementById('stations').addEventListener('click', () => fetchData('stations'));
document.getElementById('buses').addEventListener('click', () => fetchData('buses'));
document.getElementById('routes').addEventListener('click', () => fetchData('routes'));
document.getElementById('employees').addEventListener('click', () => fetchData('employees'));

const baseURL = 'http://localhost/';

async function fetchData(type) {
  let apiUrl = '';

  // Select the API URL based on the button type clicked
  switch (type) {
    case 'stations':
      apiUrl = `${baseURL}stations.php`;
      break;
    case 'buses':
      apiUrl = `${baseURL}buses.php`;
      break;
    case 'routes':
      apiUrl = `${baseURL}routes.php`;
      break;
    case 'employees':
      apiUrl = `${baseURL}employees.php`;
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
  tableHeader.appendChild(document.createElement('th')).textContent = "Modify";

  // Create table rows dynamically
  data.forEach(item => {
    const tr = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = item[header];
      tr.appendChild(td);
    });
    const td = document.createElement('td');

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add('edit-btn');
    editButton.onclick = function () {
      console.log('Edit button clicked');
    };

    // Create the Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('delete-btn'); 
    deleteButton.onclick = function () {
      console.log('Delete button clicked');
    };

    td.appendChild(editButton);
    td.appendChild(deleteButton);
    tr.appendChild(td);

    tableBody.appendChild(tr);
  });
}
