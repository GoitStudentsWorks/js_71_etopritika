import ApiService from './api-service.js';
import genres from '../data/genres';
import refs from './refs';

const apiService = new ApiService();


function getGenreId(genreId) {
  const genre = genres.genres.find(function (genre) {
    return genre.id === genreId;
  });
  if (genre) {
    return genre.name;
  } else {
    return '';
  }
}

export default function renderMovies(movies) {
  refs.movieTrand.innerHTML = movies
    .map(
      movie => `
        <li class="movie-card__item" data-film-id="${movie.id}">
            <img class="movie-card__image" src="https://image.tmdb.org/t/p/w500/${
              movie.poster_path
            }" alt="${movie.title}" />
            <h2 class="movie-card__title">
              ${movie.title}
            </h2>
            <div class="movie-card__info">
            <p class="movie-card__genre">
            ${movie.genre_ids
              .map(
                genre_id =>
                  `<a class="movie-card__link" href="https://www.themoviedb.org/genre/${genre_id}">${getGenreId(
                    genre_id
                  )}</a>`
              )
              .join(', ')}
          </p>
          <p class="movie-card__release-date">
            <a class="movie-card__link" href="https://www.themoviedb.org/movie/${
              movie.id
            }?language=en-US">
            ${movie.release_date.split('-')[0]}
            </a>
          </p>  
            </div>
            
        </li>
      `
    )
    .join('');
}

apiService
  .fetchTrending()
  .then(response => response.results)
  .then(renderMovies)
  .catch(error => console.log(error));

window.addEventListener('load', () => {
   
    refs.loader.classList.add('loader-hidden');
    refs.loader.addEventListener('transitionend', () => {
        // document.body.removeChild(loader);
    })
});