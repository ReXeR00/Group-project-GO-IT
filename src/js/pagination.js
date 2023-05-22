import { showTrendingMovies, trendingMovies } from './movies';
import { addPageNumber, dots, leftPage, rightPage } from './createPaginationElements';

export const paginationEl = document.querySelector('.pagination');

trendingMovies()
  .then(movie => {
    showTrendingMovies(movie);
    showPagination(movie);
  })
  .catch(error => console.log(error));

const showPagination = page => {
  paginationEl.innerHTML = '';
  let screenWidth = window.matchMedia('(max-width: 767px)');

  const currentPage = page.data.page;
  let totalPages = page.data.total_pages;

  if (totalPages > 20) totalPages = 20;

  const drawPagination = () => {
    paginationEl.innerHTML = '';
    if (totalPages <= 5) {
      leftPage();

      for (let i = 0; i < totalPages; i++) {
        if (totalPages === 1) {
          paginationEl.innerHTML = '';
        } else {
          paginationEl.innerHTML = addPageNumber(i + 1);
        }
      }

      if (totalPages != 1) rightPage(currentPage);
    } else {
      leftPage();

      if ((currentPage < 4 && screenWidth.matches) || !screenWidth.matches) addPageNumber('1');
      if (currentPage > 4 && !screenWidth.matches) paginationEl.innerHTML += dots();
      if (currentPage === totalPages) addPageNumber(currentPage - 4);
      if (currentPage > 4 && currentPage > 18) addPageNumber(currentPage - 3);
      if (currentPage > 3) addPageNumber(currentPage - 2);
      if (currentPage > 2) addPageNumber(currentPage - 1);
      if (currentPage != 1 && currentPage != totalPages) addPageNumber(currentPage);
      if (currentPage < totalPages - 1) addPageNumber(currentPage + 1);
      if (currentPage < totalPages - 2) addPageNumber(currentPage + 2);
      if (currentPage < totalPages - 3 && currentPage < 3) addPageNumber(currentPage + 3);
      if (currentPage === 1) addPageNumber(currentPage + 4);
      if (currentPage < totalPages - 3 && !screenWidth.matches) paginationEl.innerHTML += dots();
      if (
        (totalPages > 1 && currentPage > 17 && screenWidth.matches) ||
        (totalPages > 1 && !screenWidth.matches)
      )
        addPageNumber(totalPages);

      rightPage(currentPage);
    }

    document.querySelector(`li[data-value="${currentPage}"]`).classList.add('active');

    changePages(currentPage, totalPages);
  };

  drawPagination();
  onresize = () => drawPagination();
};

const changePages = (currentPage, totalPages) => {
  if (currentPage != 1)
    document.getElementById('prev').addEventListener('click', () => {
      setTimeout(() => {
        scrollToTop();

        trendingMovies(currentPage - 1)
          .then(movie => {
            showTrendingMovies(movie);
            showPagination(movie);
          })
          .catch(error => console.log(error));
      }, 250);
    });

  if (currentPage != totalPages)
    document.getElementById('next').addEventListener('click', () => {
      setTimeout(() => {
        scrollToTop();

        trendingMovies(currentPage + 1)
          .then(movie => {
            showTrendingMovies(movie);
            showPagination(movie);
          })
          .catch(error => console.log(error));
      }, 250);
    });

  document.querySelectorAll('.pagination__page').forEach(pageEls => {
    pageEls.addEventListener('click', e => {
      const selectedPage = e.target.dataset.value;
      setTimeout(() => {
        scrollToTop();

        trendingMovies(selectedPage)
          .then(movie => {
            showTrendingMovies(movie);
            showPagination(movie);
          })
          .catch(error => console.log(error));
      }, 250);
    });
  });
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
