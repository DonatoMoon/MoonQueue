// src/redux/movies/moviesReducer.js
const initialState = {
  watched: [],
  queue: [],
  error: null,
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHED":
      return {
        ...state,
        watched: [...state.watched, action.payload],
      };
    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };
    case "ADD_TO_QUEUE":
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case "REMOVE_FROM_QUEUE":
      return {
        ...state,
        queue: state.queue.filter((movie) => movie.id !== action.payload),
      };
    case "SET_WATCHED":
      return {
        ...state,
        watched: action.payload,
      };
    case "SET_QUEUE":
      return {
        ...state,
        queue: action.payload,
      };
    case "USER_NOT_LOGGED_IN":
      return {
        ...state,
        error: "User is not logged in.",
      };
    default:
      return state;
  }
};

export default moviesReducer;
