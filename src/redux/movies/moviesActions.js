// src/redux/movies/moviesActions.js
import { getDatabase, ref, set, remove, get } from "firebase/database";
import { auth } from "../../firebaseConfig";

export const addToWatched = (movie) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: "USER_NOT_LOGGED_IN" });
    return;
  }

  const db = getDatabase();
  const movieRef = ref(db, `users/${user.uid}/watched/${movie.id}`);
  // console.log("Adding movie to watched:", movie); // Додаємо логування для перевірки даних фільму
  await set(movieRef, movie);
  dispatch({ type: "ADD_TO_WATCHED", payload: movie });
};

export const removeFromWatched = (movieId) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: "USER_NOT_LOGGED_IN" });
    return;
  }

  const db = getDatabase();
  const movieRef = ref(db, `users/${user.uid}/watched/${movieId}`);
  await remove(movieRef);
  dispatch({ type: "REMOVE_FROM_WATCHED", payload: movieId });
};

export const addToQueue = (movie) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: "USER_NOT_LOGGED_IN" });
    return;
  }

  const db = getDatabase();
  const movieRef = ref(db, `users/${user.uid}/queue/${movie.id}`);
  // console.log("Adding movie to queue:", movie); // Додаємо логування для перевірки даних фільму
  await set(movieRef, movie);
  dispatch({ type: "ADD_TO_QUEUE", payload: movie });
};

export const removeFromQueue = (movieId) => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: "USER_NOT_LOGGED_IN" });
    return;
  }

  const db = getDatabase();
  const movieRef = ref(db, `users/${user.uid}/queue/${movieId}`);
  await remove(movieRef);
  dispatch({ type: "REMOVE_FROM_QUEUE", payload: movieId });
};

export const fetchUserMovies = () => async (dispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch({ type: "USER_NOT_LOGGED_IN" });
    return;
  }

  const db = getDatabase();
  const watchedRef = ref(db, `users/${user.uid}/watched`);
  const queueRef = ref(db, `users/${user.uid}/queue`);

  try {
    const watchedSnapshot = await get(watchedRef);
    const queueSnapshot = await get(queueRef);

    const watchedMovies = [];
    const queueMovies = [];

    watchedSnapshot.forEach((childSnapshot) => {
      watchedMovies.push(childSnapshot.val());
    });

    queueSnapshot.forEach((childSnapshot) => {
      queueMovies.push(childSnapshot.val());
    });

    dispatch({ type: "SET_WATCHED", payload: watchedMovies });
    dispatch({ type: "SET_QUEUE", payload: queueMovies });
  } catch (error) {
    console.error("Error fetching user movies:", error);
  }
};
