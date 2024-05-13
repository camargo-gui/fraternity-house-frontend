import { type ReactElement } from 'react';
import TableComponent from '../../../common/components/table/table';
import { type Accompaniment } from '../../entities/accompaniment';
import { TransparentButton } from '../../../employee/screens/employee.styles';
import { FaEye } from 'react-icons/fa';
import { AccompanimentModal } from '../accompaniment-modal/accompaniment-modal';

interface Props {
  accompaniments: Accompaniment[];
  handleOpenModal: (accompaniment: Accompaniment) => void;
  updateAccompaniment: (id: number, newDescription: string) => Promise<void>;
  accompanimentsByResident: Accompaniment[] | null;
  selectedAccompaniment: Accompaniment | null;
  setSelectedAccompaniment: (accompaniment: Accompaniment) => void;
  showModal: boolean;
  handleCloseModal: () => void;
  setSelectedResidentName: (resident: string) => void;
  selectedResidentName: string;
  modalState: 'TABLE' | 'DETAILED';
  setModalState: (state: 'TABLE' | 'DETAILED') => void;
  editDisabled: boolean;
  setEditDisabled: (state: boolean) => void;
  isLoading: boolean;
  setScreen: (screen: boolean) => void;
  type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST';
}

export const AccompanimentTable = ({
  accompaniments,
  handleOpenModal,
  updateAccompaniment,
  accompanimentsByResident,
  selectedAccompaniment,
  setSelectedAccompaniment,
  showModal,
  handleCloseModal,
  setSelectedResidentName,
  selectedResidentName,
  modalState,
  setModalState,
  editDisabled,
  setEditDisabled,
  isLoading,
  setScreen,
  type,
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
            isLoading={isLoading}
          />
        </div>
      ),
    },
  ];

  return (
    <>
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
        selectedResidentName={selectedResidentName}
        setSelectedResidentName={setSelectedResidentName}
        isLoading={isLoading}
        setScreen={setScreen}
        accompanimentsByResident={accompanimentsByResident}
        type={type}
      />
    </>
  );
};
