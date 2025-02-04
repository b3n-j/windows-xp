import React from 'react';

type Props = React.ComponentPropsWithoutRef<'svg'>;

export function RandomIcon({ ...props }: Props) {
  return (
    <svg
      {...props}
      viewBox="0 0 76 65"
      fill="hsl(var(--background)/1)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="inherit" />
    </svg>
  );
}
