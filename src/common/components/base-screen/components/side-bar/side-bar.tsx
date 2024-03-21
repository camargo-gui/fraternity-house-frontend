import React, { useState, type ReactElement } from 'react';
import { screenList } from '../../screen-enum';
import { ListItem } from '../list-item/list-item';
import { ListItemWrapper, Logo, Wrapper } from './side-bar.styles';

export const SideBar = (): ReactElement => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

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
            onClick={() => {
              setActiveItem(item.title);
            }}
          />
        ))}
      </ListItemWrapper>
    </Wrapper>
  );
};
