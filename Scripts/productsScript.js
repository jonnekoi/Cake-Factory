'use strict';
import {updateCartCount} from './functions.js';

const url = 'http://localhost:3000/v1';
const uploadUrl = 'http://localhost:3000/uploads/';
let rows;

document.addEventListener('DOMContentLoaded', async (event) => {
  await getProducts();
  cardFlip();
  updateCartCount();
});

const getProducts = async () => {
  try {
    const response = await fetch(url + '/products');
    rows = await response.json();

    const productsPromises = rows.map(async (row) => {
      const pictureName = row.product_img;
      const picture = await fetch(uploadUrl + pictureName);
      const kuva = await picture.blob();
      const kuvaObj = URL.createObjectURL(kuva);
      return `
        <div class="card">
            <div class="front">
              <img src="${kuvaObj}" alt="${row.product_name}" style="width:50%">
              <h1>${row.product_name}</h1>
              <p class="price">${row.product_price + '€'}</p>
              <p>${row.product_description}</p>
              <p><button class="addToCartButton" data-product-id="${row.product_id}"><span>Add to Cart</span></button></p>
            </div>
            <div class="back" style="display: none">
              <h2>Ingrediets</h2>
              <p>
  ${row.ingredients
    .map((ingredient) => {
      return `${ingredient.ingredient_name}`;
    })
    .join(',')}
  </p>
              <h2>Allergens</h2>
   <p>
  ${row.allergens
    .map((allergen) => {
      return `${allergen.allergen_name}`;
    })
    .join(',')}
  </p>
            </div>
        </div>
    `;
    });
    const products = await Promise.all(productsPromises);
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = products.join('');

    const addToCartButton = document.querySelectorAll('.addToCartButton');
    addToCartButton.forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const productId = parseInt(event.currentTarget.dataset.productId);
        const product = rows.find((row) => row.product_id === productId);
        console.log(product);
        if (product) {
          addToCart(product);
        } else {
          console.error(`Product with that id ${productId} not found`);
        }
      });
    });

    const addToCart = (product) => {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const productIndex = cart.findIndex(
        (cartProduct) => cartProduct.product_id === product.product_id
      );
      if (productIndex !== -1) {
        cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
    };
  } catch (error) {
    console.log('Error getting products', error);
  }
};

const cardFlip = () => {
  let flippedCard = null;

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if (flippedCard && flippedCard !== card) {
        flipCard(flippedCard);
        flippedCard = null;
      } else if (flippedCard === card) {
        flipCard(card);
        flippedCard = null;
      } else {
        flipCard(card);
        flippedCard = card;
      }
    });
    const addToCartButton = card.querySelector('.addToCartButton');
    addToCartButton.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
};

const flipCard = (card) => {
  const front = card.querySelector('.front');
  const back = card.querySelector('.back');
  card.classList.toggle('back');

  if (card.classList.contains('back')) {
    front.style.display = 'none';
    back.style.display = 'block';
  } else {
    back.style.display = 'none';
    setTimeout(() => {
      front.style.display = 'block';
    }, 300); // Time for flipping
  }
};

export {updateCartCount};
