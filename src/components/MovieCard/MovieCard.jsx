import React from "react";
import './MovieCard.css';

const MovieCard = ({title, posterImg, rating}) => {
    return(
        <div className="movie-card">
            <img src={posterImg} alt={`${title} poster`}/>
            <h2>{title}</h2>
            <p>Rating: {rating}</p>
        </div>
    );
};
export default MovieCard;
