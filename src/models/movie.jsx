export class MovieDetailModel {
  constructor({
    title,
    year,
    rated,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    plot,
    ratings,
    language,
    country,
    awards,
    poster,
    imdbRating,
    boxOffice,
  }) {
    this.title = title;
    this.year = year;
    this.rated = rated;
    this.released = released;
    this.runtime = runtime;
    this.genre = genre;
    this.director = director;
    this.writer = writer;
    this.actors = actors;
    this.plot = plot;
    this.reviews = ratings;
    this.language = language;
    this.country = country;
    this.awards = awards;
    this.poster = poster;
    this.imdbRating = imdbRating;
    this.boxOffice = boxOffice;
  }

  static fromApiResponse(response) {
    return new MovieDetailModel({
      title: response.Title,
      year: response.Year,
      rated: response.Rated,
      released: response.Released,
      runtime: response.Runtime,
      genre: response.Genre,
      director: response.Director,
      writer: response.Writer,
      actors: response.Actors,
      plot: response.Plot,
      ratings: response.Ratings.map(item => new RatingModel(item.Source, item.Value)),
      language: response.Language,
      country: response.Country,
      awards: response.Awards,
      poster: response.Poster,
      imdbRating: response.imdbRating,
      boxOffice: response.BoxOffice,
    });
  }
}

class RatingModel{
  constructor(source, value) {
    this.source = source;
    this.value = value;
    }
}