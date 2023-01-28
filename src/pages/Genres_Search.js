import React, { useState } from 'react';
import MovieList from '../components/MovieList';

const Genres_Search = () => {
   const [movies] = useState([]);

   return (
      <div>
         <MovieList movies={movies} />
      </div>
   );
};

export default Genres_Search;
