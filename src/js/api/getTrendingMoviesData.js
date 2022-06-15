import axios from 'axios';
import constants from '../../constants/constants';

export default async function getTrendingMoviesData(page) {
  const response = await axios.get(`${constants.TRENDING_URL}`, {
    params: {
      api_key: constants.API_KEY,
      page,
      language: localStorage.lang,
    },
  });

  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}
