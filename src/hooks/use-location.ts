import { useCallback, useState, useEffect } from 'react';
import { parsePath } from '../utilities/parse-path';
import { mergeSearchParams } from '../utilities/merge-paths';

const pushState = window.history.pushState.bind(window.history);
const replaceState = window.history.replaceState.bind(window.history);

/**
 * Returns the current location of the window.
 * `window.location` is always the same object in memory. This creates a new object.
 */
const getLocation = () => {
  return {
    href: window.location.href,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  } as const;
};

/**
 * Navigates to the given URL without reloading the page.
 * @param url The URL to navigate to.
 * @param replace If `true`, the current history entry will be replaced.
 * @returns
 */
export const navigate = (url: string, replace: boolean = false) => {
  const change = replace ? replaceState : pushState;
  const currentLocation = getLocation();
  const [pathname, search] = url.split('?');

  const updatedSearch = mergeSearchParams(currentLocation.search, search);

  change({}, '', `${pathname}?${updatedSearch}`);
  window.dispatchEvent(new Event('locationchange'));
};

export const useLocation = () => {
  const [location, setLocation] = useState(getLocation());

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation(getLocation());
    };
    window.addEventListener('locationchange', handleLocationChange);

    return () => {
      window.removeEventListener('locationchange', handleLocationChange);
    };
  }, [setLocation]);

  return location;
};

/**
 * Gets or sets a search parameter in the URL.
 * @param param A search parameter to get or set.
 */
export const useSearchParams = (
  param: string,
): [string, (value: string) => void] => {
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);

  const setParam = useCallback(
    (value: string) => {
      searchParams.set(param, value);

      navigate(`${pathname}?${searchParams}`, true);

      window.dispatchEvent(new Event('locationchange'));
    },
    [param, searchParams, search, pathname],
  );

  return [searchParams.get(param) || '', setParam] as const;
};

/**
 * Gets parameters from the path.
 * @param path The path to get parameters from.
 * @param param A parameter to get from the path.
 */
export const usePathParams = <T extends string | undefined>(
  path: string = window.location.pathname,
  param?: T,
): T extends string
  ? string | undefined
  : Record<string, string | undefined> => {
  const { pathname } = useLocation();
  const params = parsePath(path, pathname);

  if (param) {
    return params[param] as T extends string ? string | undefined : never;
  }

  return params as T extends string
    ? never
    : Record<string, string | undefined>;
};
