import React from 'react'

const IMAGE_BASE = "https://image.tmdb.org/t/p/original"

const MovieCard = ({ list }) => {
  if (!list || list.length === 0) return null
  return (
    <>
      {list.map((movie) => (
        <div 
          key={movie.id} 
          className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
        >
          <img
            src={`${IMAGE_BASE}${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-72 object-cover"
          />

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {movie.title}
            </h3>
            <p className="text-sm text-gray-500">
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default MovieCard
