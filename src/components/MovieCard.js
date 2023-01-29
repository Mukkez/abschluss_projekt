import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import defaultApi from '../api/defaultApi';
import defaultImage from '../assets/img/no_img.jpg';
import star from '../assets/img/polygon.png';
import bookmark from '../assets/img/bookmark.png';
import '../styles/components/MovieCard.css';

import freddy from '../assets/img/freddy.png';

const MovieCard = ({ movie }) => {
   const [genres, setGenres] = useState([]);
   const [runtime, setRuntime] = useState(null);

   useEffect(() => {
      if (movie.genre_ids.length > 0) {
         getGenres();
      }
      if (movie.id) {
         getRuntime();
      }
   }, [movie]);

   const getGenres = async () => {
      const result = await defaultApi.getGenres();
      setGenres(result.data.genres);
   };

   const getRuntime = async () => {
      const result = await defaultApi.getMovieDetails(movie.id);
      setRuntime(convertRuntime(result.data.runtime));
   };

   const convertRuntime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
   };

   let poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
   if (!movie.poster_path) {
      poster = defaultImage;
   } else if (movie.poster_path === 'freddy') {
      poster = freddy;
   }

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const handlePosterClick = () => {
      setModalIsOpen(true);
   };

   const handleContainerClick = () => {
      window.location.href = `/movies/${movie.id}`;
   };

   const genreFirst = genres.find((genre) => genre.id === movie.genre_ids[0]);

   return (
      <div className='movie-card'>
         <div>
            <img className='movie-card-poster' src={poster} alt={movie.title} onClick={handlePosterClick} />
            <ReactModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} className='modal'>
               <img src={poster} alt={movie.title} />
               <button onClick={() => setModalIsOpen(false)}>Close</button>
            </ReactModal>
         </div>
         <div className='movie-card-container' onClick={handleContainerClick}>
            <div className='movie-card-container-grid'>
               <div className='movie-card-titel'>
                  <p>{movie.title}</p>
               </div>
               <div className='movie-card-text'>
                  <img className='star' src={star} alt='star' />
                  <p>{movie.vote_average}</p>
                  <img className='bookmark' src={bookmark} alt={movie.title} />
               </div>
               <div className='movie-card-jgt'>
                  <p>{movie.release_date ? `${movie.release_date.slice(0, 4)}` : 'N/A'}</p>
                  <p className='bull'>&bull;</p>
                  {genreFirst && <p>{genreFirst.name}</p>}

                  <p className='bull'>&bull;</p>
                  <p>{runtime}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MovieCard;
