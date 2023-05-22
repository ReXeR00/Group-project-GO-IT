import { API_KEY } from './variables';

import axios from 'axios';

export const moviesListEl = document.querySelector('.movies__list');
export const page = 1;

const URL = 'https://api.themoviedb.org/3/trending/all/day';

export const trendingMovies = async page => {
  const response = await axios.get(URL, {
    params: {
      api_key: API_KEY,
      page: page,
    },
  });

  return response;
};

export const showTrendingMovies = movie => {
  moviesListEl.innerHTML = '';

  movie.data.results.map(el => {
    const movieElement = `
        <li class="movies__element">
          <figure>
            <img src="https://image.tmdb.org/t/p/original/${el.poster_path}" alt="opis filmu" class="movies__poster">
            <figcaption>
              <p class="movies__title">${el.title}</p>
              <p class="movies__type">Drama, Action | <span class="movies__year">2020</span></p>
            </figcaption>
          </figure>
        </li>
    `;
    moviesListEl.insertAdjacentHTML('afterbegin', movieElement);
  });
};
