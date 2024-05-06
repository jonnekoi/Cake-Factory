function appendInfoToElement(info, element,
    {
      heading = '',
      color = 'white',
      bold = false,
      cursive = false,
      img = false,
    }) {
  const pElement = document.createElement('p');

  const hElement = document.createElement('p');
  hElement.classList.add('heading');

  const textNode = document.createElement('p');
  pElement.classList.add('info');
  textNode.textContent = info;

  if (bold) {
    pElement.style.fontWeight = 'bold';
  }
  if (cursive) {
    pElement.style.fontFamily = 'cursive';
  }
  pElement.style.color = color;


  if (img) {
    // Create an img element
    const imgElement = document.createElement('img');
    // Set the src attribute to the path of your SVG file
    imgElement.src = '../Styles/images/edit.svg'; // Replace with the actual path to your SVG file
    imgElement.addEventListener('click', async () => {
      // Prompt the user for a new value for 'info'
      const newInfo = prompt('Enter new value for info:', info);
      // If the user clicked 'Cancel' in the prompt, 'newInfo' will be null
      // In this case, we don't want to update the 'pElement' text content
      if (newInfo !== null) {
        // Update the 'pElement' text content with the new value
        textNode.textContent = newInfo;
        // Prepare the updated user data
        const formattedHeading = heading.toLowerCase().replace(/ /g, '_');
        const updatedData = {
          [formattedHeading]: newInfo, // Replace 'info' with the actual property name
        };
        // Send the updated user data to the server
        const data = await updateUserData(updatedData);
        console.log(data); // Log the server response
      }
    });
    // Append the img element to the p element
    pElement.appendChild(imgElement);
  }

  if (heading) {
    hElement.textContent = heading;
    pElement.appendChild(hElement);
  }
  pElement.appendChild(textNode);
  element.append(pElement);
}


async function updateUserData(updatedData) {
  const url = 'http://127.0.0.1:3000/v1/users/' + sessionStorage.getItem('user').id; // Replace with your API endpoint
  const token = sessionStorage.getItem('token'); // Get the token from session storage

  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Add the token to the request header
    },
    body: JSON.stringify(updatedData), // Convert the updatedData object to a JSON string
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
}

export default appendInfoToElement;
