import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "../components/movieCard";
import { MyConst, MyRoutes } from "../backend/const";
import { MovieModel } from "../models/card";

const SearchPage = () => {
  const {query} = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>  {
    console.log('running search page');
    
    const fetchMovies = async () => {
      if (!query) {
        navigate(MyRoutes.home)
      };
      setLoading(true);

      try {
        const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${MyConst.apiKey}&s=${query}&page=1`);
        const data = await response.json();
        console.log(data.Search);
        
        if (data.Search) {
          setMovies(data.Search.map((movie) => new MovieModel(movie.Title, movie.Year, movie.imdbID, movie.Type, movie.Poster)));
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      }

      setLoading(false);
    };

    fetchMovies();
  }, [query, navigate]);

  return (
    <div className="relative min-h-full text-white overflow-auto">
      {/* Title Section */}
      <div className="relative text-center py-12">
        <h1 className="text-3xl font-bold text-yellow-400">Search Results</h1>
        <p className="text-gray-300 text-lg mt-2">Results for: <span className="text-white font-semibold">"{query}"</span></p>
      </div>

      {/* Movie Grid */}
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading movies...</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} /> )}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No movies found for "{query}". Try another search!</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
