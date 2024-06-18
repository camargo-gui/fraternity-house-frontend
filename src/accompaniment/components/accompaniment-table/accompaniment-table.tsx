import { type ReactElement } from 'react';
import TableComponent from '../../../common/components/table/table';
import { type Accompaniment } from '../../entities/accompaniment';
import { TransparentButton } from '../../../employee/screens/employee.styles';
import { FaEye } from 'react-icons/fa';
import { AccompanimentModal } from '../accompaniment-modal/accompaniment-modal';
import { FormInput } from '../../../common/components/form-input/form-input';

interface Props {
  accompaniments: Accompaniment[];
  handleOpenModal: (accompaniment: Accompaniment) => void;
  updateAccompaniment: (id: number, newDescription: string) => Promise<void>;
  accompanimentsByResident: Accompaniment[] | null;
  selectedAccompaniment: Accompaniment | null;
  setSelectedAccompaniment: (accompaniment: Accompaniment) => void;
  showModal: boolean;
  handleCloseModal: () => void;
  setSelectedResident: ({ name, id }: { name: string; id: number }) => void;
  selectedResident: { name: string; id: number };
  modalState: 'TABLE' | 'DETAILED';
  setModalState: (state: 'TABLE' | 'DETAILED') => void;
  editDisabled: boolean;
  setEditDisabled: (state: boolean) => void;
  isLoading: boolean;
  navigate: (id: string) => void;
  type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST';
  handleSearch: (search: string) => void;
}

const getStatusEmoji = (status: string | undefined): string => {
  switch (status) {
    case 'Muito Bom':
      return '😁';
    case 'Bom':
      return '😐';
    case 'Ruim':
      return '😔';
    default:
      return '❓';
  }
};

const getTranslatedStatus = (status: string | undefined): string => {
  switch (status) {
    case 'Very Good':
      return 'Muito Bom';
    case 'Good':
      return 'Bom';
    case 'Bad':
      return 'Ruim';
    default:
      return 'Indefinido';
  }
};

export const AccompanimentTable = ({
  accompaniments,
  handleOpenModal,
  updateAccompaniment,
  accompanimentsByResident,
  selectedAccompaniment,
  setSelectedAccompaniment,
  showModal,
  handleCloseModal,
  type,
  selectedResident,
  modalState,
  setModalState,
  editDisabled,
  setEditDisabled,
  isLoading,
  navigate,
  handleSearch,
}: Props): ReactElement => {
  const columns = [
    {
      header: 'Nome',
      accessor: 'residentName',
    },
    {
      header: 'Visualizar mais',
      accessor: 'actions',
      render: (row: Accompaniment) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <TransparentButton
            onClick={() => {
              handleOpenModal(row);
            }}
            leadingIcon={<FaEye color="#002b5e" />}
            isLoading={isLoading && selectedResident.id === row.id}
            variantSpinner="dark"
          />
        </div>
      ),
    },
    {
      header: 'Status do Morador por Acompanhamento',
      accessor: 'status',
      render: (row: Accompaniment) => {
        let status;

        switch (type) {
          case 'NUTRITIONIST':
            status = getTranslatedStatus(row.nutritionistStatus);
            break;
          case 'PHYSIOTHERAPIST':
            status = getTranslatedStatus(row.physicalStatus);
            break;
          case 'PSYCHOLOGIST':
            status = getTranslatedStatus(row.psychologicalStatus);
            break;
          default:
            status = 'Indefinido';
        }

        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem' }}>{getStatusEmoji(status)}</div>
            <div>{status}</div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <FormInput
        id="search-resident"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          handleSearch(target.value);
        }}
        placeholder="Digite o nome do morador"
        type="search"
      />
      <TableComponent columns={columns} data={accompaniments} />
      <AccompanimentModal
        selectedAccompaniment={selectedAccompaniment}
        editDisabled={editDisabled}
        updateAccompaniment={updateAccompaniment}
        setSelectedAccompaniment={setSelectedAccompaniment}
        setEditDisabled={setEditDisabled}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalState={modalState}
        setModalState={setModalState}
        selectedResident={selectedResident}
        isLoading={isLoading}
        navigate={navigate}
        accompanimentsByResident={accompanimentsByResident}
        type={type}
      />
    </>
  );
};
