import React, { useState } from 'react';

import SearchBar from '../components/MovieSearch';
import MovieGenre from '../components/MovieGenre';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';
import '../styles/pages/GenresSearch.css';

const Genres_Search = () => {
   const [movies] = useState([]);

   return (
      <div className='genresSerach-contrainer'>
         <SearchBar />
         <MovieGenre />
         <MovieList movies={movies} />
         <Footer />
      </div>
   );
};

export default Genres_Search;
