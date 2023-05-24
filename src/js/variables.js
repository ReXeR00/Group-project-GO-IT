import axios from 'axios';

export const URL = `https://api.themoviedb.org/`;
export const API_KEY = `9cd3003f00fa34df086a65205d0cd538`;

export const API_trendingMovies = '3/trending/movie/week?api_key=';
export const API_searchMovies = '3/search/search-movies';
export const API_detailsMovies = '3/movies/get-movie-details';
export const API_videosMovies = '3/movies/get-movie-videos';

export const genreList = {
  16: 'Animation',
  10751: 'Family',
  12: 'Adventure',
  14: 'Fantasy',
  35: 'Comedy',
};

// w tych 3 pozycjach info wyświetlane są w taki sam sposób
// https://api.themoviedb.org/3/trending/get-trending
// https://api.themoviedb.org/3/search/search-movies
// https://api.themoviedb.org/3/movies/get-movie-details
// https://api.themoviedb.org/3/movies/get-movie-videos

// ${title} - tytuł filmu
// ${overview} - opis/ about
// ${poster_path} - trzeba wcześniej dodać jeszcze ścieżkę https://image.tmdb.org/t/p/original (zgodnie z info https://developer.themoviedb.org/docs/image-basics)
// ${vote_average} - ocena / ${vote_count} - liczbę głosów
// ${popularity} - popularność
// ${original_title} - oryginalny tytuł filmu
// ${genre_ids} - gatunek, ale podaje go jako nr. Znaczenie numeru jest tu:

// https://api.themoviedb.org/3/genre/movie/list
// ${genres.name}

const inputSearchEl = document.getElementById('search_input');

let query = '';
let page = 1;

export async function fetchMovies(query, page) {
  try {
    query = inputSearchEl.value;
    console.log(query);
    const response = await axios.get(
      `${URL}${API_searchMovies}?api_key=${API_KEY}&query=${query}&language=en-US&page=${page}`,
    );
    return response;
  } catch (error) {
    console.log(error.status);
  }
}
// Exportujemy funkcję fetchMovies, która wysyła zapytanie do API z podanym zapytaniem (query) i numerem strony (page).
// Otrzymujemy odpowiedź (response), która może być następnie przetworzona i wykorzystana w dalszej części kodu.

