const refs = {
  openModal: document.querySelector('.modal-footer__open-modal'),
  closeModal: document.querySelector('.modal-footer__close-modal'),
  backdrop: document.querySelector('.backdrop'),
};

refs.openModal.addEventListener('click', onOpenModal);
refs.closeModal.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

 
export function onOpenModal() {
  window.addEventListener('keydown', onEscKeydown);
  refs.backdrop.classList.remove('visually-hidden');
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeydown);
  refs.backdrop.classList.add('visually-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}
