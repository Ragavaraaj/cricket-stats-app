import { ReactNode } from 'react';
import { ChevronBtn } from '../components';

interface TableRowWrapperProps {
  shortName?: string;
  children: [ReactNode, ReactNode];
  showChevronBtn: boolean;
  onChevronClick: () => void;
}

export const TableRowWrapper = ({
  shortName,
  children,
  showChevronBtn,
  onChevronClick,
}: TableRowWrapperProps) => (
  <div className="flex flex-col p-4 rounded drop-shadow-md bg-slate-100 font-medium divide-y-2">
    <div className="flex gap-10 mb-5">
      {shortName ? (
        <div className="h-14 w-14 flex flex-shrink-0 items-center justify-center rounded-full ring-2 ring-white text-white bg-indigo-400">
          <span className="font-extrabold text-lg uppercase">{shortName}</span>
        </div>
      ) : (
        ''
      )}
      {children[0]}
      {showChevronBtn ? (
        <ChevronBtn onClick={onChevronClick} />
      ) : (
        <div className="h-10 w-10"></div>
      )}
    </div>
    {children[1]}
  </div>
);
