import axios from "axios";
import constants from '../../constants/constants';
// Get genres array
export default async function getGenresIds() {
    const response = await axios.get(`${constants.MOVIE_GENRES_URL}`, {
      params: {
        api_key: constants.API_KEY,
        language: localStorage.lang,
      },
    });
  
    return response.data.genres;
  }