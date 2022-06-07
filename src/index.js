import {
  getDataMovies,
  getMoreDataMovies,
  getTrendingMoviesData,
  getMoreTrendingMoviesData,
  getGenresIds,
} from './js/movie-fetch';

import itemsTemplate from './templates/list-of-card.hbs';

const gallery = document.querySelector('.gallery');

async function generateMurkup() {
  const moviesData = await getTrendingMoviesData();
  const genres = await getGenresIds();

  // Создание объекта в котором хранится информация для Handlebars
  const movieCategories = moviesData.results.map(movie => {
    const catArr = [];
    const dataRelease = movie.release_date.slice(0, 4);
    const nameOfFilm = movie.title.toUpperCase();
    const movieInfo = {
      name: nameOfFilm,
      release: dataRelease,
      id: movie.id,
      genres: catArr,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
    };

    // Сравнивает жанры из массива жанров с id жанров из общего запроса и добавляет нужные в объект для Handlebars
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

  // Создание разметки
  gallery.insertAdjacentHTML('beforeend', itemsTemplate(movieCategories));
}

generateMurkup();
