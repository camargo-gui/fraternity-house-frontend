import { type ReactElement } from 'react';
import { MedicineTable } from '../../components/medicine-table';
import type { Medicine } from '../../entities/medicine';
import { Button, Wrapper } from '../medicine.styles';

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
  return (
    <Wrapper>
      <MedicineTable
        medicines={medicines}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Button
        text="Novo Medicamento"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="auto"
      />
    </Wrapper>
  );
};
