import { useState, type ReactElement } from 'react';
import { MedicationSheetTable } from '../../components/medication-sheet-table';
import { Button, ButtonGroup, WrapperSheet } from '../medicine.styles';
import {
  type PrescriptionsInterface,
  type MedicationSheetBody,
} from '../../entities/medication-sheet-body';
import { ViewModal } from '../../../common/components/view-modal/view-modal';
import { PrescriptionsTable } from '../../components/prescriptions-table';
import { MedicationFilter } from '../medication-filter/medication-filter';

interface Props {
  changeScreen: () => void;
  goToMedicineForm: () => void;
  medicationSheets: MedicationSheetBody[];
  refetch: () => Promise<void>;
}

export const MedicationSheet = ({
  changeScreen,
  goToMedicineForm,
  medicationSheets,
  refetch,
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
        return {
          ...prescription,
          medicationSheetId: medicationSheetBody.id,
          endDate: new Date(prescription.endDate).toLocaleDateString(),
          startDate: new Date(prescription.startDate).toLocaleDateString(),
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
        <MedicationSheetTable
          medicationSheets={filteredMedicines}
          handleShowPrescriptions={handleShowPrescriptions}
        />
      </div>

      <ButtonGroup>
        <Button
          text="Cadastrar Nova Ficha"
          onClick={changeScreen}
          backgroundColor="#6c757d"
          hoverBackgroundColor="#595f64"
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
