const axios = require('axios').default;

const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day`;

const parameters = { page: 1, moviesPage: 1, searchQueryStr: '' };

//первый запрос для поиска фильма по-имени
export async function getDataMovies(searchQuery) {
  parameters.searchQueryStr = searchQuery;

  const response = await axios.get(`${SEARCH_URL}`, {
    params: {
      api_key: API_KEY,
      query: searchQuery,
      page: 1,
    },
  });

  return await response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data
}

export async function getMoreDataMovies(searchQuery) {
  parameters.moviesPage =
    parameters.searchQueryStr === searchQuery
      ? (parameters.moviesPage += 1)
      : (parameters.moviesPage = 1);

  const response = await axios.get(`${SEARCH_URL}`, {
    params: {
      api_key: API_KEY,
      query: searchQuery,
      page: parameters.moviesPage,
    },
  });

  return response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data
}

//первый запрос популярных фильмов
export async function getTrendingMoviesData() {
  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: API_KEY,
      page: parameters.page,
    },
  });

  return await response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data
}

export async function getMoreTrendingMoviesData() {
  parameters.page += 1;

  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: API_KEY,
      page: parameters.page,
    },
  });

  return await response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data
}
