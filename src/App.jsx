import React from 'react';
import { useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard/MovieCard';
import MovieList from './components/MovieList/MovieList';

const App = () => {
  return(
    <div className="App">
    <MovieList/>
  </div>
  )
}

export default App
