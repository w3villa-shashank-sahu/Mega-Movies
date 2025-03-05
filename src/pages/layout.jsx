import React from 'react';
import AppBar from '../components/appbar';
import { Outlet } from "react-router-dom";
// import Carousel from '../components/crousel';
// import HorizontalMovieList from '../components/horizontalList';

// const Home = () => {
//   return (
//     <div className="bg-gray-900 min-h-screen">
//       <AppBar />
//       <Carousel query={'latest'}/>
//       <div className="max-w-7xl mx-auto px-4">
//         <HorizontalMovieList key={1} category={"Animated"}/>
//         <HorizontalMovieList key={2} category={"Comedy"} />
//         <HorizontalMovieList key={3} category={"Horror"} />
//         <HorizontalMovieList key={3} category={"New"} />
//         <HorizontalMovieList key={3} category={"Anime"} />
//       </div>
//     </div>
//   );
// };

// export default Home;

const Layout = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <AppBar />
      <div className="mt-16"> {/* Add margin-top to prevent overlap */}
        <Outlet /> {/* This is where pages will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
