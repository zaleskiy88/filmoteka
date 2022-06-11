import modalFilm from '../templates/modal-film.hbs';

import { getDataMovies } from './movie-fetch';


export const initLightbox = async (e) => {
}


function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
