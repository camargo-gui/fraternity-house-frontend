/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import type { Medicine } from '../../entities/medicine';
import type { PharmacologicalName } from '../../entities/pharmacological-name';
import { Button, Wrapper } from '../medicine.styles';

interface Props {
  changeScreen: () => void;
  pharmacologicalNames: PharmacologicalName[];
  handleSubmit: (medicine: Medicine) => Promise<void>;
  isSubmitting: boolean;
  editingMedicine: Medicine | null;
}

export const MedicineFormScreen = ({
  changeScreen,
  pharmacologicalNames,
  handleSubmit,
  isSubmitting,
  editingMedicine,
}: Props): ReactElement => {
  const [medicine, setMedicine] = useState<Medicine>(
    editingMedicine ?? {
      id: '',
      name: '',
      pharmaceutical_forms: '',
      PharmacologicalName: { id: '', name: '' },
    },
  );

  return (
    <Wrapper>
      <FormInput
        id="nome"
        label="Nome"
        placeholder="Nome"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setMedicine({ ...medicine, name: target.value });
        }}
        type="text"
        value={medicine.name}
      />
      <FormInput
        id="forma-farmaceutica"
        label="Forma farmacêutica"
        placeholder="Forma farmacêutica"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setMedicine({ ...medicine, pharmaceutical_forms: target.value });
        }}
        type="text"
        value={medicine.pharmaceutical_forms}
      />
      <FormInput
        label="Nome farmacológico"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setMedicine({
            ...medicine,
            PharmacologicalName: { id: target.value, name: '' },
          });
        }}
        value={medicine.PharmacologicalName.id}
        type="select"
        options={pharmacologicalNames.map((pharmaName) => ({
          label: pharmaName.name,
          value: pharmaName.id,
        }))}
        id="nome-farmacologico"
      />
      <Button
        text={editingMedicine !== null ? 'Atualizar' : 'Cadastrar'}
        onClick={async () => {
          await handleSubmit(medicine);
        }}
        isLoading={isSubmitting}
      />
      <Button
        text="Lista de Medicamentos"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="auto"
      />
    </Wrapper>
  );
};
