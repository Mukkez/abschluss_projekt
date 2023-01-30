import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import defaultApi from '../api/defaultApi';
import '../styles/components/MovieCarousel.css';
import polygon from '../assets/img/polygon.png';
import { useNavigate } from 'react-router-dom';

function MovieCarousel() {
   const [movies, setMovies] = useState([]);
   const navigate = useNavigate();

   //API Call für die Filme im Carousel (Top 5) - wird nur einmal ausgeführt
   useEffect(() => {
      defaultApi
         .getMovies(1)
         .then((response) => {
            setMovies(response.data.results.slice(0, 5));
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   //Slick Slider Einstellungen
   const settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      initialSlide: 0,
      centerMode: true,
      centerPadding: '0px',
   };

   const handleClick = (movieId) => {
      navigate(`/list/movie/${movieId}`);
   };

   return (
      <div className='movie-carousel-container'>
         <Slider {...settings}>
            {movies.map((movie) => (
               <div className='movie-carousel-slide' key={movie.id} onClick={() => handleClick(movie.id)}>
                  <div className='movie-carousel-slide-overlay'>
                     <img src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`} alt='' />
                     <div className='movie-carousel-slide-text'>
                        <p>{movie.title} </p>
                        <p>
                           <img src={polygon} alt='' />
                           {movie.vote_average} / 10
                        </p>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
   );
}

export default MovieCarousel;
