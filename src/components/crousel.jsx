import { useEffect, useState } from "react";
import fetchCrouselData from "../backend/database"; // Ensure correct import path

function scrollCrousel(index){
  let carousel = document.getElementById('hero-carousel');
  let maxScroll = carousel.scrollWidth;
  // console.log('maxScroll', maxScroll);
  
  let scrollOffset = maxScroll / 5;
  // console.log('scrollOffset', scrollOffset);

  carousel.scrollLeft =  index * scrollOffset;
  // console.log('scroll: ', carousel.scrollLeft);
}


const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      console.log("Fetching movies...");
      const data = await fetchCrouselData();
      console.log("Fetched data:", data);

      setMovies(data);
      setLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <div className=" w-full max-w-7xl mx-auto overflow-hidden flex flex-col px-4 ">
      <div className="flex overflow-auto snap-x snap-mandatory scroll-smooth " id="hero-carousel">
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
                className=" border-6 border-gray-700 snap-center min-w-full min-h-[350px] max-h-[50vh] flex text-white bg-gray-800 m-4 rounded-2xl"
              >
                {/* Left Panel - Movie Details */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <h2 className="text-4xl font-bold">{movie.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{movie.year}</p>
                  <p className="mt-2 text-lg">{movie.genre}</p>
                  <p className="mt-4 text-yellow-400">
                    ⭐ {movie.imdbRating} / 10
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    <strong>Actors:</strong> {movie.actors}
                  </p>
                </div>

                {/* Right Panel - Movie Image with Gradient Overlay */}
                <div className="flex-1 relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="h-full w-full object-cover rounded-r-2xl"
                  />
                  <div className="absolute h-full left-0 w-30 top-0 bg-gradient-to-r from-gray-800 to-transparent" />
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
