import { auth, provider } from './firebase_app'
import { onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth';
import currentUser from '../../storage/currentUser';

const logInBtn = document.querySelector('#signin');
const logOutBtn = document.querySelector('#signout');
const googleUser = document.querySelector('#googleUser');

onAuthStateChanged(auth, user => {
    if (user) {
        console.log('User is signed in');
        console.log(user);
        currentUser.userName = user.displayName;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
        currentUser.isAuth = true;
        localStorage.setItem('user-id', currentUser.userUiid);
        localStorage.setItem('user-name', currentUser.userName);
        localStorage.setItem('auth', currentUser.isAuth);
        try {
            logInBtn.classList.toggle('auth-hide');
            logOutBtn.classList.toggle('auth-hide');
            googleUser.classList.toggle('auth-hide');
            googleUser.textContent = currentUser.userName;
            myLibraryBtn.classList.remove('unactive');
            localStorage.removeItem('user-id');
            localStorage.removeItem('user-name');
            localStorage.removeItem('auth');
        } catch (error) { }
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
            logInBtn.classList.toggle('auth-hide');
            logOutBtn.classList.toggle('auth-hide');
            googleUser.classList.toggle('auth-hide');
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