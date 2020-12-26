import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorities] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d9da52de`;

    const response = await fetch(url);
    const responseJson = await response.json();
    
    if(responseJson.Search) {
      setMovies(responseJson.Search);
    }
  }

  useEffect(() => {
    getMovieRequest();
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('movie-app-favorites')
    );

    if (movieFavorites) {
      setFavorities(movieFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-app-favorites', JSON.stringify(items));
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorities(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      favorite => favorite.imdbID !== movie.imdbID
    );

    setFavorities(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex aling-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          handleFavoritiesClick={addFavoriteMovie}
          favoriteComponent={AddFavorites}/>
      </div>
      <div className='row d-flex aling-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favorites' />
      </div>
      <div className='row'>
        <MovieList 
          movies={favorites} 
          handleFavoritiesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites}/>
      </div>
    </div>
  );
}

export default App;
