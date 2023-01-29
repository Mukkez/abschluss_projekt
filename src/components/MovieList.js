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
      loadMovies();
   }, [genreId, searchQuery]);

   useEffect(() => {
      const searchValueFromUrl = new URLSearchParams(location.search).get('search');
      if (searchValueFromUrl) {
         setSearchQuery(searchValueFromUrl);
      }
   }, [location.search]);

   const myMovieArray = [
      {
         adult: false,
         backdrop_path: null,
         genre_ids: [10751],
         id: 946584,
         original_language: 'en',
         original_title: 'Freddy der Supercoder von Supercode',
         overview: "Marvel and DC's War on God: The Antichrist Agenda is part 1 in a 7-part series exposing how popular comics, movies, and TV shows are riddled with anti-Christ themes glorifying violence, sexual perversion, blasphemy, and the occult.",
         popularity: 3.958,
         poster_path: 'freddy',
         release_date: '2023-03-04',
         title: 'Freddy der Supercoder von Supercode',
         video: false,
         vote_average: 100,
         vote_count: 1,
      },
   ];

   const loadMovies = async () => {
      let result;
      if (searchQuery === 'wo ist freddy?') {
         setMovies(myMovieArray);
         console.log(myMovieArray);
      } else if (searchQuery) {
         console.log(searchQuery);
         result = await defaultApi.searchMovies(searchQuery, page);
         setMovies(result.data.results);
         console.log(result.data.results);
         setHasMore(false);
      } else if (genreId) {
         result = await defaultApi.getMoviesByGenre(genreId, page);
         setMovies([...movies, ...result.data.results.filter((movie) => movie.genre_ids[0] === genreId)]);
      } else {
         result = await defaultApi.getMovies(page);
         setMovies([...movies, ...result.data.results]);
      }
      setPage(page + 1);
      if (result.data.results.length === 0) {
         setHasMore(false);
      }
   };

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
         setPage(page + 1);
         loadMovies();
         setHasMore(true);
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
