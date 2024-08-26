import { Suspense } from 'react';
import { isApiError, useMovie } from '../hooks/use-api';
import { EmptyState } from './empty-state';
import { Loading } from './loading';
import { twMerge as merge } from 'tailwind-merge';
import { Link } from './link';
import { Image } from './image';
import { useLocation } from '../hooks/use-location';

/**
 * The search results component.
 *
 * **Note**: This component expects to be rendered within a Suspense boundary.
 */
export const Movie = () => {
  const [movie, isPending] = useMovie();

  if (!movie) return null;

  if (movie instanceof Promise) {
    throw movie;
  }

  if (isApiError(movie)) {
    return (
      <EmptyState>
        <span className="font-bold text-error-400">Error</span>: {movie.Error}
      </EmptyState>
    );
  }

  return (
    <div
      className={merge(
        'flex w-full flex-col gap-4 @container',
        isPending && 'animate-pulse opacity-50',
      )}
    >
      <Link to="/" className="block w-fit place-self-end">
        Clear Movie
      </Link>
      <article className="grid w-full grid-cols-1 gap-8 rounded-md bg-slate-100 p-4 text-sm @sm:grid-cols-2">
        <Image
          src={movie.Poster}
          alt={movie.Title}
          className="mx-auto mb-4 w-full rounded-md bg-slate-500 shadow-md @sm:row-span-2 @sm:self-start @md:mb-0"
        />
        <div className="space-y-2">
          <header className="flex flex-col gap-2 @xs:flex-row @xs:items-center">
            <h2 className="w-full truncate text-lg font-semibold @md:text-xl">
              {movie.Title}
            </h2>
            <p className="font-light text-slate-500">{movie.Year}</p>
          </header>
          <ul className="flex gap-4 text-xs">
            <li className="max-w-fit text-nowrap rounded-md bg-slate-200 px-1 py-0.5">
              {movie.Rated}
            </li>
            <li>{movie.Runtime}</li>
            <li className="truncate">{movie.Language}</li>
          </ul>

          <div>
            <p className="py-4 font-serif text-sm @sm:text-base">
              {movie.Plot}
            </p>
          </div>

          <ul className="flex flex-col gap-2 @sm:justify-between @lg:flex-row @lg:items-center @lg:justify-start @lg:gap-4">
            <li>
              <span className="mr-2 font-semibold">Metascore</span>
              {movie.Metascore}
            </li>
            <li>
              <span className="mr-2 font-semibold">IMDB Rating</span>
              {movie.imdbRating}
            </li>
          </ul>
        </div>
        <ul className="text-xs @lg:text-sm">
          <li className="truncate">
            <span className="mr-2 font-semibold">Director</span>
            {movie.Director}
          </li>
          <li className="truncate">
            <span className="mr-2 font-semibold">Writers</span>
            {movie.Writer}
          </li>
          <li className="truncate">
            <span className="mr-2 font-semibold">Actors</span>
            {movie.Actors}
          </li>
          <li className="truncate">
            <span className="mr-2 font-semibold">Genre</span>
            {movie.Genre}
          </li>
        </ul>
      </article>
    </div>
  );
};

export default () => {
  const { pathname } = useLocation();

  if (pathname === '/') {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <Movie />
    </Suspense>
  );
};
