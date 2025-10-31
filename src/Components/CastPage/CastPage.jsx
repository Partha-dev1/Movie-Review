import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CastPage.css"

const API_KEY = "cc7891d11b217a255e8ad9f8ffb6ed83";
const BASE_URL = "https://api.themoviedb.org/3/";

const CastPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchActor = async () => {
      const res = await fetch(`${BASE_URL}person/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setActor(data);
    };

    const fetchMovies = async () => {
      const res = await fetch(`${BASE_URL}person/${id}/movie_credits?api_key=${API_KEY}`);
      const data = await res.json();
      setMovies(data.cast || []);
    };

    fetchActor();
    fetchMovies();
  }, [id]);

  if (!actor)
    return (
      <div className="movie-loading">
        <div className="spinner"></div>
        <p>Loading cast details...</p>
      </div>
    );

  return (
    <div className="cast-page">
      <div className="cast-header">
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={actor.name}
        />
        <div className="cast-info">
          <h1>{actor.name}</h1>
          <p><strong>Known For:</strong> {actor.known_for_department}</p>
          <p><strong>Birthday:</strong> {actor.birthday || "N/A"}</p>
          <p><strong>Place of Birth:</strong> {actor.place_of_birth || "N/A"}</p>
          <p className="bio">{actor.biography || "No biography available."}</p>
        </div>
      </div>

      <div className="cast-movies">
        <h2>🎬 Movies featuring {actor.name}</h2>
        <div className="cast-movie-grid">
          {movies.map((m) => (
            <Link to={`/movie/${m.id}`} key={m.id} className="movie-card">
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={m.title}
              />
              <p>{m.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastPage;
