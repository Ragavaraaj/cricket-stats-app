import { MouseEvent } from 'react';

export interface DisplayProps {
  label: string;
  value: string;
  id?: string | number;
  hover?: boolean;
  onClick?: (event: MouseEvent<HTMLFieldSetElement>) => void;
}
export const Display = ({
  id,
  label,
  value,
  onClick,
  hover = false,
}: DisplayProps) => {
  const hoverCss = {
    fieldset: 'hover:bg-indigo-400 hover:text-white hover:border-indigo-400',
    legend:
      'group-hover:bg-indigo-400 group-hover:border-white group-hover:rounded-md',
  };

  return (
    <fieldset
      className={`group border-2 border-slate-200 px-2.5 pb-2 rounded-xl ${
        hover ? hoverCss.fieldset : ''
      }`}
      data-id={id}
      data-value={value}
      onClick={onClick}
    >
      <legend
        className={`capitalize text-sm px-1.5 ${hover ? hoverCss.legend : ''}`}
      >
        {label}
      </legend>
      <p className={`font-bold text-lg px-1.5`}>{value}</p>
    </fieldset>
  );
};
