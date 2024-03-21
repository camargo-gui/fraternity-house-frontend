import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { Container, ContentContainer } from './base-screen.styles';
import { SideBar } from './components/side-bar/side-bar';
import React from 'react';

export const BaseScreen: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <Container>
      <SideBar />
      {<ContentContainer>{children}</ContentContainer>}
    </Container>
  );
};
