'use strict';
import {updateCartCount} from './functions.js';

document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();
  const carousel = document.getElementById('carousel');
  const photos = [
    '../Styles/images/aboutImages/AlmondJoyCake.jpg',
    '../Styles/images/aboutImages/AppleCinnamonSpiceCake.jpg',
    '../Styles/images/aboutImages/BananaNutMuffins.jpg',
    '../Styles/images/aboutImages/BananaWalnutCake.jpg',
    '../Styles/images/aboutImages/BlueberryAlmondMuffins.jpg',
    '../Styles/images/aboutImages/BlueberryLemonCake.jpg',
    '../Styles/images/aboutImages/ChocolateFudgeCake.jpg',
    '../Styles/images/aboutImages/classicVanillaCake.jpg',
    '../Styles/images/aboutImages/CoconutCreamCake.jpg',
    '../Styles/images/aboutImages/KiwiLimeCheesecake.jpg',
    '../Styles/images/aboutImages/LemonRaspberryCake.jpg',
    '../Styles/images/aboutImages/NuttyBananaBreadCake.jpg',
    '../Styles/images/aboutImages/PeanutButterChocolateCake.jpg',
    '../Styles/images/aboutImages/RedVelvetCake.jpg',
    '../Styles/images/aboutImages/StrawberryShortcake.jpg',
    '../Styles/images/aboutImages/TripleBerryDelightCake.jpg',
  ];

  let current = 0;

  function loadNextImage() {
    const img = new Image();
    img.src = photos[current];
    img.alt = 'Cake';
    carousel.innerHTML = '';
    carousel.appendChild(img);
    current = (current + 1) % photos.length;
  }

  loadNextImage();

  setInterval(loadNextImage, 2500); // kuva vaihto väli
});
