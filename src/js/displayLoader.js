const loader = document.querySelector('.loader');

function displayLoader(element) {
  if (element.style.display === 'block') {
    element.style.display = 'none';
    console.log('loader-stop');
  } else {
    element.style.display = 'block';
    console.log('loader-start');
  }
}

export { loader, displayLoader };
