'use strict';

const cartContainer = document.querySelector('.shopping-cart');
const grandTotalSum = document.createElement('th');
let grandTotal = 0;

document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  const productsOnCart = JSON.parse(localStorage.getItem('cart'));
  console.log(productsOnCart);
  productsOnCart.forEach((product) => {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    const priceTd = document.createElement('td');
    const quantityTd = document.createElement('td');
    const totalTd = document.createElement('td');

    nameTd.textContent = product.product_name;
    priceTd.textContent = product.product_price + '€';
    quantityTd.textContent = product.quantity;
    totalTd.textContent = product.product_price * product.quantity + '€';
    grandTotal += product.product_price * product.quantity;

    tr.append(nameTd, priceTd, quantityTd, totalTd);
    cartContainer.appendChild(tr);
  });

  const grandTotalTh = document.createElement('th');
  const empty = document.createElement('th');
  const empty2 = document.createElement('th');
  grandTotalTh.textContent = 'Grand Total';
  cartContainer.appendChild(grandTotalTh);
  cartContainer.appendChild(empty);
  cartContainer.appendChild(empty2);
  grandTotalSum.textContent = grandTotal + '€';
  cartContainer.appendChild(grandTotalSum);
});
