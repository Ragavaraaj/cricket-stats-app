import {
  ReactNode,
  useState,
  FunctionComponent,
  Children,
  isValidElement,
  cloneElement,
} from 'react';
import { ChevronBtn, ObjectToDisplay } from '../../components';
import { Member, Teams } from '../../types';
import { TableRowWrapper } from '../../wrappers';
import { Matches } from '../SubRow';

interface TeamsTableRowProps {
  data: Teams;
  children: [ReactNode, ReactNode, ReactNode];
}

type ChangeSubRowType = (
  to: number,
  options?: { [key: string]: string | boolean },
) => void;

export type TeamMembersSubRow<T = {}> = FunctionComponent<
  T & {
    change_sub_row?: ChangeSubRowType;
    all_members?: Member[];
  }
>;

export type PlayersDetailsSubRow<T = {}> = FunctionComponent<
  T & {
    change_sub_row?: ChangeSubRowType;
    selected_player?: { id: string; value: string };
  }
>;

export type PlayersStatsSubRow<T = {}> = FunctionComponent<
  T & {
    change_sub_row?: ChangeSubRowType;
    selected_player?: { id: string; value: string };
  }
>;

export const TeamsTableRow = ({ data, children }: TeamsTableRowProps) => {
  const { short_name: shortName, members, id, ...gridData } = data;

  const [openSubRow, setOpenSubRow] = useState(false);
  const [openMatches, setOpenMatches] = useState(false);
  const [selectSubRow, setSelectSubRow] = useState(0);
  const [player, setPlayer] = useState({});

  const changeSubRow: ChangeSubRowType = (to, options) => {
    setSelectSubRow(to);
    if (to === 1 && !(options?.noUpdate ?? false))
      setPlayer({ id: options?.id, value: options?.value });
  };

  const childrenWithProps = Children.map<ReactNode, ReactNode>(
    children,
    (child, index) => {
      // Checking isValidElement is the safe way and avoids a typescript
      // error too.
      if (isValidElement(child)) {
        switch (index) {
          case 0: {
            return cloneElement(child, {
              all_members: members,
              change_sub_row: changeSubRow,
            });
          }
          case 1: {
            return cloneElement(child, {
              change_sub_row: changeSubRow,
              selected_player: player,
            });
          }
          case 2: {
            return cloneElement(child, {
              change_sub_row: changeSubRow,
              selected_player: player,
            });
          }
        }
      }
      return child;
    },
  );

  const renderSubRow = () => {
    if (openSubRow) {
      return childrenWithProps?.[selectSubRow];
    }
  };

  const handleChevronClick = () => {
    setOpenSubRow((prv) => !prv);
  };

  return (
    <TableRowWrapper
      shortName={shortName}
      showChevronBtn={members?.length > 0 ? true : false}
      onChevronClick={handleChevronClick}
    >
      <div className="grid grid-cols-2 gap-4 items-center flex-grow">
        <ObjectToDisplay data={gridData} />
        <ChevronBtn
          onClick={() => setOpenMatches((prv) => !prv)}
          label="Matches"
        />
      </div>
      {renderSubRow()}
      {openMatches ? <Matches teamId={id} shortName={shortName} /> : ''}
    </TableRowWrapper>
  );
};
