type SearchResult = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: ResultType;
  Poster: string;
};

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: ResultType;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};

type Rating = {
  Source: string;
  Value: string;
};

type ResultType = 'movie' | 'series' | 'episode';

type Eventual<T> = T | Promise<T>;

type APIError = {
  Response: 'False';
  Error: string;
};

type APIResponse<T> = T | APIError;
