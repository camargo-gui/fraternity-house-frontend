import { type ReactElement } from 'react';
import {
  Container,
  EntryButton,
  ExitButton,
  ListButton,
} from './header-buttons.styles';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '../../../common/components/form-input/form-input';

export const HeaderButtons = ({
  setText,
}: {
  setText: (text: string) => void;
}): ReactElement => {
  const navigate = useNavigate();

  const handleNavigate = (route: string) => (): void => {
    navigate(route);
  };
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <EntryButton
          onClick={handleNavigate('/estoque/entrada')}
          text="Nova entrada"
        />
        <ExitButton
          onClick={handleNavigate('/estoque/saida')}
          text="Nova saída"
        />
        <FormInput
          style={{ marginBottom: '0', width: '500px' }}
          type="search"
          id="stock-search"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setText(target.value);
          }}
        />
      </div>
      <div>
        <ListButton
          onClick={handleNavigate('/estoque/historico')}
          text="Histórico"
        />
      </div>
    </Container>
  );
};
