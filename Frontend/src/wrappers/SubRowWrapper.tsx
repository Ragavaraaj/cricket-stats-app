import { HTMLProps } from 'react';
import { BackBtn, ChevronBtn } from '../components';
import { CSVLink } from 'react-csv';
export interface ButtonsOptions extends HTMLProps<HTMLButtonElement> {
  data?: any;
  fileName?: string;
  btnType: 'button' | 'chevron' | 'download';
}
interface SubRowWrapperProps {
  title: string;
  children: React.ReactNode;
  buttons?: ButtonsOptions[];
  onBack?: () => void;
}

export const SubRowWrapper = ({
  title,
  children,
  buttons,
  onBack,
}: SubRowWrapperProps) => {
  const renderButtons = () => {
    return (
      <div className="flex gap-4 ml-auto">
        {buttons?.map(
          ({ label, btnType, data, fileName, ...props }: ButtonsOptions, i) => {
            switch (btnType) {
              case 'button': {
                return (
                  <button
                    key={i * 2}
                    {...props}
                    type="button"
                    className="bg-indigo-400 mt-3.5 m-auto py-2 px-4 rounded-lg text-white font-extrabold capitalize"
                  >
                    {label}
                  </button>
                );
              }
              case 'chevron': {
                return (
                  <ChevronBtn
                    onClick={props.onClick}
                    label={label}
                    key={i * 2}
                  />
                );
              }
              case 'download': {
                return data.length > 0 ? (
                  <CSVLink
                    data={data}
                    key={i * 2}
                    filename={fileName}
                    className="bg-indigo-400 mt-3.5 m-auto py-2 px-4 rounded-lg text-white font-extrabold capitalize"
                  >
                    {label}
                  </CSVLink>
                ) : (
                  ''
                );
              }
            }
          },
        )}
      </div>
    );
  };

  return (
    <div className="px-4 pt-2 mb-6">
      <div className="flex gap-3 mt-3 mb-6">
        {onBack ? <BackBtn onClick={onBack} /> : ''}
        <h1 className="text-2xl capitalize font-extrabold justify-items-center self-center">
          {title}
        </h1>
        {renderButtons()}
      </div>
      {children}
    </div>
  );
};
