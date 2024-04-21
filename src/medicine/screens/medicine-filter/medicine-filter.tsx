import { type ReactElement } from 'react';
import { FormInput } from '../../../common/components/form-input/form-input';
import { RowWrapper, SelectContainer } from './medicine-filter.styles';
import { type Medicine } from '../../entities/medicine';

interface Props {
  medicines: Medicine[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedPharmacologicalName: string;
  setSelectedPharmacologicalName: (value: string) => void;
  selectedForm: string;
  setSelectedForm: (value: string) => void;
}

export const MedicineFilter = ({
  medicines,
  searchTerm,
  setSearchTerm,
  selectedPharmacologicalName,
  setSelectedPharmacologicalName,
  selectedForm,
  setSelectedForm,
}: Props): ReactElement => {
  return (
    <RowWrapper>
      <div>
        <FormInput
          id="search"
          label=""
          type="search"
          placeholder="Digite o nome do medicamento"
          value={searchTerm}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setSearchTerm(target.value);
          }}
        />
      </div>
      <SelectContainer>
        <FormInput
          id="pharmacologicalName"
          label="Nome Farmacológico"
          type="select"
          options={medicines.map((medicine) => {
            return {
              label: medicine.PharmacologicalName.name,
              value: medicine.PharmacologicalName.name,
            };
          })}
          placeholder={
            selectedPharmacologicalName === '' ? '' : 'Limpar Filtro'
          }
          value={selectedPharmacologicalName}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setSelectedPharmacologicalName(target.value);
          }}
        />

        <FormInput
          id="pharmacologicalForm"
          label="Forma Farmacêutica"
          type="select"
          options={medicines.map((medicine) => {
            return {
              label: medicine.PharmacologicalForm.name,
              value: medicine.PharmacologicalForm.name,
            };
          })}
          placeholder={selectedForm === '' ? '' : 'Limpar Filtro'}
          value={selectedForm}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setSelectedForm(target.value);
          }}
        />
      </SelectContainer>
    </RowWrapper>
  );
};
