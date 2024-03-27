import { type ReactElement } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableComponent from '../../common/components/table/table';
import { type Employee } from '../entities/employee';
import { TransparentButton } from '../screens/employee.styles';

export const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
}: {
  employees: Employee[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}): ReactElement => {
  console.log(employees);
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'CPF',
      accessor: 'document',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Telefone',
      accessor: 'phone',
    },
    {
      header: 'Cargo',
      accessor: 'Role.name',
    },
    {
      header: 'Ações',
      accessor: 'actions',
      render: (row: Employee) => (
        <div>
          <TransparentButton
            onClick={() => {
              onEdit(row.document);
            }}
            leadingIcon={<FaEdit color="#002b5e" />}
          />

          <TransparentButton
            onClick={() => {
              onDelete(row.document);
            }}
            leadingIcon={<FaTrash color="red" />}
          />
        </div>
      ),
    },
  ];

  return <TableComponent columns={columns} data={employees} />;
};
