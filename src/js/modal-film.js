import modalFilmEn from '../templates/modal-film-en.hbs';
import modalFilmRu from '../templates/modal-film-ru.hbs';
import modalFilmUk from '../templates/modal-film-uk.hbs';
import getOneMovieById from './api/getMovieById';
import refs from '../constants/refs';

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}

const backdrop = document.querySelector('.backdrop-film');
refs.gallery.addEventListener('click', onModalClick);
if (refs.backdropFilm) {
  refs.backdropFilm.addEventListener('click', onBackdropClick);
}

function onBackdropClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
    refs.backdropFilm.classList.add('visually-hidden');
    document.body.style.overflow = 'visible';
  }
}

async function onModalClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onEscKeyDown);
  const movieId = event.target.dataset.id;
  const dataMovie = await getOneMovieById(movieId);
  let markup = null;
  switch (langStart) {
    case 'en':
      markup = modalFilmEn(dataMovie);
      break;
    case 'ru':
      markup = modalFilmRu(dataMovie);
      break;
    case 'uk':
      markup = modalFilmUk(dataMovie);
      break;
    default:
      console.log('Invalid language');
      break;
  }
  refs.backdropFilm.innerHTML = markup;
  refs.backdropFilm.classList.remove('visually-hidden');
  refs.backdropFilm.dispatchEvent(
    new CustomEvent('modal-film-opened', { bubbles: true })
  );
  const btnModalFilm = document.querySelector('.btn-modal-film');
  btnModalFilm.addEventListener('click', onCloseModalFilm);
}

function onEscKeyDown(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
    refs.backdropFilm.classList.add('visually-hidden');
    document.body.style.overflow = 'visible';
    window.removeEventListener('keydown', onEscKeyDown);
  }
}

function onCloseModalFilm() {
  /* btnModalFilm.removeEventListener('click', onCloseModalFilm); */
  refs.backdropFilm.classList.add('visually-hidden');
  document.body.style.overflow = 'visible';
  if (window.location.href.includes('library')) {
    window.location.reload();
  }
}
