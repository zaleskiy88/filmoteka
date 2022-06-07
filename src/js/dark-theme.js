
const btnTheme = document.querySelector('#dark-theme');
const body = document.querySelector('.body-theme');

const localTheme = localStorage.getItem('color-theme');

if (localTheme ==="dark-theme") {
    body.classList.add('dark-theme');
}

btnTheme.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    switchThemeColor() ;
});

function switchThemeColor() {
if (document.querySelector('.dark-theme')){
    localStorage.setItem('color-theme','dark-theme'); // сохраняем
}else {
    localStorage.removeItem('color-theme'); // удаляем
}
}

