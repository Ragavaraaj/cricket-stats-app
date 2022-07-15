import { useQuery } from 'react-query';
import { ObjectToDisplay } from '../../components';
import { PlayersDetailsSubRow } from '../Row';
import { SubRowWrapper, LoadingWrapper } from '../../wrappers';

const fetchPlayer = (id: string) => async () => {
  const res = await fetch(`http://localhost:3001/player/${id}`);
  return res.json();
};

export const PlayerDetails: PlayersDetailsSubRow = ({
  selected_player: selectedPlayer,
  change_sub_row: changeSubRow,
}) => {
  const { isLoading, error, data, isFetching } = useQuery(
    'playerData',
    fetchPlayer(selectedPlayer?.id ?? ''),
  );

  const requiredData = () => {
    let newData = { ...data };
    delete newData.id;
    delete newData.team;
    delete newData.isCaption;
    delete newData.name;
    return newData;
  };

  return (
    <SubRowWrapper
      title={selectedPlayer?.value ?? ''}
      onBack={() => changeSubRow?.(0)}
    >
      <LoadingWrapper
        isError={error ? true : false}
        isLoading={isLoading || isFetching}
      >
        <div className="grid grid-cols-3 gap-3">
          <ObjectToDisplay data={requiredData()} />
          <button
            className="bg-indigo-400 mt-3.5 m-auto py-2 px-4 rounded-lg text-white font-extrabold capitalize"
            onClick={() => changeSubRow?.(2)}
          >
            more details
          </button>
        </div>
      </LoadingWrapper>
    </SubRowWrapper>
  );
};
