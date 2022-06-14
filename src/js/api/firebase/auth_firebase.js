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
        localStorage.setItem('user-id', currentUser.userUiid);
        localStorage.setItem('user-name', currentUser.userName);
        localStorage.setItem('auth', currentUser.isAuth);
    try {
        refs.btnSignin.classList.toggle('auth-hide');
        refs.googleOut.classList.toggle('auth-hide');
        refs.googleUser.classList.toggle('auth-hide');
        refs.googleUser.textContent = currentUser.userName;
        myLibraryBtn.classList.remove('unactive');
        localStorage.removeItem('user-id');
        localStorage.removeItem('user-name');
        localStorage.removeItem('auth');
    } catch (error) {}
    } else {
        console.log('User is signed out');
        currentUser.isAuth = false;
        currentUser.userName = '';
        currentUser.userEmail = '';
        currentUser.userUiid = '';
        currentUser.movieLists = {};
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
            console.log(currentUser);
            localStorage.removeItem('user-id');
            localStorage.removeItem('user-name');
            localStorage.removeItem('auth');
        })
        .catch(error => {
            console.log('Sign-out error', error);
        });
}

export default { logInByGoogle, logOut };