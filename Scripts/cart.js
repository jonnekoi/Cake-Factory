'use strict';

const cartTable = document.createElement('table');
const cartContainer = document.querySelector('.shopping-cart');
const grandTotalSum = document.createElement('th');
let grandTotal = 0;

document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  const productTh = document.createElement('th');
  const priceTh = document.createElement('th');
  const quantityTh = document.createElement('th');
  const totalTh = document.createElement('th');
  productTh.innerText = 'Product';
  priceTh.innerText = 'Price';
  quantityTh.innerText = 'Quantity';
  totalTh.innerText = 'Total';
  cartTable.append(productTh, priceTh, quantityTh, totalTh);
  cartContainer.appendChild(cartTable);
  const productsOnCart = JSON.parse(localStorage.getItem('cart'));
  console.log(productsOnCart);
  productsOnCart.forEach((product) => {
    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.classList.add('quantityButton');
    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.classList.add('quantityButton');

    const quantitySpan = document.createElement('span');
    quantitySpan.textContent = product.quantity;

    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    const priceTd = document.createElement('td');
    const quantityTd = document.createElement('td');
    const totalTd = document.createElement('td');

    incrementButton.addEventListener('click', () => {
      product.quantity++;
      quantitySpan.textContent = product.quantity;
      totalTd.textContent = product.product_price * product.quantity + '€';
      grandTotal += product.product_price;
      grandTotalSum.textContent = grandTotal + '€';
    });

    decrementButton.addEventListener('click', () => {
      product.quantity--;
      quantitySpan.textContent = product.quantity;
      totalTd.textContent = product.product_price * product.quantity + '€';
      grandTotal += product.product_price;
      grandTotalSum.textContent = grandTotal + '€';
    });

    nameTd.textContent = product.product_name;
    priceTd.textContent = product.product_price + '€';
    quantityTd.append(quantitySpan, decrementButton, incrementButton);
    totalTd.textContent = product.product_price * product.quantity + '€';
    grandTotal += product.product_price * product.quantity;

    tr.append(nameTd, priceTd, quantityTd, totalTd);
    cartTable.appendChild(tr);
    cartContainer.appendChild(cartTable);
  });

  const grandTotalTh = document.createElement('th');
  const empty = document.createElement('th');
  const empty2 = document.createElement('th');
  grandTotalSum.textContent = grandTotal + '€';
  grandTotalTh.textContent = 'Grand Total';
  cartTable.append(grandTotalTh, empty, empty2, grandTotalSum);
  cartContainer.appendChild(cartTable);
});
