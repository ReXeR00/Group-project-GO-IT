const API_KEY = `9cd3003f00fa34df086a65205d0cd538`;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrailerById(id) {
  const url = new URL(`${BASE_URL}/movie/${id}/videos`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
