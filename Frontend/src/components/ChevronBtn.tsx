import { MouseEvent, useState } from 'react';

interface ChevronProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
}

export const ChevronBtn = ({
  onClick,
  type = 'button',
  label,
  ...otherProps
}: ChevronProps & React.HTMLProps<HTMLButtonElement>) => {
  const [invert, setInvert] = useState(false);

  const localOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    setInvert((prv) => !prv);
    onClick?.(event);
  };

  return (
    <button
      className={`bg-indigo-400 ${
        label
          ? 'py-2 px-4 rounded-lg gap-5 w-fit mt-3.5 m-auto'
          : 'h-10 w-10 rounded-full'
      } self-center flex items-center justify-center text-white font-bold`}
      onClick={localOnClick}
      {...otherProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 m-0 ${invert ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
      {label}
    </button>
  );
};
