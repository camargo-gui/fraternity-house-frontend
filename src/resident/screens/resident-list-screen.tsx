import { type ReactElement } from 'react';
import { Wrapper, Button } from './resident.styles';
import { CardListItem } from '../components/card-list-item';

interface Props {
  changeScreen: () => void;
}

export const ResidentList = ({ changeScreen }: Props): ReactElement => {
  return (
    <Wrapper>
      <CardListItem />
      <Button
        text="Novo Morador"
        onClick={changeScreen}
        backgroundColor="#6c757d"
        hoverBackgroundColor="#595f64"
        width="auto"
      />
    </Wrapper>
  );
};
