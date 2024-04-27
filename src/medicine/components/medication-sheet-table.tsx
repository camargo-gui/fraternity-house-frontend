import { useContext, useState, type ReactElement } from 'react';
import { FaCheck, FaEdit, FaEye, FaPlusCircle, FaTimes } from 'react-icons/fa';
import TableComponent from '../../common/components/table/table';
import { type MedicationSheetBody } from '../entities/medication-sheet-body';
import { TransparentButton } from './medicine-table.styles';
import { FormInput } from '../../common/components/form-input/form-input';
import { ApplicationContext } from '../../application-context';
import { ObjectionMedicationSheetService } from '../services/objection/objection-medication-sheet-service';

interface Props {
  medicationSheets: MedicationSheetBody[];
  handleShowPrescriptions: (sheet: MedicationSheetBody) => void;
  refetch: () => Promise<void>;
  goToMedicationSheetForm: (residentId: number) => void;
}

export const MedicationSheetTable = ({
  medicationSheets,
  handleShowPrescriptions,
  refetch,
  goToMedicationSheetForm,
}: Props): ReactElement => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedObservation, setEditedObservation] = useState<string>('');
  const { httpClient } = useContext(ApplicationContext);
  const medicationSheetService = new ObjectionMedicationSheetService();

  const handleEdit = (index: number, observations: string): void => {
    setEditIndex(index);
    setEditedObservation(observations);
  };

  const handleCancel = (): void => {
    setEditIndex(null);
    setEditedObservation('');
  };

  const handleSave = async (index: number): Promise<void> => {
    await medicationSheetService.updateMedicationSheet(httpClient, {
      id: index,
      observations: editedObservation,
    });
    await refetch();

    setEditIndex(null);
    setEditedObservation('');
    handleCancel();
  };

  const handleAddPrescription = (residentId: number): void => {
    goToMedicationSheetForm(residentId);
  };

  const columns = [
    {
      header: 'Morador',
      accessor: 'Resident.name',
    },
    {
      header: 'Responsável pela ficha',
      accessor: 'Employee.name',
    },
    {
      header: 'Observações',
      accessor: 'observations',
      render: (row: MedicationSheetBody) =>
        editIndex === row.id ? (
          <FormInput
            value={editedObservation}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setEditedObservation(target.value);
            }}
            id="editedObservation"
            type="text"
          />
        ) : (
          row.observations ?? '—'
        ),
    },
    {
      header: 'Prescrições',
      accessor: 'prescriptions.length',
    },
    {
      header: 'Visualizar/Adicionar',
      accessor: 'actions',
      render: (row: MedicationSheetBody) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TransparentButton
            onClick={() => {
              handleShowPrescriptions(row);
            }}
            leadingIcon={<FaEye color="#002b5e" />}
          />
          <TransparentButton
            onClick={() => {
              handleAddPrescription(Number(row.Resident.id ?? ''));
            }}
            leadingIcon={<FaPlusCircle color="#58a836" />}
          />
        </div>
      ),
    },
    {
      header: 'Editar Ficha',
      accessor: 'actions',
      render: (row: MedicationSheetBody) =>
        row.id === editIndex ? (
          <div>
            <TransparentButton
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () => {
                await handleSave(row.id);
              }}
              leadingIcon={<FaCheck color="green" />}
            />
            <TransparentButton
              onClick={handleCancel}
              leadingIcon={<FaTimes color="red" />}
            />
          </div>
        ) : (
          <TransparentButton
            onClick={() => {
              handleEdit(row.id, row.observations);
            }}
            leadingIcon={<FaEdit color="#55533a" />}
          />
        ),
    },
  ];

  const data = medicationSheets.map((sheet) => ({
    ...sheet,
    observations: sheet.observations === '' ? '—' : sheet.observations,
  }));

  return <TableComponent columns={columns} data={data} />;
};
