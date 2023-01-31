import React, { useState, useEffect } from 'react';
import defaultApi from '../api/defaultApi';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/pages/MovieTrailer.css';

const MovieTrailer = () => {
   const { id } = useParams();

   const [trailer, setTrailer] = useState(null);

   //
   useEffect(() => {
      getTrailer(id);
   }, [id]);

   // Gibt den Trailer zurück aus der API mit dem movie key als Parameter
   const getTrailer = async (id) => {
      const result = await defaultApi.getMovieTrailer(id);
      if (result.data.results && result.data.results.length > 0) {
         setTrailer(result.data.results[0]);
      } else {
         setTrailer(result.data);
      }
   };

   // Hier wird die URL überprüft und wenn die URL den Trailer enthält, wird der Trailer gedreht
   const location = useLocation();

   useEffect(() => {
      const url = location.pathname;
      const iframe = document.querySelector('.container');

      if (url.includes('/trailer/watch')) {
         iframe.classList.add('rotate');
      }
   }, [location]);

   return (
      <div className='movie-trailer-container'>
         {trailer ? (
            <>
               {/* Hier wird der Trailer angezeigt mit dem key aus der API von youtube im iframe */}
               <iframe title={`Trailer for ${trailer.name}`} width='429px' height='928px' src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&playsinline=0&controls=0&fs=1`} allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
            </>
         ) : (
            <p>Loading trailer...</p>
         )}
      </div>
   );
};
export default MovieTrailer;
