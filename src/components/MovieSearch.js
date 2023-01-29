import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/MovieSearch.css';

const SearchBar = ({ onSearch }) => {
   const [searchValue, setSearchValue] = useState('');
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      navigate(`/list?search=${encodeURIComponent(searchValue)}`);
      onSearch(searchValue);
   };

   return (
      <form onSubmit={handleSubmit}>
         <div className='search-container'>
            <input className='search' type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search Movie, ...' />

            <div className='search-icon'></div>
         </div>
      </form>
   );
};

export default SearchBar;
