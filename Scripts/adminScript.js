'use strict';

const url = 'http://127.0.0.1:3000/v1';

const adminOrdersButton = document.querySelector('#adminOrdersButton');
const adminUsersButton = document.querySelector('#adminUsersButton');
const adminDeliverOrder = document.querySelector('#adminDeliverOrder');
const adminProductsButton = document.querySelector('#adminProductsButton');
const adminAddProduct = document.querySelector('#adminAddProduct');
const adminAddIng = document.querySelector('#addIngredients');


const token = sessionStorage.getItem('token');
const options = {
  headers: {
    Authorization: 'Bearer ' + token,
  },
};

const clearContent = () => {
  const links = document.querySelector('#navLinks');
  const container = document.querySelector('.container');
  container.innerHTML = '';
  links.innerHTML = '';
};

adminDeliverOrder.addEventListener('click', async function() {
  clearContent();
  await getNotDeliveredOrders();
});

adminOrdersButton.addEventListener('click', async function() {
  clearContent();
  const ulElement = document.querySelector('#navLinks');
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
  });

  submitButton.addEventListener('click', async function() {
    const id = inputField.value;
    if (isNaN(id)) {
      inputField.value = '';
      inputField.placeholder = 'Enter a number';
      return;
    }
    console.log(id);
    await getOrderById(id);
    ulElement.removeChild(allOrders);
    ulElement.removeChild(oneOrder);
  });
});

adminUsersButton.addEventListener('click', async function() {
  clearContent();
  const ulElement = document.querySelector('#navLinks');
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

adminProductsButton.addEventListener('click', async function() {
  clearContent();
  await getAllProducts();
});

adminAddProduct.addEventListener('click', async function() {
  clearContent();
  const existingForm = document.querySelector('.container form');
  if (existingForm) {
    return;
  }
  await createAddProductForm();
});

adminAddIng.addEventListener('click', async function() {
  clearContent();
  await createAddIngForm();
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
    const table = document.createElement('table');
    table.innerHTML = tableHTML;
    const tableContainer = document.querySelector('.container');
    table.classList.add('table');
    tableContainer.appendChild(table);
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
    const table = document.createElement('table');
    table.innerHTML = tableHTML;
    const tableContainer = document.querySelector('.container');
    table.classList.add('table');
    tableContainer.appendChild(table);
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
      const table = document.createElement('table');
      table.innerHTML = tableHTML;
      const tableContainer = document.querySelector('.container');
      table.classList.add('table');
      tableContainer.appendChild(table);
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
      const table = document.createElement('table');
      table.innerHTML = tableHTML;
      const tableContainer = document.querySelector('.container');
      table.classList.add('table');
      tableContainer.appendChild(table);
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
    const table = document.createElement('table');
    table.classList.add('table');
    const tableContainer = document.querySelector('.container');
    table.innerHTML = tableHTML;
    tableContainer.appendChild(table);
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
        <tr product-id="${row.product_id}">
          <td>${row.product_id}</td>
          <td>${row.product_name}</td>
          <td>${row.product_price}</td>
          <td>${row.product_description}</td>
        </tr>
      `;
    });
    const tableFooter = `</tbody>`;
    const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
    const table = document.createElement('table');
    table.classList.add('table');
    const tableContainer = document.querySelector('.container');
    table.innerHTML = tableHTML;
    tableContainer.appendChild(table);
    const tableRowsElements = document.querySelectorAll('tr[product-id]');
    tableRowsElements.forEach((row) => {
      row.addEventListener('click', async (event) => {
        const productId = row.getAttribute('product-id');
        const product = await getProductById(productId);
        const picName = product.img;
        const picture = await fetch(`http://localhost:3000/uploads/${picName}`);
        const kuva = await picture.blob();
        const kuvaObj = URL.createObjectURL(kuva);
        createProductCard(product, kuvaObj);
        document.querySelector('.wrapper').classList.add('blur');
      });
    });
  } catch (error) {
    console.log(error);
  }
};

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
      clearContent();
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
  console.log(product);
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
  form.style.width = '100%';
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
  const rightSide = document.createElement('div');
  rightSide.style.display = 'flex';
  rightSide.style.flexDirection = 'column';
  rightSide.style.justifyContent = 'space-around';
  rightSide.appendChild(form);
  dialogContainer.appendChild(rightSide);
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
  const buttonsDiv = document.createElement('div');
  buttonsDiv.style.display = 'block';
  buttonsDiv.style.display = 'flex';
  buttonsDiv.style.flexDirection = 'column';
  buttonsDiv.style.justifyContent = 'space-around';
  buttonsDiv.style.padding = '20px';
  buttonsDiv.style.width = '100%';
  buttonsDiv.appendChild(IngredientsBtn);
  buttonsDiv.appendChild(deleteProdBtn);
  buttonsDiv.appendChild(ExitButton);
  rightSide.appendChild(buttonsDiv);
  dialogContainer.appendChild(rightSide);
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

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const desc = document.getElementById('description').value;
    const data = {
      name: name,
      price: price,
      description: desc,
    };
    const jsonData = JSON.stringify(data);
    await updateProduct(jsonData, id);
    document.body.removeChild(dialogContainer);
    document.querySelector('.wrapper').classList.remove('blur');
  });

  IngredientsBtn.addEventListener('click', function() {
    form.style.display = 'none';
    buttonsDiv.style.display = 'none';
  });
};

