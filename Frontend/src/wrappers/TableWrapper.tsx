import { ReactNode } from 'react';
import { Error } from '../components/Error';
import { Spinner } from '../components/Spinner';

interface TableWrapperProps {
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
  error: any;
}
export const TableWrapper = ({
  isLoading,
  isError,
  children,
  error,
}: TableWrapperProps) => {
  if (isLoading) {
    return <Spinner strokeWidth={4} />;
  }

  if (isError) {
    console.log(error);
    return <Error strokeWidth={4} />;
  }

  return <div className="flex flex-col gap-5 m-6">{children}</div>;
};
