'use strict';

const url = 'http://localhost:3000/v1';
const adminOrdersButton = document.querySelector('#adminOrdersButton');
const adminUsersButton = document.querySelector('#adminUsersButton');
const adminDeliverOrder = document.querySelector('#adminDeliverOrder');
const adminProductsButton = document.querySelector('#adminProductsButton');

const token = localStorage.getItem('token');
const options = {
  headers: {
    Authorization: 'Bearer ' + token,
  },
};

const clearContent = () => {
  const ulElement = document.querySelector('.navBar ul');
  // eslint-disable-next-line max-len
  const allOrders = Array.from(ulElement.children).find((li) => li.textContent.includes('Get all orders'));
  // eslint-disable-next-line max-len
  const oneOrder = Array.from(ulElement.children).find((li) => li.querySelector('input[type="text"]'));
  // eslint-disable-next-line max-len
  const allUsers = Array.from(ulElement.children).find((li) => li.textContent.includes('Get all users'));
  // eslint-disable-next-line max-len
  const oneUser = Array.from(ulElement.children).find((li) => li.querySelector('input[type="text"]'));

  if (allOrders) {
    ulElement.removeChild(allOrders);
  }
  if (oneOrder) {
    ulElement.removeChild(oneOrder);
  }
  if (allUsers) {
    ulElement.removeChild(allUsers);
  }
  if (oneUser) {
    ulElement.removeChild(oneUser);
  }
};

adminOrdersButton.addEventListener('click', async function() {
  clearContent();
  const ulElement = document.querySelector('.navBar ul');
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
    adminOrdersButton.disabled = false;
  });

  submitButton.addEventListener('click', async function() {
    const id = inputField.value;
    if (isNaN(id)) {
      inputField.value = '';
      inputField.placeholder = 'Enter a number';
      return;
    }
    await getOrderById(id);
    ulElement.removeChild(allOrders);
    ulElement.removeChild(oneOrder);
    adminOrdersButton.disabled = false;
  });
});

adminUsersButton.addEventListener('click', async function() {
  clearContent();
  const ulElement = document.querySelector('.navBar ul');
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
  });
  submitButton.addEventListener('click', async function() {
    const id = inputField.value;
    await getUserById(id);
    ulElement.removeChild(allUsers);
    ulElement.removeChild(oneUser);
  });
});

const getAllOrders = async () => {
  try {
    const response = await fetch(url + '/orders', options);
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
    const response = await fetch(url + '/orders', options);
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
        // eslint-disable-next-line no-invalid-this
        const isConfirming = this.getAttribute('data-confirming');
        if (!isConfirming) {
          // eslint-disable-next-line no-invalid-this
          this.textContent = 'Confirm';
          // eslint-disable-next-line no-invalid-this
          this.setAttribute('data-confirming', 'true');
        } else {
          await deliverOrder(orderId);
          // eslint-disable-next-line no-invalid-this
          this.textContent = 'Deliver';
          // eslint-disable-next-line no-invalid-this
          this.removeAttribute('data-confirming');
        }
      });
    });
  } catch (error) {
    console.log('getting orders error', error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(url + '/users', options);
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
    const response = await fetch(url + `/users/${id}`, options);
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
    const response = await fetch(url + `/orders/${id}`, options);
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

const getAllProducts = async () => {
  try {
    const response = await fetch(url + '/products');
    const rows = await response.json();
    const tableHeaders =
      `<thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>`;
    const tableRows = rows.map((row)=> {
      return `
        <tr product-id="${row.id}">
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.price}</td>
          <td>${row.description}</td>
        </tr>
      `;
    });
    const tableFooter = `</tbody>`;
    const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
    const tableContainer = document.querySelector('#table');
    tableContainer.innerHTML = tableHTML;
    const tableRowsElements = document.querySelectorAll('tr[product-id]');
    tableRowsElements.forEach((row) => {
      row.addEventListener('click', async (event) => {
        const productId = row.getAttribute('product-id');
        const product = await getProductById(productId);
        const picName = product.img;
        const picture = await fetch(`http://localhost:3000/uploads/${picName}`);
        const kuva = await picture.blob();
        const kuvaObj = URL.createObjectURL(kuva);
        console.log(product);
        createProductCard(product, kuvaObj);
        document.querySelector('.wrapper').classList.add('blur');
      });
    });
  } catch (error) {
    console.log(error);
  }
};

adminDeliverOrder.addEventListener('click', async function() {
  clearContent();
  await getNotDeliveredOrders();
});

adminProductsButton.addEventListener('click', async function() {
  clearContent();
  await getAllProducts();
});

const deliverOrder = async (id) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };

  try {
    const response = await fetch(url + `/orders/${id}`, fetchOptions);
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error delivering', errorData);
    } else {
      alert('Delivery successful!');
      await getNotDeliveredOrders();
    }
  } catch (error) {
    console.error('Error delivering order:', error);
    alert('Error delivering order, try again! ss');
  }
};

