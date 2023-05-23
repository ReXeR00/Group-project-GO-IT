import axios from 'axios';
import { URL, API_KEY } from './variables';

// axios.defaults.baseURL = URL;

export async function fetchFilmDetailsById(id) {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}}`, {
params: {
    api_key: API_KEY,
},
        });
        console.log(response);

return response;
    }
    catch (error){
console.log(error);
    }
}


console.log(fetchFilmDetailsById(2));