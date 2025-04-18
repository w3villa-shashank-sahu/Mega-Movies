import { useEffect, useRef, useState } from "react";
import fetchCrouselData from "../backend/database"; // Ensure correct import path
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../backend/const";

function scrollCrousel(index){
  let carousel = document.getElementById('hero-carousel');
  let maxScroll = carousel.scrollWidth;
  // console.log('maxScroll', maxScroll);
  
  let scrollOffset = maxScroll / 5;
  // console.log('scrollOffset', scrollOffset);

  carousel.scrollLeft =  index * scrollOffset;
  // console.log('scroll: ', carousel.scrollLeft);
}

let ind = 0;


const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null)

  let navigate = useNavigate();

  useEffect(() => {
    console.log('runnign useEffect');
    
    intervalRef.current = setInterval(() => {
      
      ind = ind === 4 ? 0 : ind + 1;
      scrollCrousel(ind)
      setCurrentIndex(ind)
    }, 3000);

    // fetching movies
    async function fetchMovies() {
      setLoading(true);
      console.log("Fetching movies...");
      const data = await fetchCrouselData();
      console.log("Fetched data:", data);

      setMovies(data);
      setLoading(false);
    }
    fetchMovies();

    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);
  return (
    <div className=" w-full max-w-7xl mx-auto overflow-hidden  flex flex-col px-4 ">
      <div className="flex overflow-auto snap-x snap-mandatory scroll-smooth cursor-pointer" id="hero-carousel">
        {loading
          ? // Skeleton Loader
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="snap-start min-w-full min-h-[350px] flex bg-gray-800 animate-pulse"
              />
            ))
          : // Movie Cards
            movies.map((movie, index) => (
              <div
                key={index}
                onClick={()=>{
                  navigate(MyRoutes.details + movie.id)
                }}
                className=" border-6 border-gray-700 snap-center min-w-full h-fit md:min-h-[350px] max-h-[50vh] flex flex-col md:flex-row text-white bg-gray-800 m-4 rounded-2xl"
              >
                {/* Left Panel*/}
                <div className="flex-1 order-2 md:order-1 mt-4 md:mt-0 md:ml-6 text-center md:text-left self-center">
                  <h2 className="text-2xl md:text-4xl font-bold">{movie.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{movie.year}</p>
                  <p className="mt-2 text-lg">{movie.genre}</p>
                  <p className="mt-4 text-yellow-400 text-lg">
                    ⭐ {movie.imdbRating} / 10
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    <strong>Actors:</strong> {movie.actors}
                  </p>
                </div>

                {/* Right Panel*/}
                <div className="flex-[1.2] order-1 md:order-2 relative overflow-hidden rounded-2xl md:rounded-r-2xl">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-auto max-h-[50vh] object-cover rounded-2xl md:rounded-r-2xl"
                  />
                  <div className="absolute h-30 w-full md:h-full md:left-0 md:w-30 bottom-0 md:top-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-800 to-transparent" />
                </div>
              </div>
            ))}
      </div>
      {/* Navigation Dots */}
      {!loading && movies.length > 0 && (
        <div className=" bottom-4 left-1/2 transform-translate-x-1/2 flex w-full justify-center">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={()=>{
                ind = index
                setCurrentIndex(index);
                scrollCrousel(index);
              }}
              className={`p-2`}
            >
              <div className={`h-[5px] w-10 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}/> 
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
