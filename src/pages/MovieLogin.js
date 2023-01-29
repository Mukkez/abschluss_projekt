import React, { useState, useEffect } from 'react';
import defaultApi from '../api/defaultApi';
import Footer from '../components/Footer';
import '../styles/pages/MovieLogin.css';

const MovieLogin = () => {
   // State für den Login-Status, true bedeutet "Eingeloggt", false bedeutet "Nicht eingeloggt"
   const [isLogin, setIsLogin] = useState(true);
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
      <div className='movie-login-container' style={{ backgroundImage: `url(${movieBackground})` }}>
         {/* Wenn isLogin true ist, wird der Login-Teil angezeigt */}
         {isLogin ? (
            <div className='movie-login-box'>
               <h2 className='movie-login-title'>Login</h2>
               <form className='movie-login-form'>
                  <input type='text' placeholder='Username' className='movie-login-input' />
                  <input type='password' placeholder='Password' className='movie-login-input' />
                  <button className='movie-login-submit-btn'>Submit</button>
               </form>
               <p className='movie-login-switch' onClick={() => setIsLogin(false)}>
                  Not registered yet?
               </p>
            </div>
         ) : (
            <div className='movie-register-box'>
               <h2 className='movie-register-title'>Registration</h2>
               <form className='movie-register-form'>
                  <input type='text' placeholder='Username' className='movie-register-input' />
                  <input type='password' placeholder='Password' className='movie-register-input' />
                  <input type='email' placeholder='E-Mail' className='movie-register-input' />
                  <button className='movie-register-submit-btn'>Submit</button>
               </form>
               <p className='movie-register-switch' onClick={() => setIsLogin(true)}>
                  To the Login
               </p>
            </div>
         )}
         <Footer />
      </div>
   );
};

export default MovieLogin;
