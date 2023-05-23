import axios from 'axios';
import { genreList, fetchGenres } from './fetchGenres';
import { URL, API_KEY, API_trendingMovies } from './variables';
import { showPagination } from './pagination';

const moviesListEl = document.querySelector('.movies__list');

export const getPopular = async page => {
  try {
    const result = await axios.get(URL + API_trendingMovies, {
      params: {
        api_key: API_KEY,
        page: page,
      },
    });
    await fetchGenres();

    return result;
  } catch (error) {
    console.error(error);
  }
};

getPopular().then(movie => {
  renderPopular(movie.data.results);
  showPagination(movie);
});

export const renderPopular = movies => {
  moviesListEl.innerHTML = '';

  movies.forEach(movie => {
    const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const releaseYear = new Date(movie.release_date).getFullYear();
    const genreNames = movie.genre_ids
      .slice(0, 3)
      .map(genreId => genreList[genreId])
      .join(', ');
    const movieEl = `
        <li class="movies__element">
          <figure>
            <img src="${posterPath}" alt="Movie Poster" class="movies__poster">
            <figcaption>
              <p class="movies__title">${movie.title}</p>
              <p class="movies__type">${genreNames} | <span class="movies__year">${releaseYear}</span></p>
            </figcaption>
          </figure>
        </li>
      `;

    moviesListEl.insertAdjacentHTML('beforeend', movieEl);
  });
};

getPopular();
