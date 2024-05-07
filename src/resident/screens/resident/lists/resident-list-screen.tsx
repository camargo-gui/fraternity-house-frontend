import React, { type ReactElement } from 'react';
import { Wrapper, Button } from '../resident.styles';
import { CardListItem } from '../../../components/card-list-item';
import { type Resident } from '../../../entities/resident';

interface Props {
  changeScreen: () => void;
  residents?: Resident[];
  onEdit: (cpf: string) => void;
  onScreening: (id: string) => void;
  onDelete: (cpf: string) => Promise<void>;
}

export const ResidentList = ({
  changeScreen,
  residents,
  onEdit,
  onDelete,
  onScreening,
}: Props): ReactElement => {
  return (
    <>
      <Wrapper>
        <CardListItem
          residents={residents}
          onEdit={onEdit}
          onScreening={onScreening}
          onDelete={onDelete}
        />
      </Wrapper>
      <Button
        text="Novo Morador"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="auto"
      />
    </>
  );
};
