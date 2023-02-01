import React, { useState } from 'react';

import SearchBar from '../components/MovieSearch';
import MovieGenre from '../components/MovieGenre';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';
import '../styles/pages/GenresSearch.css';

const Genres_Search = () => {
   const [activeGenre, setActiveGenre] = useState(null);
   const [searchValue, setSearchValue] = useState('');

   const handleGenreClick = (genreId) => {
      setActiveGenre(genreId);
   };

   const handleSearchValue = (value) => {
      setSearchValue(value);
   };

   const [movies] = useState([]);

   return (
      <div className='genresSerach-contrainer'>
         <SearchBar onSearch={handleSearchValue} />
         <MovieGenre onGenreClick={handleGenreClick} />
         <MovieList movies={movies} />
         <Footer />
         <p>{activeGenre}</p>
         <p>{searchValue}</p>
      </div>
   );
};

export default Genres_Search;
