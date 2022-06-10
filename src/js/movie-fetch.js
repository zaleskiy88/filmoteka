const axios = require('axios').default;

const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day`;
const GET_ONE_MOVIE_URL = `https://api.themoviedb.org/3/movie`;
const MOVIE_GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/'

const parameters = {
  page: 1,
  moviesPage: 1,
  searchQueryStr: '',
  movieId: null,
};

// Получение массива жанров
export async function getGenresIds() {
  const response = await axios.get(`${MOVIE_GENRES_URL}?api_key=${API_KEY}`);

  return response.data.genres;
}

//Get one movie by id
export async function getDataMovie(id) {
  // parameters.searchQueryStr = searchQuery;

  const response = await axios.get(`${MOVIE_URL}${id}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return await response.data; // возвращает объект с данными о запросе{ page, results, total_pages, total_results }. Для того чтоб достучатся к фильмам нужно обратится к response.data.results
}

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

  return await response.data; // возвращает объект с данными о запросе{ page, results, total_pages, total_results }. Для того чтоб достучатся к фильмам нужно обратится к response.data.results
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

  return response.data; // возвращает объект с данными о запросе{ page, results, total_pages, total_results }. Для того чтоб достучатся к фильмам нужно обратится к response.data.results
}

//первый запрос популярных фильмов
export async function getTrendingMoviesData() {
  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: API_KEY,
      page: parameters.page,
    },
  });

  return await response.data; // возвращает объект с данными о запросе{ page, results, total_pages, total_results }. Для того чтоб достучатся к фильмам нужно обратится к response.data.results
}

export async function getMoreTrendingMoviesData() {
  parameters.page += 1;

  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: API_KEY,
      page: parameters.page,
    },
  });

  return await response.data; // возвращает объект с данными о запросе{ page, results, total_pages, total_results }. Для того чтоб достучатся к фильмам нужно обратится к response.data.results
}
//========================================
//чтоб вызвать запрос функции нужно передать аргументом айдишник фильма,
//который находится в < a class='movie-card' data-movie-id={ { id } }> как дата атрибут.
//пример:getOneMovieById(элемент.dataset.movieId)
export async function getOneMovieById(movieId) {
  movieId = Number(a.dataset.movieId);
  // запрос на один фильм по movie_id
  const response = await axios.get(`${GET_ONE_MOVIE_URL}/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  // массив наших любимых жанров:)
  const genresArr = [];
  // обьект со всеми нужными свойствами для подальшей отрисовки
  const movieData = {
    poster_path: response.data.poster_path,
    title: response.data.title,
    vote_average: response.data.vote_average,
    vote_count: response.data.vote_count,
    popularity: response.data.popularity,
    original_title: response.data.original_title,
    genres: genresArr,
    overview: response.data.overview,
  };
  // генерация массива наших любимых жанров:)
  response.data.genres.map(genre => {
    genresArr.push(genre.name);
  });

  return movieData;
}
