import { type ReactElement } from 'react';
import { MedicationSheetTable } from '../../components/medication-sheet-table';
import { Button, ButtonGroup, Wrapper } from '../medicine.styles';

interface Props {
  changeScreen: () => void;
  goToMedicineForm: () => void;
}

export const MedicationSheet = ({
  changeScreen,
  goToMedicineForm,
}: Props): ReactElement => {
  return (
    <Wrapper>
      <MedicationSheetTable />
      <ButtonGroup>
        <Button
          text="Cadastra Nova Ficha"
          onClick={changeScreen}
          backgroundColor="#6c757d"
          hoverBackgroundColor="#595f64"
          width="auto"
        />
        <div className="ms-auto">
          <Button
            text="Gerenciar Medicamento"
            onClick={goToMedicineForm}
            backgroundColor="#413dca"
            hoverBackgroundColor="#3a37b3"
            width="auto"
          />
        </div>
      </ButtonGroup>
    </Wrapper>
  );
};
