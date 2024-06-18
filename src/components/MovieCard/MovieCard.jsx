
import React from "react";
import './MovieCard.css';

const MovieCard = ({title, posterImg, rating, id, onClick}) => {
    return(
        <div className="movie-card" onClick={onClick}>
            <img src={posterImg} alt={`${title} poster`}/>
            <h2>{title}</h2>
            <p>Rating: {rating}</p>
        </div>
    );
};
export default MovieCard;
