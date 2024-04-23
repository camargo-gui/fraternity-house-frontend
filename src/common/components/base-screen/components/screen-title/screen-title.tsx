import { type ReactElement } from 'react';
import { Container, ScreenTitleText, UserName } from './screen-title.styles';

export const ScreenTitle = ({
  screenTitle,
}: {
  screenTitle: string;
}): ReactElement => {
  return (
    <Container>
      <ScreenTitleText>{screenTitle}</ScreenTitleText>
      <UserName>Olá, {localStorage.getItem('name')?.split(' ')[0]}</UserName>
    </Container>
  );
};
