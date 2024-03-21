import { useState, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { screenList } from '../../screen-enum';
import { ListItem } from '../list-item/list-item';
import { ListItemWrapper, Logo, Wrapper } from './side-bar.styles';
import React from 'react';

export const SideBar = (): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>('Fichas');
  const navigate = useNavigate();

  const handleNavigation = (route: string, title: string): void => {
    setActiveItem(title);
    navigate(route);
  };

  return (
    <Wrapper>
      <Logo src={require('../../../../../assets/images/logo.png')} />
      <ListItemWrapper>
        {screenList.map((item) => (
          <ListItem
            key={item.title}
            icon={item.icon}
            title={item.title}
            isActive={activeItem === item.title}
            route={item.route ?? ''}
            onClick={handleNavigation}
          />
        ))}
      </ListItemWrapper>
    </Wrapper>
  );
};
