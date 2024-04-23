import { noop } from 'lodash';
import { type ReactElement } from 'react';
import {
  Container,
  EntryButton,
  ExitButton,
  ListButton,
} from './header-buttons.styles';

export const HeaderButtons = (): ReactElement => {
  return (
    <Container>
      <div>
        <EntryButton onClick={noop} text="Nova entrada" />
        <ExitButton onClick={noop} text="Nova saída" />
      </div>
      <ListButton onClick={noop} text="Histórico" />
    </Container>
  );
};
