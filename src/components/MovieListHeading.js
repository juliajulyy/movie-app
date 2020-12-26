import React from 'react';
import MovieList from './MovieList';

const MovieListHeading = (props) => {
  return (
    <div className='col'>
      <h1>{props.heading}</h1>
    </div>
  )
}

export default MovieListHeading;