import React from "react";
import Carousel from "../components/crousel";
import HorizontalMovieList from "../components/horizontalList"

const Home = () => {
  return (
    <div>
      <Carousel query={"latest"} />
      <div className="max-w-7xl mx-auto px-4">
        <HorizontalMovieList key={1} category={"Popular"} />
        <HorizontalMovieList key={1} category={"Horror"} />
        <HorizontalMovieList key={1} category={"Animated"} />
        <HorizontalMovieList key={2} category={"Comedy"} />
        <HorizontalMovieList key={3} category={"New"} />
        <div className="h-20"/>
      </div>
    </div>
  );
};

export default Home;
