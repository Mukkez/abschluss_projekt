import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/SplashScreen.css';
import popcorn from '../assets/img/popcorn.gif';

const SplashScreen = () => {
   const navigate = useNavigate();
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      if (intervalStarted) {
         const interval = setInterval(() => {
            setProgress((prevProgress) => {
               if (prevProgress === 100) {
                  clearInterval(interval);
                  navigate('/intro');
                  return prevProgress;
               }
               return prevProgress + 20;
            });
         }, 300);
      }
   }, [intervalStarted, navigate]);

   return (
      <div className='splash-screen-container'>
         <img src={popcorn} alt='Animated logo' className='splash-screen-logo' />
         <div className='splash-screen-text'>
            <p>.MOV</p>
            <p>Loading...</p>
         </div>
         <div className='splash-screen-progress-bar'>
            <div className='splash-screen-progress' style={{ width: `${progress}%` }}></div>
         </div>
      </div>
   );
};

export default SplashScreen;
