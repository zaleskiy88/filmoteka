import currentUser from '../../storage/currentUser';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { setDoc, updateDoc, arrayUnion, arrayRemove, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase_app';

onAuthStateChanged(getAuth(), user => {
    if (user) {
        onSnapshot(
            doc(db, "users", user.uid),
            (doc) => {
                currentUser.movieLists = doc.data();
            });
    } else {
        currentUser.clear();
    }
});

const updateUserMovies = async ({ movieId, movieList }) => {
    console.log('updateUserMovies fired');
    try {
        console.log('inside try');
        await setDoc(doc(db, "users", currentUser.userUiid), {
            [movieList]: arrayUnion(movieId)
        }, { merge: true });
    } catch (e) {
        throw Error(`Error adding to ${movieList}:`, e);
    }
}
const removeFromQueue = async (movieId) => {
    try {
        updateDoc(doc(db, "users", currentUser.userUiid), {
            queue: arrayRemove(movieId)
        });
    } catch (error) {
        throw Error(`Error removing from ${movieList}:`, e);
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