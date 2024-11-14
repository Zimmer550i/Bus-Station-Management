document.getElementById('stations').addEventListener('click', () => fetchData('station'));
document.getElementById('buses').addEventListener('click', () => fetchData('bus'));
document.getElementById('routes').addEventListener('click', () => fetchData('route'));
document.getElementById('employees').addEventListener('click', () => fetchData('employee'));

const baseURL = 'http://localhost/';

function getApiUrl(type) {
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

  return apiUrl;
}

async function fetchData(type) {
  try {
    const response = await fetch(getApiUrl(type));
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

  // Create Table Header
  const headers = Object.keys(data[0]);
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
    tableHeader.appendChild(th);
  });
  tableHeader.appendChild(document.createElement('th')).textContent = "Modify";

  // Create Table Body
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

  // Add Button
  const container = document.getElementById("mainContainer");
  let buttonContainer = document.getElementById("buttonContainer");

  if (!buttonContainer) {
    buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";
    container.appendChild(buttonContainer);
  }

  buttonContainer.textContent = '';

  const addButton = document.createElement("button");
  addButton.textContent = `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  addButton.classList.add("add-btn");
  addButton.onclick = () => {
    addData(type, headers, tableBody);
  };

  buttonContainer.appendChild(addButton);
}

async function deleteData(item, type) {
  apiUrl = `${getApiUrl(type)}?id=${item[`${type}_id`]}`;

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
      const response = await fetch(getApiUrl(type), {
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

async function addData(type, headers, tableBody) {
  let tr = document.createElement('tr');

  let newData = {};

  headers.forEach((e, i) => {
    let td = document.createElement('td');
    let input = document.createElement('input');
    input.type = 'text';
    if (i == 0) {
      td.textContent = "Auto Assigned";
    } else {
      td.textContent = '';
      td.appendChild(input);
    }

    tr.appendChild(td);
  });

  let saveButton = document.createElement('button');
  saveButton.textContent = "Save";
  saveButton.onclick = async () => {
    Array.from(tr.children).forEach((e, i) => {
      if (i > 0 && i <= headers.length) {
        let temp = e.querySelector('input');
        if (temp) {
          newData[headers[i]] = temp.value;
        }
      }
    });

    const jsonData = JSON.stringify(newData);

    try {
      const response = await fetch(getApiUrl(type), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonData,
      });

      if (response.ok) {
        console.log(`Successfully added ${type}`);
        fetchData(type);
      } else {
        console.error(`Failed to add ${type}:`, await response.text());
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  tr.appendChild(saveButton);

  tableBody.appendChild(tr);
}
