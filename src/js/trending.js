import axios from 'axios';
import { genreList, fetchGenres } from './fetchGenres';
import { URL, API_KEY, API_trendingMovies } from './variables';

const moviesListEl = document.querySelector('.movies__list');

const getPopular = async () => {
  try {
    const result = await axios.get(`${URL}${API_trendingMovies}${API_KEY}`);
    await fetchGenres();
    renderPopular(result.data.results);
  } catch (error) {
    console.error(error);
  }
};

const renderPopular = movies => {
  movies.forEach(movie => {
    const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const releaseYear = new Date(movie.release_date).getFullYear();
    const genreNames = movie.genre_ids
      .slice(0, 3)
      .map(genreId => genreList[genreId])
      .join(', ');

    const movieEl = `
  <li class="movies__element" data-id="${movie.id}" >
    <figure>
      <img src="${posterPath}" alt="Movie Poster" class="movies__poster">
      <figcaption>
        <p class="movies__title">${movie.title}</p>
        <p class="movies__type">${genreNames} | <span class="movies__year">${releaseYear}</span></p>
      </figcaption>
    </figure>
  </li>
`;
    // console.log('Movie:', movie);
    moviesListEl.insertAdjacentHTML('beforeend', movieEl);
  });
};

getPopular();
