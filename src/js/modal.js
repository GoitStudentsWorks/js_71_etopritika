import ApiService from './api-service.js';
const apiService = new ApiService();
import { addWatchedMovieInLocalStorage } from './local-storage.js';
import { addQueueMovieInLocalStorage } from './local-storage.js';

const refs = {
  modalConteiner: document.querySelector('.modal'),
  closeModalBtn: document.querySelector('.close-modal'),
  backdrop: document.querySelector('.js-backdrop'),
};

refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);

export function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  document.body.classList.add('show-modal');
  
}

export function appendModalMarkup(movie) {
  // console.log(movie);
  const cardOfFilms = `
  
   <div class="modal-card">            
  <div >
  <img class="modal-img" src= https://image.tmdb.org/t/p/w500/${movie.poster_path} alt=${movie.title} />
  </div>
  <div class="modal-info">
   <h2 class="title">${movie.title}</h2>
   <ul class="catalog">
       <li class="modal-item-list">
           <span class="modal-item"> Vote / Votes</span>
           <span class="vote_average">${movie.vote_average}</span>
           <span class="modal-item"> / </span>
           <span class="vote_count"> ${movie.vote_count}</span>
       </li>
       <li class="modal-item-list"><span class="modal-item"> Popularity </span><span class="popularity">${movie.popularity}</span></li>
       <li class="modal-item-list"><span class="modal-item"> Original Title</span><span class="original-title">${movie.original_title}</span></li>
       <li class="modal-item-list"><span class="modal-item"> Genre</span>
       ${movie.genres.map( genre => `<span class="genres"> ${genre.name} </span>`)}
           </li>
   </ul>
   <h3 class="modal-about">ABOUT</h3>
   <p class="overview">${movie.overview}</p>
   <div class="modal-btn">
   <button class="add-watched">ADD TO WATCHED</button>
   <button class="add-queue">ADD TO QUEUE</button>
   </div>
   </div>
   </div>`;

  refs.modalConteiner.insertAdjacentHTML('beforeend', cardOfFilms);
  const btnAddToWatched = document.querySelector('.add-watched');
  const btnAddToQueue = document.querySelector('.add-queue');

  btnAddToWatched.addEventListener('click', addWatchedMovieInLocalStorage);
  btnAddToQueue.addEventListener('click', addQueueMovieInLocalStorage);
}

function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  document.body.classList.remove('show-modal');
  clearAppendModalMarkup();
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
      onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
      onCloseModal();
  };
}     

function clearAppendModalMarkup() {
  refs.modalConteiner.innerHTML = '';
}

