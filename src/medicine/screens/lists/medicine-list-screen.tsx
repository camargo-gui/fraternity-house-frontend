/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, type ReactElement } from 'react';
import { MedicineTable } from '../../components/medicine-table';
import type { Medicine } from '../../entities/medicine';
import { Button, Wrapper } from '../medicine.styles';
import { MedicineFilter } from '../medicine-filter/medicine-filter';

interface Props {
  changeScreen: () => void;
  medicines: Medicine[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MedicineList = ({
  changeScreen,
  medicines,
  onEdit,
  onDelete,
}: Props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPharmacologicalName, setSelectedPharmacologicalName] =
    useState('');
  const [selectedForm, setSelectedForm] = useState('');

  const filteredMedicines = medicines.filter((medicine) => {
    return (
      (selectedPharmacologicalName !== ''
        ? medicine.PharmacologicalName.name === selectedPharmacologicalName
        : true) &&
      (selectedForm !== ''
        ? medicine.PharmacologicalForm.name === selectedForm
        : true) &&
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Wrapper>
      <MedicineFilter
        medicines={medicines}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedPharmacologicalName={selectedPharmacologicalName}
        setSelectedPharmacologicalName={setSelectedPharmacologicalName}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />

      <MedicineTable
        medicines={filteredMedicines}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Button
        text="Novo Medicamento"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="200px"
      />
    </Wrapper>
  );
};
