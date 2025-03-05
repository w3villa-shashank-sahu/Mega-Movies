import { BannerDataModel } from "../models/banner";
import {MovieModel} from "../models/card"


const API_KEY = "a0ce261e";

async function fetchCrouselData() {
  try {
    // Step 1: Fetch the latest movies list
    const searchUrl = `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=action&page=1`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.Search || searchData.Search.length === 0) {
      console.log("No movies found.");
      return;
    }

    // Step 2: Get the first 5 movies
    const topMovies = searchData.Search.slice(0, 5);

    // Step 3: Fetch details for each movie
    const movieDetailsPromises = topMovies.map(async (movie) => {
      const detailsUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`;
      const detailsResponse = await fetch(detailsUrl);
      const detailsData = await detailsResponse.json();

      let url = removeSize(detailsData.Poster)

      return new BannerDataModel(
        detailsData.Title,
        detailsData.Year,
        detailsData.imdbRating,
        detailsData.Genre,
        url,
        detailsData.Actors
      ); 
    });

    // Wait for all movie details to be fetched
    const movies = await Promise.all(movieDetailsPromises);
    
    console.log('returning movies', movies);
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

export async function fetchMovieByCategory(category) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${category}&type=movie`
    );
    const data = await response.json();

    if (data.Search) {
      return data.Search.map(
        (movie) =>
          new MovieModel(movie.Title, movie.Year, movie.imdbID, movie.Type, movie.Poster)
      );
    } else {
      return []; // Return an empty array if no movies found
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};


function removeSize(url){
    let len = url.length;
    let newUrl = "";
    for(let i = 0; i < len-1; i++){
        newUrl += url[i];
        if(url[i] == '@' && url[i+1] != '@'){
            break;
        }
    }
    newUrl += '.jpg';

    return newUrl;


}
export default fetchCrouselData;  // Export the function to be used elsewhere
