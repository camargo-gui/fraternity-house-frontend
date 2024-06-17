import {
  type FC,
  type PropsWithChildren,
  type ReactElement,
  useState,
} from 'react';
import { Container, ContentContainer } from './base-screen.styles';
import { SideBar } from './components/side-bar/side-bar';

export const BaseScreen: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Container>
      <SideBar
        isOpen={isSidebarOpen}
        onToggle={() => {
          setSidebarOpen(!isSidebarOpen);
        }}
      />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};
