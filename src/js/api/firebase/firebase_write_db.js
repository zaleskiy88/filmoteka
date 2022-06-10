import currentUser from '../../storage/currentUser';
import { setDoc, updateDoc, arrayUnion, arrayRemove, doc } from 'firebase/firestore';
import { db } from './firebase_app';

const updateUserMovies = async ({ movieId, movieList }) => {
    console.log('updateUserMovies fired');
    try {
        console.log('inside try');
        await setDoc(doc(db, "users", currentUser.userUiid), {
            [movieList]: arrayUnion(movieId)
        }, { merge: true });
    } catch (e) {
        throw Error(`Error adding to queue: ${movieList}`, e);
    }
}
const removeFromQueue = async (movieId) => {
    try {
        updateDoc(doc(db, "users", currentUser.userUiid), {
            queue: arrayRemove(movieId)
        });

    } catch (error) {
        console.log('Error removing from queue:', error);
    }
}
const addToQueue = async (movieId) => {
    console.log('addToQueue called');
    await updateUserMovies({ movieId, movieList: "queue" });
}
const addToWatched = async (movieId) => {
    console.log('addToWatched called');
    await updateUserMovies({ movieId, movieList: "watched" });
    removeFromQueue(movieId);
}

export default { removeFromQueue, addToQueue, addToWatched };