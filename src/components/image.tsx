import { ComponentProps } from 'react';
import { twMerge as merge } from 'tailwind-merge';

export const Image = (props: ComponentProps<'img'>) => {
  console.log(props.src);
  if (!props.src || props.src === 'N/A') {
    return (
      <div
        className={merge(
          'flex h-48 items-center justify-center rounded-md bg-slate-600 p-4 text-white @lg:h-64',
          props.className,
        )}
      >
        <p className="text-center">Image not available.</p>
      </div>
    );
  }

  return <img {...props} />;
};
