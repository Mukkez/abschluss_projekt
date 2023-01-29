import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import defaultApi from '../api/defaultApi';

import back from '../assets/img/back.png';
import star from '../assets/img/polygon.png';
import noimg from '../assets/img/no_img.jpg';
import julia from '../assets/img/julia.png';
import freddy from '../assets/img/freddy.png';
import steffen from '../assets/img/steffen.jpg';

import { movieSupercode2 } from '../assets/default/defaultArray2';

import '../styles/pages/MovieDetails.css';
import Footer from '../components/Footer';

const MovieDetails = () => {
   let navigate = useNavigate();

   // Übernahme der ID aus den URL-Parametern
   const { id } = useParams();

   // Zustand für den Film
   const [movie, setMovie] = useState(null);
   // Zustand für den angezeigten Überblick
   const [showFullOverview, setShowFullOverview] = useState(false);
   // Zustand für das formatierte Veröffentlichungsdatum
   const [formattedDate, setFormattedDate] = useState('');

   // Effekt zur Anforderung des Films bei Änderung der ID
   useEffect(() => {
      getMovie(id);
   }, [id]);

   // Funktion zur Anforderung des Films
   const getMovie = async (id) => {
      // Überprüfung, ob einer der hardcodierten Filme verwendet werden soll
      if (id === '55599555') {
         setMovie(movieSupercode2[0]);
      } else if (id === '55588555') {
         setMovie(movieSupercode2[1]);
      } else if (id === '55577555') {
         setMovie(movieSupercode2[2]);
         // Anfrage bei der API für alle anderen IDs
      } else {
         const result = await defaultApi.getMovieDetails(id);
         setMovie(result.data);
      }
   };

   // Effekt zur Änderung des Paddings des Textcontainers bei Verfügbarkeit des Films
   useEffect(() => {
      if (!movie) return;
      const textContainer = document.querySelector('.movie-details-text-container');
      textContainer.style.paddingBottom = '100px';
   }, [movie]);

   // Effekt zur Formatierung des Veröffentlichungsdatums
   useEffect(() => {
      if (movie) {
         setTimeout(() => {
            const date = new Date(movie.release_date);
            const formattedDate = date.toLocaleDateString('de-DE', {
               day: '2-digit',
               month: '2-digit',
               year: 'numeric',
            });
            setFormattedDate(formattedDate);
         }, 20);
      }
   }, [movie]);

   // Effekt zur Anforderung des Trailers
   useEffect(() => {
      getTrailer(id);
   });

   // Zustand für den Trailer
   const [trailer, setTrailer] = useState(null);

   // Funktion zur Anforderung des Trailers
   const getTrailer = async (movie) => {
      const result = await defaultApi.getMovieTrailer(id);
      if (result.data.results && result.data.results.length > 0) {
         setTrailer(result.data.results[0]);
      }
   };
   // Funktion zur Auswahl des Posters
   const choosePoster = ({ movie }) => {
      // lokale Variable zur Speicherung des Posters
      let poster;

      // Überprüfung der ID des Filmes
      // und Setzen des Posters auf Basis der ID
      if (id === '55599555') {
         poster = <img className='movie-details-poster' src={julia} alt='' />;
      } else if (id === '55588555') {
         poster = <img className='movie-details-poster' src={freddy} alt='' />;
      } else if (id === '55577555') {
         poster = <img className='movie-details-poster' src={steffen} alt='' />;
      } else {
         // Überprüfung ob es einen poster_path gibt
         // falls ja, wird das Poster aus der API geladen
         // falls nein, wird ein Platzhalterbild verwendet
         poster = movie.poster_path ? <img className='movie-details-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' /> : <img className='movie-details-poster' src={noimg} alt='' />;
      }

      // Rückgabe des Posters
      return poster;
   };
   return (
      <div className='movie-details-container'>
         {movie ? (
            <>
               <div className='movie-details-text-container'>
                  <div className='movie-poster-container'>
                     <div className='movie-details-container-poster-header'>
                        <img src={back} alt='Zurück' onClick={() => navigate(-1)} className='back-button' />
                        <p>Movie Details</p>
                     </div>
                     {choosePoster({ movie })}

                     <div className='movie-details-container-poster-info'>
                        <h1 className='movie-details-title'>{movie.title ? movie.title : 'N/A'}</h1>
                        <p className='movie-details-year'>{formattedDate ? formattedDate : 'N/A'}</p>
                        <p className='bull'>•</p>
                        <p className='movie-details-duration'>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</p>
                        <div className='movie-details-rating-container'>
                           <img className='star' src={star} alt='star' />
                           <p className='movie-details-rating'>{movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : 'N/A'}</p>
                        </div>
                     </div>
                  </div>
                  <div className='movie-details-container-info'>
                     <div className='movie-details-container-info-box'>
                        <h1>Description</h1>
                        {showFullOverview ? (
                           <p className='movie-details-overview'>{movie.overview}</p>
                        ) : (
                           <>
                              <p className='movie-details-overview'>
                                 {movie.overview.substring(0, 150)}....
                                 <button onClick={() => setShowFullOverview(true)}>See more ...</button>
                              </p>
                           </>
                        )}
                     </div>
                     <div className='movie-details-extra-container'>
                        <p className='movie-details-genres'>
                           <span>Genres</span>
                           {movie.genres.length > 0
                              ? movie.genres
                                   .slice(0, 3)
                                   .map((genre) => genre.name)
                                   .join(', ')
                              : 'N/A'}
                        </p>

                        <p className='movie-details-language'>
                           <span>Budget</span>
                           {movie.budget ? `${movie.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} $` : 'N/A'}
                        </p>
                        <p className='movie-details-language'>
                           <span>Revenue</span> {movie.revenue ? `${movie.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} $` : 'N/A'}
                        </p>
                        <p className='movie-details-language'>
                           <span>Original Language</span>
                           {movie.spoken_languages.length > 0 ? `${movie.spoken_languages[0].english_name}` : 'N/A'}
                        </p>
                     </div>
                     {trailer && (
                        <Link to={`/list/movie/${movie.id}/trailer/watch?v=${movie.id}`}>
                           <button className='watch-trailer-btn'>Watch Trailer</button>
                        </Link>
                     )}
                  </div>
               </div>
            </>
         ) : (
            <p className='movie-details-loading'>Loading movie details...</p>
         )}
         <Footer />
      </div>
   );
};

export default MovieDetails;
