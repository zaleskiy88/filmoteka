

const btnTheme = document.querySelector('#dark-theme');
const body = document.querySelector('.body');

btnTheme.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
});