import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import IntroApp from './pages/IntroApp';
import Home from './pages/Home';
import Genres_Search from './pages/Genres_Search';
import MovieDetails from './pages/MovieDetails';
import MovieTrailer from './pages/MovieTrailer';
import MovieBookmarks from './pages/MovieBookmarks';
import MovieDownload from './pages/MovieDownload';
import MovieLogin from './pages/MovieLogin';
import Wrapper from './Wrapper';
import Slider from './components/MovieGenre';
import './App.css';

function App() {
   return (
      <Wrapper>
         <BrowserRouter>
            <Routes>
               <Route exact path='/' element={<SplashScreen />} />
               <Route path='/intro' element={<IntroApp />} />
               <Route path='/home' element={<Home />} />
               <Route path='/genres' element={<Genres_Search />} />
               <Route path='/movies/:id' element={<MovieDetails />} />
               <Route path='/trailer/:id' element={<MovieTrailer />} />
               <Route path='/bookmarks' element={<MovieBookmarks />} />
               <Route path='/login' element={<MovieLogin />} />
               <Route path='/download' element={<MovieDownload />} />
               <Route path='/slider' element={<Slider />} />
            </Routes>
         </BrowserRouter>
      </Wrapper>
   );
}

export default App;
