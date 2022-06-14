import refs from '../constants/refs';
import currentUser from './storage/currentUser';
import Notiflix from 'notiflix';
// handle a click on the button Up
function onUpClick() {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// if user is unauth then my library is unactive
function handleMyLibraryClick(e) {
    const lang = localStorage.getItem('lang') || '';
    if (!currentUser.isAuth) {
        e.preventDefault();
        let message = "";
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

refs.upBtn.addEventListener('click', onUpClick);                 // Set the listener on Button Up
refs.myLibraryBtn.addEventListener('click', handleMyLibraryClick);

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 70) {                      // on / off button up
      refs.upBtn.classList.add("on-screen")}
        else {refs.upBtn.classList.remove("on-screen")}
});