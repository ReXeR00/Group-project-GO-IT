import { fetchFilmDetailsById } from './fetchDetails';
import axios from 'axios';
import { loader, displayLoader } from './displayLoader';

const refs = {
  // galleryBox: document.querySelector('[data-modal-open]'),
  galleryBox: document.querySelector('.movies__list'),
  filmModal: document.querySelector('[data-modal]'),
  searchId: [],
  filmDetails: {},
};
refs.galleryBox.addEventListener('click', galleryBoxClick);

async function galleryBoxClick(event) {
  if (event.target.classList.contains('.movies__list')) {
    return;
  }
  const galleryItem = event.target.closest('[data-id]');
  const filmId = galleryItem.dataset.id;
  console.log('ID filmu:', filmId);

  let searchIdDetails = null;
  if (refs.searchId.length > 0) {
    searchIdDetails = refs.searchId.find(film => film.id == filmId);
  }
  displayLoader(loader);
  const filmDetailsResponse = await fetchFilmDetailsById(filmId);
  const filmDetails = filmDetailsResponse.data;
  refs.filmDetails = filmDetails;
  refs.searchId.push(filmDetails);
  refs.filmModal.classList.remove('is-hidden'), renderFilmModal(refs.filmDetails);
}

// clearFilmModalMarkup();

function createFilmModalMarkup(data) {
  console.log('createFilmModalMarkup', data);
  const title = data.title;
  const vote_average = data.vote_average;
  const vote_count = data.vote_count;
  const popularity = data.popularity;
  const original_title = data.original_title;
  const overview = data.overview;
  const posterPath = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  console.log(title);
  console.log(posterPath);

  const genreNames = data.genres;

  const gen = genreNames.map(element => {
    return ` ${element.name}`;
  });

  return `
    <div class="film-modal" >
    <button class="button-close" type="button" button-modal-close>X</button>

      <img
        class="film__image"
        src="${posterPath}"
        alt="Film Image"
      />
      <article>
        <div class="film__content">
          <h2 class="film__title">${title}</h2>
          <ul class="film-info">
            <li class="film-info__item">
              <p class="film-info__label">Vote / Votes</p>
              <div class="film-vote">
                <span class="film-vote__label film-vote__label--orange">
                  ${vote_average}
                </span>
                <span>/</span>
                <span class="film-vote__label">${vote_count}</span>
              </div>
            </li>
            <li class="film-info__item">
              <p class="film-info__label">Popularity</p>
              <span class="film-info__text">${popularity}</span>
            </li>
            <li class="film-info__item">
              <p class="film-info__label">Original Title</p>
              <span class="film-info__text film-info__text--uppercase">
                ${original_title}
              </span>
            </li>
            <li class="film-info__item">
              <p class="film-info__lable">Genre</p>
              <span class="film-info__text">${gen} </span>
            </li>
          </ul>
          <div class="film-description">
            <h3 class="film-description__title">About</h3>
            <p class="film-description__text">${overview}</p>
          </div>
        </div>
        <ul class="film-button">
          <li class="film-button__item">
            <button
              class="film-button__primary library__btn library__btn--onclick"
              type="button"
              button-add-watch
            >
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

function renderFilmModal(data) {
  console.log('renderFilmModal data:', data);
  const fiimModalMarkup = createFilmModalMarkup(data);
  refs.filmModal.insertAdjacentHTML('beforeend', fiimModalMarkup);
  displayLoader(loader);
  const closeBtn = document.querySelector('.button-close');
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
  window.addEventListener('click', closeModal);
}

function closeModal() {
  refs.filmModal.classList.add('is-hidden');
  refs.filmModal.innerHTML = '';
}

async function fetchFilmDetailsByIdCurrent(filmId) {
  const response = await axios.get(`API_URL/films/${filmId}`);
  return response.data;
}

async function addToWatchedHandler() {
  const film = {
    id: refs.filmDetails.id,
    title: refs.filmDetails.title,
    posterPath: refs.filmDetails.poster_path,
  };

  addToWatched(film);

  console.log('Film added to Watched:', film);
}

async function addToQueueHandler() {
  const film = {
    id: refs.filmDetails.id,
    title: refs.filmDetails.title,
    posterPath: refs.filmDetails.poster_path,
  };

  addToQueue(film);

  console.log('Film added to Queue:', film);
}
