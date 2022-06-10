import { auth, provider } from './firebase_app'
import { onAuthStateChanged, signInWithRedirect, signOut } from 'firebase/auth';
import currentUser from '../../storage/currentUser';
onAuthStateChanged(auth, user => {
    if (user) {
        console.log('User is signed in');
        console.log(user.displayName);
        currentUser.userName = user.displayName;
        currentUser.userEmail = user.email;
        currentUser.userUiid = user.uid;
    } else {
        console.log('User is signed out');
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
        })
        .catch(error => {
            console.log('Sign-out error', error);
        });
}

export default { logInByGoogle, logOut };