'use strict';
import {updateCartCount} from './functions.js';

addEventListener('DOMContentLoaded', (event) => {
  event.preventDefault();
  updateCartCount();
});

// eslint-disable-next-line no-unused-vars
function toggleVisibilityAndContact(elementId, link) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
  }
  setTimeout(function () {
    window.location.href = link;
  }, 500);
}
