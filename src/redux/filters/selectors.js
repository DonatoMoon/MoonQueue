export const selectNameFilter = (state) => {
  return state.filters.name;
};

export const selectAuthorFilter = (state) => {
  return state.filters.author;
};

export const selectGenreFilter = (state) => {
  return state.filters.genre;
};

export const selectYearFilter = (state) => {
  return state.filters.year;
};

export const selectSortingFilter = (state) => {
  return state.filters.sorting;
};

export const selectCurrentPage = (state) => {
  return state.filters.current_page;
};

export const selectTotalPage = (state) => {
  return state.filters.total_pages;
};
