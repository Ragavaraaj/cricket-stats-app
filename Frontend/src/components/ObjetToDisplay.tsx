import { MouseEvent } from 'react';
import { Display } from './Display';

interface ObjectToDisplayProps {
  data: any;
  onClick?: (event: MouseEvent<HTMLFieldSetElement>) => void;
}

export const ObjectToDisplay = ({ data, onClick }: ObjectToDisplayProps) => {
  if (data) {
    return (
      <>
        {Object.keys(data).map((dataKey, i) => (
          <Display
            key={i * 2}
            label={dataKey.replace(/_/g, ' ')}
            value={data[dataKey]}
            onClick={onClick}
            hover={onClick ? true : false}
          />
        ))}
      </>
    );
  }
  return <div>Bad Object</div>;
};
