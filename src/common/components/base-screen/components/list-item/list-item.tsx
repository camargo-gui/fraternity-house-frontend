import React, { type ReactElement } from 'react';
import { Title, Wrapper } from './list-item.styles';

interface ListItemProps {
  title: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

export const ListItem = ({
  icon: Icon,
  title,
  isActive,
  onClick,
}: ListItemProps): ReactElement => {
  const getColor = (): string => {
    return isActive ? '#007bff' : '#ffffff';
  };

  return (
    <Wrapper onClick={onClick}>
      <Icon fill={getColor()} stroke={getColor()} />
      <Title color={getColor()}>{title}</Title>
    </Wrapper>
  );
};
