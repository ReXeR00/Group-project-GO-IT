import axios from 'axios';
import { genreList, fetchGenres } from './fetchGenres';
import { URL, API_KEY, API_trendingMovies } from './variables';

import { showPagination } from './pagination';

import { displayLoader, loader } from './displayLoader';

const moviesListEl = document.querySelector('.movies__list');

export const getPopular = async page => {
  displayLoader(loader);
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
  } finally {
    displayLoader(loader);
  }
};

getPopular().then(movie => {
  renderPopular(movie.data.results);
  showPagination(movie);
});

export const renderPopular = movies => {
  moviesListEl.innerHTML = '';

  const movieElements = movies
    .map(movie => {
      const { poster_path, release_date, genre_ids, title, id } = movie;
      const posterPath = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : 'https://www.cloudways.com/blog/wp-content/uploads/How-to-Create-Custom-Codeigniter-404-Not-Found-Page-1.jpg';
      const releaseYear = new Date(release_date).getFullYear();
      const genreNames = genre_ids
        .slice(0, 3)
        .map(genreId => genreList[genreId])
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
    })
    .join('');

  moviesListEl.insertAdjacentHTML('beforeend', movieElements);
};
