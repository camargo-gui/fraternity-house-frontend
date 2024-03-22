import { type ReactElement } from 'react';
import { MedicineTable } from '../../components/medicine-table';
import { Button, Wrapper } from '../medicine.styles';
import type { Medicine } from '../../entities/medicine';
import React from 'react';

interface Props {
  changeScreen: () => void;
  medicines: Medicine[];
}

export const MedicineList = ({
  changeScreen,
  medicines,
}: Props): ReactElement => {
  return (
    <Wrapper>
      <MedicineTable medicines={medicines} />
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
