const modalEl = document.querySelector('.modal-footer-social');
const btnOpen = document.querySelector('.modal-footer__open-btn');
const btnClose = document.querySelector('.modal-footer-social__close-btn');
const leftBtn = document.querySelector('#left-scroll');
const rightBtn = document.querySelector('#right-scroll');



btnOpen.addEventListener('click', () => {
  modalEl.classList.remove('visually-hidden');
  modalEl.style.display = 'block';
});

btnClose.addEventListener('click', () => {
  modalEl.classList.add('visually-hidden');
  modalEl.style.display = 'none';
});
