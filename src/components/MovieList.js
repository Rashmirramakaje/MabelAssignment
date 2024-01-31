import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <img src="/star-wars-logo.png" alt="Star Wars Logo" />
      <h1>Star Wars Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.episode_id}>
            <Link to={`/movie/${movie.episode_id}`}>
              {movie.title} ({movie.release_date})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;