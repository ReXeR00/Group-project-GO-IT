import axios from 'axios';
import { URL, API_KEY, API_searchMovies } from './variables';
import { renderPopular, getPopular } from './trending';
import { showPagination } from './pagination';

export const searchInput = document.getElementById('search_input');
const searchMessageEl = document.getElementById('search__message');
export let query = '';

let page = 1;

export const fetchMovies = async (query, page) => {
  try {
    const result = await axios.get(URL + API_searchMovies, {
      params: {
        api_key: API_KEY,
        query: query,
        page: page,
        language: 'en-US',
      },
    });

    let totalResults = result.data.total_results;
    if (totalResults > 0) {
      searchMessageEl.classList.add('is-hidden'); // Wyświetl tekst błędu
    } else {
      searchMessageEl.classList.remove('is-hidden'); // Ukryj tekst błędu
    }

    return result;
  } catch (error) {
    throw new Error('Wystąpił błąd podczas pobierania filmów');
  }
};


searchInput.addEventListener('input', e => {
  if (searchInput.value !== '') {
    query = e.currentTarget.value;
    if (query === '') return;
    fetchMovies(query, page).then(movie => {
      renderPopular(movie.data.results);
      showPagination(movie);
    });

const renderMovies = movies => {
  moviesListEl.innerHTML = '';

  movies.forEach(movie => {
    const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const releaseYear = new Date(movie.release_date).getFullYear();
    const genreNames = movie.genre_ids
      .slice(0, 3)
      .map(genreId => genreList[genreId])
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

    moviesListEl.insertAdjacentHTML('beforeend', movieEl);
  });
};

const handleInputSearch = async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    try {
      const movies = await fetchMovies(searchTerm);
      renderMovies(movies);

      if (movies.length > 0) {
        searchMessageEl.style.display = 'none'; // Ukryj tekst błędu
      } else {
        searchMessageEl.style.display = 'flex'; // Wyświetl tekst błędu
      }
    } catch (error) {
      console.log('Wystąpił błąd podczas pobierania filmów:', error);
    }
  } else {
    getPopular().then(movie => {
      renderPopular(movie.data.results);
      showPagination(movie);
    });
  }
});
