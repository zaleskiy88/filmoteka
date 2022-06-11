import {getMoreTrendingMoviesData, generateMoviesWithGenres} from "./movie-fetch";
import itemsTemplate from '../templates/list-of-card.hbs';
const refs = {
    paginationList: document.querySelector(".pagination-list"),
}

const gallery = document.querySelector('.gallery');
const preloaderContainer = document.querySelector(".preloader");

const maxPage = 20;
let currentPage = 1;

const pagesArray = Array.apply(null, {
  length: maxPage ?? 0,
})
  .map(Number.call, Number)
  .map((item) => item + 1);

  function renderSpan(value) {
    return `<span data-value='${value}'>${value}</span>`; 
  }

refs.paginationList.addEventListener('click', onPaginationBtnClick);

async function onPaginationBtnClick(event) {
  event.target.classList.add("pagination_active")
    if (event.target.dataset.span === "prev") {
      currentPage -= 1;
      renderingFilmsMarkup(currentPage);
        return;
    }
    if (event.target.dataset.span === "next") {
      currentPage += 1;
      renderingFilmsMarkup(currentPage);
      return;
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

function renderingPaginationMarkup(currentPage) {
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
          result = "<span data-span='prev'><=</span>" + result;
        }
        if (currentPage >= 1 && currentPage !== maxPage) {
          result = result + "<span data-span='next'>=></span>";
        }
    refs.paginationList.innerHTML = result;
}

renderingPaginationMarkup(1);

async function renderingFilmsMarkup(currentPage) {
  renderingPaginationMarkup(currentPage);
      const data = await getMoreTrendingMoviesData(currentPage);
      const movieCategories = await generateMoviesWithGenres(data.results);

  // Rendering markup
        setTimeout(() => {
          preloaderContainer.innerHTML = '';
          gallery.innerHTML= itemsTemplate(movieCategories);
          footer.style.position = "static";
        }, 2000);
}