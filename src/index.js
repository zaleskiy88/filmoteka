import './js/pagination';
import {
  getDataMovies,
  getMoreDataMovies,
  getTrendingMoviesData,
  getMoreTrendingMoviesData,
  getGenresIds,
  getOneMovieById,
} from './js/movie-fetch';

import { initLightbox } from './js/modal-film.js';
import itemsTemplate from './templates/list-of-card.hbs';
import preloader from './templates/preloader.hbs';

const gallery = document.querySelector('.gallery');
const preloaderContainer = document.querySelector(".preloader");

preloaderContainer.innerHTML = preloader();

const form = document.querySelector("form");

async function generateMarkup() {
  const moviesData = await getTrendingMoviesData();

  // Creating an object that stores data for handlebars template
  const movieCategories = await generateMoviesWithGenres(moviesData);

  // Rendering markup
  setTimeout(() => {
    preloaderContainer.innerHTML = '';
    gallery.insertAdjacentHTML('beforeend', itemsTemplate(movieCategories));
    footer.style.position = "static";
  }, 2000)

}

async function onSearchSubmit(event) {
  event.preventDefault();

  const moviesData = await getDataMovies(
    event.currentTarget.elements.searchQuery.value
  );

  const movieCategories = await generateMoviesWithGenres(moviesData);

  // Rendering markup

  gallery.innerHTML = itemsTemplate(movieCategories);


}

async function generateMoviesWithGenres(data) {
  const genres = await getGenresIds();

  // Creating an object that stores data for handlebars template
  return data.results.map(movie => {
    const catArr = [];
    const dataRelease = movie.release_date?.slice(0, 4) || 2022;
    const nameOfFilm = movie.title.toUpperCase();
    const movieInfo = {
      name: nameOfFilm,
      release: dataRelease,
      id: movie.id,
      genres: catArr,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };

    // Comparing ganres taken from the general ganre array with IDs and adding ganres' values in the object for handlebars template
    const genresFilm = function () {
      movie.genre_ids.map(id =>
        genres.find(el => {
          if (el.id === id) {
            return catArr.push(el.name);
          }
        })
      );
    };

    genresFilm();
    return movieInfo;
  });
}

generateMarkup();

form.addEventListener('submit', onSearchSubmit);



////////////////////////// Firebase //////////////////////////
import currentUser from './js/storage/currentUser';
import apiFirebase from './js/api/firebase';
console.log(apiFirebase);

document.querySelector('.header-library__btnQue').addEventListener('click', () => {
  console.log(userMovies.queue);
});
document.querySelector('.header-library__btnWatc').addEventListener('click', () => {
  console.log(userMovies.wathced);
});
document.querySelector('.theme').addEventListener('click', () => {
  myUser.addToQueue(Math.random());
  // console.log(object);
})

//!-- need to delete
//From temp partial
const container = document.querySelector('.container');
const login = document.querySelector('.login');
const logout = document.querySelector('.logout');
const add_queue = document.querySelector('.add_queue');
const add_watched = document.querySelector('.add_watched');
const get = document.querySelector('.get');
const stat = document.querySelector('.stat');
//--END from temp partial

//login click callback
function onLoginClick() {
  console.log('login');
  apiFirebase.auth.logInByGoogle();
  // authGoogleAPI
  //   .LogInByGoogle()
  //   .then(result => {
  //     const user = result.user;
  //     console.log(user);
  //     console.log(user.displayName);
  //   })
  //   .catch(error => {
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //     console.log('catch ', error, 'credential ', credential);
  //   });
}
//Вход
login.addEventListener('click', onLoginClick);
//Выход
logout.addEventListener('click', () => {
  console.log('logout');
  apiFirebase.auth.logOut();
});
//Запись в базу данных
add_queue.addEventListener('click', () => {
  console.log('add queue');
  apiFirebase.add.addToQueue(Math.random());
  // Передаем методу два массива - первый очередь, второй просмотренные
  // authGoogleAPI.addDocument([1, 2, 3], [4, 5, 6]);
});
add_watched.addEventListener('click', () => {
  console.log('add watched');
  apiFirebase.add.addToWatched(Math.random());
});
//Выборка данных из базы
// get.addEventListener('click', () => {
//   console.log('get');
//   const usr = authGoogleAPI.getDocument();
//   //Получаем промис с результатом в виде объекта с двумя массивами - очередь и просмотренные
//   usr
//     .then(result => {
//       console.log('Result ', result);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });
//!END -- need to delete
stat.addEventListener('click', () => {
  console.log('stat');
  console.log(currentUser);
});

// UserClass.authStateListener();
