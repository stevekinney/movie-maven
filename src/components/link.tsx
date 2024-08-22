import { ComponentProps } from 'react';
import { navigate } from '../hooks/use-location';

type LinkProps = ComponentProps<'a'> & {
  to: string;
};

export const Link = ({ to, ...props }: LinkProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate(to);
    props.onClick?.(event);
  };

  return <a href={to} {...props} onClick={handleClick} />;
};
