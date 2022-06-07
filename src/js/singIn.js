
const singIn = document.querySelector('.login-modal__in');
const singUp = document.querySelector('.login-modal__up');
const modalUp = document.querySelector('.modal');

singIn.addEventListener('click', () => {
    if(singIn.classList.contains('login-modal__active')){
        return
    }
    else{
        modalUp.style.transform = 'translateX(100%)';
        singUp.classList.add('login-modal__noactive');
        singUp.classList.remove('login-modal__active');
        singIn.classList.add('login-modal__active');
        singIn.classList.remove('login-modal__noactive');
    }
});

singUp.addEventListener('click', () => {
    if(singUp.classList.contains('login-modal__active')){
        return
    }
    else{
        modalUp.style.transform = 'translateX(0)';
        singIn.classList.add('login-modal__noactive');
        singIn.classList.remove('login-modal__active');
        singUp.classList.add('login-modal__active');
        singUp.classList.remove('login-modal__noactive');
    }
});