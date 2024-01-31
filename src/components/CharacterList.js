import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CharacterList = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieResponse = await fetch(`https://swapi.dev/api/films/${id}/`);
        if (!movieResponse.ok) {
          throw new Error('Failed to fetch movie');
        }

        const movieData = await movieResponse.json();
        setMovie(movieData);

        const characterRequests = movieData.characters.map(async (characterURL) => {
          const characterResponse = await fetch(characterURL);
          if (!characterResponse.ok) {
            throw new Error('Failed to fetch character');
          }

          const characterData = await characterResponse.json();
          return characterData;
        });

        const characterData = await Promise.all(characterRequests);
        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching movie and characters:', error);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      <h1>{movie.title} ({movie.release_date})</h1>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>{character.name}</li> 
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;