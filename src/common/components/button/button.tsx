import React from 'react';
import Spinner from 'react-bootstrap/Spinner'; // Importe o Spinner do React Bootstrap
import { StyledButton } from './button.styles';

interface Props {
  text?: string;
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
  leadingIcon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  fontWeight?: string;
  variantSpinner?: string;
  id?: string;
  noIconMargin?: boolean;
}

export const Button = ({
  text,
  leadingIcon,
  isLoading,
  isDisabled,
  variantSpinner,
  ...props
}: Props): React.ReactElement => {
  return (
    <StyledButton {...props} disabled={(isLoading ?? false) || isDisabled}>
      {isLoading ?? false ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          variant={variantSpinner ?? 'white'}
        />
      ) : (
        <>
          {leadingIcon !== undefined && <span>{leadingIcon}</span>}
          {text}
        </>
      )}
    </StyledButton>
  );
};
