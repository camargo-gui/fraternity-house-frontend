import { useContext, useEffect, useState, type ReactElement } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ApplicationContext } from '../../application-context';
import { ConfirmationModal } from '../../common/components/confirmation-modal/confirmation-modal';
import type { RootState } from '../../redux/store/store';
import type { Medicine } from '../entities/medicine';
import { useMedicines } from '../hooks/use-medicine';
import { ObjectionMedicineService } from '../services/objection/objection-medicine-service';
import { MedicationSheetFormScreen } from './forms/medication-sheet-form-screen';
import { MedicineFormScreen } from './forms/medicine-form-screen';
import { MedicationSheet } from './lists/medication-sheet-screen';
import { MedicineList } from './lists/medicine-list-screen';
import { GoBackButton } from './medicine.styles';
import LoadingSpinner from '../../common/components/loading-spinner/loading-spinner';

enum Screen {
  MedicineRegister = 'MedicineRegister',
  MedicineList = 'MedicineList',
  MedicationSheetList = 'MedicationSheetList',
  MedicationSheetRegister = 'MedicationSheetRegister',
}

export const MedicineContainer = (): ReactElement => {
  const [screen, setScreen] = useState<Screen>(Screen.MedicationSheetList);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [medicineToDelete, setMedicineToDelete] = useState<string | null>(null);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const medicineService = new ObjectionMedicineService();
  const { httpClient } = useContext(ApplicationContext);
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  const { medicines, pharmacologicalNames, refetch } = useMedicines();

  useEffect(() => {
    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  async function handleSubmit(medicine: Medicine): Promise<void> {
    setIsSubmitting(true);

    if (medicine.id !== '') {
      await medicineService.updateMedicine(httpClient, medicine);
    } else {
      await medicineService.createMedicine(httpClient, medicine);
    }

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
          />
        );
      case Screen.MedicationSheetRegister:
        return (
          <MedicationSheetFormScreen
            changeScreen={() => {
              setScreen(Screen.MedicationSheetList);
            }}
            goToMedicineList={() => {
              setScreen(Screen.MedicineList);
            }}
            medicines={medicines}
          />
        );
      default:
        return <div>Unknown screen</div>;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
      {renderScreen()}
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
