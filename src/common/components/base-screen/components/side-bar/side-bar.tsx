import { useEffect, useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ScreenListItemProps, screenList } from '../../screen-enum';
import { ListItem } from '../list-item/list-item';
import {
  ListItemWrapper,
  Logo,
  Wrapper,
  HamburgerButton,
} from './side-bar.styles';
import React from 'react';
import { type RoleEnum } from '../../../../../login/services/interfaces/role';

export const SideBar = ({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>('Fichas');
  const [userRole, setUserRole] = useState<RoleEnum | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentScreen = screenList.find((item) => item.route === currentPath);
    if (currentScreen !== undefined) {
      setActiveItem(currentScreen.title);
    }
    const role = localStorage.getItem('role');
    if (role !== null) {
      setUserRole(role as RoleEnum);
    }
  }, []);

  const handleNavigation = (route: string, title: string): void => {
    if (route === '/logout') {
      localStorage.clear();
      navigate('/login');
      return;
    }
    setActiveItem(title);
    navigate(route);
    onToggle(); // Fechar o menu ao navegar
  };

  const shouldNotRenderItem = (item: ScreenListItemProps): boolean => {
    return (
      (item.notShouldRender ?? false) ||
      !userRole ||
      !item.allowedRoles?.includes(userRole)
    );
  };

  return (
    <>
      <HamburgerButton onClick={onToggle}>☰</HamburgerButton>
      <Wrapper isOpen={isOpen}>
        <Logo src={require('../../../../../assets/images/logo.png')} />
        <ListItemWrapper>
          {screenList.map((item) => {
            if (shouldNotRenderItem(item)) return null;
            return (
              <ListItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                isActive={activeItem === item.title}
                route={item.route ?? ''}
                onClick={() => {
                  handleNavigation(item.route ?? '', item.title);
                }}
              />
            );
          })}
        </ListItemWrapper>
      </Wrapper>
    </>
  );
};
