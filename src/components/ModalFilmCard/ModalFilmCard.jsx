import css from "./ModalFilmCard.module.scss";
import { genres } from "../../constants/genres";

export default function ModalFilmCard({ movie }) {
  return (
    <div className={css.modalCard}>
      <div className={css["modalCard__img-thumb"]}>
        <img
          className={css["modalCard__image"]}
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.original_title}
          width={300}
        />
      </div>

      <div className={css["modalCard__data"]}>
        <h2 className={css["modalCard__heading"]}>{movie.title}</h2>

        <ul className={css["modalCard__list"]}>
          <li className={css["modalCard__list-item"]}>
            <p className={css["modalCard__list-label"]}>Vote / Votes</p>
            <p className={css["modalCard__list-value"]}>
              <span className={css["modalCard__rate"]}>
                {movie.vote_average.toFixed(1)}
              </span>{" "}
              / {movie.vote_count}
            </p>
          </li>

          <li className={css["modalCard__list-item"]}>
            <p className={css["modalCard__list-label"]}>Popularity</p>
            <p className={css["modalCard__list-value"]}>{movie.popularity}</p>
          </li>

          <li className={css["modalCard__list-item"]}>
            <p className={css["modalCard__list-label"]}>Original Title</p>
            <p className={css["modalCard__list-value"]}>
              {movie.original_title}
            </p>
          </li>

          <li className={css["modalCard__list-item"]}>
            <p className={css["modalCard__list-label"]}>Genre</p>
            <p className={css["modalCard__list-value"]}>
              {movie.genre_ids.map((id) => genres[id]).join(", ")}

            </p>
          </li>
        </ul>

        <h3 className={css["modalCard__description-heading"]}>About</h3>
        <p className={css["modalCard__description"]}>{movie.overview}</p>
      </div>
    </div>
  );
}
