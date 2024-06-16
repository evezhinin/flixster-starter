
import React, {useState, useEffect}from "react";
import MovieCard from "../MovieCard/MovieCard";
import './MovieList.css'


const MovieList = () => {
    const [movies, setMovies] = useState([]);
    

    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    useEffect(() => {
        async function fetchMovies(){
            try{
                const response = await fetch(url);
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies();
    }, [url]);

    return(
        <div className="movie-list">
            {movies.map(movie => (
                <MovieCard
                key={movie.id}
                title={movie.title}
                posterImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                />
            ))}

        </div>
    
    );
};

export default MovieList;