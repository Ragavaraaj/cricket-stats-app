import { HTMLProps, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ObjectToDisplay } from '../../components/';
import { SubRowWrapper, LoadingWrapper } from '../../wrappers';

import { PlayersStatsSubRow } from '../Row/TeamsTableRow';
import { BattingStats } from '../../types';

interface PlayerStatsProps {
  removeBackBtn?: boolean;
}

const fetchPlayer = (key: string, id: string) => async () => {
  const res = await fetch(`http://localhost:3001/${key}/${id}`);
  const data: BattingStats[] = await res.json();
  return data.reduce((acc, each) => {
    const copy: Partial<BattingStats> = { ...each };
    delete copy.year;
    delete copy.player;
    delete copy.id;
    return { ...acc, [each.year]: copy };
  }, {});
};

export const PlayerStats: PlayersStatsSubRow<PlayerStatsProps> = ({
  change_sub_row: changeSubRow,
  selected_player: selectedPlayer,
  removeBackBtn,
}) => {
  const [key, setKey] = useState<{ title: string; path: string }>({
    title: 'Batting Stats',
    path: 'batting',
  });

  const [year, setYear] = useState(2011);

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    'playerStats',
    fetchPlayer(key.path, selectedPlayer?.id ?? ''),
  );

  useEffect(() => {
    refetch();
  }, [key]);

  const buttons: HTMLProps<HTMLButtonElement>[] = [
    {
      value: 'Batting Stats',
      onClick: () => {
        key.path !== 'batting' &&
          setKey({
            title: 'Batting Stats',
            path: 'batting',
          });
      },
    },
    {
      value: 'Bowling Stats',
      onClick: () => {
        key.path !== 'bowling' &&
          setKey({
            title: 'Bowling Stats',
            path: 'bowling',
          });
      },
    },
  ];

  return (
    <SubRowWrapper
      title={`${key.title} of ${selectedPlayer?.value}`}
      onBack={
        removeBackBtn ? undefined : () => changeSubRow?.(1, { noUpdate: true })
      }
      buttons={buttons}
    >
      <LoadingWrapper
        isError={error ? true : false}
        isLoading={isFetching || isLoading}
      >
        <>
          <div className="flex gap-2 place-content-around my-5 items-center">
            {data ? (
              Object.keys(data ?? {}).map((key, i) => (
                <button
                  key={i * 2}
                  className={`border-2 border-indigo-400 hover:bg-indigo-400 hover:text-white px-4 py-1 rounded-lg ${
                    parseInt(key, 10) === year ? 'bg-indigo-400 text-white' : ''
                  }`}
                  onClick={() => {
                    setYear(parseInt(key, 10));
                  }}
                >
                  {key}
                </button>
              ))
            ) : (
              <div>No Data Found</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {data ? (
              <ObjectToDisplay data={data?.[year as keyof typeof data]} />
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </>
      </LoadingWrapper>
    </SubRowWrapper>
  );
};
