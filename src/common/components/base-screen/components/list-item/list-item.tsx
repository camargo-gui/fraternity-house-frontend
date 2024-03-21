import React, { type ReactElement } from 'react';
import { Title, Wrapper } from './list-item.styles';

interface ListItemProps {
  title: string;
  icon: React.ElementType;
  route: string;
  isActive: boolean;
  onClick: (route: string, title: string) => void;
}

export const ListItem = ({
  icon: Icon,
  title,
  isActive,
  onClick,
  route,
}: ListItemProps): ReactElement => {
  const getColor = (): string => {
    return isActive ? '#007bff' : '#ffffff';
  };

  return (
    <Wrapper
      onClick={() => {
        onClick(route, title);
      }}
    >
      <Icon fill={getColor()} stroke={getColor()} width="32px" height="32px" />
      <Title color={getColor()}>{title}</Title>
    </Wrapper>
  );
};
