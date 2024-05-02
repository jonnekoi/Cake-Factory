'use strict';

const url = 'http://localhost:3000/v1';
const uploadUrl = 'http://localhost:3000/uploads/';
let rows;

document.addEventListener('DOMContentLoaded', async (event) => {
  await getProducts();
  cardFlip();
});

const getProducts = async () => {
  try {
    const response = await fetch(url + '/products');
    rows = await response.json();
    console.log(rows);

    const productsPromises = rows.map(async (row) => {
      const pictureName = row.product_img;
      const picture = await fetch(uploadUrl + pictureName);
      const kuva = await picture.blob();
      const kuvaObj = URL.createObjectURL(kuva);
      const cardHtml = `
        <div class="card">
            <div class="front">
              <img src="${kuvaObj}" alt="${row.product_name}" style="width:50%">
              <h1>${row.product_name}</h1>
              <p class="price">${row.product_price + '€'}</p>
              <p>${row.product_description}</p>
              <p><button class="button" data-product="${encodeURIComponent(JSON.stringify(row))}"><span>Add to Cart</span></button></p>
            </div>
            <div class="back" style="display: none">
            </div>
        </div>
    `;
      return cardHtml;
    });

    const products = await Promise.all(productsPromises);
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = products.join('');

    const addToCartButton = document.querySelectorAll('.button');
    addToCartButton.forEach((button, index) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        //   console.log(event.currentTarget.dataset.product);
        const product = JSON.parse(
            decodeURIComponent(event.currentTarget.dataset.product),
        );
        console.log(product);
        await addToCart(product);
      });
    });

    const addToCart = (product) => {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];
      const productIndex = cart.findIndex(
          (cartProduct) => cartProduct.product_id === product.product_id,
      );
      if (productIndex !== -1) {
        cart[productIndex].quantity = (cart[productIndex].quantity || 1) + 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    };
  } catch (error) {
    console.log('Error getting products', error);
  }
};

const cardFlip = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
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
          // eslint-disable-next-line max-len
        }, 300); // Kortin kääntymisen delay -> kuinka nopeasti front puoli näkyy taas
      }
    });
  });
};
