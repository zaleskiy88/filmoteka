import auth from './auth_firebase';

const googleIn = document.querySelector('#google-login');
googleIn.addEventListener('click', auth.logInByGoogle);

const googleOut = document.querySelector('#signout');
googleOut.addEventListener('click', auth.logOut);

console.log();