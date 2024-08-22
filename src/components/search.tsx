import { useState } from 'react';

export const Search = () => {
  const [value, setValue] = useState('');

  return (
    <form method="get" className="flex gap-2">
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
