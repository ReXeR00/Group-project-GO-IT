import { setToLocalStorage, getFromStorage, localStorageKeys } from './local-storage';

const getMovieDataFromElements = () => {
  const titleElement = document.querySelector('.movies__title');
  const voteAverageElement = document.querySelector('.movies__property--vote');
  const voteCountElement = document.querySelector('.movies__property--vote');
  const popularityElement = document.querySelector('.movies__property--popularity');
  const originalTitleElement = document.querySelector('.movies__property--original-title');
  const genreIdsElement = document.querySelector('.movies__property--genre-ids');

  const getTextContent = element => element?.textContent || '';

  const selectedMovie = {
    title: getTextContent(titleElement),
    voteAverage: getTextContent(voteAverageElement),
    voteCount: getTextContent(voteCountElement),
    popularity: getTextContent(popularityElement),
    originalTitle: getTextContent(originalTitleElement),
    genreIds: getTextContent(genreIdsElement),
  };

  return selectedMovie;
};

const addToWatched = () => {
  const watchedMovies = getFromStorage(localStorageKeys.WATCHED) || [];

  if (typeof watchedMovies !== 'undefined') {
    console.log(watchedMovies);
  } else {
    console.log('Brak zapisanych danych dla klucza WATCHED');
  }

  const selectedMovie = getMovieDataFromElements();
  watchedMovies.push(selectedMovie);
  setToLocalStorage(localStorageKeys.WATCHED, watchedMovies);
};

const addToQueue = () => {
  const queueMovies = getFromStorage(localStorageKeys.QUEUE) || [];

  if (typeof queueMovies !== 'undefined') {
    console.log(queueMovies);
  } else {
    console.log('Brak zapisanych danych dla klucza QUEUE');
  }

  const selectedMovie = getMovieDataFromElements();
  queueMovies.push(selectedMovie);
  setToLocalStorage(localStorageKeys.QUEUE, queueMovies);
};

const addToWatchedButton = document.querySelector('.library__btn--modal');
const addToQueueButton = document.querySelector('.library__btn--modalqueue');

addToWatchedButton.addEventListener('click', addToWatched);
addToQueueButton.addEventListener('click', addToQueue);

const createFilmModalMarkup = data => {
  const { title, voteAverage, voteCount, popularity, originalTitle, genreIds } = data;

  const markup = `
    <div class="film-modal">
      <h2>${title}</h2>
      <p>Vote Average: ${voteAverage}</p>
      <p>Vote Count: ${voteCount}</p>
      <p>Popularity: ${popularity}</p>
      <p>Original Title: ${originalTitle}</p>
      <p>Genre IDs: ${genreIds}</p>
      <button class="button-close">Close</button>
    </div>
  `;

  return markup;
};

const closeModal = () => {
  const filmModal = document.querySelector('.film-modal');
  filmModal.remove();
};

const showDynamicModal = data => {
  const filmModalMarkup = createFilmModalMarkup(data);
  const filmModalContainer = document.querySelector('.film-modal-container');
  filmModalContainer.innerHTML = filmModalMarkup;
  const closeBtn = document.querySelector('.button-close');
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
  window.addEventListener('click', closeModal);
};
