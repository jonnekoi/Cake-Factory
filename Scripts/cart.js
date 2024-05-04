'use strict';

const URL = 'http://localhost:3000/v1/orders/';
const cartTable = document.createElement('table');
const cartContainer = document.querySelector('.shopping-cart');
const grandTotalSum = document.createElement('th');
let grandTotal = 0;
const orderForm = document.querySelector('#orderForm');
let productsOnCart = null;
let price = 0;
let user = null;

document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  const submitForm = document.createElement('button');
  submitForm.innerText = 'Order';
  orderForm.appendChild(submitForm);
  if (sessionStorage.getItem('user') !== null) {
    user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);
    document.querySelector('#orderName').value = user.name;
    document.querySelector('#orderAddress').value = user.street_name;
    document.querySelector('#orderAddressNum').value = user.street_num;
    document.querySelector('#orderZipCode').value = user.zip_code;
    document.querySelector('#orderCity').value = user.city;
  }
  try {
    productsOnCart = JSON.parse(localStorage.getItem('cart'));

    const productTh = document.createElement('th');
    const priceTh = document.createElement('th');
    const quantityTh = document.createElement('th');
    const totalTh = document.createElement('th');
    const deleteTh = document.createElement('th');
    productTh.innerText = 'Product';
    priceTh.innerText = 'Price';
    quantityTh.innerText = 'Quantity';
    totalTh.innerText = 'Total';
    cartTable.append(productTh, priceTh, quantityTh, deleteTh, totalTh);
    cartContainer.appendChild(cartTable);

    productsOnCart.forEach((product) => {
      const deleteImg = document.createElement('img');
      const incrementButton = document.createElement('button');
      incrementButton.textContent = '+';
      incrementButton.classList.add('quantityButton');
      const decrementButton = document.createElement('button');
      decrementButton.textContent = '-';
      decrementButton.classList.add('quantityButton');
      deleteImg.setAttribute('src', '../Styles/images/delete.svg');

      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = product.quantity;

      const tr = document.createElement('tr');
      const nameTd = document.createElement('td');
      const priceTd = document.createElement('td');
      const quantityTd = document.createElement('td');
      const totalTd = document.createElement('td');
      const deleteProduct = document.createElement('button');
      const deleteTd = document.createElement('td');
      deleteProduct.style.background = 'none';
      deleteProduct.style.border = 'none';
      deleteProduct.style.cursor = 'pointer';

      incrementButton.addEventListener('click', () => {
        product.quantity++;
        decrementButton.disabled = false;
        quantitySpan.textContent = product.quantity;
        totalTd.textContent = product.product_price * product.quantity + '€';
        grandTotal += product.product_price;
        grandTotalSum.textContent = grandTotal + '€';

        localStorage.setItem('cart', JSON.stringify(productsOnCart));
      });

      decrementButton.addEventListener('click', () => {
        if (product.quantity <= 1) {
          decrementButton.disabled = true;
          return;
        }
        product.quantity--;
        quantitySpan.textContent = product.quantity;
        totalTd.textContent = product.product_price * product.quantity + '€';
        grandTotal -= product.product_price;
        grandTotalSum.textContent = grandTotal + '€';

        localStorage.setItem('cart', JSON.stringify(productsOnCart));
      });

      deleteProduct.addEventListener('click', () => {
        productsOnCart = productsOnCart.filter(
            (p) => p.product_id !== product.product_id,
        );
        localStorage.setItem('cart', JSON.stringify(productsOnCart));
        location.reload();
      });

      nameTd.textContent = product.product_name;
      priceTd.textContent = product.product_price + '€';
      quantityTd.append(quantitySpan, decrementButton, incrementButton);
      totalTd.textContent = product.product_price * product.quantity + '€';
      grandTotal += product.product_price * product.quantity;
      deleteProduct.appendChild(deleteImg);
      // deleteProduct.textContent = ;
      deleteTd.appendChild(deleteProduct);

      tr.append(nameTd, priceTd, quantityTd, deleteTd, totalTd);
      cartTable.appendChild(tr);
      cartContainer.appendChild(cartTable);
    });

    const grandTotalTh = document.createElement('th');
    const empty = document.createElement('th');
    const empty2 = document.createElement('th');
    const clear = document.createElement('button');
    const cleatTh = document.createElement('th');
    clear.classList.add('button');
    clear.style.padding = '0px';
    clear.innerText = 'Clear';
    cleatTh.appendChild(clear);
    grandTotalSum.textContent = grandTotal + '€';
    grandTotalTh.textContent = 'Total';
    cartTable.append(cleatTh, empty, empty2, grandTotalTh, grandTotalSum);
    cartContainer.appendChild(cartTable);

    clear.addEventListener('click', () => {
      productsOnCart.splice(0, productsOnCart.length);
      localStorage.setItem('cart', productsOnCart);
      location.reload();
    });
  } catch (err) {
    const emptyCart = document.createElement('p');
    emptyCart.innerText = 'Shopping cart is empty';
    cartContainer.appendChild(emptyCart);
  }

  submitForm.addEventListener('click', async (event) => {
    event.preventDefault();

    const name = document.querySelector('#orderName').value;
    const streetName = document.querySelector('#orderAddress').value;
    const streetNum = document.querySelector('#orderAddressNum').value;
    const zipCode = document.querySelector('#orderZipCode').value;
    const city = document.querySelector('#orderCity').value;

    if (!productsOnCart || productsOnCart.length === 0) {
      alert('Shopping cart is empty.');
      return;
    }

    if (!name || !streetName || !streetNum || !zipCode || !city) {
      alert('Please fill in all the fields.');
      return;
    }

    const products = [];
    productsOnCart.forEach((p) => {
      if (p.quantity > 1) {
        for (let i = 0; i < p.quantity; i++) {
          products.push(p.product_id);
        }
        price += p.product_price * p.quantity;
        return;
      }
      products.push(p.product_id);
      price += p.product_price;
    });
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const data = {
      price: price,
      date: `${year}-${month}-${day}`,
      products: products,
    };

    const token = sessionStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers.Authorization = 'Bearer ' + token;
    }
    data.name = name;
    data.street_name = streetName;
    data.street_num = streetNum;
    data.zip_code = zipCode;
    data.city = city;
    options.body = JSON.stringify(data);
    const result = await fetch(URL, options);
    const jsonResult = await result.json();
    console.log(jsonResult);
    if (result.ok) {
      localStorage.removeItem('cart');
      document.querySelector('#orderName').value = '';
      document.querySelector('#orderAddress').value = '';
      document.querySelector('#orderAddressNum').value = '';
      document.querySelector('#orderZipCode').value = '';
      document.querySelector('#orderCity').value = '';
      location.reload();
    }
  });
});
