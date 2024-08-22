import { useCallback, useState } from 'react';
import { useSearchParams } from '../hooks/use-location';

export const Search = () => {
  const [search, setSearch] = useSearchParams('search');
  const [value, setValue] = useState(search);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSearch(value);
    },
    [value, setSearch],
  );

  return (
    <form method="get" className="flex gap-2" onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">
        Search for a Movie
      </label>
      <input
        type="text"
        name="search"
        id="search"
        className="w-full"
        value={value}
        placeholder="Search for a Movie…"
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
