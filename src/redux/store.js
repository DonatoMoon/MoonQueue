// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import moviesReducer from "./movies/moviesReducer";
import filtersReducer from "./filters/slice";
import libraryReducer from "./library/slice";
import authReducer from "./auth/authReducer";
import noteReducer from "./note/noteReducer";

const moviesPersistConfig = {
  key: "movies",
  storage,
  whitelist: ["watched", "queue"],
};

const filtersPersistConfig = {
  key: "filters",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user"],
};

const notesPersistConfig = {
  key: "notes",
  storage,
};

const persistedMoviesReducer = persistReducer(
  moviesPersistConfig,
  moviesReducer
);
const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedNotesReducer = persistReducer(notesPersistConfig, noteReducer);

export const store = configureStore({
  reducer: {
    movies: persistedMoviesReducer,
    filters: persistedFiltersReducer,
    library: libraryReducer,
    auth: persistedAuthReducer,
    notes: persistedNotesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
