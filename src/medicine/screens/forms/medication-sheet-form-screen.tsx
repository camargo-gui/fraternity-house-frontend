import { type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import type { Medicine } from '../../entities/medicine';
import { Button, ButtonGroup, Wrapper } from '../medicine.styles';

interface Props {
  changeScreen: () => void;
  goToMedicineList: () => void;
  medicines: Medicine[];
}

export const MedicationSheetFormScreen = ({
  changeScreen,
  goToMedicineList,
  medicines,
}: Props): ReactElement => {
  return (
    <Wrapper>
      <FormInput
        id="medicine"
        label="Medicamento"
        onChange={() => {}}
        type="select"
        options={medicines.map((medicine) => ({
          label: medicine.name,
          value: medicine.id,
        }))}
      />
      <FormInput
        id="resident"
        label="Morador"
        placeholder="Morador"
        onChange={() => {}}
        type="select"
        options={[
          { label: 'Opção 1', value: '1' },
          { label: 'Opção 2', value: '2' },
        ]}
      />
      <FormInput
        id="dosage"
        label="Dosagem"
        placeholder="Dosagem"
        onChange={() => {}}
        type="text"
      />
      <FormInput
        id="first-hour"
        label="Primeiro horário"
        type="time"
        placeholder="Primeiro horário"
        onChange={() => {}}
      />
      <FormInput
        id="frequency"
        label="Frequência"
        placeholder="Frequência"
        onChange={() => {}}
        type="text"
      />
      <FormInput
        id="period"
        label="Periodo"
        placeholder="Periodo"
        onChange={() => {}}
        type="text"
      />
      <FormInput
        id="medical-prescription"
        label="Informações médicas adicionais"
        placeholder="Informações médicas adicionais"
        onChange={() => {}}
        type="textarea"
      />
      <ButtonGroup>
        <div>
          <Button text="Cadastrar Ficha" onClick={() => {}} width="auto" />
          <Button
            text="Listar Fichas"
            onClick={changeScreen}
            backgroundColor="#6c757d"
            hoverBackgroundColor="#595f64"
            width="auto"
          />
        </div>
        <div className="ms-auto">
          <Button
            text="Gerenciar Medicamento"
            onClick={goToMedicineList}
            backgroundColor="#413dca"
            hoverBackgroundColor="#3a37b3"
            width="auto"
          />
        </div>
      </ButtonGroup>
    </Wrapper>
  );
};
