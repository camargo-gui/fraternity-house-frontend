import { useState, type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import type { Medicine } from '../../entities/medicine';
import type { PharmacologicalName } from '../../entities/pharmacological-name';
import { ObjectionMedicineService } from '../../services/objection/objection-medicine-service';
import { toast } from 'react-toastify';
import { Button, Wrapper } from '../medicine.styles';

interface Props {
  changeScreen: () => void;
  pharmacologicalNames: PharmacologicalName[];
}

export const MedicineFormScreen = ({
  changeScreen,
  pharmacologicalNames,
}: Props): ReactElement => {
  const [medicine, setMedicine] = useState<Medicine>({
    id: '',
    name: '',
    pharmaceuticalForms: '',
    pharmacologicalName: { id: '', name: '' },
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const service = new ObjectionMedicineService();

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await service.createMedicine(medicine);
      toast.success('Medicamento cadastrado com sucesso!');
    } catch (error) {
      toast.error('Falha ao cadastrar medicamento. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      />
      <FormInput
        id="forma-farmaceutica"
        label="Forma farmacêutica"
        placeholder="Forma farmacêutica"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setMedicine({ ...medicine, pharmaceuticalForms: target.value });
        }}
        type="text"
      />
      <FormInput
        label="Nome farmacológico"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setMedicine({
            ...medicine,
            pharmacologicalName: { id: target.value, name: '' },
          });
        }}
        type="select"
        options={pharmacologicalNames.map((pharmaName) => ({
          label: pharmaName.name,
          value: pharmaName.id,
        }))}
        id="nome-farmacologico"
      />
      <Button
        text="Cadastrar"
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          handleSubmit();
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
