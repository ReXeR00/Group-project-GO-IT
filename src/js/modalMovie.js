import { fetchFilmDetailsById } from "./fetchDetails";


console.log(`hello`);


// otwieranie okna modalnego
const refs = {
    // modal open jest w trending.html 
    galleryBox: document.querySelector('[data-modal-open]'),
    // data modal jest w film-modal
    filmModal: document.querySelector('[data-modal]'),

  };

 
// dane które chcemy otrzymać w zależności od id
  let filmDetails = {}

  const searchId = []
//   let searchIdDetails = {}


refs.galleryBox.addEventListener('click', galleryBoxClick)

// to miało pokazywac modal po kliknięciu karty filmu
async function galleryBoxClick(event) {
    if(event.target.classList.contains('data-modal-open')) {
        return;
    }

    const filmId= event.currentTarget.dataset.id
    console.log(filmId);
    // const filmId= Number(event.target.closest('.movies__element').id);

// 
    let searchIdDetails = searchId.find(film => film.id === filmId)

if(searchIdDetails) {
    filmDetails = searchIdDetails
} else {
    try{
filmDetails = await fetchFilmDetailsById(filmId)
    }
    catch (err) {
        console.log(err.message);
        console.log(err.code);
    }
    searchId.push(filmDetails)
}

clearFilmModalMarkup();
renderFilmModal(filmDetails);


}


// układ okna modalnego
function createFilmModalMarkup (data) {
   
    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
    //   genres, nie wiem jak to wyciągnąć
      overview,
    } = data;
  
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  
    return `
    <div class="film-modal">
      <button class="button-close" type="button" button-modal-close>
       X
      </button>
      <img
        class="film__image"
        src="${posterUrl}"
        alt="Film Image"
        
      />
      <article>
        <div class="film__content">
          <h2 class="film__title">${title}</h2>
  
          <ul class="film-info">
            <li class="film-info__item">
              <p class="film-info__lable">Vote / Votes</p>
  
              <div class="film-vote">
                <span class="film-vote__lable film-vote__lable--orange"
                  >${vote_average}</span
                >
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
              <span class="film-info__text"
                ></span
              >.
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
  
  function clearFilmModalMarkup() {
    refs.filmModal.innerHTML = '';
  }
  

//   to miało renderować okno modalne
  function renderFilmModal(data) {
    const fiimModalMarkup = createFilmModalMarkup(data);
    // const fiimModalMarkup = createFilmModalMarkup(data);
    refs.filmModal.insertAdjacentHTML('beforeend', fiimModalMarkup);
  }