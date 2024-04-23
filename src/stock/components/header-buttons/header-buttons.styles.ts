import styled from 'styled-components';
import { Button } from '../../../common/components/button/button';

export const Container = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
`;

export const EntryButton = styled(Button).attrs({
  hoverBackgroundColor: 'transparent',
})`
  background-color: white;
  color: #008425;
  border-color: #008425;
  border: 1px solid #008425;
`;

export const ExitButton = styled(Button).attrs({
  hoverBackgroundColor: 'transparent',
})`
  background-color: white;
  color: #b51414;
  border-color: #b51414;
  border: 1px solid #b51414;
`;

export const ListButton = styled(Button).attrs({
  hoverBackgroundColor: 'transparent',
})`
  background-color: white;
  color: #6c757d;
  border-color: #6c757d;
  border: 1px solid #6c757d;
`;
