import { ChangeEvent, useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Player } from '../types';
import { TableWrapper } from '../wrappers/TableWrapper';
import { PlayerTableRow } from './Row';
import { PlayerStats } from './SubRow';
import { debounce } from 'lodash';

export type FormattedPlayer = Partial<
  Player & { is_caption_for: string; is_player_for: string }
>;

const fetchTeams = (filter: string) => async () => {
  let URL = 'http://localhost:3001/player';
  if (filter) {
    URL += `?filter=${filter}`;
  }
  const res = await fetch(URL);
  const players: Player[] = await res.json();
  return players.map((player) => {
    const copy: FormattedPlayer = { ...player };
    delete copy.isCaption;
    delete copy.team;
    if (player.team)
      copy[player.isCaption ? 'is_caption_for' : 'is_player_for'] =
        player.team.name;
    return copy;
  });
};

export const PlayersTable = () => {
  const [value, setValue] = useState('');

  const {
    isLoading,
    error,
    data: tableData,
    isFetching,
    refetch,
  } = useQuery('allPlayerData', fetchTeams(value));

  const refetchDebounce = useCallback(debounce(refetch, 500), []);

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    refetchDebounce();
  };

  return (
    <div className="flex flex-col">
      <input
        className="py-3 px-4 my-5 mx-16 border-indigo-400 border-2 rounded-lg focus:border-indigo-600"
        type="text"
        value={value}
        placeholder={`Search ("players" or "cap" to filter assigned players or team short names)`}
        onChange={handleClick}
      />
      <TableWrapper
        isError={error ? true : false}
        isLoading={isFetching || isLoading}
        error={error}
      >
        {tableData?.map((eachRow: any, i: number) => (
          <PlayerTableRow data={eachRow} key={i * 2}>
            <PlayerStats removeBackBtn />
          </PlayerTableRow>
        ))}
      </TableWrapper>
    </div>
  );
};
