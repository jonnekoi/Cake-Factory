'use strict';

export const updateCartCount = () => {
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);
  if (cart.length === 0) {
    cartCount.style.display = 'none';
  } else {
    const count = cart.length;
    document.querySelector('.cartItemCount').innerText = count;
    document.querySelector('.cartItemCount').style.color = 'lightblue';
  }
};
