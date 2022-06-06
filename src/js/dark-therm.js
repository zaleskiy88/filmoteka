
const btnTheme = document.querySelector('#dark-theme');
const body = document.querySelector('.body');

const localTheme = localStorage.getItem('color-theme');

if (localTheme ==="dark-theme") {
    body.classList.add('dark-theme');
    /* btnTheme.checked = true; */
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

/* const onPlay = function(data) {
    const time = data.seconds
    localStorage.setItem("videoplayer-current-time", JSON.stringify(time));
    
};
player.on('timeupdate', throttle(onPlay, 1000));

const timeStopPlayer = localStorage.getItem("videoplayer-current-time");
const timeStop =JSON.parse(timeStopPlayer) */
