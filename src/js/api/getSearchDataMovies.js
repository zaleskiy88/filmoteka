import axios from 'axios';
import constants from '../../constants/constants';
export async function getDataMovies(searchQuery, page) {
    const response = await axios.get(`${constants.SEARCH_URL}`, {
      params: {
        api_key: constants.API_KEY,
        query: searchQuery,
        page,
        language: localStorage.lang,
      },
    });
  
    //checking whether poster_path has an image url
    response.data.results.forEach(result => {
      result.poster_path = result.poster_path;
    });
  
    return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
  }