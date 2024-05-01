'use strict';

// eslint-disable-next-line no-unused-vars
function toggleVisibilityAndContact(elementId, link) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
  }
  setTimeout(function() {
    window.location.href = link;
  }, 500);
}
