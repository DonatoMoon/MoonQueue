import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatched,
  removeFromWatched,
  addToQueue,
  removeFromQueue,
} from "../../redux/movies/moviesActions";
import ModalFilmCard from "../ModalFilmCard/ModalFilmCard";
import css from "./ModalFilm.module.scss";

export default function ModalFilm({
  movie,
  neighbors,
  onClose,
  onOpen,
  currentIndex,
  moviesLength,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const watched = useSelector((state) => state.movies.watched);
  const queue = useSelector((state) => state.movies.queue);

  const [isWatched, setIsWatched] = useState(false);
  const [isInQueue, setIsInQueue] = useState(false);

  useEffect(() => {
    const movieWatched = watched.some((m) => m.id === movie.id);
    const movieInQueue = queue.some((m) => m.id === movie.id);
    setIsWatched(movieWatched);
    setIsInQueue(movieInQueue);
  }, [watched, queue, movie]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePrevClick = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : moviesLength - 1;
    onOpen(neighbors.prevMovie, newIndex);
  };

  const handleNextClick = () => {
    const newIndex = currentIndex < moviesLength - 1 ? currentIndex + 1 : 0;
    onOpen(neighbors.nextMovie, newIndex);
  };

  const handleAddToWatched = () => {
    if (!user) {
      alert("Please log in to add to Watched list");
      return;
    }
    if (isWatched) {
      dispatch(removeFromWatched(movie.id));
    } else {
    //   console.log("Adding to watched:", movie);
      dispatch(addToWatched(movie));
    }
  };

  const handleAddToQueue = () => {
    if (!user) {
      alert("Please log in to add to Queue");
      return;
    }
    if (isInQueue) {
      dispatch(removeFromQueue(movie.id));
    } else {
    //   console.log("Adding to queue:", movie);
      dispatch(addToQueue(movie));
    }
  };

  return (
    <section className={css.modalFilm} onClick={handleOverlayClick}>
      <div className={css.overlay}>
        <div className={css.modalCard} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={css.modalCard__close}
            onClick={onClose}
          >
            ×
          </button>

          <ModalFilmCard movie={movie} />

          <div className={css.buttons}>
            <button
              type="button"
              className={css.buttons__watched}
              onClick={handleAddToWatched}
            >
              <p className={css.buttons__text}>
                {isWatched ? (
                  <>
                    Remove from <br /> Watched
                  </>
                ) : (
                  <>
                    Add to <br /> Watched
                  </>
                )}
              </p>
            </button>
            <button
              type="button"
              className={css.buttons__queue}
              onClick={handleAddToQueue}
            >
              <p className={css.buttons__text}>
                {isInQueue ? (
                  <>
                    Remove from <br /> Queue
                  </>
                ) : (
                  <>
                    Add to <br /> Queue
                  </>
                )}
              </p>
            </button>
          </div>
        </div>

        {currentIndex !== 0 && neighbors.prevMovie && (
          <div className={css.modalCardPrev} onClick={handlePrevClick}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${neighbors.prevMovie.poster_path}`}
              alt={neighbors.prevMovie.original_title}
            />
          </div>
        )}

        {currentIndex !== moviesLength - 1 && neighbors.nextMovie && (
          <div className={css.modalCardNext} onClick={handleNextClick}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${neighbors.nextMovie.poster_path}`}
              alt={neighbors.nextMovie.original_title}
            />
          </div>
        )}
      </div>
    </section>
  );
}
