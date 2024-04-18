'use strict';

const url = 123;

const loginButton = document.querySelector('#loginButton');
const dialog = document.querySelector('#dialogContainer');
const dialogExitButton = document.querySelector('#exitDialog');
const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');

loginButton.addEventListener('click', async function() {
  dialog.style.display = 'block';
});

dialogExitButton.addEventListener('click', function() {
  dialog.style.display = 'none';
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
