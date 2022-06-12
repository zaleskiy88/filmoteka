import firebaseWriteDb from "./api/firebase/firebase_write_db";
import refsMovieLists from "../constants/refsMovieLists";
import currentUser from './storage/currentUser';


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
//////////////////////////////////////////////////////////////////////////////////////////////
// const MyReact = {
//     state: null,
//     stateInitialized: false,
//     setState(newState) {
//         console.log('newState: ', newState);
//         if (this.state !== newState);
//         {
//             this.state = newState;
//         }
//         console.log("newCount event calls setState: ", this.state);
//     },
//     useState(initialValue) {
//         this.setState = this.setState.bind(this);
//         if (!this.stateInitialized) {
//             this.stateInitialized = true;
//             this.state = initialValue;
//         }
//         console.log("Component calls useState: ", this.state);
//         return [this.state, this.setState];
//     },
// };
const buttonStates = {
    addWatchedBtn: {
        inWatched: {
            text: 'Watched',
            lngKey: 'addWatchedBtn_watched',
            // action: firebaseWriteDb.addToWatched
        },
        default: {
            text: 'Add to watched',
            lngKey: 'addWatchedBtn',
        },
    },
    addQueueBtn: {
        inQueue: {
            text: 'Remove from queue',
            lngKey: 'addQueueBtn_queue',

        },
        default: {
            text: 'Add to queue',
            lngKey: 'addQueueBtn',
        }
    }
}

const useState = (defaultValue) => {
    let value = defaultValue;
    const getValue = () => value
    const setValue = newValue => {
        console.log('useState new value: ', newValue);
        value = newValue
    }
    console.log('useState thos: ', this);
    return [getValue, setValue];
}

const App = (function () {
    // useState.bind(this);
    const [addWatchedBtnState, setAddWatchedBtnState] = useState(buttonStates.addWatchedBtn.default);
    const [addQueueBtnState, setAddQueueBtnState] = useState(buttonStates.addQueueBtn.default);
    const checkIfMovieIsInList = (movieId, list) => {
        const movieInList = list.includes(movieId);
        return movieInList;
    }
    const [movieId, setMovieId] = useState(null);


    function incer(e) {
        // State.counter += 1;
        console.log('event: ', e);
        if (e.target.nodeName !== "BUTTON") { return }
        // const movieId = e.target.dataset.id;
        // const movieInQueueList = checkIfMovieIsInList(movieId, currentUser.movieLists.queue)
        // const movieInWatchedList = checkIfMovieIsInList(movieId, currentUser.movieLists.watched)
        // if (movieInQueueList) {
        //     firebaseWriteDb.removeFromQueue(movieId);
        //     setAddQueueBtnState(buttonStates.addQueueBtn.default);
        // } else {
        //     firebaseWriteDb.addToQueue(movieId);
        //     setAddQueueBtnState(buttonStates.addQueueBtn.inQueue);
        // }

        App
            .render()
            .setupEvents();

    }
    function render() {
        console.log('render called');
        if (!movieId()) {
            setMovieId(Number(refsMovieLists().addListBtnGroup.dataset.id));
        }

        const movieInQueueList = checkIfMovieIsInList(movieId(), currentUser.movieLists.queue)
        const movieInWatchedList = checkIfMovieIsInList(movieId(), currentUser.movieLists.watched)
        if (movieInQueueList) {
            firebaseWriteDb.removeFromQueue(movieId());
            setAddQueueBtnState(buttonStates.addQueueBtn.default);
        } else {
            firebaseWriteDb.addToQueue(movieId());
            setAddQueueBtnState(buttonStates.addQueueBtn.inQueue);
        }

        console.log('addWatchedBtnState ', addWatchedBtnState());
        console.log('addQueueBtnState ', addQueueBtnState());
        console.log('movieId ', movieId());
        refsMovieLists().addListBtnGroup.innerHTML = view();
        return App
    }

    function view() {
        //   return `
        //     <div>Counter ${State.counter}</div>
        //     <button class="counter">INC</button>
        //   `
        return `
            <button class="button" id="add-watched" type="button" data-lng="${addWatchedBtnState().lngKey}">${addWatchedBtnState().text}</button>
            <button class="button" id="add-queue" type="button" data-lng="${addQueueBtnState().lngKey}">${addQueueBtnState().text}</button>
        `
    }

    function setupEvents() {
        let button =
            refsMovieLists().addListBtnGroup
                .addEventListener("click", App.incer)
    }

    return { render, incer, setupEvents }

})();





const checkIfMovieIsInList = (movieId, list) => {
    const movieInList = list.includes(movieId);
    return movieInList;
}
const onAddListBtnClick = async (event) => {
    console.log('onAddListBtnClick fired');
    event.preventDefault();
    const movieId = event.currentTarget.dataset.id;
    const elId = event.target.id;
    if (elId === 'add-queue') {
        firebaseWriteDb.addToQueue(movieId).then(() => {
            console.log('addToQueue success');
        });
    }
    if (elId === 'add-watched') { firebaseWriteDb.addToWatched(movieId); }

}
const addModalFilmEventListener = (e) => {
    App
        .render()
        .setupEvents();

    // // refsMovieLists().addListBtnGroup.addEventListener('click', onAddListBtnClick);
    // console.log('e: ', e);
    // const movieId = refsMovieLists().addListBtnGroup.dataset.id;
    // const addWatchedBtn = refsMovieLists().addWatchedBtn;
    // const addQueueBtn = refsMovieLists().addQueueBtn;
    // const movieInQueueList = checkIfMovieIsInList(movieId, currentUser.movieLists.queue);
    // const movieInWatchedList = checkIfMovieIsInList(movieId, currentUser.movieLists.watched);
    // console.log('currentUser.movieLists.queue: ', currentUser.movieLists.queue);
    // console.log('movieId: ', movieId);
    // console.log('is in queue list: ', movieInQueueList);
    // console.log('is in watched list: ', movieInWatchedList);
    // // Update Add to queue button
    // if (movieInQueueList) {
    //     addQueueBtn.textContent = 'Remove from queue';
    //     addWatchedBtn.addEventListener('click', async function onAddWatchedBtnClick(event) {
    //         firebaseWriteDb.removeFromQueue(movieId);
    //     });
    // }
    // // Update Add to watched button
    // if (movieInWatchedList) {
    //     addWatchedBtn.textContent = 'Watched';
    // }
}
const removeModalFilmEventListener = () => {
    // refs.addQueueBtn.removeEventListener('click', addModalFilmEventListener);
    // refs.addWatchedBtn.removeEventListener('click', onAddWatchedBtnClick);

}

document.addEventListener('modal-film-opened', addModalFilmEventListener);


export default { addModalFilmEventListener, onAddListBtnClick }