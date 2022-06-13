import modalFilmEn from '../templates/modal-film-en.hbs';
import modalFilmRu from '../templates/modal-film-ru.hbs';
import modalFilmUk from '../templates/modal-film-uk.hbs';

import {getOneMovieById } from './movie-fetch';

let langStart = localStorage.getItem('lang') || '';
if(langStart === ""){
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}

const gallery = document.querySelector(".gallery");
const backdrop = document.querySelector(".backdrop-film");
const btnModalFilm = document.querySelector(".btn-modal-film");
gallery.addEventListener('click', onModalClick);
backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    backdrop.classList.add("visually-hidden");
    document.body.style.overflow = "visible";
    /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
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
  if(langStart === "en"){
    const markup = modalFilmEn(dataMovie);
    backdrop.innerHTML = markup;
    backdrop.classList.remove("visually-hidden");
    backdrop.dispatchEvent(new CustomEvent('modal-film-opened', { bubbles: true }));
  }
  if(langStart === "ru"){
    const markup = modalFilmRu(dataMovie);
    backdrop.innerHTML = markup;
    backdrop.classList.remove("visually-hidden");
    backdrop.dispatchEvent(new CustomEvent('modal-film-opened', { bubbles: true }));
  }
  if(langStart === "uk"){
    const markup = modalFilmUk(dataMovie);
    backdrop.innerHTML = markup;
    backdrop.classList.remove("visually-hidden");
    backdrop.dispatchEvent(new CustomEvent('modal-film-opened', { bubbles: true }));
  }
  //btnModalFilm.addEventListener('click', onCloseModalFilm);
}


function onEscKeyDown(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    backdrop.classList.add("visually-hidden");
    document.body.style.overflow = "visible";
    /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
    window.removeEventListener('keydown', onEscKeyDown)
  }
}

/* function onCloseModalFilm() {
  backdrop.classList.add("visually-hidden");
  document.body.style.overflow = "visible";
  btnModalFilm.removeEventListener('click', onCloseModalFilm);
} */
