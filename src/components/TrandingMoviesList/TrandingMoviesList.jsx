import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../API";

import css from "./TrandingMoviesList.module.scss";
import Carousel from "../Carousel/Carousel.jsx";
export default function MoviesList() {
  //   const [isError, setError] = useState(false);
  //   const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // setLoading(true);
        const data = await getTrendingMovies();
        // console.log(data);
        setMovies(data.results);
      } catch (error) {
        // setError(true);
      } finally {
        // setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={css.background}>
      <div className={"container"}>
        <div className={css.trend}>
          <div className={css.trend__title}>Trending today</div>
          {/* {isLoading && <Loader />} */}
          {/* {isError && <ErrorMessage />} */}
          {movies.length > 0 && <Carousel movies={movies} />}
        </div>
      </div>
    </div>
  );
}
