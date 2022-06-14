import { app, auth } from "./firebase_app";
import { getAuth, GithubAuthProvider, signInWithRedirect, signInWithPopup, getRedirectResult } from "firebase/auth";
import Notiflix from "notiflix";
import localizeString from "../../utils/localizeString";

const provider = new GithubAuthProvider();
const githubIn = document.querySelector('#github-login');

githubIn.addEventListener('click', function logInByGithub() {
    console.log('logInByGithub');
    try {
        localStorage.setItem('authProvider', 'github');
        signInWithRedirect(auth, provider);
    } catch (error) {
        throw new Error(error);
    }
});
const tmpAuthProvider = localStorage.getItem('authProvider');
if (tmpAuthProvider === 'github') {
    getRedirectResult(auth)
        .then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            if (credential) {
                localStorage.removeItem('authProvider');
            }
        }).catch((error) => {
            Notiflix.Notify.failure(localizeString(error.code));
        });
}