import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSearchForm } from "../../API"; // Використовуємо API для пошуку
import MovieList from "../../components/MovieList/MovieList";
import Pagination from "../../components/Pagination/Pagination";
import css from "./RecommendationPage.module.scss";
import {
    selectCurrentPage,
    selectNameFilter,
} from "../../redux/filters/selectors";
import { setTotalPages } from "../../redux/filters/slice";
import { useDispatch } from "react-redux";

export default function RecommendationPage() {
    const dispatch = useDispatch();

    // Стан для рекомендацій
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    // Селектори для пагінації та пошуку
    const query = useSelector(selectNameFilter);
    const page = useSelector(selectCurrentPage);

    const watchedMovies = useSelector((state) => state.movies.watched);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!watchedMovies.length) return;

            try {
                // Отримання жанрів із переглянутих фільмів
                const genreFrequency = {};
                watchedMovies.forEach((movie) =>
                    movie.genre_ids.forEach((genre) => {
                        genreFrequency[genre] = (genreFrequency[genre] || 0) + 1;
                    })
                );

                // Вибираємо два найпопулярніших жанри
                const sortedGenres = Object.entries(genreFrequency)
                    .sort(([, freqA], [, freqB]) => freqB - freqA)
                    .map(([genre]) => parseInt(genre))
                    .slice(0, 2);

                // Якщо жанри відсутні, нічого не робимо
                if (!sortedGenres.length) return;

                // Робимо пошук фільмів за жанрами та запитом
                const response = await getSearchForm(page, query, sortedGenres.join(","), "", "popularity.desc", "");
                setRecommendedMovies(response.results);

                // Оновлюємо загальну кількість сторінок
                dispatch(setTotalPages(response.total_pages));
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, [query, page, watchedMovies, dispatch]);

    return (
        <div className={css.recommendation}>
            <div className="container">
                <h1>Recommended for You</h1>
                {recommendedMovies.length > 0 ? (
                    <>
                        <MovieList movies={recommendedMovies} info={"catalog"} />
                        <Pagination />
                    </>
                ) : (
                    <p>No recommendations available. Try watching more movies!</p>
                )}
            </div>
        </div>
    );
}
