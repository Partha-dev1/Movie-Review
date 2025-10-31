import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './Header.css';

const baseURL = "https://api.themoviedb.org/3/";
const API_KEY = "cc7891d11b217a255e8ad9f8ffb6ed83";

const Header = ({ url }) => {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`${baseURL}${url}`);
      const results = response.data.results;
      const random = Math.floor(Math.random() * results.length);
      setMovies([results[random]]);
    };

    if (url) fetchMovies();
  }, [url]);

  // Fetch trailer on Play click
  const handlePlay = async (movieId) => {
    try {
      const res = await axios.get(`${baseURL}movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer?.key || null);
    } catch (err) {
      console.error("Error fetching trailer:", err);
      setTrailerKey(null);
    }
  };

  const closeTrailer = () => setTrailerKey(null);

  return (
    <div>
      {movies.map((item) => (
        <div
          key={item.id}
          className='header-container'
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.backdrop_path})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '600px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <h1 className='title'>{item.original_title}</h1>
          <p className='overview'>{item.overview}</p>
          <div className='buttons'>
            <button onClick={() => handlePlay(item.id)}>Play</button>
          </div>
        </div>
      ))}

      {/* Trailer Modal */}
      {trailerKey && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeTrailer}>X</button>
            <YouTube
              videoId={trailerKey}
              className="trailer-iframe"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 1,  
                  controls: 1,
                  modestbranding: 1,
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
