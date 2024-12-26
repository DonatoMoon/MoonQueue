import axios from "axios";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "30da0ae8ce19ff0019a87a2e60d710f1";

const options = {
  headers: {
    Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGRhMGFlOGNlMTlmZjAwMTlhODdhMmU2MGQ3MTBmMSIsInN1YiI6IjY1ZDhlNTBlNDJmMTlmMDE2MzE5ZDMyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Yd-6bmHkQ9Q3U1Ips1Ok0-P7UF-PhPSzPL5CBgt03Xs",
  },
};

// export const getPopularMovies = async () => {
//   const url = "/movie/popular?language=uk-UA&page=1";
//   const response = await axios.get(url, options);
//   return response.data;
// };

export const getTrendingMovies = async () => {
  const url = "trending/movie/day?language=uk-UA";
  const response = await axios.get(url, options);
  return response.data;
};

export const getUpcomingMovies = async () => {
  const url = `/movie/upcoming?api_key=${API_KEY}&region=US&language=uk-UA&page=1`;
  const response = await axios.get(url, options);
  return response.data;
};

/**************/

export const getSearchMovie = async (query, page) => {
  const { data } = await axios.get(
      `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`
  );
  return data;
};

export const getSearchForm = async (
    page = 1,
    query = "",
    genre = "",
    year = "",
    sort = "",
    author = ""
) => {
  try {
    let discoverUrl = `/discover/movie?api_key=${API_KEY}&language=uk-UA&page=${page}`;
    let searchUrl = `/search/movie?api_key=${API_KEY}&language=uk-UA&page=${page}&query=${query}`;

    // Якщо задано автора, спочатку шукаємо автора
    if (author) {
      const authorResponse = await axios.get(
          `/search/person?api_key=${API_KEY}&query=${author}&language=uk-UA&page=1`,
          options
      );

      if (authorResponse.data.results.length === 0) {
        toast.error("Автор не знайдений за вказаним ім'ям");
        return getPopularMovies(page); // Повертаємо популярні фільми
      }

      const authorId = authorResponse.data.results[0].id;
      const authorMoviesResponse = await axios.get(
          `/person/${authorId}/movie_credits?api_key=${API_KEY}&language=uk-UA`,
          options
      );

      if (authorMoviesResponse.data.cast.length === 0) {
        toast.error("Фільми для вказаного автора не знайдено");
        return getPopularMovies(page); // Повертаємо популярні фільми
      }

      let authorMovies = authorMoviesResponse.data.cast;

      // Фільтруємо фільми за додатковими параметрами
      if (genre !== "start" && genre !== "") {
        authorMovies = authorMovies.filter((movie) =>
            movie.genre_ids.includes(parseInt(genre))
        );
      }
      if (year !== "" && year !== "start") {
        authorMovies = authorMovies.filter(
            (movie) =>
                new Date(movie.release_date).getFullYear() === parseInt(year)
        );
      }
      if (sort !== "" && sort !== "start") {
        if (sort.includes(".desc")) {
          authorMovies.sort(
              (a, b) => b[sort.split(".")[0]] - a[sort.split(".")[0]]
          );
        } else {
          authorMovies.sort(
              (a, b) => a[sort.split(".")[0]] - b[sort.split(".")[0]]
          );
        }
      }

      // Фільтрація по назві фільму, якщо query не порожній
      if (query !== "") {
        authorMovies = authorMovies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (authorMovies.length === 0) {
        toast.error("Фільми для вказаного фільтра не знайдено");
        return getPopularMovies(page); // Повертаємо популярні фільми
      }

      // Повертаємо лише перші 20 результатів для пагінації
      return {
        results: authorMovies.slice(0, 20),
        total_pages: Math.ceil(authorMovies.length / 20),
        total_results: authorMovies.length,
      };
    }

    // Якщо не задано жодного параметру, повертаємо популярні фільми
    if (!query && !genre && !year && !sort) {
      return getPopularMovies(page);
    }

    // Якщо задано параметри пошуку, використовуємо відповідні запити
    if (query) {
      // Збираємо параметри запиту
      const queryString = [
        genre && `with_genres=${genre}`,
        year && `primary_release_year=${year}`,
        sort && `sort_by=${sort}`,
      ]
          .filter(Boolean)
          .join("&");

      const searchResponse = await axios.get(
          `${searchUrl}&${queryString}`,
          options
      );

      if (searchResponse.data.results.length === 0) {
        toast.error("Фільми для вказаного фільтра не знайдено");
        return getPopularMovies(page); // Повертаємо популярні фільми
      }

      return searchResponse.data;
    }

    const discoverResponse = await axios.get(
        `${discoverUrl}${genre ? `&with_genres=${genre}` : ""}${
            year ? `&primary_release_year=${year}` : ""
        }${sort ? `&sort_by=${sort}` : ""}`,
        options
    );

    if (discoverResponse.data.results.length === 0) {
      toast.error("Фільми для вказаного фільтра не знайдено");
      return getPopularMovies(page); // Повертаємо популярні фільми
    }

    return discoverResponse.data;
  } catch (error) {
    console.error("Error fetching data", error);
    toast.error("Не вдалося отримати дані з API");
    return { results: [], total_pages: 0, total_results: 0 };
  }
};

export const getPopularMovies = async (page) => {
  const popularResponse = await axios.get(
      `/movie/popular?api_key=${API_KEY}&language=uk-UA&page=${page}`,
      options
  );

  return popularResponse.data;
};

export const getAuthors = async (query) => {
  const url = `/search/person?api_key=${API_KEY}&query=${query}&language=uk-UA`;
  const response = await axios.get(url, options);
  return response.data.results;
};
// export const getSearchForm = async (
//   page = "",
//   query = "",
//   genre = "",
//   year = "",
//   sort = "",
//   author = ""
// ) => {
//   let f = {
//     year:
//       year !== "" && year !== "start" ? `&primary_release_year=${year}` : "",
//     genre: genre !== "" && genre !== "start" ? `&with_genres=${genre}` : "",
//     queryFetch: `&query=${query}`,
//     sort: sort !== "" && sort !== "start" ? `&sort_by=${sort}` : "",
//     discover: `/trending`,
//     week: `/week`,
//   };

//   if (query === "") {
//     f.queryFetch = "";
//   }
//   if (query !== "" && genre === "") {
//     f.discover = "/search";
//     f.week = "";
//   }
//   if (query === "" && genre !== "") {
//     f.discover = "/discover";
//     f.week = "";
//   }
//   if (query === "" && year !== "") {
//     f.discover = "/discover";
//     f.week = "";
//   }

//   try {
//     if (author) {
//       const authorResponse = await axios.get(
//         `/search/person?api_key=${API_KEY}&query=${author}&page=${page}&language=uk-UA`,
//         options
//       );

//       if (authorResponse.data.results.length === 0) {
//         toast.error("No author found for the specified name");
//         return { results: [], total_pages: 0, total_results: 0 };
//       }

//       const authorId = authorResponse.data.results[0].id;
//       const data = await axios.get(
//         `/person/${authorId}/movie_credits?api_key=${API_KEY}&language=uk-UA`,
//         options
//       );

//       if (data.data.cast.length === 0) {
//         toast.error("No movies found for the specified author");
//         return { results: [], total_pages: 0, total_results: 0 };
//       }

//       return {
//         results: data.data.cast,
//         total_pages: 1,
//         total_results: data.data.cast.length,
//       };
//     } else {
//       const { data } = await axios.get(
//         `${f.discover}/movie${f.week}?api_key=${API_KEY}${f.genre}${f.year}${f.sort}&language=uk-UA${f.queryFetch}&page=${page}`,
//         options
//       );

//       if (data.results.length === 0) {
//         toast.error("No movies found for the specified filters");
//       }

//       return data;
//     }
//   } catch (error) {
//     console.error("Error fetching data", error);
//     toast.error("Failed to fetch data from API");
//   }
// };

// export const getAuthors = async (query) => {
//   const url = `/search/person?api_key=${API_KEY}&query=${query}&language=uk-UA`;
//   const response = await axios.get(url, options);
//   return response.data.results;
// };
// export const getSearchForm = async (
//   page = "",
//   query = "",
//   genre = "",
//   year = "",
//   sort = ""
// ) => {
//   let f = {
//     year:
//       year !== "" && year !== "start" ? `&primary_release_year=${year}` : "",
//     genre: genre !== "" && genre !== "start" ? `&with_genres=${genre}` : "",
//     queryFetch: `&query=${query}`,
//     sort: sort !== "" && sort !== "start" ? `&sort_by=${sort}` : "",
//     discover: `/trending`,
//     week: `/week`,
//   };

//   if (query === "") {
//     f.queryFetch = "";
//   }
//   if (query !== "" && genre === "") {
//     f.discover = "/search";
//     f.week = "";
//   }
//   if (query === "" && genre !== "") {
//     f.discover = "/discover";
//     f.week = "";
//   }
//   if (query === "" && year !== "") {
//     f.discover = "/discover";
//     f.week = "";
//   }

//   try {
//     let { data } = await axios.get(
//       `${f.discover}/movie${f.week}?api_key=${API_KEY}${f.genre}${f.year}${f.sort}&language=uk-UA${f.queryFetch}&page=${page}`
//     );

//     if (data.results.length === 0) {
//       // toast.error("No movies found for the specified year");
//     }

//     return data;
//   } catch (error) {
//     console.error("Error fetching data", error);
//     // toast.error("Failed to fetch data from API");
//   }
// };

/*******************************************************************************/

// export const getMovieSearch = async (moviesFilter) => {
//   const url = `/search/movie?query=${moviesFilter}&include_adult=false&language=en-US&page=1`;
//   const response = await axios.get(url, options);
//   return response.data.results;
// };

export const getMovieSearch = async (moviesFilter, page) => {
  const url = `/search/movie?query=${moviesFilter}&include_adult=false&language=en-US&page=${page}`;
  const response = await axios.get(url, options);
  return response.data.results;
};

export const getDetails = async (movieId) => {
  const url = `/movie/${movieId}?language=uk-UA`;
  const response = await axios.get(url, options);
  return response.data;
};

// export const getCast = async (movieId) => {
//   const url = `/movie/${movieId}/credits?language=en-US`;
//   const response = await axios.get(url, options);
//   return response.data.cast;
// };

// export const getReviews = async (movieId) => {
//   const url = `/movie/${movieId}/reviews?language=en-US&page=1`;
//   const response = await axios.get(url, options);
//   return response.data.results;
// };

export const getTrailer = async (movieId) => {
  const url = `/movie/${movieId}/videos?api_key=${API_KEY}&language=uk-UA`;

  try {
    let response = await axios.get(url, options);

    if (response.data.results.length === 0) {
      const fallbackUrl = `/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`;
      response = await axios.get(fallbackUrl, options);
    }

    // console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch trailer", error);
    throw error;
  }
};

/**************************** */

// export const getPopularMovies = async () => {
//   try {
//     const response = await axios.get(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=uk-UA`
//     );
//     return response.data.results;
//   } catch (error) {
//     console.error("Error fetching popular movies", error);
//     throw error;
//   }
// };

// // Функція для фільтрації українських фільмів
// const filterUkrainianMovies = async () => {
//   const popularMovies = await getPopularMovies();
//   const ukrainianMovies = popularMovies.filter((movie) =>
//     movie.production_countries.some((country) => country.iso_3166_1 === "UA")
//   );
//   return ukrainianMovies;
// };

// // Виклик функції для отримання українських фільмів
// filterUkrainianMovies()
//   .then((movies) => {
//     console.log("Ukrainian Movies:", movies);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
export const getRecommendationsByGenres = async (genres) => {
  try {
    const genreQuery = genres.join(',');
    const response = await axios.get(
        `/discover/movie?api_key=${API_KEY}&language=uk-UA&with_genres=${genreQuery}&sort_by=popularity.desc`,
        options
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

