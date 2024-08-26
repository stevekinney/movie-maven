import { ComponentProps } from 'react';
import { navigate } from '../hooks/use-location';
import { twMerge as merge } from 'tailwind-merge';

type LinkProps = ComponentProps<'a'> & {
  to: string;
};

export const Link = ({ to, className, ...props }: LinkProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(to);
    props.onClick?.(event);
  };

  return (
    <a
      href={to}
      className={merge('cursor-pointer', className)}
      {...props}
      onClick={handleClick}
    />
  );
};
