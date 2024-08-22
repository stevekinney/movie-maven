import { ComponentProps } from 'react';

export const EmptyState = (props: ComponentProps<'div'>) => {
  return (
    <div
      className="flex h-96 w-full items-center justify-center rounded-md bg-slate-50 p-4"
      {...props}
    />
  );
};
