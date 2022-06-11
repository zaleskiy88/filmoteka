const refs = {
  openModal: document.querySelector('.modal-footer__open-modal'),
  closeModal: document.querySelector('.modal-footer__close-modal'),
  backdrop: document.querySelector('.backdrop'),
};

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

 
function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  document.body.classList.add('show-modal');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  document.body.classList.remove('show-modal');
}

function onBackdropClick(e) {
  if (e.currenTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

new Swiper('.modal-footer__image');

import {
  getDataMovies,
  getMoreDataMovies,
  getTrendingMoviesData,
  getMoreTrendingMoviesData,
} from './js/movie-fetch';

