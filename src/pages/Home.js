import React, { useState } from 'react';
import Search from '../components/MovieSearch';
import MovieGenre from '../components/MovieGenre';
import MovieCarousel from '../components/MovieCarousel';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/Home.css';

const Home = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();
   const handleSearch = (event) => {
      event.preventDefault();
      navigate(`/genres?search=${searchQuery}`);
   };
   return (
      <div className='home-container'>
         <h1 className='welcome-text'>Welcome!</h1>
         <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
         <MovieGenre />
         <div className='trending-movies-container'>
            <p className='trending-movies-heading'>Trending Movies</p>
            <Link to='/genres' className='see-all-link'>
               See All
            </Link>
         </div>
         <MovieCarousel />
         <Footer />
      </div>
   );
};

export default Home;
