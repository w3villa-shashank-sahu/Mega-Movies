import { useState } from "react";
import { WishlistContext } from "./wishlistcontext";

export const WishlistProvider = (props) => {
    const [wishlist, setWishlist] = useState([])
    return (
        <WishlistContext.Provider value={{wishlist, setWishlist}}>
            {props.children}
        </WishlistContext.Provider>
    )
}