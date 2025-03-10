import React from "react";
import Carousel from "../components/crousel";
import HorizontalMovieList from "../components/horizontalList"
import { WishlistContext } from "../context/wishlist/wishlistcontext";
import { useEffect, useContext } from "react";

const Home = () => {
  console.log(navigator.language); // Returns the first preferred language
  console.log(navigator.languages); // Returns an array of preferred languages
  const context = useContext(WishlistContext)
  useEffect(()=>{
    const list = context.loadWishlist()
    context.setWishlist(list)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <Carousel query={"latest"} />
      <div className="max-w-7xl mx-auto px-4">
        <HorizontalMovieList key={1} category={"Popular"} />
        <HorizontalMovieList key={2} category={"Horror"} />
        <HorizontalMovieList key={3} category={"Animated"} />
        <HorizontalMovieList key={4} category={"Comedy"} />
        <HorizontalMovieList key={5} category={"New"} />
        <div className="h-20"/>
      </div>
    </div>
  );
};

export default Home;
