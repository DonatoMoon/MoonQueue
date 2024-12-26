// src/components/MovieList/MovieList.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from "./MovieList.module.scss";
import { genres } from "../../constants/genres";
import ModalFilm from "../ModalFilm/ModalFilm";
import ModalTrailer from "../ModalTrailer/ModalTrailer";
import { getTrailer } from "../../API";
import toast from "react-hot-toast";

const MovieList = ({ movies = [], info }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const getGenreNames = (genreIds) => {
    const genreNames = genreIds.map((id) => genres[id] || "Unknown");
    if (genreNames.length > 2) {
      return `${genreNames.slice(0, 2).join(", ")}...`;
    }
    return genreNames.join(", ");
  };

  const openModal = (movie, index) => {
    setSelectedMovie(movie);
    setCurrentMovieIndex(index);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setCurrentMovieIndex(null);
  };

  const openTrailer = async (id) => {
    try {
      const videos = await getTrailer(id);
      const video = videos.find((video) => video.type === "Trailer");
      if (video) {
        setTrailerKey(video.key);
      } else {
        toast.error("Trailer not found");
      }
    } catch (error) {
      toast.error("Failed to fetch trailer");
      console.error("Failed to fetch trailer", error);
    }
  };

  const closeTrailer = () => {
    setTrailerKey(null);
  };

  useEffect(() => {
    if (selectedMovie || trailerKey) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMovie, trailerKey]);

  const getNeighboringMovies = (index) => {
    const prevMovie = index > 0 ? movies[index - 1] : movies[movies.length - 1];
    const nextMovie = index < movies.length - 1 ? movies[index + 1] : movies[0];
    return { prevMovie, nextMovie };
  };

  return (
    <>
      <div className={css.list}>
        {movies && movies.length > 0 ? (
          movies.map(
            (
              {
                original_title,
                title,
                id,
                poster_path,
                release_date,
                genre_ids,
                vote_average,
                overview,
                vote_count,
                popularity,
                adult,
                backdrop_path,
                original_language,
                video,
              },
              index
            ) => (
              <div
                key={id}
                className={css.item}
                onClick={() =>
                  openModal(
                    {
                      original_title,
                      title,
                      id,
                      poster_path,
                      release_date,
                      genre_ids,
                      vote_average,
                      overview,
                      vote_count,
                      popularity,
                      adult,
                      backdrop_path,
                      original_language,
                      video,
                    },
                    index
                  )
                }
              >
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w400/${poster_path}`
                      : `https://i.ibb.co/GPMFHG6/keep-calm-poster-not-found-1.png`
                  }
                  alt={title}
                  className={css.img}
                  width={300}
                  height={400}
                />
                <div
                  className={css.trailer}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTrailer(id);
                  }}
                >
                  <p>Watch trailer </p>
                  <img
                    height="30px"
                    width="30px"
                    src="https://cdn.icon-icons.com/icons2/1584/PNG/512/3721679-youtube_108064.png"
                    alt="trailer"
                  />
                </div>

                <div className={css.info}>
                  <div className={css.info__title}>
                    {title.length > 25 ? `${title.substring(0, 25)}...` : title}
                  </div>
                  {info === "catalog" && (
                    <div className={css.info__subtitle}>
                      {getGenreNames(genre_ids)} |{" "}
                      {release_date.substring(0, 4)}
                      <span className={css.rate}>{vote_average.toFixed(1)}</span>

                    </div>
                  )}
                </div>
              </div>
            )
          )
        ) : (
          <p>No movies to display</p>
        )}
      </div>
      {selectedMovie && (
        <ModalFilm
          movie={selectedMovie}
          neighbors={getNeighboringMovies(currentMovieIndex)}
          onClose={closeModal}
          onOpen={openModal}
          currentIndex={currentMovieIndex}
          moviesLength={movies.length}
        />
      )}
      {trailerKey && (
        <ModalTrailer videoKey={trailerKey} onClose={closeTrailer} />
      )}
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  info: PropTypes.string,
};

export default MovieList;
