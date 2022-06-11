import auth from './auth_firebase';
console.log(auth.logInByGoogle);
const googleIn = document.querySelector('#google-login');
googleIn.addEventListener('click', auth.logInByGoogle);

const googleOut = document.querySelector('#google-logout');
googleOut.addEventListener('click', logInByGoogle);

function logGoogle(event) {
    event.preventDefault();
    auth.logInByGoogle();
}


    // auth.logOut();