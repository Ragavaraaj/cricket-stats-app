import { Spinner, Error } from '../components';

interface LoadingWrapperProps {
  isLoading: boolean;
  isError: boolean;
  children: JSX.Element;
}
export const LoadingWrapper = ({
  isLoading,
  isError,
  children,
}: LoadingWrapperProps) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Error />;
  }

  return children;
};
