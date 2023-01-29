import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/pages/MovieDetails.css';
import { Link } from 'react-router-dom';

import defaultApi from '../api/defaultApi';
import Footer from '../components/Footer';

import back from '../assets/img/back.png';
import star from '../assets/img/polygon.png';
import noimg from '../assets/img/no_img.jpg';

const MovieDetails = () => {
   const { id } = useParams();
   const [movie, setMovie] = useState(null);
   const [showFullOverview, setShowFullOverview] = useState(false);
   const [formattedDate, setFormattedDate] = useState('');

   useEffect(() => {
      getMovie(id);
   }, [id]);

   const getMovie = async (id) => {
      const result = await defaultApi.getMovieDetails(id);
      setMovie(result.data);
      // console.log(result.data);
   };

   useEffect(() => {
      if (!movie) return;
      const textContainer = document.querySelector('.movie-details-text-container');
      textContainer.style.paddingBottom = '100px';
   }, [movie]);

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

   useEffect(() => {
      getTrailer(id);
   });

   const [trailer, setTrailer] = useState(null);

   const getTrailer = async (movie) => {
      const result = await defaultApi.getMovieTrailer(id);
      if (result.data.results && result.data.results.length > 0) {
         setTrailer(result.data.results[0]);
      }
   };

   return (
      <div className='movie-details-container'>
         {movie ? (
            <>
               <div className='movie-details-text-container'>
                  <div className='movie-poster-container'>
                     <div className='movie-details-container-poster-header'>
                        <img src={back} alt='Zurück' onClick={() => window.history.back()} className='back-button' />
                        <p>Movie Details</p>
                     </div>
                     {movie.poster_path ? <img className='movie-details-poster' src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='' /> : <img className='movie-details-poster' src={noimg} alt='' />}
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
