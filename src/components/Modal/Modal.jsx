import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, selectedMovie }) => {
  if (!show || !selectedMovie) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button onClick={onClose}>Close</button>
        </div>
        <div className="modal-body">
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            style={{ width: "60%" }}
          />
          <h3>Release Date: {selectedMovie.release_date}</h3>
          <p>{selectedMovie.overview}</p>
          {selectedMovie.genres && (
            <h3>Genres: {selectedMovie.genres.map((genre) => genre.name).join(", ")}</h3>
          )}
          <h3>Runtime: {selectedMovie.runtime} minutes</h3>
          {selectedMovie.trailers && selectedMovie.trailers.length > 0 && (
            <div className="trailers">
              <h3>Trailers:</h3>
              {selectedMovie.trailers.map((trailer) => (
                <div key={trailer.key} className="trailer">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Trailer ${trailer.name}`}
                    style={{width:'100%', height:"300px"}}
                  ></iframe>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;