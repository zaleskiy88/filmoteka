import refs from '../constants/refs';

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

export function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  refs.backdrop.classList.remove('visually-hidden');
  refs.body.style.overflow = 'hidden';
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  refs.backdrop.classList.add('visually-hidden');
  refs.body.style.overflow = 'visible';
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
    refs.body.style.overflow = 'visible';
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
    refs.body.style.overflow = 'visible';
  }
}
