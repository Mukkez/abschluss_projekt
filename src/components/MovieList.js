import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { movieSupercode } from '../assets/default/defaultArray';
import defaultApi from '../api/defaultApi';
import MovieCard from './MovieCard';
import SearchBar from './MovieSearch';
import MovieGenre from './MovieGenre';
import '../styles/components/MovieList.css';

// Hier wird eine Funktion erstellt, die den MovieList-Abschnitt darstellt.
const MovieList = () => {
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [genreId, setGenreId] = useState(null);
   const [activeGenre, setActiveGenre] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');
   const location = useLocation();

   const loadMovies = useCallback(async () => {
      let result;

      // Hier wird die Suchabfrage überprüft und die Ergebnisse werden gefiltert.
      if (searchQuery === 'wo ist freddy?') {
         const filteredMovies = movieSupercode.filter((supercode) => supercode.name === 'Freddy');
         setMovies(filteredMovies);
         console.log(filteredMovies);
      } else if (searchQuery === 'was macht julia?') {
         const filteredMovies = movieSupercode.filter((supercode) => supercode.name === 'Julia');
         setMovies(filteredMovies);
         console.log(filteredMovies);
      } else if (searchQuery === 'was ist mit steffen?') {
         const filteredMovies = movieSupercode.filter((supercode) => supercode.name === 'Steffen');
         setMovies(filteredMovies);
         console.log(filteredMovies);
      } else if (searchQuery) {
         result = await defaultApi.searchMovies(searchQuery, page);
         setMovies(result.data.results);
         setHasMore(false);
      } else if (genreId) {
         result = await defaultApi.getMoviesByGenre(genreId, page);
         setMovies([...movies, ...result.data.results.filter((movie) => movie.genre_ids[0] === genreId)]);
      } else {
         result = await defaultApi.getMovies(page);
         setMovies([...movies, ...result.data.results]);
         console.log([...movies, ...result.data.results]);
      }
      setPage(page + 1);
      if (result.data.results.length === 0) {
         setHasMore(false);
      }
   }, [genreId, searchQuery, page, movies]);

   // Zustand für die Ladeanzeige.
   const [loaded, setLoaded] = useState(false);

   // Anzeigen eines Genres definiert.
   const handleGenreClick = useCallback((genreId) => {
      setPage(1);
      setMovies([]);
      setHasMore(true);
      setSearchQuery('');
      setGenreId(genreId);
      setActiveGenre(genreId);
      setLoaded(false);
   }, []);

   // Anzeigen weiterer Filme definiert.
   const handleLoadMoreClick = useCallback(() => {
      if (hasMore) {
         setPage(page + 1);
         loadMovies();
         setHasMore(true);
         setLoaded(false);
      }
   }, [hasMore, page, loadMovies]);

   // Funktion zur Suche nach Filmen definiert.
   const handleSearch = useCallback((searchQuery) => {
      setPage(1);
      setMovies([]);
      setHasMore(true);
      setSearchQuery(searchQuery);
      setGenreId(null);
      setLoaded(false);
   }, []);

   // Effect verwendet, um die Filme zu laden.
   useEffect(() => {
      if (!loaded) {
         loadMovies();
         setLoaded(true);
      }
   }, [loaded, genreId, searchQuery, loadMovies]);

   // Die Suchabfrage aus der URL abzurufen.
   useEffect(() => {
      const searchValueFromUrl = new URLSearchParams(location.search).get('search');
      if (searchValueFromUrl) {
         setSearchQuery(searchValueFromUrl);
      }
   }, [location.search]);

   // ein Effect verwenden, um die Style-Eigenschaften des "Load More"-Buttons nach 2000ms zu ändern.
   useEffect(() => {
      if (movies.length) {
         const textContainer = document.querySelector('.load-more-btn');
         textContainer.style.margin = '40px 0 120px 0';
      }
   }, [movies]);

   return (
      <div className='movielist-contrainer'>
         <SearchBar onSearch={handleSearch} />
         <MovieGenre onGenreClick={handleGenreClick} activeGenre={activeGenre} />
         <div className='movie-list'>
            {movies.map((movie) => (
               <div className='movie-card-container' key={movie.id}>
                  <MovieCard movie={movie} />
               </div>
            ))}
         </div>
         <div className='load-more-btn-container'>
            <button className='load-more-btn' onClick={handleLoadMoreClick}>
               Load More
            </button>
         </div>
      </div>
   );
};
export default MovieList;
