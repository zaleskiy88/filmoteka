import { doc, getDoc } from "firebase/firestore"; 
import {db, app} from '../firebase/firebase_app';
import userInfo from '../../storage/currentUser';
import Notiflix from 'notiflix';

let usersList = [];

// -------------------------- getting user's movie list 
async function getUsersMovieList(typeOfList, event) {

    if (event) { event.preventDefault() };                             // block reload page
    const usersCollection = doc(db, 'users', '2i1T2rjd9xPzQ3BNETY8W5RQGLl1' ||userInfo.userUiid);       // forming a querry

    try {
        const docSnap = await getDoc(usersCollection);  // send querry
        if (!docSnap.data()) {
            Notiflix.Notify.failure(`У вас отсутствуют фильмы в разделе WATCHED и QUEUE`);
            return usersList;
        }
     
        usersList = (typeOfList === 'WATCHED') ? docSnap.data().watched : docSnap.data().queue;    // get movie list array 
        if (usersList.length === 0) {
            Notiflix.Notify.failure(`У вас отсутствуют фильмы в разделе ${typeOfList}`);
        }
        return usersList;
    }
    catch {
        Notiflix.Notify.failure(`Ой, что-то пошло не так... Пожалуйста, повторите попытку.`);
    }
}

export default getUsersMovieList;