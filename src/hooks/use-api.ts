import { useEffect, useState, useTransition } from 'react';
import { usePathParams, useSearchParams } from './use-location';

/** This can be set in `.env` */
const apiKey: string = import.meta.env.VITE_API_KEY;
const apiEndpoint = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie`;

/**
 * Checks if the given response is an API error.
 * The OMDB API returns an error object when the request fails.
 * It always returns a 200 status code, even when the request fails.
 */
export const isApiError = (response: unknown): response is APIError => {
  return (response as APIError)?.Response === 'False';
};

/**
 * Returns a promise that fetches search results based on the given query.
 * @param query - The search query to fetch results for.
 */
const fetchSearchResults = async (
  query: string,
): Promise<APIResponse<SearchResult[]>> => {
  const response = await fetch(`${apiEndpoint}&s=${query}`);

  if (!response.ok) {
    throw new Error('Failed to fetch search results.');
  }

  const data = await response.json();

  if (isApiError(data)) {
    return data;
  }

  return data.Search;
};

const fetchMovie = async (id: string): Promise<APIResponse<Movie>> => {
  const response = await fetch(`${apiEndpoint}&i=${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch search results.');
  }

  const data = await response.json();

  if (isApiError(data)) {
    return data;
  }

  return data;
};

/**
 * Fetches a list of search results based on the current search query.
 * This hook will automatically fetch the search results when the search query changes.
 * It will return the search results or an error if the search failed.
 *
 * **Note**: It expects that it will be run in a Suspense boundary.
 */
export const useSearch = () => {
  const [search] = useSearchParams('search');
  const [searchResults, setSearchResults] = useState<Eventual<
    APIResponse<SearchResult[]>
  > | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (search) {
      startTransition(() => {
        const api = fetchSearchResults(search);

        setSearchResults(api);

        api.then((results) => {
          setSearchResults(results);
        });
      });
    } else {
      setSearchResults(null);
    }
  }, [search]);

  return [searchResults, isPending] as const;
};

/**
 * Fetches a single movie based on the current movie ID.
 * This hook will automatically fetch the movie when the movie ID changes.
 * It will return the movie or `null` if the movie ID is not in the path.
 *
 * **Note**: This hook expects that it will be run in a Suspense boundary.
 */
export const useMovie = () => {
  const id = usePathParams('/:id', 'id');
  const [movie, setMovie] = useState<Eventual<APIResponse<Movie>> | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      if (!id) {
        setMovie(null);
        return;
      }

      const api = fetchMovie(id);

      setMovie(api);

      api.then((movie) => {
        setMovie(movie);
      });
    });
  }, [id]);

  return [movie, isPending] as const;
};
