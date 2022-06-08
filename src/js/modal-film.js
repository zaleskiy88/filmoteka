import modalFilm from '../templates/modal-film.hbs';
import SimpleLightbox from "simplelightbox";
import getDataMovies from '../js/movie-fetch';


//async function renderGallery() {
//    const result = await API.getDataMovies();
//    appendFilm(result.data.total_results);
    
//}
//function appendFilm(card) {
//    gallery.insertAdjacentHTML('beforeend', modalFilm(card));
//}
const lightbox = new SimpleLightbox('.gallery a', {
    
    enableKeyboard: true,
});
lightbox.refresh()



/*
import * as basicLightbox from 'basiclightbox';


function onModalFilm(evt) {
    evt.preventDefault();
}
    const instance = basicLightbox.create(
        document.querySelector('template'),

        { onShow: () => { window.addEventListener('keydown', onKeydown) } },
        { onClose: () => { window.removeEventListener('keydown', onKeydown) } } ,
    );
 
    instance.show();
 */

