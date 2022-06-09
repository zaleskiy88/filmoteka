import modalFilm from '../templates/modal-film.hbs';
import SimpleLightbox from "simple-lightbox";
import "simple-lightbox/dist/simpleLightbox.min.css";
import { getDataMovie } from '../js/movie-fetch';


export const initLightbox = async (e) => {
    e.preventDefault();
    const { id: movieId } = e.currentTarget.dataset;
    const movieModal = new SimpleLightbox();
    const dataMovie = await getDataMovie(movieId);
    const markup = await modalFilm([dataMovie])
    movieModal.setContent(markup).show();
}


function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
