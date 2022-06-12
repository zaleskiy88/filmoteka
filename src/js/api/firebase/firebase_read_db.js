import { doc, getDoc } from "firebase/firestore"; 
import Notiflix from 'notiflix';
import itemsTemplate from '../../../templates/list-of-card-library.hbs';
import db from '../firebase/firebase_app';
import { userName } from '../../storage/currentUser';
console.log(userName);

const axios = require('axios').default;
const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const MOVIE_URL = `https://api.themoviedb.org/3/movie/`;

const btnWatched = document.querySelector('.header-library__btnWatc');  // Select Watched button
const btnQueue = document.querySelector('.header-library__btnQue');     // Select Queue button
const galleryLibrary = document.querySelector('#library-gallery');
let usersList = [];

btnWatched.addEventListener('click', onLibraryBtnClick);                // Set the listener on Watch button
btnQueue.addEventListener('click', onLibraryBtnClick);                  // Set the listener on Queque button


// -------------------------- handle button click
async function onLibraryBtnClick(event) {
    await getUsersMovieList(event);                                     // getting user's movie list
    generateLibraryMarkup();                                            // generate maurkup
}

// -------------------------- getting user's movie list 
async function getUsersMovieList(event) {

    event.preventDefault();                                             // block reload page
    const id = '2i1T2rjd9xPzQ3BNETY8W5RQGLl1';                          // ????get user id????
    const typeOfList = event.target.textContent;                        // what kind of list (queue or watched)
    const usersCollection = doc(db, 'users', id);                       // forming a querry

    try {
        const docSnap = await getDoc(usersCollection);                  // send querry
        usersList = (typeOfList === 'WATCHED') ? docSnap.data().watched : docSnap.data().queue;    // get array with movie list

        if (usersList.length === 0) {
            Notiflix.Notify.failure(`У вас отсутствуют фильмы в разделе ${typeOfList}`);
        }
        return usersList;
    }
    catch {
        Notiflix.Notify.failure(`Ой, что-то пошло не так... Пожалуйста, повторите попытку.`);
    }
}

// -------------------------- generate the markup
async function generateLibraryMarkup() {
    const moviesPerPage = 20;                                                                    // items per page
    const numberOfPages = Math.ceil(usersList.length / moviesPerPage);                          // total number of pages
    let currentPage = 1;                                                                        // current page for markup
    let startItemPosition = (currentPage - 1) * moviesPerPage;                                  // first item in list for murkup
    let onePageList = usersList.slice(startItemPosition, startItemPosition + moviesPerPage);    // get list of movie's id for current page
    galleryLibrary.innerHTML = "";                                                              // clear field

    onePageList = await makeArreyOfDataMovies(onePageList);                                     // making array of the movie objects = movies id list 
    galleryLibrary.insertAdjacentHTML('beforeend', itemsTemplate(onePageList));                 // set markup
}

// -------------------------- making movies data object array
async function makeArreyOfDataMovies(array) {
    const arr = await Promise.all(array.map(async (el) => {
        el = await axios.get(`${MOVIE_URL}${el}`, { params: { api_key: API_KEY, language: 'ru-RU' } }); // fetch data by movie id
        el = el.data;                                                                                   
        el.name = el.title;                                                                             // ajust data for the template
        el.release = el.release_date?.slice(0, 4) || 2022;
        el.genres = el.genres.map(item => item = item.name);                                            // convert genres data object to genres array
        return el;
    }
    ))
    return Promise.resolve(arr);
}