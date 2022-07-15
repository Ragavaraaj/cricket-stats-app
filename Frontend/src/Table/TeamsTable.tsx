import { useState } from 'react';
import { useQuery } from 'react-query';

import { TableWrapper } from '../wrappers';
import { TeamMembers, PlayerStats, PlayerDetails } from './SubRow';
import { TeamsTableRow } from './Row';

const fetchTeams = async () => {
  const res = await fetch('http://localhost:3001/team');
  return res.json();
};

export const TeamsTable = () => {
  const [ID, setID] = useState(0);

  const {
    isLoading,
    error,
    data: tableData,
    isFetching,
  } = useQuery('teamsData', fetchTeams);

  return (
    <TableWrapper
      isError={error ? true : false}
      isLoading={isFetching || isLoading}
      error={error}
    >
      {tableData?.map((eachRow: any, i: number) => (
        <TeamsTableRow key={i * 2} data={eachRow}>
          <TeamMembers />
          <PlayerDetails />
          <PlayerStats />
        </TeamsTableRow>
      ))}
    </TableWrapper>
  );
};
