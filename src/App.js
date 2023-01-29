import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import IntroApp from './pages/IntroApp';
import Home from './pages/Home';
import GenresSearch from './pages/Genres_Search';
import MovieDetails from './pages/MovieDetails';
import MovieTrailer from './pages/MovieTrailer';
import MovieBookmarks from './pages/MovieBookmarks';
import MovieDownload from './pages/MovieDownload';
import MovieLogin from './pages/MovieLogin';
import Wrapper from './Wrapper';
import './App.css';

function App() {
   return (
      <Wrapper>
         <BrowserRouter>
            <Routes>
               <Route exact path='/' element={<SplashScreen />} />
               <Route path='/intro' element={<IntroApp />} />
               <Route path='/home' element={<Home />} />
               <Route path='/list' element={<GenresSearch />} />
               <Route path='/list/movie/:id' element={<MovieDetails />} />
               <Route path='/trailer/:id' element={<MovieTrailer />} />
               <Route path='/bookmarks' element={<MovieBookmarks />} />
               <Route path='/login' element={<MovieLogin />} />
               <Route path='/download' element={<MovieDownload />} />
            </Routes>
         </BrowserRouter>
      </Wrapper>
   );
}

export default App;
