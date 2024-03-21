import { Container } from './base-screen.styles';
import React, { type ReactElement } from 'react';
import { SideBar } from './components/side-bar/side-bar';

export const BaseScreen = (): ReactElement => {
  return (
    <Container>
      <SideBar />
    </Container>
  );
};
