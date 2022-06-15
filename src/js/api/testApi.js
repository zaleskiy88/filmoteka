import { api, searchParameters } from './api';
import { API_KEY } from './../../constants/constants';

async function testApiTrending() {
  const response = await api.get(`/trending/movie/day`, {
    params: {...searchParameters, api_key: API_KEY},
  });
  console.log(response.data);
  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

testApiTrending(1);
