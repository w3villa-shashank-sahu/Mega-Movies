import React, { useContext, useEffect } from "react";
import MovieCard from "../components/movieCard"; // Your existing MovieCard component
import { WishlistContext } from "../context/wishlist/wishlistcontext";
// import { useEffect } from "react";

const WishlistPage = () => { 
  
  let wishlist = useContext(WishlistContext);
  // let setWishlist =  useContext(WishlistContext).setWishlist;
  console.log(wishlist);
  useEffect(()=>{
    const list = wishlist.loadWishlist()
    wishlist.setWishlist(list)
  },[])

  return (
    <div className=" flex flex-col bg-gray-900 min-h-full text-white">
      {/* Background Image */}
      <div
        className=" relative w-full h-80 bg-cover bg-center"
        style={{ backgroundImage: `url('https://imgs.search.brave.com/vzTlNW86Nh73nheE9aSHAwHCxN3_dWrsnmmIXSFsaZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvbW92aWUtOXB2/bWR0dno0Y2IweGwz/Ny5qcGc')` }}
      >
        {/* Title Section */}
      <div className="absolute inset-0 flex flex-col justify-center items-center py-16 bg-[#00000088]">
        <h1 className="text-4xl font-bold text-yellow-400">Wishlist</h1>
        <p className="text-gray-300 text-lg mt-2">Your favorite movies at one place!</p>
      </div>

      </div>
      
      {/* Movie List */}
      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {wishlist.wishlist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {wishlist.wishlist.map((movie) => (
              <MovieCard key={movie.imdbId} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 text-lg mt-10">
            Your wishlist is empty. Start adding your favorite movies! 
          </p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
