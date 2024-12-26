import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    current_page: 1,
    total_pages: 0,
    total_results: 0,
    name: "",
    genre: "",
    year: "",
    sorting: "",
    author: "",
  },
  reducers: {
    setCurrentPage(state, action) {
      state.current_page = action.payload;
    },
    setTotalPages(state, action) {
      state.total_pages = action.payload;
    },
    setTotalResults(state, action) {
      state.total_results = action.payload;
    },
    changeFilter(state, action) {
      state.name = action.payload;
    },
    changeGenre(state, action) {
      state.genre = action.payload !== "start" ? action.payload : "";
    },
    changeYear(state, action) {
      state.year = action.payload !== "start" ? action.payload : "";
    },
    changeSorting(state, action) {
      state.sorting = action.payload !== "start" ? action.payload : "";
    },
    changeAuthor(state, action) {
      state.author = action.payload !== "" ? action.payload : "";
    },
    changeCurrentPages(state, action) {
      state.current_page = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setTotalPages,
  setTotalResults,
  changeFilter,
  changeGenre,
  changeYear,
  changeSorting,
  changeCurrentPages,
  changeAuthor,
} = filtersSlice.actions;
export default filtersSlice.reducer;