const getProductById = async (id) => {
  try {
    const response = await fetch(url + `/products/${id}`);
    if (!response.ok) {
      throw new Error(`Error getting prod ${response.statusText}`);
    } else {
      const product = await response.json();
      return product;
    }
  } catch (error) {
    console.log(error);
  }
};

const createProductCard = (product, image) => {
  const dialogContainer = document.createElement('div');
  dialogContainer.style.position = 'fixed';
  dialogContainer.style.top = '50%';
  dialogContainer.style.left = '50%';
  dialogContainer.style.transform = 'translate(-50%, -50%)';
  dialogContainer.style.backgroundColor = '#333333';
  dialogContainer.style.padding = '20px';
  dialogContainer.style.borderRadius = '10px';
  dialogContainer.style.zIndex = '1000';
  dialogContainer.style.width = '50%';
  dialogContainer.style.height = '50%';
  dialogContainer.style.display = 'flex';
  dialogContainer.style.alignItems = 'center';
  dialogContainer.style.border = '3px solid #0f66b5';

  const form = document.createElement('form');
  form.style.width = '50%';
  form.style.padding = '20px';
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.justifyContent = 'space-around';
  // eslint-disable-next-line guard-for-in
  for (const key in product) {
    const label = document.createElement('label');
    label.textContent = key;
    label.style.color = 'white';
    label.style.display = 'block';
    let input;
    // eslint-disable-next-line no-unused-vars
    if (key === 'img') {
      input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
    } else if (key === 'id') {
      input = document.createElement('input');
      input.readOnly = true;
      input.value = product[key];
    } else {
      input = document.createElement('input');
      input.value = product[key];
    }

    input.id = key;
    input.style.display = 'block';
    input.style.padding = '5px';
    form.appendChild(label);
    form.appendChild(input);
  }

  const productImageContainer = document.createElement('div');
  productImageContainer.style.width = '50%';
  productImageContainer.style.display = 'flex';
  productImageContainer.style.justifyContent = 'center';
  const productImage = document.createElement('img');
  productImage.src = image;
  productImage.style.width = '80%';
  productImage.style.height = 'auto';
  productImageContainer.appendChild(productImage);
  dialogContainer.appendChild(form);
  dialogContainer.appendChild(productImageContainer);
  document.body.appendChild(dialogContainer);

  const saveButton = document.createElement('button');
  saveButton.classList.add('button');
  saveButton.textContent = 'Save changes';
  saveButton.type = 'submit';
  form.appendChild(saveButton);
  const ExitButton = document.createElement('button');
  ExitButton.textContent = 'Exit';
  ExitButton.classList.add('button');
  const IngredientsBtn = document.createElement('button');
  IngredientsBtn.textContent = 'Ingredients';
  IngredientsBtn.classList.add('button');
  const deleteProdBtn = document.createElement('button');
  deleteProdBtn.textContent = 'Delete product';
  deleteProdBtn.classList.add('button');
  form.appendChild(IngredientsBtn);
  form.appendChild(deleteProdBtn);
  form.appendChild(ExitButton);
  dialogContainer.appendChild(form);
  document.body.appendChild(dialogContainer);

  ExitButton.addEventListener('click', function() {
    document.body.removeChild(dialogContainer);
    document.querySelector('.wrapper').classList.remove('blur');
  });

  deleteProdBtn.addEventListener('click', function() {
    const idValue = product['id'];
    deleteProduct(idValue);
    document.body.removeChild(dialogContainer);
    document.querySelector('.wrapper').classList.remove('blur');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // TODO: PRODUCT UPDATE
    // document.body.removeChild(dialogContainer);
    document.querySelector('.wrapper').classList.remove('blur');
  });
};

const deleteProduct = async (id) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  };
  try {
    const response = await fetch(url + `/products/${id}`, options);
    if (!response.ok) {
      alert('Error deleting product');
    } else {
      alert('Product deleted!');
    }
  } catch (error) {
    console.log(error);
  }
};
