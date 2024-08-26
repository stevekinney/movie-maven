import { useEffect, useState, useTransition } from 'react';

export const useSuspenseFetch = <T>(
  fetcher: () => Promise<T>,
): [T | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((result) => {
        if (!cancelled) {
          startTransition(() => {
            setData(result);
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          startTransition(() => {
            setData(null); // or handle the error state
          });
        }
        throw error; // triggers the error boundary
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return [data, isPending];
};
