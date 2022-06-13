
const btnTheme = document.querySelector('#dark-theme');
const body = document.querySelector('.body-theme');

const localTheme = localStorage.getItem('color-theme');

if (localTheme ==="dark-theme") {
    body.classList.add('dark-theme');
}

btnTheme.addEventListener('click', darkThemeColor);

function darkThemeColor(){
    body.classList.toggle('dark-theme');
    switchThemeColor() ;
};

const localCxheckboxLog = localStorage.getItem('checkbox-theme') || '';

if (localCxheckboxLog !=="") {
    btnTheme.checked = true;
}

function switchThemeColor() {
    if (document.querySelector('.dark-theme')){
        localStorage.setItem('checkbox-theme', 'true'); // save
        localStorage.setItem('color-theme','dark-theme'); // save
    }
    else {
        localStorage.removeItem('color-theme'); // delete
        localStorage.removeItem('checkbox-theme'); // delete
    }
}

