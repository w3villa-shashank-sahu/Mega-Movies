
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './pages/layout';
import Home from "./pages/home";
import { createRoot } from 'react-dom/client'
import './index.css'
import { MyRoutes } from './backend/const';
import MovieDetails from './pages/movieDetail'
import SearchPage from './pages/search';
import WishlistPage from './pages/wishlist';
import LoginPage from "./pages/login";
import { WishlistProvider } from './context/wishlist/whislist';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <WishlistProvider>
      <Router>
          <Routes>
            <Route path={MyRoutes.login} element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path={MyRoutes.home} element={<Home />}/>
              <Route path={`${MyRoutes.details}:id`} element={<MovieDetails />} />
              <Route path={`${MyRoutes.search}:query`} element={<SearchPage/>}/>
              <Route path={`${MyRoutes.wishlist}`} element={<WishlistPage/>} />
              {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
            </Route>
          </Routes>
        </Router>
    </WishlistProvider>
  // </StrictMode>
)
