import React, { type ReactElement } from 'react';
import { Wrapper, Button } from '../resident.styles';
import { CardListItem } from '../../components/card-list-item';
import { type ResidentDTO } from '../../dto/resident-dto';

interface Props {
  changeScreen: () => void;
  residents?: ResidentDTO[];
  onEdit: (cpf: string) => void;
  onDelete: (cpf: string) => Promise<void>;
  isLoading: boolean;
}

export const ResidentList = ({
  changeScreen,
  residents,
  onEdit,
  onDelete,
  isLoading,
}: Props): ReactElement => {
  return (
    <>
      <Wrapper>
        <CardListItem
          residents={residents}
          onEdit={onEdit}
          onDelete={onDelete}
          isLoading={isLoading}
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
