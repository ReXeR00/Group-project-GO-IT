import { addPageNumber, dots, prevPage, nextPage } from './createPaginationElements';
import { fetchMovies, query, searchInput } from './input-search';
import { getPopular, renderPopular } from './trending';

export const paginationEl = document.querySelector('.pagination');

export const showPagination = page => {
  paginationEl.innerHTML = '';
  let screenWidth = window.matchMedia('(max-width: 767px)');

  const currentPage = page.data.page;
  let totalPages = page.data.total_pages;
  console.log('Pagination total pages', totalPages);

  if (totalPages > 20) totalPages = 20;

  const drawPagination = () => {
    paginationEl.innerHTML = '';
    if (totalPages <= 5) {
      prevPage();

      for (let i = 0; i < totalPages; i++) {
        if (totalPages === 1) {
          paginationEl.innerHTML = '';
        } else {
          paginationEl.innerHTML = addPageNumber(i + 1);
        }
      }

      if (totalPages != 1 && totalPages != 0) nextPage(currentPage);
    } else {
      prevPage();

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

      nextPage(currentPage);
    }

    if (totalPages > 1) {
      document.querySelector(`li[data-value="${currentPage}"]`).classList.add('active');
    }

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

        if (searchInput.value === '') {
          getPopular(currentPage - 1)
            .then(movie => {
              renderPopular(movie.data.results);
              showPagination(movie);
            })
            .catch(error => console.log(error));
        } else {
          fetchMovies(query, currentPage - 1).then(movie => {
            renderPopular(movie.data.results);
            showPagination(movie);
          });
        }
      }, 250);
    });

  if (currentPage != totalPages)
    document.getElementById('next').addEventListener('click', () => {
      setTimeout(() => {
        scrollToTop();

        if (searchInput.value === '') {
          getPopular(currentPage + 1)
            .then(movie => {
              renderPopular(movie.data.results);
              showPagination(movie);
            })
            .catch(error => console.log(error));
        } else {
          fetchMovies(query, currentPage + 1).then(movie => {
            renderPopular(movie.data.results);
            showPagination(movie);
          });
        }
      }, 250);
    });

  document.querySelectorAll('.pagination__page').forEach(pageEls => {
    pageEls.addEventListener('click', e => {
      const selectedPage = e.target.dataset.value;
      setTimeout(() => {
        scrollToTop();

        if (searchInput.value === '') {
          getPopular(selectedPage)
            .then(movie => {
              renderPopular(movie.data.results);
              showPagination(movie);
            })
            .catch(error => console.log(error));
        } else {
          fetchMovies(query, selectedPage).then(movie => {
            renderPopular(movie.data.results);
            showPagination(movie);
          });
        }
      }, 250);
    });
  });
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
