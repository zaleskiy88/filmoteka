const myLibraryBtn = document.querySelector('#myLibraryBtn');
const upBtn = document.querySelector('.go-up');             // button up to top page

// handle a click on the button Up
function onUpClick() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function handleMyLibraryClick(e) {
    const lang = localStorage.getItem('lang') || '';
    if (!currentUser.isAuth) {
        e.preventDefault();
        switch (lang) {
        case 'en':
                message = 'Please, sign in to enter My library';
            break;
        case 'ru':
                message = 'Пожалуйста, авторизуйтесь, чтобы зайти в раздел Моя библиотека';
            break;
        case 'uk':
                message = 'Будь ласка, авторизуйтесь, щоб зайти у розділ Моя бібліотека';
            break;
}
        Notiflix.Confirm.show(`${message}`, '', 'Ok', '', '', '', { titleMaxLength: 64, titleColor: '#111111', okButtonBackground: '#ff6b08' });
    }
}

upBtn.addEventListener('click', onUpClick);                 // Set the listener on Button Up

if (myLibraryBtn) {
    myLibraryBtn.addEventListener('click', handleMyLibraryClick);
  }

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 70) {                      // on / off button up
        upBtn.classList.add("on-screen")}
        else {upBtn.classList.remove("on-screen")}
});