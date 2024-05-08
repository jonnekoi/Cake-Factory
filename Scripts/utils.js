function populateProfile() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);
  const form = document.createElement('form');
  form.style.cssText =
    'width: 100%; display: flex; flex-direction: column; justify-content: space-around;';

  const h2 = document.createElement('h2');
  h2.style.cssText = 'width: 100%; text-align:center;';
  h2.textContent = 'Profile';
  form.appendChild(h2);

  const fields = ['Name', 'Street Name', 'Street Number', 'City', 'Zip Code'];
  fields.forEach((field) => {
    const label = document.createElement('label');
    label.style.cssText = 'color: white; display: block;';
    label.textContent = field;

    const input = document.createElement('input');
    input.style.cssText = 'display: block; padding: 5px;';
    input.id = field.toLowerCase().replace(/ /g, '_');
    if (field === 'Street Number') {
      input.id = 'street_num';
    }
    input.value = user[input.id];

    form.appendChild(label);
    form.appendChild(input);
  });

  const button = document.createElement('button');
  button.className = 'button';
  button.type = 'submit';
  button.textContent = 'Save changes';

  button.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect data from the form fields
    const updatedData = {};
    fields.forEach((field) => {
      const inputId = field.toLowerCase().replace(/ /g, '_');
      if (field !== 'Street Number') {
        console.log(field);
        updatedData[inputId] = document.getElementById(inputId).value;
        user[inputId] = document.getElementById(inputId).value;
      } else {
        console.log('street_num');
        updatedData['street_num'] = document.getElementById('street_num').value;
        user['street_num'] = document.getElementById('street_num').value;
      }
    });

    // Call the updateUserData function with the collected data
    const result = await updateUserData(updatedData);

    if (result.message === 'User updated successfully') {
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    // Create a new 'div' element for the pop-up window
    const popup = document.createElement('div');

    // Set the text of the pop-up window to result.message
    popup.textContent = result.message;

    // Style the pop-up window
    popup.style.position = 'absolute';
    popup.style.backgroundColor = '#fff';
    popup.style.border = '1px solid #000';
    popup.style.padding = '10px';
    popup.style.borderRadius = '5px';

    // Get the dialog window and set its style to use flexbox
    const dialogWindow = document.querySelector('#firstDialog');
    dialogWindow.style.display = 'flex';
    dialogWindow.style.justifyContent = 'center';
    dialogWindow.style.alignItems = 'center';

    // Add the pop-up window to the dialog window
    dialogWindow.appendChild(popup);

    // Remove the pop-up window after 3 seconds
    setTimeout(() => {
      dialogWindow.removeChild(popup);
    }, 1500);

    // Handle the result (e.g., show a success message, handle errors, etc.)
    console.log('Dialog box height:', dialogWindow.offsetHeight);
    console.log('Dialog box width:', dialogWindow.offsetWidth);
    console.log(result);
    console.log(result.statusCode);
  });
  form.appendChild(button);
  document.querySelector('#firstDialog').appendChild(form);
}

async function updateUserData(updatedData) {
  const url =
    'http://127.0.0.1:3000/v1/users/' + sessionStorage.getItem('user').id; // Replace with your API endpoint
  const token = sessionStorage.getItem('token'); // Get the token from session storage

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Add the token to the request header
    },
    body: JSON.stringify(updatedData), // Convert the updatedData object to a JSON string
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
}

export default populateProfile;
