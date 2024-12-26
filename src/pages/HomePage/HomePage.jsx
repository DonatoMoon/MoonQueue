// import Catalog from "../../components/Catalog/Catalog";
import MoviesCatalog from "../../components/MoviesCatalog/MoviesCatalog";
// import Pagination from "../../components/Pagination/Pagination";
import TrandingMoviesList from "../../components/TrandingMoviesList/TrandingMoviesList";
import UpcomingMoviesList from "../../components/UpcomingMoviesList/UpcomingMoviesList";
import css from "./HomePage.module.scss";
export default function HomePage() {
  return (
    <div className={css.home}>
      <TrandingMoviesList />
      <hr />
      <MoviesCatalog />
      <hr />
      <UpcomingMoviesList />
    </div>
  );
}
