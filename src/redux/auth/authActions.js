// src/redux/auth/authActions.js
import { auth, database } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, set, get, child } from "firebase/database";

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: { uid: user.uid, email: user.email },
    });
  } catch (error) {
    dispatch({ type: "REGISTER_FAIL", payload: error.message });
  }
};

// src/redux/auth/authActions.js
import { getAuth } from "firebase/auth";
import { fetchUserMovies } from '../movies/moviesActions';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        uid: user.uid,
        email: user.email,
      },
    });
    // Завантаження даних користувача
    dispatch(fetchUserMovies());
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error.message });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const auth = getAuth();
    await signOut(auth);
    dispatch({ type: "LOGOUT_SUCCESS" });
    dispatch({ type: "SET_WATCHED", payload: [] });
    dispatch({ type: "SET_QUEUE", payload: [] });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.message });
  }
};


// export const watchUser = () => (dispatch) => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       dispatch({ type: "USER_LOGGED_IN", payload: user });
//     } else {
//       dispatch({ type: "USER_LOGGED_OUT" });
//     }
//   });
//   return unsubscribe;
// };

export const createNote = (user, queue, watched) => async (dispatch) => {
  try {
    await set(ref(database, "galleries/" + user.uid), {
      queue,
      watched,
    });
    // console.log("Note created for user:", user.uid); // Виведення повідомлення після створення запису
    dispatch({ type: "CREATE_NOTE_SUCCESS" });
  } catch (error) {
    // console.error("Create note error:", error.message); // Виведення помилки створення запису
    dispatch({ type: "CREATE_NOTE_FAIL", payload: error.message });
  }
};

export const readNote = (user) => async (dispatch) => {
  try {
    const snapshot = await get(child(ref(database), `galleries/${user.uid}`));
    if (snapshot.exists()) {
      // console.log("Note data:", snapshot.val()); // Виведення даних запису
      dispatch({ type: "READ_NOTE_SUCCESS", payload: snapshot.val() });
    } else {
      // console.log("No data available for user:", user.uid); // Виведення повідомлення, якщо дані відсутні
      dispatch({ type: "READ_NOTE_FAIL", payload: "No data available" });
    }
  } catch (error) {
    // console.error("Read note error:", error.message); // Виведення помилки читання запису
    dispatch({ type: "READ_NOTE_FAIL", payload: error.message });
  }
};
