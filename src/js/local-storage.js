// import { addToWatchedHandler } from './modalMovie';

const localStorageKeys = {
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
    let watchedFilms = getFromStorage(localStorageKeys.WATCHED) || [];

    watchedFilms.push(film);

    setToLocalStorage(localStorageKeys.WATCHED, watchedFilms);
    console.log('Film added to Watched:', film);
  } catch (error) {
    console.log(error.message);
  }
};

export const addToQueue = film => {
  try {
    let filmQueue = getFromStorage(localStorageKeys.QUEUE) || [];
    filmQueue.push(film);
    setToLocalStorage(localStorageKeys.QUEUE, filmQueue);
    console.log('Film added to Queue:', film);
  } catch (error) {
    console.log(error.message);
  }
};

const parsedData = JSON.parse(localStorage.getItem(localStorageKeys.WATCHED));
console.log('parsed data', parsedData);

const moviesLibraryEl = document.querySelector('.movies__library');

parsedData.forEach(movie => {
  console.log(movie);
  const posterPath = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
  // const releaseYear = new Date(movie.release_date).getFullYear();
  // const genreNames = movie.genre_ids
  //   .slice(0, 3)
  //   .map(genreId => genreList[genreId])
  //   .join(', ');

  const movieEl = `
        <li class="movies__element" data-id="${movie.id}">
          <figure>
            <img src="${posterPath}" alt="Movie Poster" class="movies__poster">
            <figcaption>
              <p class="movies__title">${movie.title}</p>
              <p class="movies__type">tutaj będzie genre | <span class="movies__year">rok jakiśtam</span></p>
            </figcaption>
          </figure>
        </li>
      `;

  moviesLibraryEl.insertAdjacentHTML('beforeend', movieEl);
});
