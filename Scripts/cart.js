'use strict';

const cartTable = document.createElement('table');
const cartContainer = document.querySelector('.shopping-cart');
const grandTotalSum = document.createElement('th');
let grandTotal = 0;

document.addEventListener('DOMContentLoaded', async (event) => {
  event.preventDefault();
  try {
    const productsOnCart = JSON.parse(localStorage.getItem('cart'));

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
      deleteImg.setAttribute('src', './Styles/images/delete.svg');

      const quantitySpan = document.createElement('span');
      quantitySpan.textContent = product.quantity;

      const tr = document.createElement('tr');
      const nameTd = document.createElement('td');
      const priceTd = document.createElement('td');
      const quantityTd = document.createElement('td');
      const totalTd = document.createElement('td');
      const deleteProduct = document.createElement('button');
      const deleteTd = document.createElement('td');

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
          (p) => p.product_id !== product.product_id
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
    clear.innerText = 'Clear';
    cleatTh.appendChild(clear);
    grandTotalSum.textContent = grandTotal + '€';
    grandTotalTh.textContent = 'Grand Total';
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
});
