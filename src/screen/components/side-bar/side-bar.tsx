import React, { type ReactElement } from 'react';
import { ListItemWrapper, Logo, Wrapper } from './side-bar.styles';
import { ListItem } from '../list-item/list-item';
import { screenList } from '../../screen-enum';

export const SideBar = (): ReactElement => {
  return (
    <Wrapper>
      <Logo src={require('../../../assets/images/logo.png')} />
      <ListItemWrapper>
        {screenList.map((item) => (
          <ListItem key={item.title} icon={item.icon} title={item.title} />
        ))}
      </ListItemWrapper>
    </Wrapper>
  );
};
