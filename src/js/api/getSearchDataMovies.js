import api from './api';

export const getSearchDataMoviesParams = {
        query: "",
        page,
        language: localStorage.lang,
}

export async function getSearchDataMovies() {
    const response = await api.get("search/movie/", {
      params: getSearchDataMoviesParams,
    });
  
    //checking whether poster_path has an image url
    response.data.results.forEach(result => {
      result.poster_path = result.poster_path;
    });
  
    return response.data; // returns an object with request data{ page, results, total_pages, total_results }. To access the movies list (an array of objects) use response.data.results
  }