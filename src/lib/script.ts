// import {
//   MIN_CHARS_SEARCH_QUERY,
//   SEARCH_QUERY_KEY,
// } from './constants/search';
// import { searchPage, searchQuery } from './stores/search';

// function initApp(win: Window, doc: Document) {
//   function initSearchQueryStore() {
//     const searchParams = new URLSearchParams(win.location.search);
//     const searchQueryFromQueryString =
//       searchParams.get(SEARCH_QUERY_KEY);
//     if (
//       searchQueryFromQueryString &&
//       searchQueryFromQueryString.length >= MIN_CHARS_SEARCH_QUERY
//     ) {
//       searchQuery.set(searchQueryFromQueryString);
//     } else {
//       searchQuery.set('');
//     }
//   }

//   function initStores() {
//     searchPage.set(1);

//     const isHomePage = win.location.pathname === '/';
//     if (isHomePage) {
//       initSearchQueryStore();
//     }
//   }

//   initStores();
//   doc.addEventListener('astro:after-swap', initStores);
// }

// initApp(window, document);
