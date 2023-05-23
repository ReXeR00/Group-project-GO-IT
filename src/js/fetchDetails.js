import axios from 'axios';
import { API_KEY } from './variables';

export async function fetchFilmDetailsById(id) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      {
        params: {
          api_key: API_KEY,
          movie_id: id,
        },
      },
    );
    console.log('fetchFilmDetailsById:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
