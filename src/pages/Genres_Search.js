import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const Genres_Search = () => {
   const [movies, setMovies] = useState([]);

   return (
      <div>
         <MovieList movies={movies} />
      </div>
   );
};

export default Genres_Search;
