import firebaseWriteDb from "./api/firebase/firebase_write_db";
import refs from "../constants/refs";


// Catch modal opening event
// Set event listeners for modal
// Catch click on button "Add to queue"
//      Add movie to queue
//      "Remove from queue"
//      Display message "Movie added to queue"??
// Catch click on button "Add to watched"
//      Add movie to watched
//      Remove movie from queue
// Revome event listeners for modal
console.log('movie-lists function called');

// const onAddQueueBtnClick = async (event) => {
//     event.preventDefault();
//     const { id: movieId } = event.currentTarget.dataset;
// }
// const onAddWatchedBtnClick = async (event) => {
//     event.preventDefault();
// }
const onAddListBtnClick = async (event) => {
    event.preventDefault();
    const { id: movieId } = event.currentTarget.dataset;
    console.log('onAddListBtnClick event: ', event);
    console.log('onAddListBtnClick movieId: ', movieId);
    console.log(event.currentTarget);
    // if (event.target === 'add-queue') {
    // const { addWatchedBtn, addQueueBtn } = refs.movieLists;
    // const { addWatchedBtn: addWatchedBtnEl, addQueueBtn: addQueueBtnEl } = refs.movieLists;
}
const addModalFilmEventListener = () => {
    // refs.addQueueBtn.addEventListener('click', onAddQueueBtnClick);
    // refs.addWatchedBtn.addEventListener('click', onAddWatchedBtnClick);
    console.log('addModalFilmEventListener called');
    // console.log('event: ', event);
    // console.log('event.target: ', event.target);
    console.log('js-add-to-list: ', document.getElementById('js-add-to-list'));
    const e = document.getElementById('js-add-to-list').addEventListener('click', () => console.log('listBtnGroup clicked'));
    console.log('e: ', e);
}
const removeModalFilmEventListener = () => {
    refs.addQueueBtn.removeEventListener('click', onAddQueueBtnClick);
    refs.addWatchedBtn.removeEventListener('click', onAddWatchedBtnClick);
}



export default { addModalFilmEventListener, onAddListBtnClick }