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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1)

  // fetch data from API
  const fetchMovies = async () => {

    if (!query) {
      navigate(MyRoutes.home)
    };

    try {
      if(page > totalPage){
        return;
      }
      console.log(page, '-', totalPage);
      
      const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${MyConst.apiKey}&s=${query}&page=${page}`);
      const data = await response.json();
      if(page == 1) {
        setTotalPage(Math.floor(data.totalResults / 10));
        console.log('running', totalPage);
      }
      console.log(data.Search);
      if(data.Search === undefined){
        setLoading(false)
        return;
      }
      let newData = data.Search.map((movie) => new MovieModel(movie.Title, movie.Year, movie.imdbID, movie.Type, movie.Poster))
      setMovies((prev) => [...prev, ...newData]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }    
  };

  

  useEffect(() => {
    console.log('sdfsdgs');
    
    
  }, [])

  useEffect(() =>  {
    // setMovies([])
    fetchMovies();
    console.log('fetching movie');
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);


  return (
    <div className="relative min-h-screen text-white overflow-auto">
      {/* Title Section */}
      <div className="relative text-center py-12">
        <h1 className="text-3xl font-bold text-yellow-400">Search Results</h1>
        <p className="text-gray-300 text-lg mt-2">Results for: <span className="text-white font-semibold">"{query}"</span></p>
      </div>

      {/* Movie Grid */}
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} /> )}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg">No movies found for "{query}". Try another search!</p>
        )}
        {loading && <p className="text-center text-gray-400 p-6 text-lg">Loading movies...</p>}
      </div>
    </div>
  );
};

export default SearchPage;
