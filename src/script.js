document.getElementById('stations').addEventListener('click', () => fetchData('station'));
document.getElementById('buses').addEventListener('click', () => fetchData('bus'));
document.getElementById('routes').addEventListener('click', () => fetchData('route'));
document.getElementById('employees').addEventListener('click', () => fetchData('employee'));

const baseURL = 'http://localhost/';

async function fetchData(type) {
  let apiUrl = '';

  // Select the API URL based on the button type clicked
  switch (type) {
    case 'station':
      apiUrl = `${baseURL}stations.php`;
      break;
    case 'bus':
      apiUrl = `${baseURL}buses.php`;
      break;
    case 'route':
      apiUrl = `${baseURL}routes.php`;
      break;
    case 'employee':
      apiUrl = `${baseURL}employees.php`;
      break;
    default:
      console.error('Invalid type');
      return;
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    createTable(data, type);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function createTable(data, type) {
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
      deleteData(item, type);
    };

    td.appendChild(editButton);
    td.appendChild(deleteButton);
    tr.appendChild(td);

    tableBody.appendChild(tr);
  });
}

async function deleteData(item, type) {
  let apiUrl = '';

  // Select the API URL based on the button type clicked
  switch (type) {
    case 'station':
      apiUrl = `${baseURL}stations.php`;
      break;
    case 'bus':
      apiUrl = `${baseURL}buses.php`;
      break;
    case 'route':
      apiUrl = `${baseURL}routes.php`;
      break;
    case 'employee':
      apiUrl = `${baseURL}employees.php`;
      break;
    default:
      console.error('Invalid type');
      return;
  }

  // Append the ID of the item to delete in the query string
  apiUrl = `${apiUrl}?id=${item[`${type}_id`]}`;

  try {
    // Make the DELETE request
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    // Check if deletion was successful
    if (response.ok) {
      console.log(`Successfully deleted ${type} with ID: ${item[`${type}_id`]}`);
      fetchData(type);
    } else {
      console.error(`Failed to delete ${type}:`, await response.text());
    }
  } catch (error) {
    console.error('Error deleting data:', error);
  }
}
