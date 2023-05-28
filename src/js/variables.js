import axios from 'axios';

export const URL = `https://api.themoviedb.org/`;
export const API_KEY = `9cd3003f00fa34df086a65205d0cd538`;

export const API_trendingMovies = '3/trending/movie/week';
export const API_searchMovies = '3/search/movie';
export const API_detailsMovies = '3/movies/get-movie-details';
export const API_videosMovies = '3/movies/get-movie-videos';

export const genreList = {
  16: 'Animation',
  10751: 'Family',
  12: 'Adventure',
  14: 'Fantasy',
  35: 'Comedy',
};

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
