import React from 'react'
import './Row.css'
import { useNavigate } from 'react-router-dom'

const SearchRow = ({ searchList, title }) => {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/movie/${id}`)
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="movie-container">
        {searchList && searchList.length > 0 ? (
          searchList.map((item) => (
            item.backdrop_path && (
              <img
                key={item.id}
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                height="200px"
                width="300px"
                alt={item.title || 'Movie poster'}
                onClick={() => handleClick(item.id)}
              />
            )
          ))
        ) : (
          <p>No movies found...</p>
        )}
      </div>
    </div>
  )
}

export default SearchRow
