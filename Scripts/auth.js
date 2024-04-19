'use strict';

const url = 123;

document.addEventListener('DOMContentLoaded', (event) => {
  const loginButton = document.querySelector('#loginButton');
  const dialogContainer = document.querySelector('#dialogContainer');
  const loginForm = document.querySelector('#loginForm');
  const registerForm = document.querySelector('#registerForm');
  const firstDialog = document.querySelector('#firstDialog');
  const loginDialog = document.querySelector('#loginDialog');
  const registerDialog = document.querySelector('#registerDialog');
  const firstLogin = document.querySelector('#firstLogin');
  const firstRegister = document.querySelector('#firstRegister');

  loginButton.addEventListener('click', async function() {
    dialogContainer.style.display = 'block';
    firstDialog.style.display = 'block';
    loginDialog.style.display = 'none';
    registerDialog.style.display = 'none';

    const exitDialogButtons = document.querySelectorAll('.exitDialog');
    exitDialogButtons.forEach((button) => {
      button.addEventListener('click', function() {
        dialogContainer.style.display = 'none';
      });
    });
  });

  firstLogin.addEventListener('click', function() {
    firstDialog.style.display = 'none';
    loginDialog.style.display = 'block';
  });

  firstRegister.addEventListener('click', function() {
    firstDialog.style.display = 'none';
    registerDialog.style.display = 'block';
  });

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const data = serializeJson(loginForm);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/login', fetchOptions);
    const json = response.json();
    if (json.user) {
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('user', json.stringify(json.user));
    } else {
      alert('login error', json.error.message);
    }
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const data = serializeJson(loginForm);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url + '/auth/register', fetchOptions);
    const json = response.json();
    if (json.user) {
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('user', json.stringify(json.user));
    } else {
      alert('register error', json.error.message);
    }
  });
});

let basketItem;
let loginItem;

window.addEventListener('resize', function() {
  const navLinks = document.querySelector('.nav-links');
  const cartButton = document.querySelector('a[href="cart.html"]');
  const loginButton = document.querySelector('#loginButton');
  if (window.innerWidth > 768) {
    navLinks.classList.remove('show');
    cartButton.style.display = '';
    loginButton.style.display = '';
    if (basketItem && navLinks.contains(basketItem)) {
      navLinks.removeChild(basketItem);
    }
    if (loginItem && navLinks.contains(loginItem)) {
      navLinks.removeChild(loginItem);
    }
  }
});

document.querySelector('.hamburger').addEventListener('click', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const cartButton = document.querySelector('a[href="cart.html"]');
  const loginButton = document.querySelector('#loginButton');
  hamburger.setAttribute('disabled', '');

  navLinks.classList.toggle('show');

  if (cartButton.style.display !== 'none') {
    cartButton.style.display = 'none';
    loginButton.style.display = 'none';
    basketItem = document.createElement('li');
    basketItem.className = 'navLink';
    basketItem.innerHTML = '<a href="cart.html">Basket</a>';
    navLinks.appendChild(basketItem);

    loginItem = document.createElement('li');
    loginItem.className = 'navLink';
    loginItem.innerHTML = '<a id="loginButton">Login</a>';
    navLinks.appendChild(loginItem);
  } else {
    cartButton.style.display = '';
    loginButton.style.display = '';
    if (basketItem && navLinks.contains(basketItem)) {
      navLinks.removeChild(basketItem);
    }
    if (loginItem && navLinks.contains(loginItem)) {
      navLinks.removeChild(loginItem);
    }
  }
  hamburger.removeAttribute('disabled');
});
