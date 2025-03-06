import { useState } from "react";
import { WishlistContext } from "./wishlistcontext";
import { MovieModel } from "../../models/card";

function saveWishlist(list) {
    localStorage.setItem("wishlist", JSON.stringify({list : list}))
}

function loadWishlist() {
    const data = localStorage.getItem("wishlist");
    if(!data)   return [];
    const json = JSON.parse(data);
    const movies = json.list.map( item => new MovieModel(item.title, item.year, item.imdbId, item.type, item.poster))
    return movies;
}

export const WishlistProvider = (props) => {
    const [wishlist, setWishlist] = useState([])
    return (
        <WishlistContext.Provider value={{wishlist, setWishlist, saveWishlist, loadWishlist}}>
            {props.children}
        </WishlistContext.Provider>
    )
}