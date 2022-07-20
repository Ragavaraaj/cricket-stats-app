import { HTMLProps } from 'react';
import { BackBtn, ChevronBtn } from '../components';
interface ButtonsOptions extends HTMLProps<HTMLButtonElement> {
  isToggle?: boolean;
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
          ({ label, isToggle, type, ...props }: ButtonsOptions, i) =>
            !isToggle ? (
              <button
                key={i * 2}
                {...props}
                className="bg-indigo-400 mt-3.5 m-auto py-2 px-4 rounded-lg text-white font-extrabold capitalize"
              >
                {label}
              </button>
            ) : (
              <ChevronBtn onClick={props.onClick} label={label} />
            ),
        )}
      </div>
    );
  };

  return (
    <div className="px-4 pt-2 mb-6">
      <div className="flex gap-3 my-3">
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
