import firebaseWriteDb from "./api/firebase/firebase_write_db";
import refsMovieLists from "../constants/refsMovieLists";
import currentUser from './storage/currentUser';

const buttonStates = {
    addWatchedBtn: {
        inWatched: {
            watched: true,
            text: 'Watched',
            lngKey: 'addWatchedBtn_watched',
            action: () => { },
        },
        default: {
            default: true,
            text: 'Add to watched',
            lngKey: 'addWatchedBtn',
            action: firebaseWriteDb.addToWatched
        },
    },
    addQueueBtn: {
        inQueue: {
            queued: true,
            text: 'Remove from queue',
            lngKey: 'addQueueBtn_queue',
            action: firebaseWriteDb.removeFromQueue

        },
        default: {
            default: true,
            text: 'Add to queue',
            lngKey: 'addQueueBtn',
            action: firebaseWriteDb.addToQueue
        }
    }
}

const ModalMovie = (function () {
    let addWatchedBtnState = buttonStates.addWatchedBtn.default;
    let addQueueBtnState = buttonStates.addQueueBtn.default;
    let movieId = null;
    const checkIfMovieIsInList = (movieId, list) => list?.includes(parseInt(movieId));

    function init() {
        movieId = refsMovieLists().addListBtnGroup.dataset.id;

        const movieInQueueList = checkIfMovieIsInList(movieId, currentUser.movieLists?.queue)
        const movieInWatchedList = checkIfMovieIsInList(movieId, currentUser.movieLists?.watched)

        addQueueBtnState = movieInQueueList ? buttonStates.addQueueBtn.inQueue : buttonStates.addQueueBtn.default;
        addWatchedBtnState = movieInWatchedList ? buttonStates.addWatchedBtn.inWatched : buttonStates.addWatchedBtn.default;
        return ModalMovie;
    }
    function listBtnHandler(e) {
        if (e.target.nodeName !== "BUTTON") return;
        if (e.target.id === 'add-queue') {
            addQueueBtnState.action(movieId);
            addQueueBtnState = addQueueBtnState.default ? buttonStates.addQueueBtn.inQueue : buttonStates.addQueueBtn.default;
        }
        if (e.target.id === 'add-watched') {
            addWatchedBtnState.action(movieId);
            if (addWatchedBtnState.default) {
                addWatchedBtnState = buttonStates.addWatchedBtn.inWatched;
                addQueueBtnState = buttonStates.addQueueBtn.default;
            }
        }
        ModalMovie
            .render()
            .setupEvents();

    }
    function render() {
        refsMovieLists().addListBtnGroup.innerHTML = currentUser.isAuth ? view() : ''
        return ModalMovie
    }

    function view() {
        return `
            <button class="button" id="add-watched" type="button" ${addWatchedBtnState.watched ? 'disabled' : ''} data-lng="${addWatchedBtnState.lngKey}">${addWatchedBtnState.text}</button>
            <button class="button" id="add-queue"  type="button" data-lng="${addQueueBtnState.lngKey}">${addQueueBtnState.text}</button>
        `
    }

    function setupEvents() {
        let button =
            refsMovieLists().addListBtnGroup
                .addEventListener("click", ModalMovie.listBtnHandler)
    }

    document.addEventListener('modal-film-opened', (e) => {
        ModalMovie
            .init()
            .render()
            .setupEvents();
    });

    return { init, render, listBtnHandler, setupEvents }

})();