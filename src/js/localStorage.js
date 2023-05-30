import { fetchFilmDetailsById } from './fetchDetails';
import { drawPagination } from './pagination';
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
    moviesLibraryEl.innerHTML = '';

    if (data === null) return;

    let pages = 0;
    const pagesArr = [];

    for (let i = 0; i < data.length; i = i + 20) {
      pages = i / 20 + 1;
      const page = data.slice(i, i + 20);
      pagesArr.push(page);
    }

    let totalPages = pagesArr.length;

    let currentPage = 1;

    // if (totalPages === 0) return;

    const showLibraryMovies = () => {
      if (totalPages < 1) {
        document.querySelector('.pagination').style.display = 'none';

        return;
      } else {
        document.querySelector('.pagination').style.display = 'flex';
      }

      Promise.all(
        pagesArr[currentPage - 1].map(movieId => {
          return fetchFilmDetailsById(movieId);
        }),
      )
        .then(filmDetailsResponses => {
          const moviesElements = filmDetailsResponses.map(filmDetailsResponse => {
            const filmDetails = filmDetailsResponse.data;
            return createMovieElement(filmDetails);
          });
          moviesLibraryEl.innerHTML = '';
          moviesLibraryEl.insertAdjacentHTML('beforeend', moviesElements.join(''));

          drawPagination(totalPages, currentPage, page => {
            currentPage = +page;
            console.log(currentPage);

            showLibraryMovies();
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    showLibraryMovies();
    

    if (totalPages !== 0) {
      drawPagination(totalPages, currentPage, page => {
        currentPage = page;
  
        showLibraryMovies();
      });
    }
  }

  function createMovieElement(data) {
    const { id, title, poster_path, release_date, genres } = data;
    const posterPath = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : 'https://www.cloudways.com/blog/wp-content/uploads/How-to-Create-Custom-Codeigniter-404-Not-Found-Page-1.jpg';
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
