import React from 'react';
import { StyledButton } from './button.styles';

interface Props {
  text: string;
  onClick: () => void;
  backgroundColor?: string;
  border?: string;
  color?: string;
  padding?: string;
  fontSize?: string;
  margin?: string;
  borderRadius?: string;
  hoverBackgroundColor?: string;
  width?: string;
}

export const Button = ({ text, ...props }: Props): React.ReactElement => {
  return <StyledButton {...props}>{text}</StyledButton>;
};
