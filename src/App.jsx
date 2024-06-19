import React from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


const App = () => {
  return(
    <div className="App">
    <Header/>
    <MovieList/>
    <Footer/>
  </div>
  )
}

export default App
