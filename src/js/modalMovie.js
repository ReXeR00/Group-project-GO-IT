import { fetchFilmDetailsById } from './fetchDetails';

const refs = {
  // galleryBox: document.querySelector('[data-modal-open]'),
  galleryBox: document.querySelector('.movies__list'),
  filmModal: document.querySelector('[data-modal]'),
  searchId: [],
  filmDetails: {},
};


const btnRefs={
   closeBtn: document.querySelector('.modal-close'),
}

refs.galleryBox.addEventListener('click', galleryBoxClick);


if (btnRefs.btnClose) {
  btnRefs.btnClose.addEventListener('click', onBackdropModalClick)
}
// btnRefs.btnClose.addEventListener('click', onBackdropModalClick)



async function galleryBoxClick(event) {
  if (event.target.classList.contains('.movies__list')) {
    return;
  }
  const galleryItem = event.target.closest('[data-id]');
  const filmId = galleryItem.dataset.id;
  console.log('ID filmu:', filmId);

  let searchIdDetails = null;
  if (refs.searchId.length > 0) {
    searchIdDetails = refs.searchId.find(film => film.id == filmId);
  }
  const filmDetailsResponse = await fetchFilmDetailsById(filmId);
  const filmDetails = filmDetailsResponse.data;
  refs.filmDetails = filmDetails;
  refs.searchId.push(filmDetails);
  refs.filmModal.classList.remove('is-hidden'), 
  renderFilmModal(refs.filmDetails);
  
}

// clearFilmModalMarkup();



function createFilmModalMarkup(data) {
  console.log('createFilmModalMarkup', data);
  const title = data.title;
  const vote_average = data.vote_average;
  const vote_count = data.vote_count;
  const popularity = data.popularity;
  const original_title = data.original_title;
  const overview = data.overview;
  const posterPath = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  console.log(title);
  console.log(posterPath);
  return `
    <div class="film-modal" >
      <button class="button-close" type="button" value="click" button-modal-close>
       X
      </button>
      <img
        class="film__image"
        src="https://image.tmdb.org/t/p/w500/${posterPath}"
        alt="Film Image"
      />
      <article>
        <div class="film__content">
          <h2 class="film__title">${title}</h2>
          <ul class="film-info">
            <li class="film-info__item">
              <p class="film-info__lable">Vote / Votes</p>
              <div class="film-vote">
                <span class="film-vote__lable film-vote__lable--orange">
                  ${vote_average}
                </span>
                <span>/</span>
                <span class="film-vote__lable">${vote_count}</span>
              </div>
            </li>
            <li class="film-info__item">
              <p class="film-info__lable">Popularity</p>
              <span class="film-info__text">${popularity}</span>
            </li>
            <li class="film-info__item">
              <p class="film-info__lable">Original Title</p>
              <span class="film-info__text film-info__text--uppercase">
                ${original_title}
              </span>
            </li>
            <li class="film-info__item">
              <p class="film-info__lable">Genre</p>
              <span class="film-info__text"></span>
            </li>
          </ul>
          <div class="film-description">
            <h3 class="film-description__title">About</h3>
            <p class="film-description__text">${overview}</p>
          </div>
        </div>
        <ul class="film-button">
          <li class="film-button__item">
            <button
              class="film-button__primary"
              type="button"
              button-add-watch
            >
              Add to Watched
            </button>
          </li>
          <li class="film-button__item">
            <button class="film-button__primary" type="button" button-add-queue>
              Add to Queue
            </button>
          </li>
        </ul>
      </article>
    </div>
  `;


}

function renderFilmModal(data) {
  console.log('renderFilmModal data:', data);
  const fiimModalMarkup = createFilmModalMarkup(data);
  refs.filmModal.insertAdjacentHTML('beforeend', fiimModalMarkup);
}


function clearFilmModalMarkup() {
  refs.filmModal.innerHTML = '';
  
}

function onModalClose() {
  refs.filmModal.classList.add('is-hidden'), 
  window.removeEventListener('keydown', onEscapePress)
}

// function onBackdropModalClick(e) {
//   if (e.currentTarget === e.target) {
//     onCloseModal();
//   }
// }

function onEscapePress (e) {
  if(e.key === 'Escape') {
    onModalClose()

  }
}


// function onModalClose(event) {
// if (event.target.classList.contains('button-modal-close')) {
//   refs.filmModal.classList.add('is-hidden'), 
//   window.removeEventListener('keydown', onEscapePress)
// }
 
// }




