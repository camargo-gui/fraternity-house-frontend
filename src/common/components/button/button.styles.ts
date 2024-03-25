import styled from 'styled-components';

interface StyledButtonProps {
  backgroundColor?: string;
  border?: string;
  color?: string;
  padding?: string;
  fontSize?: string;
  margin?: string;
  borderRadius?: string;
  hoverBackgroundColor?: string;
  width?: string;
  fontWeight?: string;
  isDisabled?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#4CAF50'};
  border: ${({ border }) => border ?? 'none'};
  color: ${({ color }) => color ?? 'white'};
  padding: ${({ padding }) => padding ?? '10px 25px'};
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${({ fontSize }) => fontSize ?? '16px'};
  margin: ${({ margin }) => margin ?? '4px 2px'};
  width: ${({ width }) => width ?? '170px'};
  cursor: pointer;
  font-weight: ${({ fontWeight }) => fontWeight ?? 'regular'};
  border-radius: ${({ borderRadius }) => borderRadius ?? '25px'};
  &:hover {
    background-color: ${({ hoverBackgroundColor }) =>
      hoverBackgroundColor ?? '#45a049'};
  }
  & > span:first-child {
    margin-right: 0.5rem;
  }
`;
