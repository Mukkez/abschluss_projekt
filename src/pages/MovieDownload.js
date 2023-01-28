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
            <p>Lade Deine Lieblingsfilme herunter und verwalte sie in Deiner persönlichen Filmauswahl</p>
            <p>Melde Dich jetzt an, um Zugriff zu erhalten.</p>
            <Link to='/login'>
               <button className='movie-download-login-btn'>Login</button>
            </Link>
         </div>
         <Footer />
      </div>
   );
};

export default MovieDownload;
