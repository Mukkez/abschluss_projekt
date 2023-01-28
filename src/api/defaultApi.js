import axios from 'axios';

const API_KEY = '2bc9d58fea3bc765e9dd7b1a51de29eb';
const API_URL = 'https://api.themoviedb.org/3'; // Grundgerüst / Übersichtlichkeit

export default {
   // Movies abfrage (popular/trendingMovies)
   getMovies: (page) => {
      return axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en&page=${page}`);
   },
   // Movies abfrage (top_rated)
   getAllMovies: (page) => {
      return axios.get(`${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en&page=${page}`);
   },
   // MovieDetails abfrage (all)
   getMovieDetails: (movieId) => {
      return axios.get(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en`);
   },
   // Movie abfrage (single)
   getMovie: (movieId) => {
      return axios.get(`{API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en`);
   },
   // Genres abfrage (all)
   getGenres: () => {
      return axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en`);
   },
   // Genres abfrage (Movies)
   getMoviesByGenre: (genreId, page) => {
      return axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=en&with_genres=${genreId}&page=${page}`);
   },

   // evenutell Bonus
   // // Credits abfrage (Movies)
   // getCredits: (movieId) => {
   //    return axios.get(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
   // },

   // Search abfrage (Movies)
   searchMovies: (query, page) => {
      return axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en&page=${page}`);
   },
   // Videos abfrage (Movies)
   getMovieTrailer: (movieId) => {
      return axios.get(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en`);
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

// Axios ist eine JavaScript-Bibliothek, die es ermöglicht, asynchrone HTTP-Anfragen von einem Browser oder von einer Node.js-Anwendung aus zu senden. Es kann verwendet werden, um Daten von einem Server abzurufen oder dorthin zu senden, und es unterstützt die Verwendung von Promises. In React, kann Axios verwendet werden, um asynchrone Anfragen an einen Server innerhalb von Komponenten-Funktionen durchzuführen.
