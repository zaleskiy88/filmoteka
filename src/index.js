import {
  getDataMovies,
  getMoreDataMovies,
  getTrendingMoviesData,
  getMoreTrendingMoviesData,
} from './js/movie-fetch';
const mainGallery = document.querySelector("#home-gallery");

async function generateMurkup() {
  const data = await getTrendingMoviesData();
  const markup = data.results.map(el => {
    console.log(el);
    return `<p>${el.original_title}</p> <img src="https://image.tmdb.org/t/p/w500/${el.backdrop_path}">`
  })
  mainGallery.innerHTML = markup.join("");
}

generateMurkup();