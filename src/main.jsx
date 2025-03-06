
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
import Protected from "./pages/protected";


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <WishlistProvider>
      <Router>
          <Routes>
            <Route path={MyRoutes.login} element={<LoginPage />} />
            <Route element={<Layout />}>
              <Route path={MyRoutes.home} element={<Protected Page={Home}/>}/>
              <Route path={`${MyRoutes.details}:id`} element={<Protected Page={MovieDetails}/>} />
              <Route path={`${MyRoutes.search}:query`} element={<Protected Page={SearchPage}/>}/>
              <Route path={`${MyRoutes.wishlist}`} element={<Protected Page={WishlistPage}/>} />
            </Route>
          </Routes>
        </Router>
    </WishlistProvider>
  // </StrictMode>
)
