const loader = document.querySelector('.loader');

function displayLoader(element) {
  if (element.style.display === 'block') {
    element.style.display = 'none';
  } else {
    element.style.display = 'block';
  }
}

export { loader, displayLoader };
