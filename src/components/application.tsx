import { lazy, Suspense } from 'react';

import { Search } from './search';
import { SearchResults } from './search-results';
import { Loading } from './loading';

const Movie = lazy(() => import('./movie'));

const Application = () => {
  return (
    <main className="container my-8 flex flex-col gap-8">
      <Search />
      <div className="flex gap-4">
        <Suspense fallback={<Loading />}>
          <SearchResults />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <Movie />
        </Suspense>
      </div>
    </main>
  );
};

export default Application;
