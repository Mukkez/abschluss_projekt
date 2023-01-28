import React, { useState, useEffect } from 'react';
import defaultApi from '../api/defaultApi';
import MovieCard from './MovieCard';
import SearchBar from './MovieSearch';
import MovieGenre from './MovieGenre';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import '../styles/components/MovieList.css';

const MovieList = () => {
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [genreId, setGenreId] = useState(null);
   const [activeGenre, setActiveGenre] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');
   const location = useLocation();

   useEffect(() => {
      const searchValueFromUrl = new URLSearchParams(location.search).get('search');
      if (searchValueFromUrl) {
         setSearchQuery(searchValueFromUrl);
      }
   }, [location.search]);

   const loadMovies = async () => {
      let result;
      if (searchQuery) {
         result = await defaultApi.searchMovies(searchQuery, page);
         setMovies(result.data.results);
         setHasMore(false);
      } else if (genreId) {
         let modifiedGenreId = genreId.replace('&name', '');
         result = await defaultApi.getMoviesByGenre(modifiedGenreId, page);
         setMovies([...movies, ...result.data.results.filter((movie) => movie.genre_ids[0] === modifiedGenreId)]);
      } else {
         result = await defaultApi.getMovies(page);
         setMovies([...movies, ...result.data.results]);
      }
      setPage(page + 1);
      if (result.data.results.length === 0) {
         setHasMore(false);
      }
   };

   // useEffect(() => {
   //    loadMovies();
   // }, [genreId, searchQuery]);

   // show Genre
   const handleGenreClick = (genreId) => {
      setPage(1);
      setMovies([]);
      setHasMore(true);
      setSearchQuery('');
      setGenreId(genreId);
      setActiveGenre(genreId);
   };
   // show More
   const handleLoadMoreClick = async () => {
      if (hasMore) {
         loadMovies();
      }
   };

   const handleSearch = async (searchQuery) => {
      setPage(1);
      setMovies([]);
      setHasMore(true);
      setSearchQuery(searchQuery);
      setGenreId(null);
   };

   useEffect(() => {
      if (movies.length) {
         setTimeout(() => {
            const textContainer = document.querySelector('.load-more-btn');
            textContainer.style.margin = '40px 0 120px 0';
         }, 2000);
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
         <Footer />
      </div>
   );
};
export default MovieList;
