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

export const renderfromLocalStorage = () => {
  let parsedData = '';

  const watchedEl = document.getElementById('watched');
  const queueEl = document.getElementById('queue');

  const abc = () => {
    if (watchedEl.classList.contains('library__btn--onclick')) {
      parsedData = JSON.parse(localStorage.getItem(localStorageKeys.WATCHED));
    }

    if (queueEl.classList.contains('library__btn--onclick')) {
      parsedData = JSON.parse(localStorage.getItem(localStorageKeys.QUEUE));
    }

    watchedEl.addEventListener('click', () => {
      watchedEl.classList.add('library__btn--onclick');
      queueEl.classList.remove('library__btn--onclick');
      renderfromLocalStorage();
    });

    queueEl.addEventListener('click', () => {
      watchedEl.classList.remove('library__btn--onclick');
      queueEl.classList.add('library__btn--onclick');
      renderfromLocalStorage();
    });
  };

  moviesLibraryEl.innerHTML = '';
  abc();

  if (parsedData === null) return;

  parsedData.forEach(movie => {
    console.log(movie);
    const posterPath = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
    const releaseYear = new Date(movie.releaseYear).getFullYear();
    const genreNames = movie.genreNames
      .slice(0, 3)
      .map(genreId => genreId.name)
      .join(', ');

    const movieEl = `
        <li class="movies__element" data-id="${movie.id}">
          <figure>
            <img src="${posterPath}" alt="Movie Poster" class="movies__poster">
            <figcaption>
              <p class="movies__title">${movie.title}</p>
              <p class="movies__type">${genreNames} | <span class="movies__year">${releaseYear}</span></p>
            </figcaption>
          </figure>
        </li>
      `;

    moviesLibraryEl.insertAdjacentHTML('beforeend', movieEl);
  });
};
