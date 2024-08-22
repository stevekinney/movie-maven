import { ComponentProps } from 'react';
import { twMerge as merge } from 'tailwind-merge';

export const Loading = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={merge(
        'flex h-full min-h-96 w-full animate-pulse select-none items-center justify-center rounded-md bg-slate-100 p-4',
        className,
      )}
      {...props}
    >
      Loading…
    </div>
  );
};
