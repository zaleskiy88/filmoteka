import { auth, provider } from './firebase_app'
import { onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth';
import currentUser from '../../storage/currentUser';
import refs from '../../../constants/refs';

onAuthStateChanged(auth, user => {
    if (user) {
        console.log('User is signed in');
        console.log(user.displayName);
        currentUser.userName = user.displayName;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.isAuth = true;
    try {
        refs.btnSignin.classList.toggle('auth-hide');
        refs.googleOut.classList.toggle('auth-hide');
        refs.googleUser.classList.toggle('auth-hide');
        refs.googleUser.textContent = currentUser.userEmail;
        myLibraryBtn.classList.remove('unactive');
    } catch (error) {}
    } else {
        currentUser.clear();
        myLibraryBtn.classList.add('unactive');
    }
});

function logInByGoogle() {
    console.log('login API');
    signInWithRedirect(auth, provider);
    // return getRedirectResult(auth);
}

function logOut() {
    console.log('logout API');
    signOut(auth)
        .then(() => {
            console.log('Sign-out successful');
            refs.btnSignin.classList.toggle('auth-hide');
            refs.googleOut.classList.toggle('auth-hide');
            refs.googleUser.classList.toggle('auth-hide');
        })
        .catch(error => {
            console.log('Sign-out error', error);
        });
}

export default { logInByGoogle, logOut };