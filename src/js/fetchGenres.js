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
    console.log(response);
    const genres = response.data.genres;

    genres.forEach(genre => {
      genreList[genre.id] = genre.name;
    });
  } catch (error) {
    console.error(error);
  }
};

console.log('lista gatunkow', genreList);
