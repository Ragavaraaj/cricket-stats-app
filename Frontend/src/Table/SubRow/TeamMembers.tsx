import React from 'react';
import { Display } from '../../components';
import { TeamMembersSubRow } from '../Row';
import { ButtonsOptions, SubRowWrapper } from '../../wrappers';

export const TeamMembers: TeamMembersSubRow = ({
  all_members: allMembers,
  change_sub_row: changeSubRow,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLFieldSetElement>) => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute('data-id');
    const value = event.currentTarget.getAttribute('data-value');
    changeSubRow?.(1, { id: id ?? '', value: value ?? '' });
  };

  const buttons: ButtonsOptions[] = [
    {
      btnType: 'download',
      data: allMembers ?? [],
      label: 'Download Team Members',
      fileName: 'team_members.csv',
    },
  ];

  return (
    <SubRowWrapper title="team members" buttons={buttons}>
      <div className="grid grid-cols-3 gap-3">
        {allMembers?.map((member, i) => (
          <Display
            key={`__${i}__`}
            id={member.id}
            label={member.isCaption ? 'caption' : 'player'}
            value={member.name}
            onClick={handleClick}
            hover
          />
        ))}
      </div>
    </SubRowWrapper>
  );
};
