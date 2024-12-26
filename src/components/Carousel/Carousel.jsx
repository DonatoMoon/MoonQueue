import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from './Carousel.module.scss';
import ModalFilm from '../ModalFilm/ModalFilm';
import ModalTrailer from '../ModalTrailer/ModalTrailer';
import { getTrailer } from '../../API';
import toast from 'react-hot-toast';
import ModalPortal from '../ModalMortal/ModalPortal'; // імпортуємо ModalPortal

export default function Carousel({ movies, info }) {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 819,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
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
            const video = videos.find((video) => video.type === 'Trailer');
            if (video) {
                setTrailerKey(video.key);
            } else {
                toast.error('Trailer not found');
            }
        } catch (error) {
            toast.error('Failed to fetch trailer');
            console.error('Failed to fetch trailer', error);
        }
    };

    const closeTrailer = () => {
        setTrailerKey(null);
    };

    useEffect(() => {
        if (selectedMovie || trailerKey) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [selectedMovie, trailerKey]);

    const getNeighboringMovies = (index) => {
        const prevMovie = index > 0 ? movies[index - 1] : movies[movies.length - 1];
        const nextMovie = index < movies.length - 1 ? movies[index + 1] : movies[0];
        return { prevMovie, nextMovie };
    };

    return (
        <>
            <div className={css.carousel}>
                <Slider {...settings}>
                    {movies.map(({ original_title, id, poster_path, release_date, genre_ids, vote_average }, index) => (
                        <div
                            key={id}
                            className={css.slide}
                            onClick={() =>
                                openModal(
                                    {
                                        original_title,
                                        poster_path,
                                        release_date,
                                        genre_ids,
                                        vote_average,
                                    },
                                    index
                                )
                            }
                        >
                            <img
                                src={
                                    poster_path
                                        ? `https://image.tmdb.org/t/p/w200/${poster_path}`
                                        : `https://i.ibb.co/GPMFHG6/keep-calm-poster-not-found-1.png`
                                }
                                alt={original_title}
                                className={css.img}
                                width={200}
                                height={300}
                            />
                            <div className={css.info}>
                                {info === "upcoming" && (
                                    <p>
                                        <h2>{original_title}</h2>
                                        {release_date}
                                    </p>
                                )}
                                {info === "catalog" && (
                                    <p>
                                        {genre_ids.join(', ')} | {release_date.substring(0, 4)}

                                    </p>
                                )}
                                {info !== "upcoming" && (
                                    <span className={css.rate}>{vote_average.toFixed(1)}</span>
                                )}

                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            {selectedMovie && (
                <ModalPortal>
                    <ModalFilm
                        movie={selectedMovie}
                        neighbors={getNeighboringMovies(currentMovieIndex)}
                        onClose={closeModal}
                        onOpen={openModal}
                        currentIndex={currentMovieIndex}
                        moviesLength={movies.length}
                    />
                </ModalPortal>
            )}
            {trailerKey && (
                <ModalPortal>
                    <ModalTrailer videoKey={trailerKey} onClose={closeTrailer} />
                </ModalPortal>
            )}
        </>
    );
}
