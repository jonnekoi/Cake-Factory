'use strict';

export const updateCartCount = () => {
  let cart = localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];
  if (cart.length === 0) {
    const cartCount = document.querySelector('.cartItemCount');
    cartCount.style.display = 'none';
  } else {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cartItemCount').innerText = count;
    document.querySelector('.cartItemCount').style.color = 'lightblue';
  }
};
