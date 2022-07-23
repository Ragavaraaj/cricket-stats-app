import { useState } from 'react';
import { useQuery } from 'react-query';
import { Display } from '../../components/';
import { MatchesResponse } from '../../types';
import { SubRowWrapper, LoadingWrapper, ButtonsOptions } from '../../wrappers';

interface MatchesProps {
  teamId: number;
  shortName: string;
}

const fetchMatches = (id: number) => async () => {
  const res = await fetch(`http://localhost:3001/matches/${id}`);
  const data: MatchesResponse[] = await res.json();
  return {
    formatted: data.reduce((acc, each) => {
      const copy: Partial<MatchesResponse> = { ...each };
      delete copy.id;
      delete copy.session;
      return {
        ...acc,
        [each.session]: [
          ...(acc?.[each.session as keyof typeof acc] ?? []),
          copy,
        ],
      };
    }, {}),
    original: data.map((each) => {
      const copy: Partial<
        | MatchesResponse & {
            team_a_short_name: string;
            team_b_short_name: string;
          }
      > = {
        ...each,
      };
      delete copy.team_a;
      delete copy.team_b;
      copy['team_a_short_name'] = each.team_a.short_name;
      copy['team_b_short_name'] = each.team_b.short_name;
      return copy;
    }),
  };
};

interface MatchCardProps {
  cardData: MatchesResponse;
  shortName: string;
}

const MatchCard = ({ cardData, shortName }: MatchCardProps) => (
  <fieldset className="border-2 border-slate-200 rounded-xl">
    <legend className="capitalize text-lg font-extrabold px-1.5">
      {cardData.winning_team === shortName ? 'Won' : 'Lost'}
    </legend>
    <div className="flex p-4 gap-5 items-center justify-evenly">
      <Display
        label={cardData.team_a.short_name}
        value={cardData.team_a_scores}
      />
      <p className="text-xl font-extrabold">VS</p>
      <Display
        label={cardData.team_b.short_name}
        value={cardData.team_b_scores}
      />
    </div>
  </fieldset>
);

export const Matches = ({ teamId, shortName }: MatchesProps) => {
  const [year, setYear] = useState(2018);

  const { isLoading, error, data, isFetching } = useQuery(
    'matches',
    fetchMatches(teamId ?? -1),
  );

  const buttons: ButtonsOptions[] = [
    {
      btnType: 'download',
      data: data?.original ?? '',
      label: 'Download All Matches',
      fileName: 'matches.csv',
    },
  ];

  return (
    <SubRowWrapper title="Matches" buttons={buttons}>
      <LoadingWrapper
        isError={error ? true : false}
        isLoading={isFetching || isLoading}
      >
        <>
          <div className="flex place-content-around my-5 items-center">
            {data?.formatted ? (
              Object.keys(data.formatted ?? {}).map((key, i) => (
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
            {(
              data?.formatted?.[year as keyof typeof data.formatted] ?? []
            ).map?.((each) => (
              <MatchCard cardData={each} shortName={shortName} />
            ))}
          </div>
        </>
      </LoadingWrapper>
    </SubRowWrapper>
  );
};
