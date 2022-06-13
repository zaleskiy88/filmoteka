import {getMoreTrendingMoviesData, generateMoviesWithGenres, getMoreDataMovies} from "./movie-fetch";
import itemsTemplate from '../templates/list-of-card.hbs';
import preloader from '../templates/preloader.hbs';
import parameters from "./movie-fetch";
// import searchQuery from "../index";


const refs = {
  paginationList: document.querySelector('.pagination-list'),
  input: document.querySelector(".header__input"),
  gallery:document.querySelector('.gallery'),
  preloaderContainer:document.querySelector('.preloader'),
  footer:document.querySelector('.footer'),
};

let currentPage = 1;

////////////////////////////////////////////////////
  async function getTotalPages() { 
    const {total_pages} = await getMoreTrendingMoviesData(currentPage);
    // const x = await getMoreDataMovies(refs.input?.value, currentPage);
    // console.log(x);
    return total_pages;
}

  async function getTotalPagesArray() { 
    const totalPageAmount = await getTotalPages();
    const array = [];
    for (let i = 1; i <= totalPageAmount; i++) { 
        array.push(i)
    }
    return array;
}


/////////////////////////////////////////////////////////
function renderSpan(value) {
  return `<span data-value='${value}'>${value}</span>`;
}

async function renderingFilmsMarkup(currentPage) {
      renderingPaginationMarkup(currentPage);
      let data = null;
      if (refs.input?.value) {
        data = await getMoreDataMovies(refs.input?.value, currentPage);
        // console.log(data);
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
const maxPage = await getTotalPages();

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
    if (event.target.dataset.value === "dots") {
      if (Number(event.target.nextElementSibling?.dataset?.value) === maxPage)
      {
        currentPage += 1;
        renderingFilmsMarkup(currentPage);
        return;
      }
      else {
        currentPage -= 1;
        renderingFilmsMarkup(currentPage);
      return;
      }
    }
    currentPage = Number(event.target.textContent);
    renderingFilmsMarkup(currentPage);
}

async function renderingPaginationMarkup(currentPage) {
  const maxPage = await getTotalPages();
    const pagesArray = await getTotalPagesArray();
    let result = pagesArray.length <= 3
    ? pagesArray.map((item) => renderSpan(item))
    : pagesArray.map((item) => {
        if (
          item === maxPage ||
          item === 1 ||
          item === currentPage - 1 ||
          item === currentPage + 1 ||
          item === currentPage - 2 ||
          item === currentPage + 2 ||
          item === currentPage
        )
        {
          return renderSpan(item);
        }
        if(item === currentPage - 3 || item === currentPage + 3) {
          return "<span data-value='dots'>...</span>";
        }
        return "";
           
        }).join("");
        if (currentPage > 1) {
          result = `<span class='pagination__prev' data-span='prev'>&#129044</span>` + result;
        }
        if (currentPage >= 1 && currentPage !== maxPage) {
          result = result + `<span class='pagination__next' data-span='next'>	
          &#10141</span>`;
        }
        if (refs.paginationList) {
          refs.paginationList.innerHTML = result;
    refs.paginationList.querySelectorAll("span").forEach(item => {
      if (item.innerHTML == currentPage) {
        item.classList.toggle("active");
      }
    });
        }
    
}

renderingPaginationMarkup(1);

refs.paginationList.addEventListener('click', onPaginationBtnClick);
