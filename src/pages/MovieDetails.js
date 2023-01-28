import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages/MovieDetails.css';
import { Link } from 'react-router-dom';

import defaultApi from '../api/defaultApi';
import Footer from '../components/Footer';

import back from '../assets/img/back.png';
import star from '../assets/img/polygon.png';

const MovieDetails = () => {
   // Hole den id-Parameter aus der URL
   const { id } = useParams();

   // State für das Movie-Objekt
   const [movie, setMovie] = useState(null);

   // State für die Anzeige der vollständigen Übersicht
   const [showFullOverview, setShowFullOverview] = useState(false);

   // State für das formatierte Datum der Veröffentlichung
   const [formattedDate, setFormattedDate] = useState('');

   // useEffect Hook für das Laden des Movies
   // Wird aufgerufen, wenn sich die ID in der URL ändert
   useEffect(() => {
      getMovie(id);
   }, [id]);

   // Funktion, um das Movie anhand der ID zu laden
   const getMovie = async (id) => {
      const result = await defaultApi.getMovieDetails(id);
      setMovie(result.data);
      console.log(result.data);
   };

   // useEffect Hook für das Setzen des Paddings des Text-Containers
   // Wird aufgerufen, wenn sich das movie-Objekt ändert
   useEffect(() => {
      // Wenn das movie-Objekt noch nicht geladen ist, abbrechen
      if (!movie) return;
      // Hinzufügen von 100px Padding am unteren Rand des Containers
      const textContainer = document.querySelector('.movie-details-text-container');
      textContainer.style.paddingBottom = '100px';
   }, [movie]);

   // useEffect Hook für das Formatieren des Veröffentlichungsdatums
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

   return (
      <div className='movie-details-container'>
         {movie ? (
            <>
               {/* Anzeige des Posters und der Details des Films */}
               <div className='movie-details-text-container'>
                  <div className='movie-poster-container'>
                     <div className='movie-details-container-poster-header'>
                        {/* Zurück-Button */}
                        <img src={back} alt='Zurück' onClick={() => window.history.back()} className='back-button' />
                        <p>Movie Details</p>
                     </div>
                     {/* Anzeige des Posters */}
                     <img className='movie-details-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                     <div className='movie-details-container-poster-info'>
                        {/* Anzeige des Titels, Erscheinungsdatums und der Dauer */}
                        <h1 className='movie-details-title'>{movie.title}</h1>
                        <p className='movie-details-year'>{formattedDate ? formattedDate : 'N/A'}</p>
                        <p className='bull'>•</p>
                        <p className='movie-details-duration'>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A'}</p>
                        {/* Anzeige der Bewertung */}
                        <div className='movie-details-rating-container'>
                           <img className='star' src={star} alt='star' />
                           <p className='movie-details-rating'>{movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : 'N/A'}</p>
                        </div>
                     </div>
                  </div>
                  {/* Anzeige der Informationen zum Film */}
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
                     {/* Anzeige von Genres, Budget, Einnahmen und Original-Sprache */}
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
                           {movie.original_language ? `${movie.spoken_languages[0].english_name}` : 'N/A'}
                        </p>
                     </div>
                     <Link to={`/trailer/${movie.id}`}>
                        <button className='watch-trailer-btn'>Watch Trailer</button>
                     </Link>
                  </div>
               </div>
            </>
         ) : (
            <p>Loading movie details...</p>
         )}
         <Footer />
      </div>
   );
};

export default MovieDetails;
