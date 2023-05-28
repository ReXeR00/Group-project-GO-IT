import axios from 'axios';

import { API_KEY } from './variables';

export const genreList = {};

export const fetchGenres = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: API_KEY,
      },
    });
    const genres = response.data.genres;

    genres.map(genre => {
      genreList[genre.id] = genre.name;
    });
  } catch (error) {
    console.error(error);
  }
};