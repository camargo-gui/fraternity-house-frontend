import { useEffect, useMemo, useState, type ReactElement } from 'react';
import { noop } from 'lodash';
import { ViewModal } from '../../../common/components/view-modal/view-modal';
import {
  Button,
  GoBackButton,
} from '../../../medicine/screens/medicine.styles';
import { FormInput } from '../../../common/components/form-input/form-input';
import {
  AlignButtons,
  EditButton,
} from '../accompaniment-table/accompaniment-table.styles';
import { EntryButton } from '../../../stock/components/header-buttons/header-buttons.styles';
import { FaArrowLeft, FaEye, FaPlus } from 'react-icons/fa';
import { type Accompaniment } from '../../entities/accompaniment';
import TableComponent from '../../../common/components/table/table';
import { TransparentButton } from '../../../medicine/components/medicine-table.styles';
import { AlignHeaderModal } from './accompaniment-modal.styles';
import moment from 'moment';

interface Props {
  selectedAccompaniment: Accompaniment | null;
  updateAccompaniment: (id: number, newDescription: string) => Promise<void>;
  setSelectedAccompaniment: (accompaniment: Accompaniment) => void;
  accompanimentsByResident: Accompaniment[] | null;
  showModal: boolean;
  handleCloseModal: () => void;
  setSelectedResidentName: (resident: string) => void;
  selectedResidentName: string;
  modalState: 'TABLE' | 'DETAILED';
  editDisabled: boolean;
  setEditDisabled: (state: boolean) => void;
  isLoading: boolean;
  setScreen: (screen: boolean) => void;
  setModalState: (state: 'TABLE' | 'DETAILED') => void;
  type: 'PSYCHOLOGIST' | 'PHYSIOTHERAPIST' | 'NUTRITIONIST';
}

export const AccompanimentModal = ({
  selectedAccompaniment,
  updateAccompaniment,
  setSelectedAccompaniment,
  accompanimentsByResident,
  showModal,
  handleCloseModal,
  setSelectedResidentName,
  selectedResidentName,
  modalState,
  editDisabled,
  setEditDisabled,
  isLoading,
  setScreen,
  setModalState,
  type,
}: Props): ReactElement => {
  const [newDescription, setNewDescription] = useState<string>('');
  const [dateBegin, setDateBegin] = useState<string>('');
  const [accompanimentsFiltered, setAccompanimentsFiltered] = useState<
    Accompaniment[] | null
  >(null);
  const [dateEnd, setDateEnd] = useState<string>('');
  const columnsAccompaniment = [
    {
      header: 'Data de Criação',
      accessor: 'date',
    },
    {
      header: 'Ações',
      accessor: 'actions',
      render: (row: Accompaniment) => (
        <div>
          <TransparentButton
            onClick={() => {
              setModalState('DETAILED');
              setSelectedAccompaniment(row);
            }}
            leadingIcon={<FaEye color="#002b5e" />}
          />
        </div>
      ),
    },
  ];

  const getRespectiveType = (): string => {
    switch (type) {
      case 'PSYCHOLOGIST':
        return 'Psicologo';
      case 'PHYSIOTHERAPIST':
        return 'EducadorFisico';
      default:
        return 'Nutricionista';
    }
  };

  const role = useMemo(() => {
    return localStorage.getItem('role');
  }, []);

  const canCreateOrEditAccompaniment = useMemo(() => {
    return role === getRespectiveType();
  }, [role]);

  const renderDetailedAccompaniments = (): ReactElement => {
    if (!accompanimentsByResident) return <></>;
    return (
      <>
        <AlignButtons>
          <GoBackButton
            onClick={() => {
              setModalState('TABLE');
            }}
            text="Voltar"
            leadingIcon={<FaArrowLeft />}
          />
          {canCreateOrEditAccompaniment && (
            <EditButton
              onClick={() => {
                setEditDisabled(false);
              }}
            >
              Habilitar edição
            </EditButton>
          )}
        </AlignButtons>
        <GoBackButton
          onClick={noop}
          text={`Atualizado em: ${
            (selectedAccompaniment?.updated_at as string) ??
            (selectedAccompaniment?.date as string) ??
            new Date().toString()
          }`}
        />
        <FormInput
          id="resident"
          label="Detalhes do Acompanhamento"
          value={newDescription ?? ''}
          disabled={editDisabled}
          type="textarea"
          height={
            selectedAccompaniment?.description.length ?? 0 > 100
              ? '200px'
              : '100px'
          }
          onChange={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            const target = e.target as HTMLTextAreaElement;
            setNewDescription(target.value);
          }}
        />
        {!editDisabled && (
          <Button
            onClick={() => {
              if (selectedAccompaniment?.id && newDescription) {
                updateAccompaniment(
                  selectedAccompaniment?.id,
                  newDescription,
                ).catch(noop);
              }
            }}
            text="Confirmar edição"
            width="200px"
          />
        )}
      </>
    );
  };

  const renderAccompaniments = (): ReactElement | null => {
    if (!accompanimentsByResident) return null;

    return (
      <>
        <AlignHeaderModal>
          <FormInput
            type="date"
            value={dateBegin}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setDateBegin(target.value);
            }}
            id="dateBegin"
            label="Data Inicial"
          />
          <FormInput
            type="date"
            value={dateEnd.toString().split('T')[0]}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setDateEnd(target.value);
            }}
            minDate={dateBegin}
            id="dateEnd"
            label="Data Final"
          />
          {canCreateOrEditAccompaniment && (
            <EntryButton
              onClick={() => {
                setSelectedResidentName(selectedResidentName);
                setScreen(false);
              }}
              text="Novo acompanhamento"
              width="250px"
              margin="10px 0 10px 0"
              leadingIcon={<FaPlus color="#008425" />}
            />
          )}
        </AlignHeaderModal>
        <TableComponent
          columns={columnsAccompaniment}
          data={accompanimentsFiltered ?? accompanimentsByResident}
        />
      </>
    );
  };

  useEffect(() => {
    setNewDescription(selectedAccompaniment?.description ?? '');
  }, [selectedAccompaniment?.description]);

  useEffect(() => {
    const filteredData = accompanimentsByResident?.filter((accompaniment) => {
      const date = moment(accompaniment.date, 'DD/MM/YYYY').format();
      const initialDate = moment(dateBegin, 'YYYY-MM-DD').format();
      const finalDate = moment(dateEnd, 'YYYY-MM-DD').format();
      return date >= initialDate && date <= finalDate;
    });
    setAccompanimentsFiltered(filteredData ?? []);
  }, [dateBegin, dateEnd]);

  useEffect(() => {
    setAccompanimentsFiltered(accompanimentsByResident);
  }, [accompanimentsByResident]);

  return (
    <ViewModal
      show={showModal}
      onHide={handleCloseModal}
      size="lg"
      isLoading={isLoading}
      title={'Acompanhamentos de ' + selectedResidentName}
    >
      {modalState === 'TABLE'
        ? renderAccompaniments()
        : renderDetailedAccompaniments()}
    </ViewModal>
  );
};
