import { useState, type ReactElement } from 'react';
import { MedicationSheetListTable } from './medication-sheet-list-table/medication-sheet-list-table';
import {
  Button,
  ButtonGroup,
  WrapperSheet,
} from '../../medicine/screens/medicine.styles';
import {
  type PrescriptionsInterface,
  type MedicationSheetBody,
} from '../../medicine/entities/medication-sheet-body';
import { ViewModal } from '../../common/components/view-modal/view-modal';
import { PrescriptionsTable } from './prescriptions/prescriptions-table';
import { type Employee } from '../../employee/entities/employee';
import { MedicationFilter } from '../medication-sheet-filter/medication-sheet-filter';

interface Props {
  changeScreen: () => void;
  goToMedicineForm: () => void;
  medicationSheets: MedicationSheetBody[];
  refetch: () => Promise<void>;
  goToMedicationSheetForm: (id: number) => void;
  employees: Employee[];
}

export const MedicationSheet = ({
  changeScreen,
  goToMedicineForm,
  medicationSheets,
  refetch,
  goToMedicationSheetForm,
  employees,
}: Props): ReactElement => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionsInterface[]>(
    [],
  );
  const [showPrescriptionsModal, setShowPrescriptionsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedicines = medicationSheets.filter((med) => {
    return med.Resident.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleShowPrescriptions = (
    medicationSheetBody: MedicationSheetBody,
  ): void => {
    const formattedPrescriptions = medicationSheetBody.prescriptions.map(
      (prescription) => {
        const endDate = new Date(prescription.endDate);
        const startDate = new Date(prescription.startDate);

        return {
          ...prescription,
          medicationSheetId: medicationSheetBody.id,
          endDate: endDate.toISOString().split('T')[0],
          startDate: startDate.toISOString().split('T')[0],
        };
      },
    );

    setPrescriptions(formattedPrescriptions);
    setShowPrescriptionsModal(true);
  };

  return (
    <WrapperSheet>
      <div>
        <MedicationFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <MedicationSheetListTable
          medicationSheets={filteredMedicines}
          handleShowPrescriptions={handleShowPrescriptions}
          refetch={refetch}
          goToMedicationSheetForm={goToMedicationSheetForm}
          employees={employees}
        />
      </div>

      <ButtonGroup>
        <Button
          text="Cadastrar Nova Ficha"
          onClick={changeScreen}
          backgroundColor="#45a049"
          hoverBackgroundColor="#3e8f42"
          width="auto"
        />
        <Button
          text="Gerenciar Medicamento"
          onClick={goToMedicineForm}
          backgroundColor="#413dca"
          hoverBackgroundColor="#3a37b3"
          width="auto"
        />
      </ButtonGroup>
      {showPrescriptionsModal && prescriptions != null && (
        <ViewModal
          show={showPrescriptionsModal}
          onHide={() => {
            setShowPrescriptionsModal(false);
          }}
          title="Detalhes das Prescrições"
          children={
            <PrescriptionsTable
              prescriptions={prescriptions}
              setPrescriptions={setPrescriptions}
              refetch={refetch}
            />
          }
        />
      )}
    </WrapperSheet>
  );
};
