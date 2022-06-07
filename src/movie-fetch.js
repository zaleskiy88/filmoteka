import itemsTemplate from './templates/card-of-list.hbs';

const axios = require('axios').default;

const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day`;

const parameters = { page: 1, moviesPage: 1, searchQueryStr: '' };
// ! ------------------------------------------------------------------------------------------
async function getGenresIds() {
  const response = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=842344de8347536aefc6f17e8e76d4bd&language=en-US'
  );

  //console.log('genres :>> ', genres.data.genres);
  return response.data.genres;
}

//===========================================
const gallery = document.querySelector('.gallery');

async function galleryMarkup() {
  const moviesData = await getTrendingMoviesData();
  const genres = await getGenresIds();
  // console.log('moviesData :>> ', moviesData.results[0]);

  const movieCategories = moviesData.results.map(movie => {
    const catArr = [];
    const movieInfo = {
      name: movie.title,
      release: movie.release_date,
      id: movie.id,
      genres: catArr,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };

    movie.genres = movie.genre_ids.map(id =>
      genres.find(el => {
        if (el.id === id) {
          return catArr.push(el.name);
        }
      })
    );

    return movieInfo;
  });

  console.log('movieCategories :>> ', movieCategories);

  const markup = itemsTemplate(movieCategories);
  gallery.insertAdjacentHTML('beforeend', markup);
}
galleryMarkup();

// ! ------------------------------------------------------------------------------------------
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

getDataMovies('black');
