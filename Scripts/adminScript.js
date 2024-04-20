'use strict';

const url = 'http://localhost:3000/v1';
const adminOrdersButton = document.querySelector('#adminOrdersButton');
const adminUsersButton = document.querySelector('#adminUsersButton');
const adminDeliverOrder = document.querySelector('#adminDeliverOrder');

let ordersCreated = false;
let usersCreated = false;
let deliveryCreated = false;

adminOrdersButton.addEventListener('click', async function() {
  const ulElement = document.querySelector('.navBar ul');
  if (usersCreated) {
    // eslint-disable-next-line max-len
    const allUsers = Array.from(ulElement.children).find((li) => li.textContent.includes('Get all users'));
    // eslint-disable-next-line max-len
    const oneUser = Array.from(ulElement.children).find((li) => li.querySelector('input[type="text"]'));
    if (allUsers) {
      ulElement.removeChild(allUsers);
    }
    if (oneUser) {
      ulElement.removeChild(oneUser);
    }
    usersCreated = false;
  }
  if (!ordersCreated) {
    // eslint-disable-next-line no-invalid-this
    this.disabled = true;

    const allOrders = document.createElement('li');
    allOrders.textContent = 'Get all orders';
    allOrders.style.marginTop = '100px';
    ulElement.appendChild(allOrders);
    const oneOrder = document.createElement('li');
    const inputField = document.createElement('input');
    inputField.placeholder = 'Enter order number';
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Find';
    submitButton.className = 'findButton';
    inputField.type = 'text';
    oneOrder.appendChild(inputField);
    oneOrder.appendChild(submitButton);
    ulElement.appendChild(oneOrder);

    allOrders.addEventListener('click', async function() {
      await getAllOrders();
      ulElement.removeChild(allOrders);
      ulElement.removeChild(oneOrder);
      ordersCreated = false;
      adminOrdersButton.disabled = false;
    });

    submitButton.addEventListener('click', async function() {
      const id = inputField.value - 1;
      if (isNaN(id)) {
        inputField.value = '';
        inputField.placeholder = 'Enter a number';
        return;
      }
      await getOrderById(id);
      ulElement.removeChild(allOrders);
      ulElement.removeChild(oneOrder);
      ordersCreated = false;
      adminOrdersButton.disabled = false;
    });
    ordersCreated = true;
  }
});

adminUsersButton.addEventListener('click', async function() {
  const ulElement = document.querySelector('.navBar ul');

  if (ordersCreated) {
    // eslint-disable-next-line max-len
    const allOrders = Array.from(ulElement.children).find((li) => li.textContent.includes('Get all orders'));
    // eslint-disable-next-line max-len
    const oneOrder = Array.from(ulElement.children).find((li) => li.querySelector('input[type="text"]'));
    if (allOrders) {
      ulElement.removeChild(allOrders);
    }
    if (oneOrder) {
      ulElement.removeChild(oneOrder);
    }
    ordersCreated = false;
  }

  if (!usersCreated) {
    const allUsers = document.createElement('li');
    allUsers.textContent = 'Get all users';
    allUsers.style.marginTop = '100px';
    ulElement.appendChild(allUsers);
    const oneUser = document.createElement('li');
    const inputField = document.createElement('input');
    inputField.placeholder = 'Enter user id';
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Find';
    submitButton.className = 'findButton';
    inputField.type = 'text';
    oneUser.appendChild(inputField);
    oneUser.appendChild(submitButton);
    ulElement.appendChild(oneUser);

    allUsers.addEventListener('click', async function() {
      await getAllUsers();
      ulElement.removeChild(allUsers);
      ulElement.removeChild(oneUser);
      usersCreated = false;
    });
    submitButton.addEventListener('click', async function() {
      const id = inputField.value;
      await getUserById(id);
      ulElement.removeChild(allUsers);
      ulElement.removeChild(oneUser);
    });
    usersCreated = true;
  }
});

const getAllOrders = async () => {
  try {
    const response = await fetch(url + '/orders');
    if (!response.ok) {
      throw new Error('Error', response.statusText);
    }
    const rows = await response.json();

    const tableHeaders =
      `<thead>
        <tr>
          <th>ID</th>
          <th>Price €</th>
          <th>Date</th>
          <th>Status</th>
          <th>Orderer</th>
        </tr>
      </thead>
      <tbody>`;
    let delivered = '';
    const tableRows = rows.map((row)=> {
      if (row.status === 0) {
        delivered = 'not delivered';
      } else {
        delivered = 'delivered';
      }
      return `
        <tr>
          <td>${row.id}</td>
          <td>${row.price}</td>
          <td>${row.date}</td>
          <td>${delivered}</td>
          <td>${row.orderer}</td>
        </tr>
      `;
    });
    const tableFooter = `</tbody>`;
    const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
    const tableContainer = document.querySelector('#table');
    tableContainer.innerHTML = tableHTML;
  } catch (error) {
    console.log('getting orders error', error);
  }
};

