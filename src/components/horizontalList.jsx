import { useState, useEffect } from "react";
import MovieCard from './movieCard';
import { fetchMovieByCategory } from "../backend/database";

const HorizontalMovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const movieList = await fetchMovieByCategory(category);
      setMovies(movieList);
    };
    getMovies();
  }, [category]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-white mb-4">{category} Movies</h2>
      <div className="flex overflow-x-auto space-x-4 p-4 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} />)
        ) : (
          <p className="text-gray-400">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalMovieList;