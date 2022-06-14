import auth from './auth_firebase';
import add from './firebase_write_db';

import get from './firebase_read_db';
import AuthEmail from './auth-email';
import AuthGithub from './auth-github';


// export default { logInByGoogle, logOut, addDocument, getDocument, removeFromQueue, addToQueue, addToWatched, getUsersMovieList };
export default { auth, add, get, AuthEmail, AuthGithub }
