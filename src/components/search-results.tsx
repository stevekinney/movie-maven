import { twMerge as merge } from 'tailwind-merge';
import { isApiError, useSearch } from '../hooks/use-api';
import { Link } from './link';
import { EmptyState } from './empty-state';
import { useLocation, usePathParams } from '../hooks/use-location';
import { Suspense } from 'react';
import { Loading } from './loading';

type SearchResultProps = {
  movie: SearchResult;
};

/**
 * The search results component.
 *
 * **Note**: This component expects to be rendered within a Suspense boundary.
 */
export const SearchResults = () => {
  const [results, isPending] = useSearch();
  const { pathname } = useLocation();

  if (isApiError(results)) {
    return (
      <EmptyState>
        <span className="font-bold text-error-400">Error</span>: {results.Error}
      </EmptyState>
    );
  }

  if (results === null) {
    return (
      <EmptyState>
        Search for a movie using the field above to get started.
      </EmptyState>
    );
  }

  if (results.Search.length === 0) {
    return <EmptyState>No results found.</EmptyState>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div
        className={merge(
          'flex w-full flex-col gap-4 @container',
          isPending && 'animate-pulse opacity-50',
        )}
      >
        <Link to={`${pathname}?search=`} className="block w-fit place-self-end">
          Clear Search
        </Link>
        {results.Search.map((movie: SearchResult) => (
          <SearchResult key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </Suspense>
  );
};

const SearchResult = ({ movie }: SearchResultProps) => {
  const id = usePathParams('/:id', 'id');

  return (
    <Link
      to={`/${movie.imdbID}`}
      tabIndex={0}
      className={merge(
        'flex w-full justify-between gap-2 rounded-md bg-slate-50 px-2.5 py-2 text-xs transition-colors hover:bg-slate-100 @sm:text-sm',
        id === movie.imdbID && 'bg-info-50 hover:bg-info-100',
      )}
    >
      <h2 className="col-span-2 truncate font-semibold">{movie.Title}</h2>
      <p className="font-light text-slate-500">{movie.Year}</p>
    </Link>
  );
};
