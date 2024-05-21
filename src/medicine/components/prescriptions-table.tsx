import React, { useContext, useState, type ReactElement } from 'react';
import TableComponent from '../../common/components/table/table';
import { TransparentButton } from '../../employee/screens/employee.styles';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { FormInput } from '../../common/components/form-input/form-input';
import { type PrescriptionsInterface } from '../entities/medication-sheet-body';
import { ObjectionMedicationSheetService } from '../services/objection/objection-medication-sheet-service';
import { ApplicationContext } from '../../application-context';
import { ConfirmationModal } from '../../common/components/confirmation-modal/confirmation-modal';

interface Props {
  prescriptions: PrescriptionsInterface[];
  setPrescriptions: (prescriptions: PrescriptionsInterface[]) => void;
  refetch: () => Promise<void>;
}

export const PrescriptionsTable = ({
  prescriptions,
  setPrescriptions,
  refetch,
}: Props): ReactElement => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedPrescription, setEditedPrescription] =
    useState<PrescriptionsInterface | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [prescriptionToDelete, setPrescriptionToDelete] = useState<
    number | null
  >(null);
  const [deleting, setDeleting] = useState(false);

  const medicationSheetService = new ObjectionMedicationSheetService();
  const { httpClient } = useContext(ApplicationContext);

  const handleEdit = (prescription: PrescriptionsInterface): void => {
    setEditIndex(prescription.id);
    setEditedPrescription({ ...prescription });
  };

  const handleCancelDelete = (): void => {
    setShowConfirmModal(false);
    setPrescriptionToDelete(null);
  };

  const handleShowDeleteConfirm = (prescriptionId: number): void => {
    setShowConfirmModal(true);
    setPrescriptionToDelete(prescriptionId);
  };

  const handleDelete = async (): Promise<void> => {
    setDeleting(true);
    if (prescriptionToDelete !== null) {
      try {
        await medicationSheetService.deletePrescription(
          httpClient,
          prescriptionToDelete,
        );
        setPrescriptions(
          prescriptions.filter((p) => p.id !== prescriptionToDelete),
        );
        setPrescriptionToDelete(null);
        await refetch();
      } catch (error) {
        console.error('Failed to delete prescription:', error);
      } finally {
        setDeleting(false);
        setShowConfirmModal(false);
      }
    }
  };

  const handleCancel = (): void => {
    setEditIndex(null);
    setEditedPrescription(null);
  };

  const handleSave = async (): Promise<void> => {
    if (editedPrescription != null) {
      try {
        await medicationSheetService.updatePrescription(httpClient, {
          dosage: editedPrescription.dosage,
          endDate: editedPrescription.endDate,
          firstTime: editedPrescription.firstTime,
          frequency: editedPrescription.frequency,
          id: editedPrescription.id,
          startDate: editedPrescription.startDate,
        });

        const updatedPrescriptions = prescriptions.map((prescription) => {
          if (prescription.id === editedPrescription.id) {
            return editedPrescription;
          }
          return prescription;
        });

        await refetch();
        setPrescriptions(updatedPrescriptions);
        setEditIndex(null);
        setEditedPrescription(null);
      } catch (error) {
        console.error('Failed to update prescription:', error);
      }
    }
  };

  const handleChange = (
    field: keyof PrescriptionsInterface,
    value: string,
  ): void => {
    if (editedPrescription != null) {
      setEditedPrescription({ ...editedPrescription, [field]: value });
    }
  };

  const columns = [
    {
      header: 'Medicamento',
      accessor: 'Medicine.name',
    },
    {
      header: 'Forma farmacêutica',
      accessor: 'Medicine.PharmacologicalForm.name',
    },
    {
      header: 'Nome farmacológico',
      accessor: 'Medicine.PharmacologicalName.name',
    },
    {
      header: 'Dosagem',
      accessor: 'dosage',
      render: (row: PrescriptionsInterface) =>
        editIndex === row.id ? (
          <FormInput
            value={editedPrescription?.dosage ?? ''}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleChange('dosage', target.value);
            }}
            type="text"
            id="dosage"
          />
        ) : (
          <>{row.dosage.toString()}</>
        ),
    },
    {
      header: 'Primeira dose',
      accessor: 'firstTime',
      render: (row: PrescriptionsInterface) =>
        editIndex === row.id ? (
          <FormInput
            value={editedPrescription?.firstTime ?? ''}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleChange('firstTime', target.value);
            }}
            type="time"
            id="firstTime"
          />
        ) : (
          <>{row.firstTime.toString()}</>
        ),
    },
    {
      header: 'Frequência',
      accessor: 'frequency',
      render: (row: PrescriptionsInterface) =>
        editIndex === row.id ? (
          <FormInput
            value={editedPrescription?.frequency ?? ''}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (/^\d*$/.test(target.value)) {
                handleChange('frequency', target.value);
              }
            }}
            type="number"
            id="frequency"
          />
        ) : (
          <>{`de ${row.frequency} em ${row.frequency}h`}</>
        ),
    },
    {
      header: 'Data de início',
      accessor: 'startDate',
      render: (row: PrescriptionsInterface) =>
        editIndex === row.id ? (
          <FormInput
            value={editedPrescription?.startDate}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleChange('startDate', target.value);
            }}
            type="date"
            id="startDate"
            minDate={new Date().toISOString().split('T')[0]}
          />
        ) : (
          <>{`${row?.startDate.split('-')[2]}/${row?.startDate.split('-')[1]}/${row?.startDate.split('-')[0]}`}</>
        ),
    },
    {
      header: 'Data de término',
      accessor: 'endDate',
      render: (row: PrescriptionsInterface) =>
        editIndex === row.id ? (
          <FormInput
            value={editedPrescription?.endDate}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              handleChange('endDate', target.value);
            }}
            type="date"
            id="endDate"
            minDate={new Date().toISOString().split('T')[0]}
          />
        ) : (
          <>{`${row?.endDate.split('-')[2]}/${row?.endDate.split('-')[1]}/${row?.endDate.split('-')[0]}`}</>
        ),
    },
    {
      header: 'Ações',
      accessor: 'actions',
      render: (row: PrescriptionsInterface) => {
        if (editIndex === row.id) {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TransparentButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handleSave}
                leadingIcon={<FaCheck color="green" />}
              />
              <TransparentButton
                onClick={handleCancel}
                leadingIcon={<FaTimes color="red" />}
              />
            </div>
          );
        }
        return (
          <div>
            <TransparentButton
              onClick={() => {
                handleEdit(row);
              }}
              leadingIcon={<FaEdit color="#002b5e" />}
            />
            <TransparentButton
              onClick={() => {
                handleShowDeleteConfirm(row.id);
              }}
              leadingIcon={<FaTrash color="red" />}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <TableComponent
        columns={columns}
        data={prescriptions}
        showEmptyTable={true}
      />
      <ConfirmationModal
        show={showConfirmModal}
        onHide={handleCancelDelete}
        title="Deletar Prescrição"
        body="Tem certeza que deseja deletar essa prescrição?"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onConfirm={handleDelete}
        isLoading={deleting}
      />
    </>
  );
};
