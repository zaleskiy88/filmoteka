
const modalEl = document.querySelector('.modal-footer-social');
const btnOpen = document.querySelector('.modal-footer__open-btn');
const btnClose = document.querySelector('.modal-footer-social__close-btn');




btnOpen.addEventListener('click', () => {
  modalEl.classList.remove('visually-hidden');
  modalEl.style.display = 'block';
});

btnClose.addEventListener('click', () => {
  modalEl.classList.add('visually-hidden');
  modalEl.style.display = 'none';
});

import {
  getDataMovies,
  getMoreDataMovies,
  getTrendingMoviesData,
  getMoreTrendingMoviesData,
} from './js/movie-fetch';

