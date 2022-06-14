import {renderingPaginationMarkup} from './paginationMarkup';
import {
    getDataMovies,
    getTrendingMoviesData,
    getGenresIds,
  } from './movie-fetch';
import refs from '../constants/refs';
import apiFirebase from './api/firebase';
import MovieLists from './movie-lists';
import currentUser from './storage/currentUser';
import Swiper from '../../node_modules/swiper/swiper-bundle';
import Notiflix from 'notiflix';
import itemsTemplate from '../templates/list-of-card.hbs';
import preloader from '../templates/preloader.hbs';

var swiper = new Swiper(".swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const homeGallery = document.querySelector('#home-gallery');

if(refs.preloaderContainer) {
  refs.preloaderContainer.innerHTML = preloader();
}



async function generateMarkup() {
  const moviesData = await getTrendingMoviesData();

  localStorage.setItem("trendingTotalPages", moviesData.total_pages ?? 0);
  renderingPaginationMarkup(1);
  // Creating an object that stores data for handlebars template
  const movieCategories = await generateMoviesWithGenres(moviesData);

  // Rendering markup
  setTimeout(() => {
    refs.preloaderContainer.innerHTML = '';
    refs.homeGallery.insertAdjacentHTML('beforeend', itemsTemplate(movieCategories));
    refs.footer.style.position = 'static';
  }, 2000);
}

async function onSearchSubmit(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget?.elements.searchQuery.value;
  if (searchQuery === '') {
    Notiflix.Notify.info('Search query cannot be empty.');
    return;
  }
  const moviesData = await getDataMovies(
    searchQuery
  );
  const searchData ={
    "onSearchTotalPages": moviesData.total_pages ?? 0,
    "onSearchQuery": searchQuery ?? "",
  }
  localStorage.setItem("searchData", JSON.stringify(searchData));
  renderingPaginationMarkup(1);
  const movieCategories = await generateMoviesWithGenres(moviesData);

  // Rendering markup

  refs.homeGallery.innerHTML = itemsTemplate(movieCategories);
}

async function generateMoviesWithGenres(data) {
  const genres = await getGenresIds();

  // Creating an object that stores data for handlebars template
  return data.results.map(movie => {
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


// scroll handle to add an endless gallery

if (refs.homeGallery) {
  generateMarkup();
  refs.searchForm.addEventListener('submit', onSearchSubmit);
}
