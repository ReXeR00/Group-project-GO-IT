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
