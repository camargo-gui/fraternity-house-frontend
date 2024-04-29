import { useContext, useEffect, useState, type ReactElement } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { ApplicationContext } from '../../application-context';
import { ConfirmationModal } from '../../common/components/confirmation-modal/confirmation-modal';
import type { Medicine } from '../entities/medicine';
import { useMedicines } from '../hooks/use-medicine';
import { ObjectionMedicineService } from '../services/objection/objection-medicine-service';
import { MedicationSheetFormScreen } from './forms/medication-sheet-form/medication-sheet-form-screen';
import { MedicineFormScreen } from './forms/medicine-form-screen';
import { MedicineList } from './lists/medicine-list-screen';
import { GoBackButton, MedicineWrapper } from './medicine.styles';
import { type ScreenComponentProps } from '../../common/components/base-screen/screen-enum';
import { useResident } from '../../resident/hooks/use-resident';
import {
  EMPTY_RECORD,
  type MedicationRecord,
} from './forms/medication-sheet-form/medication-sheet-table/medication-sheet-table';
import { Prescription } from '../entities/prescription';
import { ObjectionMedicationSheetService } from '../services/objection/objection-medication-sheet-service';
import { MedicationSheet as MedicationSheetClass } from '../entities/medication-sheet';
import { MedicationSheet } from './lists/medication-sheet-screen';
import { type ResidentDTO } from '../../resident/dto/resident-dto';

enum Screen {
  MedicineRegister = 'MedicineRegister',
  MedicineList = 'MedicineList',
  MedicationSheetList = 'MedicationSheetList',
  MedicationSheetRegister = 'MedicationSheetRegister',
}

export const MedicineContainer = ({
  setSecondaryTitle,
}: ScreenComponentProps): ReactElement => {
  const [screen, setScreen] = useState<Screen>(Screen.MedicationSheetList);

  const [description, setDescription] = useState<string>('');
  const [resident, setResident] = useState<ResidentDTO | null>(null);
  const [selectedResidentId, setSelectedResidentId] = useState<number | null>(
    null,
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const [medicationRecords, setMedicationRecords] = useState<
    MedicationRecord[]
  >([]);
  const [medicationRecord, setMedicationRecord] =
    useState<MedicationRecord>(EMPTY_RECORD);

  const medicineService = new ObjectionMedicineService();
  const medicationService = new ObjectionMedicationSheetService();
  const { httpClient } = useContext(ApplicationContext);

  const {
    medicines,
    pharmacologicalNames,
    pharmacologicalForms,
    medicationSheets,
    refetch,
  } = useMedicines();
  const { residents } = useResident({ httpClient });

  useEffect(() => {
    if (setSecondaryTitle != null) {
      if (
        screen === Screen.MedicineList ||
        screen === Screen.MedicineRegister
      ) {
        setSecondaryTitle('Medicamentos');
      } else {
        setSecondaryTitle('Fichas de Medicamentos');
      }
    }

    return () => {
      if (setSecondaryTitle != null) {
        setSecondaryTitle('');
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  async function handleSubmit(medicine: Medicine): Promise<void> {
    setIsSubmitting(true);

    if (medicine.id !== '') {
      await medicineService.updateMedicine(httpClient, medicine);
    } else {
      await medicineService.createMedicine(httpClient, medicine);
    }

    void refetch();
    setIsSubmitting(false);
  }

  const handleDeleteClick = (id: string): void => {
    setMedicineToDelete(id);
    setShowConfirmationModal(true);
  };

  const confirmDeletion = async (): Promise<void> => {
    if (medicineToDelete !== null) {
      setIsSubmitting(true);
      try {
        await medicineService.deleteMedicine(httpClient, medicineToDelete);
        void refetch();
      } finally {
        setIsSubmitting(false);
      }
    }
    setShowConfirmationModal(false);
    setMedicineToDelete(null);
  };

  function onEdit(medicineId: string): void {
    const selectedMedicine = medicines.find(
      (medicine) => medicine.id === medicineId,
    );

    if (selectedMedicine !== undefined) {
      setEditingMedicine(selectedMedicine);
      setScreen(Screen.MedicineRegister);
    }
  }

  async function handleSubmitMedication(): Promise<void> {
    setSubmitting(true);
    const prescriptions = medicationRecords.map((record) => {
      return new Prescription(
        record.medicineId ?? '',
        record.dosage,
        record.frequency,
        record.startDate,
        record.endDate,
        record.firstHour,
      );
    });

    await medicationService
      .createMedicationSheet(
        httpClient,
        new MedicationSheetClass(
          resident?.id ?? '',
          description,
          prescriptions,
        ),
      )
      .finally(() => {
        setMedicationRecords([]);
        setMedicationRecord(EMPTY_RECORD);
        setDescription('');
        setResident(null);
        if (selectedResidentId !== null) {
          setScreen(Screen.MedicationSheetList);
          setSelectedResidentId(null);
        }
      });

    await refetch().finally(() => {
      setSubmitting(false);
    });
  }

  const renderScreen = (): ReactElement => {
    switch (screen) {
      case Screen.MedicineRegister:
        return (
          <MedicineFormScreen
            changeScreen={() => {
              setEditingMedicine(null);
              setScreen(Screen.MedicineList);
            }}
            pharmacologicalNames={pharmacologicalNames}
            pharmacologicalForms={pharmacologicalForms}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            editingMedicine={editingMedicine}
          />
        );
      case Screen.MedicineList:
        return (
          <MedicineList
            changeScreen={() => {
              setScreen(Screen.MedicineRegister);
            }}
            medicines={medicines}
            onEdit={onEdit}
            onDelete={handleDeleteClick}
          />
        );
      case Screen.MedicationSheetList:
        return (
          <MedicationSheet
            changeScreen={() => {
              setScreen(Screen.MedicationSheetRegister);
            }}
            goToMedicineForm={() => {
              setScreen(Screen.MedicineList);
            }}
            medicationSheets={medicationSheets}
            refetch={refetch}
            goToMedicationSheetForm={(residentId: number) => {
              setSelectedResidentId(residentId);
              setScreen(Screen.MedicationSheetRegister);
            }}
          />
        );
      case Screen.MedicationSheetRegister:
        return (
          <MedicationSheetFormScreen
            changeScreen={() => {
              setSelectedResidentId(null);
              setScreen(Screen.MedicationSheetList);
            }}
            goToMedicineList={() => {
              setScreen(Screen.MedicineList);
            }}
            medicines={medicines}
            residents={residents ?? []}
            medicationRecords={medicationRecords}
            setMedicationRecords={setMedicationRecords}
            medicationRecord={medicationRecord}
            setMedicationRecord={setMedicationRecord}
            handleSubmit={handleSubmitMedication}
            submitting={submitting}
            resident={resident}
            setResident={setResident}
            description={description}
            setDescription={setDescription}
            selectedResidentId={selectedResidentId}
          />
        );
      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <div>
      {screen === Screen.MedicineList || screen === Screen.MedicineRegister ? (
        <GoBackButton
          onClick={() => {
            setEditingMedicine(null);
            setScreen(Screen.MedicationSheetList);
          }}
          text="Voltar para fichas"
          leadingIcon={<FaArrowLeft />}
        />
      ) : null}
      <MedicineWrapper>{renderScreen()}</MedicineWrapper>
      <ConfirmationModal
        show={showConfirmationModal}
        onHide={() => {
          setShowConfirmationModal(false);
        }}
        onConfirm={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          confirmDeletion();
        }}
        title="Confirmar Exclusão"
        body="Tem certeza de que deseja excluir este medicamento?"
      />
    </div>
  );
};