const updateProduct = async (product, id) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: product,
  };
  try {
    const response = await fetch(url + `/products/${id}`, options);
    console.log(response);
    if (!response.ok) {
      alert('Error updating product!');
    } else {
      alert('Product updated');
    }
  } catch (error) {
    console.log('Error updating product: ' + error);
  }
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

const createAddProductForm = async () => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.enctype = 'multipart/form-data';
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.padding = '35px';
  form.style.borderRadius = '5px';
  form.style.border = '3px solid #0f66b5';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.style.padding = '5px';
  nameInput.style.marginBottom = '10px';
  nameInput.placeholder = 'Product name';
  form.appendChild(nameInput);
  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.name = 'price';
  priceInput.style.padding = '5px';
  priceInput.style.marginBottom = '10px';
  priceInput.placeholder = 'Product price';
  form.appendChild(priceInput);
  const descInput = document.createElement('input');
  descInput.type = 'text';
  descInput.name = 'description';
  descInput.style.padding = '5px';
  descInput.style.marginBottom = '10px';
  descInput.placeholder = 'Product desc';
  form.appendChild(descInput);
  const ingredients = await getIngredients();

  const dropMenu = document.createElement('div');
  const dropdownContent = document.createElement('div');

  ingredients.forEach((ingredient) => {
    const checkboxContainer = document.createElement('label');
    checkboxContainer.style.margin = '5px';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = ingredient.name;
    checkbox.name = 'ingredient';
    checkbox.id = `${ingredient.id}`;
    const labelText = document.createElement('span');
    labelText.textContent = ingredient.name;
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(labelText);
    dropdownContent.appendChild(checkboxContainer);
  });

  dropMenu.appendChild(dropdownContent);
  form.appendChild(dropMenu);
  const imgInput = document.createElement('input');
  imgInput.type = 'file';
  imgInput.style.padding = '5px';
  imgInput.name = 'img';
  imgInput.style.marginBottom = '10px';
  imgInput.accept = 'image/*';
  form.appendChild(imgInput);
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.classList.add('button');
  form.appendChild(submitButton);

  const container = document.querySelector('.container');
  container.appendChild(form);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', form.elements.name.value);
    formData.append('price', form.elements.price.value);
    formData.append('description', form.elements.description.value);

    const selectedIngredientIDs = [];
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
      selectedIngredientIDs.push(checkbox.id); // Push the ID directly
    });
    formData.append('ingredients', JSON.stringify(selectedIngredientIDs));
    formData.append('img', form.elements.img.files[0]);
    await addProduct(formData);
  });
};

const getIngredients = async () => {
  try {
    const response = await fetch(url + '/products/ingredients');
    if (!response.ok) {
      throw new Error('Error ingredients', response.statusText);
    } else {
      const rows = await response.json();
      return rows;
    }
  } catch (error) {
    console.log(error);
  }
};

const createAddIngForm = async () => {
  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.padding = '35px';
  form.style.borderRadius = '5px';
  form.style.border = '3px solid #0f66b5';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.style.padding = '5px';
  nameInput.style.marginBottom = '10px';
  nameInput.placeholder = 'Ingredient name';
  form.appendChild(nameInput);
  const priceInput = document.createElement('input');
  priceInput.type = 'number';
  priceInput.name = 'price';
  priceInput.style.padding = '5px';
  priceInput.style.marginBottom = '10px';
  priceInput.placeholder = 'Ingredient price';
  form.appendChild(priceInput);
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.classList.add('button');
  form.appendChild(submitButton);
  const container = document.querySelector('.container');
  container.appendChild(form);

  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const ingredientName = nameInput.value;
    const ingredientPrice = priceInput.value;

    const ingredientData = {
      name: ingredientName,
      price: ingredientPrice,
    };
    console.log(ingredientData);
    await sendIngredient(ingredientData);
    form.reset();
  });
};

const sendIngredient = async (item) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(item),
  };

  try {
    const response = await fetch(url + '/products/ingredients', options);
    if (!response.ok) {
      const errorD = await response.json();
      console.log('error', errorD);
    } else {
      alert('Ingredient added ok');
    }
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (formData) => {
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    body: formData,
  };
  try {
    const response = await fetch(url + '/products', options);
    if (!response.ok) {
      const error = await response.json();
      console.log('error', error);
    } else {
      alert('Product added successfully!');
    }
  } catch (error) {
    console.log(error);
  }
};
