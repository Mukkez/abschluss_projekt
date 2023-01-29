import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import Footer from '../components/Footer';

const Genres_Search = () => {
   const [movies] = useState([]);

   return (
      <div>
         <MovieList movies={movies} />
         <Footer />
      </div>
   );
};

export default Genres_Search;
