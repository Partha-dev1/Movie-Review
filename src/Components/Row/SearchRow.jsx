import React from 'react'
import './Row.css'

const SearchRow = ({ searchList, title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div className="movie-container">
        {searchList && searchList.length > 0 ? (
          searchList.map((item) => (
            <img
              key={item.id}
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
              height="200px"
              width="300px"
              alt={item.title || 'Movie poster'}
            />
          ))
        ) : (
          <p>No movies found...</p>
        )}
      </div>
    </div>
  )
}

export default SearchRow
