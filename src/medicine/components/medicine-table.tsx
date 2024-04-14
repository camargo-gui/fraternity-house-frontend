import { type ReactElement } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../../common/components/table/table';
import type { Medicine } from '../entities/medicine';
import { TransparentButton } from './medicine-table.styles';

export const MedicineTable = ({
  medicines,
  onEdit,
  onDelete,
}: {
  medicines: Medicine[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ReactElement => {
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Forma farmacêutica',
      accessor: 'PharmacologicalForm.name',
    },
    {
      header: 'Nome farmacológico',
      accessor: 'PharmacologicalName.name',
    },
    {
      header: 'Ações',
      accessor: 'actions',
      render: (row: Medicine) => (
        <div>
          <TransparentButton
            onClick={() => {
              onEdit(row.id);
            }}
            leadingIcon={<FaEdit color="#002b5e" />}
          />

          <TransparentButton
            onClick={() => {
              onDelete(row.id);
            }}
            leadingIcon={<FaTrash color="red" />}
          />
        </div>
      ),
    },
  ];

  return <TableComponent columns={columns} data={medicines} />;
};
