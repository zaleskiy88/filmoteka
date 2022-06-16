import { api, searchParameters } from './api';
import constants from './../../constants/constants';

async function testApiTrending() {
  const response = await api.get(`/trending/movie/day`, {
    params: {...searchParameters, api_key: constants.API_KEY},
  });
  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

// testApiTrending(1);
