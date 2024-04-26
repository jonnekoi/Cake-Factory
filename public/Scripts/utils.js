function appendInfoToElement(info, element,
    {
      color = 'white',
      bold = false,
      cursive = false,
      img = false,
    }) {
  const pElement = document.createElement('p');
  if (img) {
    // Create an img element
    const imgElement = document.createElement('img');
    // Set the src attribute to the path of your SVG file
    imgElement.src = '../Styles/images/edit.svg'; // Replace with the actual path to your SVG file
    // Append the img element to the p element
    pElement.appendChild(imgElement);
  }
  const textNode = document.createTextNode(info);
  pElement.appendChild(textNode);
  if (bold) {
    pElement.style.fontWeight = 'bold';
  }
  if (cursive) {
    pElement.style.fontFamily = 'cursive';
  }
  pElement.style.color = color;



  element.append(pElement);
}

export default appendInfoToElement;
