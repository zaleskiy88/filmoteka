import itemsTemplate from '../templates/list-of-card-library.hbs';
import getUsersMovieList from '../js/api/firebase/firebase_read_db';

const axios = require('axios').default;
const API_KEY = '842344de8347536aefc6f17e8e76d4bd';
const MOVIE_URL = `https://api.themoviedb.org/3/movie/`;
const galleryLibrary = document.querySelector('#library-gallery');
const btnWatched = document.querySelector('.header-library__btnWatc');  // Select Watched button
const btnQueue = document.querySelector('.header-library__btnQue');     // Select Queue button
btnWatched.addEventListener('click', onLibraryBtnClick);                // Set the listener on Watch button
btnQueue.addEventListener('click', onLibraryBtnClick);                  // Set the listener on Queque button


getUsersMovieList(typeOfList = 'QUEUE').then(generateLibraryMarkup); 

// -------------------------- handle button click
async function onLibraryBtnClick(event) {
    const typeOfList = event.target.textContent; 
    galleryLibrary.innerHTML = "";
    btnChangeColor(typeOfList);                                                        // clear field
    await getUsersMovieList(typeOfList, event).then(generateLibraryMarkup); 
};
    
// -------------------------- generate the markup
async function generateLibraryMarkup(usersList) {
    const moviesPerPage = 20;                                                                   // items per page
    const numberOfPages = Math.ceil(usersList.length / moviesPerPage);                          // total number of pages
    let currentPage = 1;                                                                        // current page for markup
    let startItemPosition = (currentPage - 1) * moviesPerPage;                                  // first item in list for murkup
    let onePageList = usersList.slice(startItemPosition, startItemPosition + moviesPerPage);    // get list of movie's id for current page
    onePageList = await makeArreyOfDataMovies(onePageList);                                     // making array of the movie objects = movies id list 
    galleryLibrary.insertAdjacentHTML('beforeend', itemsTemplate(onePageList));                 // set markup
}

// -------------------------- making movies data object array
async function makeArreyOfDataMovies(array) {
    const arr = await Promise.all(array.map(async (el) => {
        el = await axios.get(`${MOVIE_URL}${el}`, { params: { api_key: API_KEY, language: 'ru-RU' } }); // fetch data by movie id
        el = el.data;                                                                                   
        el.name = el.title.toUpperCase();                                                                             // ajust data for the template
        el.release = el.release_date?.slice(0, 4) || 2022;
        el.genres = el.genres.map(item => item = item.name);                                            // convert genres data object to genres array
        return el;
    }
    ))
    return Promise.resolve(arr);
}

// --------------------------- btn Change Color
function btnChangeColor(ev) {
    if (ev === 'WATCHED' && !btnWatched.classList.contains('active-btn')) {
        btnWatched.classList.toggle("active-btn");
        btnQueue.classList.toggle("active-btn");
        return
    }

    if (ev === 'QUEUE' && !btnQueue.classList.contains('active-btn')) {
        btnQueue.classList.toggle("active-btn");
        btnWatched.classList.toggle("active-btn");
        return
    }
}