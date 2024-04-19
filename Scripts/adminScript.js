'use strict';
const url = 'http://localhost:3000/v1';
const adminOrdersButton = document.getElementById('adminOrdersButton');

adminOrdersButton.addEventListener('click', async function() {
  try {
    await getOrders();
  } catch (error) {
    console.log(error);
  }
});

const getOrders = async () => {
  try {
    const response = await fetch(url + '/orders');
    if (!response.ok) {
      throw new Error('Error', response.statusText);
    }
    const rows = await response.json();

    const tableHeaders = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Price</th>
          <th>Date</th>
          <th>Status</th>
          <th>Orderer</th>
        </tr>
      </thead>
      <tbody>
    `;
    // eslint-disable-next-line no-unused-vars
    let delivered = '';
    const tableRows = rows.map((row)=> {
      if (row.status === 0) {
        delivered = 'not delivered';
      } else {
        delivered = 'delivered';
      }
      return `
        <tr>
          <td>${row.id}</td>
          <td>${row.price}</td>
          <td>${row.date}</td>
          <td>${delivered}</td>
          <td>${row.orderer}</td>
        </tr>
      `;
    });
    const tableFooter = `</tbody>`;
    const tableHTML = tableHeaders + tableRows.join('') + tableFooter;
    const tableContainer = document.getElementById('Table');
    tableContainer.innerHTML = tableHTML;
  } catch (error) {
    console.log('getting orders error', error);
  }
};

