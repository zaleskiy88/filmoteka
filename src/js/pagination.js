import {getMoreTrendingMoviesData, generateMoviesWithGenres, getMoreDataMovies} from "./movie-fetch";
import itemsTemplate from '../templates/list-of-card.hbs';
import preloader from '../templates/preloader.hbs';
import parameters from "./movie-fetch";
import {renderingPaginationMarkup} from "./paginationMarkup";
// import searchQuery from "../index";


const refs = {
  paginationList: document.querySelector('.pagination-list'),
  input: document.querySelector(".header__input"),
  gallery:document.querySelector('.gallery'),
  preloaderContainer:document.querySelector('.preloader'),
  footer:document.querySelector('.footer'),
};

let currentPage = 1;

let maxPage = refs.input?.value 
? Number(localStorage.getItem("onSearchTotalPages")) 
: Number(localStorage.getItem("trendingTotalPages"));
/////////////////////////////////////////////////////////

async function renderingFilmsMarkup(currentPage) {
      renderingPaginationMarkup(currentPage);
      let data = null;
      if (refs.input?.value) {
        data = await getMoreDataMovies(refs.input?.value, currentPage);
      }
      else {
        data = await getMoreTrendingMoviesData(currentPage);
      }
      const movieCategories = await generateMoviesWithGenres(data.results);

  // Rendering markup
  setTimeout(() => {
    refs.preloaderContainer.innerHTML = '';
    refs.gallery.innerHTML = itemsTemplate(movieCategories);
    refs.footer.style.position = 'static';
  }, 2000);
}

async function onPaginationBtnClick(event) {
  refs.footer.style.position = 'fixed';
  refs.preloaderContainer.innerHTML = preloader();
  refs.gallery.innerHTML = '';
  if (event.target.nodeName !== 'SPAN') {
    return;
  }
  if (event.target.dataset.span === 'prev') {
    currentPage -= 1;
    renderingFilmsMarkup(currentPage);
    return;
  }
  if (event.target.dataset.span === 'next') {
    currentPage += 1;
    renderingFilmsMarkup(currentPage);
    return;
  }
  if (event.target.dataset.value === 'dots') {
    if (Number(event.target.nextElementSibling?.dataset?.value) === maxPage) {
      currentPage += 1;
      renderingFilmsMarkup(currentPage);
      return;
    } else {
      currentPage -= 1;
      renderingFilmsMarkup(currentPage);
      return;
    }
  }
    currentPage = Number(event.target.textContent);
    renderingFilmsMarkup(currentPage);
}

refs.paginationList.addEventListener('click', onPaginationBtnClick);
