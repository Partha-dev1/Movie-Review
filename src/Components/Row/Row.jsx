import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Row.css'
import { useNavigate } from 'react-router-dom'

const baseURL = "https://api.themoviedb.org/3/"

const Row = ({ url, title }) => {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(`${baseURL}${url}`)
      setMovies(response.data.results)
    }

    if (url) {
      fetchMovies()
    }
  }, [url])

  function handleClick(id) {
    navigate(`/movie/${id}`)
  }

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='scroll-container'>
        {movies.map((item) => (
          <img
            key={item.id}
            className='movie-poster'
            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
            alt={item.title || 'Movie Poster'}
            height='200px'
            width='300px'
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
