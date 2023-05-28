import axios from 'axios';
import { API_KEY } from './variables';
import { genreList, fetchGenres } from './fetchGenres';

export async function fetchFilmDetailsById(id) {
  try {
     
     const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
      {
        params: {
      
          movie_id: id,
        },
      },
      );
     
    return response;
    
  } catch (error) {
    console.log(error);
    throw error;
  }
}
