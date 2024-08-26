import { useCallback } from 'react';
import { usePathParams, useSearchParams } from './use-location';
import { useSuspenseFetch } from './use-suspense-fetch';

/** This can be set in `.env` */
const apiKey: string = import.meta.env.VITE_API_KEY;
const apiEndpoint = `https://www.omdbapi.com/?apikey=${apiKey}&type=movie`;

if (!apiKey) {
  throw new Error('VITE_API_KEY is not defined in the environment variables.');
}

/**
 * Checks if the given response is an API error.
 * The OMDB API returns an error object when the request fails.
 * It always returns a 200 status code, even when the request fails.
 */
export const isApiError = (response: unknown): response is APIError => {
  return (response as APIError)?.Response === 'False';
};

const fetchFromApi = async <T>(url: string): Promise<APIResponse<T>> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data from API.');
    }

    const data = await response.json();

    if (isApiError(data)) {
      return data;
    }

    return data;
  } catch (error) {
    if (import.meta.env.MODE === 'development') {
      console.error('Error fetching from API.', error);
    }
    throw error;
  }
};

/**
 * Returns a promise that fetches search results based on the given query.
 * @param query - The search query to fetch results for.
 */
const fetchSearchResults = async (
  query?: string,
): Promise<APIResponse<{ Search: SearchResult[] } | null>> => {
  if (!query) return null;
  return fetchFromApi(`${apiEndpoint}&s=${query}`);
};

const fetchMovie = async (id?: string): Promise<APIResponse<Movie> | null> => {
  if (!id) return null;
  return fetchFromApi<Movie>(`${apiEndpoint}&i=${id}`);
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

  const fetcher = useCallback(() => fetchSearchResults(search), [search]);

  const [searchResults, isPending] = useSuspenseFetch(fetcher);

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

  const fetcher = useCallback(() => fetchMovie(id), [id]);

  const [movie, isPending] = useSuspenseFetch(fetcher);

  return [movie, isPending] as const;
};
