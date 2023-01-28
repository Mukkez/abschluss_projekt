import React from 'react';
import { useNavigate } from 'react-router-dom';
import img0 from '../assets/img/background.png';
import img1 from '../assets/img/img1.png';
import img2 from '../assets/img/img2.png';
import '../styles/pages/IntroApp.css';

const IntroApp = () => {
   const navigate = useNavigate();

   function handleClick() {
      navigate('/home');
   }

   return (
      <div className='intro-app-container'>
         <div className='img-container'>
            <img src={img0} alt='' />
            <img src={img1} alt='' />
            <img src={img2} alt='' />
         </div>
         <div className='text-container'>
            <h1 className='intro-app-header'>Enjoy Your Movie Watch Everywhere</h1>
            <p className='intro-app-text'>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            <button className='intro-app-button' onClick={handleClick}>
               Get Started
            </button>
         </div>
      </div>
   );
};

export default IntroApp;
