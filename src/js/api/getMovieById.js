import axios from 'axios';
import constants from '../../constants/constants';

//To make a request of one movie by movie-id, it is neccesary to pass movie-id as an function argument
//You can find movie-id as an HTML data atribute here: < a class='movie-card' data-movie-id={ { id } }>
export default async function getOneMovieById(movieId) {
    // request for one movie data by movie_id
    const response = await axios.get(
      `${constants.GET_ONE_MOVIE_URL}/${movieId}`,
      {
        params: {
          api_key: constants.API_KEY,
          language: localStorage.lang,
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