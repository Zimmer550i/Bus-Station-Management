document.getElementById('stations').addEventListener('click', () => fetchData('station'));
document.getElementById('buses').addEventListener('click', () => fetchData('bus'));
document.getElementById('routes').addEventListener('click', () => fetchData('route'));
document.getElementById('employees').addEventListener('click', () => fetchData('employee'));

const baseURL = 'http://localhost/';

async function fetchData(type) {
  let apiUrl = '';

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

  tableHeader.innerHTML = '';
  tableBody.innerHTML = '';

  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    tableHeader.appendChild(th);
  });
  tableHeader.appendChild(document.createElement('th')).textContent = "Modify";

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
      editData(headers, tr, type, editButton);
      console.log('Edit button clicked');
    };

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

  apiUrl = `${apiUrl}?id=${item[`${type}_id`]}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

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

async function editData(headers, tr, type, editButton) {
  let apiUrl = '';

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

  if (editButton.textContent === "Edit") {
    Array.from(tr.children).forEach((td, i) => {
      if (i > 0 && i < headers.length) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = td.textContent;
        td.textContent = '';
        td.appendChild(input);
      }
    });
    editButton.textContent = "Save";
  } else {
    let newData = {};

    Array.from(tr.children).forEach((td, i) => {
      if (i > 0 && i < headers.length) {
        const input = td.querySelector('input');
        if (input) {
          td.textContent = input.value;
          newData[headers[i]] = input.value;
        }
      } else if (i < headers.length) {
        newData[headers[i]] = td.textContent;
      }
    });

    editButton.textContent = "Edit";

    const jsonData = JSON.stringify(newData);

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData,
      });

      if (response.ok) {
        console.log(`Successfully edited ${type} with ID: ${newData[`${type}_id`]}`);
        fetchData(type);
      } else {
        console.error(`Failed to edit ${type}:`, await response.text());
      }
    } catch (error) {
      console.error('Error editing data:', error);
    }
  }
}