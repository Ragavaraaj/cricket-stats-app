interface ErrorProps {
  width?: string;
  height?: string;
  strokeWidth?: number;
  className?: string;
}

export const Error = ({
  width,
  height,
  strokeWidth,
  className,
}: ErrorProps) => {
  const classes = `w-${width ?? '14'} h-${
    height ?? '14'
  } stroke-red-600 fill-white ${className ?? ''}`;

  return (
    <div className="flex flex-col gap-1 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classes}
        viewBox="0 0 24 24"
        strokeWidth={strokeWidth ?? 3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="uppercase font-extrabold text-red-600 text-center">error</p>
    </div>
  );
};
