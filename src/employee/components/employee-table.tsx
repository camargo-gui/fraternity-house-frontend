import { useState, type ReactElement } from 'react';
import { FaEdit, FaTrash, FaUserLock } from 'react-icons/fa';
import TableComponent from '../../common/components/table/table';
import { type Employee } from '../entities/employee';
import { TransparentButton } from '../screens/employee.styles';
import { formatCpf, formatPhone } from '../../utils/format-special-characters';
import { ConfirmationModal } from '../../common/components/confirmation-modal/confirmation-modal';

export const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  shouldCanSeeButton,
}: {
  employees: Employee[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
  shouldCanSeeButton: boolean;
}): ReactElement => {
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
      render: (row: Employee) =>
        shouldCanSeeButton ? (
          <div>
            <TransparentButton
              onClick={() => {
                onEdit(row.document);
              }}
              leadingIcon={<FaEdit color="#002b5e" />}
            />

            {row.name !== localStorage.getItem('name') && (
              <TransparentButton
                onClick={() => {
                  showDeleteModal(row.document);
                }}
                leadingIcon={<FaTrash color="red" />}
              />
            )}
          </div>
        ) : (
          <div>
            <FaUserLock color="gray" />
          </div>
        ),
    },
  ];

  const [documentToDelete, setDocumentToDelete] = useState<string>('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showDeleteModal = (document: string): void => {
    setDocumentToDelete(document);
    setShowConfirmationModal(true);
  };

  const renderDeleteModal = (): ReactElement => {
    return (
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => {
          setShowConfirmationModal(false);
        }}
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, @typescript-eslint/no-misused-promises
        onConfirm={async () => {
          await onDelete(documentToDelete);
          setShowConfirmationModal(false);
        }}
        title="Confirmar Exclusão"
        body="Tem certeza de que deseja excluir este funcionário?"
      />
    );
  };

  return (
    <>
      <TableComponent
        columns={columns}
        data={employees.map((employee) => ({
          ...employee,
          document: formatCpf(employee.document),
          phone: formatPhone(employee.phone),
        }))}
      />
      {renderDeleteModal()}
    </>
  );
};
