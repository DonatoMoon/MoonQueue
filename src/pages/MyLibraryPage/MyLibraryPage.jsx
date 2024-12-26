// src/pages/MyLibraryPage.js
import css from "./MyLibraryPage.module.scss"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieList from "../../components/MovieList/MovieList";
import EmptyList from "../../components/EmptyList/EmptyList";

export default function MyLibraryPage() {
  const activeTab = useSelector((state) => state.library.activeTab);
  const watchedMovies = useSelector((state) => state.movies.watched);
  const queueMovies = useSelector((state) => state.movies.queue);

  const [movies, setMovies] = useState([]);

  // console.log("movies list", movies);

  useEffect(() => {
    if (activeTab === "WATCHED") {
      setMovies(watchedMovies);
    } else if (activeTab === "QUEUE") {
      setMovies(queueMovies);
    }
  }, [activeTab, watchedMovies, queueMovies]);

  return (
    <div className={css.library}>
      <div className={"container"}>
        {movies.length > 0 ? <MovieList movies={movies}  info={"catalog"} /> : <EmptyList />}
      </div>
    </div>
  );
}
