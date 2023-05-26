import axios from 'axios';
import { URL, API_KEY, genreList } from './variables';

const searchInput = document.getElementById('search_input');
const moviesListEl = document.querySelector('.movies__list');
const searchMessageEl = document.getElementById('search__message');

const fetchMovies = async query => {
  try {
    const response = await axios.get(
      `${URL}3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US`,
    );
    return response.data.results;
  } catch (error) {
    throw new Error('Wystąpił błąd podczas pobierania filmów');
  }
};

const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${URL}3/movie/popular?api_key=${API_KEY}&language=en-US`);
    return response.data.results;
  } catch (error) {
    throw new Error('Wystąpił błąd podczas pobierania popularnych filmów');
  }
};

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
    try {
      const movies = await fetchPopularMovies();
      renderMovies(movies);
      searchMessageEl.style.display = 'none'; // Ukryj tekst błędu
    } catch (error) {
      console.log('Wystąpił błąd podczas pobierania popularnych filmów:', error);
    }
  }
};

searchInput.addEventListener('input', handleInputSearch);
