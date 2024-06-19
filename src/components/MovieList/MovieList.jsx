import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import FilterDropdown from "../FilterDropDown/FilterDropDown";
import Modal from "../Modal/Modal";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNowPlaying, setShowNowPlaying] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [searchBarInput, setSearchBarInput]= useState('');
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3";
  const nowPlayingUrl = `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`;
  const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
  const movieDetailUrl = (movieId) => `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
  const genreUrl = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;
  

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const url = showNowPlaying ? nowPlayingUrl : searchUrl;
        const response = await fetch(url);
        const data = await response.json();
        if (showNowPlaying) {
          setMovies((prevMovies) => {
            const newMovies = data.results.filter(
              (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
            );
            return [...prevMovies, ...newMovies];
          });
        } else {
          setSearchResults((prevMovies) => {
            const newMovies = data.results.filter(
              (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
            );
            return [...prevMovies, ...newMovies];
          });
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();


    async function fetchGenres() {
      try {
        const response = await fetch(genreUrl);
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchGenres();
  
  }, [nowPlayingUrl, searchUrl, showNowPlaying, page, genreUrl]);

  const handleSearchChange = () => {
    setSearchQuery(searchBarInput);
    setPage(1);
    setSearchResults([]);
  };

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleMovieCardClick = async (movie) => {
    setSelectedMovie(movie); // Set selected movie when clicking on a MovieCard
    try {
      const response = await fetch(movieDetailUrl(movie.id));
      const data = await response.json();
      setSelectedMovie((prevSelectedMovie) => ({
        ...prevSelectedMovie,
        genres: data.genres,
        runtime: data.runtime,
      }));

      const videosUrl = `${baseUrl}/movie/${movie.id}/videos?api_key=${apiKey}`;
      const responseVideos = await fetch(videosUrl);
      const dataVideos = await responseVideos.json();
      const trailers = dataVideos.results.filter((video) => video.type === "Trailer"
      );
      setSelectedMovie((prevSelectedMovie) => ({
        ...prevSelectedMovie,
       trailers: trailers.length > 0 ? trailers.slice(0, 1) : [],
      }));
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleGenreFilterChange = async (genreId) => {
    setLoading(true);
    try {
      let url;
      if (genreId) {
        url = `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;
      } else {
        url = showNowPlaying ? nowPlayingUrl : searchUrl;
      }
      const response = await fetch(url);
      const data = await response.json();
      if (showNowPlaying) {
        setMovies(data.results);
      } else {
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Error fetching filtered movies:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="movie-list">
        <div className="toggle-buttons">
          <button onClick={() => setShowNowPlaying(true)} disabled={showNowPlaying}>
            Now Playing
          </button>
          <button  onClick={() => setShowNowPlaying(false)} disabled={!showNowPlaying}>
            Search
          </button>
          <FilterDropdown genres={genres} onFilterChange={handleGenreFilterChange} />
        </div>

        {!showNowPlaying && (
          <div className="search-bar">
            <input
              type="text"
              value={searchBarInput}
              onChange={(e) => setSearchBarInput(e.target.value)}
              placeholder="Search"
            />
            <button onClick={handleSearchChange}>Search</button>
          </div>
        )}
         

        <div className="movies">
          {showNowPlaying
            ? movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                  onClick={() => handleMovieCardClick(movie)}
                />
              ))
            : searchResults.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  posterImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                  onClick={() => handleMovieCardClick(movie)}
                />
              ))}
        </div>

        {!showNowPlaying && (
          <div className="load-more">
            <button onClick={loadMoreMovies} >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {selectedMovie && (
          <Modal show={selectedMovie !== null} onClose={() => setSelectedMovie(null)} selectedMovie={selectedMovie} />
        )}

        {showNowPlaying && (
        <div className="load-more">
          <button onClick={loadMoreMovies} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      </div>
    </>
  );
};

export default MovieList;

