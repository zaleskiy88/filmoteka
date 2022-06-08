import modalFilm from '../templates/modal-film.hbs';

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
 

