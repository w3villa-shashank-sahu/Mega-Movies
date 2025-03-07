import { useState, useEffect,useRef} from "react";
import {ChevronLeft , ChevronRight} from 'lucide-react'
import MovieCard from './movieCard';
import { fetchMovieByCategory } from "../backend/database";


const HorizontalMovieList = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollbar = scrollRef.current;
    if (!scrollbar) return;
    scrollbar.addEventListener("scroll", checkScroll);
    return () => scrollbar.removeEventListener("scroll", checkScroll);
  }, []); // Re-run when movies are updated

  useEffect(() => {
    const getMovies = async () => {
      const movieList = await fetchMovieByCategory(category);
      setMovies(movieList);
    };
    getMovies();
  }, [category]);

  function scrollLeft(){
  
    // const scrollbar = document.getElementById(id);
    // let width = scrollbar.scrollWidth;
    // let offset = width * 0.2; 
    // scrollbar.scrollLeft -= offset;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -Math.max(scrollRef.current.clientWidth * 0.3, '250'), behavior: "smooth" });
    }
  }
  
  function scrollRight(){
    // alert('right clicked')
    // const scrollbar = document.getElementById(id);
    // let width = scrollbar.scrollWidth;
    // let offset = width * 0.2; 
    // scrollbar.scrollLeft += offset;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: Math.max(scrollRef.current.clientWidth * 0.3, '250'), behavior: "smooth" });
    }
  }

  // Function to check scroll position
  const checkScroll = () => {
    const scrollbar = scrollRef.current;
    if (!scrollbar) return;

    setShowLeft(scrollbar.scrollLeft > 0);
    setShowRight(scrollbar.scrollLeft < scrollbar.scrollWidth - scrollbar.clientWidth);
  };



  return (
    <div className="mt-6 relative" >
      <h2 className="text-xl font-bold text-white mb-4">{category} Movies</h2>
      <div className="flex overflow-x-auto scroll-smooth space-x-4 p-4 gap-4 relative" id={`${category}List`}
      ref={scrollRef}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.imdbId} movie={movie} width={'200px'} />)
        ) : (
          <p className="text-gray-400">No movies found</p>
        )}
      </div>
        {/* Show Left Arrow only when scrollbar is NOT at the start */}
      {showLeft && (
        <div className="absolute left-[-15px] top-[50%]">
          <ChevronLeft
            className="bg-[#ffffffa1] cursor-pointer hover:bg-white rounded-full h-15 w-7"
            onClick={scrollLeft}
          />
        </div>
      )}

      {/* Show Right Arrow only when scrollbar is NOT at the end */}
      {showRight && (
        <div className="absolute right-[-15px] top-[50%]">
          <ChevronRight
            className="bg-[#ffffffa1] cursor-pointer hover:bg-white rounded-full h-15 w-7"
            onClick={scrollRight}
          />
        </div>
      )}
    </div>
  );
};

export default HorizontalMovieList;