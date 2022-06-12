import modalFilm from '../templates/modal-film.hbs';

import { getDataMovies, getOneMovieById } from './movie-fetch';


const gallery = document.querySelector(".gallery");
const backdrop = document.querySelector(".backdrop-film");
gallery.addEventListener('click', onModalClick);
// backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    backdrop.classList.add("visually-hidden");
    document.body.style.overflow = "visible";
  }
}

async function onModalClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  document.body.style.overflow = "hidden";
  window.addEventListener('keydown', onEscKeyDown);
  const movieId = event.target.dataset.id;
  const dataMovie = await getOneMovieById(movieId);
  const markup = modalFilm(dataMovie);
  backdrop.innerHTML = markup;
  backdrop.classList.remove("visually-hidden");
  backdrop.dispatchEvent(new CustomEvent('modal-film-opened', { bubbles: true }));
}


function onEscKeyDown(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    backdrop.classList.add("visually-hidden");
    window.removeEventListener('keydown', onEscKeyDown)
  }
}