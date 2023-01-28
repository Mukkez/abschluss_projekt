import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import defaultApi from '../api/defaultApi';
import Footer from '../components/Footer';
import '../styles/pages/MovieBookmarks.css';

const MovieBookmarks = () => {
   const [movieBackground, setMovieBackground] = useState('');

   useEffect(() => {
      defaultApi.getRandomMovie().then((url) => {
         setMovieBackground(url);
         //console.log(url);
      });
   }, []);
   return (
      <div className='movie-bookmarks-container' style={{ backgroundImage: `url(${movieBackground})` }}>
         <div className='movie-bookmarks-box'>
            <p>Entdecke die Welt Deiner Lieblingsfilme</p>
            <p>Melde Dich jetzt an, um Deine persönliche Filmauswahl zu verwalten.</p>
            <Link to='/login'>
               <button className='movie-bookmarks-login-btn'>Login</button>
            </Link>
         </div>
         <Footer />
      </div>
   );
};

export default MovieBookmarks;
