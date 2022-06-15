import axios from 'axios';
import constants from '../../constants/constants';
import Notiflix from 'notiflix';

export default async function getDataMovies(searchQuery, page) {
  const response = await axios.get(`${constants.SEARCH_URL}`, {
    params: {
      api_key: constants.API_KEY,
      query: searchQuery,
      page,
      language: localStorage.lang,
    },
  });
  return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}