const getNotDeliveredOrders = async () => {
  try {
    const response = await fetch(url + '/orders');
    if (!response.ok) {
      throw new Error('Error', response.statusText);
    }
    const rows = await response.json();

    const tableHeaders =
      `<thead>
        <tr>
          <th>ID</th>
          <th>Price €</th>
          <th>Date</th>
          <th>Status</th>
          <th>Orderer</th>
          <th>Create Delivery</th>
        </tr>
      </thead>
      <tbody>`;
    const tableRows = rows
        .filter((row) => row.status === 0)
        .map((row) => {
          return `
      <tr>
        <td>${row.id}</td>
        <td>${row.price}</td>
        <td>${row.date}</td>
        <td>not delivered</td>
        <td>${row.orderer}</td>
        <td><button type="button" class="button" data-order-id="${row.id}">Deliver</button></td>
      </tr>
    `;
        });
    const tableFooter = `</tbody>`;
    const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
    const tableContainer = document.querySelector('#table');
    tableContainer.innerHTML = tableHTML;
    const deliverButtons = document.querySelectorAll('.button');

    deliverButtons.forEach((button) => {
      button.addEventListener('click', async function() {
        // eslint-disable-next-line no-invalid-this
        const orderId = this.getAttribute('data-order-id');
        await deliverOrder(orderId);
      });
    });
  } catch (error) {
    console.log('getting orders error', error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(url + '/users');
    if (!response.ok) {
      throw new Error('Error', response.statusText);
    } else {
      const rows = await response.json();
      const tableHeaders =
        `<thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Address number</th>
          <th>Postal code</th>
          <th>City</th>
          <th>Username</th>
          <th>Password</th>
          <th>Access</th>
        </tr>
      </thead>
      <tbody>`;
      const tableRows = rows.map((row)=> {
        return `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.street_name}</td>
          <td>${row.street_num}</td>
          <td>${row.zip_code}</td>
          <td>${row.city}</td>
          <td>${row.username}</td>
          <td>${row.password}</td>
          <td>${row.access}</td>
        </tr>
      `;
      });
      const tableFooter = `</tbody>`;
      const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
      const tableContainer = document.querySelector('#table');
      tableContainer.innerHTML = tableHTML;
    }
  } catch (error) {
    console.log('error gettin all users', error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(url + `/users/${id}`);
    if (!response.ok) {
      throw new Error('Error', response.statusText);
    } else {
      const rows = await response.json();
      const tableHeaders =
        `<thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Address</th>
          <th>Address number</th>
          <th>Postal code</th>
          <th>City</th>
          <th>Username</th>
          <th>Password</th>
          <th>Access</th>
        </tr>
      </thead>
      <tbody>`;
      const tableRows = rows.map((row)=> {
        return `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.street_name}</td>
          <td>${row.street_num}</td>
          <td>${row.zip_code}</td>
          <td>${row.city}</td>
          <td>${row.username}</td>
          <td>${row.password}</td>
          <td>${row.access}</td>
        </tr>
      `;
      });
      const tableFooter = `</tbody>`;
      const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
      const tableContainer = document.querySelector('#table');
      tableContainer.innerHTML = tableHTML;
    }
  } catch (error) {
    console.log('error gettin all users', error);
  }
};

const getOrderById = async (id) =>{
  try {
    const response = await fetch(url + `/orders/${id}`);
    if (!response.ok) {
      throw new Error('Error', response.statusText);
    }
    const rows = await response.json();
    const tableHeaders =
        `<thead>
        <tr>
          <th>ID</th>
          <th>Price €</th>
          <th>Date</th>
          <th>Status</th>
          <th>Orderer</th>
        </tr>
      </thead>
      <tbody>`;
    let delivered = '';
    const tableRows = rows.map((row)=> {
      if (row.status === 0) {
        delivered = 'not delivered';
      } else {
        delivered = 'delivered';
      }
      return `
        <tr>
          <td>${row.id}</td>
          <td>${row.price}</td>
          <td>${row.date}</td>
          <td>${delivered}</td>
          <td>${row.orderer}</td>
        </tr>
      `;
    });
    const tableFooter = `</tbody>`;
    const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
    const tableContainer = document.querySelector('#table');
    tableContainer.innerHTML = tableHTML;
  } catch (error) {
    console.log(error);
  }
};

adminDeliverOrder.addEventListener('click', async function() {
  const ulElement = document.querySelector('.navBar ul');
  if (ordersCreated) {
    // eslint-disable-next-line max-len
    const allOrders = Array.from(ulElement.children).find((li) => li.textContent.includes('Get all orders'));
    // eslint-disable-next-line max-len
    const oneOrder = Array.from(ulElement.children).find((li) => li.querySelector('input[type="text"]'));
    if (allOrders) {
      ulElement.removeChild(allOrders);
    }
    if (oneOrder) {
      ulElement.removeChild(oneOrder);
    }
    ordersCreated = false;
  }
  if (usersCreated) {
    // eslint-disable-next-line max-len
    const allOrders = Array.from(ulElement.children).find((li) => li.textContent.includes('Get all users'));
    // eslint-disable-next-line max-len
    const oneUser = Array.from(ulElement.children).find((li) => li.querySelector('input[type="text"]'));
    if (allOrders) {
      ulElement.removeChild(allOrders);
    }
    if (oneUser) {
      ulElement.removeChild(oneUser);
    }
    usersCreated = false;
  }
  if (!deliveryCreated) {
    await getNotDeliveredOrders();
    deliveryCreated = true;
  }
});

const deliverOrder = async (id) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url + `/orders/${id}`, fetchOptions);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error delivering order:', errorData);
      alert('Error delivering order, try again!');
    } else {
      console.log('Delivery successful');
      alert('Delivery successful!');
    }
  } catch (error) {
    console.error('Error delivering order:', error);
    alert('Error delivering order, try again! ss');
  }
};
