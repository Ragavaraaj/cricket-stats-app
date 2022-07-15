import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  ReactNode,
  useState,
} from 'react';
import { ObjectToDisplay } from '../../components';
import { TableRowWrapper } from '../../wrappers';
import { FormattedPlayer } from '../PlayersTable';

interface PlayerTableRowProps {
  data: FormattedPlayer;
  children: ReactNode;
}

export const PlayerTableRow = memo<PlayerTableRowProps>(
  ({ data, children }: PlayerTableRowProps) => {
    const [subRow, setSubRow] = useState<{ show: boolean; row: ReactNode }>({
      show: false,
      row: Children.toArray(children)[0],
    });
    const { id, name, ...gridData } = data;

    const returnChild = (child: ReactNode) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          selected_player: { id: id, value: name },
        });
      }
    };

    return (
      <TableRowWrapper
        showChevronBtn
        onChevronClick={() => {
          setSubRow((prv) => ({
            show: !prv.show,
            row: returnChild(prv.row),
          }));
        }}
      >
        <div className="flex flex-col flex-grow">
          <p className="mb-3 text-2xl font-extrabold">{name}</p>
          <div className="grid grid-cols-2 gap-4 items-center flex-grow">
            <ObjectToDisplay data={gridData} />
          </div>
        </div>
        {subRow.show ? subRow.row : ''}
      </TableRowWrapper>
    );
  },
  (pre, cur) => pre.data === cur.data,
);
