import React, { useState, useEffect } from 'react';
import defaultApi from '../api/defaultApi';
import { useParams } from 'react-router-dom';
import '../styles/pages/MovieTrailer.css';

const MovieTrailer = () => {
   const { id } = useParams();

   const [trailer, setTrailer] = useState(null);

   useEffect(() => {
      getTrailer(id);
   }, [id]);

   const getTrailer = async (id) => {
      const result = await defaultApi.getMovieTrailer(id);
      if (result.data.results && result.data.results.length > 0) {
         setTrailer(result.data.results[0]);
      } else {
         setTrailer(result.data);
      }
   };

   return (
      <div className='movie-trailer-container'>
         {trailer ? (
            <>
               <iframe title={`Trailer for ${trailer.name}`} width='360' height='640' src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&playsinline=1`} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
            </>
         ) : (
            <p>Loading trailer...</p>
         )}
      </div>
   );
};
export default MovieTrailer;
