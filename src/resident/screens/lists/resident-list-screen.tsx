import React, { type ReactElement } from 'react';
import { Wrapper, Button } from '../resident.styles';
import { CardListItem } from '../../components/card-list-item';
import { type ResidentDTO } from '../../dto/resident-dto';

interface Props {
  changeScreen: () => void;
  residents?: ResidentDTO[];
}

export const ResidentList = ({
  changeScreen,
  residents,
}: Props): ReactElement => {
  return (
    <>
      <Wrapper>
        <CardListItem residents={residents} />
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
