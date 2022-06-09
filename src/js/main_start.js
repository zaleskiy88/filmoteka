const main = document.querySelector('.main');
const half = document.querySelector('.half');  
const overlay = document.querySelector('.overlay');
const buttonLine = document.querySelector('.button-line');
const superButton = document.querySelector('.super-button');
const bottomImg = document.querySelector('.bottom')
const lineright = document.querySelector('.right');

superButton.addEventListener('click', () => {
    bottomImg.classList.add('active');
    lineright.classList.add('active');
    main.classList.add('active');
    half.classList.add('active');
    overlay.classList.add('active');
    buttonLine.classList.add('active');
    superButton.classList.add('active');
    setTimeout(() => {
        overlay.display = 'none';
        main.style.display = 'none';
    }, 2500);
});