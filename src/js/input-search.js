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
  } else {
    getPopular().then(movie => {
      renderPopular(movie.data.results);
      showPagination(movie);
    });
  }
});
