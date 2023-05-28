import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchFilmDetailsById } from './fetchDetails';
import axios from 'axios';
import { loader, displayLoader } from './displayLoader';
import { addToWatched, addToQueue } from './local-storage';

// aby dodać basicLightbox
// terminal: npm install basiclightbox

export const API_KEY = `9cd3003f00fa34df086a65205d0cd538`;
const BASE_URL = 'https://api.themoviedb.org/3';

// funkcja łapania trainerów

async function fetchTrailerById(id) {
  const url = new URL(`${BASE_URL}/movie/${id}/videos`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// kod modalMovie.js z przróbką:

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { fetchFilmDetailsById } from './fetchDetails';
import { fetchTrailerById } from './trailer';
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

  refs.filmDetails = filmDetails;
  refs.searchId.push(filmDetails);
  refs.filmModal.classList.remove('is-hidden');
  renderFilmModal(refs.filmDetails);

  const trailerData = await fetchTrailerById(filmId);
  if (trailerData.results.length > 0) {
    const trailerKey = trailerData.results[0].key;
    openTrailer(trailerKey);
  }
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
          <ul class="film-info">
            <li class="film-info__item">
              <p class="film-info__label">Vote / Votes</p>
              <div class="film-vote">
                <span class="film-vote__label film-vote__label--orange">${vote_average}</span>
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
              <span class="film-info__text film-info__text--uppercase">${original_title}</span>
            </li>
            <li class="film-info__item">
              <p class="film-info__lable">Genre</p>
              <span class="film-info__text">${genreNames}</span>
            </li>
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

function openTrailer(trailerKey) {
  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
  const trailerLightbox = basicLightbox.create(`
    <div class="lightbox-content">
      <iframe width="560" height="315" src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
  `);

  const closeLightbox = () => {
    trailerLightbox.close();
  };
  trailerLightbox.on('show', () => {
    window.addEventListener('keydown', closeLightbox);
    document.addEventListener('click', closeLightbox);
  });
  trailerLightbox.on('close', () => {
    window.removeEventListener('keydown', closeLightbox);
    document.removeEventListener('click', closeLightbox);
  });

  trailerLightbox.show();
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
