import { useEffect, useState } from "react";
import { getUpcomingMovies } from "../../API";

import Carousel from "../Carousel/Carousel.jsx";
import css from "../TrandingMoviesList/TrandingMoviesList.module.scss";
export default function MoviesList() {
  //   const [isError, setError] = useState(false);
  //   const [isLoading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // setLoading(true);
        const data = await getUpcomingMovies();
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
          <div className={css.trend__title}>Upcoming this month</div>
          {/* {isLoading && <Loader />} */}
          {/* {isError && <ErrorMessage />} */}
          {movies.length > 0 && <Carousel movies={movies} info="upcoming" />}
        </div>
      </div>
    </div>
  );
}
