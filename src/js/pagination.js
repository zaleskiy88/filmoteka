import {getMoreTrendingMoviesData, getGenresIds,} from "./movie-fetch";
import itemsTemplate from '../templates/list-of-card.hbs';
const refs = {
    paginationList: document.querySelector(".pagination-list"),
}

const gallery = document.querySelector('.gallery');
const preloaderContainer = document.querySelector(".preloader");

const maxPage = 20;

const pagesArray = Array.apply(null, {
  length: maxPage ?? 0,
})
  .map(Number.call, Number)
  .map((item) => item + 1);

  function renderSpan(value) {
    return `<span>${value}</span>`; 
  }

refs.paginationList.addEventListener('click', onPaginationBtnClick);

async function onPaginationBtnClick(event) {
    renderingPaginationMarkup(Number(event.target.textContent));
    const data = await getMoreTrendingMoviesData(Number(event.target.textContent));
    const movieCategories = await generateMoviesWithGenres(data.results);

  // Rendering markup
  setTimeout(() => {
    preloaderContainer.innerHTML = '';
    gallery.innerHTML= itemsTemplate(movieCategories);
    footer.style.position = "static";
  }, 2000)
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
          return "<span>...</span>";
        }
        return "";
           
        }).join("");
        if (currentPage > 1) {
          result = "<span><=</span>" + result;
        }
        if (currentPage >= 1 && currentPage !== maxPage) {
          result = result + "<span>=></span>";
        }


    refs.paginationList.innerHTML = result;
    console.log(result);
}

renderingPaginationMarkup(1);

async function generateMoviesWithGenres(data) {
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

  