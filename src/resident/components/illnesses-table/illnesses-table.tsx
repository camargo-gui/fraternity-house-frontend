import { type ReactElement } from 'react';
import { TransparentButton } from '../../../employee/screens/employee.styles';
import { type Illnesses } from '../../entities/illnesses';
import { type Screening } from '../../entities/screening';
import TableComponent from '../../../common/components/table/table';
import { FaTrash } from 'react-icons/fa';

interface Props {
  screening: Screening;
  setScreening: (screening: Screening) => void;
}

export const IlnessesTable = ({
  screening,
  setScreening,
}: Props): ReactElement => {
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
              setScreening({
                ...screening,
                Illnesses: screening.Illnesses.filter((i) => i.id !== row.id),
              });
            }}
            leadingIcon={<FaTrash color="red" />}
          />
        </div>
      ),
    },
  ];

  return (
    <TableComponent
      columns={columns}
      data={screening.Illnesses}
      showEmptyTable={false}
    />
  );
};
