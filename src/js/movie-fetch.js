const axios = require('axios').default;

const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie/`;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/day`;
const GET_ONE_MOVIE_URL = `https://api.themoviedb.org/3/movie`;
const MOVIE_GENRES_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

const parameters = {
  page: 1,
  moviesPage: 1,
  searchQueryStr: '',
  movieId: null,
};

// Get genres array
export async function getGenresIds() {
  const response = await axios.get(`${MOVIE_GENRES_URL}?api_key=${API_KEY}`);

  return response.data.genres;
}

//Get one movie by id
export async function getDataMovie(id) {
  const response = await axios.get(`${MOVIE_URL}${id}`, {
    params: {
      api_key: API_KEY,
    },
  });

  return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

//First request for searching movie by name
export async function getDataMovies(searchQuery) {
  parameters.searchQueryStr = searchQuery;

  const response = await axios.get(`${SEARCH_URL}`, {
    params: {
      api_key: API_KEY,
      query: searchQuery,
      page: 1,
    },
  });

  return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
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

  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

//First request for get trending movies
export async function getTrendingMoviesData() {
  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: API_KEY,
      page: parameters.page,
    },
  });

  return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

export async function getMoreTrendingMoviesData(page) {
  parameters.page = page;

  const response = await axios.get(`${TRENDING_URL}`, {
    params: {
      api_key: API_KEY,
      page: parameters.page,
    },
  });

  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

//To make a request of one movie by movie-id, it is neccesary to pass movie-id as an function argument
//You can find movie-id as an HTML data atribute here: < a class='movie-card' data-movie-id={ { id } }>
export async function getOneMovieById(movieId) {
  // request for one movie by movie_id
  const response = await axios.get(`${GET_ONE_MOVIE_URL}/${movieId}`, {
    params: {
      api_key: API_KEY,
    },
  });
  // array of our beloved genres:)
  const genresArr = [];
  // an object with all the necessary properties for further rendering
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
  // generating an array of our beloved genres:)
  response.data.genres.map(genre => {
    genresArr.push(genre.name);
  });

  return movieData;
}
