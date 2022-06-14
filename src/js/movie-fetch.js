const axios = require('axios').default;
import Notiflix from 'notiflix';
import constants from '../constants/constants';

const pageLanguage = localStorage.lang;

const parameters = {
  page: 1,
  moviesPage: 1,
  searchQueryStr: '',
  movieId: null,
};

// Get genres array
export async function getGenresIds() {
  const response = await axios.get(`${constants.MOVIE_GENRES_URL}`, {
    params: {
      api_key: constants.API_KEY,
      language: pageLanguage,
    },
  });

  return response.data.genres;
}

//First request for searching movie by name
export async function getDataMovies(searchQuery) {
  parameters.searchQueryStr = searchQuery;

  const response = await axios.get(`${constants.SEARCH_URL}`, {
    params: {
      api_key: constants.API_KEY,
      query: searchQuery,
      page: 1,
      language: pageLanguage,
    },
  });

  //checking whether the poster_path has an image url
  response.data.results.forEach(result => {
    result.poster_path = result.poster_path;
  });

  if (response.data.total_results === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no films matching your search query. Please try again.'
    );
    return;
  } else {
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.total_results} films.`
    );
  }
  return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

export async function getMoreDataMovies(searchQuery, page) {
  const response = await axios.get(`${constants.SEARCH_URL}`, {
    params: {
      api_key: constants.API_KEY,
      query: searchQuery,
      page,
      language: pageLanguage,
    },
  });

  //checking whether poster_path has an image url
  response.data.results.forEach(result => {
    result.poster_path = result.poster_path;
  });

  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

//First request for get trending movies
export async function getTrendingMoviesData() {
  const response = await axios.get(`${constants.TRENDING_URL}`, {
    params: {
      api_key: constants.API_KEY,
      page: parameters.page,
      language: pageLanguage,
    },
  });

  //checking if poster_path has an image url
  response.data.results.forEach(result => {
    result.poster_path = result.poster_path;
  });

  return await response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

export async function getMoreTrendingMoviesData(page) {
  parameters.page = page;

  const response = await axios.get(`${constants.TRENDING_URL}`, {
    params: {
      api_key: constants.API_KEY,
      page: parameters.page,
      language: pageLanguage,
    },
  });

  //checking if poster_path has an image url
  response.data.results.forEach(result => {
    result.poster_path = result.poster_path;
  });

  return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
}

//To make a request of one movie by movie-id, it is neccesary to pass movie-id as an function argument
//You can find movie-id as an HTML data atribute here: < a class='movie-card' data-movie-id={ { id } }>
export async function getOneMovieById(movieId) {
  // request for one movie data by movie_id
  const response = await axios.get(
    `${constants.GET_ONE_MOVIE_URL}/${movieId}`,
    {
      params: {
        api_key: constants.API_KEY,
        language: pageLanguage,
      },
    }
  );
  // array of our beloved genres:)
  const genresArr = [];
  // an object with all the necessary properties for further rendering
  const movieData = {
    id: response.data.id,
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
  movieData.genres = movieData.genres.join(', ');
  return movieData;
}

export async function generateMoviesWithGenres(data) {
  const genres = await getGenresIds();

  // Creating an object that stores data for handlebars template
  return data.map(movie => {
    const catArr = [];
    const dataRelease = movie.release_date?.slice(0, 4) || 2022;
    const nameOfFilm = movie.title.toUpperCase();
    const movieInfo = {
      name: nameOfFilm,
      release: dataRelease,
      id: movie.id,
      genres: catArr,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };

    // Comparing ganres taken from the general ganre array with IDs and adding ganres' values in the object for handlebars template
    const genresFilm = function () {
      movie.genre_ids.map(id =>
        genres.find(el => {
          if (el.id === id) {
            return catArr.push(el.name);
          }
        })
      );
    };

    genresFilm();
    return movieInfo;
  });
}
