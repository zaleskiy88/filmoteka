import itemsTemplate from '../templates/card-of-list.hbs';

const axios = require('axios').default;

const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day`;
const MOVIE_GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list';

const parameters = { page: 1, moviesPage: 1, searchQueryStr: '' };
const gallery = document.querySelector('.gallery');

// Получение массива жанров
async function getGenresAndIds() {
  const response = await axios.get(`${MOVIE_GENRES_URL}?api_key=${API_KEY}`);

  return response.data.genres;
}

// генератор разметки галереи с фильмами
async function moviesGalleryMarkup(movieFetchCallback) {
  const moviesData = await movieFetchCallback(searchQuery); //получаем данные о фильмах
  const genres = await getGenresAndIds(); //получаем жанры и айдишники фильмов {}

  // Создание объекта в котором хранится информация для Handlebars
  const movieCategories = moviesData.results.map(movie => {
    const genresArr = [];
    const dataRelease = movie.release_date.slice(0, 4);
    const movieNameUpperCase = movie.title.toUpperCase();

    //объект в котором содержаться необходимые свойства для подальшей отрисовки карточки фильма
    const movieInfo = {
      name: movieNameUpperCase,
      release: dataRelease,
      id: movie.id,
      genres: genresArr,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };

    // Сравнивает жанры из массива жанров с id жанров из общего запроса и добавляет нужные в объект для Handlebars
    const movieGenres = function () {
      movie.genre_ids.map(id =>
        genres.find(el => {
          if (el.id === id) {
            return genresArr.push(el.name);
          }
        })
      );
    };

    movieGenres();
    return movieInfo;
  });

  // Создание разметки
  const markup = itemsTemplate(movieCategories);
  gallery.insertAdjacentHTML('beforeend', markup);
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
