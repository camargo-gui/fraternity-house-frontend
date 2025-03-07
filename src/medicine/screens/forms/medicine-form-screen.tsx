/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import type { Medicine } from '../../entities/medicine';
import type { PharmacologicalName } from '../../entities/pharmacological-name';
import { Button, Wrapper } from '../medicine.styles';
import { type PharmacologicalForm } from '../../entities/pharmacological-form';

interface Props {
  changeScreen: () => void;
  pharmacologicalNames: PharmacologicalName[];
  pharmacologicalForms: PharmacologicalForm[];
  handleSubmit: (medicine: Medicine) => Promise<void>;
  isSubmitting: boolean;
  editingMedicine: Medicine | null;
}

export const MedicineFormScreen = ({
  changeScreen,
  pharmacologicalNames,
  pharmacologicalForms,
  handleSubmit,
  isSubmitting,
  editingMedicine,
}: Props): ReactElement => {
  const [medicine, setMedicine] = useState<Medicine>(
    editingMedicine ?? {
      id: '',
      name: '',
      PharmacologicalForm: { id: '', name: '' },
      PharmacologicalName: { id: '', name: '' },
    },
  );
  const [errors, setErrors] = useState({
    name: '',
    PharmacologicalForm: '',
    PharmacologicalName: '',
  });

  function validateFields(): boolean {
    let isValid = true;
    const newErrors = {
      name: '',
      PharmacologicalForm: '',
      PharmacologicalName: '',
    };

    if (medicine.name.length === 0) {
      newErrors.name = 'O nome do medicamento é obrigatório.';
      isValid = false;
    }

    if (medicine.PharmacologicalForm.id.length === 0) {
      newErrors.PharmacologicalForm = 'A forma farmacêutica é obrigatória.';
      isValid = false;
    }

    if (medicine.PharmacologicalName.id.length === 0) {
      newErrors.PharmacologicalName = 'O nome farmacológico é obrigatório.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  return (
    <Wrapper>
      <div>
        <FormInput
          id="nome"
          label="Nome"
          placeholder="Nome"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setMedicine({ ...medicine, name: target.value });
            setErrors({ ...errors, name: '' });
          }}
          type="text"
          value={medicine.name}
          errorMessage={errors.name}
          required
        />
        <FormInput
          id="forma-farmaceutica"
          label="Forma farmacêutica"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setMedicine({
              ...medicine,
              PharmacologicalForm: { id: target.value, name: '' },
            });
            setErrors({
              ...errors,
              PharmacologicalForm: '',
            });
          }}
          type="select"
          options={pharmacologicalForms.map((pharmaForm) => ({
            label: pharmaForm.name,
            value: pharmaForm.id,
          }))}
          value={medicine.PharmacologicalForm.id}
          errorMessage={errors.PharmacologicalForm}
          required
        />
        <FormInput
          label="Nome farmacológico"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setMedicine({
              ...medicine,
              PharmacologicalName: { id: target.value, name: '' },
            });
            setErrors({ ...errors, PharmacologicalName: '' });
          }}
          value={medicine.PharmacologicalName.id}
          type="select"
          options={pharmacologicalNames.map((pharmaName) => ({
            label: pharmaName.name,
            value: pharmaName.id,
          }))}
          id="nome-farmacologico"
          errorMessage={errors.PharmacologicalName}
          required
        />
      </div>
      <div>
        <Button
          text={editingMedicine !== null ? 'Atualizar' : 'Cadastrar'}
          onClick={async () => {
            if (validateFields()) {
              setMedicine({
                id: '',
                name: '',
                PharmacologicalForm: { id: '', name: '' },
                PharmacologicalName: { id: '', name: '' },
              });
              await handleSubmit(medicine);
            }
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
      </div>
    </Wrapper>
  );
};
