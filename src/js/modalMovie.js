import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchFilmDetailsById } from './fetchDetails';
import { fetchTrailerById } from './trainer';
import { loader, displayLoader } from './displayLoader';
import { addToWatched, addToQueue } from './local-storage';

const refs = {
  galleryBox: document.querySelector('.movies__list'),
  filmModal: document.querySelector('[data-modal]'),
  searchId: [],
  filmDetails: {},
};

refs.galleryBox.addEventListener('click', galleryBoxClick);

async function galleryBoxClick(event) {
  const galleryItem = event.target.closest('[data-id]');
  if (!galleryItem) return;

  const filmId = galleryItem.dataset.id;
  console.log('ID filmu:', filmId);

  let searchIdDetails = null;
  if (refs.searchId.length > 0) {
    searchIdDetails = refs.searchId.find(film => film.id == filmId);
  }

  displayLoader(loader);

  const filmDetailsResponse = await fetchFilmDetailsById(filmId);
  const filmDetails = filmDetailsResponse.data;

  const trailerData = await fetchTrailerById(filmId);
  const trailerKey = trailerData.results[0]?.key; // Pobierz pierwszy klucz trailera z danych

  filmDetails.trailerKey = trailerKey; // Dodaj klucz trailera do obiektu filmDetails

  refs.filmDetails = filmDetails;
  refs.searchId.push(filmDetails);
  refs.filmModal.classList.remove('is-hidden');
  renderFilmModal(refs.filmDetails);
}

function createFilmModalMarkup(data) {
  const {
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    overview,
    poster_path,
    genres,
  } = data;
  const posterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const genreNames = genres.map(element => element.name).join(' ');

  return `
    <div class="film-modal">
      <button class="button-close" type="button" button-modal-close>X</button>
      <img class="film__image" src="${posterPath}" alt="Film Image" data-trailer-key="${data.trailerKey}" />
      <article>
        <div class="film__content">
          <h2 class="film__title">${title}</h2>
          <ul class="film__details">
            <li><strong>Original Title:</strong> ${original_title}</li>
            <li><strong>Genres:</strong> ${genreNames}</li>
            <li><strong>Vote Average:</strong> ${vote_average}</li>
            <li><strong>Vote Count:</strong> ${vote_count}</li>
            <li><strong>Popularity:</strong> ${popularity}</li>
          </ul>
          <div class="film-description">
            <h3 class="film-description__title">About</h3>
            <p class="film-description__text">${overview}</p>
          </div>
        </div>
        <ul class="film-button">
          <li class="film-button__item">
            <button class="film-button__primary library__btn library__btn--onclick" type="button" button-add-watch>
              Add to Watched
            </button>
          </li>
          <li class="film-button__item">
            <button class="film-button__primary library__btn" type="button" button-add-queue>
              Add to Queue
            </button>
          </li>
        </ul>
      </article>
    </div>
  `;
}

function closeModal() {
  refs.filmModal.classList.add('is-hidden');
  refs.filmModal.innerHTML = '';
}

async function renderFilmModal(data) {
  console.log('renderFilmModal data:', data);
  const filmModalMarkup = createFilmModalMarkup(data);
  refs.filmModal.insertAdjacentHTML('beforeend', filmModalMarkup);
  displayLoader(loader);

  const closeBtn = document.querySelector('.button-close');
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
  window.addEventListener('click', closeModal);

  const posterPathImg = document.querySelector('.film__image');
  posterPathImg.addEventListener('click', () => {
    const trailerKey = posterPathImg.dataset.trailerKey;
    if (trailerKey) {
      openTrailer(trailerKey);
    }
  });

  const addToWatchedBtn = document.querySelector('[button-add-watch]');
  addToWatchedBtn.addEventListener('click', addToWatchedHandler);

  const addToQueueBtn = document.querySelector('[button-add-queue]');
  addToQueueBtn.addEventListener('click', addToQueueHandler);
}

function openTrailer(trailerKey) {
  if (trailerKey) {
    const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
    window.open(trailerUrl, '_blank');
  }
}

async function addToWatchedHandler() {
  const film = {
    id: refs.filmDetails.id,
    title: refs.filmDetails.title,
    posterPath: refs.filmDetails.poster_path,
    releaseYear: refs.filmDetails.release_date,
    genreNames: refs.filmDetails.genres,
  };

  addToWatched(film);

  console.log('Film added to Watched:', film);
}

async function addToQueueHandler() {
  const film = {
    id: refs.filmDetails.id,
    title: refs.filmDetails.title,
    posterPath: refs.filmDetails.poster_path,
    releaseYear: refs.filmDetails.release_date,
    genreNames: refs.filmDetails.genres,
  };

  addToQueue(film);

  console.log('Film added to Queue:', film);
}

export { closeModal };
