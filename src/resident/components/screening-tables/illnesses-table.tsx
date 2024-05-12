import { type ReactElement } from 'react';
import { TransparentButton } from '../../../employee/screens/employee.styles';
import { type Illnesses } from '../../entities/illnesses';
import TableComponent from '../../../common/components/table/table';
import { FaTrash } from 'react-icons/fa';
import { type ScreeningProps } from '../../screens/resident-screening/tabs/types';

export const IlnessesTable = ({
  enableEdit,
  currentScreening,
  setCurrentScreening,
}: ScreeningProps): ReactElement => {
  const columns = [
    {
      header: 'Enfermidade',
      accessor: 'name',
    },
    {
      header: 'Remover',
      accessor: 'actions',
      render: (row: Illnesses) => (
        <div>
          <TransparentButton
            onClick={() => {
              setCurrentScreening({
                ...currentScreening,
                Illnesses: currentScreening.Illnesses.filter(
                  (i) => i.id !== row.id,
                ),
              });
            }}
            isDisabled={!enableEdit}
            leadingIcon={<FaTrash color={enableEdit ? 'red' : '#FFCCCC'} />}
          />
        </div>
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={currentScreening.Illnesses}
      showEmptyTable={false}
    />
  );
};
