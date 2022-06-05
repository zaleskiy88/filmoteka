const axios = require('axios').default;

const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/`;
const TRENDING_URL = 'https://api.themoviedb.org/3/trending/movie/day';

let page = 1;
let moviesPage = 1;
let searchQueryStr = '';

//первый запрос для поиска фильма по-имени
export async function getDataMovies(searchQuery) {
  searchQueryStr = searchQuery;

  const response = await axios.get(
    `${SEARCH_URL}?api_key=${API_KEY}&query=${searchQuery}&page=1`
  );

  const dataResults = await response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data

  return dataResults;
}

//
export async function getMoreMoviesData(searchQuery) {
  moviesPage =
    searchQueryStr === searchQuery ? (moviesPage += 1) : (moviesPage = 1);

  const response = await axios.get(
    `${SEARCH_URL}?api_key=${API_KEY}&query=${searchQuery}&page=${moviesPage}`
  );
  const dataResults = response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data

  return dataResults;
}

//первый запрос популярных фильмов
export async function getTrendingMovies() {
  const response = await axios.get(`${TRENDING_URL}?api_key=${API_KEY}`);
  const dataResults = await response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data

  return dataResults;
}

export async function getMoreTrendingMovies() {
  page += 1;
  const response = await axios.get(
    `${TRENDING_URL}?api_key=${API_KEY}&page=${page}`
  );
  const dataResults = await response.data.results; // возвращает объект с данными фильмов. Для того чтоб достучатся к свойствам page, total_pages, total_results нужно обратится к response.data

  return dataResults;
}
