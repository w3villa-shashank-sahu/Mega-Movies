import { useState, useEffect } from "react";
import {ChevronLeft , ChevronRight} from 'lucide-react'
import MovieCard from './movieCard';
import { fetchMovieByCategory } from "../backend/database";


function scrollLeft(id){
  
  const scrollbar = document.getElementById(id);
  let width = scrollbar.scrollWidth;
  let offset = width * 0.3; 
  scrollbar.scrollLeft -= offset;
}

function scrollRight(id){
  // alert('right clicked')
  const scrollbar = document.getElementById(id);
  let width = scrollbar.scrollWidth;
  let offset = width * 0.3; 
  scrollbar.scrollLeft += offset;
}

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
    <div className="mt-6 relative" >
      <h2 className="text-xl font-bold text-white mb-4">{category} Movies</h2>
      <div className="flex overflow-x-auto scroll-smooth space-x-4 p-4 gap-4 relative" id={`${category}List`}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} width={'200px'} />)
        ) : (
          <p className="text-gray-400">No movies found</p>
        )}
      </div>
      <div className="absolute left-[-15px] top-[50%]">
        <ChevronLeft className="bg-[#ffffffa1] cursor-pointer hover:bg-white rounded-full h-15 w-7"onClick={()=>{scrollLeft(`${category}List`)}}/>
      </div>
      <div className="absolute right-[-15px] top-[50%]">
        <ChevronRight className="bg-[#ffffffa1] cursor-pointer hover:bg-white rounded-full h-15 w-7" onClick={()=>{scrollRight(`${category}List`)}}/>
      </div>
    </div>
  );
};

export default HorizontalMovieList;