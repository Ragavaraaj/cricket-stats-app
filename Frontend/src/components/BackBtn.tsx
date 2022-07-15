export const BackBtn = ({
  type = 'button',
  ...otherProps
}: React.HTMLProps<HTMLButtonElement>) => {
  return (
    <button
      className="bg-indigo-400 h-6 w-6 rounded-full self-center flex items-center justify-center text-white font-bold"
      {...otherProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 m-0 rotate-90"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};
