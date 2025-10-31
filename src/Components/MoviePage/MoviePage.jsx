import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import "./MoviePage.css"

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "cc7891d11b217a255e8ad9f8ffb6ed83";

const FALLBACK_BACKDROP = "https://via.placeholder.com/1280x720?text=No+Backdrop";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMovie = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
      const data = await res.json();
      setMovie(data);

      // Get trailer video
      const trailerVideo = data.videos?.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(trailerVideo?.key || null);

      // Get cast
      setCast(data.credits?.cast?.slice(0, 10) || []);
    } catch (err) {
      console.error("Error fetching movie:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  if (loading) {
    return (
      <div className="movie-loading">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-error">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div
      className="movie-page"
      style={{
        "--backdrop-image": `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || FALLBACK_BACKDROP})`,
      }}
    >
      <div className="hero">
        <div className="overlay">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster"
          />
          <div className="details">
            <h1>{movie.title}</h1>
            <p className="tagline">{movie.tagline}</p>
            <p className="meta">
              ⭐ {movie.vote_average.toFixed(1)} | 📅 {movie.release_date}
            </p>
            <p className="genres">
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <p className="overview">{movie.overview}</p>
            
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <section className="trailer-section">
          <h2>🎬 Watch Trailer</h2>
          <div className="trailer-wrapper">
            <YouTube
              videoId={trailer}
              className="trailer-iframe"
              opts={{ width: "100%", height: "100%" }}
            />
          </div>
        </section>
      )}

      {/* Cast Section */}
      <section className="cast-section">
        <h2>🎭 Cast</h2>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div
              key={actor.id}
              className="cast-card"
              onClick={() => navigate(`/cast/${actor.id}`)}
            >
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={actor.name}
              />
              <div className="cast-info">
                <p className="cast-name">{actor.name}</p>
                <p className="cast-character">{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoviePage;

