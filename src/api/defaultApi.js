import axios from 'axios';

const API_KEY = '2bc9d58fea3bc765e9dd7b1a51de29eb';
const API_URL = 'https://api.themoviedb.org/3'; // Grundgerüst / Übersichtlichkeit

const moviesAPI = {
   // Movies abfrage (popular/trendingMovies)
   getMoviesPopular: (page) => {
      return axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en&page=${page}&include_adult=false`);
   },
   // Movies abfrage (top_rated)
   getAllMovies: (page) => {
      return axios.get(`${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en&page=${page}&include_adult=false`);
   },
   // MovieDetails abfrage (all)
   getMovieDetails: (movieId) => {
      return axios.get(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en&include_adult=false`);
   },
   // Movie abfrage (single)
   getMovie: (movieId) => {
      return axios.get(`{API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en&include_adult=false`);
   },
   // Genres abfrage (all)
   getGenres: () => {
      return axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en&include_adult=false`);
   },
   // Genres abfrage (Movies)
   getMoviesByGenre: (genreId, page) => {
      return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=en&with_genres=${genreId}&page=${page}&include_adult=false`);
   },
   // Search abfrage (Movies)
   searchMovies: (query, page) => {
      return axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en&page=${page}&include_adult=true`);
      // return axios.get(`${API_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${page}&page=1&include_adult=false`);
   },
   // Videos abfrage (Movies)
   getMovieTrailer: (movieId) => {
      return axios.get(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en&include_adult=false`);
   },
   // Random Movie abfrage (Movies - Popular) - für den Background
   getRandomMovie: async () => {
      try {
         const res = await axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}`);
         const movies = res.data.results;
         const randomMovie = movies[Math.floor(Math.random() * movies.length)];
         return `https://image.tmdb.org/t/p/original${randomMovie.poster_path}`;
      } catch (error) {
         console.log(error);
      }
   },
};
export default moviesAPI;
