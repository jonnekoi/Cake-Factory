import serializeJson from './serialize.js';
import appendInfoToElement from './utils.js';

'use strict';

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
    delete data[''];
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch( 'http://127.0.0.1:3000/v1/auth/login', fetchOptions);
    const json = await response.json();
    console.log(json);
    console.log(json.user);
    if (json.user) {
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('user', JSON.stringify(json.user));
      // Check if the user is an admin
      if (json.user.access === 'admin') {
        console.log('yesss admin');
        // Redirect to the admin page
        window.location.href = '/Cake-Factory/HTMLs/admin.html';
      } else {
        // Redirect to the home page
        window.location.href = '/Cake-Factory/HTMLs/index.html';
      }
    } else {
      // alert('login error', json.error.message);
      console.log({error: 'Login Error'});
    }
  });

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-undef
    const data = serializeJson(registerForm);
    delete data[''];
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    const response = await fetch('http://127.0.0.1:3000/v1/users', fetchOptions);
    const json = await response.json();
    if (json.result) {
      sessionStorage.setItem('token', json.token);
      sessionStorage.setItem('user', JSON.stringify(json.result));
      // console.log('register success');
      window.location.href = '/Cake-Factory/HTMLs/index.html';
    } else {
      // alert('register error', json.error.message);
      console.log({error: 'Register Error'});
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

window.addEventListener('DOMContentLoaded', (event) => {
  const loginButton = document.querySelector('#loginButton');
  const firstLogin = document.querySelector('#firstLogin');
  const firstRegister = document.querySelector('#firstRegister');
  const user = sessionStorage.getItem('user');
  const userObj = JSON.parse(user);
  if (user) {
    // Writes username instead of lock
    loginButton.innerHTML = `<span>${userObj.username}</span>`;
    loginButton.style.color = '#ffca19';

    // Hides the firstLogin and firstRegister buttons
    firstLogin.style.display = 'none';
    firstRegister.style.display = 'none';

    // Populates dialog box with user info
    const dialog = document.querySelector('#firstDialog');
    appendInfoToElement('Profile', dialog, {color: '#f1e9dd', bold: true});
    appendInfoToElement(`Name: ${userObj.name}`, dialog, {color: '#f1e9dd', img: true});
    appendInfoToElement(
        `Address: ${userObj.street_name},${userObj.street_num}`,
        dialog,
        {color: '#f1e9dd', img: true},
    );
    appendInfoToElement(
        `City: ${userObj.city}, ${userObj.zip_code}`,
        dialog,
        {color: '#f1e9dd', img: true},
    );

    // Logout button
    // Create a new 'a' element
    const logoutButton = document.createElement('a');

    // Set the class and id of the 'a' element
    logoutButton.className = 'button';
    logoutButton.id = 'logoutButton';

    // Create a new 'span' element and set its innerHTML to 'Logout'
    const span = document.createElement('span');
    span.innerHTML = 'Logout';

    // Append the 'span' element to the 'a' element
    logoutButton.appendChild(span);

    // Append the 'a' element to the parent element
    // Replace 'parentElement' with the actual parent element
    // where you want the logout button to appear
    document.querySelector('.nav-links').appendChild(logoutButton);
    logoutButton.addEventListener('click', logout);
  }
});

function logout() {
  // Remove the user and token from the session storage
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');
  // Select the logout button and its parent element
  const logoutButton = document.querySelector('#logoutButton');
  const parentElement = logoutButton.parentElement;

  // Remove the logout button from its parent element
  parentElement.removeChild(logoutButton);
  // Redirect to the login page
  window.location.href = '/Cake-Factory/HTMLs/index.html';
}
