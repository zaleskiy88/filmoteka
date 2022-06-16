import { renderingPaginationMarkup } from './paginationMarkup';
import getTrendingMoviesData from './api/getTrendingMoviesData';
//import { getDataMoviesParams } from './api/getSearchDataMovies';
import getDataMovies from './api/getSearchDataMovies';
import refs from '../constants/refs';
import apiFirebase from './api/firebase';
import MovieLists from './movie-lists';
import currentUser from './storage/currentUser';
import Swiper from '../../node_modules/swiper/swiper-bundle';
import Notiflix from 'notiflix';
import itemsTemplate from '../templates/list-of-card.hbs';
import preloader from '../templates/preloader.hbs';
import generateMoviesWithGenres from './api/generateMoviesWithGenres';

refs.myLibraryBtn.addEventListener('click', handleMyLibraryClick);

var swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

if (refs.preloaderContainer) {
  refs.preloaderContainer.innerHTML = preloader();
}

async function generateMarkup() {
  localStorage.removeItem('searchData');
  const moviesData = await getTrendingMoviesData();

  localStorage.setItem('trendingTotalPages', moviesData.total_pages ?? 0);
  renderingPaginationMarkup(1);
  // Creating an object that stores data for handlebars template
  const movieCategories = await generateMoviesWithGenres(moviesData.results);

  // Rendering markup
  setTimeout(() => {
    refs.preloaderContainer.innerHTML = '';
    refs.homeGallery.insertAdjacentHTML(
      'beforeend',
      itemsTemplate(movieCategories)
    );
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
  // if (response.data.total_results === 0) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no films matching your search query. Please try again.'
  //   );
  //   return;
  // } else {
  //   Notiflix.Notify.success(
  //     `Hooray! We found ${response.data.total_results} films.`
  //   );
  // }
  // getSearchDataMoviesParams.query = searchQuery;
  const moviesData = await getDataMovies(searchQuery);
  const searchData = {
    onSearchTotalPages: moviesData?.total_pages ?? 0,
    onSearchQuery: searchQuery ?? '',
  };
  localStorage.setItem('searchData', JSON.stringify(searchData));
  renderingPaginationMarkup(1);
  const movieCategories = await generateMoviesWithGenres(moviesData.results);

  // Rendering markup

  refs.homeGallery.innerHTML = itemsTemplate(movieCategories);
}

// scroll handle to add an endless gallery

if (refs.homeGallery) {
  generateMarkup();
  refs.searchForm.addEventListener('submit', onSearchSubmit);
}

// if user is unauth then my library is unactive
function handleMyLibraryClick(e) {
  const lang = localStorage.getItem('lang') || '';
  if (!currentUser.isAuth) {
    e.preventDefault();
    let message = '';
    switch (lang) {
      case 'en':
        message = 'Please, sign in to enter My library';
        break;
      case 'ru':
        message =
          'Пожалуйста, авторизуйтесь, чтобы зайти в раздел Моя библиотека';
        break;
      case 'uk':
        message =
          'Будь ласка, авторизуйтесь, щоб зайти у розділ Моя бібліотека';
        break;
    }
    Notiflix.Confirm.show(`${message}`, '', 'Ok', '', '', '', {
      titleMaxLength: 64,
      titleColor: '#111111',
      okButtonBackground: '#ff6b08',
    });
  }
}
