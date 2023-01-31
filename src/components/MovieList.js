import React, { useState, useEffect, useCallback } from 'react';
import defaultApi from '../api/defaultApi';
import { useLocation } from 'react-router-dom';
import { movieSupercode } from '../assets/default/defaultArray';
import MovieCard from './MovieCard';
import '../styles/components/MovieList.css';
import noResult from '../assets/img/no-result.png';

const MovieList = () => {
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(parseInt(localStorage.getItem('page')) || 1);
   const location = useLocation();
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      localStorage.setItem('page', page);
   }, [page]);

   useEffect(() => {
      if (location.pathname === '/home' || location.pathname.startsWith('/list')) {
         setPage(1);
      }
   }, [location]);

   //Lädt die Filme bei Seitenaufruf (Standart Liste Populär)
   const loadMovies = useCallback(async () => {
      const result = await defaultApi.getMoviesPopular(page);
      setMovies(result.data.results);
      setTotalPages(result.data.total_pages);
   }, [page]);

   // Suchanfrage standard an die API von TMDB
   // const searchMovies = useCallback(async () => {
   //    const query = new URLSearchParams(location.search).get('search');
   //    const result = await defaultApi.searchMovies(query, page);
   //    setMovies(result.data.results);
   // }, [location.search, page]);

   // Suchanfrage Suchanfrage standard an die API von TMDB und als zusätzliche Suchanfrage nach Supercode
   const searchMovies = useCallback(async () => {
      const query = new URLSearchParams(location.search).get('search');

      // Supercode für die Suche nach den Supercode-Mitgliedern (Freddy, Julia, Steffen) zusätzlich eingebaut
      if (query === 'wo ist freddy?') {
         const filteredMovies = movieSupercode.filter((supercode) => supercode.name === 'Freddy');
         setMovies(filteredMovies);
      } else if (query === 'was macht julia?') {
         const filteredMovies = movieSupercode.filter((supercode) => supercode.name === 'Julia');
         setMovies(filteredMovies);
      } else if (query === 'was ist mit steffen?') {
         const filteredMovies = movieSupercode.filter((supercode) => supercode.name === 'Steffen');
         setMovies(filteredMovies);
      } else {
         // Standard-Suche nach TMDB API
         const result = await defaultApi.searchMovies(query, page);
         setMovies(result.data.results);
         setTotalPages(result.data.total_pages);
      }
   }, [location.search, page]);

   //Lädt die Filme nach Genre
   const loadMoviesByGenre = useCallback(async () => {
      const genre = new URLSearchParams(location.search).get('genre');
      const genreObject = await defaultApi.getGenres().then((res) => res.data.genres.find((g) => g.name.toLowerCase() === genre));
      if (genreObject) {
         const result = await defaultApi.getMoviesByGenre(genreObject.id, page);
         setMovies(result.data.results.filter((movie) => movie.genre_ids[0] === genreObject.id));
         setTotalPages(result.data.total_pages);
      }
   }, [location.search, page]);

   useEffect(() => {
      const query = new URLSearchParams(location.search).get('search');
      const genre = new URLSearchParams(location.search).get('genre');
      if (query) {
         searchMovies();
      } else if (genre) {
         loadMoviesByGenre();
      } else {
         loadMovies();
      }
   }, [searchMovies, loadMovies, loadMoviesByGenre, location.search, page]);

   const handleLoadMoreClick = () => {
      setPage(page + 1);
      document.querySelector('.movie-list-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
   };

   return (
      <div className='movielist-container'>
         {searchMovies && movies.length === 0 ? (
            <div className='no-result'>
               <img src={noResult} alt='' />
            </div>
         ) : (
            <>
               <div className='movie-list'>
                  <p className='movie-list-page'>
                     Page: {page} / {totalPages}
                  </p>
                  {movies.map((movie) => (
                     <div className='movie-card-container' key={movie.id}>
                        <MovieCard movie={movie} />
                     </div>
                  ))}

                  <div className='load-more-btn-container'>
                     <button className='load-more-btn' onClick={handleLoadMoreClick}>
                        Load More
                     </button>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};
export default MovieList;
