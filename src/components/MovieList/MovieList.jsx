
// import React, { useState, useEffect } from "react";
// import MovieCard from "../MovieCard/MovieCard";
// import Modal from "../Modal/Modal";
// import "./MovieList.css";

// const MovieList = () => {
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [showNowPlaying, setShowNowPlaying] = useState(true);
//   const [selectedMovie, setSelectedMovie] = useState(null);


//   const apiKey = import.meta.env.VITE_API_KEY;
//   const baseUrl = "https://api.themoviedb.org/3";
//   const nowPlayingUrl = `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`;
//   const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
//   const movieDetailUrl = (movieId) => `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;

//   useEffect(() => {
//     async function fetchMovies() {
//       setLoading(true);
//       try {
//         const url = showNowPlaying ? nowPlayingUrl : searchUrl;
//         const response = await fetch(url);
//         const data = await response.json();
//         if (showNowPlaying) {
//           setMovies((prevMovies) => {
//             const newMovies = data.results.filter(
//               (newMovie) => !prevMovies.some((movie) => movie.id === newMovie.id)
//             );
//             return [...prevMovies, ...newMovies];
//           });
//         } else {
//           setSearchResults(data.results);
//         }
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchMovies();
//   }, [nowPlayingUrl, searchUrl, showNowPlaying, page]);

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearch = () => {
//     setMovies([]);
//     setPage(1);
//     setShowNowPlaying(false);
//   };

//   const clearSearch = () => {
//     setSearchResults([]);
//     setSearchQuery("");
//     setShowNowPlaying(true);
//   };

//   const loadMoreMovies = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const handleMovieCardClick = (movie) => {
//     setSelectedMovie(movie); // Set selected movie when clicking on a MovieCard
//   };

//   return (
//     <>
//     <div className="movie-list">
//       <div className="toggle-buttons">
//         <button onClick={() => setShowNowPlaying(true)} disabled={showNowPlaying}>
//           Now Playing
//         </button>
//         <button onClick={() => setShowNowPlaying(false)} disabled={!showNowPlaying}>
//           Search
//         </button>
//       </div>

//       {!showNowPlaying && (
//         <div className="search-bar">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             placeholder="Search"
//           />
//           {/* <button onClick={handleSearch}>Search</button> */}
//         </div>
//       )}

//       <div className="movies">
//         {showNowPlaying
//           ? movies.map((movie) => (
//               <MovieCard
//                 key={movie.id}
//                 title={movie.title}
//                 posterImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 rating={movie.vote_average}
//                 onClick={()=> handleMovieCardClick(movie)}
//               />
//             ))
//           : searchResults.map((movie) => (
//               <MovieCard
//                 key={movie.id}
//                 title={movie.title}
//                 posterImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 rating={movie.vote_average}
//                 onClick={()=> handleMovieCardClick(movie)}
//               />
//             ))}
//       </div>

//       {!showNowPlaying && (
//         <div className="load-more">
//           <button onClick={loadMoreMovies} disabled={loading}>
//             {loading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}


//       {selectedMovie &&(
//         <Modal
//         show={selectedMovie !== null}
//         onClose={() => setSelectedMovie(null)}
//         >
//         <h2>{selectedMovie.title}</h2>
//         <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
//         alt={selectedMovie.title}
//         style={{width:"60%"}}/>
//         <p>Release Date: {selectedMovie.release_date}</p>
//         <p>Overview: {selectedMovie.overview}</p>
//         {/* <p>Genre:{selectedMovie?.genres.map((genre) => genre.name).join(", ")}</p> */}
//         {/* <p>Genres:{genres.map(genre => genre.name).join(',')}</p> */}
//         <p>Runtime: {selectedMovie.run_time} minutes</p>

//         </Modal>
//       )}
//       {showNowPlaying && (
//         <div className="load-more">
//           <button onClick={loadMoreMovies} disabled={loading}>
//             {loading ? "Loading..." : "Load More"}
//           </button>
//         </div>
//       )}
//       {/* {!showNowPlaying && (
//         <button onClick={clearSearch}>Back to Now Playing</button>
//       )} */}
//     </div>
//     </>
//   );
// };

// export default MovieList;


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
 



  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3";
  const nowPlayingUrl = `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`;
  const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
  const movieDetailUrl = (movieId) => `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
  const genreUrl = `${baseUrl}/genre/movie/list?api_key=${apiKey}`;

  useEffect(() => {
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
  }, [genreUrl]);


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
          setSearchResults(data.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [nowPlayingUrl, searchUrl, showNowPlaying, page]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setMovies([]);
    setPage(1);
    setShowNowPlaying(false);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchQuery("");
    setShowNowPlaying(true);
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
          <button onClick={() => setShowNowPlaying(false)} disabled={!showNowPlaying}>
            Search
          </button>
        </div>

        {!showNowPlaying && (
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
            />
            {/* <button onClick={handleSearch}>Search</button> */}
          </div>
        )}

         <FilterDropdown genres={genres} onFilterChange={handleGenreFilterChange} />

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
            <button onClick={loadMoreMovies} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {selectedMovie && (
          <Modal show={selectedMovie !== null} onClose={() => setSelectedMovie(null)}>
            <h2>{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              style={{ width: "60%" }}
            />
            <p>Release Date: {selectedMovie.release_date}</p>
            <p>Overview: {selectedMovie.overview}</p>
            {selectedMovie.genres && (
              <p>Genres: {selectedMovie.genres.map((genre) => genre.name).join(", ")}</p>
            )}
            <p>Runtime: {selectedMovie.runtime} minutes</p>
          </Modal>
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
