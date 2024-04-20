'use strict';
const url = 'http://localhost:3000/v1';
document.addEventListener('DOMContentLoaded', async (event) => {
  await getProducts();
  cardFlip();
});

const getProducts = async () => {
  try {
    const response = await fetch(url + '/products');
    const rows = await response.json();

    const productsPromises = rows.map(async (row) => {
      const pictureName = row.img;
      const picture = await fetch(`http://localhost:3000/uploads/${pictureName}`);
      const kuva = await picture.blob();
      const kuvaObj = URL.createObjectURL(kuva);
      return `
        <div class="card">
            <div class="front">
              <img src="${kuvaObj}" alt="${row.name}" style="width:50%">
              <h1>${row.name}</h1>
              <p class="price">${row.price + '€'}</p>
              <p>${row.description}</p>
              <p><button class="button"><span>Add to Cart</span></button></p>
            </div>
            <div class="back" style="display: none">

            </div>
        </div>
    `;
    });
    const products = await Promise.all(productsPromises);
    const cardContainer = document.querySelector('.card-container');
    cardContainer.innerHTML = products.join('');
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

