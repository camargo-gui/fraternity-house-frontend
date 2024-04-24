import { type ReactElement } from 'react';
import {
  Container,
  EntryButton,
  ExitButton,
  ListButton,
} from './header-buttons.styles';
import { useNavigate } from 'react-router-dom';

export const HeaderButtons = (): ReactElement => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => (): void => {
    navigate(route);
  };
  return (
    <Container>
      <div>
        <EntryButton
          onClick={handleNavigate('/estoque/entrada')}
          text="Nova entrada"
        />
        <ExitButton
          onClick={handleNavigate('/estoque/saida')}
          text="Nova saída"
        />
      </div>
      <ListButton
        onClick={handleNavigate('/estoque/historico')}
        text="Histórico"
      />
    </Container>
  );
};
