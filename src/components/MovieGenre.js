import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import defaultApi from '../api/defaultApi';
import '../styles/components/MovieGenre.css';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MovieGenre = ({ onGenreClick }) => {
   const location = useLocation();

   const [activeGenreId, setActiveGenreId] = useState(null);

   const [genres, setGenres] = useState([]);

   useEffect(() => {
      if (location.pathname === '/genres') {
         const genreName = location.search.split('=')[1];
         const genre = genres.find((g) => g.name.toLowerCase() === genreName);
         if (genre) {
            setActiveGenreId(genre.id);
         }
      }
   }, [location, genres]);

   useEffect(() => {
      async function fetchData() {
         const response = await defaultApi.getGenres();
         setGenres(response.data.genres);
      }
      fetchData();
   }, []);

   const settings = {
      dots: false,
      infinite: true,
      edgeFriction: 0.1,
      arrows: true,
      centerMode: true,
      centerPadding: '0px',
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
   };

   return (
      <div className='movie-genre-container'>
         <Slider {...settings}>
            {genres.map((genre, index) => (
               <Link key={index} to={{ pathname: '/genres', search: `?name=${genre.name.toLowerCase()}` }}>
                  <button
                     key={genre.id}
                     className={`btn ${activeGenreId === genre.id ? 'active' : ''}`}
                     onClick={() => {
                        setActiveGenreId(genre.id);
                        onGenreClick(genre.id);
                     }}
                  >
                     {genre.name}
                  </button>
               </Link>
            ))}
         </Slider>
      </div>
   );
};

export default MovieGenre;
