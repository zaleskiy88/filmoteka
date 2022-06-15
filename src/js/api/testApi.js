import { api } from './api';

const searchParameters = {
  query: '',
  page: 1,
  language: localStorage.lang,
};

async function testApiTrending(page) {
  const response = await api.get(`/trending/movie/day`, {
    params: searchParameters,
  });
  console.log(response.data);
  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

testApiTrending(1);
