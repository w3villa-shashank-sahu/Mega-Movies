import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailModel } from "../models/movie";
import { MovieModel } from "../models/card";
import {Star } from 'lucide-react'
import { MyConst } from "../backend/const";
import { WishlistContext } from "../context/wishlist/wishlistcontext";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  let wishlist = useContext(WishlistContext);

  useEffect(() => {
    console.log(wishlist);

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${MyConst.apiKey}`
        );
        const data = await response.json();
        const movieDetails = MovieDetailModel.fromApiResponse(data);

        wishlist.wishlist.forEach((e) => {
          if (e.imdbId === id) {
            setIsWishlisted(true);
          }
        });

        setMovie(movieDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();

    // Retrieve saved rating from local storage
    const savedRating = localStorage.getItem(`movieRating-${id}`);
    if (savedRating) {
      setUserRating(savedRating);
      setHasRated(true);
    }
  }, [id, wishlist]);

  const handleRatingSubmit = (rating) => {
    localStorage.setItem(`movieRating-${id}`, rating);
    setUserRating(rating);
    setHasRated(true);
  };

  if (!movie) {
    return <div className="text-white text-center text-lg py-10">Loading...</div>;
  }

  return (
    <div className="relative bg-gray-900 min-h-full text-white">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xl opacity-30"
        style={{ backgroundImage: `url(${movie.poster})` }}
      ></div>

      <div className="relative max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Movie Poster */}
          <div className="w-72 h-auto overflow-hidden rounded-xl shadow-lg">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-yellow-400">
              {movie.title} ({movie.year})
            </h1>
            <p className="text-gray-300 text-sm mt-1">
              {movie.genre} • {movie.runtime} • Rated: {movie.rated}
            </p>
            <p className="mt-4 text-gray-200">{movie.plot}</p>

            {/* Movie Information Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div>
                <p className="text-gray-400">Director</p>
                <p className="font-medium">{movie.director}</p>
              </div>
              <div>
                <p className="text-gray-400">Writer</p>
                <p className="font-medium">{movie.writer}</p>
              </div>
              <div>
                <p className="text-gray-400">Actors</p>
                <p className="font-medium">{movie.actors}</p>
              </div>
              <div>
                <p className="text-gray-400">Language</p>
                <p className="font-medium">{movie.language}</p>
              </div>
              <div>
                <p className="text-gray-400">Country</p>
                <p className="font-medium">{movie.country}</p>
              </div>
              <div>
                <p className="text-gray-400">Awards</p>
                <p className="font-medium">{movie.awards}</p>
              </div>
              <div>
                <p className="text-gray-400">IMDb Rating</p>
                <p className="font-medium text-yellow-400">⭐ {movie.imdbRating}</p>
              </div>
              <div>
                <p className="text-gray-400">Box Office</p>
                <p className="font-medium">{movie.boxOffice}</p>
              </div>
            </div>

            {/* Wishlist Button */}
            <div className="flex gap-3">
              <div className="mt-6">
                <button
                  onClick={() => {
                    let wishlistList = wishlist.wishlist;
                    if (!isWishlisted) {
                      wishlistList.push(
                        new MovieModel(movie.title, movie.year, id, "movie", movie.poster)
                      );
                    } else {
                      wishlistList = wishlistList.filter((m) => m.imdbId !== id);
                    }
                    setIsWishlisted(!isWishlisted);
                    wishlist.saveWishlist(wishlistList);
                    wishlist.setWishlist(wishlistList);
                  }}
                  className="inline-block bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
                >
                  {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                </button>
              </div>
              <div className="mt-6">
                <a
                  href={`https://www.imdb.com/title/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-yellow-400 border-amber-200 border-1 font-semibold px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  View on IMDb
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Rate this Movie</h2>
          
          {hasRated ? (
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">You rated this movie:</p>
              <p className="text-yellow-400 text-2xl font-bold">⭐ {userRating}/5</p>
            </div>
          ) : (
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingSubmit(star)}
                  className="text-gray-400 hover:text-yellow-400 text-2xl transition duration-300"
                >
                  <Star />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ratings Section */}        
        <div className="mt-6">
          <h2 className="text-xl font-bold text-yellow-400">Other Ratings</h2>
          <div className="space-y-2 mt-2">
            {movie.reviews && movie.reviews.length > 0 ? (
              movie.reviews.map((rating, index) => (
                <div key={index} className="flex justify-between bg-gray-800 p-4 rounded-lg">
                  {console.log("rating", rating)}
                  <p className="text-gray-400">{rating.source}</p>
                  <p className="font-medium text-yellow-400">{rating.value}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No ratings available</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;
