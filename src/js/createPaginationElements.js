import { paginationEl } from './pagination';

export const addPageNumber = number =>
  (paginationEl.innerHTML += `
    <li class="pagination__page-box pagination__page" data-value="${number}">${number}</li>
  `);

export const leftPage = () =>
  (paginationEl.innerHTML += `
      <li id="prev">
        <div class="pagination__page-box pagination__page-box--step">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.33333"><path d="M12.6666 8H3.33325M7.99992 12.6667 3.33325 8.00004l4.66667-4.66667"/></g></svg>
        </div>
      </li>`);

export const rightPage = currentPage => {
  if (currentPage)
    paginationEl.innerHTML += `
      <li id="next">
        <div class="pagination__page-box pagination__page-box--step">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none"><g stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.33333"><path d="M3.33341 8h9.33329M8.00008 12.6667l4.66662-4.66666-4.66662-4.66667"/></g></svg>
        </div>
      </li>`;
};

export const dots = () =>
  `<li class="pagination__page-box"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="3" fill="none"><path fill="#000" d="M1.61719.5c.26562 0 .4707.076172.61523.228516.14453.148437.2168.335934.2168.562504 0 .22265-.07227.4082-.2168.55664-.14453.14453-.34961.21679-.61523.21679-.25391 0-.45508-.07226-.60352-.21679-.148436-.14454-.222654-.33008-.222654-.55664 0-.22657.072265-.414067.216794-.562504C1.15234.576172 1.35547.5 1.61719.5Zm3.35156 0c.26563 0 .4707.076172.61523.228516.14454.148437.2168.335934.2168.562504 0 .22265-.07226.4082-.2168.55664-.14453.14453-.3496.21679-.61523.21679-.25391 0-.45508-.07226-.60352-.21679-.14843-.14454-.22265-.33008-.22265-.55664 0-.22657.07226-.414067.2168-.562504C4.50391.576172 4.70703.5 4.96875.5Zm3.35156 0c.26563 0 .47071.076172.61524.228516.14453.148437.21679.335934.21679.562504 0 .22265-.07226.4082-.21679.55664-.14453.14453-.34961.21679-.61524.21679-.2539 0-.45508-.07226-.60351-.21679-.14844-.14454-.22266-.33008-.22266-.55664 0-.22657.07227-.414067.2168-.562504C7.85547.576172 8.05859.5 8.32031.5Z"/></svg></li>`;
