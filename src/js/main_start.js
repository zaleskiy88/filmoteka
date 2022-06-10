const main = document.querySelector('.main-start');
const half = document.querySelector('.half');  
const overlay = document.querySelector('.overlay');
const buttonLine = document.querySelector('.button-line');
const superButton = document.querySelector('.super-button');
const bottomImg = document.querySelector('.bottom')
const lineright = document.querySelector('.right');
const body = document.querySelector('body');

const mainStart = sessionStorage.getItem('main-display')|| "";

if (mainStart !== "") {
    main.style.display = 'none'
    body.style.overflow = 'visible';
}

superButton.addEventListener('click', () => {
    bottomImg.classList.add('active');
    lineright.classList.add('active');
    main.classList.add('active');
    half.classList.add('active');
    overlay.classList.add('active');
    buttonLine.classList.add('active');
    superButton.classList.add('active');
    sessionStorage.setItem('main-display', 'none')
    setTimeout(() => {
        body.style.overflow = 'visible';
        main.style.display = 'none';
    }, 2500);
});
