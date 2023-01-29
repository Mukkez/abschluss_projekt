import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultApi from '../api/defaultApi';
import Footer from '../components/Footer';
import '../styles/pages/MovieDownload.css';

const MovieDownload = () => {
   // State für das Hintergrundbild
   const [movieBackground, setMovieBackground] = useState('');

   // useEffect-Hook, um ein zufälliges Hintergrundbild beim Laden der Seite zu laden
   useEffect(() => {
      defaultApi.getRandomMovie().then((url) => {
         setMovieBackground(url);
      });
   }, []);
   return (
      // Container-Div mit dem Hintergrundbild
      <div className='movie-download-container' style={{ backgroundImage: `url(${movieBackground})` }}>
         <div className='movie-download-box'>
            <p>
               Download your favorite <br />
               films and manage
               <br />
               your filmography
            </p>
            <p>Sign up now to get access</p>
            <Link to='/login'>
               <button className='movie-download-login-btn'>Login</button>
            </Link>
         </div>
         <Footer />
      </div>
   );
};

export default MovieDownload;
