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
gallery.addEventListener('click', onModalClick);
if (backdrop) {
  backdrop.addEventListener('click', onBackdropClick);
}


function onBackdropClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
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
   const btnModalFilm = document.querySelector(".btn-modal-film")
   btnModalFilm.addEventListener('click', onCloseModalFilm);
}


function onEscKeyDown(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
    backdrop.classList.add("visually-hidden");
    document.body.style.overflow = "visible"; 
    window.removeEventListener('keydown', onEscKeyDown)
  }
}

 function onCloseModalFilm() {
  /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
  backdrop.classList.add("visually-hidden");
  document.body.style.overflow = "visible";
} 
