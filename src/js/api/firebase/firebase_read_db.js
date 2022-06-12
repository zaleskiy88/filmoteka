import { doc, getDoc } from "firebase/firestore"; 
import {db, app} from '../firebase/firebase_app';
import userInfo from '../../storage/currentUser';
import Notiflix from 'notiflix';

let usersList = [];

// -------------------------- getting user's movie list 
async function getUsersMovieList(typeOfList, event) {

    if (event) { event.preventDefault() };                             // block reload page
    const usersCollection = doc(db, 'users', '2i1T2rjd9xPzQ3BNETY8W5RQGLl1' || userInfo.userUiid);       // forming a querry

    try {
        const docSnap = await getDoc(usersCollection);  // send querry
        if (!docSnap.data()) {
            Notiflix.Confirm.show(`You have no movies in WATCHED и QUEUE`, '', 'Ok', '', '', '', {titleColor: '#111111', okButtonBackground: '#ff6b08'});
            return usersList;
        }
     
        usersList = (typeOfList === 'btn-watched') ? docSnap.data().watched : docSnap.data().queue;    // get movie list array 
        if (usersList.length === 0) {
            Notiflix.Confirm.show(`You have no movies in ${typeOfList === 'btn-watched' ? 'WATCHED' : 'QUEUE'}`, '', 'Ok', '', '', '', {titleColor: '#111111', okButtonBackground: '#ff6b08'});
        }
        return usersList;
    }
    catch {
        Notiflix.Notify.failure(`Oh, something is wrong. Try again, please...`);
    }
}

export default getUsersMovieList;
