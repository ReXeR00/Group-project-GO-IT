import { fetchFilmDetailsById } from './fetchDetails';
const moviesLibraryEl = document.querySelector('.movies__library');

export const localStorageKeys = {
  WATCHED: 'watchedMovies',
  QUEUE: 'movieQueue',
};

const getFromStorage = key => {
  try {
    const serializedValue = localStorage.getItem(key);
    return JSON.parse(serializedValue);
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const setToLocalStorage = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.log(error.message);
  }
};

export const addToWatched = film => {
  try {
    let watchedFilmIds = getFromStorage(localStorageKeys.WATCHED) || [];

    if (!watchedFilmIds.includes(film.id)) {
      watchedFilmIds.push(film.id);
      setToLocalStorage(localStorageKeys.WATCHED, watchedFilmIds);
      console.log('Film added to Watched:', film);
    } else {
      console.log('Film already exists in Watched:', film);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const addToQueue = film => {
  try {
    let filmQueueIds = getFromStorage(localStorageKeys.QUEUE) || [];

    if (!filmQueueIds.includes(film.id)) {
      filmQueueIds.push(film.id);
      setToLocalStorage(localStorageKeys.QUEUE, filmQueueIds);
      console.log('Film added to Queue:', film);
    } else {
      console.log('Film already exists in Queue:', film);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const renderfromLocalStorage = () => {
  const watchedEl = document.getElementById('watched');
  const queueEl = document.getElementById('queue');
  let parsedData = null;

  const handleButtonClick = (buttonEl, storageKey) => {
    watchedEl.classList.toggle('library__btn--onclick', buttonEl === watchedEl);
    queueEl.classList.toggle('library__btn--onclick', buttonEl === queueEl);
    parsedData = getFromStorage(storageKey) || [];
    renderMovies(parsedData);
  };

  watchedEl.addEventListener('click', () => handleButtonClick(watchedEl, localStorageKeys.WATCHED));
  queueEl.addEventListener('click', () => handleButtonClick(queueEl, localStorageKeys.QUEUE));

  handleButtonClick(watchedEl, localStorageKeys.WATCHED);

  function renderMovies(data) {
    console.log('data', data)
    moviesLibraryEl.innerHTML = '';

    if (data === null) return;

    Promise.all(data.map(movieId => fetchFilmDetailsById(movieId)))
      .then(filmDetailsResponses => {
        const moviesElements = filmDetailsResponses.map(filmDetailsResponse => {
          const filmDetails = filmDetailsResponse.data;
          return createMovieElement(filmDetails);
        });
        moviesLibraryEl.insertAdjacentHTML('beforeend', moviesElements.join(''));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function createMovieElement(data) {
    const { id, title, poster_path, release_date, genres } = data;
    const posterPath = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const releaseYear = new Date(release_date).getFullYear();
    const genreNames = genres
      .slice(0, 3)
      .map(genre => genre.name)
      .join(', ');

    return `
      <li class="movies__element" data-id="${id}">
        <figure>
          <img src="${posterPath}" alt="Movie Poster" class="movies__poster">
          <figcaption>
            <p class="movies__title">${title}</p>
            <p class="movies__type">${genreNames} | <span class="movies__year">${releaseYear}</span></p>
          </figcaption>
        </figure>
      </li>
    `;
  }
};
