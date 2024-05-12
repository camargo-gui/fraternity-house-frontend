import { type ReactElement } from 'react';
import { TransparentButton } from '../../../employee/screens/employee.styles';
import TableComponent from '../../../common/components/table/table';
import { FaTrash } from 'react-icons/fa';
import { type SpecialNeeds } from '../../entities/special-needs';
import { type ScreeningProps } from '../../screens/resident-screening/tabs/types';

export const SpecialNeedsTable = ({
  enableEdit,
  currentScreening,
  setCurrentScreening,
}: ScreeningProps): ReactElement => {
  const columns = [
    {
      header: 'Necessidade Especial',
      accessor: 'name',
    },
    {
      header: 'Remover',
      accessor: 'actions',
      render: (row: SpecialNeeds) => (
        <div>
          <TransparentButton
            isDisabled={!enableEdit}
            onClick={() => {
              setCurrentScreening({
                ...currentScreening,
                SpecialNeeds: currentScreening.SpecialNeeds.filter(
                  (i) => i.id !== row.id,
                ),
              });
            }}
            leadingIcon={<FaTrash color={enableEdit ? 'red' : '#FFCCCC'} />}
          />
        </div>
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={currentScreening.SpecialNeeds}
      showEmptyTable={false}
    />
  );
};
