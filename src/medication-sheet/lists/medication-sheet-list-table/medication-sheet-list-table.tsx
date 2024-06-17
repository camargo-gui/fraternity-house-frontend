import { useContext, useState, type ReactElement } from 'react';
import { FaCheck, FaEdit, FaEye, FaPlusCircle, FaTimes } from 'react-icons/fa';
import TableComponent from '../../../common/components/table/table';
import { type MedicationSheetBody } from '../../../medicine/entities/medication-sheet-body';
import { TransparentButton } from '../../../medicine/components/medicine-table.styles';
import { FormInput } from '../../../common/components/form-input/form-input';
import { ApplicationContext } from '../../../application-context';
import { ObjectionMedicationSheetService } from '../../../medicine/services/objection/objection-medication-sheet-service';
import { type Employee } from '../../../employee/entities/employee';
import { formatCpf } from '../../../utils/format-special-characters';

interface Props {
  medicationSheets: MedicationSheetBody[];
  handleShowPrescriptions: (sheet: MedicationSheetBody) => void;
  refetch: () => Promise<void>;
  goToMedicationSheetForm: (residentId: number) => void;
  employees: Employee[];
}

export const MedicationSheetListTable = ({
  medicationSheets,
  handleShowPrescriptions,
  refetch,
  goToMedicationSheetForm,
  employees,
}: Props): ReactElement => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedObservation, setEditedObservation] = useState<string>('');
  const [editedResponsible, setEditedResponsible] = useState<string>('');
  const { httpClient } = useContext(ApplicationContext);
  const medicationSheetService = new ObjectionMedicationSheetService();

  const employeesOptions = employees.map((e) => ({
    value: e.id ?? '',
    label: e.name,
  }));

  const handleEdit = (
    index: number,
    observations: string,
    responsibleId: string,
  ): void => {
    setEditIndex(index);
    setEditedObservation(observations);
    setEditedResponsible(responsibleId);
  };

  const handleCancel = (): void => {
    setEditIndex(null);
    setEditedObservation('');
    setEditedResponsible('');
  };

  const handleSave = async (index: number): Promise<void> => {
    await medicationSheetService.updateMedicationSheet(httpClient, {
      id: index,
      observations: editedObservation,
      responsibleId: Number(editedResponsible),
    });
    await refetch();

    setEditIndex(null);
    setEditedObservation('');
    setEditedResponsible('');
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
      render: (row: MedicationSheetBody) =>
        editIndex === row.id ? (
          <FormInput
            value={editedResponsible}
            id="edit-responsible"
            type="select"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setEditedResponsible(target.value);
            }}
            options={employeesOptions}
          />
        ) : (
          row.Employee.name
        ),
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
      render: (row: MedicationSheetBody) => {
        return row.id === editIndex ? (
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
              handleEdit(row.id, row.observations, row.Employee.id ?? '');
            }}
            leadingIcon={<FaEdit color="#55533a" />}
          />
        );
      },
    },
  ];

  const data = medicationSheets.map((sheet) => ({
    ...sheet,
    Resident: {
      ...sheet.Resident,
      name: `${sheet.Resident.name} (${formatCpf(sheet.Resident.cpf)})`,
    },
    observations: sheet.observations === '' ? '—' : sheet.observations,
  }));

  return <TableComponent columns={columns} data={data} />;
};
