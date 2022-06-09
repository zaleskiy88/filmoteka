import modalFilm from '../templates/modal-film.hbs';
import SimpleLightbox from "simplelightbox";
//import "simplelightbox/dist/simplelightbox.min.css";
import { getDataMovie } from '../js/movie-fetch';


export const initLightbox = async (e) => {
    e.preventDefault();
    const { id: movieId } = e.currentTarget.dataset;
    const movieModal = new SimpleLightbox();
    const dataMovie = await getDataMovie(movieId);
    const markup = await modalFilm([dataMovie])
    movieModal.setContent(markup).show();
}
