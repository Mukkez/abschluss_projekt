import React, { useState } from 'react';
import homered from '../assets/img/home-red.png';
import homegrey from '../assets/img/home-grey.png';
import bookmark from '../assets/img/bookmark.png';
import download from '../assets/img/download.png';
import account from '../assets/img/account.png';
import '../styles/components/Footer.css';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
   const [currentPath, setCurrentPath] = useState('');
   let location = useLocation();
   React.useEffect(() => {
      setCurrentPath(location.pathname);
   }, [location]);
   return (
      <div className='footer-container'>
         <div className='footer-icon-container'>
            <Link to='/home'>
               <img className='footer-icon' src={currentPath === '/home' ? homered : homegrey} alt='Home' />
            </Link>
            <Link to='/bookmarks'>
               <img className='footer-icon' src={bookmark} alt='Favorites' />
            </Link>
            <Link to='/download'>
               <img className='footer-icon' src={download} alt='Download' />
            </Link>
            <Link to='/login'>
               <img className='footer-icon' src={account} alt='Account' />
            </Link>
         </div>
      </div>
   );
};

export default Footer;
