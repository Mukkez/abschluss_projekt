import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import defaultApi from '../api/defaultApi';
import defaultImage from '../assets/img/no_img.jpg';
import star from '../assets/img/polygon.png';
import bookmark from '../assets/img/bookmark.png';
import '../styles/components/MovieCard.css';

import julia from '../assets/img/julia.png';
import freddy from '../assets/img/freddy.png';
import steffen from '../assets/img/steffen.jpg';

import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
   // State für Genres und Laufzeit
   const [genres, setGenres] = useState([]);
   const [runtime, setRuntime] = useState([]);

   // Funktion um Genres von der API zu holen
   const fetchGenres = async () => {
      const result = await defaultApi.getGenres();
      setGenres(result.data.genres);
   };

   // useEffect um die beiden obigen Funktionen beim Laden der Komponente aufzurufen
   useEffect(() => {
      if (movie.id) {
         fetchGenres();
      }
   }, [movie.id]);

   // Funktion um Filmeänge von der API zu holen + Julia, Freddy und Steffen zusatzlich
   const fetchRuntime = async () => {
      if (movie.name === 'Julia' || movie.name === 'Freddy' || movie.name === 'Steffen') {
         setRuntime(convertRuntime(movie.runtime));
      } else {
         const result = await defaultApi.getMovieDetails(movie.id);
         setRuntime(convertRuntime(result.data.runtime));
      }
   };
   fetchRuntime();

   // Funktion um Minuten in Stunden und Minuten umzuwandeln
   const convertRuntime = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}min`;
   };

   // falls kein Poster vorhanden ist, wird Default Bild geladen + Julia, Freddy und Steffen zusatzlich und defaultImage
   let poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
   if (!movie.poster_path) {
      poster = defaultImage;
   } else if (movie.poster_path === 'julia') {
      poster = julia;
   } else if (movie.poster_path === 'freddy') {
      poster = freddy;
   } else if (movie.poster_path === 'steffen') {
      poster = steffen;
   }

   // State für Modal popup von Poster
   const [modalIsOpen, setModalIsOpen] = useState(false);

   // Funktion um Modal zu öffnen und zu schließen - Poster
   const handlePosterClick = () => {
      setModalIsOpen(true);
   };

   // erstes Genre des Films, filter ob es das Genre gibt und dann das erste Genre damit der Genrefilter richtig funktioniert
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
         <div className='movie-card-container'>
            <Link className='movie-card-link' to={`/list/movie/${movie.id}`}>
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
            </Link>
         </div>
      </div>
   );
};

export default MovieCard;
