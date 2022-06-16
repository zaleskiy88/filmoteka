import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app } from './firebase_app';
import currentUser from '../../storage/currentUser';
import { onCloseModalLoginClick } from '../../singIn.js';
import Notiflix from 'notiflix';
import localizeString from '../../utils/localizeString';

const auth = getAuth(app);
const signUpForm = document.getElementById('registration-form-un');
const signInForm = document.getElementById('from-sing-in');

if (signUpForm) {
  signUpForm.password.onchange = validatePassword;
  signUpForm.confirmPassword.onkeyup = validatePassword;
  function validatePassword() {
    if (signUpForm.password.value != signUpForm.confirmPassword.value) {
      signUpForm.confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      signUpForm.confirmPassword.setCustomValidity('');
    }
  }

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const displayName = signUpForm.name.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;
    const confirmPassword = signUpForm.confirmPassword.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        // console.log('userCredential', userCredential);
        Notiflix.Notify.success(localizeString('signUpSuccess'));
        const user = userCredential.user;
        updateProfile(user, { displayName });
        currentUser.isAuth = true;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.userName = user.displayName;
        onCloseModalLoginClick();
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        Notiflix.Notify.failure(localizeString(error.code));
      });
  });
  signInForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        currentUser.isAuth = true;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.userName = user.displayName;
        onCloseModalLoginClick();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Notiflix.Notify.failure(localizeString(error.code));
      });
  });
}
