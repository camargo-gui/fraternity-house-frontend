import React, { type ReactElement } from 'react';
import { Icon, Title, Wrapper } from './list-item.styles';

interface ListItemProps {
  title: string;
  icon: string;
}

export const ListItem = ({ icon, title }: ListItemProps): ReactElement => {
  return (
    <Wrapper>
      <Icon src={icon} />
      <Title>{title}</Title>
    </Wrapper>
  );
};
